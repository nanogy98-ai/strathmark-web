import assert from "node:assert/strict";
import test from "node:test";

import {
  AFRICA_BLOCK_PATH,
  getAfricaBlockPath,
  shouldBlockAfricaVisitor,
} from "./geo-block.ts";

function makeHeaders(values) {
  return new Headers(values);
}

test("blocks requests when Vercel marks the visitor continent as Africa", () => {
  assert.equal(
    shouldBlockAfricaVisitor(makeHeaders({ "x-vercel-ip-continent": "AF" })),
    true
  );
});

test("blocks African country codes when the continent header is missing", () => {
  assert.equal(
    shouldBlockAfricaVisitor(makeHeaders({ "x-vercel-ip-country": "ng" })),
    true
  );
});

test("allows non-African and unknown locations", () => {
  assert.equal(
    shouldBlockAfricaVisitor(makeHeaders({ "x-vercel-ip-country": "GB" })),
    false
  );
  assert.equal(shouldBlockAfricaVisitor(makeHeaders({})), false);
});

test("returns the blocked path for African traffic without rewriting the blocked route into itself", () => {
  const headers = makeHeaders({ "x-vercel-ip-continent": "AF" });

  assert.equal(getAfricaBlockPath(headers, "/"), AFRICA_BLOCK_PATH);
  assert.equal(getAfricaBlockPath(headers, AFRICA_BLOCK_PATH), null);
});
