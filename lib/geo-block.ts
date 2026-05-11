export const AFRICA_BLOCK_PATH = "/access-restricted";

const AFRICA_CONTINENT_CODE = "AF";

// Fallback for hosts or local tests that provide country but not continent.
const AFRICAN_COUNTRY_CODES = new Set([
  "AO",
  "BF",
  "BI",
  "BJ",
  "BW",
  "CD",
  "CF",
  "CG",
  "CI",
  "CM",
  "CV",
  "DJ",
  "DZ",
  "EG",
  "EH",
  "ER",
  "ET",
  "GA",
  "GH",
  "GM",
  "GN",
  "GQ",
  "GW",
  "KE",
  "KM",
  "LR",
  "LS",
  "LY",
  "MA",
  "MG",
  "ML",
  "MR",
  "MU",
  "MW",
  "MZ",
  "NA",
  "NE",
  "NG",
  "RE",
  "RW",
  "SC",
  "SD",
  "SH",
  "SL",
  "SN",
  "SO",
  "SS",
  "ST",
  "SZ",
  "TD",
  "TG",
  "TN",
  "TZ",
  "UG",
  "YT",
  "ZA",
  "ZM",
  "ZW",
]);

function getNormalizedHeader(headers: Headers, name: string) {
  return headers.get(name)?.trim().toUpperCase() ?? null;
}

export function shouldBlockAfricaVisitor(headers: Headers) {
  const continent = getNormalizedHeader(headers, "x-vercel-ip-continent");

  if (continent === AFRICA_CONTINENT_CODE) {
    return true;
  }

  const country = getNormalizedHeader(headers, "x-vercel-ip-country");

  return country ? AFRICAN_COUNTRY_CODES.has(country) : false;
}

export function getAfricaBlockPath(headers: Headers, pathname: string) {
  if (pathname === AFRICA_BLOCK_PATH) {
    return null;
  }

  return shouldBlockAfricaVisitor(headers) ? AFRICA_BLOCK_PATH : null;
}
