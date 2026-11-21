# Proposal

## Why

OpenSpec keeps project specifications, changes, and implementation tasks across many Markdown files. The OpenSpec Dashboard skill can turn those files into a browsable dashboard that people can open offline, view through a local web link, and refresh whenever they need a current view.

## What Changes

- Add the reusable OpenSpec Dashboard skill, which can be installed for a Codex user and used in multiple OpenSpec repositories.
- Generate one self-contained HTML dashboard with a responsive overview, task progress, active and archived changes, and rendered specifications and change documents.
- Support requests such as “Update dashboard” to regenerate the current project's dashboard and return its path.
- Start or reuse a local dashboard server when the user asks to see the dashboard. Support checking and stopping that server.
- Allow a repository to document its dashboard output path in `AGENTS.md`. Use `openspec/dashboard.html` by default.

## Capabilities

### New Capabilities

- `openspec-dashboard` covers generating, browsing, refreshing, and serving a static OpenSpec Dashboard for a selected project.

### Modified Capabilities

## Impact

The skill will ship with a generator, its assets, and a local server. Operation requires access to the selected project's files. The dashboard is a standalone HTML artifact suitable for offline viewing. Serving existing HTML requires only Node.js.
