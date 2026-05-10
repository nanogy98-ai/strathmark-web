"use client";

import { useState } from "react";
import {
  ANALYTICS_CONSENT_EVENT,
  ANALYTICS_CONSENT_KEY,
} from "@/lib/analytics-consent";

export function CookieResetButton() {
  const [done, setDone] = useState(false);

  const reset = () => {
    try {
      window.localStorage.removeItem(ANALYTICS_CONSENT_KEY);
    } catch {
      // ignore
    }
    setDone(true);
    window.dispatchEvent(new Event(ANALYTICS_CONSENT_EVENT));
    window.location.reload();
  };

  return (
    <button
      type="button"
      onClick={reset}
      className="px-5 py-2.5 text-xs font-bold uppercase tracking-widest border border-white/15 text-white hover:border-gold hover:text-gold transition-colors"
    >
      {done ? "Resetting…" : "Reset cookie preferences"}
    </button>
  );
}

