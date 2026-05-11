import { buildOfflineAttemptEvent } from "@/lib/visitor-analytics/offline-attempt";
import { recordVisitorAnalyticsEvent } from "@/lib/visitor-analytics/store";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

async function offline(request: Request) {
  await recordVisitorAnalyticsEvent(buildOfflineAttemptEvent(request)).catch(() => null);

  return new Response(request.method === "HEAD" ? null : "Site offline.\n", {
    status: 503,
    headers: {
      "Cache-Control": "no-store, no-cache, max-age=0",
      "Content-Type": "text/plain; charset=utf-8",
      "Retry-After": "86400",
      "X-Robots-Tag": "noindex, nofollow, noarchive",
      "X-Strathmark-Site-Status": "offline",
    },
  });
}

export {
  offline as DELETE,
  offline as GET,
  offline as HEAD,
  offline as OPTIONS,
  offline as PATCH,
  offline as POST,
  offline as PUT,
};
