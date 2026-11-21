# OpenSpec Dashboard Skill

A Codex skill that turns a project's OpenSpec files into a self-contained HTML dashboard. Browse specifications, active and archived changes, and task progress. Search documents by title or path.

## Install

Use Node.js 20.19 or newer, with npm available. On macOS or Linux, clone the repository and link the skill into your Codex user skills directory.

```sh
skill_repo="$HOME/openspec-dashboard-skill"
git clone https://github.com/topchiyev/openspec-dashboard-skill.git "$skill_repo"
npm ci --ignore-scripts --prefix "$skill_repo/project-dashboard"
mkdir -p "$HOME/.agents/skills"
ln -s "$skill_repo/project-dashboard" "$HOME/.agents/skills/project-dashboard"
```

## Use in Codex

Open a project that contains an `openspec/` directory and ask Codex to show its dashboard. You can invoke the skill explicitly.

```text
$project-dashboard Show me the dashboard.
```

The skill starts a local server when needed and returns its URL. Later requests reuse the running server. Ask Codex to refresh the dashboard after updating the project files or to stop the dashboard when you're done.

## Use from a terminal

Run these commands from the root of an OpenSpec project.

```sh
skill_dir="$HOME/.agents/skills/project-dashboard"

node "$skill_dir/scripts/generate-dashboard.mjs" --project-root "$PWD"
node "$skill_dir/scripts/serve-dashboard.mjs" serve --project-root "$PWD"
node "$skill_dir/scripts/serve-dashboard.mjs" status --project-root "$PWD"
node "$skill_dir/scripts/serve-dashboard.mjs" stop --project-root "$PWD"
```

The default output is `openspec/dashboard.html`, which you can also open directly in a browser. Use `--output reports/openspec.html` with the generator or the `serve` command to use a different repository-relative path. In Codex, you can set that path in the target project's `AGENTS.md`.

The server listens on the machine running the skill. To view it from another device, use a forwarded URL. If your forwarding setup needs a fixed port, pass `--port PORT` when starting the server.

See the [skill instructions](project-dashboard/SKILL.md) and the [OpenSpec requirements](openspec/specs/openspec-dashboard/spec.md) for details.
