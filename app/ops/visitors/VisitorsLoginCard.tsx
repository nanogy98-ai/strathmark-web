"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

type VisitorsLoginCardProps = {
  mode: "setup" | "login";
  defaultUsername?: string;
};

export function VisitorsLoginCard({
  mode,
  defaultUsername = "",
}: VisitorsLoginCardProps) {
  const router = useRouter();
  const [username, setUsername] = useState(defaultUsername);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSignIn = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    startTransition(async () => {
      try {
        const response = await fetch("/api/ops/session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        });

        const result = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;

        if (!response.ok) {
          setError(result?.error ?? "The dashboard login could not be completed.");
          return;
        }

        setPassword("");
        router.refresh();
      } catch (signInError) {
        setError(
          signInError instanceof Error
            ? signInError.message
            : "The dashboard login could not be completed."
        );
      }
    });
  };

  const handleSignOut = () => {
    setError(null);

    startTransition(async () => {
      try {
        await fetch("/api/ops/session", {
          method: "DELETE",
        });
        router.refresh();
      } catch (signOutError) {
        setError(
          signOutError instanceof Error
            ? signOutError.message
            : "The session could not be cleared."
        );
      }
    });
  };

  return (
    <div className="border border-white/10 bg-white/[0.02] p-6">
      <h2 className="font-serif text-2xl font-bold text-white">Dashboard Access</h2>
      <p className="mt-3 text-sm leading-relaxed text-slate-400">
        {mode === "setup"
          ? "Finish the storage and dashboard setup first, then sign in here with your private ops credentials."
          : "Use your private dashboard username and password to unlock the live visitor log."}
      </p>

      <form className="mt-6 space-y-4" onSubmit={handleSignIn}>
        <label className="block space-y-2">
          <span className="text-xs uppercase tracking-[0.22em] text-slate-500">Username</span>
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className="w-full border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-gold"
            autoComplete="username"
            disabled={mode === "setup" || isPending}
          />
        </label>
        <label className="block space-y-2">
          <span className="text-xs uppercase tracking-[0.22em] text-slate-500">Password</span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-gold"
            autoComplete="current-password"
            disabled={mode === "setup" || isPending}
          />
        </label>

        {error ? (
          <p className="border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </p>
        ) : null}

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={mode === "setup" || isPending}
            className="bg-gold px-5 py-3 text-xs font-bold uppercase tracking-[0.24em] text-strath-navy transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? "Working…" : "Sign In"}
          </button>
          <button
            type="button"
            onClick={() => router.refresh()}
            className="border border-white/15 px-5 py-3 text-xs font-bold uppercase tracking-[0.24em] text-white transition-colors hover:border-gold hover:text-gold"
          >
            Refresh
          </button>
          <button
            type="button"
            onClick={handleSignOut}
            className="border border-white/15 px-5 py-3 text-xs font-bold uppercase tracking-[0.24em] text-white transition-colors hover:border-gold hover:text-gold"
          >
            Sign Out
          </button>
        </div>
      </form>
    </div>
  );
}
