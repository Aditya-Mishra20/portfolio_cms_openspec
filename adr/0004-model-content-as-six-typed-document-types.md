# Model site content as six typed Sanity document types

## Status

Accepted

## Date

2026-08-15

## Context

The CMS must model all content the site displays: portfolio projects, services, biography, site-wide settings, contact details, and blog posts. Future changes will extend these types and add content without changing the architecture.

Considered options:
- Six typed document types (`project`, `service`, `about`, `site-settings`, `contact-info`, `blog-post`): discoverable, validated, maps 1:1 to site areas; singletons for settings prevent duplicates.
- Few generic "content block" documents: flexible but harder to discover and validate.

## Decision

Model content as six typed Sanity document types in a single dataset, with `site-settings` and `contact-info` as singletons, because the types map directly to site areas and give schema-level validation while keeping future additions additive.

## Consequences

- Good, because editors get structured forms and valid data.
- Good, because adding a content type later is a small schema addition.
- Bad, because a new content area requires a schema change (code) before editors can use it.
