export const meta = {
  name: 'histoires-exhaustif',
  description: 'Passe exhaustive sur Docs/Lore/Histoires : chaque dirigeant nommé, chaque dynastie/lignée, chaque succession et lien familial, par continent',
  phases: [{ title: 'Histoires', detail: 'un agent par continent, exhaustif' }],
}

const KNOWN = '/tmp/claude-0/-home-user-HybeliorWorldSite/7accd542-73e3-5436-b3c2-572673da0020/scratchpad/lore/_known-entities.md'
const OUTDIR = '/tmp/claude-0/-home-user-HybeliorWorldSite/7accd542-73e3-5436-b3c2-572673da0020/scratchpad/lore'

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
connaissance (seule source de vérité du site personnel de worldbuilding de l'auteur).

AVANT TOUT : lis ${KNOWN} — les entités DÉJÀ dans le graphe. Réutilise EXACTEMENT
ces noms canoniques ; ne crée pas de doublon. Un dirigeant déjà connu peut quand même
recevoir de NOUVELLES relations (lignée, famille, succession) ou de NOUVEAUX faits.

MISSION — EXHAUSTIVITÉ :
  • CHAQUE dirigeant NOMMÉ dans les fiches (roi, reine, thane, archonte, conseil,
    abbé, oracle, chef de clan…) → entité personne + fait regne
    { fact_type:'regne', subject:<dirigeant>, object:<nation/royaume>, label:<titre + dates brutes> }.
  • CHAQUE dynastie / lignée / maison / clan NOMMÉ → entité lignee + relations
    membre-de (personne → lignee) et situe-dans (lignee → continent ou nation).
  • CHAQUE succession explicite → relation succede-a (successeur → prédécesseur).
  • CHAQUE lien familial explicite → parent-de / conjoint-de / fratrie-de / descend-de.
  • Fondations, chutes, batailles, traités, morts, couronnements → facts.
  • Ne saute AUCUN nom propre de personne : si la fiche le nomme, il sort dans le JSON.

SORTIE — un objet JSON { entities, relations, facts, notes } :
entities[] : { type, name, summary, data? } — type ∈ personne | lignee | lieu |
  entite-politique | evenement | concept | religion | espece | objet | terme | question.
  summary : 1-2 phrases factuelles (l'explicite de la fiche, rien d'autre).
relations[] : { rel_type, from, to } — rel_type ∈ parent-de | conjoint-de | fratrie-de |
  descend-de | membre-de | succede-a | gouverne | situe-dans | capitale-de | vassal-de |
  allie-de | en-guerre-avec | frontiere-avec | pratique | venere | fonde | schisme-de |
  apparait-dans | incarne | lie-a | a-ne-pas-confondre-avec | mentionne.
facts[] : { fact_type, subject, object?, start_year?, end_year?, circa?, label } —
  fact_type ∈ naissance | mort | regne | couronnement | fondation | chute | bataille |
  traite | frontiere | evenement | autre.

DATES — RÈGLE STRICTE (trois calendriers se mêlent dans ces fiches) :
  ne remplis start_year/end_year QUE si la date est ABSOLUE en ap.A / av.A
  (An 0 = l'Arrachement ; av.A = négatif). « du Sillage », année de règne locale,
  ou ambiguë → année à null, date brute TOUJOURS recopiée dans label. circa=true si ~.

notes[] : chaque INCOHÉRENCE repérée (dates contradictoires, nom orthographié
  différemment selon les fiches, succession impossible, doublon suspect, trou).
  Une phrase précise chacune, avec le nom du fichier. Liste vide si rien.

INTERDITS : n'invente rien ; ne tranche aucun mystère protégé (cause de l'Arrachement,
auteur de la Guerre de l'Ombre, sort d'Aldric Valthen, Panghor/Profondeur Première,
Mangeur de Temps) ; pas d'inférence spéculative (un « fils probable » n'est pas un parent-de).

Ta réponse finale EST l'objet JSON (schéma imposé).`

const CONTINENTS = ['Alkaran', 'Azoria', 'Baelor', 'Celethor', 'Cendara', 'Cestra', 'Endora', 'Evertia', 'Galenor', 'Ilthara', 'Onara', 'Ulinor']

phase('Histoires')
log(`Passe exhaustive Histoires : ${CONTINENTS.length} continents`)

const results = await parallel(CONTINENTS.map((c) => () =>
  agent(`SECTION : Histoires du continent ${c} — passe EXHAUSTIVE dirigeants & lignées.
Lis TOUS les fichiers .md du dossier \`/home/user/HybeliorWorldSite/Docs/Lore/Histoires/${c}/\`
(utilise Glob puis Read, fichier par fichier, en entier).
${RULES}`, { label: `histoires-${c}`, phase: 'Histoires', schema: SCHEMA, agentType: 'general-purpose' })
    .then((r) => ({ continent: c, ...(r || { entities: [], relations: [], facts: [], notes: [] }) }))
))

const ok = results.filter(Boolean)
const tot = ok.reduce((a, r) => ({
  e: a.e + (r.entities || []).length,
  rel: a.rel + (r.relations || []).length,
  f: a.f + (r.facts || []).length,
  n: a.n + (r.notes || []).length,
}), { e: 0, rel: 0, f: 0, n: 0 })
log(`Histoires : ${tot.e} entités, ${tot.rel} relations, ${tot.f} faits, ${tot.n} notes`)

return { sections: ok, totals: tot, outdir: OUTDIR }
