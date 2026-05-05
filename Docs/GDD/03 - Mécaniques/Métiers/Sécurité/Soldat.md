---
tags: [métier, archétype, sécurité, vigueur, endurance]
type: archetype
category: Métier
catégorie_métier: Sécurité
stat_principale: Vigueur
stats_secondaires: [Endurance, Vivacité, Présence]
craft_category: -
paliers_maîtrise: [Novice, Initié, Adepte, Expert, Maître]
factions_compatibles: [Politiques, Religieuses]
karma_typique: vert
métiers_complémentaires: [Garde, Chevalier, Archer, Médecin]
era_modulation: true
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-progression-jouable, frontière-garde]
---

# ⚔️ Soldat — Archétype-métier

## 1. Vue d'ensemble

Le **Soldat** est le combattant **régulier mobile** : armée d'État, légion, compagnie levée. Il marche, campe, se forme en unité, livre bataille, garde une frontière, mène un siège. C'est une **carrière hiérarchisée** ; là où le [[#Garde|Garde]] est local, le Soldat est itinérant, et son identité se confond avec celle de son régiment.

> [!note] Frontière Soldat / Garde
> Voir [[#Garde|Garde §1]] pour la délimitation.
> - **Soldat** : guerre **mobile**, formation collective, hiérarchie pyramidale.
> - **Garde** : sécurité **statique**, poste fixe.
> Un même individu peut alterner — un Soldat démobilisé qui rentre en cité devient souvent Garde.

> [!note] Frontière Soldat / Chevalier
> - **Soldat** : roturier ou populaire, base de l'armée, formation et discipline.
> - **Chevalier** : élite, souvent noble, code d'honneur, individualité tactique sur le champ de bataille.
> Le Soldat **suit** le Chevalier en charge ; le Chevalier **commande** une unité de Soldats.

Ancrage historique : la guerre régulière en Hybelior s'est structurée après les Premières Guerres de [[Factions]]. Chaque royaume entretient une armée permanente plus ou moins grande, complétée par des levées en temps de crise. Les ordres religieux militaires constituent une catégorie particulière (Soldat-frère, mêle Soldat et Foi).

Place dans Hybelior : **bras armé des nations**. Pour le joueur, le Soldat propose une carrière **collective** très différente du Mercenaire ou de l'Aventurier solitaire. Il se joue surtout dans le contexte des **guerres de factions** et des grands événements d'ère.

## 2. Stats & Maîtrises associées

| Stat brute | Rôle | Cible Maître |
|------------|------|--------------|
| **Vigueur** *(principale)* | Coup, encaissement, port d'armure | 80+ |
| **Endurance** | Marche, campagne, batailles longues | 80+ |
| **Vivacité** | Mobilité dans la mêlée, esquive | 50+ |
| **Présence** | Commandement (palier élevé) | 40+, 70+ pour officiers |

**Maîtrise contextuelle principale** : selon corps — `Maîtrise_Lance` (piquier), `Maîtrise_Épée` + `Maîtrise_Bouclier` (légionnaire), `Maîtrise_Hache` (corps lourd), `Maîtrise_Tir_Arc` (archer-soldat).
**Maîtrises secondaires** : `Maîtrise_Formation` (combat en unité), `Maîtrise_Survie_<Climat>` (campagnes), `Maîtrise_Siège` (palier Expert+).

## 3. Compétences spécifiques

- **Combat en formation** : bonus collectif quand les soldats sont coordonnés (pivot Maîtrise_Formation).
- **Marche forcée** : drainer Stamina sur trajet long sans se rompre.
- **Brèche et assaut** : techniques de pénétration de défense ennemie.
- **Tenue de ligne** : maintenir position face à charge — clé en bataille rangée.
- **Manœuvre de siège** : poser béliers, échelles, machines (Architecte / Menuisier en soutien).
- **Premiers secours militaires** : panser un blessé sur le champ (lien Médecin).
- **Discipline** : compétence narrative — un Soldat indiscipliné est puni.

## 4. Lieux d'exercice + équipement

**Lieux** : **caserne** (logement et entraînement), **camps de campagne** (provisoires, mobiles), **forteresses frontalières**, **champ de bataille**. Les **places d'armes** des grandes cités servent à la formation et aux revues.

**Équipement typique** :
- Uniforme du régiment (couleurs, blason).
- Arme principale selon corps.
- Bouclier (souvent).
- Armure : moyenne pour ligne, lourde pour corps d'élite.
- Sac de campagne (rations, gourde, couverture).
- Sifflet de corps / cor de bataille (officiers).

## 5. Paliers de Maîtrise

| Palier | Capacités combat / commandement |
|--------|--------------------------------|
| **Novice** | Recrue ; combat de base ; armes Communes |
| **Initié** | Soldat-piquier / légionnaire ; tier Inhabituel ; manie une formation |
| **Adepte** | Sergent ; commande 8-12 hommes ; tier Rare ; manœuvres simples |
| **Expert** | Capitaine ; commande une compagnie (50-100) ; tier Magistral ; tactique de bataille |
| **Maître** 🔒 | **Général de campagne** ; commande une armée ; tier Légendaire ; **œuvre signée** : une bataille gagnée chronique |

**Condition cachée 🔒** au Maître : avoir mené une victoire militaire majeure documentée (Scribe officiel) **sans coût démesuré pour ses hommes** (mémoire honorable).

## 6. Activités débloquées

- **Engagement régimentaire** : signer pour un régiment, salaire stable + part de butin.
- **Campagne de saison** : mission longue (1-2 ères) en frontière ou expédition.
- **Bataille rangée** : événement majeur, accessible aux joueurs Soldats lors de guerres de factions.
- **Siège** : assaut ou défense d'une cité (cf. [[Guildes]] §sièges).
- **Quêtes militaires d'ère** : événements scriptés selon Souffle (cf. [[L'Accord]]).
- **Garnison de territoire de guilde** : palier Adepte+, peut louer ses services à une [[Guildes|guilde]].

## 7. Carrière et progression

```
Recrue → Soldat → Caporal → Sergent → Capitaine
      → Major → Général
      → (alternative) Soldat-vétéran libre / Mercenaire
      → (alternative) Soldat-frère (ordre religieux militaire)
```

**Rivalités classiques** : Soldat vs Chevalier (la noblesse contre la masse), Soldat vs Garde (quel "vrai militaire"), Soldat vs Mercenaire (loyauté vs contrat). Soldat vs Archer (cf. [[#Archer|Archer §7]]).

**Décroissance** : `Maîtrise_Formation` se rouille fortement hors corps — un Soldat démobilisé perd vite son "réflexe d'unité". Les Maîtrises d'arme se conservent mieux si entretenues.

## 8. Modulation par contexte

**Par faction** :
- **Politiques** : armée régulière, Soldat archétypal.
- **Religieuses** : Soldat-frère, Soldat-paladin (combiné [[#Chevalier|Chevalier]] selon ordres).
- **Commerciales** : très rare — les consortiums préfèrent embaucher Mercenaires plutôt que d'entretenir armée.

**Par ère** : en **Ère de l'Effroi** ou en pleine guerre de factions, pic de recrutement. En **Ère lumineuse**, démobilisations massives (Soldats au chômage = Mercenaires émergents). Le Soldat est très sensible aux variations d'ère.

**Par karma** : Soldat **vert**. Un Soldat tuant hors mandat (kills NC sur civils) bascule jaune ou rouge — passible de cour martiale immédiate. Le pillage en campagne est gris (toléré ou puni selon discipline du corps).

## 9. Économie & Reconnaissance

**Solde** : recrue ~60 Éclats / semaine + rations + logement. Sergent ~200. Capitaine ~600. Général ~3 000+ avec part substantielle de butin et fiefs.

**Butin de bataille** : régulé par règlement de corps — partie au régiment, partie aux soldats, partie au général. Source de revenu non négligeable mais inégale.

**Gold sinks spécifiques** :
- Entretien d'armure et arme (plus important qu'un Garde car en campagne).
- Cotisations vétérans (caisse pour blessés et veuves).
- Solde des "frais de campagne" personnels.

**Reconnaissance** (privée) : forte interne au régiment et à la nation servie. **Renom** (public) : un Général Maître ayant gagné une bataille marquante peut entrer dans les chants — Renom durable, chanté par les Bardes. Cf. [[Registre des Décisions]] §D-GDD-RECONNAISSANCE.

## 10. Signatures PNJ + interactions joueur

**PNJ exemplaires** :
- Le Général d'une grande nation, vétéran de trois Souffles, qui sait encore reconnaître un piquier compétent à sa garde.
- Le sergent recruteur des places d'armes, premier contact pour quiconque veut s'engager.
- Le Soldat-frère d'un ordre religieux militaire, mêlant prière et discipline.

**Interactions joueur** :
- **Engagement direct** : un joueur peut **s'engager** comme Soldat dans un régiment — carrière collective.
- **Compagnon de bataille** : lors de [[PvP|guerres de factions]], les PNJ Soldats combattent aux côtés des joueurs alignés.
- **Donneur de quête** : missions militaires, escorte de convoi, défense de poste.
- **Métier joué** : carrière collective, peu de craft, beaucoup de combat de groupe. Pour joueur orienté guerre.

---

*Liens : [[Métiers]] | [[Personnage]] | [[Combat]] | [[Factions]] | [[Guildes]] | [[PvP]] | [[Économie]] | [[Registre des Décisions]]*
