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
    <div className="flex flex-col gap-4 border border-white/10 bg-white/[0.025] p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500">
          Private session
        </p>
        <p className="mt-1 truncate text-sm font-semibold text-white">
          {username ?? "Unknown user"}
        </p>
        {lastSyncLabel ? (
          <p className="mt-1 text-xs text-slate-500">{lastSyncLabel}</p>
        ) : null}
      </div>

      <div className="flex shrink-0 flex-wrap gap-2">
        <button
          type="button"
          onClick={handleRefresh}
          className="bg-gold px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.22em] text-strath-navy transition-colors hover:bg-white"
        >
          {isRefreshing || isPending ? "Syncing…" : "Refresh"}
        </button>
        <button
          type="button"
          onClick={handleSignOut}
          className="border border-white/15 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.22em] text-white transition-colors hover:border-gold hover:text-gold"
        >
          {isPending ? "Signing Out…" : "Sign Out"}
        </button>
      </div>
    </div>
  );
}
