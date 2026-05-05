---
tags: [index, implementation, unreal, navigation]
type: index
status: living-doc
last_review: 2026-05-01
needs_review_for: []
---

# 06 — Implémentation Unreal

> Documentation technique du client UE5 + backend OWS. **176 fichiers** organisés en 11 sous-dossiers thématiques.
>
> Chaque fichier porte un frontmatter `implements:` qui pointe vers la mécanique parente du GDD ([[03 - Mécaniques/Index|03 - Mécaniques]]) — c'est la traçabilité **GDD ↔ UE5**.

---

## Sous-dossiers

| Domaine | Index |
|---------|-------|
| Vue d'ensemble (portail, synthèse, index assets) | [[Vue d'Ensemble/Index]] |
| GAS, combat, combos, réactions élémentaires | [[Combat et Capacités/Index]] |
| Personnages, IA, animation, armures, dialogues | [[Personnages et Entités/Index]] |
| Inventaire, progression, quêtes, DataTables | [[Progression et Inventaire/Index]] |
| Météo, terrain, eau, biomes, ères, PCG, maps | [[Monde et Environnement/Index]] |
| Interactions, UI/HUD, inputs, widgets | [[Interaction et UI/Index]] |
| VFX Niagara, audio, matériaux, shaders | [[VFX Audio Rendu/Index]] |
| Framework, plugins, config, persistance | [[Framework et Plugins/Index]] |
| Backend OWS, microservices, SQL, login providers | [[Backend OWS/Index]] |
| Outils éditeur, scripts d'automatisation, MCP | [[Outils et Automation/Index]] |
| Audits transverses (réseau, perf, sécu, dette) | [[Audits/Index]] |

---

## Pivots clés

- [[Migration Accord]] — stratégie de migration parallèle XP/Level → Accord (pas de breaking change OWS, 6 phases A à F)
- [[HW Character]] — mapping 8 stats GDD ↔ attributs UE5
- [[HW Environment Manager]] — phase EraGenerator (cycle long Ères)
- [[HW Progression Component]] — moteur Héritage (couche 4 Accord)
- [[Quest System]] — récompenses refondues (`AccordGain`, `FHWHeritageGain`)

---

## Fichiers `implements:` non vides (traçabilité GDD↔UE)

```dataview
TABLE implements, status
FROM "05 - Implémentation Unreal"
WHERE implements AND length(implements) > 0
SORT file.name ASC
```

---

## Tous les fichiers du dossier (vue plate)

```dataview
TABLE status, last_review
FROM "05 - Implémentation Unreal"
WHERE file.name != "Index"
SORT file.folder ASC, file.name ASC
LIMIT 100
```

> Pour parcourir un domaine précis, ouvrir l'`Index.md` du sous-dossier correspondant.

---

*Liens : [[🏠 Hybelior]] | [[README_UE5]]*
