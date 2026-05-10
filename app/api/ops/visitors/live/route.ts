import { getDashboardSession } from "@/lib/ops-auth";
import {
  VISITOR_ANALYTICS_DASHBOARD_LIMIT,
  getVisitorAnalyticsStorageInfo,
  listVisitorAnalyticsEvents,
} from "@/lib/visitor-analytics/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getDashboardSession();
  if (!session) {
    return Response.json(
      { ok: false, error: "Dashboard session is missing or expired." },
      {
        status: 401,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  }

  const [events, storage] = await Promise.all([
    listVisitorAnalyticsEvents(VISITOR_ANALYTICS_DASHBOARD_LIMIT),
    Promise.resolve(getVisitorAnalyticsStorageInfo()),
  ]);

  return Response.json(
    {
      ok: true,
      events,
      storage,
      refreshedAt: new Date().toISOString(),
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
}
