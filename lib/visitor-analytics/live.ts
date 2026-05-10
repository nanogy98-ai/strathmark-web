import type {
  VisitorAnalyticsEvent,
  VisitorEventType,
  VisitorLocationConfidence,
} from "./types";

export const LIVE_VISITOR_WINDOW_MS = 90_000;

export type LiveVisitorSession = {
  key: string;
  sessionId: string | null;
  firstSeenAt: string;
  lastSeenAt: string;
  currentEventType: VisitorEventType;
  currentPath: string;
  currentTitle: string | null;
  currentHref: string;
  pageCount: number;
  pagePaths: string[];
  eventCount: number;
  ip: string | null;
  country: string | null;
  region: string | null;
  city: string | null;
  postalCode: string | null;
  locationConfidence: VisitorLocationConfidence;
  preciseLatitude: number | null;
  preciseLongitude: number | null;
  preciseAccuracyMeters: number | null;
  browserName: string | null;
  browserVersion: string | null;
  osName: string | null;
  deviceType: string | null;
  referrerHost: string | null;
  campaignLabel: string | null;
  scrollPercent: number | null;
  maxScrollPercent: number | null;
  timeOnPageMs: number | null;
  idleForMs: number | null;
  isVisible: boolean | null;
  isFocused: boolean | null;
  networkType: string | null;
};

type LiveVisitorAccumulator = {
  key: string;
  sessionId: string | null;
  firstSeenAt: string;
  firstSeenMs: number;
  lastSeenAt: string;
  lastSeenMs: number;
  currentEventType: VisitorEventType;
  currentPath: string;
  currentTitle: string | null;
  currentHref: string;
  pagePaths: Set<string>;
  eventCount: number;
  ip: string | null;
  country: string | null;
  region: string | null;
  city: string | null;
  postalCode: string | null;
  locationConfidence: VisitorLocationConfidence;
  preciseLatitude: number | null;
  preciseLongitude: number | null;
  preciseAccuracyMeters: number | null;
  browserName: string | null;
  browserVersion: string | null;
  osName: string | null;
  deviceType: string | null;
  referrerHost: string | null;
  campaignLabel: string | null;
  scrollPercent: number | null;
  maxScrollPercent: number | null;
  timeOnPageMs: number | null;
  idleForMs: number | null;
  isVisible: boolean | null;
  isFocused: boolean | null;
  networkType: string | null;
};

function buildSessionKey(event: VisitorAnalyticsEvent) {
  if (event.sessionId) {
    return event.sessionId;
  }

  return [
    event.request.ip ?? "unknown-ip",
    event.request.userAgent ?? "unknown-ua",
    event.page.pathname ?? event.page.path,
  ].join("::");
}

function getCampaignLabel(event: VisitorAnalyticsEvent) {
  return (
    event.marketing.utmCampaign ??
    event.marketing.utmSource ??
    event.marketing.gclid ??
    event.marketing.fbclid ??
    null
  );
}

function getMostRecentNumber(
  current: number | null,
  candidate: number | null | undefined,
  eventMs: number,
  latestMs: number
) {
  if (candidate === null || candidate === undefined) {
    return current;
  }

  return eventMs >= latestMs ? candidate : current;
}

function getMostRecentBoolean(
  current: boolean | null,
  candidate: boolean | null | undefined,
  eventMs: number,
  latestMs: number
) {
  if (candidate === null || candidate === undefined) {
    return current;
  }

  return eventMs >= latestMs ? candidate : current;
}

export function buildLiveVisitorSessions(
  events: VisitorAnalyticsEvent[],
  now = Date.now(),
  windowMs = LIVE_VISITOR_WINDOW_MS
) {
  const activeThreshold = now - windowMs;
  const sessions = new Map<string, LiveVisitorAccumulator>();

  for (const event of events) {
    const eventMs = new Date(event.recordedAt).getTime();
    if (Number.isNaN(eventMs) || eventMs < activeThreshold) {
      continue;
    }

    const key = buildSessionKey(event);
    const existing = sessions.get(key);

    if (!existing) {
      sessions.set(key, {
        key,
        sessionId: event.sessionId,
        firstSeenAt: event.recordedAt,
        firstSeenMs: eventMs,
        lastSeenAt: event.recordedAt,
        lastSeenMs: eventMs,
        currentEventType: event.eventType,
        currentPath: event.page.path,
        currentTitle: event.page.title,
        currentHref: event.page.href,
        pagePaths: new Set([event.page.path]),
        eventCount: 1,
        ip: event.request.ip,
        country: event.location.country,
        region: event.location.region,
        city: event.location.city,
        postalCode: event.location.postalCode,
        locationConfidence: event.location.confidence,
        preciseLatitude: event.location.precise.latitude,
        preciseLongitude: event.location.precise.longitude,
        preciseAccuracyMeters: event.location.precise.accuracyMeters,
        browserName: event.parsedUserAgent.browserName,
        browserVersion: event.parsedUserAgent.browserVersion,
        osName: event.parsedUserAgent.osName,
        deviceType: event.parsedUserAgent.deviceType,
        referrerHost: event.page.referrerHost,
        campaignLabel: getCampaignLabel(event),
        scrollPercent: event.engagement.scrollPercent,
        maxScrollPercent:
          event.engagement.maxScrollPercent ?? event.engagement.scrollPercent ?? null,
        timeOnPageMs: event.engagement.timeOnPageMs,
        idleForMs: event.engagement.idleForMs,
        isVisible: event.engagement.isVisible,
        isFocused: event.engagement.isFocused,
        networkType: event.client.network?.effectiveType ?? null,
      });
      continue;
    }

    existing.eventCount += 1;
    existing.pagePaths.add(event.page.path);

    if (eventMs < existing.firstSeenMs) {
      existing.firstSeenMs = eventMs;
      existing.firstSeenAt = event.recordedAt;
    }

    if (eventMs >= existing.lastSeenMs) {
      existing.lastSeenMs = eventMs;
      existing.lastSeenAt = event.recordedAt;
      existing.currentEventType = event.eventType;
      existing.currentPath = event.page.path;
      existing.currentTitle = event.page.title;
      existing.currentHref = event.page.href;
      existing.ip = event.request.ip ?? existing.ip;
      existing.country = event.location.country ?? existing.country;
      existing.region = event.location.region ?? existing.region;
      existing.city = event.location.city ?? existing.city;
      existing.postalCode = event.location.postalCode ?? existing.postalCode;
      existing.locationConfidence = event.location.confidence ?? existing.locationConfidence;
      existing.preciseLatitude =
        event.location.precise.latitude ?? existing.preciseLatitude;
      existing.preciseLongitude =
        event.location.precise.longitude ?? existing.preciseLongitude;
      existing.preciseAccuracyMeters =
        event.location.precise.accuracyMeters ?? existing.preciseAccuracyMeters;
      existing.browserName = event.parsedUserAgent.browserName ?? existing.browserName;
      existing.browserVersion =
        event.parsedUserAgent.browserVersion ?? existing.browserVersion;
      existing.osName = event.parsedUserAgent.osName ?? existing.osName;
      existing.deviceType = event.parsedUserAgent.deviceType ?? existing.deviceType;
      existing.referrerHost = event.page.referrerHost ?? existing.referrerHost;
      existing.campaignLabel = getCampaignLabel(event) ?? existing.campaignLabel;
      existing.networkType = event.client.network?.effectiveType ?? existing.networkType;
    }

    existing.scrollPercent = getMostRecentNumber(
      existing.scrollPercent,
      event.engagement.scrollPercent,
      eventMs,
      existing.lastSeenMs
    );
    existing.maxScrollPercent = Math.max(
      existing.maxScrollPercent ?? 0,
      event.engagement.maxScrollPercent ?? event.engagement.scrollPercent ?? 0
    );
    existing.timeOnPageMs = getMostRecentNumber(
      existing.timeOnPageMs,
      event.engagement.timeOnPageMs,
      eventMs,
      existing.lastSeenMs
    );
    existing.idleForMs = getMostRecentNumber(
      existing.idleForMs,
      event.engagement.idleForMs,
      eventMs,
      existing.lastSeenMs
    );
    existing.isVisible = getMostRecentBoolean(
      existing.isVisible,
      event.engagement.isVisible,
      eventMs,
      existing.lastSeenMs
    );
    existing.isFocused = getMostRecentBoolean(
      existing.isFocused,
      event.engagement.isFocused,
      eventMs,
      existing.lastSeenMs
    );
  }

  return [...sessions.values()]
    .sort((left, right) => right.lastSeenMs - left.lastSeenMs)
    .map((session) => ({
      key: session.key,
      sessionId: session.sessionId,
      firstSeenAt: session.firstSeenAt,
      lastSeenAt: session.lastSeenAt,
      currentEventType: session.currentEventType,
      currentPath: session.currentPath,
      currentTitle: session.currentTitle,
      currentHref: session.currentHref,
      pageCount: session.pagePaths.size,
      pagePaths: [...session.pagePaths].slice(0, 6),
      eventCount: session.eventCount,
      ip: session.ip,
      country: session.country,
      region: session.region,
      city: session.city,
      postalCode: session.postalCode,
      locationConfidence: session.locationConfidence,
      preciseLatitude: session.preciseLatitude,
      preciseLongitude: session.preciseLongitude,
      preciseAccuracyMeters: session.preciseAccuracyMeters,
      browserName: session.browserName,
      browserVersion: session.browserVersion,
      osName: session.osName,
      deviceType: session.deviceType,
      referrerHost: session.referrerHost,
      campaignLabel: session.campaignLabel,
      scrollPercent: session.scrollPercent,
      maxScrollPercent: session.maxScrollPercent,
      timeOnPageMs: session.timeOnPageMs,
      idleForMs: session.idleForMs,
      isVisible: session.isVisible,
      isFocused: session.isFocused,
      networkType: session.networkType,
    }));
}
