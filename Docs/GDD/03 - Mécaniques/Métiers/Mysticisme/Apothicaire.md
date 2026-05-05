---
tags: [métier, archétype, mysticisme, remèdes, mémoire, acuité]
type: archetype
category: Métier
catégorie_métier: Mysticisme
stat_principale: Mémoire
stats_secondaires: [Acuité, Verbe, Endurance]
voie_magique: -
religion_compatible: [Vael Kurash, Foedus Animae, Ignis Aeternum]
craft_category: Alchimie (légère, T1-T3)
sources_ressources_accessibles: [Plante médicinale, Eau pure, Cire, Cendre, Sel, Sang créature commune]
stations_principales: [Officine, Mortier et alambic léger, Comptoir d'apothicaire, Cabinet de consultation]
outils_principaux: [Mortier et pilon, Alambic léger, Bocaux scellés, Carnet de remèdes]
paliers_maîtrise: [Novice, Initié, Adepte, Expert, Maître]
karma_typique: vert
factions_compatibles: [Guildes d'apothicaires, Vael Kurash, Foedus Animae]
era_modulation: true
status: drafted
last_review: 2026-05-01
needs_review_for: [frontière-alchimiste-précise, gamme-T4-T5-apothicaire, signatures-régionales-phase4]
---

# 💊 Apothicaire — Archétype Métier

> *"L'Alchimiste cherche l'inconnu. Moi, je vends ce que ta grand-mère savait déjà : la sanguinaire pour le sang qui coule, la mousse pour la fièvre, la cendre pour la plaie qui s'infecte. Je ne réinvente rien — je conserve."*
> — **Maître Velia**, Apothicaire de Galenor central

---

## 1. Vue d'ensemble

L'**Apothicaire** est le préparateur de **remèdes traditionnels** d'Hybelior — médecine artisanale **codifiée, transmise, et respectée**. Là où l'**[[Alchimiste]]** (M4 Érudition) explore l'inconnu (potions exotiques, transmutations, recettes expérimentales, parfois dangereuses), l'Apothicaire **conserve un savoir éprouvé** : remèdes de grand-mère, baumes contre les plaies, antidotes courants, sirops apaisants, onguents.

L'Apothicaire est **culturellement respectable** — son officine est un lieu social du village ou du quartier, ouvert à tous, transparent. L'Alchimiste, à l'inverse, opère souvent dans un **laboratoire mystérieux**, ses recettes sont parfois secrètes, et son karma est plus volatile.

Mécaniquement, l'Apothicaire **partage les recettes T1-T3 avec l'Alchimiste** (cf. [[Potion]] §6). Au-delà du tier 3, l'Alchimiste prend le relais avec ses recettes plus complexes, mais l'Apothicaire conserve ses **spécialités traditionnelles** (remèdes signés, compléments alimentaires, savoirs régionaux). Métier-pivot **terrestre-mystique** : il ne nécessite **pas de Lien magique** mais peut profiter d'un Lien Spiritus pour amplifier la qualité.

→ Référence [[Potion]] §6 (recettes T1-T3 partagées), [[Alchimiste]] (frontière), [[Herboriste]] (intrants), [[Guérisseur]] (clientèle).

---

## 2. Stats brutes & Maîtrises associées

- **Stat principale** : **Mémoire** — répertoire de remèdes traditionnels, recettes ancestrales, posologies
- **Stats secondaires** :
  - **Acuité** — précision du dosage, identification de qualité d'intrants, mini-jeu d'alchimie
  - **Verbe** — conseil aux patients, prescription, apaisement (rôle quasi-Médecin populaire)
  - **Endurance** — journées longues à l'officine, mortier et pilon
- **Maîtrises contextuelles** :
  - `Maîtrise_Apothicairerie` — sous-maîtrise contextuelle des remèdes traditionnels
  - `Maîtrise_Alchimie` (T1-T3 partagée avec [[Alchimiste]] — au-delà, ne progresse plus chez l'Apothicaire)
  - `Maîtrise_Herboristerie` (souvent secondaire — beaucoup d'Apothicaires sont aussi [[Herboriste]] basique)

> **Formule canonique** : `Mémoire × Maîtrise_Apothicairerie × Acuité` (qualité de remède).

---

## 3. Voie magique principale + religion (optionnelles)

L'Apothicaire est un métier **principalement terrestre** — pas de Voie active obligatoire. Mais des profils mystiques existent :

### Apothicaire-Lié à Spiritus (rare)

- Voie de Spiritus optionnelle
- Religion : [[Lore/Religions/Vael Kurash\|Vael'Kurash]]
- Bonus : récolte/préparation rituelle des plantes plus efficace, +20% qualité
- Karma : **vert**

### Apothicaire de tradition Foedus Animae

- Pas de Voie obligatoire
- Religion : [[Lore/Religions/Foedus Animae\|Foedus Animae]]
- Spécialité : remèdes funéraires, baumes de conservation, élixirs de paix pour mourants
- Karma : **vert**

### Apothicaire de tradition Ignitari

- Religion : [[Lore/Religions/Ignis Aeternum\|Ignis Aeternum]] (rare)
- Spécialité : pommades de brûlure, baumes de forge, antidotes au monoxyde
- Karma : **vert**

### Apothicaire profane (le plus fréquent)

- Pas de Voie, pas de religion particulière
- Métier de quartier ou de village
- Karma : **vert**

---

## 4. Sources / composantes

**Consomme** (intrants principaux) :
- **Plante médicinale** (collab [[Herboriste]] — fournisseur principal) — Hémostine, Sanguinaire, Mousse-de-Lumière
- **Eau pure** — base de toute décoction
- **Cire** — onguents, baumes, scellage de pots
- **Cendre fine** — antiseptique traditionnel, base de poudres
- **Sel** — conservation
- **Sang créature commune** (lapin, cerf) — pour Potion de Soin T2 (cf. [[Potion]] §6.2)
- **Émulsion alchimique** (intrant intermédiaire, partagé avec Alchimiste)
- **Fiole de verre** — récipient

**Produit** :
- **Potion de Soin T1-T3** (cf. [[Potion]] §3.1, §6.1-6.3) — **partagé avec [[Alchimiste]]**
- **Antidote T1-T3** (cf. [[Potion]] §3.4)
- **Onguent** — application cutanée, soin léger continu
- **Sirop** — boisson médicinale, durée prolongée
- **Pommade** — soin de plaie, anti-infection
- **Cataplasme** — application pour fracture/contusion (collab [[Médecin]])
- **Tisane médicinale** — buff léger sur durée
- **Compléments traditionnels** — sels minéraux, poudres digestives

→ Référence [[Potion]] §6 (recettes), [[Sources de Ressources]] §Plantes + §Fluides.

---

## 5. Stations + outils

| Station | Rôle | Palier requis |
|---------|------|---------------|
| **Officine** | Boutique-atelier urbain, lieu social respectable | Initié |
| **Mortier et pilon** | Broyage des plantes et minéraux | Novice |
| **Alambic léger** (T1-T3) | Distillation simple ; au-delà, requiert l'alambic d'Alchimiste | Initié |
| **Cuve à eau chaude** | Décoction de base | Novice |
| **Comptoir d'apothicaire** | Vente directe, consultation rapide | Initié |
| **Cabinet de consultation** | Examen patient (collab souvent [[Médecin]]) | Adepte |

**Outils** :
- **Mortier et pilon** — outil signature
- **Alambic léger** — distillation T1-T3
- **Bocaux scellés** — conservation onguents et poudres
- **Carnet de remèdes** — répertoire familial transmis (cf. [[Tome]] §Codex de savoir)

---

## 6. Paliers de Maîtrise

| Palier | Capacités débloquées |
|--------|----------------------|
| **Novice** | Décoction simple T1 (cf. [[Potion]] §6.1), antidote commun, onguent basique. Reconnaissance des 15 plantes médicinales communes. Échec ~15%. |
| **Initié** | Élixir vermeil T2, antidote raffiné, sirop, cataplasme. 30 plantes connues. Échec ~7%. Ouverture d'officine possible. |
| **Adepte** | Baume sanguin T3, antidote pur, eau-de-vie cendrée (T4 partiel — limite Apothicaire), pommade rituelle, encens médicinal. 50 plantes. Proc qualité Magistrale 5%. |
| **Expert** | **Spécialités traditionnelles signées** (recettes ancestrales locales transmises uniquement chez les Apothicaires : *Sirop des Trois Vallées*, *Onguent de la Forge*, *Cataplasme du Pacte*). Ne progresse plus dans l'Alchimie haut tier (réservée Alchimiste). |
| **Maître** | **Condition cachée 🔒** — Œuvre signée (remède transmis 3 générations, signature familiale). Lignée d'apothicaires établie. **Pas de tier 6 magique** — c'est l'Alchimiste qui produit Mythique. |

> [!important] Plafond de tier de l'Apothicaire
> L'Apothicaire **plafonne au tier 3-4 expérimental** sur les recettes alchimiques. Le tier 5 (Larme de Lumière) et 6 (Sève de l'Aube Nouvelle) sont **réservés à l'[[Alchimiste]] Maître** (cf. [[Potion]] §6.5-6.6 : station = Cucurbite + Cercle d'enchantement, intrants rituels, Voie d'Eldoria requise). L'Apothicaire compense par ses **spécialités traditionnelles signées** (qualité narrative, pas magique).

---

## 7. Recettes/préparations par palier

| Palier | Préparations |
|--------|--------------|
| **Novice** | *Décoction simple* (Potion de Soin T1 [[Potion]] §6.1), *Antidote commun* T1, *Onguent de Sanguinaire* (soin cutané) |
| **Initié** | *Élixir vermeil* (Potion T2 [[Potion]] §6.2), *Antidote raffiné* T2, *Sirop apaisant* (régen sommeil), *Cataplasme* (collab Médecin) |
| **Adepte** | *Baume sanguin* (Potion T3 [[Potion]] §6.3), *Antidote pur* T3, *Eau-de-vie cendrée* (T4 partiel, dispel mineur), *Pommade rituelle* (collab Prêtre) |
| **Expert** | *Sirop des Trois Vallées* (signature régionale Galenor), *Onguent de la Forge* (signature Ignitari Cendara), *Cataplasme du Pacte* (signature Foedus Animae Torkam), *Tisane des veilleurs* (buff Acuité 6h) |
| **Maître** | **Œuvre signée** : recette familiale transmise (ex. *Onguent de la Lignée Velia*, *Sirop des Sept Souffles*). Non transposable à un autre Apothicaire sans pacte de transmission. |

→ Cross-réf [[Potion]] §6 (recettes T1-T3 partagées), [[Alchimiste]] (T4-T6 séparées).

---

## 8. Carrière et débouchés

- **Apprentissage** — souvent en famille (lignée d'apothicaires) ou auprès d'un Maître local (3-5 ans)
- **Établissement** — ouverture d'officine (urbain) ou installation rurale (cabinet)
- **Spécialisation** — apothicaire de quartier (clientèle stable, faible marge), apothicaire de campagne (couvre une vallée, médecine populaire), apothicaire de cour (rente noble, prestige)
- **Réseau** — alliance étroite avec [[Herboriste]] (intrant principal), [[Médecin]] (collaboration patient), [[Cuisinier]] (compléments alimentaires), [[Marchand]] (vente régionale), [[Prêtre]] (rituels conjoints)
- **Reconnaissance** — fidélisation clientèle, transmission familiale, parfois nomination guilde d'apothicaires
- **Maîtrise** — Œuvre signée, lignée d'apothicaires reconnue (titre **Maître-Apothicaire de la Vallée X**)

### Sous-spécialisations canoniques (Role.csv)

> Source canonique : `Role.csv` (cat 8 — Mysticisme). Ce rôle correspond à un **palier Maître+** absorbé du legacy AccessExport.

#### Sous-spécialisation Maître+ : Maître apothicaire

> Source canonique : `Role.csv` (cat 8, role n°38).

- **Description** : titre canonique du palier 5 — Apothicaire reconnu d'envergure régionale, fournisseur officiel d'une cour, d'une guilde médicale ou d'une armée. Œuvre signée (potion ou onguent canonique) déposée. Forme des apprentis et tient une lignée d'officine.
- **Conditions** : palier Maître + Œuvre signée + ≥ 1 officine majeure ou contrat noble/militaire + Reconnaissance ≥ Adepte régionale + 🔒 condition cachée (avoir contré une épidémie OU produit un antidote unique pour un poison rare).
- **Notes** : équivalent direct de **Maître-Apothicaire de la Vallée X** dans l'échelle d'évolution (§8). Frontière forte avec [[Alchimiste]] (potions complexes), [[Herboriste]] (intrants) et [[Médecin]] (collaboration patient).

---

## 9. Modulation par contexte

| Contexte | Effet |
|----------|-------|
| **Ère du Verdoiement** ([[Les Ères]]) | +20% rendement (intrants abondants), prix baisse |
| **Ère du Sommeil de Glace** | −20% rendement, focus remèdes hivernaux, prix x1.5 |
| **Ère de la Brume Mortelle** | Antidotes très demandés, prix x3, +50% Reconnaissance si fournisseur fiable |
| **Post-[[Le Souffle]]** | Demande de remèdes en pic (1 semaine), prix x2, opportunité économique |
| **[[L'Accord]] ≥ 75%** | Spécialités signées débloquées plus tôt |
| **Religion alignée** ([[Lore/Religions/Vael Kurash\|Vael'Kurash]] surtout) | +Reconnaissance, accès recettes rituelles |
| **Faction noble protectrice** | Rente, prix garantis, clientèle premium |
| **Guilde d'apothicaires** | Mutualisation, recettes partagées, prix marché |
| **Concurrence Alchimiste local** | Frontière respectée : Apothicaire = traditionnel ; Alchimiste = expérimental |

**Karma typique** : **vert** systématiquement. Bascule **jaune** uniquement si :
- Vente de poisons à des [[Assassin]] (collab grise)
- Falsification de remèdes (réputation détruite)
- Recettes hallucinogènes massives (frontière Vigili Somnium Vigil)

---

## 10. Économie + Signatures PNJ

**Gold sinks générés** :
- Mortier et pilon de qualité : 200-2 000 Éclats
- Alambic léger : 5 000-30 000 Éclats
- Loyer officine urbaine : 500-5 000 Éclats / mois
- Stock plantes (achat Herboriste) : volume variable, 100-10 000 Éclats / mois
- Carnet de remèdes signé : 1 000-50 000 Éclats (achat héritage)

**Revenus typiques** :
- Décoction simple T1 : 10-50 Éclats
- Élixir vermeil T2 : 50-200 Éclats
- Baume sanguin T3 : 200-1 000 Éclats
- Antidote pur T3 : 300-1 500 Éclats
- Spécialité signée Expert (sirop Trois Vallées) : 500-5 000 Éclats
- Œuvre signée Maître : 5 000-100 000 Éclats / unité (rare, demandé)
- Consultation simple : 20-200 Éclats
- Rente noble (apothicaire de cour) : 5 000-50 000 Éclats / mois

**Chaîne économique** :
```
[[Herboriste]] (Plantes médicinales) → Apothicaire (Remèdes T1-T3)
[[Bûcheron]] / [[Mineur]] (Cire, Cendre, Sel) → Apothicaire
Apothicaire → Population générale (clientèle de masse)
            → [[Médecin]] (collaboration cataplasmes/pommades)
            → [[Marchand]] (export régional)
            → [[Aubergiste]] / [[Tavernier]] (sirops digestifs)
Apothicaire ↔ [[Alchimiste]] : frontière respectée (T3 max vs T4-T6)
```

**Signatures PNJ archétypaux** :
- **L'Apothicaire de quartier** — sédentaire urbain, clientèle stable, double-casquette parfois [[Médecin]]
- **L'Apothicaire rural** — couvre une vallée, charrette mensuelle, transmis en famille
- **L'Apothicaire de cour** — rente noble, recettes signées, prestige social, conseiller royal
- **L'Apothicaire-Vael'Kari** — chamane traditionnel d'Alkaran, double-casquette [[Herboriste]]
- **L'Apothicaire Ignitari** — spécialiste pommades de brûlure, près des temples-forges de Pyrtara/Cendara

**PNJ célèbres dans le monde** *(à étoffer Phase 4)* :
- *Maître Velia* — Apothicaire de Galenor central, créatrice de l'*Onguent de la Lignée Velia*
- *Maître Drevon de Cendara* — Apothicaire Ignitari, fournit toute la guilde des forgerons
- *Mère Helga d'Ulinor* — apothicaire-Vael'Kari, dernière détentrice du *Sirop des Sept Souffles* (signature transmise depuis 5 générations)

---

*Liens : [[Métiers]] · [[Personnage]] · [[Potion]] · [[Sources de Ressources]] · [[Alchimiste]] · [[Herboriste]] · [[Médecin]] · [[Guérisseur]] · [[Cuisinier]] · [[Prêtre]] · [[Tome]] · [[Économie]] · [[L'Accord]] · [[Le Souffle]] · [[Les Ères]] · [[Lore/Religions/Vael Kurash]] · [[Lore/Religions/Foedus Animae]] · [[Lore/Religions/Ignis Aeternum]]*
