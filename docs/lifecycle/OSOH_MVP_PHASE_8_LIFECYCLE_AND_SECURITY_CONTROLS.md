# OSOH MVP Phase 8 — Lifecycle and Security Controls

## Token Lifecycle
- issue token
- rotate token
- revoke token

## Site Lifecycle
- registered
- inactive
- active_monitored_surface
- disabled
- revoked

## Security Controls
- token is site-scoped
- token is ingest-only
- token cannot access operator UI
- token cannot mutate admin state
- invalid token rejected
- invalid payload rejected
- ambiguous classification rejected

## Runtime Controls
- rate limiting for ingest endpoint
- acceptance and rejection logging
- disable surface without deleting history
- preserve pull monitoring even if push ingest is disabled

## Recovery Controls
- token rotation procedure
- token revocation procedure
- site disable procedure
- rollback-safe monitoring continuity

## Audit Requirements
- who issued token
- when token was rotated
- when token was revoked
- when site was activated
- when site was disabled

## Phase 8 Goal
- Sentinel admission is governable, reversible, and auditable at MVP level
