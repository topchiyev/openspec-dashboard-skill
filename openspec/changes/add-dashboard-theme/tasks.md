# Tasks

## 1. Dashboard palettes and switch

- [x] 1.1 Define light and dark palettes using the dashboard’s shared CSS variables. Verify readable text, links, controls, and focus indicators across the overview and rendered documents, including tables, code blocks, scenario labels, and task markers.
- [x] 1.2 Add the Auto, Light, and Dark switch to the header. Verify that it fits at narrow widths, remains available in document views, and exposes its selection to keyboard and screen-reader users.

## 2. Theme behavior

- [x] 2.1 Apply the mode when the page opens and when the user changes the switch. Verify that Auto follows both browser preferences and live changes, Light and Dark override them, and returning to Auto picks up the current preference.
- [x] 2.2 Save and restore the selected mode using browser storage. Verify that it survives a reload when storage is available and that all three options work when storage is blocked.

## 3. Generated dashboard integration

- [x] 3.1 Regenerate a dashboard and verify theme switching through its local server and from the standalone HTML with the network disabled.
