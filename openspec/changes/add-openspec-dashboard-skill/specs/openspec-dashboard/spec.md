# OpenSpec Dashboard

## Purpose

Give users a portable, readable overview of a project's OpenSpec documents and task progress that they can regenerate on demand.

## ADDED Requirements

### Requirement: Generate a dashboard for the selected project
The skill SHALL read the selected project's `openspec/` directory and generate a standalone HTML file. It SHALL use the configured repository output path, with `openspec/dashboard.html` as the default.

#### Scenario: Create the first dashboard
- **WHEN** the user requests a dashboard for a project with an `openspec/` directory and no dashboard exists
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
The skill SHALL support explicit update requests and rebuild the dashboard at the same configured path from the current OpenSpec files. On success, it SHALL return the file's location. If generation fails, it SHALL report the error and preserve the previous dashboard.

#### Scenario: Refresh after manual edits
- **WHEN** a user edits OpenSpec files and asks to update the dashboard
- **THEN** reopening or refreshing the HTML file SHALL show the latest content, including additions, removals, and changed task states
- **AND** the skill SHALL return the dashboard location

#### Scenario: Generation fails during refresh
- **WHEN** an update cannot complete
- **THEN** the skill SHALL report the failure and leave the previous dashboard available
