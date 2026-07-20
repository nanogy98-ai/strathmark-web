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
  }
}

export function CookieBanner() {
  const pathname = usePathname();
  const [dismissed, setDismissed] = useState(false);
  const isProposalPage = pathname?.startsWith("/proposals/") ?? false;

  const shouldShow = useSyncExternalStore(
    () => () => {
      // No-op subscription: I re-render on accept via setDismissed().
    },
    () => {
      try {
        return !window.localStorage.getItem(ANALYTICS_CONSENT_KEY);
      } catch {
        return true;
      }
    },
    () => false
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

    window.dispatchEvent(new Event(ANALYTICS_CONSENT_EVENT));
  };

  // Private proposal pages are invite-only; no banner noise there.
  if (isProposalPage || !shouldShow || dismissed) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] p-4 md:p-6">
      <div className="mx-auto max-w-7xl border border-white/10 bg-strath-navy/95 supports-[backdrop-filter]:backdrop-blur-sm shadow-xl transform-gpu">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 md:p-5">
          <div className="max-w-4xl text-sm text-slate-300 leading-relaxed">
            <span className="font-semibold text-white">Privacy choices.</span>{" "}
            This site keeps a private first-party operational log, including full IP address,
            to protect and run the website. Essential storage remembers your preferences and
            visit session. With your permission, Google Analytics and Microsoft Clarity are
            also used to understand site usage.
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
              Continue without analytics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
