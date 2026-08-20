import { identity } from "suraya-global-intelligence-core/suraya-identity.js";
import { isLocked, isSavior } from "suraya-global-intelligence-core/suraya-lock.js";

export function analyzeBehavior(userId) {
  const core = identity();

  if (isSavior()) {
    return {
      mode: "SAVIOR",
      userId,
      activityScore: 999999,
      growthScore: 999999,
      revenueScore: 999999,
      note: "Behavior Engine running in Savior mode."
    };
  }

  if (isLocked()) {
    return {
      mode: "LOCKED",
      userId,
      activityScore: 0,
      growthScore: 0,
      revenueScore: 0,
      note: "Behavior Engine locked by core."
    };
  }

  return {
    mode: "NORMAL",
    userId,
    activityScore: 100,
    growthScore: 100,
    revenueScore: 100,
    note: "Behavior Engine running normally."
  };
}
