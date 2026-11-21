# OpenSpec Dashboard Theme

## ADDED Requirements

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
The dashboard SHALL lay out the file path, change navigation, and rendered document in the main content frame. Documents in the same active or archived change SHALL be linked using their in-page anchors.

#### Scenario: Open a change with multiple documents
- **WHEN** the user opens one document in a change with multiple documents
- **THEN** the dashboard SHALL show links to the other documents in that change and indicate the current document
- **AND** following a link SHALL open that document in the same dashboard HTML

#### Scenario: Return to the overview from a document
- **WHEN** the user selects the dashboard title in the header from a document
- **THEN** the dashboard SHALL open the project overview

## MODIFIED Requirements

### Requirement: Provide a readable project overview
The dashboard SHALL provide a clear visual hierarchy and readable layouts on desktop and mobile widths. Users SHALL be able to find documents by title or path and navigate the dashboard with a keyboard. The overview SHALL show the project title and summary counts in a compact header above document search.

#### Scenario: Find a document from the dashboard
- **WHEN** the user enters text matching a specification or change document's title or path
- **THEN** the dashboard SHALL show matching entries that the user can open

#### Scenario: View the overview on a narrow screen
- **WHEN** the overview is displayed on a narrow screen
- **THEN** the header SHALL keep all four summary counts readable within the viewport width
