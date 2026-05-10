import {
  clearDashboardSession,
  createDashboardSession,
  getDashboardLoginConfig,
  isDashboardLoginConfigured,
  validateDashboardLogin,
} from "@/lib/ops-auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!isDashboardLoginConfigured()) {
    return Response.json(
      { ok: false, error: "Dashboard login is not configured yet." },
      { status: 503 }
    );
  }

  const body = await request.json().catch(() => null);
  const username = typeof body?.username === "string" ? body.username.trim() : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!validateDashboardLogin(username, password)) {
    return Response.json(
      { ok: false, error: "That username or password was not recognised." },
      { status: 401 }
    );
  }

  const { username: configuredUsername } = getDashboardLoginConfig();
  await createDashboardSession(configuredUsername);

  return Response.json({ ok: true, username: configuredUsername });
}

export async function DELETE() {
  await clearDashboardSession();
  return Response.json({ ok: true });
}
