# Fetch content via GROQ queries with incremental static regeneration

## Status

Accepted

## Date

2026-08-15

## Context

The site must be fast (static pages) while published content edits appear quickly without redeploys. Reads happen against the Sanity Content Lake, and the site deploys on Vercel.

Considered options:
- GROQ queries with ISR (`next: { revalidate }` + webhook-triggered `revalidatePath`): static pages with fast refresh.
- Client-side fetching: simplest but loses static caching and SEO benefits.
- On-demand revalidation per request: over-engineering for a portfolio.

## Decision

Fetch all content with GROQ queries using ISR, with time-based revalidation as a fallback and webhook-triggered `revalidatePath` for immediate refresh, because it keeps pages static while publishing updates appear within seconds.

## Consequences

- Good, because visitors get static-page speed and search engines get crawlable HTML.
- Good, because content updates need no redeploys.
- Bad, because ISR can briefly serve stale content; the webhook keeps the window to seconds.
- Bad, because webhook misconfiguration silently degrades to time-based revalidation.
