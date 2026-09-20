// migration/seed-arabic-meta.ts
//
// Adds Arabic title/metaTitle/metaDescription to the 12 `page` rows that
// migration/seed-revacity-pages.ts seeded English-only (see that file's
// header: "ENGLISH ONLY... add Arabic translations from each page's editor
// when they're ready"). Fixes: "/ar/* pages have no meta description."
//
// DELIBERATELY NARROW, unlike a full re-seed:
//   - Touches ONLY the `ar` content_i18n row's title/metaTitle/metaDescription
//     columns for these 12 slugs.
//   - Never writes `body`, `excerpt`, `ogImage`, or `noIndex` — so it can
//     never wipe out real Arabic page content someone writes later (or has
//     already written) from the admin editor. On conflict it updates just
//     those three columns, not the whole row.
//   - Never touches the `en` row or any blog post.
//
// This does NOT fix missing Arabic body content (that's the separate,
// larger "Arabic pages have no content" issue) — it only makes /ar/* pages
// carry a real <title> and meta description instead of falling back to the
// bare slug and no description.
//
//   npx tsx --env-file=.env migration/seed-arabic-meta.ts --dry-run
//   npx tsx --env-file=.env migration/seed-arabic-meta.ts
//
// IDEMPOTENT: re-running just re-applies the same three columns.
import { and, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { content, contentI18n, contentTypes } from "@/lib/db/schema";

const DRY_RUN = process.argv.includes("--dry-run");

interface ArabicMeta {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
}

const ARABIC_META: ArabicMeta[] = [
  {
    slug: "home",
    title: "الرئيسية",
    // No brand here: the root layout's title.template already appends
    // " · Revacity" to every page (see the metaTitle fix in
    // seed-revacity-pages.ts and the new fix-branded-meta-titles.ts) —
    // baking it into metaTitle too duplicated it in the <title> tag.
    metaTitle: "تسويق بالذكاء الاصطناعي يركّز على الإنسان وهندسة الإيرادات",
    metaDescription:
      "Revacity ممارسة هندسة نتائج بلا حالة (Stateless Outcome Engineering). نوقّع ضمانات إيرادات لا عقودًا، ولا نتقاضى أجرنا إلا حين تُحصّل أموالك فعليًا.",
  },
  {
    slug: "about",
    title: "من نحن",
    metaTitle: "من نحن",
    metaDescription:
      "ثمانية عشر عامًا من الخبرة الميدانية في التجزئة والتجارة الإلكترونية والسلع الاستهلاكية سريعة الدوران والضيافة، تحوّلت إلى ممارسة تسويق ونمو بمحورية إنسانية تعتمد على الذكاء الاصطناعي.",
  },
  {
    slug: "services",
    title: "الخدمات",
    metaTitle: "الخدمات",
    metaDescription:
      "خدمتان بفلسفة واحدة: هندسة الإيرادات كخدمة (REaaS) وهندسة النمو كخدمة (GEaaS).",
  },
  {
    slug: "the-agent",
    title: "الوكيل",
    metaTitle: "الوكيل",
    metaDescription:
      "اختر مشكلتك أو الهدف الذي تطمح إليه، وتحدّث مع وكيل Revacity لتصلك الإجابة خلال 48 إلى 72 ساعة.",
  },
  {
    slug: "compare",
    title: "قارن",
    metaTitle: "قارن",
    metaDescription:
      "مقارنة أسلوب عملنا أسهل من شرحه. اختر الضمان (Warrant)، أو التحدي، أو أحضر وكالتك الحالية.",
  },
  {
    slug: "glossary",
    title: "المسرد",
    metaTitle: "المسرد",
    metaDescription:
      "مفاهيم وأطر عمل ومصطلحات من عالم التسويق بالذكاء الاصطناعي، مشروحة بلغة مبسطة.",
  },
  {
    slug: "our-architecture",
    title: "بنيتنا",
    metaTitle: "بنيتنا",
    metaDescription:
      "بنية عصبية-رمزية (Neuro-symbolic)، بمحورية إنسانية، وبلا إرث تقني قديم، هي الأساس وراء كل تعاقد مضمون.",
  },
  {
    slug: "before-judging-us",
    title: "قبل أن تحكم علينا",
    metaTitle: "قبل أن تحكم علينا",
    metaDescription:
      "حقائقنا الغريبة، وقراءتنا للسوق، ولماذا نفضّل الصدق على الانبهار.",
  },
  {
    slug: "100k-challenge",
    title: "تحدي المئة ألف دولار",
    metaTitle: "تحدي المئة ألف دولار",
    metaDescription:
      "احصل على هذا المبلغ نقدًا إن أثبتّ ذلك. نحن الخيار غير العادل بالنسبة لمنافسيك.",
  },
  {
    slug: "start-a-warrant",
    title: "ابدأ ضمانًا",
    metaTitle: "ابدأ ضمانًا",
    metaDescription:
      "نحن لا نوقّع عقودًا، بل نوقّع ضمانات إيرادات (Revenue Warrants): رقم محدد، وجدول زمني محدد، ولا أجر إن لم ننجز.",
  },
  {
    slug: "start-audit",
    title: "ابدأ تدقيقًا",
    metaTitle: "ابدأ تدقيقًا",
    metaDescription: "لا نُجري التدقيق لإبهارك، بل لكشف الحقيقة. احجز التشخيص الآن.",
  },
  {
    slug: "blog",
    title: "برقيات الذكاء",
    metaTitle: "برقيات الذكاء — المدونة",
    metaDescription:
      "مدونة Revacity: آراء مخالفة للسائد حول تحولات الذكاء الاصطناعي، وديناميكيات الإنسان والآلة، وعالم التحديثات المتسارعة. مُهندسة لتحسين الظهور في نتائج الذكاء الاصطناعي (AEO) والبحث الجغرافي (GEO) ومحركات البحث التقليدية (SEO).",
  },
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

  const report: { slug: string; action: string }[] = [];

  for (const entry of ARABIC_META) {
    const [row] = await db
      .select({ id: content.id })
      .from(content)
      .where(and(eq(content.typeId, pageType.id), eq(content.slug, entry.slug)))
      .limit(1);

    if (!row) {
      report.push({ slug: entry.slug, action: "SKIPPED — no content row (run seed-revacity-pages.ts first)" });
      continue;
    }

    if (DRY_RUN) {
      report.push({ slug: entry.slug, action: "dry-run (would upsert ar meta)" });
      continue;
    }

    await db
      .insert(contentI18n)
      .values({
        contentId: row.id,
        locale: "ar",
        title: entry.title,
        metaTitle: entry.metaTitle,
        metaDescription: entry.metaDescription,
      })
      .onConflictDoUpdate({
        target: [contentI18n.contentId, contentI18n.locale],
        // Only these three columns — never body/excerpt/ogImage/noIndex, so
        // this never overwrites real Arabic content added from the editor.
        set: {
          title: entry.title,
          metaTitle: entry.metaTitle,
          metaDescription: entry.metaDescription,
        },
      });

    report.push({ slug: entry.slug, action: "upserted ar meta" });
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
