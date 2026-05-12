---
tags: [item, archétype, ressource, fabriqué, intermédiaire, pigment, teinture]
type: archetype
category: Récolte
subcategory: Fabriqué
source: Fabriqué
métier_producteur: Teinturier
intrants_typiques: [Plante, Fleur, Minerai broyé, Coquille, Insectes (cochenille)]
craft_category: Alchimie | Tissage et confection (teinture)
métiers_consommateurs: [Teinturier, Tisserand, Couturier, Scribe (encres), Peintre, Maçon (briques colorées), Forgeron (gravure)]
tier_min: 1
tier_max: 5
era_availability: [toutes]
status: drafted
last_review: 2026-05-01
needs_review_for: [pigments-religieux-spécifiques, frontière-Pigment-Encre]
---

# 🎨 Archétype — Pigment

> Plante, fleur, minerai broyé, coquillage broyé ou cochenille **moulue, fixée, stabilisée** en poudre colorante. Intermédiaire **transversal** : teinture textile ([[Tissu]] §6), encres (Scribe — [[Parchemin]]), peinture (artistes), gravures ([[Épée à une main]] §6 affixe), briques colorées ([[Brique]]).

---

## 1. Vue d'ensemble

Le **Teinturier** prépare des pigments en broyant **plantes** (indigotier, garance), **fleurs** (safran), **minerais** (oxyde de fer, lapis-lazuli), **coquillages** (pourpre de murex), ou **insectes** (cochenille). Chaque source produit une couleur dominante et une stabilité différente. Les pigments fixés peuvent être stockés indéfiniment en pots.

**Rôle d'intermédiaire :**
- **Sortie** : 1 lot d'ingrédients colorants → 1 pot de pigment selon palier
- **Entrée** : **Teinture** ([[Tissu]] coloré, [[Plaque de verre]] vitraux), **Encres** (Scribe → [[Parchemin]]), **Peinture** (cosmétique — Phase 4), **Gravure** (forge décor, voir [[Épée à une main]] §6 affixe gravure), **Briques colorées** ([[Brique]] §2)

---

## 2. Variations / matériaux (familles de pigments)

| Famille | Source typique | Tier plancher | Couleurs typiques |
|---------|----------------|---------------|-------------------|
| **Pigments végétaux** | Indigotier, garance, curcuma, safran | T1 | Bleu, rouge, jaune, orange |
| **Pigments minéraux** | Oxyde de fer (rouge), lapis-lazuli (bleu), malachite (vert), ocre | T2 | Rouge brique, bleu profond, vert, jaune-brun |
| **Pigments animaux** | Cochenille (rouge), pourpre de murex, sépia | T2-T3 | Carmin, pourpre impérial, brun foncé |
| **Pigments précieux** | Lapis-lazuli pur, or finement moulu, argent | T3-T4 | Bleu royal, doré, argenté |
| **Pigments cosmiques** | Cristal de Voie broyé, Essence spirituelle, fleurs cosmiques | T4-T5 | Bleu Voie, doré-Voie, irisations |
| **Pigments d'ère** | Variants ère récoltés en ère active | T3-T5 | Couleurs propres à l'ère |

---

## 3. Tier × Qualité

| Tier | Nom | Source × | Liant × | Pots produits | Maîtrise | Durée |
|------|-----|----------|---------|----------------|----------|-------|
| T1 | Pigment commun | 4 | 1 (Liquide) | 1 | Novice | 90 s |
| T2 | Pigment façonné (fixé alun) | 4 | 1 + Alun × 1 | 1 | Initié | 180 s |
| T3 | Pigment œuvré (lapis, cochenille) | 4 (rare) | 1 + Alun × 2 | 1 | Adepte | 360 s |
| T4 | Pigment magistral (or moulu, Cristal de Voie broyé) | 2 + précieux | 1 + Essence × 1 | 1 | Expert | 720 s |
| T5 | Pigment légendaire (cosmique) | 2 + composant ère | 1 + Cristal de Voie × 1 | 0.5 | Maître | 1500 s |

> Pas de T6 : pigment plafonne T5. Au-delà = pigments-reliques scénarisés.

---

## 4. Recette de production

> Catégorie : **Alchimie** (broyage et fixation) ou **Tissage** (teinture appliquée). Station : **Mortier et pilon** + Bain de fixation + Pot.

### Recette canonique T2 — Pigment d'indigotier façonné

```yaml
tier: 2
métier: Teinturier
mastery_required: Initié
station: Mortier et pilon + Bain de fixation
intrants:
  - Plante (indigotier) × 4 (T1-T2)
  - Liquide (eau) × 1
  - Alun (Poudre fabriqué basique — voir [[Poudre fabriqué]]) × 1
durée: 180 s
mini_jeu: broyage_uniforme + dosage_alun
sortie: Pigment bleu × 1 pot (T2)
notes:
  - Sous-produit : Eau colorée (faible — usage cosmétique léger)
  - Échec dosage alun : pigment instable (T1) qui décolore au lavage
  - Proc Maître : 1.5 pot
```

### Recette signature — Pigment de Cristal de Voie magistral

```yaml
tier: 4
métier: Teinturier Expert + Alchimiste Adepte
mastery_required: Expert Teinture
station: Mortier rituel + Cercle d'enchantement (mini)
intrants:
  - Cristal de Voie mineur × 2 (broyé, T3-T4)
  - Liquide consacré × 1
  - Essence spirituelle × 1
  - Alun × 2
durée: 720 s (12 min)
mini_jeu: broyage + canalisation_Voie continue
sortie: Pigment Bleu de Voie × 1 pot (T4) — résonance Voie préservée pour broderies / encres magiques
```

---

## 5. Variants par ère

| Variant | Effet pigment |
|---------|----------------|
| **Verdoyant** | Pigment vivace : couleur s'intensifie avec le temps |
| **Brulé** | Pigment ambré : robes/encres vibrent en chaleur |
| **Frost** | Pigment glacé : couleur résiste au lavage glace |
| **Doré** | Pigment doré naturel : prestige permanent |
| **Onirique** | Pigment onirique : couleur change en rêve |
| **Vénérable** | Pigment runique : 1 rune brodable gratuite |
| **Pourpre** | Pigment brume : utilisé pour signalétique faction Umbra |
| **Spectral** | Pigment translucide : robes invisibles partielles |
| **Brisé** | Pigment RNG couleur (différente chaque application) |
| **Shadow** | Pigment noir profond : robes/encres absorbant la lumière |

---

## 6. Crafts / items destinés

| Destination | Type pigment | Quantité | Référence |
|-------------|--------------|----------|-----------|
| **Teinture textile** ([[Tissu]] colorée) | Tous types | 0.2 pot / m² | [[Tissu]] §6 |
| **Encres** (Scribe — [[Parchemin]], [[Tome]]) | Sépia, rouge, bleu, doré | 0.1 pot / fiole encre | [[Parchemin]], [[Tome]] |
| **Peinture artistique** (cosmétique, fresques) | Tous types | 0.5 pot / fresque, 1 pot / tableau | TBD Phase 4 |
| **Briques colorées** ([[Brique]] § variants) | Oxyde fer, ocre | 0.5 pot / lot 12 briques | [[Brique]] §2 |
| **Gravure forge** (décor [[Épée à une main]] T2+) | Or moulu, argent | 0.05 pot / arme | [[Épée à une main]] §6 |
| **Cosmétique facial** | Carmin, sépia, doré | 0.2 pot / pot maquillage | TBD |
| **Vitraux teintés** ([[Plaque de verre]]) | Lapis, oxyde, cochenille | 0.3 pot / plaque | [[Plaque de verre]] §6 |
| **Tatouage rituel** (religion, [[Personnage]]) | Indigotier, sépia | 0.05 pot / tatouage | TBD Phase 4 |
| **Bannières / oriflammes** | Or, pourpre, sépia | 1 pot / bannière | TBD Architecture Phase 4 |

---

## 7. Signatures notables

| Signature | Type | Provenance | Effet |
|-----------|------|------------|-------|
| **Pourpre d'Avalor** | Pourpre de murex T3 | Endora (côtes) | Robes royales, +Verbe en audience |
| **Lapis d'Hibel** | Lapis-lazuli T3 | Hibel (mines de l'académie) | Encres magiques, sceaux d'érudits |
| **Indigo de Cestra** | Indigotier T2 | Cestra (champs côtiers) | Standard textile commercial |
| **Cochenille de Galenor** | Cochenille T3 | Galenor (vergers) | Tabards de cour, prestige |
| **Sépia de Vytharia** | Sépia profond T2 (variant Shadow) | Vytharia (poulpes des cavernes) | Encres ancestrales, archives Vytharia |
| **Bleu de Voie d'Onara** | Cosmique T4 | Onara (forêts cosmiques) | Pigment magique, broderies focus |

---

## 8. Décisions ouvertes

- [ ] **Frontière Pigment / Encre** : encre = pigment + liant + véhicule. Proposition : **encre est un sous-produit de pigment** (avec [[Résine traitée]] comme liant), pas un archétype séparé
- [ ] **Pigments religieux spécifiques** : chaque religion a-t-elle ses couleurs canoniques ? Proposition : oui en Phase 4, avec association religion → pigment signature ([[Lore/Religions]])
- [ ] **Conservation** : pots fermés stables indéfiniment. Pigments d'ère persistent-ils hors-ère ? Proposition : oui une fois fixés à l'alun
- [ ] **Recyclage tissu teint** : récupération du pigment ? Proposition : non, fixation = irréversible (sauf décolorant alchimique en Phase 4)
- [ ] **Pigment cosmique T6** : pas T6, plafond T5 confirmé

---

*Liens : [[Items/Index|← Index Items]] · [[Sources de Ressources]] · [[Crafts]] · [[Métiers]] · [[Tissu]] · [[Parchemin]] · [[Brique]] · [[Plaque de verre]] · [[Poudre fabriqué]]*
