"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { getHomeSectionHash, HOME_PATHNAME, SITE_SECTION_NAVIGATION_EVENT } from "@/lib/site-navigation";

export function ScrollBehaviorManager() {
  const pathname = usePathname();
  const cancelPendingScrollRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    root.style.scrollBehavior = "auto";

    return () => {
      root.style.scrollBehavior = "";
    };
  }, []);

  useEffect(() => {
    if (!("scrollRestoration" in window.history)) return;

    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = pathname === HOME_PATHNAME ? "manual" : "auto";

    return () => {
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, [pathname]);

  useEffect(() => {
    if (pathname !== HOME_PATHNAME) {
      cancelPendingScrollRef.current?.();
      cancelPendingScrollRef.current = null;
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const scheduleScroll = (rawHash: string, requestedBehavior: ScrollBehavior = "auto") => {
      const hash = getHomeSectionHash(rawHash);
      if (!hash) return;

      cancelPendingScrollRef.current?.();

      let frame = 0;
      let remainingAttempts = 24;
      const behavior = prefersReducedMotion.matches ? "auto" : requestedBehavior;

      const attemptScroll = () => {
        const targetId = decodeURIComponent(hash.slice(1));
        const target = document.getElementById(targetId);

        if (target) {
          target.scrollIntoView({ behavior, block: "start" });
          cancelPendingScrollRef.current = null;
          return;
        }

        if (remainingAttempts <= 0) {
          cancelPendingScrollRef.current = null;
          return;
        }

        remainingAttempts -= 1;
        frame = window.requestAnimationFrame(attemptScroll);
      };

      frame = window.requestAnimationFrame(attemptScroll);

      cancelPendingScrollRef.current = () => {
        if (frame) window.cancelAnimationFrame(frame);
      };
    };

    const handleHashLocationChange = () => {
      if (!window.location.hash) return;
      scheduleScroll(window.location.hash, "auto");
    };

    const handleSectionNavigation = (event: Event) => {
      const detail = (event as CustomEvent<{ hash?: string; behavior?: ScrollBehavior }>).detail;
      if (!detail?.hash) return;
      scheduleScroll(detail.hash, detail.behavior ?? "smooth");
    };

    handleHashLocationChange();

    window.addEventListener("hashchange", handleHashLocationChange);
    window.addEventListener("popstate", handleHashLocationChange);
    window.addEventListener(SITE_SECTION_NAVIGATION_EVENT, handleSectionNavigation as EventListener);

    return () => {
      cancelPendingScrollRef.current?.();
      cancelPendingScrollRef.current = null;
      window.removeEventListener("hashchange", handleHashLocationChange);
      window.removeEventListener("popstate", handleHashLocationChange);
      window.removeEventListener(SITE_SECTION_NAVIGATION_EVENT, handleSectionNavigation as EventListener);
    };
  }, [pathname]);

  return null;
}
