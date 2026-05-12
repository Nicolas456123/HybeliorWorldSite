---
tags: [item, archétype, consommable, potion, alchimie]
type: archetype
category: Consommable
subcategory: Potion
source: Fabriqué
mastery: Alchimie
craft_category: Alchimie
tier_min: 1
tier_max: 6
era_availability: [toutes]
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-effets-playtest, équilibrage-cooldown-global, interaction-statut-en-combat]
---

# 🧪 Archétype — Potion

> Premier archétype-référence de la **catégorie [[Catégories d'Items|Consommable]]**, sous-catégorie **Potion**. Pose le pattern canonique pour tous les consommables liquides à effet immédiat ou à durée. Voir aussi [[Pain]] (référence consommable nourriture) et [[Items/Index]].

---

## 1. Vue d'ensemble

Une **potion** est un liquide actif fabriqué par [[Métiers|Alchimiste]] ou [[Métiers|Apothicaire]] (voir [[Crafts]] §Alchimie), bu par le personnage pour déclencher un **effet ciblé** : restauration de ressource ([[Personnage|HP/Stamina/Mana]]), buff temporaire, neutralisation d'effet (antidote, dispel), ou bonus exotique lié aux ères.

**Ancrage gameplay :**
- Réponse tactique aux ressources critiques en [[Combat]] (pool HP, Stamina, Mana — voir [[Personnage]] lignes 99-225)
- Outil de préparation hors combat (buff avant un raid, antidote avant un marais empoisonné)
- Composante centrale de l'économie joueur-driven ([[Économie]]) — fortes recettes, intrants multiples ([[Sources de Ressources]] : plantes + créatures)
- Facette identitaire des [[Le Lien|Liés]] : certaines potions ne fonctionnent qu'avec une Voie active, d'autres rechargent le Mana indépendamment de la Voie

**Ancrage culturel :** chaque grand pays a sa tradition d'alchimie (voir §8). Les potions cosmiques (élixirs liés aux ères) sont des reliques recherchées par les Astronomes et les Oracles ([[Métiers]] §Érudition).

---

## 2. Variations / sous-types

> **7 sous-types canoniques** de potions. Chaque sous-type a son propre tableau d'effets par tier (§3) et ses recettes (§6).

| Sous-type | Effet principal | Pool ciblé | Notes |
|-----------|-----------------|------------|-------|
| **Potion de Soin** | Restaure HP | HP | Le plus commun ; instantané vs régen sur durée selon tier |
| **Potion de Régen Mana** | Restaure Mana | Mana | Fonctionne **uniquement si une Voie active** ([[Le Lien]]) — sinon gaspillage |
| **Potion de Régen Stamina** | Restaure Stamina | Stamina | Effet partiel en combat (voir §4) |
| **Antidote** | Neutralise un poison / venin | Statut | Cible un statut négatif spécifique (poison, saignement, brûlure mineure) |
| **Dispel magique** | Annule un buff/debuff magique | Statut | Annule le dernier effet magique appliqué (voir [[Le Lien]] §Réactions entre Voies) |
| **Buff temporaire** | +stat brute pendant durée | [[Personnage]] L1 | Buff sur 1 stat brute (Vigueur, Vivacité, Acuité, Esprit, Résonance) |
| **Élixir cosmique** | Effet lié à une [[Les Ères\|ère]] | Spécial | Rare, débloqué pendant certaines ères ; effets atypiques |

> **Décision** : pas de potion de résurrection. La résurrection passe **exclusivement** par la [[Le Lien|Voie d'Eldoria]] (voir [[Mort]] §Résurrection par allié, fenêtre 30s, coût 60% Mana). Les élixirs cosmiques peuvent prolonger la fenêtre (cf. §7).

---

## 3. Effets par tier (table chiffrée canonique)

> **Cohérence avec [[Personnage]] / [[Combat]]** : un humain ordinaire a Vitalité ~100-150 HP, un aventurier confirmé ~300-500 HP, un héros mythique ~800-1200 HP. Stamina max ~350-450, Mana max ~400-550. Les magnitudes ci-dessous sont **calibrées sur ces ordres de grandeur**.

### 3.1 Potion de Soin (HP)

| Tier | Nom | HP rendus (instant) | Régen sur durée (alt.) | Durée régen | Vitesse application | Risque effet secondaire |
|------|-----|---------------------|------------------------|-------------|---------------------|--------------------------|
| 1 — Commun | Décoction simple | +50 HP | — | — | 1.5s | 0% |
| 2 — Façonné | Élixir vermeil | +120 HP | +15 HP/s × 10s = 150 | 10s | 1.5s | 0% |
| 3 — Œuvré | Baume sanguin | +220 HP | +25 HP/s × 12s = 300 | 12s | 1.5s | 5% nausée 3s |
| 4 — Magistral | Sang d'Aurore | +400 HP | +40 HP/s × 15s = 600 | 15s | 1.2s | 10% nausée 4s |
| 5 — Légendaire | Larme de Lumière | +700 HP | +60 HP/s × 18s = 1080 | 18s | 1.0s | 15% étourdissement 2s |
| 6 — Mythique | Sève de l'Aube Nouvelle | +1200 HP + 30% HP max temporaire | +100 HP/s × 20s = 2000 | 20s | 0.8s | 25% — voir [[L'Accord]] §dégradation post-Souffle |

### 3.2 Potion de Régen Mana

| Tier | Mana rendu | Régen sur durée | Durée | Risque |
|------|------------|-----------------|-------|--------|
| 1 | +40 Mana | — | — | 0% |
| 2 | +100 | +12/s × 10s | 10s | 0% |
| 3 | +180 | +20/s × 12s | 12s | 5% surcharge magique 3s (silence) |
| 4 | +320 | +35/s × 15s | 15s | 10% silence 4s |
| 5 | +560 | +55/s × 18s | 18s | 15% surcharge — drain inverse 5s |
| 6 | +900 + 25% Mana max temp | +90/s × 20s | 20s | 25% — risque rupture du [[Le Lien|Lien]] (rare) |

### 3.3 Potion de Régen Stamina

| Tier | Stamina rendu | Régen sur durée | Durée | Risque |
|------|---------------|-----------------|-------|--------|
| 1 | +60 Stamina | — | — | 0% |
| 2 | +140 | +18/s × 10s | 10s | 0% |
| 3 | +250 | +30/s × 12s | 12s | 5% essoufflement |
| 4 | +420 | +50/s × 15s | 15s | 10% essoufflement 4s |
| 5 | +700 | +75/s × 18s | 18s | 15% crampe (−Vivacité 3s) |
| 6 | +1100 + sprint sans coût 10s | +120/s × 20s | 20s | 25% épuisement post-effet |

### 3.4 Antidote / Dispel

| Tier | Effet | Niveau de poison/buff annulé | Durée immunité résiduelle |
|------|-------|------------------------------|---------------------------|
| 1 | Antidote commun | Poison T1 | — |
| 2 | Antidote raffiné | Poison T1-T2 | 5s immunité |
| 3 | Antidote pur | Poison T1-T3 + saignement | 15s |
| 4 | Eau-de-vie cendrée | Poison T1-T4 + dispel buff magique mineur | 30s |
| 5 | Élixir des Sept Sceaux | Tout poison + dispel buff [[Le Lien\|Voie]] majeur | 60s |
| 6 | Cendre de Pacte | Annule **tous** debuffs y compris Voies opposées | 120s |

### 3.5 Potion Buff temporaire (1 stat brute)

> Bonus appliqué à **1 stat brute** ([[Personnage]] couche 1) au choix selon recette : Vigueur, Vivacité, Endurance, Acuité, Esprit, Résonance.

| Tier | Magnitude | Durée | Cooldown propre | Risque |
|------|-----------|-------|-----------------|--------|
| 1 | +5 stat | 60s (1 min) | 5 min | 0% |
| 2 | +10 stat | 120s | 5 min | 0% |
| 3 | +18 stat | 180s | 8 min | 5% redescente brutale −5 stat 30s |
| 4 | +30 stat | 240s (4 min) | 10 min | 10% |
| 5 | +50 stat | 360s (6 min) | 15 min | 15% — addiction si usage répété |
| 6 | +80 stat | 600s (10 min) | 30 min | 25% — voir §8 décisions ouvertes |

### 3.6 Élixir cosmique (variant ères — voir §7)

Magnitude variable, effet narratif > effet pur. Tier 5-6 uniquement. Détail dans §7.

---

## 4. Mécanique d'usage

### 4.1 Animation et timing

| Élément | Valeur canonique | Notes |
|---------|------------------|-------|
| **Temps d'incantation / consommation** | 1.5s standard (T1-T3), 1.2s (T4), 1.0s (T5), 0.8s (T6) | Animation de boire — visible par les autres joueurs |
| **Interruption si dégâts subis** | Oui — annule la potion **et** le cooldown global potion ne se déclenche pas | Évite le grief en combat |
| **Possible en mouvement** | Oui (marche), non en sprint, non en saut | |
| **Possible en parade tenue** | Non | Force le choix tactique |

### 4.2 Cooldown global potion (CANONIQUE)

> **Pattern partagé avec tous les consommables liquides à effet ressource.**

| Mécanique | Valeur |
|-----------|--------|
| **Cooldown global potion** | 30s entre 2 potions de la **même catégorie de ressource** (Soin / Mana / Stamina) |
| **Cooldown inter-catégories** | 8s entre 2 potions de catégories différentes (ex. Soin puis Mana) |
| **Cooldown buff** | Voir §3.5 — propre à chaque potion (5-30 min selon tier) |
| **Cooldown antidote / dispel** | 60s |

> [!important] Décision design
> Le cooldown global empêche de spammer les potions. La régen sur durée incite à boire **avant** le pic de besoin, pas pendant.

### 4.3 Interaction avec le statut "en combat"

> Voir [[Combat]] §Régénération chiffrée — statut "en combat" actif tant que dégâts donnés/reçus < 5s.

| Contexte | Effet |
|----------|-------|
| **Hors combat (5s sans dégât)** | Effet pleine magnitude, durée standard |
| **En combat** | Effet pleine magnitude, mais **régen sur durée −30%** pour HP (cohérence avec régen HP en combat ~quasi-nulle, [[Combat]] L222-228) |
| **Sortie de combat pendant l'effet** | Régen restante repasse à 100% au tick suivant |
| **Mort pendant l'effet** | L'effet est perdu (pas de drop d'item — [[Mort]]) |

---

## 5. Affixes / modificateurs spécifiques (10)

> Modificateurs appliqués par **[[Architecture Data-Driven|ItemModifier Generator]]** ou par recette signature. Cumul max : 2 affixes par potion T1-T3, 3 par T4, 4 par T5-T6.

| # | Affixe | Effet |
|---|--------|-------|
| 1 | **Doublé en hiver** ([[Les Ères\|Sommeil de Glace]]) | Magnitude effet ×2 si l'ère active est Sommeil de Glace |
| 2 | **Lien profond** | Pas de cooldown global si l'utilisateur est **Maître Alchimiste** ([[Métiers]] §Érudition Alchimiste) |
| 3 | **Bonu de pleine lune** | +30% magnitude si bue pendant la phase de pleine lune ([[Cosmologie]] §Stellaris) |
| 4 | **Toxique** | +50% magnitude, mais 100% chance d'effet secondaire poison T1 dégressif |
| 5 | **Régen pure** | Convertit l'effet instantané en régen sur durée +50% magnitude totale |
| 6 | **Burst** | Convertit l'effet régen en instantané, magnitude −20% mais immédiat |
| 7 | **Catalyseur de Voie** | Si le buveur a la Voie active mentionnée, magnitude +40% (variant par Voie) |
| 8 | **Inflammable** | Brisée à terre = projectile alchimique de zone (3m, dégâts/effet partagés) |
| 9 | **Persistante** | Durée de l'effet ×1.5, magnitude par tick −20% (utile en buff longs) |
| 10 | **Communion** ([[Les Ères\|Ère de la Communion]]) | Effet partagé avec le compagnon de Voie de Spiritus invoqué |

> **Affixes négatifs** (post-Souffle, voir [[L'Accord]]) : *Tarie* (−20% magnitude), *Évaporée* (effet réduit de moitié), *Dégradée* (50% chance d'effet secondaire).

---

## 6. Recettes (Alchimie — 1 par tier)

> Voir [[Crafts]] §Alchimie pour la station. Métier : [[Métiers|Alchimiste]] ou [[Métiers|Apothicaire]] (T1-T3 seulement). Mini-jeu canonique : **dosage proportionnel + timing température**.

### 6.1 Recette T1 — Décoction simple (Potion de Soin Commun)

| Aspect | Valeur |
|--------|--------|
| **Métier** | Apothicaire ou Alchimiste |
| **Palier requis** | Novice |
| **Station** | Mortier et pilon + Cuve à eau chaude |
| **Intrants** | Plante × 2 (Hémostine ou Sanguinaire), Liquide × 1 (Eau pure), Récipient × 1 (Fiole de verre) |
| **Sortie** | 2× Décoction simple |
| **Durée gameplay** | 30s |
| **Mini-jeu** | Dosage simple (1 jauge à remplir au bon niveau) |

### 6.2 Recette T2 — Élixir vermeil (Potion de Soin Façonné)

| Aspect | Valeur |
|--------|--------|
| **Palier requis** | Initié |
| **Station** | Mortier + Alambic |
| **Intrants** | Plante × 3 (Sanguinaire raffinée), Sang créature × 1 (lapin, cerf), Liquide × 1, Émulsion alchimique × 1, Fiole × 1 |
| **Sortie** | 1× Élixir vermeil |
| **Durée** | 60s |
| **Mini-jeu** | Dosage proportionnel (3 jauges à équilibrer) + timing température (jauge thermique stable 10s) |

### 6.3 Recette T3 — Baume sanguin (Œuvré)

| Aspect | Valeur |
|--------|--------|
| **Palier requis** | Adepte |
| **Station** | Alambic + Cornue |
| **Intrants** | Plante × 4, Sang créature × 2 (loup ou ours), Cœur de plante × 1, Émulsion × 2, Fiole × 1 |
| **Durée** | 90s |
| **Mini-jeu** | Dosage 4 jauges + timing température + combinaison réactive (séquence d'ajout des intrants) |

### 6.4 Recette T4 — Sang d'Aurore (Magistral)

| Aspect | Valeur |
|--------|--------|
| **Palier requis** | Expert |
| **Station** | Alambic + Cornue + Cucurbite |
| **Intrants** | Cœur de plante × 2, Sang créature rare × 1 (licorne, cervidé spectral), Larme × 1, Émulsion × 3, Poudre fabriqué × 1, Fiole signée × 1 |
| **Durée** | 3 min |
| **Mini-jeu** | Dosage 5 jauges + timing thermique double phase + séquence rituelle |

### 6.5 Recette T5 — Larme de Lumière (Légendaire)

| Aspect | Valeur |
|--------|--------|
| **Palier requis** | Maître |
| **Station** | Cucurbite + Cercle d'enchantement (couplé) |
| **Intrants** | Larme × 3 (élémentaire ou licorne), Cœur de creature × 1, Essence spirituelle × 1, Cristal de Voie d'Eldoria × 1, Liquide béni × 1, Fiole d'argent rituelle × 1 |
| **Durée** | 6 min |
| **Mini-jeu** | Dosage 6 jauges + timing thermique × 2 + séquence rituelle nécessitant Maîtrise [[Le Lien\|Voie d'Eldoria]] (palier minimum Adepte) |

### 6.6 Recette T6 — Sève de l'Aube Nouvelle (Mythique)

| Aspect | Valeur |
|--------|--------|
| **Palier requis** | Maître + condition cachée 🔒 (recette débloquée pendant l'[[Les Ères\|Ère du Rêve Lumineux]]) |
| **Station** | Cucurbite + Cercle d'enchantement + autel d'Eldoria (artefact) |
| **Intrants** | Sève d'Or × 3 (variant cosmique de l'Ère du Verdoiement), Larme d'Eldoria × 1 (loot unique), Essence spirituelle × 3, Cœur de creature mythique × 1, Cristal de Voie d'Eldoria taillé × 1, Fiole sertie × 1 |
| **Durée** | 30 min (rituel ininterrompu) |
| **Mini-jeu** | Dosage 8 jauges + timing thermique × 3 phases + séquence rituelle Maître + canalisation [[Le Lien\|Voie d'Eldoria]] palier Maître |
| **Sortie** | 1× Sève de l'Aube Nouvelle (1 charge unique, **non stockable plus de 7 jours réels** — voir §9) |

> **Pattern de recette canonique** : tier N requiert (N intrants végétaux/créatures principaux) + (N-1 intrants secondaires) + (1 récipient de qualité au moins T-1). Les recettes T5-T6 introduisent un **composant rituel** (Cristal de Voie, Cercle d'enchantement, ère active).

---

## 7. Variants cosmiques (10 — par ère)

> Les **10 variants visuels** ([[Les Ères]] §Variants) modulent les potions fabriquées pendant ou avec des intrants d'ère. **Magnitude de l'effet inchangée** (équilibrage), **propriétés secondaires modifiées**.

| Variant | Ère associée | Effet sur la potion |
|---------|--------------|---------------------|
| **Shadow** ([[Cosmologie\|Noctis]]) | Ombre Longue | Régen invisible (l'effet ne génère pas de FX, utile pour PvP furtif) |
| **Spectral** ([[Cosmologie\|Tempora]]) | Échos Brisés | Régen **rétroactive** — restaure l'état HP/Mana/Stamina d'il y a 5s |
| **Frost** ([[Cosmologie\|Aquor]]) | Sommeil de Glace | Effet ralenti +50% durée, conservation × 3 |
| **Verdoyant** ([[Cosmologie\|Spiritus]]) | Verdoiement | Régen lente mais bonifie la prochaine récolte de plante (+1 plante) |
| **Brulé** (Voie de Feu) | Feu Endormi | Convertit 20% du soin en bouclier de feu (3s) |
| **Pourpre** ([[Cosmologie\|Umbra]]) | Brume Mortelle | Ajoute immunité brume 30s |
| **Doré** ([[Cosmologie\|Eldoria]]) | Rêve Lumineux | Magnitude +20% si bue de jour, dispel auto-déclenché des debuffs Noctis |
| **Brisé** ([[Cosmologie\|Tempora]] aigu) | Échos Brisés (variante) | 50% chance double effet, 50% chance effet annulé (gamble) |
| **Onirique** ([[Cosmologie\|Somnix]]) | Sommeil Onirique | Buff sommeil régénérateur — si endormi pendant l'effet, magnitude ×2 |
| **Vénérable** ([[Cosmologie\|Fatum]]) | Présages | Effet **prédictif** : applique l'effet 5s **avant** la consommation (vous voyez les HP monter à 5s, puis vous buvez) |

> **Pattern variant** : un variant n'augmente jamais la magnitude brute, mais **module la temporalité, la condition, ou ajoute un effet secondaire**. Les élixirs cosmiques (T5-T6) ne peuvent être fabriqués que **pendant l'ère** correspondante (et conservés ensuite — voir §9).

---

## 8. Exemples de signatures (PHASE 4 stub)

> Items uniques narratifs par grand pays / religion. **3-5 par signature** prévus à terme. Ici, échantillon canonique.

### Pays / cultures

- **Élixir des Veilleurs d'Astravia** (T5, Régen Mana + Buff Acuité)
  *Distillé sous le ciel étoilé pendant un rituel astronomique des [[Lore/Religions/Ordo Caelum|Stellari]]. Le buveur voit briefly les constellations même de jour — bonus narratif : déverrouille des dialogues uniques avec les astronomes.*

- **Sang de la Caverne d'Ulinor** (T4, Soin + immunité poison)
  *Récolté goutte à goutte d'une stalactite rouge sang dans les profondeurs d'Ulinor. Religion d'origine : [[Lore/Religions/Vael Kurash|Vael'Kurash]]. Bonus narratif : les esprits-anciens reconnaissent le buveur dans les forêts d'Alkaran.*

- **Larme de Foedus** (T6, Dispel + protection au-delà mort)
  *Rituel funéraire d'un chamane [[Lore/Religions/Foedus Animae|Animari]] sur sa propre tombe. La potion garde la trace d'une âme — si le buveur meurt dans les 24h après ingestion, son corps n'est pas profané (gameplay : pas de baisse de Reconnaissance — voir [[Mort]]).*

- **Élixir Volcanique de Cendara** (T5, Buff Vigueur + bouclier feu)
  *Préparé dans la chaleur d'un temple-forge des [[Lore/Religions/Ignis Aeternum|Ignitari]]. Le buveur dégage une chaleur visible. Bonus narratif : prouve l'allégeance à la Flamme Éternelle — accès aux quartiers fermés des temples de Pyrtara.*

- **Brume de Vytharia** (T4, Régen Mana + invisibilité 8s)
  *Distillation noire des Veilari [[Lore/Religions/Noctari|Noctari]]. Bonus narratif : les espions de Vytharia reconnaissent un consommateur — réseau d'informateurs accessible.*

> Les signatures complètes (des dizaines par pays) sont l'objet de la Phase 4 (voir [[Items/Index]] §Signatures / authored).

---

## 9. Conservation, stockage, dégradation

> **Pattern canonique consommable liquide.** Les potions ne durent pas indéfiniment.

| Tier | Durée de conservation par défaut | Conditions optimales | Dégradation |
|------|----------------------------------|----------------------|-------------|
| 1 | 7 jours réels | Cave fraîche | −20% magnitude après J7, gaspillée à J14 |
| 2 | 14 jours | Cave + scellé cire | −15% après J14, gaspillée à J30 |
| 3 | 30 jours | Cave + cire + obscurité | −10% après J30, gaspillée à J90 |
| 4 | 60 jours | Cave magique (frigo arcanique, [[Le Lien\|Aquor]] mineur) | −5% après J60, gaspillée à J180 |
| 5 | 180 jours | Cave magique + cristal stabilisateur | Stable, gaspillée à J365 |
| 6 | 7 jours réels (instable) | Aucun stockage durable | **Mythique = volatile** : doit être bue rapidement |

> **Inversion T6** : les potions Mythiques sont **trop puissantes** pour être stockées longtemps. Le concept narratif : la matière elle-même refuse d'attendre. Pousse le joueur à les utiliser, pas à les thésauriser.

### Conditions spéciales

- **Post-[[Le Souffle|Souffle]]** : potions T5-T6 subissent une dégradation forcée de −20% magnitude pendant 2 semaines, conformément à [[L'Accord]]
- **Pendant l'[[Les Ères|Ère de la Brume Mortelle]]** : −10% sur toutes les potions stockées non scellées
- **Banques d'alchimiste** : les guildes d'Alchimistes de Cendara, Astravia, Vytharia offrent des coffres de stockage premium (×2 durée — voir [[Économie]] §Services)

---

## 10. Décisions ouvertes / chantiers de profondeur

### Décisions non tranchées

- [ ] **Cooldown global potion vs cooldown par sous-type** : le pattern actuel (30s même catégorie ressource, 8s entre catégories) est-il trop laxiste en raid ? À playtester
- [ ] **Système d'addiction T5-T6 buffs** : effet à équilibrer — pénalité durable ou simple cooldown allongé ?
- [ ] **Potion + nourriture (Pain) cumulent-elles ?** : décision préliminaire = oui, sources d'effet différentes ([[Pain]] = buff Stamina prolongé hors combat, Potion = burst). À confirmer
- [ ] **Potion en PvP** : cooldown différencié ? (proposition : ×1.5 cooldown global en zone PvP)
- [ ] **Recettes ère-only** : doit-on permettre la fabrication post-ère avec intrants stockés, ou fenêtre stricte ? Compromis actuel : intrants stockés OK, fabrication possible mais qualité tier-1 par défaut
- [ ] **Potion liée à la magie** ([[Le Lien]]) : faut-il une "potion d'éveil" qui révèle si une Voie est compatible ? Idée à creuser pour onboarding magie

### Notes pour les autres archétypes consommables

> **Pattern à respecter et à dériver pour les ~14 autres types de consommables ([[Types d'Items]] §Consommable).**

#### Pattern canonique tier × magnitude × durée

> **Formule générale** : Magnitude tier N ≈ 2 × Magnitude tier N-1 (à partir de T2). Risque d'effet secondaire augmente de +5% par tier au-dessus de T3.

| Type consommable | Burst ou durée ? | Pool ciblé | Réf. magnitude |
|------------------|------------------|------------|----------------|
| **Potion** | Burst principal + régen alt | HP / Mana / Stamina / Statut | Ce fichier |
| **Pain** | Durée pure (hors combat) | Stamina + buff stat | [[Pain]] |
| **Boisson** | Durée pure (hors combat) | Buff stat / résistance | À hériter de Pain (durée plus longue, magnitude moins forte) |
| **Parchemin** | Burst (sort encapsulé) | Effet [[Le Lien\|Voie]] | Magnitude potion T-1 (parchemin 1 tier en dessous de la potion équivalente) |
| **Fruits / Légumes / Champignons** | Burst léger | Stamina (faible) | Magnitude / 3 vs Pain équivalent |
| **Viande / Poisson** | Durée moyenne | Stamina + Vigueur léger | Hériter Pain T2-T3 |
| **Fromage** | Durée longue, conservation × 5 | Stamina + Présence | Hériter Pain mais conservation étendue |
| **Gâteaux** | Burst festif + buff social | Stamina + Présence | Magnitude Pain × 1.3, durée ×0.7 |
| **Épices / Herbes** | **Modificateurs**, pas consommables directs | — | Voir [[Crafts]] |
| **Cristal** | Spécial — recharge Mana / rituel | Mana + spécial | Pattern à part, voir [[Le Lien]] |

#### Pattern cooldown global

- **Potion** : 30s même catégorie / 8s inter-catégorie → **canonique**
- **Pain / nourriture** : pas de cooldown global, mais **action lente 3-5s** (voir [[Pain]] §4)
- **Parchemin** : cooldown propre du sort encapsulé (alignement avec [[Combat]] §Mana sorts par tier)
- **Cristal** : cooldown rituel long (5+ min)

#### Pattern conservation

- **Liquides (Potion, Boisson)** : 7→180 jours selon tier, dégradation progressive, T6 instable
- **Solides cuits (Pain, Gâteau)** : 1→7 jours selon tier (cf. [[Pain]] §9)
- **Solides séchés (Viande, Fromage)** : ×3 vs Pain équivalent
- **Frais (Fruits, Légumes, Poisson)** : 1→3 jours, dégradation rapide
- **Parchemin** : durée illimitée tant que scellé, dégradation post-[[Le Souffle|Souffle]]

#### Hooks pour fabricants (Recipe Generator)

- Toutes les recettes de potion suivent : **N intrants principaux + (N-1) secondaires + 1 récipient de qualité ≥ T-1**
- Mini-jeu canonique alchimie : **dosage proportionnel + timing thermique + (T4+) séquence rituelle**
- Pattern à dériver pour cuisine : **dosage assaisonnement + timing cuisson + (T4+) découpe précise** ([[Crafts]] §Cuisine)

---

*Liens : [[Items/Index|← Index Items]] · [[Catégories d'Items]] · [[Types d'Items]] · [[Sources de Ressources]] · [[Crafts]] · [[Métiers]] · [[Combat]] · [[Personnage]] · [[Le Lien]] · [[Mort]] · [[Les Ères]] · [[L'Accord]] · [[Pain]] (référence consommable nourriture)*
