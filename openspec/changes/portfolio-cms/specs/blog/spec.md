## ADDED Requirements

### Requirement: Blog index
The blog index MUST list published posts
Feature: blog

#### Scenario: Visitor opens the blog index
- **GIVEN** there are published blog post documents
- **WHEN** a visitor opens the blog index page
- **THEN** the published posts are listed with their titles and summaries
- **AND** posts are ordered by their publication date

#### Scenario: Visitor opens the blog index with no published posts
- **GIVEN** there are no published blog post documents
- **WHEN** a visitor opens the blog index page
- **THEN** the page indicates that no posts are available

### Requirement: Blog post detail page
The blog post detail page MUST render the full post
Feature: blog

#### Scenario: Visitor opens a published post
- **GIVEN** a blog post document is published
- **WHEN** a visitor opens that post's detail page
- **THEN** the post title, body, and cover image are displayed

### Requirement: Draft visibility
Draft posts MUST NOT be shown publicly
Feature: blog

#### Scenario: Visitor requests a draft post URL
- **GIVEN** a blog post document exists only as a draft
- **WHEN** a visitor opens that post's URL
- **THEN** the draft content is not displayed
- **AND** the visitor is shown a not-found response

### Requirement: Published edits
Published edits MUST appear without a redeployment
Feature: blog

#### Scenario: Editor updates a published post
- **GIVEN** a published blog post
- **AND** the editor updates and republishes its content
- **WHEN** a visitor opens the post after the update is published
- **THEN** the updated content is displayed

## MODIFIED Requirements

## REMOVED Requirements