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

### Requirement: Remember the selected dashboard theme
The dashboard SHALL save the selected mode in the browser when storage is available. Theme switching SHALL remain available when the browser blocks storage.

#### Scenario: Reload after choosing a mode
- **WHEN** the user selects a mode with browser storage available and reloads the same dashboard
- **THEN** the switch SHALL show the saved mode and the dashboard SHALL apply its palette

#### Scenario: Change themes when storage is blocked
- **WHEN** browser storage is unavailable and the user selects a theme
- **THEN** the dashboard SHALL apply the selected palette for the current page
