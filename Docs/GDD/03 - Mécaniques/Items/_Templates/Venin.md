---
tags: [item, archétype, ressource, récolte, créature, venin, dépeçage, alchimie, poison]
type: archetype
category: Récolte
subcategory: Créature
source: Récolte sur créature
mastery: Dépéceur (sous-Maîtrise: Récolte glandulaire toxique)
métier_principal: Dépéceur
créatures_sources: [Serpent géant, Krill géant, Ruche d'insectes (soldat), Démon mineur]
métiers_consommateurs: [Apothicaire, Alchimiste, Distillateur, Assassin]
tier_min: 2
tier_max: 6
era_availability: [toutes]
status: drafted
last_review: 2026-05-01
needs_review_for: [karma-poison, venin-typologie-effets]
---

# 🐍 Venin — Archétype ressource créature

> Sécrétion **toxique offensive** des serpents, scorpions, araignées, certaines insectoïdes (soldats), démons. Récolte glandulaire dangereuse (palier 3+, sous-Maîtrise dédiée). Composant central des **poisons** (alchimie défensive ou Assassin offensive), **antidotes** (la dilution d'un venin sert à faire son propre antidote — cf. apothicaires d'Astravia).
>
> Voir [[Sources de Ressources]] §Récolte créature · [[Crafts]] §Alchimie · [[Bave]] · [[Sécrétion]]

---

## 1. Vue d'ensemble

Le **Venin** se distingue de la **Bave** (visqueuse non-toxique) et de la **Sécrétion** (glandulaire neutre) par sa **toxicité offensive**. Trois familles biologiques :

1. **Hémotoxique** — détruit le sang (vipères, certains démons) → potions saignement
2. **Neurotoxique** — paralysie, confusion (cobras, scorpions cosmiques) → potions Stun, Slow, Sommeil
3. **Cytotoxique** — nécrose tissulaire (serpent géant, soldat insectoïde) → poisons DOT

**Récolte délicate** : la glande à venin est dans la mâchoire (serpent), le dard caudal (scorpion), le dard buccal (insectoïde soldat), parfois l'aiguillon dorsal (démon). Manipulation = **risque de morsure résiduelle** (DOT 5/s 30 s si raté).

---

## 2. Variations / origines créatures

### Reptiles vénimeux
- [[Serpent géant]] (CR 7) : Venin cytotoxique (T3-T4), nécrose
- *Cobra géant* (à créer) : Neurotoxique, paralysie
- *Vipère cosmique* (à créer) : Hémotoxique

### Insectoïdes
- [[Ruche d'insectes]] : Venin de soldat (T2-T3), neurotoxique léger
- *Scorpion géant* (à créer) : Venin caudal (T3-T4)
- *Araignée géante* (à créer) : Venin paralysant (T3)

### Crustacés
- [[Krill géant]] : Mucus toxique abyssal (T3, sous-tag *bave* possible)

### Démons
- [[Démon mineur]] : Venin corrompu (T4, neurotoxique + Voie de Noctis)

### Cosmiques
- *Hydre temporelle* (Phase 4) : Venin chronotoxique (T6, conditions 🔒)

---

## 3. Tier × Qualité

| Tier | Source CR | Exemple | Usage typique |
|------|-----------|---------|---------------|
| **T2** | CR 2-4 | Venin d'insecte commun | Poison T1 (tutoriel Assassin) |
| **T3** | CR 5-9 | Venin de Serpent géant, Venin de soldat ruche | Poison Initié, antidote |
| **T4** | CR 10-13 | Venin de scorpion géant, Venin draconique | Poison Adepte, paralysie |
| **T5** | CR 14-20 | Venin de Reine ruche, Venin de démon majeur | Poison Maître |
| **T6** | CR 21+ | Venin cosmique signature | Conditions cachées 🔒 |

**Préservation** : Frais (<6 h, propriétés intactes) → Stabilisé en émulsion (24 h) → Cristallisé (Magistral, palier Apothicaire 4+).

---

## 4. Drop / Récolte

| Critère | Détail |
|---------|--------|
| **Métier** | Dépéceur (sous-Maîtrise *Récolte glandulaire toxique* — palier 3+ obligatoire) |
| **Palier minimum** | Adepte (T2-T3), Expert (T4-T5), Maître (T6) |
| **Outil requis** | Pince à venin + Fiole hermétique + **gants de protection** (sinon DOT) |
| **Drop rate** | 60 % sur créature vénimeuse (1-2 fioles) ; **× 0 sur créature blessée à la glande** |
| **Mini-jeu** | Pression précise sur la glande sans la percer ; un dérapage = morsure résiduelle (DOT 5/s 30 s) + perte fiole |
| **Modificateur** | × 1.5 vétéran ; × 2 reine/cosmique |

> **Récolte vivante (mulsion)** : on peut "traire" un serpent vivant pour récolter son venin sans le tuer. Cueilleur palier 4+ + Compagnon serpent (Phase 4). Drop régulier sans karma.

---

## 5. Modulation par variant cosmique

| Variant | Venin obtenu | Effet |
|---------|--------------|-------|
| **Shadow** | Venin d'ombre | DOT Voie de Noctis |
| **Spectral** | Venin translucide | DOT magique, ignore armure physique |
| **Frost** | Venin givré | Gel sur cible (Stun 1 s + DOT) |
| **Verdoyant** | Venin mousseux | Empoisonnement zone (lierres) |
| **Brulé** | Venin ardent | Brûlure stack 3 |
| **Pourpre** | Venin brumeux | Confusion + DOT |
| **Doré** | Venin doré | Paradoxe : soigne, ne tue pas (sacré) |
| **Brisé** | Venin fragmenté | DOT erratique (parfois soigne) |
| **Onirique** | Venin de songe | Sommeil profond (Somnix) |
| **Vénérable** | Venin runique | DOT divinatoire (révèle stats cible) |

---

## 6. Crafts destinés

| Métier | Usage | Ref |
|--------|-------|-----|
| **Apothicaire / Alchimiste** | **Poisons** (DOT, Stun, Slow, Sommeil), antidotes (dilution venin), élixirs ciblés | [[Crafts]] §Alchimie |
| **Distillateur** | Distillation venin pur (Magistral) | [[Crafts]] §Alchimie |
| **Assassin** (métier) | Application venin sur lame ([[Dague]], [[Rapière]]) | [[Crafts]] §Alchimie + métier Assassin |
| **Forgeron-armurier** | Lame enduite venin (Adepte+) | [[Crafts]] §Forge |

> [!warning] Karma poison
> L'utilisation de poison sur PNJ humanoïde **non hostile** = karma rouge. Sur créature ou hostile = neutre. Voir [[PvP]] §Karma.

---

## 7. Signatures notables

| Signature | Créature source | Usage canonique |
|-----------|-----------------|-----------------|
| **Venin de Sparutor** | Reptile signature Pyrtara (matche Os de Sparutor CSV) | Poison Magistral désertique, paralysie |
| **Venin de Reine de Ruche** | Reine signature ruche cosmique | Neurotoxique Magistral (assassinats nobles) |
| **Venin de l'Hydre Temporelle** | Hydre Phase 4 (cosmique) | Chronotoxique T6, conditions 🔒 |
| **Venin du Démon de Vael'Kurash** | Démon majeur signature Skaldoria | Voie de Noctis Magistral, rituel mortuaire |

---

## 8. Décisions ouvertes

- **Karma poison** : application sur PNJ = karma rouge ; sur créature = neutre. Confirmer en [[PvP]].
- **Sous-types** : 3 familles (hémo/neuro/cyto) — implémenter en frontmatter ?
- **Récolte vivante (mulsion)** : Compagnon serpent Phase 4. Drop régulier 1/jour.
- **Distillation Magistrale** : recette Distillateur palier 5+ — venin pur cristallisé.
- **Combinaison Venin + Sang** : super-poison Magistral ? À cadrer Phase 2.

---

*Liens : [[Sources de Ressources]] · [[Crafts]] · [[Bave]] · [[Sécrétion]] · [[Sang]] · [[Serpent géant]] · [[Ruche d'insectes]] · [[Démon mineur]] · [[Bestiaire - Index]]*
