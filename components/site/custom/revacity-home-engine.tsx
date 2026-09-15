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

  return (
    <div className={FULL_BLEED}>
      <iframe
        src={embedSrc}
        title="Revacity"
        className="block h-[calc(100dvh-4rem)] w-full border-0"
        // The site nav above this block is `sticky top-0 h-16` (4rem) and
        // stays in normal document flow, so it always occupies that 4rem at
        // the top of the viewport. The vendored engine's own `.stage` rule is
        // `position:fixed; inset:0; height:100dvh` — fixed positioning inside
        // an iframe is relative to the IFRAME's own viewport, so if this
        // iframe were a full 100dvh tall, its box would run from y=4rem to
        // y=(4rem + 100dvh) and its bottom 4rem would hang off-screen, which
        // is exactly why the hero looked short one nav-height, the scroll cue
        // was clipped, and the hero copy sat visibly low. Sizing the iframe to
        // the remaining space makes its own 100dvh match what's actually
        // visible below the nav, so the hero fits and centers correctly.
        // The clps-section's fallback video autoplays muted inside this
        // document; Chrome/Safari gate autoplay in cross-document iframes
        // behind this attribute even though the video is muted.
        allow="autoplay"
        loading="eager"
      />
    </div>
  );
}
