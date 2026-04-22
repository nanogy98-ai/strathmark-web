"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";
import {
  getHomeSectionHash,
  getHomeSectionHref,
  HOME_PATHNAME,
  SITE_SECTION_NAVIGATION_EVENT,
} from "@/lib/site-navigation";

type SectionLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
  onNavigate?: () => void;
  scrollBehavior?: ScrollBehavior;
  navigationDelayMs?: number;
};

function isModifiedEvent(event: MouseEvent<HTMLAnchorElement>) {
  return event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
}

export function SectionLink({
  href,
  onClick,
  onNavigate,
  scrollBehavior = "smooth",
  navigationDelayMs = 0,
  scroll,
  ...props
}: SectionLinkProps) {
  const pathname = usePathname();
  const sectionHash = getHomeSectionHash(href);
  const isSamePageSectionLink = pathname === HOME_PATHNAME && sectionHash;
  const resolvedHref = sectionHash
    ? pathname === HOME_PATHNAME
      ? sectionHash
      : getHomeSectionHref(href)
    : href;

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);

    if (event.defaultPrevented) return;

    onNavigate?.();

    if (!isSamePageSectionLink || isModifiedEvent(event)) return;

    event.preventDefault();

    const performNavigation = () => {
      const historyMethod = window.location.hash === sectionHash ? "replaceState" : "pushState";
      window.history[historyMethod](null, "", sectionHash);
      window.dispatchEvent(
        new CustomEvent(SITE_SECTION_NAVIGATION_EVENT, {
          detail: {
            hash: sectionHash,
            behavior: scrollBehavior,
          },
        })
      );
    };

    if (navigationDelayMs > 0) {
      window.setTimeout(performNavigation, navigationDelayMs);
      return;
    }

    performNavigation();
  };

  return <Link href={resolvedHref} scroll={sectionHash ? false : scroll} onClick={handleClick} {...props} />;
}
