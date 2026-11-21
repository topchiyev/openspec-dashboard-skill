---
name: project-dashboard
description: Generate or update a standalone HTML dashboard for the current OpenSpec project. Use when asked to create, rebuild, refresh, or update an OpenSpec dashboard with specifications, change documents, and task progress.
---

# Project Dashboard

Use the bundled generator for both creating and updating dashboards.

1. Determine the project root from the current repository or the project the user named. Use its applicable `AGENTS.md` instructions to find a dashboard output path. The default is `openspec/dashboard.html`.
2. Run the command below with Node.js 20.19 or newer. Resolve the generator relative to this skill's location. Omit the `--output` option for the default path.

   ```sh
   node /path/to/project-dashboard/scripts/generate-dashboard.mjs --project-root /path/to/project --output reports/openspec.html
   ```

3. On success, link the HTML path printed by the generator. A user who already has it open can reload it. On failure, report the cause from the command output.

Install the dependencies once by running `npm ci --ignore-scripts` in the skill directory. For a user-level Codex installation, place or link the whole `project-dashboard` directory in a user skill directory, such as `~/.agents/skills/`, on the machine running Codex. Keep the generator and assets beside this file.
