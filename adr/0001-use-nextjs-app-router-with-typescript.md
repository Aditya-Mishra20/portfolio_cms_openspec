# Use Next.js App Router with TypeScript

## Status

Accepted

## Date

2026-08-15

## Context

The portfolio site needs server-rendered, content-driven pages with built-in SEO metadata and static generation. The project must be maintainable by a solo developer and stay current with the ecosystem.

Considered options:
- Next.js 15 App Router with TypeScript: Server Components, metadata API, ISR support built in.
- Pages router: mature but no RSC benefits and more manual metadata.
- Vite + React SPA: client-only rendering, weak SEO without extra tooling.

## Decision

Use Next.js 15 (App Router) with TypeScript as the application framework, because Server Components and the metadata API map directly to the SEO and ISR requirements, and TypeScript gives typed content models for the Sanity integration.

## Consequences

- Good, because pages can be statically generated with per-route metadata and incremental revalidation.
- Good, because the ecosystem (Sanity, Vercel, Tailwind, shadcn/ui) targets App Router as the default.
- Bad, because App Router conventions evolve quickly and require keeping dependencies current.
