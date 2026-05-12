---
tags: [item, archétype, ressource, fabriqué, intermédiaire, cire, apiculture]
type: archetype
category: Récolte
subcategory: Fabriqué
source: Fabriqué
métier_producteur: Apiculteur / Apothicaire
intrants_typiques: [Miel (cire brute), Sève, Liquide]
craft_category: Alchimie (raffinage doux)
métiers_consommateurs: [Apothicaire, Bougier, Sculpteur, Scribe (sceaux), Parfumeur, Cosmétiste]
tier_min: 1
tier_max: 4
era_availability: [toutes]
status: drafted
last_review: 2026-05-01
needs_review_for: [bougie-archétype-séparé-vs-fini, conservation-cire]
---

# 🕯 Archétype — Cire raffinée

> Cire d'abeille extraite des rayons + Sève (épaississant) **fondue, filtrée, refroidie** en blocs standardisés. Intermédiaire fin : bougies, sceaux nobles, cosmétique, encaustique pour bois.

---

## 1. Vue d'ensemble

L'**Apiculteur** récolte le rayon de miel (qui contient à la fois Miel-liquide et cire brute des alvéoles). L'Apothicaire (ou l'Apiculteur Adepte+) raffine la cire en **fondant doucement, filtrant** les impuretés, **mélangeant éventuellement avec Sève** pour ajuster la dureté, puis **coulant en bloc** standardisé.

**Rôle d'intermédiaire :**
- **Sortie** : 1 rayon → 1-2 blocs de cire raffinée selon palier
- **Entrée** : Bougies (éclairage, religieux), Sceaux nobles (Scribes), Cosmétique (baumes, rouges à lèvres), Encaustique (bois — voir [[Planche]]), Encens (avec [[Résine traitée]])

---

## 2. Variations / matériaux

| Type | Source | Tier plancher | Usage principal |
|------|--------|---------------|------------------|
| **Cire jaune** | Miel commun | T1 | Bougies standards, encaustique |
| **Cire blanche** | Miel + double filtration | T2 | Bougies de prestige, sceaux |
| **Cire d'or** | Miel + Sève dorée + Pigment | T3 | Sceaux royaux, Reconnaissance |
| **Cire runique** | Miel + Pigment + Cristal de Voie broyé | T4 | Sceaux magiques, focus rituels |
| **Cire d'élixir** *(stub)* | Miel cosmique + Larme | T4 | Bougies oraculaires, focus rare |

---

## 3. Tier × Qualité

| Tier | Nom | Miel × | Sève × | Blocs produits | Maîtrise | Durée |
|------|-----|--------|--------|------------------|----------|-------|
| T1 | Cire jaune | 2 | 1 | 1 | Novice | 60 s |
| T2 | Cire blanche | 2 | 1 | 1 (double filtre) | Initié | 120 s |
| T3 | Cire d'or | 2 + Pigment × 1 | 1 | 1 | Adepte | 240 s |
| T4 | Cire runique | 2 + Pigment + Cristal × 1 | 2 | 1 (résonante) | Expert | 480 s |

> Pas de T5/T6 : cire plafonne T4. Au-delà = produit fini scénarisé (bougie de relique, etc.).

---

## 4. Recette de production

> Catégorie : **Alchimie** (raffinage doux). Station : **Marmite à fondre douce** + Filtre + Moule à blocs.

### Recette canonique T2 — Cire blanche

```yaml
tier: 2
métier: Apothicaire (ou Apiculteur Initié+)
mastery_required: Initié
station: Marmite à fondre douce + Filtre fin + Moule
intrants:
  - Miel × 2 (rayon avec cire — T1-T2)
  - Sève × 1
  - Liquide (eau) × 2
  - Charbon × 2 (chauffe douce)
durée: 120 s
mini_jeu: timing_température_douce + filtration_uniforme
sortie: Cire blanche × 1 bloc (T2)
notes:
  - Sous-produit : Miel pur (récupéré du rayon — valeur cuisine)
  - Échec : cire jaunâtre (T1) + impuretés
  - Proc Maître : 2 blocs sortie
```

### Recette signature — Cire runique magistrale

```yaml
tier: 4
métier: Apothicaire Expert + Enchanteur Adepte
mastery_required: Expert
station: Marmite à fondre + Cercle d'enchantement (mini)
intrants:
  - Miel × 2 (T3 — abeilles cosmiques)
  - Sève rituelle × 2
  - Pigment doré × 1
  - Cristal de Voie mineur × 1 (broyé)
  - Charbon × 4
durée: 480 s
mini_jeu: timing_température + canalisation_Voie continue
sortie: Cire runique × 1 bloc (T4) — bougies fonctionnent comme focus magique faible
```

---

## 5. Variants par ère

| Variant | Effet cire |
|---------|-------------|
| **Doré** | Cire dorée naturelle : prestige sceaux royaux |
| **Verdoyant** | Cire vivace : bougies durent +30% |
| **Brulé** | Cire ambrée : bougies +20% luminosité |
| **Frost** | Cire dure : bougies tenues même au froid extrême |
| **Onirique** | Cire onirique : bougies persistent en rêve |
| **Vénérable** | Cire runique pré-gravée : 1 rune mineure gratuite |
| **Pourpre** | Cire brume : bougies signalétiques faction |
| **Spectral** | Cire translucide : flamme presque invisible |
| **Brisé** | Cire RNG durée variable |
| **Shadow** | Cire noire : bougies furtives, faible-lumière |

---

## 6. Crafts / items destinés

| Destination | Type cire | Quantité | Référence |
|-------------|-----------|----------|-----------|
| **Bougie d'éclairage** (basique) | Jaune | 1 bloc → 4 bougies (8h chacune) | TBD Phase 4 architecture |
| **Bougie de prestige** | Blanche | 1 bloc → 2 bougies | TBD |
| **Sceau noble** (Scribe — [[Parchemin]] cachet) | Or, Runique | 0.1 bloc / sceau | [[Parchemin]] |
| **Cosmétique** (baume, lèvres, peau) | Blanche, Runique | 0.5 bloc / pot | TBD |
| **Encaustique** (entretien [[Planche]]) | Jaune | 0.2 bloc / m² bois | [[Planche]] |
| **Encens** (avec [[Résine traitée]]) | Blanche | 0.3 bloc / bâton encens | [[Résine traitée]] §6 |
| **Bougie rituelle** (religion) | Or, Runique | 1 bloc / bougie rituelle | TBD Phase 4 religion |
| **Lustrage de [[Tome]]** (reliure) | Jaune | 0.1 bloc / livre | [[Tome]] |

---

## 7. Signatures notables

| Signature | Type | Provenance | Effet |
|-----------|------|------------|-------|
| **Cire d'Avalor** | Cire d'or T3 | Endora | Sceaux royaux, +Reconnaissance Concord |
| **Cire blanche de Galenor** | Blanche T2 | Galenor | Bougies de cour, prestige civil |
| **Cire runique d'Hibel** | Runique T4 | Hibel (académie) | Bougies de focus, +Esprit en lecture/étude |
| **Cire dorée de Mosrack** | Or T3 | Mosrack (ruches collectives) | Sceaux marchands, certification commerce |
| **Cire d'ombre de Vytharia** | Variant Shadow | Vytharia | Bougies furtives, cités-caves |

---

## 8. Décisions ouvertes

- [ ] **Bougie comme archétype séparé** : la bougie est un **item fini** (consommable d'éclairage) — elle aura son propre archétype en Phase 4. Cet archétype Cire raffinée se limite à l'**intermédiaire**
- [ ] **Conservation** : cire stable, mais ramollit au-dessus de 40°C. Proposition : conservation indéfinie en climat tempéré, dégrade en zone volcanique
- [ ] **Recyclage bougies fondues** : récupération possible ? Proposition : oui, rendement 70%, perte de variant cosmique
- [ ] **Cire d'élixir T4 oraculaire** : confirmer existence — Proposition : oui mais comme **variant rituel** plutôt que tier supplémentaire
- [ ] **Sève dorée** : sous-type de Sève (Récolte Nature) ou ressource séparée ? Proposition : variant de Sève (Verdoyant ou Doré), pas un type distinct

---

*Liens : [[Items/Index|← Index Items]] · [[Sources de Ressources]] · [[Crafts]] · [[Métiers]] · [[Résine traitée]] · [[Parchemin]] · [[Tome]] · [[Planche]]*
