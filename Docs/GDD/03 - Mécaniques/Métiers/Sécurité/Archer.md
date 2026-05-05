---
tags: [métier, archétype, sécurité, vivacité, acuité]
type: archetype
category: Métier
catégorie_métier: Sécurité
stat_principale: Vivacité
stats_secondaires: [Acuité, Endurance, Vigueur]
craft_category: -
paliers_maîtrise: [Novice, Initié, Adepte, Expert, Maître]
factions_compatibles: [Politiques, Commerciales, Religieuses]
karma_typique: vert
métiers_complémentaires: [Soldat, Garde, Chasseur de créature, Explorateur]
era_modulation: true
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-progression-jouable]
---

# 🏹 Archer — Archétype-métier

## 1. Vue d'ensemble

L'**Archer** est le combattant à distance par excellence : tireur d'élite, archer monté, archer de muraille, archer-chasseur. C'est un **métier hybride** — autant carrière militaire que pratique individuelle. À la différence du [[#Soldat|Soldat]] (formation collective), l'Archer cultive un savoir-faire technique presque artisanal : la lecture du vent, la portée, la cadence. C'est l'un des archétypes Sécurité **les plus jouables** sans s'inscrire dans une hiérarchie.

Ancrage historique : avant les armées régulières, l'archerie était discipline de chasseur. Les écoles de tir d'Hybelior dérivent toujours de traditions locales — chaque culture a son arc signature, son geste, ses rituels (cf. [[Items/Archétypes/Arc]]).

Place dans Hybelior : l'Archer joueur peut servir une faction (Garde de muraille, archer royal, archer-chasseur de monastère) ou opérer librement (mercenaire d'arc, escorte de caravane, défenseur de guilde sur sa muraille).

## 2. Stats & Maîtrises associées

| Stat brute | Rôle | Cible Maître |
|------------|------|--------------|
| **Vivacité** *(principale)* | Cadence, repositionnement, esquive | 80+ |
| **Acuité** | Précision, lecture du vent, distance | 90+ |
| **Endurance** | Tenir une bataille (cordage des bras) | 60+ |
| **Vigueur** | Tension d'arc lourd | 50+ |

**Maîtrise contextuelle principale** : `Maîtrise_Tir_Arc` (couche 2, voir [[Armes et Maîtrise]] et [[Items/Archétypes/Arc]]).
**Maîtrises secondaires** : `Maîtrise_Tir_Arbalète` (option), `Maîtrise_Survie_<Climat>` (archer-chasseur), `Maîtrise_Furtivité` (archer embusqué).

## 3. Compétences spécifiques

- **Tir tendu** : courte distance, dégâts max, peu de chute — `Vivacité × Maîtrise_Tir_Arc`.
- **Tir parabolique** : longue distance, gestion du vent — Acuité critique.
- **Tir en cadence** : 3 à 6 flèches selon palier ; coût Stamina cumulé.
- **Tir à cheval** : palier Adepte+ ; chevauche l'animal et tire — combine `Maîtrise_Équitation`.
- **Embuscade** : tir surprise depuis caché, dégâts critiques (cf. [[Items/Archétypes/Flèche]] pour les variantes).
- **Visée d'organe** : palier Expert+ ; ciblage anatomique (cou, articulation), peut désarmer / saigner.
- **Tir signature** 🔒 : palier Maître ; flèche unique scriptée par maîtrise (multi-cible, parabole impossible, retour, etc.).

## 4. Lieux d'exercice + équipement

**Lieux** : **stand de tir** (champ d'entraînement amélioré dans la plupart des forteresses et casernes), **muraille de cité** (poste de garde haute), **forêts et terrains de chasse**, **champ de bataille** (lignes arrière). Les écoles d'arc sont reconnues par faction et donnent accès à des techniques exclusives.

**Équipement typique** :
- Arc (selon palier — court, long, composite, grand-arc — cf. [[Items/Archétypes/Arc]]).
- Carquois et flèches (variantes : pointe lourde, pointe perforante, à corde, empoisonnée — cf. Alchimiste).
- Brassard et gant de tir.
- Armure légère (l'Archer ne tank pas).
- Optionnel : monture pour archer monté.

## 5. Paliers de Maîtrise

| Palier | Capacités combat débloquées |
|--------|-----------------------------|
| **Novice** | Tir simple ; portée courte ; arcs Communs |
| **Initié** | Tir parabolique ; double tir ; arcs Inhabituels |
| **Adepte** | Tir à cheval ; tir en cadence rapide ; arcs Rares |
| **Expert** | Visée d'organe ; tir embusqué critique ; arcs Magistraux |
| **Maître** 🔒 | Tir signature unique ; arcs Légendaires ; exemple : "Pluie d'argent" (multi-flèches courbes) |

**Condition cachée 🔒** au Maître : abattre une cible mythique à plus de 200m sans être détecté (variante chasseur), OU tenir une muraille seul pendant un siège (variante militaire).

## 6. Activités débloquées

- **Garde de muraille** : poste salarié dans les cités fortifiées.
- **Escorte de caravane** : contrat libre — paiement à la mission.
- **Chasse aux créatures volantes** : niche exclusive Archer (lien avec Chasseur de créature).
- **Tournois de tir** : événements festifs récurrents (cf. Festivals).
- **Sniper diplomatique** : palier Expert+, missions politiques discrètes (cf. Espion / Conseiller).
- **Quêtes de chasse mythique** : créatures rares uniquement abattables à distance.

## 7. Carrière et progression

```
Apprenti d'arc → Archer de garnison → Archer de cour / muraille
              → Archer-officier → Maître Archer / Capitaine d'arc
              → (alternative) Archer libre / Mercenaire d'arc
```

**Rivalités classiques** : Archer vs Soldat (l'Archer méprisé par certains corps lourds qui le voient "à l'arrière"), Archer vs Mage de [[Le Lien|Voie]] offensive (concurrence sur le rôle DPS distance).

**Décroissance** : `Maîtrise_Tir_Arc` exige entretien — un Archer qui ne tire pas pendant 1 Souffle perd 10-15% de précision. Les corps de Garde imposent un tir hebdomadaire pour éviter la rouille.

## 8. Modulation par contexte

**Par faction** :
- **Politiques** : Archer de muraille royale.
- **Religieuses** : Archer-prêtre (rare — certains cultes ont des **archers sacrés**).
- **Commerciales** : Archer-escorte privée des consortiums.

**Par ère** : en **Ère du Voile**, demande forte d'archers d'embuscade. En **Ère du Vent / Aerion**, recettes de flèches voyageuses bonifiées (cf. [[Crafts]]). Les écoles d'arc voient leurs styles s'adapter à chaque ère.

**Par karma** : Archer **vert** par défaut. Variante **rouge** : archer-bandit qui détrousse les caravanes — vise l'arc puis fuit.

## 9. Économie & Reconnaissance

**Salaire / revenus** : Archer de garnison : 200-400 Éclats / semaine (Initié-Adepte). Capitaine d'arc : 1 000+. Archer libre : variable, contrats à 50-500 Éclats / mission selon risque.

**Gold sinks spécifiques** :
- Flèches consommables (poste continu — vraie économie pour les fabricants).
- Arcs de qualité, entretien (cordes neuves, cires).
- Stand de tir loué pour entraînement.

**Reconnaissance** (privée) : auprès de la garnison ou faction servie. **Renom** (public) : montent vite via tournois. Un Archer Maître ayant remporté un grand tournoi peut tirer un revenu durable de sa célébrité.

## 10. Signatures PNJ + interactions joueur

**PNJ exemplaires** :
- Le Capitaine d'arc d'une muraille fameuse, qui forme des générations.
- L'archère ermite des hautes vallées, qui a refusé toute charge.
- Le maître d'école d'arc d'une cité-temple, qui mêle tir et rituel.

**Interactions joueur** :
- **Donneur de quête** : "Abats cette créature volante", "Chasse cet espion fuyard", "Garde cette muraille pendant 3 nuits".
- **Mentor** : un Archer Maître peut former un joueur — accélération de gains de Maîtrise contre Éclats / faveurs.
- **Métier joué** : carrière militaire ou libre ; combat distance pur ; demande Acuité haute (cf. [[Personnage]] §profils).
- **Allié de guilde** : Archer sur muraille = pierre angulaire de défense de territoire (cf. [[Guildes]]).

---

*Liens : [[Métiers]] | [[Personnage]] | [[Combat]] | [[Items/Archétypes/Arc]] | [[Armes et Maîtrise]] | [[Économie]] | [[Registre des Décisions]]*
