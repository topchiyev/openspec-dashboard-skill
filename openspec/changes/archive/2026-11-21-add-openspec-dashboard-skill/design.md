# Design

## Context

This is the first feature in the OpenSpec Dashboard repository. The input is the selected project's repository-local `openspec/` tree. The skill installation can be shared across projects. Each generated HTML file belongs to the project whose documents it contains.

## Goals / Non-Goals

**Goals**

- Make a single invocation useful from both a skill-enabled Codex session and a terminal.
- Keep the dashboard, its document navigation, and its search usable from a local file.
- Give each project a predictable output path and preserve its last usable dashboard if generation fails.
- Return a working dashboard URL on request and reuse an active server for the project.

**Non-Goals**

- Background file monitoring, hosted dashboards, and publication.
- Installation or synchronization across accounts and machines as part of dashboard generation.

## Decisions

### Use one generator for creation and refresh

The skill identifies the current project root from the repository context and applies its `AGENTS.md` guidance. It passes the project root and the resolved output location to a bundled command. The command defaults to `openspec/dashboard.html` and accepts an explicit repository-relative HTML path. Both initial generation and the “Update dashboard” action run the same command. Keeping project selection and instruction interpretation in the skill gives the generator a stable filesystem interface.

### Use the OpenSpec tree as input

Index Markdown under `openspec/specs/` and `openspec/changes/`, including `changes/archive/`, and include the OpenSpec README when present. Use project-relative paths as document identifiers and Markdown headings as display titles, with filename fallbacks. Derive task totals from Markdown list checkboxes in each change's `tasks.md`. Parse Markdown with an established renderer that supports tables and task lists. When reading and writing, resolve paths and enforce their project boundaries. This supports the conventional OpenSpec directory layout with only filesystem access to that project.

### Render Markdown at generation time

Embed rendered document sections, styles, and the small amount of JavaScript needed for title and path filtering in the HTML. Use the rendered entries as the filter's source. Rewrite links between included Markdown files to in-page links, preserving anchors where a corresponding heading exists. Treat the Markdown as document content by escaping raw HTML and rendering only safe link destinations. This gives the browser a single file to open and avoids a runtime Markdown loader.

### Make task status easy to scan

Use a clear project heading and a compact summary, then show active changes with checked and total counts and access to the associated documents. Keep the specification and archive indexes easy to reach. Keep status legible through text and numbers, and give long headings, tables, and code blocks usable layouts on narrow screens. Use standard links and controls so keyboard navigation works.

### Replace the output after a successful build

Render to a temporary file alongside the destination and replace the destination only after the complete file has been written. Report the path after success and report the cause when generation fails. The skill can then direct the user to reopen or reload the same file.

### Serve the configured HTML on demand

The skill routes requests to view the dashboard to a Node.js HTTP server. The server serves the configured HTML at its root URL and reads the file on each request so a refresh is visible at the same URL. If the file is missing at startup, the server runs the bundled generator. The HTTP listener binds to loopback and uses an available port by default. Callers can select a fixed port for an existing forwarding setup.

The server runs independently of the command that started it. A local control socket keyed by the canonical project root lets later commands discover the same URL or stop that project's server. Concurrent view requests reuse the same listener. The control socket stays separate from the HTTP listener that serves the dashboard.

## Risks / Trade-offs

- Large archives increase HTML size. Embed each document once and keep the filter index lightweight.
- OpenSpec documents can link to material outside the dashboard. Rewrite links for included Markdown and preserve ordinary safe links to other targets.
- The file contains the project's rendered OpenSpec content. Keep the output in the project and leave sharing to an explicit user action.
