import "server-only";

import { createAdminClient } from "@/lib/supabase/admin";
import { isSupabaseAdminConfigured } from "@/lib/supabase/config";
import type {
  VisitorAnalyticsEvent,
  VisitorAnalyticsFeedInfo,
  VisitorAnalyticsStorageInfo,
  VisitorEventType,
  VisitorIpSource,
} from "./types";

const VISITOR_EVENTS_TABLE = "visitor_analytics_events";
export const VISITOR_ANALYTICS_DASHBOARD_LIMIT = 5000;
const VISITOR_ANALYTICS_BATCH_SIZE = 1000;

type VisitorAnalyticsRow = {
  id: string;
  created_at: string;
  event_type: string;
  payload: Partial<VisitorAnalyticsEvent>;
};

type VisitorAnalyticsQueryError = {
  message: string;
};

type VisitorAnalyticsTableClient = {
  insert: (values: Record<string, unknown>) => Promise<{
    error: VisitorAnalyticsQueryError | null;
  }>;
  select: (
    columns: string,
    options?: { count: "exact" }
  ) => {
    order: (
      column: string,
      options: { ascending: boolean }
    ) => {
      range: (
        from: number,
        to: number
      ) => Promise<{
        data: VisitorAnalyticsRow[] | null;
        error: VisitorAnalyticsQueryError | null;
        count: number | null;
      }>;
    };
  };
};

function getVisitorAnalyticsTable() {
  return createAdminClient().from(VISITOR_EVENTS_TABLE) as unknown as VisitorAnalyticsTableClient;
}

const VISITOR_EVENT_TYPES = new Set<VisitorEventType>([
  "pageview",
  "scroll",
  "exit",
  "outbound_click",
  "heartbeat",
  "offline_attempt",
]);

const VISITOR_IP_SOURCES = new Set<VisitorIpSource>([
  "x-vercel-forwarded-for",
  "x-forwarded-for",
  "x-real-ip",
  "unavailable",
]);

function normalizeEventType(value: unknown): VisitorEventType {
  return typeof value === "string" && VISITOR_EVENT_TYPES.has(value as VisitorEventType)
    ? (value as VisitorEventType)
    : "pageview";
}

function normalizeIpSource(value: unknown): VisitorIpSource {
  return typeof value === "string" && VISITOR_IP_SOURCES.has(value as VisitorIpSource)
    ? (value as VisitorIpSource)
    : "unavailable";
}

function getStorageInfo(): VisitorAnalyticsStorageInfo {
  if (!isSupabaseAdminConfigured()) {
    return {
      driver: "none",
      durability: "not-configured",
      location: "Missing Supabase env vars",
      label: "Supabase not configured",
    };
  }

  return {
    driver: "supabase",
    durability: "durable",
    location: VISITOR_EVENTS_TABLE,
    label: "Supabase table",
  };
}

function normalizeQueryParams(queryParams: unknown) {
  if (!Array.isArray(queryParams)) {
    return [];
  }

  return queryParams
    .filter(
      (item): item is { key: string; value: string | null } =>
        Boolean(item && typeof item.key === "string")
    )
    .map((item) => ({
      key: item.key,
      value: item.value ?? null,
    }));
}

function normalizeEvent(row: VisitorAnalyticsRow): VisitorAnalyticsEvent {
  const payload = row.payload ?? {};

  return {
    id: payload.id ?? row.id,
    recordedAt: payload.recordedAt ?? row.created_at,
    eventType: normalizeEventType(payload.eventType ?? row.event_type),
    page: {
      href: payload.page?.href ?? "",
      path: payload.page?.path ?? "",
      pathname: payload.page?.pathname ?? null,
      search: payload.page?.search ?? null,
      title: payload.page?.title ?? null,
      referrer: payload.page?.referrer ?? null,
      referrerHost: payload.page?.referrerHost ?? null,
      queryParams: normalizeQueryParams(payload.page?.queryParams),
    },
    marketing: {
      utmSource: payload.marketing?.utmSource ?? null,
      utmMedium: payload.marketing?.utmMedium ?? null,
      utmCampaign: payload.marketing?.utmCampaign ?? null,
      utmContent: payload.marketing?.utmContent ?? null,
      utmTerm: payload.marketing?.utmTerm ?? null,
      gclid: payload.marketing?.gclid ?? null,
      fbclid: payload.marketing?.fbclid ?? null,
      msclkid: payload.marketing?.msclkid ?? null,
      ttclid: payload.marketing?.ttclid ?? null,
      liFatId: payload.marketing?.liFatId ?? null,
    },
    sessionId: payload.sessionId ?? null,
    consentMode: payload.consentMode ?? "unknown",
    request: {
      method: payload.request?.method ?? "POST",
      host: payload.request?.host ?? null,
      ip: payload.request?.ip ?? null,
      forwardedFor: payload.request?.forwardedFor ?? null,
      realIp: payload.request?.realIp ?? null,
      userAgent: payload.request?.userAgent ?? null,
      acceptLanguage: payload.request?.acceptLanguage ?? null,
      vercelId: payload.request?.vercelId ?? null,
      deploymentUrl: payload.request?.deploymentUrl ?? null,
      ipSource: normalizeIpSource(payload.request?.ipSource),
    },
    parsedUserAgent: {
      isBot: payload.parsedUserAgent?.isBot ?? false,
      browserName: payload.parsedUserAgent?.browserName ?? null,
      browserVersion: payload.parsedUserAgent?.browserVersion ?? null,
      engineName: payload.parsedUserAgent?.engineName ?? null,
      osName: payload.parsedUserAgent?.osName ?? null,
      osVersion: payload.parsedUserAgent?.osVersion ?? null,
      deviceType: payload.parsedUserAgent?.deviceType ?? null,
      deviceVendor: payload.parsedUserAgent?.deviceVendor ?? null,
      deviceModel: payload.parsedUserAgent?.deviceModel ?? null,
      cpuArchitecture: payload.parsedUserAgent?.cpuArchitecture ?? null,
    },
    location: {
      continent: payload.location?.continent ?? null,
      country: payload.location?.country ?? null,
      region: payload.location?.region ?? null,
      city: payload.location?.city ?? null,
      postalCode: payload.location?.postalCode ?? null,
      latitude: payload.location?.latitude ?? null,
      longitude: payload.location?.longitude ?? null,
      timezone: payload.location?.timezone ?? null,
      confidence: payload.location?.confidence ?? "unknown",
      precise: {
        latitude: payload.location?.precise?.latitude ?? null,
        longitude: payload.location?.precise?.longitude ?? null,
        accuracyMeters: payload.location?.precise?.accuracyMeters ?? null,
        altitudeMeters: payload.location?.precise?.altitudeMeters ?? null,
        altitudeAccuracyMeters:
          payload.location?.precise?.altitudeAccuracyMeters ?? null,
        headingDegrees: payload.location?.precise?.headingDegrees ?? null,
        speedMetersPerSecond:
          payload.location?.precise?.speedMetersPerSecond ?? null,
        capturedAt: payload.location?.precise?.capturedAt ?? null,
        source: payload.location?.precise?.source ?? "none",
        permissionState: payload.location?.precise?.permissionState ?? null,
      },
    },
    client: {
      language: payload.client?.language ?? null,
      languages: payload.client?.languages ?? [],
      timezone: payload.client?.timezone ?? null,
      colorScheme: payload.client?.colorScheme ?? null,
      screen: payload.client?.screen ?? null,
      viewport: payload.client?.viewport ?? null,
      device: payload.client?.device ?? null,
      network: payload.client?.network ?? null,
    },
    engagement: {
      scrollPercent: payload.engagement?.scrollPercent ?? null,
      maxScrollPercent: payload.engagement?.maxScrollPercent ?? null,
      timeOnPageMs: payload.engagement?.timeOnPageMs ?? null,
      idleForMs: payload.engagement?.idleForMs ?? null,
      isVisible: payload.engagement?.isVisible ?? null,
      isFocused: payload.engagement?.isFocused ?? null,
    },
    performance: {
      dnsMs: payload.performance?.dnsMs ?? null,
      tcpMs: payload.performance?.tcpMs ?? null,
      tlsMs: payload.performance?.tlsMs ?? null,
      requestMs: payload.performance?.requestMs ?? null,
      responseMs: payload.performance?.responseMs ?? null,
      domInteractiveMs: payload.performance?.domInteractiveMs ?? null,
      domCompleteMs: payload.performance?.domCompleteMs ?? null,
      loadEventMs: payload.performance?.loadEventMs ?? null,
      transferSize: payload.performance?.transferSize ?? null,
      encodedBodySize: payload.performance?.encodedBodySize ?? null,
      decodedBodySize: payload.performance?.decodedBodySize ?? null,
      redirectCount: payload.performance?.redirectCount ?? null,
    },
    link: {
      href: payload.link?.href ?? null,
      host: payload.link?.host ?? null,
      text: payload.link?.text ?? null,
    },
  };
}

export async function recordVisitorAnalyticsEvent(event: VisitorAnalyticsEvent) {
  if (!isSupabaseAdminConfigured()) {
    return { ok: false as const, reason: "missing-config" as const };
  }

  const { error } = await getVisitorAnalyticsTable().insert({
    id: event.id,
    created_at: event.recordedAt,
    event_type: event.eventType,
    path: event.page.path,
    href: event.page.href,
    session_id: event.sessionId,
    ip: event.request.ip,
    country: event.location.country,
    city: event.location.city,
    browser_name: event.parsedUserAgent.browserName,
    os_name: event.parsedUserAgent.osName,
    device_type: event.parsedUserAgent.deviceType,
    payload: event,
  });

  if (error) {
    throw error;
  }

  return { ok: true as const };
}

export async function listVisitorAnalyticsFeed(
  limit = VISITOR_ANALYTICS_DASHBOARD_LIMIT
): Promise<{ events: VisitorAnalyticsEvent[]; feed: VisitorAnalyticsFeedInfo }> {
  if (!isSupabaseAdminConfigured()) {
    return {
      events: [],
      feed: {
        loadedEventCount: 0,
        totalEventCount: 0,
        hasMore: false,
        limit: 0,
      },
    };
  }

  const safeLimit = Math.max(1, Math.min(limit, VISITOR_ANALYTICS_DASHBOARD_LIMIT));
  const rows: VisitorAnalyticsRow[] = [];
  let totalEventCount = 0;

  while (rows.length < safeLimit) {
    const pageSize = Math.min(VISITOR_ANALYTICS_BATCH_SIZE, safeLimit - rows.length);
    const from = rows.length;
    const to = from + pageSize - 1;
    const { data, error, count } = await getVisitorAnalyticsTable()
      .select("id, created_at, event_type, payload", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) {
      throw new Error(error.message);
    }

    const batch = data ?? [];
    totalEventCount = count ?? Math.max(totalEventCount, rows.length + batch.length);
    rows.push(...batch);

    if (batch.length < pageSize) {
      break;
    }
  }

  const events = rows.map(normalizeEvent);
  return {
    events,
    feed: {
      loadedEventCount: events.length,
      totalEventCount: Math.max(totalEventCount, events.length),
      hasMore: totalEventCount > events.length,
      limit: safeLimit,
    },
  };
}

export async function listVisitorAnalyticsEvents(limit = 500) {
  return (await listVisitorAnalyticsFeed(limit)).events;
}

export function getVisitorAnalyticsStorageInfo() {
  return getStorageInfo();
}
