# OSOH MVP Phase 1 — Governance Foundation

## Core Boundary
- OSOH core:
  - https://protowebstudio.com
  - https://www.protowebstudio.com
  - https://api.protowebstudio.com

## External Monitored Surface
- Sentinel:
  - https://sentinel.protowebstudio.com

## Constitutional Rule
- Sentinel may send monitoring data into OSOH
- OSOH may display Sentinel metrics
- Sentinel does not become OSOH core
- Sentinel does not receive first-party session trust
- Sentinel does not receive broad first-party CORS trust

## Classification Rule
- classification=external_monitored_surface

## Activation States
- registered
- inactive
- active_monitored_surface
- disabled
- revoked

## Trust-Boundary Non-Negotiables
- Sentinel must not be added to SANCTUM_STATEFUL_DOMAINS
- Sentinel must not be treated as a trusted first-party frontend
- Sentinel must not receive operator/admin privilege by integration
- Sentinel credentials must be site-scoped and ingest-only

## MVP Target
- Level 2 pull monitoring
- Level 3 scoped push ingest
- Level 4 hybrid monitored surface visibility

## MVP Out of Scope
- shared login
- shared browser session trust
- broad CORS trust for Sentinel
- over-engineered multi-surface platform
