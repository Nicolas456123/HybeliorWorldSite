---
tags: [métier, archétype, artisanat, esprit, mémoire, enchantement, scriptorium]
type: archetype
category: Métier
catégorie_métier: Artisanat et production
stat_principale: Esprit
stats_secondaires: [Mémoire, Résonance, Acuité]
craft_category: Scriptorium et enchantement
sources_ressources_accessibles: [Cristal de Voie, Essence spirituelle, Encre, Parchemin, Pigment, Item base à enchanter, Sceaux runiques]
stations_principales: [Cercle d'enchantement, Pupitre de scribe, Atelier rituel]
outils_principaux: [Plume / Stylet, Sceau-poinçon, Burin runique, Cristal-focus, Grimoire de référence]
paliers_maîtrise: [Novice, Initié, Adepte, Expert, Maître]
métiers_complémentaires: [Métiers#Scribe, Métiers#Calligraphe, Métiers#Compositeur de sorts, Bijoutier, Forgeron, Tailleur, Métiers#Mage]
era_modulation: true
status: drafted
last_review: 2026-05-01
needs_review_for: [enchantement-temporaire-vs-permanent, frontière-Enchanteur-Mage-Compositeur-de-sorts, coût-mana-vs-cristal]
---

# 🔮 Archétype-Métier — Enchanteur d'objet

> Métier **magique appliqué**. L'Enchanteur appose des **affixes/effets magiques** sur des items existants (armes, armures, bijoux, vêtements). C'est le **pivot Tier 3+** des items haut de gamme : sans Enchanteur, pas de Magistral à effets.

> **Synonyme officiel** : *"Enchanteur"* tout court (sans qualificatif) désigne **ce métier**. Le présent fichier est l'**unique archétype canonique**. Lorsque le mot "Enchanteur" apparaît dans la documentation sans contexte, il renvoie à ce métier.

> **Distinction nette avec [[Métiers|Mage]]** : le Mage **canalise une [[Le Lien|Voie]]** en combat (sorts, projection magique). L'Enchanteur d'objet **inscrit du Lien dans la matière**. Un joueur peut être Mage **et** Enchanteur, mais ce sont deux métiers/maîtrises distincts.

---

## 1. Vue d'ensemble

L'**Enchanteur d'objet** trace des **runes/glyphes** sur un item, lit la matière, branche un fragment de [[Le Lien]] dans la structure, et y ancre un **effet** (affixe). L'enchantement peut être **temporaire** (durée limitée, recast périodique) ou **permanent** (gravé à vie, T5+).

**Place dans la chaîne d'artisanat :**
- **Amont** : items finis livrés par [[Forgeron]] (armes/armures), [[Bijoutier]] (bijoux), [[Tailleur]] (vêtements/robes), [[Tisserand]] (tissus rituels), [[Métiers|Scribe]] (parchemins), [[Cordonnier]] (bottes runiques) ; **Cristal de Voie** ([[Le Lien]]) ; **Essence spirituelle** ([[Sources de Ressources]] §Créature)
- **Aval** : joueurs (équipement haut tier), [[Métiers|Mage]] (parchemins-sorts, focus magiques), [[Métiers|Prêtre]] / [[Lore/Religions/00 - Système Religieux|religions]] (objets sacrés)

**Identité gameplay :**
- Métier **magique-érudit** — `Esprit` (capacité Lien brute), `Mémoire` (glyphes, séquences rituelles, lore [[Le Lien]]), `Résonance` (intensité de canalisation, durée), `Acuité` (précision tracé)
- Métier **gold-sink positif majeur** : enchantements temporaires expirent, recast périodique = **revenu récurrent** (cf. [[Économie]] §Cat. 3)
- Métier **prérequis Lié** : l'Enchanteur d'objet **doit être Lié** (cf. [[Le Lien]] §Liés). Mono-Voie comme tout Lié, mais peut produire des enchantements **adaptés à toutes les Voies** au-delà de la sienne (palier Expert+)

**Branche [[Le Lien]] forte :** ce métier est le **pont gameplay-magie** pour les items. Tous les items à effet magique passent par lui (frontière avec Mage = projection magique en combat, pas matérialisée).

**Ancrage culturel :** Vytharia (sceaux funéraires Vael'Kurash), Endora (calligraphie raffinée), Astravia (glyphes Ordo Caelum / astrologie), Cestra (orichalque résonant + enchantement), Eldoria (rumeur Mithril enchanté).

---

## 2. Stats & Maîtrises

| Stat | Rôle |
|------|------|
| **Esprit** *(principale)* | Capacité magique brute — coût mana, plafond effet |
| **Mémoire** *(principale)* | Glyphes, séquences rituelles, lore [[Le Lien]] |
| **Résonance** *(secondaire)* | Intensité, durée enchantement, magnitude affixe |
| **Acuité** *(secondaire)* | Précision tracé runique, alignement |
| Verbe | Présentation client, contrats — les enchanteurs vendent un **service**, pas seulement un produit |

### Prérequis Lié

> L'Enchanteur d'objet **doit être Lié à une [[Le Lien|Voie]]** (mono-Voie comme tout Lié). Sa Voie module **les types d'enchantements qu'il peut apposer naturellement** :

| Voie de l'Enchanteur | Affixes naturels |
|---|---|
| Voie de Spiritus (vie/nature) | Régénération, soins, croissance |
| Voie d'Ignis (feu) | Dégâts feu, résistance feu, lumière |
| Voie d'Aquor (eau/glace) | Dégâts glace, résistance froid, courant |
| Voie d'Aerion (vent) | Vitesse, mouvement, légèreté |
| Voie de Terranu (terre) | Défense, résistance, durabilité |
| Voie d'Umbra (ombre) | Furtivité, poison, peur |
| Voie de Noctis (ténèbres) | Drain, malédiction |
| Voie de Tempora (temps) | Anticipation, ralentissement, hâte |
| Voie de Fatum (destin) | Critique, chance, présage |
| Voie de Navigor (passage) | Téléportation, retour, lien-objet |

> Au palier **Expert+**, l'Enchanteur apprend à apposer des affixes **hors-Voie** (cross-Voie via cristaux dédiés), avec coût mana doublé.

### Maîtrises contextuelles

- **`Maîtrise_Enchantement`** — racine
- **`Maîtrise_Glyphe`** — sous-spécialité tracé runique précis (palier Adepte+)
- **`Maîtrise_Rituel`** — sous-spécialité enchantement permanent T5+ (palier Maître)
- **`Maîtrise_Désenchantement`** — récupération composants (palier Adepte+, gold sink [[Économie]] §Cat. 3)

---

## 3. Sources de ressources accessibles

### Intrants

| Intrant | Source | Notes |
|---------|--------|-------|
| **Cristal de Voie** | Drop d'ère / [[Le Lien]] | Composant magique principal |
| **Essence spirituelle** | Créature ([[Sources de Ressources]] §Créature) | Composant rare T4+ |
| **Encre** | Fabriqué (Apothicaire / [[Métiers|Scribe]]) | Tracé glyphe |
| **Parchemin / Papier** | Fabriqué (Scribe / [[Métiers|Relieur]]) | Pour parchemins-sorts |
| **Pigment** | Fabriqué (Teinturier) | Couleur runique (sémantique : rouge=feu, bleu=eau…) |
| **Item base à enchanter** | Forgeron / Bijoutier / Tailleur | L'objet hôte |
| **Sceaux runiques** | Auto-craft Enchanteur (taille de glyphe) | Templates réutilisables |

### Sortie

- 1 session (Labeur ~30%) → 1 enchantement T2 OU recast 3-5 enchantements temporaires existants OU 1 parchemin-sort T3

---

## 4. Stations + outils

| Station | Rôle | Tier débloqué |
|---------|------|---------------|
| **Cercle d'enchantement** | Cercle gravé au sol, cristaux disposés, rituel | T2+ |
| **Pupitre de scribe** | Calligraphie glyphe, parchemin | T1+ |
| **Atelier rituel** | Atelier complet (cercle + pupitre + cristaux) | T4+ |
| **Sanctuaire de Voie** *(rare)* | Lieu sacré spécifique à la Voie | T5+ uniquement |

### Outils

| Outil | Notes |
|-------|-------|
| **Plume / Stylet** | Tracé encre (cf. [[Catégories d'Items]] §Outils) |
| **Sceau-poinçon** | Apposition glyphe rapide |
| **Burin runique** | Gravure profonde (T4+ permanent) |
| **Cristal-focus** | Catalyseur — concentre la canalisation |
| **Grimoire de référence** | [[Tome]] consultable des séquences rituelles |

---

## 5. Paliers de Maîtrise

| Palier | Capacités | Conditions |
|--------|-----------|------------|
| **1 — Novice** | Enchantement temporaire T1 (1 affixe simple, durée 24h gameplay). Voie unique. Échec 15% | Défaut + être Lié |
| **2 — Initié** | T2 temporaire (1 affixe, durée 3 jours). 3 glyphes débloqués. Recast simplifié | Usage : 30 enchantements |
| **3 — Adepte** | T3 temporaire (1 affixe + 1 mineur, durée 7 jours). Désenchantement (récup 30% composants). Parchemins-sorts T3 | Usage : 100 enchantements + 1 commande noble |
| **4 — Expert** | T4 Magistral (2 affixes, durée 30 jours). **Affixes hors-Voie** (coût mana ×2). Enchantement de Voie d'autrui (sur item d'un Lié). Recettes signature | Usage : 300 enchantements + signature reconnue |
| **5 — Maître** 🔒 | T5 Légendaire (3 affixes, **permanent**). T6 Mythique sur quête. **Sceau-de-pacte** (frontière Bijoutier). **Enchantement cosmique** (variants ère permanents). Héritage | **Condition cachée** : ex. enchanter un objet pour un Éternel, sceller une [[Traces des Ères|Trace de l'Arrachement]], enchanter un objet qui survit à un [[Le Souffle|Souffle]] sans dégradation |

---

## 6. Crafts / recettes débloqués

### Productions par palier

| Palier | Items enchantables | Affixes max | Durée | Type |
|--------|---------------------|-------------|-------|------|
| Novice | Anneau, Bracelet, Bottes T1 | 1 mineur | 24h | Temporaire |
| Initié | Idem + Cape T2, Amulette T2 | 1 standard | 3 jours | Temporaire |
| Adepte | Toutes catégories T1-T3 | 1+1 mineur | 7 jours | Temporaire |
| Expert | T1-T4 + cross-Voie | 2 standard | 30 jours | Temporaire |
| Maître | T1-T5 + cosmique | 3 standard | **Permanent** (T5+) | Permanent |

### Pattern recette canonique Enchantement

> Tier N = **N cristaux de Voie T-N** + **(N-1) essences spirituelles** + **encre × N** + **parchemin × N/2** (pour la séquence) + **station T-1** + **palier Mastery requis** + **être Lié**.

| Recette type | Tier | Intrants | Durée | Mini-jeu | Sortie |
|--------------|------|----------|-------|----------|--------|
| Enchant Anneau T2 | 2 | Cristal de Voie × 1, Encre × 1, Anneau base | 10 min | Tracé glyphe (3 jauges) | 1× Anneau enchanté T2 (1 affixe, 3 jours) |
| Enchant Épée T4 (cross-Voie) | 4 | Cristaux × 2 (sa Voie + Voie cible), Essences × 1, Encre × 3, Épée Magistrale | 1h | 4 jauges + canalisation Voie | Épée T4 (2 affixes, 30 jours) |
| Enchant Permanent T5 | 5 | Cristaux × 3, Essences × 2, Encre × 5, Pigment rituel × 2 | 4h | 5 jauges + rituel + sacrifice mana | Item enchanté permanent (3 affixes) |
| Parchemin-sort T3 | 3 | Parchemin × 1, Encre × 1, Cristal × 1 | 30 min | 3 jauges + séquence sort | 1× [[Parchemin]] T3 (single-use) |

### Affixes signature Enchanteur (10 racines, multipliées par 10 Voies)

> Tableau : 10 archétypes d'affixes, chacun déclinable selon les 10 Voies. Voir aussi [[Anneau]] §Affixes pour le pattern accessoire.

1. **Boost stat brute** — +X stat (selon Voie : Spiritus→Endurance, Ignis→Vigueur…)
2. **Résistance élément** — −X% dégâts (selon Voie)
3. **Proc on hit** — déclenche effet Voie sur frappe
4. **Régénération passive** — HP/Mana/Stamina selon Voie
5. **Mouvement** — vitesse, saut, levitation (selon Voie)
6. **Critique boost** — +X% chance critique
7. **Aura** — effet de zone autour du porteur
8. **On-equip** — bonus immédiat tant que porté
9. **Drain** — vol HP/Mana/Stamina
10. **Conditionnel** — bonus si condition remplie (heure du jour, ère, religion)

> 10 affixes × 10 Voies × tier = ~150-200 affixes canoniques pour l'ItemModifier Generator ([[Architecture Data-Driven]]).

---

## 7. Carrière et débouchés

```
[Apprenti Lié] → [Enchanteur de bourg] → [Enchanteur de cité] → [Enchanteur-Maître reconnu] → [Enchanteur-Légende]
                                            ↓
                                Co-craft permanent avec Forgeron-Maître / Bijoutier-Maître
```

### Spécialisations

- **Enchanteur d'armes** — armes mêlée/distance
- **Enchanteur d'armures** — protection
- **Enchanteur de bijoux** — accessoires (frontière Bijoutier)
- **Calligraphe-Enchanteur** ([[Métiers|Calligraphe]]) — parchemins-sorts
- **Compositeur de sorts** ([[Métiers|Compositeur de sorts]]) — création de nouveaux sorts ([[Le Lien]] §Voies)

### Débouchés

- **Boutique magique** — clientèle Liés
- **Enchanteur de cour** — exclusivité noble (Adepte+)
- **Enchanteur de [[Guildes|guilde]]** — équipement collectif
- **Recasting service** — gold-sink stable et récurrent (cf. [[Économie]] §Cat. 3)
- **Désenchantement** — récup composants (gold-sink secondaire)

### Métiers complémentaires

- **[[Forgeron]]** — fournisseur item base armes/armures
- **[[Bijoutier]]** — fournisseur bijoux (co-craft anneau enchanté = pivot canonique)
- **[[Tailleur]]** / **[[Tisserand]]** — vêtements/robes magiques
- **[[Métiers|Scribe]]** — parchemin
- **[[Apothicaire]]** — encres rares, pigments runiques

### Sous-spécialisations canoniques (Role.csv)

> Source canonique : `Role.csv` (cat 2 — Artisanat et production). Ces rôles correspondent à des **paliers Maître+** absorbés du legacy AccessExport.

#### Sous-spécialisation Maître+ : Maître enchanteur

> Source canonique : `Role.csv` (cat 2, role n°7).

- **Description** : titre canonique du palier 5 — Enchanteur d'objet reconnu, capable d'enchantements permanents T5 (3 affixes), formateur d'apprentis et figure d'autorité dans une école d'enchantement.
- **Conditions** : palier Maître + ≥ 1 Voie [[Le Lien]] maîtrisée à fond + ≥ 1 enchantement permanent T5 livré et reconnu + 🔒 condition cachée (apposer un enchantement durant un événement cosmique [[Les Ères]] OU concevoir un nouvel affixe accepté par les pairs).
- **Notes** : co-craft fréquent avec **Maître forgeron** (arme signature enchantée) et **Maître joaillier** (anneau permanent). Frontière potentielle avec [[Mage]] (école d'arcanes) — un Maître enchanteur orienté création de sorts dérive vers le **Compositeur de sorts**.

---

## 8. Modulation par contexte

### Par ère ([[Les Ères]])

> **Modulation lourde** : l'Enchanteur est particulièrement affecté par les ères. Sa Voie peut être amplifiée ou diminuée (cf. [[Le Souffle]] §Effet sur les Liés).

| Ère | Effet |
|-----|-------|
| **Verdoiement** (Terranu/Spiritus) | +25% efficacité enchantements vie/nature |
| **Feu Endormi** (Eldoria/Ignis) | +25% Ignis, +10% chance affixe rare |
| **Sommeil de Glace** (Climata/Aquor) | +25% Aquor |
| **Brume Mortelle** (Umbra) | Recettes obscures débloquées |
| **Ombre Longue** (Noctis) | Recettes Voie de Noctis débloquées |
| **Échos Brisés** (Tempora) | Enchantements *Spectraux* (l'effet survit 5s après retrait) |
| **Présages** (Fatum) | Enchantements de chance/critique bonifiés |

### Par contexte

- **Lieu sacré** ([[Lore/Religions/00 - Système Religieux]]) : −20% coût mana, +10% magnitude
- **Faction magique** — recettes exclusives (commission)
- **Ère opposée à la Voie de l'Enchanteur** : −20% efficacité (rouille permanente jusqu'à fin d'ère)

---

## 9. Économie

### Ratios canoniques

| Palier | Coût intrants | Vente service | Marge | Volume |
|--------|----------------|----------------|-------|--------|
| Novice | 50-200 Éclats | 200 Éclats | ~50% | 2-3 / jour |
| Adepte | 500-2000 | 2000-10 000 | ~75% | 1-2 / jour |
| Expert | 5000-30 000 | 30 000-200 000 | ~80% | 1 / 2 jours |
| Maître | 50 000-500 000 | 500 000-5M | ~85% | 1 / semaine (permanent) |

### Gold sinks contribués (majeurs)

> **Pivot des gold-sinks Catégorie 3 ([[Économie]])**.

| Sink | Coût |
|------|------|
| **Maintenance d'enchantement** (recast) | 50% du coût initial — recast périodique = revenu récurrent enchanteur |
| **Désenchantement** | 100 Éclats par item (récup 30-50% composants) |
| **Identification d'item** | 200-1000 Éclats |
| **Enchantement permanent T5** | 500 000+ Éclats (gros sink prestige) |

---

## 10. Comportement IA + signatures PNJ

### Routine Enchanteur PNJ (Phase 2)

```
[Lever 07:00] → [Méditation matinale (régen mana)]
              → [Atelier 08:00-12:00 : préparation glyphes, cristaux]
              → [Boutique 12:00-18:00 : Mode Marchand + service]
              → [Soir : étude Tome, lore Voies, recasts urgents]
              → [Coucher 23:00]
```

### Signatures PNJ (Phase 4)

- **Maître Korrun le Sigilliste de Vytharia** — sceaux funéraires Vael'Kurash
- **Doyenne Aelis d'Endora** — calligraphie raffinée, Voie de Spiritus
- **Astre Veyran d'Astravia** — glyphes Ordo Caelum (Voie de Tempora — frontière)
- **Padre Iolur de Cestra** — orichalque résonant Voie d'Aquor
- **Maître Sygrun le Pactiseur** *(itinérant Maître-Légende)* — enchantements cosmiques permanents

---

## 11. Décisions ouvertes

- [ ] **Synonymie "Enchanteur"** : ce métier est canoniquement nommé **"Enchanteur d'objet"** mais "Enchanteur" tout court y renvoie. Tag déjà fait. Documentation à propager.
- [ ] **Frontière Enchanteur d'objet / Enchanteur du vivant** : [[Métiers]] liste séparément "Enchanteur du vivant" en catégorie Mysticisme. Proposition canonique : **2 métiers distincts**, l'un travaille la matière (ce fichier), l'autre les créatures vivantes (Mysticisme M3 ou M4)
- [ ] **Frontière Enchanteur d'objet / Mage / Compositeur de sorts** : Mage = canalise Voie en combat ; Compositeur = crée nouveaux sorts ([[Le Lien]]) ; Enchanteur = inscrit Lien dans matière. Trois métiers distincts mais peuvent partager Maîtrises de Voie
- [ ] **Enchantement temporaire vs permanent** : seuil T5 retenu — à playtester
- [ ] **Cristal de Voie** : combien drop par ère, comment se renouvelle ? À cadrer avec [[Le Lien]] et [[Les Ères]]
- [ ] **Cross-Voie palier Expert+** : coût mana ×2 — à valider
- [ ] **Calibration affixes** : 10 racines × 10 Voies = 100 — Phase 4 ItemModifier Generator
- [ ] **Désenchantement rendement** : 30-50% composants — à playtester

---

*Liens : [[Métiers]] · [[Crafts]] · [[Sources de Ressources]] · [[Catégories d'Items]] · [[Personnage]] · [[Le Lien]] · [[Le Souffle]] · [[Économie]] · [[Les Ères]] · [[Anneau]] · [[Tome]] · [[Parchemin]] · [[Cristal de Voie]] · [[Bijoutier]] · [[Forgeron]] · [[Tailleur]] · [[Architecture Data-Driven]] · [[Lore/Religions/00 - Système Religieux]]*
