import { userAgent } from "next/server";
import { clientVisitorEventSchema } from "@/lib/visitor-analytics/schema";
import {
  recordVisitorAnalyticsEvent,
} from "@/lib/visitor-analytics/store";
import type { VisitorAnalyticsEvent } from "@/lib/visitor-analytics/types";

export const runtime = "nodejs";

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

function getLocationConfidence({
  preciseLatitude,
  preciseLongitude,
  city,
  region,
  country,
}: {
  preciseLatitude: number | null | undefined;
  preciseLongitude: number | null | undefined;
  city: string | null;
  region: string | null;
  country: string | null;
}) {
  if (typeof preciseLatitude === "number" && typeof preciseLongitude === "number") {
    return "precise" as const;
  }

  if (city || region) {
    return "city" as const;
  }

  if (country) {
    return "country" as const;
  }

  return "unknown" as const;
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = clientVisitorEventSchema.safeParse(body);

  if (!parsed.success) {
    return Response.json(
      { ok: false, error: "Invalid visitor analytics payload." },
      { status: 400 }
    );
  }

  const requestUserAgent = userAgent({ headers: request.headers });
  const continent = request.headers.get("x-vercel-ip-continent");
  const country = request.headers.get("x-vercel-ip-country");
  const region = decodeHeaderValue(request.headers.get("x-vercel-ip-country-region"));
  const city = decodeHeaderValue(request.headers.get("x-vercel-ip-city"));
  const postalCode = decodeHeaderValue(request.headers.get("x-vercel-ip-postal-code"));
  const latitude = request.headers.get("x-vercel-ip-latitude");
  const longitude = request.headers.get("x-vercel-ip-longitude");
  const timezone = request.headers.get("x-vercel-ip-timezone");
  const confidence = getLocationConfidence({
    preciseLatitude: parsed.data.preciseLocation?.latitude,
    preciseLongitude: parsed.data.preciseLocation?.longitude,
    city,
    region,
    country,
  });

  const event: VisitorAnalyticsEvent = {
    id: crypto.randomUUID(),
    recordedAt: new Date().toISOString(),
    eventType: parsed.data.type,
    page: {
      href: parsed.data.href,
      path: parsed.data.path,
      pathname: parsed.data.pathname ?? null,
      search: parsed.data.search ?? null,
      title: parsed.data.title ?? null,
      referrer: parsed.data.referrer ?? null,
      referrerHost: parsed.data.referrerHost ?? null,
      queryParams: (parsed.data.queryParams ?? []).map((param) => ({
        key: param.key,
        value: param.value ?? null,
      })),
    },
    marketing: {
      utmSource: parsed.data.marketing?.utmSource ?? null,
      utmMedium: parsed.data.marketing?.utmMedium ?? null,
      utmCampaign: parsed.data.marketing?.utmCampaign ?? null,
      utmContent: parsed.data.marketing?.utmContent ?? null,
      utmTerm: parsed.data.marketing?.utmTerm ?? null,
      gclid: parsed.data.marketing?.gclid ?? null,
      fbclid: parsed.data.marketing?.fbclid ?? null,
      msclkid: parsed.data.marketing?.msclkid ?? null,
      ttclid: parsed.data.marketing?.ttclid ?? null,
      liFatId: parsed.data.marketing?.liFatId ?? null,
    },
    sessionId: parsed.data.sessionId ?? null,
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
      isBot: requestUserAgent.isBot,
      browserName: requestUserAgent.browser.name ?? null,
      browserVersion: requestUserAgent.browser.version ?? null,
      engineName: requestUserAgent.engine.name ?? null,
      osName: requestUserAgent.os.name ?? null,
      osVersion: requestUserAgent.os.version ?? null,
      deviceType: requestUserAgent.device.type ?? null,
      deviceVendor: requestUserAgent.device.vendor ?? null,
      deviceModel: requestUserAgent.device.model ?? null,
      cpuArchitecture: requestUserAgent.cpu.architecture ?? null,
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
      confidence,
      precise: {
        latitude: parsed.data.preciseLocation?.latitude ?? null,
        longitude: parsed.data.preciseLocation?.longitude ?? null,
        accuracyMeters: parsed.data.preciseLocation?.accuracyMeters ?? null,
        altitudeMeters: parsed.data.preciseLocation?.altitudeMeters ?? null,
        altitudeAccuracyMeters: parsed.data.preciseLocation?.altitudeAccuracyMeters ?? null,
        headingDegrees: parsed.data.preciseLocation?.headingDegrees ?? null,
        speedMetersPerSecond: parsed.data.preciseLocation?.speedMetersPerSecond ?? null,
        capturedAt: parsed.data.preciseLocation?.capturedAt ?? null,
        source:
          parsed.data.preciseLocation?.source ??
          (country || city || region ? "ip-header" : "none"),
        permissionState: parsed.data.preciseLocation?.permissionState ?? null,
      },
    },
    client: {
      language: parsed.data.language ?? null,
      languages: parsed.data.languages ?? [],
      timezone: parsed.data.timezone ?? null,
      colorScheme: parsed.data.colorScheme ?? null,
      screen: parsed.data.screen
        ? {
            width: parsed.data.screen.width,
            height: parsed.data.screen.height,
            pixelRatio: parsed.data.screen.pixelRatio ?? null,
            colorDepth: parsed.data.screen.colorDepth ?? null,
          }
        : null,
      viewport: parsed.data.viewport ?? null,
      device: parsed.data.device
        ? {
            platform: parsed.data.device.platform ?? null,
            vendor: parsed.data.device.vendor ?? null,
            maxTouchPoints: parsed.data.device.maxTouchPoints ?? null,
            hardwareConcurrency: parsed.data.device.hardwareConcurrency ?? null,
            deviceMemory: parsed.data.device.deviceMemory ?? null,
            cookieEnabled: parsed.data.device.cookieEnabled ?? null,
            doNotTrack: parsed.data.device.doNotTrack ?? null,
            online: parsed.data.device.online ?? null,
          }
        : null,
      network: parsed.data.network
        ? {
            effectiveType: parsed.data.network.effectiveType ?? null,
            downlink: parsed.data.network.downlink ?? null,
            rtt: parsed.data.network.rtt ?? null,
            saveData: parsed.data.network.saveData ?? null,
          }
        : null,
    },
    engagement: {
      scrollPercent: parsed.data.engagement?.scrollPercent ?? null,
      maxScrollPercent: parsed.data.engagement?.maxScrollPercent ?? null,
      timeOnPageMs: parsed.data.engagement?.timeOnPageMs ?? null,
      idleForMs: parsed.data.engagement?.idleForMs ?? null,
      isVisible: parsed.data.engagement?.isVisible ?? null,
      isFocused: parsed.data.engagement?.isFocused ?? null,
    },
    performance: {
      dnsMs: parsed.data.performance?.dnsMs ?? null,
      tcpMs: parsed.data.performance?.tcpMs ?? null,
      tlsMs: parsed.data.performance?.tlsMs ?? null,
      requestMs: parsed.data.performance?.requestMs ?? null,
      responseMs: parsed.data.performance?.responseMs ?? null,
      domInteractiveMs: parsed.data.performance?.domInteractiveMs ?? null,
      domCompleteMs: parsed.data.performance?.domCompleteMs ?? null,
      loadEventMs: parsed.data.performance?.loadEventMs ?? null,
      transferSize: parsed.data.performance?.transferSize ?? null,
      encodedBodySize: parsed.data.performance?.encodedBodySize ?? null,
      decodedBodySize: parsed.data.performance?.decodedBodySize ?? null,
      redirectCount: parsed.data.performance?.redirectCount ?? null,
    },
    link: {
      href: parsed.data.link?.href ?? null,
      host: parsed.data.link?.host ?? null,
      text: parsed.data.link?.text ?? null,
    },
  };

  const result = await recordVisitorAnalyticsEvent(event);
  if (!result.ok) {
    return Response.json(
      { ok: false, error: "Visitor analytics storage is not configured yet." },
      { status: 503 }
    );
  }

  return Response.json(
    { ok: true },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
}
