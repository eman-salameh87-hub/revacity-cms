// components/site/custom/revacity-home-engine.tsx
//
// Vendors the original revacity-pages static site's home-page experience
// (a Three.js/GSAP ScrollTrigger scrollytelling engine — hero starfield,
// corner particle swirls, the chapter-by-chapter narrative, and the
// "Collapse" section) essentially unmodified, rather than re-implementing it
// as CMS blocks.
//
// That engine owns roughly a dozen interdependent DOM ids, two separate
// Three.js scenes and ~150KB of scroll-driven vanilla JS that assumes it is
// the only thing on the page. Mounting it directly into the CMS's live React
// tree would risk id collisions with React-managed nodes, hydration
// mismatches, and GSAP ScrollTrigger fighting Next.js's own scroll handling —
// and any of that would be very hard to debug. An <iframe> to a fully
// self-contained static document sidesteps all of it: the engine gets its own
// document, its own scroll, and its own teardown (the browser cleans up its
// timers/RAF loops/canvases for free when the iframe unmounts).
//
// The vendored files live under public/legacy/revacity-home/ — edit those
// directly (they are the original site's own CSS/JS, copied over close to
// byte-for-byte) rather than through the CMS block editor; this block itself
// exposes only which vendored document to embed.
//
// This page's own header (see index-full.html's <header class="main-header">)
// is its real chrome, exactly like revacity-about-engine.tsx's vendored
// pages — same reasoning: it carries the exact glow-line/letter-wave/GSAP
// reveal animation from the original site, which the CMS's own Navbar can't
// reproduce. So, like every other vendored page, this one hides the CMS's
// own Navbar/Footer (via data-legacy-chrome, see app/globals.css) while it's
// mounted, rather than stacking a second, plainer header above it.
'use client';

import { useEffect } from 'react';
import { FULL_BLEED } from '@/lib/blocks/layout';

export function RevacityHomeEngine(props: Record<string, unknown>) {
  const baseSrc = typeof props.src === 'string' ? props.src : '/legacy/revacity-home/index.html';
  // See lib/blocks/legacy-embed-overrides.ts and revacity-about-engine.tsx —
  // same query-param mechanism, read by index-full.html's own inline script
  // to patch only the first chapter's eyebrow/heading text before its
  // scrollytelling engine initialises. Layout, canvas and scroll untouched.
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
    <div className={FULL_BLEED}>
      <iframe
        src={embedSrc}
        title="Revacity"
        // No CMS nav above this any more (it's hidden — see the effect
        // above), so the iframe now gets the FULL viewport height, matching
        // the vendored engine's own `.stage { position:fixed; inset:0;
        // height:100dvh }` rule 1:1 instead of shrinking it by the height of
        // a nav bar that no longer renders above it.
        className="block h-[100dvh] w-full border-0"
        // The clps-section's fallback video autoplays muted inside this
        // document; Chrome/Safari gate autoplay in cross-document iframes
        // behind this attribute even though the video is muted.
        allow="autoplay"
        loading="eager"
      />
    </div>
  );
}
