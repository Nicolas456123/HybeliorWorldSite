---
tags: [métier, archétype, gouvernance, mémoire, verbe]
type: archetype
category: Métier
catégorie_métier: Gouvernance
stat_principale: Mémoire
stats_secondaires: [Verbe, Acuité, Présence]
craft_category: -
paliers_maîtrise: [Novice, Initié, Adepte, Expert, Maître]
factions_compatibles: [Politiques, Religieuses, Commerciales]
karma_typique: vert
métiers_complémentaires: [Ambassadeur, Juge, Scribe, Espion]
era_modulation: true
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-progression-jouable]
---

# 🧠 Conseiller — Archétype-métier

> [!info] Entité tutélaire canonique
> **[[Cosmologie|Consilium]]** (Céleste — *Conseiller des légendes*, source de sagesse et de conseils). Voir [[Cosmologie]] §"Liste canonique des entités cosmiques". Source : `AccessExport/Legende.csv` (D-COSMO-LEGENDE-CSV-INTEGRATION).

## 1. Vue d'ensemble

Le **Conseiller** est l'oreille et la voix du pouvoir. Il ne décide pas — il **éclaire la décision**. Sa fonction couvre la diplomatie de cour, la stratégie militaire, la politique économique, le calendrier rituel : partout où un dirigeant doit choisir, un Conseiller chuchote. C'est un métier majoritairement **PNJ**, mais accessible au joueur qui s'investit auprès d'une faction politique ou religieuse, généralement à partir d'un haut palier d'[[L'Accord]].

Ancrage historique : à chaque cour d'Hybelior, le Conseiller est l'**ombre du trône**. Certaines nations institutionnalisent des Conseils (collège de cinq Conseillers traitant chacun un domaine), d'autres concentrent tout sur un seul homme — choix de design narratif par nation, voir Lore/Pays. Le Conseiller idéal **n'apparaît jamais dans les chants**, mais ses recommandations rythment les ères.

Place dans Hybelior : **stratégique**. Un Conseiller bien placé peut faire basculer une [[Factions|guerre de factions]], orienter un siège ([[Guildes]]), arbitrer entre les cultes. Pour le joueur, c'est l'une des rares manières d'**influencer le monde sans combattre**. Un Conseiller assis à la bonne cour peut peser plus qu'un héros couvert de sang.

## 2. Stats & Maîtrises associées

| Stat brute | Rôle | Cible Maître |
|------------|------|--------------|
| **Mémoire** *(principale)* | Croiser informations, traités, généalogies | 80+ |
| **Verbe** | Convaincre sans imposer, formuler à demi-mot | 80+ |
| **Acuité** | Lire les non-dits, détecter une trahison | 70+ |
| **Présence** | Tenir la salle du conseil | 50+ |

**Maîtrise contextuelle principale** : `Maîtrise_Stratégie` (couche 2) — combine analyse politique, militaire et économique. Spécialisations possibles : `Maîtrise_Stratégie_Militaire`, `Maîtrise_Stratégie_Économique`, `Maîtrise_Stratégie_Cultuelle`.
**Maîtrises secondaires** : `Maîtrise_Diplomatie`, `Maîtrise_Rhétorique`, `Maîtrise_Cartographie` (lecture des théâtres d'opérations).

## 3. Compétences spécifiques

- **Lire une situation** : croiser une rumeur, un rapport d'Espion, un compte-rendu de Scribe et formuler un diagnostic en quelques minutes.
- **Recommander une décision** : présenter 2-3 options au dirigeant, avec coûts et risques chiffrés.
- **Anticiper un Souffle** : appliquer la [[Prédiction]] aux choix d'État (le Conseiller qui parie sur la bonne ère gagne énormément en autorité).
- **Tenir un secret** : compétence narrative invisible mais critique — un Conseiller qui fuit est un Conseiller mort.
- **Composer un traité** : rédiger un cadre acceptable par deux parties (souvent en duo avec un Ambassadeur).
- **Démanteler une opposition** : compétence rhétorique en huis clos — discréditer un rival sans qu'il s'en aperçoive.

## 4. Lieux d'exercice + équipement

**Lieux** : salle du conseil (palais royal, grande église, hôtel marchand), cabinet privé attenant aux appartements du dirigeant, **chambres dérobées** où se tiennent les vraies décisions. Plus rarement, le Conseiller suit son maître en campagne ou en pèlerinage.

**Équipement typique** :
- Tenue sobre, marquée de l'emblème de la faction.
- Chaîne de fonction (parfois magistrale).
- Carnet personnel chiffré — les Conseillers expérimentés codent leurs notes.
- Anneau ou broche scellable pour valider un message.
- Pas d'arme — un Conseiller armé inquiète. Sa protection est assurée par les [[#Garde|Gardes]] du palais.

## 5. Paliers de Maîtrise

| Palier | Capacités sociales débloquées |
|--------|-------------------------------|
| **Novice** | Secrétaire d'un Conseiller ; rédige des notes, classe la correspondance |
| **Initié** | Conseiller cadet ; tient un dossier (un domaine) ; peut prendre la parole sur invitation |
| **Adepte** | Conseiller de domaine ; recommandation directe au dirigeant sur son champ |
| **Expert** | Conseiller principal ; arbitre entre les cadets, voit les rapports d'Espions sans filtre |
| **Maître** 🔒 | Premier Conseiller / Vizir ; **valide une décision majeure de l'État** sans contre-signature ; siège en Conseil restreint |

**Condition cachée 🔒** au Maître : avoir fait basculer une décision politique majeure documentée dans les chroniques (œuvre signée d'un Scribe).

## 6. Activités débloquées

- **Conseil restreint** : accès aux quêtes politiques de plus haute portée.
- **Recommandation d'élite** : le Conseiller peut **désigner** un autre joueur pour une mission d'État rémunérée (escorte d'Ambassadeur, frappe ciblée d'Assassin, etc.).
- **Ouverture / fermeture d'enquête** : peut faire suspendre une enquête de Juge si elle gêne l'État (politiquement coûteux).
- **Traité bilatéral** : co-signé avec un Ambassadeur ; modifie la jauge de Reconnaissance entre deux factions de manière permanente.
- **Quêtes longues** : intrigues de cour étalées sur plusieurs ères.
- **Influence sur la Bourse des Augures** : un Conseiller Maître bien informé peut "souffler" la bonne mise (cf. [[L'Accord]]).

## 7. Carrière et progression

```
Secrétaire → Conseiller cadet (1 dossier) → Conseiller de domaine
         → Conseiller principal → Premier Conseiller / Vizir
         → (rare) Régent
```

**Rivalités classiques** : Conseillers entre eux (chacun défend son dossier), Conseiller contre Ambassadeur (le Conseiller préfère que le pouvoir reste à la maison ; l'Ambassadeur veut négocier dehors), Conseiller contre Juge (cf. [[#Juge|Juge §7]]).

**Décroissance** : la `Maîtrise_Stratégie` se rouille vite si le Conseiller est éloigné de la cour. Un Conseiller "en disgrâce" (envoyé en province) perd 1 palier par Souffle.

### Sous-spécialisations canoniques (Role.csv)

> Source canonique : `Role.csv` (cat 4 — Gouvernance). Trois rôles canoniques se rattachent au Conseiller (palier Maître+).

#### Sous-spécialisation Maître+ : Conseiller royal

> Source canonique : `Role.csv` (cat 4, role n°14).

- **Description** : Conseiller principal d'un souverain — siège permanent à la cour, dossier stratégique majeur (guerre, finances, succession). Équivalent canonique de **Premier Conseiller / Vizir** dans l'échelle d'évolution (§7).
- **Conditions** : palier Maître + investiture royale + ≥ 1 dossier d'État porté à terme + 🔒 condition cachée (faveur personnelle du souverain OU avoir fait basculer une succession / une guerre).
- **Notes** : titre exposé politiquement — disgrâce possible à chaque [[Le Souffle|Souffle]]. Rivalité classique avec Ambassadeur et Juge.

#### Sous-spécialisation Maître+ : Intendant royal

> Source canonique : `Role.csv` (cat 4, role n°15).

- **Description** : Conseiller-Maître spécialisé dans la **gestion administrative** d'un domaine royal ou d'une grande maison — comptes, terres, intendance des cuisines/écuries/garnisons, perception fiscale.
- **Conditions** : palier Maître axe **administratif** + nomination par lettres patentes + ≥ 1 budget de fief équilibré sur la durée + 🔒 condition cachée (avoir évité une banqueroute de fief OU réorganisé une intendance corrompue).
- **Notes** : frontière forte avec [[Banquier]] (finances) et [[Marchand]] (logistique). Moins exposé politiquement que le Conseiller royal mais plus exposé à la corruption interne.

#### Sous-spécialisation Maître+ : Sage du conseil des anciens

> Source canonique : `Role.csv` (cat 4, role n°12).

- **Description** : Conseiller-Maître **âgé**, siégeant dans un conseil consultatif (Conseil des Anciens, Sénat, Diète) plutôt que dans le cabinet exécutif. Voix de la mémoire et de la tradition, garde-fou modérateur.
- **Conditions** : palier Maître + ≥ 10 ans cumulés à la cour OU survie de ≥ 2 [[Le Souffle|Souffles]] en activité + Reconnaissance ≥ Expert + 🔒 condition cachée (être reconnu par les pairs comme **autorité morale**, ou détenir une mémoire vivante d'un événement clé pré-Souffle).
- **Notes** : rôle souvent cumulé avec [[Historien]] (Erudition) — un Sage qui a aussi une formation érudite est doublement précieux. `[REFONTE-NEEDED — frontière Gouvernance/Erudition à valider.]`

## 8. Modulation par contexte

**Par faction** :
- **Politiques** : Conseiller du trône — fonction archétypale.
- **Religieuses** : Conseiller du Hiérarque — formate ses avis selon la doctrine.
- **Commerciales** : Conseiller du Consortium — gère portefeuilles et routes.
- **Antagonistes** : les Conseillers de Catena Fracta n'existent qu'en lore noir, conseillers manipulateurs au service des Déliés.

**Par ère** : pendant un **Souffle Cardinal**, les Conseillers sont en surchauffe (toutes les nations veulent recalibrer leur politique). En **Ère du Voile**, leur secret devient encore plus crucial. En **Ère lumineuse**, leur rôle se folklorise un peu (les rois prennent plus de place publiquement).

**Par karma** : Conseiller doit rester **vert** ou **jaune limite**. Le Conseiller jaune (manipulations sales mais légales) existe et est même typique. Au-delà, exclusion automatique.

## 9. Économie & Reconnaissance

**Salaire** : très variable selon la cour. Adepte ~800 Éclats / semaine ; Maître / Vizir : ~5 000 Éclats / semaine + apanages (terres, titres, parts de taxes locales).

**Gold sinks spécifiques** :
- Réseau personnel d'informateurs : 200 à 2 000 Éclats / semaine selon l'ambition.
- Cadeaux diplomatiques (corruption "polie" mais nécessaire) : poste budgétaire majeur.
- Bibliothèque et copistes : investissement continu en Scriptorium.

**Reconnaissance** (privée) : c'est **le métier où la Reconnaissance compte le plus**. Un Conseiller qui chute en Reconnaissance perd sa charge instantanément.
**Renom** (public) : paradoxalement faible — un grand Conseiller reste dans l'ombre. Quand un Conseiller atteint le Renom public, il est souvent en danger (c'est qu'il s'est trop exposé). Cf. [[Registre des Décisions]] §D-GDD-RECONNAISSANCE.

## 10. Signatures PNJ + interactions joueur

**PNJ exemplaires** :
- Le Vizir d'un empire central, vieil homme aux dossiers chiffrés, joue trois ères d'avance.
- La Conseillère cultuelle d'une église majeure, ascétique et redoutée.
- Le Conseiller marchand d'un consortium, calcule en Éclats ce que d'autres calculent en sang.

**Interactions joueur** :
- **Donneur de quête** : missions politiques fines (récupérer un document, discréditer un rival, relayer un message à un Ambassadeur).
- **Allié** : le joueur Conseiller peut "ouvrir" des portes ailleurs (mots glissés à d'autres factions).
- **Ennemi** : intrigues longues, rarement combat direct ; le Conseiller manipule plutôt qu'il ne frappe.
- **Mentor** : un Conseiller Maître peut prendre un joueur prometteur sous son aile et le guider à travers la cour.

---

*Liens : [[Métiers]] | [[Personnage]] | [[Factions]] | [[L'Accord]] | [[Prédiction]] | [[Économie]] | [[Registre des Décisions]]*
