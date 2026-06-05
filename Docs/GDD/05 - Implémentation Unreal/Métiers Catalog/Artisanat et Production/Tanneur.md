---
tags: [métier, archétype, artisanat, acuité]
type: archetype
category: Métier
catégorie_métier: Artisanat et production
stat_principale: Acuité
stats_secondaires: [Endurance, Vigueur]
craft_category: Travail du cuir
sources_ressources_accessibles: [Cuir, Peau, Fourrure, Sève, Écorce, Résine traitée, Sang, Liquide, Pigment]
stations_principales: [Cuve de tannage, Étendoir, Établi cuir, Tonneau de mégissage]
outils_principaux: [Couteau de tanneur, Écharnoir, Brosse, Pince à étirer, Battoir]
paliers_maîtrise: [Novice, Initié, Adepte, Expert, Maître]
métiers_complémentaires: [Boucher, Dépéceur, Cordonnier, Maroquinier, Sellier, Forgeron, Tailleur, Relieur]
era_modulation: true
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-paliers-playtest, frontière-cuir-tanné-vs-récolte]
---

# 🥩 Tanneur

## 1. Vue d'ensemble

Le Tanneur transforme la peau brute des créatures (issue du [[Boucher]] ou du [[Chasseur de créature]]) en **[[Cuir]] tanné**, matériau intermédiaire stable indispensable pour les armures cuir, bottes, ceintures, sacs à dos, sangles, reliures, harnais et plus encore. Sans Tanneur, une peau brute pourrit en quelques jours ; tannée, elle dure des années.

Le métier est physiquement exigeant et sensoriellement marqué (odeurs fortes des cuves) — souvent installé en marge des villes, près d'une source d'eau. Pourtant, c'est l'un des piliers économiques silencieux d'Hybelior.

---

## 2. Stats brutes & Maîtrises associées

- **Acuité** (principale) : précision du travail, dosage tannins, contrôle de l'épaisseur du cuir
- **Endurance** (secondaire) : journées longues debout, manipulation de cuves
- **Vigueur** (tertiaire) : étirage, battage, compression

**Maîtrise contextuelle** : `Maîtrise_Tannage` (Couche 2). Sous-maîtrises possibles :
- `Maîtrise_Tannage_Vegetal` (tannins de chêne, sève) — le plus courant
- `Maîtrise_Tannage_Mineral` (alun, sels) — cuir blanc, fin
- `Maîtrise_Tannage_Mixte` (haut tier, cuirs nobles)

---

## 3. Sources de ressources

**Intrants principaux** :
- [[Cuir]] (Récolte Créature, brut) — source principale via [[Boucher]] / [[Dépéceur]]
- [[Peau]] (Récolte Créature, plus fragile, sert à des cuirs souples)
- [[Fourrure]] (Récolte Créature, conservée avec poils — manteaux, capes)
- [[Sève]] et [[Écorce]] (Récolte Nature) — pour tannins végétaux (Chêne, Mélèze, Cèdre)
- [[Résine traitée]] (Fabriqué) — accélérateur de tannage
- [[Sang]] (Récolte Créature) — apprêt rituel pour cuirs spéciaux
- Liquides (eau, lait de chaux) — préparation cuves

**Outputs** :
- **Cuir tanné** (intermédiaire fabriqué — voir [[Cuir]] §état "tanné")
- Variantes : Cuir souple / Cuir rigide / Cuir bouilli (cuir-armure dur) / Vélin (Maître)

---

## 4. Stations + outils

**Stations** :
- **Cuve de tannage** : station fixe, plein air, exhalaisons. Souvent triplée (mégissage / tannage / finition)
- **Étendoir** : grande structure pour séchage contrôlé
- **Établi cuir** : table de découpe et finition
- **Tonneau de mégissage** : préparation alcaline initiale

**Outils** ([[Outils]]) :
- [[Couteau de tanneur]] (écharnoir) — outil signature
- Brosses crins durs
- Pince à étirer
- Battoir bois (assouplissement)

---

## 5. Paliers de Maîtrise

| Palier | Capacités débloquées | Conditions |
|--------|---------------------|------------|
| **Novice** | Cuir commun (vache, mouton, gibier ordinaire) — taux d'échec 20% | — |
| **Initié** | Cuir tier 2, dosage tannins maîtrisé, cuir teint (avec [[Pigment]]) | ~50 cuirs tannés |
| **Adepte** | Cuir tier 3 (cerf, sanglier, ours commun), cuir bouilli (matériel d'armure dur), spécialisations (souple/rigide/bouilli) | ~200 cuirs + maîtrise sous-spé |
| **Expert** | Cuir tier 4-5 (créatures rares — loup forestier, dragon nain juvénile, écailles tannées exotiques), cuir-mosaïque (assemblages complexes pour Maroquinier de luxe) | ~500 cuirs + 1 condition cachée 🔒 |
| **Maître** | Cuir tier 6 mythique (créatures cosmiques, Cuir Spectral d'un Tempora-touché, Vélin sanctifié, Cuir d'Acier Éternel — composante d'œuvre signée Héritage) | Condition cachée 🔒 (probablement : tanner un cuir d'une créature signature comme Antérix Vénérable ou Zocshawk juvénile) |

> [!important] Rouille post-Souffle
> -15 % qualité production pendant 1 semaine après chaque Souffle (cohérent [[Le Souffle]] §rouille). Dissipation par usage normal.

---

## 6. Crafts/recettes débloqués

Voir [[Crafts]] §Travail du cuir pour la taxonomie. Le Tanneur produit l'**intermédiaire** ; le Cordonnier/Maroquinier/Sellier transforme.

Recettes signature par palier :
- **Novice** : Cuir commun T1 (1 peau brute + 2 écorces de chêne + 6h trempage)
- **Initié** : Cuir teint (recette + [[Pigment]] T1-T2)
- **Adepte** : Cuir bouilli (cuir T3 + huile + chaleur contrôlée — base armure cuir lourd)
- **Expert** : Cuir-mosaïque (3-5 cuirs tier différents assemblés — base haute couture/maroquinerie de luxe)
- **Maître** : Vélin sanctifié (cuir + sang sacrificiel ou eau bénite par [[Prêtre]] — pour [[Tome]] mythique, cohérent [[Crafts]] §Scriptorium)

**Mini-jeu** : timing immersion (cuves multiples), dosage tannins (curseur précision), agitation rythmée. Échec = cuir gâté (pourriture, bavures).

---

## 7. Carrière et débouchés

- **Apprenti tanneur de village** (Novice/Initié) — au service d'un Maître local
- **Tanneur indépendant** (Adepte) — atelier propre en bord de rivière
- **Tanneur de cour** (Expert) — fournisseur de noblesse, cuirs nobles
- **Maître Tanneur des Vénérables** (Maître) — fournisseur des Maîtres-Forgerons et Légendes (cuirs pour œuvres signées Héritage)
- **Spécialisations** : Mégissier (cuirs blancs tier haut), Hongroyeur (cuirs gras et imperméables — bottes marines/trappeurs), Parcheminier (vélin → branche [[Scribe]]/[[Relieur]])

---

## 8. Modulation par contexte

### Selon l'ère active

| Ère type | Effet |
|----------|-------|
| **Verdoiement (Terranu)** | Tannins végétaux abondants ; +20 % qualité tannage végétal |
| **Sommeil de Glace (Climata)** | Préservation longue ; les cuirs durent 50 % plus longtemps en stockage |
| **Brume Mortelle** | Pénurie de bétail vivant ; prix cuirs ×2, recettes nécromantiques de cuir d'âme rare disponibles |
| **Feu Endormi (rumeur Eldoria)** | Cuirs au [[Sang]] de dragon nain (Zocshawk) deviennent forgeables → composante Acier Éternel cuir |

### Selon la religion

- **Vael'Kurash** (mort/ancêtres) : tabou sur le cuir des aïeux ; rituels de "remerciement à la créature" obligatoires sinon malus à la qualité
- **Foedus Animae** (âmes) : cuir d'un animal compagnon = pacte rituel possible (cuir signé)
- **Lex Petra** : peu d'intérêt pour le cuir, préfère pierre

### Selon la faction

- **Guildes martiales** : commandes massives de cuir bouilli pour armures soldats
- **Cours nobles** : exigences de cuirs fins/teints/maroquinés
- **Marchands** : sacs à dos, sangles, courroies de caravane

---

## 9. Économie

**Marges typiques** :
- Cuir T1 : prix de vente ~10-30 Éclats / pièce, intrants ~3-10 Éclats
- Cuir T3 (cuir bouilli) : ~200-500 Éclats / pièce
- Cuir T5+ exotique : 5 000 Éclats - plusieurs Grands Éclats

**Gold sinks** :
- Loyer atelier (zone-périphérique pour évacuation odeurs)
- Achat de tannins rares (sève de Mélèze de Galenor, alun importé)
- Apprenti(s) à former

**Chaîne économique** :
```
[Boucher / Dépéceur / Chasseur de créature]
        ↓ (peau brute, périssable)
[TANNEUR]
        ↓ (cuir tanné, stable)
[Cordonnier / Maroquinier / Sellier / Tailleur / Relieur / Forgeron-sangles]
        ↓
[Joueurs et clients finaux]
```

---

## 10. Comportement IA / signatures PNJ

### Cycle quotidien type *(angle gameplay seulement — modèle BT formel à trancher en [[Concepts Fondamentaux IA PNJ]])*

```
[06:30 lever — préparation cuves nocturnes (rotation matières)]
[07:30-12:00 travail matin : étirage, écharnage, immersion nouvelles peaux]
[12:00-13:00 pause repas — souvent à l'écart à cause des odeurs]
[13:00-18:00 travail après-midi : finition, séchage, livraisons]
[18:00 fermeture atelier, lavage minutieux]
[19:00-22:00 vie sociale, souvent à la taverne — réputation odoriférante !]
[22:30 coucher]
```

### Signatures PNJ canoniques (Phase 4)

- **Maître Veylor le Patient de Mosrack** (Galenor) — fournisseur des cours royales, mégisserie d'alun renommée
- **Vieille Sigrid des Marais d'Onara** — cuirs de créatures aquatiques rares, technique secrète de tannage à la sève de mangrove
- **Garran le Sanglant de Cendara** — spécialiste des cuirs volcaniques (Zocshawk juvéniles, lézards de feu), vit près du Mont Cendra
- **Maître Lael l'Onirique d'Ilthara** — vélins pour scribes du Voile, technique rituelle de tannage onirique
- **Apprenti Tilbo de Nylor (Ulinor)** — promesse de Maître, manie déjà les cuirs cavernicoles à 17 ans

---

## 11. Décisions ouvertes

- [ ] **Frontière Cuir tanné vs Cuir brut** : le terme "Cuir" dans [[Sources de Ressources]] §Récolte Créature couvre la peau brute. Le "Cuir tanné" est l'état stable. Garder un seul archétype Cuir (avec frontmatter `state: brut|tanné`) ou créer un archétype distinct *Cuir tanné* dans [[Catalogue/Ressources/Fabriqué]] ? **Recommandation** : un seul archétype avec deux états, Tanneur fait la transition.
- [ ] **Sous-maîtrises (Mégissier, Hongroyeur, Parcheminier)** : créer comme métiers distincts ou sous-spécialisations Tanneur ? Recommandation : sous-spé Tanneur.
- [ ] **Cuir cosmique (Spectral, Onirique)** : recettes signature à formaliser en Phase 3 (branche Architecture Data-Driven §ItemModifier).
- [ ] **Tabou Vael'Kurash** : impact gameplay quantifié (-X% qualité ? quête de purification ?) — à playtester.
- [ ] **Cuir d'humanoïde** (loot Goblin/Orc) : marché noir karma rouge (cf. M3 §Sécurité §Assassin) — frontière éthique à acter.

---

*Liens : [[Métiers]] · [[Crafts]] · [[Sources de Ressources]] · [[Cuir]] · [[Boucher]] · [[Dépéceur]] · [[Cordonnier]] · [[Maroquinier]] · [[Sellier]] · [[Forgeron]] · [[Tailleur]] · [[Relieur]] · [[Le Souffle]] · [[L'Accord]] · [[Économie]]*
