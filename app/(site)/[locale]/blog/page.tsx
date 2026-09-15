// app/(site)/[locale]/blog/page.tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { listByType } from '@/lib/db/archives';
import { ArchiveList } from '@/components/site/archive-list';
import { locales, type Locale } from '@/lib/env';
import { getContentBySlug } from '@/lib/db/queries';
import { asContentBlocks } from '@/lib/blocks/content-schema';
import { isHeroBlock } from '@/lib/blocks/layout';
import { ContentRenderer } from '@/components/site/content-renderer';
import { buildMetadata } from '@/lib/seo/metadata';
import { getSettings } from '@/lib/db/queries';

const COPY = {
  ar: { title: 'المدونة', empty: 'لا توجد مقالات منشورة بعد.' },
  en: { title: 'Blog', empty: 'No published posts yet.' },
} as const;

/**
 * This static route shadows the generic `[segment]` page for the exact
 * word "blog" — Next.js always prefers a static path over a sibling
 * dynamic one, so `[segment]/page.tsx`'s own "a page wins when both
 * exist" logic never gets a chance to run here. Reproduced inline instead:
 * an admin-published `page` at slug "blog" (e.g. a vendored/custom design)
 * wins; only when none exists does this fall back to the auto-generated
 * `post` archive below.
 */
async function loadBlogPage(localeParam: string) {
  if (!locales.includes(localeParam as Locale)) return null;
  const locale = localeParam as Locale;
  const record = await getContentBySlug('blog', locale);
  if (!record || record.content.status !== 'published') return null;
  return { record, locale };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loaded = await loadBlogPage(locale);
  if (loaded) {
    const { i18n } = loaded.record;
    const settings = await getSettings();
    return buildMetadata({
      locale: loaded.locale,
      path: '/blog',
      title: i18n?.metaTitle || i18n?.title || 'Blog',
      description: i18n?.metaDescription || i18n?.excerpt,
      image: i18n?.ogImage ?? settings?.logo,
      type: 'article',
      noIndex: i18n?.noIndex ?? false,
      siteName: settings?.siteName,
    });
  }
  return { title: COPY[locale === 'en' ? 'en' : 'ar'].title };
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  const typedLocale = locale as Locale;

  const loaded = await loadBlogPage(locale);
  if (loaded) {
    const { i18n } = loaded.record;
    const blocks = asContentBlocks(i18n?.body);

    if (isHeroBlock(blocks[0] ?? { type: '' })) {
      return <ContentRenderer blocks={blocks} locale={loaded.locale} pageSlug="blog" />;
    }

    return (
      <article className="mx-auto max-w-4xl px-4 py-16">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-site-ink">{i18n?.title ?? 'Blog'}</h1>
          {i18n?.excerpt && <p className="mt-2 text-lg text-site-ink-muted">{i18n.excerpt}</p>}
        </header>
        <ContentRenderer blocks={blocks} locale={loaded.locale} pageSlug="blog" />
      </article>
    );
  }

  const entries = await listByType('post', typedLocale);
  const copy = COPY[typedLocale];

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="mb-8 text-3xl font-bold text-site-ink">{copy.title}</h1>
      <ArchiveList entries={entries} locale={typedLocale} emptyMessage={copy.empty} />
    </div>
  );
}
