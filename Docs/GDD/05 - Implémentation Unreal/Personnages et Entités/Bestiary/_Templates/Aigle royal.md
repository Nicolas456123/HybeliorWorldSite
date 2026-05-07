---
tags: [créature, archétype, bestiaire, bipède, avien, prédateur, aérien, montagne]
type: archetype
forme: Bipède
taille: Grand
revêtement: [Plumage]
sens: [Vision diurne exceptionnelle, Vision nocturne partielle, Audition fine]
cognition: Apprenant
socialité: Couple
territorialité: Fixe
milieu: [Montagne, Plaine, Falaises, Forêt clairsemée]
locomotion: [Vol battu, Vol plané, Marche]
aire_influence: Étendue
reproduction: Ovipare
métamorphose: Aucune
durée_vie: Longue
trophicité: Carnivore
fonction_éco: Prédateur apex aérien
pouvoirs: [Plongeon prédateur, Vue aiguë, Serres déchirantes, Vol stationnaire bref, Chasse coordonnée en couple]
élément: "-"
résistances: [Vent, Hauteur (peur)]
cr: 7
hp_base: 200
loot_table: [Plume, Os, Serres, Cuir-peau, Cœur de creature, Œil, Œuf, Sang]
variants_cosmiques: [Shadow, Spectral, Frost, Verdoyant, Brulé, Pourpre, Doré, Brisé, Onirique, Vénérable]
status: drafted
last_review: 2026-05-01
needs_review_for: [combat-aérien-mécanique, mapping-Feopsingale, plume-rareté]
---

> [!note] Archive : ce fichier est conservé comme template paramétrique de référence.
> Voir [[Espèces/Oiseaux/Aigles/_Description|Oiseaux/Aigles]] pour les espèces concrètes décomposées de cet archétype.

# 🦅 Aigle royal — Archétype-référence

> Archétype canonique du **prédateur aérien apex** d'Hybelior. Pattern pour aviens chasseurs (aigle, aigle-condor, gyrfalcon géant, vautour-roi). Pose le pattern **Bipède avien** distinct du Bipède humanoïde, et la **mécanique de combat aérien** (joueur au sol vs créature en vol — première vraie occurrence dans le bestiaire).
>
> Voir [[Bestiary/Index]] · [[Loup forestier]] · [[Faucon]]

---

## 1. Vue d'ensemble

### Description sensorielle

L'Aigle royal est un avien massif (envergure 2.5-3.5 m, poids 5-12 kg, longueur becque-queue 1 m). Plumage brun-doré à brun-noir, **nuque et tête plus claires** chez l'adulte, **œil jaune perçant**, bec crochu noir, **serres recourbées** de 6-8 cm. Sa silhouette en plané est **emblématique** — un grand triangle sombre sur le ciel.

Sons : **cri perçant** signature (audible à 1 km), **silence en chasse** (plongeon silencieux). Il est **vu avant d'être entendu** (pattern inverse du loup). Trace au sol : **plumes éparses** + **proie déchiquetée** (signature de chasse).

### Place écologique et culturelle

**Prédateur apex aérien** : chasse marmottes, jeunes ongulés, lièvres, rongeurs ; capable d'emporter une proie de **5-7 kg** en vol. Régulé par : créatures encore plus grandes (dragons, rocs cosmiques), conditions météo extrêmes, chasseurs humains ciblant les nids (rare).

**Folklore** :
- *Trinoria, Galenor* → aigle = emblème royal (couronnes, étendards)
- *Onara, Kharazir* → aigle = totem de Via Ventus (vent), signe de liberté
- *Skaldoria* → aigle des cimes = monture des Spectres-Pères
- *Celethor* → aigle blanc géant (variante) = monture mythique des Fils de l'Hiver
- *Cendara* → aigle de feu (variante Brulé) = présage d'éruption

**Importance gameplay** :
- **Première rencontre aérienne sérieuse** typique d'un joueur Adepte
- Mentor de **combat air-sol asymétrique** (joueur doit lever la garde, anticiper plongeon, utiliser arc/sort)
- Loot **Plume** (intrant majeur — flèches, écriture magique, capes), **Œuf** (rare — composant alchimique + apprivoisement Phase 4)
- Variant régional canonique : **Feopsingale** (cf. §9)

---

## 2. Caractérisation sur les 9 axes V2

### Axe 1 — Morphologie

**Bipède avien Grand** (envergure 2.5-3.5 m). Revêtement **Plumage** dense (régule chaud/froid, isole). Sens : **Vision diurne exceptionnelle** (×8 humain — détecte proie à 2 km), **Vision nocturne partielle** (chasse possible aube/crépuscule, pas pleine nuit), **Audition fine**. Pas d'odorat marqué.

### Axe 2 — Comportement

**Apprenant** : BT + mémoire courte. Mémorise sentiers, camps, **points d'eau** (proies y viennent). **Socialité Couple** (couple à vie ; nid utilisé sur plusieurs années). **Territorialité Fixe** (territoire de 50-200 km², défendu en couple). Communication : cris, postures (ailes étendues = menace), **parade aérienne** (rut).

### Axe 3 — Habitat & Mobilité

**Montagne, Plaine, Falaises, Forêt clairsemée**. Évite : forêt dense (gêne le vol), océan profond (pas de proie aérienne), zones planaires. **Locomotion : Vol battu (15 m/s pointe), Vol plané (le plus efficient — utilise thermiques), Marche (lente, gauche au sol)**. **Aire d'influence Étendue** (50-200 km² — la plus large du bestiaire jusqu'ici).

### Axe 4 — Cycle de vie

**Ovipare** (1-2 œufs/an, couvaison 40-45 jours). **Pas de métamorphose**. **Durée de vie Longue** (30-50 ans en sauvage, jusqu'à 70 pour un Vénérable).

### Axe 5 — Écologie

**Carnivore** (ongulés jeunes, marmottes, lièvres, rongeurs, oiseaux, charogne occasionnelle). **Méthode : Plongeon prédateur** (depuis altitude 200-500 m, pique à 50 m/s, frappe avec serres, emporte ou abat).

### Axe 6 — Rôle

**Prédateur apex aérien** (apex de son médium). Pas d'alliance. **Menacé** par : créatures cosmiques, rocs, dragons, météo, chasseurs ciblant nids. Il **n'est pas menacé au sol** par les prédateurs au sol (il décolle).

### Axe 7 — Capacités

**Pas d'élément**. **Pouvoirs** : Plongeon prédateur, Vue aiguë (détection longue), Serres déchirantes (Saignement), Vol stationnaire bref (3 s pour viser), Chasse coordonnée en couple (mécanique de duo). **Résistances** : Vent (immunité), Hauteur (immunité au vertige). Vulnérable au feu (plumage), aux flèches lourdes, à la magie d'air contraire (Voie de Ventus joueur peut **désorienter** — pédagogie).

### Axe 8 — Stats

Voir §3. HP base 200 (CR 7). Stamina pour planages prolongés. Pas de Mana. **Vitesse pointe 50 m/s en plongeon** (le plus rapide jusqu'ici).

### Axe 9 — Récompenses

**Loot** : 8 ressources (§6). **Plume** = intrant central (flèches Niveau 2+, capes nobles, écriture magique). **Œuf** = quête narrative + apprivoisement Phase 4.

---

## 3. Stats de combat par CR

| Variante | CR | HP | Stamina | Vitesse vol | Plongeon dmg | Comportement |
|----------|----|----|---------|-------------|---------------|--------------|
| **Aiglon** | 1 | 30 | 50 | 8 m/s (faible) | n/a | Fuit, parents interviennent |
| **Sub-adulte** | 4 | 120 | 140 | 18 m/s | 18-26 | Chasse de proximité, plonge mal |
| **Adulte** *(standard)* | 7 | 200 | 220 | 22 m/s (vol), 50 m/s (plongeon) | 32-46 | Pattern complet, plongeon précis |
| **Vétéran** | 10 | 290 | 280 | 22 m/s | 42-60 | Anticipe esquive, attaque alterné couple |
| **Roi-Aigle** *(unique régional)* | 14 | 460 | 360 | 24 m/s, 55 m/s plongeon | 58-82 | Boss régional, plongeon-tournis répété |

> **Calibrage Adulte CR 7** : 200 HP face à joueur Adepte. Combat **asymétrique** : l'aigle évite le CàC, plonge à intervalles, fuit en altitude. Le joueur **doit** avoir un **moyen anti-aérien** (arc, sort, lance lancée) — sinon combat sans fin (pédagogie).

### Régen

| Stat | Hors combat | En combat |
|------|-------------|-----------|
| HP | +2 HP/s | 0 |
| Stamina | +25/s (en planage) | +12/s |

---

## 4. Attaques canoniques

| Attaque | Type | Stamina | CD | Effet | Telegraph |
|---------|------|---------|----|----|-----------|
| **Coup de bec** *(à terre / vol stationnaire)* | Perçant | 8 | 1.5 s | Dégât base | Tête piquée (0.4 s) |
| **Coup de serre** *(en vol)* | Tranchant | 12 | 2.0 s | Dégât ×0.9, **Saignement** stack 1 | Serre étendue (0.4 s) |
| **Plongeon prédateur** | Perçant lourd | 60 | 12 s | Pique 50 m/s, dégât ×1.7 + **knockdown** 1.5 s | Cri + montée 1.5 s + pique (1.0 s — **fenêtre tir/sort**) |
| **Saisie + chute** *(joueur léger uniquement)* | Mobilité dmg | 80 | 30 s | Soulève joueur 5 s puis lâche, **chute = dmg de hauteur** (40-80) | Plongeon prolongé (1.5 s) |
| **Battement d'aile** *(à terre, défense)* | Contondant + zone | 30 | 8 s | Repousse joueur 4 m, dmg 0.5× | Recul + ailes ouvertes (0.6 s) |
| **Cri d'aigle** *(intimidation)* | Sonore | 20 | 25 s | −15% précision joueur 5 s, alerte couple à 500 m | Tête levée (0.8 s) |
| **Chasse coordonnée** *(couple uniquement)* | Tactique | n/a | — | Un aigle harcèle de face, l'autre plonge derrière (alternance) | Pattern visible (couple) |

**Pattern IA standard** : Vol haut → détection → cri → plongeon (×1) → recul vol stationnaire 4 s → re-plongeon. Pas de poursuite à terre. **Si HP < 30%** : fuite en altitude, retour au nid.

**Fenêtre canonique** : la **montée 1.5 s avant plongeon** est la **fenêtre tir/sort** principale. Pédagogie : entraîner le joueur à anticiper, pas à réagir au pique.

---

## 5. Pouvoirs spécifiques

| Pouvoir | Description |
|---------|-------------|
| **Plongeon prédateur** | Voir §4. Pattern signature canonique aérien. |
| **Vue aiguë** | Détecte joueur à 2 km hors furtivité (Maîtrise *Furtivité aérienne* palier 3+ requise pour échapper). |
| **Serres déchirantes** | Saignement stack 1, jusqu'à 3 stacks. |
| **Vol stationnaire bref** | 3 s sur place (face au vent). Permet attaques précises, mais **fenêtre punition** (cible immobile). |
| **Chasse coordonnée en couple** | Voir §4. **Pattern IA canonique pour créatures Couple**. Le couple **partage** un BT — un harcèle, l'autre frappe. |
| **Saisie + chute** | Inflige dégât de hauteur si joueur léger (<70 kg équipement = mécanique à valider Phase 3). Sinon échec, l'aigle relâche immédiatement. |

---

## 6. Loot table

| Ressource | Drop rate | Modificateur | Métier |
|-----------|-----------|--------------|--------|
| **Plume** *(plumes longues)* | 100% (4-8) | × 2 vétéran, × 4 Roi-Aigle (plumes royales = composant Magistral) | Dépéceur Novice |
| **Os** *(os creux)* | 90% (2-4) | Léger, intrant flèches/sceptres | Dépéceur Novice |
| **Serres** *(Griffe spécifique)* | 80% (2) | × 2 Roi-Aigle, intrant arme légendaire | Dépéceur Initié |
| **Cuir-peau** *(peau plumée fine)* | 60% (1-2) | Cape légère | Dépéceur Initié |
| **Cœur de creature** | 15% — **50% Roi-Aigle** | Tier alch +1, intrant alchimie de vue | Apothicaire Adepte |
| **Œil** *(Œil d'aigle)* | 40% (2) | **Composant Mythique** (potion de Vue) | Apothicaire Adepte |
| **Œuf** *(rare — pillage de nid)* | 5% par nid découvert | Quête + apprivoisement Phase 4 | Pilleur de nids (Maîtrise spéciale) |
| **Sang** | 50% (1 fiole) | Composant alchimie de vol | Apothicaire Initié |

> **XP Pistage aérien** : repérer un nid d'aigle = +50 pts spécifique sous-Maîtrise *Pistage aérien*.

---

## 7. Variants cosmiques

> Archétype **neutre** : 10 variants.

| Variant | Spécificité majeure |
|---------|---------------------|
| **Shadow** | Plumage noir, plongeon silencieux (pas de cri = telegraph caché) |
| **Spectral** | Translucide, traverse murs/branches |
| **Frost** | Plumage blanc-bleu, gel sur Coup de serre |
| **Verdoyant** | Lierres, niche en arbre géant, pacifié hors menace |
| **Brulé** | Plumes en braise, plongeon enflammé |
| **Pourpre** | Brume, **Confusion** sur cri |
| **Doré** *(Aigle solaire)* | Halo lumineux, **pacifié**, mène vers cimes sacrées (Phase 4) |
| **Brisé** | Téléportation courte en plongeon |
| **Onirique** | N'apparaît qu'en zone Somnix nuit, vol silencieux |
| **Vénérable** | Apprenant ×2, anticipe parades aériennes joueur |

---

## 8. Comportement IA

### Routine

| Phase | Comportement |
|-------|--------------|
| **Aube** | Décollage, planage, repérage |
| **Matin** | Chasse active (proies herbivores actives) |
| **Midi** | Repos sur perchoir haut |
| **Après-midi** | Chasse seconde |
| **Crépuscule** | Retour nid, alimentation des aiglons (saison) |
| **Nuit** | Sommeil au nid |

### Décisions de combat

- **Détecté** (joueur entre 1 km) : observation 30 s, cri si menace pour nid, plongeon si proie
- **Couple** : Chasse coordonnée
- **Joueur tire / sort** : esquive aérienne (zigzag), récupère altitude, re-plonge 8 s plus tard
- **HP < 30%** : fuite en altitude, retour nid, ne revient pas
- **Joueur en hauteur (proche du nid)** : agressivité maximale, plongeons enchaînés
- **Joueur sous couvert (forêt, abri)** : tournis 30 s puis désengagement

### Cycle Ère

- **Ère du Verbe** (Via Ventus) : aigles **plus fréquents**, parade nuptiale exacerbée
- **Ère de l'Ombre Longue** : variant Shadow, chasse de nuit possible
- **Ère du Rêve Lumineux** : variant Doré apparaît

---

## 9. Signatures (PHASE 4 stub)

### Feopsingale l'Aile-de-Mille (variant régional canonique — AccessExport)
- **Localisation** : Cimes de **Veltora** (Trinoria-Galenor frontière), pic le plus haut du continent
- **CR** : 16 (Boss régional élite)
- **Variante** : Vénérable Doré Roi-Aigle
- **Lore** : *« Feopsingale a vu mille rois. Quand un seigneur de Trinoria meurt, on dit qu'elle plane sept jours sur le château. Elle ne se laisse pas approcher — sauf par les Liés de Via Ventus, et même eux, à pied, sans armes. Son nid est au sommet du Pic Veltora. Personne n'en revient. »*
- **Bonus narratif** : Loot **Os de Feopsingale** *(canonique — composant Mythique d'envol)*, **Plume de Feopsingale** (intrant cape légendaire), **Œil de Feopsingale** (potion Vision Royale unique). Quête signature *L'Aile-de-Mille* — résolution narrative privilégiée (Voie de Ventus).

### L'Aigle Brulé du Mont Cendra
- **Localisation** : Versants du Mont Cendra (Cendara)
- **CR** : 12
- **Variante** : Adulte Brulé
- **Lore** : *« Né d'un œuf cuit dans la cendre, il chasse les Forgerons du Feu — on ne sait pas pourquoi. »*

---

## 10. Décisions ouvertes

- **Combat air-sol asymétrique** : pédagogie joueur (faut-il forcer un échec sans arc/sort ?). Proposition : oui, pédagogie de **diversification d'outils**
- **Saisie + chute** : seuil de poids joueur — à valider Phase 3
- **Œuf de nid** : système de pillage de nid + apprivoisement → Phase 4 (lien [[PNJ]] §Compagnons)
- **Feopsingale** : pattern boss à résolution paisible — combat = **échec narratif** (cf. Ceapeecu)
- **Chasse coordonnée en couple** : pattern IA canonique pour créatures Couple — à généraliser

---

*Liens : [[Bestiary/Index|← Index Bestiaire]] · [[Loup forestier]] · [[Faucon]] · [[Combat]] · [[Sources de Ressources]] · [[Les Ères]]*
