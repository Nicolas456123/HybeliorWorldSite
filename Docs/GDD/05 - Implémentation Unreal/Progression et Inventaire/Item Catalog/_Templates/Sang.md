---
tags: [item, archétype, ressource, récolte, créature, sang, dépeçage, alchimie, rituel]
type: archetype
category: Récolte
subcategory: Créature
source: Récolte sur créature
mastery: Dépéceur (sous-Maîtrise: Saignée)
métier_principal: Dépéceur
créatures_sources: [Loup forestier, Ours brun, Sanglier, Cerf majestueux, Aigle royal, Faucon, Krill géant, Truite mystique, Serpent géant, Dragon nain, Démon mineur, Élémentaire de feu, Ruche d'insectes, Slime amorphe]
métiers_consommateurs: [Apothicaire, Alchimiste, Tanneur, Enchanteur]
tier_min: 1
tier_max: 6
era_availability: [toutes]
status: drafted
last_review: 2026-05-01
needs_review_for: [drop-rates-playtest, sang-tannins-tannage, sang-rituel-karma]
---

# 🩸 Sang — Archétype ressource créature

> Liquide vital de quasi toutes les créatures, prélevé en fioles. **Composant alchimique très commun** (intrant de toute Émulsion alchimique de base), **tannin de tannage** (préservation cuir), **rituel** (cercles d'enchantement, pactes magiques). Pour les créatures cosmiques, le Sang est en réalité un **plasma magique** signature (voir [[Élémentaire de feu]] §Sang).
>
> Voir [[Sources de Ressources]] §Récolte créature · [[Crafts]] §Alchimie §Travail du cuir · [[Cœur de creature]]

---

## 1. Vue d'ensemble

Le **Sang** est l'une des ressources créature **les plus polyvalentes** :
1. **Alchimie de base** — intrant de la majorité des Émulsions, potions de couleur (rouge, noir, brun selon créature)
2. **Tannage** — certains sangs riches en tannins (sang d'ours, sang de cerf) accélèrent le tannage du cuir, donnant une **patine signature**
3. **Rituel & Enchantement** — Sang dans cercles d'enchantement (Voie de Noctis, Voie de Spiritus), pactes magiques
4. **Préservation organes** — fiole de Sang garde les organes/yeux frais 6-12 h supplémentaires

**Sang biologique vs Plasma cosmique** :
- **Sang biologique** (mammifères, reptiles, aviens) — rouge, fer, glucose
- **Sang spirituel** (spectres, démons) — noir, glycérine magique, conducteur Voie
- **Plasma magique** (élémentaires) — variable selon élément, condensé d'énergie pure
- **Gel** (slimes) — pas de sang à proprement parler, mais une substance équivalente

---

## 2. Variations / origines créatures

### Mammifères (drop massif)
- [[Loup forestier]], [[Ours brun]], [[Sanglier]], [[Cerf majestueux]] : Sang rouge standard, tannage + alchimie commune
- **Sang d'alpha** = composant rare (× 1.5 efficacité)

### Aviens
- [[Aigle royal]], [[Faucon]] : Sang léger, alchimie aérienne

### Aquatiques & Reptiles
- [[Truite mystique]] : Sang magique aquatique (T2)
- [[Serpent géant]] : Sang chargé venin (alchimie de poison — voir [[Venin]])
- [[Dragon nain]] : Sang draconique (T5+, conducteur Voie de Feu majeur)
- [[Krill géant]] : Hémolymphe abyssale

### Démoniaque & Cosmique
- [[Démon mineur]] : Sang noir (conducteur Voie de Noctis)
- [[Élémentaire de feu]] : **Plasma magique** (T4-T5, intrant Émulsion T5)
- [[Slime amorphe]] : Gel (substitut de sang)

---

## 3. Tier × Qualité

| Tier | Source CR | Exemple | Usage typique |
|------|-----------|---------|---------------|
| **T1** | CR 1-3 | Sang de petit gibier | Alchimie commune |
| **T2** | CR 4-7 | Sang de loup, Sang de cerf | Tannage signature, émulsion Initié |
| **T3** | CR 8-12 | Sang d'ours, Sang d'aigle alpha | Émulsion Adepte, rituel Initié |
| **T4** | CR 13-18 | Sang draconique, Sang de démon | Émulsion Maître, rituel Adepte |
| **T5** | CR 19-24 | Plasma d'Élémentaire, Sang signature | Émulsion Magistrale, rituel Expert |
| **T6** | CR 25+ | Plasma cosmique signature | Conditions cachées 🔒 |

**Quantité par créature** : 1-3 fioles standard ; jusqu'à 8 fioles sur colosse alpha.

**Préservation** : Frais (<2 h) → Salé/Conservé (+24 h) → Cristallisé (+ Magistral, palier Apothicaire 4+).

---

## 4. Drop / Récolte

| Critère | Détail |
|---------|--------|
| **Métier** | Dépéceur (sous-Maîtrise *Saignée*) |
| **Palier minimum** | Novice (T1-T2), Initié (T3), Adepte (T4), Expert (T5+), Maître (T6) |
| **Outil requis** | Couteau de saignée + **Fiole équipée** (sinon le sang se perd au sol) |
| **Drop rate** | 80 % (1-3 fioles standard) ; **× 0 sans fiole** |
| **Mini-jeu** | Trancher la jugulaire au bon angle ; angle raté = écoulement contaminé (T-1) |
| **Modificateur** | × 1.5 alpha/colosse ; × 2 cosmique ; **× 0 si récolte >30 min après mort** (coagulation) |

> **Saignée vivante** : récolte sur créature **vivante** (apprivoisée, voir Phase 4 Compagnons) = drop régulier sans tuer. Bonus karma + qualité préservée. Limite : 1 fiole par jour par créature.

---

## 5. Modulation par variant cosmique

| Variant | Sang obtenu | Effet |
|---------|-------------|-------|
| **Shadow** | Sang d'ombre | Conducteur Voie de Noctis Magistral |
| **Spectral** | Sang fantomatique | Conducteur Voie de Tempora Magistral |
| **Frost** | Sang givré | Ne coagule pas, conservé indéfiniment |
| **Verdoyant** | Sang mousseux | Régen passive sur cible (alchimie soin) |
| **Brulé** | **Plasma de Flamme** (canonique pour Élémentaire) | Intrant Acier Éternel, focus Voie de Feu |
| **Pourpre** | Sang brumeux | Inflige Confusion sur usage |
| **Doré** | Sang doré | Sacré, soigne, dispel corruption |
| **Brisé** | Sang fragmenté | Effets erratiques |
| **Onirique** | Sang de songe | Inflige Sommeil sur cible (Somnix) |
| **Vénérable** | Sang runique | Inscriptions natives, divinatoire |

---

## 6. Crafts destinés

| Métier | Usage | Ref |
|--------|-------|-----|
| **Apothicaire / Alchimiste** | **Émulsion alchimique** (Sang + Liquide + Poudre — recette canonique), potions, élixirs | [[Crafts]] §Alchimie |
| **Tanneur** | Tannage signature avec Sang riche en tannins (cuir patine signature) | [[Crafts]] §Travail du cuir |
| **Enchanteur** | Cercle d'enchantement, pacte magique, rituel | [[Crafts]] §Scriptorium |
| **Apothicaire (préservation)** | Fiole de Sang dans laquelle on conserve organes/yeux/cœur | [[Crafts]] §Alchimie |

---

## 7. Signatures notables

| Signature | Créature source | Usage canonique |
|-----------|-----------------|-----------------|
| **Plasma de la Cendre Vivante** | Avatar Brulé Élémentaire (Cendara) | Émulsion Magistrale Voie de Feu, intrant Acier Éternel |
| **Sang de Zocshawk** | Dragon nain signature Cendara/Alkaran | Conducteur Voie de Feu Magistral, intrant Acier Éternel |
| **Sang de Vargheist** | Loup vétéran Vénérable Ulinor | Émulsion *Solitude* (signature) |
| **Plasma Pourpre de Noyrath** | Pourpre Élémentaire signature Ilthara | Composant Magistral Confusion |

---

## 8. Décisions ouvertes

- **Saignée vivante éthique** : système de Compagnons Phase 4, accès limité.
- **Tannage à signature** : recettes Tanneur exploitant Sang spécifique → cuir patine signature. Phase 2.
- **Sang humanoïde** : taboue absolu, karma rouge profond. Marché noir Phase 4.
- **Cristallisation Sang** : recette Apothicaire palier 4+ — préservation Magistrale.
- **Coagulation 30 min** : timer fin ou palier (frais/coagulé/séché) ? **Proposition** : 3 paliers.

---

*Liens : [[Sources de Ressources]] · [[Crafts]] · [[Cœur de creature]] · [[Œil]] · [[Organe]] · [[Venin]] · [[Sécrétion]] · [[Bestiary/Index]]*
