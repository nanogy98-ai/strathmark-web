"use client";

import { useState } from "react";

const CONSENT_KEY = "strathmark_cookie_consent_v1";

export function CookieResetButton() {
  const [done, setDone] = useState(false);

  const reset = () => {
    try {
      window.localStorage.removeItem(CONSENT_KEY);
    } catch {
      // ignore
    }
    setDone(true);
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


