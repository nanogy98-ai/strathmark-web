import type { VisitorAnalyticsEvent } from "./types";

const ORIGINAL_URL_HEADER = "x-strathmark-original-url";

function decodeHeaderValue(value: string | null) {
  if (!value) {
    return null;
  }

  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function getClientIp(headers: Headers) {
  const rawForwardedFor =
    headers.get("x-vercel-forwarded-for") ??
    headers.get("x-forwarded-for") ??
    headers.get("x-real-ip");

  if (!rawForwardedFor) {
    return null;
  }

  return rawForwardedFor
    .split(",")
    .map((part) => part.trim())
    .find(Boolean) ?? null;
}

function getOriginalUrl(request: Request) {
  const headerUrl = request.headers.get(ORIGINAL_URL_HEADER);

  try {
    return new URL(headerUrl ?? request.url);
  } catch {
    return new URL(request.url);
  }
}

function getReferrerHost(referrer: string | null) {
  if (!referrer) {
    return null;
  }

  try {
    return new URL(referrer).host;
  } catch {
    return referrer.slice(0, 255);
  }
}

function getNullableSearchParam(searchParams: URLSearchParams, key: string) {
  const value = searchParams.get(key)?.trim();
  return value ? value.slice(0, 255) : null;
}

function getLocationConfidence({
  city,
  region,
  country,
}: {
  city: string | null;
  region: string | null;
  country: string | null;
}) {
  if (city || region) {
    return "city" as const;
  }

  if (country) {
    return "country" as const;
  }

  return "unknown" as const;
}

export function buildOfflineAttemptEvent(request: Request): VisitorAnalyticsEvent {
  const originalUrl = getOriginalUrl(request);
  const path = `${originalUrl.pathname}${originalUrl.search}`;
  const referrer = request.headers.get("referer");
  const continent = request.headers.get("x-vercel-ip-continent");
  const country = request.headers.get("x-vercel-ip-country");
  const region = decodeHeaderValue(request.headers.get("x-vercel-ip-country-region"));
  const city = decodeHeaderValue(request.headers.get("x-vercel-ip-city"));
  const postalCode = decodeHeaderValue(request.headers.get("x-vercel-ip-postal-code"));
  const latitude = request.headers.get("x-vercel-ip-latitude");
  const longitude = request.headers.get("x-vercel-ip-longitude");
  const timezone = request.headers.get("x-vercel-ip-timezone");

  return {
    id: crypto.randomUUID(),
    recordedAt: new Date().toISOString(),
    eventType: "offline_attempt",
    page: {
      href: originalUrl.toString(),
      path,
      pathname: originalUrl.pathname,
      search: originalUrl.search || null,
      title: "Site offline",
      referrer,
      referrerHost: getReferrerHost(referrer),
      queryParams: [...originalUrl.searchParams.entries()].slice(0, 32).map(([key, value]) => ({
        key: key.slice(0, 64),
        value: value ? value.slice(0, 512) : null,
      })),
    },
    marketing: {
      utmSource: getNullableSearchParam(originalUrl.searchParams, "utm_source"),
      utmMedium: getNullableSearchParam(originalUrl.searchParams, "utm_medium"),
      utmCampaign: getNullableSearchParam(originalUrl.searchParams, "utm_campaign"),
      utmContent: getNullableSearchParam(originalUrl.searchParams, "utm_content"),
      utmTerm: getNullableSearchParam(originalUrl.searchParams, "utm_term"),
      gclid: getNullableSearchParam(originalUrl.searchParams, "gclid"),
      fbclid: getNullableSearchParam(originalUrl.searchParams, "fbclid"),
      msclkid: getNullableSearchParam(originalUrl.searchParams, "msclkid"),
      ttclid: getNullableSearchParam(originalUrl.searchParams, "ttclid"),
      liFatId: getNullableSearchParam(originalUrl.searchParams, "li_fat_id"),
    },
    sessionId: null,
    request: {
      method: request.method,
      host: request.headers.get("host"),
      ip: getClientIp(request.headers),
      forwardedFor: request.headers.get("x-forwarded-for"),
      realIp: request.headers.get("x-real-ip"),
      userAgent: request.headers.get("user-agent"),
      acceptLanguage: request.headers.get("accept-language"),
      vercelId: request.headers.get("x-vercel-id"),
      deploymentUrl: request.headers.get("x-vercel-deployment-url"),
    },
    parsedUserAgent: {
      isBot: /\b(bot|crawler|spider|preview|slurp)\b/i.test(
        request.headers.get("user-agent") ?? ""
      ),
      browserName: null,
      browserVersion: null,
      engineName: null,
      osName: null,
      osVersion: null,
      deviceType: null,
      deviceVendor: null,
      deviceModel: null,
      cpuArchitecture: null,
    },
    location: {
      continent,
      country,
      region,
      city,
      postalCode,
      latitude,
      longitude,
      timezone,
      confidence: getLocationConfidence({ city, region, country }),
      precise: {
        latitude: null,
        longitude: null,
        accuracyMeters: null,
        altitudeMeters: null,
        altitudeAccuracyMeters: null,
        headingDegrees: null,
        speedMetersPerSecond: null,
        capturedAt: null,
        source: country || city || region ? "ip-header" : "none",
        permissionState: null,
      },
    },
    client: {
      language: null,
      languages: [],
      timezone: null,
      colorScheme: null,
      screen: null,
      viewport: null,
      device: null,
      network: null,
    },
    engagement: {
      scrollPercent: null,
      maxScrollPercent: null,
      timeOnPageMs: null,
      idleForMs: null,
      isVisible: null,
      isFocused: null,
    },
    performance: {
      dnsMs: null,
      tcpMs: null,
      tlsMs: null,
      requestMs: null,
      responseMs: null,
      domInteractiveMs: null,
      domCompleteMs: null,
      loadEventMs: null,
      transferSize: null,
      encodedBodySize: null,
      decodedBodySize: null,
      redirectCount: null,
    },
    link: {
      href: null,
      host: null,
      text: null,
    },
  };
}
