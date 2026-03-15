# Sentinel

**Sentinel** is the monitored public-facing trust and evidence surface of the broader **OSOH (Operational Security Hub)** MVP.

It is not just a website.  
It is a **deployed, documented, evidence-backed monitored surface** designed to demonstrate that a real external site can be connected to the platform, observed through the operational dashboard, and used as part of the end-to-end validation of the project.

## Project role inside the MVP

This repository represents one of the three connected but separated surfaces of the full MVP:

- `protowebstudio.com` — the main operational platform
- `api.protowebstudio.com` — the backend/API execution layer
- `sentinel.protowebstudio.com` — the external monitored trust and presentation surface

Within that architecture, **Sentinel** exists to prove that:

- a real web surface can be deployed independently
- the platform can monitor and reference an external target
- monitoring, architecture, and validation narratives can be demonstrated publicly
- the MVP works as a complete end-to-end system rather than as an isolated interface

## Purpose

The purpose of Sentinel is to serve as:

- a **public monitored surface**
- a **trust/presentation layer** for the MVP
- a **validation artifact** for the TFM
- a **read-only explanatory interface** aligned with the system architecture
- an **evidence carrier** for demonstrating deployment, availability, and project scope

## Current status

This repository is part of a **live MVP environment** and supports the active public site:

- `https://sentinel.protowebstudio.com/`

The site is intended to communicate the project clearly while preserving separation from the main platform and backend runtime.

## Technical profile

Sentinel is built as an Astro-based frontend with a component-oriented structure and multilingual support.

Current implementation characteristics include:

- Astro component architecture
- route-based content pages
- shared layout and header structure
- multilingual presentation layer (English / Spanish)
- static and hybrid presentation patterns as needed for the public monitored surface
- documentation-oriented content organization for TFM defense and project explanation

## Main sections

The public site currently presents the MVP through pages such as:

- **Home** — overall project framing and monitored-surface positioning
- **TFM** — academic framing, scope, and rationale
- **Architecture** — separation of platform, API, and Sentinel
- **Monitoring** — monitored-surface validation and evidence narrative
- **Spanish routes** — multilingual mirror structure for public presentation

## What this repository is

This repository is:

- the codebase for the Sentinel public surface
- part of a larger governed MVP
- a presentation and validation layer
- a deployed asset connected conceptually to the broader security platform
- a supporting artifact for technical defense, documentation, and evidence presentation

## What this repository is not

This repository is **not**:

- the full backend platform
- the central API runtime
- the complete operational dashboard
- a generic Astro starter
- a random portfolio/demo site

## Relationship to OSOH

The broader project is centered on a **centralized security operations MVP**.

In that model:

- **OSOH / Protowebstudio platform** provides the main operational logic and system framing
- **API** provides backend execution and service behavior
- **Sentinel** provides the external monitored and publicly presentable surface

This separation is intentional and is part of the project’s technical and academic value.

## Local development

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build the project:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Safe verification workflow

Because this project is tied to a live deployment, changes should follow a controlled workflow.

Minimum safe cycle:

1. make a targeted change
2. run a local build
3. review the diff
4. deploy only after verification
5. check live public routes again

For the deployed server environment, verification must be run with the correct deploy-owner account when applicable.

## Deployment and live-safety note

This repository backs a live public-facing surface.  
That means documentation, content, and UI changes should be treated carefully, especially in shared layouts, multilingual structures, and navigation components.

Changes should be considered safe only after:

- build success
- route sanity checks
- live verification of key pages

## Academic / TFM context

This repository also supports the **TFM defense context** of the project.

Its role is not only technical but also documentary:

- it helps explain the MVP clearly
- it demonstrates separated-surface architecture
- it provides visible proof of deployment
- it supports evidence-backed validation of the project narrative

## Scope boundaries

Sentinel is intentionally bounded.

Its job is to present, validate, and reinforce trust in the MVP — not to replace the operational core of the platform.

This repository should therefore be read as a **monitored external surface with documentation and validation value**, not as the totality of the system.

## Repository maturity note

This project has evolved beyond its starter/template origin.

If any generic starter wording remains in old branches or legacy files, the intended authoritative interpretation is this one:

**Sentinel is the monitored, public-facing, evidence-supporting surface of the OSOH MVP.**

## License / usage

Unless otherwise stated, this repository is part of the Protowebstudio / OSOH project work and should be interpreted within that project context.
