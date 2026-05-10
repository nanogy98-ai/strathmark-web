"use client";

import {
  startTransition,
  useDeferredValue,
  useEffect,
  useEffectEvent,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import {
  Activity,
  ArrowUpRight,
  Clock3,
  Filter,
  Globe2,
  MapPinned,
  MousePointerClick,
  Radar,
  RefreshCw,
  Search,
  ShieldAlert,
  Wifi,
} from "lucide-react";
import { VisitorsSessionControls } from "@/app/ops/visitors/VisitorsSessionControls";
import {
  LIVE_VISITOR_WINDOW_MS,
  buildLiveVisitorSessions,
  buildVisitorSessions,
  type LiveVisitorSession,
} from "@/lib/visitor-analytics/live";
import type {
  VisitorAnalyticsEvent,
  VisitorAnalyticsStorageInfo,
  VisitorEventType,
  VisitorLocationConfidence,
} from "@/lib/visitor-analytics/types";

type DatePreset = "24h" | "7d" | "30d" | "all";
type TopItem = { label: string; count: number };
type TrendPoint = { label: string; fullLabel: string; count: number };
type LiveDashboardPayload = {
  ok: boolean;
  events?: VisitorAnalyticsEvent[];
  storage?: VisitorAnalyticsStorageInfo;
  refreshedAt?: string;
  error?: string;
};

const DATE_PRESETS: Array<{ key: DatePreset; label: string }> = [
  { key: "24h", label: "24h" },
  { key: "7d", label: "7 days" },
  { key: "30d", label: "30 days" },
  { key: "all", label: "All time" },
];

const DONUT_COLORS = ["#d4af63", "#f8fafc", "#7dd3fc", "#34d399", "#f472b6", "#fb923c"];
const LIVE_REFRESH_INTERVAL_MS = 15_000;
const DASHBOARD_TIME_ZONE = "Europe/London";

function formatCount(value: number) {
  return new Intl.NumberFormat("en-GB").format(value);
}

function formatTimestamp(value: string | null) {
  if (!value) {
    return "No data yet";
  }

  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: DASHBOARD_TIME_ZONE,
  }).format(new Date(value));
}

function formatTimeOfDay(value: string | null) {
  if (!value) {
    return "Not synced yet";
  }

  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: DASHBOARD_TIME_ZONE,
  }).format(new Date(value));
}

function formatRelativeAge(value: string, now: number) {
  const deltaMs = Math.max(0, now - new Date(value).getTime());
  if (deltaMs < 5_000) {
    return "Just now";
  }

  const seconds = Math.round(deltaMs / 1000);
  if (seconds < 60) {
    return `${seconds}s ago`;
  }

  const minutes = Math.round(seconds / 60);
  if (minutes < 60) {
    return `${minutes}m ago`;
  }

  const hours = Math.round(minutes / 60);
  return `${hours}h ago`;
}

function formatDuration(value: number | null) {
  if (!value || value <= 0) {
    return "0s";
  }

  if (value < 1000) {
    return `${Math.round(value)}ms`;
  }

  const seconds = Math.round(value / 1000);
  if (seconds < 60) {
    return `${seconds}s`;
  }

  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  return remainderSeconds > 0 ? `${minutes}m ${remainderSeconds}s` : `${minutes}m`;
}

function formatPercent(value: number | null) {
  if (value === null || Number.isNaN(value)) {
    return "0%";
  }

  return `${Math.round(value)}%`;
}

function toStartOfDay(value: string) {
  return new Date(`${value}T00:00:00`).getTime();
}

function toEndOfDay(value: string) {
  return new Date(`${value}T23:59:59.999`).getTime();
}

function matchesPreset(recordedAt: string, preset: DatePreset, now: number) {
  if (preset === "all") {
    return true;
  }

  const recordedTime = new Date(recordedAt).getTime();
  const durationMs =
    preset === "24h"
      ? 24 * 60 * 60 * 1000
      : preset === "7d"
        ? 7 * 24 * 60 * 60 * 1000
        : 30 * 24 * 60 * 60 * 1000;

  return recordedTime >= now - durationMs;
}

function getEventTone(eventType: VisitorEventType) {
  if (eventType === "pageview") {
    return "bg-sky-400/15 text-sky-200 border-sky-400/20";
  }

  if (eventType === "scroll") {
    return "bg-gold/15 text-gold border-gold/25";
  }

  if (eventType === "outbound_click") {
    return "bg-emerald-400/15 text-emerald-200 border-emerald-400/20";
  }

  if (eventType === "heartbeat") {
    return "bg-fuchsia-400/15 text-fuchsia-200 border-fuchsia-400/20";
  }

  return "bg-white/10 text-slate-200 border-white/10";
}

function getEventLabel(eventType: VisitorEventType) {
  if (eventType === "outbound_click") {
    return "Clicked External Link";
  }

  if (eventType === "pageview") {
    return "Opened Page";
  }

  if (eventType === "scroll") {
    return "Read Further Down";
  }

  if (eventType === "heartbeat") {
    return "Still On Page";
  }

  return "Left Page";
}

function getReferrerLabel(event: VisitorAnalyticsEvent) {
  return event.page.referrerHost ?? "Direct visit";
}

function getLocationConfidenceLabel(confidence: VisitorLocationConfidence) {
  if (confidence === "precise") {
    return "Exact Location";
  }

  if (confidence === "city") {
    return "Approx City";
  }

  if (confidence === "country") {
    return "Approx Country";
  }

  return "Location Unclear";
}

function getLocationConfidenceTone(confidence: VisitorLocationConfidence) {
  if (confidence === "precise") {
    return "bg-emerald-400/15 text-emerald-200 border-emerald-400/20";
  }

  if (confidence === "city") {
    return "bg-gold/15 text-gold border-gold/25";
  }

  if (confidence === "country") {
    return "bg-sky-400/15 text-sky-200 border-sky-400/20";
  }

  return "bg-white/10 text-slate-200 border-white/10";
}

function getLivePreciseCoordinatesLabel(session: LiveVisitorSession) {
  if (session.preciseLatitude === null || session.preciseLongitude === null) {
    return null;
  }

  const coordinates = `${session.preciseLatitude.toFixed(5)}, ${session.preciseLongitude.toFixed(5)}`;
  if (session.preciseAccuracyMeters === null) {
    return coordinates;
  }

  return `${coordinates} ±${Math.round(session.preciseAccuracyMeters)}m`;
}

function getCityLabel(event: VisitorAnalyticsEvent) {
  const bits = [event.location.city, event.location.region, event.location.country].filter(Boolean);
  return bits.length > 0 ? bits.join(", ") : null;
}

function getLiveLocationLabel(session: LiveVisitorSession) {
  const bits = [session.city, session.region, session.country, session.postalCode].filter(Boolean);
  return bits.length > 0 ? bits.join(", ") : "Unknown";
}

function getLiveDeviceLabel(session: LiveVisitorSession) {
  const bits = [
    session.browserName,
    session.browserVersion,
    session.deviceType,
    session.osName,
  ].filter(Boolean);

  return bits.length > 0 ? bits.join(" / ") : "Unknown";
}

function getCampaignLabel(event: VisitorAnalyticsEvent) {
  return (
    event.marketing.utmCampaign ??
    event.marketing.utmSource ??
    event.marketing.gclid ??
    event.marketing.fbclid ??
    "Unattributed"
  );
}

function buildSearchIndex(event: VisitorAnalyticsEvent) {
  return [
    event.page.path,
    event.page.href,
    event.page.pathname,
    event.page.title,
    event.page.referrer,
    event.page.referrerHost,
    event.request.ip,
    event.location.country,
    event.location.region,
    event.location.city,
    event.parsedUserAgent.browserName,
    event.parsedUserAgent.osName,
    event.parsedUserAgent.deviceType,
    event.parsedUserAgent.deviceModel,
    event.marketing.utmSource,
    event.marketing.utmMedium,
    event.marketing.utmCampaign,
    event.marketing.utmContent,
    event.marketing.utmTerm,
    event.link.href,
    event.link.host,
    event.link.text,
    getEventLabel(event.eventType),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function takeTopCounts(values: Array<string | null | undefined>, limit = 6) {
  const counts = new Map<string, number>();

  for (const value of values) {
    const key = value?.trim() || "Unknown";
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }

  return [...counts.entries()]
    .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0]))
    .slice(0, limit)
    .map(([label, count]) => ({ label, count }));
}

function buildTrendPoints(events: VisitorAnalyticsEvent[]) {
  if (events.length === 0) {
    return [];
  }

  const timestamps = events.map((event) => new Date(event.recordedAt).getTime());
  const minTime = Math.min(...timestamps);
  const maxTime = Math.max(...timestamps);
  const spanMs = Math.max(maxTime - minTime, 1);
  const bucketMs = spanMs <= 72 * 60 * 60 * 1000 ? 60 * 60 * 1000 : 24 * 60 * 60 * 1000;
  const bucketStart = Math.floor(minTime / bucketMs) * bucketMs;
  const bucketEnd = Math.ceil(maxTime / bucketMs) * bucketMs;
  const buckets = new Map<number, number>();

  for (let current = bucketStart; current <= bucketEnd; current += bucketMs) {
    buckets.set(current, 0);
  }

  for (const event of events) {
    const bucket = Math.floor(new Date(event.recordedAt).getTime() / bucketMs) * bucketMs;
    buckets.set(bucket, (buckets.get(bucket) ?? 0) + 1);
  }

  return [...buckets.entries()].map(([time, count]) => {
    const date = new Date(time);

    return {
      label:
        bucketMs === 60 * 60 * 1000
          ? new Intl.DateTimeFormat("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
              timeZone: DASHBOARD_TIME_ZONE,
            }).format(date)
          : new Intl.DateTimeFormat("en-GB", {
              day: "2-digit",
              month: "short",
              timeZone: DASHBOARD_TIME_ZONE,
            }).format(date),
      fullLabel: formatTimestamp(date.toISOString()),
      count,
    };
  });
}

function matchesSharedFilters(
  event: VisitorAnalyticsEvent,
  deferredSearch: string,
  deferredIpFilter: string,
  countryFilter: string,
  browserFilter: string,
  deviceFilter: string
) {
  const matchesSearch = deferredSearch ? buildSearchIndex(event).includes(deferredSearch) : true;
  const matchesIp = deferredIpFilter
    ? (event.request.ip ?? "").toLowerCase().includes(deferredIpFilter)
    : true;
  const matchesCountry =
    countryFilter === "all" ? true : (event.location.country ?? "Unknown") === countryFilter;
  const matchesBrowser =
    browserFilter === "all"
      ? true
      : (event.parsedUserAgent.browserName ?? "Unknown") === browserFilter;
  const matchesDevice =
    deviceFilter === "all"
      ? true
      : (event.parsedUserAgent.deviceType ?? "Unknown") === deviceFilter;

  return matchesSearch && matchesIp && matchesCountry && matchesBrowser && matchesDevice;
}

function getLiveStatusTone(session: LiveVisitorSession, now: number) {
  const ageMs = now - new Date(session.lastSeenAt).getTime();

  if (session.isFocused) {
    return "bg-emerald-400/15 text-emerald-200 border-emerald-400/20";
  }

  if (session.isVisible && ageMs <= 30_000) {
    return "bg-gold/15 text-gold border-gold/20";
  }

  return "bg-white/10 text-slate-200 border-white/10";
}

function getLiveStatusLabel(session: LiveVisitorSession, now: number) {
  const ageMs = now - new Date(session.lastSeenAt).getTime();

  if (session.isFocused) {
    return "Active Now";
  }

  if (session.isVisible) {
    return ageMs <= 30_000 ? "Open On Screen" : "Still Open";
  }

  return "In Background";
}

function MetricCard({
  icon,
  label,
  value,
  hint,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="border border-white/10 bg-white/[0.03] p-5 shadow-[0_30px_80px_rgba(2,6,23,0.18)]">
      <div className="flex items-center justify-between">
        <div className="text-slate-500">{icon}</div>
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-slate-500">
          {label}
        </p>
      </div>
      <p className="mt-4 text-3xl font-bold text-white">{value}</p>
      <p className="mt-2 text-sm text-slate-400">{hint}</p>
    </div>
  );
}

function TrendAreaChart({ points }: { points: TrendPoint[] }) {
  if (points.length === 0) {
    return <p className="text-sm text-slate-500">No time-series data yet.</p>;
  }

  const width = 720;
  const height = 220;
  const padding = 22;
  const maxCount = Math.max(...points.map((point) => point.count), 1);
  const step = points.length > 1 ? (width - padding * 2) / (points.length - 1) : 0;
  const coords = points.map((point, index) => ({
    ...point,
    x: padding + index * step,
    y: height - padding - (point.count / maxCount) * (height - padding * 2),
  }));
  const linePath = coords
    .map((coord, index) => `${index === 0 ? "M" : "L"} ${coord.x} ${coord.y}`)
    .join(" ");
  const first = coords[0];
  const last = coords[coords.length - 1];
  const areaPath = `${linePath} L ${last.x} ${height - padding} L ${first.x} ${height - padding} Z`;

  return (
    <div className="space-y-4">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full overflow-visible">
        {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
          const y = height - padding - ratio * (height - padding * 2);

          return (
            <g key={ratio}>
              <line
                x1={padding}
                y1={y}
                x2={width - padding}
                y2={y}
                stroke="rgba(148,163,184,0.12)"
              />
              <text
                x={width - padding + 8}
                y={y + 4}
                fill="rgba(148,163,184,0.7)"
                fontSize="10"
              >
                {Math.round(maxCount * ratio)}
              </text>
            </g>
          );
        })}

        <path d={areaPath} fill="url(#visitorTrendFill)" opacity="0.9" />
        <path
          d={linePath}
          fill="none"
          stroke="#d4af63"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {coords.map((coord) => (
          <g key={coord.fullLabel}>
            <circle
              cx={coord.x}
              cy={coord.y}
              r="3.5"
              fill="#f8fafc"
              stroke="#d4af63"
              strokeWidth="2"
            />
            <title>{`${coord.fullLabel}: ${coord.count}`}</title>
          </g>
        ))}
        <defs>
          <linearGradient id="visitorTrendFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="rgba(212,175,99,0.45)" />
            <stop offset="100%" stopColor="rgba(212,175,99,0.02)" />
          </linearGradient>
        </defs>
      </svg>

      <div className="grid grid-cols-4 gap-2 text-[11px] uppercase tracking-[0.2em] text-slate-500 md:grid-cols-6">
        {points.slice(Math.max(points.length - 6, 0)).map((point) => (
          <div key={point.fullLabel} className="truncate">
            {point.label}
          </div>
        ))}
      </div>
    </div>
  );
}

function DonutChart({
  title,
  items,
  totalLabel,
}: {
  title: string;
  items: TopItem[];
  totalLabel: string;
}) {
  const total = items.reduce((sum, item) => sum + item.count, 0);

  if (total === 0) {
    return (
      <div className="border border-white/10 bg-white/[0.03] p-6">
        <h2 className="font-serif text-2xl font-bold text-white">{title}</h2>
        <p className="mt-6 text-sm text-slate-500">No data yet.</p>
      </div>
    );
  }

  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  const segments = items.map((item, index) => {
    const consumedLength = items
      .slice(0, index)
      .reduce((sum, current) => sum + (current.count / total) * circumference, 0);
    const segmentLength = (item.count / total) * circumference;

    return {
      label: item.label,
      dashArray: `${segmentLength} ${circumference - segmentLength}`,
      dashOffset: -consumedLength,
      color: DONUT_COLORS[index % DONUT_COLORS.length],
    };
  });

  return (
    <div className="border border-white/10 bg-white/[0.03] p-6">
      <h2 className="font-serif text-2xl font-bold text-white">{title}</h2>
      <div className="mt-6 grid gap-6 md:grid-cols-[12rem_minmax(0,1fr)] md:items-center">
        <div className="mx-auto">
          <svg width="160" height="160" viewBox="0 0 160 160">
            <circle
              cx="80"
              cy="80"
              r={radius}
              fill="none"
              stroke="rgba(148,163,184,0.1)"
              strokeWidth="18"
            />
            {segments.map((segment) => (
              <circle
                key={segment.label}
                cx="80"
                cy="80"
                r={radius}
                fill="none"
                stroke={segment.color}
                strokeWidth="18"
                strokeDasharray={segment.dashArray}
                strokeDashoffset={segment.dashOffset}
                transform="rotate(-90 80 80)"
                strokeLinecap="round"
              />
            ))}
            <text x="80" y="72" textAnchor="middle" fill="#f8fafc" fontSize="26" fontWeight="700">
              {total}
            </text>
            <text x="80" y="96" textAnchor="middle" fill="rgba(148,163,184,0.9)" fontSize="11">
              {totalLabel}
            </text>
          </svg>
        </div>

        <div className="space-y-3">
          {items.map((item, index) => (
            <div
              key={item.label}
              className="flex items-center justify-between gap-4 border-b border-white/5 pb-3"
            >
              <div className="flex items-center gap-3">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: DONUT_COLORS[index % DONUT_COLORS.length] }}
                />
                <span className="truncate text-sm text-slate-300">{item.label}</span>
              </div>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-gold">
                {formatCount(item.count)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BarList({
  title,
  items,
  emptyLabel,
}: {
  title: string;
  items: TopItem[];
  emptyLabel: string;
}) {
  if (items.length === 0) {
    return (
      <div className="border border-white/10 bg-white/[0.03] p-6">
        <h2 className="font-serif text-2xl font-bold text-white">{title}</h2>
        <p className="mt-6 text-sm text-slate-500">{emptyLabel}</p>
      </div>
    );
  }

  const maxCount = Math.max(...items.map((item) => item.count), 1);

  return (
    <div className="border border-white/10 bg-white/[0.03] p-6">
      <h2 className="font-serif text-2xl font-bold text-white">{title}</h2>
      <div className="mt-6 space-y-4">
        {items.map((item) => (
          <div key={item.label} className="space-y-2">
            <div className="flex items-center justify-between gap-4 text-sm text-slate-300">
              <span className="truncate">{item.label}</span>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-gold">
                {formatCount(item.count)}
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-gold via-[#e6c67a] to-white"
                style={{ width: `${Math.max((item.count / maxCount) * 100, 6)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FilterInput({
  label,
  icon,
  children,
}: {
  label: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <label className="block space-y-2">
      <span className="flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-slate-500">
        <span className="text-slate-400">{icon}</span>
        {label}
      </span>
      {children}
    </label>
  );
}

function DetailChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-full border border-white/10 bg-slate-950/50 px-3 py-1.5 text-xs text-slate-300">
      <span className="text-slate-500">{label}: </span>
      <span>{value}</span>
    </div>
  );
}

function LiveVisitorCard({
  session,
  now,
  mode = "live",
}: {
  session: LiveVisitorSession;
  now: number;
  mode?: "live" | "history";
}) {
  const isLiveMode = mode === "live";
  const statusLabel = isLiveMode
    ? getLiveStatusLabel(session, now)
    : `${formatCount(session.eventCount)} events`;
  const statusTone = isLiveMode
    ? getLiveStatusTone(session, now)
    : "border-slate-400/20 bg-slate-400/10 text-slate-200";
  const relativeAge = formatRelativeAge(session.lastSeenAt, now);
  const preciseCoordinatesLabel = getLivePreciseCoordinatesLabel(session);

  return (
    <article className="border border-white/10 bg-slate-950/35 p-5 shadow-[0_20px_80px_rgba(2,6,23,0.18)]">
      <div className="flex flex-col gap-4 border-b border-white/5 pb-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] ${statusTone}`}
            >
              {statusLabel}
            </span>
            <span
              className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] ${getEventTone(
                session.currentEventType
              )}`}
            >
              {getEventLabel(session.currentEventType)}
            </span>
            <span
              className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] ${getLocationConfidenceTone(
                session.locationConfidence
              )}`}
            >
              {getLocationConfidenceLabel(session.locationConfidence)}
            </span>
            {session.campaignLabel ? (
              <span className="rounded-full border border-gold/20 bg-gold/10 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-gold">
                {session.campaignLabel}
              </span>
            ) : null}
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-gold">
              {session.currentPath || "/"}
            </p>
            <p className="mt-2 break-all text-sm text-slate-400">
              {session.currentTitle ?? session.currentHref}
            </p>
          </div>
        </div>

        <div className="text-right text-sm text-slate-400">
          <p>{isLiveMode ? relativeAge : `Last seen ${relativeAge}`}</p>
          <p className="mt-1">{formatTimestamp(session.lastSeenAt)}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <DetailChip label="IP Address" value={session.ip ?? "Unknown"} />
        <DetailChip label="Location" value={getLiveLocationLabel(session)} />
        {preciseCoordinatesLabel ? (
          <DetailChip label="Coordinates" value={preciseCoordinatesLabel} />
        ) : null}
        <DetailChip label="Browser & Device" value={getLiveDeviceLabel(session)} />
        <DetailChip label="Page Seen" value={formatPercent(session.maxScrollPercent)} />
        <DetailChip label="Time Here" value={formatDuration(session.timeOnPageMs)} />
        <DetailChip label="Inactive For" value={formatDuration(session.idleForMs)} />
        <DetailChip label="Pages" value={formatCount(session.pageCount)} />
        <DetailChip label="Events" value={formatCount(session.eventCount)} />
        <DetailChip label="Arrived From" value={session.referrerHost ?? "Direct visit"} />
        {session.networkType ? <DetailChip label="Network" value={session.networkType} /> : null}
      </div>

      {session.pagePaths.length > 1 ? (
        <div className="mt-4 border-t border-white/5 pt-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-slate-500">
            {isLiveMode ? "Pages In Active Window" : "Pages In This Visit"}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {session.pagePaths.map((path) => (
              <span
                key={`${session.key}-${path}`}
                className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300"
              >
                {path}
              </span>
            ))}
          </div>
        </div>
      ) : null}
    </article>
  );
}

export function VisitorsDashboard({
  events: initialEvents,
  storage: initialStorage,
  initialRefreshedAt,
  username,
}: {
  events: VisitorAnalyticsEvent[];
  storage: VisitorAnalyticsStorageInfo;
  initialRefreshedAt: string;
  username: string | null;
}) {
  const router = useRouter();
  const [events, setEvents] = useState(initialEvents);
  const [storage, setStorage] = useState(initialStorage);
  const [lastSyncAt, setLastSyncAt] = useState(initialRefreshedAt);
  const [refreshError, setRefreshError] = useState<string | null>(null);
  const [isManualRefreshPending, setIsManualRefreshPending] = useState(false);
  const [now, setNow] = useState(() => Date.now());
  const [datePreset, setDatePreset] = useState<DatePreset>("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [ipFilter, setIpFilter] = useState("");
  const [eventTypeFilter, setEventTypeFilter] = useState<VisitorEventType | "all">("all");
  const [countryFilter, setCountryFilter] = useState("all");
  const [browserFilter, setBrowserFilter] = useState("all");
  const [deviceFilter, setDeviceFilter] = useState("all");

  const deferredSearch = useDeferredValue(searchTerm.trim().toLowerCase());
  const deferredIpFilter = useDeferredValue(ipFilter.trim().toLowerCase());

  useEffect(() => {
    setEvents(initialEvents);
    setStorage(initialStorage);
    setLastSyncAt(initialRefreshedAt);
    setNow(Date.now());
  }, [initialEvents, initialStorage, initialRefreshedAt]);

  async function loadDashboardFeed(reason: "poll" | "focus" | "manual") {
    if (reason === "manual") {
      setIsManualRefreshPending(true);
    }

    try {
      const response = await fetch("/api/ops/visitors/live", {
        cache: "no-store",
        credentials: "same-origin",
      });

      if (response.status === 401) {
        startTransition(() => {
          router.refresh();
        });
        return;
      }

      const payload = (await response.json().catch(() => null)) as LiveDashboardPayload | null;
      if (!response.ok || !payload?.ok || !Array.isArray(payload.events)) {
        throw new Error(payload?.error ?? "Live dashboard feed is unavailable.");
      }

      startTransition(() => {
        setEvents(payload.events ?? []);
        setStorage(payload.storage ?? initialStorage);
        setLastSyncAt(payload.refreshedAt ?? new Date().toISOString());
        setNow(Date.now());
        setRefreshError(null);
      });
    } catch (error) {
      setNow(Date.now());
      setRefreshError(
        error instanceof Error ? error.message : "Live dashboard feed is unavailable."
      );
    } finally {
      if (reason === "manual") {
        setIsManualRefreshPending(false);
      }
    }
  }

  const refreshDashboard = useEffectEvent(async (reason: "poll" | "focus" | "manual") => {
    await loadDashboardFeed(reason);
  });

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      void refreshDashboard("poll");
    }, LIVE_REFRESH_INTERVAL_MS);

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        void refreshDashboard("focus");
      }
    };

    const handleReconnect = () => {
      void refreshDashboard("focus");
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("online", handleReconnect);

    return () => {
      window.clearInterval(intervalId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("online", handleReconnect);
    };
  }, []);

  const countryOptions = takeTopCounts(events.map((event) => event.location.country), 50).map(
    (item) => item.label
  );
  const browserOptions = takeTopCounts(
    events.map((event) => event.parsedUserAgent.browserName),
    50
  ).map((item) => item.label);
  const deviceOptions = takeTopCounts(
    events.map((event) => event.parsedUserAgent.deviceType),
    50
  ).map((item) => item.label);

  const sharedFilteredEvents = events.filter((event) =>
    matchesSharedFilters(
      event,
      deferredSearch,
      deferredIpFilter,
      countryFilter,
      browserFilter,
      deviceFilter
    )
  );

  const filteredEvents = sharedFilteredEvents.filter((event) => {
    const recordedTime = new Date(event.recordedAt).getTime();
    const isWithinPreset =
      dateFrom || dateTo ? true : matchesPreset(event.recordedAt, datePreset, now);
    const isWithinFrom = dateFrom ? recordedTime >= toStartOfDay(dateFrom) : true;
    const isWithinTo = dateTo ? recordedTime <= toEndOfDay(dateTo) : true;
    const matchesEventType =
      eventTypeFilter === "all" ? true : event.eventType === eventTypeFilter;

    return isWithinPreset && isWithinFrom && isWithinTo && matchesEventType;
  });

  const liveVisitors = buildLiveVisitorSessions(sharedFilteredEvents, now);
  const liveVisibleCount = liveVisitors.filter((session) => session.isVisible !== false).length;
  const liveFocusedCount = liveVisitors.filter((session) => session.isFocused).length;
  const livePreciseCount = liveVisitors.filter(
    (session) => session.locationConfidence === "precise"
  ).length;
  const liveGeoResolvedCount = liveVisitors.filter(
    (session) => session.locationConfidence === "precise" || session.locationConfidence === "city"
  ).length;

  const uniqueIps = new Set(
    filteredEvents
      .map((event) => event.request.ip)
      .filter((value): value is string => Boolean(value))
  ).size;
  const uniqueSessions = new Set(
    filteredEvents
      .map((event) => event.sessionId)
      .filter((value): value is string => Boolean(value))
  ).size;
  const exitEvents = filteredEvents.filter(
    (event) => event.eventType === "exit" && event.engagement.timeOnPageMs !== null
  );
  const avgTimeOnPageMs =
    exitEvents.length > 0
      ? exitEvents.reduce((sum, event) => sum + (event.engagement.timeOnPageMs ?? 0), 0) /
        exitEvents.length
      : null;
  const scrollEvents = filteredEvents.filter(
    (event) => event.engagement.maxScrollPercent !== null || event.engagement.scrollPercent !== null
  );
  const avgScrollPercent =
    scrollEvents.length > 0
      ? scrollEvents.reduce(
          (sum, event) =>
            sum +
            (event.engagement.maxScrollPercent ?? event.engagement.scrollPercent ?? 0),
          0
        ) / scrollEvents.length
      : null;
  const outboundClicks = filteredEvents.filter(
    (event) => event.eventType === "outbound_click"
  ).length;
  const preciseLocationCount = filteredEvents.filter(
    (event) => event.location.confidence === "precise"
  ).length;
  const cityLevelLocationCount = filteredEvents.filter(
    (event) => event.location.confidence === "precise" || event.location.confidence === "city"
  ).length;
  const trendPoints = buildTrendPoints(filteredEvents);
  const topPages = takeTopCounts(filteredEvents.map((event) => event.page.path));
  const topCities = takeTopCounts(filteredEvents.map((event) => getCityLabel(event)), 8);
  const topCountries = takeTopCounts(filteredEvents.map((event) => event.location.country));
  const topPostcodes = takeTopCounts(filteredEvents.map((event) => event.location.postalCode));
  const topReferrers = takeTopCounts(filteredEvents.map((event) => getReferrerLabel(event)));
  const topCampaigns = takeTopCounts(filteredEvents.map((event) => getCampaignLabel(event)));
  const topBrowsers = takeTopCounts(
    filteredEvents.map((event) => event.parsedUserAgent.browserName)
  );
  const topDeviceTypes = takeTopCounts(
    filteredEvents.map((event) => event.parsedUserAgent.deviceType)
  );
  const locationConfidenceMix = takeTopCounts(
    filteredEvents.map((event) => getLocationConfidenceLabel(event.location.confidence)),
    4
  );
  const eventMix = takeTopCounts(filteredEvents.map((event) => getEventLabel(event.eventType)), 6);
  const visitorSessions = buildVisitorSessions(filteredEvents);
  const visibleVisitorSessions = visitorSessions.slice(0, 120);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#18233b_0%,#0f172a_46%,#0a1020_100%)] px-5 py-10 text-slate-200 md:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="border-b border-white/10 pb-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-4xl">
              <p className="font-mono text-xs uppercase tracking-[0.35em] text-gold">
                Private Ops
              </p>
              <h1 className="mt-4 font-serif text-4xl font-bold text-white md:text-5xl">
                Visitor Intelligence
              </h1>
              <p className="mt-4 max-w-3xl text-slate-400">
                Live visitor tracking with current visitors, page opens, time on page, location,
                clicks, device details, and page speed.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-gold/10 px-4 py-2 text-xs uppercase tracking-[0.28em] text-gold">
              <Radar className="h-4 w-4" />
              Visitor Tracking
            </div>
          </div>
        </header>

        <section className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
          <div className="border border-white/10 bg-white/[0.03] p-6 shadow-[0_30px_90px_rgba(2,6,23,0.22)]">
            <div className="flex flex-col gap-4 border-b border-white/10 pb-5 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.24em] text-slate-500">
                  Live Visitors
                </p>
                <h2 className="mt-2 font-serif text-3xl font-bold text-white">Live Visitors</h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400">
                  Active sessions seen in the last{" "}
                  {Math.round(LIVE_VISITOR_WINDOW_MS / 1000)} seconds, refreshed every{" "}
                  {Math.round(LIVE_REFRESH_INTERVAL_MS / 1000)} seconds.
                </p>
              </div>

              <div className="space-y-2 text-sm text-slate-400 lg:text-right">
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-[11px] uppercase tracking-[0.22em] text-emerald-200">
                  <Wifi className="h-4 w-4" />
                  Auto Refresh Live
                </div>
                <p>Last sync {formatTimeOfDay(lastSyncAt)} UK time</p>
                {refreshError ? <p className="text-amber-300">{refreshError}</p> : null}
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <MetricCard
                icon={<Activity className="h-5 w-5" />}
                label="Live Now"
                value={formatCount(liveVisitors.length)}
                hint="Sessions in view"
              />
              <MetricCard
                icon={<MapPinned className="h-5 w-5" />}
                label="Exact Location"
                value={formatCount(livePreciseCount)}
                hint="Exact coordinates"
              />
              <MetricCard
                icon={<Globe2 className="h-5 w-5" />}
                label="City Matched"
                value={formatCount(liveGeoResolvedCount)}
                hint="City or better"
              />
              <MetricCard
                icon={<Radar className="h-5 w-5" />}
                label="Active Now"
                value={formatCount(liveFocusedCount)}
                hint={`${formatCount(liveVisibleCount)} visible tabs`}
              />
            </div>

            <div className="mt-6">
              {liveVisitors.length === 0 ? (
                <div className="border border-dashed border-white/10 bg-slate-950/35 p-8 text-slate-400">
                  No live visitors match the current search, IP, browser, country, or device
                  filters right now.
                </div>
              ) : (
                <div className="grid gap-4 xl:grid-cols-2">
                  {liveVisitors.slice(0, 8).map((session) => (
                    <LiveVisitorCard key={session.key} session={session} now={now} />
                  ))}
                </div>
              )}
            </div>
          </div>

          <aside className="space-y-4">
            <VisitorsSessionControls
              username={username}
              onRefresh={() => loadDashboardFeed("manual")}
              isRefreshing={isManualRefreshPending}
              lastSyncLabel={`Last sync ${formatTimeOfDay(lastSyncAt)} UK time`}
            />
            <div className="border border-white/10 bg-white/[0.03] p-6 text-sm text-slate-400">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-slate-500">
                Storage
              </p>
              <p className="mt-3 text-white">{storage.label}</p>
              <p className="mt-2">
                {storage.durability === "durable" ? "Durable" : "Not configured"} ·{" "}
                {storage.location}
              </p>
            </div>
            <div className="border border-white/10 bg-white/[0.03] p-6 text-sm text-slate-400">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-slate-500">
                Geo Signal
              </p>
              <p className="mt-3 text-white">No browser location prompt</p>
              <p className="mt-2">
                Location confidence shows whether the visit is locked to exact coordinates,
                IP city-level, IP country-level, or still unknown.
              </p>
            </div>
          </aside>
        </section>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_19rem]">
          <div className="border border-white/10 bg-white/[0.03] p-6 shadow-[0_30px_90px_rgba(2,6,23,0.22)]">
            <div className="flex flex-col gap-3 border-b border-white/10 pb-5 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-slate-500">
                  Filters
                </p>
                <h2 className="mt-2 font-serif text-3xl font-bold text-white">
                  Find The Visitors You Care About
                </h2>
              </div>
              <button
                type="button"
                onClick={() => {
                  setDatePreset("all");
                  setDateFrom("");
                  setDateTo("");
                  setSearchTerm("");
                  setIpFilter("");
                  setEventTypeFilter("all");
                  setCountryFilter("all");
                  setBrowserFilter("all");
                  setDeviceFilter("all");
                }}
                className="inline-flex items-center gap-2 border border-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-slate-300 transition-colors hover:border-gold hover:text-gold"
              >
                <Filter className="h-4 w-4" />
                Clear Filters
              </button>
            </div>

            <div className="mt-6 space-y-6">
              <div className="flex flex-wrap gap-3">
                {DATE_PRESETS.map((preset) => (
                  <button
                    key={preset.key}
                    type="button"
                    onClick={() => {
                      setDatePreset(preset.key);
                      setDateFrom("");
                      setDateTo("");
                    }}
                    className={`px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] transition-colors ${
                      datePreset === preset.key && !dateFrom && !dateTo
                        ? "bg-gold text-strath-navy"
                        : "border border-white/10 text-slate-300 hover:border-gold hover:text-gold"
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <FilterInput label="Search" icon={<Search className="h-4 w-4" />}>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder="Path, campaign, browser, referrer..."
                    className="w-full border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-gold"
                  />
                </FilterInput>

                <FilterInput label="IP Filter" icon={<ShieldAlert className="h-4 w-4" />}>
                  <input
                    type="text"
                    value={ipFilter}
                    onChange={(event) => setIpFilter(event.target.value)}
                    placeholder="Contains IP"
                    className="w-full border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-gold"
                  />
                </FilterInput>

                <FilterInput label="Date From" icon={<Clock3 className="h-4 w-4" />}>
                  <input
                    type="date"
                    value={dateFrom}
                    onChange={(event) => setDateFrom(event.target.value)}
                    className="w-full border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-gold"
                  />
                </FilterInput>

                <FilterInput label="Date To" icon={<Clock3 className="h-4 w-4" />}>
                  <input
                    type="date"
                    value={dateTo}
                    onChange={(event) => setDateTo(event.target.value)}
                    className="w-full border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-gold"
                  />
                </FilterInput>

                <FilterInput label="Event Type" icon={<Activity className="h-4 w-4" />}>
                  <select
                    value={eventTypeFilter}
                    onChange={(event) =>
                      setEventTypeFilter(event.target.value as VisitorEventType | "all")
                    }
                    className="w-full border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-gold"
                  >
                    <option value="all">All events</option>
                    <option value="pageview">Opened page</option>
                    <option value="heartbeat">Still on page</option>
                    <option value="scroll">Read further down</option>
                    <option value="outbound_click">Clicked external link</option>
                    <option value="exit">Left page</option>
                  </select>
                </FilterInput>

                <FilterInput label="Country" icon={<Globe2 className="h-4 w-4" />}>
                  <select
                    value={countryFilter}
                    onChange={(event) => setCountryFilter(event.target.value)}
                    className="w-full border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-gold"
                  >
                    <option value="all">All countries</option>
                    {countryOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </FilterInput>

                <FilterInput label="Browser" icon={<Activity className="h-4 w-4" />}>
                  <select
                    value={browserFilter}
                    onChange={(event) => setBrowserFilter(event.target.value)}
                    className="w-full border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-gold"
                  >
                    <option value="all">All browsers</option>
                    {browserOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </FilterInput>

                <FilterInput label="Device Type" icon={<MousePointerClick className="h-4 w-4" />}>
                  <select
                    value={deviceFilter}
                    onChange={(event) => setDeviceFilter(event.target.value)}
                    className="w-full border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-gold"
                  >
                    <option value="all">All device types</option>
                    {deviceOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </FilterInput>
              </div>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="border border-white/10 bg-white/[0.03] p-6 text-sm text-slate-400">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-slate-500">
                Filter Notes
              </p>
              <p className="mt-3 text-white">Live cards ignore the historical date window.</p>
              <p className="mt-2">
                Search, IP, country, browser, and device filters still shape both the live board
                and the historical charts.
              </p>
            </div>
          </aside>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-8">
          <MetricCard
            icon={<Activity className="h-5 w-5" />}
            label="Visits"
            value={formatCount(visitorSessions.length)}
            hint={`${formatCount(filteredEvents.length)} events grouped`}
          />
          <MetricCard
            icon={<RefreshCw className="h-5 w-5" />}
            label="Live Now"
            value={formatCount(liveVisitors.length)}
            hint="Recent sessions"
          />
          <MetricCard
            icon={<ShieldAlert className="h-5 w-5" />}
            label="Unique IPs"
            value={formatCount(uniqueIps)}
            hint="Distinct visitors"
          />
          <MetricCard
            icon={<MapPinned className="h-5 w-5" />}
            label="Exact Location"
            value={formatCount(preciseLocationCount)}
            hint={`${formatCount(cityLevelLocationCount)} city or better`}
          />
          <MetricCard
            icon={<Radar className="h-5 w-5" />}
            label="Sessions"
            value={formatCount(uniqueSessions)}
            hint="Tracked sessions"
          />
          <MetricCard
            icon={<ArrowUpRight className="h-5 w-5" />}
            label="External Clicks"
            value={formatCount(outboundClicks)}
            hint="External clicks"
          />
          <MetricCard
            icon={<MousePointerClick className="h-5 w-5" />}
            label="Avg Page Seen"
            value={formatPercent(avgScrollPercent)}
            hint="Max depth"
          />
          <MetricCard
            icon={<Clock3 className="h-5 w-5" />}
            label="Avg Time On Page"
            value={formatDuration(avgTimeOnPageMs)}
            hint="Exit events only"
          />
        </section>

        <section className="grid gap-6 xl:grid-cols-[1fr_1fr_0.85fr]">
          <BarList
            title="Top Cities"
            items={topCities}
            emptyLabel="No city-level locations matched the current filters."
          />
          <BarList
            title="Top Countries"
            items={topCountries}
            emptyLabel="No country-level locations matched the current filters."
          />
          <DonutChart
            title="Location Quality"
            items={locationConfidenceMix}
            totalLabel="geo tags"
          />
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
          <div className="border border-white/10 bg-white/[0.03] p-6 shadow-[0_30px_80px_rgba(2,6,23,0.18)]">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-slate-500">
                  Volume Over Time
                </p>
                <h2 className="mt-2 font-serif text-3xl font-bold text-white">
                  Traffic Pulse
                </h2>
              </div>
              <div className="text-right text-sm text-slate-400">
                <p>{formatCount(filteredEvents.length)} events</p>
                <p>
                  {filteredEvents[0]
                    ? `Latest ${formatTimestamp(filteredEvents[0].recordedAt)}`
                    : "No recent activity"}
                </p>
              </div>
            </div>
            <div className="mt-6">
              <TrendAreaChart points={trendPoints} />
            </div>
          </div>

          <DonutChart title="Activity Mix" items={eventMix} totalLabel="tracked" />
        </section>

        <section className="grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
          <BarList
            title="Top Pages"
            items={topPages}
            emptyLabel="No pages matched the current filters."
          />
          <BarList
            title="Traffic Sources"
            items={topReferrers}
            emptyLabel="No referrer data matched the current filters."
          />
          <BarList
            title="Campaign Tags"
            items={topCampaigns}
            emptyLabel="No campaign parameters matched the current filters."
          />
          <BarList
            title="Device & Browser Mix"
            items={takeTopCounts(
              filteredEvents.map(
                (event) =>
                  `${event.parsedUserAgent.browserName ?? "Unknown"} · ${
                    event.parsedUserAgent.deviceType ?? "Unknown"
                  }`
              )
            )}
            emptyLabel="No device mix available yet."
          />
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <BarList
            title="Top Postcodes"
            items={topPostcodes}
            emptyLabel="No postcode data matched the current filters."
          />
          <BarList
            title="Browsers"
            items={topBrowsers.length > 0 ? topBrowsers : topDeviceTypes}
            emptyLabel="No browser data matched the current filters."
          />
        </section>

        <section className="space-y-4">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-slate-500">
                Visitor Activity
              </p>
              <h2 className="mt-2 font-serif text-3xl font-bold text-white">Latest Visits</h2>
            </div>
            <p className="text-sm text-slate-500">
              Showing {formatCount(visibleVisitorSessions.length)} of{" "}
              {formatCount(visitorSessions.length)} filtered visits
            </p>
          </div>

          {visibleVisitorSessions.length === 0 ? (
            <div className="border border-dashed border-white/10 bg-white/[0.03] p-8 text-slate-400">
              No visits matched the current filters.
            </div>
          ) : (
            <div className="grid gap-4">
              {visibleVisitorSessions.map((session) => (
                <LiveVisitorCard
                  key={session.key}
                  session={session}
                  now={now}
                  mode="history"
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
