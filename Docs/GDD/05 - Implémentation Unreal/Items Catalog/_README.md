---
tags: [archive, templates, items, paramétriques]
type: archive-readme
status: archive
last_review: 2026-05-01
---

# _Templates — Archive paramétrique

> **Contenu** : 70+ fichiers archétypes paramétriques originaux issus de la Phase 2 (sprint 2026-05-01). Ces fichiers contiennent les **grilles tier × multiplicateurs**, les **affixes baseline**, les **variants cosmiques** et les **patterns de recettes** qui ont servi de **source canonique** au [[../Catalogue/_Index|Catalogue arborescent]] actuel.

> **Statut** : Conservés comme **template paramétrique de référence**. Pour la structure normative actuelle (catégories → sous-catégories → items concrets), voir [[../Catalogue/_Index|Catalogue]].

## Pourquoi conserver ces templates

1. **Source des chiffres canoniques** : table-pivot 6 tiers × 5 classes ([[Cuirasse]]), multiplicateurs ×1.0 → ×3.60, formule de défense effective, écarts armes mêlée, charges/recharges Tomes, etc.
2. **Catalogue d'affixes** : 13 affixes baseline mêlée 1H, affixes par classe d'armure, affixes potion, etc.
3. **10 variants cosmiques** mappés sur les ères canoniques (Shadow, Spectral, Frost, Verdoyant, Brulé, Pourpre, Doré, Brisé, Onirique, Vénérable).
4. **Patterns de recettes** : courbe d'intrants/durée, mini-jeux par catégorie de craft.
5. **Section §10 "Décisions ouvertes"** : chantiers à playtester (calibration chiffres, sets bonuses, conditions cachées Maître).

Les items concrets du Catalogue **héritent** de ces templates via le frontmatter `parent_archetype`. Le Recipe Generator de [[Architecture Data-Driven]] consultera ces templates pour générer les variations paramétriques.

## Mapping templates → catalogue

| Template archive | Nœud Catalogue | Items concrets |
|------------------|----------------|----------------|
| Épée à une main.md | [[../Catalogue/Armes/Mêlée 1H/Épée à une main/_Description]] | 6 items dont signatures CSV Cometfall, Ebony |
| Cuirasse.md | [[../Catalogue/Armures/Torse/Cuirasse/_Description]] | 6 items dont Sentinelle, Premier Veilleur |
| Potion.md | [[../Catalogue/Consommables/Potions/_Description]] | 5 items dont Élixir cosmique d'Aetheron |
| Anneau.md | [[../Catalogue/Accessoires/Anneaux/_Description]] | 5 items |
| Tome.md | [[../Catalogue/Focus magiques/Tomes/_Description]] | 5 items (1 par Voie principale) |
| Sac à dos.md | [[../Catalogue/Vêtements/Sacs à dos/_Description]] | 7 items dont 6 signatures CSV |
| Bois.md | [[../Catalogue/Ressources/Récolte Nature/Bois/_Description]] | 5 essences |
| Lingot.md | [[../Catalogue/Ressources/Fabriqué/Lingots/_Description]] | 6 lingots |
| Alliage.md | [[../Catalogue/Ressources/Fabriqué/Alliages/_Description]] | **9 signatures CSV** |
| Os.md | [[../Catalogue/Ressources/Récolte Créature/Os/_Description]] | **9 signatures CSV** + 1 commun |
| Écorce.md | [[../Catalogue/Ressources/Récolte Nature/Écorce/_Description]] | **6 signatures CSV** |
| ...etc. | ... | ... |

## Tous les templates archivés (alphabétique)

```dataview
LIST
FROM "03 - Mécaniques/Items/_Templates"
WHERE type = "archetype"
SORT file.name ASC
```

## Décision Phase 3 / Phase 4

- **Phase 3** : Recipe Generator + ItemModifier Generator consomment les templates pour générer les variations paramétriques (combinatoire matériaux × affixes × variants).
- **Phase 4** : Signatures continues (CSV ~65 items intégrés en Phase 2 ; ~30-40 supplémentaires par continent en Phase 4).

*Liens : [[../Catalogue/_Index|← Catalogue]] · [[../Index|← Index Items]] · [[Architecture Data-Driven]]*
