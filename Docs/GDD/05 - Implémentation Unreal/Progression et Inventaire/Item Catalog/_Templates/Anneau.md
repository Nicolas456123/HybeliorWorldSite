---
tags: [item, archétype, accessoire, équipement]
type: archetype
category: Équipement
subcategory: Accessoire
slot: Main gauche / Main droite (max 2 portés simultanément)
source: Fabriqué
mastery: Joaillerie
craft_category: Joaillerie et lapidaire
tier_min: 1
tier_max: 6
era_availability: [toutes]
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-enchantement-playtest, durabilité-ou-charges, overlap-cristal-de-voie]
---

# 💍 Anneau — Archétype-référence Accessoires

> Pattern canonique pour la sous-famille **Accessoires**. Tout autre type d'accessoire (Amulette, Broche, Bracelet, Boucle d'oreille, Ceinture-accessoire) **hérite de la structure** posée ici, avec ses propres ajustements de slot et d'effet.

---

## 1. Vue d'ensemble

### Concept

L'**Anneau** est l'item d'**enchantement portable** par excellence. Petit, métallique, gravé ou serti, il sert de **support physique** à un effet magique stable — généralement un bonus de stat brute, une régénération passive, une résistance, ou un proc d'effet conditionnel. Un anneau brut sortant de la forge d'un Bijoutier est déjà fonctionnel (bonus stat modeste lié au matériau et à la gemme). Un anneau **enchanté** par un Enchanteur dans un cercle de Scriptorium reçoit en plus 1 à 3 affixes magiques selon son tier.

> [!note] Anneau vs Bague
> **Anneau** est le terme canonique d'Hybelior. *Bague* est utilisé en parlance commune dans certaines régions (Galenor, Astravia) mais désigne le même objet. Préfixer toujours « Anneau » dans les fichiers de données et le lore officiel.

### Place dans l'équipement total

| Slot | Item | Rôle |
|------|------|------|
| 8 slots d'armure | [[Plate]], [[Mailles]], [[Cuir]], [[Tissu]] | Protection physique/magique principale |
| 2 mains | Arme + Arme/Bouclier/Focus | Combat actif |
| 1 cou | [[Amulette]] | Enchantement majeur (porte-effet principal) |
| 2 poignets | [[Bracelet]] | Enchantements actifs (régen, proc combat) |
| **2 mains (doigts)** | **Anneau** | **Bonus stat passif + 1 enchantement modeste** |
| 1 épaule | [[Broche]] | Allégeance, social, signature |
| 1-2 oreilles | [[Boucle d'oreille]] | Bonus mineur, éclats de Voie |
| 1 taille | [[Ceinture-accessoire]] | Pochettes, breloques, bourse |

L'anneau **complète** l'armure et l'amulette : il n'est jamais le porteur de l'enchantement majeur du personnage (c'est le rôle de l'amulette ou du focus magique). Il optimise des marges — `+5` Vigueur, `+3%` régen Mana, `−5%` coût d'incantation. **2 anneaux portés simultanément maximum** : un par main, jamais 2 sur la même main (règle d'esthétique + limite d'empilement magique).

### Synergie avec les autres slots

- **Anneau + Amulette** : l'amulette porte le sort principal, l'anneau optimise le coût/régen pour le soutenir.
- **Anneau + Tome** *(focus magique)* : un Anneau de Voie peut amplifier les sorts encapsulés dans un Tome lié à la même Voie (+5% efficacité).
- **Anneau + Sceptre** : un Anneau runique double l'effet « focus » du Sceptre (cumul plafonné à +25%).
- **Anneau + Armure plate** : permet à un tank de regagner un peu de mobilité ou de mana pour les compétences universelles.

---

## 2. Variations / sous-types

| Sous-type | Matériau dominant | Tier minimum | Profil |
|-----------|-------------------|---------------|--------|
| **Anneau de fer** | Fer / Acier | 1 | Bande simple, gravure rare ; bonus Vigueur ou Endurance |
| **Anneau d'argent** | Argent | 2 | Conducteur magique faible ; bonus Esprit ou Mémoire ; léger anti-mort-vivant (lore) |
| **Anneau d'or** | Or | 3 | Statut social, conducteur magique moyen ; bonus Verbe + 1 affixe magique de base |
| **Anneau de mithril** | Mithril (alliage rare) | 4 | Léger, conducteur magique fort ; 2 affixes magiques |
| **Anneau à gemme sertie** | Or/Argent + 1 gemme taillée | 2-5 | Bonus matériau + bonus gemme + 1 affixe magique selon gemme |
| **Anneau à multi-gemmes** | Mithril + 2-3 gemmes taillées | 4-6 | Empile plusieurs effets de gemmes ; permet 2-3 affixes |
| **Anneau sigillaire** *(sceau)* | Métal + gravure | 1-6 | Porte un **sceau** (faction, religion, famille noble) ; effet social fort + 1 affixe spécifique faction |
| **Anneau runique** | Métal + runes gravées | 3-6 | Inscription d'une **rune de Voie** par Enchanteur ; permet de canaliser une Voie même sans Lien établi (limité — voir §5) |

> Les **gemmes** (Rubis, Saphir, Émeraude, Améthyste, Diamant, Onyx, Topaze, Opale, Cristal de Voie taillé...) sont produites par le Lapidaire avant d'être serties par le Bijoutier. Chaque gemme porte une affinité d'affixe (voir §6).

---

## 3. Stats par tier

| Tier | Nom canonique | Bonus stat brute principal | Slots d'enchantement | Affixes magiques disponibles | Tier d'enchantement supporté | Durabilité |
|------|---------------|---------------------------|----------------------|------------------------------|------------------------------|------------|
| 1 | Commun | +2 (1 stat) | 0 | 0 | — | ∞ (ne se brise pas) |
| 2 | Façonné | +4 (1 stat) | 1 | 1 affixe mineur | Mineur | ∞ |
| 3 | Œuvré | +6 (1 stat) ou +3/+3 (2 stats) | 1 | 1 affixe standard | Standard | ∞ (charges affixe limitées) |
| 4 | Magistral | +8 (1 stat) ou +5/+4 (2 stats) | 2 | 2 affixes (1 standard + 1 mineur) | Standard | ∞ (charges) |
| 5 | Légendaire | +12 (1 stat) ou +7/+5/+3 (3 stats) | 2 | 2 affixes (1 majeur + 1 standard) | Majeur | ∞ (charges) |
| 6 | Mythique | +16 (1 stat) ou +9/+7/+5 (3 stats) ou +6/+5/+4/+3 (4 stats) | 3 | 3 affixes (1 majeur + 2 standard) ou 1 affixe Apex | Apex | ∞ (charges) |

> [!important] Calibration vs Armes/Armures
> Les bonus stat d'un anneau sont **modestes** comparés aux armes (qui scalent en dégâts directs) et aux armures (qui scalent en HP/défense). L'anneau **optimise** ; il ne supplante jamais l'armure ou l'arme. Comparaison indicative : un Anneau Mythique apporte ~+16 à une stat ; une Cuirasse Mythique apporte ~+30 HP + résistances + 2 affixes lourds. Ratio cible : **accessoire ≈ 50-60% du poids stat d'une armure de même tier**.

### Durabilité

> **Les anneaux ne se brisent pas physiquement.** Ils sont conçus pour durer.

À la place, les anneaux enchantés (tier 3+) fonctionnent par **charges d'affixe** : un anneau avec un affixe « Régen Mana +3/s » a un pool de charges qui se vide quand il est porté en combat ; il se recharge automatiquement hors combat ou via un cristal de recharge.

| Tier | Charges max (affixe combat) | Recharge passive | Recharge cristal |
|------|-----------------------------|------------------|------------------|
| 3 | 200 | +5/min hors combat | +50/cristal mineur |
| 4 | 400 | +8/min | +100/cristal standard |
| 5 | 800 | +12/min | +200/cristal majeur |
| 6 | 1500 (ou illimité sur certains affixes passifs) | +20/min | +400/cristal apex |

> Les affixes purement passifs et mineurs (ex. *+4 Vigueur*) ne consomment pas de charges. Seuls les affixes actifs (régen pendant combat, procs, réductions de coût) consomment.

### Rouille post-Souffle

Conformément à [[Le Souffle]] et [[Items/Index]], les anneaux **Magistral, Légendaire et Mythique** subissent une perte de stats temporaire d'environ **−10% sur 2 semaines** post-Souffle. Les anneaux Commun à Œuvré sont insensibles.

---

## 4. Système d'enchantement

> Branche [[Architecture Data-Driven]] §ItemModifier Generator.

### Comment un anneau reçoit un enchantement

```
[Anneau brut] (Bijoutier, Joaillerie)
    → Bonus stat matériau de base, 0 affixe magique
    ↓
[Cercle d'enchantement] (Enchanteur, Scriptorium)
    → Rituel d'inscription d'1 à 3 affixes selon tier
    ↓
[Anneau enchanté]
    → Item finalisé, charges + affixes actifs
```

### Coût en intrants pour 1 enchantement

| Tier de l'affixe | Mana consommé (rituel) | Cristal de Voie | Essence spirituelle | Éclats de paiement (Enchanteur) | Maîtrise Scriptorium requise |
|-------------------|------------------------|-----------------|---------------------|----------------------------------|------------------------------|
| Mineur | 50 pts | 1 mineur | — | 50-200 Éclats | Initié |
| Standard | 120 pts | 1 standard | 1 essence | 500-1500 Éclats | Adepte |
| Majeur | 250 pts | 1 majeur + 1 standard | 2 essences | 3000-8000 Éclats | Expert |
| Apex | 450 pts | 1 apex + 2 standard | 3 essences + 1 cœur de créature cosmique | 15000-50000 Éclats | Maître |

> [!warning] Calibration playtest
> Tous ces coûts sont **provisoires** et marqués `needs_review_for: calibration-enchantement-playtest`. Voir [[Économie]] §Catégorie 3 (économie d'enchantement) pour la branche.

### Modulation par l'Accord

Conformément à [[L'Accord]] §Effets sur les Voies :

- Enchanteur Accord ≥ 75% : **+10% efficacité** de l'affixe inscrit, **−15% coût rituel**
- Enchanteur Accord ≤ 25% : **−10% efficacité**, **+15% coût rituel**
- Si l'Enchanteur est lié à la Voie dominante de l'ère : **+5% bonus supplémentaire**

### Désenchantement

Un Enchanteur Expert+ peut **dissoudre** un affixe d'un anneau pour récupérer une **fraction** des intrants (~30-50% du cristal, jamais l'essence spirituelle). Opération destructrice du sort, l'anneau redevient un anneau brut. Coût Mana : 60% du coût d'inscription. Cas typique : recycler un anneau enchanté avec un mauvais affixe pour récupérer le métal et le cristal.

---

## 5. Mapping vers les Voies magiques

> Les **Anneaux runiques** et les **Anneaux à Cristal de Voie serti** peuvent être liés à une Voie spécifique. Mapping canonique :

### Voies primaires (5 Éternels)

| Voie | Effet d'un Anneau de Voie (tier 4+) | Restriction |
|------|-------------------------------------|-------------|
| **Celestia** | +Acuité (vue à distance), +10% détection des invisibles, regen Mana +1/s sous le ciel ouvert | Sceau d'Ordo Caelum recommandé |
| **Tempora** | +5% vitesse d'incantation, 1 charge de « ralenti local » (3s, 60s CD) | Très rare — Voie blessée |
| **Noctis** | +10% efficacité en zones d'ombre, +Vivacité la nuit, drain Mana ennemi sur frappe critique | Marque sociale forte (Noctari) |
| **Navigor** | +1 charge téléportation courte (5m, 90s CD), insensibilité partielle aux barrières spirituelles | **Quasi-disparu** — voir signatures (relique) |
| **Eldoria** | +5% efficacité soins, brille en présence de Noctis (révèle), 1 charge de bouclier de lumière | Réservé Ignis Aeternum |

### Voies secondaires (8 Cosmiques magiques)

| Voie | Effet d'un Anneau de Voie (tier 4+) |
|------|-------------------------------------|
| **Aquor** | +respiration aquatique, +10% efficacité sorts d'eau/glace, regen Stamina +0.5/s en milieu humide |
| **Aerion** | +5% vitesse de déplacement, saut + 20%, +10% portée des sorts d'air |
| **Aurion** | +5% dégâts arcaniques, charge d'enchantement temporaire d'arme (15s, 120s CD) |
| **Umbra** | +Furtivité, +5% chance critique en attaque par derrière |
| **Spiritus** | Communication basique avec faune neutre, +1 invocation mineure (60s, 180s CD) |
| **Fatum** | +1% chance critique cumulable, 1 reroll d'événement aléatoire / jour réel |
| **Terranu** | +Vigueur en contact avec le sol nu, sorts de pierre coût −10% |
| **Somnix** | Résistance terreur, sorts d'illusion coût −10%, 1 charge confusion mentale (90s CD) |

> [!important] Anneau de Voie ≠ Lien établi
> Un Anneau de Voie ne **remplace pas** le Lien (mono-Voie engagement de [[Le Lien]]). Il permet d'utiliser **un sort mineur** de la Voie inscrite **sans être Lié** (charges limitées, coût Mana doublé). Pour un Lié à la même Voie : effet amplifié (+10% à tous les sorts de cette Voie). Pour un Lié à une **Voie opposée** (ex. Eldoria portant un Anneau de Noctis) : **rétrofeu**, perte 5 Mana/s tant que porté.

---

## 6. Affixes / modificateurs spécifiques

> Catalogue indicatif — paramétrise via [[Architecture Data-Driven]] §ItemModifier Generator.

### Affixes passifs (statiques)

| Affixe | Tier disponible | Effet | Notes |
|--------|-----------------|-------|-------|
| *Vigueur+* | 1-6 | +N à Vigueur | Selon tier |
| *Vivacité+* | 1-6 | +N à Vivacité | |
| *Esprit+* | 1-6 | +N à Esprit | |
| *Mémoire+* | 2-6 | +N à Mémoire | |
| *Verbe+* | 2-6 | +N à Verbe | |
| *Régen Mana passive* | 3-6 | +X/s régen Mana hors combat | Cumule avec Esprit |
| *Régen Stamina passive* | 3-6 | +X/s régen Stamina hors combat | |
| *Réduction coût incantation* | 4-6 | −X% coût Mana sorts | Plafond [[Combat]] −50% |
| *Bonus école de magie X* | 4-6 | +X% efficacité d'1 Voie spécifique | Voir §5 |
| *Bonus 1 Maîtrise X* | 3-6 | +X% gain XP dans 1 Maîtrise (forge, alchimie, etc.) | Forge un anneau d'artisan |

### Affixes actifs (consomment charges)

| Affixe | Tier disponible | Effet | Charges/usage |
|--------|-----------------|-------|---------------|
| *Charges régénérables d'esquive* | 4-6 | +1 esquive sans Stamina (60s CD) | 50 charges/usage |
| *Proc bouclier* | 5-6 | À HP < 30%, bouclier 200 HP (180s CD) | 200 charges |
| *Liaison à un Lien actif* | 5-6 | Quand sort Apex lancé : prochain sort coût −50% | 100 charges |
| *Slot d'affixe extra* (méta) | 6 | Permet 1 affixe supplémentaire au-delà du plafond du tier | — (consomme 1 slot serti) |
| *Drain au critique* | 4-6 | Frappe critique → +X Mana ou +X HP | 30 charges/proc |

### Règle d'empilement (2 anneaux simultanés)

| Cas | Règle |
|-----|-------|
| 2 anneaux avec affixes **passifs identiques** (ex. *Vigueur+5* sur les deux) | Cumul à 75% (anti-stack) |
| 2 anneaux avec affixes **passifs différents** | Cumul à 100% |
| 2 anneaux avec **mêmes affixes actifs** (ex. proc bouclier) | Le second est **ignoré** (un seul proc actif par type) |
| 2 anneaux runiques de **Voies opposées** (Eldoria + Noctis) | Annulation mutuelle, drain Mana 10/s |
| 2 anneaux de **même Voie** | Cumul plafonné à +15% efficacité (au lieu de 2× +10%) |

---

## 7. Recettes (Joaillerie)

> Une recette par tier. Recipe Generator [[Architecture Data-Driven]] paramétrisera les variations (gemme spécifique, sceau, etc.).

### Tier 1 — Anneau de fer

| Élément | Valeur |
|---------|--------|
| Métier | Bijoutier |
| Station | Établi de bijoutier |
| Intrants | Lingot de fer × 1, Charbon × 1 |
| Sortie | Anneau de fer commun |
| Mastery | Novice |
| Mini-jeu | Précision frappe (3 frappes ciblées) |
| Durée | 30s |

### Tier 2 — Anneau d'argent à gemme commune

| Élément | Valeur |
|---------|--------|
| Métier | Bijoutier + Lapidaire (intrant) |
| Station | Établi de bijoutier + Tour à polir (Lapidaire en amont) |
| Intrants | Lingot d'argent × 1, Gemme taillée commune × 1 (Quartz, Œil-de-tigre…), Fil métallique × 1 |
| Sortie | Anneau d'argent serti façonné |
| Mastery | Initié |
| Mini-jeu | Sertissage (alignement de la gemme dans la griffe) |
| Durée | 1 min |

### Tier 3 — Anneau d'or enchanté basique

| Élément | Valeur |
|---------|--------|
| Métier | Bijoutier → Enchanteur |
| Station | Établi + Cercle d'enchantement |
| Intrants | Lingot d'or × 1, Gemme taillée intermédiaire × 1, Fil métallique × 1, Cristal de Voie mineur × 1, Encre × 1 |
| Sortie | Anneau d'or œuvré (1 affixe mineur) |
| Mastery | Adepte (Joaillerie) + Initié (Scriptorium) |
| Mini-jeu | Sertissage + séquence rituelle (3 glyphes simples) |
| Durée | 3 min |

### Tier 4 — Anneau de mithril runique

| Élément | Valeur |
|---------|--------|
| Métier | Bijoutier → Enchanteur |
| Station | Établi + Cercle d'enchantement |
| Intrants | Lingot de mithril × 1, Gemme taillée magistrale × 1, Fil métallique × 2, Cristal de Voie standard × 1, Essence spirituelle × 1, Encre × 2 |
| Sortie | Anneau de mithril magistral (2 affixes) |
| Mastery | Expert (Joaillerie) + Adepte (Scriptorium) |
| Mini-jeu | Sertissage + gravure rune (5 glyphes) |
| Durée | 8 min |

### Tier 5 — Anneau légendaire à multi-gemmes

| Élément | Valeur |
|---------|--------|
| Métier | Bijoutier (Maître) → Enchanteur (Expert+) |
| Station | Établi de Maître + Cercle d'enchantement étendu |
| Intrants | Lingot de mithril × 2, Gemmes taillées légendaires × 3, Cristal de Voie majeur × 1, Cristal de Voie standard × 1, Essences spirituelles × 2, Encre × 4 |
| Sortie | Anneau légendaire (2 affixes — 1 majeur + 1 standard) |
| Mastery | Maître (Joaillerie) + Expert (Scriptorium) |
| Mini-jeu | Triple sertissage + composition runique (8 glyphes, séquence) |
| Durée | 25 min |

### Tier 6 — Anneau mythique

| Élément | Valeur |
|---------|--------|
| Métier | Bijoutier (Maître + Œuvre signée) → Enchanteur (Maître) |
| Station | Établi mythique (siège ou héritage spécial) + Cercle d'enchantement majeur |
| Intrants | Alliage mythique × 1 (mithril + métal cosmique), Gemmes taillées mythiques × 3, Cristal de Voie apex × 1, Cristaux de Voie majeur × 2, Essences spirituelles × 3, Cœur de créature cosmique × 1, Encre rare × 6 |
| Sortie | Anneau mythique (3 affixes ou 1 affixe Apex) |
| Mastery | Maître (Joaillerie) + Maître (Scriptorium), souvent **œuvre signée** d'un porteur de siège Éthéré (cf. *Forgion* / *Talos* — voir [[Cosmologie]] §Sièges Éthérés) |
| Mini-jeu | Sertissage Maître + composition runique (12 glyphes, séquence + timing rituel) |
| Durée | 1h+ (rituel cosmique, doit être effectué à un moment d'Accord ≥75%) |

---

## 8. Variants cosmiques (par ère)

> 10 variants canoniques mappés aux entités (cf. [[Les Ères]] §10 variants visuels). Pour les anneaux, les variants modulent l'**effet enchanté** (pas seulement le visuel).

| Variant | Entité | Effet sur Anneau |
|---------|--------|------------------|
| **Shadow** | Noctis | L'affixe principal est doublé en zone d'ombre, mais nul en plein soleil |
| **Spectral** | Tempora | Le sort lié à l'anneau peut être lancé **depuis un autre plan** (téléport courte du proc) ; charges -25% |
| **Frost** | Aquor froid | +20% efficacité en froid, anneau givre la main du porteur (visuel) |
| **Verdoyant** | Spiritus + Terranu | Régen Stamina supplémentaire en forêt/plaine, anneau visuellement habillé de mousse |
| **Brulé** | Voie de Feu *(à confirmer)* | Affixe enflammé (DoT léger sur frappe), mais −10% durabilité charges |
| **Pourpre** | Umbra | Brouillard de masquage périodique (CD 120s, 5s) |
| **Doré** | Eldoria | Affixe brille, repousse mineurement les morts-vivants, +10% soins reçus |
| **Brisé** | Tempora aigu | Visuel glitch, l'affixe a 5% de chance de proc 2× ou de ne pas proc |
| **Onirique** | Somnix | L'effet de l'anneau **persiste pendant le sommeil** du porteur (régen continue) |
| **Vénérable** | Fatum | Marques runiques, +1% chance critique cumulé, légendes accumulées (lore) |

> Un anneau mythique trouvé/forgé pendant l'**Ère du Crépuscule** peut cumuler **2 variants** (ex. Doré + Pourpre = Anneau du Mélange) — règle exceptionnelle, voir [[Les Ères]] §Crépuscule.

---

## 9. Exemples de signatures *(stub Phase 4)*

> Items **uniques narratifs** — détaillés en Phase 4 (signatures par pays/religion/Voie). Voici 3 exemples ancres.

### Anneau du Veilleur d'Astravia

> *« Forgé pour les sentinelles du Mont Kelvain, il garde l'œil de qui le porte ouvert même dans le brouillard le plus épais. »*
> Tier 5 — Mithril, Saphir céleste serti
> Bonus narratif : +15 Acuité, *Vision étendue* (1 charge / 60s, voir à 50m de distance dans le brouillard et la nuit)
> Allégeance : Garde d'Astravia (faction)

### Anneau Pacte de Foedus

> *« Anneau d'or à serment gravé. Le porteur a juré loyauté à une âme — vivante ou défunte. »*
> Tier 4 — Or, gravure d'âme
> Bonus narratif : +10 Verbe, *Lien d'âme* (peut sentir la direction et l'état de la personne pactée à toute distance ; brise si serment trahi)
> Religion : Foedus Animae

### Anneau Brisé de Vortex

> *« Une moitié d'anneau, l'autre perdue dans une tempête cosmique. Donne pouvoir et instabilité à parts égales. »*
> Tier 6 (instable) — Alliage cosmique, Gemme tempête
> Bonus narratif : +12 à toutes les stats brutes, mais 5% de chance par jour réel de **téléporter** le porteur dans une zone aléatoire
> Variant : Spectral
> Lore : relique du Souffle Cardinal de l'Arrachement

---

## 10. Décisions ouvertes / chantiers de profondeur

### Questions ouvertes spécifiques à l'Anneau

- **Durabilité absolue ou charges seules ?** Décision actuelle : durabilité ∞, charges seules pour les affixes actifs. À valider en playtest — risque de banalisation si jamais on perd un anneau.
- **Cap absolu de stats par accessoire** : maximum +16 (à un slot) raisonnable ? À comparer avec l'évolution d'amulette/bracelet.
- **Anneaux de Voie disparues (Navigor)** : autoriser leur fabrication par recettes perdues ? Ou seulement signatures découvertes ? Recommandation : **uniquement signatures** (renforce le lore de disparition).
- **Sceau familial/noble** : système de blasons et de transmission héréditaire (joueurs aristocrates) — branche [[Lore]] ?
- **Anneau de mariage/serment joueur-joueur** : item social spécial qui lie 2 joueurs (effets coopératifs) — proposition à creuser.

### Notes pour les autres archétypes Accessoires

> Pour les agents qui produiront **Amulette, Broche, Bracelet, Boucle d'oreille, Ceinture-accessoire** :

1. **Reprendre la structure 10 sections** de ce fichier.
2. **Calibration de poids stat** par slot (pattern canonique à respecter) :
   - Amulette : ~120-130% du poids stat d'un anneau (slot principal, porte l'enchantement majeur du perso)
   - Bracelet : ~90-100% (similaire à anneau mais souvent porteur de procs actifs)
   - Broche : ~70-80% (slot secondaire, fort sur dimensions sociales/factions)
   - Boucle d'oreille : ~50-60% (slot mineur, niches)
   - Ceinture-accessoire : ~80-90% (mais avec capacités utilitaires : pochettes, bourse, slots de potions)
3. **Reprendre le système d'enchantement à l'identique** (cercle d'Enchanteur, cristal de Voie, essence, charges sur affixes actifs).
4. **2 anneaux + 1 amulette + 2 bracelets + 1 broche + 1-2 boucles + 1 ceinture-acc = 8-9 slots accessoires totaux** : poser des règles d'empilement globales pour éviter la stat-stack abusive (proposition : plafond global +30% sur une seule stat brute, tous accessoires confondus).
5. **Signatures par pays/religion** : créer 2-3 signatures par accessoire dans 5-6 régions clés.
6. **Variants cosmiques** : utiliser le même mapping 10 variants (cohérence visuelle inter-accessoires).

### Branches transverses

- [[Économie]] §Catégorie 3 — économie d'enchantement (Cristaux de Voie, Essences spirituelles)
- [[Architecture Data-Driven]] §ItemModifier Generator — paramètre les affixes
- [[Architecture Data-Driven]] §Recipe Generator — paramètre les recettes par tier × région × ère
- [[Le Lien]] — Voies, mono-Voie, opposition magique
- [[Cosmologie]] §Sièges Éthérés — *Forgion* (forge) et *Talos* (talismans/protection) sont les sièges concernés par les Anneaux Mythiques
- [[Le Souffle]] — rouille post-Souffle s'applique aux anneaux Magistral+
- [[L'Accord]] — modulation du rituel d'enchantement par l'Accord de l'Enchanteur

---

*Liens : [[Items/Index|← Index Items]] · [[Catégories d'Items]] · [[Crafts]] · [[Le Lien]] · [[Personnage]] · [[Économie]] · [[Tome]]*
