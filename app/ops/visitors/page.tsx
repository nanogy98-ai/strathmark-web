import type { Metadata } from "next";
import {
  getDashboardLoginConfig,
  getDashboardSession,
  isDashboardLoginConfigured,
} from "@/lib/ops-auth";
import { getSupabaseAdminConfig, isSupabaseAdminConfigured } from "@/lib/supabase/config";
import {
  VISITOR_ANALYTICS_DASHBOARD_LIMIT,
  getVisitorAnalyticsStorageInfo,
  listVisitorAnalyticsEvents,
} from "@/lib/visitor-analytics/store";
import { VisitorsDashboard } from "@/app/ops/visitors/VisitorsDashboard";
import { VisitorsLoginCard } from "@/app/ops/visitors/VisitorsLoginCard";

export const metadata: Metadata = {
  title: "Visitor Log | Strathmark",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

function VisitorsShell({
  children,
  aside,
}: {
  children: React.ReactNode;
  aside: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-strath-navy px-6 py-12 text-slate-200">
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="border-b border-white/10 pb-8">
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-gold">
            Private Ops
          </p>
          <h1 className="mt-4 font-serif text-4xl font-bold text-white md:text-5xl">
            Visitor Log
          </h1>
          <p className="mt-4 max-w-3xl text-slate-400">
            First-party request and device telemetry from consented visits, with IP, user
            agent, geolocation, screen data, and page history.
          </p>
        </header>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_24rem]">
          <div className="space-y-6">{children}</div>
          <aside className="space-y-4">{aside}</aside>
        </section>
      </div>
    </main>
  );
}

function SetupCard() {
  const { adminKey } = getSupabaseAdminConfig();
  const { username, password } = getDashboardLoginConfig();

  return (
    <>
      <div className="border border-dashed border-white/10 bg-white/[0.02] p-8 text-slate-300">
        <h2 className="font-serif text-2xl font-bold text-white">Dashboard Setup Needed</h2>
        <p className="mt-4 leading-relaxed text-slate-400">
          This dashboard uses Supabase to store visit records, plus a simple private login for
          you. This local environment still needs those values before it can save events or open
          the dashboard.
        </p>
        <div className="mt-6 space-y-3 text-sm text-slate-300">
          <p>
            Add the required values to <code>.env.local</code>:
          </p>
          <pre className="overflow-x-auto bg-slate-950/60 p-4 text-xs leading-relaxed text-slate-300">
{`SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SECRET_KEY=${adminKey ?? "sb_secret_..."}
VISITOR_DASHBOARD_USERNAME=${username || "ops"}
VISITOR_DASHBOARD_PASSWORD=${password || "choose-a-strong-password"}`}
          </pre>
          <p>
            Then run the SQL in <code>supabase/visitor_analytics.sql</code> inside the Supabase
            SQL editor.
          </p>
        </div>
      </div>

      <div className="border border-white/10 bg-white/[0.02] p-6 text-sm text-slate-400">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-slate-500">
          What Changed
        </p>
        <p className="mt-3">
          Supabase is now only the database. The visitor dashboard itself uses one simple private
          login.
        </p>
      </div>
    </>
  );
}

export default async function VisitorLogPage() {
  if (!isSupabaseAdminConfigured() || !isDashboardLoginConfigured()) {
    return (
      <VisitorsShell aside={<VisitorsLoginCard mode="setup" />}>
        <SetupCard />
      </VisitorsShell>
    );
  }

  const session = await getDashboardSession();
  if (!session) {
    const { username } = getDashboardLoginConfig();
    return (
      <VisitorsShell aside={<VisitorsLoginCard mode="login" defaultUsername={username} />}>
        <div className="border border-dashed border-white/10 bg-white/[0.02] p-8 text-slate-300">
          <h2 className="font-serif text-2xl font-bold text-white">Sign In Required</h2>
          <p className="mt-4 leading-relaxed text-slate-400">
            Use your private dashboard username and password in the panel on the right to unlock
            the visitor log.
          </p>
        </div>
      </VisitorsShell>
    );
  }

  const events = await listVisitorAnalyticsEvents(VISITOR_ANALYTICS_DASHBOARD_LIMIT);
  const storage = getVisitorAnalyticsStorageInfo();

  return (
    <VisitorsDashboard
      events={events}
      storage={storage}
      initialRefreshedAt={new Date().toISOString()}
      username={session.username}
    />
  );
}
