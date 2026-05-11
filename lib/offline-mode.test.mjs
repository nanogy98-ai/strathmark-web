import assert from "node:assert/strict";
import test from "node:test";

import {
  SITE_OFFLINE_PATH,
  getOfflineRewritePath,
  isSiteOffline,
} from "./offline-mode.ts";

test("site is offline by default and can be reversed with an env flag", () => {
  assert.equal(isSiteOffline(undefined), true);
  assert.equal(isSiteOffline("true"), true);
  assert.equal(isSiteOffline("false"), false);
  assert.equal(isSiteOffline("0"), false);
  assert.equal(isSiteOffline("off"), false);
});

test("offline mode rewrites public paths but leaves analytics operations available", () => {
  assert.equal(getOfflineRewritePath("/", undefined), SITE_OFFLINE_PATH);
  assert.equal(getOfflineRewritePath("/case-studies", undefined), SITE_OFFLINE_PATH);
  assert.equal(getOfflineRewritePath("/api/visitor-analytics", undefined), SITE_OFFLINE_PATH);

  assert.equal(getOfflineRewritePath(SITE_OFFLINE_PATH, undefined), null);
  assert.equal(getOfflineRewritePath("/ops/visitors", undefined), null);
  assert.equal(getOfflineRewritePath("/api/ops/visitors/live", undefined), null);
  assert.equal(getOfflineRewritePath("/_next/static/chunk.js", undefined), null);
});
