---
tags: [item, archétype, accessoire, équipement]
type: archetype
category: Équipement
subcategory: Accessoire
slot: Cou (1 simultané)
source: Fabriqué
mastery: Joaillerie
craft_category: Joaillerie et lapidaire
tier_min: 1
tier_max: 6
era_availability: [toutes]
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-enchantement-playtest, plafond-stat-cumulé, terminologie-amulette-vs-pendentif]
---

# 🪬 Amulette — Accessoire majeur

> **Slot unique au cou.** L'Amulette est l'accessoire qui porte l'**enchantement majeur** d'un personnage. Plus puissante qu'un Anneau, elle constitue le **point focal** de l'optimisation magique du build. Hérite intégralement du pattern canonique [[Anneau]] avec un poids stat de **120-130%**.

---

## 1. Vue d'ensemble

### Concept

L'**Amulette** est un objet pendant porté autour du cou — médaillon, plaque gravée, gemme sertie, talisman tribal, sceau familial. Contrairement à l'Anneau (×2 simultanés, optimisations marginales), l'Amulette est **unique** et porte typiquement l'effet le plus puissant de l'équipement non-armes/non-armures du joueur. C'est le lieu privilégié des affixes Majeur+ et des enchantements Apex.

> [!note] Amulette / Pendentif / Collier — terminologie
> Trois termes circulent en parlance commune. **Amulette** est le terme canonique d'Hybelior (item de pouvoir, généralement enchanté, porté au cou). *Pendentif* désigne plus volontiers la pièce esthétique non-magique. *Collier* désigne la chaîne ou la cordelette qui supporte la pièce. Dans les fichiers de données, toujours utiliser **Amulette** ; les variations terminologiques sont des alias narratifs régionaux (Galenor : « pendentif », Astravia : « médaillon »).

> [!important] Amulette élargie — objet de pouvoir
> Le concept canonique d'Hybelior **élargit** l'Amulette à tout *objet de pouvoir porté ou tenu* qui occupe le slot d'enchantement majeur — un *Gobelet porte-bonheur*, un *Gant de tentation* (cf. [[#9. Exemples de signatures]]) sont mécaniquement classés Amulettes même s'ils ne pendent pas au cou. Le slot est unique mais la matérialité est libre — c'est le **rang d'enchantement majeur** qui définit la classe.

### Place dans l'équipement total

| Slot | Item | Rôle |
|------|------|------|
| 8 slots d'armure | [[Plate]] / [[Mailles]] / [[Cuir]] / [[Tissu]] | Protection |
| 2 mains | Arme + Arme/Bouclier/Focus | Combat actif |
| **1 cou** | **Amulette** | **Enchantement MAJEUR (porte-effet principal)** |
| 2 doigts | [[Anneau]] ×2 | Optimisations |
| 2 poignets | [[Bracelet]] ×2 | Procs actifs |
| 1 épaule | [[Broche]] | Allégeance, social |
| 1-2 oreilles | [[Boucle d'oreille]] | Bonus mineurs |
| 1 taille | [[Ceinture-accessoire]] | Utilitaire |

### Synergie avec les autres slots

- **Amulette + Anneau de même Voie** : +5% efficacité de l'affixe principal de l'Amulette.
- **Amulette + Tome** : Amulette d'Esprit/Mémoire amplifie le coût Mana des sorts encapsulés (-3% supplémentaire).
- **Amulette + Bracelet** : Amulette = passif lourd, Bracelet = proc actif — combo classique mage.
- **Amulette + Cristal de Voie** : si l'Amulette porte un Cristal de Voie serti, elle devient *Amulette de Voie* (cf. §5).

---

## 2. Variations / sous-types

| Sous-type | Matériau dominant | Tier minimum | Profil |
|-----------|-------------------|---------------|--------|
| **Médaillon de cuir** | Cuir + dent / griffe / os | 1 | Tribal, primal ; bonus Vigueur ou Vivacité |
| **Pendentif d'argent** | Argent | 2 | Conducteur magique faible ; bonus Esprit ou Mémoire |
| **Plaque d'or gravée** | Or, gravure runique | 3 | Statut social, conducteur moyen ; +1 affixe standard |
| **Médaillon de mithril serti** | Mithril + 1 gemme taillée | 4 | Léger, conducteur fort ; 2 affixes |
| **Amulette à reliquaire** | Métal + relique de créature ou d'Éternel | 4-6 | Porte un fragment narratif, +1 affixe Apex possible |
| **Talon d'âme** *(sigillaire)* | Métal + âme scellée *(rituel Foedus)* | 5-6 | Pacte avec une âme défunte ; effets sociaux & magiques fusionnés |
| **Objet de pouvoir** | Variable (gobelet, gant, disque, etc.) | 3-6 | **Cas signatures CSV** : forme libre, fonctionne mécaniquement comme amulette |

---

## 3. Stats par tier

| Tier | Nom canonique | Bonus stat brute principal *(120-130% Anneau)* | Slots d'enchantement | Affixes magiques disponibles | Tier d'enchantement supporté | Durabilité |
|------|---------------|------------------------------------------------|----------------------|------------------------------|------------------------------|------------|
| 1 | Commun | +2 (1 stat) | 0 | 0 | — | ∞ |
| 2 | Façonné | +5 (1 stat) | 1 | 1 affixe mineur | Mineur | ∞ |
| 3 | Œuvré | +8 (1 stat) ou +4/+4 (2 stats) | 2 | 1 standard + 1 mineur | Standard | ∞ (charges) |
| 4 | Magistral | +10 (1 stat) ou +6/+5 (2 stats) | 2 | 2 affixes (1 majeur possible) | Majeur | ∞ (charges) |
| 5 | Légendaire | +15 (1 stat) ou +9/+6/+4 (3 stats) | 3 | 2 majeurs + 1 standard | Majeur | ∞ (charges) |
| 6 | Mythique | +20 (1 stat) ou +12/+8/+6 (3 stats) | 3 | 1 affixe Apex + 2 standards, OU 3 affixes majeurs | Apex / Lien profond | ∞ (charges) |

> [!important] Plafond global stats accessoires : +30%
> **Tous accessoires confondus** (Amulette + 2 Anneaux + 2 Bracelets + 1 Broche + 1-2 Boucles + 1 Ceinture-accessoire), le bonus cumulé sur **une même stat brute** ne dépasse jamais **+30%** de la valeur de base. Au-delà, le système applique un **diminishing return** dur (chaque point au-dessus du plafond compte 25%). Cela impose des arbitrages de build : empiler l'Esprit sur tous les accessoires n'est pas viable au-delà d'un certain seuil.

### Charges (affixes actifs)

| Tier | Charges max | Recharge passive | Recharge cristal |
|------|-------------|------------------|------------------|
| 3 | 250 | +6/min hors combat | +60/cristal mineur |
| 4 | 500 | +10/min | +120/cristal standard |
| 5 | 1000 | +15/min | +250/cristal majeur |
| 6 | 2000 (ou illimité passifs) | +25/min | +500/cristal apex |

### Rouille post-Souffle

Conformément à [[Le Souffle]] — rouille temporaire **−10% sur 2 semaines** post-Souffle pour Amulettes Magistral+. Les Amulettes Mythiques portant un affixe Apex peuvent voir cet affixe **scellé pendant 1 semaine** si la Voie inscrite est opposée à l'ère cosmique nouvelle.

---

## 4. Système d'enchantement

> Identique au pattern [[Anneau#4. Système d'enchantement|Anneau §4]] — cercle d'Enchanteur, intrants Cristal de Voie, Essence spirituelle, charges sur affixes actifs.

Spécificités Amulette :

- **Coût rituel +20%** par rapport à l'Anneau de même tier (l'Amulette absorbe plus d'énergie, slot principal).
- **Capacité d'inscription** Apex disponible dès le tier 5 (vs tier 6 pour l'Anneau).
- **Lien profond** *(sort/affixe ultime, Mythique)* : **réservé à l'Amulette Mythique** parmi les accessoires — l'Amulette est le seul accessoire capable d'encapsuler un effet de tier Lien profond. C'est l'argument mécanique qui fait de l'Amulette le slot accessoire dominant.

### Modulation par l'Accord

Mêmes modulateurs que l'Anneau (±10% efficacité, ±15% coût rituel selon Accord de l'Enchanteur). Bonus Voie dominante de l'ère : +5%.

### Désenchantement

Récupération de ~30-50% du cristal, jamais l'essence ni la larme d'Éternel. Coût Mana = 60% du coût d'inscription.

---

## 5. Mapping vers les Voies magiques

> **Amulette de Voie** = Amulette dont l'affixe principal est lié à une Voie spécifique. Pattern identique à [[Anneau#5. Mapping vers les Voies magiques|Anneau §5]] avec **effets amplifiés** (poids 120-130%).

### Voies primaires (5 Éternels)

| Voie | Effet d'une Amulette de Voie (tier 4+) |
|------|----------------------------------------|
| **Celestia** | +Acuité, +15% détection invisibles, regen Mana +1.5/s sous le ciel |
| **Tempora** | +8% vitesse incantation, 1 charge ralenti local (5s, 60s CD) |
| **Noctis** | +15% efficacité ombre, drain Mana ennemi sur critique amplifié |
| **Navigor** *(relique)* | +1 charge téléport courte (8m, 90s CD), insensibilité barrières spirituelles |
| **Eldoria** | +8% efficacité soins, bouclier de lumière 300 HP (180s CD) |

### Voies secondaires (8 Cosmiques magiques)

| Voie | Effet d'une Amulette de Voie (tier 4+) |
|------|----------------------------------------|
| **Aquor** | Respiration aquatique illimitée, +15% sorts eau/glace |
| **Aerion** | +8% vitesse déplacement, saut +30%, +15% portée air |
| **Aurion** | +8% dégâts arcaniques, charge enchantement temporaire d'arme (20s) |
| **Umbra** | +Furtivité majeure, +8% chance critique en attaque par derrière |
| **Spiritus** | Communication avec faune neutre, +1 invocation mineure (60s, 180s CD) |
| **Fatum** | +1.5% chance critique cumulable, 1 reroll d'événement / jour |
| **Terranu** | +Vigueur en contact sol nu, sorts pierre coût −15% |
| **Somnix** | Résistance terreur, sorts illusion coût −15%, charge confusion mentale |

> [!important] Amulette de Voie = porte-effet principal
> Une Amulette de Voie est **plus puissante** qu'un Anneau de Voie sur la même Voie : +15% efficacité (vs +10% Anneau). Cumul Amulette + Anneau de même Voie : **plafonné à +20%** (anti-stack), pas +25%.

---

## 6. Affixes / modificateurs spécifiques

> Catalogue identique à [[Anneau#6. Affixes / modificateurs spécifiques|Anneau §6]] avec valeurs amplifiées 120-130%.

### Affixes passifs

| Affixe | Tier | Effet (vs Anneau) |
|--------|------|-------------------|
| *Vigueur+* | 1-6 | +N à Vigueur (N ×1.25 par rapport à l'Anneau) |
| *Esprit+* | 1-6 | +N à Esprit (idem) |
| *Mémoire+* | 2-6 | +N à Mémoire |
| *Régen Mana passive* | 3-6 | +X/s régen Mana hors combat |
| *Réduction coût incantation* | 4-6 | −X% coût Mana sorts (plafond [[Combat]] −50%) |
| *Bonus école de magie* | 4-6 | +X% efficacité d'1 Voie spécifique |

### Affixes actifs (consomment charges)

| Affixe | Tier | Effet |
|--------|------|-------|
| *Proc bouclier* | 4-6 | À HP < 30%, bouclier 250 HP (150s CD) |
| *Liaison Lien actif* | 5-6 | Quand sort Apex lancé : prochain sort coût −60% |
| *Slot d'affixe extra* (méta) | 6 | 1 affixe au-delà du plafond du tier |
| *Drain au critique* | 4-6 | Critique → +X Mana/HP |
| *Lien profond encapsulé* | 6 | **Exclusif Amulette Mythique** : 1 effet Lien profond ancré (1×/semaine réelle) |

### Règle d'unicité

> **Une seule Amulette équipée à la fois.** Pas de cumul, contrairement aux Anneaux/Bracelets. Si un joueur possède plusieurs Amulettes, il doit choisir laquelle équiper avant le combat (action 3s, hors combat, slot exclusif).

---

## 7. Recettes (Joaillerie)

> 1 recette par tier. Recipe Generator [[Architecture Data-Driven]] paramétrise variations.

### Tier 1 — Médaillon de cuir

| Élément | Valeur |
|---------|--------|
| Métier | Tanneur + Bijoutier |
| Station | Établi de bijoutier |
| Intrants | Cuir tanné × 1, Dent/griffe × 1, Cordelette × 1 |
| Sortie | Médaillon de cuir commun |
| Mastery | Novice |
| Mini-jeu | Nœud de fixation (2 nœuds précis) |
| Durée | 1 min |

### Tier 2 — Pendentif d'argent

| Élément | Valeur |
|---------|--------|
| Métier | Bijoutier + Lapidaire |
| Station | Établi + Tour à polir |
| Intrants | Lingot d'argent × 1, Gemme taillée commune × 1, Chaîne d'argent × 1 |
| Sortie | Pendentif d'argent façonné |
| Mastery | Initié |
| Mini-jeu | Sertissage + chaînage |
| Durée | 3 min |

### Tier 3 — Plaque d'or gravée

| Élément | Valeur |
|---------|--------|
| Métier | Bijoutier → Enchanteur |
| Station | Établi + Cercle d'enchantement |
| Intrants | Lingot d'or × 1, Gemme taillée intermédiaire × 1, Chaîne d'or × 1, Cristal de Voie mineur × 1, Encre × 2 |
| Sortie | Plaque d'or œuvrée (1 affixe standard) |
| Mastery | Adepte (Joaillerie) + Initié (Scriptorium) |
| Mini-jeu | Gravure runique + sertissage |
| Durée | 8 min |

### Tier 4 — Médaillon de mithril magistral

| Élément | Valeur |
|---------|--------|
| Métier | Bijoutier → Enchanteur |
| Station | Établi + Cercle d'enchantement |
| Intrants | Lingot mithril × 1, Gemme magistrale × 1, Chaîne mithril × 1, Cristal de Voie standard × 2, Essence spirituelle × 2, Encre × 3 |
| Sortie | Médaillon magistral (2 affixes) |
| Mastery | Expert (Joaillerie) + Adepte (Scriptorium) |
| Mini-jeu | Sertissage + 6 glyphes |
| Durée | 15 min |

### Tier 5 — Amulette à reliquaire

| Élément | Valeur |
|---------|--------|
| Métier | Bijoutier Maître → Enchanteur Expert |
| Station | Établi Maître + Cercle d'enchantement étendu |
| Intrants | Mithril × 2, Gemmes légendaires × 2, Cristal de Voie majeur × 1, Cristal standard × 2, Essences × 3, Relique mineure × 1 (cf. [[Sources de Ressources]]) |
| Sortie | Amulette légendaire (3 affixes — 1 majeur + 2 standards) |
| Mastery | Maître (Joaillerie) + Expert (Scriptorium) |
| Mini-jeu | Sertissage Maître + composition 10 glyphes |
| Durée | 45 min |

### Tier 6 — Amulette mythique

| Élément | Valeur |
|---------|--------|
| Métier | Bijoutier Maître + Enchanteur Maître + porteur siège *Talos* |
| Station | Établi mythique + Cercle d'enchantement majeur (lieu cosmique) |
| Intrants | Alliage mythique × 1, Gemmes mythiques × 3, Cristal de Voie apex × 1, Cristaux majeurs × 2, Essences × 4, Cœur de créature cosmique × 1, Larme d'Éternel × 1 (Lien profond) |
| Sortie | Amulette mythique (3 affixes ou 1 Apex ou 1 Lien profond) |
| Mastery | Maître + Œuvre signée |
| Mini-jeu | Rituel cosmique 18+ glyphes (Accord ≥75%) |
| Durée | 4h+ |

---

## 8. Variants cosmiques (par ère)

> Mapping 10 variants identique à [[Anneau#8. Variants cosmiques (par ère)|Anneau §8]] et [[Tome#8. Variants cosmiques (par ère)|Tome §8]] — Shadow, Spectral, Frost, Verdoyant, Brulé, Pourpre, Doré, Brisé, Onirique, Vénérable. Effets amplifiés 120-130% sur l'Amulette par rapport à l'Anneau.

| Variant | Spécificité Amulette |
|---------|----------------------|
| **Shadow** (Noctis) | Affixe principal **doublé** en zone d'ombre, nul en plein soleil |
| **Doré** (Eldoria) | +15% soins reçus, brille en présence de Noctis (révèle), repousse mineurement morts-vivants |
| **Onirique** (Somnix) | Effet **persiste pendant le sommeil** + un sort proc passivement chaque nuit |
| **Vénérable** (Fatum) | +1.5% critique cumulé, légendes accumulées (lore narratif fort sur amulettes héritées) |

---

## 9. Exemples de signatures

### Gant de tentation *(forme : objet de pouvoir)*

> *« Un gant de soie noire qui ne se retire jamais sans laisser une trace. Ceux qui le portent obtiennent ce qu'ils veulent — au prix de ce qu'ils sont. »*
> Tier 5 — Amulette élargie, forme gantée
> Bonus narratif : +12 Verbe, *Charme implacable* (1 charge / 5 min : NPC obéit à une demande mineure), mais **−5 Mémoire en permanence tant que porté**
> Religion : Foedus Animae (perversion)

### Éclat prospère

> *« Petite pierre dorée que les marchands d'Onara passent en pendentif. Elle attire l'or et la mauvaise compagnie. »*
> Tier 4 — Amulette d'or à éclat doré
> Bonus narratif : +10 Verbe, *Veine chanceuse* (+5% gains économiques), mais attire les voleurs (+10% rencontre criminelle en ville)

### Gobelet porte-bonheur *(forme : objet de pouvoir)*

> *« Un gobelet de bois de cèdre rouge poli, transmis par une longue lignée de cueilleurs sylvains. Tenu dans la main faible, il apporte la chance des âges. »*
> Tier 4 — Amulette élargie, forme tenue
> Bonus narratif : +1% chance critique cumulé, +5 Vivacité, regen Stamina +0.5/s en forêt
> Variant : Verdoyant
> Région : Galenor sylvain

### Graal de la fidélité

> *« Coupe d'argent gravée d'un serment. Lie deux porteurs par le sang ou par la parole. »*
> Tier 5 — Amulette à reliquaire (couple)
> Bonus narratif : +10 Esprit pour chaque porteur, *Lien partagé* (les deux porteurs sentent la direction et l'état de l'autre à toute distance ; brise si un serment est trahi)
> Religion : Foedus Animae (vertueux)

### Fontaine de vitesse

> *« Petite fiole-pendentif d'eau intemporelle, vestige de Tempora. Elle accélère le porteur quand il en boit, mais s'épuise en 3 gorgées. »*
> Tier 6 — Amulette mythique (relique Tempora)
> Bonus narratif : +20 Vivacité, *Hâte temporelle* (3 charges/jour : doublement vitesse pendant 8s)
> Variant : Spectral

### Disque d'effroi

> *« Disque de bronze ancien, gravé d'un cri. Les ennemis s'écartent du porteur, mais ses alliés aussi. »*
> Tier 5 — Amulette de pacte (Noctis ou Fatum)
> Bonus narratif : +12 Vigueur, *Aura d'effroi* (ennemis < tier 4 fuient, alliés à -10% moral)
> Variant : Shadow ou Vénérable

---

## 10. Décisions ouvertes / chantiers de profondeur

- **Plafond global +30%** : à valider en playtest. Risque : trop dur ou trop permissif.
- **Lien profond exclusif Amulette** : justifie le slot dominant — confirme-t-on cette exclusivité ou Tome Mythique partage-t-il ?
- **Amulettes "objet de pouvoir"** : matérialités libres (gobelet, gant) — clarifier visuellement en HUD/inventaire qu'il s'agit du slot Amulette.
- **Amulette transmise héréditairement** : système de blasons/lignées (cf. [[Anneau]] §10) à creuser.
- **Cumul Amulette de Voie + Anneau de même Voie** : plafond +20% — playtest pour ajuster.

### Branches transverses

- [[Anneau]] — pattern de référence accessoire
- [[Économie]] §Catégorie 3 — économie d'enchantement
- [[Architecture Data-Driven]] §ItemModifier Generator
- [[Le Lien]] — Voies, Lien profond
- Consécration *Talos* (talismans/protection) — honneur mortel lié à une entité, jamais un siège cosmique ; concerne les Amulettes Mythiques (cf. [[L'Accord]] ; entités : [[Cosmologie]] §Les rangs inférieurs)
- [[Le Souffle]] — rouille post-Souffle
- [[L'Accord]] — modulation rituel
- [[Foedus Animae]] — religion liée aux pactes d'âme

---

*Liens : [[Items/Index|← Index Items]] · [[Catégories d'Items]] · [[Anneau]] · [[Tome]] · [[Le Lien]] · [[Personnage]] · [[Économie]]*
