'use strict';
/*
 * js/monde.js — Le Monde : portail d'exploration d'Hybelior.
 *
 * Pas une banque de données : une porte d'entrée. Voûte céleste animée,
 * grande recherche, portes thématiques, fiches immersives (prose complète,
 * constellation de liens interactive, frise des faits), chronologie des Ères,
 * porte au hasard. Vanilla JS, hash-routing, lit /api/kg (lecture seule).
 */

/* ── Petits utilitaires DOM ────────────────────────────────────────────── */
const $ = (s, r) => (r || document).querySelector(s);
function h(tag, attrs, ...kids) {
  const e = document.createElement(tag);
  if (attrs) for (const [k, v] of Object.entries(attrs)) {
    if (v == null) continue;
    if (k === 'text') e.textContent = v;
    else if (k === 'html') e.innerHTML = v;
    else if (k.startsWith('on')) e.addEventListener(k.slice(2), v);
    else e.setAttribute(k, v);
  }
  for (const k of kids.flat()) if (k != null) e.append(k);
  return e;
}
const debounce = (fn, ms) => { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; };

/* ── API + caches ──────────────────────────────────────────────────────── */
const API = '/api/kg';
async function kget(params) {
  const u = new URL(API, location.origin);
  for (const [k, v] of Object.entries(params)) if (v != null && v !== '') u.searchParams.set(k, v);
  const r = await fetch(u);
  if (!r.ok) throw new Error('API ' + r.status);
  return r.json();
}
const CACHE = { stats: null, lists: {}, eres: null, chrono: null };
async function getStats() { if (!CACHE.stats) CACHE.stats = (await kget({ action: 'stats' })).stats; return CACHE.stats; }
async function getList(type) {
  if (!CACHE.lists[type]) CACHE.lists[type] = (await kget({ action: 'list', type })).entities;
  return CACHE.lists[type];
}

/* ── Les Portes du monde ───────────────────────────────────────────────── */
const PORTES = [
  { cle: 'continents', glyphe: '🜨', titre: 'Les Continents', ligne: 'Treize terres émergées, chacune façonnée par une voix.', types: ['lieu'], filtre: (e) => e.data && e.data.echelle === 'continent' },
  { cle: 'nations', glyphe: '♛', titre: 'Nations & pouvoirs', ligne: 'Royaumes, théocraties, empires morts et cités libres.', types: ['entite-politique'] },
  { cle: 'carte', glyphe: '🧭', titre: 'La Carte', ligne: 'La toile du monde — chaque point est une porte.', route: '#/carte', compte: async () => (await getList('lieu')).filter((e) => e.data && e.data.coord_x != null).length },
  { cle: 'atlas', glyphe: '✦', titre: "L'Atlas", ligne: 'Cités, bourgs, ruines — chaque point de la carte a un nom.', types: ['lieu'], filtre: (e) => !e.data || e.data.echelle !== 'continent' },
  { cle: 'personnages', glyphe: '⚔', titre: 'Personnages', ligne: 'Rois, oracles, exilés — les vies qui ont marqué la trame.', types: ['personne'] },
  { cle: 'lignees', glyphe: '🜃', titre: 'Lignées & maisons', ligne: 'Le sang qui passe, les noms qui restent.', types: ['lignee'] },
  { cle: 'polyphonie', glyphe: '☀', titre: 'La Polyphonie', ligne: 'Éternels, Cosmiques, Astraux — les voix du monde.', types: ['divinite'] },
  { cle: 'religions', glyphe: '⛧', titre: 'Religions & cultes', ligne: 'Neuf grandes voies, des schismes, des ferveurs locales.', types: ['religion'] },
  { cle: 'eres', glyphe: '⏳', titre: 'Les Ères', ligne: 'De la Résonance au Sillage : dix âges du monde.', route: '#/eres' },
  { cle: 'mysteres', glyphe: '🜁', titre: 'Mystères', ligne: 'Ce que le monde ne dit pas — et ne dira peut-être jamais.', types: ['question'] },
  { cle: 'oeuvres', glyphe: '📜', titre: 'Œuvres & récits', ligne: 'Les Trois Coups, les Chroniques de l’Exilé, et leurs strates.', types: ['oeuvre'] },
  { cle: 'reliques', glyphe: '🜍', titre: 'Reliques & objets', ligne: 'Journaux murés, copies interdites, amulettes qui pulsent.', types: ['objet'] },
  { cle: 'peuples', glyphe: '🜄', titre: 'Peuples & espèces', ligne: 'Ceux qui marchent, chantent ou dorment sous la pierre.', types: ['espece'] },
  { cle: 'lexique', glyphe: '❖', titre: 'Le Lexique', ligne: 'Lié, Tisse, Souffle, Voie — les mots exacts du monde.', types: ['concept', 'terme'] },
  { cle: 'visions', glyphe: '🕸', titre: 'Visions croisées', ligne: 'Le monde dans tous les sens — réseaux, fresque du temps, croisements.', route: '#/visions', compte: async () => 5 },
];
const PORTE_PAR_CLE = Object.fromEntries(PORTES.map((p) => [p.cle, p]));
const TYPE_LABEL = {
  personne: 'personnage', divinite: 'divinité', lignee: 'lignée', lieu: 'lieu',
  'entite-politique': 'nation', evenement: 'événement', concept: 'concept', religion: 'religion',
  espece: 'peuple', objet: 'relique', terme: 'terme', question: 'mystère', oeuvre: 'œuvre',
  ere: 'ère', source: 'source',
};

/* ── Voûte céleste (fond animé) ────────────────────────────────────────── */
function demarrerCiel() {
  const cv = $('#ciel'), ctx = cv.getContext('2d');
  let W, H, etoiles = [];
  function tailler() {
    W = cv.width = innerWidth * devicePixelRatio; H = cv.height = innerHeight * devicePixelRatio;
    cv.style.width = innerWidth + 'px'; cv.style.height = innerHeight + 'px';
    const n = Math.min(170, Math.floor(innerWidth / 9));
    etoiles = Array.from({ length: n }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: (Math.random() * 1.4 + .35) * devicePixelRatio,
      a: Math.random() * Math.PI * 2, va: .002 + Math.random() * .006,
      vx: (Math.random() - .5) * .06 * devicePixelRatio, vy: (Math.random() - .5) * .04 * devicePixelRatio,
    }));
  }
  tailler(); addEventListener('resize', tailler);
  const reduit = matchMedia('(prefers-reduced-motion: reduce)').matches;
  (function boucle() {
    ctx.clearRect(0, 0, W, H);
    for (const s of etoiles) {
      s.a += s.va; s.x += s.vx; s.y += s.vy;
      if (s.x < 0) s.x = W; if (s.x > W) s.x = 0; if (s.y < 0) s.y = H; if (s.y > H) s.y = 0;
      const puls = .45 + Math.abs(Math.sin(s.a)) * .55;
      ctx.beginPath(); ctx.arc(s.x, s.y, s.r * puls, 0, 7);
      ctx.fillStyle = `rgba(224, 194, 116, ${.14 + puls * .22})`; ctx.fill();
    }
    if (!reduit) requestAnimationFrame(boucle);
  })();
}

/* ── Markdown (corps de fiche) ─────────────────────────────────────────── */
function rendreCorps(md) {
  let s = String(md == null ? '' : md)
    .replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, '$2')
    .replace(/\[\[([^\]]+)\]\]/g, '$1');
  if (typeof marked !== 'undefined') { try { return marked.parse(s, { breaks: true }); } catch { /* repli */ } }
  return '<pre style="white-space:pre-wrap">' + s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c])) + '</pre>';
}
function anStr(y, circa) { if (y == null) return ''; const abs = Math.abs(y).toLocaleString('fr-FR'); return (circa ? '~' : '') + (y < 0 ? abs + ' av.A' : abs + ' ap.A'); }

/* ── Routeur ───────────────────────────────────────────────────────────── */
const app = $('#app');
function aller(hash) { if (location.hash === hash) route(); else location.hash = hash; }
async function route() {
  const parts = (location.hash || '#/').slice(2).split('/').map(decodeURIComponent);
  app.innerHTML = ''; app.append(h('div', { class: 'charge', text: 'Le voile se lève…' }));
  scrollTo({ top: 0 });
  try {
    if (!parts[0]) await vueSeuil();
    else if (parts[0] === 'portes' && PORTE_PAR_CLE[parts[1]]) await vuePorte(PORTE_PAR_CLE[parts[1]]);
    else if (parts[0] === 'fiche' && parts[1]) await vueFiche(parts[1]);
    else if (parts[0] === 'carte') await vueCarte(parts[1] || null);
    else if (parts[0] === 'visions' && parts[1] === 'trame') await vueTrame(parts[2] || 'sang');
    else if (parts[0] === 'visions' && parts[1] === 'fresque') await vueFresque();
    else if (parts[0] === 'visions') await vueVisions();
    else if (parts[0] === 'eres') await vueEres();
    else if (parts[0] === 'recherche' && parts[1]) await vueRecherche(parts.slice(1).join('/'));
    else await vueSeuil();
  } catch (err) {
    app.innerHTML = '';
    app.append(h('div', { class: 'charge', text: 'Le voile résiste… (' + err.message + ')' }));
  }
}
addEventListener('hashchange', route);

/* ── Fil d'Ariane ──────────────────────────────────────────────────────── */
function fil(...etapes) {
  const f = h('div', { class: 'fil' }, h('a', { href: '#/', text: 'Le Monde' }));
  for (const [label, href] of etapes) {
    f.append(h('span', { class: 'sep', text: '◆' }));
    f.append(href ? h('a', { href, text: label }) : h('span', { text: label, style: 'color:var(--dim)' }));
  }
  return f;
}

/* ── Vue : le Seuil (accueil) ──────────────────────────────────────────── */
async function vueSeuil() {
  const stats = await getStats();
  const total = stats.entities.toLocaleString('fr-FR');
  app.innerHTML = '';
  const vue = h('div', { class: 'vue' });

  vue.append(h('div', { class: 'seuil' },
    h('h1', { class: 'titre-monde', text: 'Hybelior' }),
    h('div', { class: 'ornement', text: '◆ ◇ ◆' }),
    h('p', { class: 'devise', text: 'Treize continents. Dix mille ans. Une trame qui respire — et qui se souvient.' }),
    h('p', { class: 'compte', text: total + ' portes déjà ouvertes' })));

  // Grande quête (recherche)
  const boite = h('div', { class: 'quete' });
  const champ = h('input', { type: 'search', placeholder: 'Cherchez un nom, un lieu, un mot du monde…', autocomplete: 'off' });
  const resultats = h('div', { class: 'resultats' });
  boite.append(h('span', { class: 'loupe', html: '&#128269;' }), champ, resultats);
  const chercher = debounce(async () => {
    const q = champ.value.trim();
    if (q.length < 2) { resultats.classList.remove('on'); return; }
    const { results } = await kget({ action: 'search', q, limit: 8 });
    resultats.innerHTML = '';
    for (const r of results) resultats.append(h('div', { class: 'r', onclick: () => { resultats.classList.remove('on'); aller('#/fiche/' + r.id); } },
      h('span', { class: 'badge', text: TYPE_LABEL[r.type] || r.type }),
      h('span', { class: 'nom', text: r.name }),
      h('span', { class: 'apercu', text: r.summary || '' })));
    if (!results.length) resultats.append(h('div', { class: 'r' }, h('span', { class: 'apercu', text: 'Rien derrière cette porte — essayez un autre mot.' })));
    resultats.classList.add('on');
  }, 220);
  champ.addEventListener('input', chercher);
  champ.addEventListener('keydown', (ev) => { if (ev.key === 'Enter' && champ.value.trim().length >= 2) aller('#/recherche/' + encodeURIComponent(champ.value.trim())); });
  document.addEventListener('click', (ev) => { if (!boite.contains(ev.target)) resultats.classList.remove('on'); });
  vue.append(boite);

  // Porte au hasard
  vue.append(h('p', { class: 'centre', style: 'margin-top:26px' },
    h('button', { class: 'btn', onclick: porteAuHasard }, '⟡ Franchir une porte au hasard')));

  // Les portes
  vue.append(h('h2', { class: 'section', text: 'Les portes du monde' }));
  const grille = h('div', { class: 'portes' });
  for (const p of PORTES) {
    const carte = h('div', { class: 'porte', onclick: () => aller(p.route || '#/portes/' + p.cle) },
      h('div', { class: 'glyphe', text: p.glyphe }),
      h('h3', { text: p.titre }),
      h('p', { text: p.ligne }),
      h('span', { class: 'nombre', text: '' }));
    grille.append(carte);
    compterPorte(p, stats).then((n) => { if (n != null) carte.querySelector('.nombre').textContent = n.toLocaleString('fr-FR'); });
  }
  vue.append(grille);

  // Le saviez-vous
  const sv = h('div', { class: 'saviez', title: 'Une autre ? Cliquez.' }, h('span', { text: '…' }));
  sv.addEventListener('click', () => saviezVous(sv));
  vue.append(sv); saviezVous(sv);

  vue.append(h('div', { class: 'pied' },
    h('span', { text: stats.entities.toLocaleString('fr-FR') + ' entités · ' + stats.relations.toLocaleString('fr-FR') + ' liens · ' + stats.facts.toLocaleString('fr-FR') + ' faits — un seul monde. ' }),
    h('a', { href: '/atelier.html', text: '🛠 Atelier (édition)' }),
    h('span', { text: ' · ' }),
    h('a', { href: '/', text: '← le site' })));
  app.innerHTML = ''; app.append(vue);
}
async function compterPorte(p, stats) {
  if (p.compte) return p.compte();
  if (p.route) return stats.entitiesByType.ere || null;
  if (!p.filtre) return p.types.reduce((n, t) => n + (stats.entitiesByType[t] || 0), 0);
  const list = await getList(p.types[0]);
  return list.filter(p.filtre).length;
}
async function porteAuHasard() {
  const stats = await getStats();
  const types = Object.entries(stats.entitiesByType).filter(([t]) => !['source', 'ere'].includes(t));
  const total = types.reduce((n, [, c]) => n + c, 0);
  let tirage = Math.random() * total, type = types[0][0];
  for (const [t, c] of types) { tirage -= c; if (tirage <= 0) { type = t; break; } }
  const list = await getList(type);
  const e = list[Math.floor(Math.random() * list.length)];
  if (e) aller('#/fiche/' + e.id);
}
async function saviezVous(el) {
  const types = ['personne', 'lieu', 'evenement', 'objet', 'question', 'lignee'];
  const type = types[Math.floor(Math.random() * types.length)];
  const list = await getList(type);
  const avecResume = list.filter((e) => e.summary && e.summary.length > 60);
  const e = avecResume[Math.floor(Math.random() * avecResume.length)];
  if (!e) return;
  el.innerHTML = '';
  el.append(h('span', { text: '« ' + e.summary + ' »' }),
    h('span', { class: 'de', text: e.name + ' — ' + (TYPE_LABEL[e.type] || e.type) }));
  el.onclick = (ev) => { if (ev.target.closest('.de')) aller('#/fiche/' + e.id); else saviezVous(el); };
}

/* ── Vue : une Porte (collection) ──────────────────────────────────────── */
async function vuePorte(p) {
  let entites = [];
  for (const t of p.types) entites = entites.concat(await getList(t));
  if (p.filtre) entites = entites.filter(p.filtre);
  entites.sort((a, b) => a.name.localeCompare(b.name, 'fr'));

  app.innerHTML = '';
  const vue = h('div', { class: 'vue' });
  vue.append(fil([p.titre]));
  vue.append(h('div', { class: 'fiche-tete' },
    h('h1', { text: p.glyphe + '  ' + p.titre }),
    h('p', { class: 'devise', style: 'color:var(--dim);font-style:italic;margin:4px 0 0', text: p.ligne + ' — ' + entites.length.toLocaleString('fr-FR') + ' entrées.' })));

  // filtre local
  const ligne = h('div', { class: 'filtre-ligne' });
  const champ = h('input', { type: 'search', placeholder: 'Affiner… (nom ou résumé)' });
  ligne.append(champ);
  // chips d'échelle pour l'Atlas
  let echelle = '';
  if (p.cle === 'atlas') {
    for (const [val, lbl] of [['', 'tout'], ['region', 'régions'], ['cite', 'cités'], ['ville', 'villes'], ['bourg', 'bourgs'], ['ruine', 'ruines']]) {
      ligne.append(h('span', { class: 'chip', onclick: (ev) => { echelle = val; [...ligne.querySelectorAll('.chip')].forEach((c) => (c.style.borderColor = '')); ev.target.style.borderColor = 'var(--gold)'; peindre(); }, text: lbl }));
    }
  }
  vue.append(ligne);

  const grille = h('div', { class: 'grille' });
  const plus = h('p', { class: 'centre', style: 'margin-top:22px' });
  vue.append(grille, plus);
  let visibles = 60;
  function peindre() {
    const q = champ.value.trim().toLowerCase();
    let liste = entites;
    if (echelle) liste = liste.filter((e) => e.data && e.data.echelle === echelle);
    if (q) liste = liste.filter((e) => e.name.toLowerCase().includes(q) || (e.summary || '').toLowerCase().includes(q));
    grille.innerHTML = ''; plus.innerHTML = '';
    for (const e of liste.slice(0, visibles)) {
      grille.append(h('div', { class: 'carte-e', onclick: () => aller('#/fiche/' + e.id) },
        h('h4', { text: e.name }),
        e.data && e.data.echelle ? h('span', { class: 'badge', style: 'margin-bottom:8px', text: e.data.echelle }) : null,
        e.data && e.data.rang ? h('span', { class: 'badge', style: 'margin-bottom:8px', text: e.data.rang }) : null,
        h('p', { text: e.summary || '…' })));
    }
    if (liste.length > visibles) plus.append(h('button', { class: 'btn', onclick: () => { visibles += 90; peindre(); } }, `Dévoiler la suite (${(liste.length - visibles).toLocaleString('fr-FR')} restantes)`));
    if (!liste.length) grille.append(h('div', { class: 'charge', text: 'Rien ici sous ce nom.' }));
  }
  champ.addEventListener('input', debounce(() => { visibles = 60; peindre(); }, 160));
  peindre();
  app.innerHTML = ''; app.append(vue);
}

/* ── Vue : résultats de recherche ──────────────────────────────────────── */
async function vueRecherche(q) {
  const { results } = await kget({ action: 'search', q, limit: 60 });
  app.innerHTML = '';
  const vue = h('div', { class: 'vue' });
  vue.append(fil(['Recherche : « ' + q + ' »']));
  vue.append(h('h2', { class: 'section', text: results.length + ' échos' }));
  const grille = h('div', { class: 'grille' });
  for (const r of results) grille.append(h('div', { class: 'carte-e', onclick: () => aller('#/fiche/' + r.id) },
    h('span', { class: 'badge', style: 'margin-bottom:8px', text: TYPE_LABEL[r.type] || r.type }),
    h('h4', { text: r.name }), h('p', { text: r.summary || '…' })));
  vue.append(grille);
  app.innerHTML = ''; app.append(vue);
}

/* ── Vue : la Fiche (une entité) ───────────────────────────────────────── */
async function vueFiche(id) {
  const { dossier } = await kget({ action: 'dossier', id });
  if (!dossier) throw new Error('porte introuvable');
  const e = dossier.entity;
  app.innerHTML = '';
  const vue = h('div', { class: 'vue' });
  const porte = PORTES.find((p) => p.types && p.types.includes(e.type));
  vue.append(fil(...(porte ? [[porte.titre, '#/portes/' + porte.cle]] : []), [e.name]));

  // En-tête
  const badges = h('div', { class: 'badges' }, h('span', { class: 'badge', text: TYPE_LABEL[e.type] || e.type }));
  if (e.data && e.data.echelle) badges.append(h('span', { class: 'badge', text: e.data.echelle }));
  if (e.data && e.data.rang) badges.append(h('span', { class: 'badge', text: e.data.rang }));
  if (e.data && e.data.domaine) badges.append(h('span', { class: 'badge', text: e.data.domaine }));
  if (e.status && e.status !== 'canon') badges.append(h('span', { class: 'badge', text: e.status }));
  for (const a of dossier.aliases || []) badges.append(h('span', { class: 'badge', title: 'aussi appelé', text: '⟡ ' + a.value }));
  vue.append(h('div', { class: 'fiche-tete' }, h('h1', { text: e.name }), badges));
  if (e.summary) vue.append(h('p', { class: 'lede', text: e.summary }));

  // Colonnes : corps + latéral (constellation, frise)
  const cols = h('div', { class: 'colonnes' });
  const gauche = h('div');
  const droite = h('div');

  // Lieu positionné → porte vers la carte
  if (e.type === 'lieu' && e.data && e.data.coord_x != null) {
    vue.append(h('p', { style: 'margin:14px 0 0' },
      h('button', { class: 'btn', onclick: () => aller('#/carte/' + e.id) }, '🧭 Voir sur la carte')));
  }

  if (e.body) gauche.append(h('div', { class: 'panneau corps', html: rendreCorps(e.body) }));

  // Personne → arbre généalogique dessiné (si la famille est connue)
  if (e.type === 'personne') {
    try {
      const { arbre } = await kget({ action: 'arbre', id });
      const svg = arbre && dessinerArbre(arbre);
      if (svg) gauche.append(h('div', { class: 'panneau' },
        h('div', { class: 'etiquette groupe-rel', text: 'Le sang — arbre des générations' }), svg));
    } catch { /* pas d'arbre : silencieux */ }
  }

  // Lectures (mystères)
  if ((dossier.readings || []).length) {
    const pan = h('div', { class: 'panneau' }, h('div', { class: 'etiquette groupe-rel', text: 'Les lectures — aucune ne fait foi' }));
    for (const r of dossier.readings) pan.append(h('p', { style: 'color:var(--dim);font-style:italic;margin:10px 0', text: '« ' + r.text + ' »' }));
    gauche.append(pan);
  }

  // Constellation (canvas interactif des liens)
  const rels = dossier.relations || [];
  if (rels.length) {
    const bloc = h('div', { class: 'panneau constellation' });
    const cv = h('canvas');
    bloc.append(cv, h('div', { class: 'legende', text: rels.length + ' liens — survolez, cliquez pour voyager' }));
    droite.append(bloc);
    requestAnimationFrame(() => constellation(cv, e, rels));
  }

  // Frise des faits
  const faits = (dossier.facts || []).slice().sort((a, b) => (a.start_year ?? 1e15) - (b.start_year ?? 1e15));
  if (faits.length) {
    const ul = h('ul', { class: 'frise' });
    for (const f of faits.slice(0, 30)) {
      ul.append(h('li', {},
        h('span', { class: 'an', text: anStr(f.start_year, f.start_circa) || '· · ·' }),
        h('span', { class: 'puce' }),
        h('span', { class: 'quoi', html: '<b>' + f.fact_type + '</b> — ' + (f.label || f.dateLabel || '') })));
    }
    droite.append(h('div', { class: 'panneau' }, h('div', { class: 'etiquette groupe-rel', text: 'La trame des faits' }), ul));
  }

  // Liens groupés (chips)
  if (rels.length) {
    const parLabel = {};
    for (const r of rels) (parLabel[r.label] = parLabel[r.label] || []).push(r);
    const pan = h('div', { class: 'panneau' });
    for (const [label, groupe] of Object.entries(parLabel)) {
      const g = h('div', { class: 'groupe-rel' }, h('div', { class: 'etiquette', text: label + ' (' + groupe.length + ')' }));
      const chips = h('div', { class: 'chips' });
      for (const r of groupe.slice(0, 40)) chips.append(h('span', { class: 'chip', onclick: () => aller('#/fiche/' + r.otherId), text: r.otherName || '?' }));
      if (groupe.length > 40) chips.append(h('span', { class: 'chip', text: '+' + (groupe.length - 40) + '…' }));
      g.append(chips); pan.append(g);
    }
    gauche.append(pan);
  }

  cols.append(gauche, droite);
  vue.append(cols);

  // Continuer l'exploration
  if (rels.length) {
    const sugg = rels.slice().sort(() => Math.random() - .5).slice(0, 3);
    const barre = h('p', { class: 'centre', style: 'margin-top:26px' });
    for (const r of sugg) barre.append(h('button', { class: 'btn', style: 'margin:6px', onclick: () => aller('#/fiche/' + r.otherId) }, '→ ' + (r.otherName || '?')));
    barre.append(h('button', { class: 'btn', style: 'margin:6px', onclick: porteAuHasard }, '⟡ au hasard'));
    vue.append(h('h2', { class: 'section', text: "Continuer l'exploration" }), barre);
  }
  app.innerHTML = ''; app.append(vue);
}

/* ── Constellation : les liens comme carte du ciel ─────────────────────── */
function constellation(cv, centre, rels) {
  const dpr = devicePixelRatio || 1;
  const W = cv.clientWidth * dpr, H = 320 * dpr;
  cv.width = W; cv.height = H;
  const ctx = cv.getContext('2d');
  const cx = W / 2, cy = H / 2;
  const n = Math.min(rels.length, 26);
  const noeuds = rels.slice(0, n).map((r, i) => {
    const ang = (i / n) * Math.PI * 2 - Math.PI / 2 + (Math.random() - .5) * .22;
    const ray = (H / 2) * (.52 + Math.random() * .34);
    return { r, x: cx + Math.cos(ang) * ray * 1.35, y: cy + Math.sin(ang) * ray * .82, tw: Math.random() * Math.PI * 2 };
  });
  let survole = null;
  const reduit = matchMedia('(prefers-reduced-motion: reduce)').matches;
  function peindre(t) {
    ctx.clearRect(0, 0, W, H);
    // liens
    for (const nd of noeuds) {
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(nd.x, nd.y);
      ctx.strokeStyle = nd === survole ? 'rgba(224,194,116,.55)' : 'rgba(201,162,75,.16)';
      ctx.lineWidth = (nd === survole ? 1.4 : .7) * dpr; ctx.stroke();
    }
    // astre central
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 16 * dpr);
    grad.addColorStop(0, 'rgba(240,216,148,.95)'); grad.addColorStop(1, 'rgba(201,162,75,0)');
    ctx.beginPath(); ctx.arc(cx, cy, 16 * dpr, 0, 7); ctx.fillStyle = grad; ctx.fill();
    ctx.beginPath(); ctx.arc(cx, cy, 4.2 * dpr, 0, 7); ctx.fillStyle = '#f0d894'; ctx.fill();
    // étoiles liées
    for (const nd of noeuds) {
      const puls = .65 + Math.abs(Math.sin(t / 900 + nd.tw)) * .35;
      ctx.beginPath(); ctx.arc(nd.x, nd.y, (nd === survole ? 5 : 3.1) * dpr * puls, 0, 7);
      ctx.fillStyle = nd === survole ? '#f0d894' : 'rgba(224,194,116,.75)'; ctx.fill();
    }
    // étiquette du survol (sinon celle du centre)
    ctx.font = `${12.5 * dpr}px Raleway, sans-serif`; ctx.textAlign = 'center';
    if (survole) {
      ctx.fillStyle = 'rgba(236,228,212,.95)';
      ctx.fillText(survole.r.otherName || '', survole.x, survole.y - 12 * dpr);
      ctx.fillStyle = 'rgba(131,119,95,.9)';
      ctx.fillText(survole.r.label, survole.x, survole.y + 20 * dpr);
    } else {
      ctx.fillStyle = 'rgba(201,162,75,.85)';
      ctx.fillText(centre.name, cx, cy - 14 * dpr);
    }
  }
  function plusProche(ev) {
    const box = cv.getBoundingClientRect();
    const mx = (ev.clientX - box.left) * dpr, my = (ev.clientY - box.top) * dpr;
    let mieux = null, d2min = (22 * dpr) ** 2;
    for (const nd of noeuds) { const d2 = (nd.x - mx) ** 2 + (nd.y - my) ** 2; if (d2 < d2min) { d2min = d2; mieux = nd; } }
    return mieux;
  }
  cv.addEventListener('mousemove', (ev) => { survole = plusProche(ev); cv.style.cursor = survole ? 'pointer' : 'default'; if (reduit) peindre(performance.now()); });
  cv.addEventListener('click', (ev) => { const nd = plusProche(ev); if (nd) aller('#/fiche/' + nd.r.otherId); });
  if (reduit) peindre(0);
  else (function anim(t) { peindre(t); if (cv.isConnected) requestAnimationFrame(anim); })(0);
}

/* ── Vue : les Ères ────────────────────────────────────────────────────── */
async function vueEres() {
  if (!CACHE.eres) CACHE.eres = (await kget({ action: 'list', type: 'ere' })).entities;
  if (!CACHE.chrono) CACHE.chrono = (await kget({ action: 'chronologie' })).facts || [];
  const eres = CACHE.eres.slice().sort((a, b) => ((a.data && a.data.startYear) ?? -1e16) - ((b.data && b.data.startYear) ?? -1e16));
  const parEre = {};
  for (const f of CACHE.chrono) if (f.era_id) (parEre[f.era_id] = parEre[f.era_id] || []).push(f);

  app.innerHTML = '';
  const vue = h('div', { class: 'vue' });
  vue.append(fil(['Les Ères']));
  vue.append(h('div', { class: 'fiche-tete' },
    h('h1', { text: '⏳  Les Ères du monde' }),
    h('p', { class: 'devise', style: 'color:var(--dim);font-style:italic;margin:4px 0 0', text: 'Le Souffle passe, les Ères tombent — dix âges, et le compte continue.' })));
  const flux = h('div', { class: 'eres' });
  for (const ere of eres) {
    const d = ere.data || {};
    const portee = [anStr(d.startYear), anStr(d.endYear)].filter(Boolean).join('  →  ');
    const bloc = h('div', { class: 'ere' },
      h('div', { class: 'astre' }),
      h('h3', { text: ere.name, onclick: () => aller('#/fiche/' + ere.id) }),
      h('div', { class: 'portee', text: portee || 'hors du compte' }),
      h('p', { text: ere.summary || '' }));
    const echos = (parEre[ere.id] || []).slice(0, 3);
    if (echos.length) {
      const ul = h('div', { class: 'echos' });
      for (const f of echos) ul.append(h('span', { class: 'quoi', html: '<b>' + anStr(f.start_year, f.start_circa) + '</b> — ' + (f.subjectName || '') + (f.label ? ' · ' + f.label : '') }));
      bloc.append(ul);
    }
    flux.append(bloc);
  }
  vue.append(flux);
  app.innerHTML = ''; app.append(vue);
}

/* ── Vue : la Carte VIVANTE du monde — couches + temps ─────────────────── */
async function vueCarte(focusId) {
  // Données : lieux positionnés, rattachements, religions, conflits, ères, faits datés.
  const [lieuxTous, reseau, eresListe] = await Promise.all([
    getList('lieu'),
    kget({ action: 'reseau', rels: 'situe-dans,pratique,en-guerre-avec,allie-de', limit: 2000 }),
    CACHE.eres ? Promise.resolve(CACHE.eres) : kget({ action: 'list', type: 'ere' }).then((r) => (CACHE.eres = r.entities)),
  ]);
  if (!CACHE.chrono) CACHE.chrono = (await kget({ action: 'chronologie' })).facts || [];
  const lieux = lieuxTous.filter((e) => e.data && e.data.coord_x != null);
  const parId = Object.fromEntries(lieux.map((l) => [l.id, l]));

  // Sorin : parcours stocké sur son entité (data.parcours = [{lieu_id, etape, titre}])
  let sorin = null;
  try {
    const r = await kget({ action: 'entity', id: 'per-0153' });
    if (r.entity && r.entity.data && Array.isArray(r.entity.data.parcours)) {
      sorin = r.entity.data.parcours
        .map((p) => {
          const l = p.lieu_id && parId[p.lieu_id];
          if (l) return { ...p, x: +l.data.coord_x, y: +l.data.coord_y };
          if (p.x != null && p.y != null) return p;
          return null;
        })
        .filter(Boolean);
      if (sorin.length < 2) sorin = null;
    }
  } catch { /* pas de parcours */ }

  // Nations : centroïdes + religion + guerres/alliances + existence datée.
  const nations = {};
  const noeud = (id) => (nations[id] = nations[id] || { id, villes: [], religion: null });
  for (const l of reseau.links) {
    if (l.rel === 'situe-dans' && parId[l.from]) {
      const cible = reseau.nodes.find((n) => n.id === l.to);
      if (cible && cible.type === 'entite-politique') { noeud(l.to).villes.push(parId[l.from]); parId[l.from].nation = l.to; }
    }
  }
  for (const l of reseau.links) {
    if (l.rel === 'pratique' && nations[l.from] && !nations[l.from].religion) nations[l.from].religion = l.to;
  }
  const nomDe = Object.fromEntries(reseau.nodes.map((n) => [n.id, n.name]));
  const guerres = reseau.links.filter((l) => l.rel === 'en-guerre-avec' && nations[l.from] && nations[l.to]);
  const alliances = reseau.links.filter((l) => l.rel === 'allie-de' && nations[l.from] && nations[l.to]);
  for (const n of Object.values(nations)) {
    if (!n.villes.length) continue;
    n.cx = n.villes.reduce((s, v) => s + (+v.data.coord_x), 0) / n.villes.length;
    n.cy = n.villes.reduce((s, v) => s + (+v.data.coord_y), 0) / n.villes.length;
    n.ray = Math.max(28, n.villes.reduce((s, v) => s + Math.hypot(v.data.coord_x - n.cx, v.data.coord_y - n.cy), 0) / n.villes.length * 1.5);
    n.nom = nomDe[n.id] || '';
  }
  for (const f of CACHE.chrono) {
    if (f.start_year == null || !nations[f.subject_id]) continue;
    if (f.fact_type === 'fondation') nations[f.subject_id].debut = f.start_year;
    if (f.fact_type === 'chute') nations[f.subject_id].fin = f.start_year;
  }
  // Religions : palette stable
  const relIds = [...new Set(Object.values(nations).map((n) => n.religion).filter(Boolean))];
  const PALETTE_REL = ['#b89ad6', '#8fb0cf', '#8fbe9b', '#d0a273', '#d08a8a', '#9db3c9', '#cbb794', '#a9c98f', '#e0c274', '#c9a24b', '#a795d6', '#7fc0b0'];
  const coulRel = Object.fromEntries(relIds.map((id, i) => [id, PALETTE_REL[i % PALETTE_REL.length]]));
  // Courbe du Lien (par ère)
  const eres = eresListe.map((e) => ({ ...e, d: e.data || {} })).filter((e) => e.d.startYear != null).sort((a, b) => a.d.startYear - b.d.startYear);
  const lienA = (an) => { const e = eres.find((e) => an >= e.d.startYear && an <= (e.d.endYear == null ? 1e15 : e.d.endYear)); return e ? { v: e.d.lien || 0, ere: e.name } : { v: 0, ere: '' }; };

  // ── interface ──
  app.innerHTML = '';
  const vue = h('div', { class: 'vue' });
  vue.append(fil(['La Carte']));
  vue.append(h('div', { class: 'fiche-tete' },
    h('h1', { text: '🧭  La Carte vivante' }),
    h('p', { class: 'devise', style: 'color:var(--dim);font-style:italic;margin:4px 0 0', text: 'Le monde incarné — couches, époques, conflits, foi, et le pas des exilés.' })));

  const COUCHES = [
    ['spheres', '♛ nations'], ['religions', '⛧ religions'], ['conflits', '⚔ conflits'],
    ['sorin', '🚶 parcours de Sorin'], ['lien', '☀ souffle du Lien'],
  ];
  const actives = new Set(['spheres', 'lien']);
  const ligne = h('div', { class: 'filtre-ligne' });
  const champ = h('input', { type: 'search', placeholder: 'Trouver un lieu…', style: 'max-width:230px' });
  ligne.append(champ);
  const chipsCouches = {};
  for (const [cle, lbl] of COUCHES) {
    chipsCouches[cle] = h('span', { class: 'chip', style: actives.has(cle) ? 'border-color:var(--gold);color:var(--gold-soft)' : '', text: lbl, onclick: () => {
      actives.has(cle) ? actives.delete(cle) : actives.add(cle);
      chipsCouches[cle].style.borderColor = actives.has(cle) ? 'var(--gold)' : '';
      chipsCouches[cle].style.color = actives.has(cle) ? 'var(--gold-soft)' : '';
      legende();
    } });
    if (cle === 'sorin' && !sorin) { chipsCouches[cle].style.opacity = .4; chipsCouches[cle].title = 'parcours en cours d’extraction'; }
    ligne.append(chipsCouches[cle]);
  }
  vue.append(ligne);

  const bloc = h('div', { class: 'panneau', style: 'padding:10px' });
  const cv = h('canvas', { style: 'width:100%;height:min(64vh,620px);display:block;border-radius:8px;cursor:grab' });
  bloc.append(cv);
  // curseur temporel
  const barreTemps = h('div', { style: 'display:flex;align-items:center;gap:14px;margin-top:10px;padding:0 6px' });
  const slider = h('input', { type: 'range', min: -20000, max: 10400, step: 20, value: 10200, style: 'flex:1;accent-color:#c9a24b' });
  const etiqTemps = h('span', { style: 'min-width:220px;text-align:right;color:var(--gold-soft);font-family:Cinzel,serif;font-size:13px;letter-spacing:1px' });
  barreTemps.append(slider, etiqTemps);
  bloc.append(barreTemps);
  const legendeEl = h('div', { class: 'legende', style: 'color:var(--faint);font-size:12px;text-align:center;margin-top:8px;letter-spacing:1px' });
  bloc.append(legendeEl);
  vue.append(bloc);
  app.innerHTML = ''; app.append(vue);

  function legende() {
    legendeEl.innerHTML = '';
    if (actives.has('religions')) {
      const morceaux = relIds.map((id) => `<span style="color:${coulRel[id]}">●</span> ${nomDe[id] || ''}`).join('  ');
      legendeEl.innerHTML = morceaux + '<br>';
    }
    legendeEl.innerHTML += 'molette : zoom · glisser : déplacer · clic : ouvrir · le curseur remonte le temps';
  }
  legende();

  // ── moteur ──
  const dpr = devicePixelRatio || 1;
  let W = 0, H = 0;
  const ctx = cv.getContext('2d');
  function tailler() { W = cv.clientWidth * dpr; H = cv.clientHeight * dpr; cv.width = W; cv.height = H; }
  tailler(); addEventListener('resize', tailler);
  const xs = lieux.map((l) => +l.data.coord_x), ys = lieux.map((l) => +l.data.coord_y);
  const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
  const kBase = Math.min(W / (x1 - x0 + 80), H / (y1 - y0 + 80));
  let k = kBase, ox = W / 2 - k * (x0 + x1) / 2, oy = H / 2 - k * (y0 + y1) / 2;
  const kMin = kBase * .6, kMax = kBase * 30;
  if (focusId && parId[focusId]) {
    const f = parId[focusId];
    k = kBase * 6; ox = W / 2 - k * (+f.data.coord_x); oy = H / 2 - k * (+f.data.coord_y);
  }
  const E = (wx, wy) => [ox + k * wx, oy + k * wy];
  const STYLE = {
    region: { r: 8, c: 'rgba(201,162,75,.30)', halo: 26, seuilNom: 1.25 },
    cite: { r: 4.6, c: 'rgba(240,216,148,.95)', halo: 14, seuilNom: 1.8 },
    ville: { r: 3, c: 'rgba(224,194,116,.75)', halo: 0, seuilNom: 3.2 },
    bourg: { r: 2.2, c: 'rgba(179,166,143,.65)', halo: 0, seuilNom: 5 },
  };
  let survole = null, drag = null, tAnim = 0;

  function nationVisible(n, an) {
    if (n.debut != null && an < n.debut) return false;
    if (n.fin != null && an > n.fin) return false;
    return true;
  }
  function peindre() {
    const an = +slider.value;
    const lien = lienA(an);
    etiqTemps.textContent = (anStr(an) || 'An 0') + (lien.ere ? ' · ' + lien.ere.replace(/^Ere\s+/, 'Ère ').split('(')[0].trim() : '');
    ctx.clearRect(0, 0, W, H);
    // souffle du Lien : aura ambiante dont l'intensité suit la courbe
    if (actives.has('lien')) {
      const puls = .85 + Math.sin(tAnim / 1400) * .15;
      const force = (lien.v / 100) * puls;
      const g = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, Math.max(W, H) / 1.5);
      g.addColorStop(0, `rgba(201,162,75,${.16 * force})`);
      g.addColorStop(.6, `rgba(160,120,50,${.07 * force})`);
      g.addColorStop(1, 'rgba(13,11,9,0)');
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      // jauge discrète
      ctx.fillStyle = 'rgba(201,162,75,.5)';
      ctx.font = `${11 * dpr}px Raleway, sans-serif`; ctx.textAlign = 'left';
      ctx.fillText('le Lien : ' + '▮'.repeat(Math.round(lien.v / 10)) + '▯'.repeat(10 - Math.round(lien.v / 10)), 10 * dpr, H - 12 * dpr);
    }
    // sphères des nations (naissent et meurent avec le temps)
    if (actives.has('spheres') || actives.has('religions')) {
      for (const n of Object.values(nations)) {
        if (n.cx == null || !nationVisible(n, an)) continue;
        const [sx, sy] = E(n.cx, n.cy);
        const ray = n.ray * k;
        const coul = actives.has('religions') && n.religion ? coulRel[n.religion] : '#c9a24b';
        const g = ctx.createRadialGradient(sx, sy, 0, sx, sy, ray);
        g.addColorStop(0, coul + '2e'); g.addColorStop(.75, coul + '14'); g.addColorStop(1, coul + '00');
        ctx.beginPath(); ctx.arc(sx, sy, ray, 0, 7); ctx.fillStyle = g; ctx.fill();
        if (ray > 46 * dpr) {
          ctx.font = `${12.5 * dpr}px Cinzel, serif`; ctx.textAlign = 'center';
          ctx.fillStyle = coul + 'bb';
          ctx.save(); ctx.letterSpacing = `${2 * dpr}px`;
          ctx.fillText((n.nom || '').toUpperCase(), sx, sy - ray * .55); ctx.restore();
        }
      }
    }
    // conflits & alliances (arcs entre centroïdes)
    if (actives.has('conflits')) {
      const arc = (a, b, coul, pointille) => {
        const [ax, ay] = E(a.cx, a.cy), [bx, by] = E(b.cx, b.cy);
        const mx = (ax + bx) / 2 + (by - ay) * .18, my = (ay + by) / 2 + (ax - bx) * .18;
        ctx.strokeStyle = coul; ctx.lineWidth = 1.4 * dpr;
        ctx.setLineDash(pointille ? [6 * dpr, 5 * dpr] : []);
        ctx.beginPath(); ctx.moveTo(ax, ay); ctx.quadraticCurveTo(mx, my, bx, by); ctx.stroke();
        ctx.setLineDash([]);
      };
      for (const l of alliances) { const a = nations[l.from], b = nations[l.to]; if (a.cx != null && b.cx != null && nationVisible(a, an) && nationVisible(b, an)) arc(a, b, 'rgba(159,190,155,.4)', true); }
      for (const l of guerres) { const a = nations[l.from], b = nations[l.to]; if (a.cx != null && b.cx != null && nationVisible(a, an) && nationVisible(b, an)) arc(a, b, 'rgba(208,106,90,.55)', false); }
    }
    // points des lieux
    const q = champ.value.trim().toLowerCase();
    const zoom = k / kBase;
    for (const l of lieux) {
      const ech = l.data.echelle || 'ville';
      const st = STYLE[ech] || STYLE.ville;
      const [sx, sy] = E(+l.data.coord_x, +l.data.coord_y);
      if (sx < -40 || sx > W + 40 || sy < -40 || sy > H + 40) continue;
      const allume = (q && l.name.toLowerCase().includes(q)) || l === survole || l.id === focusId;
      let coul = allume ? '#f0d894' : st.c;
      if (actives.has('religions') && l.nation && nations[l.nation] && nations[l.nation].religion && !allume) coul = coulRel[nations[l.nation].religion] + 'cc';
      if (st.halo || allume) {
        const hg = ctx.createRadialGradient(sx, sy, 0, sx, sy, (st.halo || 18) * dpr);
        hg.addColorStop(0, allume ? 'rgba(240,216,148,.5)' : 'rgba(201,162,75,.14)'); hg.addColorStop(1, 'rgba(201,162,75,0)');
        ctx.beginPath(); ctx.arc(sx, sy, (st.halo || 18) * dpr, 0, 7); ctx.fillStyle = hg; ctx.fill();
      }
      ctx.beginPath(); ctx.arc(sx, sy, st.r * dpr * (allume ? 1.5 : 1), 0, 7);
      ctx.fillStyle = coul; ctx.fill();
      if (l.data.capitale) { ctx.beginPath(); ctx.arc(sx, sy, (st.r + 3) * dpr, 0, 7); ctx.strokeStyle = 'rgba(240,216,148,.5)'; ctx.lineWidth = dpr; ctx.stroke(); }
      if (zoom >= st.seuilNom || allume) {
        ctx.font = `${(ech === 'region' ? 13.5 : 11.5) * dpr}px Raleway, sans-serif`; ctx.textAlign = 'center';
        ctx.fillStyle = ech === 'region' ? 'rgba(201,162,75,.75)' : (allume ? 'rgba(240,216,148,.95)' : 'rgba(179,166,143,.8)');
        if (ech === 'region') { ctx.save(); ctx.letterSpacing = `${2 * dpr}px`; ctx.fillText(l.name.toUpperCase(), sx, sy - 12 * dpr); ctx.restore(); }
        else ctx.fillText(l.name, sx, sy - (st.r + 6) * dpr);
      }
    }
    // parcours de Sorin (chemin doré animé, étapes numérotées)
    if (actives.has('sorin') && sorin && sorin.length > 1) {
      ctx.strokeStyle = 'rgba(240,216,148,.7)'; ctx.lineWidth = 1.8 * dpr;
      ctx.setLineDash([9 * dpr, 7 * dpr]); ctx.lineDashOffset = -tAnim / 22;
      ctx.beginPath();
      sorin.forEach((p, i) => { const [sx, sy] = E(p.x, p.y); i ? ctx.lineTo(sx, sy) : ctx.moveTo(sx, sy); });
      ctx.stroke(); ctx.setLineDash([]);
      sorin.forEach((p) => {
        const [sx, sy] = E(p.x, p.y);
        ctx.beginPath(); ctx.arc(sx, sy, 6 * dpr, 0, 7); ctx.fillStyle = 'rgba(13,11,9,.9)'; ctx.fill();
        ctx.strokeStyle = '#f0d894'; ctx.lineWidth = dpr; ctx.stroke();
        ctx.font = `${8.5 * dpr}px Raleway, sans-serif`; ctx.textAlign = 'center'; ctx.fillStyle = '#f0d894';
        ctx.fillText(String(p.etape), sx, sy + 3 * dpr);
      });
      // étiquette du voyage
      const dep = sorin[0];
      const [dx, dy] = E(dep.x, dep.y);
      ctx.font = `${11 * dpr}px Raleway, sans-serif`; ctx.textAlign = 'center';
      ctx.fillStyle = 'rgba(240,216,148,.85)';
      ctx.fillText('départ — jour 1', dx, dy - 12 * dpr);
    }
    if (survole) {
      const [sx, sy] = E(+survole.data.coord_x, +survole.data.coord_y);
      ctx.font = `${11 * dpr}px Raleway, sans-serif`; ctx.textAlign = 'center';
      ctx.fillStyle = 'rgba(131,119,95,.9)';
      const nation = survole.nation && nomDe[survole.nation] ? ' · ' + nomDe[survole.nation] : '';
      ctx.fillText((survole.data.echelle || '') + nation + (survole.data.capitale ? ' · capitale' : ''), sx, sy + 20 * dpr);
    }
  }
  (function boucle(t) {
    if (!cv.isConnected) return;
    tAnim = t;
    if (actives.has('lien') || actives.has('sorin')) peindre();
    requestAnimationFrame(boucle);
  })(0);
  peindre();
  slider.addEventListener('input', peindre);

  // interactions
  cv.addEventListener('mousedown', (ev) => { drag = { x: ev.clientX, y: ev.clientY, ox, oy, bouge: false }; cv.style.cursor = 'grabbing'; });
  addEventListener('mousemove', (ev) => {
    if (drag) {
      ox = drag.ox + (ev.clientX - drag.x) * dpr; oy = drag.oy + (ev.clientY - drag.y) * dpr;
      if (Math.abs(ev.clientX - drag.x) + Math.abs(ev.clientY - drag.y) > 4) drag.bouge = true;
      peindre(); return;
    }
    const box = cv.getBoundingClientRect();
    if (ev.clientX < box.left || ev.clientX > box.right || ev.clientY < box.top || ev.clientY > box.bottom) return;
    const mx = (ev.clientX - box.left) * dpr, my = (ev.clientY - box.top) * dpr;
    let best = null, d2min = (16 * dpr) ** 2;
    for (const l of lieux) {
      const [sx, sy] = E(+l.data.coord_x, +l.data.coord_y);
      const d2 = (sx - mx) ** 2 + (sy - my) ** 2;
      if (d2 < d2min) { d2min = d2; best = l; }
    }
    if (best !== survole) { survole = best; cv.style.cursor = best ? 'pointer' : 'grab'; peindre(); }
  });
  addEventListener('mouseup', () => { if (drag) { const b = drag.bouge; drag = null; cv.style.cursor = 'grab'; if (!b && survole) aller('#/fiche/' + survole.id); } });
  cv.addEventListener('wheel', (ev) => {
    ev.preventDefault();
    const box = cv.getBoundingClientRect();
    const mx = (ev.clientX - box.left) * dpr, my = (ev.clientY - box.top) * dpr;
    const k2 = Math.max(kMin, Math.min(kMax, k * (ev.deltaY < 0 ? 1.18 : 1 / 1.18)));
    ox = mx - (mx - ox) * (k2 / k); oy = my - (my - oy) * (k2 / k); k = k2;
    peindre();
  }, { passive: false });
  champ.addEventListener('input', debounce(() => {
    const q = champ.value.trim().toLowerCase();
    if (q.length >= 2) {
      const hit = lieux.find((l) => l.name.toLowerCase().startsWith(q)) || lieux.find((l) => l.name.toLowerCase().includes(q));
      if (hit) { k = Math.max(k, kBase * 5); ox = W / 2 - k * (+hit.data.coord_x); oy = H / 2 - k * (+hit.data.coord_y); }
    }
    peindre();
  }, 200));
}


/* ── Arbre généalogique (SVG) ──────────────────────────────────────────── */
function dessinerArbre(arbre) {
  const rangs = [
    ['aïeux', arbre.grandparents], ['parents', arbre.parents],
    ['', [...arbre.siblings.map((n) => ({ ...n, role: 'fratrie' })), { ...arbre.center, central: true }, ...arbre.conjoints.map((n) => ({ ...n, role: 'conjoint' }))]],
    ['enfants', arbre.children], ['petits-enfants', arbre.grandchildren],
  ].filter(([, nds]) => nds.length);
  if (rangs.length <= 1 && rangs[0] && rangs[0][1].length <= 1) return null;

  const NS = 'http://www.w3.org/2000/svg';
  const LW = 168, LH = 54, GX = 14, GY = 46;
  const maxParRang = 5;
  const larg = Math.max(...rangs.map(([, nds]) => Math.min(nds.length, maxParRang))) * (LW + GX) + GX;
  const haut = rangs.length * (LH + GY) + 10;
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', `0 0 ${larg} ${haut}`);
  svg.setAttribute('style', 'width:100%;height:auto;display:block');

  const centres = [];
  rangs.forEach(([etiquette, nds], ri) => {
    const visibles = nds.slice(0, maxParRang);
    const total = visibles.length * (LW + GX) - GX;
    const x0 = (larg - total) / 2;
    const y = 8 + ri * (LH + GY);
    centres[ri] = { y, xs: [] };
    visibles.forEach((nd, i) => {
      const x = x0 + i * (LW + GX);
      centres[ri].xs.push(x + LW / 2);
      const gEl = document.createElementNS(NS, 'g');
      gEl.setAttribute('style', 'cursor:pointer');
      gEl.addEventListener('click', () => aller('#/fiche/' + nd.id));
      const rect = document.createElementNS(NS, 'rect');
      rect.setAttribute('x', x); rect.setAttribute('y', y);
      rect.setAttribute('width', LW); rect.setAttribute('height', LH);
      rect.setAttribute('rx', 9);
      rect.setAttribute('fill', nd.central ? 'rgba(201,162,75,.16)' : 'rgba(27,24,20,.9)');
      rect.setAttribute('stroke', nd.central ? '#c9a24b' : '#33291c');
      gEl.append(rect);
      const t1 = document.createElementNS(NS, 'text');
      t1.setAttribute('x', x + LW / 2); t1.setAttribute('y', y + (nd.lifeLabel || nd.role ? 24 : 32));
      t1.setAttribute('text-anchor', 'middle');
      t1.setAttribute('style', `fill:${nd.central ? '#f0d894' : '#ece4d4'};font-size:12.5px;font-weight:600`);
      t1.textContent = nd.name.length > 24 ? nd.name.slice(0, 23) + '…' : nd.name;
      gEl.append(t1);
      const sous = nd.lifeLabel || (nd.role ? '(' + nd.role + ')' : '');
      if (sous) {
        const t2 = document.createElementNS(NS, 'text');
        t2.setAttribute('x', x + LW / 2); t2.setAttribute('y', y + 41);
        t2.setAttribute('text-anchor', 'middle');
        t2.setAttribute('style', 'fill:#83775f;font-size:10.5px');
        t2.textContent = sous;
        gEl.append(t2);
      }
      svg.append(gEl);
    });
    if (nds.length > maxParRang) {
      const t = document.createElementNS(NS, 'text');
      t.setAttribute('x', larg - 8); t.setAttribute('y', y + LH / 2);
      t.setAttribute('text-anchor', 'end');
      t.setAttribute('style', 'fill:#83775f;font-size:11px');
      t.textContent = '+' + (nds.length - maxParRang);
      svg.append(t);
    }
    if (etiquette) {
      const t = document.createElementNS(NS, 'text');
      t.setAttribute('x', 4); t.setAttribute('y', y - 8);
      t.setAttribute('style', 'fill:#83775f;font-size:10px;letter-spacing:2px;text-transform:uppercase');
      t.textContent = etiquette.toUpperCase();
      svg.append(t);
    }
  });
  // liaisons verticales entre rangs (chaque nœud → tronc du rang suivant)
  for (let ri = 0; ri < rangs.length - 1; ri++) {
    const a = centres[ri], b = centres[ri + 1];
    const yMid = a.y + LH + GY / 2;
    for (const x of a.xs) trait(svg, NS, x, a.y + LH, x, yMid);
    for (const x of b.xs) trait(svg, NS, x, yMid, x, b.y);
    trait(svg, NS, Math.min(...a.xs, ...b.xs), yMid, Math.max(...a.xs, ...b.xs), yMid);
  }
  return svg;
}
function trait(svg, NS, x1, y1, x2, y2) {
  const l = document.createElementNS(NS, 'line');
  l.setAttribute('x1', x1); l.setAttribute('y1', y1); l.setAttribute('x2', x2); l.setAttribute('y2', y2);
  l.setAttribute('stroke', 'rgba(201,162,75,.28)');
  svg.append(l);
}

/* ── Visions croisées : le hub ─────────────────────────────────────────── */
const TRAMES = {
  sang: { titre: 'Le Sang', ligne: 'Lignées, parents, conjoints — toutes les générations tissées.', rels: 'parent-de,conjoint-de,fratrie-de,descend-de,membre-de', types: 'personne,lignee', glyphe: '🜃' },
  foi: { titre: 'Foi & Pouvoir', ligne: 'Qui vénère quoi, qui pratique quoi — dieux, cultes et nations.', rels: 'venere,pratique,schisme-de,incarne', types: '', glyphe: '⛧' },
  recits: { titre: 'Les Récits interconnectés', ligne: 'Les quatre livres et tout ce qui les traverse — personnages, reliques, strates.', rels: 'apparait-dans,lie-a', types: 'oeuvre,personne,objet,question', glyphe: '📜' },
  pouvoirs: { titre: 'Le Grand Échiquier', ligne: 'Alliances, guerres, vassalités, successions — la politique du monde.', rels: 'allie-de,en-guerre-avec,vassal-de,succede-a,capitale-de,frontiere-avec', types: '', glyphe: '♛' },
};
async function vueVisions() {
  app.innerHTML = '';
  const vue = h('div', { class: 'vue' });
  vue.append(fil(['Visions croisées']));
  vue.append(h('div', { class: 'fiche-tete' },
    h('h1', { text: '🕸  Visions croisées' }),
    h('p', { class: 'devise', style: 'color:var(--dim);font-style:italic;margin:4px 0 0', text: 'Le même monde, sous tous les angles — chaque croisement de données a sa lecture.' })));
  const grille = h('div', { class: 'portes', style: 'margin-top:26px' });
  for (const [cle, t] of Object.entries(TRAMES)) {
    grille.append(h('div', { class: 'porte', onclick: () => aller('#/visions/trame/' + cle) },
      h('div', { class: 'glyphe', text: t.glyphe }), h('h3', { text: t.titre }), h('p', { text: t.ligne })));
  }
  grille.append(h('div', { class: 'porte', onclick: () => aller('#/visions/fresque') },
    h('div', { class: 'glyphe', text: '⏳' }), h('h3', { text: 'La Fresque du temps' }),
    h('p', { text: 'Tous les faits datés déroulés sur dix mille ans — zoomez dans l’histoire.' })));
  grille.append(h('div', { class: 'porte', onclick: () => aller('#/carte') },
    h('div', { class: 'glyphe', text: '🧭' }), h('h3', { text: 'La Carte' }), h('p', { text: 'La toile des lieux, à survoler.' })));
  vue.append(grille);
  app.innerHTML = ''; app.append(vue);
}

/* ── La Trame : graphe de force interactif ─────────────────────────────── */
const COULEUR_TYPE = {
  personne: '#e0c274', lignee: '#c9a24b', divinite: '#f0d894', religion: '#b89ad6',
  'entite-politique': '#8fb0cf', lieu: '#8fbe9b', oeuvre: '#d89393', objet: '#cbb794',
  question: '#a795d6', concept: '#9db3c9', terme: '#9db3c9', espece: '#a9c98f', evenement: '#d0a273',
};
async function vueTrame(cle) {
  const t = TRAMES[cle] || TRAMES.sang;
  const data = await kget({ action: 'reseau', rels: t.rels, types: t.types || null, limit: 900 });
  app.innerHTML = '';
  const vue = h('div', { class: 'vue' });
  vue.append(fil(['Visions croisées', '#/visions'], [t.titre]));
  vue.append(h('div', { class: 'fiche-tete' },
    h('h1', { text: t.glyphe + '  ' + t.titre }),
    h('p', { class: 'devise', style: 'color:var(--dim);font-style:italic;margin:4px 0 0', text: t.ligne + ' — ' + data.nodes.length + ' nœuds, ' + data.links.length + ' liens.' + (data.tronque ? ' (vue tronquée)' : '') })));
  // navigation entre trames
  const barre = h('div', { class: 'filtre-ligne' });
  for (const [k, tt] of Object.entries(TRAMES)) barre.append(h('span', { class: 'chip', style: k === cle ? 'border-color:var(--gold);color:var(--gold-soft)' : '', onclick: () => aller('#/visions/trame/' + k), text: tt.glyphe + ' ' + tt.titre }));
  vue.append(barre);
  const bloc = h('div', { class: 'panneau', style: 'padding:10px' });
  const cv = h('canvas', { style: 'width:100%;height:min(70vh,680px);display:block;border-radius:8px;cursor:grab' });
  bloc.append(cv, h('div', { class: 'legende', style: 'color:var(--faint);font-size:12px;text-align:center;margin-top:8px;letter-spacing:1px', text: 'glisser un astre : le déplacer · glisser le vide : naviguer · molette : zoom · clic : ouvrir' }));
  vue.append(bloc);
  app.innerHTML = ''; app.append(vue);
  requestAnimationFrame(() => trameForce(cv, data));
}
function trameForce(cv, data) {
  const dpr = devicePixelRatio || 1;
  const W = cv.clientWidth * dpr, H = cv.clientHeight * dpr;
  cv.width = W; cv.height = H;
  const ctx = cv.getContext('2d');
  const N = data.nodes.map((n, i) => ({
    ...n,
    x: W / 2 + Math.cos(i * 2.399) * (H / 3) * Math.sqrt(i / data.nodes.length),
    y: H / 2 + Math.sin(i * 2.399) * (H / 3) * Math.sqrt(i / data.nodes.length),
    vx: 0, vy: 0, r: (3 + Math.sqrt(n.degre || 1) * 2.2) * dpr,
  }));
  const parId = Object.fromEntries(N.map((n) => [n.id, n]));
  const L = data.links.map((l) => ({ a: parId[l.from], b: parId[l.to], rel: l.rel })).filter((l) => l.a && l.b);
  let k = 1, ox = 0, oy = 0;              // vue (zoom/pan)
  let chaud = 1;                           // température de la simulation
  let survole = null, saisi = null, drag = null;
  const versEcran = (n) => [n.x * k + ox, n.y * k + oy];

  function etape() {
    // ressorts
    for (const l of L) {
      const dx = l.b.x - l.a.x, dy = l.b.y - l.a.y;
      const d = Math.max(Math.hypot(dx, dy), 1);
      const cible = 62 * dpr;
      const f = (d - cible) * 0.012 * chaud;
      const fx = (dx / d) * f, fy = (dy / d) * f;
      l.a.vx += fx; l.a.vy += fy; l.b.vx -= fx; l.b.vy -= fy;
    }
    // répulsion (approx : sous-échantillonnée pour les gros graphes)
    const pas = N.length > 220 ? 2 : 1;
    for (let i = 0; i < N.length; i += 1) {
      for (let j = i + pas; j < N.length; j += pas) {
        const a = N[i], b = N[j];
        const dx = b.x - a.x, dy = b.y - a.y;
        let d2 = dx * dx + dy * dy; if (d2 < 40) d2 = 40;
        if (d2 > (300 * dpr) ** 2) continue;
        const f = (900 * dpr * chaud) / d2;
        const d = Math.sqrt(d2);
        const fx = (dx / d) * f, fy = (dy / d) * f;
        a.vx -= fx; a.vy -= fy; b.vx += fx; b.vy += fy;
      }
    }
    // gravité vers le centre + amortissement
    for (const n of N) {
      if (n === saisi) { n.vx = 0; n.vy = 0; continue; }
      n.vx += (W / 2 - n.x) * 0.0016 * chaud; n.vy += (H / 2 - n.y) * 0.0016 * chaud;
      n.vx *= .86; n.vy *= .86; n.x += n.vx; n.y += n.vy;
    }
    chaud = Math.max(chaud * .995, .12);
  }
  function peindre() {
    ctx.clearRect(0, 0, W, H);
    ctx.lineWidth = .6 * dpr;
    for (const l of L) {
      const [ax, ay] = versEcran(l.a), [bx, by] = versEcran(l.b);
      const actif = survole && (l.a === survole || l.b === survole);
      ctx.strokeStyle = actif ? 'rgba(240,216,148,.6)' : 'rgba(201,162,75,.20)';
      ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by); ctx.stroke();
    }
    for (const n of N) {
      const [sx, sy] = versEcran(n);
      if (sx < -30 || sx > W + 30 || sy < -30 || sy > H + 30) continue;
      ctx.beginPath(); ctx.arc(sx, sy, n.r * k, 0, 7);
      ctx.fillStyle = n === survole ? '#f0d894' : (COULEUR_TYPE[n.type] || '#b3a68f');
      ctx.globalAlpha = survole && n !== survole && !L.some((l) => (l.a === survole && l.b === n) || (l.b === survole && l.a === n)) ? .35 : 1;
      ctx.fill(); ctx.globalAlpha = 1;
      if (n.degre >= 6 || n === survole || k > 1.6) {
        ctx.font = `${11.5 * dpr}px Raleway, sans-serif`; ctx.textAlign = 'center';
        ctx.fillStyle = n === survole ? 'rgba(240,216,148,.95)' : 'rgba(179,166,143,.75)';
        ctx.fillText(n.name, sx, sy - n.r * k - 5 * dpr);
      }
    }
    if (survole) {
      const [sx, sy] = versEcran(survole);
      ctx.font = `${10.5 * dpr}px Raleway, sans-serif`; ctx.textAlign = 'center';
      ctx.fillStyle = 'rgba(131,119,95,.9)';
      ctx.fillText(TYPE_LABEL[survole.type] || survole.type, sx, sy + survole.r * k + 14 * dpr);
    }
  }
  (function boucle() {
    if (!cv.isConnected) return;
    etape(); peindre();
    requestAnimationFrame(boucle);
  })();
  function sous(ev) {
    const box = cv.getBoundingClientRect();
    const mx = (ev.clientX - box.left) * dpr, my = (ev.clientY - box.top) * dpr;
    let best = null, d2min = (18 * dpr) ** 2;
    for (const n of N) { const [sx, sy] = versEcran(n); const d2 = (sx - mx) ** 2 + (sy - my) ** 2; if (d2 < d2min) { d2min = d2; best = n; } }
    return { best, mx, my };
  }
  cv.addEventListener('mousedown', (ev) => {
    const { best, mx, my } = sous(ev);
    if (best) { saisi = best; chaud = Math.max(chaud, .5); }
    else drag = { mx, my, ox, oy };
    cv.style.cursor = 'grabbing';
  });
  addEventListener('mousemove', (ev) => {
    const box = cv.getBoundingClientRect();
    const mx = (ev.clientX - box.left) * dpr, my = (ev.clientY - box.top) * dpr;
    if (saisi) { saisi.x = (mx - ox) / k; saisi.y = (my - oy) / k; saisi.bouge = true; return; }
    if (drag) { ox = drag.ox + (mx - drag.mx); oy = drag.oy + (my - drag.my); return; }
    if (ev.clientX < box.left || ev.clientX > box.right || ev.clientY < box.top || ev.clientY > box.bottom) { survole = null; return; }
    survole = sous(ev).best;
    cv.style.cursor = survole ? 'pointer' : 'grab';
  });
  addEventListener('mouseup', () => {
    if (saisi && !saisi.bouge) aller('#/fiche/' + saisi.id);
    if (saisi) saisi.bouge = false;
    saisi = null; drag = null; cv.style.cursor = 'grab';
  });
  cv.addEventListener('wheel', (ev) => {
    ev.preventDefault();
    const box = cv.getBoundingClientRect();
    const mx = (ev.clientX - box.left) * dpr, my = (ev.clientY - box.top) * dpr;
    const k2 = Math.max(.3, Math.min(5, k * (ev.deltaY < 0 ? 1.15 : 1 / 1.15)));
    ox = mx - (mx - ox) * (k2 / k); oy = my - (my - oy) * (k2 / k); k = k2;
  }, { passive: false });
}

/* ── La Fresque du temps : tous les faits datés, zoomables ─────────────── */
async function vueFresque() {
  if (!CACHE.chrono) CACHE.chrono = (await kget({ action: 'chronologie' })).facts || [];
  if (!CACHE.eres) CACHE.eres = (await kget({ action: 'list', type: 'ere' })).entities;
  const faits = CACHE.chrono.filter((f) => f.start_year != null);
  const eres = CACHE.eres.map((e) => ({ ...e, d: e.data || {} })).filter((e) => e.d.startYear != null);

  app.innerHTML = '';
  const vue = h('div', { class: 'vue' });
  vue.append(fil(['Visions croisées', '#/visions'], ['La Fresque du temps']));
  vue.append(h('div', { class: 'fiche-tete' },
    h('h1', { text: '⏳  La Fresque du temps' }),
    h('p', { class: 'devise', style: 'color:var(--dim);font-style:italic;margin:4px 0 0', text: faits.length + ' faits datés — molette pour plonger dans une époque, clic pour ouvrir.' })));
  const bloc = h('div', { class: 'panneau', style: 'padding:10px' });
  const cv = h('canvas', { style: 'width:100%;height:min(62vh,560px);display:block;border-radius:8px;cursor:grab' });
  bloc.append(cv, h('div', { class: 'legende', style: 'color:var(--faint);font-size:12px;text-align:center;margin-top:8px;letter-spacing:1px', text: 'les bandes = les Ères · chaque point = un fait daté (fondations, chutes, batailles, vies…)' }));
  vue.append(bloc);
  app.innerHTML = ''; app.append(vue);

  const dpr = devicePixelRatio || 1;
  const W = cv.clientWidth * dpr, H = cv.clientHeight * dpr;
  cv.width = W; cv.height = H;
  const ctx = cv.getContext('2d');

  // échelle temporelle : vue initiale sur l'histoire « humaine »
  let a0 = -20000, a1 = 10600;
  const LANES = ['fondation', 'chute', 'bataille', 'traite', 'evenement', 'regne', 'naissance', 'mort', 'apparition', 'disparition', 'autre'];
  const laneY = (t) => 54 * dpr + LANES.indexOf(LANES.includes(t) ? t : 'autre') * ((H - 90 * dpr) / LANES.length);
  const COUL_FAIT = { fondation: '#8fbe9b', chute: '#d08a8a', bataille: '#d0a273', traite: '#9db3c9', evenement: '#e0c274', regne: '#c9a24b', naissance: '#a9c98f', mort: '#b3a68f', apparition: '#b89ad6', disparition: '#a795d6', autre: '#83775f' };
  const X = (an) => ((an - a0) / (a1 - a0)) * W;
  let survole = null, drag = null;

  function peindre() {
    ctx.clearRect(0, 0, W, H);
    // bandes des ères
    for (const e of eres) {
      const x0 = X(e.d.startYear), x1 = X(e.d.endYear == null ? 10600 : e.d.endYear);
      if (x1 < 0 || x0 > W) continue;
      ctx.fillStyle = 'rgba(201,162,75,.045)';
      ctx.fillRect(x0, 0, Math.max(x1 - x0, 1), H);
      ctx.strokeStyle = 'rgba(201,162,75,.14)'; ctx.lineWidth = dpr;
      ctx.beginPath(); ctx.moveTo(x0, 0); ctx.lineTo(x0, H); ctx.stroke();
      if (x1 - x0 > 80 * dpr) {
        ctx.font = `${11 * dpr}px Cinzel, serif`; ctx.textAlign = 'left';
        ctx.fillStyle = 'rgba(201,162,75,.55)';
        ctx.fillText(e.name.replace(/^Ere\s+\w+\s*[—-]\s*/, '').toUpperCase(), Math.max(x0, 0) + 8 * dpr, 22 * dpr);
      }
    }
    // graduations d'années
    const portee = a1 - a0;
    const pas = portee > 2e6 ? 1e6 : portee > 2e5 ? 1e5 : portee > 30000 ? 5000 : portee > 6000 ? 1000 : portee > 1200 ? 200 : 50;
    ctx.font = `${10.5 * dpr}px Raleway, sans-serif`; ctx.textAlign = 'center'; ctx.fillStyle = 'rgba(131,119,95,.7)';
    for (let an = Math.ceil(a0 / pas) * pas; an <= a1; an += pas) {
      const x = X(an);
      ctx.fillRect(x, H - 26 * dpr, dpr, 6 * dpr);
      ctx.fillText(anStr(an) || '0', x, H - 8 * dpr);
    }
    // lanes + faits
    ctx.font = `${10 * dpr}px Raleway, sans-serif`; ctx.textAlign = 'left';
    for (const t of LANES) { ctx.fillStyle = 'rgba(131,119,95,.5)'; ctx.fillText(t, 6 * dpr, laneY(t) - 8 * dpr); }
    for (const f of faits) {
      const x = X(f.start_year);
      if (x < -10 || x > W + 10) continue;
      const y = laneY(f.fact_type);
      const actif = f === survole;
      ctx.beginPath(); ctx.arc(x, y, (actif ? 6 : 3.4) * dpr, 0, 7);
      ctx.fillStyle = actif ? '#f0d894' : (COUL_FAIT[f.fact_type] || '#83775f');
      ctx.globalAlpha = actif ? 1 : .8; ctx.fill(); ctx.globalAlpha = 1;
      if (f.end_year != null && f.end_year !== f.start_year) {
        ctx.strokeStyle = 'rgba(201,162,75,.3)'; ctx.lineWidth = 2 * dpr;
        ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(X(f.end_year), y); ctx.stroke();
      }
    }
    if (survole) {
      const x = X(survole.start_year), y = laneY(survole.fact_type);
      const txt = (survole.subjectName || '') + ' — ' + (survole.label || survole.fact_type) + ' (' + anStr(survole.start_year, survole.start_circa) + ')';
      ctx.font = `${12 * dpr}px Raleway, sans-serif`;
      const wTxt = ctx.measureText(txt).width;
      const bx = Math.min(Math.max(x - wTxt / 2 - 8 * dpr, 4 * dpr), W - wTxt - 20 * dpr);
      ctx.fillStyle = 'rgba(13,11,9,.92)';
      ctx.fillRect(bx, y - 34 * dpr, wTxt + 16 * dpr, 22 * dpr);
      ctx.strokeStyle = 'rgba(201,162,75,.4)'; ctx.lineWidth = dpr;
      ctx.strokeRect(bx, y - 34 * dpr, wTxt + 16 * dpr, 22 * dpr);
      ctx.fillStyle = '#ece4d4'; ctx.textAlign = 'left';
      ctx.fillText(txt, bx + 8 * dpr, y - 19 * dpr);
    }
  }
  peindre();
  cv.addEventListener('mousedown', (ev) => { drag = { x: ev.clientX, a0, a1, bouge: false }; cv.style.cursor = 'grabbing'; });
  addEventListener('mousemove', (ev) => {
    const box = cv.getBoundingClientRect();
    if (drag) {
      const dx = (ev.clientX - drag.x) / box.width * (drag.a1 - drag.a0);
      a0 = drag.a0 - dx; a1 = drag.a1 - dx;
      if (Math.abs(ev.clientX - drag.x) > 4) drag.bouge = true;
      peindre(); return;
    }
    if (ev.clientX < box.left || ev.clientX > box.right || ev.clientY < box.top || ev.clientY > box.bottom) return;
    const mx = (ev.clientX - box.left) * dpr, my = (ev.clientY - box.top) * dpr;
    let best = null, d2min = (14 * dpr) ** 2;
    for (const f of faits) {
      const x = X(f.start_year); if (x < 0 || x > W) continue;
      const y = laneY(f.fact_type);
      const d2 = (x - mx) ** 2 + (y - my) ** 2;
      if (d2 < d2min) { d2min = d2; best = f; }
    }
    if (best !== survole) { survole = best; cv.style.cursor = best ? 'pointer' : 'grab'; peindre(); }
  });
  addEventListener('mouseup', () => { const b = drag && drag.bouge; drag = null; cv.style.cursor = 'grab'; if (!b && survole && survole.subject_id) aller('#/fiche/' + survole.subject_id); });
  cv.addEventListener('wheel', (ev) => {
    ev.preventDefault();
    const box = cv.getBoundingClientRect();
    const frac = (ev.clientX - box.left) / box.width;
    const pivot = a0 + frac * (a1 - a0);
    const zoom = ev.deltaY < 0 ? 1 / 1.22 : 1.22;
    let n0 = pivot - (pivot - a0) * zoom, n1 = pivot + (a1 - pivot) * zoom;
    if (n1 - n0 < 40) return;                 // plancher : 40 ans
    if (n1 - n0 > 26e6) return;               // plafond : tout le cosmos
    a0 = n0; a1 = n1; peindre();
  }, { passive: false });
}

/* ── Démarrage ─────────────────────────────────────────────────────────── */
demarrerCiel();
route();
const retourHaut = $('#retourHaut');
addEventListener('scroll', () => retourHaut.classList.toggle('on', scrollY > 700));
retourHaut.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));
