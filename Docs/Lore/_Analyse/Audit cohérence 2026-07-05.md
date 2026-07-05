---
tags: [audit, cohérence, journal-des-décisions, méta]
type: meta
status: final
date: 2026-07-05
---

# Audit de cohérence du lore — 5 juillet 2026
### Rapport final et journal des décisions

Audit ciblé mené avant l'écriture du tome 1 de la trilogie *Les Trois Coups* : colonne vertébrale
(Chronologie, 13 fichiers), croisements (Pays, Histoires, Religions, GDD Monde, index JSON),
et le livre 1 (*Les Chroniques de l'Exilé*, 40 chapitres) contre le canon. Chaque signalement
a été vérifié adversarialement (réfuter d'abord), puis corrigé mécaniquement ou arbitré.

## Bilan chiffré

| Étape | Nombre |
|---|---|
| Signalements bruts vérifiés | 360 |
| Fausses alertes écartées | 21 |
| **Ambiguïtés voulues préservées** (six lectures, traditions rivales) | 19 |
| Imprécisions mineures laissées | 52 |
| **Erreurs réelles confirmées** | **268** |
| — corrigées mécaniquement (orthographe, comptes, wikilinks, dates établies) | 128 |
| — arbitrées et corrigées (hiérarchie : Chronologie > majorité du corpus > plus petit retcon) | 169 + 6 déjà réglées |
| — laissées volontairement (fausses pistes à la vérification finale) | 3 |
| — escaladées → 8 décisions d'auteur (7 exécutées, 1 différée) | 11 |

## Journal des décisions structurantes

1. **Calendriers** : Arrachement = **An 0 du Sillage** (« Arrachement = -250 » était l'erreur).
   Double datation voulue conservée : an 251 du Sillage (temps vécu) = ~10 200 ap.A (temps profond d'Astravia).
2. **12 continents partout** ; Nysaria = petite île au large de Celethor ; Lunasar/Mirathi → Vytharia (Ilthara).
3. **Porte de Fer** : les deux Défenses coexistent — homonymie **commémorative voulue** (Yrelda, an 35-38,
   rejoue sciemment la défense d'Aldren IV, ~8 790-8 820 ap.A ; nom et gravure repris en connaissance de cause).
4. **Sarandel** : la ville des ch.15-16 du livre 1 n'est plus Thalmaris (Evertia reste le climax jamais atteint) —
   c'est un bourg endorien, foyer Cantus Mundi fondé par des Thalmariens exilés (« un morceau de Thalmaris déposé en Endora »).
5. **Deux astronomes** : Feraldir (jour 298, Haltheria) et Tiras (jour 415, Hekorinth) sont deux personnes ;
   seule la rétrospective du ch.24 a été retouchée.
6. **Skaldoria re-datée** : décalage uniforme +5 320 ans (colonne 4 240-4 880 → ~9 560-10 200 ap.A),
   écarts relatifs préservés, présent aligné sur l'arc Sorin.
7. **Vorrask** : la caldera/ville de Pyrevane est renommée (ex-« Mosrack ») ; la nation Mosrack d'Onara ne bouge pas.
8. **Guerre du Sable** : chronologie unique recalculée en préservant la relation Ander→Sethiran
   et l'âge de Sethiran au présent ; ce sont les ancres de la guerre qui ont bougé.
9. **Graphie** : **« Hybelior »** sans accent, partout (Docs + textes d'interface).
10. **DIFFÉRÉ (seul axe ouvert)** : datations religions (origines temps-profond vs schismes en Sillage) —
    les fichiers portent les drapeaux `needs_review [scission-religions-V4]` posés par l'auteur ; à trancher avec lui.

## Décisions du roman (tome 1, rappel)

Iveth = disciple réel resté en bas (huit silhouettes au sommet) · phrase-canon dite deux fois
(privée J-51, solennelle J-1) · Mont Cendra au sud de Cendara, Cendral à son pied · fenêtres-monde
achroniques · « clausule d'échappée » = signature (une par chapitre, en clausule) · logistique
« jamais huit ensemble avant le Mont ».

## Infrastructure

- **Source de vérité unique : `HybeliorWorldSite/Docs/`** (décision du 2026-07-05). `Documentation/GDD/`
  archivé dans `_Archive/GDD_perime-20260503_archive-20260705/` ; `sync-docs.ps1` neutralisé ;
  fichiers uniques sauvés (`Chroniques/_arc-sorin.md`, `Lore/_Analyse/`). Les archives se conservent (décision auteur).
- `_manifest.json` et `_search-index.json` régénérés après corrections (« Treize continents » éliminé).
- `lore-summary.md` (racine projet, hors site) : bandeau « périmé » posé ; à régénérer ou retirer.

*Rapport généré en session (audit multi-agents : 21 agents de lecture, 45 lots de vérification,
28 lots d'arbitrage, 7 exécutions de décisions). Détail par fichier dans les transcripts de session.*
