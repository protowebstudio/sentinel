# OSOH / Sentinel Final State

## Current State
- Sentinel repo head aligned on server to: `ae5c475`
- Live URL: `https://sentinel.protowebstudio.com`
- OSOH core URLs:
  - `https://protowebstudio.com`
  - `https://api.protowebstudio.com`

## Architecture Rule
Sentinel is an **external monitored surface**.
Sentinel is **not** part of the OSOH core control plane, even though it is under the same DNS family.

## Boundary Rule
Sentinel must not be treated as:
- core control plane
- trusted first-party stateful frontend
- broad trusted CORS origin

## Verified Outcome
- forbidden control-plane wording removed from Sentinel live surface
- active backend trust boundary excludes Sentinel
- server repo normalized back to upstream `main`
- recovery branches preserved:
  - `sentinel-live-fixed-fa4b12a`
  - `sentinel-pre-reset-fa4b12a`

## Operating Rule
Changes should follow:

local -> GitHub main -> server pull/update -> build -> live verify

Do not treat the live server as the primary editing surface.

## Notes
Server archive evidence may exist outside the repo under server `_archive`, but the official maintained record is this Git-tracked document.
