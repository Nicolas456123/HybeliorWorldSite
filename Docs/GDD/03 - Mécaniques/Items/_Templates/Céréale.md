---
tags: [item, archétype, ressource, récolte, nature, cultivé, céréale]
type: archetype
category: Récolte
subcategory: Nature
source: Récolte nature
mastery: Agriculture
métiers_de_récolte: [Fermier, Agriculteur]
métiers_consommateurs: [Meunier (farine), Boulanger (pains), Brasseur (bière, hydromel), Cuisinier]
biomes: [Plaines cultivées]
era_availability: [toutes - dégradation forte Sommeil de Glace]
tier_min: 1
tier_max: 5
status: drafted
last_review: 2026-05-01
needs_review_for: [cycle-cultural-temps-ingame, mécanique-fermier-champ]
---

# 🌾 Archétype — Céréale

> Sous-catégorie de la **catégorie [[Catégories d'Items|Récolte]]**, source [[Sources de Ressources#Source 1 — Récolte nature|Récolte nature]]. **Récolte cultivée** par excellence — nécessite culture (Fermier/Agriculteur), pas de cueillette sauvage en quantité économique. Base de la chaîne alimentaire d'Hybelior.

---

## 1. Vue d'ensemble

La **Céréale** est la **seule ressource cultivée canonique** parmi les 21 récoltes nature. Elle nécessite **plantation par Fermier**, **cycle de pousse** (saisons), et **récolte saisonnière** (faux). C'est l'**intrant principal de la Farine** ([[Sources de Ressources#Source 3 — Fabrication]]) qui alimente toute la chaîne boulangerie/brasserie.

Distinction canonique avec [[Graine]] : Céréale = riz, blé, orge, maïs, seigle (cultures de base à grande échelle, transformation en farine). Graine = autres usages (épices, oléagineuses, plantation diverse).

Marqueur économique fort : pays agricoles (Sylthara en Ilthara, plaines de Galenor, Onara) tirent richesse de leur production céréalière.

---

## 2. Variations / espèces

| Céréale | Profil | Usage canonique |
|---------|--------|-----------------|
| **Blé** | Référence, commun | Pain blanc, brioche |
| **Orge** | Robuste | Bière (brasserie), bouillies |
| **Avoine** | Nord, hardi | Bouillies, pains rustiques |
| **Seigle** | Très rustique | Pains noirs, bières |
| **Riz** | Tropical, irrigué (Ilthara) | Cuisine asiatique-like, alcools |
| **Maïs** | Endora, Galenor | Pains de maïs, polenta |
| **Millet** | Aride, savane | Bouillies, cuisine khalorin |
| **Quinoa** | Hautes plaines | Cuisine d'altitude, alchimie d'Endurance |
| **Épeautre** | Ancien, noble | Pain noble, prestige |
| **Blé Doré** *(Verdoiement)* | Variant ère | Pain doré, recettes Magistrales |
| **Blé Spectral** *(Échos Brisés)* | Variant ère | Récolte aléatoire, pains anomaliques |

---

## 3. Tier × Qualité

| Tier | Qualité | Conditions typiques | Yield (par champ standard) |
|------|---------|---------------------|------------------------------|
| **T1** | Brute | Mauvaise saison, technique novice | 30-50 unités |
| **T2** | Saine | Saison normale, Fermier Initié | 60-100 unités |
| **T3** | Bonne qualité | Espèce noble (Épeautre, Riz noble), Fermier Adepte | 80-120 unités |
| **T4** | Excellente | Conditions cosmiques favorables, Fermier Expert | 100-150 unités |
| **T5** | Exceptionnelle | Variant cosmique ou champ nommé | 50-80 unités (rares) |

> Les céréales sont **mass-récolte** : les volumes sont supérieurs aux autres archétypes Nature (champ entier vs nœud individuel).

---

## 4. Spawn / Récolte

| Aspect | Détail |
|--------|--------|
| **Biomes** | **Plaines cultivées** (référence — Sylthara, Onara, Galenor centrale) ; quasi-zéro hors plaines cultivables |
| **Outil requis** | **Faux** (récolte) ; outils de plantation (charrue) en amont |
| **Mini-jeu** | **Cadence de moisson** : balayage rythmique (Stamina ×2) ; bonne cadence = +10 % yield · trop rapide = épis perdus |
| **Palier de Maîtrise minimum** | Novice (T1-T2 blé/orge basiques) ; Adepte (T3 noble) ; Expert (T4) ; Maître (T5) |
| **Saison favorable** | **Été tardif / Automne** = pic absolu (récolte annuelle) ; reste de l'année = champ vide |
| **Cycle de culture** | Plantation → pousse 2-4 mois (in-game accéléré) → récolte → labour → jachère ou re-plantation |

---

## 5. Modulation par ère

| Ère | Effet sur les Céréales |
|-----|------------------------|
| **[[Les Ères#🌿 Ère du Verdoiement]]** | +60 % yield · variant **Verdoyant** · Blé Doré · pousse accélérée |
| **[[Les Ères#❄️ Ère du Sommeil de Glace]]** | -80 % yield · gel des champs · économie céréalière effondrée |
| **[[Les Ères#🌪️ Ère des Vents Bouleversants]]** | Tempêtes endommagent les champs (-30 % yield) · vent disperse les graines (replantation plus aisée) |
| **[[Les Ères#🌫️ Ère de la Brume Mortelle]]** | Céréales mutées toxiques · récolte abandonnée |
| **[[Les Ères#✨ Ère du Rêve Lumineux]]** | Variant **Doré** · pains lumineux festifs |
| **[[Les Ères#⏳ Ère des Échos Brisés]]** | Blé Spectral · récolte aléatoire |
| **[[Les Ères#🦌 Ère de la Communion]]** | +30 % yield · animaux des champs accompagnent |

---

## 6. Crafts destinés

- **[[Crafts]] §3 Cuisine** (Meunier) : **Farine** (intrant fabriqué — voir [[Sources de Ressources#Source 3 — Fabrication]] : Céréale → Farine via Meunier).
- **[[Crafts]] §3 Cuisine** (Boulanger) : Pains, viennoiseries (à partir de Farine).
- **[[Crafts]] §3 Cuisine** (Pâtissier) : Gâteaux, biscuits.
- **[[Crafts]] §2 Alchimie** (Brasseur) : Bière, hydromel, alcools de céréale.
- **[[Crafts]] §3 Cuisine** : Bouillies, riz cuit, polenta (cuisine quotidienne).

---

## 7. Signatures notables

- **Blé de Sylthara** (Ilthara) — référence économique continentale, base de la Grande Moisson.
- **Riz de Warenthor** (Ilthara, jungle irriguée) — base culinaire des cités de Lythar.
- **Maïs des Khalorins** (Galenor sud, savane) — cuisine cavalière, conservation longue.
- **Épeautre de Trinoria** (Galenor) — pains nobles des archers d'élite.
- **Orge de Mosrack** (Onara) — base de la bière industrielle, exportation.
- **Quinoa des Hautes-Plaines de Caeloria** (Azoria) — alchimie d'Endurance des oracles.
- **Blé Doré du Verdoiement** — récolte exclusive en Verdoiement, recettes Magistrales débloquées.

---

## 8. Décisions ouvertes

- [ ] **Système de champ** : possession d'un champ par joueur (Fermier dédié) ou champs publics partagés ? Lien [[Économie]] joueur-driven.
- [ ] **Cycle de pousse in-game** : durée réelle (2-4 semaines IRL) ou accélérée ?
- [ ] **Famine** : si Sommeil de Glace s'éternise → mécanique de pénurie de pain ?
- [ ] **Frontière Céréale / [[Graine]]** : graine de céréale plantable est-elle Céréale T1 ou Graine ? Confirmer.

---

*Liens : [[Items - Index|← Index Items]] · [[Catégories d'Items]] · [[Sources de Ressources]] · [[Crafts]] · [[Métiers]] · [[Les Ères]] · [[Graine]] · [[Pain]] · [[Boisson]] · [[Économie]]*
