'use strict';
/*
 * js/atelier.js — L'Atelier : éditeur + projections du graphe canonique.
 *
 * Surface personnelle (privée) où le SITE est la source de vérité. Chaque
 * information est saisie une seule fois puis projetée : fiche, chronologie,
 * liste de dirigeants, cohérence. Parle à /api/kg (même cœur Turso/node:sqlite).
 */

// ── Petit hyperscript sûr (textContent pour les données utilisateur) ─────────
function h(tag, attrs, ...kids) {
  const e = document.createElement(tag);
  if (attrs) for (const [k, v] of Object.entries(attrs)) {
    if (v == null || v === false) continue;
    if (k === 'class') e.className = v;
    else if (k === 'text') e.textContent = v;
    else if (k === 'html') e.innerHTML = v;
    else if (k.startsWith('on') && typeof v === 'function') e.addEventListener(k.slice(2), v);
    else if (k === 'value') e.value = v;
    else e.setAttribute(k, v);
  }
  for (const kid of kids.flat()) {
    if (kid == null || kid === false) continue;
    e.append(kid.nodeType ? kid : document.createTextNode(String(kid)));
  }
  return e;
}
const $ = (s, r = document) => r.querySelector(s);

// ── Client API ───────────────────────────────────────────────────────────────
const KG = {
  pw: sessionStorage.getItem('kgpw') || '',
  async get(action, params = {}) {
    const clean = {}; for (const [k, v] of Object.entries(params)) if (v !== '' && v != null) clean[k] = v;
    const qs = new URLSearchParams(Object.assign({ action }, clean)).toString();
    const r = await fetch('/api/kg?' + qs, { headers: { 'X-Editor-Password': this.pw } });
    if (r.status === 403) { const e = new Error('auth'); e.auth = true; throw e; }
    const j = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(j.error || ('Erreur ' + r.status));
    return j;
  },
  async post(action, data) {
    const r = await fetch('/api/kg', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: this.pw, action, data }),
    });
    if (r.status === 403) { const e = new Error('auth'); e.auth = true; throw e; }
    const j = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(j.error || ('Erreur ' + r.status));
    return j;
  },
};

// ── État ─────────────────────────────────────────────────────────────────────
const S = { catalog: null, filterType: '', search: '', selectedId: null, tab: 'fiche', entities: [] };

// ── Toast ─────────────────────────────────────────────────────────────────────
let toastT;
function toast(msg, isErr) {
  const t = $('#toast'); t.textContent = msg; t.className = 'toast on' + (isErr ? ' err' : '');
  clearTimeout(toastT); toastT = setTimeout(() => (t.className = 'toast'), 2600);
}
async function guard(fn) { try { return await fn(); } catch (e) { if (e.auth) return askPassword(); toast(e.message, true); throw e; } }

// ── Verrou ─────────────────────────────────────────────────────────────────────
function askPassword() {
  openModal(h('div', {},
    h('h2', { text: 'Atelier verrouillé' }),
    h('p', { class: 'muted', text: 'Le graphe est privé. Entre le mot de passe d’édition.' }),
    h('input', { id: 'pwField', type: 'password', placeholder: 'Mot de passe', onkeydown: (e) => { if (e.key === 'Enter') submitPw(); } }),
    h('div', { class: 'actions' }, h('button', { class: 'primary', onclick: submitPw, text: 'Déverrouiller' })),
  ));
  setTimeout(() => $('#pwField') && $('#pwField').focus(), 30);
}
async function submitPw() {
  KG.pw = $('#pwField').value;
  try { await KG.get('stats'); sessionStorage.setItem('kgpw', KG.pw); closeModal(); boot(); }
  catch { toast('Mot de passe incorrect', true); }
}

// ── Modal ─────────────────────────────────────────────────────────────────────
function openModal(node) { const m = $('#modal'); m.innerHTML = ''; m.append(node); $('#overlay').classList.add('on'); }
function closeModal() { $('#overlay').classList.remove('on'); }
$('#overlay').addEventListener('click', (e) => { if (e.target.id === 'overlay') closeModal(); });

// ── Sélecteurs ─────────────────────────────────────────────────────────────────
function selectFrom(list, value, id) {
  return h('select', { id },
    ...list.map(v => { const o = h('option', { value: v, text: v }); if (v === value) o.selected = true; return o; }));
}

// ── Entity picker (référence par id, recherche par nom/alias) ──────────────────
function makePicker(initialId, initialLabel, placeholder) {
  let value = initialId || '';
  const input = h('input', { type: 'text', placeholder: placeholder || 'Rechercher une entité…', autocomplete: 'off' });
  const results = h('div', { class: 'results' });
  const chosen = h('div', { class: 'chosen', text: initialLabel ? `→ ${initialLabel}` : '' });
  const wrap = h('div', { class: 'picker' }, input, results, chosen);
  let t;
  input.addEventListener('input', () => {
    clearTimeout(t);
    const term = input.value.trim();
    if (!term) { results.classList.remove('on'); value = ''; chosen.textContent = ''; return; }
    t = setTimeout(async () => {
      try {
        const { entities } = await KG.get('list', { search: term });
        results.innerHTML = '';
        entities.slice(0, 30).forEach(e => {
          results.append(h('div', { class: 'r', onclick: () => { value = e.id; chosen.textContent = `→ ${e.name}`; input.value = e.name; results.classList.remove('on'); } },
            h('span', { text: e.name }), h('span', { class: 'ty faint', text: e.type })));
        });
        results.classList.add('on');
      } catch { /* silencieux */ }
    }, 180);
  });
  document.addEventListener('click', (e) => { if (!wrap.contains(e.target)) results.classList.remove('on'); });
  return { element: wrap, get: () => value || null, clear: () => { value = ''; input.value = ''; chosen.textContent = ''; } };
}

// ═══════════════════════════════════════════════════════════════════════════════
// SIDEBAR
// ═══════════════════════════════════════════════════════════════════════════════
function renderTypeFilter() {
  const box = $('#typeFilter'); box.innerHTML = '';
  const mk = (val, lbl) => h('span', { class: 'chip' + (S.filterType === val ? ' active' : ''), text: lbl, onclick: () => { S.filterType = val; renderTypeFilter(); loadEntities(); } });
  box.append(mk('', 'tous'));
  S.catalog.entityTypes.forEach(t => box.append(mk(t, t)));
}
async function loadEntities() {
  const { entities } = await guard(() => KG.get('list', { type: S.filterType, search: S.search }));
  S.entities = entities || [];
  const list = $('#entityList'); list.innerHTML = '';
  if (!S.entities.length) { list.append(h('div', { class: 'empty', text: 'Aucune entité.' })); return; }
  S.entities.forEach(e => {
    list.append(h('div', { class: 'ent' + (e.id === S.selectedId ? ' sel' : ''), onclick: () => selectEntity(e.id) },
      h('div', {}, h('div', { class: 'nm', text: e.name }), h('span', { class: 'ty', text: e.id + ' · ' + e.type })),
      e.status && e.status !== 'canon' ? h('span', { class: 'badge st-' + e.status, text: e.status }) : null));
  });
}
async function refreshStats() {
  const { stats } = await guard(() => KG.get('stats'));
  const s = $('#stats'); s.innerHTML = '';
  s.append(h('span', { class: 'badge', text: stats.entities + ' entités' }));
  s.append(h('span', { class: 'badge', text: stats.facts + ' faits' }));
  s.append(h('span', { class: 'badge', text: stats.relations + ' relations' }));
  s.append(h('span', { class: 'badge', text: stats.aliases + ' noms' }));
}

// ═══════════════════════════════════════════════════════════════════════════════
// TABS
// ═══════════════════════════════════════════════════════════════════════════════
document.querySelectorAll('#tabs .tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('#tabs .tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active'); S.tab = tab.dataset.tab; renderView();
  });
});
function renderView() {
  if (S.tab === 'fiche') renderFiche();
  else if (S.tab === 'chronologie') renderChronologie();
  else if (S.tab === 'dirigeants') renderDirigeants();
  else if (S.tab === 'coherence') renderCoherence();
}
function selectEntity(id) {
  S.selectedId = id; S.tab = 'fiche';
  document.querySelectorAll('#tabs .tab').forEach(t => t.classList.toggle('active', t.dataset.tab === 'fiche'));
  loadEntities(); renderFiche();
}

// ═══════════════════════════════════════════════════════════════════════════════
// FICHE (dossier)
// ═══════════════════════════════════════════════════════════════════════════════
async function renderFiche() {
  const view = $('#view');
  if (!S.selectedId) { view.innerHTML = ''; view.append(h('div', { class: 'empty', text: 'Sélectionne une entité à gauche, ou crée-en une.' })); return; }
  const { dossier } = await guard(() => KG.get('dossier', { id: S.selectedId }));
  if (!dossier) { view.innerHTML = ''; view.append(h('div', { class: 'empty', text: 'Entité introuvable.' })); return; }
  const e = dossier.entity;
  view.innerHTML = '';

  // En-tête
  view.append(h('div', { class: 'fiche-head' },
    h('div', { class: 'grow' },
      h('h2', { text: e.name }),
      h('div', { class: 'sub' }, h('span', { class: 'badge', text: e.type }), ' ',
        e.data && e.data.echelle ? h('span', { class: 'badge', text: e.data.echelle }) : null, ' ',
        e.data && e.data.rang ? h('span', { class: 'badge', text: e.data.rang }) : null, ' ',
        h('span', { class: 'badge st-' + e.status, text: e.status }), ' ',
        h('span', { class: 'faint', text: '· ' + e.id }))),
    h('div', { class: 'row' },
      h('button', { onclick: () => entityForm(e), text: '✎ Éditer' }),
      h('button', { class: 'danger', onclick: () => deleteEntity(e), text: '🗑' }))));

  if (e.summary) view.append(h('p', { class: 'muted', text: e.summary }));
  if (e.body) view.append(h('div', { class: 'card', style: 'white-space:pre-wrap; margin-bottom:22px', text: e.body }));

  // Noms / alias
  view.append(section('Noms datés', () => aliasForm(e.id),
    dossier.aliases.length
      ? dossier.aliases.map(a => item(
          yearsLabel(a.from_year, a.to_year),
          [h('strong', { text: a.value }), ' ', h('span', { class: 'badge', text: a.alias_status }),
           a.meaning ? h('span', { class: 'faint', text: ' — ' + a.meaning } ) : null],
          () => del('delete-alias', a.id)))
      : [emptyRow('Aucun nom historique.')]));

  // Faits
  view.append(section('Faits datés', () => factForm(e.id),
    dossier.facts.length
      ? dossier.facts.map(f => item(
          f.dateLabel,
          [h('strong', { text: f.fact_type }), ' ',
           f.role === 'objet' ? h('span', { class: 'faint', text: `(${f.subjectName} →) ` }) : null,
           f.label ? h('span', { text: f.label + ' ' }) : null,
           f.objectName ? h('span', { class: 'muted', text: '@ ' + f.objectName + ' ' }) : null,
           f.status !== 'canon' ? h('span', { class: 'badge st-' + f.status, text: f.status }) : null,
           f.sourceName ? h('span', { class: 'faint', text: ' · ' + f.sourceName }) : null],
          () => del('delete-fact', f.id),
          () => factForm(e.id, f)))
      : [emptyRow('Aucun fait.')]));

  // Relations
  view.append(section('Relations', () => relationForm(e.id),
    dossier.relations.length
      ? dossier.relations.map(r => item(
          h('span', { class: 'badge', text: r.direction === 'entrante' ? '←' : '→' }),
          [h('span', { text: r.label + ' ' }), h('a', { onclick: () => selectEntity(r.otherId), text: r.otherName }),
           (r.start_year != null || r.end_year != null) ? h('span', { class: 'faint', text: ' ' + yearsLabel(r.start_year, r.end_year) }) : null],
          r.direction === 'sortante' ? () => del('delete-relation', r.id) : null))
      : [emptyRow('Aucune relation.')]));

  // Lectures (mystère)
  if (e.type === 'question') {
    view.append(section('Lectures concurrentes' + (e.data && e.data.protege ? ' · 🔒 protégé' : ''), () => readingForm(e.id),
      dossier.readings.length
        ? dossier.readings.map(rd => item(
            '№ ' + (rd.ordinal || '—'),
            [h('span', { text: rd.text }), ' ', h('span', { class: 'badge', text: rd.reading_status }),
             rd.sourceName ? h('span', { class: 'faint', text: ' · ' + rd.sourceName }) : null],
            () => del('delete-reading', rd.id)))
        : [emptyRow('Aucune lecture — un mystère protégé doit en garder au moins deux.')]));
  }
}

function section(title, onAdd, rows) {
  return h('div', { class: 'section' },
    h('h3', {}, h('span', { text: title }), onAdd ? h('button', { class: 'ghost', onclick: onAdd, text: '＋ ajouter' }) : null),
    ...rows);
}
function item(when, whatKids, onDel, onEdit) {
  return h('div', { class: 'item' },
    h('div', { class: 'when' }, when),
    h('div', { class: 'what' }, ...(Array.isArray(whatKids) ? whatKids : [whatKids])),
    onEdit ? h('span', { class: 'x', onclick: onEdit, text: '✎' }) : null,
    onDel ? h('span', { class: 'x', onclick: onDel, text: '✕' }) : null);
}
function emptyRow(txt) { return h('div', { class: 'item' }, h('div', { class: 'faint', text: txt })); }
function yearsLabel(a, b) {
  const f = (y) => y == null ? '?' : (y < 0 ? Math.abs(y) + ' av.A' : y + ' ap.A');
  if (a == null && b == null) return '—';
  return f(a) + ' → ' + f(b);
}
async function del(action, id) {
  if (!confirm('Supprimer cet élément ?')) return;
  await guard(() => KG.post(action, { id }));
  toast('Supprimé'); renderFiche(); refreshStats();
}
async function deleteEntity(e) {
  if (!confirm(`Supprimer l’entité « ${e.name} » ?`)) return;
  try { await KG.post('delete-entity', { id: e.id }); toast('Entité supprimée'); S.selectedId = null; loadEntities(); refreshStats(); renderFiche(); }
  catch (err) { toast(err.message, true); }
}

// ═══════════════════════════════════════════════════════════════════════════════
// FORMULAIRES
// ═══════════════════════════════════════════════════════════════════════════════
function field(label, control, hint) {
  return h('div', {}, h('label', { text: label }), control, hint ? h('div', { class: 'hint', text: hint }) : null);
}

function entityForm(existing) {
  const c = S.catalog;
  const typeSel = selectFrom(c.entityTypes, existing ? existing.type : 'personne');
  const name = h('input', { value: existing ? existing.name : '', placeholder: 'Nom courant' });
  const summary = h('textarea', { placeholder: 'Résumé court' }); if (existing && existing.summary) summary.value = existing.summary;
  const body = h('textarea', { placeholder: 'Corps (notes longues)', style: 'min-height:120px' }); if (existing && existing.body) body.value = existing.body;
  const status = selectFrom(c.statuses, existing ? existing.status : 'canon');
  const disclosure = selectFrom(c.disclosures, existing ? existing.disclosure : 'interne');
  const dataJson = h('textarea', { placeholder: '{ }  — échelle, rang, protege, continent…', style: 'min-height:52px' });
  dataJson.value = existing && existing.data ? JSON.stringify(existing.data) : '';

  openModal(h('div', {},
    h('h2', { text: existing ? 'Éditer l’entité' : 'Nouvelle entité' }),
    h('div', { class: 'grid2' }, field('Type', typeSel), field('Statut', status)),
    field('Nom', name),
    field('Résumé', summary),
    field('Corps', body),
    h('div', { class: 'grid2' }, field('Divulgation', disclosure), field('Données (JSON)', dataJson, 'ex : {"echelle":"nation"} · {"protege":true}')),
    h('div', { class: 'actions' },
      h('button', { class: 'ghost', onclick: closeModal, text: 'Annuler' }),
      h('button', { class: 'primary', text: 'Enregistrer', onclick: async () => {
        let data = null;
        if (dataJson.value.trim()) { try { data = JSON.parse(dataJson.value); } catch { return toast('JSON de données invalide', true); } }
        const payload = { type: typeSel.value, name: name.value, summary: summary.value, body: body.value, status: status.value, disclosure: disclosure.value, data };
        if (existing) payload.id = existing.id;
        try {
          const { entity } = await KG.post('save-entity', payload);
          closeModal(); toast('Enregistré'); S.selectedId = entity.id; loadEntities(); refreshStats(); renderFiche();
        } catch (e) { toast(e.message, true); }
      } }))));
}

function factForm(subjectDefault, existing) {
  const c = S.catalog;
  const factType = selectFrom(c.factTypes, existing ? existing.fact_type : 'evenement');
  const subject = makePicker(existing ? existing.subject_id : subjectDefault, null, 'Sujet');
  const object = makePicker(existing ? existing.object_id : null, existing && existing.objectName, 'Objet (facultatif)');
  const source = makePicker(existing ? existing.source_id : null, existing && existing.sourceName, 'Source (provenance)');
  const sy = h('input', { type: 'number', placeholder: 'année (– = av.A)', value: existing && existing.start_year != null ? existing.start_year : '' });
  const sp = selectFrom(c.precisions, existing ? existing.start_precision : 'annee');
  const sc = h('input', { type: 'checkbox' }); if (existing && existing.start_circa) sc.checked = true;
  const ey = h('input', { type: 'number', placeholder: 'fin (facultatif)', value: existing && existing.end_year != null ? existing.end_year : '' });
  const ep = selectFrom(c.precisions, existing ? (existing.end_precision || 'annee') : 'annee');
  const seq = h('input', { type: 'number', placeholder: '0', value: existing ? (existing.seq || 0) : 0 });
  const era = h('input', { placeholder: 'era_id (ex : era6_nations)', value: existing && existing.era_id ? existing.era_id : '' });
  const label = h('input', { placeholder: 'intitulé', value: existing && existing.label ? existing.label : '' });
  const detail = h('textarea', { placeholder: 'détail' }); if (existing && existing.detail) detail.value = existing.detail;
  const status = selectFrom(c.statuses, existing ? existing.status : 'canon');

  openModal(h('div', {},
    h('h2', { text: existing ? 'Éditer le fait' : 'Nouveau fait daté' }),
    h('div', { class: 'grid2' }, field('Type de fait', factType), field('Statut', status)),
    field('Sujet', subject.element),
    field('Objet', object.element, 'ex : le règne d’un roi @ un empire'),
    h('div', { class: 'grid2' },
      field('Année de début', sy),
      field('Précision', sp)),
    h('div', { class: 'grid2' },
      field('Approximatif (~)', sc),
      field('Année de fin', ey)),
    h('div', { class: 'grid2' }, field('Précision fin', ep), field('Ordre (seq)', seq)),
    field('Intitulé', label),
    field('Ère', era),
    field('Source', source.element),
    field('Détail', detail),
    h('div', { class: 'actions' },
      h('button', { class: 'ghost', onclick: closeModal, text: 'Annuler' }),
      h('button', { class: 'primary', text: 'Enregistrer', onclick: async () => {
        const payload = {
          fact_type: factType.value, subject_id: subject.get(), object_id: object.get(),
          start_year: sy.value === '' ? null : Number(sy.value), start_precision: sp.value, start_circa: sc.checked ? 1 : 0,
          end_year: ey.value === '' ? null : Number(ey.value), end_precision: ep.value,
          seq: Number(seq.value) || 0, era_id: era.value || null, label: label.value || null,
          detail: detail.value || null, source_id: source.get(), status: status.value,
        };
        if (existing) payload.id = existing.id;
        try { const r = await KG.post('save-fact', payload); closeModal(); toast(r.fact && r.fact._warning ? r.fact._warning : 'Fait enregistré'); renderFiche(); refreshStats(); }
        catch (e) { toast(e.message, true); }
      } }))));
}

function relationForm(fromDefault) {
  const c = S.catalog;
  const relType = selectFrom(c.relTypes, 'lie-a');
  const from = makePicker(fromDefault, null, 'De…');
  const to = makePicker(null, null, 'Vers…');
  const source = makePicker(null, null, 'Source (facultatif)');
  const sy = h('input', { type: 'number', placeholder: 'depuis (année)' });
  const ey = h('input', { type: 'number', placeholder: 'jusqu’à (année)' });
  const label = h('input', { placeholder: 'précision (facultatif)' });
  const status = selectFrom(c.statuses, 'canon');
  openModal(h('div', {},
    h('h2', { text: 'Nouvelle relation' }),
    field('Type', relType),
    field('De', from.element),
    field('Vers', to.element),
    h('div', { class: 'grid2' }, field('Depuis', sy), field('Jusqu’à', ey)),
    field('Intitulé', label),
    h('div', { class: 'grid2' }, field('Statut', status), field('Source', source.element)),
    h('div', { class: 'actions' },
      h('button', { class: 'ghost', onclick: closeModal, text: 'Annuler' }),
      h('button', { class: 'primary', text: 'Enregistrer', onclick: async () => {
        try {
          await KG.post('save-relation', { rel_type: relType.value, from_id: from.get(), to_id: to.get(),
            start_year: sy.value === '' ? null : Number(sy.value), end_year: ey.value === '' ? null : Number(ey.value),
            label: label.value || null, source_id: source.get(), status: status.value });
          closeModal(); toast('Relation enregistrée'); renderFiche(); refreshStats();
        } catch (e) { toast(e.message, true); }
      } }))));
}

function aliasForm(entityId) {
  const c = S.catalog;
  const value = h('input', { placeholder: 'nom' });
  const st = selectFrom(c.aliasStatuses, 'predecessor');
  const fy = h('input', { type: 'number', placeholder: 'depuis (année)' });
  const ty = h('input', { type: 'number', placeholder: 'jusqu’à (année)' });
  const meaning = h('input', { placeholder: 'sens / note' });
  const era = h('input', { placeholder: 'era_id (facultatif)' });
  openModal(h('div', {},
    h('h2', { text: 'Nouveau nom daté' }),
    field('Nom', value),
    h('div', { class: 'grid2' }, field('Statut', st), field('Ère', era)),
    h('div', { class: 'grid2' }, field('Depuis', fy), field('Jusqu’à', ty)),
    field('Sens', meaning),
    h('div', { class: 'actions' },
      h('button', { class: 'ghost', onclick: closeModal, text: 'Annuler' }),
      h('button', { class: 'primary', text: 'Enregistrer', onclick: async () => {
        try {
          await KG.post('save-alias', { entity_id: entityId, value: value.value, alias_status: st.value,
            from_year: fy.value === '' ? null : Number(fy.value), to_year: ty.value === '' ? null : Number(ty.value),
            meaning: meaning.value || null, era_id: era.value || null });
          closeModal(); toast('Nom enregistré'); renderFiche(); refreshStats();
        } catch (e) { toast(e.message, true); }
      } }))));
}

function readingForm(questionId) {
  const text = h('textarea', { placeholder: 'Une lecture possible du mystère' });
  const source = makePicker(null, null, 'Source (facultatif)');
  const ordinal = h('input', { type: 'number', placeholder: '1' });
  openModal(h('div', {},
    h('h2', { text: 'Nouvelle lecture' }),
    field('Texte', text),
    h('div', { class: 'grid2' }, field('Ordre', ordinal), field('Source', source.element)),
    h('div', { class: 'actions' },
      h('button', { class: 'ghost', onclick: closeModal, text: 'Annuler' }),
      h('button', { class: 'primary', text: 'Enregistrer', onclick: async () => {
        try {
          await KG.post('save-reading', { question_id: questionId, text: text.value, source_id: source.get(), ordinal: Number(ordinal.value) || 0 });
          closeModal(); toast('Lecture enregistrée'); renderFiche();
        } catch (e) { toast(e.message, true); }
      } }))));
}

// ═══════════════════════════════════════════════════════════════════════════════
// CHRONOLOGIE
// ═══════════════════════════════════════════════════════════════════════════════
async function renderChronologie() {
  const view = $('#view'); view.innerHTML = '';
  const c = S.catalog;
  const ftype = selectFrom([''].concat(c.factTypes), '');
  const from = h('input', { type: 'number', placeholder: 'de (année)', style: 'width:120px' });
  const to = h('input', { type: 'number', placeholder: 'à (année)', style: 'width:120px' });
  const out = h('div', {});
  const run = async () => {
    const { facts } = await guard(() => KG.get('chronologie', { fact_type: ftype.value, from_year: from.value, to_year: to.value }));
    out.innerHTML = '';
    if (!facts.length) { out.append(h('div', { class: 'empty', text: 'Aucun fait.' })); return; }
    out.append(h('p', { class: 'faint', text: facts.length + ' faits, triés par date puis ordre.' }));
    facts.forEach(f => out.append(item(f.dateLabel,
      [h('strong', { text: f.fact_type }), ' ', h('a', { onclick: () => selectEntity(f.subject_id), text: f.subjectName }),
       f.objectName ? h('span', { class: 'muted', text: ' @ ' + f.objectName }) : null,
       f.status !== 'canon' ? h('span', { class: 'badge st-' + f.status, text: ' ' + f.status }) : null,
       f.sourceName ? h('span', { class: 'faint', text: ' · ' + f.sourceName }) : null])));
  };
  view.append(h('div', { class: 'section' },
    h('h3', {}, h('span', { text: 'Chronologie' })),
    h('div', { class: 'row', style: 'margin-bottom:14px; flex-wrap:wrap' },
      ftype, from, to, h('button', { onclick: run, text: 'Filtrer' })),
    out));
  run();
}

// ═══════════════════════════════════════════════════════════════════════════════
// DIRIGEANTS
// ═══════════════════════════════════════════════════════════════════════════════
async function renderDirigeants() {
  const view = $('#view'); view.innerHTML = '';
  const picker = makePicker(null, null, 'Choisir une entité politique…');
  const out = h('div', {});
  const run = async () => {
    const id = picker.get(); if (!id) return toast('Choisis une entité politique', true);
    const { dirigeants } = await guard(() => KG.get('dirigeants', { id }));
    out.innerHTML = '';
    out.append(h('h2', { text: dirigeants.polityName || id, style: 'margin:6px 0' }));
    if (!dirigeants.regnes.length) { out.append(h('div', { class: 'empty', text: 'Aucun règne enregistré. Ajoute des faits « regne » avec cette entité comme objet.' })); return; }
    dirigeants.regnes.forEach((r, i) => out.append(item(r.dateLabel,
      [h('span', { class: 'faint', text: (i + 1) + '. ' }), h('a', { onclick: () => selectEntity(r.rulerId), text: r.rulerName })])));
    if (dirigeants.anomalies.length) {
      out.append(h('h3', { text: 'Anomalies de succession', style: 'color:var(--warn); margin-top:18px' }));
      dirigeants.anomalies.forEach(a => out.append(h('div', { class: 'issue avert' }, h('div', { class: 'k', text: a.type }), h('div', { text: a.detail }))));
    }
  };
  view.append(h('div', { class: 'section' },
    h('h3', {}, h('span', { text: 'Liste de dirigeants (calculée depuis les faits « regne »)' })),
    h('div', { class: 'row', style: 'margin-bottom:14px' }, h('div', { class: 'grow' }, picker.element), h('button', { onclick: run, text: 'Afficher' })),
    out));
}

// ═══════════════════════════════════════════════════════════════════════════════
// COHÉRENCE
// ═══════════════════════════════════════════════════════════════════════════════
async function renderCoherence() {
  const view = $('#view'); view.innerHTML = '';
  view.append(h('div', { class: 'empty', text: 'Analyse en cours…' }));
  const { report } = await guard(() => KG.get('coherence'));
  view.innerHTML = '';
  const c = report.counts;
  view.append(h('div', { class: 'section' },
    h('h3', {}, h('span', { text: 'Rapport de cohérence' })),
    h('div', { class: 'row', style: 'gap:14px; margin-bottom:16px' },
      h('span', { class: 'badge', style: 'color:var(--err)', text: c.erreur + ' erreurs' }),
      h('span', { class: 'badge', style: 'color:var(--warn)', text: c.avert + ' avertissements' }),
      h('span', { class: 'badge', style: 'color:var(--accent)', text: c.info + ' infos' }))));
  if (!report.issues.length) { view.append(h('div', { class: 'empty', text: '✓ Aucune contradiction détectée. Le graphe est cohérent.' })); return; }
  const order = { erreur: 0, avert: 1, info: 2 };
  report.issues.sort((a, b) => order[a.severity] - order[b.severity]);
  report.issues.forEach(i => view.append(h('div', { class: 'issue ' + i.severity },
    h('div', { class: 'k', text: i.severity + ' · ' + i.kind }),
    h('div', {}, h('span', { text: i.message + ' ' }), i.refId ? h('a', { onclick: () => selectEntity(i.refId), text: '↗' }) : null))));
}

// ═══════════════════════════════════════════════════════════════════════════════
// BOOT
// ═══════════════════════════════════════════════════════════════════════════════
$('#search').addEventListener('input', (e) => { S.search = e.target.value.trim(); clearTimeout(S._st); S._st = setTimeout(loadEntities, 200); });
$('#btnNew').addEventListener('click', () => entityForm(null));
$('#btnCoherence').addEventListener('click', () => { S.tab = 'coherence'; document.querySelectorAll('#tabs .tab').forEach(t => t.classList.toggle('active', t.dataset.tab === 'coherence')); renderView(); });
$('#btnLogout').addEventListener('click', () => { sessionStorage.removeItem('kgpw'); KG.pw = ''; location.reload(); });

async function boot() {
  S.catalog = (await guard(() => KG.get('catalog')));
  renderTypeFilter();
  await Promise.all([loadEntities(), refreshStats()]);
  renderView();
}

(async function init() {
  if (!KG.pw) return askPassword();
  try { await KG.get('stats'); boot(); }
  catch { askPassword(); }
})();
