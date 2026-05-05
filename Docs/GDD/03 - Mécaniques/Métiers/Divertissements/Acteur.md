---
tags: [métier, archétype, divertissements, verbe, présence]
type: archetype
category: Métier
catégorie_métier: Divertissements
stat_principale: Verbe
stats_secondaires: [Présence, Vivacité, Mémoire]
craft_category: "-"
sources_ressources_accessibles: [Tissu, Cuir tanné, Pigment, Bois, Métal léger]
stations_principales: [Théâtre, Tréteaux foraine, Place rituelle, Préau de fête, Cour royale, Atelier de costumes]
outils_principaux: [Masques, Costumes, Maquillages, Manuscrit, Bâton de scène, Praticables]
paliers_maîtrise: [Novice, Initié, Adepte, Expert, Maître]
métiers_complémentaires: [Barde, Musicien, Jongleur, Tailleur, Sculpteur (masques), Prêtre]
era_modulation: true
status: drafted
last_review: 2026-05-01
needs_review_for: [propagande-politique-mécaniques, théâtre-rituel-religions]
---

# 🎭 Acteur — Archétype Métier

> *« Sur scène, je deviens un autre. Le public le voit, et pendant trois heures, lui aussi devient un autre. C'est cela, le théâtre : un pacte de transformation à plusieurs. »*
> — **Maîtresse Solange**, fondatrice du Théâtre des Trois Masques d'Astravia

---

## 1. Vue d'ensemble

L'**Acteur** est le métier de **performance narrative incarnée**. Il joue un rôle, devient un personnage, fait vivre une histoire devant un public. Hybelior valorise particulièrement le **théâtre rituel** (cérémonies religieuses jouées) et la **propagande politique** (théâtre de cour, satires, mises en scène d'allégeance).

Métier moins commun que [[Barde]] ou [[Musicien]] dans l'imaginaire MMO, mais **central** à Hybelior pour deux raisons :
1. Les **religions** d'Hybelior pratiquent le théâtre rituel (mystères, mystères de [[Foedus Animae]], passions de [[Rota Mundi]])
2. La **politique** d'Hybelior s'exprime souvent par mise en scène (théâtre de cour, masques de [[Larvatus]] dans les festivités)

> [!important] Frontières
> - **Acteur** : performance narrative **incarnée** (incarne un personnage). Stat : Verbe + Présence.
> - **[[Barde]]** : performance narrative **distanciée** (raconte). Stat : Verbe + Mémoire.
> - **[[Jongleur]]** : performance physique sans récit construit.
> - **[[Musicien]]** : performance sonore.
>
> Frontière souple : un Acteur Maître peut basculer en Barde sur le tard. Mais l'Acteur **incarne** ; le Barde **transmet**.

---

## 2. Stats brutes & Maîtrises associées

- **Stat principale** : **Verbe** — diction, déclamation, projection vocale, modulation des voix
- **Stats secondaires** :
  - **Présence** — incarnation, charme de scène, capacité à dominer la scène
  - **Vivacité** — gestuelle expressive, combats scéniques, mimes
  - **Mémoire** — texte par cœur (rôles longs : 500-2 000 répliques)
- **Maîtrise contextuelle** : `Maîtrise_Théâtre` — progresse à chaque rôle joué publiquement. Sous-spécialités à partir d'Adepte : Théâtre rituel / Théâtre de cour / Comédie / Tragédie / Mime / Théâtre de propagande.

→ Référence Couche 1 [[Personnage]] §Stats brutes. Maîtrise contextuelle [[Personnage]] §Couche 2.

---

## 3. Sources de ressources

**Consomme** :
- **[[Tissu]]** — costumes ([[Tisserand]] / [[Tailleur]])
- **[[Cuir tanné]]** — sangles, ceintures, masques de cuir
- **[[Pigment]]** — maquillages, costumes colorés (cf. [[Peintre]])
- **[[Bois]]** — masques sculptés ([[Sculpteur]])
- **Métal léger** — accessoires d'armes scéniques ([[Forgeron]] de précision)
- **[[Parchemin]]**, **Encre** — manuscrits de pièces (collaboration [[Scribe]])

**Produit** (output performatif) :
- **Représentations** — pièces jouées, public, [[Reconnaissance]]
- **Rôles signature** — palier Adepte+, rôles iconiques associés à l'acteur
- **Pièces composées** — palier Expert+ (auteur-acteur)
- **Œuvres signées** — palier Maître, théâtre permanent (Héritage)
- **Influence politique** — théâtre de propagande, similar à [[Barde]] mais via mise en scène

→ Pas de craft direct (`craft_category: -`). Output performatif.

---

## 4. Stations + outils

| Station | Rôle | Palier requis |
|---------|------|---------------|
| **Tréteaux foraine** | Théâtre populaire mobile (foires, festivals) | Novice |
| **Préau de fête** | Représentations en plein air | Initié |
| **Place rituelle** | Théâtre rituel (cérémonies religieuses) | Initié |
| **Théâtre** | Salle dédiée, scène construite | Adepte |
| **Atelier de costumes** | Confection / réparation des costumes et masques | Initié |
| **Cour royale** | Théâtre de cour, propagande politique | Expert |

**Outils signature** :
- **Masques** — théâtre rituel et théâtre des [[Larvatus]] (sculpteur ou tailleur de cuir)
- **Costumes** — coûteux, variant par rôle
- **Maquillages** — préparations alchimiques mineures (cross-réf [[Apothicaire]] pour pigments fixateurs)
- **Manuscrit** — texte par cœur, support de répétition
- **Bâton de scène** — accessoire symbolique (palier Adepte+)
- **Praticables** — éléments de décor (palier Expert+)

---

## 5. Paliers de Maîtrise

| Palier | Capacités débloquées |
|--------|----------------------|
| **Novice** | Petits rôles (figurants parlants), comédies courtes, théâtre rituel basique |
| **Initié** | Rôles secondaires, comédies en troupe, premier rôle dans une pièce mineure |
| **Adepte** | Rôle principal, théâtre rituel avancé, sous-spécialité déclarable, premier rôle iconique |
| **Expert** | Auteur-acteur (pièce écrite par lui-même), théâtre de cour, propagande politique |
| **Maître** | **Condition cachée 🔒** — Pièce signée (Héritage), troupe nationale fondée, capacité de **« faire tomber un seigneur »** par une satire (Acte signé) |

> Décroissance : voir [[Armes et Maîtrise]] §Décroissance. Sans pratique régulière, la voix perd sa puissance et la mémoire des rôles s'efface (rouille -15%).

---

## 6. Activités débloquées

| Palier | Exemples (3-5) |
|--------|----------------|
| **Novice** | Jouer un figurant · Mime simple · Comédie courte (10 min) |
| **Initié** | Rôle secondaire · Théâtre rituel ([[Foedus Animae]] mariage) · Comédie en troupe |
| **Adepte** | Rôle principal · Tragédie en 5 actes · Mystère religieux |
| **Expert** | Auteur-acteur · Théâtre de cour · Satire d'un seigneur · Mise en scène complète |
| **Maître** | **Œuvre signée** : Pièce nommée d'après l'Acteur (Héritage), troupe légendaire, satire qui change le pouvoir |

→ Cross-réf : un Acteur Maître peut influencer la [[Reconnaissance]] et le **destin politique** d'un seigneur ou d'une faction.

---

## 7. Carrière et débouchés

- **Démarrage** : enfant de troupe, apprenti dans un théâtre urbain, ou novice religieux pratiquant le théâtre rituel
- **Progression** : tréteaux → théâtres permanents → cour royale
- **Établissement** :
  - **Acteur de troupe foraine** — itinérant, théâtre populaire
  - **Acteur de théâtre permanent** — engagement urbain stable
  - **Acteur rituel** — engagé par un temple, théâtre religieux ([[Foedus Animae]], [[Rota Mundi]], [[Somnium Vigil]])
  - **Acteur de cour** — engagement noble, propagande politique
  - **Auteur-Maître** — combine l'écriture et le jeu, palier Maître
- **Réseau** :
  - **Pair-troupe** : [[Barde]], [[Musicien]], [[Jongleur]]
  - **Pair-amont** : [[Tailleur]] (costumes), [[Sculpteur]] (masques de bois), [[Tanneur]] (masques de cuir), [[Peintre]] (décors, [[Pigment]] de maquillage), [[Scribe]] (manuscrits)
  - **Aval** : public, religions, cours nobles, factions politiques
- **Faction** : Théâtres reconnus (Astravia, Galenor), Confrérie des Acteurs, [[Foedus Animae]] (théâtre de pacte), [[Rota Mundi]] (théâtre cyclique des ères)

### Sous-spécialisations canoniques (Role.csv)

> Source canonique : `Role.csv` (cat 7 — Divertissements). Deux rôles canoniques se rattachent à l'Acteur (palier Maître+).

#### Sous-spécialisation Maître+ : Directeur de cirque

> Source canonique : `Role.csv` (cat 7, role n°29).

- **Description** : Acteur-Maître à la tête d'une **troupe foraine majeure** (cirque, théâtre itinérant) — recrute, dirige, monte les spectacles, négocie avec les autorités locales pour les autorisations.
- **Conditions** : palier Maître + ≥ 1 troupe permanente sous direction ≥ 5 membres + ≥ 1 tournée nationale réussie + Reconnaissance ≥ Adepte multi-cités + 🔒 condition cachée (avoir traversé un Souffle avec la troupe intacte OU monté un spectacle reconnu par une cour royale).
- **Notes** : équivalent canonique de l'**Acteur de troupe foraine** dans l'échelle d'évolution (§7), évolué en figure de chef. Frontière avec [[Marchand]] (logistique d'itinérance) et [[Jongleur]] / [[Musicien]] (membres de troupe).

#### Sous-spécialisation Maître+ : Maître des cérémonies

> Source canonique : `Role.csv` (cat 7, role n°30).

- **Description** : Acteur-Maître spécialisé dans l'**organisation et la conduite de cérémonies** — couronnements, mariages royaux, investitures religieuses, festivals d'État. Maîtrise du rite, du protocole et de la dramaturgie publique.
- **Conditions** : palier Maître + investiture par une cour royale OU un grand temple + ≥ 3 cérémonies majeures conduites avec succès + 🔒 condition cachée (avoir conduit une cérémonie post-[[Le Souffle|Souffle]] sous tension cosmique OU une investiture royale sans incident protocolaire).
- **Notes** : peut aussi se rattacher au **[[Barde]]-Maître** (versant chanté/oratoire) ou au **[[Prêtre]]-Maître** (versant rituel sacré). `[REFONTE-NEEDED — frontière Acteur/Barde/Prêtre : pluri-rôle Cérémonie possible.]`

---

## 8. Modulation par contexte

| Contexte | Effet |
|----------|-------|
| **Ère [[Les Ères|Verdoiement]] (Terranu)** | Festivals saisonniers x2, demande accrue |
| **Ère [[Les Ères|Ombre Longue]] (Noctis)** | Théâtre nocturne, masques de [[Larvatus]] valorisés, mystères [[Noctari]] |
| **Ère [[Les Ères|Brume Mortelle]]** | Théâtre de deuil, mystères d'épidémie, [[Foedus Animae]] valorisé |
| **Ère [[Les Ères|Vents]] (Aerion)** | Théâtre itinérant +20%, troupes voyageuses avantagées |
| **Ère [[Les Ères|Échos Brisés]]** | Théâtre métaphysique (passé/présent), mystères de [[Tempora]] |
| **Post-[[Le Souffle]] semaine 1** | Demande x3 (la communauté a besoin de mettre en scène ce qui vient d'arriver) |
| **[[L'Accord]] ≥ 75%** | Pièce d'ère débloquée |
| **[[L'Accord]] = 100%** | Œuvre signée : Pièce permanente d'ère (Héritage, [[L'Accord]] §Héritage) |
| **Religion (toute)** | Théâtre rituel propre à chaque culte, accès à des fonds religieux |
| **Cour noble** | Propagande politique, paie haute mais Reconnaissance neutre érodée |
| **Faction politique** | Engagement de propagande, tension éthique |

---

## 9. Économie

**Gold sinks générés** :
- Costumes ([[Tailleur]]) : 200-5 000 Éclats / set
- Masques ([[Sculpteur]] / [[Tanneur]]) : 100-2 000 Éclats / pièce
- Maquillages ([[Apothicaire]] / [[Peintre]]) : 50-300 Éclats / lot
- Loyer théâtre (si propriétaire) : 1 000-10 000 Éclats / mois
- Manuscrits ([[Scribe]]) : 100-500 Éclats / pièce

**Prix indicatifs** :
- Représentation foraine : 5-50 Éclats / soirée (pourboires + cachet)
- Théâtre permanent : 50-500 Éclats / soirée
- Théâtre rituel (temple) : 100-1 000 Éclats / cérémonie
- Cour royale : 1 000-20 000 Éclats / saison
- Pièce de propagande sur commande : 5 000-50 000 Éclats
- Œuvre signée Maître : Héritage social, redevances copies

**Chaîne économique** :
```
[[Tailleur]] / [[Sculpteur]] / [[Peintre]] / [[Scribe]] (matériel) → Acteur (Performance incarnée)
                                                                  ↘ Public (cachet, Reconnaissance)
                                                                  ↘ Temple (théâtre rituel)
                                                                  ↘ Cour noble (propagande)
                                                                  ↘ Faction politique (influence)
                                                                  ↘ Œuvre signée (Héritage mondial)
```

---

## 10. Comportement IA / signatures PNJ

> *Modèle IA pas tranché — voir [[Concepts Fondamentaux IA PNJ]]. Indication gameplay seul.*

**Cycle quotidien typique** :
- 09:00 lever — exercices vocaux, étirements
- 10:00-13:00 — répétition de la pièce en cours
- 13:00-14:00 — repas avec la troupe
- 14:00-17:00 — étude des rôles, mémorisation
- 17:00-19:00 — préparation (costume, maquillage)
- 19:00-23:00 — représentation
- 23:00-01:00 — débrief, échanges avec metteur en scène et confrères

**Signatures de PNJ archétypaux** :
- **L'acteur de tréteaux** — costume rapiécé, voix puissante, animaux du public connus de lui
- **La tragédienne de cour** — habit somptueux, port hiératique, sait pleurer sur commande
- **L'acteur rituel** — masque permanent ou maquillage cérémoniel, lié à un temple
- **Le bouffon-acteur de cour** — frontière avec [[Jongleur]], sait dire les vérités déguisées en bouffonneries
- **Le maître de troupe** — gère la compagnie, choisit les pièces, négocie les contrats

**PNJ célèbres dans le monde** *(à étoffer Phase 4)* :
- *Maîtresse Solange, fondatrice du Théâtre des Trois Masques d'Astravia* (cf. citation d'ouverture)
- *Maître Velbric le Sept-Visages* — virtuose du masque, joué dans 4 royaumes
- *Sœur Aelys de [[Foedus Animae]]* — actrice rituelle des Mystères du Pacte

---

*Liens : [[Métiers]] · [[Personnage]] · [[Crafts]] · [[Économie]] · [[Armes et Maîtrise]] · [[L'Accord]] · [[Le Souffle]] · [[Les Ères]] · [[Reconnaissance]] · [[Barde]] · [[Musicien]] · [[Jongleur]] · [[Tailleur]] · [[Sculpteur]] · [[Peintre]] · [[Scribe]]*
