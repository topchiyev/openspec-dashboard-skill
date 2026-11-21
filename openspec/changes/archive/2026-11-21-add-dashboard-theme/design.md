# Design

## Context

The generator embeds the stylesheet and scripts in a standalone HTML file. Its stylesheet combines shared color variables with fixed colors for Markdown content and controls. Both the local file and the served dashboard use the same assets.

## Goals

- Apply a single theme throughout the dashboard and preserve the self-contained HTML format.
- Use browser preference and storage APIs directly in the generated page.

## Decisions

### Use shared color variables for both palettes

Move theme-dependent colors into CSS custom properties and specify light and dark values. Apply the selected palette at the document root so overview cards, rendered Markdown, links, focus indicators, and native controls share the same theme. Use shared neutral surfaces in Dark mode and reserve accent colors for labels, keywords, links, and selection states.

### Use a labeled switch in the header

Use native radio controls labeled Auto, Light, and Dark as a compact switch. The header keeps the switch available while viewing a document, and native controls provide keyboard navigation and announce the selected value.

### Resolve and save the mode in the browser

Read the saved mode before the first render to avoid flashing the other palette. Resolve Auto with `prefers-color-scheme` and respond to changes in that preference. Store the selected mode in `localStorage` so Auto can resume following the browser after reload. Explicit modes immediately set the corresponding palette and take precedence over browser preference changes.

### Keep navigation visible while reading

Keep the top bar at the top of the viewport while scrolling. Match the anchor scroll offset to the rendered header height so navigation works when the header wraps on narrow screens. Use a compact project heading and responsive summary grid in the overview.

### Link documents within each change

Render the document path, change navigation, and Markdown in the main content frame. Build links from the documents already grouped under each active or archived change, using the existing in-page anchors. Mark the current link with `aria-current` and use the dashboard title in the top bar to return to the overview.

## Risks and trade-offs

Some browsers limit storage for local files or in privacy modes. Handle failed storage reads and writes while applying mode changes for the current page. Auto uses light colors when the browser provides no dark preference.

## Migration

Regenerating a dashboard embeds the updated stylesheet, switch, and script at its existing output path.
