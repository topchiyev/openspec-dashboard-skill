# Tasks

## 1. Project input and dashboard generation

- [x] 1.1 Implement project root and output path handling. Verify the default path, a repository-specific path, and the error for a missing or inaccessible OpenSpec directory.
- [x] 1.2 Index current specifications, active changes, and archived changes. Verify a tree with nested documents, a change with mixed task states, and a newly initialized OpenSpec project.
- [x] 1.3 Render one HTML file with embedded assets, Markdown documents, and in-page links. Verify headings, tables, task lists, links between documents, and safe handling of raw HTML and link destinations.
- [x] 1.4 Replace the output after successful generation. Verify that a failed refresh reports an error and leaves an existing dashboard readable.

## 2. Dashboard interface

- [x] 2.1 Build the overview and document navigation. Verify that progress and document links are easy to find at desktop and mobile widths.
- [x] 2.2 Add title and path filtering. Verify matching and empty results and navigate the dashboard with a keyboard and the network disabled.

## 3. Skill workflow

- [x] 3.1 Package the generator and write the skill instructions for creating and updating a dashboard, including the project path convention and usage from a user-level installation. Verify that one installed skill can generate dashboards for two separate repositories.
- [x] 3.2 Verify the complete refresh workflow from a project chat. Change a task state and add or remove a Markdown file, ask the skill to update the dashboard, and reopen the returned HTML path to confirm the latest content.
