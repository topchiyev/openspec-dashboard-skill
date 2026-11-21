import { readFileSync } from 'node:fs';
import { relative, sep } from 'node:path';
import { escapeHtml, fragment, parseDocument, renderDocument } from './markdown.mjs';
import { outputMarker } from './project.mjs';

function asset(name) {
  return readFileSync(new URL(`../assets/${name}`, import.meta.url), 'utf8');
}

function documentLink(document, showPath = false) {
  const title = escapeHtml(document.title);
  const path = escapeHtml(document.path);
  return `<li class="document-link" data-document-link>
    <a href="${fragment(document.id)}" data-title="${title}" data-path="${path}">${title}</a>
    ${showPath ? `<span class="document-path">${path}</span>` : ''}
  </li>`;
}

function groupMarkup(group, withProgress) {
  const tasks = group.documents.find(document => document.path === `${group.path}/tasks.md`);
  const total = tasks?.totalTasks ?? 0;
  const completed = tasks?.completedTasks ?? 0;
  const progress = total
    ? `<div class="progress">
         <span>${completed} / ${total} tasks complete</span>
         <progress max="${total}" value="${completed}" aria-label="Tasks complete"></progress>
       </div>`
    : '<div class="progress">No tasks listed</div>';
  const title = escapeHtml(group.name);
  return `<li class="group" id="${group.id}" data-group tabindex="-1">
    <div class="group-heading"><h3>${title}</h3>${withProgress ? progress : ''}</div>
    ${group.documents.length
      ? `<ul class="document-list">${group.documents.map(document => documentLink(document)).join('\n')}</ul>`
      : '<p class="empty">No Markdown documents.</p>'}
  </li>`;
}

function section(id, title, content, emptyText) {
  return `<section class="dashboard-section" id="${id}" aria-labelledby="${id}-title" tabindex="-1">
    <h2 id="${id}-title">${title}</h2>
    ${content || `<p class="empty section-empty">${emptyText}</p>`}
  </section>`;
}

function statistic(value, label) {
  return `<div class="statistic"><dt>${label}</dt><dd>${value}</dd></div>`;
}

export function renderDashboard(project, source) {
  const documents = new Map();
  const groups = new Map();
  function addDocument(rawDocument) {
    const document = parseDocument(rawDocument);
    documents.set(document.path, document);
    return document;
  }
  function addGroup(rawGroup) {
    const id = `group-${Buffer.from(rawGroup.path).toString('base64url')}`;
    const group = { ...rawGroup, id, documents: rawGroup.documents.map(addDocument) };
    groups.set(group.path, id);
    return group;
  }

  const overview = source.overview && addDocument(source.overview);
  const standaloneSpecifications = source.topLevelSpecifications.map(addDocument);
  const specificationGroups = source.specificationGroups.map(addGroup);
  const changes = source.changes.map(addGroup);
  const archives = source.archives.map(addGroup);
  const outputPath = relative(project.root, project.output).split(sep).join('/');
  const projectName = escapeHtml(project.name);

  const taskDocuments = changes.flatMap(change => change.documents
    .filter(document => document.path === `${change.path}/tasks.md`));
  const completedTasks = taskDocuments.reduce((total, document) => total + document.completedTasks, 0);
  const totalTasks = taskDocuments.reduce((total, document) => total + document.totalTasks, 0);
  const specificationCount = standaloneSpecifications.length
    + specificationGroups.reduce((total, group) => total + group.documents.length, 0);
  const activeList = changes.map(group => groupMarkup(group, true)).join('\n');
  const specificationList = specificationGroups.map(group => groupMarkup(group, false)).join('\n');
  const archiveList = archives.map(group => groupMarkup(group, false)).join('\n');
  const documentViews = Array.from(documents.values(), document => `
    <article class="document-view" id="${document.id}" data-document hidden tabindex="-1"
      aria-label="${escapeHtml(document.title)}">
      <a class="back-link" href="#overview">Back to dashboard</a>
      <p class="document-location">${escapeHtml(document.path)}</p>
      <div class="markdown">
        ${document.headings.size ? '' : `<h1>${escapeHtml(document.title)}</h1>`}
        ${renderDocument(document, documents, groups, outputPath)}
      </div>
    </article>`).join('\n');

  return `${outputMarker}
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; script-src 'unsafe-inline'; base-uri 'none'; form-action 'none'">
  <title>${projectName} · OpenSpec dashboard</title>
  <style>${asset('dashboard.css')}</style>
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="topbar">
    <div class="frame topbar-inner">
      <a class="brand" href="#overview">OpenSpec dashboard</a>
      <nav aria-label="Dashboard sections">
        <a href="#active-changes">Changes</a>
        <a href="#specifications">Specs</a>
        <a href="#archive">Archive</a>
      </nav>
    </div>
  </header>
  <main class="frame" id="main" tabindex="-1">
    <div id="overview" tabindex="-1">
      <header class="hero">
        <h1>${projectName}</h1>
        <dl class="statistics">
          ${statistic(changes.length, 'Active changes')}
          ${statistic(`${completedTasks} / ${totalTasks}`, 'Active tasks complete')}
          ${statistic(specificationCount, 'Specification documents')}
          ${statistic(archives.length, 'Archived changes')}
        </dl>
      </header>
      <section class="document-search" aria-label="Find documents">
        <label for="document-search">Find a document</label>
        <input id="document-search" type="search" placeholder="Search by title or path" autocomplete="off">
        <p class="search-status" id="search-status" role="status" aria-atomic="true"></p>
        <ul class="document-list search-results" id="search-results" hidden></ul>
      </section>
      <div id="dashboard-sections">
        ${overview ? `<ul class="document-list overview-link">${documentLink(overview)}</ul>` : ''}
        ${section('active-changes', 'Active changes',
          activeList && `<ul class="groups">${activeList}</ul>`, 'No active changes.')}
        ${section('specifications', 'Specifications',
          `${standaloneSpecifications.length ? `<ul class="document-list overview-link">${standaloneSpecifications.map(document => documentLink(document, true)).join('\n')}</ul>` : ''}
          ${specificationList ? `<ul class="groups">${specificationList}</ul>` : ''}`.trim(),
          'No specification documents.')}
        ${section('archive', 'Archived changes',
          archiveList && `<ul class="groups">${archiveList}</ul>`, 'No archived changes.')}
      </div>
    </div>
    ${documentViews}
  </main>
  <script>${asset('dashboard.js')}</script>
</body>
</html>
`;
}
