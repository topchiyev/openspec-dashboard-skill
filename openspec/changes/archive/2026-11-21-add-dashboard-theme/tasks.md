# Tasks

## 1. Dashboard palettes and switch

- [x] 1.1 Define light and dark palettes using the dashboard’s shared CSS variables. Verify readable text, links, controls, and focus indicators across the overview and rendered documents, including tables, code blocks, scenario labels, and task markers.
- [x] 1.2 Add the Auto, Light, and Dark switch to the header. Verify that it fits at narrow widths, remains available in document views, and exposes its selection to keyboard and screen-reader users.

## 2. Theme behavior

- [x] 2.1 Apply the mode when the page opens and when the user changes the switch. Verify that Auto follows both browser preferences and live changes, Light and Dark override them, and returning to Auto picks up the current preference.
- [x] 2.2 Save and restore the selected mode using browser storage. Verify that it survives a reload when storage is available and that all three options work when storage is blocked.

## 3. Generated dashboard integration

- [x] 3.1 Regenerate a dashboard and verify theme switching through its local server and from the standalone HTML with the network disabled.

## 4. Dashboard layout and navigation

- [x] 4.1 Use neutral Dark mode surfaces and keep accent colors for labels, keywords, and controls. Verify contrast in both palettes.
- [x] 4.2 Compact the project overview and align document content with the main frame. Verify that all four summary counts fit at narrow widths.
- [x] 4.3 Link documents within active and archived changes and identify the current document. Verify the links with a keyboard and in standalone HTML.
- [x] 4.4 Keep the header visible on scroll and offset in-page link targets. Verify that the header leaves document and section targets visible when it wraps at narrow widths.
