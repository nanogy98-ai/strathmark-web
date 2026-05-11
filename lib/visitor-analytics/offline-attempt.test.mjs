import assert from "node:assert/strict";
import test from "node:test";

import { buildOfflineAttemptEvent } from "./offline-attempt.ts";

test("builds an analytics event for an offline access attempt", () => {
  const request = new Request("https://www.strathmarkconsulting.com/site-offline", {
    method: "GET",
    headers: {
      "host": "www.strathmarkconsulting.com",
      "referer": "https://example.com/ref",
      "user-agent": "Mozilla/5.0",
      "x-forwarded-for": "203.0.113.10, 10.0.0.1",
      "x-strathmark-original-url":
        "https://www.strathmarkconsulting.com/services?utm_source=linkedin&gclid=test-click",
      "x-vercel-ip-continent": "EU",
      "x-vercel-ip-country": "GB",
      "x-vercel-ip-city": "Edinburgh",
    },
  });

  const event = buildOfflineAttemptEvent(request);

  assert.equal(event.eventType, "offline_attempt");
  assert.equal(event.page.href, "https://www.strathmarkconsulting.com/services?utm_source=linkedin&gclid=test-click");
  assert.equal(event.page.path, "/services?utm_source=linkedin&gclid=test-click");
  assert.equal(event.page.pathname, "/services");
  assert.equal(event.marketing.utmSource, "linkedin");
  assert.equal(event.marketing.gclid, "test-click");
  assert.equal(event.request.ip, "203.0.113.10");
  assert.equal(event.location.country, "GB");
  assert.equal(event.location.city, "Edinburgh");
  assert.equal(event.location.confidence, "city");
});
