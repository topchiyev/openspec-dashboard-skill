# OpenSpec Dashboard Skill

An [Agent Skills](https://agentskills.io/specification) package that turns a project's OpenSpec files into a self-contained HTML dashboard. Use it from Claude Code, Codex, other skill-enabled agents, or a terminal. Browse specifications, active and archived changes, and task progress. Search documents by title or path.

## Install

Install the skill in the target project's repository by default, using the project skills directory for the agent you use. An agent installs for the current or named agent, and uses a personal directory or multiple agent destinations only when you explicitly request them. If the intended repository, agent, or scope is still unclear, the agent asks you to clarify before installing.

Use Node.js 20.19 or newer and npm in the environment where your agent runs commands. On macOS or Linux, run the example below from the root of the target project. It uses Codex's project directory. For Claude Code, set `skill_dir=".claude/skills/openspec-dashboard"` instead.

```sh
(
  set -e
  skill_dir=".agents/skills/openspec-dashboard"
  skill_source="$(mktemp -d)"
  trap 'rm -r -- "$skill_source"' EXIT
  git clone --depth 1 https://github.com/topchiyev/openspec-dashboard-skill.git "$skill_source"
  mkdir -p "$(dirname "$skill_dir")"
  mkdir "$skill_dir"
  cp -R "$skill_source/openspec-dashboard/." "$skill_dir/"
  cd "$skill_dir"
  npm ci --ignore-scripts
)
```

### Installation path reference

Use this table to look up the parent directory for your chosen agent and scope. The skill entry point is `openspec-dashboard/SKILL.md` inside that directory. Project paths are relative to the target workspace.

| Agent | Personal skills | Project skills | Reference |
| --- | --- | --- | --- |
| Claude Code | `~/.claude/skills/` | `.claude/skills/` | [Claude Code](https://code.claude.com/docs/en/skills) |
| Codex | `~/.agents/skills/` | `.agents/skills/` | [Codex](https://learn.chatgpt.com/docs/build-skills#where-codex-loads-local-skills) |
| GitHub Copilot (including VS Code) | `~/.copilot/skills/` | `.github/skills/` | [GitHub](https://docs.github.com/en/copilot/concepts/customizations/agent-skills), [VS Code](https://code.visualstudio.com/docs/agent-customization/agent-skills) |
| Cursor | `~/.cursor/skills/` | `.cursor/skills/` | [Cursor](https://cursor.com/docs/skills) |
| Gemini CLI | `~/.gemini/skills/` | `.gemini/skills/` | [Gemini CLI](https://geminicli.com/docs/cli/skills/) |
| Google Antigravity | `~/.gemini/config/skills/` | `.agents/skills/` | [Antigravity](https://antigravity.google/docs/skills) |
| OpenCode | `~/.config/opencode/skills/` | `.opencode/skills/` | [OpenCode](https://opencode.ai/docs/skills/) |
| Devin Local | `~/.config/devin/skills/` | `.devin/skills/` | [Devin Local](https://docs.devin.ai/desktop/devin-local/customizations) |
| Windsurf | `~/.codeium/windsurf/skills/` | `.windsurf/skills/` | [Skills installer paths](https://github.com/vercel-labs/skills/blob/main/src/agents.ts) |
| Cline | `~/.cline/skills/` | `.cline/skills/` | [Cline](https://docs.cline.bot/customization/skills) |
| Roo Code | `~/.roo/skills/` | `.roo/skills/` | [Roo Code](https://roocodeinc.github.io/Roo-Code/features/skills/) |
| Kiro | `~/.kiro/skills/` | `.kiro/skills/` | [Kiro](https://kiro.dev/docs/skills/) |
| Junie | `~/.junie/skills/` | `.junie/skills/` | [Junie](https://junie.jetbrains.com/docs/agent-skills.html) |
| Amp | `~/.config/agents/skills/` | `.agents/skills/` | [Amp](https://ampcode.com/docs/customize/skills) |
| Goose | `~/.agents/skills/` | `.agents/skills/` | [Goose](https://github.com/aaif-goose/goose/blob/main/documentation/docs/guides/context-engineering/using-skills.md) |

To share the installation with your team, commit the copied skill files and keep `node_modules/` out of Git. Run `npm ci --ignore-scripts` from the installed skill directory in each local or remote environment that generates dashboards.

When upgrading, update the bundle in the project's skills directory and rerun `npm ci --ignore-scripts` there.

## Use from an agent

Open a project that contains an `openspec/` directory and ask your agent to use the skill.

```text
Use the openspec-dashboard skill to show this project's OpenSpec dashboard.
```

The skill starts a local server when needed and returns its URL. Later requests reuse the running server. Ask your agent to refresh the dashboard after updating the project files or to stop the dashboard when you're done.

To configure a different output path, put it in the project instructions read by your agent, such as `AGENTS.md`, `CLAUDE.md`, or `GEMINI.md`. For example, write “Save the OpenSpec dashboard to `reports/openspec.html`.”

## Use from a terminal

Run these commands from the root of an OpenSpec project. Adjust `skill_dir` to match the installation path for your agent, or point it to the bundled folder in a source checkout.

```sh
skill_dir="$PWD/.agents/skills/openspec-dashboard"

node "$skill_dir/scripts/generate-dashboard.mjs" --project-root "$PWD"
node "$skill_dir/scripts/serve-dashboard.mjs" serve --project-root "$PWD"
node "$skill_dir/scripts/serve-dashboard.mjs" status --project-root "$PWD"
node "$skill_dir/scripts/serve-dashboard.mjs" stop --project-root "$PWD"
```

The default output is `openspec/dashboard.html`, which you can also open directly in a browser. Use `--output reports/openspec.html` with the generator or the `serve` command to use a different repository-relative path.

The server listens on the machine running the skill. To view it from another device, use a forwarded URL. If your forwarding setup needs a fixed port, pass `--port PORT` when starting the server.

See the [skill instructions](openspec-dashboard/SKILL.md) and the [OpenSpec requirements](openspec/specs/openspec-dashboard/spec.md) for details.
