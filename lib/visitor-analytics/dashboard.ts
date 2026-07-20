import type { LiveVisitorSession } from "./live";
import type { VisitorAnalyticsEvent, VisitorEventType } from "./types";

export type VisitorDatePreset = "24h" | "7d" | "30d" | "all";
export type VisitorTrafficKind = "all" | "people" | "bots";
export type VisitorTopItem = { label: string; count: number };

export type VisitorSessionFilters = {
  datePreset: VisitorDatePreset;
  search: string;
  country: string;
  eventType: VisitorEventType | "all";
  trafficKind: VisitorTrafficKind;
};

export type VisitorDashboardSummary = {
  visits: number;
  liveVisits: number;
  uniqueIps: number;
  pageviews: number;
  rawEvents: number;
  heartbeatEvents: number;
  outboundClicks: number;
  averageDurationMs: number | null;
  averagePagesPerVisit: number | null;
  ipCoveragePercent: number;
  latestEventAt: string | null;
};

function sessionMatchesPreset(
  session: LiveVisitorSession,
  preset: VisitorDatePreset,
  now: number
) {
  if (preset === "all") {
    return true;
  }

  const durationMs =
    preset === "24h"
      ? 24 * 60 * 60 * 1000
      : preset === "7d"
        ? 7 * 24 * 60 * 60 * 1000
        : 30 * 24 * 60 * 60 * 1000;

  return new Date(session.lastSeenAt).getTime() >= now - durationMs;
}

export function buildSessionSearchIndex(session: LiveVisitorSession) {
  return [
    session.ip,
    session.currentPath,
    session.firstPath,
    session.currentTitle,
    session.currentHref,
    ...session.pagePaths,
    session.country,
    session.region,
    session.city,
    session.postalCode,
    session.browserName,
    session.browserVersion,
    session.osName,
    session.deviceType,
    session.referrerHost,
    session.campaignLabel,
    session.sessionId,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function hasEventType(session: LiveVisitorSession, eventType: VisitorEventType) {
  if (eventType === "pageview") return session.pageviewCount > 0;
  if (eventType === "heartbeat") return session.heartbeatCount > 0;
  if (eventType === "scroll") return session.scrollCount > 0;
  if (eventType === "outbound_click") return session.outboundClickCount > 0;
  if (eventType === "exit") return session.exitCount > 0;
  return session.offlineAttemptCount > 0;
}

export function filterVisitorSessions(
  sessions: LiveVisitorSession[],
  filters: VisitorSessionFilters,
  now: number
) {
  const search = filters.search.trim().toLowerCase();

  return sessions.filter((session) => {
    if (!sessionMatchesPreset(session, filters.datePreset, now)) {
      return false;
    }

    if (search && !buildSessionSearchIndex(session).includes(search)) {
      return false;
    }

    if (filters.country !== "all" && (session.country ?? "Unknown") !== filters.country) {
      return false;
    }

    if (filters.eventType !== "all" && !hasEventType(session, filters.eventType)) {
      return false;
    }

    if (filters.trafficKind === "people" && session.isBot) {
      return false;
    }

    if (filters.trafficKind === "bots" && !session.isBot) {
      return false;
    }

    return true;
  });
}

export function takeTopCounts(
  values: Array<string | null | undefined>,
  limit = 5
): VisitorTopItem[] {
  const counts = new Map<string, number>();

  for (const value of values) {
    const key = value?.trim() || "Unknown";
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }

  return [...counts.entries()]
    .toSorted((left, right) => right[1] - left[1] || left[0].localeCompare(right[0]))
    .slice(0, limit)
    .map(([label, count]) => ({ label, count }));
}

export function buildVisitorDashboardSummary({
  sessions,
  liveSessionKeys,
}: {
  sessions: LiveVisitorSession[];
  liveSessionKeys: Set<string>;
}): VisitorDashboardSummary {
  if (sessions.length === 0) {
    return {
      visits: 0,
      liveVisits: 0,
      uniqueIps: 0,
      pageviews: 0,
      rawEvents: 0,
      heartbeatEvents: 0,
      outboundClicks: 0,
      averageDurationMs: null,
      averagePagesPerVisit: null,
      ipCoveragePercent: 0,
      latestEventAt: null,
    };
  }

  let pageviews = 0;
  let rawEvents = 0;
  let heartbeatEvents = 0;
  let outboundClicks = 0;
  let totalDurationMs = 0;
  let totalPages = 0;
  let sessionsWithIp = 0;
  let latestEventAt = sessions[0]?.lastSeenAt ?? null;
  const uniqueIps = new Set<string>();

  for (const session of sessions) {
    pageviews += session.pageviewCount;
    rawEvents += session.eventCount;
    heartbeatEvents += session.heartbeatCount;
    outboundClicks += session.outboundClickCount;
    totalDurationMs += session.durationMs;
    totalPages += session.pageCount;

    if (session.ip) {
      uniqueIps.add(session.ip);
      sessionsWithIp += 1;
    }

    if (
      !latestEventAt ||
      new Date(session.lastSeenAt).getTime() > new Date(latestEventAt).getTime()
    ) {
      latestEventAt = session.lastSeenAt;
    }
  }

  return {
    visits: sessions.length,
    liveVisits: sessions.filter((session) => liveSessionKeys.has(session.key)).length,
    uniqueIps: uniqueIps.size,
    pageviews,
    rawEvents,
    heartbeatEvents,
    outboundClicks,
    averageDurationMs: totalDurationMs / sessions.length,
    averagePagesPerVisit: totalPages / sessions.length,
    ipCoveragePercent: Math.round((sessionsWithIp / sessions.length) * 100),
    latestEventAt,
  };
}

export function getSessionEventsWithoutHeartbeat(session: LiveVisitorSession) {
  return session.events.filter((event) => event.eventType !== "heartbeat");
}

export function getEventsForSessions(sessions: LiveVisitorSession[]): VisitorAnalyticsEvent[] {
  return sessions.flatMap((session) => session.events);
}
