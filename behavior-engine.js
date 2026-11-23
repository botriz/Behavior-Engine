const MAX_EVENTS = 10000;

export function analyzeBehavior({ events = [], consent = false, locked = false } = {}) {
  if (locked) {
    return { mode: "LOCKED", status: "blocked", metrics: null, note: "Behavior analysis is disabled by policy." };
  }
  if (consent !== true) {
    return { mode: "CONSENT_REQUIRED", status: "not_available", metrics: null, note: "Explicit analytics consent is required." };
  }
  if (!Array.isArray(events)) throw new TypeError("events must be an array.");
  if (events.length > MAX_EVENTS) throw new RangeError("Event batch exceeds the 10,000 event limit.");

  const counts = Object.create(null);
  let accepted = 0;
  for (const event of events) {
    if (!event || typeof event !== "object" || Array.isArray(event)) continue;
    const type = typeof event.type === "string" ? event.type.trim() : "";
    if (!/^[a-z][a-z0-9_.-]{0,63}$/i.test(type)) continue;
    counts[type] = (counts[type] || 0) + 1;
    accepted += 1;
  }

  return {
    mode: "CONSENTED_AGGREGATE",
    status: "available",
    metrics: {
      totalEvents: accepted,
      eventTypes: Object.keys(counts).length,
      countsByType: counts
    },
    note: "Only aggregate event-type counts are returned; no identity, sensitive attribute, or individual profile is inferred."
  };
}

export const behaviorLimits = Object.freeze({ maxEvents: MAX_EVENTS });
