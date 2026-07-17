export const meta = {
  name: 'corpus-sweep',
  description: 'Balaye le corpus Hybelior (Pays, Religions, Chronologie, GDD/Monde, Chroniques, Romans) et extrait entités/relations/faits pour le graphe',
  phases: [{ title: 'Extraction', detail: 'un agent par section du corpus' }],
}

const KNOWN = '/tmp/claude-0/-home-user-HybeliorWorldSite/7accd542-73e3-5436-b3c2-572673da0020/scratchpad/lore/_known-entities.md'

const SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    entities: {
      type: 'array',
      items: {
        type: 'object', additionalProperties: false,
        properties: {
          type: { type: 'string' },
          name: { type: 'string' },
          summary: { type: 'string' },
          data: { type: 'object', additionalProperties: true },
        },
        required: ['type', 'name', 'summary'],
      },
    },
    relations: {
      type: 'array',
      items: {
        type: 'object', additionalProperties: false,
        properties: {
          rel_type: { type: 'string' }, from: { type: 'string' }, to: { type: 'string' },
        },
        required: ['rel_type', 'from', 'to'],
      },
    },
    facts: {
      type: 'array',
      items: {
        type: 'object', additionalProperties: false,
        properties: {
          fact_type: { type: 'string' },
          subject: { type: 'string' },
          object: { type: 'string' },
          start_year: { type: ['number', 'null'] },
          end_year: { type: ['number', 'null'] },
          circa: { type: 'boolean' },
          label: { type: 'string' },
        },
        required: ['fact_type', 'subject', 'label'],
      },
    },
    notes: { type: 'array', items: { type: 'string' } },
  },
  required: ['entities', 'relations', 'facts', 'notes'],
}

const RULES = `
CONTEXTE : Hybelior, monde de dark-fantasy en français. Tu peuples un graphe de
connaissance qui est la SEULE source de vérité d'un site personnel de worldbuilding.

AVANT TOUT : lis le fichier ${KNOWN} — la liste des entités DÉJÀ dans le graphe.
Réutilise EXACTEMENT ces noms canoniques quand une entité existe déjà ; ne crée pas
de doublon. Concentre-toi sur ce qui MANQUE ou complète ces entités.

SORTIE — un objet JSON { entities, relations, facts, notes } :

entities[] : { type, name, summary, data? }
  • type ∈ personne | divinite | lignee | lieu | entite-politique | evenement |
    concept | religion | espece | objet | terme | question | oeuvre
  • pour un lieu : data.echelle ∈ continent|region|nation|cite|ville|bourg|ruine|lieu-dit
  • pour une entite-politique : data.genre ∈ nation|civilisation|cite-etat|confederation|...
  • summary : 1 à 2 phrases FACTUELLES, uniquement l'explicite de la fiche.

relations[] : { rel_type, from, to }  (from/to = noms d'entités)
  • rel_type ∈ situe-dans | capitale-de | gouverne | vassal-de | allie-de |
    en-guerre-avec | frontiere-avec | pratique | venere | fonde | schisme-de |
    membre-de | apparait-dans | descend-de | parent-de | conjoint-de | fratrie-de |
    succede-a | incarne | lie-a | a-ne-pas-confondre-avec | mentionne
  • GÉOGRAPHIE (important) : chaque nation → situe-dans → son CONTINENT ;
    chaque cité/ville/village → situe-dans → sa NATION ; capitale → capitale-de → nation.
  • RELIGION : nation → pratique → religion ; religion → venere → divinité.

facts[] : { fact_type, subject, object?, start_year?, end_year?, circa?, label }
  • fact_type ∈ naissance|mort|regne|couronnement|fondation|chute|bataille|traite|
    frontiere|evenement|autre
  • DATES — RÈGLE STRICTE : ne remplis start_year/end_year QUE si la fiche donne une
    date ABSOLUE en ap.A / av.A (An 0 = l'Arrachement ; av.A = négatif). Si la date est
    « du Sillage », une année de règne LOCALE, ou ambiguë → laisse l'année à null et
    mets la date brute dans le libellé. circa=true si approximatif. TOUJOURS remplir label.

notes[] : les INCOHÉRENCES que tu remarques (dates qui se contredisent, un même nom
  écrit différemment d'une fiche à l'autre, un fait douteux, un trou). Une phrase chacune.
  Liste vide si rien.

INTERDITS :
  • N'invente RIEN. Uniquement l'explicite. Aucune inférence spéculative.
  • Mystères protégés : ne tranche jamais la cause de l'Arrachement, l'auteur de la
    Guerre de l'Ombre, le sort d'Aldric Valthen, l'identité du Panghor/Profondeur
    Première, le Mangeur de Temps. Garde ces flous au conditionnel (type question si utile).
  • Ne recopie pas les entités déjà connues juste pour les répéter : ajoute-les seulement
    si tu leur attaches une NOUVELLE relation ou un NOUVEAU fait.

Ta réponse finale EST l'objet JSON (schéma imposé).`

const PAYS = ['Alkaran', 'Azoria', 'Baelor', 'Celethor', 'Cendara', 'Cestra', 'Endora', 'Evertia', 'Galenor', 'Ilthara', 'Onara', 'Ulinor']

const sections = []
for (const c of PAYS) {
  sections.push({
    key: `pays-${c}`,
    prompt: `SECTION : Pays du continent ${c}.
Lis TOUS les fichiers .md du dossier \`Docs/Lore/Pays/${c}/\` (utilise Glob puis Read).
Extrais : les nations/entités-politiques et leur rattachement au continent ${c}
(situe-dans) ; leurs villes/villages/capitales (lieu + situe-dans → nation, capitale-de) ;
les religions pratiquées (pratique) ; les gouvernements et dirigeants nommés (personne) ;
les événements historiques marquants (fondation/chute/bataille + dates SI absolues) ;
les alliances/guerres/frontières entre nations. Le continent ${c} existe déjà comme lieu.
${RULES}`,
  })
}

sections.push({
  key: 'religions',
  prompt: `SECTION : Religions.
Lis TOUS les fichiers .md de \`Docs/Lore/Religions/\` ET \`Docs/Lore/Religions/_Mineures/\`.
Complète les religions déjà connues (résumés) et AJOUTE les religions mineures manquantes.
Extrais : ce que chaque religion vénère (venere → divinité) ; ses schismes (schisme-de) ;
son clergé/figures nommées (personne, membre-de) ; ses lieux saints (lieu) ; ses concepts
doctrinaux (concept/terme).
${RULES}`,
})

sections.push({
  key: 'chronologie',
  prompt: `SECTION : Chronologie (les Ères).
Lis TOUS les fichiers .md de \`Docs/Lore/Chronologie/\`.
Extrais les ÉVÉNEMENTS datés NON encore présents dans known-entities, avec leur date
ABSOLUE (ap.A / av.A) — ici les dates SONT canoniques et absolues, remplis start_year.
Extrais aussi les civilisations/peuples (espece/entite-politique) et concepts d'ère
manquants, et les relations situe-dans / succede-a pertinentes.
${RULES}`,
})

sections.push({
  key: 'gdd-monde',
  prompt: `SECTION : GDD — Monde & Continents.
Lis les fichiers .md de \`Docs/GDD/02 - Monde/\` (y compris le sous-dossier \`Continents/\`).
Extrais : la description canonique de chaque continent (enrichis les 13 lieux-continents) ;
les systèmes du monde (magie/Lien, climat, factions) comme concept/terme ; les grandes
entités géographiques (océans, chaînes, régions) comme lieu.
IMPORTANT : note explicitement dans notes[] si le corpus dit « douze continents » alors que
le graphe en a treize — et lequel des treize serait de trop / serait en fait une région.
${RULES}`,
})

sections.push({
  key: 'chroniques',
  prompt: `SECTION : Chroniques (voyage à travers le monde).
Lis \`Docs/Lore/Chroniques/_bible-v2.md\`, \`_resume.md\` et \`_arc-sorin.md\` en priorité
(fichiers de synthèse). Tu peux ouvrir quelques chapitres ciblés si un lieu/personnage
important n'est pas résumé. Extrais les lieux, cultures, personnages et événements NOMMÉS
absents de known-entities, avec leurs relations (situe-dans, pratique, apparait-dans).
${RULES}`,
})

for (const t of [
  { key: 'romans-T1', dir: 'T1 - La Septième Heure' },
  { key: 'romans-T2', dir: "T2 - L'Heure qui se Referme" },
  { key: 'romans-T3', dir: "T3 - L'Heure qui Naît" },
]) {
  sections.push({
    key: t.key,
    prompt: `SECTION : Roman ${t.dir}.
Lis les fichiers de SYNTHÈSE \`Docs/Lore/Romans/Les Trois Coups/${t.dir}/_bible.md\` et
\`_resume.md\` (ne lis PAS les 50+ chapitres un par un — les bibles suffisent).
Extrais les personnages, lieux, objets et événements NOMMÉS et canoniques absents de
known-entities, avec leurs relations (apparait-dans → l'œuvre du tome, parent-de, lie-a,
situe-dans). Rattache chaque nouveau personnage/objet à son tome via apparait-dans.
${RULES}`,
  })
}

phase('Extraction')
log(`Balayage du corpus : ${sections.length} sections`)

const results = await parallel(sections.map((s) => () =>
  agent(s.prompt, { label: s.key, phase: 'Extraction', schema: SCHEMA, agentType: 'general-purpose' })
    .then((r) => ({ key: s.key, ...(r || { entities: [], relations: [], facts: [], notes: [] }) }))
))

const ok = results.filter(Boolean)
const tot = ok.reduce((a, r) => ({
  e: a.e + (r.entities || []).length,
  rel: a.rel + (r.relations || []).length,
  f: a.f + (r.facts || []).length,
  n: a.n + (r.notes || []).length,
}), { e: 0, rel: 0, f: 0, n: 0 })
log(`Extraction terminée : ${tot.e} entités, ${tot.rel} relations, ${tot.f} faits, ${tot.n} notes`)

return { sections: ok, totals: tot }
