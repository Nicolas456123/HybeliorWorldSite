---
tags: [item, archétype, ressource, récolte, nature, végétal, écorce]
type: archetype
category: Récolte
subcategory: Nature
source: Récolte nature
mastery: Bûcheronnage / Botanique
métiers_de_récolte: [Bûcheron, Botaniste, Herboriste]
métiers_consommateurs: [Tanneur (tannins), Apothicaire, Alchimiste, Teinturier (pigments), Scribe (papier brut)]
biomes: [Forêt tempérée, Taïga, Forêt résineuse]
era_availability: [toutes]
tier_min: 1
tier_max: 5
status: drafted
last_review: 2026-05-01
needs_review_for: [extension-essences-feuillues, frontière-bûcheron-botaniste]
---

# 🌳 Archétype — Écorce

> Sous-catégorie de la **catégorie [[Catégories d'Items|Récolte]]**, source [[Sources de Ressources#Source 1 — Récolte nature|Récolte nature]]. Sous-produit du Bois récolté **séparément** : récolte indépendante (rasp/lever) qui n'abat pas l'arbre.

---

## 1. Vue d'ensemble

L'**écorce** est récoltée **sans abattre l'arbre** par incision contrôlée — opération à mi-chemin entre [[Métiers|Bûcheron]] et [[Métiers|Botaniste]]. Source primaire de **tannins** (intrant essentiel du tannage du cuir, voir [[Crafts]] §5), de **pigments** (teinturerie), de **résines** (alchimie médicinale) et de **papier brut** (scriptorium).

Une écorce mal levée tue l'arbre ; un Bûcheron Adepte+ la récolte de manière soutenable, ce qui crée un rythme économique distinct du Bois.

---

## 2. Variations / essences

> 6 essences canoniques du CSV [[AccessExport]] §Objets type 32 + extensions.

| Essence | Profil | Usage canonique |
|---------|--------|-----------------|
| **Écorce d'Épicéa** *(CSV)* | Riche en tannins, résineuse | Tannage, résine traitée |
| **Écorce de Pin** *(CSV)* | Très résineuse, parfumée | Cire, baumes, allumage |
| **Écorce de Sapin** *(CSV)* | Souple, tannins moyens | Tannage, papier d'emballage |
| **Écorce de Douglas** *(CSV)* | Épaisse, fibreuse | Bourre isolante, papier |
| **Écorce de Mélèze** *(CSV)* | Tannique forte, dorée | Pigment doré, tannage haut tier |
| **Écorce de Cèdre rouge** *(CSV)* | Aromatique, résistante aux insectes | Coffres, chasse-mites |
| **Écorce de Chêne** | Tannins extrêmement riches | Référence tannage |
| **Écorce de Hêtre** | Lisse, fine | Papier fin, scribe |
| **Écorce de Bouleau** | Pelable en feuilles, blanche | Papier rituel, allumage rapide |
| **Écorce d'Ébène** | Noire, dense | Pigment noir noble |

---

## 3. Tier × Qualité

| Tier | Qualité | Conditions typiques | Yield |
|------|---------|---------------------|-------|
| **T1** | Brute | Levée approximative, fragments | 2-3 lanières |
| **T2** | Saine | Levée propre, séchage standard | 4-6 lanières |
| **T3** | Bonne qualité | Essence riche (Chêne/Mélèze), Botaniste Adepte | 6-8 lanières + tannins purs |
| **T4** | Excellente | Arbre mature + technique experte | 8-10 lanières · usage Magistral |
| **T5** | Exceptionnelle | Variant cosmique ou arbre nommé | 4-6 lanières (rares) |

> Les tiers T6 sont réservés aux signatures (§7).

---

## 4. Spawn / Récolte

| Aspect | Détail |
|--------|--------|
| **Biomes** | Forêts résineuses (essences CSV), Forêts tempérées (Chêne, Hêtre), Tropical (Ébène) |
| **Outil requis** | Couteau de bûcheron / serpe — opération distincte de la Hache |
| **Mini-jeu** | **Trace continue** : maintenir la lame le long du tronc sans dévier (jauge de précision) ; déviation = écorce déchirée (tier −1) + arbre blessé |
| **Palier de Maîtrise minimum** | Novice (T1-T2 Bûcheron) ; Adepte (T3 Botaniste) ; Expert (T4+) |
| **Saison favorable** | **Fin de printemps** (sève remontée, écorce souple) = +20 % yield ; **plein hiver** = écorce cassante, T1 max |
| **Soutenabilité** | Un arbre peut donner écorce **2-3 fois sur sa vie** ; au-delà, mort de l'arbre. Un Botaniste Maître ne tue jamais l'arbre. |

---

## 5. Modulation par ère

| Ère | Effet sur l'Écorce |
|-----|--------------------|
| **[[Les Ères#🌿 Ère du Verdoiement]]** | +30 % tannins par lanière · écorce "vivante" qui repousse (yield infini temporaire) |
| **[[Les Ères#❄️ Ère du Sommeil de Glace]]** | Variant **Frost** "Écorce givrée" — usage isolation, recette débloquée [[Les Ères]] |
| **[[Les Ères#🌑 Ère de l'Ombre Longue]]** | Variant **Shadow** sur Bouleau/Bouleau noir — pigments obscurs débloqués |
| **[[Les Ères#🌫️ Ère de la Brume Mortelle]]** | Écorces de marécages portent **résidus toxiques** — composant base poison |
| **[[Les Ères#⏳ Ère des Échos Brisés]]** | Variant **Spectral** très rare — papier qui change d'aspect selon témoin |

---

## 6. Crafts destinés

- **[[Crafts]] §5 Travail du cuir** : Tannage du **Cuir** (intrant essentiel — sans tannins, pas de cuir tanné). Voir [[Sources de Ressources#Source 3 — Fabrication]] note Cuir tanné.
- **[[Crafts]] §2 Alchimie** : Résine traitée (Apothicaire) · Baumes médicinaux · Décoctions
- **[[Crafts]] §4 Tissage et confection** : Pigments naturels (avec Teinturier)
- **[[Crafts]] §8 Scriptorium** : Papier brut (Bouleau, Hêtre) · Parchemins primitifs
- **[[Crafts]] §3 Cuisine** : Aromatisation (Cèdre, Pin) · infusions

---

## 7. Signatures notables

- **Écorce de Mélèze d'Astravia** (Celethor) — tannins dorés, base du *Cuir Doré* des sorciers d'Astravia.
- **Écorce de Chêne Ancien de Trinoria** (Galenor) — tannage d'élite, utilisée pour l'**armure de cuir** des archers de Trinoria.
- **Écorce de Cèdre Rouge des Khalorins** (Galenor) — coffres-secrets imperméables aux insectes-prédateurs des savanes.
- **Écorce de Bouleau-Lunaire de Nysaria** — papier rituel des druides de la **Forêt de l'Éternel Hiver**.
- **Écorce d'Ébène-Vivant de Warenthor** (Ilthara) — pigment noir profond, encres sacrées.
- **Écorce-Brûlée de Cendara** — récoltée sur arbres post-éruption, ignifuge naturel.

---

## 8. Décisions ouvertes

- [ ] **Mécanique soutenabilité** : compteur "blessures" par arbre visible au joueur ou caché ?
- [ ] **Cuir tanné explicit** : ajouter "Cuir tanné" comme produit fabriqué officiel (voir [[Sources de Ressources]] note de bas) — l'écorce est l'intrant clé.
- [ ] **Papier vs Parchemin** : l'écorce de Bouleau produit-elle du Papier (catégorie fabriquée) directement ou via un produit intermédiaire ?
- [ ] **Frontière Bûcheron / Botaniste** : qui récolte canoniquement ? Compromis = `mastery: mixte`.

---

*Liens : [[Items - Index|← Index Items]] · [[Catégories d'Items]] · [[Sources de Ressources]] · [[Crafts]] · [[Métiers]] · [[Les Ères]] · [[Bois]] · [[Sève]] · [[Pigment]]*
