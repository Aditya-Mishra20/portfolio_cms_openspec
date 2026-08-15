# Proposal: portfolio-cms

## Why

A developer portfolio is the primary marketing asset for freelance and job-seeking developers, yet maintaining one by hand-editing markup means every content update requires a code change and redeploy. This change builds a portfolio website where all content is edited through a Sanity CMS and published without touching code, while the frontend stays fast via static generation.

## What Changes

- Build a Next.js (App Router) portfolio application with five pages: Home, About, Work, Services, and Contact.
- Integrate a Sanity Studio embedded at `/studio` in the same Next.js app for content administration.
- Define Sanity content types: `project`, `service`, `about`, `site-settings`, `contact-info`, and `blog-post`.
- Fetch content via GROQ queries with Incremental Static Regeneration (ISR) so published edits appear without redeploys.
- Add a blog (list + detail pages) alongside the core pages.
- Add a contact form that submits through a Next.js API route and sends email via an email service (e.g. Resend or equivalent).
- Style with Tailwind CSS v4 and shadcn/ui, with a light + dark mode toggle.
- Include built-in SEO (Next.js metadata API, sitemap.xml, robots.txt) and semantic HTML. No analytics in this change.
- Deploy to Vercel with environment variables for Sanity project ID and tokens.
- **BREAKING**: none — greenfield build, no existing application to migrate.

## Capabilities

### New Capabilities
- `site-pages`: Renders the Home, About, Work, Services, and Contact pages from CMS content, with a shared navigation and footer sourced from `site-settings`. Supports light and dark themes.
- `cms-content`: Sanity schema definitions (`project`, `service`, `about`, `site-settings`, `contact-info`, `blog-post`), the embedded Studio at `/studio`, and authenticated access to the Studio.
- `blog`: Blog index and post detail pages rendered from `blog-post` documents via GROQ with ISR.
- `contact-form`: Contact page form with client-side validation that submits to an API route, which sends an email via an external email service and reports success/failure to the user.
- `seo`: Per-page metadata via the Next.js metadata API, `sitemap.xml`, `robots.txt`, and OpenGraph support driven by CMS fields where available.

### Modified Capabilities
<!-- No existing capabilities — greenfield build. -->

## Impact

- New Next.js 15 application (TypeScript, App Router) in this repository — new app code, `package.json` dependencies (Tailwind CSS v4, shadcn/ui, Sanity packages: `sanity`, `@sanity/client`, `@sanity/next`, `groq`).
- New Sanity project required (created via Sanity CLI); consumes `SANITY_PROJECT_ID`, `SANITY_DATASET`, and API token environment variables.
- Contact form requires an email service account and its API key as an environment variable.
- Deployment target: Vercel; ISR revalidation is configured via Sanity webhook or `revalidatePath` triggers.
- No existing specs or code are modified — this is an entirely new change.
