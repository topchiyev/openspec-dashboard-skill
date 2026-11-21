# Restructure pages

## Why

The dashboard overview shows paths, task progress, and document lists inside its sections. A shorter overview would make changes and specifications easier to scan, and a consistent change header would make related artifacts easier to find.

## What Changes

- Show only linked item names in Changes, Specifications, and Archived Changes. Change names open their Proposal pages, and specification names open their specification pages.
- Order the change header links as Proposal, Delta specs, Design, and Tasks.
- Make Delta specs open an intermediate page with links to that change's individual delta specs.

## Capabilities

### New Capabilities

### Modified Capabilities

- `openspec-dashboard` will use name-only overview sections and a consistent change header with a dedicated delta spec index.

## Impact

The generated dashboard's overview and change pages will change. Regenerating the standalone HTML will apply the new navigation to active and archived changes.
