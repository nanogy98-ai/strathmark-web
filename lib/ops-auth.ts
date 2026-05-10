import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const DASHBOARD_SESSION_COOKIE = "strathmark-ops-session";
const DASHBOARD_SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

type DashboardSessionPayload = {
  username: string;
  issuedAt: number;
  expiresAt: number;
};

function getSafeString(value: string | undefined) {
  return value?.trim() ?? "";
}

function compareSecrets(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
}

function signDashboardSession(value: string, secret: string) {
  return createHmac("sha256", secret).update(value).digest("base64url");
}

function encodeDashboardSession(payload: DashboardSessionPayload, secret: string) {
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = signDashboardSession(encodedPayload, secret);
  return `${encodedPayload}.${signature}`;
}

function decodeDashboardSession(value: string, secret: string) {
  const separatorIndex = value.lastIndexOf(".");
  if (separatorIndex === -1) {
    return null;
  }

  const encodedPayload = value.slice(0, separatorIndex);
  const signature = value.slice(separatorIndex + 1);
  const expectedSignature = signDashboardSession(encodedPayload, secret);

  if (!compareSecrets(signature, expectedSignature)) {
    return null;
  }

  try {
    const decoded = Buffer.from(encodedPayload, "base64url").toString("utf8");
    const payload = JSON.parse(decoded) as DashboardSessionPayload;

    if (
      !payload.username ||
      typeof payload.issuedAt !== "number" ||
      typeof payload.expiresAt !== "number"
    ) {
      return null;
    }

    if (payload.expiresAt <= Date.now()) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export function getDashboardLoginConfig() {
  const username = getSafeString(process.env.VISITOR_DASHBOARD_USERNAME);
  const password = process.env.VISITOR_DASHBOARD_PASSWORD ?? "";
  const sessionSecret =
    getSafeString(process.env.VISITOR_DASHBOARD_SESSION_SECRET) || password;

  return {
    username,
    password,
    sessionSecret,
  };
}

export function isDashboardLoginConfigured() {
  const { username, password } = getDashboardLoginConfig();
  return Boolean(username && password);
}

export function validateDashboardLogin(username: string, password: string) {
  const config = getDashboardLoginConfig();

  if (!config.username || !config.password) {
    return false;
  }

  return (
    compareSecrets(username.trim(), config.username) &&
    compareSecrets(password, config.password)
  );
}

export async function createDashboardSession(username: string) {
  const config = getDashboardLoginConfig();
  if (!config.sessionSecret) {
    throw new Error("Dashboard session secret is not configured.");
  }

  const issuedAt = Date.now();
  const expiresAt = issuedAt + DASHBOARD_SESSION_MAX_AGE_SECONDS * 1000;
  const sessionValue = encodeDashboardSession(
    {
      username,
      issuedAt,
      expiresAt,
    },
    config.sessionSecret
  );

  const cookieStore = await cookies();
  cookieStore.set(DASHBOARD_SESSION_COOKIE, sessionValue, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: DASHBOARD_SESSION_MAX_AGE_SECONDS,
  });
}

export async function clearDashboardSession() {
  const cookieStore = await cookies();
  cookieStore.set(DASHBOARD_SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}

export async function getDashboardSession() {
  const config = getDashboardLoginConfig();
  if (!config.username || !config.sessionSecret) {
    return null;
  }

  const cookieStore = await cookies();
  const value = cookieStore.get(DASHBOARD_SESSION_COOKIE)?.value;
  if (!value) {
    return null;
  }

  const payload = decodeDashboardSession(value, config.sessionSecret);
  if (!payload) {
    return null;
  }

  if (payload.username !== config.username) {
    return null;
  }

  return payload;
}
