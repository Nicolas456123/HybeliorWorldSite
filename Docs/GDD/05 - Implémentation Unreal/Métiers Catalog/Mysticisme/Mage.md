---
tags: [métier, archétype, mysticisme, magie, esprit, résonance]
type: archetype
category: Métier
catégorie_métier: Mysticisme
stat_principale: Esprit
stats_secondaires: [Résonance, Conscience, Mémoire]
voie_magique: variable (mono-Voie selon [[Le Lien]])
religion_compatible: [variable selon Voie]
craft_category: -
sources_ressources_accessibles: [Cristal de Voie, Essence spirituelle, Encre rare, Parchemin enchanté]
stations_principales: [Cercle d'enchantement, Sanctuaire de Voie, Pupitre de Mage, Lieu cosmique]
outils_principaux: [Sceptre, Tome, Anneau runique, Bandeau frontal]
paliers_maîtrise: [Novice, Initié, Adepte, Expert, Maître]
karma_typique: variable (selon Voie)
factions_compatibles: [Conclave d'Astravia, Cercles de Voie locaux, Académies magiques]
era_modulation: true
status: drafted
last_review: 2026-05-01
needs_review_for: [équilibrage-mono-voie-playtest, signatures-par-voie-phase4]
---

# 🔮 Mage — Archétype Métier

> [!info] Entités tutélaires canoniques
> Selon la Voie : **[[Cosmologie|Aurion]]** (Céleste — *Maître des énergies éthérées*), **[[Cosmologie|Aerion]]** (Cosmique — vents), **[[Cosmologie|Vortex]]** (Cosmique — tempêtes cosmiques), **[[Cosmologie|Etherius]]** (Cosmique — *Sage de l'éther*, influence subtile), **[[Cosmologie|Aetheron]]** (Cosmique — éther universel). Voir [[Cosmologie]] §"Liste canonique des entités cosmiques". Source : `AccessExport/Legende.csv` (D-COSMO-LEGENDE-CSV-INTEGRATION).

> *"Je ne lance pas de sorts. Je laisse passer une force plus grande que moi à travers ma chair, et j'apprends à ne pas me consumer en chemin."*
> — **Veylar de l'Aurion**, mage-itinérant d'Astravia

---

## 1. Vue d'ensemble

Le **Mage** est le pratiquant magique générique d'Hybelior — un **Lié** au sens canonique de [[Le Lien]]. Contrairement aux représentations classiques, le Mage d'Hybelior n'invente pas la magie : il **canalise une force cosmique** via un Lien forgé avec une entité (Éternel ou Cosmique). Son identité magique est entièrement définie par sa **Voie active**, et la règle **mono-Voie** garantit qu'aucun mage ne ressemble à un autre.

Le Mage se distingue des autres archétypes mystiques par sa **versatilité** au sein de sa Voie : là où le [[Prêtre]] sert une religion, le [[Guérisseur]] soigne, le [[Nécromancien]] manipule la mort, le [[Oracle]] prédit — le Mage *explore l'amplitude entière* de sa Voie en combat, en exploration, en rituel. C'est l'archétype le plus large, le plus libre, et celui qui sert de **base structurelle** aux autres métiers magiques (un Nécromancien est, mécaniquement, un Mage de Noctis ou Tempora avec une coloration culturelle).

Ancrage cosmique : voir [[Cosmologie]] §Éternels et §Cosmiques. Mécanique magique : voir [[Le Lien]].

---

## 2. Stats brutes & Maîtrises associées

- **Stat principale** : **Esprit** — capacité magique brute, mana max, complexité de sorts (cf. [[Personnage]] §Stats brutes)
- **Stats secondaires** :
  - **Résonance** — intensité de canalisation, puissance et durée des sorts
  - **Conscience** (Couche 0) — perception du Lien, seuil minimum pour canaliser
  - **Mémoire** — apprentissage des sorts, identification des grimoires, reconnaissance des composantes
- **Maîtrise contextuelle** : `Maîtrise_Voie_<Nom>` — une seule active à la fois (mono-Voie). Progresse à chaque sort lancé. Décroît si le Lien n'est pas entretenu (cf. [[Le Lien]] §Rupture du Lien).

> **Formule canonique des dégâts magiques** : `Esprit × Résonance × Maîtrise_Voie` (cf. [[Personnage]] §Tableau des effets).

→ Référence Couche 1 [[Personnage]]. Maîtrise contextuelle : [[Personnage]] §Couche 2.

---

## 3. Voie magique principale + religion

Le Mage est défini par **sa Voie active** — c'est l'axe identitaire central du métier. Les **13 Voies canoniques** (5 Éternels + 8 Cosmiques magiques) sont autant de spécialisations potentielles, chacune mappée à une ou plusieurs religions.

### Voies des Éternels (les plus rares et puissantes)

| Voie | Religion principale | Karma typique | Profil de Mage |
|------|---------------------|---------------|----------------|
| **Celestia** | [[Lore/Religions/Ordo Caelum\|Ordo Caelum]] | vert | Mage-érudit, vue à distance, protection |
| **Tempora** | [[Lore/Religions/Rota Mundi\|Rota Mundi]] | jaune | Mage temporel, rare depuis la blessure de Tempora |
| **Noctis** | [[Lore/Religions/Noctari\|Noctari]] | jaune à rouge | Mage de l'ombre, espionnage, drain |
| **Navigor** | [[Lore/Religions/Via Ventus\|Via Ventus]] | jaune | Mage-passeur, **quasi-disparu** depuis l'Arrachement |
| **Eldoria** | [[Lore/Religions/Ignis Aeternum\|Ignis Aeternum]] | vert | Mage de lumière pure (chevauche [[Guérisseur]]) |

### Voies des Cosmiques (plus accessibles)

| Voie | Religion principale | Karma typique | Profil |
|------|---------------------|---------------|--------|
| **Aquor** | mineure (Onara) | vert | Mage des eaux, courants, glace |
| **Aerion** | [[Lore/Religions/Via Ventus\|Via Ventus]] | vert | Mage du vent, vol, tempête |
| **Aurion** | [[Lore/Religions/Somnium Vigil\|Somnium Vigil]] | vert | Mage arcanique pur |
| **Umbra** | [[Lore/Religions/Noctari\|Noctari]] | jaune | Mage furtif, illusions |
| **Spiritus** | [[Lore/Religions/Vael Kurash\|Vael'Kurash]] | vert | Mage de la nature (chevauche [[Guérisseur]] et [[Herboriste]]) |
| **Fatum** | [[Lore/Religions/Foedus Animae\|Foedus Animae]] | jaune | Mage des destins (chevauche [[Oracle]]) |
| **Terranu** | [[Lore/Religions/Lex Petra\|Lex Petra]] | vert | Mage de la terre, fertilité, pierre |
| **Somnix** | [[Lore/Religions/Somnium Vigil\|Somnium Vigil]] | jaune | Mage des rêves, illusions mentales |

> [!important] Mono-Voie absolue
> Un Mage n'a **qu'une seule Voie active** à la fois. Changer de Voie nécessite le **rituel de rupture** ([[Le Lien]] §Rupture) : 3 jours sans canaliser, perte totale de la Maîtrise précédente, 100 pts Labeur. Cela fait de chaque Mage une **identité magique forte** plutôt qu'un menu de sorts.

> [!note] Mage non religieux
> Un Mage peut pratiquer sa Voie **sans appartenance religieuse** — c'est l'approche dite *"académique"* d'Astravia. Sa Voie reste dictée par le Lien, mais sa lecture culturelle est neutre (ni dogme, ni rite obligatoire). Voir [[Lore/Religions/00 - Système Religieux]] §Syncrétisme.

---

## 4. Sources / composantes

**Consomme** :
- **Cristal de Voie** (mineur / standard / majeur / apex) — composant rituel principal, sertissable dans focus
- **Essence spirituelle** — drop de créatures cosmiques, distillation par [[Alchimiste]] ou Spiritualistes
- **Encre rare** — pour grimoires et inscriptions
- **Parchemin enchanté** — support des sorts encapsulés (cf. [[Tome]])
- **Cœur de créature cosmique** — composant rare pour rituels Apex

**Produit** (en collaboration avec d'autres métiers) :
- **Enchantement de Voie** sur arme/armure (collab [[Enchanteur d'objet]] §Enchanteur du vivant pour vivants)
- **Sorts encapsulés** dans [[Tome]] et [[Anneau]] runique
- **Rituels exécutés** — services magiques rémunérés (rupture de malédiction, scellement, divination)

→ Référence [[Sources de Ressources]] §Cristal de Voie + §Essence spirituelle.

---

## 5. Stations + outils

| Station | Rôle | Palier requis |
|---------|------|---------------|
| **Cercle d'enchantement** | Inscription rituelle, recharge Mana en méditation prolongée | Initié |
| **Sanctuaire de Voie** | Lieu consacré à 1 Voie spécifique — bonus +20% efficacité rituel | Adepte |
| **Pupitre de Mage** | Étude des grimoires, recherche de sorts | Novice |
| **Lieu cosmique** (Brèche, Sanctuaire d'Éternel) | Rituel Apex / Lien profond | Maître |

**Outils principaux** :
- **Sceptre** — arme magique amplificatrice (DPS magique direct, voir [[Tome]] §Synergie)
- **Tome de Voie** — sorts encapsulés ([[Tome]])
- **Anneau runique** — bonus passif sur Voie ([[Anneau]] §5)
- **Bandeau frontal** — focus discret, +Mémoire, −10% temps incantation

→ Référence [[Tome]], [[Anneau]], [[Items/Index]] §Focus magiques.

---

## 6. Paliers de Maîtrise

| Palier | Capacités magiques débloquées |
|--------|-------------------------------|
| **Novice** | Sort Mineur de la Voie, coût Mana standard, durée incantation 3s. Mana max ≈ Conscience + Esprit × 1.5. Risque de **rétrofeu** sur échec critique (5%). |
| **Initié** | 2-3 sorts Mineur, sort Standard accessible. Coût Mana −10%. Régen Mana +1/s hors combat. Inscription sur Tome possible. |
| **Adepte** | 4-5 sorts (Mineur+Standard), 1 sort Majeur accessible. Cercle d'enchantement débloqué. Désinscription/réinscription possible. |
| **Expert** | 5-7 sorts dont 2-3 Majeurs. 1 sort Apex accessible (conditionnel Accord ≥75%). Réactions de Voie maîtrisées (cf. [[Le Lien]] §Réactions). |
| **Maître** | **Condition cachée 🔒** — Sort Apex maîtrisé + 1 sort *Lien profond* (rituel cosmique). Possibilité de **fusionner partiellement** avec l'entité (cf. [[Le Lien]] §Lien profond). Œuvre signée de Voie. |

> Décroissance : un Lien non entretenu **rouille** → −15% efficacité après 1 semaine sans usage. Un Lien rompu (rupture rituelle ou abandon) tombe à 0.

---

## 7. Sorts/rituels débloqués par palier

> Catalogue indicatif. Détail complet dans les fiches Voie dédiées (Phase 4) et [[Tome]] §5 Mapping Voies.

| Palier | Type d'effet | Exemples (génériques inter-Voies) |
|--------|--------------|-----------------------------------|
| **Novice** | Sort Mineur (60-100 pts Mana, dégâts/effet faibles) | Trait élémentaire, illumination courte, lecture mineure |
| **Initié** | Sort Standard (150-250 pts), 1 rituel hors combat | Bouclier 30s, soin mineur, vision étendue 5min, enchantement temporaire d'arme (15s) |
| **Adepte** | Sort Majeur (400-500 pts), rituel d'inscription Tome | Sort de zone, soin moyen, invocation temporaire (Spiritus), sort signature de Voie |
| **Expert** | Sort Apex (700-900 pts), rituel rupture/scellement | Tempête de Voie, soin de groupe, sort Apex (cf. [[Tome]] §5), rituel de scellement de zone |
| **Maître** | Sort *Lien profond* (1500+ pts, condition cosmique) | Marche dans l'ombre permanente (Noctis), ouverture de passage longue distance (Navigor), rayon créateur (Eldoria)... |

→ Cross-réf [[Tome]] §5 (sorts emblématiques par Voie), [[Anneau]] §5 (effets passifs par Voie), [[Potion]] §3.2 (régen Mana du Mage).

---

## 8. Carrière et progression spirituelle

- **Découverte** — trouver le premier fragment de Lien (grimoire caché, PNJ initiateur, condition cachée). Voir [[Le Lien]] §Système indépendant.
- **Premier Contact** — établir le Lien. Le Mage ressent la force pour la première fois — peut être traumatisant.
- **Apprentissage** — maîtriser le sort Mineur, comprendre le coût Mana, le timing.
- **Élargissement** — débloquer les sorts Standard, fréquenter un Sanctuaire de Voie, parfois un mentor PNJ.
- **Reconnaissance** — devenir un *Lié reconnu* dans une région ou une faction (Conclave d'Astravia, Cercle de Voie local, ordre religieux).
- **Maîtrise** — sort Apex maîtrisé, **Œuvre signée** de Voie, parfois nomination à un siège Éthéré (cf. [[Cosmologie]] §Sièges, sièges *Arcana*, *Luxa*).
- **Lien profond** 🔒 — fusion partielle avec l'entité. Rare et risquée. Peut transformer le personnage (changements physiques, longévité accrue, marques d'entité).

**Réseau** : Liés de la même Voie (cercles de soutien), Liés de Voies affines (synergies combat — voir [[Le Lien]] §Réactions), [[Enchanteur d'objet]] (clients pour cristaux), [[Bibliothécaire]] (grimoires).

### Sous-spécialisations canoniques (Role.csv)

> Source canonique : `Role.csv` — quatre rôles canoniques se rattachent au Mage (palier Maître+). Mélange catégories 5 (Sécurité — frontière) et 8 (Mysticisme).

#### Sous-spécialisation Maître+ : Archimage

> Source canonique : `Role.csv` (cat 8, role n°33).

- **Description** : titre canonique du palier 5 — Mage reconnu comme l'autorité absolue d'une Voie ou d'un cercle. Maîtrise au moins 1 sort Apex, possède une Œuvre signée et siège souvent à un Conclave.
- **Conditions** : palier Maître + ≥ 1 Voie maîtrisée à fond + 1 Œuvre signée déposée + Reconnaissance ≥ Expert + 🔒 condition cachée (Lien profond OU nomination à un siège Éthéré).
- **Notes** : équivalent direct de la *Maîtrise* dans la progression spirituelle (§8). Figure de référence pour les apprentis Liés.

#### Sous-spécialisation Maître+ : Chef de tour de mage

> Source canonique : `Role.csv` (cat 5 — Sécurité, role n°22).

- **Description** : Mage-Maître dirigeant une **Tour de mages** (institution mi-école, mi-garnison arcanique) — coordonne les Liés en service de la nation, supervise apprentis, assure la **défense magique** d'une cité.
- **Conditions** : palier Maître + investiture par le souverain ou le Conclave + ≥ 1 tour ou école sous direction + 🔒 condition cachée (avoir défendu la tour contre une menace cosmique OU formé ≥ 3 Mages-Adeptes).
- **Notes** : `[REFONTE-NEEDED — frontière Sécurité (cat 5 CSV) / Mysticisme : la Tour de mage est un métier de Mysticisme avec fonction de Sécurité. Pluri-rôle Mage-Maître + fonction militaire/défensive.]`

#### Sous-spécialisation Maître+ : Doyen des arcanes

> Source canonique : `Role.csv` (cat 5 — Sécurité, role n°21).

- **Description** : Mage-Maître **doyen** d'une école d'arcanes — figure académique et politique, conseille les souverains sur les questions magiques, arbitre les conflits entre cercles de Voies.
- **Conditions** : palier Maître + ≥ 10 ans d'enseignement OU ≥ 2 [[Le Souffle|Souffles]] survécus en activité + Reconnaissance ≥ Expert dans une école + 🔒 condition cachée (avoir formé ≥ 1 Archimage OU rédigé un traité de Voie reconnu).
- **Notes** : `[REFONTE-NEEDED — frontière Sécurité/Mysticisme/Erudition : le rôle est nominalement Sécurité dans le CSV, mais correspond mieux à un Mage-Enseignant / pluri-rôle [[Enseignant]] (Erudition) + [[Mage]] palier Maître.]`

#### Sous-spécialisation Maître+ : Arbitre des conflits magiques

> Source canonique : `Role.csv` (cat 8, role n°37).

- **Description** : Mage-Maître investi du pouvoir de **trancher les conflits entre Liés** — duels magiques, accusations de profanation de Voie, litiges sur les enchantements signés. Rôle quasi-juridique mais limité au domaine arcanique.
- **Conditions** : palier Maître + investiture par un Conclave ou un souverain + Reconnaissance ≥ Expert + 🔒 condition cachée (avoir tranché ≥ 1 conflit majeur sans victime supplémentaire OU être reconnu par les deux parties d'un litige inter-Voies).
- **Notes** : frontière avec [[Juge]] (cat 4 Gouvernance) — un Arbitre des conflits magiques est l'équivalent magique d'un Juge de Haute Cour. Un PNJ peut être pluri-rôle.

---

## 9. Modulation par contexte

| Contexte | Effet |
|----------|-------|
| **Ère alignée à la Voie** ([[Les Ères]]) | +20% efficacité, recettes/sorts spécifiques débloqués, Mana max +10% |
| **Ère opposée à la Voie** | −15% efficacité, sorts Apex parfois scellés (cf. [[Tome]] §3 rouille post-Souffle) |
| **Post-[[Le Souffle]] sem 1-2** | Rouille −10% sorts/jour, focus Magistral+ subit pénalité |
| **[[L'Accord]] ≥ 75%** | +5% efficacité intrinsèque, débloque sorts conditionnels d'ère |
| **[[L'Accord]] ≤ 25%** | −15% sorts/jour, sorts Apex inaccessibles |
| **Lieu consacré (Sanctuaire)** | +20% efficacité rituels, recharge Mana en méditation +50% |
| **Lieu d'Éternel disparu (Navigor)** | Mages Navigor : effet narratif fort, sorts uniques accessibles |
| **Faction Conclave d'Astravia** | Accès académique, prix de cristaux −15% |
| **Religion alignée à la Voie** | +Reconnaissance dans les temples, accès à des rituels sacrés |
| **Religion opposée** (ex. Eldoria portant pratique de Noctis) | Hostilité PNJ, possible bannissement, Reconnaissance −20% |

**Karma typique** :
- **Vert** par défaut pour la plupart des Voies (Eldoria, Spiritus, Aquor, Terranu, Aerion, Celestia, Aurion)
- **Jaune** pour Voies ambivalentes (Tempora, Fatum, Umbra, Somnix, Navigor)
- **Rouge à noir** pour Voies sombres pratiquées de manière agressive (Noctis offensif, drain de Mana en PvP), bascule vers les archétypes [[Nécromancien]] selon usage

---

## 10. Économie + Signatures PNJ

**Gold sinks générés** :
- Cristal de Voie mineur : 100-400 Éclats / unité (consommé à chaque inscription)
- Cristal de Voie standard à apex : 1 000 à 80 000 Éclats
- Essence spirituelle : 500-3 000 Éclats / unité
- Achat de grimoire (Tome inscrit par autre Mage) : 5 000-200 000 Éclats
- Service Enchanteur d'objet (Voie posée sur arme) : 500-15 000 Éclats / item
- Pèlerinage à Sanctuaire de Voie : 200-2 000 Éclats par voyage (offrande)

**Revenus typiques** :
- Service de rituel (rupture malédiction, scellement) : 1 000-50 000 Éclats
- Vente de Tome inscrit : 10 000-200 000 Éclats selon tier
- Combat aux côtés d'une faction : solde mage 50-500 Éclats / jour
- Conseil de Lien à un apprenti : 500-5 000 Éclats par session

**Chaîne économique** :
```
[[Mineur]] (Cristal brut) → [[Bijoutier]]/Lapidaire (Cristal taillé)
                          → Mage (Inscription) → [[Tome]] / [[Anneau]] / Service rituel
[[Alchimiste]] (Essence spirituelle) → Mage (consommée en rituel)
[[Bibliothécaire]] (Grimoire trouvé) → Mage (apprend nouveau sort)
```

**Signatures PNJ archétypaux** :
- **Le Mage solitaire d'Astravia** — académique, Voie d'Aurion ou Celestia, vit en tour, vend des consultations
- **Le Lié de Spiritus** — chamanique, vit en forêt, soigne les bêtes, double-casquette [[Herboriste]]
- **Le Mage de Vytharia** — Voie de Noctis ou Umbra, espion, karma jaune, lié [[Lore/Religions/Noctari\|Noctari]]
- **Le Mage de cour** (Galenor, Caeloria) — conseiller royal, Voie de Fatum ou Celestia, prestige social

**PNJ célèbres dans le monde** *(à étoffer Phase 4)* :
- *Veylar de l'Aurion* — mage-itinérant d'Astravia, Voie d'Aurion, dernier détenteur connu d'un fragment de Codex Stellaire
- *Sirean l'Ombre* — Maîtresse Voie de Noctis, Vytharia, chef secret d'un cercle Veilari
- *Maître Kerth Tempora* — l'un des très rares Liés à Tempora encore vivants, ermite des Échos d'Akmoral

---

*Liens : [[Métiers]] · [[Personnage]] · [[Le Lien]] · [[Cosmologie]] · [[Tome]] · [[Anneau]] · [[Potion]] · [[Combat]] · [[L'Accord]] · [[Le Souffle]] · [[Prêtre]] · [[Guérisseur]] · [[Nécromancien]] · [[Oracle]] · [[Enchanteur du vivant]] · [[Lore/Religions/00 - Système Religieux]]*
