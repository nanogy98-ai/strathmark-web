"use client";

import {
  startTransition,
  useDeferredValue,
  useEffect,
  useEffectEvent,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import {
  Activity,
  BarChart3,
  Bot,
  Clock3,
  Database,
  Eye,
  Filter,
  Globe2,
  MapPin,
  MonitorSmartphone,
  RefreshCw,
  Search,
  ShieldCheck,
  Signal,
  Users,
  Wifi,
} from "lucide-react";
import { VisitorSessionCard } from "@/app/ops/visitors/VisitorSessionCard";
import { VisitorsSessionControls } from "@/app/ops/visitors/VisitorsSessionControls";
import {
  buildVisitorDashboardSummary,
  filterVisitorSessions,
  takeTopCounts,
  type VisitorDatePreset,
  type VisitorSessionFilters,
  type VisitorTopItem,
  type VisitorTrafficKind,
} from "@/lib/visitor-analytics/dashboard";
import {
  LIVE_VISITOR_WINDOW_MS,
  buildLiveVisitorSessions,
  buildVisitorSessions,
} from "@/lib/visitor-analytics/live";
import type {
  VisitorAnalyticsEvent,
  VisitorAnalyticsFeedInfo,
  VisitorAnalyticsStorageInfo,
  VisitorEventType,
} from "@/lib/visitor-analytics/types";

type LiveDashboardPayload = {
  ok: boolean;
  events?: VisitorAnalyticsEvent[];
  feed?: VisitorAnalyticsFeedInfo;
  storage?: VisitorAnalyticsStorageInfo;
  refreshedAt?: string;
  error?: string;
};

const DATE_PRESETS: Array<{ key: VisitorDatePreset; label: string }> = [
  { key: "24h", label: "24 hours" },
  { key: "7d", label: "7 days" },
  { key: "30d", label: "30 days" },
  { key: "all", label: "All loaded" },
];

const EVENT_OPTIONS: Array<{ value: VisitorEventType | "all"; label: string }> = [
  { value: "all", label: "Any activity" },
  { value: "pageview", label: "Page opened" },
  { value: "scroll", label: "Reading depth" },
  { value: "outbound_click", label: "External click" },
  { value: "exit", label: "Page left" },
  { value: "offline_attempt", label: "Offline attempt" },
  { value: "heartbeat", label: "Activity pulse" },
];

const LIVE_REFRESH_INTERVAL_MS = 30_000;
const DASHBOARD_TIME_ZONE = "Europe/London";
const INITIAL_VISIBLE_VISITS = 40;

function formatCount(value: number) {
  return new Intl.NumberFormat("en-GB").format(value);
}

function formatTimestamp(value: string | null) {
  if (!value) return "No records";
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: DASHBOARD_TIME_ZONE,
  }).format(new Date(value));
}

function formatTime(value: string | null) {
  if (!value) return "Not synced";
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: DASHBOARD_TIME_ZONE,
  }).format(new Date(value));
}

function formatDuration(value: number | null) {
  if (!value || value < 1000) return "<1s";
  const seconds = Math.round(value / 1000);
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ${seconds % 60}s`;
  return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
}

function MetricCard({
  icon,
  label,
  value,
  hint,
  accent = false,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  hint: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`border p-5 ${
        accent
          ? "border-gold/35 bg-[linear-gradient(145deg,rgba(201,164,99,0.16),rgba(255,255,255,0.025))]"
          : "border-white/10 bg-white/[0.035]"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <span className={accent ? "text-gold" : "text-slate-500"}>{icon}</span>
        <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500">
          {label}
        </span>
      </div>
      <p className="mt-4 text-3xl font-semibold tracking-tight text-white">{value}</p>
      <p className="mt-1.5 text-xs text-slate-400">{hint}</p>
    </div>
  );
}

function HealthItem({
  icon,
  label,
  value,
  detail,
  tone = "normal",
}: {
  icon: ReactNode;
  label: string;
  value: string;
  detail: string;
  tone?: "normal" | "good" | "warn";
}) {
  const toneClasses =
    tone === "good"
      ? "border-emerald-400/20 bg-emerald-400/[0.07]"
      : tone === "warn"
        ? "border-amber-400/20 bg-amber-400/[0.07]"
        : "border-white/10 bg-white/[0.025]";

  return (
    <div className={`flex min-w-0 items-start gap-3 border p-4 ${toneClasses}`}>
      <span className={tone === "good" ? "text-emerald-300" : "text-gold"}>{icon}</span>
      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
          {label}
        </p>
        <p className="mt-1 truncate text-sm font-semibold text-white" title={value}>
          {value}
        </p>
        <p className="mt-1 text-xs leading-relaxed text-slate-400">{detail}</p>
      </div>
    </div>
  );
}

function RankedList({ title, icon, items }: { title: string; icon: ReactNode; items: VisitorTopItem[] }) {
  const max = Math.max(...items.map((item) => item.count), 1);

  return (
    <section className="border border-white/10 bg-white/[0.025] p-5">
      <div className="flex items-center gap-2 text-slate-400">
        {icon}
        <h3 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-slate-300">
          {title}
        </h3>
      </div>
      {items.length === 0 ? (
        <p className="mt-4 text-sm text-slate-500">No matching data.</p>
      ) : (
        <ol className="mt-4 space-y-3">
          {items.map((item) => (
            <li key={item.label}>
              <div className="flex items-center justify-between gap-3 text-xs">
                <span className="min-w-0 truncate text-slate-300" title={item.label}>
                  {item.label}
                </span>
                <span className="font-mono text-gold">{formatCount(item.count)}</span>
              </div>
              <div className="mt-1.5 h-1 overflow-hidden bg-white/5">
                <div
                  className="h-full bg-gold/75"
                  style={{ width: `${Math.max(6, (item.count / max) * 100)}%` }}
                />
              </div>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  children,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
}) {
  return (
    <label className="space-y-2">
      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full border border-white/10 bg-[#0a1320] px-3 py-2.5 text-sm text-white outline-none transition-colors focus:border-gold"
      >
        {children}
      </select>
    </label>
  );
}

export function VisitorsDashboard({
  events: initialEvents,
  feed: initialFeed,
  storage: initialStorage,
  initialRefreshedAt,
  username,
}: {
  events: VisitorAnalyticsEvent[];
  feed: VisitorAnalyticsFeedInfo;
  storage: VisitorAnalyticsStorageInfo;
  initialRefreshedAt: string;
  username: string | null;
}) {
  const router = useRouter();
  const [events, setEvents] = useState(initialEvents);
  const [feed, setFeed] = useState(initialFeed);
  const [storage, setStorage] = useState(initialStorage);
  const [lastSyncAt, setLastSyncAt] = useState(initialRefreshedAt);
  const [refreshError, setRefreshError] = useState<string | null>(null);
  const [isManualRefreshPending, setIsManualRefreshPending] = useState(false);
  const [now, setNow] = useState(() => Date.now());
  const [datePreset, setDatePreset] = useState<VisitorDatePreset>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [countryFilter, setCountryFilter] = useState("all");
  const [eventTypeFilter, setEventTypeFilter] = useState<VisitorEventType | "all">("all");
  const [trafficKind, setTrafficKind] = useState<VisitorTrafficKind>("all");
  const [visibleVisitCount, setVisibleVisitCount] = useState(INITIAL_VISIBLE_VISITS);
  const deferredSearch = useDeferredValue(searchTerm);

  useEffect(() => {
    setEvents(initialEvents);
    setFeed(initialFeed);
    setStorage(initialStorage);
    setLastSyncAt(initialRefreshedAt);
    setNow(Date.now());
  }, [initialEvents, initialFeed, initialStorage, initialRefreshedAt]);

  async function loadDashboardFeed(reason: "poll" | "focus" | "manual") {
    if (reason === "manual") setIsManualRefreshPending(true);

    try {
      const response = await fetch("/api/ops/visitors/live", {
        cache: "no-store",
        credentials: "same-origin",
      });

      if (response.status === 401) {
        startTransition(() => router.refresh());
        return;
      }

      const payload = (await response.json().catch(() => null)) as LiveDashboardPayload | null;
      if (!response.ok || !payload?.ok || !Array.isArray(payload.events)) {
        throw new Error(payload?.error ?? "The live visitor feed is unavailable.");
      }

      startTransition(() => {
        setEvents(payload.events ?? []);
        setFeed(payload.feed ?? initialFeed);
        setStorage(payload.storage ?? initialStorage);
        setLastSyncAt(payload.refreshedAt ?? new Date().toISOString());
        setNow(Date.now());
        setRefreshError(null);
      });
    } catch (error) {
      setRefreshError(error instanceof Error ? error.message : "The live feed is unavailable.");
    } finally {
      if (reason === "manual") setIsManualRefreshPending(false);
    }
  }

  const refreshDashboard = useEffectEvent(async (reason: "poll" | "focus" | "manual") => {
    await loadDashboardFeed(reason);
  });

  useEffect(() => {
    const intervalId = window.setInterval(() => void refreshDashboard("poll"), LIVE_REFRESH_INTERVAL_MS);
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") void refreshDashboard("focus");
    };
    const handleReconnect = () => void refreshDashboard("focus");

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("online", handleReconnect);
    return () => {
      window.clearInterval(intervalId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("online", handleReconnect);
    };
  }, []);

  const allSessions = useMemo(() => buildVisitorSessions(events), [events]);
  const liveSessions = useMemo(() => buildLiveVisitorSessions(events, now), [events, now]);
  const liveSessionKeys = useMemo(
    () => new Set(liveSessions.map((session) => session.key)),
    [liveSessions]
  );
  const filters = useMemo<VisitorSessionFilters>(
    () => ({
      datePreset,
      search: deferredSearch,
      country: countryFilter,
      eventType: eventTypeFilter,
      trafficKind,
    }),
    [countryFilter, datePreset, deferredSearch, eventTypeFilter, trafficKind]
  );
  const filteredSessions = useMemo(
    () => filterVisitorSessions(allSessions, filters, now),
    [allSessions, filters, now]
  );
  const summary = useMemo(
    () => buildVisitorDashboardSummary({ sessions: filteredSessions, liveSessionKeys }),
    [filteredSessions, liveSessionKeys]
  );
  const countryOptions = useMemo(
    () => takeTopCounts(allSessions.map((session) => session.country), 100).map((item) => item.label),
    [allSessions]
  );
  const topPages = useMemo(
    () => takeTopCounts(filteredSessions.flatMap((session) => session.pagePaths), 7),
    [filteredSessions]
  );
  const topSources = useMemo(
    () => takeTopCounts(filteredSessions.map((session) => session.referrerHost ?? "Direct"), 6),
    [filteredSessions]
  );
  const topCountries = useMemo(
    () => takeTopCounts(filteredSessions.map((session) => session.country), 6),
    [filteredSessions]
  );
  const topDevices = useMemo(
    () =>
      takeTopCounts(
        filteredSessions.map(
          (session) => `${session.browserName ?? "Unknown"} · ${session.deviceType ?? "Unknown"}`
        ),
        6
      ),
    [filteredSessions]
  );
  const visibleSessions = filteredSessions.slice(0, visibleVisitCount);
  const eventsWithIp = events.filter((event) => Boolean(event.request.ip)).length;
  const ipCoveragePercent = events.length ? Math.round((eventsWithIp / events.length) * 100) : 0;
  const heartbeatShare = events.length
    ? Math.round((events.filter((event) => event.eventType === "heartbeat").length / events.length) * 100)
    : 0;
  const hasFilters =
    datePreset !== "all" ||
    Boolean(searchTerm) ||
    countryFilter !== "all" ||
    eventTypeFilter !== "all" ||
    trafficKind !== "all";

  const clearFilters = () => {
    setDatePreset("all");
    setSearchTerm("");
    setCountryFilter("all");
    setEventTypeFilter("all");
    setTrafficKind("all");
    setVisibleVisitCount(INITIAL_VISIBLE_VISITS);
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_20%_0%,#1a2a42_0%,#0b1624_34%,#07101c_100%)] px-4 py-8 text-slate-200 md:px-8 md:py-10">
      <div className="mx-auto max-w-[92rem] space-y-6">
        <header className="border-b border-white/10 pb-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.32em] text-gold">
                  Private Ops
                </p>
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-200">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" /> Tracking healthy
                </span>
              </div>
              <h1 className="mt-3 font-serif text-4xl font-bold text-white md:text-5xl">
                Visitor Operations
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-400 md:text-base">
                Visits are grouped into readable sessions. Full IP addresses and every underlying
                event remain preserved for operational review.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
              <span className="inline-flex items-center gap-2 border border-white/10 bg-white/[0.035] px-3 py-2">
                <Wifi className="h-4 w-4 text-emerald-300" /> Auto-sync every 30s
              </span>
              <span>Last sync {formatTime(lastSyncAt)} UK</span>
            </div>
          </div>
          {refreshError ? (
            <p className="mt-4 border border-amber-400/25 bg-amber-400/10 px-4 py-3 text-sm text-amber-200">
              {refreshError}
            </p>
          ) : null}
        </header>

        <section className="grid gap-3 md:grid-cols-3">
          <HealthItem
            icon={<ShieldCheck className="h-5 w-5" />}
            label="IP integrity"
            value={`${ipCoveragePercent}% captured`}
            detail={`${formatCount(eventsWithIp)} of ${formatCount(events.length)} loaded events retain the full server-observed IP.`}
            tone={ipCoveragePercent === 100 ? "good" : "warn"}
          />
          <HealthItem
            icon={<Database className="h-5 w-5" />}
            label="Data coverage"
            value={`${formatCount(feed.loadedEventCount)} of ${formatCount(feed.totalEventCount)} events loaded`}
            detail={feed.hasMore ? `The console is capped at the latest ${formatCount(feed.limit)} raw events.` : "The complete retained event set is loaded."}
            tone={feed.hasMore ? "warn" : "normal"}
          />
          <HealthItem
            icon={<Activity className="h-5 w-5" />}
            label="Noise control"
            value={`${heartbeatShare}% activity pulses`}
            detail="Pulses remain stored for live status but are collapsed inside each visit timeline."
          />
        </section>

        <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          <MetricCard icon={<Users className="h-5 w-5" />} label="Visits" value={formatCount(summary.visits)} hint={`${formatCount(summary.rawEvents)} raw events grouped`} accent />
          <MetricCard icon={<Signal className="h-5 w-5" />} label="Live now" value={formatCount(summary.liveVisits)} hint={`${Math.round(LIVE_VISITOR_WINDOW_MS / 1000)} second window`} />
          <MetricCard icon={<ShieldCheck className="h-5 w-5" />} label="Unique IPs" value={formatCount(summary.uniqueIps)} hint="Full, unmasked addresses" />
          <MetricCard icon={<Eye className="h-5 w-5" />} label="Pageviews" value={formatCount(summary.pageviews)} hint={`${summary.averagePagesPerVisit?.toFixed(1) ?? "0.0"} pages per visit`} />
          <MetricCard icon={<Clock3 className="h-5 w-5" />} label="Avg visit" value={formatDuration(summary.averageDurationMs)} hint={`${formatCount(summary.outboundClicks)} external clicks`} />
        </section>

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_21rem]">
          <div className="min-w-0 space-y-5">
            {liveSessions.length > 0 ? (
              <section className="border border-emerald-400/20 bg-emerald-400/[0.045] p-4 md:p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-300">Live now</p>
                    <h2 className="mt-1 font-sans text-lg font-semibold text-white">
                      {formatCount(liveSessions.length)} active {liveSessions.length === 1 ? "visit" : "visits"}
                    </h2>
                  </div>
                  <Signal className="h-5 w-5 text-emerald-300" />
                </div>
                <div className="mt-4 space-y-2">
                  {liveSessions.slice(0, 4).map((session) => (
                    <VisitorSessionCard key={session.key} session={session} isLive now={now} />
                  ))}
                </div>
              </section>
            ) : null}

            <section className="border border-white/10 bg-white/[0.03] p-4 md:p-5">
              <div className="flex flex-col gap-4 border-b border-white/10 pb-5 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500">Visit explorer</p>
                  <h2 className="mt-1 font-serif text-2xl font-bold text-white">Find a visitor quickly</h2>
                </div>
                {hasFilters ? (
                  <button type="button" onClick={clearFilters} className="inline-flex items-center gap-2 border border-white/15 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-300 hover:border-gold hover:text-gold">
                    <Filter className="h-3.5 w-3.5" /> Clear filters
                  </button>
                ) : null}
              </div>

              <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-[minmax(14rem,1.5fr)_repeat(3,minmax(9rem,0.72fr))]">
                <label className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Search anything</span>
                  <div className="relative">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                    <input
                      type="search"
                      value={searchTerm}
                      onChange={(event) => setSearchTerm(event.target.value)}
                      placeholder="IP, page, city, device, campaign…"
                      className="w-full border border-white/10 bg-[#0a1320] py-2.5 pl-10 pr-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-gold"
                    />
                  </div>
                </label>

                <FilterSelect label="Period" value={datePreset} onChange={(value) => setDatePreset(value as VisitorDatePreset)}>
                  {DATE_PRESETS.map((preset) => <option key={preset.key} value={preset.key}>{preset.label}</option>)}
                </FilterSelect>

                <FilterSelect label="Traffic" value={trafficKind} onChange={(value) => setTrafficKind(value as VisitorTrafficKind)}>
                  <option value="all">People and bots</option>
                  <option value="people">People only</option>
                  <option value="bots">Bots only</option>
                </FilterSelect>

                <FilterSelect label="Activity" value={eventTypeFilter} onChange={(value) => setEventTypeFilter(value as VisitorEventType | "all")}>
                  {EVENT_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                </FilterSelect>
              </div>

              <div className="mt-3 max-w-xs">
                <FilterSelect label="Country" value={countryFilter} onChange={setCountryFilter}>
                  <option value="all">All countries</option>
                  {countryOptions.map((country) => <option key={country} value={country}>{country}</option>)}
                </FilterSelect>
              </div>
            </section>

            <section>
              <div className="flex flex-col gap-2 border-b border-white/10 pb-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500">Session ledger</p>
                  <h2 className="mt-1 font-serif text-2xl font-bold text-white">Recent visits</h2>
                </div>
                <p className="text-xs text-slate-500">
                  Showing {formatCount(visibleSessions.length)} of {formatCount(filteredSessions.length)} visits
                </p>
              </div>

              {visibleSessions.length === 0 ? (
                <div className="mt-4 border border-dashed border-white/10 bg-white/[0.025] p-8 text-center text-sm text-slate-500">
                  No visits match these filters.
                </div>
              ) : (
                <div className="mt-3 space-y-2">
                  {visibleSessions.map((session) => (
                    <VisitorSessionCard key={session.key} session={session} isLive={liveSessionKeys.has(session.key)} now={now} />
                  ))}
                </div>
              )}

              {visibleSessions.length < filteredSessions.length ? (
                <button type="button" onClick={() => setVisibleVisitCount((count) => count + INITIAL_VISIBLE_VISITS)} className="mt-4 w-full border border-white/15 bg-white/[0.025] px-4 py-3 text-xs font-bold uppercase tracking-[0.2em] text-slate-300 hover:border-gold hover:text-gold">
                  Load {Math.min(INITIAL_VISIBLE_VISITS, filteredSessions.length - visibleSessions.length)} more visits
                </button>
              ) : null}
            </section>
          </div>

          <aside className="space-y-4 xl:sticky xl:top-5 xl:self-start">
            <VisitorsSessionControls username={username} onRefresh={() => loadDashboardFeed("manual")} isRefreshing={isManualRefreshPending} lastSyncLabel={`Synced ${formatTime(lastSyncAt)} UK`} />

            <section className="border border-white/10 bg-white/[0.025] p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500">Data integrity</p>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between gap-3"><dt className="text-slate-500">Storage</dt><dd className="text-right text-slate-200">{storage.label}</dd></div>
                <div className="flex justify-between gap-3"><dt className="text-slate-500">Latest record</dt><dd className="text-right text-slate-200">{formatTimestamp(summary.latestEventAt)}</dd></div>
                <div className="flex justify-between gap-3"><dt className="text-slate-500">IP coverage</dt><dd className="text-emerald-300">{ipCoveragePercent}%</dd></div>
                <div className="flex justify-between gap-3"><dt className="text-slate-500">Loaded</dt><dd className="text-slate-200">{formatCount(feed.loadedEventCount)}</dd></div>
              </dl>
              <p className="mt-4 border-t border-white/10 pt-4 text-xs leading-relaxed text-slate-500">
                IP is captured from trusted server request headers and stored without masking in the private Supabase log.
              </p>
            </section>

            <RankedList title="Top pages" icon={<BarChart3 className="h-4 w-4" />} items={topPages} />
            <RankedList title="Sources" icon={<Globe2 className="h-4 w-4" />} items={topSources} />
            <RankedList title="Countries" icon={<MapPin className="h-4 w-4" />} items={topCountries} />
            <RankedList title="Devices" icon={<MonitorSmartphone className="h-4 w-4" />} items={topDevices} />

            <section className="border border-white/10 bg-white/[0.025] p-5 text-xs leading-relaxed text-slate-500">
              <div className="flex items-center gap-2 text-slate-300"><Bot className="h-4 w-4" /><span className="font-bold uppercase tracking-[0.18em]">Raw events retained</span></div>
              <p className="mt-3">
                Heartbeats, scroll milestones, exits and offline attempts remain available inside each expanded session, but no longer dominate the main view.
              </p>
              <button type="button" onClick={() => void loadDashboardFeed("manual")} className="mt-4 inline-flex items-center gap-2 text-gold hover:text-white">
                <RefreshCw className="h-3.5 w-3.5" /> Refresh records
              </button>
            </section>
          </aside>
        </section>
      </div>
    </main>
  );
}
