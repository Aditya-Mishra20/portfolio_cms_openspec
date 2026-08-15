## ADDED Requirements

### Requirement: Studio content types
Content types MUST be available in the Studio
Feature: cms-content
Rule: The Studio exposes project, service, about, site-settings, contact-info, and blog-post content types

#### Scenario: Editor creates a project document
- **GIVEN** an authenticated editor opens the Studio
- **WHEN** the editor creates a new project document
- **THEN** the document has fields for title, description, tech stack, images, links, and featured status
- **AND** the editor can save it as a draft or publish it

#### Scenario: Editor manages site settings
- **GIVEN** an authenticated editor opens the Studio
- **WHEN** the editor edits the site settings document
- **THEN** the editor can update the site title, description, navigation links, footer content, and social links

#### Scenario: Editor manages blog posts
- **GIVEN** an authenticated editor opens the Studio
- **WHEN** the editor creates a blog post document
- **THEN** the document has fields for title, body, cover image, and publication status

### Requirement: Embedded Studio
The Studio MUST be embedded in the site at /studio
Feature: cms-content

#### Scenario: Editor opens the embedded Studio
- **GIVEN** an authenticated editor
- **WHEN** the editor opens the /studio route of the site
- **THEN** the Sanity Studio loads in the browser
- **AND** the editor can browse and edit all content types

### Requirement: Studio authentication
Studio access MUST require authentication
Feature: cms-content

#### Scenario: Unauthenticated visitor opens the Studio
- **GIVEN** a visitor who is not authenticated
- **WHEN** the visitor opens the /studio route of the site
- **THEN** access is denied
- **AND** the visitor is not shown any content management features

### Requirement: Published content delivery
Published content MUST be served to the site
Feature: cms-content

#### Scenario: Site fetches published documents
- **GIVEN** a document has been published in the Studio
- **WHEN** the site fetches content from the content source
- **THEN** the published document is available to the site

#### Scenario: Site excludes unpublished drafts
- **GIVEN** a document exists only as a draft in the Studio
- **WHEN** the site fetches content from the content source
- **THEN** the draft document is not available to the site

## MODIFIED Requirements

## REMOVED Requirements