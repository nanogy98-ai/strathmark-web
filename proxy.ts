import { getAfricaBlockPath } from "@/lib/geo-block";
import { getOfflineRewritePath } from "@/lib/offline-mode";
import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const offlinePath = getOfflineRewritePath(request.nextUrl.pathname);

  if (offlinePath) {
    const offlineUrl = request.nextUrl.clone();
    offlineUrl.pathname = offlinePath;
    offlineUrl.search = "";

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-strathmark-original-url", request.nextUrl.href);

    return NextResponse.rewrite(offlineUrl, {
      request: {
        headers: requestHeaders,
      },
    });
  }

  const blockPath = getAfricaBlockPath(request.headers, request.nextUrl.pathname);

  if (!blockPath) {
    return NextResponse.next();
  }

  const blockedUrl = request.nextUrl.clone();
  blockedUrl.pathname = blockPath;
  blockedUrl.search = "";

  return NextResponse.rewrite(blockedUrl);
}

export const config = {
  matcher: ["/((?!_next/).*)"],
};
