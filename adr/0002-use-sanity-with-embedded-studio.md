# Use Sanity as the content source with an embedded Studio

## Status

Accepted

## Date

2026-08-15

## Context

The site owner must edit all site content (pages, projects, services, blog, settings, contact info) without code changes or redeploys. The CMS admin experience and the site should live in one repository and deploy as one unit.

Considered options:
- Sanity with embedded Studio at `/studio`: single repo and deployment, schema-defined content, hosted Content Lake.
- Separate Studio app: more operational overhead with no benefit at this scale.
- Sanity hosted manage-only: weaker integration with the frontend.

## Decision

Use Sanity as the content source with the Studio embedded at `/studio` inside the Next.js app, because it keeps one deployment, gives the owner a schema-driven editing experience, and keeps content contracts close to the frontend code.

## Consequences

- Good, because content edits publish through the Content Lake without redeploys.
- Good, because the Studio can later be extracted to a separate app without schema changes.
- Bad, because the CMS admin ships inside the public application, so the Studio route must be auth-gated.
