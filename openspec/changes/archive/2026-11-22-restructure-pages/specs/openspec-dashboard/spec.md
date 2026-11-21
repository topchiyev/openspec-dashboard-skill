# OpenSpec Dashboard Page Structure

## MODIFIED Requirements

### Requirement: Browse OpenSpec content offline
The dashboard SHALL show current specifications, active changes, and archived changes. It SHALL render Markdown documents from those sections and support navigation between included documents in the same HTML file.

#### Scenario: Review a project without a network connection
- **WHEN** the user opens the generated file locally with network access disabled
- **THEN** the overview, included documents, and dashboard navigation SHALL be usable directly from the file

#### Scenario: Review a change with mixed task states
- **WHEN** the user opens the Tasks page of an active change containing checked and unchecked tasks
- **THEN** the Tasks page SHALL show the completed and total task counts for the change and display each task's state in the rendered list
- **AND** the project overview SHALL include those tasks in its aggregate progress count

#### Scenario: Review a newly initialized project
- **WHEN** an OpenSpec project has no specifications, active changes, or archives yet
- **THEN** the dashboard SHALL show readable empty states for the corresponding sections

### Requirement: Provide a readable project overview
The dashboard SHALL provide a clear visual hierarchy and readable layouts on desktop and mobile widths. Users SHALL be able to find documents by title or path and navigate the dashboard with a keyboard. The overview SHALL show the project title and summary counts in a compact header above document search. Entries in the Changes, Specifications, and Archived Changes sections SHALL display only the linked item name.

#### Scenario: Open an active or archived change from the overview
- **WHEN** the user views the Changes or Archived Changes section
- **THEN** each entry SHALL contain only the change name as a link
- **AND** following that link SHALL open the change's Proposal page

#### Scenario: Open a specification from the overview
- **WHEN** the user views the Specifications section
- **THEN** each entry SHALL contain only the specification name as a link
- **AND** following that link SHALL open the specification page

#### Scenario: Find a document from the dashboard
- **WHEN** the user enters text matching a specification or change document's title or path
- **THEN** the dashboard SHALL show matching entries that the user can open

#### Scenario: View the overview on a narrow screen
- **WHEN** the overview is displayed on a narrow screen
- **THEN** the header SHALL keep all four summary counts readable within the viewport width

### Requirement: Navigate within a change
The dashboard SHALL lay out the change navigation and page content in the main content frame and show the file path for Markdown documents. The header on pages of active and archived changes SHALL order the available links as Proposal, Delta specs, Design, and Tasks. The links SHALL use anchors within the standalone dashboard.

#### Scenario: Open a change with multiple documents
- **WHEN** the user opens a page of an active or archived change containing multiple documents
- **THEN** the change header SHALL show the available links in the order Proposal, Delta specs, Design, and Tasks
- **AND** the header SHALL indicate the current section, including Delta specs while viewing an individual delta spec
- **AND** following a link SHALL open its target in the same dashboard HTML

#### Scenario: Open a change before its proposal is written
- **WHEN** the user follows the overview link for a change without a proposal document
- **THEN** the Proposal page SHALL show that the proposal is unavailable and provide links to any available change artifacts

#### Scenario: Return to the overview from a document
- **WHEN** the user selects the dashboard title in the header from a document
- **THEN** the dashboard SHALL open the project overview

## ADDED Requirements

### Requirement: Browse a change's delta specifications
The Delta specs link SHALL open an index page for the current change. The index SHALL list links to the change's individual delta spec pages within the generated dashboard.

#### Scenario: Open the delta specs index
- **WHEN** the user follows Delta specs in a change that has delta specs
- **THEN** the index SHALL show a link to each delta spec belonging to that change, including when it has only one
- **AND** following an entry SHALL open that individual delta spec page

#### Scenario: Return to the index from a delta spec
- **WHEN** the user selects Delta specs on an individual delta spec page
- **THEN** the dashboard SHALL open the index for the same change
