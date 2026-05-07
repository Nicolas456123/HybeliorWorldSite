---
tags: [item, archétype, focus, équipement, magie]
type: archetype
category: Équipement
subcategory: Focus magique
slot: Main libre (porté en main gauche, ou attaché ceinture si arme 2H)
source: Fabriqué
mastery: Scriptorium
craft_category: Scriptorium et enchantement
tier_min: 1
tier_max: 6
era_availability: [toutes]
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-enchantement-playtest, charges-vs-cooldowns, overlap-livre-récipient, overlap-cristal-de-voie]
---

# 📖 Tome — Archétype-référence Focus magiques

> Pattern canonique pour la sous-famille **Focus magiques (non-armes)**. Tout autre type de focus (Orbe, Talisman, Cristal de Voie, Bandeau frontal/Reliure) **hérite de la structure** posée ici, avec ses propres ajustements de slot, de signature visuelle et de rapport au Lien.

---

## 1. Vue d'ensemble

### Concept

Le **Tome** (ou **Grimoire**) est un livre relié, parfois orné, qui contient un ou plusieurs **sorts encapsulés**, ainsi que des **rituels** et du **savoir** structurant. Contrairement à un parchemin (consommable, [[Catégories d'Items]] §Consommable) qui est un sort à usage unique se consumant à la lecture, le Tome est un **focus permanent** : il se porte, se consulte en combat ou hors combat, et ses sorts peuvent être lancés **plusieurs fois** par cycle de charges/recharges.

Le Tome est **conditionné** : il accède à ses sorts seulement si le porteur remplit certaines conditions (Voie active correspondante, palier de Lien, Accord minimum, parfois un serment narratif). Il n'est pas un menu de sorts gratuit ; c'est une **bibliothèque magique disciplinée**.

### Tome vs Livre Récipient *(critique)*

| Trait | **Tome** *(Équipement, Focus magique)* | **Livre Récipient** *(Consommable, §Consommable)* |
|------|----------------------------------------|--------------------------------------------------|
| Usage | Plusieurs fois (charges/recharges) | **Single-use** (se consume à la lecture) |
| Slot | Équipé (main libre / dos / ceinture) | Inventaire consommable |
| Création | Scriptorium (Enchanteur, rituel long, intrants élevés) | Scribe (intrants plus simples, scellage rituel) |
| Tier | 1-6 (durable, évolutif via ré-enchantement) | 1-5 (jetable) |
| Conditionnement | Voie active, palier Lien, Accord | Accessible aux non-Liés (avec malus) |
| Rouille post-Souffle | Oui, Magistral+ | Non (consommé avant) |
| Économie | Achats marchand magique, transmission | Marché de masse, parchemins à grande échelle |

> **Règle frontière** : un Tome **vidé de toutes ses charges et désinscrit** redevient un livre vierge (Récolte fabriquée intermédiaire). Un Livre Récipient activé ne redevient jamais un Tome.

### Place dans l'équipement total

| Slot | Item | Rôle |
|------|------|------|
| Main droite | Sceptre / Arme 1H magique | Sort actif via [[Armes et Maîtrise]] |
| **Main gauche** | **Tome** *(ou Orbe, Talisman, Bouclier)* | **Sorts encapsulés, rituels, savoir actif** |
| Cou | Amulette | Enchantement majeur (cf. [[Anneau]] §1) |
| 2 doigts | Anneau ×2 | Optimisation enchantement |
| Tête / corps | [[Bandeau frontal]] / focus discret | Focus de Voie passif |

Un Lié-typique porte typiquement **Sceptre (main droite) + Tome (main gauche)** — combo maximal de sorts. Un Lié explorateur préfèrera **Tome porté au dos + arme 1H** pour conserver une main libre. Un Lié furtif préfèrera **Talisman** au lieu de Tome (moins voyant).

### Synergie avec les autres slots

- **Tome + Sceptre** : le Sceptre amplifie la Voie générale ; le Tome donne accès à des sorts spécifiques. Combo phare du build « mage classique ».
- **Tome + Anneau runique de même Voie** : +5% efficacité sorts encapsulés (cf. [[Anneau]] §5).
- **Tome + Cristal de Voie serti dans une armure** : amplifie la Voie sur tous les sorts (Tome inclus).
- **Tome + Bandeau frontal** : +Mémoire (consultation rituelle plus rapide, −10% temps d'incantation des sorts du Tome).

---

## 2. Variations / sous-types

| Sous-type | Concept | Tier minimum | Profil |
|-----------|---------|---------------|--------|
| **Tome de Voie** | Dédié à une Voie unique (1 par Voie parmi 5+8 = 13 Voies canoniques) | 2-6 | Le sous-type le plus fréquent ; structure les sorts d'une Voie |
| **Grimoire de rituels** | Contient des **rituels** (sorts longs, hors combat) — invocation, enchantement temporaire, prédiction, scellement | 3-6 | Très utile crafting/exploration ; charges quotidiennes |
| **Codex de savoir** *(non-magique)* | Contient des recettes, du lore, des cartes, des arbres généalogiques | 1-5 | Pas un focus magique strict — équipe, mais offre bonus passif (Mémoire, gain XP métier) |
| **Tome scellé** *(multi-sorts)* | Plusieurs sorts inscrits, mais **le sceau ne se brise** que sous condition (palier Lien, Accord, lieu, ère) | 4-6 | Profil rare, signature ; high-risk-high-reward |
| **Livre de pacte** | Lié à un **Cosmique** ou **Éternel** précis ; le porteur signe un serment et reçoit accès aux sorts | 5-6 | Mythique — permet à un non-Lié d'accéder à 1 sort de Voie via pacte ; coût narratif lourd |

> Les **Tomes de Voie** sont le pattern principal. Tous les sous-types reprennent la structure d'enchantement (§4) et le système de charges (§3), avec ajustements.

---

## 3. Stats par tier

| Tier | Nom canonique | Sorts encapsulés (nb max) | Tier des sorts max | Charges totales (combat) | Tier d'inscription supporté | Bonus passifs |
|------|---------------|---------------------------|--------------------|--------------------------|----------------------------|---------------|
| 1 | Commun | 1 | Mineur | 5/jour réel | Mineur | +2 Mémoire |
| 2 | Façonné | 1-2 | Mineur | 8/jour | Mineur | +4 Mémoire ou +3 Esprit |
| 3 | Œuvré | 2-3 | Standard | 12/jour | Standard | +5 Mémoire, +3 Esprit, regen Mana +0.5/s hors combat |
| 4 | Magistral | 3-4 | Standard ou 1 Majeur | 18/jour | Majeur | +8 Mémoire, +5 Esprit, regen Mana +1/s, −5% coût incantation Voie liée |
| 5 | Légendaire | 4-5 | Majeur ou 1 Apex | 25/jour | Majeur | +10 Mémoire, +8 Esprit, +5 Résonance, −10% coût incantation, +1 slot d'action |
| 6 | Mythique | 5-7 | Apex ou 1 Lien profond | 40/jour (ou illimité hors combat sur certains rituels) | Apex | +15 Mémoire, +12 Esprit, +8 Résonance, −15% coût, +1 slot, +5% chance proc gratuit |

> [!important] Tier d'inscription vs Tier du Tome
> Un **Tome Œuvré (T3)** peut contenir des sorts de tier **Mineur** ou **Standard**. Il ne peut pas contenir de sort Majeur. Pour un sort Majeur, il faut un Tome Magistral (T4) ou plus. Le tier du Tome **plafonne** la complexité des sorts qu'il peut encapsuler.

> [!important] Calibration vs Sceptre (arme magique)
> Le Sceptre apporte des dégâts directs (DPS magique) + amplifie la Voie sur les sorts du Lien. Le Tome n'a **pas de DPS direct** ; il apporte des sorts encapsulés indépendants. Ratio cible : un Tome Mythique permet ~40% de sorts supplémentaires par jour mais aucun bonus de dégâts magiques directs ; un Sceptre Mythique apporte ~+30% dégâts magiques et amplification active. **Tome ≠ remplacement de Sceptre, ils sont complémentaires.**

### Charges et recharges

| Modalité de recharge | Effet |
|----------------------|-------|
| **Repos en auberge / sanctuaire** (≥4h gameplay) | Recharge complète |
| **Méditation** (regen Mana, [[Combat]]) | +1 charge / 5 min |
| **Sacrifice rituel** (Essence spirituelle / Cristal de Voie) | +5 charges immédiat (consomme 1 cristal mineur) |
| **Aube post-Souffle** (1ère utilisation après Souffle) | Recharge complète + 50% bonus pour 24h |
| **Lecture par Maître Scribe** *(autre joueur)* | +3 charges (service marchand possible) |

### Rouille post-Souffle

Conformément à [[Le Souffle]], les Tomes Magistral+ subissent **−10% sorts/jour pendant 2 semaines** post-Souffle. Les sorts les plus puissants (Apex, Lien profond) peuvent être **temporairement scellés** pendant 1 semaine si la Voie inscrite est opposée à la Voie dominante de la nouvelle ère.

---

## 4. Système d'enchantement (inscription des sorts)

> Branche [[Architecture Data-Driven]] §ItemModifier Generator. Le "modifier" d'un Tome est un **sort encapsulé** plutôt qu'un affixe stat (différence pattern par rapport à l'Anneau).

### Comment un sort est encapsulé dans un Tome

```
[Tome vierge] (Scribe + Relieur, Scriptorium)
    → Reliure de cuir tanné, parchemins brochés, encre standard
    ↓
[Cercle d'enchantement] (Enchanteur, palier Adepte+)
    → Rituel d'inscription : trace les glyphes du sort, lie au Cristal de Voie
    ↓
[Tome inscrit]
    → 1-7 sorts encapsulés, charges actives, conditionnement appliqué
```

### Coût en intrants par sort inscrit

| Tier de sort inscrit | Mana rituel | Cristal de Voie | Essence spirituelle | Encre rare | Éclats Enchanteur | Maîtrise Scriptorium |
|----------------------|-------------|-----------------|---------------------|------------|-------------------|----------------------|
| Mineur | 80 pts | 1 mineur | — | 1 portion | 100-400 Éclats | Initié |
| Standard | 200 pts | 1 standard | 1 essence | 2 portions | 1000-3000 | Adepte |
| Majeur | 450 pts | 1 majeur + 1 standard | 2 essences | 4 portions | 6000-15000 | Expert |
| Apex | 800 pts | 1 apex + 2 standard | 3 essences + 1 cœur cosmique | 8 portions encre rare | 25000-80000 | Maître |
| Lien profond *(seul Tome Mythique)* | 1500 pts | 1 apex + 3 majeurs | 5 essences + 1 cœur cosmique + 1 larme d'Éternel | 15 portions | 80000-200000 | Maître + Œuvre signée |

### Condition de tirage des sorts (conditionnement narratif)

> Tous les sorts d'un Tome sont **conditionnels**. Conditions canoniques :

| Condition | Sorts concernés | Effet si non rempli |
|-----------|------------------|---------------------|
| **Voie active correspondante** | Tome de Voie | Sort inaccessible (le porteur peut lire sans lancer) |
| **Palier Lien minimum** (1-5) | Sorts Standard+ | Tier Lien ≥ tier sort − 1 ; sinon sort lance avec ×1.5 coût Mana |
| **Accord ≥ X%** | Sorts Majeur+ | <50% Accord : −20% efficacité ; <25% : sort scellé |
| **Lieu rituel** *(rare)* | Sorts de pacte | Doit être dans le sanctuaire ou la zone consacrée |
| **Ère cosmique** *(rare)* | Sorts d'ère | Voie liée doit être amplifiée par l'ère active |

### Modulation par l'Accord (Enchanteur ET porteur)

- Enchanteur Accord ≥ 75% lors de l'inscription : **−15% coût rituel**, le sort gagne **+5% efficacité** intrinsèque
- Porteur du Tome Accord ≥ 75% : **+10% sorts/jour**, **−5% coût Mana** des sorts encapsulés
- Porteur Accord ≤ 25% : **−15% sorts/jour**, **+10% coût Mana**

### Désinscription / réinscription

Un Enchanteur Expert+ peut **effacer** un sort d'un Tome (rite de purgation, consume 50% du cristal initial, l'essence spirituelle est perdue). Cela libère un slot pour un nouveau sort. Coût Mana : 70% du coût d'inscription.

---

## 5. Mapping vers les Voies magiques

> Catalogue exhaustif des **Tomes de Voie** par les 13 Voies canoniques (5 Éternels + 8 Cosmiques magiques).

### Voies primaires (5 Éternels)

| Voie | Profil du Tome | Sorts emblématiques (Standard à Apex) |
|------|----------------|----------------------------------------|
| **Codex Stellaire** *(Celestia)* | Vision, guidage, protection | *Étoile-guide*, *Bouclier céleste*, *Constellation veille* (Apex : révèle tous les masquages dans 50m), *Fixation des chemins* |
| **Tomus Æonum** *(Tempora)* | Manipulation temporelle, vision passé | *Ralenti local*, *Vision rétroactive 30s*, *Pause perceptive*, *Glissement temporel* (Apex) |
| **Liber Noctis** *(Noctis)* | Ombres, drain, terreur | *Voile d'ombre*, *Drain de mana*, *Pas dans l'ombre*, *Terreur cosmique* (Apex), *Marche des ombres* |
| **Tomus Trans-Mundo** *(Navigor)* — relique | Portails, invocation d'esprits | *Ouverture de passage*, *Appel d'âme errante*, *Téléport longue distance* (Apex), *Communion avec les morts* |
| **Codex Solis** *(Eldoria)* | Lumière pure, soin, révélation | *Aube guérisseuse*, *Bouclier solaire*, *Révélation*, *Destruction du mal* (Apex), *Rayon créateur* |

### Voies secondaires (8 Cosmiques magiques)

| Voie | Profil du Tome | Sorts emblématiques |
|------|----------------|---------------------|
| **Codex Aquoris** *(Aquor)* | Eau, glace, flux | *Vague*, *Mur de glace*, *Respiration aquatique*, *Tsunami* (Apex) |
| **Liber Ventus** *(Aerion)* | Vent, vol, tempête | *Rafale*, *Vol bref*, *Tempête*, *Tornade* (Apex) |
| **Tomus Aurionis** *(Aurion)* | Arcanisme pur, énergie | *Trait d'énergie*, *Surcharge*, *Enchantement temporaire d'arme*, *Décharge arcanique* (Apex) |
| **Codex Umbræ** *(Umbra)* | Furtivité, illusions | *Ombre du double*, *Voile de masquage*, *Piège d'ombre*, *Royaume des ombres* (Apex) |
| **Tomus Spiritus** *(Spiritus)* | Nature, invocation, soin | *Soin par la nature*, *Invocation animal mineur*, *Communication faune*, *Convocation de la forêt* (Apex) |
| **Liber Fati** *(Fatum)* | Destins, malédictions, augures | *Malédiction mineure*, *Augure court terme*, *Altération de probabilité*, *Lecture de destin* (Apex) |
| **Codex Terrarum** *(Terranu)* | Terre, fertilité, tremblements | *Mur de pierre*, *Croissance accélérée*, *Tremblement local*, *Pierre vivante* (Apex) |
| **Liber Somniorum** *(Somnix)* | Rêves, illusions, confusion | *Confusion mentale*, *Vision rêvée*, *Sommeil forcé*, *Royaume onirique* (Apex) |

> [!note] Tome polyvalent multi-Voie
> Un Tome peut **contenir des sorts de plusieurs Voies différentes** (rare, signature) — mais le porteur ne peut lancer que les sorts de **sa Voie active** (mono-Voie [[Le Lien]]). Les autres sorts restent dormants jusqu'à rupture du Lien actuel et changement de Voie. Cas typique : un *Tome Encyclopédique* compilé par un érudit, transmis à différents Liés successifs.

> [!important] Tome ≠ accès à la Voie
> Posséder un Tome de Voie X ne **rend pas Lié** à X. Pour les sorts Mineur, un non-Lié peut tenter le lancement (avec **×2 coût Mana, +50% chance d'échec**, et risque de **rétrofeu**). Pour Standard+, le Lien est obligatoire — sauf via *Livre de pacte* (sous-type spécial, §2).

---

## 6. Affixes / modificateurs spécifiques

> Au-delà des sorts encapsulés, un Tome porte aussi des **modificateurs passifs**.

### Affixes passifs structurants

| Affixe | Tier disponible | Effet |
|--------|-----------------|-------|
| *+Mémoire* | 1-6 | +N à Mémoire |
| *+Esprit* | 2-6 | +N à Esprit |
| *+Résonance* | 4-6 | +N à Résonance |
| *Régen Mana hors combat amplifiée* | 3-6 | +X/s |
| *Réduction coût incantation Voie X* | 4-6 | −X% pour sorts d'1 Voie spécifique |
| *Bonus à 1 école de magie* | 4-6 | +X% efficacité d'1 Voie |
| *Charges régénérables d'inscription* | 4-6 | 1 sort/jour rejoue gratuitement, 1× /jour |
| *Liaison à un Lien actif* | 5-6 | Quand un sort Apex est lancé : prochain sort encapsulé du Tome coûte 0 charge |
| *Slot de sort extra* (méta) | 5-6 | Permet 1 sort supplémentaire au-delà du plafond du tier |

### Affixes narratifs / sociaux *(Codex de savoir)*

| Affixe | Effet |
|--------|-------|
| *Recettes débloquées (X)* | Permet d'apprendre N recettes d'un métier sans formation directe |
| *Carte révélée* | Révèle une zone précise d'un continent |
| *Lore d'une religion* | Bonus diplomatie +X% avec 1 faction religieuse |
| *Langues anciennes* | Permet de lire 1 langue oubliée — branche siège *Lingua* (cf. [[Cosmologie]] §Sièges Éthérés) |

### Règle d'unicité du Tome

> **Un seul Tome équipé à la fois.** Contrairement aux Anneaux (×2), un Tome occupe la main libre / le slot focus. Si le joueur veut accéder aux sorts d'un autre Tome, il doit le sortir manuellement (action 2s, hors combat). Cela impose **un choix de build** : un Tome de combat (Liber Noctis) ou un Tome de soin (Codex Solis), pas les deux simultanément.

---

## 7. Recettes (Scriptorium et enchantement)

> 1 recette par tier. Les variations (Voie, sceau, sous-type) sont paramétrisées par Recipe Generator.

### Tier 1 — Codex novice

| Élément | Valeur |
|---------|--------|
| Métier | Scribe |
| Station | Pupitre de scribe |
| Intrants | Parchemin × 5, Encre × 1, Cuir tanné × 1 (reliure simple), Fil × 1 |
| Sortie | Codex commun (1 sort Mineur préinscrit OU Codex de savoir basique) |
| Mastery | Novice (Scriptorium) |
| Mini-jeu | Calligraphie (3 lignes de tracé précis) |
| Durée | 5 min |

### Tier 2 — Tome de Voie débutant

| Élément | Valeur |
|---------|--------|
| Métier | Scribe + Relieur → Enchanteur (initial) |
| Station | Pupitre + Atelier de reliure |
| Intrants | Parchemin × 8, Encre × 2, Cuir tanné × 2, Fil métallique × 1, Cristal de Voie mineur × 1 |
| Sortie | Tome de Voie façonné (1 sort Mineur, 1 affixe passif tier 2) |
| Mastery | Initié (Scriptorium) |
| Mini-jeu | Calligraphie + reliure (6 lignes + 4 nœuds) |
| Durée | 15 min |

### Tier 3 — Tome œuvré

| Élément | Valeur |
|---------|--------|
| Métier | Scribe + Enchanteur |
| Station | Pupitre + Cercle d'enchantement |
| Intrants | Parchemin × 12, Encre × 3, Cuir tanné × 2, Fil métallique × 2, Cristal de Voie mineur × 2, Essence spirituelle × 1 |
| Sortie | Tome œuvré (2 sorts dont 1 Standard, 1 affixe passif tier 3) |
| Mastery | Adepte (Scriptorium) |
| Mini-jeu | Calligraphie + reliure + séquence rituelle (5 glyphes) |
| Durée | 45 min |

### Tier 4 — Tome magistral (signature de Voie)

| Élément | Valeur |
|---------|--------|
| Métier | Scribe Maître + Enchanteur Expert |
| Station | Pupitre Maître + Cercle d'enchantement étendu |
| Intrants | Parchemin × 20, Encre rare × 4, Cuir tanné × 3, Fil métallique × 3, Cristal de Voie standard × 2, Essence spirituelle × 2 |
| Sortie | Tome magistral (3-4 sorts dont 1 Majeur possible, 2 affixes passifs) |
| Mastery | Expert (Scriptorium), Adepte (Joaillerie pour la sertissure du cristal) |
| Mini-jeu | Calligraphie + reliure + composition runique (8 glyphes séquencés) |
| Durée | 2h |

### Tier 5 — Tome légendaire

| Élément | Valeur |
|---------|--------|
| Métier | Scribe Maître + Enchanteur Maître |
| Station | Pupitre Maître + Cercle d'enchantement majeur |
| Intrants | Parchemin × 30, Encre rare × 8, Cuir tanné × 5 (cuir de créature haut tier), Fil de mithril × 4, Cristal de Voie majeur × 1, Cristal de Voie standard × 2, Essences spirituelles × 3 |
| Sortie | Tome légendaire (4-5 sorts dont 1 Apex possible, 2 affixes passifs majeurs, 1 emplacement de slot extra) |
| Mastery | Maître (Scriptorium) + Expert (Lapidaire) |
| Mini-jeu | Calligraphie cosmique (12 glyphes complexes, séquence + timing) |
| Durée | 8h gameplay (avec rituel d'incubation) |

### Tier 6 — Tome mythique

| Élément | Valeur |
|---------|--------|
| Métier | Scribe Maître + Enchanteur Maître + porteur du siège *Luxa* (runes) ou *Legatus* (lore) |
| Station | Cercle d'enchantement majeur **dans un lieu cosmique** (sanctuaire, brèche, zone d'Accord 100%) |
| Intrants | Parchemin × 50 (parchemin de créature spirituelle), Encre cosmique × 15, Cuir mythique × 8, Fil de métal cosmique × 6, Cristal de Voie apex × 1, Cristaux de Voie majeur × 3, Essences spirituelles × 5, Cœur de créature cosmique × 1, **Larme d'Éternel** × 1 (composant unique, voir [[Sources de Ressources]]) |
| Sortie | Tome mythique (5-7 sorts dont 1 Apex ou 1 Lien profond, 3 affixes passifs apex, 2 slots extra) |
| Mastery | Maître + Œuvre signée (titre permanent, voir [[L'Accord]] §Héritage) |
| Mini-jeu | Rituel cosmique (20+ glyphes, cycle complet de l'ère, doit se faire à un moment d'Accord ≥75%) |
| Durée | 24h gameplay réparti sur 3-7 jours réels (rituel cyclique) |

---

## 8. Variants cosmiques (par ère)

> 10 variants canoniques (cf. [[Les Ères]]). Pour les Tomes, les variants modulent les **sorts encapsulés** et leur efficacité.

| Variant | Entité | Effet sur Tome |
|---------|--------|----------------|
| **Shadow** | Noctis | Sorts gagnent +20% efficacité en zone d'ombre, mais −15% en lumière directe |
| **Spectral** | Tempora | Les sorts ont une silhouette d'écho — 5% chance de proc 2× ; charges -20% |
| **Frost** | Aquor froid | Encre givrée : sorts d'eau/glace +25% efficacité, autres −10% |
| **Verdoyant** | Spiritus + Terranu | Reliure de lierre : sorts de soin/nature +20%, regen Mana en forêt +1/s |
| **Brulé** | Voie de Feu *(à confirmer)* | Pages noircies : sorts de feu disponibles si Voie de Feu officialisée ; sinon, sorts inscrits prennent un DoT léger |
| **Pourpre** | Umbra | Brouillard pourpre s'élève à l'ouverture : +1 charge furtivité gratuite/jour |
| **Doré** | Eldoria | Pages rayonnantes : sorts de soin +30%, sorts de Noctis bloqués si dans même Tome |
| **Brisé** | Tempora aigu | Glyphes erratiques : 5% chance de proc différent (sort lancé devient un sort aléatoire du Tome) |
| **Onirique** | Somnix | **Sort actif aussi pendant le sommeil du porteur** — proc passif 1×/jour pendant le repos (utile pour soin, regen, vigilance) |
| **Vénérable** | Fatum | Marges runiques de prophétie : +1% chance critique cumulé, sorts d'augure permanent débloqués |

> Un Tome trouvé/forgé pendant l'**Ère du Crépuscule** peut cumuler **Doré + Pourpre** (sorts de Noctis + Eldoria coexistent dans le même Tome — instable, mais signature unique).

---

## 9. Exemples de signatures *(stub Phase 4)*

### Codex des Eaux d'Aquor

> *« Compilé par les Plongeurs d'Onara dans les profondeurs de la Fosse Bleue, ce tome respire avec l'océan. »*
> Tier 5 — Tome de Voie *Codex Aquoris*, reliure de cuir d'écaille
> Sorts : *Vague*, *Respiration aquatique*, *Mur de glace*, *Tsunami* (Apex conditionnel : Accord 75%+)
> Bonus narratif : permet de lire les courants océaniques (révèle les routes maritimes)
> Région : Onara, ports d'Aquor

### Grimoire Onirique de Somnix

> *« Écrit pendant un sommeil lucide d'un Maître Scribe ; ses pages changent légèrement à chaque lecture. »*
> Tier 5 — Tome de Voie *Liber Somniorum*, variant **Onirique** d'origine
> Sorts : *Confusion mentale*, *Sommeil forcé*, *Vision rêvée*, *Royaume onirique* (Apex)
> Bonus narratif : sorts du Tome **proc passifs pendant le sommeil** du porteur — il peut se réveiller avec un sort déjà actif
> Religion : Somnium Vigil

### Tome Scellé de Navigor *(relique du disparu)*

> *« Un livre fermé par 3 sceaux d'âme. Personne n'a réussi à les briser depuis l'Arrachement. »*
> Tier 6 (mythique) — *Tomus Trans-Mundo*, **scellé** (sous-type)
> Conditions de descellement (cachées) :
> - Sceau 1 : visiter les 3 zones où Navigor laissait sa marque (cf. [[Histoire d'Hybelior]])
> - Sceau 2 : avoir établi un Lien temporaire avec un Cosmique de pacte (Anima ou Mentor)
> - Sceau 3 : 100% Accord pendant un Souffle Cardinal (condition mythique 🔒)
> Sorts (une fois descellés) : *Ouverture de passage*, *Appel d'âme errante*, *Téléport longue distance*, **Communion avec les morts** (Apex), **Marche entre les mondes** (Lien profond — sort extrêmement rare, peut révéler ce qu'il est advenu de Navigor)

---

## 10. Décisions ouvertes / chantiers de profondeur

### Questions ouvertes spécifiques au Tome

- **Charges/jour vs Cooldowns individuels** : décision actuelle = pool de charges global (`charges/jour`) — alternative : cooldown par sort comme dans [[Combat]]. Choix influencé par playtest. Risque actuel : un mage spamme tous les sorts mineurs jusqu'à épuisement, bloquant la diversité.
- **Overlap avec Livre Récipient** : le pont est défini (§1), mais à valider — un Livre Récipient découvert peut-il être *transmuté* en Tome via rituel ? Recommandation : non (préserve la distinction usage-unique vs durable).
- **Overlap avec Cristal de Voie** *(autre focus magique)* : un Cristal est plus passif (porte une affinité de Voie), un Tome est actif (porte des sorts). Distinction posée — à étoffer dans l'archétype Cristal de Voie.
- **Tome et palier Lien profond (5)** : seuls les Tomes Mythiques peuvent encapsuler un sort *Lien profond* — à valider si cela ne fragilise pas le rite cosmique de Lien profond (cf. [[Le Lien]]).
- **Pacte avec Cosmique** *(Livre de pacte sous-type)* : mécanique narrative à creuser — implique-t-il une **dette Karma** progressive ?
- **Tome transmis post-mort** : un Tome peut-il être hérité par un autre joueur ? Recommandation : oui, sceau d'héritage activable via Foedus Animae (économie sociale, branche signatures).

### Notes pour les autres archétypes Focus magiques

> Pour les agents qui produiront **Orbe, Talisman, Cristal de Voie, Bandeau frontal/Reliure** :

1. **Reprendre la structure 10 sections** de ce fichier.
2. **Calibration de profil par focus** :
   - **Orbe** : sphère cristalline tenue en main libre — **amplificateur passif** d'une Voie spécifique (+15-25% à tous les sorts de la Voie). Pas de sorts encapsulés. Plus simple qu'un Tome, plus puissant en bonus passif.
   - **Talisman** : petit objet (cou ou ceinture) — **ancre rituelle / pacte**. Porte 1 sort encapsulé unique mais à charges illimitées, conditionné par pacte. Recoupe avec siège Éthéré *Talos*.
   - **Cristal de Voie** : cristal taillé attaché à l'équipement (broche, anneau, arme) — **signature de la Voie pratiquée**. Bonus visuel + +5-10% à la Voie. Composant aussi (intrant des Tomes/Anneaux). Recoupe avec [[Sources de Ressources]] §Cristal.
   - **Bandeau frontal / Reliure** : tissu enchanté autour du front — **focus discret**. Bonus Mémoire + −5-10% temps d'incantation. Compatible avec capuche de tissu (slot armure tête).
3. **Reprendre le système d'enchantement à l'identique** (cercle, cristal, essence, charges).
4. **Distinction Tome unique vs Orbe/Talisman/Bandeau** : un seul **focus principal** équipé à la fois (slot main libre OU slot front pour bandeau, slot cou pour talisman recouvrant amulette à arbitrer).
5. **Signatures par pays/religion/Voie** : 2-3 par focus, alignées sur les religions et régions (cf. [[Cosmologie]] §Religions).
6. **Variants cosmiques** : reprendre le mapping 10 variants (cohérence inter-focus).

### Branches transverses

- [[Économie]] §Catégorie 3 — économie d'enchantement (forte charge sur les Tomes haut tier — Cristaux apex, larmes d'Éternel)
- [[Architecture Data-Driven]] §ItemModifier Generator — paramètre les sorts encapsulés
- [[Architecture Data-Driven]] §Recipe Generator — recettes par tier × Voie × région
- [[Le Lien]] — Voies, mono-Voie, opposition magique, palier Lien profond
- [[Combat]] §Sorts de Voie — alignement des coûts Mana et incantation des sorts encapsulés
- [[Cosmologie]] §Sièges Éthérés — *Luxa* (runes), *Legatus* (lore), *Lingua* (langues anciennes), *Arcana* (savoir mystique) sont les sièges concernés par les Tomes Mythiques
- [[Le Souffle]] — rouille post-Souffle s'applique aux Tomes Magistral+
- [[L'Accord]] — modulation du rituel d'inscription ET de l'efficacité du Tome porté
- [[Catégories d'Items]] §Livre Récipient — distinction critique préservée
- [[Anneau]] — Anneau de Voie cumule à +5% efficacité avec Tome de même Voie

---

*Liens : [[Items/Index|← Index Items]] · [[Catégories d'Items]] · [[Crafts]] · [[Le Lien]] · [[Combat]] · [[Personnage]] · [[Cosmologie]] · [[Anneau]]*
