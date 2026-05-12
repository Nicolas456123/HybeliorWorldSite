---
tags: [item, archétype, ressource, récolte, nature, minéral, volcanique, poudre]
type: archetype
category: Récolte
subcategory: Nature
source: Récolte nature
mastery: Minage / Volcanologie
métiers_de_récolte: [Mineur, Apothicaire (récolte fine), Alchimiste (zones volcaniques)]
métiers_consommateurs: [Alchimiste, Apothicaire, Forgeron (poudre métallique), Teinturier (pigments minéraux), Compositeur de sorts]
biomes: [Zones volcaniques, Cavernes, Sources thermales, sites cosmiques]
era_availability: [toutes - pic Feu Endormi]
tier_min: 1
tier_max: 6
status: drafted
last_review: 2026-05-01
needs_review_for: [poudre-explosive-mécanique, frontière-Poudre-naturel-vs-Poudre-fabriqué]
---

# 🌋 Archétype — Poudre naturel

> Sous-catégorie de la **catégorie [[Catégories d'Items|Récolte]]**, source [[Sources de Ressources#Source 1 — Récolte nature|Récolte nature]]. **Poudres minérales et volcaniques** : soufre, salpêtre, pigments minéraux, cendres cosmiques. Distinct du **Poudre fabriqué** (alchimie raffinée — voir [[Sources de Ressources#Source 3]]).

---

## 1. Vue d'ensemble

La **Poudre naturel** désigne les poudres minérales **récoltées directement dans le monde** : soufre des sources thermales, salpêtre des grottes, cendres volcaniques, pigments minéraux extraits sans transformation. **Pas un consommable cuisine** (≠ farine de [[Céréale]]). Usage exclusif **alchimie / forge / teinture / scriptorium**.

Pattern unique : ces poudres sont **réactives** — soufre = composant feu, salpêtre = explosion potentielle (cf. mécaniques avancées), cendres cosmiques = magie d'ère. Manipulation par Apothicaire/Alchimiste obligatoire pour usage non-trivial.

Marqueur cosmologique : pays volcaniques (Cendara, Pyrtara) en font économie de prestige.

---

## 2. Variations / espèces

| Poudre | Source | Usage canonique |
|--------|--------|-----------------|
| **Soufre** | Sources thermales, fumerolles | Composant feu, alchimie, médecine |
| **Salpêtre** | Cavernes, plafonds humides | Conservation viande, alchimie réactive |
| **Cendres volcaniques** | Cendara, Pyrtara | Pigment gris, alchimie ardente |
| **Cendres cosmiques** *(post-Souffle)* | Site post-Souffle | Composant ultime |
| **Ocre rouge** *(pigment)* | Carrières rouges | Pigment rouge primitif |
| **Ocre jaune** *(pigment)* | Carrières jaunes | Pigment jaune |
| **Charbon de bois** *(végétal naturel)* | Forêt brûlée | Combustible, pigment noir, alchimie |
| **Sel gemme** | Mines de sel | Cuisine, conservation, alchimie |
| **Ambre broyé** *(rare)* | Forêts anciennes | Alchimie, prestige |
| **Poudre d'os fossile** | Strates anciennes | Alchimie nécromantique mineure |
| **Poudre Spectrale** *(variant ère)* | Échos Brisés | Magie Tempora |
| **Cendres-de-Phénix** *(rare Cendara)* | Mont Cendra | T5+, alchimie ardente |
| **Sable cosmique** *(stellaire)* | Cratères de météorite | Composant unique |

---

## 3. Tier × Qualité

| Tier | Qualité | Conditions typiques | Yield |
|------|---------|---------------------|-------|
| **T1** | Brute | Soufre/Salpêtre commun, récolte grossière | 2-4 doses |
| **T2** | Saine | Tri propre, séchage standard | 4-6 doses |
| **T3** | Bonne qualité | Cendres volcaniques nobles, Apothicaire Adepte | 3-5 doses |
| **T4** | Excellente | Ambre broyé, Cendres-de-Phénix mineures | 2-4 doses |
| **T5** | Exceptionnelle | Cendres-de-Phénix vraies, Poudre Spectrale | 1-3 doses |
| **T6** *(signature)* | Mythique | Cendres cosmiques post-Souffle | < 1 dose |

---

## 4. Spawn / Récolte

| Aspect | Détail |
|--------|--------|
| **Biomes** | **Zones volcaniques** (référence — Cendara, Pyrtara, Mont Cendra), **Cavernes** (Salpêtre), **Sources thermales** (Soufre), **Carrières** (Ocres), **sites cosmiques** (Cendres post-Souffle) |
| **Outil requis** | Spatule + récipient (pot, fiole) ; soufflet pour récolte de poussières en suspension ; **gants épais** pour Soufre/Salpêtre (toxicité) |
| **Mini-jeu** | **Récolte délicate** : éviter de respirer (jauge souffle, pas pour gameplay punitif mais pour timing) ; balayer puis filtrer |
| **Palier de Maîtrise minimum** | Novice (T1-T2 soufre commun) ; Adepte (T3 cendres nobles) ; Expert (T4) ; Maître + condition cachée 🔒 (T5-T6) |
| **Saison favorable** | Indépendant des saisons ; mais Sommeil de Glace bloque accès aux montagnes hautes |
| **Régénération** | Sources thermales : permanente ; cavernes salpêtre : 30-60 jours ; cendres post-Souffle : drop unique par site |

---

## 5. Modulation par ère

| Ère | Effet sur les Poudres naturelles |
|-----|----------------------------------|
| **[[Les Ères#🔥 Ère du Feu Endormi]]** | +50 % yield Soufre/Cendres · variant **Brulé** universel · **Cendres-de-Phénix** atteignables T5+ |
| **[[Les Ères#❄️ Ère du Sommeil de Glace]]** | -70 % yield · cavernes accessibles uniquement gelée |
| **[[Les Ères#⏳ Ère des Échos Brisés]]** | **Poudre Spectrale** rare · variant translucide |
| **[[Les Ères#🌑 Ère de l'Ombre Longue]]** | Cendres noircies (variant **Shadow**) · alchimie d'ombre |
| **[[Les Ères#🔮 Ère des Présages]]** | Cendres runiques (variant **Vénérable**) · divination |
| **[[Les Ères#🌪️ Ère des Vents Bouleversants]]** | Cendres dispersées massivement · récolte aérienne (filets) |
| **Post-[[Le Souffle]]** | **Cendres cosmiques** sur site du Souffle (composant ultime, drop limité) |

---

## 6. Crafts destinés

- **[[Crafts]] §2 Alchimie** : intrant central — potions ardentes, poudres alchimiques, émulsions réactives.
- **[[Sources de Ressources#Source 3 — Fabrication]]** : Poudre naturel + raffinage → **Poudre fabriqué** (Apothicaire/Alchimiste).
- **[[Crafts]] §1 Forge** : Soufre/Charbon dans la forge (aide à la fonte) ; poudres métalliques pour alliages.
- **[[Crafts]] §4 Tissage et confection** (Teinturier) : Pigments minéraux (Ocres, Cendres) — intrant **Pigment** fabriqué.
- **[[Crafts]] §3 Cuisine** : Sel gemme (cuisine, conservation des viandes).
- **[[Crafts]] §8 Scriptorium et enchantement** : Charbon broyé (encres noires) ; Poudres rituelles dans cercles d'enchantement.

---

## 7. Signatures notables

- **Soufre de Cendara** — référence des poudres ardentes, base économique du Mont Cendra.
- **Cendres-de-Phénix de Cendara** *(Feu Endormi)* — composant des armes du Temple des Flammes Éternelles.
- **Salpêtre des Caves de Vytharia** (Ilthara) — illusionnistes des oligarchies mystiques.
- **Ocre Rouge des Plaines d'Endora** — fresques sacrées du Pacte des Sylves d'Avalor.
- **Sel Gemme de Cestra** — conservation hivernale, base culinaire des Chasseurs de la Glace.
- **Ambre Broyé d'Alkaran** — pharmacopée tribale ancestrale.
- **Cendres Cosmiques** *(post-Souffle, lieu unique)* — composant T6 des recettes Mythiques.
- **Poudre Spectrale d'Ulinor** *(Échos Brisés, Grand Canyon)* — alchimie de Tempora.

---

## 8. Décisions ouvertes

- [ ] **Salpêtre + explosion** : mécanique d'arme à poudre / explosif ? Si oui, composant gameplay clé. Sinon, simple alchimie.
- [ ] **Frontière Poudre naturel / [[Sources de Ressources#Source 3]] Poudre fabriqué** : Poudre naturel = brut (extrait) ; Poudre fabriqué = raffiné/composé. Confirmer pipeline.
- [ ] **Toxicité Soufre/Salpêtre** : dégâts si récolte sans gants ? Mineurs gantés par défaut.
- [ ] **Cendres cosmiques post-Souffle** : drop scripté unique ou farm libre rare ?
- [ ] **Frontière avec [[Pigment]] (intermédiaire fabriqué)** : Ocres et Cendres = pigments naturels directement utilisables ou doivent être raffinés ?

---

*Liens : [[Items/Index|← Index Items]] · [[Catégories d'Items]] · [[Sources de Ressources]] · [[Crafts]] · [[Métiers]] · [[Les Ères]] · [[Minerai]] · [[Pierre]] · [[Pigment]] · [[Le Souffle]]*
