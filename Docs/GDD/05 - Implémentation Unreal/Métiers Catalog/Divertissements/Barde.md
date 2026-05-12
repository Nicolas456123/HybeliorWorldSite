---
tags: [métier, archétype, divertissements, verbe, mémoire]
type: archetype
category: Métier
catégorie_métier: Divertissements
stat_principale: Verbe
stats_secondaires: [Mémoire, Présence, Acuité]
craft_category: "-"
sources_ressources_accessibles: [Bois, Cuir tanné, Tissu, Métal, Parchemin, Encre]
stations_principales: [Place publique, Taverne, Préau de fête, Cabinet d'étude, Cour royale, Foyer ancestral]
outils_principaux: [Luth, Vièle, Recueil de chants, Plume, Encrier, Bâton de récitation]
paliers_maîtrise: [Novice, Initié, Adepte, Expert, Maître]
métiers_complémentaires: [Musicien, Acteur, Historien, Bibliothécaire, Enseignant, Tavernier]
era_modulation: true
status: drafted
last_review: 2026-05-01
needs_review_for: [calibrage-influence-Reconnaissance-épopées]
---

# 📜 Barde — Archétype Métier

> [!info] Entité tutélaire canonique
> **[[Cosmologie|Cantor]]** (Céleste — *Barde enchanteur*, expression de l'acte créateur primordial : musique comme force de création, résonance d'Eldoria et d'Arborius). Vénéré par le *Cantus Mundi*. Voir [[Cosmologie]] §"Liste canonique des entités cosmiques". Source : `AccessExport/Legende.csv` (D-COSMO-LEGENDE-CSV-INTEGRATION).

> *« Le héros est mort à la guerre. Mais tant que je chante son nom, il marche encore dans les tavernes. »*
> — **Vellan le Tisseur de Voix**, barde de la cour de Galenor

---

## 1. Vue d'ensemble

Le **Barde** est le métier de **transmission orale du [[Lore]]** d'Hybelior. Il chante les épopées, raconte les hauts faits, transmet les généalogies, conserve les chants des ères passées. C'est le **gardien populaire** de l'histoire — là où l'[[Historien]] écrit pour les bibliothèques, le Barde **chante** pour les tavernes, les places, les cours.

> [!important] Influence sur la Reconnaissance
> Cf. [[Métiers]] §Divertissements : *« Barde — récits et épopées, **influence la Reconnaissance** »*. Un Barde peut faire monter (ou descendre) la [[Reconnaissance]] et le [[Renom]] d'un joueur, d'une guilde, d'une faction par ses chants. C'est l'**influenceur médiéval** d'Hybelior — pouvoir social majeur.

> [!important] Frontière Barde / Musicien
> - **Barde (M4)** : transmission narrative + chant + [[Lore]]. **Mémoire haute** requise. Influence Reconnaissance.
> - **[[Musicien]] (M4)** : performance sonore pure. **Présence haute**. Buffs régen Labeur.
> - Un Barde est **presque toujours** musicien (instrument). Un Musicien n'est **pas** systématiquement barde.
> - Frontière nette : Barde = `Verbe + Mémoire`, Musicien = `Verbe + Présence`. Sous-spécialité (`Maîtrise_Bardique` vs `Maîtrise_Musique`).

---

## 2. Stats brutes & Maîtrises associées

- **Stat principale** : **Verbe** — narration, chant, projection vocale, charme oratoire
- **Stats secondaires** :
  - **Mémoire** — épopées (parfois plusieurs heures), généalogies, chants anciens
  - **Présence** — captiver une assemblée, statut social
  - **Acuité** — lecture du public, ajustements en temps réel
- **Maîtrise contextuelle** : `Maîtrise_Bardique` — progresse à chaque représentation publique, à chaque chant transmis, à chaque épopée mémorisée. Sous-spécialités à partir d'Adepte : Épopée / Généalogie / Conte / Satire / Chant rituel.

→ Référence Couche 1 [[Personnage]] §Stats brutes. Maîtrise contextuelle [[Personnage]] §Couche 2.

> [!tip] Couplage Maîtrise_Musique
> Un Barde a typiquement Maîtrise_Bardique + Maîtrise_Musique (un instrument). C'est le métier double par excellence.

---

## 3. Sources de ressources

**Consomme** :
- **[[Bois]]**, **[[Cuir tanné]]**, **Métal**, **[[Tissu]]** — instrument et costume
- **[[Parchemin]]**, **Encre** — pour consigner les chants (collaboration [[Scribe]] / [[Bibliothécaire]])

**Produit** (output performatif et patrimonial) :
- **Épopées chantées** — récits transmis à un public
- **Chants signés** — palier Adepte+, mélodies-récits propres
- **Recueils de chants** — palier Expert+, publication écrite (collaboration [[Scribe]])
- **Influence sur la [[Reconnaissance]]** d'individus, guildes, factions
- **Œuvres signées** — Héritage palier Maître (épopées qui survivent au Souffle)

→ Pas de craft direct (`craft_category: -`). Output performatif et patrimonial.

---

## 4. Stations + outils

| Station | Rôle | Palier requis |
|---------|------|---------------|
| **Place publique** | Récit ouvert, pourboires | Novice |
| **Taverne** | Engagement régulier, public assis (cœur du métier) | Novice |
| **Préau de fête** | Festival, foule | Initié |
| **Cabinet d'étude** | Mémorisation, composition (étude de [[Lore]]) | Initié |
| **Cour royale** | Récits commandés, propagande noble | Expert |
| **Foyer ancestral** *(POI)* | Lieu de mémoire, transmission rituelle | Maître |

**Outils signature** :
- **Luth** ou **Vièle** — instrument quasi-obligatoire (cross-réf [[Musicien]])
- **Recueil de chants** — palier Adepte+ (collaboration [[Scribe]])
- **Plume et encrier** — pour consigner les chants nouveaux
- **Bâton de récitation** — symbole d'autorité narrative (Maître+)

---

## 5. Paliers de Maîtrise

| Palier | Capacités débloquées |
|--------|----------------------|
| **Novice** | Chants courants, généalogies locales, conte simple. Influence Reconnaissance locale ±5 |
| **Initié** | Épopée courte (15 min), chant signé débutant. Influence Reconnaissance régionale ±10 |
| **Adepte** | Épopée longue (1h+), satire, chant rituel, sous-spécialité déclarable. Influence Reconnaissance ±20 |
| **Expert** | Recueil de chants publié, animation de festival majeur, propagande politique. Influence ±30 |
| **Maître** | **Condition cachée 🔒** — Œuvre signée (épopée permanente, Héritage), inscription dans les chroniques mondiales (cf. [[Prédiction]] §Postérité), capacité de **« créer un héros »** par ses chants |

> Décroissance : voir [[Armes et Maîtrise]] §Décroissance. Sans pratique régulière, la mémoire des chants s'efface (rouille -15% — particulièrement dur pour le Barde).

---

## 6. Activités débloquées

| Palier | Exemples (3-5) |
|--------|----------------|
| **Novice** | Chanter 5 chants courants · Conter une légende locale · Réciter une généalogie |
| **Initié** | Épopée courte · Chant signé débutant · Influence légère sur la Reconnaissance d'un PNJ |
| **Adepte** | Épopée longue · Satire d'un seigneur · Chant rituel ([[Foedus Animae]], [[Rota Mundi]]) |
| **Expert** | Recueil publié · Festival majeur · Propagande politique pour un noble |
| **Maître** | **Œuvre signée** : Épopée nommée d'après le Barde (Héritage permanent), création d'un « héros chanté » (PNJ historique inscrit) |

→ Cross-réf : un Barde Maître peut transformer un acte de joueur en **mythe local** — les exploits qui passent dans ses chants survivent au [[Le Souffle|Souffle]].

---

## 7. Carrière et débouchés

- **Démarrage** : apprenti dans une troupe, étudiant d'un Maître Barde, ou autodidacte des tavernes
- **Progression** : tavernes → cours nobles → légende
- **Établissement** :
  - **Barde de cour** — engagé par un noble, propagandiste officiel
  - **Barde itinérant** — vit de tavernes, recueille les histoires en route
  - **Barde de guilde** — chronique les exploits d'une guilde
  - **Barde-Historien** — double Maîtrise, transmet par le chant ce que l'Historien écrit
  - **Maître-Bardique du Foyer** *(rare)* — gardien d'un foyer ancestral, transmission rituelle
- **Réseau** :
  - **Pair-troupe** : [[Musicien]] (instrumentation), [[Acteur]], [[Jongleur]]
  - **Pair-amont** : [[Historien]] (sources), [[Bibliothécaire]] (recueils anciens), [[Scribe]] (transcription)
  - **Aval** : [[Tavernier]], [[Aubergiste]], cours nobles, guildes, public général
  - **Pair-influence** : un Barde et un [[Marchand]] forment un duo classique pour propager une rumeur ou une renommée
- **Faction** : Confrérie des Bardes, [[Foedus Animae]] (chants de pacte), [[Rota Mundi]] (chants cycliques), [[Cantus Mundi]] (mineure, musique cosmique)

### Sous-spécialisations canoniques (Role.csv)

> Source canonique : `Role.csv` (cat 7 — Divertissements). Ce rôle correspond à un **palier Maître+** absorbé du legacy AccessExport.

#### Sous-spécialisation Maître+ : Ménestrel renommé

> Source canonique : `Role.csv` (cat 7, role n°31).

- **Description** : Barde-Maître reconnu d'envergure nationale ou inter-nations — chants attribués nominativement, présence en cours royale, capacité à influencer la Reconnaissance régionale par sa propagande chantée.
- **Conditions** : palier Maître + ≥ 1 chant attribué nominativement (Œuvre signée bardique) + Reconnaissance ≥ Expert + ≥ 1 cour royale fréquentée régulièrement + 🔒 condition cachée (avoir composé un chant qui survit à un [[Le Souffle|Souffle]] OU être invité par 2 cours rivales sans diffamation croisée).
- **Notes** : équivalent canonique du **Barde de cour** + **Maître-Bardique du Foyer** dans l'échelle d'évolution (§7). Pivot d'influence sur la Reconnaissance et la propagande politique — un Ménestrel renommé peut faire ou défaire la réputation d'un héros ou d'un noble.

---

## 8. Modulation par contexte

| Contexte | Effet |
|----------|-------|
| **Ère [[Les Ères|Verdoiement]] (Terranu)** | Festivals abondants, demande x2 |
| **Ère [[Les Ères|Ombre Longue]] (Noctis)** | Chants nocturnes, satires, épopées sombres valorisées |
| **Ère [[Les Ères|Vents]] (Aerion)** | Bardes itinérants avantagés, chants de voyage |
| **Ère [[Les Ères|Brume Mortelle]]** | Chants de deuil, élégies, Reconnaissance amplifiée pour les chants de réconfort |
| **Post-[[Le Souffle]] semaine 1** | Demande x4 (la communauté a besoin de raconter ce qui vient de se passer). Chants de Souffle = condition cachée 🔒 |
| **[[L'Accord]] ≥ 75%** | Épopée d'ère débloquée |
| **[[L'Accord]] = 100%** | Œuvre signée : Épopée permanente d'ère (Héritage, [[L'Accord]] §Héritage) |
| **Religion [[Foedus Animae]]** | Chants de pacte, mariages valorisés |
| **Religion [[Rota Mundi]]** | Chants cycliques, retour des thèmes anciens |
| **Faction politique** | Propagande possible (tension : un Barde "vendu" perd sa Reconnaissance neutre) |

---

## 9. Économie

**Gold sinks générés** :
- Instrument ([[Luthier]]) : 200-5 000 Éclats
- Recueil de chants ([[Scribe]] + [[Relieur]]) : 100-1 000 Éclats / volume
- Voyages : 50-500 Éclats / mission
- Cotisation Confrérie : 200 Éclats / ère

**Prix indicatifs** :
- Pourboires place : 1-50 Esquilles
- Engagement taverne : 10-100 Éclats / soirée (selon réputation)
- Mariage : 200-2 000 Éclats
- Cour royale : 1 000-20 000 Éclats / saison
- Chant de propagande sur commande : 500-10 000 Éclats (selon influence demandée)
- Œuvre signée Maître : Héritage social principalement

**Chaîne économique** :
```
[[Historien]] / [[Bibliothécaire]] (sources) + [[Luthier]] / [[Tisserand]] (matériel) → Barde (Performance + transmission)
                                                                                       ↘ Public (Reconnaissance, pourboires)
                                                                                       ↘ Cour noble (propagande, propaganda)
                                                                                       ↘ Guilde (chronique des exploits)
                                                                                       ↘ Mémoire collective (Héritage d'Hybelior)
```

> [!tip] Influence sociale
> Un Barde Maître peut influencer la [[Reconnaissance]] d'un joueur d'**±20 points par chant majeur**. C'est l'un des leviers sociaux les plus puissants d'Hybelior — y compris pour les guildes et les factions.

---

## 10. Comportement IA / signatures PNJ

> *Modèle IA pas tranché — voir [[Concepts Fondamentaux IA PNJ]]. Indication gameplay seul.*

**Cycle quotidien typique** :
- 09:00 lever — exercices vocaux, lecture du jour
- 10:00-13:00 — étude de [[Lore]], composition, mémorisation
- 13:00-14:00 — repas, échanges avec [[Tavernier]] / [[Historien]]
- 14:00-17:00 — répétition, prise de notes (rumeurs, faits)
- 17:00-19:00 — préparation du récit du soir
- 19:00-23:00 — performance (taverne, fête, cour)
- 23:00-01:00 — collecte d'histoires (auberges, marchés)

**Signatures de PNJ archétypaux** :
- **Le barde de taverne** — figure familière, voix rauque, mémoire infaillible des chants populaires
- **Le barde de cour** — habit raffiné, langue précise, sait peindre l'ennemi en monstre
- **La barde itinérante** — sac de cuir, instrument au dos, recueille les histoires de chaque village
- **Le Maître-Bardique** — voix profonde, présence imposante, peut faire pleurer une assemblée
- **Le barde satirique** — exilé politique, ses chants ridiculisent les puissants

**PNJ célèbres dans le monde** *(à étoffer Phase 4)* :
- *Vellan le Tisseur de Voix, barde de la cour de Galenor* (cf. citation d'ouverture)
- *Maîtresse Hilea d'Astravia* — chronique 4 ères, hymne de la cité signé de sa main
- *Le Pâle Errand* — barde-historien, double Maîtrise, allié des cabinets de [[Prédiction]]

---

*Liens : [[Métiers]] · [[Personnage]] · [[Crafts]] · [[Économie]] · [[Armes et Maîtrise]] · [[L'Accord]] · [[Le Souffle]] · [[Les Ères]] · [[Prédiction]] · [[Reconnaissance]] · [[Musicien]] · [[Acteur]] · [[Jongleur]] · [[Historien]] · [[Bibliothécaire]] · [[Scribe]] · [[Tavernier]]*
