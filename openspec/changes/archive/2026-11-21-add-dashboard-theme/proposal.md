# Proposal

## Why

The dashboard currently uses a light palette regardless of the browser’s appearance setting. Users should be able to follow that setting or choose the palette they prefer when reading OpenSpec documents.

## What Changes

- Add a visible, keyboard-accessible Auto, Light, and Dark switch to the dashboard header.
- Default to Auto and follow the browser’s color preference, including changes while the dashboard is open.
- Allow an explicit Light or Dark override and remember the mode across reloads when browser storage is available.
- Apply both palettes to the overview, document views, and dashboard controls in the standalone HTML.
- Use neutral Dark mode surfaces with accent colors for keywords, labels, links, and selection states.
- Keep the overview compact and the dashboard header visible while scrolling.
- Link documents within each change and align their content with the main dashboard frame.

## Capabilities

### New Capabilities

### Modified Capabilities

- `openspec-dashboard` gains appearance controls, light and dark palettes, and navigation between documents in each change.

## Impact

The HTML template and its embedded CSS and JavaScript will provide the switch and palettes. Existing dashboard files gain the switch when regenerated.
