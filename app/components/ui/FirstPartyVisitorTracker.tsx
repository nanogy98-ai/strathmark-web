"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import type { ClientVisitorEvent } from "@/lib/visitor-analytics/schema";
import {
  ANALYTICS_CONSENT_EVENT,
  ANALYTICS_CONSENT_KEY,
} from "@/lib/analytics-consent";

const SESSION_STORAGE_KEY = "strathmark_visitor_analytics_session_id";
const LAST_EVENT_KEY = "strathmark_visitor_analytics_last_key";
const LAST_EVENT_TS_KEY = "strathmark_visitor_analytics_last_ts";
const SCROLL_MILESTONES = [25, 50, 75, 100] as const;
const HEARTBEAT_INTERVAL_MS = 20_000;
const TRACKING_EXCLUDED_PATH_PREFIXES = ["/ops"] as const;

type NavigatorWithConnection = Navigator & {
  deviceMemory?: number;
  connection?: {
    effectiveType?: string;
    downlink?: number;
    rtt?: number;
    saveData?: boolean;
  };
};

type TrackerPayload = ClientVisitorEvent;

function shouldTrackPath(pathname: string) {
  return !TRACKING_EXCLUDED_PATH_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

function hasAnalyticsConsent() {
  try {
    return window.localStorage.getItem(ANALYTICS_CONSENT_KEY) === "analytics";
  } catch {
    return false;
  }
}

function getOrCreateSessionId() {
  try {
    const existing = window.sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (existing) {
      return existing;
    }

    const nextId = crypto.randomUUID();
    window.sessionStorage.setItem(SESSION_STORAGE_KEY, nextId);
    return nextId;
  } catch {
    return null;
  }
}

function getColorScheme() {
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark" as const;
  }

  if (window.matchMedia("(prefers-color-scheme: light)").matches) {
    return "light" as const;
  }

  return "no-preference" as const;
}

function getCurrentUrl() {
  const currentUrl = new URL(window.location.href);
  currentUrl.hash = "";
  return currentUrl;
}

function toNullableString(value: string | null | undefined, maxLength = 255) {
  const trimmed = value?.trim();
  if (!trimmed) {
    return null;
  }

  return trimmed.slice(0, maxLength);
}

function getReferrerHost() {
  if (!document.referrer) {
    return null;
  }

  try {
    return new URL(document.referrer).host;
  } catch {
    return toNullableString(document.referrer, 255);
  }
}

function getQueryParams(currentUrl: URL) {
  return [...currentUrl.searchParams.entries()].slice(0, 32).map(([key, value]) => ({
    key: key.slice(0, 64),
    value: toNullableString(value, 512),
  }));
}

function getMarketingDetails(currentUrl: URL) {
  const params = currentUrl.searchParams;

  return {
    utmSource: toNullableString(params.get("utm_source")),
    utmMedium: toNullableString(params.get("utm_medium")),
    utmCampaign: toNullableString(params.get("utm_campaign")),
    utmContent: toNullableString(params.get("utm_content")),
    utmTerm: toNullableString(params.get("utm_term")),
    gclid: toNullableString(params.get("gclid")),
    fbclid: toNullableString(params.get("fbclid")),
    msclkid: toNullableString(params.get("msclkid")),
    ttclid: toNullableString(params.get("ttclid")),
    liFatId: toNullableString(params.get("li_fat_id")),
  };
}

function getNavigationPerformance() {
  const navigationEntry = performance.getEntriesByType(
    "navigation"
  )[0] as PerformanceNavigationTiming | undefined;

  if (!navigationEntry) {
    return null;
  }

  const safeDelta = (start: number, end: number) =>
    end >= start && start >= 0 ? Math.round(end - start) : null;

  return {
    dnsMs: safeDelta(navigationEntry.domainLookupStart, navigationEntry.domainLookupEnd),
    tcpMs: safeDelta(navigationEntry.connectStart, navigationEntry.connectEnd),
    tlsMs:
      navigationEntry.secureConnectionStart > 0
        ? safeDelta(navigationEntry.secureConnectionStart, navigationEntry.connectEnd)
        : null,
    requestMs: safeDelta(navigationEntry.requestStart, navigationEntry.responseStart),
    responseMs: safeDelta(navigationEntry.responseStart, navigationEntry.responseEnd),
    domInteractiveMs: Math.round(navigationEntry.domInteractive || 0) || null,
    domCompleteMs: Math.round(navigationEntry.domComplete || 0) || null,
    loadEventMs: Math.round(navigationEntry.loadEventEnd || 0) || null,
    transferSize: navigationEntry.transferSize || null,
    encodedBodySize: navigationEntry.encodedBodySize || null,
    decodedBodySize: navigationEntry.decodedBodySize || null,
    redirectCount: navigationEntry.redirectCount || null,
  };
}

function getScrollPercent() {
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;

  if (scrollableHeight <= 0) {
    return 100;
  }

  return Math.max(0, Math.min(100, Math.round((window.scrollY / scrollableHeight) * 100)));
}

function shouldSkipDuplicateEvent(dedupeKey: string) {
  try {
    const lastKey = window.sessionStorage.getItem(LAST_EVENT_KEY);
    const lastTimestamp = Number(window.sessionStorage.getItem(LAST_EVENT_TS_KEY) ?? "0");
    const now = Date.now();

    if (lastKey === dedupeKey && now - lastTimestamp < 2000) {
      return true;
    }

    window.sessionStorage.setItem(LAST_EVENT_KEY, dedupeKey);
    window.sessionStorage.setItem(LAST_EVENT_TS_KEY, String(now));
    return false;
  } catch {
    return false;
  }
}

function buildPayload(
  type: TrackerPayload["type"],
  overrides: Partial<TrackerPayload> = {},
  currentUrl = getCurrentUrl()
): TrackerPayload {
  const navigatorWithConnection = navigator as NavigatorWithConnection;
  const performanceMetrics = getNavigationPerformance();

  return {
    type,
    href: currentUrl.toString(),
    path: `${currentUrl.pathname}${currentUrl.search}`,
    pathname: currentUrl.pathname,
    search: currentUrl.search || null,
    title: document.title || null,
    referrer: document.referrer || null,
    referrerHost: getReferrerHost(),
    queryParams: getQueryParams(currentUrl),
    marketing: getMarketingDetails(currentUrl),
    sessionId: getOrCreateSessionId(),
    language: navigator.language || null,
    languages: navigator.languages?.slice(0, 10) ?? [],
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone ?? null,
    colorScheme: getColorScheme(),
    screen: {
      width: window.screen.width,
      height: window.screen.height,
      pixelRatio: window.devicePixelRatio || null,
      colorDepth: window.screen.colorDepth || null,
    },
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
    device: {
      platform: navigator.platform || null,
      vendor: navigator.vendor || null,
      maxTouchPoints: navigator.maxTouchPoints ?? null,
      hardwareConcurrency: navigator.hardwareConcurrency ?? null,
      deviceMemory: navigatorWithConnection.deviceMemory ?? null,
      cookieEnabled: navigator.cookieEnabled ?? null,
      doNotTrack: navigator.doNotTrack ?? null,
      online: navigator.onLine ?? null,
    },
    network: {
      effectiveType: navigatorWithConnection.connection?.effectiveType ?? null,
      downlink: navigatorWithConnection.connection?.downlink ?? null,
      rtt: navigatorWithConnection.connection?.rtt ?? null,
      saveData: navigatorWithConnection.connection?.saveData ?? null,
    },
    engagement: {
      scrollPercent: null,
      maxScrollPercent: null,
      timeOnPageMs: null,
      idleForMs: null,
      isVisible: document.visibilityState === "visible",
      isFocused: document.hasFocus(),
      ...(overrides.engagement ?? {}),
    },
    performance: {
      dnsMs: performanceMetrics?.dnsMs ?? null,
      tcpMs: performanceMetrics?.tcpMs ?? null,
      tlsMs: performanceMetrics?.tlsMs ?? null,
      requestMs: performanceMetrics?.requestMs ?? null,
      responseMs: performanceMetrics?.responseMs ?? null,
      domInteractiveMs: performanceMetrics?.domInteractiveMs ?? null,
      domCompleteMs: performanceMetrics?.domCompleteMs ?? null,
      loadEventMs: performanceMetrics?.loadEventMs ?? null,
      transferSize: performanceMetrics?.transferSize ?? null,
      encodedBodySize: performanceMetrics?.encodedBodySize ?? null,
      decodedBodySize: performanceMetrics?.decodedBodySize ?? null,
      redirectCount: performanceMetrics?.redirectCount ?? null,
      ...(overrides.performance ?? {}),
    },
    link: {
      href: null,
      host: null,
      text: null,
      ...(overrides.link ?? {}),
    },
  };
}

function sendVisitorEvent(payload: TrackerPayload) {
  return fetch("/api/visitor-analytics", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
    keepalive: true,
  }).catch(() => {
    // Avoid noisy client errors if the collector is unavailable.
  });
}

export function FirstPartyVisitorTracker() {
  const pathname = usePathname() ?? "/";
  const searchParams = useSearchParams();
  const [consentTick, setConsentTick] = useState(0);
  const search = searchParams.toString();

  useEffect(() => {
    const bumpConsentTick = () => {
      setConsentTick((value) => value + 1);
    };

    const handleStorage = (event: StorageEvent) => {
      if (event.key === ANALYTICS_CONSENT_KEY) {
        bumpConsentTick();
      }
    };

    window.addEventListener(ANALYTICS_CONSENT_EVENT, bumpConsentTick);
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener(ANALYTICS_CONSENT_EVENT, bumpConsentTick);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  useEffect(() => {
    if (!shouldTrackPath(pathname)) {
      return;
    }

    if (!hasAnalyticsConsent()) {
      return;
    }

    const routeUrl = getCurrentUrl();
    const dedupeKey = `${pathname}?${search}`;
    const routeStartedAt = Date.now();
    let maxScrollPercent = getScrollPercent();
    let lastInteractionAt = routeStartedAt;
    let exitEventSent = false;
    const reachedMilestones = new Set<number>();

    const buildEngagementSnapshot = (scrollPercent = getScrollPercent()) => ({
      scrollPercent,
      maxScrollPercent: Math.max(maxScrollPercent, scrollPercent),
      timeOnPageMs: Date.now() - routeStartedAt,
      idleForMs: Date.now() - lastInteractionAt,
      isVisible: document.visibilityState === "visible",
      isFocused: document.hasFocus(),
    });

    const sendExitEvent = () => {
      if (exitEventSent || !hasAnalyticsConsent()) {
        return;
      }

      exitEventSent = true;
      const currentScrollPercent = getScrollPercent();
      maxScrollPercent = Math.max(maxScrollPercent, currentScrollPercent);
      void sendVisitorEvent(
        buildPayload("exit", {
          engagement: buildEngagementSnapshot(currentScrollPercent),
        }, routeUrl)
      );
    };

    const sendHeartbeat = () => {
      if (!hasAnalyticsConsent()) {
        return;
      }

      const currentScrollPercent = getScrollPercent();
      maxScrollPercent = Math.max(maxScrollPercent, currentScrollPercent);

      if (shouldSkipDuplicateEvent(`heartbeat:${dedupeKey}`)) {
        return;
      }

      void sendVisitorEvent(
        buildPayload("heartbeat", {
          engagement: buildEngagementSnapshot(currentScrollPercent),
        }, routeUrl)
      );
    };

    const pageviewTimer = window.setTimeout(() => {
      if (shouldSkipDuplicateEvent(dedupeKey)) {
        return;
      }

      const currentScrollPercent = getScrollPercent();
      maxScrollPercent = Math.max(maxScrollPercent, currentScrollPercent);
      void sendVisitorEvent(
        buildPayload("pageview", {
          engagement: buildEngagementSnapshot(currentScrollPercent),
        }, routeUrl)
      );
    }, 180);

    const handleScroll = () => {
      lastInteractionAt = Date.now();
      const currentScrollPercent = getScrollPercent();
      maxScrollPercent = Math.max(maxScrollPercent, currentScrollPercent);

      for (const milestone of SCROLL_MILESTONES) {
        if (currentScrollPercent < milestone || reachedMilestones.has(milestone)) {
          continue;
        }

        reachedMilestones.add(milestone);
        void sendVisitorEvent(
          buildPayload("scroll", {
            engagement: buildEngagementSnapshot(milestone),
          }, routeUrl)
        );
      }
    };

    const handleDocumentClick = (event: MouseEvent) => {
      if (!hasAnalyticsConsent()) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      const anchor = target.closest("a[href]");
      if (!anchor) {
        return;
      }

      const rawHref = anchor.getAttribute("href");
      if (
        !rawHref ||
        rawHref.startsWith("#") ||
        rawHref.startsWith("mailto:") ||
        rawHref.startsWith("tel:")
      ) {
        return;
      }

      try {
        const resolvedUrl = new URL(rawHref, window.location.href);
        if (resolvedUrl.origin === window.location.origin) {
          return;
        }

        void sendVisitorEvent(
          buildPayload("outbound_click", {
            engagement: buildEngagementSnapshot(maxScrollPercent),
            link: {
              href: resolvedUrl.toString(),
              host: resolvedUrl.host,
              text: toNullableString(anchor.textContent, 255),
            },
          }, routeUrl)
        );
      } catch {
        // Ignore malformed URLs.
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        lastInteractionAt = Date.now();
      }

      sendHeartbeat();
    };

    const handleFocusChange = () => {
      if (document.hasFocus()) {
        lastInteractionAt = Date.now();
      }

      sendHeartbeat();
    };

    const markInteraction = () => {
      lastInteractionAt = Date.now();
    };

    const heartbeatTimer = window.setInterval(() => {
      sendHeartbeat();
    }, HEARTBEAT_INTERVAL_MS);

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("pagehide", sendExitEvent);
    window.addEventListener("focus", handleFocusChange);
    window.addEventListener("blur", handleFocusChange);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("click", handleDocumentClick, true);
    document.addEventListener("pointerdown", markInteraction, true);
    document.addEventListener("keydown", markInteraction, true);

    return () => {
      window.clearTimeout(pageviewTimer);
      window.clearInterval(heartbeatTimer);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("pagehide", sendExitEvent);
      window.removeEventListener("focus", handleFocusChange);
      window.removeEventListener("blur", handleFocusChange);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("click", handleDocumentClick, true);
      document.removeEventListener("pointerdown", markInteraction, true);
      document.removeEventListener("keydown", markInteraction, true);
      sendExitEvent();
    };
  }, [consentTick, pathname, search]);

  return null;
}
