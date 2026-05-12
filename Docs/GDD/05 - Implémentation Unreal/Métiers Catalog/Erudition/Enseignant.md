---
tags: [métier, archétype, érudition, verbe, mémoire]
type: archetype
category: Métier
catégorie_métier: Erudition
stat_principale: Verbe
stats_secondaires: [Mémoire, Présence, Acuité]
craft_category: "-"
sources_ressources_accessibles: [Parchemin, Encre, Tome, Ardoise, Craie]
stations_principales: [Salle de classe, Cabinet privé, Préau d'académie, Atelier d'apprentissage, Maison de maître]
outils_principaux: [Manuel, Tableau, Craie, Bâton de récitation, Cahier de l'élève, Sceau de certification]
paliers_maîtrise: [Novice, Initié, Adepte, Expert, Maître]
métiers_complémentaires: [Bibliothécaire, Historien, Scribe, Barde, Chercheur, Tous métiers (formation transverse)]
era_modulation: true
status: drafted
last_review: 2026-05-01
needs_review_for: [gold-sink-formation-pnj-calibrage]
---

# 🏫 Enseignant — Archétype Métier

> *« On n'apprend rien à un élève. On lui montre où poser le pied. Le reste, c'est lui qui marche. »*
> — **Maître Dolyne**, fondatrice de l'Académie des Trois Vents

---

## 1. Vue d'ensemble

L'**Enseignant** est le métier de **transmission directe** : il prend un savoir-faire (Maîtrise) qu'il possède et l'**enseigne** à un élève — joueur ou PNJ — qui en accélère l'acquisition. C'est l'un des rares métiers d'Érudition qui ne crée pas un objet ou un texte mais une **transformation chez l'autre**.

> [!important] Rôle économique central
> L'Enseignant est un **gold sink majeur** d'Hybelior. Les **PNJ formateurs** (Maîtres réputés dans une discipline) facturent des leçons aux joueurs pour accélérer la progression de Maîtrises spécifiques (ex : un joueur paye un PNJ Maître Forgeron pour passer de Adepte à Expert plus vite). Les joueurs Enseignants peuvent aussi **vendre des cours** à d'autres joueurs — économie joueur-driven.

L'Enseignant est intrinsèquement **polyvalent** : on n'enseigne que ce qu'on maîtrise déjà. Un joueur ne devient Enseignant qu'après avoir acquis une autre Maîtrise solide. C'est un **second métier** typique de fin de carrière.

> [!important] Frontières
> - **Enseignant** : transmet à des élèves nommés (humains, PNJ ou joueurs). Paiement par leçon.
> - **[[Barde]]** : transmet par chant, à un public anonyme. Pas de paiement par élève.
> - **[[Historien]]** : transmet par publication, sans interaction directe.
> - **[[Bibliothécaire]]** : ne transmet pas, **donne accès**.

---

## 2. Stats brutes & Maîtrises associées

- **Stat principale** : **Verbe** — clarté de la transmission, capacité à reformuler, charisme pédagogique
- **Stats secondaires** :
  - **Mémoire** — connaissance encyclopédique de la discipline enseignée, anecdotes pour ancrer
  - **Présence** — autorité naturelle, gestion d'un groupe d'élèves
  - **Acuité** — détecter les blocages d'un élève, ajuster la pédagogie
- **Maîtrise contextuelle** : `Maîtrise_Pédagogie` — progresse à chaque élève formé. **Spécifique** : un Enseignant a aussi besoin de la Maîtrise *de la discipline qu'il enseigne* à un palier supérieur ou égal à ce qu'il transmet.

> [!tip] Couplage
> Pour enseigner la Forge palier Adepte, il faut être : Maîtrise_Forge ≥ Adepte **ET** Maîtrise_Pédagogie ≥ Initié.

→ Référence Couche 1 [[Personnage]] §Stats brutes. Maîtrise contextuelle [[Personnage]] §Couche 2.

---

## 3. Sources de ressources

**Consomme** (très peu matériel) :
- **[[Parchemin]]**, **Encre**, **Craie**, **Ardoise** — supports pédagogiques
- **[[Tome]]** — manuels (rédigés par l'Enseignant ou par un [[Bibliothécaire]] collaborateur)
- **Temps** (intrant gameplay le plus important : leçon = 30 min à plusieurs heures)

**Produit** :
- **Élèves formés** — c'est le « produit » : un PNJ ou un joueur ayant gagné un palier ou une portion de Maîtrise
- **Manuels** — supports pédagogiques (collaboration [[Scribe]] / [[Calligraphe]])
- **Sceau de certification** — palier Expert+ : l'Enseignant signe un certificat reconnu (équivalent diplôme dans Hybelior)
- **Disciples** — palier Maître+ : voir [[L'Accord]] §Héritage §Disciples (élément d'Héritage permanent)

→ Pas de craft direct (`craft_category: -`). Output relationnel et social.

---

## 4. Stations + outils

| Station | Rôle | Palier requis |
|---------|------|---------------|
| **Salle de classe** | Cours collectif | Initié |
| **Cabinet privé** | Leçon particulière | Novice |
| **Préau d'académie** | Cours en plein air | Initié |
| **Atelier d'apprentissage** | Apprentissage pratique (avec station du métier enseigné) | Adepte |
| **Maison de maître** | Atelier-école d'un Maître | Expert |
| **Académie reconnue** | École avec corpus établi (Astravia, Galenor) | Maître |

**Outils signature** :
- **Manuel** — rédigé ou transmis
- **Tableau et craie** — palier Initié (école établie)
- **Bâton de récitation** — symbole d'autorité, parfois cérémoniel
- **Cahier de l'élève** — suivi nominatif
- **Sceau de certification** — signature reconnue par les guildes (palier Expert+)

→ Référence : station spécifique du métier enseigné requise pour l'apprentissage pratique.

---

## 5. Paliers de Maîtrise

| Palier | Capacités débloquées |
|--------|----------------------|
| **Novice** | Enseigner les bases d'une seule discipline à un seul élève. Gain de progression élève +10% |
| **Initié** | Enseigner à 3 élèves simultanément. Gain élève +20%. Premier manuel possible |
| **Adepte** | Enseigner 2 disciplines. Cours collectifs (10 élèves). Gain élève +30% |
| **Expert** | Sceau de certification reconnu (faction). Cours en académie. Gain élève +40% |
| **Maître** | **Condition cachée 🔒** — Académie fondée (œuvre signée), titre **« Maître Enseignant »** (Héritage), Disciples nommés dans les chroniques |

> Décroissance : voir [[Armes et Maîtrise]] §Décroissance. Un Enseignant qui ne pratique plus oublie comment formuler clairement (rouille -15% sur Pédagogie) — et perd ses Maîtrises sous-jacentes s'il les pratique pas non plus.

---

## 6. Activités débloquées

| Palier | Exemples (3-5) |
|--------|----------------|
| **Novice** | Leçon particulière 1 élève · Vérifier un travail · Corriger une erreur basique |
| **Initié** | Cours en petit groupe (3 élèves) · Rédiger un manuel introductif · Examiner un apprenti |
| **Adepte** | Cours collectif (10 élèves) · Concevoir un programme · Délivrer une attestation |
| **Expert** | Sceau de certification reconnu · Conseil pédagogique à une faction · Examiner un Adepte sur le terrain |
| **Maître** | **Œuvre signée** : Académie fondée (Héritage), Disciple nommé dans les chroniques, certification de Maître |

---

## 7. Carrière et débouchés

- **Démarrage** : précepteur privé (familles aisées), répétiteur dans une école, ou ouverture d'une petite école rurale
- **Progression** : enseignant titulaire → maître d'académie → fondateur
- **Établissement** :
  - **Précepteur de cour** — éduque les héritiers nobles (Verbe + Présence haute requise)
  - **Maître d'académie** — Astravia, Galenor, fondations urbaines
  - **Maître itinérant** — voyage de cité en cité, leçons par session
  - **Maître ès-Souffles** — enseigne la lecture des Souffles (cf. [[Prédiction]])
- **Réseau** :
  - **Pair-amont** : [[Bibliothécaire]] (manuels), [[Scribe]] (copie de manuels), [[Historien]] (corpus)
  - **Tout métier** : peut enseigner toute Maîtrise qu'il possède — réseau transverse exceptionnel
  - **Aval** : élèves (joueurs et PNJ), factions, guildes
- **Faction** : Académies (Astravia, Galenor), Conseil des Maîtres, religions (chaque temple a ses enseignants)

### Sous-spécialisations canoniques (Role.csv)

> Source canonique : `Role.csv` (cat 6 — Erudition). Ce rôle correspond à un **palier Maître+** absorbé du legacy AccessExport.

#### Sous-spécialisation Maître+ : Professeur émérite

> Source canonique : `Role.csv` (cat 6, role n°27).

- **Description** : Enseignant-Maître reconnu d'envergure académique — siège au Conseil des Maîtres d'une grande académie (Astravia, Galenor), forme des Maîtres dans plusieurs disciplines, publie des manuels canoniques.
- **Conditions** : palier Maître + ≥ 5 ans titulaire dans une académie + ≥ 3 élèves devenus Maîtres dans leur métier + ≥ 1 manuel reconnu publié + 🔒 condition cachée (chaire signée OU avoir survécu à un schisme académique en gardant son poste).
- **Notes** : équivalent canonique du **Maître d'académie / fondateur** dans l'échelle d'évolution (§7). Peut être pluri-rôle avec un autre métier savant (un Professeur émérite est souvent aussi un Bibliothécaire-Maître ou un Historien-Maître).

---

## 8. Modulation par contexte

| Contexte | Effet |
|----------|-------|
| **Ère [[Les Ères|Verdoiement]] (Terranu)** | Multiplication des écoles rurales, demande pédagogique élargie |
| **Ère [[Les Ères|Ombre Longue]] (Noctis)** | Cours nocturnes, savoirs occultes enseignables |
| **Ère [[Les Ères|Brume Mortelle]]** | Cours suspendus dans les zones touchées, demande de formation médicale x3 |
| **Ère [[Les Ères|Vents]] (Aerion)** | Maîtres itinérants avantagés, cours en plein air |
| **Post-[[Le Souffle]] semaine 1** | Pic de demande (apprentissage des nouveautés d'ère) |
| **[[L'Accord]] ≥ 75%** | Sceau de certification reconnu par 2 nations supplémentaires |
| **[[L'Accord]] = 100%** | Œuvre signée : Académie fondée (Héritage, [[L'Accord]] §Héritage) |
| **Religion (toute)** | Chaque temple finance ses propres enseignants, accès à des fonds |
| **Faction guilde** | Contrats de formation collective (escouade entière formée) |

---

## 9. Économie

> [!tip] Gold sink central
> L'Enseignement est l'un des **gold sinks structurels** d'Hybelior (cf. [[Économie]]). Les joueurs paient pour accélérer leur progression de Maîtrise.

**Gold sinks générés** (côté Enseignant — coûts) :
- Loyer salle de classe : 200-1 000 Éclats / mois
- Manuels et supports : 50-300 Éclats / lot
- Sceau de certification ([[Bijoutier]]) : 500-2 000 Éclats unique
- Cotisation académie : 500 Éclats / ère

**Prix indicatifs** (côté élève — paiement) :
- Leçon particulière 1h : 5-30 Éclats
- Cours collectif 1 séance : 2-10 Éclats / élève
- Programme complet (1 palier de Maîtrise) : 500-5 000 Éclats selon discipline et palier
- Formation Expert→Maître (PNJ formateur uniquement) : 10 000-100 000 Éclats (gold sink majeur)
- Certification scellée : 200-2 000 Éclats

**Chaîne économique** :
```
Enseignant (Maîtrise possédée) → Élève (gagne progression accélérée)
                                ↗ Joueur paie (accélère Maîtrise)
                                ↗ PNJ paie (intégration au monde)
                                ↗ Faction paie (formation collective)
                                ↗ Académie (fonds collectifs)
```

> [!note] Calibrage à playtester
> Le ratio « Éclats / palier de Maîtrise gagné » est sensible : trop bas = pay-to-progress, trop haut = personne ne paie. Cible initiale : un joueur peut accélérer ~30% de la durée d'un palier en payant.

---

## 10. Comportement IA / signatures PNJ

> *Modèle IA pas tranché — voir [[Concepts Fondamentaux IA PNJ]]. Indication gameplay seul.*

**Cycle quotidien typique** :
- 06:00 lever — préparation des leçons du matin
- 07:00-12:00 — cours du matin (académie ou cabinet)
- 12:00-13:00 — repas (souvent avec élèves)
- 13:00-17:00 — leçons particulières, suivi des apprentis
- 17:00-19:00 — correction des travaux, rédaction de manuels
- 19:00-21:00 — étude personnelle, correspondance avec confrères

**Signatures de PNJ archétypaux** :
- **Le précepteur de cour** — habits sobres mais riches, voix posée, reconnaît tout le gotha local
- **La maîtresse d'école rurale** — paye-en-nature acceptée, connaît chaque enfant du village
- **Le maître itinérant** — sac de cuir, manuel pour seul bagage, donne cours en taverne
- **Le Maître Enseignant d'Astravia** — titre prestigieux, on vient de loin pour le défier d'un débat

**PNJ célèbres dans le monde** *(à étoffer Phase 4)* :
- *Maître Dolyne, fondatrice de l'Académie des Trois Vents* (cf. citation d'ouverture)
- *Vieux Tobor, le précepteur de Galenor* — forma trois rois successifs
- *Sœur Velae* — maîtresse-itinérante, école mobile de [[Foedus Animae]]

---

*Liens : [[Métiers]] · [[Personnage]] · [[Crafts]] · [[Économie]] · [[Armes et Maîtrise]] · [[L'Accord]] · [[Le Souffle]] · [[Les Ères]] · [[Bibliothécaire]] · [[Historien]] · [[Barde]] · [[Scribe]] · [[Chercheur]] · [[Concepts Fondamentaux IA PNJ]]*
