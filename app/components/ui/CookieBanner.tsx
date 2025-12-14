 "use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { clsx } from "clsx";

const CONSENT_KEY = "strathmark_cookie_consent_v1";
type ConsentValue = "analytics" | "essential";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function CookieBanner() {
  const [dismissed, setDismissed] = useState(false);

  const shouldShow = useSyncExternalStore(
    () => () => {
      // No-op subscription: we re-render on accept via setDismissed().
    },
    () => {
      try {
        return !window.localStorage.getItem(CONSENT_KEY);
      } catch {
        return true;
      }
    },
    () => false
  );

  const setConsent = (value: ConsentValue) => {
    try {
      window.localStorage.setItem(CONSENT_KEY, value);
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
  };

  if (!shouldShow || dismissed) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] p-4 md:p-6">
      <div className="mx-auto max-w-7xl border border-white/10 bg-strath-navy/95 supports-[backdrop-filter]:backdrop-blur-sm shadow-xl transform-gpu">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 md:p-5">
          <div className="text-sm text-slate-300 leading-relaxed">
            <span className="font-semibold text-white">Cookies.</span>{" "}
            We use essential storage to remember your preferences. With your permission, we also use Google Analytics to understand site usage.
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


