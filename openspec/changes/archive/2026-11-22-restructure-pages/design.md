# Design

## Context

The generator renders the overview and Markdown views into one HTML file. Hash navigation selects the visible view, and search currently discovers documents from links embedded in the overview sections.

## Decisions

### Link overview entries to their landing pages

Use the change directory name for the Proposal link and the specification title for each specification link. Keep item paths, artifact lists, and per-change progress on their relevant pages instead of displaying them in the overview sections. Keep the aggregate counts in the project header. Build the search index from the full collection of rendered Markdown documents so title and path search still finds secondary change artifacts.

### Build change navigation from artifact paths

Match Proposal, Design, and Tasks by their conventional filenames and identify delta specs under the change's `specs/` directory. Use the same ordered navigation for active and archived changes. Generate a Proposal view with an unavailable state when the Markdown file is missing, so the overview link still opens the change. Omit links for unavailable optional artifacts.

### Render a delta spec index within the dashboard

Build the Delta specs page from the documents already associated with each change. Give the index a stable anchor and use the existing view-switching behavior for both the index and its entries. Keep existing document and heading anchors so saved links still resolve. Mark the selected header section and keep the index link usable from individual delta spec pages.
