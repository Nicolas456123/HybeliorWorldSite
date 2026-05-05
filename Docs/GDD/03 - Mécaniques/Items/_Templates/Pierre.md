---
tags: [item, archétype, ressource, récolte, nature, minéral, pierre, construction]
type: archetype
category: Récolte
subcategory: Nature
source: Récolte nature
mastery: Minage / Tailleur de pierre
métiers_de_récolte: [Mineur, Tailleur de pierre, Maçon (extraction)]
métiers_consommateurs: [Maçon (briques), Sculpteur (statues), Tailleur de pierre, Architecte, Forgeron (meule, étau pierre)]
biomes: [Montagnes, Cavernes, Falaises, Désert (grès), Volcanique]
era_availability: [toutes]
tier_min: 1
tier_max: 5
status: drafted
last_review: 2026-05-01
needs_review_for: [pierre-vs-brique-statut, pierres-magiques-runiques]
---

# 🪨 Archétype — Pierre

> Sous-catégorie de la **catégorie [[Catégories d'Items|Récolte]]**, source [[Sources de Ressources#Source 1 — Récolte nature|Récolte nature]]. **Matière première de la construction et de la sculpture** — extraite par Mineur ou Tailleur de pierre. Distincte de [[Minerai]] (pour la fonte) et de [[Gemme brut]] (lapidaire).

---

## 1. Vue d'ensemble

La **Pierre** est extraite des carrières et falaises pour la **construction** (Maçon), la **sculpture** (Sculpteur, Tailleur de pierre), et certains usages de **forge** (meule, étau, four). Plus prosaïque que le Minerai : peu de "valeur magique" mais **volume massif** consommé par l'urbanisme et l'architecture militaire.

Pattern unique : extraction par **blocs** plutôt que **veines**. Une carrière donne des centaines d'unités ; un Maçon de palier moyen peut tailler ces blocs en briques régulières (intermédiaire fabriqué).

Marqueur cosmologique : pays de pierre (Iskara avec sa Porte de Fer, citadelles anciennes de Voldenor, sanctuaires de Lex Petra) tirent identité de leur architecture.

---

## 2. Variations / espèces

| Pierre | Profil | Usage canonique |
|--------|--------|-----------------|
| **Calcaire** | Tendre, blanc-gris | Construction commune, briques |
| **Granit** | Très dur, gris-rose | Construction noble, monuments |
| **Marbre** | Précieux, veiné | Sculpture noble, prestige |
| **Grès** | Sablonneux, rouge-orange | Désert d'Endora ; construction d'Iskara |
| **Schiste** | Lité, plat | Toitures, dalles |
| **Basalte** | Volcanique, noir | Cendara ; construction résistante au feu |
| **Obsidienne** | Volcanique, noire vitreuse | Lames primitives, sculpture cérémonielle |
| **Pierre noire de Cendra** *(signature)* | Cendara | Volcanique, T4-T5 |
| **Pierre Runique** *(rare)* | Sanctuaires anciens | Inscriptions cosmiques |
| **Pierre-de-Lune** *(Cestra)* | Pierre cristalline | Pierres Runiques de Lune |
| **Pierre Cosmique** *(variant ère)* | Variants : Spectral, Pourpre, etc. | Architecture d'ère |

---

## 3. Tier × Qualité

| Tier | Qualité | Conditions typiques | Yield |
|------|---------|---------------------|-------|
| **T1** | Brute | Calcaire fragmenté, frappe novice | 5-10 unités |
| **T2** | Saine | Bloc régulier, frappe propre | 8-15 unités |
| **T3** | Bonne qualité | Granit, Marbre, Mineur Adepte | 6-10 unités |
| **T4** | Excellente | Marbre noble, taille experte | 4-8 unités |
| **T5** | Exceptionnelle | Pierre nommée ou variant cosmique | 2-5 unités |

> Pas de T6 standard : les pierres mythiques relèvent des signatures (§7).

---

## 4. Spawn / Récolte

| Aspect | Détail |
|--------|--------|
| **Biomes** | **Montagnes** (référence — toutes pierres communes), **Cavernes**, **Falaises**, **Désert de sable** (Grès), **Volcanique** (Basalte, Obsidienne) |
| **Outil requis** | **Pioche** (basique) · **Maillet et burin** (Tailleur de pierre, T3+) · Levier pour blocs lourds |
| **Mini-jeu** | **Frappe rythmique** : pour blocs réguliers, séquence rythmique précise ; pour sculpture, mini-jeu de précision (ciseau) |
| **Palier de Maîtrise minimum** | Novice (T1-T2 calcaire) ; Adepte (T3 Granit/Marbre) ; Expert (T4) ; Maître (T5) |
| **Saison favorable** | Indépendant ; gel hivernal complique l'extraction (Stamina ×1.5) |
| **Régénération** | Carrière épuisée localement = nouveau lieu à exploiter ; les carrières lore sont **statiques** mais paramétrables (data-driven) |

---

## 5. Modulation par ère

| Ère | Effet sur les Pierres |
|-----|------------------------|
| **[[Les Ères#❄️ Ère du Sommeil de Glace]]** | Roches gelées (extraction +50 % Stamina) · Pierre-de-Glace exotique récoltable · variant **Frost** |
| **[[Les Ères#🔥 Ère du Feu Endormi]]** | Pierre noire de Cendra apparait abondamment · variant **Brulé** · construction ignifuge |
| **[[Les Ères#⏳ Ère des Échos Brisés]]** | Pierres "à l'envers" · variant **Spectral** · architecture impossible |
| **[[Les Ères#🌑 Ère de l'Ombre Longue]]** | Pierre-de-Nuit (variant **Shadow**) en surface · forteresses obscures |
| **[[Les Ères#🔮 Ère des Présages]]** | Pierres Runiques émergent (variant **Vénérable**) · sites sacrés |
| **[[Les Ères#🌫️ Ère de la Brume Mortelle]]** | Pierre-Pourpre en marécages · architecture rituelle |

---

## 6. Crafts destinés

- **[[Crafts]] §7 Travail du bois et de la pierre** (Maçon) : **Briques** (intermédiaire fabriqué — voir [[Sources de Ressources#Source 3]] : Pierre/Argile + Chaleur → Brique).
- **[[Crafts]] §7** (Maçon, Architecte) : Murs, fondations, fortifications, bâtiments.
- **[[Crafts]] §7** (Sculpteur, Tailleur de pierre) : Statues, monuments, talismans, gargouilles.
- **[[Crafts]] §1 Forge** : Meule (affûtage), étau, four (construction de la station).
- **[[Crafts]] §7** (Verrier) : Sable issu de pierre broyée → Plaque de verre.
- **[[Crafts]] §8 Scriptorium** : Pierres Runiques (inscriptions enchantement permanent).

---

## 7. Signatures notables

- **Pierre Noire de Cendra** (Cendara) — emblème de l'archipel volcanique, base de l'architecture du Temple des Flammes Éternelles.
- **Pierre-de-Lune de Cestra** — Pierres Runiques de Lune révélant cartes secrètes sous la pleine lune.
- **Marbre de Voldenor** (Galenor) — citadelles anciennes des Pays libres de Kharazir, sculpture noble.
- **Granit de Thalendil** (Celethor) — forteresses souterraines d'Elarian, fortification ultime.
- **Grès Rouge d'Iskara** (Endora) — Porte de Fer, fortifications militaires.
- **Obsidienne de Pyrtara** (Ilthara) — lames primitives, sculpture cérémonielle.
- **Pierre Spectrale d'Ulinor** *(Échos Brisés)* — Grand Canyon de l'Écho, architecture impossible.
- **Pierres Runiques d'Ulinor** *(Présages)* — temples animistes, savoir ancestral.

---

## 8. Décisions ouvertes

- [ ] **Pierre vs Brique** : Pierre = Récolte brute ; Brique = Fabriqué (Maçon). Cohérence avec [[Sources de Ressources#Source 3 — Fabrication]] : confirmer.
- [ ] **Carrière épuisable** : compteur ou inépuisable ?
- [ ] **Pierre Runique** : double-tag avec "magique" ? Contiendrait inscriptions automatiques liées à la Voie ?
- [ ] **Sculpture vs Construction** : matériau = Pierre dans les deux cas, mais grade et qualité différents ?
- [ ] **Sable / pierre broyée** : sous-produit séparé ou intégré ?

---

*Liens : [[Items - Index|← Index Items]] · [[Catégories d'Items]] · [[Sources de Ressources]] · [[Crafts]] · [[Métiers]] · [[Les Ères]] · [[Minerai]] · [[Gemme brut]] · [[Poudre naturel]]*
