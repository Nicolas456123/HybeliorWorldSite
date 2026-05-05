---
tags: [item, archétype, ressource, récolte, nature, aquatique, coquille]
type: archetype
category: Récolte
subcategory: Nature
source: Récolte nature
mastery: Pêche / Plongée
métiers_de_récolte: [Pêcheur, Plongeur, Cueilleur (de plage)]
métiers_consommateurs: [Bijoutier (perles, nacre), Apothicaire (calcaire, alchimie), Sculpteur (camées), Cuisinier (mollusques), Forgeron (carapace ?)]
biomes: [Côtes maritimes, Plages, Récifs, Lacs, Rivières (huitres d'eau douce)]
era_availability: [toutes - pic Vents Bouleversants]
tier_min: 1
tier_max: 5
status: drafted
last_review: 2026-05-01
needs_review_for: [classification-mollusque-vivant-vs-mort, frontière-Récolte-Nature-vs-Créature]
---

# 🐚 Archétype — Coquille

> Sous-catégorie de la **catégorie [[Catégories d'Items|Récolte]]**, source [[Sources de Ressources#Source 1 — Récolte nature|Récolte nature]]. **Convention canonique** : la coquille est récoltée comme ressource Nature (mollusque sessile = considéré "nature" dans le CSV) bien qu'elle puisse provenir d'un animal vivant.

---

## 1. Vue d'ensemble

La **Coquille** est récoltée sur **mollusques** (huîtres, moules, escargots, etc.) ou comme **coquillage vide** sur les plages. Convention canonique d'Hybelior : c'est une **ressource Nature** (le mollusque sessile est traité comme un végétal-fixe), bien qu'on puisse aussi récolter sa chair ([[Crafts]] §3 Cuisine).

Triple usage canonique :
- **Joaillerie** : nacre, perles, camées sculptés
- **Alchimie** : calcaire broyé, base de poudres alchimiques
- **Cuisine** : chair de mollusque (sous-produit, voir [[Poisson]] et adjacents)

> **Note de classification** : un mollusque vivant pêché = double-tag possible (Récolte Nature pour la coquille, Récolte Créature pour la chair/œuf). Convention par défaut = Nature.

---

## 2. Variations / espèces

| Coquille | Source | Profil |
|----------|--------|--------|
| **Huître** | Côte | Perle (rare), nacre, chair |
| **Moule** | Côte / Récif | Calcaire commun, chair |
| **Coquille Saint-Jacques** | Eaux peu profondes | Sculpture, prestige |
| **Escargot terrestre** | Forêt humide | Cuisine, calcaire mineur |
| **Escargot d'eau douce** | Rivière, lac | Calcaire, alchimie |
| **Murex** | Côtes méditerranéennes | Pourpre noble (pigment) |
| **Conque géante** | Tropical | Trompe rituelle, sculpture |
| **Nautile** | Profondeurs | Spirale parfaite, joaillerie |
| **Perle d'huître** *(rare)* | Huître | Joaillerie haut tier |
| **Coquille-Spectrale** *(variant ère)* | Échos Brisés | Translucide |
| **Coquille Cosmique** *(rare)* | Sites maritimes cosmiques | T5+, alchimie haut tier |

---

## 3. Tier × Qualité

| Tier | Qualité | Conditions typiques | Yield |
|------|---------|---------------------|-------|
| **T1** | Brute | Coquillage de plage, fragments | 5-10 unités |
| **T2** | Saine | Coquille intacte, mollusque jeune | 3-6 unités |
| **T3** | Bonne qualité | Espèce noble (Saint-Jacques, Murex), Pêcheur Adepte | 2-4 unités |
| **T4** | Excellente | Conque géante, perle de qualité | 1-2 unités |
| **T5** | Exceptionnelle | Variant cosmique, Nautile rare | 1 unité |

---

## 4. Spawn / Récolte

| Aspect | Détail |
|--------|--------|
| **Biomes** | **Côtes maritimes** (référence — Solena, Tyndara, Cendara), **Plages** (coquillages vides), **Récifs** (Murex, Coraux-Coquilles), **Lacs/Rivières** (escargots d'eau douce), **Forêts humides** (escargots terrestres) |
| **Outil requis** | Mains nues (T1 plage) · Couteau de plongée (récolte vivante) · Panier-filet · pic à huître |
| **Mini-jeu** | **Cueillette à marée basse** : ramasser au sol (rapide, T1-T2) · ou **Plongée** (récolte vivante, T3+) · décollement précis (jauge "intégrité coquille") |
| **Palier de Maîtrise minimum** | Novice (T1-T2 plage) ; Adepte (T3) ; Expert (T4 plongée) ; Maître (T5) |
| **Saison favorable** | Indépendant des saisons terrestres ; **marées** influent (basse mer = +30 % yield plage) |
| **Régénération** | Récifs : pillage excessif vide la zone 1 saison ; les plages se renouvellent à chaque marée |

---

## 5. Modulation par ère

| Ère | Effet sur les Coquilles |
|-----|--------------------------|
| **[[Les Ères#🌪️ Ère des Vents Bouleversants]]** | Tempêtes ramènent coquilles profondes en surface · récolte massive de plage |
| **[[Les Ères#❄️ Ère du Sommeil de Glace]]** | -50 % récolte côtière · escargots terrestres dormants |
| **[[Les Ères#✨ Ère du Rêve Lumineux]]** | Variant **Doré** · perles luminescentes |
| **[[Les Ères#⏳ Ère des Échos Brisés]]** | **Coquille-Spectrale** · récolte aléatoire |
| **[[Les Ères#🌫️ Ère de la Brume Mortelle]]** | Coquilles toxiques mutées · composants poison |
| **[[Les Ères#🌿 Ère du Verdoiement]]** | +30 % récolte (mollusques abondants) · variant **Verdoyant** |

---

## 6. Crafts destinés

- **[[Crafts]] §6 Joaillerie et lapidaire** : Perles, nacre, camées (sertis dans bagues, broches). Voir [[Anneau]], [[Broche]].
- **[[Crafts]] §2 Alchimie** : Calcaire broyé, **Poudre fabriqué** (intrant — voir [[Sources de Ressources#Source 3]]) ; bases de poudres médicinales.
- **[[Crafts]] §3 Cuisine** : Chair de mollusque (huîtres, moules) — cuisine côtière fine.
- **[[Crafts]] §7 Travail du bois et de la pierre** (Sculpteur) : Sculpture de coquille (camées, ornementations).
- **[[Crafts]] §4 Tissage et confection** : Pourpre du Murex (pigment royal).
- **[[Crafts]] §8 Scriptorium** : Conques pour rituels (instruments + composants).

---

## 7. Signatures notables

- **Perles d'Huître de Solena** (Galenor maritime) — référence joaillière, base de la Ligue des Marchands.
- **Pourpre de Murex de Tyndara** (Onara) — pigment royal des Festival des Lumières de Seraphia.
- **Nautile d'Ilthara** — joaillerie exotique des cités de Drakora.
- **Conque Géante de Cendara** — trompe rituelle du Temple des Flammes Éternelles.
- **Coquille-Spectrale d'Ulinor** *(Échos Brisés)* — récolte au Grand Canyon de l'Écho immergé.
- **Perle Stellaire** *(post-Souffle)* — chute de météorite sur côte ; T6 mythique.
- **Coquille Saint-Jacques de Seraphia** — sculpture noble, ornement temple.

---

## 8. Décisions ouvertes

- [ ] **Frontière Récolte Nature vs Créature** : confirmer convention "mollusque sessile = Nature". Sinon revoir tag global.
- [ ] **Mollusque vivant** : double-récolte (coquille Nature + chair Créature) ?
- [ ] **Marée mécanique** : cycle in-game à intégrer ([[Univers#Saisons]]) ?
- [ ] **Perle drop rate** : pourcentage par huître ouverte ou nœud spécial ?
- [ ] **Pourpre Murex** : rare → marché de luxe joueur-driven ([[Économie]]).

---

*Liens : [[Items - Index|← Index Items]] · [[Catégories d'Items]] · [[Sources de Ressources]] · [[Crafts]] · [[Métiers]] · [[Les Ères]] · [[Algue]] · [[Pigment]] · [[Anneau]] · [[Amulette]] · [[Poisson]]*
