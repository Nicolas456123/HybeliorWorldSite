---
tags: [créature, archétype, bestiaire, quadrupède, forêt, taïga, mammifère, prédateur]
type: archetype
forme: Quadrupède
taille: Moyen
revêtement: [Poils, Fourrure]
sens: [Vision diurne, Vision nocturne, Audition fine, Odorat fin]
cognition: Apprenant
socialité: Meute
territorialité: Nomade
milieu: [Forêt, Taïga, Toundra, Plaine boisée, Montagne basse]
locomotion: [Marche, Course, Bond]
aire_influence: Régionale
reproduction: Vivipare
métamorphose: Aucune
durée_vie: Moyenne
trophicité: Carnivore
fonction_éco: Prédateur intermédiaire
pouvoirs: [Embuscade, Camouflage forêt, Hurlement de meute, Endurance de poursuite, Morsure tenace]
élément: "-"
résistances: [Physique léger, Froid mineur]
cr: 4
hp_base: 180
loot_table: [Cuir, Fourrure, Os, Crocs, Griffe, Cœur de creature, Œil, Sang, Graisse animale, Patte, Queue]
variants_cosmiques: [Shadow, Spectral, Frost, Verdoyant, Brulé, Pourpre, Doré, Brisé, Onirique, Vénérable]
status: drafted
last_review: 2026-05-01
needs_review_for: [cr-system-canonique, loot-rates-playtest, variants-équilibrage]
---

> [!note] Archive : ce fichier est conservé comme template paramétrique de référence.
> Voir [[Espèces/Mammifères/Canidés/_Description|Mammifères/Canidés]] pour les espèces concrètes décomposées de cet archétype.

# 🐺 Loup forestier — Archétype-référence

> Archétype canonique du **prédateur quadrupède social** d'Hybelior. Sert de pattern pour toutes les créatures de type *mammifère prédateur en meute* (loups, lycans, panthères de meute, hyènes spectrales, chiens d'Umbra, etc.). Premier archétype du sprint pilote bestiaire — il établit la **convention CR** et la **forme canonique** des fiches.
>
> Voir [[Bestiary/Index]] · [[Taxonomie des Créatures]] · [[Combat]] · [[Sources de Ressources]]

---

## 1. Vue d'ensemble

### Description sensorielle

Le Loup forestier d'Hybelior est un quadrupède robuste de 70 cm à 1 m au garrot, pelage gris-brun à blanc selon biome, oreilles dressées, yeux jaunes à ambre brillant en vision nocturne. Sa silhouette est lisible de loin pour le joueur — c'est un **étalon visuel** du danger sauvage. Il trotte avec économie, accélère en pointe sur 30-50 m, et ralentit pour les longues poursuites. Son hurlement porte sur **plusieurs kilomètres** et reste l'un des sons-signature du monde sauvage.

Son odeur est forte (sang séché, fourrure humide, glandes anales), perceptible par les joueurs avec Maîtrise *Pistage* palier 2+. Il marque son territoire par urine et griffades sur troncs.

### Place écologique et culturelle

Prédateur intermédiaire de la majorité des biomes tempérés-froids. Régule les populations de cerfs, sangliers, chevreuils. Sert lui-même de proie aux **prédateurs apex** (ours, grands fauves, dragons-bête, créatures cosmiques de haut CR) et aux chasseurs humains.

**Folklore** :
- *Skaldoria, Cestra* → loup = compagnon des morts, hurle pour Vael'Kurash
- *Onara (Clans de la Plaine)* → loup = âme libre, totem de Via Ventus
- *Galenor (Trinoria)* → loup = symbole d'embuscade et de patience, emblème militaire
- *Celethor (Fils de l'Hiver)* → loups géants vénérés comme demi-dieux du froid

**Importance gameplay** :
- **Première rencontre dangereuse** typique d'un joueur Initié-Adepte
- Sert de **mentor de combat de groupe** (parade le saut, gère deux fronts, lit les telegraphs)
- Pierre angulaire du **système de variants** (les 10 variants visuels y sont implémentés en premier — cf. [[Les Ères]])
- Loot accessible et utile (Cuir, Fourrure, Crocs) — premier cycle d'artisanat *Dépeçage → Tanneur → Forgeron/Tisserand*

---

## 2. Caractérisation sur les 9 axes V2

### Axe 1 — Morphologie & Physiologie

**Quadrupède** classique de taille **Moyenne** (1-1.5 m de long, 70-90 cm au garrot, 40-70 kg). Revêtement **Poils + Fourrure** (densité variable selon biome — fourrure épaisse en taïga, poil court en plaines tempérées). Sens : **Vision diurne** standard, **Vision nocturne** marquée (le loup est aussi efficace de nuit que de jour), **Audition fine** (perçoit pas étouffés à 50 m), **Odorat fin** (pistage à 1-3 km selon vent). Le frontmatter omet l'infrarouge — c'est un mammifère classique, pas un reptile.

### Axe 2 — Comportement & Cognition

**Apprenant** : Behavior Tree + mémoire courte. Le loup **se souvient du joueur** sur la session courante (heure RT) — il apprend à éviter une parade parfaite répétée, change d'angle, attaque par les flancs. **Socialité Meute** (3-7 individus typiquement, alpha + beta + omégas + jeunes), **Territorialité Nomade** (le territoire suit les troupeaux de proies), **Communication** : sons (hurlements, grognements, jappements), postures (queue, oreilles, échine), griffades + urine pour marquage. Pas de télépathie — la coordination de meute est strictement audio-posturale.

### Axe 3 — Habitat & Mobilité

Milieux principaux : **Forêt, Taïga, Toundra, Plaine boisée, Montagne basse**. Évite les zones **volcaniques, déserts de sable, océans profonds, planaires** (l'archétype standard ; les variants cosmiques modifient ça). **Locomotion : Marche, Course (12 m/s pointe), Bond (saut 4-5 m horizontal, 1.5 m vertical)**. **Aire d'influence Régionale** (territoire de 5-30 km² pour une meute, suivi des proies sur 50 km).

### Axe 4 — Cycle de vie & Reproduction

**Vivipare** classique (4-6 louveteaux par portée, 1 portée par an, gestation ~2 mois). **Pas de métamorphose** (le loup est ce qu'il est de la naissance à la mort, contrairement à un Insectoïde Larve→Adulte). **Durée de vie Moyenne** : 8-15 ans en milieu sauvage, jusqu'à 25 pour un alpha vénérable.

> [!note] Stade de jeu
> Le joueur rencontre **rarement** un louveteau hors quête narrative (ils restent au gîte). Les variantes de combat se déclinent par **âge** (juvénile / adulte / vétéran / colosse alpha) et non par **stade larvaire**.

### Axe 5 — Écologie & Régime alimentaire

**Carnivore** strict (cerfs, sangliers, lapins, oiseaux, charognes occasionnelles). **Méthode de chasse : Embuscade + Poursuite**. Le loup forestier alterne :
- **Embuscade** : tapi dans un buisson, attaque par surprise (déclenche bonus dégâts surprise)
- **Poursuite** : course longue, fatigue la proie (mécanique d'**Endurance de poursuite** — voir §5)

Pas de filtration, pas de pièges, pas d'absorption d'énergie. Archétype "honnête prédateur".

### Axe 6 — Rôle & Relations

**Prédateur intermédiaire** : régule les herbivores, est régulé par les apex. **Alliances opportunistes** uniquement (pas de pacte magique, pas de partenariat planaire pour l'archétype standard). **Menacé** par : ours, grands fauves, dragons-bête, chasseurs humains, hivers rudes, maladie. *Aucune* alliance avec les humanoïdes par défaut — la domestication (chien) est un **archétype distinct** (voir [[PNJ]] §Compagnons, à créer Phase 4).

### Axe 7 — Capacités & Affinités

**Pas d'élément** affilié pour l'archétype standard (`élément: -`). **Pouvoirs** physiques uniquement : Embuscade, Camouflage forêt (mimétique de couleur, pas magique), Hurlement de meute (effet de zone — ralliement + intimidation), Endurance de poursuite (régen Stamina supérieure en course), Morsure tenace (saignement). **Résistances** : Physique léger (cuir épais ~ 5% réduction physique), Froid mineur (fourrure dense — non négligeable seulement contre dégâts froids faibles). Vulnérable au feu, à la magie pure, aux dégâts perçants lourds.

> [!note] Variants cosmiques
> Les **10 variants** (§7) ajoutent un élément, des résistances et des pouvoirs additionnels au pattern standard. C'est la mécanique de réutilisation **1 modèle → 10 variants** posée par [[Les Ères]].

### Axe 8 — Statistiques de jeu

Voir §3 (table CR détaillée). HP base 180 (CR 4 adulte standard). Stamina propre à la créature (gère ses pouvoirs). Pas de Mana. Vitesse pointe ~12 m/s (35-40% plus rapide que joueur sprint).

### Axe 9 — Récompenses & Interactions

**Loot** : 11 ressources possibles (§6). **XP accordée** modulée par fenêtre [[L'Accord]] (voir §6). **Événements** déclenchables : *Quête de chasse* (réduire la meute autour d'un village), *Découverte du gîte* (ressources rares + louveteaux), *Rituel d'apprivoisement* (uniquement avec compagnon — Phase 4).

---

## 3. Stats de combat par CR (table chiffrée)

> [!important] Convention CR canonique adoptée pour Hybelior
> Après revue [[Personnage]] (stats brutes 0-150) et [[Combat]] (HP joueur ~150-400, dégâts joueur 8-200/coup), **on adopte une échelle CR Hybelior 1-30 alignée sur l'Accord et les paliers de Maîtrise** :
>
> | CR | Profil | Joueur cible (Maîtrise / Accord) |
> |----|--------|----------------------------------|
> | 1-3 | Trash mob, faune commune | Novice / Accord 0-25% |
> | 4-7 | Faune sérieuse, embuscade groupée | Initié / 25-50% |
> | 8-12 | Mini-boss, créatures rares | Adepte / 50-75% |
> | 13-18 | Boss régional, créatures cosmiques mineures | Expert / 75-100% |
> | 19-24 | Boss continental, prédateurs apex, élémentaires majeurs | Maître / 100% |
> | 25-30 | Boss mondial, événements d'ère, conditions cachées 🔒 | Maître + Héritage |
>
> Cette échelle est **canonique** pour le bestiaire Hybelior. Voir §10 pour discussion alternative D&D 1-30.

### Table de variantes par âge — Loup forestier

| Variante | CR | HP | Stamina | Vitesse | Dégâts coup canin | Comportement |
|----------|----|----|---------|---------|-------------------|--------------|
| **Louveteau** *(rare en combat — n'apparaît qu'au gîte)* | **1** | 40 | 60 | 7 m/s | 4-6 (perçant léger) | Fuit, jappe, alerte la meute |
| **Juvénile** | **2** | 90 | 110 | 9 m/s | 8-12 | Suit l'alpha, frappe en deuxième ligne |
| **Adulte** *(standard)* | **4** | 180 | 180 | 12 m/s | 18-26 | Pleinement opérationnel, embuscade + poursuite |
| **Vétéran** *(loup à cicatrices)* | **6** | 240 | 220 | 11 m/s | 24-34 | Plus tactique, anticipe esquive joueur |
| **Alpha de meute** | **8** | 340 | 280 | 13 m/s | 30-44 | Hurlement de meute, relance la meute, +20% dmg autres loups en zone 20 m |
| **Colosse Alpha** *(unique régional, signature)* | **12** | 520 | 360 | 13.5 m/s | 42-60 | Phase 2 à 50% HP, pouvoirs étendus |

> **Calibrage** : un Adulte CR 4 = ~180 HP face à un joueur Initié (~250 HP, ~20 dmg/coup léger). Joueur tue le loup en ~10 attaques légères ; loup tue joueur en ~12 morsures non-parées. **Combat lisible de 30-60 s**. Une **meute de 4 adultes** (= rencontre standard taïga) est une menace létale pour un joueur seul, défi gérable pour duo Initié.

> **Lecture des dégâts** :
> - "Dégâts coup canin" = morsure latérale standard, perçant + tranchant
> - Multiplier × 1.4 pour morsure cible immobile / au sol
> - Multiplier × 0.6 pour coup de patte / charge non-mordante

### Régen et endurance de la créature

| Stat | Hors combat | En combat |
|------|-------------|-----------|
| HP | +2 HP/s | 0 |
| Stamina | +30/s | +8/s |

Une fois Stamina à 0, le loup **passe en mode "boucle d'esquive"** (il fuit 5-10 s, régen, revient). Mécanique : oblige le joueur à **gérer le rythme** plutôt qu'à tanker indéfiniment.

---

## 4. Attaques canoniques

| Attaque | Type | Coût Stamina (loup) | Cooldown | Effet | Telegraph |
|---------|------|---------------------|----------|-------|-----------|
| **Morsure latérale** | Perçant + Tranchant | 8 | 1.0 s | Dégât base | Léger (0.3 s) — gueule s'ouvre |
| **Coup de patte** | Contondant + Tranchant léger | 6 | 1.5 s | Dégât 60% × base, peut renverser si Stamina joueur basse | Pivot du buste (0.4 s) |
| **Saut + morsure** | Perçant lourd | 25 | 6 s | Dégât × 1.4, force au sol si non-paré (stagger 1 s) | Recul 0.6 s + bond visible |
| **Morsure tenace** | Perçant + saignement | 30 | 12 s | Pose **Saignement** (5 dmg/s pendant 8 s, stack jusqu'à 3) — voir [[Combat]] | Mâchoire pleine (0.7 s) |
| **Hurlement de meute** *(alpha & vétéran uniquement)* | Sonore (utility) | 40 | 25 s | Ralliement zone 30 m : autres loups gagnent +20% dmg / +10% vitesse pendant 10 s ; intimidation cible joueur (−10% Stamina régen 5 s) | Tête levée (1.0 s) — **fenêtre de coup parfait** |
| **Charge de poursuite** *(activée si joueur fuit)* | Contondant | 50 (drain pendant) | 30 s | Sprint 18 m/s pendant 4 s, bond final +25% dmg | Posture basse (0.5 s) |

**Pattern d'attaque IA standard** : 2-3 morsures latérales → coup de patte → saut+morsure si ouverture → recul / régen → repositionnement. L'alpha **ouvre toujours par un Hurlement** s'il a 2+ loups vivants.

**Fenêtre de parade parfaite** : 0.20 s (standard joueur — voir [[Combat]]). Le saut+morsure et la morsure tenace ont des telegraphs **généreux** (0.6-0.7 s) pour récompenser la lecture.

---

## 5. Pouvoirs spécifiques du Loup forestier

| Pouvoir | Description | Activation |
|---------|-------------|------------|
| **Embuscade** | En forêt dense + immobile + hors-vue joueur, le loup applique un **coup d'ouverture × 1.5 dmg** (premier coup uniquement). Bonus annulé si joueur a Maîtrise *Pistage* palier 2+. | Passif conditionnel |
| **Camouflage forêt** | Réduit la portée de détection joueur de 30% en biome forestier. Mimétique de couleur (variant Verdoyant le pousse à 60%). | Passif (biome-conditionnel) |
| **Hurlement de meute** | Voir §4. Ralliement zone + intimidation. | Actif, alpha/vétéran |
| **Endurance de poursuite** | Régen Stamina ×2 pendant **Charge de poursuite**. Le loup ne fatigue *jamais* en poursuite linéaire — le joueur doit **changer de direction / sauter / utiliser un obstacle** pour le décrocher. | Passif conditionnel |
| **Morsure tenace** | Voir §4. Saignement. | Actif |
| **Vision nocturne** | Aucun malus de combat de nuit, contrairement au joueur (qui peut subir −10% détection sans torche / Voie de Lumos). | Passif |

---

## 6. Loot table — Récolte sur créature

> Voir [[Sources de Ressources]] §Récolte sur créature pour la liste canonique des 25 ressources. Drop rates tiers indicatifs, à valider en playtest.

| Ressource | Drop rate (Adulte CR 4) | Modificateur tier | Métier requis | Palier Maîtrise minimum |
|-----------|-------------------------|-------------------|---------------|-------------------------|
| **Cuir** | 100% (1-2 unités) | × 1.5 vétéran, × 2.5 alpha | Dépéceur | Novice (palier 1) |
| **Fourrure** | 90% (1-3 unités) | × 1.5 vétéran, × 3 alpha, **× 2 si biome froid** | Dépéceur | Novice |
| **Os** | 85% (2-4 unités) | × 1.5 vétéran, × 2 alpha | Dépéceur | Novice |
| **Crocs** *(Griffe-canin)* | 70% (1-4 crocs) | × 1.5 vétéran, × 3 alpha (crocs longs uniques) | Dépéceur | Initié (palier 2) |
| **Griffe** *(pattes)* | 60% (1-4 griffes) | × 1.5 vétéran, × 2 alpha | Dépéceur | Initié |
| **Cœur de creature** | 15% (1) — **30% alpha**, **60% colosse** | Tier alchimique +1 par âge | Dépéceur + Apothicaire | Adepte (palier 3) |
| **Œil** | 25% (2) | Tier alchimique +1 vétéran+ | Dépéceur | Initié |
| **Sang** | 80% (1-3 fioles si fiole équipée) | × 1.5 alpha (sang d'alpha = composant rare) | Dépéceur + Apothicaire | Novice |
| **Graisse animale** | 75% (1-2 unités) | × 2 alpha (forte couche) | Dépéceur | Novice |
| **Patte** | 40% (1-4 pattes) | Cuir spécial *Patte de Loup* (résistant) | Dépéceur | Initié |
| **Queue** | 30% (1) | Trophée + ressource *Queue de Loup* | Dépéceur | Novice |

> [!tip] XP Dépeçage
> Dépecer un loup adulte rapporte 8-15 pts de Maîtrise *Dépeçage*. Un alpha rapporte 25-40 pts (incite à chasser les gros). XP modulée par [[L'Accord]] (cf. fenêtre XP scaling — joueur trop haut Accord touche moins, joueur bas Accord touche plus).

> [!warning] CHANTIER
> Les drop rates exacts sont **estimations initiales**. À calibrer en playtest dans le sprint **équilibrage économique** (voir [[Architecture Data-Driven]] §Recipe Generator pour le pipeline complet *créature → loot → recette → item fini*).

---

## 7. Variants cosmiques (10 variants par ère)

> Pattern canonique : **1 modèle 3D + 10 shaders/effets/comportements**. Les variants apparaissent quand l'**ère cosmique** correspondante est active (voir [[Les Ères]]). Chaque variant ajoute : effet visuel, modificateur de stats, comportement modifié, élément, résistance/vulnérabilité, **éventuel loot exotique unique**.

| Variant | Entité | Visuel | Stats | Comportement | Loot exotique |
|---------|--------|--------|-------|--------------|---------------|
| **Shadow Wolf** | Noctis | Pelage noir + particules d'ombre, yeux pourpres | +20% Stamina, +15% vitesse, dmg +Ombre | Camouflage **permanent** (pas seulement forêt), embuscade prioritaire, fuit la lumière forte (Voie d'Eldoria/Lumos) | **Essence spirituelle d'ombre** (5%), **Crocs d'ombre** |
| **Spectral Wolf** | Tempora | Translucide, échos visuels, traîne flou | −30% HP, **immunité physique partielle** (50% dmg subis), peut **disparaître 2 s puis réapparaître** | Apparition/disparition imprévisible, frappe puis fuite | **Essence spirituelle d'écho**, **Cristal de Tempora** (rare) |
| **Frost Wolf** | Climata / Aquor froid | Pelage bleu-blanc, givre, halo froid | +30% HP, **−30% vitesse**, dmg +Froid (peut **geler** 1 s sur saignement-stack 3) | Plus lent mais plus tank, hurlement gèle légèrement la zone | **Cuir givré**, **Cœur de glace** |
| **Verdoyant Wolf** | Spiritus + Terranu | Pelage vert mousse, lierres sur le dos, feuilles | **Régen** +5 HP/s en biome végétal, **agressivité réduite** hors forêt | Pacifié hors forêt (peut être traversé sans attaque si joueur n'attaque pas), apex en forêt verdoyante | **Sève de loup** (alchimie rare), **Fourrure mousseuse** |
| **Brulé Wolf** | Eldoria endormie / Voie de Feu | Pelage cendre, braises, halo chaud | +Feu sur morsure, **vulnérable au gel/eau** | Hurlement enflamme zone (DOT 3 dmg/s pendant 5 s) | **Cendres incandescentes**, **Crocs ardents** |
| **Pourpre Wolf** | Aetheron / Umbra brouillard | Pelage pourpre, brume violacée autour | Pose **Confusion** (10% chance par morsure) | Le hurlement **désoriente** (cible vise mal pendant 3 s) | **Brume de Umbra**, **Œil pourpre** |
| **Doré Wolf** | Celestia / Eldoria active | Pelage doré lumineux, halo chaleureux | **Pacifié par défaut** (n'attaque que si attaqué), HP +50% | **Compagnon possible** (Phase 4 — quête d'apprivoisement, [[L'Accord]] >75% Eldoria requis) | **Fourrure dorée** (cosmétique signé), **Larme de Doré** |
| **Brisé Wolf** | Tempora / Vortex | Pelage glitché, fragments visuels manquants | Téléportation courte (3 m, 5 s CD), dmg erratique (parfois ×0.5, parfois ×2) | Imprédictible, défie la lecture standard | **Fragment de Brisé** (rare, alchimie temporelle) |
| **Onirique Wolf** | Somnix | Pelage aux couleurs irréelles, sons amortis | **N'attaque que les rêveurs** (joueur ayant dormi en zone Somnix dans les 24h RT) | Apparaît seulement la nuit en zone onirique, fuit l'éveil | **Essence onirique**, **Crocs de songe** |
| **Vénérable Wolf** | Fatum / Spiritus ancien | Pelage gris-argent, marques runiques, vieux | **Lit les patterns joueur** (apprenant ×3, mémorise les esquives) | Devient plus fort au fur et à mesure du combat (+5% dmg toutes 30 s) | **Marque de Vénérable** (composant divinatoire), **Os ancien** |

> [!note] Pattern de distribution
> - **Variants standard** : 1-2 par ère active, biome-conditionnel
> - **Doré Wolf** : ne spawn QUE pendant Ère du Rêve Lumineux + Accord >50% sur Eldoria
> - **Onirique Wolf** : QUE pendant Ère du Sommeil Onirique + zone marquée
> - **Vénérable** : conditions cachées 🔒 — apparaît à un joueur qui a tué 100 loups
> - **Spectral & Brisé** : Ère des Échos Brisés
> - Les autres : selon ère dominante (cf. [[Les Ères]] §Variants actifs)

> [!warning] CHANTIER
> Le mapping `Variant ↔ Entité` reste à valider (voir [[Bestiary/Index]] §Décisions ouvertes). Les 8 mappings principaux sont stables, les 2 derniers (Onirique=Somnix, Vénérable=Fatum) sont **proposés** ici comme convention canonique.

---

## 8. Comportement IA

> ⚠️ Le **modèle d'IA global d'Hybelior n'est pas encore tranché** (voir [[Concepts Fondamentaux IA PNJ]] §1). On pose ici des **comportements descriptifs** qui se traduiront en BT ou Utility AI selon la décision finale.

### Routine de base (jour / nuit)

| Phase | Comportement |
|-------|--------------|
| **Aube** | Retour vers le gîte, repas léger des restes, sommeil court |
| **Matin** | Sommeil au gîte, alpha veille |
| **Après-midi** | Repos, marquage de territoire (un membre tour à tour) |
| **Crépuscule** | Réveil, hurlement de coordination, départ en chasse |
| **Nuit** | **Phase active** — chasse, embuscade, défense de territoire |
| **Avant l'aube** | Repas si chasse réussie, retour au gîte |

### Hiérarchie de meute

| Rang | Effectif | Rôle combat |
|------|----------|-------------|
| **Alpha** (1) | 1 | Initie le combat, hurlement, attaque la cible la plus dangereuse (joueur tank) |
| **Beta** (1) | 1 | Soutient l'alpha, attaque le flanc |
| **Adultes** | 2-4 | Encerclent, attaque mordante alternée |
| **Juvéniles** | 0-2 | Reste en arrière, frappe les blessés |

### Décisions de combat clés

- **Solitaire détecté** (loup seul vs joueur) : **fuite** si HP < 50% OU Stamina < 30%, sinon embuscade timide
- **Meute** : assaut groupé, encerclement systématique
- **Joueur en groupe** : la meute essaie de **séparer** les joueurs (un loup harasse, deux attaquent l'isolé)
- **Mort de l'alpha** : meute désorganisée 5 s, puis le beta promu prend le rôle (HP regain mineur, dmg +10%)
- **Joueur fuit** : poursuite (Charge de poursuite), 1 km maxi avant abandon, retour au territoire
- **Joueur grimpe / s'isole en hauteur** : aboiements + tournis 10 s puis désengagement

### Cycle jour/nuit & Ère

- **Jour standard** : moins agressif, fuit les humains armés
- **Nuit standard** : agressif sur son territoire
- **Ère de l'Ombre Longue** : **agressif jour ET nuit** (loups d'ombre en plein jour — voir [[Les Ères]] §Ombre Longue)
- **Ère du Rêve Lumineux** : pacifié, **fuit le combat** (Doré Wolf devient l'archétype dominant)
- **Ère du Verdoiement** : agressif uniquement si territoire menacé

> [!note] Branche [[NPC Behaviors/Index]]
> Le pattern canonique pour les créatures **Apprenantes en Meute** est posé ici. Les autres archétypes meute (panthères, hyènes, lycans) **héritent de ce pattern** et le spécialisent.

---

## 9. Exemples de signatures (PHASE 4 stub)

> Créatures uniques nommées rencontrables dans le monde — par grand pays/biome. Stub ; à enrichir Phase 4.

### Vargheist le Solitaire de la Forêt d'Ulinor
- **Localisation** : Forêt d'**Ulinor**, autour du Grand Canyon de l'Écho
- **CR** : 14 (Boss régional)
- **Variante** : Vétéran Vénérable Wolf, sans meute
- **Lore** : *« Vargheist a perdu sa meute pendant le dernier Souffle. Depuis, il erre, refuse l'Accord, se nourrit de chasseurs imprudents. Les Druides de l'Écho disent qu'il a entendu une voix dans le canyon — et qu'il revient pour qu'on le tue. »*
- **Bonus narratif** : Loot unique **Crocs de Vargheist** (dague légendaire signée), déclenche quête *Le Dernier Souffle du Solitaire* (résolution Vael'Kurash), Pelage cosmétique *Manteau de Vargheist*

### Le Sombre Pourchasseur de Cendara
- **Localisation** : pentes nord du **Mont Cendra** (île Cendara)
- **CR** : 18 (Boss continental)
- **Variante** : Colosse Alpha Brulé Wolf (paradoxe — un loup forgé dans la cendre)
- **Lore** : *« Né d'une éruption antique, le Pourchasseur a la fourrure faite de cendre vivante. Il chasse les mineurs qui osent monter trop haut. Les Forgerons du Feu lui laissent une offrande chaque pleine lune — un mouton. Il accepte. »*
- **Bonus narratif** : Loot **Cendres du Pourchasseur** (composant légendaire — alliage Feu+Os), drop unique **Cœur de Flamme canin**, débloque recette *Lame de Cendre Vivante* (palier Maître Forgeron uniquement)

### La Meute Dorée d'Eldhoryn (Galenor)
- **Localisation** : plaines centrales de **Galenor** (Pays libres de Kharazir), prairies dorées
- **CR** : 12 par individu, meute de 5 — **CR effectif 16**
- **Variante** : 5 Doré Wolves coordonnés
- **Lore** : *« Pendant les Ères du Rêve Lumineux, une meute dorée traverse les plaines. Personne ne sait où elle dort. Les enfants prétendent l'avoir vue boire l'eau d'une source qui n'existe plus. La toucher porte chance — l'attaquer porte malheur sur 7 ères. »*
- **Bonus narratif** : **Pas hostile par défaut**. Apprivoiser un membre = quête épique (Accord >75% Eldoria + offrande de Sève d'Or). Compagnon permanent dévot (Phase 4).

> [!warning] CHANTIER PHASE 4
> 2-3 signatures par grand pays/biome → **~30-40 loups signatures** au total. Liste à enrichir avec les autres agents bestiaire et les agents Pays/Lore.

---

## 10. Décisions ouvertes / chantiers de profondeur

### CR system canonique (proposition)

> [!important] Adoption proposée : **échelle Hybelior 1-30** alignée Maîtrise + Accord
>
> Voir §3 pour la table de référence. Justification :
>
> 1. **Lisibilité joueur** : 1-30 reste familier (échelle D&D), évite l'inflation 1-100
> 2. **Alignement avec progression** : palier de Maîtrise (1-5) × ~6 = 30, cohérent avec [[Personnage]]
> 3. **Pas de power creep** : l'[[L'Accord]] compresse les stats joueur, donc CR 30 reste atteignable mais exigeant
> 4. **Permet variantes par âge** dans un même archétype (Loup CR 1 louveteau → CR 12 colosse alpha)
> 5. **Variants cosmiques modifient le CR** (+1 à +4 selon le variant), pas le système
>
> **Alternative** : CR 1-50 aligné stat brute 0-150 (+1 CR tous les 3 pts de stat moyenne créature). **Rejeté** ici car cela rendrait Vargheist CR 28 et le Pourchasseur CR 35, et écraserait l'expérience Initié-Adepte.

### Listes complètes de variants à valider

- **Mapping Variant ↔ Entité cosmique** : 8 stables, 2 proposés (Onirique=Somnix, Vénérable=Fatum). Voir [[Bestiary/Index]] §Décisions ouvertes
- **Variants combinables** : un Frost Shadow Wolf est-il possible (super-rare, ère cardinaire) ? → Proposition : OUI, mais uniquement aux Ères Cardinales (cf. [[Les Ères]]), avec stats cumulées plafonnées à +50% du base
- **Variants par archétype** : tous les archétypes ont-ils 10 variants ? Probablement non (un Insectoïde Hivemind aura sans doute 5-6 variants pertinents). À cadrer.

### Notes pour les autres agents bestiaire

> Patterns posés par cet archétype, à **réutiliser** (ou **spécialiser** explicitement) par les autres archétypes :

| Pattern | Application autre archétype |
|---------|----------------------------|
| **Variantes par âge** (Louveteau → Colosse) | **Mammifères** oui ; **Insectoïdes** remplacer par Larve→Pupe→Adulte→Reine ; **Élémentaires** par Étincelle→Petit→Standard→Grand→Avatar |
| **Hurlement de meute** (utility, ralliement zone) | Adapter pour : ruche (Phéromone d'alarme), troupeau (Brame), reptiles (sifflement) |
| **Embuscade + Camouflage biome-conditionnel** | Tous prédateurs ; non-applicable aux Apex apparents (dragons) |
| **Endurance de poursuite** | Prédateurs poursuiveurs ; remplacer par *Patience d'embuscade* pour araignées/serpents |
| **10 variants cosmiques** | Adapter selon nature : un Élémentaire de Feu n'aura pas 10 variants pertinents (le Brulé est sa nature ; les autres sont des contre-natures intéressantes — voir [[Élémentaire de feu]] §7) |
| **Loot 11 ressources** | Mammifères → similaire ; Insectoïdes → remplacer Cuir/Fourrure par Carapace/Antenne ; Élémentaires → remplacer la quasi-totalité par Essence/Cristaux/Cendres |
| **Stats de combat par CR** | Pattern HP/Stamina/Vitesse/Dmg cohérent dans toute la base |
| **Comportement IA descriptif** (pas BT formel) | Tant que [[Concepts Fondamentaux IA PNJ]] §1 n'est pas tranché |

### Chantiers de profondeur

- **Apprivoisement / Compagnon** : Phase 4 — système distinct, branche sur [[PNJ]] §Compagnons (à créer)
- **Maladies de loup** (rage, parasites) : axe Symbiote/Parasite à développer, branche [[Sources de Ressources]] (sécrétions, organes)
- **Cycles de population** : meutes qui se reproduisent / décroissent selon Ère et actions joueurs (régulation par chasseurs PNJ)
- **Variants combinés Cardinal** : ère exceptionnelle qui croise 2 variants

---

*Liens : [[Bestiary/Index|← Index Bestiaire]] · [[Taxonomie des Créatures]] · [[Élémentaire de feu]] · [[Combat]] · [[Sources de Ressources]] · [[Les Ères]] · [[L'Accord]] · [[Personnage]] · [[Architecture Data-Driven]]*
