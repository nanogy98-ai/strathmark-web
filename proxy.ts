import { getAfricaBlockPath } from "@/lib/geo-block";
import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
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
