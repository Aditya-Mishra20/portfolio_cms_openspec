## ADDED Requirements

### Requirement: Per-page metadata for search engines
Feature: seo

#### Scenario: Search engine fetches a page
- **GIVEN** a page with configured metadata
- **WHEN** a search engine fetches the page
- **THEN** the page exposes a unique title and description
- **AND** the metadata reflects CMS content where available

### Requirement: Sitemap lists all public pages
Feature: seo

#### Scenario: Search engine fetches the sitemap
- **GIVEN** the site has public pages and published blog posts
- **WHEN** a search engine fetches the sitemap
- **THEN** the sitemap lists the public pages and published blog post URLs

### Requirement: Robots file allows crawling of public pages
Feature: seo

#### Scenario: Search engine fetches the robots file
- **WHEN** a search engine fetches the robots file
- **THEN** the robots file is served
- **AND** it points to the sitemap
- **AND** it disallows the embedded Studio route

### Requirement: OpenGraph metadata for social sharing
Feature: seo

#### Scenario: Social platform fetches a page link
- **GIVEN** a page with OpenGraph metadata configured
- **WHEN** a social platform fetches the page link
- **THEN** the page exposes an OpenGraph title, description, and image

## MODIFIED Requirements

## REMOVED Requirements