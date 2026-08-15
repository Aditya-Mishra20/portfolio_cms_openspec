## ADDED Requirements

### Requirement: Site-wide navigation and footer from site settings
Feature: site-pages
Rule: Every page shares navigation and footer sourced from the CMS site settings

#### Scenario: Visitor sees configured navigation and footer on any page
- **GIVEN** site settings define navigation links and footer content
- **WHEN** a visitor opens any page of the site
- **THEN** the page shows the configured navigation links
- **AND** the page shows the configured footer content

### Requirement: Home page shows hero and featured projects from CMS content
Feature: site-pages

#### Scenario: Visitor opens the home page
- **GIVEN** site settings define a hero heading and introduction
- **AND** at least one project is marked as featured
- **WHEN** a visitor opens the home page
- **THEN** the hero heading and introduction are displayed
- **AND** the featured projects are listed

### Requirement: About page shows biography and skills from CMS content
Feature: site-pages

#### Scenario: Visitor opens the about page
- **GIVEN** the about content defines a biography and a list of skills
- **WHEN** a visitor opens the about page
- **THEN** the biography is displayed
- **AND** the list of skills is displayed

### Requirement: Work page lists all published projects
Feature: site-pages

#### Scenario: Visitor opens the work page
- **GIVEN** there are published project documents
- **WHEN** a visitor opens the work page
- **THEN** all published projects are displayed

### Requirement: Services page lists all published services
Feature: site-pages

#### Scenario: Visitor opens the services page
- **GIVEN** there are published service documents
- **WHEN** a visitor opens the services page
- **THEN** all published services are displayed

### Requirement: Contact page shows contact information from CMS content
Feature: site-pages

#### Scenario: Visitor opens the contact page
- **GIVEN** the contact info defines an email address and other contact details
- **WHEN** a visitor opens the contact page
- **THEN** the email address and contact details are displayed

### Requirement: Light and dark theme support
Feature: site-pages
Rule: The site renders in the visitor's preferred theme and can be toggled

#### Scenario: Visitor with a preferred theme opens the site
- **GIVEN** the visitor's system prefers the dark theme
- **WHEN** the visitor opens the site
- **THEN** the site renders in the dark theme

#### Scenario: Visitor toggles the theme
- **GIVEN** the site is rendering in the light theme
- **WHEN** the visitor toggles the theme
- **THEN** the site renders in the dark theme
- **AND** the choice is remembered for subsequent visits

## MODIFIED Requirements

## REMOVED Requirements