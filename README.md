# Suraya Behavior Engine

A small, deterministic, consent-gated analytics module. It does not track users, collect device signals, infer sensitive traits, or send data anywhere.

## API

`analyzeBehavior({ events, consent, locked })`

- Returns no metrics unless explicit `consent: true` is supplied.
- Returns a policy-blocked result when `locked: true`.
- Aggregates only validated event-type counts.
- Ignores malformed events and caps each batch at 10,000 events.
- Does not persist or transmit data.

## Validation

```bash
npm test
```

This module is not a server, tracking SDK, or substitute for a privacy notice and consent-management system.
