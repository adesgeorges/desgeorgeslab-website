const search = document.querySelector('#publication-search');
const type = document.querySelector('#publication-type');
const papers = [...document.querySelectorAll('.publication')];
const groups = [...document.querySelectorAll('.publication-group')];
const count = document.querySelector('#publication-count');
const normalize = text => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
const searchText = new Map(papers.map(paper => [paper, normalize(paper.textContent)]));
function filterPublications() {
  const terms = normalize(search.value.trim()).split(/\s+/).filter(Boolean);
  let journals = 0, preprints = 0;
  papers.forEach(paper => {
    const visible = (type.value === 'all' || paper.dataset.kind === type.value) && terms.every(term => searchText.get(paper).includes(term));
    paper.hidden = !visible;
    if (visible) paper.dataset.kind === 'preprint' ? preprints++ : journals++;
  });
  groups.forEach(group => { group.hidden = ![...group.querySelectorAll('.publication')].some(paper => !paper.hidden); });
  document.querySelector('.journal-section').hidden = journals === 0;
  document.querySelector('#publication-empty').hidden = journals + preprints > 0;
  document.querySelectorAll('.publication-years a').forEach(link => { link.hidden = document.querySelector(link.getAttribute('href')).hidden; });
  count.textContent = `${journals} journal ${journals === 1 ? 'publication' : 'publications'} · ${preprints} ${preprints === 1 ? 'preprint' : 'preprints'}`;
}
search.addEventListener('input', filterPublications);
type.addEventListener('change', filterPublications);
