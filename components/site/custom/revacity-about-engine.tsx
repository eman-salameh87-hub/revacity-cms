// components/site/custom/revacity-about-engine.tsx
//
// Generic vendored-legacy-page embed, registered under two custom-block
// names in lib/blocks/custom-registry.tsx: 'revacity-about-engine' (the
// original registration, for the About page) and the generic alias
// 'legacy-page-embed' used by every other vendored page under
// public/legacy/revacity-*/ (services, the-agent, compare, glossary,
// our-architecture, before-judging-us, 100k-challenge, start-a-warrant,
// start-audit). All of it is the same component — it only ever reads
// props.src — kept under this original filename rather than renamed, to
// avoid rewriting the About page's already-migrated block data.
//
// Vendors each original revacity-pages static page essentially unmodified
// (Three.js/GSAP ScrollTrigger canvas backgrounds, hand-built per-page CSS
// layouts) rather than re-implementing all of that as CMS blocks. Same
// rationale as revacity-home-engine: an <iframe> to a self-contained static
// document sidesteps id collisions, hydration mismatches and ScrollTrigger
// fighting Next.js's own scroll handling.
//
// FIXED VIEWPORT HEIGHT, NOT AUTO-GROWN TO CONTENT: an earlier version of
// this component measured the embedded document's full scrollHeight (via
// postMessage) and grew the iframe to match, so the OUTER page would scroll
// instead of the iframe. That broke every one of these pages: GSAP
// ScrollTrigger drives its pins and reveal animations off the embedded
// document's OWN window.scrollY, and an iframe tall enough to show all its
// content at once never scrolls internally — window.scrollY inside it stays
// 0 forever no matter how far the outer page scrolls, because an iframe's
// scroll position is entirely separate from its container's. Every
// scroll-triggered reveal was therefore stuck in its pre-animation (often
// invisible) state, which is what showed up as "corrupted" blank sections.
// Sizing the iframe to the real viewport instead gives the embedded document
// a genuine internal scroll, exactly like opening it directly in a browser
// tab, so ScrollTrigger sees real scroll position changes again.
//
// This page's own header/footer are its real chrome (see
// HERO_CUSTOM_COMPONENTS in lib/blocks/layout.ts, which makes the [segment]
// route skip its usual title header for a block like this one, and
// data-legacy-chrome in app/globals.css, which hides the CMS's own
// Navbar/Footer while this is mounted) — so the iframe can take the full
// viewport height with nothing else competing for space above or below it.
'use client';

import { useEffect } from 'react';
import { FULL_BLEED } from '@/lib/blocks/layout';

export function RevacityAboutEngine(props: Record<string, unknown>) {
  const baseSrc = typeof props.src === 'string' ? props.src : '/legacy/revacity-about/about.html';
  // Admin-edited text for the handful of slots this specific document has
  // been wired to read (see lib/blocks/legacy-embed-overrides.ts) — passed
  // as a query param rather than postMessage so the vendored page's own
  // inline script can apply it before paint, with no listener/race to get
  // wrong. Everything else about the document — layout, canvas, scroll — is
  // untouched.
  const overrides = props.overrides as Record<string, string> | undefined;
  const embedSrc =
    overrides && Object.keys(overrides).length > 0
      ? `${baseSrc}${baseSrc.includes('?') ? '&' : '?'}cms=${encodeURIComponent(JSON.stringify(overrides))}`
      : baseSrc;

  useEffect(() => {
    document.body.setAttribute('data-legacy-chrome', 'hidden');
    return () => document.body.removeAttribute('data-legacy-chrome');
  }, []);

  return (
    // FULL_BLEED, not a plain w-screen iframe: the [segment] route skips
    // its wrapper for a hero block like this one, but the home page's own
    // route still nests it in a `max-w-4xl mx-auto` section regardless (see
    // app/(site)/[locale]/page.tsx) — negative-margin escape is what makes
    // this render edge-to-edge in EITHER container, not just the unwrapped
    // one. A no-op when there's no constraining ancestor to escape.
    <div className={FULL_BLEED}>
      <iframe
        src={embedSrc}
        title="Revacity"
        className="block w-full border-0"
        style={{ height: '100dvh' }}
        loading="eager"
      />
    </div>
  );
}
