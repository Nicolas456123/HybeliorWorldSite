---
tags: [item, archétype, accessoire, équipement, social]
type: archetype
category: Équipement
subcategory: Accessoire
slot: Épaule / Manteau (1 simultané)
source: Fabriqué
mastery: Joaillerie
craft_category: Joaillerie et lapidaire
tier_min: 1
tier_max: 6
era_availability: [toutes]
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-poids-stat, équilibrage-bonus-social, plafond-stat-cumulé]
---

# 🪶 Broche / Fibule — Accessoire de signature sociale

> Accessoire **léger** (poids stat **70-80%** [[Anneau]]) qui agrafe un manteau, une cape ou un tabard. Spécialisé dans les **bonus sociaux**, l'**allégeance** de faction et les **signatures** d'identité. Hérite du pattern canonique [[Anneau]].

---

## 1. Vue d'ensemble

### Concept

La **Broche** (ou **Fibule** dans la parlance ancienne) est une pièce d'orfèvrerie qui agrafe un vêtement — manteau, cape, tabard. Mécaniquement, c'est l'accessoire le **moins puissant** en stats brutes, mais le plus expressif sur les dimensions **sociales** : allégeance à une faction, sceau d'une famille noble, marque religieuse, blason de guilde. Une Broche est **visible** : elle communique l'identité du porteur avant la première parole.

> [!note] Broche / Fibule
> Les deux termes sont équivalents. **Broche** est canonique en parlance moderne ; *Fibule* est utilisé en lore antique (Astravia ancienne, peuplades pré-Souffle). Préférer **Broche** dans les fichiers de données.

### Place dans l'équipement total

| Slot | Item | Rôle |
|------|------|------|
| 1 cou | [[Amulette]] | Enchantement majeur |
| 2 doigts | [[Anneau]] ×2 | Optimisations stat |
| 2 poignets | [[Bracelet]] ×2 | Procs actifs |
| **1 épaule** | **Broche** | **Signature, faction, social** |
| 1-2 oreilles | [[Boucle d'oreille]] | Bonus mineurs |
| 1 taille | [[Ceinture-accessoire]] | Utilitaire |

### Synergie avec les autres slots

- **Broche + Tabard de faction** : bonus social cumulé (+15% diplomatie au sein de la faction).
- **Broche + Sceau familial sur Anneau** : double signature noble — débloque dialogues spécifiques (PNJ aristocrates).
- **Broche d'Ordre religieux + Amulette de Voie correspondante** : +5% efficacité prières et invocations.

---

## 2. Variations / sous-types

| Sous-type | Matériau dominant | Tier minimum | Profil |
|-----------|-------------------|---------------|--------|
| **Fibule de fer** | Fer / Bronze | 1 | Tribal, militaire de base ; +Endurance mineure |
| **Broche d'argent ciselée** | Argent | 2 | Bonus social mineur, signature artisan |
| **Broche d'or à émail** | Or + émail coloré | 3 | Statut noble, faction urbaine |
| **Broche de mithril runique** | Mithril + gravure | 4 | Bonus social fort, +1 affixe |
| **Broche héraldique** | Métal + blason peint/serti | 2-6 | **Sceau de famille noble ou de faction** ; effets sociaux conditionnels |
| **Broche votive** | Métal + symbole religieux | 2-6 | **Sceau d'Ordre religieux** ; bonus dans temples, prières |
| **Broche-reliquaire** | Métal + fragment reliquaire | 5-6 | Porte un fragment narratif, +1 affixe majeur |
| **Broche à cristal** | Métal + Cristal de Voie serti | 3-6 | Petit Focus passif (cf. [[Cristal de Voie]]) ; bonus Voie mineur |

---

## 3. Stats par tier

| Tier | Nom canonique | Bonus stat brute principal *(70-80% Anneau)* | Slots d'enchantement | Affixes magiques | Tier d'enchantement supporté | Durabilité |
|------|---------------|----------------------------------------------|----------------------|------------------|------------------------------|------------|
| 1 | Commun | +1 (1 stat) ou bonus social | 0 | 0 | — | ∞ |
| 2 | Façonné | +3 (1 stat) + bonus social mineur | 1 | 1 mineur | Mineur | ∞ |
| 3 | Œuvré | +4 (1 stat) ou +2/+2 (2 stats) | 1 | 1 standard | Standard | ∞ (charges) |
| 4 | Magistral | +6 (1 stat) ou +3/+3 (2 stats) | 2 | 1 standard + 1 mineur | Standard | ∞ (charges) |
| 5 | Légendaire | +9 (1 stat) ou +5/+4 (2 stats) | 2 | 1 majeur + 1 mineur | Majeur | ∞ (charges) |
| 6 | Mythique | +12 (1 stat) ou +6/+5/+3 (3 stats) | 3 | 1 majeur + 2 mineurs OU 1 Apex social | Apex *(social uniquement)* | ∞ |

> [!important] Profil sociopuissant, statpuissant faible
> La Broche est **délibérément faible** sur les bonus stat bruts (70-80% Anneau). Sa force est ailleurs : bonus diplomatie, accès à des dialogues, modulation des prix marchands, affiliation politique. Un Apex sur Broche n'est **pas un Apex magique** mais un **Apex social** (effet narratif fort, ex : *Sceau Royal*).

> [!important] Plafond global stats accessoires : +30%
> Cf. [[Amulette#3. Stats par tier]]. La Broche participe au cumul global, mais sa contribution est faible.

### Charges (affixes actifs)

| Tier | Charges max | Recharge passive | Recharge cristal |
|------|-------------|------------------|------------------|
| 3 | 100 | +3/min | +30/cristal mineur |
| 4 | 200 | +5/min | +60/cristal standard |
| 5 | 400 | +8/min | +120/cristal majeur |
| 6 | 800 | +12/min | +250/cristal apex |

### Rouille post-Souffle

Mêmes règles : −10% sur 2 semaines pour Magistral+. Les **bonus sociaux** (diplomatie, prix) ne sont **pas rouillés** — seuls les affixes magiques le sont.

---

## 4. Système d'enchantement

> Pattern [[Anneau#4. Système d'enchantement|Anneau §4]] — cercle d'Enchanteur, intrants Cristal de Voie, charges sur affixes actifs.

Spécificités Broche :

- **Coût rituel −20%** vs Anneau (la Broche absorbe moins d'énergie, slot léger).
- **Capacité d'inscription Apex** uniquement pour des **affixes sociaux/narratifs** (pas d'Apex magique pur).
- **Inscription héraldique** : variante d'enchantement spécifique aux Broches — l'Enchanteur grave un blason/sceau qui conditionne l'effet à une **faction d'allégeance**.

### Modulation par l'Accord

Identique aux autres accessoires (±10% efficacité, ±15% coût rituel).

### Désenchantement

Récupération ~30-50% du cristal. La gravure héraldique est **destructive** : on ne récupère pas le sceau s'il est effacé.

---

## 5. Mapping vers les Voies magiques

> Une Broche **peut** porter un Cristal de Voie serti (sous-type *Broche à cristal*) — effets identiques à l'Anneau de Voie mais à **70-80% du poids**.

| Voie | Effet d'une Broche de Voie (tier 4+) |
|------|--------------------------------------|
| **Celestia** | +Acuité légère, +5% détection invisibles |
| **Eldoria** | +5% efficacité soins, repousse morts-vivants |
| **Noctis** | +5% efficacité ombre, brille en présence d'Eldoria (révèle) |
| **Spiritus** | Communication faune neutre légère, +0.5 invocation animale |
| **Fatum** | +0.5% chance critique cumulé, 1 reroll mineur / jour |
| *(autres Voies)* | Effets proportionnels — voir [[Anneau]] §5 × 0.7-0.8 |

> Les Broches **ne sont pas le slot privilégié** des Voies. Elles offrent une signature visible (le porteur affiche sa Voie), pas une optimisation forte.

---

## 6. Affixes / modificateurs spécifiques

### Affixes passifs sociaux *(spécificité Broche)*

| Affixe | Tier | Effet |
|--------|------|-------|
| *Allégeance — Faction X* | 2-6 | +5 à +25% diplomatie avec membres faction X ; -X% avec factions ennemies |
| *Sceau familial* | 2-6 | Reconnaissance auprès des nobles (dialogues spéciaux, accès à manoirs/cours) |
| *Sceau religieux* | 2-6 | Bonus dans temples (régen Mana, soins gratuits limités, accès cryptes) |
| *Marchand reconnu* | 3-6 | -5 à -15% prix d'achat / +5 à +15% prix de vente dans réseau marchand donné |
| *Charme courtois* | 4-6 | +X% efficacité dialogues persuasion |
| *Présence imposante* | 4-6 | +X% intimidation, ennemis < tier 3 hésitent à attaquer en premier |

### Affixes passifs stat (atténués)

| Affixe | Tier | Effet |
|--------|------|-------|
| *Mémoire+* | 1-6 | +N à Mémoire (×0.75 par rapport à l'Anneau) |
| *Verbe+* | 1-6 | +N à Verbe (×1.0 — c'est la stat de prédilection de la Broche) |
| *Esprit+* | 2-6 | +N à Esprit (×0.75) |
| *Vivacité+* | 2-6 | +N à Vivacité (×0.75) |

### Affixes actifs

| Affixe | Tier | Effet | Charges |
|--------|------|-------|---------|
| *Charme actif* | 4-6 | 1 charge / 5 min : NPC neutre devient amical pour 30s | 100 |
| *Reconnaissance instantanée* | 5-6 | Identifie immédiatement faction/Voie d'un PNJ adverse | 50 |
| *Sceau d'autorité* | 6 | Apex social : 1 charge / jour réel, ordre obéi par PNJ < tier 4 | 1/jour |

### Règle d'unicité

> **Une seule Broche équipée à la fois.** Le sceau visible doit être unique pour ne pas brouiller l'allégeance.

---

## 7. Recettes (Joaillerie)

### Tier 1 — Fibule de fer

| Élément | Valeur |
|---------|--------|
| Métier | Bijoutier |
| Station | Établi de bijoutier |
| Intrants | Lingot de fer × 1, Charbon × 1 |
| Sortie | Fibule de fer commune |
| Mastery | Novice |
| Mini-jeu | Frappe précise (3 frappes) |
| Durée | 1 min |

### Tier 2 — Broche d'argent ciselée

| Intrants | Lingot d'argent × 1, Émail × 1, Fil métallique × 1 |
| Sortie | Broche façonnée + 1 affixe mineur |
| Mastery | Initié |
| Durée | 4 min |

### Tier 3 — Broche d'or à émail

| Intrants | Lingot d'or × 1, Émail × 2, Cristal de Voie mineur × 1 (optionnel), Encre × 1 |
| Sortie | Broche œuvrée (1 affixe standard) |
| Mastery | Adepte (Joaillerie) + Initié (Scriptorium) si enchantée |
| Durée | 8 min |

### Tier 4 — Broche de mithril runique

| Intrants | Lingot mithril × 1, Émail × 3, Cristal de Voie standard × 1, Essence × 1, Encre × 2 |
| Sortie | Broche magistrale (2 affixes) |
| Mastery | Expert (Joaillerie) + Adepte (Scriptorium) |
| Durée | 15 min |

### Tier 5 — Broche héraldique légendaire

| Intrants | Mithril × 2, Gemmes légendaires × 1, Cristal majeur × 1, Essence × 2, Sceau gravé × 1, Encre rare × 3 |
| Sortie | Broche légendaire (1 majeur + 1 mineur, sceau actif) |
| Mastery | Maître (Joaillerie) + Expert (Scriptorium) |
| Durée | 30 min |

### Tier 6 — Broche-reliquaire mythique

| Intrants | Alliage mythique × 1, Cristal apex × 1, Cristaux majeurs × 1, Essences × 2, Fragment reliquaire × 1, Encre rare × 5 |
| Sortie | Broche mythique (3 affixes, dont 1 Apex social) |
| Mastery | Maître + Œuvre signée |
| Durée | 2h |

---

## 8. Variants cosmiques (par ère)

> Mapping 10 variants identique à [[Anneau#8. Variants cosmiques (par ère)|Anneau §8]]. Les variants Broche modulent visuellement le sceau et son rayonnement social.

| Variant | Spécificité Broche |
|---------|--------------------|
| **Doré** (Eldoria) | Sceau brille, +5% efficacité dialogues religieux solaires |
| **Pourpre** (Umbra) | Sceau s'estompe : +5% furtivité quand non observée, mais signature publique faible |
| **Vénérable** (Fatum) | Sceau ancien, +1% chance critique cumulé, lore narratif fort (broche héritée) |
| **Brisé** (Tempora) | Sceau fissuré : 5% chance affixe social rejoue gratuitement, -5% efficacité moyenne |

---

## 9. Exemples de signatures

### Sceau de la Garde d'Astravia

> *« Croix d'argent au revers gravé du Mont Kelvain. Tout chevalier d'Astravia en porte une — perdre la sienne, c'est perdre son honneur. »*
> Tier 4 — Broche héraldique
> Bonus narratif : +12 Verbe en présence de gardes d'Astravia, dialogues spéciaux, accès à la garnison
> Faction : Garde d'Astravia

### Fibule du Voyageur

> *« Fibule de bronze d'origine inconnue, on dit qu'elle vient des temps de Navigor. Le porteur trouve toujours son chemin. »*
> Tier 5 — Broche-reliquaire (relique Navigor)
> Bonus narratif : +1 charge téléport courte (5m, 5 min CD), +Acuité, ne se perd jamais (réapparaît dans inventaire si volée)
> Variant : Spectral

### Marque du Marchand de Vagrael

> *« Broche dorée frappée d'une balance. Reconnue dans tous les marchés de la Vague Nord. »*
> Tier 3 — Broche d'or
> Bonus narratif : +10% prix de vente, -5% prix d'achat dans le réseau marchand de Vagrael
> Faction : Guilde marchande de Vagrael

### Étoile de l'Ordo Caelum

> *« Étoile à 8 branches d'argent et d'or, signe des sentinelles célestes. »*
> Tier 5 — Broche votive (Celestia)
> Bonus narratif : +Acuité, +10% détection invisibles, accès aux temples Ordo Caelum (régen Mana gratuite)
> Religion : Ordo Caelum

---

## 10. Décisions ouvertes / chantiers de profondeur

- **Apex social** : viable comme tier max ? Ou la Broche reste-t-elle plafonnée à un Majeur ? Recommandation actuelle : Apex *social* uniquement (sceau royal, ordre divin).
- **Système de blasons héréditaires** : transmission joueur-joueur de Broches familiales — branche Lore/Économie sociale.
- **Cumul Broche + Tabard de faction** : double affichage = double bonus ? Actuellement +15% cumulé (vs +10% chacun isolé). À playtester.
- **Broches contrefaites** : un joueur peut-il forger un sceau qu'il n'a pas le droit de porter ? Système de détection (Ordo Caelum, Garde) ?

### Branches transverses

- [[Anneau]] — pattern de référence
- [[Amulette]] — slot principal accessoire
- [[Économie]] §Catégorie 3 — économie d'enchantement
- [[Cosmologie]] §Religions et Factions — sceaux et allégeances
- [[Architecture Data-Driven]] §ItemModifier Generator
- [[Le Souffle]] / [[L'Accord]]

---

*Liens : [[Items/Index|← Index Items]] · [[Catégories d'Items]] · [[Anneau]] · [[Amulette]] · [[Personnage]] · [[Économie]]*
