"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  Bot,
  Check,
  ChevronDown,
  Clipboard,
  Clock3,
  Eye,
  Globe2,
  MapPin,
  MonitorSmartphone,
  MousePointerClick,
  Route,
  ShieldCheck,
} from "lucide-react";
import { getSessionEventsWithoutHeartbeat } from "@/lib/visitor-analytics/dashboard";
import type { LiveVisitorSession } from "@/lib/visitor-analytics/live";
import type { VisitorEventType } from "@/lib/visitor-analytics/types";

const DASHBOARD_TIME_ZONE = "Europe/London";

function formatTimestamp(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: DASHBOARD_TIME_ZONE,
  }).format(new Date(value));
}

function formatRelativeAge(value: string, now: number) {
  const deltaMs = Math.max(0, now - new Date(value).getTime());
  if (deltaMs < 10_000) return "now";
  if (deltaMs < 60_000) return `${Math.round(deltaMs / 1000)}s ago`;
  if (deltaMs < 3_600_000) return `${Math.round(deltaMs / 60_000)}m ago`;
  if (deltaMs < 86_400_000) return `${Math.round(deltaMs / 3_600_000)}h ago`;
  return formatTimestamp(value);
}

function formatDuration(value: number) {
  if (value < 1000) return "<1s";
  const seconds = Math.round(value / 1000);
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  if (minutes < 60) return remainder ? `${minutes}m ${remainder}s` : `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ${minutes % 60}m`;
}

function formatLocation(session: LiveVisitorSession) {
  const location = [session.city, session.region, session.country].filter(Boolean).join(", ");
  return location || "Location unavailable";
}

function formatDevice(session: LiveVisitorSession) {
  return [session.browserName, session.osName, session.deviceType]
    .filter(Boolean)
    .join(" · ") || "Device unavailable";
}

function getEventLabel(eventType: VisitorEventType) {
  if (eventType === "pageview") return "Page opened";
  if (eventType === "scroll") return "Reading depth";
  if (eventType === "outbound_click") return "External click";
  if (eventType === "heartbeat") return "Activity pulse";
  if (eventType === "offline_attempt") return "Offline page attempt";
  return "Page left";
}

function getEventTone(eventType: VisitorEventType) {
  if (eventType === "pageview") return "border-sky-400/20 bg-sky-400/10 text-sky-200";
  if (eventType === "scroll") return "border-gold/25 bg-gold/10 text-gold-light";
  if (eventType === "outbound_click") {
    return "border-emerald-400/20 bg-emerald-400/10 text-emerald-200";
  }
  if (eventType === "offline_attempt") {
    return "border-amber-400/20 bg-amber-400/10 text-amber-200";
  }
  return "border-white/10 bg-white/5 text-slate-300";
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 border-l border-white/10 pl-3">
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
        {label}
      </p>
      <p className="mt-1 truncate text-sm text-slate-200" title={value}>
        {value}
      </p>
    </div>
  );
}

export function VisitorSessionCard({
  session,
  isLive,
  now,
}: {
  session: LiveVisitorSession;
  isLive: boolean;
  now: number;
}) {
  const [copied, setCopied] = useState(false);
  const meaningfulEvents = getSessionEventsWithoutHeartbeat(session).slice(0, 18);
  const consentLabel =
    session.consentMode === "analytics"
      ? "Analytics accepted"
      : session.consentMode === "essential"
        ? "Analytics rejected"
        : session.consentMode === "unset"
          ? "No choice yet"
          : "Legacy record";

  const copyIp = async () => {
    if (!session.ip) return;
    await navigator.clipboard.writeText(session.ip);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <details className="group border border-white/10 bg-[#0d1827] open:border-gold/35 open:bg-[#101d2e]">
      <summary className="grid cursor-pointer list-none gap-4 p-4 marker:content-none md:grid-cols-[minmax(12rem,0.8fr)_minmax(16rem,1.45fr)_minmax(12rem,0.8fr)_auto] md:items-center md:p-5">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span
              className={`h-2.5 w-2.5 rounded-full ${
                isLive ? "animate-pulse bg-emerald-400" : "bg-slate-600"
              }`}
              aria-hidden="true"
            />
            <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-500">
              {isLive ? "Live visitor" : formatRelativeAge(session.lastSeenAt, now)}
            </span>
            {session.isBot ? (
              <span className="inline-flex items-center gap-1 rounded-full border border-fuchsia-400/20 bg-fuchsia-400/10 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-fuchsia-200">
                <Bot className="h-3 w-3" /> Bot
              </span>
            ) : null}
          </div>
          <p className="mt-2 truncate font-mono text-sm font-semibold text-white" title={session.ip ?? "No IP"}>
            {session.ip ?? "IP unavailable"}
          </p>
          <p className="mt-1 text-xs text-gold">Full IP retained</p>
        </div>

        <div className="min-w-0">
          <p className="truncate text-base font-semibold text-white" title={session.currentPath}>
            {session.currentPath || "/"}
          </p>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-gold" /> {formatLocation(session)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MonitorSmartphone className="h-3.5 w-3.5 text-gold" /> {formatDevice(session)}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <Fact label="Time" value={formatDuration(session.durationMs)} />
          <Fact label="Pages" value={String(session.pageCount)} />
          <Fact label="Events" value={String(session.eventCount)} />
        </div>

        <ChevronDown className="h-5 w-5 text-slate-500 transition-transform group-open:rotate-180 group-open:text-gold" />
      </summary>

      <div className="border-t border-white/10 px-4 pb-5 pt-5 md:px-5">
        <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
          <section className="space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-200">
                <ShieldCheck className="h-3.5 w-3.5" /> IP captured server-side
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-300">
                {consentLabel}
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Fact label="First seen" value={formatTimestamp(session.firstSeenAt)} />
              <Fact label="Last seen" value={formatTimestamp(session.lastSeenAt)} />
              <Fact label="Landing page" value={session.firstPath || "/"} />
              <Fact label="Referrer" value={session.referrerHost ?? "Direct"} />
              <Fact label="Campaign" value={session.campaignLabel ?? "Unattributed"} />
              <Fact label="Session ID" value={session.sessionId ?? "Legacy / unavailable"} />
            </div>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                Visit signal
              </p>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                <Fact label="Pageviews" value={String(session.pageviewCount)} />
                <Fact label="Max depth" value={`${Math.round(session.maxScrollPercent ?? 0)}%`} />
                <Fact label="External clicks" value={String(session.outboundClickCount)} />
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={copyIp}
                disabled={!session.ip}
                className="inline-flex items-center gap-2 border border-white/15 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-200 transition-colors hover:border-gold hover:text-gold disabled:opacity-50"
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Clipboard className="h-3.5 w-3.5" />}
                {copied ? "IP copied" : "Copy IP"}
              </button>
              <a
                href={session.currentHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border border-white/15 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-200 transition-colors hover:border-gold hover:text-gold"
              >
                Open page <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </section>

          <section className="border-l-0 border-white/10 xl:border-l xl:pl-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                  Meaningful timeline
                </p>
                <p className="mt-1 text-sm text-slate-400">
                  Heartbeats are collapsed so the visit reads cleanly.
                </p>
              </div>
              {session.heartbeatCount > 0 ? (
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-400">
                  {session.heartbeatCount} pulses
                </span>
              ) : null}
            </div>

            <ol className="mt-4 space-y-2">
              {meaningfulEvents.map((event) => (
                <li
                  key={event.id}
                  className="grid gap-2 border border-white/8 bg-slate-950/25 p-3 sm:grid-cols-[8.5rem_minmax(0,1fr)_auto] sm:items-center"
                >
                  <span
                    className={`inline-flex w-fit rounded-full border px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.16em] ${getEventTone(event.eventType)}`}
                  >
                    {getEventLabel(event.eventType)}
                  </span>
                  <span className="min-w-0 truncate text-sm text-slate-200" title={event.page.path}>
                    {event.eventType === "outbound_click"
                      ? event.link.host ?? event.link.href ?? "External destination"
                      : event.page.path}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
                    <Clock3 className="h-3.5 w-3.5" />
                    {new Intl.DateTimeFormat("en-GB", {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      timeZone: DASHBOARD_TIME_ZONE,
                    }).format(new Date(event.recordedAt))}
                  </span>
                </li>
              ))}
            </ol>

            {meaningfulEvents.length === 0 ? (
              <div className="mt-4 border border-dashed border-white/10 p-5 text-sm text-slate-500">
                This session contains heartbeat data only.
              </div>
            ) : null}

            <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-500">
              <span className="inline-flex items-center gap-1.5"><Eye className="h-3.5 w-3.5" /> {session.pageviewCount} opens</span>
              <span className="inline-flex items-center gap-1.5"><Route className="h-3.5 w-3.5" /> {session.pageCount} routes</span>
              <span className="inline-flex items-center gap-1.5"><MousePointerClick className="h-3.5 w-3.5" /> {session.outboundClickCount} exits</span>
              <span className="inline-flex items-center gap-1.5"><Globe2 className="h-3.5 w-3.5" /> {session.country ?? "Unknown"}</span>
            </div>
          </section>
        </div>
      </div>
    </details>
  );
}
