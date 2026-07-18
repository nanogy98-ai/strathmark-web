"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { clsx } from "clsx";
import { SectionLink } from "@/app/components/ui/SectionLink";

const NAV_LINKS = [
  { name: "AI Advisory", href: "/#services" },
  { name: "Use Cases", href: "/#use-cases" },
  { name: "Governance", href: "/#governance" },
  { name: "Digital", href: "/digital-performance" },
  { name: "Insights", href: "/insights" },
] as const;

const MOBILE_NAV_ID = "mobile-navigation";
const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const updateNavigation = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        setScrolled(window.scrollY > 16);
      });
    };

    updateNavigation();
    window.addEventListener("scroll", updateNavigation, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateNavigation);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    const closeAtDesktop = (event: MediaQueryListEvent | MediaQueryList) => {
      if (event.matches) setIsOpen(false);
    };

    closeAtDesktop(desktopQuery);
    desktopQuery.addEventListener("change", closeAtDesktop);
    return () => desktopQuery.removeEventListener("change", closeAtDesktop);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const menuButton = menuButtonRef.current;
    document.body.style.overflow = "hidden";

    const panel = menuPanelRef.current;
    const focusable = panel?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
    focusable?.[0]?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        return;
      }

      if (event.key !== "Tab" || !focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      if (menuButton?.offsetParent !== null) menuButton?.focus();
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <a
        href="#main-content"
        className="fixed left-4 top-3 z-[80] -translate-y-24 bg-ivory px-4 py-3 text-sm font-bold text-ink shadow-xl transition-transform focus:translate-y-0"
      >
        Skip to main content
      </a>

      <nav
        aria-label="Primary navigation"
        className={clsx(
          "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,padding,box-shadow] duration-300",
          scrolled || isOpen
            ? "border-white/10 bg-strath-navy/95 py-3 shadow-[0_16px_45px_rgba(2,8,16,0.18)] supports-[backdrop-filter]:backdrop-blur-xl"
            : "border-transparent bg-strath-navy/35 py-4 supports-[backdrop-filter]:backdrop-blur-sm"
        )}
      >
        <div className="section-shell flex min-h-12 items-center justify-between gap-6">
          <Link
            href="/"
            aria-label="Strathmark Consulting home"
            className="group inline-flex min-h-11 items-center gap-3"
            onClick={closeMenu}
          >
            <span className="grid h-9 w-9 place-items-center border border-gold/45 bg-gold/10 font-serif text-lg font-bold text-gold transition-colors group-hover:bg-gold group-hover:text-ink">
              S
            </span>
            <span className="flex flex-col">
              <span className="font-serif text-xl font-semibold tracking-[0.14em] text-white transition-colors group-hover:text-gold">
                STRATHMARK
              </span>
              <span className="text-[0.62rem] font-medium uppercase tracking-[0.34em] text-slate-400">
                Consulting
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-7 lg:flex xl:gap-9">
            {NAV_LINKS.map((link) => (
              <SectionLink
                key={link.name}
                href={link.href}
                className="inline-flex min-h-11 items-center text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-slate-300 transition-colors hover:text-gold"
              >
                {link.name}
              </SectionLink>
            ))}
            <SectionLink
              href="/#contact"
              className="inline-flex min-h-11 items-center border border-gold bg-gold px-5 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-ink transition-colors hover:bg-white"
            >
              Discuss your business
            </SectionLink>
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            className="grid h-11 w-11 place-items-center border border-white/15 text-white transition-colors hover:border-gold hover:text-gold lg:hidden"
            onClick={() => setIsOpen((open) => !open)}
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
            aria-controls={MOBILE_NAV_ID}
          >
            {isOpen ? <X aria-hidden="true" size={22} /> : <Menu aria-hidden="true" size={22} />}
          </button>
        </div>

      </nav>

      {isOpen ? (
        <div
          ref={menuPanelRef}
          id={MOBILE_NAV_ID}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className="fixed inset-x-0 bottom-0 top-[4.75rem] z-40 overflow-y-auto border-t border-white/10 bg-strath-navy px-5 py-8 lg:hidden"
        >
          <div className="mx-auto flex min-h-full max-w-2xl flex-col">
            <p className="mb-7 text-xs font-semibold uppercase tracking-[0.22em] text-gold">
              Navigate
            </p>
            <div className="flex flex-col border-t border-white/10">
              {NAV_LINKS.map((link, index) => (
                <SectionLink
                  key={link.name}
                  href={link.href}
                  onNavigate={closeMenu}
                  className="flex min-h-16 items-center justify-between border-b border-white/10 py-4 font-serif text-2xl text-white transition-colors hover:text-gold"
                >
                  <span>{link.name}</span>
                  <span aria-hidden="true" className="font-mono text-xs text-slate-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </SectionLink>
              ))}
            </div>
            <div className="pt-7">
              <SectionLink
                href="/#contact"
                onNavigate={closeMenu}
                className="flex min-h-14 w-full items-center justify-center bg-gold px-6 text-sm font-bold uppercase tracking-[0.16em] text-ink transition-colors hover:bg-white"
              >
                Discuss your business
              </SectionLink>
              <p className="mt-5 text-center text-xs text-slate-400">
                Fixed fees · Controlled pilots · Principal-led
              </p>
            </div>
          </div>
        </div>
      ) : null}

      <span id="main-content" tabIndex={-1} className="sr-only">
        Main content
      </span>
    </>
  );
}
