export const HOME_PATHNAME = "/";
export const SITE_SECTION_NAVIGATION_EVENT = "strathmark:navigate-section";

const HOME_SECTION_IDS = [
  "about",
  "services",
  "approach",
  "outcomes",
  "briefing",
  "insights",
  "faq",
  "contact",
] as const;

const HOME_SECTION_ID_SET = new Set<string>(HOME_SECTION_IDS);

export function getHomeSectionHash(href: string) {
  const normalizedHref = href.trim();

  if (!normalizedHref) return null;

  const hash = normalizedHref.startsWith("/#")
    ? normalizedHref.slice(1)
    : normalizedHref.startsWith("#")
      ? normalizedHref
      : null;

  if (!hash) return null;

  const id = decodeURIComponent(hash.slice(1));
  return HOME_SECTION_ID_SET.has(id) ? hash : null;
}

export function isHomeSectionHref(href: string) {
  return getHomeSectionHash(href) !== null;
}

export function getHomeSectionHref(href: string) {
  const hash = getHomeSectionHash(href);
  return hash ? `/${hash}` : href;
}
