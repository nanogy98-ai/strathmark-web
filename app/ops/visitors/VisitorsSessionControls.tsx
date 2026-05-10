"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

type VisitorsSessionControlsProps = {
  username: string | null;
  onRefresh?: () => Promise<void> | void;
  isRefreshing?: boolean;
  lastSyncLabel?: string | null;
};

export function VisitorsSessionControls({
  username,
  onRefresh,
  isRefreshing = false,
  lastSyncLabel = null,
}: VisitorsSessionControlsProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleRefresh = () => {
    if (!onRefresh) {
      router.refresh();
      return;
    }

    startTransition(async () => {
      await onRefresh();
    });
  };

  const handleSignOut = () => {
    startTransition(async () => {
      await fetch("/api/ops/session", {
        method: "DELETE",
      });
      router.refresh();
    });
  };

  return (
    <div className="border border-white/10 bg-white/[0.02] p-6">
      <h2 className="font-serif text-2xl font-bold text-white">Session</h2>
      <p className="mt-3 break-all text-sm leading-relaxed text-slate-400">
        Signed in as {username ?? "Unknown user"}.
      </p>
      {lastSyncLabel ? (
        <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-500">
          {lastSyncLabel}
        </p>
      ) : null}

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleRefresh}
          className="bg-gold px-5 py-3 text-xs font-bold uppercase tracking-[0.24em] text-strath-navy transition-colors hover:bg-white"
        >
          {isRefreshing || isPending ? "Syncing…" : "Refresh"}
        </button>
        <button
          type="button"
          onClick={handleSignOut}
          className="border border-white/15 px-5 py-3 text-xs font-bold uppercase tracking-[0.24em] text-white transition-colors hover:border-gold hover:text-gold"
        >
          {isPending ? "Signing Out…" : "Sign Out"}
        </button>
      </div>
    </div>
  );
}
