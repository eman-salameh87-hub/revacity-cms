// /app/(site)/[locale]/page.tsx
import type { Metadata } from 'next';
import { getContentBySlug, getSettings } from '@/lib/db/queries';
import { HeroSection } from '@/components/site/hero-section';
import { ContentRenderer } from '@/components/site/content-renderer';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/lib/env';
import { asContentBlocks } from '@/lib/blocks/content-schema';
import { isHeroBlock } from '@/lib/blocks/layout';
import { buildMetadata } from '@/lib/seo/metadata';

/**
 * The 'home' content row, falling back to the other locale's when this one
 * has no translation yet.
 *
 * Shared by generateMetadata and the page body so the two can't disagree —
 * before this fix, the page rendered the OTHER locale's content on a
 * missing translation (see the comment below) while generateMetadata simply
 * didn't exist, so there was nothing to keep in sync in the first place.
 */
async function loadHomeContent(typedLocale: Locale) {
  let homeContent = await getContentBySlug('home', typedLocale);

  /**
   * No 'home' translation for this locale yet: show the OTHER locale's home
   * content rather than falling straight to the literal placeholder strings
   * below. Those strings are a template default meant for a fresh install
   * with no 'home' entry translated in ANY locale — they were never meant to
   * be what a real visitor sees on a real language of a real site, which is
   * exactly what happened on /ar while only the English entry was filled in.
   */
  if (!homeContent?.i18n) {
    const otherLocale = locales.find((l) => l !== typedLocale);
    if (otherLocale) {
      const fallback = await getContentBySlug('home', otherLocale);
      if (fallback?.i18n) homeContent = fallback;
    }
  }

  return homeContent;
}

/**
 * Every other page on this site gets its <title>/description from its own
 * metaTitle/metaDescription via buildMetadata() — this route never did, so
 * the homepage fell all the way through to the root layout's bare default
 * (`siteName` alone, "Revacity", no descriptive text) instead of the actual
 * copy already sitting in the 'home' page's own fields.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) return {};
  const typedLocale = locale as Locale;

  const [homeContent, settings] = await Promise.all([
    loadHomeContent(typedLocale),
    getSettings(),
  ]);

  return buildMetadata({
    locale: typedLocale,
    path: '',
    title: homeContent?.i18n?.metaTitle || homeContent?.i18n?.title || settings?.siteName || 'Revacity',
    description: homeContent?.i18n?.metaDescription || homeContent?.i18n?.excerpt || settings?.siteDescription,
    image: homeContent?.i18n?.ogImage ?? homeContent?.content?.featuredImage ?? settings?.logo,
    // The site's own entry point, not an editorial piece — unlike the
    // 'article' type every content PAGE uses (see [segment]/page.tsx).
    type: 'website',
    noIndex: homeContent?.i18n?.noIndex ?? false,
    siteName: settings?.siteName,
  });
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  // Validate rather than cast. `locale as 'ar' | 'en'` silently passes any
  // segment through to a pgEnum comparison, which Postgres rejects with
  // 22P02 invalid_text_representation — a 500, not a 404.
  if (!locales.includes(locale as Locale)) notFound();
  const typedLocale = locale as Locale;

  const homeContent = await loadHomeContent(typedLocale);

  // The site's own name/description — from Settings, filled in at setup —
  // is what a visitor should see if truly nothing else is available, not a
  // hardcoded name for a different product ("New Aeon" is this CMS's own
  // name, not any site built with it).
  const settings = await getSettings();

  const blocks = asContentBlocks(homeContent?.i18n?.body);

  /**
   * A band block in the first position IS the hero.
   *
   * Rendering both put a static banner above the thing built to be the banner,
   * so the slider started halfway down the page behind something it was meant
   * to replace. The generic HeroSection stays for a home page that has no
   * such block — otherwise such a site would open abruptly on body text — so
   * this is "the hero block takes over", not "the banner is gone".
   *
   * Checked against lib/blocks/layout.ts rather than `=== 'slider'`, because
   * `video-hero` is now the other block that means this. Hardcoding one type
   * here is what made the new-aeon.com home page render a placeholder banner
   * above its own video.
   */
  const leadsWithHero = isHeroBlock(blocks[0] ?? { type: '' });

  return (
    <div>
      {!leadsWithHero && (
        <HeroSection
          title={homeContent?.i18n?.title || settings?.siteName || 'Revacity'}
          subtitle={homeContent?.i18n?.excerpt || settings?.siteDescription || ''}
          backgroundImage={homeContent?.content?.featuredImage ?? undefined}
        />
      )}

      {leadsWithHero ? (
        // Unwrapped, matching the [segment] route's identical carve-out for
        // a hero-first page (see HERO_CUSTOM_COMPONENTS): a vendored,
        // full-page embed already IS the page, so the usual
        // `max-w-4xl mx-auto` prose container and its padding would just
        // leave an unwanted gap below it rather than doing anything useful.
        <ContentRenderer blocks={blocks} locale={typedLocale} />
      ) : (
        blocks.length > 0 && (
          <section className="py-16 px-4 max-w-4xl mx-auto">
            <ContentRenderer blocks={blocks} locale={typedLocale} />
          </section>
        )
      )}
    </div>
  );
}
