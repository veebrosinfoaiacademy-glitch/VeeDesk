import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { navItems, site } from '../../config/site';
import { useActiveSection } from '../../hooks/useActiveSection';
import { useScrolled } from '../../hooks/useScrolled';
import { cn } from '../../lib';
import { ButtonLink } from '../ui/Button';
import { Logo } from '../ui/Logo';

const sectionIds = navItems.map((item) => item.href.slice(1));

export function Navbar() {
  const scrolled = useScrolled(12);
  const active = useActiveSection(sectionIds);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef(null);
  const panelRef = useRef(null);

  // Close on Escape, lock page scroll while the mobile menu is open,
  // and close automatically when the viewport grows to desktop.
  useEffect(() => {
    if (!open) return;
    const onKey = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const desktop = window.matchMedia('(min-width: 1024px)');
    const onResize = () => desktop.matches && setOpen(false);
    document.documentElement.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    desktop.addEventListener('change', onResize);
    // Move focus into the menu once the panel has become visible.
    const frame = requestAnimationFrame(() => panelRef.current?.querySelector('a')?.focus());
    return () => {
      cancelAnimationFrame(frame);
      document.documentElement.style.overflow = '';
      document.removeEventListener('keydown', onKey);
      desktop.removeEventListener('change', onResize);
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4">
      <div
        className={cn(
          'relative z-10 mx-auto flex h-14 max-w-[1200px] items-center justify-between rounded-2xl border pr-2 pl-4 transition-[background-color,border-color,box-shadow] duration-300 sm:pl-5',
          solid
            ? 'border-ink-900/[0.07] bg-white/80 shadow-[0_1px_2px_rgb(38_44_59/0.04),0_8px_24px_-12px_rgb(38_44_59/0.18)] backdrop-blur-xl backdrop-saturate-150'
            : 'border-transparent bg-transparent',
        )}
      >
        <a href="#top" className="rounded-lg" aria-label="VeeDesk — back to top">
          <Logo className="h-8 sm:h-9" height={36} alt="" priority />
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {navItems.map((item) => {
              const isActive = active === item.href.slice(1);
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={isActive ? 'true' : undefined}
                    className={cn(
                      'rounded-full px-3.5 py-2 text-[14px] font-medium transition-colors duration-200',
                      isActive ? 'bg-ink-900/[0.05] text-ink-900' : 'text-ink-600 hover:text-ink-900',
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5">
          <a
            href={site.links.login}
            className="hidden rounded-full px-3.5 py-2 text-[14px] font-medium text-ink-700 transition-colors hover:text-ink-900 sm:inline-flex"
          >
            Login
          </a>
          <ButtonLink href={site.links.getStarted} size="sm">
            Get Started
          </ButtonLink>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="inline-flex size-10 items-center justify-center rounded-xl text-ink-900 transition-colors hover:bg-ink-900/[0.05] lg:hidden"
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={cn(
          'fixed inset-0 bg-night-950/20 backdrop-blur-[2px] transition-opacity duration-300 lg:hidden',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
      />
      <div
        id="mobile-menu"
        ref={panelRef}
        className={cn(
          'relative z-10 mx-auto mt-2 max-w-[1200px] rounded-2xl border border-ink-900/[0.07] bg-white p-2 shadow-lift duration-300 lg:hidden',
          // Visible immediately on open (so focus can move in); hidden only after the fade-out on close.
          open
            ? 'visible translate-y-0 opacity-100 transition-[opacity,transform]'
            : 'invisible -translate-y-2 opacity-0 transition-[opacity,transform,visibility]',
        )}
      >
        <nav aria-label="Mobile">
          <ul>
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-xl px-4 py-3 text-[15px] font-medium text-ink-900 transition-colors hover:bg-canvas"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-2 grid grid-cols-2 gap-2 border-t border-line p-2 pt-4">
          <ButtonLink href={site.links.login} variant="secondary" onClick={() => setOpen(false)}>
            Login
          </ButtonLink>
          <ButtonLink href={site.links.getStarted} onClick={() => setOpen(false)}>
            Get Started
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
