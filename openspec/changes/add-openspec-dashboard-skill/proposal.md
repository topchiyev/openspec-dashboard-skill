# Proposal

## Why

OpenSpec keeps project specifications, changes, and implementation tasks across many Markdown files. A reusable Codex skill can turn those files into a browsable project dashboard that people can open offline and refresh whenever they need a current view.

## What Changes

- Add a reusable Project Dashboard skill that can be installed for a Codex user and used in multiple OpenSpec repositories.
- Generate one self-contained HTML dashboard with a responsive overview, task progress, active and archived changes, and rendered specifications and change documents.
- Support requests such as “Update dashboard” to regenerate the current project's dashboard and return its path.
- Allow a repository to document its dashboard output path in `AGENTS.md`. Use `openspec/dashboard.html` by default.

## Capabilities

### New Capabilities

- `openspec-dashboard` covers generating, browsing, and refreshing a static OpenSpec dashboard for a selected project.

### Modified Capabilities

## Impact

The skill will ship with a generator and the assets it needs. Operation requires access to the selected project's files. The dashboard is a local HTML artifact suitable for offline viewing.
