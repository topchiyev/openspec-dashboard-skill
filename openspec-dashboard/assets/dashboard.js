const overview = document.getElementById('overview');
const sections = document.getElementById('dashboard-sections');
const search = document.getElementById('document-search');
const searchResults = document.getElementById('search-results');
const searchStatus = document.getElementById('search-status');
const documentLinks = Array.from(document.querySelectorAll('[data-document-link] a'));
let activeDocument;

function updateSearch() {
  const query = search.value.trim().toLocaleLowerCase();
  searchResults.replaceChildren();
  searchResults.hidden = !query;
  sections.hidden = Boolean(query);
  searchStatus.textContent = '';
  if (!query) return;

  const matches = documentLinks.filter(link =>
    link.dataset.title.toLocaleLowerCase().includes(query) ||
    link.dataset.path.toLocaleLowerCase().includes(query)
  );
  for (const link of matches) {
    const item = document.createElement('li');
    item.className = 'document-link';
    const result = link.cloneNode(true);
    const path = document.createElement('span');
    path.className = 'document-path';
    path.textContent = link.dataset.path;
    item.append(result, path);
    searchResults.append(item);
  }

  searchStatus.textContent = matches.length
    ? `${matches.length} ${matches.length === 1 ? 'document' : 'documents'} found`
    : 'No documents found.';
}

function updateView() {
  let target;
  try {
    target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
  } catch {
    target = null;
  }

  const nextDocument = target?.closest('[data-document]');
  if (activeDocument && activeDocument !== nextDocument) activeDocument.hidden = true;
  activeDocument = nextDocument;
  overview.hidden = Boolean(activeDocument);
  if (activeDocument) activeDocument.hidden = false;
  if (target && sections.contains(target) && sections.hidden) {
    search.value = '';
    updateSearch();
  }
  if (target) {
    target.focus({ preventScroll: true });
    target.scrollIntoView();
  }
}

search.addEventListener('input', updateSearch);
window.addEventListener('hashchange', updateView);
updateSearch();
updateView();
