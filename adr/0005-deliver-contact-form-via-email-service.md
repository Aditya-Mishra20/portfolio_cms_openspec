# Deliver contact form submissions via an API route and email service

## Status

Accepted

## Date

2026-08-15

## Context

Visitors must be able to message the site owner from the Contact page, and the owner must receive those messages in their inbox without maintaining a separate messaging system.

Considered options:
- Client form posts to a Next.js API route that sends email via an external service (e.g. Resend): direct inbox delivery, provider swappable.
- Store submissions as a Sanity document type: no email service needed but the owner must check the Studio and loses direct email notifications.

## Decision

Send contact form submissions through an API route (`/api/contact`) to an external email service using an API-key environment variable, because it delivers messages directly to the owner's inbox and keeps the provider swappable behind the route.

## Consequences

- Good, because the owner receives messages in their normal inbox.
- Good, because switching email providers only changes the route implementation.
- Bad, because delivery depends on an external service; failures must surface to the visitor with a retry path.
