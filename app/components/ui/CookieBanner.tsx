"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import {
  ANALYTICS_CONSENT_EVENT,
  ANALYTICS_CONSENT_KEY,
  type AnalyticsConsentValue,
} from "@/lib/analytics-consent";

type ConsentSnapshot = AnalyticsConsentValue | "unset" | "loading";

function getConsentSnapshot(): ConsentSnapshot {
  try {
    const consent = window.localStorage.getItem(ANALYTICS_CONSENT_KEY);
    return consent === "analytics" || consent === "essential" ? consent : "unset";
  } catch {
    return "unset";
  }
}

function subscribeToConsent(onStoreChange: () => void) {
  window.addEventListener(ANALYTICS_CONSENT_EVENT, onStoreChange);
  window.addEventListener("storage", onStoreChange);

  return () => {
    window.removeEventListener(ANALYTICS_CONSENT_EVENT, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

export function CookieBanner() {
  const pathname = usePathname();
  const [dismissed, setDismissed] = useState(false);
  const isProposalPage = pathname?.startsWith("/proposals/") ?? false;

  const consent = useSyncExternalStore(
    subscribeToConsent,
    getConsentSnapshot,
    () => "loading"
  );

  const dismissNotice = () => {
    try {
      window.localStorage.setItem(ANALYTICS_CONSENT_KEY, "analytics");
    } catch {
      // ignore
    }
    setDismissed(true);

    window.dispatchEvent(new Event(ANALYTICS_CONSENT_EVENT));
  };

  // Private proposal pages are invite-only; no banner noise there.
  if (isProposalPage || consent !== "unset" || dismissed) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] p-4 md:p-6">
      <div className="mx-auto max-w-7xl border border-white/10 bg-strath-navy/95 supports-[backdrop-filter]:backdrop-blur-sm shadow-xl transform-gpu">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 md:p-5">
          <div className="text-[15px] text-slate-300 leading-relaxed">
            <span className="font-semibold text-white">Cookies.</span>{" "}
            This site uses cookies and analytics technologies to understand usage and improve the experience.
            {" "}
            <Link href="/privacy" className="text-gold hover:text-white underline underline-offset-4">
              Learn more
            </Link>
            .
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={dismissNotice}
              className={clsx(
                "px-5 py-2.5 text-[15px] font-bold uppercase tracking-widest",
                "bg-gold text-strath-navy hover:bg-white transition-colors"
              )}
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
