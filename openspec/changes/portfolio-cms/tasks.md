# Tasks: portfolio-cms

## 1. Project Scaffold

- [ ] 1.1 Scaffold a Next.js 15 App Router project with TypeScript (e.g. `create-next-app`) in this repository.
- [ ] 1.2 Install and configure Tailwind CSS v4 and shadcn/ui with the shadcn init setup.
- [ ] 1.3 Install Sanity packages: `sanity`, `@sanity/client`, `@sanity/next`, `groq`.
- [ ] 1.4 Install `next-themes` and any UI dependencies required by shadcn components.
- [ ] 1.5 Add `SANITY_PROJECT_ID`, `SANITY_DATASET`, and `SANITY_API_TOKEN` to `.env.example` with documentation comments.

## 2. Sanity Project and Studio

- [ ] 2.1 Create the Sanity project and dataset via the Sanity CLI and record project ID and dataset name.
- [ ] 2.2 Define the `project` document type schema (title, description, tech stack, images, links, featured flag, date).
- [ ] 2.3 Define the `service` document type schema (name, description, icon, order).
- [ ] 2.4 Define the `about` document type schema (bio, skills, experience entries, social links).
- [ ] 2.5 Define the `site-settings` singleton schema (site title, description, nav links, footer content, hero content, social links).
- [ ] 2.6 Define the `contact-info` singleton schema (email, phone, location, availability status).
- [ ] 2.7 Define the `blog-post` document type schema (title, body, cover image, publication status, date).
- [ ] 2.8 Mount the embedded Sanity Studio at `/studio` in the Next.js app with the project configuration.
- [ ] 2.9 Configure Studio access so unauthenticated visitors are denied access to `/studio`.

## 3. Content Data Layer

- [ ] 3.1 Create a typed Sanity content client module that centralizes GROQ queries.
- [ ] 3.2 Write a GROQ query for site settings (nav, footer, hero) and implement fetch with ISR revalidation.
- [ ] 3.3 Write GROQ queries for published projects (all + featured) and implement fetch with ISR revalidation.
- [ ] 3.4 Write GROQ queries for services, about content, and contact info with ISR revalidation.
- [ ] 3.5 Write GROQ queries for blog posts (index + single post by slug) excluding drafts.
- [ ] 3.6 Implement webhook-triggered revalidation (`revalidatePath`) for content publishes.

## 4. Site Pages and Components

- [ ] 4.1 Build the site layout with shared navigation and footer rendered from `site-settings`.
- [ ] 4.2 Build the Home page: hero heading and introduction from settings, featured projects from CMS.
- [ ] 4.3 Build the About page: biography and skills from CMS content.
- [ ] 4.4 Build the Work page: grid of all published projects.
- [ ] 4.5 Build the Services page: list of all published services.
- [ ] 4.6 Build the Contact page: contact details from CMS content plus the contact form.
- [ ] 4.7 Implement light + dark theme toggle with `next-themes` and persist the choice.

## 5. Blog

- [ ] 5.1 Build the blog index page listing published posts ordered by publication date.
- [ ] 5.2 Build the blog post detail page rendering title, body, and cover image.
- [ ] 5.3 Return a not-found response for draft posts or unknown post URLs.

## 6. Contact Form

- [ ] 6.1 Build the contact form UI with client-side validation (name, email, message).
- [ ] 6.2 Implement the `/api/contact` route handler that sends email via the configured email service.
- [ ] 6.3 Wire the form to the API route with success and error feedback and a retry path.

## 7. SEO

- [ ] 7.1 Add per-page metadata via `generateMetadata`, driven by CMS content where available.
- [ ] 7.2 Add `sitemap.ts` listing public pages and published blog post URLs.
- [ ] 7.3 Add `robots.ts` pointing at the sitemap and disallowing the `/studio` route.
- [ ] 7.4 Add OpenGraph metadata (title, description, image) to pages.

## 8. Validation and Deployment Readiness

- [ ] 8.1 Configure the Sanity publish webhook to call the revalidation endpoint.
- [ ] 8.2 Prepare Vercel deployment: document env vars and verify the production build succeeds.
- [ ] 8.3 Run `openspec validate portfolio-cms --type change --strict` before archive.
