---
tags: [item, archétype, arme, munition, flèche]
type: archetype
category: Arme
subcategory: Munition
source: Fabriqué
mastery: Arc *(usage seulement)*
craft_category: Travail du bois + Forge + Plumeur
tier_min: 1
tier_max: 6
era_availability: [toutes]
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-mult-flèche-arc, formats-stack-consumable, conditions-cachées-Maître-arc]
---

# 🏹 Flèche — Archétype (munition)

> **Munition consommable** pour [[Arc]]. Cas particulier : **pas une arme classique**, mais un **stack consumable** (single-use ou récupération partielle). Tiers définis par **tête métallique × type d'effet**. Fabriqué en **Travail du bois** (hampe) + **Forge** (tête) + **Plumeur** (empennage). Multiplicateur appliqué à l'arc à chaque tir. Voir [[Catégories d'Items]] · [[Arc]] · [[Crafts]] §Travail du bois.

---

## 1. Vue d'ensemble

La **flèche** est l'**unique catégorie de munition** d'Hybelior actuellement (l'archétype est extensible si arbalète/fronde apparaissent — cf. [[Arc]] §10). Elle se consomme à chaque tir d'[[Arc]] (avec récupération partielle 30-60% selon variant). Les flèches modulent **les damage types et les effets** de l'arc tirant : une flèche élémentaire transforme une partie des dégâts, une flèche perforante amplifie l'anti-armure, une flèche traceuse pardonne l'erreur de visée. Elles se stockent en **carquois** (équipement off-hand pour archers) — capacité 30 / 50 / 80 selon tier carquois.

> [!info] Pattern pas-arme-classique
> Cet archétype **diverge** des autres : pas de Maîtrise propre (utilise *Arc* — voir [[Arc]]), pas de moveset spécifique, pas de durabilité par tir au sens classique. Tier exprimé en **multiplicateurs appliqués à l'arc** + effets spéciaux.

---

## 2. Variations / sous-types — par tête × matériau

### Têtes basiques (tranche tier)

| Tête | Tier | Profil | Multiplicateur arc | Damage type |
|------|------|--------|---------------------|-------------|
| **Pointe en bois durci** | T1 | Entraînement, bas-de-gamme | ×0.7 | Perçant 100% (faible) |
| **Pointe en fer** | T1 | Standard | ×1.0 | Perçant 100% |
| **Pointe en acier** | T2-T3 | Améliorée | ×1.2 | Perçant 100% |
| **Pointe en alliage rare** | T4 | Magistrale | ×1.4 | Perçant 100% |
| **Pointe en alliage cosmique** | T5 | Légendaire | ×1.6 | Perçant 100% |
| **Pointe mythique** | T6 | Composant boss mondial | ×1.9 | Perçant 100% + signature |

### Têtes spécialisées (tranche effet)

| Tête spécialisée | Tier | Profil | Multiplicateur arc | Damage type / effet |
|------------------|------|--------|---------------------|---------------------|
| **Flèche perforante** | T3 | Anti-armure | ×1.3 | Perçant + Anti-armure plate +25% |
| **Flèche-lame** | T2 | Tranchant | ×1.1 | Tranchant 60% + Perçant 40% (pour cibles non-armurées) |
| **Flèche large** | T2 | Faune, dégâts dispersés | ×1.0 | Perçant 80% + Saignement (DoT 2%/s 3s) |
| **Flèche traceuse** | T4 | Anti-mouvement | ×1.2 | Perçant + auto-orientation cible verrouillée |
| **Flèche siffleuse** | T3 | Distraction | ×0.8 | Perçant + alerte tous les ennemis dans 30m (intentionnel — appât) |

### Têtes élémentaires (tranche Voie)

| Tête élémentaire | Tier | Voie liée | Multiplicateur arc | Damage type / effet |
|------------------|------|-----------|---------------------|---------------------|
| **Flèche incendiaire** | T4 | Eldoria | ×1.3 | 50% Perçant + 50% Feu + DoT *Brûlure* 1%/s 3s |
| **Flèche givrée** | T4 | Aquor | ×1.3 | 50% Perçant + 50% Givre + ralentit cible 15% pdt 2s |
| **Flèche fulgurante** | T5 | (Voie de Foudre) | ×1.4 | 50% Perçant + 50% Foudre + 10% chance stagger zone 2m |
| **Flèche d'ombre** | T5 | Noctis | ×1.4 | 50% Perçant + 50% Ombre + invisible 1s post-tir |
| **Flèche-écho** | T5 | Tempora | ×1.4 | 50% Perçant + 50% Spectral + traverse 1 garde |

> [!tip] Combinaison tête × empennage × hampe
> Le profil final = **Tête × Empennage × Hampe**. Exemple : Tête incendiaire + Empennage cosmique (récolte plume haute tier) + Hampe d'essence noble = flèche premium T5 avec multiplicateur réel ≈ ×1.55.

---

## 3. Stats par tier

> [!important] Multiplicateur appliqué à l'arc
> Le multiplicateur de la flèche **multiplie le dégât de base de l'arc** au moment du tir. Pas de stats indépendantes au sens classique. La progression de tier suit la grille canonique (×1.00 / ×1.30 / ×1.70 / ×2.20 / ×2.80 / ×3.60) appliquée à la **chance d'effet et à la qualité du multiplicateur**, pas aux dégâts directs.

### Table tier — flèche en fer (baseline T1) → mythique

| Tier | Mult arc | Stack max (carquois) | Récupération post-tir | Coût craft (1 flèche) |
|------|----------|----------------------|----------------------|----------------------|
| **T1 Commun** | ×1.0 | 30 | 60% (récupérable) | 1 Bois + 1/4 Lingot fer + 1 Plume |
| **T2 Façonné** | ×1.2 | 40 | 55% | 1 Planche + 1/3 Lingot acier + 1 Plume |
| **T3 Œuvré** | ×1.3 | 50 | 50% | 1 Planche d'essence + 1/2 Alliage acier-trempé + 1 Plume cosmique |
| **T4 Magistral** | ×1.4 | 65 | 45% | 1 Planche noble + 1 Alliage rare + 1 Plume cosmique + (Cristal de Voie 1/4 si élémentaire) |
| **T5 Légendaire** | ×1.6 | 80 | 40% | 1 Planche cosmique + 1 Alliage légendaire + 1 Plume cosmique + (Cristal de Voie 1/2) |
| **T6 Mythique** | ×1.9 | 100 (carquois mythique) | 20% (souvent perdues) | Composants cosmiques + signature, fabrication unique non-stack |

> [!note] Flèche T6 = unitaire, pas stack
> Les flèches mythiques sont **uniques**, pas en stack. Chaque flèche a sa signature, son lore, sa quête de fabrication. Souvent perdues à l'usage (récupération 20%) ou consommées définitivement.

---

## 4. Damage types

| Type baseline | Toutes flèches | Notes |
|---------------|----------------|-------|
| **Perçant** | 80-100% | Type primaire de toute flèche |
| **Tranchant** | 0-60% | Sur flèche-lame |
| **Élémentaire** (Feu/Givre/Foudre/Ombre/Spectral) | 0-50% | Sur flèches élémentaires (T4+) |

L'arc + flèche **délègue son damage type à la flèche** (cf. [[Arc]] §4).

---

## 5. Affixes typiques (sur la flèche elle-même, applicables T3+)

| Affixe | Effet | Tier min | Notes |
|--------|-------|----------|-------|
| **Empennage cosmique** | Mult arc +5%/+10%/+15% (sur l'effet de tension) | T3 | Commun |
| **Pointe gravée** | +5% chance crit zone (tête) | T3 | Commun |
| **Charge légère** | Stack carquois +10/15% | T3 | Rare |
| **Flèche persistante** | Récupération post-tir +20% | T4 | Rare |
| **Pointe enchantée** | +1 effet élémentaire mineur (DoT 0.5%/s 2s) | T4 | Rare |
| **Signature** *(T6 unique)* | Effet narratif unique (révélation, marque, présage) | T6 | Très rare |

---

## 6. Recettes (Travail du bois + Forge + Plumeur)

> [!important] Triple craft, mais **petit format** (durée courte par flèche, en stack)
> Une recette produit en général **5-20 flèches** d'un coup (vs 1 pour les autres armes). Cela compense la consommation rapide.

| Tier | Tête (Forge) | Hampe (Bois) | Empennage (Plumeur) | Output | Durée |
|------|--------------|--------------|---------------------|--------|-------|
| **T1** | Lingot fer ×1 (5 pointes) | Bois ×1 (5 hampes) | Plume ×5 | 5 flèches T1 | 60 s |
| **T2** | Lingot acier ×1 (4 pointes) | Planche ×1 (4 hampes) | Plume ×4 + Pigment ×1 | 4 flèches T2 | 90 s |
| **T3** | Alliage acier-trempé ×1 (4 pointes) + Lingot ×1/2 | Planche d'essence ×1 (4 hampes) | Plume cosmique ×4 | 4 flèches T3 | 150 s |
| **T4** | Alliage rare ×1 (3 pointes) + Cristal de Voie ×1/2 (si élémentaire) | Planche noble ×1 (3 hampes) | Plume cosmique ×3 + Sève ×1/2 | 3 flèches T4 | 280 s |
| **T5** | Alliage légendaire ×1 (3 pointes) + Cristal de Voie ×1 | Planche cosmique ×1 (3 hampes) | Plume cosmique ×3 + Essence spirituelle ×1/4 | 3 flèches T5 | 480 s |
| **T6** | Composants cosmiques + signature unique | Bois d'Arbre-Cœur (1 hampe unique) | Plume mythique ×1 + Essence ×1 | 1 flèche T6 unique | 1500 s + quête |

> Métiers : Menuisier (hampe) + Forgeron (tête) + Plumeur (empennage). Stations : Établi de menuiserie + Forge à charbon (mini) + Établi de plumeur. Maîtrise minimale Initié dans les 3 métiers pour T2+, Adepte pour T3+.

> [!note] Plumeur — métier confirmé
> Le métier **Plumeur** spécialisé dans l'empennage des flèches est listé dans [[Métiers]]. Si non, ajouter en Phase 3.

---

## 7. Variants cosmiques

> Les flèches **héritent du variant de l'arc** au moment du tir, sauf flèches élémentaires qui imposent leur type. **Pas de variants cosmiques propres** aux flèches T1-T5 baseline. Exception : T6 unique, où le variant cosmique fait partie de la signature.

Exemples T6 :
- **Flèche du Présage** (variant *Vénérable*) : crit garanti + révèle PNJ menteur dans 24h IRL
- **Flèche d'Ombre Longue** (variant *Shadow*) : invisible post-tir + DoT *Ombre* permanent jusqu'à dispel

---

## 8. Exemples de signatures

> Pas d'item Flèche nominé dans `Objets.csv`. Signatures inventées par grand pays + Voie.

### Galenor (chasseurs, druides)

| Nom | Tier | Lore court | Bonus narratif |
|-----|------|------------|----------------|
| **Flèche du Long-Souffle** | Mythique (T6) | Flèche unique forgée pour le *Long-Souffle de Galenor* (arc mythique) | +50% portée, traverse 5 cibles alignées. Soigne 20 HP par hit. Héritage du porteur de l'arc associé |
| **Flèche-Verdoyante** | Légendaire (T5) | Flèche des druides, hampe en lierre vivant | Variant *Verdoyant* permanent. Régen Mana +5 par hit cible faune |

### Endora (sentinelles)

| Nom | Tier | Lore court | Bonus narratif |
|-----|------|------------|----------------|
| **Flèche du Verdict** | Légendaire (T5) | Flèche de la garde royale, marquée du sceau royal | Bonus +30% dégâts contre PNJ *Hors-la-loi*. *Pointe gravée* gratuite |
| **Carreau d'Avalor** *(flèche perforante)* | Magistral (T4) | Standard de la garde lourde | Anti-armure plate +40% |

### Veshrim (anciens royaumes)

| Nom | Tier | Lore court | Bonus narratif |
|-----|------|------------|----------------|
| **Flèche-Écho de Veshrim** | Légendaire (T5) | Flèche spectrale, bourdonne quand elle rencontre un mensonge | Variant *Spectral* permanent. Traverse 2 ennemis alignés |

### Cestra (corsaires)

| Nom | Tier | Lore court | Bonus narratif |
|-----|------|------------|----------------|
| **Flèche-Brume** | Magistral (T4) | Flèche des corsaires, pointe alourdie pour vent marin | Pas de malus en zone marécageuse/maritime. Portée +5m en zone humide |

### Tribus nomades / Plaines

| Nom | Tier | Lore court | Bonus narratif |
|-----|------|------------|----------------|
| **Flèche large des Plaines** | Œuvré (T3) | Standard des chasseurs nomades | Saignement gratuit T3 (vs T2 baseline) |

---

## 9. Mini-jeu de combat

### Pas de moveset propre

La flèche **n'a pas de moveset** : elle est utilisée par l'arc tirant. Voir [[Arc]] §9 pour le moveset complet (tir simple, tir armé pleine tension, tir lourd, etc.).

### Sélection en combat

- **Carquois actif (touche 1-9)** : sélection rapide d'un type de flèche dans le carquois équipé
- **Auto-sélection** : si pas de touche pressée, l'arc tire la flèche en haut de la pile (par défaut)
- **Stack invisible** : les flèches T1 (entraînement) sont invisibles dans le HUD pour ne pas surcharger

### Interactions spéciales

| Interaction | Effet |
|-------------|-------|
| **Flèche traceuse + Lock-on** | Auto-orientation parfaite vers cible verrouillée (ne rate jamais sauf esquive) |
| **Flèche siffleuse** | Crée un faux-positif sonore dans une zone — alerte tous les ennemis pour un appât |
| **Flèche élémentaire + variant arc** | Cumul des effets si compatibles (ex. arc Frost + flèche givrée = Givre quasi-garanti) |
| **Flèche-écho + parade ennemie** | Traverse partiellement la garde du PNJ |

---

## 10. Décisions ouvertes

> [!warning] CHANTIER : Plumeur — métier dédié ou sub-tâche
> Si Plumeur n'est pas listé dans [[Métiers]] comme métier autonome, l'empennage devient une sub-tâche du Tisserand ou du Tanneur. Décision Phase 3.

> [!warning] Multiplicateur arc — calibration
> Le tableau §3 propose ×1.0 → ×1.9 progressivement. À playtest : la flèche T1 doit-elle vraiment ×1.0 (= rien) ou plus optimisée (×0.95 pour valoriser T2+) ? Voir [[Arc]] §3 pour la formule cible.

> [!warning] Stack carquois et économie
> 80 flèches T5 = beaucoup de craft. À playtest : faut-il limiter la stack ou autoriser à fond ? Risque : un archer T5 peut soutenir un combat de boss de 30 minutes sans rationner.

> [!warning] Flèches T6 et économie de l'unique
> Une flèche T6 = quête de fabrication. Si elle se perd à 80% au tir, c'est très frustrant. Recommandation : T6 = récupération 80-90% sauf échec critique narratif.

> [!note] Conditions cachées 🔒 archerie Maître
> Voir [[Arc]] §10 — les conditions cachées Maître Arc concernent l'arc + ses flèches conjointement. Pas de conditions propres aux flèches.

---

*Liens : [[Arc]] · [[Catégories d'Items]] · [[Types d'Items]] · [[Crafts]] · [[Métiers]] · [[Sources de Ressources]] · [[Le Lien]]*
