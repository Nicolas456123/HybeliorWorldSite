---
tags: [métier, archétype, érudition, mémoire, acuité]
type: archetype
category: Métier
catégorie_métier: Erudition
stat_principale: Mémoire
stats_secondaires: [Acuité, Verbe, Esprit]
craft_category: 8 — Scriptorium et enchantement
sources_ressources_accessibles: [Parchemin, Encre, Pigment, Cuir tanné, Tome, Cristal de Voie]
stations_principales: [Salle d'archives, Pupitre de scribe, Atelier de reliure, Cabinet d'étude, Catacombes-bibliothèques]
outils_principaux: [Loupe, Index codé, Plume, Encrier, Pinces de manuscrit, Lampe à huile filtrée]
paliers_maîtrise: [Novice, Initié, Adepte, Expert, Maître]
métiers_complémentaires: [Historien, Scribe, Astronome, Chercheur, Calligraphe, Relieur]
era_modulation: true
status: drafted
last_review: 2026-05-01
needs_review_for: [grimoires-cachés-loot-tables]
---

# 📚 Bibliothécaire — Archétype Métier

> [!info] Entités tutélaires canoniques
> **[[Cosmologie|Arcana]]** (Céleste — *Archiviste des arcanes*), **[[Cosmologie|Lingua]]** (Céleste — *Erudit légendaire des dialectes*), **[[Cosmologie|Legatus]]** (Céleste — *Collectionneur des légendes*). Voir [[Cosmologie]] §"Liste canonique des entités cosmiques". Source : `AccessExport/Legende.csv` (D-COSMO-LEGENDE-CSV-INTEGRATION).

> *« Un livre lu une fois est une connaissance. Un livre archivé pour cent ans est une civilisation. »*
> — **Vénérable Othalys**, conservatrice des Catacombes-Bibliothèques de Mosrack

---

## 1. Vue d'ensemble

Le **Bibliothécaire** est le **gardien du savoir consigné** d'Hybelior. Il classe, conserve, indexe et restaure les [[Tome|tomes]], [[Parchemin|parchemins]], grimoires et almanachs. C'est aussi celui qui **retrouve** ce que les autres ont perdu : un fragment de calendrier de l'**Ère des Trois Royaumes**, une formule alchimique enfouie sous trois couches de palimpseste, le nom oublié d'une entité [[Astrale]].

Il n'écrit pas (c'est le [[Scribe]]), ne raconte pas (c'est le [[Barde]]), ne déchiffre pas le passé événementiel (c'est l'[[Historien]]) : il **organise** et **transmet**. Métier sédentaire, méditatif, profondément lié à la **Mémoire** comme stat dominante.

> [!important] Frontières
> - **Bibliothécaire** : conservation, indexation, transmission. Connaît *où* trouver *quoi*.
> - **[[Historien]]** : recherche, narration, interprétation des événements passés.
> - **[[Scribe]]** : copie, transcription, calligraphie de production.
> - **[[Chercheur]]** : découverte de nouvelles formules/recettes (vers le futur, pas vers le passé).
>
> Frontière souple : un grand bibliothécaire devient souvent historien sur le tard.

---

## 2. Stats brutes & Maîtrises associées

- **Stat principale** : **Mémoire** — encyclopédisme, recoupement, identification des écritures, pharmacopée des grimoires
- **Stats secondaires** :
  - **Acuité** — lire les textes effacés, distinguer les variantes graphologiques, repérer les faux
  - **Verbe** — transmettre, conseiller un chercheur, négocier l'accès à une archive privée
  - **Esprit** — pour les grimoires magiques (lecture sécurisée, manipulation des [[Cristal de Voie|cristaux de Voie]] insérés)
- **Maîtrise contextuelle** : `Maîtrise_Bibliothèque` — progresse à chaque manuscrit identifié, indexé, restauré. Sous-spécialités à partir d'Adepte : Codicologie / Paléographie / Conservation / Grimoires magiques / Cartothèque.

→ Référence Couche 1 [[Personnage]] §Stats brutes. Maîtrise contextuelle [[Personnage]] §Couche 2.

---

## 3. Sources de ressources

**Consomme** :
- **[[Parchemin]]**, **Encre**, **[[Pigment]]** (pour copies et restaurations)
- **[[Cuir tanné]]** (reliures) — du [[Tanneur]]
- **Cire raffinée** (sceaux) — de l'[[Apiculteur]]
- **[[Cristal de Voie]]** (rare) — pour grimoires sécurisés (palier Expert+)

**Produit / fournit** :
- **Indices et catalogues** — bien produit principal : un bibliothécaire vend la *trouvaille*, pas le livre
- **Restaurations** — services payants
- **Almanachs publics** — compilations annuelles (cf. [[Astronome]], [[Prédiction]])
- **Compilations thématiques** — œuvres de référence (Héritage palier Maître)
- **Accès** — les guildes payent pour l'accès privilégié à certaines sections

→ Référence [[Crafts]] §8 — Scriptorium et enchantement (output documentaire et accès informationnel).

---

## 4. Stations + outils

| Station | Rôle | Palier requis |
|---------|------|---------------|
| **Salle d'archives** | Conservation, classement | Novice |
| **Pupitre de scribe** | Notes, copies, indexation | Novice |
| **Atelier de reliure** | Restauration, reliure neuve | Initié |
| **Cabinet d'étude** | Lecture concentrée, recoupement | Adepte |
| **Catacombes-bibliothèques** | Archives profondes, grimoires interdits | Expert |
| **Bibliothèque d'Astravia** *(POI mondial)* | Plus vaste collection d'Hybelior | Maître |

**Outils signature** :
- **Loupe** — palier Initié
- **Index codé** — système d'indexation personnel, signature du bibliothécaire
- **Plume et encrier** — copie discrète d'extraits
- **Pinces de manuscrit** — manipulation sans contact direct
- **Lampe à huile filtrée** — éclairage sans abîmer les manuscrits anciens
- **Gants de lin** — palier Adepte+

→ Référence [[Crafts]] §Stations §Pupitre de scribe.

---

## 5. Paliers de Maîtrise

| Palier | Capacités débloquées |
|--------|----------------------|
| **Novice** | Indexer un fond simple, classer par auteur, identifier les grandes catégories de manuscrits |
| **Initié** | Restauration légère, indexation fine, identification des écritures courantes |
| **Adepte** | Paléographie de l'**Ère des Trois Royaumes**, ouverture d'un grimoire scellé simple, sous-spécialité déclarable |
| **Expert** | Restauration complexe (palimpsestes), accès aux grimoires magiques, recoupement multi-archives |
| **Maître** | **Condition cachée 🔒** — Compilation signée (Œuvre signée, Héritage), accès aux archives interdites de la Bibliothèque d'Astravia, capacité de retrouver un texte « perdu » |

> Décroissance : voir [[Armes et Maîtrise]] §Décroissance. Un bibliothécaire sans contact avec le fond perd ses repères codicologiques (rouille -15%).

---

## 6. Activités débloquées

| Palier | Exemples (3-5) |
|--------|----------------|
| **Novice** | Indexer un nouveau lot · Identifier une langue · Classer par siècle |
| **Initié** | Restaurer une reliure · Cataloguer un grimoire mineur · Retrouver une référence à la demande |
| **Adepte** | Lire un texte palimpseste · Identifier un faux grossier · Compiler une bibliographie thématique |
| **Expert** | Restaurer un manuscrit en péril · Ouvrir un grimoire scellé magiquement · Conseil à un cabinet de [[Prédiction]] |
| **Maître** | **Œuvre signée** : compilation thématique d'ère (Héritage permanent), accès aux archives interdites, redécouverte d'un texte perdu |

→ Cross-réf : les manuscrits anciens débloquent des conditions cachées 🔒 d'[[L'Accord]] et de [[Prédiction]] (« Décoder un manuscrit ancien »).

---

## 7. Carrière et débouchés

- **Démarrage** : apprenti-classeur dans une bibliothèque urbaine, école d'Astravia, scriptorium monastique
- **Progression** : bibliothécaire d'une guilde savante → conservateur d'un fond local → archiviste d'État
- **Établissement** :
  - **Bibliothécaire de cour** — gère les archives royales
  - **Bibliothécaire de cabinet** — collabore avec [[Astronome]], [[Oracle]], [[Historien]] (cf. [[Prédiction]] §Tradition religieuse)
  - **Conservateur des Catacombes-Bibliothèques** — accès aux fonds interdits, faction sensible
  - **Bibliothécaire itinérant** — traque les fonds privés, achète, négocie
- **Réseau** :
  - **Pair-amont** : [[Scribe]] (copie), [[Calligraphe]], [[Relieur]] (reliure neuve)
  - **Pair-recherche** : [[Historien]], [[Chercheur]], [[Astronome]], [[Cartographe]]
  - **Aval** : guildes, factions, joueurs en quête d'information
- **Faction** : Bibliothèque d'Astravia (autorité centrale), confréries de conservateurs, [[Ordo Caelum]] (archives religieuses contestées)

### Sous-spécialisations canoniques (Role.csv)

> Source canonique : `Role.csv` (cat 6 — Erudition). Trois rôles canoniques se rattachent au Bibliothécaire (palier Maître+).

#### Sous-spécialisation Maître+ : Conservateur de bibliothèque

> Source canonique : `Role.csv` (cat 6, role n°26).

- **Description** : titre canonique du palier 5 — Bibliothécaire reconnu, responsable d'un fond majeur (bibliothèque de cour, scriptorium monastique, fond des Catacombes-Bibliothèques). Décide des acquisitions, des fonds interdits, de l'accès des chercheurs.
- **Conditions** : palier Maître + ≥ 1 fond majeur sous responsabilité + ≥ 1 acquisition signée d'œuvre rare + Reconnaissance ≥ Adepte + 🔒 condition cachée (avoir préservé un fond durant un Souffle OU déchiffré un grimoire jugé incompréhensible par les pairs).
- **Notes** : équivalent canonique du **Conservateur des Catacombes-Bibliothèques** dans l'échelle d'évolution (§7).

#### Sous-spécialisation Maître+ : Maître des archives

> Source canonique : `Role.csv` (cat 6, role n°25).

- **Description** : Bibliothécaire-Maître orienté **archives administratives** plutôt que littéraires — gère les registres royaux, actes notariés, traités, recensements. Frontière forte avec [[Scribe]] et [[Juge]] (Gardien des lois).
- **Conditions** : palier Maître + investiture par l'autorité civile (souverain, cité, guilde) + ≥ 1 fond d'archive consolidé + 🔒 condition cachée (avoir reconstitué un acte perdu jugé crucial OU avoir tenu les archives durant ≥ 2 [[Le Souffle|Souffles]]).
- **Notes** : peut être pluri-rôle avec [[Scribe]]-Maître (à confirmer en Phase Lore Politique).

#### Sous-spécialisation Maître+ : Sage

> Source canonique : `Role.csv` (cat 6, role n°24).

- **Description** : Bibliothécaire-Maître **généraliste** reconnu pour son érudition — consulté par les souverains, les Conclaves, les chercheurs. Le titre "Sage" peut aussi viser un [[Historien]]-Maître ou un [[Conseiller]]-Sage du conseil des anciens (cumul fréquent).
- **Conditions** : palier Maître + ≥ 1 traité ou compilation signé + Reconnaissance ≥ Expert + 🔒 condition cachée (avoir résolu une énigme de lore d'envergure nationale OU être consulté par ≥ 2 souverains durant une seule ère).
- **Notes** : `[REFONTE-NEEDED — frontière Erudition (Bibliothécaire/Historien) / Gouvernance (Sage du conseil des anciens). Le rôle « Sage » peut être pluri-attaché — voir [[Conseiller]] §Sous-spé Sage du conseil des anciens et [[Historien]] §Sous-spé.]`

---

## 8. Modulation par contexte

| Contexte | Effet |
|----------|-------|
| **Ère [[Les Ères|Ombre Longue]] (Noctis)** | Manuscrits cachés réapparaissent (encres révélatrices), grimoires de [[Noctari]] +20% lisibilité |
| **Ère [[Les Ères|des Présages]]** | Demande de compilation prédictive x3, almanachs collectifs |
| **Ère [[Les Ères|Brume Mortelle]]** | Conservation difficile (humidité), restauration sur-sollicitée |
| **Ère [[Les Ères|Vents]] (Aerion)** | Risque de dispersion (fenêtres), bibliothèques mobiles avantagées |
| **Post-[[Le Souffle]] semaine 1** | Recalibrage des indexations (certains textes deviennent illisibles, d'autres ré-émergent) |
| **[[L'Accord]] ≥ 75%** | Accès à une section restreinte de la Bibliothèque d'Astravia |
| **[[L'Accord]] = 100%** | Œuvre signée : compilation d'ère (Héritage, [[L'Accord]] §Héritage) |
| **Religion [[Ordo Caelum]]** | Accès aux archives stellaires (contestées) |
| **Religion [[Foedus Animae]]** | Pactes archivés, mémoire des serments |
| **Faction guilde mage** | Accès aux grimoires de Voie |

---

## 9. Économie

**Gold sinks générés** :
- Loyer salle d'archives : 300-1 500 Éclats / mois (climat contrôlé)
- Restauration ([[Tanneur]] cuir, [[Apiculteur]] cire) : 50-500 Éclats / lot
- Lentilles loupe ([[Verrier]]) : 100-500 Éclats
- Cotisation Bibliothèque d'Astravia : 500 Éclats / ère

**Prix indicatifs** :
- Consultation référence : 5-20 Éclats
- Recherche thématique : 50-200 Éclats
- Restauration d'un manuscrit : 100-2 000 Éclats selon état
- Compilation sur commande : 500-5 000 Éclats
- Œuvre signée Maître : 50 000+ Éclats ou Héritage social

**Chaîne économique** :
```
[[Scribe]] / [[Calligraphe]] / [[Relieur]] (production) → Bibliothécaire (conservation, indexation, accès)
                                                        ↘ [[Historien]] / [[Chercheur]] / [[Astronome]] (consultations)
                                                        ↘ Guildes / Factions (accès payant)
                                                        ↘ Joueurs (recherche d'info)
```

---

## 10. Comportement IA / signatures PNJ

> *Modèle IA pas tranché — voir [[Concepts Fondamentaux IA PNJ]]. Indication gameplay seul.*

**Cycle quotidien typique** :
- 07:00 lever — vérification des conditions de conservation (humidité, lumière)
- 08:00-12:00 — indexation, classement, tri des nouveautés
- 12:00-13:00 — pause
- 13:00-17:00 — consultations, accueil des chercheurs, restaurations légères
- 17:00-19:00 — lecture personnelle, étude approfondie
- 19:00-21:00 — correspondance, courrier inter-bibliothèques

**Signatures de PNJ archétypaux** :
- **Le vieux conservateur** — silhouette voûtée, chuchote toujours, connaît chaque rayon
- **La bibliothécaire jeune et incisive** — réforme l'indexation, conflit avec les anciens
- **Le bibliothécaire-magicien** — gère les grimoires, [[Esprit]] haut, marqué par les lectures
- **Le bibliothécaire itinérant** — sac de cuir, traque les fonds privés à racheter

**PNJ célèbres dans le monde** *(à étoffer Phase 4)* :
- *Vénérable Othalys, conservatrice des Catacombes-Bibliothèques de Mosrack* (cf. citation d'ouverture)
- *Maître-Archiviste Dorvall d'Astravia* — gardien des archives interdites, 4 ères Concordées
- *La Sœur Lentille* — surnom donné aux bibliothécaires successives de l'Ordre des Lectrices

---

*Liens : [[Métiers]] · [[Personnage]] · [[Crafts]] · [[Sources de Ressources]] · [[Économie]] · [[Armes et Maîtrise]] · [[L'Accord]] · [[Le Souffle]] · [[Les Ères]] · [[Prédiction]] · [[Historien]] · [[Scribe]] · [[Chercheur]] · [[Astronome]] · [[Cartographe]] · [[Relieur]]*
