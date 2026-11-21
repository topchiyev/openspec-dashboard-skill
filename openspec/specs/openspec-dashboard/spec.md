# OpenSpec Dashboard

## Purpose

Give users a portable, readable overview of a project's OpenSpec documents and task progress that they can regenerate on demand.

## Requirements

### Requirement: Generate a dashboard for the selected project
The skill SHALL read the selected project's `openspec/` directory and generate a standalone HTML file. It SHALL use the configured repository output path, with `openspec/dashboard.html` as the default.

#### Scenario: Create the first dashboard
- **WHEN** the user asks to generate a dashboard file for a project with an `openspec/` directory and no dashboard exists
- **THEN** the skill SHALL generate the HTML file and return its location

#### Scenario: Use a repository-specific output path
- **WHEN** the project's applicable `AGENTS.md` instructions specify a dashboard output path within the repository
- **THEN** the skill SHALL write the dashboard to that path and return its location

#### Scenario: Project has no OpenSpec directory
- **WHEN** the user requests a dashboard for a project without an `openspec/` directory
- **THEN** the skill SHALL explain that the source directory is missing and leave the project files untouched

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

### Requirement: Refresh the dashboard on request
The skill SHALL support explicit update requests and rebuild the dashboard at the same configured path from the current OpenSpec files. On success, it SHALL return the file's location or its existing server URL. If generation fails, it SHALL report the error and preserve the previous dashboard.

#### Scenario: Refresh after manual edits
- **WHEN** a user edits OpenSpec files and asks to update the dashboard
- **THEN** reopening or refreshing the HTML file SHALL show the latest content, including additions, removals, and changed task states
- **AND** the skill SHALL return the dashboard location

#### Scenario: Generation fails during refresh
- **WHEN** an update cannot complete
- **THEN** the skill SHALL report the failure and leave the previous dashboard available

### Requirement: Serve the dashboard on request
When a user asks to see, open, or serve the selected project's dashboard, the skill SHALL return the URL of an existing dashboard server for that project or start one when needed. The server SHALL serve only the configured dashboard HTML over HTTP on loopback. Serving an existing dashboard SHALL require only Node.js.

#### Scenario: Open a dashboard that is already served
- **WHEN** the user asks to see the dashboard and its server is running
- **THEN** the skill SHALL return that server's URL

#### Scenario: Open a dashboard with no server
- **WHEN** the user asks to see the dashboard and its server is stopped
- **THEN** the skill SHALL generate the dashboard if the HTML is missing, start the server, and return its URL

#### Scenario: View from another device
- **WHEN** the user is on another device
- **THEN** the skill SHALL return the environment's forwarded URL when available or identify the server URL as local to the machine running it

### Requirement: Check and stop the selected project's server
The skill SHALL provide status and stop commands scoped to the selected project. Stopping an already stopped dashboard server SHALL report that it is stopped.

#### Scenario: Check the server status
- **WHEN** the user asks whether the dashboard is being served
- **THEN** the skill SHALL return the active URL or report that the server is stopped

#### Scenario: Stop an active server
- **WHEN** the user asks to stop a running dashboard server
- **THEN** the skill SHALL stop that project's server and report the result
- **AND** dashboards served for other projects SHALL remain available

### Requirement: Choose the dashboard appearance
The dashboard SHALL provide a visible, keyboard-accessible theme switch with Auto, Light, and Dark options. It SHALL indicate the selected mode and apply its palette to the overview, document views, and controls. The switch SHALL work with the standalone HTML file offline.

#### Scenario: Use the browser preference by default
- **WHEN** the dashboard opens without a saved mode
- **THEN** the switch SHALL show Auto selected
- **AND** the dashboard SHALL use the dark palette when the browser reports a dark preference and the light palette otherwise

#### Scenario: Follow a browser preference change
- **WHEN** the browser color preference changes while Auto is selected
- **THEN** the dashboard SHALL apply the corresponding palette without a page reload

#### Scenario: Select a manual theme
- **WHEN** the user selects Light or Dark
- **THEN** the dashboard SHALL immediately apply the selected palette and keep it active across browser color preference changes

#### Scenario: Return to Auto
- **WHEN** the user switches from Light or Dark to Auto
- **THEN** the dashboard SHALL immediately follow the browser’s current color preference

#### Scenario: Render Dark mode
- **WHEN** the dashboard uses the dark palette
- **THEN** page backgrounds, cards, and content blocks SHALL use neutral dark surfaces
- **AND** keywords, specification labels, links, and selected controls SHALL retain distinct accent colors

### Requirement: Remember the selected dashboard theme
The dashboard SHALL save the selected mode in the browser when storage is available. Theme switching SHALL remain available when the browser blocks storage.

#### Scenario: Reload after choosing a mode
- **WHEN** the user selects a mode with browser storage available and reloads the same dashboard
- **THEN** the switch SHALL show the saved mode and the dashboard SHALL apply its palette

#### Scenario: Change themes when storage is blocked
- **WHEN** browser storage is unavailable and the user selects a theme
- **THEN** the dashboard SHALL apply the selected palette for the current page

### Requirement: Keep the dashboard header visible
The dashboard SHALL keep its top bar, including section links and the theme switch, visible at the top of the viewport as the user scrolls. It SHALL account for the header height when navigating to an in-page target.

#### Scenario: Navigate with a sticky header
- **WHEN** the user follows a link to a dashboard section, document, or heading
- **THEN** the target SHALL be visible below the header at desktop and narrow widths

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

### Requirement: Browse a change's delta specifications
The Delta specs link SHALL open an index page for the current change. The index SHALL list links to the change's individual delta spec pages within the generated dashboard.

#### Scenario: Open the delta specs index
- **WHEN** the user follows Delta specs in a change that has delta specs
- **THEN** the index SHALL show a link to each delta spec belonging to that change, including when it has only one
- **AND** following an entry SHALL open that individual delta spec page

#### Scenario: Return to the index from a delta spec
- **WHEN** the user selects Delta specs on an individual delta spec page
- **THEN** the dashboard SHALL open the index for the same change
