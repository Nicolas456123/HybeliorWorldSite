---
tags: [index, pnj, comportement, ia, système]
type: index
status: phase-2-livrée
last_review: 2026-05-02
needs_review_for: [phase-3-templates-métier, réécriture-ébauches-forgeron-boulanger, calibration-seuils-playtest]
aliases: [Comportements PNJ - Index]
---

# 🤖 Comportements PNJ — Index

> [!success] Statut : Phase 2 livrée (2026-05-01)
> **Phase 1 (Concepts Fondamentaux)** : ✅ 20 décisions D-PNJ-* tranchées — voir [[Concepts Fondamentaux IA PNJ]].
> **Phase 2 (Actions Situationnelles)** : ✅ fichier maître livré — voir [[Actions Situationnelles]].
>
> Les ébauches narratives originelles (Routine Quotidienne, Modes Sociaux, Métiers - Forgeron, Métiers - Boulanger) deviennent **des illustrations à réécrire** en Phase 3 selon le modèle posé par Actions Situationnelles.

> Hub d'entrée pour les **comportements** (IA / Behavior Trees) des PNJ d'Hybelior. Les PNJ d'Hybelior ne sont pas des piliers fixes : ils ont des routines, des métiers, des modes sociaux. Cette section pose les **templates de comportement** qui seront branchés sur les générateurs (NPC Generator + Behavior Generator de [[Architecture Data-Driven]]).
>
> Source canonique du cadrage : [[Cadrage Items Créatures PNJ - Brain Dump 2026-05-01]]

---

## Architecture en couches

| Couche | Contenu | Fichiers |
|--------|---------|----------|
| **Concepts fondamentaux** *(20 D-PNJ-* tranchées 2026-05-01)* | 20 décisions architecturales (modèle IA, cognition, mémoire, social, MBTI, etc.) | [[Concepts Fondamentaux IA PNJ]] ✅ |
| **Actions situationnelles** *(Phase 2 — fichier maître)* | Matrice contexte×action, 8 modes superposables, 18+ triggers, 8 catégories de réactions canoniques, modulation MBTI exhaustive | [[Actions Situationnelles]] ✅ |
| **Cadrage narratif** | Routine quotidienne générique + modes sociaux + métiers de base (ébauches) | [[Routine Quotidienne]] · [[Modes Sociaux]] · [[Métiers - Forgeron]] ⚠️ · [[Métiers - Boulanger]] ⚠️ |
| **Templates métier** *(Phase 3 — à mettre à jour selon Actions Situationnelles)* | 1 fichier par métier de PNJ (mapping vers les 63 [[Métiers]]). Les ébauches Forgeron/Boulanger sont à réécrire en branchant sur ce fichier maître. | À créer / réécrire |
| **Templates rôle social** *(Phase 3)* | Garde, Marchand itinérant, Enfant, Vagabond, Notable, Religieux, Sentinelle | À créer |
| **Templates événement** *(Phase 3)* | Réaction à l'attaque, à la fête, au Souffle, à la guerre | À créer |
| **Signatures / PNJ nommés** *(Phase 4)* | PNJ uniques avec identité narrative (par pays/ville) | Étalé |

## Structure d'un comportement

Tout comportement PNJ est un **arbre de tâches séquentielles ou parallèles**, parametré par :

- **Heures** (réveil, début/fin de travail, pause, coucher)
- **Lieux** (maison, lieu de travail, marché, tavernes)
- **Conditions** (présence d'un joueur, état de la quête, ère active)
- **Modes superposés** (file indienne, mode marchand, mode fuite)

## Liens canoniques

- [[Concepts Fondamentaux IA PNJ]] — **socle technique** (20 concepts tranchés)
- [[Actions Situationnelles]] — **fichier maître Phase 2** (matrice contexte×action, 8 modes, MBTI transverse)
- [[PNJ]] — concept général des PNJ d'Hybelior
- [[Architecture Data-Driven]] — NPC Generator + Behavior Generator (12 générateurs)
- [[Bestiaire - Index]] — recouvrement avec créatures Sapient
- [[Métiers]] — 63 métiers couverts par PNJ artisans
- [[Le Souffle]] — les comportements PNJ peuvent changer selon l'ère active

## Catalogue dynamique *(à activer après Phase 2)*

```dataview
TABLE rôle, métier, biome, ère_modulé, status
FROM "04 - Systèmes/Comportements PNJ"
WHERE type = "behavior" OR type = "behavior-template"
SORT file.name ASC
```

## Décisions ouvertes

- **Format formel des Behavior Trees** : narratif (markdown lisible) ou structuré (YAML/JSON exécutable) ? Recommandation : narratif pour le design + tag `bt_node:` pour la structure exécutable
- **Modes superposables** : combien de modes maximum un PNJ peut-il porter en parallèle ? (file indienne + mode marchand peuvent coexister par exemple)
- **Réactivité au Souffle** : un PNJ change-t-il de comportement quand l'ère change ? Si oui, comment paramétrer (template_par_ère ou modulation seul ?)
- **Granularité des heures** : ticks horaires (12 ticks/jour) ou continu (Time of Day MPC) ? Voir [[Architecture Data-Driven]] §Time of Day

---

*Liens : [[Routine Quotidienne]] · [[Modes Sociaux]] · [[Métiers - Forgeron]] · [[Métiers - Boulanger]] · [[PNJ]] · [[Architecture Data-Driven]]*
