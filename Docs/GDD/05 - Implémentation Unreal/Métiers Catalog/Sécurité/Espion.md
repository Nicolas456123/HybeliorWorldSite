---
tags: [métier, archétype, sécurité, acuité, verbe]
type: archetype
category: Métier
catégorie_métier: Sécurité
stat_principale: Acuité
stats_secondaires: [Verbe, Vivacité, Mémoire]
craft_category: -
paliers_maîtrise: [Novice, Initié, Adepte, Expert, Maître]
factions_compatibles: [Politiques, Commerciales, Religieuses, Antagonistes]
karma_typique: jaune
métiers_complémentaires: [Conseiller, Ambassadeur, Assassin, Acteur]
era_modulation: true
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-progression-jouable, frontière-assassin]
---

# 👁️ Espion — Archétype-métier

> [!info] Entités tutélaires canoniques
> **[[Cosmologie|Ocultus]]** (Astral — *Espion des dieux*, gardien des secrets divins) et **[[Cosmologie|Murmuris]]** (Astral — *Maître des murmures*, porteur des secrets discrets). Voir [[Cosmologie]] §"Liste canonique des entités cosmiques". Source : `AccessExport/Legende.csv` (D-COSMO-LEGENDE-CSV-INTEGRATION).

## 1. Vue d'ensemble

L'**Espion** observe, infiltre, rapporte. Sa fonction est l'**information** : ce que sait l'État, ce que cache une cour rivale, ce que prépare un consortium. Là où l'[[#Assassin|Assassin]] **agit**, l'Espion **témoigne**. C'est la frontière nette entre les deux métiers : un Espion qui tue est devenu Assassin (et change de karma typique).

> [!note] Frontière Espion / Assassin
> - **Espion** : Verbe et Acuité hauts. Déguisement social, infiltration de salons, séduction informée. Karma typique **jaune** (mensonge constant) mais sans kills NC.
> - **Assassin** : Vivacité et Acuité hautes. Frappes furtives, kills. Karma rouge par défaut.
> Un Espion qui doit tuer est sorti de son métier — et aura souvent recours à un Assassin partenaire plutôt que d'effectuer le geste lui-même.

Ancrage historique : les services secrets d'Hybelior ont autant d'âge que les nations. Chaque grande faction entretient son **réseau d'ombre**, parallèle à sa diplomatie publique. Les bons Espions sont ceux qu'on n'identifie pas — un Espion célèbre est un Espion grillé.

Place dans Hybelior : nœud invisible des intrigues politiques. Pour le joueur, c'est un métier qui s'imbrique dans toute carrière sociale (Conseiller, Ambassadeur, marchand) et qui ouvre des chaînes de quêtes scriptées rares.

## 2. Stats & Maîtrises associées

| Stat brute | Rôle | Cible Maître |
|------------|------|--------------|
| **Acuité** *(principale)* | Observer, mémoriser, déceler | 80+ |
| **Verbe** | Tisser une couverture, séduire, soutirer | 80+ |
| **Vivacité** | Fuite si découvert, vols à la tire | 60+ |
| **Mémoire** | Restitution exacte des informations recueillies | 70+ |

**Maîtrise contextuelle principale** : `Maîtrise_Infiltration` (couche 2). Sous-maîtrises : `Maîtrise_Déguisement`, `Maîtrise_Séduction`, `Maîtrise_Cryptographie` (avec Scribe), `Maîtrise_Crochetage`.
**Maîtrises secondaires** : `Maîtrise_Diplomatie` (paraître ambassadeur), `Maîtrise_Marchandage` (paraître marchand), `Maîtrise_Foi_<Religion>` (paraître prêtre).

## 3. Compétences spécifiques

- **Construire une couverture** : identité fictive crédible — palier détermine la profondeur.
- **Lire une salle** : Acuité × Maîtrise_Infiltration ; détecter qui sait quoi.
- **Soutirer une information** : conversation orientée, parfois aidée d'un verre.
- **Déguisement** : changer d'apparence (cosmétique mécanique gérée par le métier).
- **Crochetage et fouille** : récupérer documents sans laisser trace.
- **Code et chiffre** : transmettre l'information sans qu'elle soit lisible.
- **Décompromettre une couverture** : sortir d'une situation où l'Espion est suspecté — compétence-vedette des Maîtres.

## 4. Lieux d'exercice + équipement

**Lieux** : **partout sauf un lieu d'Espion**. L'Espion n'a pas d'atelier ; il a des **planques** (refuges discrets), des **boîtes aux lettres mortes** (caches d'informations), des **rendez-vous tournants**. Les **ambassades** sont des terrains de chasse classiques. Les **tavernes et bordels** abritent des micro-réseaux.

**Équipement typique** :
- Garde-robe pour déguisements (variantes selon palier).
- Carnets chiffrés (Scribe).
- Fausses lettres de créance.
- Outils de crochetage.
- Petite arme cachée (défense uniquement — un Espion se bat mal).
- Fioles non-létales (somnifères, vomitifs — Alchimiste).

## 5. Paliers de Maîtrise

| Palier | Capacités sociales / techniques |
|--------|--------------------------------|
| **Novice** | Suivre une cible une nuit ; déguisement simple |
| **Initié** | Couverture courte (un événement) ; soutirer info simple |
| **Adepte** | Couverture moyenne (semaines) ; crochetage propre ; plante un mouchard |
| **Expert** | Couverture longue (mois) ; multiple identités gérées en parallèle |
| **Maître** 🔒 | **Identité enracinée** sur une ère entière dans une cour adverse ; **œuvre signée** (un rapport décisif rédigé) |

**Condition cachée 🔒** au Maître : avoir vécu un Souffle complet sous fausse identité dans une cour ennemie sans être démasqué.

## 6. Activités débloquées

- **Recueillir un dossier** : missions classiques d'État.
- **Compromettre un PNJ majeur** : preuves de corruption / liaison / hérésie — utilité narrative énorme.
- **Sabotage social** : faire échouer un mariage politique, un traité, une nomination.
- **Réseau d'informateurs** : palier Adepte+, l'Espion entretient ses propres mouchards (gold sink).
- **Influence sur la Bourse des Augures** : info précoce → mise gagnante (cf. [[L'Accord]]).
- **Quêtes Délié** : seul métier qui se "branche" naturellement sur l'arc Catena Fracta côté observation (sans devenir Délié soi-même).

## 7. Carrière et progression

```
Mouchard de quartier → Agent dormant → Agent actif
                    → Officier traitant → Maître espion
                    → (rare) Chef de réseau / Tête de service
```

**Rivalités classiques** : Espion vs Espion adverse (jeu de chat), Espion vs [[#Garde|Garde]] (le Garde traque les infiltrés), Espion vs Conseiller (le Conseiller veut savoir mais reproche à l'Espion sa morale floue), Espion vs Assassin (le partenaire dangereux).

**Décroissance** : `Maîtrise_Déguisement` et `Maîtrise_Infiltration` se rouillent vite — un Espion en pause perd 1 palier par 2 Souffles inactifs.

### Sous-spécialisations canoniques (Role.csv)

> Source canonique : `Role.csv` (cat 5 — Sécurité). Ce rôle correspond à un **palier Maître+** absorbé du legacy AccessExport.

#### Sous-spécialisation Maître+ : Maître des espions

> Source canonique : `Role.csv` (cat 5, role n°19).

- **Description** : Espion-Maître au sommet d'un service de renseignement national — gère un réseau d'agents, traite les sources, conseille le souverain sur les menaces internes/externes. Équivalent canonique de **Chef de réseau / Tête de service**.
- **Conditions** : palier Maître + ≥ 1 réseau de ≥ 5 agents actifs sous direction + ≥ 1 information cruciale livrée à temps (a évité une guerre, démasqué un complot, etc.) + 🔒 condition cachée (survivre à une trahison interne OU démasquer un Espion adverse de palier équivalent).
- **Notes** : frontière forte avec [[Conseiller]] (Conseiller royal — un Maître des espions sert directement le souverain) et [[Assassin]] (chevauchement opérationnel). Très exposé politiquement — disgrâce fréquente.

## 8. Modulation par contexte

**Par faction** :
- **Politiques** : services secrets nationaux — métier le plus institutionnalisé.
- **Religieuses** : "Veilleurs" / "Yeux du Hiérarque" — espions internes des cultes.
- **Commerciales** : intelligence économique des consortiums.
- **Antagonistes (Catena Fracta)** : informateurs déliés (à ne pas confondre avec les Déliés actifs).

**Par ère** : en **Ère du Voile**, secret total, demande explose. En **Ère de l'Effroi**, paranoïa généralisée — tout le monde voit des Espions partout. En **Ère lumineuse**, retour à la transparence officielle — l'espionnage continue mais devient plus mal vu.

**Par karma** :
- **Jaune** par défaut (mensonge constant, pas de kills NC).
- Peut rester **vert** si l'Espion sert exclusivement sa faction sans actions illégales chez les alliés.
- Devient **rouge** si bascule en kills NC — mais alors il est devenu Assassin.

## 9. Économie & Reconnaissance

**Salaire** : Adepte ~600 Éclats / semaine (officier traitant). Maître ~3 000+. Espion libre : à la pige, 100-2 000 Éclats par dossier livré.

**Gold sinks spécifiques** :
- Réseau d'informateurs (poste continu — peut atteindre 1 000+ Éclats / semaine).
- Garde-robes multiples (lien Tailleur).
- Pots-de-vin (carburant du métier).
- Faux papiers (lien Scribe-faussaire).

**Reconnaissance** : **paradoxale** — la Reconnaissance interne de l'Espion auprès de son service est très forte (les chefs valorisent les bons), mais sa Reconnaissance publique est nulle, et c'est tant mieux. **Renom** public à éviter à tout prix. Cf. [[Registre des Décisions]] §D-GDD-RECONNAISSANCE.

## 10. Signatures PNJ + interactions joueur

**PNJ exemplaires** :
- Le Chef du Service d'une grande nation, fonctionnaire impeccable et impitoyable.
- Le marchand de tapis qui est en réalité un agent dormant depuis 3 Souffles.
- L'actrice de cour, agent de plusieurs services à la fois.

**Interactions joueur** :
- **Donneur de quête** : "Récupère ce dossier", "Identifie cette cible", "Compromets ce PNJ".
- **Allié furtif** : un Espion peut "voir" pour le joueur des choses inaccessibles.
- **Service d'information** : tout joueur peut **acheter une info** auprès d'un Espion (prix variable).
- **Métier joué** : compatible avec une carrière mixte (joueur Conseiller + Espion, Marchand + Espion). Mini-jeux d'infiltration et de conversation.

---

*Liens : [[Métiers]] | [[Personnage]] | [[PvP]] | [[Factions]] | [[L'Accord]] | [[Économie]] | [[Registre des Décisions]]*
