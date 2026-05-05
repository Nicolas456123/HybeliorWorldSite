---
tags: [item, archétype, ressource, fabriqué, intermédiaire, poudre, alchimie]
type: archetype
category: Récolte
subcategory: Fabriqué
source: Fabriqué
métier_producteur: Apothicaire / Alchimiste
intrants_typiques: [Minerai broyé, Plante broyée raffinée, Os broyé, Cristaux fins]
craft_category: Alchimie
métiers_consommateurs: [Alchimiste, Apothicaire, Teinturier (alun), Forgeron (fondant), Mage rituel]
tier_min: 1
tier_max: 5
era_availability: [toutes]
status: drafted
last_review: 2026-05-01
needs_review_for: [poudre-naturel-vs-fabriqué-frontière, poudre-explosive-existence]
---

# 🟫 Archétype — Poudre fabriqué

> Minerai, plante, os, cristal **broyé fin, tamisé, raffiné** en poudre stable. Distincte de la **Poudre naturel** (récolte directe — soufre volcanique, sel, etc.) qui est une [[Sources de Ressources|ressource Nature]]. La poudre fabriqué est **active** : elle a été *transformée* pour avoir une fonction (alun fixateur, fondant pour fonte, base de potion, projectile alchimique).

---

## 1. Vue d'ensemble

L'**Apothicaire** ou l'**Alchimiste** prend une matière première (minerai, plante, os, cristal) et la **broie au mortier**, **tamise** plusieurs fois pour ne garder que la fraction fine, puis **raffine** par lavage / chauffage léger / mélange. La poudre obtenue a une **fonction précise** définie par sa composition.

**Rôle d'intermédiaire :**
- **Sortie** : 1 lot de matière broyable → 1 sachet de poudre selon palier
- **Entrée** : Alchimie ([[Émulsion alchimique]] §recettes — composant solide), Teinture ([[Pigment]] §recette — alun fixateur), Forge ([[Lingot]] §recette — fondant), Rituels (Phase 4 magie), Projectiles alchimiques (poudre flash, poudre poison)

> **Frontière avec Poudre naturel** : la *Poudre naturel* (soufre, sel, sable noir volcanique) est **récoltée directement** dans le monde par le Mineur. La *Poudre fabriqué* est **produite** par broyage + raffinage. Une recette de poudre fabriqué peut **utiliser** une poudre naturel comme intrant (ex. soufre + plante = poudre alchimique active).

---

## 2. Variations / matériaux (familles)

| Famille | Source | Tier plancher | Fonction |
|---------|--------|---------------|----------|
| **Alun** (fixateur) | Minerai d'alun broyé | T1 | Fixation pigments, tannage cuir mineur |
| **Fondant** (forge) | Silice + cendre minérale | T1 | Aide fonte du minerai en lingot |
| **Poudre de plante raffinée** | Plante / Racine broyée + raffinage | T1 | Base de potion solide |
| **Poudre d'os** | Os broyé | T1 | Engrais, calcium alchimique |
| **Poudre cristalline** | Cristaux fins broyés | T2 | Composant alchimique, abrasif |
| **Poudre flash** | Soufre + Pigment + alcali | T3 | Projectile aveuglant (durée 2s) |
| **Poudre de Voie** | Cristal de Voie broyé fin | T4 | Composant alchimie magique |
| **Poudre cosmique** | Composant ère broyé | T5 | Rituels haut tier, focus |

---

## 3. Tier × Qualité

| Tier | Nom | Source × | Liant × | Sachets produits | Maîtrise | Durée |
|------|-----|----------|---------|-------------------|----------|-------|
| T1 | Poudre commune | 4 | 0 | 1 | Novice | 90 s |
| T2 | Poudre façonnée (tamisée) | 4 | 0 | 1.5 | Initié | 180 s |
| T3 | Poudre œuvrée (raffinée 3x) | 4 + Liquide × 1 | 0 | 1 | Adepte | 360 s |
| T4 | Poudre magistrale (Voie, flash haute) | 2 + composant rare | 1 | 1 | Expert | 720 s |
| T5 | Poudre légendaire (cosmique) | 2 + composant ère | 1 + Cristal mineur | 0.5 | Maître | 1500 s |

> Pas de T6 : poudre plafonne T5. Les composants au-delà sont des **émulsions** ou items finis scénarisés.

---

## 4. Recette de production

> Catégorie : **Alchimie** (broyage et raffinage). Station : **Mortier et pilon** + Tamis + Bain de lavage.

### Recette canonique T2 — Alun façonné

```yaml
tier: 2
métier: Apothicaire (ou Teinturier Initié)
mastery_required: Initié
station: Mortier et pilon + Tamis fin
intrants:
  - Minerai d'alun × 4 (T1-T2)
durée: 180 s
mini_jeu: broyage_uniforme + tamisage_3_passes
sortie: Alun × 1.5 sachet (T2)
notes:
  - Échec broyage : poudre grossière (T1, fixation faible)
  - Proc Maître : 2 sachets sortie
```

### Recette signature — Poudre de Voie magistrale

```yaml
tier: 4
métier: Alchimiste Expert
mastery_required: Expert Alchimie
station: Mortier rituel + Cercle d'enchantement (mini)
intrants:
  - Cristal de Voie mineur × 2 (T3-T4)
  - Liquide consacré × 1
  - Essence spirituelle × 1
durée: 720 s (12 min)
mini_jeu: broyage + canalisation_Voie continue + tamisage_5_passes
sortie: Poudre de Voie × 1 sachet (T4) — composant alchimie magique haut tier
```

---

## 5. Variants par ère

| Variant | Effet poudre |
|---------|---------------|
| **Verdoyant** | Poudre vivace : régen mineure quand mélangée |
| **Brulé** | Poudre inflammable : projectiles +DoT feu |
| **Frost** | Poudre congelante : projectiles ralentissent |
| **Doré** | Poudre dorée : prestige rituel |
| **Onirique** | Poudre onirique : rituels persistent en rêve |
| **Vénérable** | Poudre runique : 1 effet supp en rituel |
| **Pourpre** | Poudre brume : projectiles signalétiques |
| **Spectral** | Poudre translucide : poudre invisible jusqu'à activation |
| **Brisé** | Poudre RNG : effet ±30% par usage |
| **Shadow** | Poudre noire : rituels furtifs |

---

## 6. Crafts / items destinés

| Destination | Type poudre | Quantité | Référence |
|-------------|-------------|----------|-----------|
| **Émulsion alchimique** ([[Émulsion alchimique]] §recettes — composant solide) | Plante raffinée, Voie, cosmique | 0.3 sachet / émulsion | [[Émulsion alchimique]] §recettes |
| **Pigment fixé** ([[Pigment]] §recette — alun) | Alun | 0.2 sachet / pot pigment | [[Pigment]] §recette |
| **Fondant forge** ([[Lingot]] §recette) | Silice + cendre | 0.5 sachet / fonte | [[Lingot]] §recette |
| **Tannage cuir mineur** (sans résine) | Alun fort | 0.5 sachet / cuir | Voir Cuir Récolte Créature |
| **Projectile alchimique** (poudre flash, poison) | Flash, poison | 1 sachet / projectile | TBD Phase 4 |
| **Engrais agricole** | Os broyé | 1 sachet / champ | TBD Phase 4 agriculture |
| **Encens en poudre** (alternative à [[Résine traitée]]) | Plante raffinée + Voie | 0.3 sachet / bâton encens | [[Résine traitée]] §6 |
| **Composant rituel magique** (Mage rituel — Phase 4) | Voie, cosmique | 1 sachet / rituel | TBD Phase 4 Lien |

---

## 7. Signatures notables

| Signature | Type | Provenance | Effet |
|-----------|------|------------|-------|
| **Alun de Cestra** | Alun T2 | Cestra (mines côtières) | Standard fixateur, +5% durée pigment |
| **Fondant de Mosrack** | Fondant forge T2 | Mosrack | Standard métallurgie, -10% Charbon nécessaire |
| **Poudre de Voie d'Hibel** | Voie T4 | Hibel (académie) | Composant alchimie haut tier, focus magique |
| **Poudre flash de Vytharia** | Flash T3 | Vytharia (espionnage) | Projectile aveuglant, standard assassins |
| **Poudre cosmique d'Onara** | Cosmique T5 | Onara | Rituels oraculaires, focus haut |

---

## 8. Décisions ouvertes

- [ ] **Frontière Poudre naturel / Poudre fabriqué** : confirmer la règle. Poudre naturel = récoltée brute. Poudre fabriqué = transformée ou raffinée. Une **même substance** peut exister dans les deux états (soufre brut vs soufre raffiné). Préciser tags pour éviter confusion
- [ ] **Poudre explosive** : Hybelior modélise-t-il la poudre noire / explosifs ? Proposition : **non en Phase 2**, à trancher Phase 4 selon ton du monde (low-magic vs proto-renaissance)
- [ ] **Conservation** : poudres stables en sachets scellés. Poudres magiques (Voie, cosmique) perdent-elles résonance ? Proposition : non si scellé
- [ ] **Recyclage** : poudre dispersée = perte définitive. Confirmer
- [ ] **Poudre cosmique T6** : pas T6, plafond T5 confirmé

---

*Liens : [[Items - Index|← Index Items]] · [[Sources de Ressources]] · [[Crafts]] · [[Métiers]] · [[Émulsion alchimique]] · [[Pigment]] · [[Lingot]] · [[Résine traitée]]*
