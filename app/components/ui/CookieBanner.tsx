"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { clsx } from "clsx";

const STORAGE_KEY = "strathmark_cookie_notice_v1";

export function CookieBanner() {
  const [dismissed, setDismissed] = useState(false);

  const shouldShow = useSyncExternalStore(
    () => () => {
      // No-op subscription: we re-render on accept via setDismissed().
    },
    () => {
      try {
        return !window.localStorage.getItem(STORAGE_KEY);
      } catch {
        return true;
      }
    },
    () => false
  );

  const accept = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, "ack");
    } catch {
      // ignore
    }
    setDismissed(true);
  };

  if (!shouldShow || dismissed) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] p-4 md:p-6">
      <div className="mx-auto max-w-7xl border border-white/10 bg-strath-navy/95 backdrop-blur-md shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 md:p-5">
          <div className="text-sm text-slate-300 leading-relaxed">
            <span className="font-semibold text-white">Cookie notice.</span>{" "}
            We use essential storage to remember your preferences. We do not use marketing cookies on this site.
            {" "}
            <Link href="/privacy" className="text-gold hover:text-white underline underline-offset-4">
              Learn more
            </Link>
            .
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={accept}
              className={clsx(
                "px-5 py-2.5 text-xs font-bold uppercase tracking-widest",
                "bg-gold text-strath-navy hover:bg-white transition-colors"
              )}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


