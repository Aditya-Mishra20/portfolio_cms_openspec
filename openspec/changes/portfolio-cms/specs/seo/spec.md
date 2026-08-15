## ADDED Requirements

### Requirement: Page metadata
Per-page metadata MUST be provided for search engines
Feature: seo

#### Scenario: Search engine fetches a page
- **GIVEN** a page with configured metadata
- **WHEN** a search engine fetches the page
- **THEN** the page exposes a unique title and description
- **AND** the metadata reflects CMS content where available

### Requirement: Sitemap
The sitemap MUST list all public pages
Feature: seo

#### Scenario: Search engine fetches the sitemap
- **GIVEN** the site has public pages and published blog posts
- **WHEN** a search engine fetches the sitemap
- **THEN** the sitemap lists the public pages and published blog post URLs

### Requirement: Robots file
The robots file MUST allow crawling of public pages
Feature: seo

#### Scenario: Search engine fetches the robots file
- **WHEN** a search engine fetches the robots file
- **THEN** the robots file is served
- **AND** it points to the sitemap
- **AND** it disallows the embedded Studio route

### Requirement: OpenGraph metadata
OpenGraph metadata MUST be provided for social sharing
Feature: seo

#### Scenario: Social platform fetches a page link
- **GIVEN** a page with OpenGraph metadata configured
- **WHEN** a social platform fetches the page link
- **THEN** the page exposes an OpenGraph title, description, and image

## MODIFIED Requirements

## REMOVED Requirements