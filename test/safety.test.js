import test from "node:test";
import assert from "node:assert/strict";
import { analyzeBehavior, behaviorLimits } from "../behavior-engine.js";

test("behavior metrics require explicit consent", () => {
  const result = analyzeBehavior({ events: [{ type: "page.view" }] });
  assert.equal(result.status, "not_available");
  assert.equal(result.metrics, null);
});

test("locked policy blocks analysis even when consent is present", () => {
  const result = analyzeBehavior({ consent: true, locked: true, events: [{ type: "page.view" }] });
  assert.equal(result.status, "blocked");
  assert.equal(result.metrics, null);
});

test("consented analysis returns aggregate counts only", () => {
  const result = analyzeBehavior({
    consent: true,
    events: [{ type: "page.view" }, { type: "page.view" }, { type: "content.create" }, { type: "../bad" }]
  });
  assert.equal(result.status, "available");
  assert.equal(result.metrics.totalEvents, 3);
  assert.deepEqual({ ...result.metrics.countsByType }, { "page.view": 2, "content.create": 1 });
  assert.equal("userId" in result.metrics, false);
});

test("event batches are bounded", () => {
  assert.throws(() => analyzeBehavior({ consent: true, events: Array(behaviorLimits.maxEvents + 1).fill({ type: "view" }) }), RangeError);
});
