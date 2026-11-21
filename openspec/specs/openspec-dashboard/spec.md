# openspec-dashboard Specification

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
The dashboard SHALL show current specifications, active changes with task counts, and archived changes. It SHALL render Markdown documents from those sections and support navigation between included documents in the same HTML file.

#### Scenario: Review a project without a network connection
- **WHEN** the user opens the generated file locally with network access disabled
- **THEN** the overview, included documents, and dashboard navigation SHALL be usable directly from the file

#### Scenario: Review a change with mixed task states
- **WHEN** an active change contains checked and unchecked tasks
- **THEN** the dashboard SHALL show the number checked and the total and display those states in the rendered task list

#### Scenario: Review a newly initialized project
- **WHEN** an OpenSpec project has no specifications, active changes, or archives yet
- **THEN** the dashboard SHALL show readable empty states for the corresponding sections

### Requirement: Provide a readable project overview
The dashboard SHALL provide a clear visual hierarchy and readable layouts on desktop and mobile widths. Users SHALL be able to find documents by title or path and navigate the dashboard with a keyboard.

#### Scenario: Find a document from the dashboard
- **WHEN** the user enters text matching a specification or change document's title or path
- **THEN** the dashboard SHALL show matching entries that the user can open

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
