// migration/fix-branded-meta-titles.ts
//
// Bug: page <title> tags rendered as e.g. "REVacity | About · Revacity" —
// the brand appeared twice, in two different spellings.
//
// Root cause: app/(site)/[locale]/layout.tsx's generateMetadata sets
//   title: { default: siteName, template: `%s · ${siteName}` }
// which ALREADY appends " · <siteName>" (the Settings value, "Revacity") to
// every page below it. migration/seed-revacity-pages.ts's 12 pages baked the
// brand into their own metaTitle too ("REVacity | About", "Services |
// Revacity" — inconsistently spelled besides), so the rendered title got the
// brand from both places.
//
// Fix is data-only, and already applied at the source: this run's
// seed-revacity-pages.ts and seed-arabic-meta.ts no longer put the brand in
// metaTitle. This script is what applies that fix to the LIVE database
// without a full re-seed, which would reset every other English field back
// to its seed default (the same risk flagged for the leaked-migration-note
// bug earlier).
//
// DELIBERATELY NARROW:
//   - Touches ONLY the metaTitle column, for both the `en` and `ar` rows of
//     these 12 `page` slugs.
//   - Never writes title/excerpt/body/metaDescription/ogImage/noIndex.
//   - Skips a locale row that doesn't exist yet (e.g. if this runs before
//     seed-arabic-meta.ts) rather than creating one — creating a row here
//     would need a `title`, which is out of scope for this fix.
//
//   npx tsx --env-file=.env migration/fix-branded-meta-titles.ts --dry-run
//   npx tsx --env-file=.env migration/fix-branded-meta-titles.ts
//
// IDEMPOTENT: re-running just re-applies the same values.
import { and, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { content, contentI18n, contentTypes } from "@/lib/db/schema";

const DRY_RUN = process.argv.includes("--dry-run");

interface Fix {
  slug: string;
  en: string;
  ar: string;
}

// The brand-free versions — the template supplies "Revacity" from here on.
const FIXES: Fix[] = [
  { slug: "home", en: "Human-First AI Marketing & Revenue Engineering", ar: "تسويق بالذكاء الاصطناعي يركّز على الإنسان وهندسة الإيرادات" },
  { slug: "about", en: "About", ar: "من نحن" },
  { slug: "services", en: "Services", ar: "الخدمات" },
  { slug: "the-agent", en: "The Agent", ar: "الوكيل" },
  { slug: "compare", en: "Compare", ar: "قارن" },
  { slug: "glossary", en: "Glossary", ar: "المسرد" },
  { slug: "our-architecture", en: "Our Architecture", ar: "بنيتنا" },
  { slug: "before-judging-us", en: "Before Judging Us", ar: "قبل أن تحكم علينا" },
  { slug: "100k-challenge", en: "The $100K Challenge", ar: "تحدي المئة ألف دولار" },
  { slug: "start-a-warrant", en: "Start a Warrant", ar: "ابدأ ضمانًا" },
  { slug: "start-audit", en: "Start Audit", ar: "ابدأ تدقيقًا" },
  { slug: "blog", en: "Intelligence Dispatches — Blog", ar: "برقيات الذكاء — المدونة" },
];

async function main() {
  const [pageType] = await db
    .select({ id: contentTypes.id })
    .from(contentTypes)
    .where(eq(contentTypes.slug, "page"))
    .limit(1);
  if (!pageType) {
    throw new Error(
      "The built-in `page` content type is missing. Visit /setup once, then re-run this script.",
    );
  }

  const report: { slug: string; locale: string; action: string }[] = [];

  for (const fix of FIXES) {
    const [row] = await db
      .select({ id: content.id })
      .from(content)
      .where(and(eq(content.typeId, pageType.id), eq(content.slug, fix.slug)))
      .limit(1);

    if (!row) {
      report.push({ slug: fix.slug, locale: "-", action: "SKIPPED — no content row" });
      continue;
    }

    for (const [locale, metaTitle] of [["en", fix.en], ["ar", fix.ar]] as const) {
      if (DRY_RUN) {
        report.push({ slug: fix.slug, locale, action: `dry-run → "${metaTitle}"` });
        continue;
      }

      const result = await db
        .update(contentI18n)
        .set({ metaTitle })
        .where(and(eq(contentI18n.contentId, row.id), eq(contentI18n.locale, locale)))
        .returning({ id: contentI18n.id });

      report.push({
        slug: fix.slug,
        locale,
        action: result.length > 0 ? "updated metaTitle" : "SKIPPED — no row for this locale yet",
      });
    }
  }

  console.table(report);
  if (DRY_RUN) console.log("\nDry run only — no rows were written. Re-run without --dry-run to apply.");
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
