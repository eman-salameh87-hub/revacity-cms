// lib/blocks/legacy-embed-overrides.ts
//
// The vendored legacy pages (public/legacy/revacity-*/) are rendered as an
// <iframe> to a static, hand-built HTML document — see
// components/site/custom/revacity-about-engine.tsx and
// components/site/custom/revacity-home-engine.tsx. That keeps their custom
// canvas backgrounds, GSAP scroll animations and per-page CSS completely
// intact, but by default leaves every word on the page hardcoded in that
// static file, unreachable from the admin.
//
// This registry is the bridge: for a given vendored document (keyed by its
// `src` path, exactly as stored in the block's `props.src`), it lists the
// handful of text slots that document has been wired to accept overrides
// for. Each slot has a stable `key` — it must match the `data-cms-slot`
// attribute (or, for the Home scrollytelling engine, the override key read
// by its inline script) baked into that specific HTML file. Nothing else on
// the page changes: no layout, no canvas, no scroll behaviour — only the
// text content of the marked element, and only when the admin has actually
// set a value.
//
// Adding a new editable slot to a vendored page always means TWO changes in
// lockstep: an entry here, and the matching `data-cms-slot="<key>"` marker
// (or chapters-array wiring, for Home) added to that page's HTML.
export interface LegacyEmbedSlot {
  key: string;
  labelAr: string;
  labelEn: string;
  hintAr?: string;
  hintEn?: string;
  multiline?: boolean;
}

export const LEGACY_EMBED_SLOTS: Record<string, LegacyEmbedSlot[]> = {
  "/legacy/revacity-home/index-full.html": [
    {
      key: "heroEyebrow",
      labelAr: "العبارة الافتتاحية — المقدمة",
      labelEn: "Chapter 1 (intro) — eyebrow",
      hintAr: "يفقد التنسيق الخاص (الخط السفلي) عند تغييره.",
      hintEn: "Loses its special underline styling if you replace it.",
    },
    {
      key: "heroHeading",
      labelAr: "العنوان الرئيسي — المقدمة",
      labelEn: "Chapter 1 (intro) — heading",
      hintAr: "يفقد الروابط الملوّنة داخل النص عند تغييره.",
      hintEn: "Loses the two coloured inline links if you replace it.",
    },
    {
      key: "originEyebrow",
      labelAr: "الفصل 2 — العبارة الافتتاحية",
      labelEn: "Chapter 2 (origin) — eyebrow",
    },
    {
      key: "originHeading",
      labelAr: "الفصل 2 — العنوان",
      labelEn: "Chapter 2 (origin) — heading",
    },
    {
      key: "originDetail",
      labelAr: "الفصل 2 — نص إضافي",
      labelEn: "Chapter 2 (origin) — detail text",
      multiline: true,
    },
    {
      key: "nebulaEyebrow",
      labelAr: "الفصل 3 — العبارة الافتتاحية",
      labelEn: "Chapter 3 (nebula) — eyebrow",
    },
    {
      key: "nebulaHeading",
      labelAr: "الفصل 3 — العنوان",
      labelEn: "Chapter 3 (nebula) — heading",
    },
    {
      key: "nebulaFooter",
      labelAr: "الفصل 3 — نص الختام",
      labelEn: "Chapter 3 (nebula) — footer text",
      multiline: true,
      hintAr: "يفقد التلوين الخاص داخل النص عند تغييره.",
      hintEn: "Loses its coloured inline highlight if you replace it.",
    },
    {
      key: "galaxyEyebrow",
      labelAr: "الفصل 4 — العبارة الافتتاحية",
      labelEn: "Chapter 4 (galaxy) — eyebrow",
    },
    {
      key: "galaxyHeading",
      labelAr: "الفصل 4 — العنوان",
      labelEn: "Chapter 4 (galaxy) — heading",
    },
    {
      key: "galaxyNegationFooter",
      labelAr: "الفصل 4 — نص الختام",
      labelEn: "Chapter 4 (galaxy) — footer text",
      multiline: true,
      hintAr: "يفقد التلوين الخاص داخل النص عند تغييره.",
      hintEn: "Loses its coloured inline highlights if you replace it.",
    },
    {
      key: "voyageEyebrow",
      labelAr: "الفصل 5 — العبارة الافتتاحية",
      labelEn: "Chapter 5 (voyage) — eyebrow",
    },
    {
      key: "voyageHeading",
      labelAr: "الفصل 5 — العنوان",
      labelEn: "Chapter 5 (voyage) — heading",
      hintAr: "يفقد التلوين الخاص داخل النص عند تغييره.",
      hintEn: "Loses its coloured inline highlight if you replace it.",
    },
    {
      key: "horizonEyebrow",
      labelAr: "الفصل 6 — العبارة الافتتاحية",
      labelEn: "Chapter 6 (horizon) — eyebrow",
    },
    {
      key: "horizonHeading",
      labelAr: "الفصل 6 — العنوان",
      labelEn: "Chapter 6 (horizon) — heading",
      hintAr: "يفقد خط الشطب الخاص داخل النص عند تغييره.",
      hintEn: "Loses its strikethrough styling if you replace it.",
    },
    {
      key: "horizonTopologyFootnote",
      labelAr: "الفصل 6 — حاشية",
      labelEn: "Chapter 6 (horizon) — footnote",
      multiline: true,
    },
    {
      key: "singularityEyebrow",
      labelAr: "الفصل 7 — العبارة الافتتاحية",
      labelEn: "Chapter 7 (singularity) — eyebrow",
    },
    {
      key: "singularityHeading",
      labelAr: "الفصل 7 — العنوان",
      labelEn: "Chapter 7 (singularity) — heading",
    },
    {
      key: "singularityDyingBadge",
      labelAr: "الفصل 7 — شارة",
      labelEn: "Chapter 7 (singularity) — badge text",
    },
    {
      key: "infinityHeading",
      labelAr: "الفصل 8 — العنوان",
      labelEn: "Chapter 8 (closing) — heading",
    },
    {
      key: "infinityDiagBanner",
      labelAr: "الفصل 8 — شعار",
      labelEn: "Chapter 8 (closing) — banner text",
      multiline: true,
      hintAr: "يفقد التلوين الخاص داخل النص عند تغييره.",
      hintEn: "Loses its coloured inline highlight if you replace it.",
    },
    {
      key: "infinitySkepticTitle",
      labelAr: "الفصل 8 — عنوان الشك",
      labelEn: 'Chapter 8 (closing) — "skeptical" title',
    },
    {
      key: "infinitySkepticDesc",
      labelAr: "الفصل 8 — نص الشك",
      labelEn: 'Chapter 8 (closing) — "skeptical" text',
    },
    {
      key: "infinityCompareText",
      labelAr: "الفصل 8 — نص المقارنة",
      labelEn: "Chapter 8 (closing) — compare button text",
      multiline: true,
    },
  ],
  "/legacy/revacity-start-audit/index.html": [
    {
      key: "heroEyebrow",
      labelAr: "العبارة الافتتاحية",
      labelEn: "Hero eyebrow",
    },
    {
      key: "heroHeadingLine1",
      labelAr: "العنوان — السطر الأول",
      labelEn: "Heading — line 1",
    },
    {
      key: "heroHeadingLine2",
      labelAr: "العنوان — السطر الثاني",
      labelEn: "Heading — line 2",
    },
    {
      key: "heroSubhead",
      labelAr: "النص الفرعي",
      labelEn: "Subheading",
      multiline: true,
    },
    {
      key: "heroBody",
      labelAr: "نص تمهيدي",
      labelEn: "Hero body text",
      multiline: true,
    },
    {
      key: "processEyebrow",
      labelAr: "تسمية — العملية",
      labelEn: "Label — the process",
    },
    {
      key: "processTitle",
      labelAr: "عنوان — كيف تعمل المراجعة",
      labelEn: "Heading — how the audit works",
    },
    {
      key: "auditTypesTitle",
      labelAr: "عنوان — أنواع المراجعة",
      labelEn: "Heading — audit types",
    },
    {
      key: "closingTitle",
      labelAr: "عنوان الختام",
      labelEn: "Closing heading",
    },
    {
      key: "closingBody1",
      labelAr: "نص الختام 1",
      labelEn: "Closing text 1",
      multiline: true,
    },
    {
      key: "closingBody2",
      labelAr: "نص الختام 2",
      labelEn: "Closing text 2",
      multiline: true,
    },
    {
      key: "closingStatement",
      labelAr: "بيان الختام",
      labelEn: "Closing statement",
      multiline: true,
    },
    {
      key: "footerTagline",
      labelAr: "شعار التذييل",
      labelEn: "Footer tagline",
    },
  ],
  "/legacy/revacity-start-a-warrant/index.html": [
    {
      key: "heroHeadingLine1",
      labelAr: "العنوان — السطر الأول",
      labelEn: "Heading — line 1",
    },
    {
      key: "heroHeadingLine2",
      labelAr: "العنوان — السطر الثاني",
      labelEn: "Heading — line 2",
    },
    {
      key: "heroSubtitle",
      labelAr: "العنوان الفرعي",
      labelEn: "Subtitle",
      multiline: true,
    },
    {
      key: "heroSubtitle2",
      labelAr: "نص فرعي إضافي",
      labelEn: "Extra subtext",
      multiline: true,
    },
    {
      key: "econEyebrow",
      labelAr: "تسمية — اقتصاديات المشاركة",
      labelEn: "Label — engagement economics",
    },
    {
      key: "econTitle",
      labelAr: "عنوان — كيف يعمل الضمان",
      labelEn: "Heading — how the warrant works",
    },
    {
      key: "audienceEyebrow",
      labelAr: "تسمية — الجمهور والنطاق",
      labelEn: "Label — audience and scope",
    },
    {
      key: "audienceTitle",
      labelAr: "عنوان — من نخدم",
      labelEn: "Heading — who we serve",
    },
    {
      key: "wvcTitle",
      labelAr: "عنوان — الضمانات مقابل العقود",
      labelEn: "Heading — warrants vs contracts",
    },
    {
      key: "qgateLine1",
      labelAr: "بوابة التأهيل — السطر الأول",
      labelEn: "Qualification gate — line 1",
    },
    {
      key: "qgateLine2",
      labelAr: "بوابة التأهيل — السطر الثاني",
      labelEn: "Qualification gate — line 2",
    },
    {
      key: "qgateSubtitle",
      labelAr: "نص فرعي — بوابة التأهيل",
      labelEn: "Subtext — qualification gate",
      multiline: true,
    },
    {
      key: "wwoEyebrow",
      labelAr: "تسمية — أين نعمل",
      labelEn: "Label — where we operate",
    },
    {
      key: "wwoTitle",
      labelAr: "عنوان — أين نعمل",
      labelEn: "Heading — where we operate",
    },
    {
      key: "wwoDesc",
      labelAr: "نص — أين نعمل",
      labelEn: "Text — where we operate",
      multiline: true,
    },
    {
      key: "solutionsEyebrow",
      labelAr: "تسمية — الحلول",
      labelEn: "Label — solutions we've built",
    },
    {
      key: "footerTagline",
      labelAr: "شعار التذييل",
      labelEn: "Footer tagline",
    },
  ],
  "/legacy/revacity-100k-challenge/index.html": [
    {
      key: "heroHeadingLine1",
      labelAr: "العنوان — الجزء الأول",
      labelEn: "Heading — part 1",
    },
    {
      key: "heroHeadingLine2",
      labelAr: "العنوان — الجزء الثاني",
      labelEn: "Heading — part 2",
    },
    {
      key: "challengeTitle",
      labelAr: "عنوان التحدي",
      labelEn: "Challenge heading",
    },
    {
      key: "challengeSub",
      labelAr: "نص فرعي — التحدي",
      labelEn: "Challenge subheading",
    },
    {
      key: "challengeActionText",
      labelAr: "نص — احصل على المبلغ",
      labelEn: "Action text",
    },
    {
      key: "callUsDesc",
      labelAr: "نص — اتصل بنا",
      labelEn: "Call us — description",
      multiline: true,
    },
    {
      key: "skepticalTitle",
      labelAr: "عنوان — ما زلت متشككًا؟",
      labelEn: 'Heading — "Still skeptical?"',
    },
    {
      key: "skepticalText",
      labelAr: "نص — الشك",
      labelEn: "Skeptical text",
    },
    {
      key: "tabLeftHeading",
      labelAr: "عنوان — لسنا الوحيدين",
      labelEn: "Heading — not the only one",
    },
    {
      key: "tabLeftText",
      labelAr: "نص — الخيار غير العادل",
      labelEn: "Text — unfair choice",
    },
    {
      key: "tabRightHeading",
      labelAr: "عنوان — لماذا تحتضر وكالتك",
      labelEn: "Heading — why your agency is dying",
    },
    {
      key: "tabRightText",
      labelAr: "نص — تقييم الوكالات القديمة",
      labelEn: "Text — legacy roast",
    },
    {
      key: "footerTagline",
      labelAr: "شعار التذييل",
      labelEn: "Footer tagline",
    },
  ],
  "/legacy/revacity-before-judging-us/index.html": [
    { key: "heroHeading", labelAr: "العنوان الرئيسي", labelEn: "Main heading" },
    {
      key: "colLeftTitle",
      labelAr: "عنوان العمود الأيسر",
      labelEn: "Left column heading",
    },
    {
      key: "colRightTitle",
      labelAr: "عنوان العمود الأيمن",
      labelEn: "Right column heading",
    },
    {
      key: "purposeBlueTitle",
      labelAr: "عنوان — الغرض من الذكاء الاصطناعي",
      labelEn: "Heading — purpose of AI",
    },
    {
      key: "purposeLead",
      labelAr: "نص رئيسي — الغرض",
      labelEn: "Purpose — lead text",
      multiline: true,
    },
    {
      key: "purposeText",
      labelAr: "نص — الغرض",
      labelEn: "Purpose — text",
      multiline: true,
    },
    {
      key: "skepticalTitle",
      labelAr: "عنوان — ما زلت متشككًا؟",
      labelEn: 'Heading — "Still skeptical?"',
    },
    {
      key: "skepticalSubtitle",
      labelAr: "نص فرعي — الشك",
      labelEn: "Skeptical — subtext",
    },
    {
      key: "footerTagline",
      labelAr: "شعار التذييل",
      labelEn: "Footer tagline",
    },
  ],
  "/legacy/revacity-compare/index.html": [
    { key: "heroHeading", labelAr: "العنوان الرئيسي", labelEn: "Hero heading" },
    {
      key: "heroSubtitle",
      labelAr: "العنوان الفرعي",
      labelEn: "Subtitle",
      multiline: true,
    },
    {
      key: "heroSub2",
      labelAr: "سطر إضافي",
      labelEn: "Extra line",
      multiline: true,
    },
    {
      key: "wcH1Line1",
      labelAr: "لافتة — السطر الأول",
      labelEn: "Banner — line 1",
    },
    {
      key: "wcH1Line2",
      labelAr: "لافتة — السطر الثاني",
      labelEn: "Banner — line 2",
    },
    {
      key: "wcCellLabel1",
      labelAr: "الخلية 1 — العنوان",
      labelEn: "Cell 1 — label",
    },
    {
      key: "wcCellBody1",
      labelAr: "الخلية 1 — النص",
      labelEn: "Cell 1 — text",
      multiline: true,
    },
    {
      key: "wcCellLabel2",
      labelAr: "الخلية 2 — العنوان",
      labelEn: "Cell 2 — label",
    },
    {
      key: "wcCellBody2",
      labelAr: "الخلية 2 — النص",
      labelEn: "Cell 2 — text",
      multiline: true,
    },
    {
      key: "wcQuestionQ1",
      labelAr: "السؤال — الجزء الأول",
      labelEn: "Question — part 1",
    },
    {
      key: "wcQuestionQ2",
      labelAr: "السؤال — الجزء الثاني",
      labelEn: "Question — part 2",
      multiline: true,
    },
    {
      key: "wcColTitle1",
      labelAr: "العمود 1 — العنوان",
      labelEn: "Column 1 — title",
    },
    {
      key: "wcColSub1",
      labelAr: "العمود 1 — نص فرعي",
      labelEn: "Column 1 — subtext",
    },
    {
      key: "wcColTitle2",
      labelAr: "العمود 2 — العنوان",
      labelEn: "Column 2 — title",
    },
    {
      key: "wcColSub2",
      labelAr: "العمود 2 — نص فرعي",
      labelEn: "Column 2 — subtext",
    },
    {
      key: "wcMsHeading",
      labelAr: "عنوان — إذا لم نحقق الأهداف",
      labelEn: "Milestones — heading",
    },
    {
      key: "wcMsBold",
      labelAr: "نص بارز — الدفع",
      labelEn: "Milestones — bold text",
    },
    {
      key: "wcMsBody1",
      labelAr: "نص — الضمان 1",
      labelEn: "Milestones — text 1",
      multiline: true,
    },
    {
      key: "wcMsBody2",
      labelAr: "نص — الضمان 2",
      labelEn: "Milestones — text 2",
      multiline: true,
    },
    {
      key: "wcHowLabel",
      labelAr: "تسمية — كيف ندفع",
      labelEn: "Label — how we get paid",
    },
    {
      key: "wcHowBody",
      labelAr: "نص — كيف ندفع",
      labelEn: "Text — how we get paid",
      multiline: true,
    },
    {
      key: "wcIntegrityText",
      labelAr: "نص النزاهة",
      labelEn: "Integrity text",
      multiline: true,
    },
    {
      key: "ccTitle",
      labelAr: "عنوان — كيف يعمل التحدي",
      labelEn: "Heading — how the challenge works",
    },
    {
      key: "ccClosingHeadline",
      labelAr: "عنوان الختام",
      labelEn: "Closing headline",
      multiline: true,
    },
    {
      key: "ccClosingSub",
      labelAr: "نص الختام الفرعي",
      labelEn: "Closing subtext",
      multiline: true,
    },
    {
      key: "acTitle",
      labelAr: "عنوان — كيف يعمل هذا",
      labelEn: "Heading — how this works",
    },
    {
      key: "acAccentBright",
      labelAr: "نص مميز 1",
      labelEn: "Accent text 1",
    },
    {
      key: "acAccentDim",
      labelAr: "نص مميز 2",
      labelEn: "Accent text 2",
    },
    {
      key: "acAccentSub",
      labelAr: "نص فرعي مميز",
      labelEn: "Accent subtext",
    },
    {
      key: "footerTagline",
      labelAr: "شعار التذييل",
      labelEn: "Footer tagline",
      multiline: true,
    },
  ],
  "/legacy/revacity-our-architecture/index.html": [
    { key: "heroHeading", labelAr: "العنوان الرئيسي", labelEn: "Hero heading" },
    {
      key: "agentStackLabel",
      labelAr: "تسمية — مكدس الوكلاء",
      labelEn: "Label — the agent stack",
    },
    {
      key: "agentStackTitle",
      labelAr: "عنوان — مكدس الوكلاء",
      labelEn: "Heading — the agent stack",
    },
    {
      key: "ciLabel",
      labelAr: "تسمية — هندسة النتائج",
      labelEn: "Label — outcome engineering",
    },
    {
      key: "ciHeading",
      labelAr: "عنوان — ثمانية أبعاد",
      labelEn: "Heading — eight dimensions",
    },
    {
      key: "ciSublayersTitle",
      labelAr: "نص فرعي — الأبعاد الثمانية",
      labelEn: "Subtext — eight dimensions",
    },
    {
      key: "ciBannerText",
      labelAr: "نص اللافتة",
      labelEn: "Banner text",
      multiline: true,
    },
    {
      key: "footerTagline",
      labelAr: "شعار التذييل",
      labelEn: "Footer tagline",
    },
  ],
  "/legacy/revacity-services/index.html": [
    {
      key: "heroHeadingLine1",
      labelAr: "العنوان — السطر الأول",
      labelEn: "Heading — line 1",
    },
    {
      key: "heroHeadingLine2",
      labelAr: "العنوان — السطر الثاني",
      labelEn: "Heading — line 2",
    },
    {
      key: "heroSub",
      labelAr: "الوصف الفرعي",
      labelEn: "Hero subheading",
      multiline: true,
    },
    {
      key: "heroTagline",
      labelAr: "الشعار",
      labelEn: "Tagline",
    },
    {
      key: "reaasTagline",
      labelAr: "REaaS — الوصف",
      labelEn: "REaaS — tagline",
      multiline: true,
    },
    {
      key: "reaasWarrantSub",
      labelAr: "REaaS — نص الضمان الفرعي",
      labelEn: "REaaS — warrant subtext",
    },
    {
      key: "geaasTagline",
      labelAr: "GEaaS — الوصف",
      labelEn: "GEaaS — tagline",
      multiline: true,
    },
    {
      key: "geaasWarrantSub",
      labelAr: "GEaaS — نص الضمان الفرعي",
      labelEn: "GEaaS — warrant subtext",
    },
    {
      key: "dtdEyebrow",
      labelAr: "كيف تعمل — العبارة الافتتاحية",
      labelEn: "How it works — eyebrow",
    },
    {
      key: "dtdHeadline",
      labelAr: "كيف تعمل — العنوان",
      labelEn: "How it works — heading",
    },
    {
      key: "reaasIntroHeadline",
      labelAr: "REaaS — عنوان القسم",
      labelEn: "REaaS — section heading",
    },
    {
      key: "geaasIntroHeadline",
      labelAr: "GEaaS — عنوان القسم",
      labelEn: "GEaaS — section heading",
    },
    {
      key: "footerTagline",
      labelAr: "شعار التذييل",
      labelEn: "Footer tagline",
      multiline: true,
    },
  ],
  "/legacy/revacity-about/about.html": [
    { key: "heroHeading", labelAr: "العنوان الرئيسي", labelEn: "Hero heading" },
    {
      key: "heroSubtitle",
      labelAr: "العنوان الفرعي",
      labelEn: "Subtitle",
      multiline: true,
    },
    {
      key: "originLabel",
      labelAr: "تسمية صغيرة — الأصل",
      labelEn: "Small label — origin",
    },
    { key: "era1Name", labelAr: "الحقبة 1 — الاسم", labelEn: "Era 1 — name" },
    {
      key: "era1Body",
      labelAr: "الحقبة 1 — النص",
      labelEn: "Era 1 — text",
      multiline: true,
    },
    { key: "era2Name", labelAr: "الحقبة 2 — الاسم", labelEn: "Era 2 — name" },
    {
      key: "era2Body",
      labelAr: "الحقبة 2 — النص",
      labelEn: "Era 2 — text",
      multiline: true,
    },
    { key: "era3Name", labelAr: "الحقبة 3 — الاسم", labelEn: "Era 3 — name" },
    {
      key: "era3Body",
      labelAr: "الحقبة 3 — النص",
      labelEn: "Era 3 — text",
      multiline: true,
    },
    { key: "era4Name", labelAr: "الحقبة 4 — الاسم", labelEn: "Era 4 — name" },
    {
      key: "era4Body",
      labelAr: "الحقبة 4 — النص",
      labelEn: "Era 4 — text",
      multiline: true,
    },
    {
      key: "outroHeading",
      labelAr: "عنوان الختام 1",
      labelEn: "Closing heading 1",
      hintAr: "يفقد فاصل السطر عند تغييره.",
      hintEn: "Loses its line break if you replace it.",
    },
    {
      key: "outroBody",
      labelAr: "نص الختام 1",
      labelEn: "Closing text 1",
      multiline: true,
    },
    {
      key: "outroHeading2",
      labelAr: "عنوان الختام 2",
      labelEn: "Closing heading 2",
      hintAr: "يفقد فاصل السطر عند تغييره.",
      hintEn: "Loses its line break if you replace it.",
    },
    {
      key: "outroBody2",
      labelAr: "نص الختام 2",
      labelEn: "Closing text 2",
      multiline: true,
    },
    {
      key: "statelessLeftLabel",
      labelAr: "تسمية — الفلسفة",
      labelEn: "Label — philosophy",
    },
    {
      key: "statelessLeftHeading",
      labelAr: "عنوان — لسنا وكالة",
      labelEn: '"Not an agency" heading',
      multiline: true,
      hintAr: "يفقد التلوين وفواصل الأسطر الخاصة عند تغييره.",
      hintEn: "Loses its coloured highlight and line breaks if you replace it.",
    },
    {
      key: "statelessRightText",
      labelAr: "نص — بدون قوالب",
      labelEn: "Text — no templates",
      multiline: true,
    },
    {
      key: "veracityTitle",
      labelAr: "عنوان — Veracity",
      labelEn: "Veracity heading",
    },
    {
      key: "veracityIntro",
      labelAr: "نص — Veracity",
      labelEn: "Veracity intro text",
      multiline: true,
    },
    {
      key: "vr2Headline",
      labelAr: "عنوان — لسنا وكالة تسويق",
      labelEn: '"Not just an agency" headline',
    },
    {
      key: "vr2Subheading",
      labelAr: "نص فرعي — السوق",
      labelEn: "Subheading — market",
    },
    {
      key: "manifestoTitle",
      labelAr: "عنوان البيان",
      labelEn: "Manifesto title",
    },
    {
      key: "manifestoP1",
      labelAr: "البيان — الفقرة 1",
      labelEn: "Manifesto — paragraph 1",
      multiline: true,
    },
    {
      key: "manifestoP2",
      labelAr: "البيان — الفقرة 2",
      labelEn: "Manifesto — paragraph 2",
      multiline: true,
    },
    {
      key: "manifestoP3",
      labelAr: "البيان — الفقرة 3",
      labelEn: "Manifesto — paragraph 3",
      multiline: true,
    },
    {
      key: "manifestoQuote",
      labelAr: "اقتباس البيان",
      labelEn: "Manifesto quote",
      multiline: true,
    },
    {
      key: "manifestoRevenue",
      labelAr: "نص — موجهون بالإيراد",
      labelEn: "Revenue-oriented text",
      multiline: true,
    },
    {
      key: "manifestoUnfairGold",
      labelAr: "شعار — الجزء الذهبي",
      labelEn: "Banner — gold part",
    },
    {
      key: "manifestoUnfairPurple",
      labelAr: "شعار — الجزء البنفسجي",
      labelEn: "Banner — purple part",
    },
    {
      key: "visionText",
      labelAr: "نص الرؤية",
      labelEn: "Vision text",
      multiline: true,
    },
    {
      key: "missionText1",
      labelAr: "نص الرسالة 1",
      labelEn: "Mission text 1",
      multiline: true,
    },
    {
      key: "missionText2",
      labelAr: "نص الرسالة 2",
      labelEn: "Mission text 2",
      multiline: true,
    },
    {
      key: "methodologyLabel",
      labelAr: "تسمية — المنهجية",
      labelEn: "Label — methodology",
    },
    {
      key: "methodologyHeading",
      labelAr: "عنوان — المنهجية",
      labelEn: "Heading — methodology",
    },
    {
      key: "threeTierLabel",
      labelAr: "تسمية — الجودة",
      labelEn: "Label — quality",
    },
    {
      key: "threeTierHeading",
      labelAr: "عنوان — ثلاث مراحل",
      labelEn: "Heading — three tier",
      hintAr: "يفقد فاصل السطر عند تغييره.",
      hintEn: "Loses its line break if you replace it.",
    },
    {
      key: "threeTierSub",
      labelAr: "نص فرعي — ثلاث مراحل",
      labelEn: "Subtext — three tier",
    },
    {
      key: "stacklessTitle",
      labelAr: "عنوان — Stackless Stack",
      labelEn: "Stackless Stack heading",
      hintAr: "يفقد التلوين الخاص عند تغييره.",
      hintEn: "Loses its coloured highlight if you replace it.",
    },
    { key: "stacklessBridge", labelAr: "نص — الجسر", labelEn: "Bridge text" },
    {
      key: "hfLabel",
      labelAr: "تسمية — الإنسان أولاً",
      labelEn: "Label — human first",
    },
    {
      key: "hfTitle",
      labelAr: "عنوان — الإنسان أولاً",
      labelEn: "Heading — human first",
      hintAr: "يفقد فاصل السطر عند تغييره.",
      hintEn: "Loses its line break if you replace it.",
    },
    {
      key: "hfBody1",
      labelAr: "نص — الإنسان أولاً 1",
      labelEn: "Text — human first 1",
      multiline: true,
    },
    {
      key: "hfBody2",
      labelAr: "نص — الإنسان أولاً 2",
      labelEn: "Text — human first 2",
      multiline: true,
    },
    {
      key: "hfQuote",
      labelAr: "اقتباس — الإنسان أولاً",
      labelEn: "Quote — human first",
    },
    {
      key: "footerBrandTagline",
      labelAr: "شعار التذييل",
      labelEn: "Footer tagline",
      multiline: true,
    },
  ],
  "/legacy/revacity-the-agent/index.html": [
    {
      key: "heroHeading",
      labelAr: "عنوان القسم الرئيسي",
      labelEn: "Main heading",
    },
    {
      key: "agentLabel",
      labelAr: "تسمية الوكيل",
      labelEn: "Agent label",
    },
    {
      key: "formHeading",
      labelAr: "عنوان النموذج",
      labelEn: "Form heading",
      multiline: true,
    },
    {
      key: "footerTagline",
      labelAr: "شعار التذييل",
      labelEn: "Footer tagline",
    },
  ],
  "/legacy/revacity-glossary/index.html": [
    {
      key: "badgeTitle",
      labelAr: "عنوان الشارة",
      labelEn: "Badge title",
    },
    {
      key: "badgeTagline",
      labelAr: "شعار الشارة",
      labelEn: "Badge tagline",
    },
    {
      key: "termTitle",
      labelAr: "عنوان المصطلح",
      labelEn: "Term title",
    },
    {
      key: "termLead",
      labelAr: "نص تعريف المصطلح",
      labelEn: "Term lead text",
      multiline: true,
    },
    {
      key: "block1Title",
      labelAr: "عنوان القسم 1",
      labelEn: "Block 1 — title",
    },
    {
      key: "block1DefinitionText",
      labelAr: "نص التعريف",
      labelEn: "Block 1 — definition text",
      multiline: true,
    },
    {
      key: "block1SubtitleLabel",
      labelAr: "تسمية فرعية",
      labelEn: "Block 1 — subtitle label",
    },
    {
      key: "block2Title",
      labelAr: "عنوان القسم 2",
      labelEn: "Block 2 — title",
    },
    {
      key: "block2Intro",
      labelAr: "مقدمة القسم 2",
      labelEn: "Block 2 — intro text",
      multiline: true,
    },
    {
      key: "footerTagline",
      labelAr: "شعار التذييل",
      labelEn: "Footer tagline",
      multiline: true,
    },
  ],
  "/legacy/revacity-blog/index.html": [
    {
      key: "dispatchLabel",
      labelAr: "تسمية القسم",
      labelEn: "Section label",
    },
    {
      key: "dispatchTitle",
      labelAr: "عنوان القسم",
      labelEn: '"Where the industry breaks & rebuilds" heading',
      multiline: true,
    },
    {
      key: "emptyTitle",
      labelAr: "نص — لا توجد مقالات",
      labelEn: "Empty state — title",
    },
    {
      key: "emptySub",
      labelAr: "نص فرعي — لا توجد مقالات",
      labelEn: "Empty state — subtext",
    },
    {
      key: "footerTagline",
      labelAr: "شعار التذييل",
      labelEn: "Footer tagline",
      multiline: true,
    },
  ],
};

export function legacyEmbedSlotsFor(src: unknown): LegacyEmbedSlot[] {
  return typeof src === "string" ? (LEGACY_EMBED_SLOTS[src] ?? []) : [];
}
