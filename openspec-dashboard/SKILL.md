---
name: openspec-dashboard
description: Generate, refresh, show, serve, or stop the dashboard for an OpenSpec project. Use when the user asks to see the OpenSpec Dashboard or browse a project's specifications, change documents, or task progress through the dashboard.
---

# OpenSpec Dashboard

Determine the project root from the current repository or the project the user named. Use its applicable `AGENTS.md` instructions to find the dashboard output path. The default is `openspec/dashboard.html`. Resolve the bundled scripts relative to this skill and use Node.js 20.19 or newer.

## Show or serve

When the user asks to see, open, or serve the dashboard, use the bundled server.

```sh
node /path/to/openspec-dashboard/scripts/serve-dashboard.mjs serve --project-root /path/to/project
```

Link the URL printed by the command. It reuses an active server for this project and generates the dashboard if the HTML is missing. Pass `--output` for a configured dashboard path. The server binds to loopback and picks an available port. For a fixed forwarded port, pass `--port PORT` when starting it. If the user is on another device, use the environment's forwarded URL when available. Otherwise, identify the URL as local to the machine running the server.

## Check or stop

Use `status` in place of `serve` to check whether the project's server is running. Use `stop` to stop it. Give both commands the same `--project-root`.

## Generate or refresh

```sh
node /path/to/openspec-dashboard/scripts/generate-dashboard.mjs --project-root /path/to/project
```

Pass `--output` for a configured dashboard path. Link the generated HTML or, if the server is running, its existing URL. Reloading the page shows the regenerated HTML. If the command fails, report the cause from its output.

For generation, install dependencies once by running `npm ci --ignore-scripts` in the skill directory. Serving existing HTML uses only Node.js. For a user-level Codex installation, place or link the whole `openspec-dashboard` directory in a user skill directory such as `~/.agents/skills/`.
