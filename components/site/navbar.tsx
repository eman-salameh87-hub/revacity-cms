// components/site/navbar.tsx
'use client';

import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, User, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from './theme-toggle';

/** Shape returned by getNavigation(). Was `any[]`. */
export interface NavItem {
  id: string;
  label: string;
  url: string;
  openInNew: boolean | null;
}

interface NavbarProps {
  navigation: NavItem[];
  logo?: string | null;
  /** From settings — never a hardcoded brand string. */
  siteName: string;
  locale: 'ar' | 'en';
  /** Whether the shop is switched on; hides the account link when it is not. */
  commerceOn?: boolean;
  /** False when the site has no dark colours saved: nothing to switch to. */
  showThemeToggle?: boolean;
}

/**
 * The two branded CTA pills from revacity-pages' own header ("Start a
 * Warrant" / "$100k Reward") — see the .nav-cta rules in app/globals.css for
 * why these are fixed colours rather than theme slots. Slugs match the
 * vendored legacy folders (public/legacy/revacity-start-a-warrant,
 * public/legacy/revacity-100k-challenge); update these if the matching CMS
 * pages end up published under different slugs.
 */
const HEADER_CTAS = [
  { slug: 'start-a-warrant', label: { en: 'Start a Warrant', ar: 'ابدأ مذكرة' }, cls: 'nav-cta-warrant' },
  { slug: '100k-challenge', label: { en: '$100k Reward', ar: 'مكافأة 100 ألف$' }, cls: 'nav-cta-reward' },
] as const;

export function Navbar({
  navigation,
  logo,
  siteName,
  locale,
  commerceOn = false,
  showThemeToggle = false,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Nav URLs stored in the DB are locale-agnostic ("/about"); prefix them so
  // links do not escape the current locale.
  const localized = (url: string) =>
    /^https?:\/\//i.test(url) ? url : `/${locale}${url.startsWith('/') ? url : `/${url}`}`;

  return (
    <nav id="site-navbar" className="sticky top-0 z-50 border-b border-site-line bg-site-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          <Link
            href={`/${locale}`}
            className="flex items-center gap-2 shrink-0"
            data-test-id="navbar-home"
          >
            {logo ? (
              <Image
                src={logo}
                alt={siteName}
                width={160}
                height={32}
                priority
                className="h-8 w-auto"
              />
            ) : (
              <span className="text-xl font-bold text-site-ink">{siteName}</span>
            )}
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navigation.map((item) => {
              const href = localized(item.url);
              return (
                <Link
                  key={item.id}
                  href={href}
                  target={item.openInNew ? '_blank' : undefined}
                  rel={item.openInNew ? 'noopener noreferrer' : undefined}
                  aria-current={pathname === href ? 'page' : undefined}
                  data-test-id={`navbar-link-${item.id}`}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-site-ink',
                    pathname === href
                      ? 'text-site-ink'
                      : 'text-site-ink-muted'
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* The two branded CTAs, desktop only — the reference header hides
              these below its 1200px breakpoint too and relies on the mobile
              slide-menu's own copies instead (below). */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            {HEADER_CTAS.map(({ slug, label, cls }) => (
              <Link
                key={slug}
                href={`/${locale}/${slug}`}
                data-test-id={`navbar-cta-${slug}`}
                className={cn('nav-cta', cls)}
              >
                <span>{label[locale]}</span>
              </Link>
            ))}
          </div>

          {/* Tighter on phones: this row now holds six controls, and at 390px
              the old gap-2 pushed the menu button off the edge — a horizontal
              scrollbar on every page. Unchanged from sm upwards. */}
          <div className="flex items-center gap-0.5 sm:gap-2">
            {/* Only when there is a shop: an account here exists to show order
                history, so it is meaningless on a content-only site. */}
            {commerceOn && (
              <Link
                href={`/${locale}/account/wishlist`}
                aria-label={locale === 'ar' ? 'المفضّلة' : 'Wishlist'}
                data-test-id="navbar-wishlist"
                className="rounded-full p-1.5 hover:bg-site-surface-raised sm:p-2"
              >
                <Heart size={20} aria-hidden="true" />
              </Link>
            )}

            {commerceOn && (
              <Link
                href={`/${locale}/account`}
                aria-label={locale === 'ar' ? 'حسابي' : 'My account'}
                data-test-id="navbar-account"
                className="rounded-full p-1.5 hover:bg-site-surface-raised sm:p-2"
              >
                <User size={20} aria-hidden="true" />
              </Link>
            )}

            {showThemeToggle && <ThemeToggle locale={locale} />}

            <button
              type="button"
              className="md:hidden p-2"
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              aria-controls="navbar-mobile"
              aria-label={locale === 'ar' ? 'القائمة' : 'Menu'}
              data-test-id="navbar-menu-toggle"
            >
              {mobileOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div id="navbar-mobile" className="border-t border-site-line bg-site-surface md:hidden">
          <div className="px-4 py-3 flex flex-col gap-1">
            {navigation.map((item) => (
              <Link
                key={item.id}
                href={localized(item.url)}
                onClick={() => setMobileOpen(false)}
                className="py-3 text-sm font-medium text-site-ink-muted hover:text-site-ink"
                data-test-id={`navbar-mobile-link-${item.id}`}
              >
                {item.label}
              </Link>
            ))}

            {/* Same two CTAs as the desktop bar, stacked and full-width —
                the reference site's mobile-menu-cta. */}
            <div className="mt-2 flex flex-col gap-3 border-t border-site-line pt-3">
              {HEADER_CTAS.map(({ slug, label, cls }) => (
                <Link
                  key={slug}
                  href={`/${locale}/${slug}`}
                  onClick={() => setMobileOpen(false)}
                  data-test-id={`navbar-mobile-cta-${slug}`}
                  className={cn('nav-cta nav-cta-mobile', cls)}
                >
                  <span>{label[locale]}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
