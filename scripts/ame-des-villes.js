#!/usr/bin/env node
'use strict';
/*
 * scripts/ame-des-villes.js — L'âme des villes dans l'Atrium (volet ame-des-villes, demande d1935ad0e).
 *
 * Chaque lieu habité reçoit `data.ame` : sa raison d'être, ses coutumes (variantes locales de celles de sa nation, avec
 * leur raison pratique), la tension d'aujourd'hui, les mémoires disputées (la vérité de l'Atrium et les versions des
 * groupes d'habitants, chacune juste quelque part et fausse ailleurs), les rumeurs, les traces qu'on retrouve sur place,
 * les toponymes, les groupes d'habitants (dans le vocabulaire des habitants de Dédale : âge, classe, métier, rôle), leurs
 * répliques et les voisins. Les événements sont des faits datés du lieu, les figures des personnes ou des lignées liées
 * au lieu : la frise et la constellation de la fiche les montrent déjà.
 *
 * Une « fiche d'âme » (JSON) se verse dans data/kg-base.json ; les entités, faits et liens qu'elle crée sont notés dans
 * `data.ame.cree`, si bien qu'un second versement de la même fiche remplace le premier sans rien doubler. L'Atrium reste
 * la seule source : pour reprendre une âme, on l'extrait, on la corrige, on la reverse.
 *
 * Usage :
 *   node scripts/ame-des-villes.js verser <fiche.json>            verse (ou reverse) une fiche d'âme
 *   node scripts/ame-des-villes.js extraire <lie-xxxx>            redonne la fiche d'âme d'un lieu
 *   node scripts/ame-des-villes.js verifier [--detail] [lie-xxxx]  dosage, dates, traces, groupes, voisins, noms
 *   node scripts/ame-des-villes.js jeu <lie-xxxx> [sortie.json]   ce que le jeu lit (noms et dates résolus)
 * Après un versement : npm run kg:db.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const BASE = path.join(ROOT, 'data', 'kg-base.json');
const PRESENT = 10200; // an 251 du Sillage
const ERES = [ // bornes des ères, d'après leurs intitulés
  ['era3_lien_empires', -20000, 0], ['era5_grande_nuit', 0, 3000], ['era6_nations', 3000, 9500], ['era7_actuelle', 9500, PRESENT],
];
// Dosage par échelle (méthode du 31/10) : [min, max]
const DOSAGE = {
  'lieu-dit': { evenements: [0, 2], figures: [0, 2], coutumes: [0, 1], memoires: [0, 1], rumeurs: [0, 1] },
  hameau: { evenements: [1, 2], figures: [1, 2], coutumes: [0, 1], memoires: [0, 1], rumeurs: [0, 1] },
  bourg: { evenements: [1, 3], figures: [1, 3], coutumes: [1, 2], memoires: [1, 1], rumeurs: [0, 2] },
  ville: { evenements: [2, 4], figures: [2, 3], coutumes: [1, 2], memoires: [1, 2], rumeurs: [0, 2] },
  cite: { evenements: [3, 6], figures: [2, 5], coutumes: [1, 3], memoires: [1, 3], rumeurs: [0, 3] },
};
const CRITERES = ['age', 'classe', 'metier475', 'role', 'exterieur'];
const REPLIQUE_MAX = 220;
// mots trop communs pour signaler un doublon de nom
const MOTS_COMMUNS = new Set(['famille', 'familles', 'maison', 'lignee', 'tribu', 'grand', 'grande', 'gardien', 'gardienne', 'vieux', 'vieille', 'ancien', 'ancienne']);

const lire = () => JSON.parse(fs.readFileSync(BASE, 'utf8'));
const ecrire = (doc) => fs.writeFileSync(BASE, JSON.stringify(doc, null, 2) + '\n');
const maintenant = () => new Date().toISOString();
const ereDe = (an) => (ERES.find(([, a, b]) => an >= a && an < b) || ERES[ERES.length - 1])[0];
const norm = (s) => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

function prochainId(liste, prefixe) {
  let m = 0;
  for (const x of liste) if (x.id.startsWith(prefixe + '-')) m = Math.max(m, parseInt(x.id.slice(prefixe.length + 1), 10) || 0);
  return () => prefixe + '-' + String(++m).padStart(4, '0');
}

/* ── verser ───────────────────────────────────────────────────────────── */
function verser(fichier) {
  const fiche = JSON.parse(fs.readFileSync(fichier, 'utf8'));
  const doc = lire();
  const lieu = doc.entities.find((e) => e.id === fiche.lieu && e.type === 'lieu');
  if (!lieu) throw new Error('lieu introuvable : ' + fiche.lieu);
  const t = maintenant();
  const ancien = (lieu.data && lieu.data.ame && lieu.data.ame.cree) || { entites: {}, faits: {}, liens: [] };

  // 1. les faits et liens du versement précédent s'en vont (ils sont recréés)
  const fOld = new Set(Object.values(ancien.faits || {}));
  const lOld = new Set(ancien.liens || []);
  doc.facts = doc.facts.filter((f) => !fOld.has(f.id));
  doc.relations = doc.relations.filter((r) => !lOld.has(r.id));

  // 2. personnes et lignées : même identifiant pour la même clé
  const nouvPer = prochainId(doc.entities, 'per');
  const nouvLig = prochainId(doc.entities, 'lig');
  const cree = { entites: {}, faits: {}, liens: [] };
  for (const p of fiche.personnes || []) {
    const type = p.type || 'personne';
    let id = (ancien.entites || {})[p.cle];
    let e = id && doc.entities.find((x) => x.id === id);
    if (!e) {
      id = type === 'lignee' ? nouvLig() : nouvPer();
      e = { id, type, name: '', slug: null, summary: null, body: null, data: {}, status: 'canon', disclosure: 'public', created_at: t, updated_at: t };
      doc.entities.push(e);
    }
    Object.assign(e, { type, name: p.name, summary: p.summary || null, body: p.body || null, data: { ...(p.data || {}), ame: fiche.lieu }, updated_at: t });
    cree.entites[p.cle] = id;
  }
  // une clé disparue : l'entité part si plus rien d'autre ne la cite
  for (const [cle, id] of Object.entries(ancien.entites || {})) {
    if (cree.entites[cle]) continue;
    const citee = doc.facts.some((f) => f.subject_id === id || f.object_id === id) || doc.relations.some((r) => r.from_id === id || r.to_id === id);
    if (citee) console.warn(`  ${id} (${cle}) n'est plus dans la fiche mais reste cité ailleurs : gardé`);
    else doc.entities = doc.entities.filter((e) => e.id !== id);
  }
  const ref = (x) => (x == null ? null : x === 'lieu' ? fiche.lieu : cree.entites[x] || x);
  const existe = new Set(doc.entities.map((e) => e.id));
  const verifie = (id, ou) => { if (id && !existe.has(id)) throw new Error(`${ou} : ${id} introuvable`); return id; };

  // 3. faits datés
  const nouvFait = prochainId([...doc.facts, ...[...fOld].map((id) => ({ id }))], 'fac');
  const gardes = new Set((fiche.faits || []).map((f) => (ancien.faits || {})[f.cle]).filter(Boolean));
  const libres = [...fOld].filter((id) => !gardes.has(id)).sort();
  for (const f of fiche.faits || []) {
    const id = (ancien.faits || {})[f.cle] || libres.shift() || nouvFait();
    doc.facts.push({
      id, fact_type: f.fact_type || 'evenement',
      subject_id: verifie(ref(f.sujet || 'lieu'), 'fait ' + f.cle), object_id: verifie(ref(f.objet), 'fait ' + f.cle),
      start_year: f.start_year, start_precision: f.start_precision || 'estimation', start_circa: f.start_circa == null ? 1 : f.start_circa,
      end_year: f.end_year == null ? null : f.end_year, end_precision: f.end_year == null ? null : (f.end_precision || 'estimation'), end_circa: f.end_year == null ? 0 : 1,
      era_id: f.era_id || ereDe(f.start_year), seq: 0, label: f.label, detail: f.detail || null,
      data: { calendrier: 'absolu', methode: 'ame-des-villes', confiance: f.confiance || 'moyenne', indice_date: f.indice_date || null, ame: fiche.lieu },
      source_id: null, status: 'canon', disclosure: f.disclosure || 'public', created_at: t, updated_at: t,
    });
    cree.faits[f.cle] = id;
  }
  // un identifiant de fait libéré et non repris est rendu (rien ne le porte plus)

  // 4. liens : figures → lieu, voisins, liens libres
  const nouvLien = prochainId([...doc.relations, ...[...lOld].map((id) => ({ id }))], 'lnk');
  const libresL = [...lOld].sort();
  const lien = (rel_type, de, vers, label) => {
    const id = libresL.shift() || nouvLien();
    doc.relations.push({ id, rel_type, from_id: verifie(de, 'lien'), to_id: verifie(vers, 'lien'), start_year: null, end_year: null, label: label || null, data: { ame: fiche.lieu }, source_id: null, status: 'canon' });
    cree.liens.push(id);
  };
  for (const p of fiche.personnes || []) lien((p.lien && p.lien.rel_type) || 'lie-a', cree.entites[p.cle], fiche.lieu, p.lien && p.lien.label);
  for (const v of (fiche.ame && fiche.ame.voisins) || []) {
    const deja = doc.relations.some((r) => !cree.liens.includes(r.id) && ((r.from_id === fiche.lieu && r.to_id === v.id) || (r.from_id === v.id && r.to_id === fiche.lieu)));
    if (!deja) lien('lie-a', fiche.lieu, v.id, v.lien || 'voisine');
  }
  for (const l of fiche.liens || []) lien(l.rel_type, ref(l.de), ref(l.vers), l.label);

  // 5. data.ame : les clés deviennent des identifiants
  const ame = JSON.parse(JSON.stringify(fiche.ame));
  for (const f of ame.figures || []) { f.id = ref(f.ref); delete f.ref; }
  for (const ev of ame.evenements || []) ev.fait = cree.faits[ev.fait] || ev.fait;
  for (const m of ame.memoires || []) if (m.fait) m.fait = cree.faits[m.fait] || m.fait;
  if (ame.tension && ame.tension.parties) ame.tension.parties = ame.tension.parties.map(ref);
  ame.cree = cree;
  lieu.data = { ...(lieu.data || {}), ame };
  lieu.updated_at = t;
  doc._meta.updated_at = t;
  ecrire(doc);
  console.log(`${lieu.name} (${lieu.id}) : âme versée — ${Object.keys(cree.entites).length} figures, ${Object.keys(cree.faits).length} faits, ${cree.liens.length} liens.`);
  console.log('Ensuite : node scripts/ame-des-villes.js verifier ' + lieu.id + ' && npm run kg:db');
}

/* ── extraire : la fiche d'âme telle qu'on l'a versée ────────────────── */
function extraire(lieuId) {
  const doc = lire();
  const lieu = doc.entities.find((e) => e.id === lieuId);
  const ame = lieu && lieu.data && lieu.data.ame;
  if (!ame) throw new Error(lieuId + " n'a pas d'âme");
  const cree = ame.cree || { entites: {}, faits: {}, liens: [] };
  const cleDe = new Map([...Object.entries(cree.entites), ...Object.entries(cree.faits)].map(([k, v]) => [v, k]));
  const cle = (id) => (id === lieuId ? 'lieu' : cleDe.get(id) || id);
  const a = JSON.parse(JSON.stringify(ame));
  delete a.cree;
  for (const f of a.figures || []) { f.ref = cle(f.id); delete f.id; }
  for (const ev of a.evenements || []) ev.fait = cle(ev.fait);
  for (const m of a.memoires || []) if (m.fait) m.fait = cle(m.fait);
  if (a.tension && a.tension.parties) a.tension.parties = a.tension.parties.map(cle);
  const byId = new Map(doc.entities.map((e) => [e.id, e]));
  const personnes = Object.entries(cree.entites).map(([k, id]) => {
    const e = byId.get(id); const r = doc.relations.find((x) => cree.liens.includes(x.id) && x.from_id === id && x.to_id === lieuId);
    const data = { ...(e.data || {}) }; delete data.ame;
    return { cle: k, type: e.type, name: e.name, summary: e.summary, ...(e.body ? { body: e.body } : {}), data, lien: { rel_type: r ? r.rel_type : 'lie-a', label: r ? r.label : null } };
  });
  const faits = Object.entries(cree.faits).map(([k, id]) => {
    const f = doc.facts.find((x) => x.id === id);
    return { cle: k, fact_type: f.fact_type, sujet: cle(f.subject_id), objet: f.object_id ? cle(f.object_id) : null, start_year: f.start_year, start_circa: f.start_circa,
      ...(f.end_year != null ? { end_year: f.end_year } : {}), era_id: f.era_id, label: f.label, ...(f.detail ? { detail: f.detail } : {}), indice_date: f.data && f.data.indice_date, confiance: f.data && f.data.confiance };
  });
  const voisinsAuto = new Set((a.voisins || []).map((v) => v.id));
  const liens = doc.relations.filter((r) => cree.liens.includes(r.id)
    && !(r.to_id === lieuId && cree.liens.includes(r.id) && Object.values(cree.entites).includes(r.from_id))
    && !(r.from_id === lieuId && voisinsAuto.has(r.to_id)))
    .map((r) => ({ rel_type: r.rel_type, de: cle(r.from_id), vers: cle(r.to_id), label: r.label }));
  return { lieu: lieuId, ame: a, personnes, faits, liens };
}

/* ── verifier ─────────────────────────────────────────────────────────── */
function verifier(seul, detail) {
  const doc = lire();
  const byId = new Map(doc.entities.map((e) => [e.id, e]));
  const faitDe = new Map(doc.facts.map((f) => [f.id, f]));
  const lieux = doc.entities.filter((e) => e.type === 'lieu' && e.data && e.data.ame && (!seul || e.id === seul));
  const jetons = new Map(); // mot de nom (≥ 5 lettres) → entités
  for (const e of doc.entities) for (const w of norm(e.name).split(/[^a-z']+/)) if (w.length >= 5 && !MOTS_COMMUNS.has(w)) (jetons.get(w) || jetons.set(w, []).get(w)).push(e.id);
  let nErr = 0, nEcart = 0;
  for (const L of lieux) {
    const A = L.data.ame, err = [], ecart = [];
    const echelle = L.data.echelle === 'region' ? 'cite' : L.data.echelle || 'ville';
    const dos = DOSAGE[echelle] || DOSAGE.ville;
    const traces = new Map((A.traces || []).map((x) => [x.id, x]));
    const groupes = A.groupes || {};
    const utilise = new Set();
    const tracesDe = (quoi, liste) => {
      if (!(liste || []).length) err.push(`${quoi} : aucune trace sur place (règle 2)`);
      for (const id of liste || []) { if (!traces.has(id)) err.push(`${quoi} : trace « ${id} » inconnue`); utilise.add(id); }
    };
    if (!String(A.raison_d_etre || '').trim()) err.push("raison d'être absente");
    // dosage
    const evts = (A.evenements || []).filter((ev) => { const f = faitDe.get(ev.fait); return f && f.fact_type !== 'fondation'; });
    const compte = { evenements: evts.length, figures: (A.figures || []).length, coutumes: (A.coutumes || []).length, memoires: (A.memoires || []).length, rumeurs: (A.rumeurs || []).length };
    for (const [k, [a, b]] of Object.entries(dos)) if (compte[k] < a || compte[k] > b) ecart.push(`${k} : ${compte[k]} pour un(e) ${echelle} (attendu ${a} à ${b})`);
    if (['bourg', 'ville', 'cite'].includes(echelle) && !(A.tension && A.tension.texte)) err.push('tension absente');
    // événements : faits du lieu, dates dans l'histoire, écho du canon
    let echo = false;
    for (const ev of A.evenements || []) {
      const f = faitDe.get(ev.fait);
      if (!f) { err.push(`événement : fait ${ev.fait} introuvable`); continue; }
      if (![f.subject_id, f.object_id].includes(L.id)) err.push(`${f.id} ne porte pas sur ${L.name}`);
      if (f.start_year > PRESENT || (f.end_year != null && f.end_year > PRESENT)) err.push(`${f.id} : daté après le présent (${f.start_year})`);
      if (f.era_id && f.start_year != null && ereDe(f.start_year) !== f.era_id) err.push(`${f.id} : ${f.start_year} hors de ${f.era_id}`);
      if (ev.echo_de) { if (byId.has(ev.echo_de) || faitDe.has(ev.echo_de)) echo = true; else err.push(`${f.id} : écho de ${ev.echo_de} introuvable`); }
      tracesDe(`événement ${f.id}`, ev.traces);
    }
    if ((A.evenements || []).length && !echo) ecart.push("aucun événement n'est l'écho local d'un événement du canon (echo_de)");
    for (const c of A.coutumes || []) { if (!c.variante_de) ecart.push(`coutume « ${c.nom} » : de quelle coutume nationale est-elle la variante ?`); if (!c.raison) ecart.push(`coutume « ${c.nom} » : sans raison pratique`); tracesDe(`coutume « ${c.nom} »`, c.traces); }
    if (A.tension) tracesDe('tension', A.tension.traces);
    for (const m of A.memoires || []) {
      if (!(m.verite && String(m.verite.texte || '').trim())) err.push(`mémoire « ${m.sujet} » : sans vérité`);
      if ((m.versions || []).length < 2) err.push(`mémoire « ${m.sujet} » : moins de deux versions`);
      for (const v of m.versions || []) {
        if (!groupes[v.groupe]) err.push(`mémoire « ${m.sujet} » : groupe « ${v.groupe} » inconnu`);
        if (!v.dit || !(v.juste || v.faux)) err.push(`mémoire « ${m.sujet} », ${v.groupe} : il faut ce qui est dit, et où c'est juste ou faux`);
      }
      tracesDe(`mémoire « ${m.sujet} »`, m.traces);
    }
    for (const r of A.rumeurs || []) { if (!groupes[r.groupe]) err.push(`rumeur : groupe « ${r.groupe} » inconnu`); if (r.vraie === false && !r.correction) err.push('rumeur fausse sans ce qui la dément'); tracesDe('rumeur', r.traces); }
    for (const [id] of traces) if (!utilise.has(id)) ecart.push(`trace « ${id} » sans histoire : un décor (règle 2)`);
    // groupes et répliques
    const parGroupe = {};
    for (const r of A.repliques || []) {
      if (!groupes[r.groupe]) err.push(`réplique : groupe « ${r.groupe} » inconnu`);
      if (String(r.texte || '').length > REPLIQUE_MAX) ecart.push(`réplique trop longue (${r.texte.length} > ${REPLIQUE_MAX}) : ${r.texte.slice(0, 40)}…`);
      parGroupe[r.groupe] = (parGroupe[r.groupe] || 0) + 1;
    }
    for (const [g, def] of Object.entries(groupes)) {
      const crit = Object.keys(def.critere || {});
      if (!crit.length || crit.some((c) => !CRITERES.includes(c))) err.push(`groupe « ${g} » : critère à prendre parmi ${CRITERES.join(', ')}`);
      if (def.critere && def.critere.exterieur && !byId.has(def.critere.exterieur)) err.push(`groupe « ${g} » : lieu ${def.critere.exterieur} introuvable`);
      if (!parGroupe[g]) ecart.push(`groupe « ${g} » sans réplique`);
    }
    // figures et voisins
    for (const f of A.figures || []) {
      if (!byId.has(f.id)) { err.push(`figure ${f.id} introuvable`); continue; }
      if (!doc.relations.some((r) => (r.from_id === f.id && r.to_id === L.id) || (r.to_id === f.id && r.from_id === L.id))) err.push(`figure ${f.id} sans lien avec ${L.name}`);
    }
    if (!(A.voisins || []).length) ecart.push('aucun voisin (règle 3 : les villes se répondent)');
    for (const v of A.voisins || []) {
      const V = byId.get(v.id);
      if (!V || V.type !== 'lieu') { err.push(`voisin ${v.id} : pas un lieu`); continue; }
      if (V.data && V.data.ame && !(V.data.ame.voisins || []).some((x) => x.id === L.id)) ecart.push(`${V.name} a une âme mais ne parle pas de ${L.name}`);
    }
    // noms : les figures créées ne doivent pas faire doublon avec une entité existante
    for (const id of Object.values((A.cree && A.cree.entites) || {})) {
      const e = byId.get(id); if (!e) continue;
      for (const w of norm(e.name).split(/[^a-z']+/)) {
        if (w.length < 5 || MOTS_COMMUNS.has(w)) continue;
        const autres = [...jetons.entries()].filter(([k, ids]) => ids.some((x) => x !== id && !Object.values(A.cree.entites).includes(x)) && (k === w || (k.length >= 5 && (k.startsWith(w) || w.startsWith(k)))));
        for (const [k, ids] of autres) ecart.push(`nom « ${e.name} » proche de ${ids.filter((x) => x !== id).slice(0, 3).map((x) => byId.get(x).name).join(', ')} (${k})`);
      }
    }
    nErr += err.length; nEcart += ecart.length;
    console.log(`${err.length ? '✗' : ecart.length ? '~' : '✓'} ${L.name} (${L.id}, ${echelle}) : ${err.length} erreur(s), ${ecart.length} écart(s)`
      + ` — ${compte.evenements} événements, ${compte.figures} figures, ${compte.coutumes} coutumes, ${compte.memoires} mémoires, ${traces.size} traces, ${(A.repliques || []).length} répliques`);
    if (detail || seul) { for (const x of err) console.log('   erreur : ' + x); for (const x of ecart) console.log('   écart  : ' + x); }
  }
  const habites = doc.entities.filter((e) => e.type === 'lieu' && ['hameau', 'bourg', 'ville', 'cite'].includes((e.data || {}).echelle));
  console.log(`\n${lieux.length} âme(s) contrôlée(s) ; ${habites.filter((e) => e.data.ame).length} lieux habités sur ${habites.length} en ont une. ${nErr} erreur(s), ${nEcart} écart(s).`);
  return nErr;
}

/* ── jeu : ce que la ville raconte, prêt à lire ───────────────────────── */
function jeu(lieuId, sortie) {
  const doc = lire();
  const byId = new Map(doc.entities.map((e) => [e.id, e]));
  const L = byId.get(lieuId);
  const A = L && L.data && L.data.ame;
  if (!A) throw new Error(lieuId + " n'a pas d'âme");
  const faitDe = new Map(doc.facts.map((f) => [f.id, f]));
  const out = {
    _meta: { source: 'HybeliorWorldSite/data/kg-base.json (Atrium), data.ame de ' + lieuId, genere: maintenant(), outil: 'scripts/ame-des-villes.js jeu' },
    lieu: { id: L.id, nom: L.name, echelle: L.data.echelle, resume: L.summary },
    caractere: A.caractere || null, raison_d_etre: A.raison_d_etre,
    evenements: (A.evenements || []).map((ev) => { const f = faitDe.get(ev.fait); return { annee: f.start_year, environ: !!f.start_circa, fin: f.end_year, texte: f.label, traces: ev.traces || [] }; }).sort((a, b) => a.annee - b.annee),
    figures: (A.figures || []).map((f) => { const e = byId.get(f.id); return { id: f.id, nom: e.name, resume: e.summary, role: f.role, periode: e.data && e.data.periode }; }),
    coutumes: A.coutumes || [], tension: A.tension ? { ...A.tension, parties: (A.tension.parties || []).map((id) => ({ id, nom: (byId.get(id) || {}).name })) } : null,
    memoires: A.memoires || [], rumeurs: A.rumeurs || [], traces: A.traces || [], toponymes: A.toponymes || [],
    groupes: A.groupes || {}, repliques: A.repliques || [],
    voisins: (A.voisins || []).map((v) => ({ ...v, nom: (byId.get(v.id) || {}).name })),
  };
  const texte = JSON.stringify(out, null, 2) + '\n';
  if (sortie) { fs.mkdirSync(path.dirname(sortie), { recursive: true }); fs.writeFileSync(sortie, texte); console.log(`${L.name} → ${sortie}`); }
  else process.stdout.write(texte);
}

const [cmd, ...args] = process.argv.slice(2);
try {
  if (cmd === 'verser' && args[0]) verser(args[0]);
  else if (cmd === 'extraire' && args[0]) process.stdout.write(JSON.stringify(extraire(args[0]), null, 2) + '\n');
  else if (cmd === 'verifier') process.exitCode = verifier(args.find((a) => !a.startsWith('--')), args.includes('--detail')) ? 1 : 0;
  else if (cmd === 'jeu' && args[0]) jeu(args[0], args[1]);
  else { console.error('Usage : verser <fiche.json> | extraire <lie-xxxx> | verifier [--detail] [lie-xxxx] | jeu <lie-xxxx> [sortie.json]'); process.exitCode = 2; }
} catch (e) { console.error('✗ ' + e.message); process.exitCode = 1; }
