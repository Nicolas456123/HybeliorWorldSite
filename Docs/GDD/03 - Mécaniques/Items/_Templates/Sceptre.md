---
tags: [item, archétype, arme, mêlée-1H, sceptre, focus-magique]
type: archetype
category: Arme
subcategory: Mêlée 1H
source: Fabriqué
mastery: Sceptre
craft_category: Forge + Travail du bois + Scriptorium
tier_min: 1
tier_max: 6
era_availability: [toutes]
status: drafted
last_review: 2026-05-01
needs_review_for: [scaling-Esprit-Résonance, mapping-13-Voies, conditions-cachées-Maître]
---

# 🪄 Sceptre — Archétype

> Arme **physique 1H + amplificateur magique**. Hybride entre l'arme mêlée et le focus magique de [[Tome]]. **Dégâts physiques −30% vs épée 1H, accès canalisation [[Le Lien]] : −10% coût Mana, +10% dégâts magiques, charges de sort**. Scaling **Esprit + Résonance** (vs Vigueur). Mapping vers les **13 Voies** (5 Éternels + 8 Cosmiques). Voir [[Catégories d'Items]] · [[Armes et Maîtrise#Sceptre]] · [[Le Lien]].

---

## 1. Vue d'ensemble

Le **sceptre** est l'unique **arme hybride** d'Hybelior : à la fois arme physique 1H et **focus magique** pour [[Le Lien|le Lien]]. Pour un Lié, c'est le conduit privilégié — chaque sceptre est attaché à une **Voie** (parmi les 13) et amplifie les sorts de cette Voie. Pour un non-Lié, c'est une masse contondante 1H médiocre. Culturellement, c'est l'arme du **prêtre-guerrier**, du **mage-armé**, du **maître de la Voie en armure légère**, du **gardien d'un sanctuaire** ; il évoque le sacré, l'érudition, la maîtrise du Lien. Sa Maîtrise [[Armes et Maîtrise#Sceptre|Sceptre]] est une **double Maîtrise** : combat (paliers 1-3) + canalisation (paliers 4-5).

> [!info] Position dans le catalogue
> **Dégâts physiques ×0.70 vs épée 1H · Vitesse ×0.95 · Stagger ×1.05 · Contondant 100% · Bonus magie : −10% Mana, +10% dégâts sort, +1 charge de sort**.
> Affixe natif *Résonance d'âme* (+2 Mana/hit physique).

---

## 2. Variations / sous-types — mapping aux 13 Voies

> [!important] 13 sous-types canoniques
> Chaque sceptre est attaché à **une des 13 Voies** ([[Le Lien]] : 5 Éternels + 8 Cosmiques). Cette attache détermine le sort canalisé et le bonus dégâts magiques.

### Sceptres Éternels (5)

| Sceptre | Éternel | Bonus canalisation | Damage type magique |
|---------|---------|--------------------|--------------------|
| **Sceptre de l'Origine** | Origo (origine) | +15% dégâts sorts de création/genèse | Lumière |
| **Sceptre de la Mémoire** | Memoria (mémoire) | +15% dégâts sorts d'écho/répétition | Spectral |
| **Sceptre de la Trame** | Tela (lien) | +15% dégâts sorts de liaison/cohésion | Neutre |
| **Sceptre de la Limite** | Finis (frontière) | +15% dégâts sorts de barrière/protection | Neutre |
| **Sceptre du Cycle** | Vita (cycle) | +15% dégâts sorts de soin/régénération | Lumière |

### Sceptres Cosmiques (8)

| Sceptre | Cosmique | Bonus canalisation | Damage type magique |
|---------|----------|--------------------|--------------------|
| **Sceptre de l'Ombre** | Noctis | +20% dégâts sorts d'ombre/Brume | Ombre |
| **Sceptre du Temps** | Tempora | +20% dégâts sorts spectraux/échos | Spectral |
| **Sceptre de l'Eau** | Aquor | +20% dégâts sorts Givre/Eau | Givre |
| **Sceptre de Verdoiement** | Spiritus + Terranu | +20% dégâts sorts végétaux | Nature |
| **Sceptre de Feu** | Eldoria | +20% dégâts sorts Feu | Feu |
| **Sceptre du Pourpre** | Umbra | +20% dégâts sorts crépuscule | Pourpre |
| **Sceptre Onirique** | Somnix | +20% dégâts sorts de sommeil | Onirique |
| **Sceptre du Présage** | Fatum | +20% dégâts sorts de prophétie | Vénérable |

> [!note] Pattern réutilisé de [[Tome]]
> Le mapping aux 13 Voies est cohérent avec [[Tome]] §2 — chaque tome a sa Voie attachée. Le sceptre ajoute la dimension *combat physique*.

---

## 3. Stats par tier

> [!important] Dérivation depuis [[Épée à une main]] §3
> Multiplicateurs identiques. Valeurs absolues = épée 1H × 0.70 dégâts, ×0.95 vitesse, ×1.05 stagger.

### Table absolue — Sceptre

| Tier | Dégâts physiques/coup | Vitesse | Crit | Stagger | Durabilité | Stamina/coup | Bonus magie |
|------|----------------------|---------|------|---------|------------|--------------|-------------|
| **T1 Commun** | **28** | 1.14 | 4% | 26 | 180 | 8 | +5% dégâts sort, +1 Mana/hit |
| **T2 Façonné** | 36 | 1.16 | 4% | 28 | 250 | 8 | +8% dégâts sort, +1 Mana/hit, *Voie* basique |
| **T3 Œuvré** | 48 | 1.19 | 5% | 32 | 340 | 8 | +12% dégâts sort, +2 Mana/hit, +1 charge sort |
| **T4 Magistral** | 62 | 1.22 | 6% | 37 | 450 | 8 | +18% dégâts sort, +3 Mana/hit, −10% Mana coût |
| **T5 Légendaire** | 78 | 1.26 | 7% | 44 | 580 | 8 | +25% dégâts sort, +5 Mana/hit, −15% Mana coût, +2 charges |
| **T6 Mythique** | 100 | 1.30 | 9% | 53 | 770 | 7 | +35% dégâts sort, +8 Mana/hit, −20% Mana coût, +3 charges, sort signature |

### Charges de sort

À partir de T3, le sceptre stocke **N charges de sort** (1 → 3 selon tier). Chaque charge = un sort gratuit (sans coût Mana) à conditions cooldown propre. Recharge 1 charge / 60s en repos.

### Formule de dégâts physiques

```
Dégâts physiques = Base × (1 + Vigueur × 0.005) × Maîtrise_Sceptre × Crit × Variant × (1 - réduc)
```

### Formule de dégâts magiques

```
Dégâts sort = (Base sort × Niveau Voie) × (1 + Esprit × 0.005 + Résonance × 0.003) × Bonus sceptre
```

Voir [[Personnage]] et [[Le Lien]] pour les baselines de sorts.

---

## 4. Damage types

| Type | Pourcentage physique | Notes |
|------|----------------------|-------|
| **Contondant** | 100% (physique) | Pas de tranchant ni perçant |

**Damage types magiques** : déterminés par la Voie attachée (voir §2).

---

## 5. Affixes typiques

> [!important] Catalogue = baseline + 4 spécifiques magie
> Hérite des 13 affixes baseline. Ajoute :

| Affixe | Effet | Tier min | Notes |
|--------|-------|----------|-------|
| **Résonance d'âme** *(natif)* | +2 Mana/hit physique | T1 | Gratuit |
| **Charge supplémentaire** | +1 charge de sort | T3 | Rare |
| **Réduction coût Mana** | −5/10/15% coût Mana sorts | T2 | Commun |
| **Amplification Voie** | Sorts de la Voie attachée +10/15/20% dégâts | T3 | Rare |
| **Sort signature** | 1 sort spécifique gratuit (cooldown propre) | T5 | Très rare |

---

## 6. Recettes (Forge + Travail du bois + Scriptorium)

> [!important] Recette **triple craft** — la plus complexe du catalogue d'armes
> Le sceptre combine **tête métal/cristal** (Forge), **hampe en bois** (Travail du bois) et **gravures rituelles** (Scriptorium). 3 catégories de craft, 3 mini-jeux séquentiels.

| Tier | Tête (Forge) | Hampe (Bois) | Gravures (Scriptorium) | Durée totale | Mini-jeu |
|------|--------------|--------------|------------------------|--------------|----------|
| **T1** | Lingot fer ×1 + Cristal de Voie brut ×1 | Bois ×2 | Pigment ×1 (gravure simple) | 150 s | timing_température + coupe + tracé_glyphe (basique) |
| **T2** | Lingot acier ×1 + Cristal de Voie ×1 | Planche ×2 + Sève ×1 | Encre ×1 + Cristal de Voie taillé ×1 | 280 s | + cintrage + précision_glyphe |
| **T3** | Alliage acier-trempé ×1 + Lingot ×1 + Cristal Voie taillé ×1 | Planche d'essence noble ×2 | Encre rituelle ×1 + Cristal ×2 + Pigment ×1 | 480 s | chaîne complète |
| **T4** | Alliage rare ×2 + Lingot précieux ×1 + Cristal Voie maître ×1 + Cœur creature ×1 | Planche noble ×2 + Cœur de plante ×1 | Encre rituelle ×2 + Essence spirituelle ×1 + Pigment cosmique ×1 | 1200 s | chaîne complète + rituel d'enchantement |
| **T5** | Alliage légendaire ×2 + Cœur creature ×2 + Cristal Voie maître ×2 | Planche cosmique ×2 + Sève cosmique ×1 | Encre cosmique ×1 + Essence spirituelle ×2 + Cristal de Voie maître ×1 | 2400 s | + condition cachée 🔒 |
| **T6** | Composants cosmiques + signature Voie | Bois d'Arbre-Cœur | Inscription Voie cosmique unique | variable | quête scénarisée multi-Voie |

> Métiers : Forgeron + Menuisier + Enchanteur. Stations : Forge + Établi de menuiserie + Cercle d'enchantement. **Maîtrise minimale Adepte (palier 3) dans les 3 métiers** pour produire un T3+.

---

## 7. Variants cosmiques

Mêmes 10 variants que [[Épée à une main]] §7. Adaptations Sceptre :
- **Brulé** : redondant si Voie de Feu déjà attachée → bonus Mana +5/hit pour autres Voies, neutre si Feu
- **Onirique** : redondant si Voie de Somnix → bonus pour autres Voies
- **Vénérable** : si la Voie attachée est Fatum, premier sort de chaque combat = crit garanti

> [!tip] Cohérence variant + Voie
> Un sceptre *Brulé* avec Voie de Feu = redondance neutre. Un sceptre *Brulé* avec Voie de Givre = combinaison rare et puissante (synergies de Voies opposées via [[Le Lien]]).

---

## 8. Exemples de signatures

> Pas d'item Sceptre nominé dans `Objets.csv`. Signatures inventées par grand pays + Voie.

### Endora (templiers de Vita / Origo)

| Nom | Tier | Voie | Lore court | Bonus narratif |
|-----|------|------|------------|----------------|
| **Sceptre du Cycle d'Avalor** | Mythique (T6) | Vita | Sceptre cérémoniel des templiers du Cycle, transmis de Maître à Maître | *Sort signature* : *Renaissance* (revive un allié 30%HP, CD 240s). Héritage. |
| **Sceptre-Bénédiction** | Légendaire (T5) | Origo | Sceptre des prêtres-guerriers d'Avalor | Soigne 5 HP/hit physique. *Amplification Voie* gratuite |

### Veshrim (cultistes anciens — Voies Cosmiques)

| Nom | Tier | Voie | Lore court | Bonus narratif |
|-----|------|------|------------|----------------|
| **Sceptre de l'Ombre Longue** | Légendaire (T5) | Noctis | Sceptre d'un Onirurge déchu, lame d'obsidienne | Variant *Shadow* permanent. *Charge supplémentaire* gratuite. Sort *Brume mortelle* canalisable |
| **Sceptre du Présage de Veshrim** | Mythique (T6) | Fatum | Sceptre rituel d'un oracle disparu | *Sort signature* : *Vision du Cycle* (révèle les actions des PNJ dans les 24h IRL). Héritage |

### Galenor (druides de Spiritus + Terranu)

| Nom | Tier | Voie | Lore court | Bonus narratif |
|-----|------|------|------------|----------------|
| **Sceptre du Verdoiement** | Légendaire (T5) | Spiritus + Terranu | Sceptre des druides de la Communion, hampe vivante | Variant *Verdoyant* permanent. Récolte botanique +20% (porté hors combat) |

### Cestra (Voies aquatiques)

| Nom | Tier | Voie | Lore court | Bonus narratif |
|-----|------|------|------------|----------------|
| **Sceptre du Récif** | Magistral (T4) | Aquor | Sceptre des prêtres-mages de Cestra | Variant *Frost* atténué. Bonus contre faune aquatique +25% |

---

## 9. Mini-jeu de combat

### Moveset baseline (mode physique)

- **Combo 3 coups (LMB)** : frappes contondantes circulaires — fenêtre combo **0.70s**
- **Attaque lourde (LMB tenu)** : frappe canalisée, applique *Stagger léger* + génère 5 Mana — 25 pts stamina
- **Parade tenue (RMB)** : drain 12 pts/s, absorbe 35% (le sceptre fait office de garde minime)
- **Parade parfaite** : fenêtre 0.20s
- **Esquive** : 4 directions, IFrames 0.40s

### Moveset magique

- **Canalisation sort (Q + sort de Voie attachée)** : utilise le sceptre comme conduit, sort Voie +10-25% selon tier
- **Charge de sort (E)** : déclenche 1 charge stockée → sort gratuit (T3+)
- **Sort signature (R, T5+)** : sort unique attaché au sceptre (signature)

### Combos par palier

| Palier | Capacité débloquée |
|--------|--------------------|
| **Novice** | Combo 3 coups, canalisation sort basique |
| **Initié** | Finisseur *Frappe canalisée* (génère 10 Mana + applique *Stagger léger*) ; compétence *Sort gratuit* (1 charge + sort de Voie) |
| **Adepte** | Passif *Conduit* : régen Mana +1/s en combat. Compétence *Méditation rapide* (regen 30 Mana, 5s, vulnérable) |
| **Expert** | Combo 5 coups, finisseur génère charge gratuite. Compétence *Double sort* (2 sorts simultanés, 50% Mana chacun) |
| **Maître** 🔒 | Technique signature *Voie du Sceptre* (200 stamina + 200 Mana, 120s CD, le sort suivant + frappe physique combinés en 1 hit, dégâts × Voie ampli ×3) |

### Synergies

- **Sceptre + Bouclier** : "templier", style canonique d'Endora — combat physique + sort court
- **Sceptre + Dague (main gauche)** : "mage-éclaireur" — burst physique + fenêtre canalisation
- **Sceptre + Tome (main gauche)** : interdit — deux focus magiques
- **Voie de Vita + Sceptre Vita** : synergie maximale (cumul des bonus)

---

## 10. Décisions ouvertes

> [!warning] Sceptre vs Tome : redondance ?
> Un Lié peut canaliser sa Voie via [[Tome]] (focus pur) OU via Sceptre (arme + focus). Décision Phase 3 : Tome = bonus magique pur (+25% dégâts), Sceptre = compromis (+10-25% magie + capacité physique). À playtest pour calibrer.

> [!warning] Multi-Voies sur un sceptre
> Peut-on attacher 2 Voies à un sceptre T6 ? Recommandation initiale : **non**, sauf signature unique. Chaque sceptre = 1 Voie pure pour la lisibilité.

> [!warning] Conditions cachées 🔒 Maître
> - Atteindre Maître Voie attachée + Maître Sceptre simultanément
> - Tuer un boss mondial uniquement par sorts canalisés (aucune frappe physique)
> - Forger son sceptre signature et lier sa Voie permanente

> [!note] Cohérence avec [[Le Lien]]
> Cet archétype dépend fortement de [[Le Lien]] et des baselines des 13 Voies. Si Le Lien évolue (nouveaux sorts, nouvelles Voies), ce sceptre évolue en parallèle.

---

*Liens : [[Épée à une main]] · [[Tome]] · [[Le Lien]] · [[Catégories d'Items]] · [[Armes et Maîtrise]] · [[Combat]] · [[Personnage]]*
