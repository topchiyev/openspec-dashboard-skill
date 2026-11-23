# OpenSpec Dashboard Skill

An [Agent Skills](https://agentskills.io/specification) package that turns a project's OpenSpec files into a self-contained HTML dashboard. Use it from Claude Code, Codex, other skill-enabled agents, or a terminal. Browse specifications, active and archived changes, and task progress. Search documents by title or path.

## Install

Choose the agent and scope you want to install for. When an agent installs the skill for you, it uses its own skills directory by default. It installs to multiple agent directories only when you explicitly request those destinations.

Use Node.js 20.19 or newer and npm in the environment where your agent runs commands. On macOS or Linux, clone the repository and install the generator dependencies.

```sh
skill_repo="$HOME/openspec-dashboard-skill"
git clone https://github.com/topchiyev/openspec-dashboard-skill.git "$skill_repo"
(cd "$skill_repo/openspec-dashboard" && npm ci --ignore-scripts)
```

Set `skills_dir` to the single destination you chose, then link the complete `openspec-dashboard` folder there. The example uses the Codex personal directory. For a Claude Code personal install, set `skills_dir="$HOME/.claude/skills"` in its place.

```sh
skills_dir="$HOME/.agents/skills"
mkdir -p "$skills_dir"
ln -s "$skill_repo/openspec-dashboard" "$skills_dir/openspec-dashboard"
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

For a shared repository installation or an agent that cannot follow symlinks, copy the full skill folder from a clean checkout and run `npm ci --ignore-scripts` inside the copy. Each installation needs the bundled scripts, assets, and package files. Install the skill and its dependencies in the agent's remote workspace if it runs on another machine.

When upgrading a linked installation, stop any running dashboard servers, update the checkout, and rerun `npm ci --ignore-scripts` in the skill directory.

## Use from an agent

Open a project that contains an `openspec/` directory and ask your agent to use the skill.

```text
Use the openspec-dashboard skill to show this project's OpenSpec dashboard.
```

The skill starts a local server when needed and returns its URL. Later requests reuse the running server. Ask your agent to refresh the dashboard after updating the project files or to stop the dashboard when you're done.

To configure a different output path, put it in the project instructions read by your agent, such as `AGENTS.md`, `CLAUDE.md`, or `GEMINI.md`. For example, write “Save the OpenSpec dashboard to `reports/openspec.html`.”

## Use from a terminal

Run these commands from the root of an OpenSpec project. Set `skill_dir` to the bundled folder in your checkout or the installed skill directory.

```sh
skill_dir="$HOME/openspec-dashboard-skill/openspec-dashboard"

node "$skill_dir/scripts/generate-dashboard.mjs" --project-root "$PWD"
node "$skill_dir/scripts/serve-dashboard.mjs" serve --project-root "$PWD"
node "$skill_dir/scripts/serve-dashboard.mjs" status --project-root "$PWD"
node "$skill_dir/scripts/serve-dashboard.mjs" stop --project-root "$PWD"
```

The default output is `openspec/dashboard.html`, which you can also open directly in a browser. Use `--output reports/openspec.html` with the generator or the `serve` command to use a different repository-relative path.

The server listens on the machine running the skill. To view it from another device, use a forwarded URL. If your forwarding setup needs a fixed port, pass `--port PORT` when starting the server.

See the [skill instructions](openspec-dashboard/SKILL.md) and the [OpenSpec requirements](openspec/specs/openspec-dashboard/spec.md) for details.
