## ADDED Requirements

### Requirement: Contact form validates input
Feature: contact-form

#### Scenario: Visitor submits a valid message
- **GIVEN** the visitor has filled in a valid name, email address, and message
- **WHEN** the visitor submits the contact form
- **THEN** the form accepts the submission

#### Scenario: Visitor submits an invalid email address
- **GIVEN** the visitor has entered a malformed email address
- **WHEN** the visitor submits the contact form
- **THEN** the form shows a validation error for the email address
- **AND** the message is not sent

### Requirement: Submissions are delivered by email
Feature: contact-form

#### Scenario: Valid submission is delivered
- **GIVEN** the contact form is configured with an email service
- **WHEN** the visitor submits a valid message
- **THEN** an email containing the visitor's name, email address, and message is sent to the site owner's inbox

### Requirement: Submission outcome is reported to the visitor
Feature: contact-form

#### Scenario: Delivery succeeds
- **GIVEN** the visitor submitted a valid message
- **AND** the email service delivers the email
- **WHEN** the delivery completes
- **THEN** the visitor sees a success confirmation

#### Scenario: Delivery fails
- **GIVEN** the visitor submitted a valid message
- **AND** the email service fails to deliver the email
- **WHEN** the delivery fails
- **THEN** the visitor sees an error message
- **AND** the visitor can retry the submission

## MODIFIED Requirements

## REMOVED Requirements