import test from "node:test";
import assert from "node:assert/strict";
import { analyzeBehavior } from "../behavior-engine.js";
test("behavior engine never fabricates scores or exposes a user identifier", () => {
  const result = analyzeBehavior("private-user");
  assert.equal(result.status, "not_implemented");
  assert.equal(result.metrics, null);
  assert.equal("userId" in result, false);
  assert.equal("activityScore" in result, false);
});
