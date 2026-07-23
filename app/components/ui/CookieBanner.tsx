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

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
  }
}

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

  const setConsent = (value: AnalyticsConsentValue) => {
    try {
      window.localStorage.setItem(ANALYTICS_CONSENT_KEY, value);
    } catch {
      // ignore
    }
    setDismissed(true);

    // Consent Mode: update immediately (works for both GTM and gtag-based setups).
    if (typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        analytics_storage: value === "analytics" ? "granted" : "denied",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      });
    }

    if (typeof window.clarity === "function") {
      window.clarity("consentv2", {
        analytics_Storage: value === "analytics" ? "granted" : "denied",
        ad_Storage: "denied",
      });
    }

    window.dispatchEvent(new Event(ANALYTICS_CONSENT_EVENT));
  };

  // Private proposal pages are invite-only; no banner noise there.
  if (isProposalPage || consent !== "unset" || dismissed) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] p-4 md:p-6">
      <div className="mx-auto max-w-7xl border border-white/10 bg-strath-navy/95 supports-[backdrop-filter]:backdrop-blur-sm shadow-xl transform-gpu">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 md:p-5">
          <div className="text-sm text-slate-300 leading-relaxed">
            <span className="font-semibold text-white">Cookies.</span>{" "}
            I use essential storage to remember your preferences. With your permission, I also use Google Analytics and Microsoft Clarity to understand site usage.
            {" "}
            <Link href="/privacy" className="text-gold hover:text-white underline underline-offset-4">
              Learn more
            </Link>
            .
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setConsent("analytics")}
              className={clsx(
                "px-5 py-2.5 text-xs font-bold uppercase tracking-widest",
                "bg-gold text-strath-navy hover:bg-white transition-colors"
              )}
            >
              Accept analytics
            </button>
            <button
              type="button"
              onClick={() => setConsent("essential")}
              className={clsx(
                "px-5 py-2.5 text-xs font-bold uppercase tracking-widest",
                "border border-white/15 text-white hover:border-gold hover:text-gold transition-colors"
              )}
            >
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
