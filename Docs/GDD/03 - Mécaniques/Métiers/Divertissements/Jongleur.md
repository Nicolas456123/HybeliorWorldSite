---
tags: [métier, archétype, divertissements, vivacité, présence]
type: archetype
category: Métier
catégorie_métier: Divertissements
stat_principale: Vivacité
stats_secondaires: [Présence, Acuité, Endurance]
craft_category: "-"
sources_ressources_accessibles: [Tissu, Cuir tanné, Bois, Pigment, Métal léger]
stations_principales: [Place publique, Préau, Tréteaux foraine, Atelier d'accessoires, Camp foraine]
outils_principaux: [Massues, Quilles, Foulards, Cerceaux, Anneaux, Boules de cristal, Bâton d'équilibre, Cartes truquées]
paliers_maîtrise: [Novice, Initié, Adepte, Expert, Maître]
métiers_complémentaires: [Acteur, Musicien, Barde, Tailleur, Cuisinier, Tavernier]
era_modulation: true
status: drafted
last_review: 2026-05-01
needs_review_for: [calibrage-buffs-public-playtest]
---

# 🤹 Jongleur — Archétype Métier

> *« Je n'invente rien. Le monde tombe déjà tout seul. Moi, je le rattrape — et je fais semblant que c'est facile. »*
> — **Tessa la Fugace**, jongleuse-prestidigitatrice de la troupe foraine Les Sept Cerceaux

---

## 1. Vue d'ensemble

Le **Jongleur** est le métier de **performance physique légère et ludique** : acrobaties, jonglerie, prestidigitation, animations de foule, tours de cartes, cracher de feu (palier Expert+). C'est l'**ouverture de spectacle** typique d'Hybelior : on attire la foule, on chauffe l'ambiance, puis viennent le [[Musicien]] et l'[[Acteur]].

Métier **itinérant** par nature : un jongleur tient rarement boutique. Il suit les **foires**, les **festivals**, les **mariages**, les **tavernes**. Il vit de la générosité du public et des contrats de troupes. Métier social, valorisant **Vivacité** et **Présence** — corps souple, charme immédiat.

> [!important] Frontières
> - **Jongleur** : performance physique + petits tours, animation visuelle. Pas de récit construit.
> - **[[Acteur]]** : performance narrative incarnée. Construit un personnage.
> - **[[Musicien]]** : performance sonore.
> - **[[Barde]]** : performance narrative orale + chant + transmission de [[Lore]].
>
> Une troupe foraine combine souvent les quatre. Un jongleur peut **monter** vers l'acteur ou le barde avec une seconde Maîtrise, mais l'inverse est rare (la jonglerie demande des automatismes corporels jeunes).

---

## 2. Stats brutes & Maîtrises associées

- **Stat principale** : **Vivacité** — coordination, vitesse de réaction, équilibre
- **Stats secondaires** :
  - **Présence** — charme de scène, capacité à attirer la foule
  - **Acuité** — précision des gestes, lecture du public, prestidigitation
  - **Endurance** — sets longs (1-3h de spectacle continu)
- **Maîtrise contextuelle** : `Maîtrise_Jonglerie` — progresse à chaque représentation publique réussie. Sous-spécialités à partir d'Adepte : Jonglerie classique / Acrobatie / Prestidigitation / Cracher de feu / Animation de foule.

→ Référence Couche 1 [[Personnage]] §Stats brutes. Maîtrise contextuelle [[Personnage]] §Couche 2.

---

## 3. Sources de ressources

**Consomme** (peu matériel, beaucoup de pratique) :
- **[[Tissu]]** — foulards, costumes ([[Tisserand]] / [[Tailleur]])
- **[[Cuir tanné]]** — sangles, masques légers
- **[[Bois]]** — quilles, massues, bâtons d'équilibre ([[Menuisier]])
- **[[Pigment]]** — costumes colorés
- **Métal léger** ([[Forgeron]]) — anneaux de jonglerie
- **[[Huile]]** — cracher de feu (Expert+)

**Produit** (output gameplay) :
- **Spectacles** — acte direct, récolte de pourboires + buffs publics
- **Buffs publics** — augmente la régen [[Labeur]] des spectateurs proches (mécanique cf. [[Métiers]] §Divertissements)
- **Réputation** — [[Reconnaissance]] et [[Renom]] (cf. [[L'Accord]] §Sources d'Accord §Contribution sociale)
- **Contrats** — engagements payés par tavernes, festivals, nobles

→ Pas de craft direct (`craft_category: -`). Output performatif.

---

## 4. Stations + outils

| Station | Rôle | Palier requis |
|---------|------|---------------|
| **Place publique** | Spectacle ouvert (chapeau au sol pour pourboires) | Novice |
| **Préau** | Spectacle abrité, public assis | Initié |
| **Tréteaux foraine** | Scène mobile installée pour foires/festivals | Adepte |
| **Atelier d'accessoires** | Confection / réparation des outils | Initié |
| **Camp foraine** | Lieu d'entraînement et de vie de troupe | Initié |
| **Cour royale** | Spectacle privé pour nobles, paie haute | Expert |

**Outils signature** :
- **Massues** — jonglerie d'expert
- **Quilles** — jonglerie classique
- **Foulards** — illusion, lenteur visuelle
- **Cerceaux** — acrobatie + jonglerie
- **Anneaux** — Adepte+
- **Boules de cristal** — prestidigitation
- **Bâton d'équilibre** — acrobatie aérienne
- **Cartes truquées** — prestidigitation, palier Adepte+

---

## 5. Paliers de Maîtrise

| Palier | Capacités débloquées |
|--------|----------------------|
| **Novice** | Jonglage à 3 objets, foulards, premiers tours de cartes. Public local restreint |
| **Initié** | Jonglage à 4-5 objets, premières acrobaties, prestidigitation simple. Buff public mineur (+5% régen Labeur 5 min) |
| **Adepte** | Jonglerie complexe, acrobatie chaînée, prestidigitation avancée, sous-spécialité déclarable. Buff public moyen (+10% régen Labeur 15 min) |
| **Expert** | Cracher de feu, acrobatie aérienne, animation de foule (place pleine). Buff public majeur (+15% régen Labeur 30 min, zone élargie) |
| **Maître** | **Condition cachée 🔒** — Numéro signé (Héritage), troupe formée (Disciples), invitation aux Cours royales et au festival d'Astravia |

> Décroissance : voir [[Armes et Maîtrise]] §Décroissance. Sans pratique régulière, le corps perd ses réflexes (rouille -15% accélérée chez le Jongleur — métier exigeant un entraînement quotidien).

---

## 6. Activités débloquées

| Palier | Exemples (3-5) |
|--------|----------------|
| **Novice** | Jongler à 3 quilles · Tour de cartes simple · Salto avant |
| **Initié** | Jongler à 4 massues · Acrobatie en duo · Tour de monnaie · Funambulisme bas |
| **Adepte** | Jongler 5+ objets · Acrobatie aérienne · Prestidigitation au tact · Cracher de feu basique |
| **Expert** | Numéro signature (animation foule 100+ personnes) · Cracher de feu maîtrisé · Funambulisme haut |
| **Maître** | **Œuvre signée** : Numéro nommé d'après le Jongleur (Héritage permanent), troupe légendaire fondée, invitation au festival d'Astravia |

---

## 7. Carrière et débouchés

- **Démarrage** : enfant de la rue, apprenti dans une troupe foraine, ou disciple d'un Maître Jongleur
- **Progression** : tournées régionales → grandes foires → cours royales
- **Établissement** :
  - **Jongleur de troupe** — appartenance à une troupe foraine, salaire + part des recettes
  - **Jongleur de cour** — engagement par un noble, salaire fixe + privilèges
  - **Jongleur indépendant** — itinérance permanente, vit de pourboires et contrats
  - **Maître de troupe** — possède sa propre compagnie (palier Maître)
- **Réseau** :
  - **Pair-troupe** : [[Acteur]], [[Musicien]], [[Barde]] (compagnie commune)
  - **Pair-amont** : [[Tailleur]] (costumes), [[Menuisier]] (accessoires bois), [[Forgeron]] (anneaux)
  - **Aval** : tavernes, [[Tavernier]], [[Aubergiste]], festivals, mariages
- **Faction** : Confrérie des Forains, troupes mythiques (Les Sept Cerceaux, Le Cirque des Vents), [[Foedus Animae]] (pacte des saltimbanques)

---

## 8. Modulation par contexte

| Contexte | Effet |
|----------|-------|
| **Ère [[Les Ères|Verdoiement]] (Terranu)** | Festivals abondants, demande x2, places ouvertes |
| **Ère [[Les Ères|Sommeil de Glace]] (Climata)** | Spectacles d'intérieur uniquement, demande baisse mais qualité monte (concentration sociale) |
| **Ère [[Les Ères|Vents]] (Aerion)** | Acrobatie aérienne valorisée, costume volant +10% effet visuel |
| **Ère [[Les Ères|Brume Mortelle]]** | Spectacles raréfiés (rassemblements limités), troupes itinérantes en péril |
| **Post-[[Le Souffle]] semaine 1** | Demande de divertissement x3 (la communauté a besoin de respirer) |
| **[[L'Accord]] ≥ 75%** | Numéro signature débloqué |
| **[[L'Accord]] = 100%** | Œuvre signée : Numéro nommé d'après le Jongleur (Héritage, [[L'Accord]] §Héritage) |
| **Religion [[Risus]] / [[Laetitia]] (Éthérés)** | Bonus naturel sur les performances joyeuses |
| **Festival mondial** | Buff public x2, [[Reconnaissance]] accélérée |

---

## 9. Économie

**Gold sinks générés** :
- Costumes ([[Tailleur]]) : 100-1 000 Éclats / set
- Accessoires : 50-500 Éclats (bois, métal, cristal)
- [[Huile]] pour cracher de feu : 30 Éclats / session
- Cotisation troupe : 10% des recettes
- Voyage / [[Cartographe]] (itinérance) : 50-200 Éclats / déplacement

**Prix indicatifs** :
- Pourboires (place publique) : 1-50 Esquilles / spectacle (très variable)
- Spectacle privé (taverne) : 20-100 Éclats / soirée
- Mariage / fête noble : 500-5 000 Éclats / engagement
- Cour royale : 5 000-50 000 Éclats / saison (Maître+)
- Œuvre signée Maître : Héritage social principalement

**Chaîne économique** :
```
[[Tailleur]] / [[Menuisier]] / [[Forgeron]] (matériel) → Jongleur (Performance)
                                                       ↘ Public (pourboires, Reconnaissance)
                                                       ↘ [[Tavernier]] (engagement)
                                                       ↘ Festivals (cachet)
                                                       ↘ Cours royales (saison)
                                                       ↘ Buff [[Labeur]] aux spectateurs
```

---

## 10. Comportement IA / signatures PNJ

> *Modèle IA pas tranché — voir [[Concepts Fondamentaux IA PNJ]]. Indication gameplay seul.*

**Cycle quotidien typique** :
- 09:00 lever (rythme tardif des spectacles) — entraînement physique 1h
- 10:00-12:00 — répétition de numéros, prestidigitation
- 12:00-13:00 — repas
- 13:00-15:00 — déambulation publique, animation de marché (Initié+)
- 15:00-17:00 — repos / préparation
- 18:00-22:00 — spectacle du soir (taverne, festival, place)
- 22:00-00:00 — vie de troupe, partage des recettes

**Signatures de PNJ archétypaux** :
- **Le jongleur des marches** — gypsy, itinérant, pas de propriété, sourire constant
- **La saltimbanque acrobate** — corps tatoué, agilité féline, prestige discret
- **Le bouffon de cour** — costume bigarré, ironie permanente, sait tout sans le dire
- **Le maître de troupe** — manage 5-15 forains, gère les contrats et les voyages
- **Le cracheur de feu** — aux foires nocturnes, mystique mineure

**PNJ célèbres dans le monde** *(à étoffer Phase 4)* :
- *Tessa la Fugace, jongleuse-prestidigitatrice des Sept Cerceaux* (cf. citation d'ouverture)
- *Maître Olbric, fondateur du Cirque des Vents* — troupe légendaire sur 4 ères
- *Le Bouffon Pâle de Galenor* — bouffon de cour, sait des secrets de royaume

---

*Liens : [[Métiers]] · [[Personnage]] · [[Crafts]] · [[Économie]] · [[Armes et Maîtrise]] · [[L'Accord]] · [[Le Souffle]] · [[Les Ères]] · [[Labeur]] · [[Acteur]] · [[Musicien]] · [[Barde]] · [[Tailleur]] · [[Tavernier]] · [[Aubergiste]]*
