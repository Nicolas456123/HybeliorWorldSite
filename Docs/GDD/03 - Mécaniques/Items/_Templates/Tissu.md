---
tags: [item, archétype, ressource, fabriqué, intermédiaire, tissu, textile]
type: archetype
category: Récolte
subcategory: Fabriqué
source: Fabriqué
métier_producteur: Tisserand
intrants_typiques: [Laine plante, Laine creature, Fil métallique (broderie haute)]
craft_category: Tissage et confection
métiers_consommateurs: [Tisserand, Couturier, Tailleur, Brodeur, Apothicaire (bandages), Relieur (livres)]
tier_min: 1
tier_max: 6
era_availability: [toutes]
status: drafted
last_review: 2026-05-01
needs_review_for: [soie-comme-récolte-créature-vs-fabriqué, signatures-nationales-Galenor-Ilthara]
---

# 🧶 Archétype — Tissu

> **Laine plante** ou **Laine creature** filée en fil, puis tissée en pièce de tissu. Intermédiaire textile **fondamental** : robes, capes, vêtements civils, voiles, tentures, bandages, reliures.

---

## 1. Vue d'ensemble

Le **Tisserand** prend une laine (végétale ou animale, voir [[Sources de Ressources]]), la file en fil au rouet, puis la tisse en pièce de tissu sur un métier à tisser. La pièce est l'**unité commerciale** : on parle en mètres carrés de tissu, on stocke en rouleaux, on commerce en pièces.

**Rôle d'intermédiaire :**
- **Sortie** : 1 brassée de laine → 1-3 pièces de tissu selon palier
- **Entrée** : Confection ([[Métiers|Couturier]] / [[Métiers|Tailleur]]) → robes, capes, vêtements ; Reliure → couverture de [[Tome]] ; Apothicairerie → bandages ; Architecture → tentures, voiles

---

## 2. Variations / matériaux

| Type | Source | Tier plancher | Note |
|------|--------|---------------|------|
| **Coton** | Laine plante (champ Fermier / Botaniste) | T1 | Standard, doux, tissu civil |
| **Lin** | Laine plante (lin cultivé) | T1 | Robuste, frais — tuniques, voiles |
| **Chanvre** | Laine plante | T1 | Très robuste, rustique — toile lourde, sacs |
| **Laine** | Laine creature (mouton-like) | T2 | Chaud, hiver — capes, vêtements toundra |
| **Soie** | Laine creature (chenilles fileuses) | T3 | Luxe, fluidité — robes nobles |
| **Soie de spectre** | Laine creature (créatures cosmiques Tempora) | T5 | Luxe magique, robes mages haut tier |
| **Tissu de Cœur de plante** | Cœur de plante filé | T4 | Tissu magique végétal, focus |
| **Bure rituelle** | Lin + Pigment + bénédiction | T2 | Robe monastique, +Reconnaissance religieuse |

> **Note canonique** : la **Soie** est dans [[Sources de Ressources]] §Créature comme une *Laine creature* spécifique. Elle est **récoltée** sur des chenilles fileuses (créatures du Bestiaire à venir Phase 4). Elle entre ensuite ici comme matière première du Tissu.

---

## 3. Tier × Qualité

| Tier | Nom | Laine × | Pièces produites (m²) | Maîtrise | Durée |
|------|-----|---------|------------------------|----------|-------|
| T1 | Toile commune | 4 | 1 | Novice | 240 s |
| T2 | Tissu façonné | 4 | 1.5 | Initié | 480 s |
| T3 | Tissu œuvré (soie standard) | 4 | 2 | Adepte | 900 s |
| T4 | Tissu magistral (soie noble + Fil métallique broderie) | 4 + Fil × 2 | 2 | Expert | 1500 s |
| T5 | Tissu légendaire (Soie de spectre, Cœur de plante) | 4 + variant ère | 2 + résonance | Maître | 2400 s |
| T6 | Tissu cosmique | 4 + composant ère + Cristal de Voie | 2 + variant permanent | Maître + 🔒 | 4800 s |

> **Règle de filage** : 4 unités de laine = 1 m² T1. Maîtrise n'augmente pas le rendement métrique mais réduit les défauts (grain, irrégularités). Maître = 0% défaut.

---

## 4. Recette de production

> Catégorie : **Tissage et confection** ([[Crafts]] §4). Stations : **Rouet** (filage) → **Métier à tisser** (tissage). Deux étapes pour produire 1 pièce.

### Recette canonique T2 — Tissu de lin façonné

```yaml
tier: 2
métier: Tisserand (ou Fileur Initié + Tisserand Initié)
mastery_required: Initié
station: Rouet + Métier à tisser
intrants:
  - Laine plante (lin) × 4 (T1-T2)
  - Fil métallique × 0 (basique)
durée: 480 s (240 filage + 240 tissage)
mini_jeu: cadence_rouet (étape 1) + cadence_métier_tisser (étape 2, 4 trames)
sortie: Tissu de lin × 1.5 m² (T2)
notes:
  - Échec cadence : pièce T1 + 1 m² seulement
  - Proc Maître : 2 m² sortie + qualité T3 possible
```

### Recette signature — Tissu de Soie de spectre légendaire

```yaml
tier: 5
métier: Tisserand Maître + Brodeur Expert
mastery_required: Maître Tissage
station: Rouet d'argent + Métier à tisser rituel + Cercle d'enchantement (mini)
intrants:
  - Soie de spectre × 4 (récolte créatures Tempora — T4-T5)
  - Fil de Bliysium × 2 (broderie magique — voir [[Fil métallique]])
  - Pigment rare × 1 (couleur fixée par bénédiction)
  - Essence spirituelle × 1
durée: 2400 s (40 min)
mini_jeu: cadence_rouet + cadence_métier_tisser + canalisation_Voie continue + précision_broderie
sortie: Tissu de Soie de spectre × 2 m² (T5) — résonance Voie préservée
```

---

## 5. Variants par ère

| Variant | Effet tissu |
|---------|--------------|
| **Verdoyant** | Tissu vivant : régen HP +0.2%/s en porter |
| **Frost** | Tissu glacé permanent : +résistance givre, isolation +20% |
| **Brulé** | Tissu ambré : +résistance feu, +5% dégâts feu sur sort lancé |
| **Spectral** | Tissu translucide : -10% détection en faible-lumière |
| **Onirique** | Tissu persiste en rêve : robes mage rêve-cohérentes |
| **Vénérable** | Tissu runique : 1 rune brodée gratuite |
| **Pourpre** | Tissu brume : aura brume légère |
| **Doré** | Tissu doré : +Verbe en porte-audience |
| **Brisé** | Tissu RNG : variant aléatoire chaque jour |
| **Shadow** | Tissu noir mat : -10% détection visuelle |

---

## 6. Crafts / items destinés

| Destination | Type tissu | Quantité (m²) | Référence |
|-------------|------------|----------------|-----------|
| Robe de mage ([[Sceptre]] usage) | Tissu T3+ Soie / Cœur de plante | 3-5 m² | TBD |
| Cape ([[Bottes]]…) | Lin, Laine, Soie | 2-4 m² | TBD |
| Tunique civile / vêtement | Coton, Lin, Chanvre | 2-3 m² | TBD |
| Tabard de garde | Lin teinté | 1-2 m² | TBD |
| Bandage ([[Potion]] auxiliaire / Apothicaire) | Coton T1 | 0.5 m² / bandage | [[Potion]] |
| Reliure de [[Tome]] / [[Livre Récipient]] | Lin, Soie | 0.5 m² / livre | [[Tome]] |
| Voile, tenture (architecture) | Lin, Coton | 5-50 m² | Branche Architecture |
| Sac à dos ([[Sac à dos]]) | Lin, Chanvre + Cuir | 1-2 m² | [[Sac à dos]] |
| Robe rituelle (religieuse) | Bure, Soie blanche | 3-5 m² | TBD Phase 4 religion |

---

## 7. Signatures notables

| Signature | Type | Provenance | Effet narratif |
|-----------|------|------------|-----------------|
| **Lin doré de Galenor** | Lin teinté T3 | Galenor (royaume méridional) | Tabards de cour, +5 Verbe en audience royale |
| **Soie spectrale d'Ilthara** | Soie de spectre T5 | Ilthara (cité-monastère Tempora) | Robes mages spectrales, +10 Esprit |
| **Coton blanc de Cestra** | Coton T2 | Cestra (cité-port) | Standard commercial, +5% prix revente |
| **Bure noire de Vytharia** | Bure T2 (variant Shadow) | Vytharia | Robe d'espion, -10% détection |
| **Tissu de Cœur d'Onara** | Cœur de plante tissé T4 | Onara (forêts cosmiques) | Robe focus magique végétale, regen Mana |
| **Soie d'Avalor** | Soie noble T3 | Endora | Robes royales, prestige Reconnaissance |

---

## 8. Décisions ouvertes

- [ ] **Soie comme récolte créature vs fabriqué** : la Soie est listée comme Laine creature dans Sources, donc **récolte** (pas fabriquée). Ici elle est consommée comme intrant pour Tissu de Soie. Confirmer : Soie = récolte créature → file → tissée. Pas un fabriqué intermédiaire séparé
- [ ] **Tissu cosmique T6** : confirmer existence. Proposition : oui, intégrant Cristal de Voie + composant ère = robe-relique
- [ ] **Recyclage** : tissu déchiré récupérable en chutes ? Proposition : oui, rendement 50% en bandages (T1)
- [ ] **Brodeur métier séparé** : actuellement sous Tisserand. Proposition : Brodeur = sous-spécialité Tisserand palier Adepte+, pas métier indépendant
- [ ] **Bure rituelle T2** : faut-il un tag *bénédiction religieuse* qui modifie selon religion pratiquée ? Proposition : oui en Phase 4, lié à [[Lore/Religions]]

---

*Liens : [[Items - Index|← Index Items]] · [[Sources de Ressources]] · [[Crafts]] · [[Métiers]] · [[Fil métallique]] · [[Pigment]] · [[Sceptre]] · [[Tome]] · [[Sac à dos]]*
