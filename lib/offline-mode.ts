export const SITE_OFFLINE_PATH = "/site-offline";

const FALSE_VALUES = new Set(["0", "false", "off", "no"]);
const OFFLINE_ALLOWED_PREFIXES = ["/ops", "/api/ops", "/_next"] as const;

export function isSiteOffline(value = process.env.STRATHMARK_SITE_OFFLINE) {
  if (value === undefined) {
    return true;
  }

  return !FALSE_VALUES.has(value.trim().toLowerCase());
}

function isOfflineAllowedPath(pathname: string) {
  return (
    pathname === SITE_OFFLINE_PATH ||
    OFFLINE_ALLOWED_PREFIXES.some(
      (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
    )
  );
}

export function getOfflineRewritePath(pathname: string, value = process.env.STRATHMARK_SITE_OFFLINE) {
  if (!isSiteOffline(value) || isOfflineAllowedPath(pathname)) {
    return null;
  }

  return SITE_OFFLINE_PATH;
}
