---
tags: [item, archétype, ressource, fabriqué, intermédiaire, farine, alimentaire]
type: archetype
category: Récolte
subcategory: Fabriqué
source: Fabriqué
métier_producteur: Meunier
intrants_typiques: [Céréale]
craft_category: Cuisine
métiers_consommateurs: [Boulanger, Pâtissier, Cuisinier, Brasseur]
tier_min: 1
tier_max: 5
era_availability: [toutes]
status: drafted
last_review: 2026-05-01
needs_review_for: [farine-magique-existence, conservation-humidité]
---

# 🌾 Archétype — Farine

> Céréale **moulue au moulin** en farine. Intermédiaire **alimentaire central** : pain, pâtisserie, plats préparés, bière. Le Meunier est le maillon économique entre Fermier et Boulanger.

---

## 1. Vue d'ensemble

Le **Meunier** prend des Céréales (Blé, Seigle, Orge, Avoine, voir [[Sources de Ressources]] §Nature) et les moud entre deux meules de pierre dans son **moulin**. La farine est ensuite **tamisée** en plusieurs qualités (farine grossière → fine → de luxe) selon le tamis utilisé.

**Rôle d'intermédiaire :**
- **Sortie** : 1 sac de céréale → 1-2 sacs de farine selon palier
- **Entrée** : Boulangerie ([[Pain]] §6 — recettes), Pâtisserie ([[Gâteaux]] §6), Cuisine (sauces, beignets), Brasserie (bière, voir [[Boisson]])

---

## 2. Variations / matériaux (céréales sources)

> Cohérent avec [[Sources de Ressources]] §Nature ligne Céréale.

| Céréale | Tier plancher | Farine produite | Usage principal |
|---------|---------------|------------------|------------------|
| **Blé** | T1 | Farine de blé | Pain blanc, pâtisserie standard |
| **Seigle** | T1 | Farine de seigle | Pain noir, robuste |
| **Orge** | T1 | Farine d'orge | Bière, galettes |
| **Avoine** | T1 | Farine d'avoine | Bouillie, biscuits |
| **Sarrasin** | T2 | Farine de sarrasin | Galettes nobles, pain dense |
| **Épeautre ancien** | T3 | Farine d'épeautre | Pain noble, pâtisserie haute |
| **Grain rituel** *(variant ère)* | T4 | Farine rituelle | Pain de bénédiction, Reconnaissance religieuse |
| **Grain cosmique** *(stub Phase 4)* | T5 | Farine cosmique | Pain qui persiste à travers les rêves |

---

## 3. Tier × Qualité

| Tier | Nom | Céréale × | Sacs farine produits | Maîtrise | Durée |
|------|-----|-----------|------------------------|----------|-------|
| T1 | Farine grossière | 4 | 1 | Novice | 60 s |
| T2 | Farine façonnée | 4 | 1.5 | Initié | 90 s |
| T3 | Farine œuvrée (fine, blanche) | 4 | 2 | Adepte | 180 s |
| T4 | Farine magistrale (noble, tamisée 3 fois) | 4 | 2 | Expert | 360 s |
| T5 | Farine légendaire (rituelle / cosmique) | 4 + composant ère | 2 + bénédiction | Maître | 720 s |

> Pas de T6 farine pure : la farine plafonne T5. Au-delà, on entre dans des farines-reliques (Phase 4, scénarisées).

---

## 4. Recette de production

> Catégorie : **Cuisine** ([[Crafts]] §3). Station : **Moulin à grain** (eau ou vent ou animal) + Tamis + Sacs.

### Recette canonique T2 — Farine de blé façonnée

```yaml
tier: 2
métier: Meunier
mastery_required: Initié
station: Moulin à grain + Tamis fin
intrants:
  - Céréale (blé) × 4 (T1-T2)
durée: 90 s
mini_jeu: rythme_meule (cadence régulière) + tamisage_uniforme
sortie: Farine de blé × 1.5 sac (T2)
notes:
  - Échec cadence : sortie 1 sac T1 + perte 1 céréale (en son)
  - Sous-produit : Son (récupérable, valeur basse — alimentation animale, Apothicaire fibres)
  - Proc Maître : 2 sacs sortie
```

### Recette signature — Farine rituelle légendaire

```yaml
tier: 5
métier: Meunier Maître + Prêtre Adepte (bénédiction de la mouture)
mastery_required: Maître Meunerie
station: Moulin à grain rituel + Tamis bénit + Cercle religieux mineur
intrants:
  - Grain rituel × 4 (récolté pendant ère religieuse)
  - Pigment doré × 1 (signature visuelle)
  - Eau bénite × 1 (Liquide consacré, voir [[Sources de Ressources]] §Liquide)
durée: 720 s (12 min — chaque rotation accompagnée d'invocation)
mini_jeu: rythme_meule + chant_rituel (canalisation Voie/foi)
sortie: Farine rituelle × 2 sacs (T5) — bénédiction Reconnaissance +X religion concernée
```

---

## 5. Variants par ère

| Variant | Effet farine |
|---------|---------------|
| **Verdoyant** | Farine vivace : pâte à pain régen +0.5 stamina/portion |
| **Frost** | Farine sèche : conservation ×3 |
| **Brulé** | Farine grillée : pain ambré, bonus dégâts feu mineur si lancé (loufoque) |
| **Doré** | Farine dorée : pâtisserie +20% prestige, prix revente |
| **Vénérable** | Farine runique : pain de bénédiction +Reconnaissance |
| **Onirique** | Farine onirique : pain persistant en rêve |
| **Spectral** | Farine translucide : pâtisserie cosmétique fantôme |
| **Pourpre** | Farine brume : pâtisserie signalétique faction |
| **Brisé** | Farine RNG : qualité variable par cuisson |
| **Shadow** | Farine noire : pain sombre, +discrétion ration nuit |

---

## 6. Crafts / items destinés

| Destination | Type farine | Quantité | Référence |
|-------------|-------------|----------|-----------|
| **Pain** ([[Pain]]) | Tous tiers | 1 sac → 4 pains | [[Pain]] §6 |
| **Gâteaux / pâtisserie** ([[Gâteaux]]) | T2+ farine fine | 1 sac → 6 gâteaux | [[Gâteaux]] §6 |
| **Pâtes alimentaires** | T2-T3 farine fine | 1 sac → 2 portions | TBD Cuisine |
| **Sauces / liaisons** | T1-T2 grossière | 0.1 sac / plat | TBD Cuisine |
| **Bière** ([[Boisson]] fermentée) | Farine d'orge | 2 sacs → 1 fût bière | [[Boisson]] §recettes |
| **Beignets / friture** | T2-T3 | 0.5 sac / portion | TBD Cuisine |
| **Pain de bénédiction** (rituel religion) | Farine rituelle T5 | 1 sac → 1 pain rituel | TBD Phase 4 religion |

---

## 7. Signatures notables

| Signature | Provenance | Effet |
|-----------|------------|-------|
| **Farine de Galenor** | Galenor (royaume méridional) | Standard pâtisserie haute, prestige cuisine de cour |
| **Farine d'épeautre d'Endora** | Endora | Pain noble royal, +10% magnitude buffs alimentaires |
| **Farine rituelle d'Avalor** | Endora (temples) | Pain de bénédiction, +Reconnaissance Concord |
| **Farine d'orge de Mosrack** | Mosrack | Brassage de bière, standard ouvrier |
| **Farine sombre de Vytharia** | Vytharia | Pain noir des cités-caves, +discrétion ration |
| **Farine cosmique d'Onara** | Onara (champs cosmiques) | Pain qui persiste en rêve (variant Onirique permanent) |

---

## 8. Décisions ouvertes

- [ ] **Conservation humidité** : la farine est sensible à l'humidité (moisissures). Proposition : conservation T1 = 30 jours sec, 5 jours humide ; sec en sacs scellés
- [ ] **Sous-produit Son** : confirmer comme ressource secondaire. Proposition : oui, valeur basse, débouché animaux + apothicaire (fibres)
- [ ] **Farine cosmique T6** : confirmer plafond T5 vs T6. Proposition : T5 max (la mouture est physique, pas cosmique au-delà)
- [ ] **Mouton-pierre vs mouton-eau** : meule à eau (rendement +20%) vs meule à vent (variabilité saisonnière) vs meule à âne (universel mais lent). Faut-il modéliser ? Proposition : oui en Phase 4 économie locale
- [ ] **Allergies / glutens** : Hybelior modélise-t-il les sensibilités alimentaires ? Proposition : non, hors-scope

---

*Liens : [[Items/Index|← Index Items]] · [[Sources de Ressources]] · [[Crafts]] · [[Métiers]] · [[Pain]] · [[Gâteaux]] · [[Boisson]]*
