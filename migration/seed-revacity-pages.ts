// migration/seed-revacity-pages.ts
//
// Builds the Revacity marketing site on this CMS: the sitewide theme, header
// and footer navigation, the media library rows for its images/videos,
// eleven `page` entries and eight `post` entries — all as ordinary editable
// block content, not hardcoded templates. Reproduces revacity-pages (the
// static HTML export this was built from): same page list, same copy, same
// information architecture. Bespoke per-page animation, canvas scroll
// effects and background audio from that export are NOT reproduced — every
// section here renders through this CMS's block system so text, images,
// videos and (via each block's "Section style" fields) background
// colour/video are all editable from the page editor afterwards.
//
// ENGLISH ONLY. revacity-pages has no Arabic copy to seed from; add Arabic
// translations from each page's editor when they're ready — the schema
// already supports it (see contentI18n in lib/db/schema.ts).
//
//   npx tsx --env-file=.env migration/seed-revacity-pages.ts --dry-run
//   npx tsx --env-file=.env migration/seed-revacity-pages.ts
//
// Requires the `page` and `post` content types to exist — i.e. run this
// AFTER visiting /setup once (see lib/setup/install.ts). Requires the actual
// files to already sit under public/uploads/revacity/ (they're checked into
// this repo, not uploaded by this script — this script only records them in
// the media_assets table so they show up in the admin's Media Library).
//
// IDEMPOTENT: re-running updates the same rows by slug/url rather than
// duplicating them.
import { and, eq, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import {
  content,
  contentI18n,
  contentTypes,
  navigation,
  navigationI18n,
  settings,
  users,
  mediaAssets,
} from "@/lib/db/schema";
import type { ContentBlock } from "@/lib/blocks/types";

const DRY_RUN = process.argv.includes("--dry-run");

interface PageSpec {
  slug: string;
  title: string;
  metaTitle?: string;
  metaDescription?: string;
  blocks: ContentBlock[];
}

interface PostSpec {
  slug: string;
  title: string;
  excerpt: string;
  blocks: ContentBlock[];
}

interface MediaAssetSpec {
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  width?: number;
  height?: number;
  altText?: string;
}

// ─── CONTENT ────────────────────────────────────────────────
// Generated from revacity-pages by migration tooling, then hand-reviewed.
// Edit here and re-run, or edit the pages themselves from the CMS admin —
// both work; this file is not read again after the first successful run
// unless you explicitly re-run it.
//
// Typed as PageSpec[]/PostSpec[] directly (no cast): every block literal
// below is checked against the real ContentBlock union at compile time, so a
// typo in a block's shape is a build error here, not a blank section on the
// live page.

const PAGES: PageSpec[] = [
  {
    slug: "home",
    title: "Home",
    metaTitle: "Revacity | Human-First AI Marketing & Revenue Engineering",
    metaDescription:
      "Revacity is a Stateless Outcome Engineering Practice. We sign Revenue Warrants, not contracts — and get paid when you collect money.",
    blocks: [
      {
        type: "custom",
        component: "legacy-page-embed",
        props: {
          src: "/legacy/revacity-home/index-full.html",
          overrides: {
            heroEyebrow:
              "“Are you here to <u>Compete</u>, or to <u>Dominate</u>?”",
            heroHeading:
              'Are you Here for a <a class="u-word" href="/en/services" target="_top">Reason</a> or <a class="u-word" href="/en/the-agent" target="_top">Reasoning</a>?',
            originEyebrow: "The Industry in 2026",
            originHeading: "Five Systemic Failures",
            originDetail:
              "In the first fraction of a second, energy became matter. What began as pure light would, in time, become stars, planets, and everything that has ever wondered about them.",
            nebulaEyebrow: "COMPETITIVE LANDSCAPE",
            nebulaHeading: "What We Replace",
            nebulaFooter:
              'We are none of these. We are a <span class="highlight-purple">Stateless Outcome Engineering Practice</span> that signs behind revenue outcomes with our own money on the line.',
            galaxyEyebrow: "CLARITY THROUGH NEGATION",
            galaxyHeading: "What We Are Not.",
            galaxyNegationFooter:
              'We are a <span class="text-purple">Revenue and Growth Engineering Practice</span> that gets paid <span class="text-yellow">when you collect money.</span>',
            voyageEyebrow: "LINGUISTIC ARCHITECTURE",
            voyageHeading:
              'Words Matter. We <span class="highlight-red">Replaced</span> Yours.',
            horizonEyebrow: "REVENUE TOPOLOGY",
            horizonHeading:
              'Not a <span class="strike-funnel">Funnel</span>. A Fluid Revenue Topology.',
            horizonTopologyFootnote:
              "Multi-entry, multi-exit. The topology adapts to the customer’s meaning-state, not the other way around.",
            singularityEyebrow: "THE AUTOPSY",
            singularityHeading: "BROKEN MODELS. ONE REALITY.",
            singularityDyingBadge: "WHY YOUR CURRENT AGENCY IS DYING.",
            infinityHeading: "Book the Diagnostic.",
            infinityDiagBanner:
              'We don’t sell services. We sell <span class="purple-glow-text">financial certainty.</span>',
            infinitySkepticTitle: "Still skeptical?",
            infinitySkepticDesc: "Good. Skeptics make the best clients.",
            infinityCompareText:
              "Compare us with others<br>so you can know more",
          },
        },
      },
    ],
  },
  {
    slug: "about",
    title: "About",
    metaTitle: "REVacity | About",
    metaDescription:
      "Eighteen years in the trenches of retail, e-commerce, FMCG and hospitality — built into a human-first AI marketing and growth engineering practice.",
    blocks: [
      {
        type: "custom",
        component: "revacity-about-engine",
        props: {
          src: "/legacy/revacity-about/about.html",
          overrides: {
            heroHeading: "How We Got Here.",
            heroSubtitle:
              "Living, human-first, Zero-legacy, Dynamic knowledge graph, Stackless stack (JIT learning), Metacognition agency, following stateless outcome engineering practice specialized in marketing and Ai intelligence",
            originLabel: "The Origin",
            era1Name: "The Foundation",
            era1Body:
              "Eighteen years in the trenches. Not in agencies — in the businesses themselves. Retail, e-commerce, FMCG, hospitality.",
            era2Name: "The Realization",
            era2Body:
              "The industry kept getting louder and less useful. More tools, more platforms, more acronyms — and less revenue.",
            era3Name: "The Frontier",
            era3Body:
              "AI changed the game — not because it replaced humans, but because it amplified the gap between good and bad operators.",
            era4Name: "REVacity",
            era4Body:
              "Built from Aqaba, Jordan. Revenue Warrants instead of contracts. Sovereign Architects instead of account managers.",
            outroHeading: "Frontier Revenue & Growth Engineering Practice",
            outroBody:
              "REVacity is a living, human-first agency that has fully embraced and converged with Modern, Hyper, and Intelligence marketing — specialized in Marketing 7.0 — integrated with the latest AI practices. We harness AI for collective human intelligence and metacognition, embedded across every node of the commercial stack to generate beyond-ordinary outcomes and guaranteed results.",
            outroHeading2: "A gifted Revenue and Growth Intelligence agency.",
            outroBody2:
              "We harness the power of AI for Collective Human Intelligence and Metacognition (AI-Co-pilot Mastery), embedding it across every node of the commercial stack Generated Beyond ordinary Outcomes.",
            statelessLeftLabel: "Philosophy /",
            statelessLeftHeading:
              "WE ARE NOT AN AGENCY. WE ARE A STATELESS OUTCOME ENGINEERING PRACTICE.",
            statelessRightText:
              "No frameworks. No templates. No pre-packaged solutions. Every engagement is a first-time build — because your reality hasn't been engineered yet.",
            veracityTitle: "REVacity Is Veracity, Rotated.",
            veracityIntro:
              "We took the oldest word in business — truth — and turned its first three letters into Rev: revenue, the engine revving, the revolution against legacy. What's left is a name that carries its philosophy in its spelling.",
            vr2Headline: 'We are not just another "digital marketing agency."',
            vr2Subheading:
              "We Know The market is flooded with execution-only shops.",
            manifestoTitle: "Our Manifesto",
            manifestoP1:
              "The AI scene today is overwhelming everyone with daily if not hourly hype trains, each with its own set of new concepts and updated terminology.",
            manifestoP2:
              'It is hard to tell apart real signals from the misleading noise. Enterprises are selling fluff with the goal of looking trendy instead of truthful, and are spending more effort attracting instead of solving problems. Clients chase these buzzwords, and ignore the fact that they were sold "trends" with no actual truth to them.',
            manifestoP3:
              "Narrowing your pains or goals to fit one of the pre-packaged common, trendy terms is not just lazy—it's malpractice. We believe that clients are looking for clear outputs, specifically one of two things: increasing revenue or customer acquisition. We also believe there is no one-size-fits-all solution for everyone.",
            manifestoQuote:
              "If its Generative, if its intelligence, Curated and engineered only for you....How come it have a name !!?",
            manifestoRevenue:
              "We are revenue oriented and output driven - the only numbers both we and our clients like to check are our bank accounts.",
            manifestoUnfairGold: "WE ARE THE UNFAIR",
            manifestoUnfairPurple: "CHOICE FOR YOUR COMPETITORS",
            visionText:
              'Elevating business from "Managing Complexity" to "Architected Intelligence", transforming market noise into the clarity of Guranteed Revenue& Growth through a self-evolving Cognitive-Contextual-Aware-Engineered Ecosystem, We look to Act as Ai, Modern marketing Boutique.',
            missionText1:
              'The Differentiation: They manage "Traffic" and "Funnels"; We engineer "Cognition" and "Novel Outcomes". We operationalize Human-Machine Teaming For ROI Elevation Not only Optimization, fusing Predictive Intelligence with Data-Profit Driven Creativity to ensure every interaction is a verified step toward Revenue, Acquisition, Activation, and Retention (RAAR)',
            missionText2:
              "Our Industry is dynamic; So we are, We are driven by the desired and targeted outcomes and Values, Not based on our capabilities or prior skills or even the massive experience. Same As we are not a Development House, or Agents market place, we are Not Digital marketing and content Generation agency, If there is a tool or a solution for it, Does not converge with (Value-Time-Budget) Its clear stupidity to build it. that's why we are Human-First Ai agency, Moving From Hand to Mind (Click become Intent), and we are here to make it action",
            methodologyLabel: "The Methodology",
            methodologyHeading: "How We Think",
            threeTierLabel: "Quality Architecture",
            threeTierHeading: "THREE-TIER EVALUATION.",
            threeTierSub:
              "Every output passes three gates before it earns the Revacity seal.",
            stacklessTitle: "The Stackless Stack",
            stacklessBridge: "The DKG is the bridge.",
            hfLabel: "Human First",
            hfTitle: "Authenticity Beats AI Hype.",
            hfBody1:
              "We use AI. We're not Luddites. But we use it as a tool, not a replacement for thinking. Our stack is neuro-symbolic: deterministic models where precision matters, non-deterministic models where creativity matters. The human is always in the loop. The human makes the call. The human owns the outcome.",
            hfBody2:
              "Every \"AI agency\" is selling you the dream of doing less. We're selling you the reality of achieving more. There's a difference, and it's measured in revenue.",
            hfQuote:
              "The only AI we trust is the one that makes us more human, not less.",
            footerBrandTagline:
              "Observability platforms and autonomous orchestration frameworks for high-fidelity agentic systems.",
          },
        },
      },
    ],
  },
  {
    slug: "services",
    title: "Services",
    metaTitle: "Services | Revacity",
    metaDescription:
      "Two services, one philosophy: Revenue Engineering as a Service (REaaS) and Growth Engineering as a Service (GEaaS).",
    blocks: [
      {
        type: "custom",
        component: "legacy-page-embed",
        props: {
          src: "/legacy/revacity-services/index.html",
          overrides: {
            heroHeadingLine1: "WE SELL OUTCOMES.",
            heroHeadingLine2: "NOT SLIDE DECKS.",
            heroSub:
              "Two services. One philosophy. Zero legacy. Every engagement is built from first principles for your specific revenue reality.",
            heroTagline: "More Revenue. Or More Customers.",
            reaasTagline:
              "The plumbing of money. When your revenue system has leaks — pricing mismatches, promotion cannibalization, inventory mistiming, channel conflict — we engineer the fix.",
            reaasWarrantSub:
              "For brands with existing revenue that needs velocity.",
            geaasTagline:
              "Momentum of ecosystems. When your business is able but stagnant — or growing but not compounding — we engineer the growth loops the market hasn't seen before.",
            geaasWarrantSub:
              "For brands that need something that doesn't exist yet.",
            dtdEyebrow: "HOW IT WORKS",
            dtdHeadline: "From Diagnostic to Dividend.",
            reaasIntroHeadline: "REaaS — the plumbing of money.",
            geaasIntroHeadline: "GEaaS — the momentum of ecosystems.",
            footerTagline:
              "Observability platforms and autonomous orchestration frameworks for high-fidelity agentic systems.",
          },
        },
      },
    ],
  },
  {
    slug: "the-agent",
    title: "The Agent",
    metaTitle: "The Agent | Revacity",
    metaDescription:
      "Select your pain or wished gain. Talk to the Revacity agent and hear back within 48–72 hours.",
    blocks: [
      {
        type: "custom",
        component: "legacy-page-embed",
        props: {
          src: "/legacy/revacity-the-agent/index.html",
          overrides: {
            heroHeading: "Select your pain or wished gain",
            agentLabel: "The Agent",
            formHeading:
              "We are on it, Fill the below details and you will hear from us in the next 48-72 hours",
            footerTagline:
              "Observability platforms and autonomous orchestration frameworks for high-fidelity agentic systems.",
          },
        },
      },
    ],
  },
  {
    slug: "compare",
    title: "Compare",
    metaTitle: "Compare | Revacity",
    metaDescription:
      "Comparing how we do things is easier than explaining it. Choose the Warrant, the Challenge, or bring your own agency.",
    blocks: [
      {
        type: "custom",
        component: "legacy-page-embed",
        props: {
          src: "/legacy/revacity-compare/index.html",
          overrides: {
            heroHeading: "You are where we want you to be",
            heroSubtitle:
              "Comparing how we do things and what we deliver is way easier than explaining it, choose your way — we are open:",
            heroSub2:
              "Choose your own way, as we have 3, and yes we are that's much confident",
            wcH1Line1: "We don't sign contracts.",
            wcH1Line2: "We sign revenue warrants.",
            wcCellLabel1: "Our fee is tied to your outcome",
            wcCellBody1:
              "If the revenue doesn't materialize, we don't get paid. This isn't a gimmick — it's the only model that makes sense for reality engineering.",
            wcCellLabel2: "Our pricing is tied to your outcome",
            wcCellBody2:
              "If we don't generate revenue, or the agreed Growth metrics, we don't get paid. That's not expensive — that's the only honest model.",
            wcQuestionQ1: "The real question is",
            wcQuestionQ2:
              "how much is your current agency costing you in missed revenue?",
            wcColTitle1: "Traditional Contract",
            wcColSub1: "What you're used to. What you're tired of.",
            wcColTitle2: "Revenue Warrant",
            wcColSub2: "What we invented. What you deserve.",
            wcMsHeading: "What if you don't hit the milestones?",
            wcMsBold: "Then we don't get paid. It's that simple.",
            wcMsBody1:
              "The Revenue Warrant is structured so that our compensation is a function of your success. If we miss a milestone, the warrant terms are clear: we either re-engineer at our cost until we hit it, or we part ways with no exit penalty and no hard feelings.",
            wcMsBody2:
              "We've never had to exercise the exit clause. But it's there because trust is built on transparency, not on promises.",
            wcHowLabel: "How we get paid",
            wcHowBody:
              "Traditional agencies sign you to 12-month retainers and pray. We sign Revenue Warrants — binding commitments tied to specific, measurable revenue outcomes. Our fee is a function of your success. If the signal doesn't convert to your bank account, we don't eat.",
            wcIntegrityText:
              "If we don't deliver what we warrant, you don't pay. No fine print. No caveats. Just engineering integrity.",
            ccTitle: "How the Challenge Works",
            ccClosingHeadline:
              "That's it— No complexity. No escape clauses. Just accountability..",
            ccClosingSub:
              "We will compete head-to-head against your current agency, consultancy, or internal team. Same brief. Same data. Same timeline. Independent evaluation. Only metric: revenue impact.",
            acTitle: "How this work:",
            acAccentBright: "Service to service, not agent to agent",
            acAccentDim: "It's not an Automated or off-the-shelf process",
            acAccentSub: "We need access or data from your side",
            footerTagline:
              "Observability platforms and autonomous orchestration frameworks for high-fidelity agentic systems.",
          },
        },
      },
    ],
  },
  {
    slug: "glossary",
    title: "Glossary",
    metaTitle: "Glossary | Revacity",
    metaDescription:
      "Concepts, frameworks and terms from the AI-marketing frontier, defined in plain language.",
    blocks: [
      {
        type: "custom",
        component: "legacy-page-embed",
        props: {
          src: "/legacy/revacity-glossary/index.html",
          overrides: {
            badgeTitle: "Glossary",
            badgeTagline: "For terms and hypes lover :",
            termTitle: 'the "X-Shaped" Marketer',
            termLead:
              'is defined as an Integrator and Connective Leader rather than just a subject matter expert. While previous models (like T-shaped) focused on balancing specialized skills with general knowledge, the X-Shaped profile has emerged in response to an AI-saturated landscape. In a world where AI can generate specialized outputs (code, copy, data analysis) instantly, the human value has shifted from "doing the work" to "connecting the domains."',
            block1Title: "1. Definition & Scope of the X-Shaped Marketer",
            block1DefinitionText:
              'Definition: An X-shaped marketer is a cross-functional orchestrator who bridges the gaps between siloed departments—typically connecting Strategy, Creativity, Technology, and Data. The "X" represents the convergence of these diverse disciplines into a central point of leadership and synthesis.',
            block1SubtitleLabel: "Scope & Core Focus:",
            block2Title: "2. Differences with Other Marketer Profiles",
            block2Intro:
              "The primary difference is that X-shaped marketers are valued for leadership and connection, whereas other profiles are valued for execution and knowledge depth.",
            footerTagline:
              "Observability platforms and autonomous orchestration frameworks for high-fidelity agentic systems.",
          },
        },
      },
    ],
  },
  {
    slug: "our-architecture",
    title: "Our Architecture",
    metaTitle: "Our Architecture | Revacity",
    metaDescription:
      "Neuro-symbolic, human-first, zero-legacy — the architecture behind every warranted engagement.",
    blocks: [
      {
        type: "custom",
        component: "legacy-page-embed",
        props: {
          src: "/legacy/revacity-our-architecture/index.html",
          overrides: {
            heroHeading: "Our Architecture",
            agentStackLabel: "THE AGENT STACK",
            agentStackTitle: "See → Decide → Execute → Learn",
            ciLabel: "OUTCOME ENGINEERING",
            ciHeading: "Eight Dimensions. One Outcome.",
            ciSublayersTitle:
              "Every warranted engagement is engineered across these eight dimensions simultaneously.",
            ciBannerText:
              "These are not departments. They are engineering surfaces. Every dimension is addressed in every engagement — not siloed, not sequential.",
            footerTagline:
              "Observability platforms and autonomous orchestration frameworks for high-fidelity agentic systems.",
          },
        },
      },
    ],
  },
  {
    slug: "before-judging-us",
    title: "Before Judging Us",
    metaTitle: "Before Judging Us | Revacity",
    metaDescription:
      "Our bizarre facts, our market read, and why we’d rather be honest than impressive.",
    blocks: [
      {
        type: "custom",
        component: "legacy-page-embed",
        props: {
          src: "/legacy/revacity-before-judging-us/index.html",
          overrides: {
            heroHeading: "Before Judging Us",
            colLeftTitle: "Our Bizarre Facts",
            colRightTitle: "The Market:",
            purposeBlueTitle: "Dont Forget The First Purpose of Ai:",
            purposeLead:
              "The Ai is weren't created to help us in life, and let us do our work easier!",
            purposeText:
              "It's here to generate more money, for Continuous innovation, transforming Complexity to Context, Data to Decision, Decision to Money, Money to intelligence, then starting over again",
            skepticalTitle: "Still skeptical?",
            skepticalSubtitle: "Good. Skeptics make the best clients.",
            footerTagline:
              "Observability platforms and autonomous orchestration frameworks for high-fidelity agentic systems.",
          },
        },
      },
    ],
  },
  {
    slug: "100k-challenge",
    title: "The $100K Challenge",
    metaTitle: "The $100K Challenge | Revacity",
    metaDescription:
      "Get this in cash if you prove it. We are the unfair choice for your competitors.",
    blocks: [
      {
        type: "custom",
        component: "legacy-page-embed",
        props: {
          src: "/legacy/revacity-100k-challenge/index.html",
          overrides: {
            heroHeadingLine1: "Call Us",
            heroHeadingLine2: "what you want",
            challengeTitle: "The $100K challenge",
            challengeSub: "Think You Don't Need Us?",
            challengeActionText: "Get this in cash if you proof it",
            callUsDesc:
              "Crazy, Bold, arrogant. Disagree with many ideas and concepts. But there is one Fact we can't ignore: If it is efficient and getting the desired results, Then Why Not?",
            skepticalTitle: "Still skeptical?",
            skepticalText: "Good. Skeptics make the best clients.",
            tabLeftHeading: "WE MIGHT NOT BE THE ONLY ONE",
            tabLeftText: "We are the Unfair Choice for your competitors.",
            tabRightHeading: "WHY YOUR CURRENT AGENCY IS DYING.",
            tabRightText: "THE LEGACY ROAST",
            footerTagline:
              "Observability platforms and autonomous orchestration frameworks for high-fidelity agentic systems.",
          },
        },
      },
    ],
  },
  {
    slug: "start-a-warrant",
    title: "Start a Warrant",
    metaTitle: "Start a Warrant | Revacity",
    metaDescription:
      "We don’t sign contracts. We sign Revenue Warrants — a specific number, a specific timeline, no pay if we don’t deliver.",
    blocks: [
      {
        type: "custom",
        component: "legacy-page-embed",
        props: {
          src: "/legacy/revacity-start-a-warrant/index.html",
          overrides: {
            heroHeadingLine1: "We don't sign contracts.",
            heroHeadingLine2: "We sign warrants.",
            heroSubtitle:
              "A Revenue Warrant is not a contract. It is a signed commitment to a specific revenue outcome — with a specific number, a specific timeline, and a specific consequence if we don't deliver. If the revenue doesn't materialize, we don't get paid. No escape clauses. No scope-change fees. No \"market conditions\" excuses.",
            heroSubtitle2:
              "This isn't a gimmick. This is the only model that makes sense when you're engineering reality, not shipping deliverables. We're so careful about who we take on because our money is on the line too.",
            econEyebrow: "Engagement Economics",
            econTitle: "How the Warrant Works.",
            audienceEyebrow: "Audience & Scope",
            audienceTitle: "Who We Serve",
            wvcTitle: "Warrants vs. Contracts.",
            qgateLine1: "This is not a contact form.",
            qgateLine2: "It's a qualification gate.",
            qgateSubtitle:
              "We don't work with everyone. Not because we're elitist — because we sign Revenue Warrants. If we can't guarantee the outcome, we don't take the engagement. Start by telling us your posture.",
            wwoEyebrow: "Where We Operate",
            wwoTitle: "RETAIL. ECOMMERCE. NOTHING ELSE.",
            wwoDesc:
              "We only work with retail and ecommerce. We don't do B2B SaaS. We don't do fintech. We know our lane and we own it.",
            solutionsEyebrow: "Solutions We've Built",
            footerTagline:
              "Observability platforms and autonomous orchestration frameworks for high-fidelity agentic systems.",
          },
        },
      },
    ],
  },
  {
    slug: "start-audit",
    title: "Start Audit",
    metaTitle: "Start Audit | Revacity",
    metaDescription:
      "We don’t audit to impress. We audit to expose. Book the diagnostic.",
    blocks: [
      {
        type: "custom",
        component: "legacy-page-embed",
        props: {
          src: "/legacy/revacity-start-audit/index.html",
          overrides: {
            heroEyebrow: "The Diagnostic",
            heroHeadingLine1: "We don't audit to",
            heroHeadingLine2: "impress.",
            heroSubhead:
              "Every engagement starts with an audit. No exceptions.",
            heroBody:
              "Every engagement starts with a diagnostic. Not a sales pitch disguised as a consultation. An actual forensic examination of your revenue reality. If we can't find a problem worth solving, we'll tell you.",
            processEyebrow: "The Process",
            processTitle: "How the audit works.",
            auditTypesTitle: "Each designed to surface what's hidden.",
            closingTitle: "What makes our audits different.",
            closingBody1:
              'Most agency "audits" are sales tools. They find just enough problems to justify a retainer, but not enough to actually solve anything. Ours are the opposite.',
            closingBody2:
              "We audit to expose the full picture — even the parts that don't lead to an engagement with us. If the problem is your team, we'll say so. If the problem is your product, we'll say so. If the problem doesn't exist, we'll say that too.",
            closingStatement:
              "The diagnostic is the first test of trust. If we can't be honest here, why would you trust us with your revenue?",
            footerTagline:
              "Observability platforms and autonomous orchestration frameworks for high-fidelity agentic systems.",
          },
        },
      },
    ],
  },
  {
    slug: "blog",
    title: "Intelligence Dispatches",
    metaTitle: "REVacity | Intelligence Dispatches — Blog",
    metaDescription:
      "REVacity's intelligence blog: contrarian takes on AI shifts, human-machine dynamics, and the versioning world. AEO, GEO, and SEO engineered.",
    blocks: [
      {
        type: "custom",
        component: "legacy-page-embed",
        props: {
          src: "/legacy/revacity-blog/index.html",
          overrides: {
            dispatchLabel: "Intelligence Dispatches",
            dispatchTitle: "Where the industry breaks & rebuilds.",
            emptyTitle: "No dispatches in this filter yet.",
            emptySub: "Check back on the next 72-hour cycle.",
            footerTagline:
              "Observability platforms and autonomous orchestration frameworks for high-fidelity agentic systems.",
          },
        },
      },
    ],
  },
];

const POSTS: PostSpec[] = [
  {
    slug: "uncanny-valley-of-sales-automation",
    title:
      "The “Uncanny Valley” of Sales Automation — Why Near-Human AI Destroys Trust",
    excerpt:
      "When AI agents are realistic enough to appear human but flawed enough to trigger distrust, conversion collapses. 78% of buyers view 100% AI outreach as inauthentic.",
    // No body yet: the legacy export only carried the headline and
    // excerpt shown on the blog index (see the file header). Empty
    // renders nothing, rather than a duplicate of the excerpt above plus
    // an internal migration note that was never meant to be public —
    // write the real article here from the page editor.
    blocks: [] as ContentBlock[],
  },
  {
    slug: "ai-slop-fatigue",
    title:
      "AI Slop Fatigue: Why Buyers Are Ghosting “Perfect” Outreach in 2026",
    excerpt:
      "Flawlessly written, soullessly generic. The outreach hack that worked in 2024 is now actively damaging your pipeline.",
    // No body yet: the legacy export only carried the headline and
    // excerpt shown on the blog index (see the file header). Empty
    // renders nothing, rather than a duplicate of the excerpt above plus
    // an internal migration note that was never meant to be public —
    // write the real article here from the page editor.
    blocks: [] as ContentBlock[],
  },
  {
    slug: "human-in-the-loop-revenue-architecture",
    title:
      "Human-in-the-Loop Is Not a Compromise — It Is the Revenue Architecture",
    excerpt:
      "The organisations hitting targets in 2026 kept humans in the decision loop deliberately. Not as a fallback — as a structural advantage.",
    // No body yet: the legacy export only carried the headline and
    // excerpt shown on the blog index (see the file header). Empty
    // renders nothing, rather than a duplicate of the excerpt above plus
    // an internal migration note that was never meant to be public —
    // write the real article here from the page editor.
    blocks: [] as ContentBlock[],
  },
  {
    slug: "human-is-the-premium-asset",
    title: "“Human” Is the Premium Asset — The Luxury of Inefficiency in 2026",
    excerpt:
      "The very flaws that define human existence — our need to sleep, our emotional volatility — have become the ultimate luxury good in an automated world.",
    // No body yet: the legacy export only carried the headline and
    // excerpt shown on the blog index (see the file header). Empty
    // renders nothing, rather than a duplicate of the excerpt above plus
    // an internal migration note that was never meant to be public —
    // write the real article here from the page editor.
    blocks: [] as ContentBlock[],
  },
  {
    slug: "ideas-ai-cannot-generate",
    title: "Techniques for Producing Ideas That AI Cannot Generate for You",
    excerpt:
      "In a world where AI generates 1,000 ideas in seconds, producing one genuinely novel idea is the rarest market skill. Here is the method that still works.",
    // No body yet: the legacy export only carried the headline and
    // excerpt shown on the blog index (see the file header). Empty
    // renders nothing, rather than a duplicate of the excerpt above plus
    // an internal migration note that was never meant to be public —
    // write the real article here from the page editor.
    blocks: [] as ContentBlock[],
  },
  {
    slug: "where-automation-destroys-revenue",
    title:
      "Where Machines Should Be Left Alone — And Where Automation Destroys Revenue",
    excerpt:
      "The agencies outperforming in 2026 did not automate the most. They automated the right things. The line is more precise than most admit.",
    // No body yet: the legacy export only carried the headline and
    // excerpt shown on the blog index (see the file header). Empty
    // renders nothing, rather than a duplicate of the excerpt above plus
    // an internal migration note that was never meant to be public —
    // write the real article here from the page editor.
    blocks: [] as ContentBlock[],
  },
  {
    slug: "china-vs-us-ai-war",
    title:
      "China vs. US: The AI War That Is Deciding Your Agency’s Relevance in 2026",
    excerpt:
      "Qwen-3 matches GPT-4o on revenue tasks at a fraction of the cost. Anthropic dominates agentic workflows. Nvidia holds the real moat. What the player map means for how you build.",
    // No body yet: the legacy export only carried the headline and
    // excerpt shown on the blog index (see the file header). Empty
    // renders nothing, rather than a duplicate of the excerpt above plus
    // an internal migration note that was never meant to be public —
    // write the real article here from the page editor.
    blocks: [] as ContentBlock[],
  },
  {
    slug: "price-as-a-brand-idea",
    title: "Price as a Brand Idea: Strategic Positioning Beyond Cost in 2026",
    excerpt:
      "Price is not a number. It is a statement about who you are and who your customer is. The brands winning in 2026 know this — most are leaving it completely unexplored.",
    // No body yet: the legacy export only carried the headline and
    // excerpt shown on the blog index (see the file header). Empty
    // renders nothing, rather than a duplicate of the excerpt above plus
    // an internal migration note that was never meant to be public —
    // write the real article here from the page editor.
    blocks: [] as ContentBlock[],
  },
];

const HEADER_NAV = [
  {
    label: "Home",
    path: "",
  },
  {
    label: "About Us",
    path: "about",
  },
  {
    label: "Services",
    path: "services",
  },
  {
    label: "Before Judging",
    path: "before-judging-us",
  },
  {
    label: "Compare",
    path: "compare",
  },
  {
    label: "Blog",
    path: "blog",
  },
  {
    label: "Start a Warrant",
    path: "start-a-warrant",
  },
] as const;

const FOOTER_NAV = [
  {
    label: "The Agent",
    path: "the-agent",
  },
  {
    label: "Our Architecture",
    path: "our-architecture",
  },
  {
    label: "Glossary",
    path: "glossary",
  },
  {
    label: "Start Audit",
    path: "start-audit",
  },
  {
    label: "$100K Challenge",
    path: "100k-challenge",
  },
] as const;

/**
 * The images and videos these pages reference, copied into
 * public/uploads/revacity/ alongside this script. Recorded here so they show
 * up in the admin's Media Library, not just as bare URLs inside block JSON.
 */
const MEDIA_ASSETS: MediaAssetSpec[] = [
  {
    filename: "revacity/logo-new.png",
    originalName: "logo-new.png",
    mimeType: "image/png",
    size: 9620,
    url: "/uploads/revacity/logo-new.png",
    width: 401,
    height: 126,
    altText: "Revacity logo",
  },
  {
    filename: "revacity/revacity-wordmark.png",
    originalName: "REVacity.png",
    mimeType: "image/png",
    size: 24772,
    url: "/uploads/revacity/revacity-wordmark.png",
    width: 746,
    height: 231,
    altText: "REVacity wordmark",
  },
  {
    filename: "revacity/home-hero-collapse-loop.mp4",
    originalName: "clps-loop.mp4",
    mimeType: "video/mp4",
    size: 935303,
    url: "/uploads/revacity/home-hero-collapse-loop.mp4",
    altText: "Home hero background loop",
  },
  {
    filename: "revacity/home-hero-poster.jpg",
    originalName: "home-hero-poster.jpg",
    mimeType: "image/jpeg",
    size: 79306,
    url: "/uploads/revacity/home-hero-poster.jpg",
    width: 1280,
    height: 720,
    altText: "Home hero poster frame",
  },
  {
    filename: "revacity/agent-hero.mp4",
    originalName: "Media1.mp4",
    mimeType: "video/mp4",
    size: 1487491,
    url: "/uploads/revacity/agent-hero.mp4",
    altText: "The Agent hero background video",
  },
  {
    filename: "revacity/agent-hero-poster.jpg",
    originalName: "agent-hero-poster.jpg",
    mimeType: "image/jpeg",
    size: 144649,
    url: "/uploads/revacity/agent-hero-poster.jpg",
    width: 1920,
    height: 1080,
    altText: "The Agent hero poster frame",
  },
  {
    filename: "revacity/compare-hero.mp4",
    originalName: "compare.mp4",
    mimeType: "video/mp4",
    size: 1503510,
    url: "/uploads/revacity/compare-hero.mp4",
    altText: "Compare hero background video",
  },
  {
    filename: "revacity/compare-hero-poster.jpg",
    originalName: "compare-hero-poster.jpg",
    mimeType: "image/jpeg",
    size: 19330,
    url: "/uploads/revacity/compare-hero-poster.jpg",
    width: 512,
    height: 640,
    altText: "Compare hero poster frame",
  },
  {
    filename: "revacity/100k-challenge.png",
    originalName: "100k.png",
    mimeType: "image/png",
    size: 7665,
    url: "/uploads/revacity/100k-challenge.png",
    width: 156,
    height: 109,
    altText: "$100K Challenge",
  },
  {
    filename: "revacity/before-judging-brain.png",
    originalName: "brain.png",
    mimeType: "image/png",
    size: 57959,
    url: "/uploads/revacity/before-judging-brain.png",
    width: 242,
    height: 497,
    altText: "Brain",
  },
  {
    filename: "revacity/before-judging-monkey.png",
    originalName: "monkey.png",
    mimeType: "image/png",
    size: 43693,
    url: "/uploads/revacity/before-judging-monkey.png",
    width: 251,
    height: 356,
    altText: "Monkey",
  },
  {
    filename: "revacity/before-judging-frog.png",
    originalName: "frog.png",
    mimeType: "image/png",
    size: 23220,
    url: "/uploads/revacity/before-judging-frog.png",
    width: 362,
    height: 365,
    altText: "Frog",
  },
  {
    filename: "revacity/agent-ring.png",
    originalName: "agent.png",
    mimeType: "image/png",
    size: 84421,
    url: "/uploads/revacity/agent-ring.png",
    width: 444,
    height: 562,
    altText: "The Revacity spiral",
  },
];

/**
 * Revacity's palette, read off revacity-pages/style.css's CSS custom
 * properties (--pink #e63888, --purple #9b5de5, --gold #f4a135,
 * --bg #0a0315) and mapped onto the CMS's role-named slots. The brand is
 * dark by design — there is no separate light variant — so these are set as
 * the LIGHT theme (the only one) with themeMode left at its default; a
 * visitor's device preference does not change anything, which is correct
 * for a single-look brand.
 */
const THEME = {
  accent: "#9b5de5",
  "accent-hover": "#b47ff0",
  "accent-ink": "#ffffff",
  surface: "#0a0315",
  "surface-raised": "#160b2b",
  "surface-inverted": "#12081f",
  line: "#2a1f42",
  ink: "#ffffff",
  "ink-muted": "#a99fc9",
  "ink-inverted": "#0a0315",
  success: "#15803d",
  warning: "#f4a135",
  danger: "#e63888",
  price: "#ffffff",
  "price-sale": "#e63888",
  "in-stock": "#15803d",
  "out-of-stock": "#e63888",
  radius: "12px",
};

const report = {
  pages: [] as { slug: string; action: string; blocks: number }[],
  posts: [] as { slug: string; action: string }[],
  navigation: { header: 0, footer: 0 },
  media: { created: 0, skipped: 0 },
  warnings: [] as string[],
};

// ─── WRITE ──────────────────────────────────────────────────

async function typeId(slug: "page" | "post"): Promise<string> {
  const [row] = await db
    .select({ id: contentTypes.id })
    .from(contentTypes)
    .where(eq(contentTypes.slug, slug))
    .limit(1);
  if (!row) {
    throw new Error(
      `The built-in \`${slug}\` content type is missing. Visit /setup once, then re-run this script.`,
    );
  }
  return row.id;
}

async function upsertContent(
  typeIdValue: string,
  slug: string,
  title: string,
  blocks: ContentBlock[],
  authorId: string | null,
  extra: {
    excerpt?: string;
    metaTitle?: string;
    metaDescription?: string;
  } = {},
): Promise<"created" | "updated"> {
  const [existing] = await db
    .select({ id: content.id })
    .from(content)
    .where(and(eq(content.typeId, typeIdValue), eq(content.slug, slug)))
    .limit(1);

  let contentId: string;
  let action: "created" | "updated";

  if (existing) {
    contentId = existing.id;
    action = "updated";
    await db
      .update(content)
      .set({ status: "published", updatedAt: new Date() })
      .where(eq(content.id, contentId));
  } else {
    action = "created";
    const [created] = await db
      .insert(content)
      .values({
        typeId: typeIdValue,
        slug,
        authorId,
        status: "published",
        publishedAt: new Date(),
      })
      .returning({ id: content.id });
    if (!created) throw new Error(`Failed to create content row for ${slug}`);
    contentId = created.id;
  }

  await db
    .insert(contentI18n)
    .values({
      contentId,
      locale: "en",
      title,
      excerpt: extra.excerpt ?? null,
      body: blocks,
      metaTitle: extra.metaTitle ?? null,
      metaDescription: extra.metaDescription ?? null,
      noIndex: false,
    })
    .onConflictDoUpdate({
      target: [contentI18n.contentId, contentI18n.locale],
      set: {
        title,
        excerpt: extra.excerpt ?? null,
        body: blocks,
        metaTitle: extra.metaTitle ?? null,
        metaDescription: extra.metaDescription ?? null,
      },
    });

  return action;
}

async function writePages(pageTypeId: string, authorId: string | null) {
  for (const page of PAGES) {
    if (DRY_RUN) {
      report.pages.push({
        slug: page.slug,
        action: "dry-run",
        blocks: page.blocks.length,
      });
      continue;
    }
    const action = await upsertContent(
      pageTypeId,
      page.slug,
      page.title,
      page.blocks,
      authorId,
      {
        metaTitle: page.metaTitle,
        metaDescription: page.metaDescription,
      },
    );
    report.pages.push({ slug: page.slug, action, blocks: page.blocks.length });
  }
}

async function writePosts(postTypeId: string, authorId: string | null) {
  for (const post of POSTS) {
    if (DRY_RUN) {
      report.posts.push({ slug: post.slug, action: "dry-run" });
      continue;
    }
    const action = await upsertContent(
      postTypeId,
      post.slug,
      post.title,
      post.blocks,
      authorId,
      {
        excerpt: post.excerpt,
      },
    );
    report.posts.push({ slug: post.slug, action });
  }
}

async function writeMediaAssets(uploadedBy: string | null) {
  if (DRY_RUN) {
    report.media = { created: MEDIA_ASSETS.length, skipped: 0 };
    return;
  }

  for (const asset of MEDIA_ASSETS) {
    const [existing] = await db
      .select({ id: mediaAssets.id })
      .from(mediaAssets)
      .where(eq(mediaAssets.url, asset.url))
      .limit(1);

    if (existing) {
      report.media.skipped += 1;
      continue;
    }

    await db.insert(mediaAssets).values({
      filename: asset.filename,
      originalName: asset.originalName,
      mimeType: asset.mimeType,
      size: asset.size,
      url: asset.url,
      width: asset.width ?? null,
      height: asset.height ?? null,
      altText: asset.altText ?? null,
      uploadedBy,
    });
    report.media.created += 1;
  }
}

async function writeNavigation() {
  if (DRY_RUN) {
    report.navigation = {
      header: HEADER_NAV.length,
      footer: FOOTER_NAV.length,
    };
    return;
  }

  // Replaced wholesale, same convention as migration/seed-site.ts: this
  // script owns the header and footer locations, and a menu is an ordered
  // whole that merges badly by label.
  await db
    .delete(navigation)
    .where(sql`${navigation.location} in ('header', 'footer')`);

  for (const [location, items] of [
    ["header", HEADER_NAV],
    ["footer", FOOTER_NAV],
  ] as const) {
    for (const [index, item] of items.entries()) {
      const [row] = await db
        .insert(navigation)
        .values({
          label: item.label,
          // Stored WITHOUT the locale segment — components/site/navbar.tsx
          // prefixes `/${locale}` to any relative url itself.
          url: item.path ? `/${item.path}` : "/",
          order: index,
          location,
          isActive: true,
        })
        .returning({ id: navigation.id });
      if (!row) continue;

      await db
        .insert(navigationI18n)
        .values({ navigationId: row.id, locale: "en", label: item.label })
        .onConflictDoUpdate({
          target: [navigationI18n.navigationId, navigationI18n.locale],
          set: { label: item.label },
        });
    }
    report.navigation[location] = items.length;
  }
}

async function writeSettings() {
  if (DRY_RUN) return;

  const values = {
    siteName: "Revacity",
    siteDescription:
      "Revacity is a Stateless Outcome Engineering Practice. We sign Revenue Warrants, not contracts, and we get paid when you collect money.",
    logo: "/uploads/revacity/logo-new.png",
    theme: THEME,
    themeMode: "light" as const,
    themeDark: null,
    // Revacity is a content/agency site, not a shop.
    eCommerceEnabled: false,
  };

  const [existing] = await db
    .select({ id: settings.id })
    .from(settings)
    .limit(1);
  if (existing) {
    await db.update(settings).set(values).where(eq(settings.id, existing.id));
  } else {
    await db.insert(settings).values({ id: 1, ...values });
  }
}

// ─── MAIN ───────────────────────────────────────────────────

async function main() {
  console.log(
    DRY_RUN
      ? "=== DRY RUN — nothing will be written ===\n"
      : "=== SEEDING REVACITY ===\n",
  );

  const [admin] = await db.select({ id: users.id }).from(users).limit(1);
  if (!admin)
    report.warnings.push(
      "No user found yet; pages will have no author. Run /setup first if this is unexpected.",
    );

  console.log("1. Settings and theme");
  await writeSettings();

  console.log("2. Media library rows");
  await writeMediaAssets(admin?.id ?? null);
  console.log(
    `   created ${report.media.created}, already present ${report.media.skipped}`,
  );

  console.log("3. Navigation");
  await writeNavigation();
  console.log(
    `   header ${report.navigation.header}, footer ${report.navigation.footer}`,
  );

  console.log("4. Pages");
  const pageTypeId = await typeId("page");
  await writePages(pageTypeId, admin?.id ?? null);
  for (const page of report.pages) {
    console.log(
      `   ${page.slug.padEnd(20)} ${page.action.padEnd(9)} blocks:${page.blocks}`,
    );
  }

  console.log("5. Blog posts");
  const postTypeId = await typeId("post");
  await writePosts(postTypeId, admin?.id ?? null);
  for (const post of report.posts) {
    console.log(`   ${post.slug.padEnd(40)} ${post.action}`);
  }

  console.log("\n─── SUMMARY ───");
  console.log(
    `pages: ${report.pages.length}, posts: ${report.posts.length}, media: ${report.media.created}`,
  );
  if (report.warnings.length) {
    console.log("warnings:");
    for (const w of report.warnings) console.log(`   - ${w}`);
  }
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
