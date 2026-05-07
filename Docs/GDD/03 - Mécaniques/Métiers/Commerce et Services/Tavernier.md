---
tags: [métier, archétype, commerce-services, verbe, présence, hub-information]
type: archetype
category: Métier
catégorie_métier: Commerce et services
stat_principale: Verbe
stats_secondaires: [Présence, Acuité, Mémoire, Endurance]
craft_category: 3 — Cuisine (légère) + service de boissons
sources_ressources_accessibles: [Boissons fermentées, Spiritueux, Cuisine légère, Information]
stations_principales: [Comptoir de taverne, Salle commune, Cave à fûts, Cuisine légère, Estrade barde]
outils_principaux: [Chope, Pichet, Tonnelet, Bascule à boisson, Cloche d'appel, Carnet d'ardoises]
paliers_maîtrise: [Novice, Initié, Adepte, Expert, Maître]
métiers_complémentaires: [Aubergiste, Brasseur, Cuisinier, Marchand, Barde, Musicien]
era_modulation: true
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-progression-playtest, intégration-Modes-Sociaux-info]
---

# 🍺 Tavernier — Archétype Métier

> *"Une chope bien tirée vaut mille mots. Mille mots, ça fait mille rumeurs. Et mille rumeurs, ça fait un royaume."*

---

## 1. Vue d'ensemble

Le **Tavernier** est le **maître du soir** d'Hybelior — vendeur de **boissons** et de **cuisine légère**, animateur de **salle commune**, **hub d'information** par excellence. Il se distingue de l'[[Aubergiste]] (qui vend du **repos** : chambres, sécurité nuit) — bien que les deux métiers cohabitent souvent dans un même bâtiment, ils ont **deux logiques** distinctes : le Tavernier vit le **jour qui s'éteint et la soirée**, l'Aubergiste vit la **nuit qui dort et le matin qui se lève**. Le Tavernier est un métier **ouvert au flux** : tous viennent boire, donc tous parlent. C'est le métier de **plateforme sociale** d'Hybelior — où se forment les guildes, se nouent les contrats, se chantent les exploits.

---

## 2. Stats brutes & Maîtrises associées

- **Stat principale** : **Verbe** — converser, calmer une bagarre, animer, négocier
- **Stats secondaires** : **Présence** (charisme du patron, influence l'ambiance), **Acuité** (lire les clients, anticiper le danger), **Mémoire** (visages, comptes en ardoise, recettes signature), **Endurance** (soirées 14h+)
- **Maîtrise contextuelle** : `Maîtrise_Tavernerie` — montée par soirées tenues. Sous-maîtrises : `Maîtrise_Service_Boisson`, `Maîtrise_Animation`, `Maîtrise_Désamorçage_Conflit`, `Maîtrise_Cuisine_Légère`.

→ Bénéficie de la formule **Présence (Couche 0)** dans les interactions PNJ + **Verbe** pour négociation prix/acceptations.

---

## 3. Sources de ressources

**Consomme** :
- **Boissons fermentées / spiritueux** ([[Brasseur]], [[Apothicaire]] §Distillation, [[Alchimiste]])
- **Cuisine légère** ([[Cuisinier]], [[Boulanger]], [[Boucher]], [[Cuisinier|Charcutier]])
- **Bois de chauffage** ([[Bûcheron]])
- **Bougies / Huile** ([[Apiculteur]] / [[Apothicaire]])
- **Vaisselle** ([[Sculpteur|Tourneur]] bois ou [[Forgeron]] étain)

**Produit** :
- **Service de débit de boissons** (marge ~50% sur boissons)
- **Cuisine légère** (plats simples : ragoûts, pains chauds, fromages)
- **Information** — flux constant de rumeurs, hub central pour [[Espion]] / [[Marchand]] / [[Cartographe]]
- **Atmosphère** ([[Barde]], [[Musicien]] : scène)
- **Plateforme sociale** : rencontres, contrats, recrutements de groupes

→ Référence [[Crafts]] §Catégorie 3 (Cuisine légère + service liquide).

---

## 4. Stations + outils

| Station | Rôle | Palier requis |
|---------|------|---------------|
| **Comptoir de taverne** | Service direct, point central | Novice |
| **Salle commune** | Tables, banc, foyer | Novice |
| **Cave à fûts** | Stockage et tirage boissons | Initié |
| **Cuisine légère** | Préparations rapides | Initié |
| **Estrade barde** | Animation musicale | Adepte |
| **Salle privée** | Négociations discrètes | Adepte |

**Outils** : chope (étain ou bois), pichet, tonnelet, bascule à boisson, cloche d'appel, carnet d'ardoises (comptes ouverts).

→ Référence [[Crafts]] §Cuisine §Service. Mini-jeu : **service simultané** (gestion file de clients) + **désamorçage de conflit** (bagarres) + **animation** (ambiance, chants).

---

## 5. Paliers de Maîtrise

| Palier | Capacités débloquées |
|--------|----------------------|
| **Novice** | Petit débit (≤ 20 places), 5 boissons en stock, recettes simples (ragoût, fromage), gestion conflit basique |
| **Initié** | Taverne moyenne (≤ 50 places), 15 boissons, animation simple (1 barde par soir), ambiance contrôlée |
| **Adepte** | Grande taverne (≤ 100 places), spécialités régionales, scène ouverte, **réseau de rumeurs** vendable, désamorce bagarres |
| **Expert** | Taverne signée, boissons rares (cuvées d'ère), accueil VIP (privé), réputation inter-régionale, +20% Présence locale |
| **Maître** | **Condition cachée 🔒** — Taverne légendaire (Héritage [[L'Accord]]), recette signature unique, **diplomatie informelle** (lieu de paix sacré), accès Conseiller |

> Décroissance : taverne abandonnée → réputation chute. Rouille post-[[Le Souffle|Souffle]] : ambiance flottante 1 semaine, -15% fréquentation initiale.

---

## 6. Crafts/recettes débloqués

> "Recettes" = boissons préparées, plats légers, soirées-événements.

| Palier | Exemples (3-5) |
|--------|----------------|
| **Novice** | Bière commune · Hydromel basique · Ragoût rural · Pain et fromage · Vin de table |
| **Initié** | Bière artisanale · Eau-de-vie · Brochettes · Soupe d'ail · Cidre · Soirée musicale simple |
| **Adepte** | Bière régionale signée · Vin millésimé · Plats de gibier · Soirée concert ([[Barde]] notable) · Réseau d'informateurs |
| **Expert** | Cuvée d'ère ([[Les Ères|Verdoiement]] = miellée riche) · Spiritueux rares ([[Cendara - Continent|Cendara]]) · Banquet privé · Soirée diplomatique |
| **Maître** | Cuvée signée Concordant · Recette signature unique · Festival privé (mariage / négociation de paix) · Accueil cosmique |

---

## 7. Carrière et débouchés

- **Démarrage** : serveur, plonge, apprenti tireur de bière
- **Progression** : reprise familiale OU ouverture indépendante (capital min 5 000 Éclats) OU succession dans guilde
- **Établissement** : carrefour, port, place de marché, route de pèlerinage — **emplacement critique**
- **Réseau** : [[Aubergiste]] (souvent même bâtiment, complémentarité immédiate), [[Brasseur]] / [[Cuisinier]] (fournisseurs), [[Marchand]] (rumeurs commerciales), [[Barde]] / [[Musicien]] (animation), [[Garde]] (sécurité nocturne)
- **Faction** : Confréries de taverniers (rares mais puissantes — Galenor capitale), Indépendants (majorité)
- **Hub d'information** : pivot pour quêtes joueurs (briefings, rumeurs, contrats officieux)

---

## 8. Modulation par contexte

| Contexte | Effet |
|----------|-------|
| **Ère [[Les Ères|Verdoiement]] (Terranu)** | Cuvées miellées, fruits abondants, fréquentation +30% |
| **Ère [[Les Ères|Sommeil de Glace]] (Climata)** | Plats chauds, eaux-de-vie réchauffantes, fréquentation +20% |
| **Ère [[Les Ères|Vents]] (Aerion)** | Bardes voyageurs nombreux, soirées musicales animées |
| **Ère [[Les Ères|Brume Mortelle]]** | Méfiance, fréquentation -20%, rumeurs morbides |
| **Ère [[Les Ères|Ombre Longue]] (Noctis)** | Tavernes ouvertes plus tard, [[Noctari]] hub clandestin |
| **Post-[[Le Souffle]]** | Veillée du Souffle = soirée massive, recette unique |
| **[[L'Accord]] ≥ 75%** | Cuvées signées d'ère débloquables |
| **Religion [[Rota Mundi]]** | Soirées rituelles aux solstices, ambiance cyclique |
| **Faction noble** | Taverne réservée à clientèle haute, prix x3, accès interdit aux populaires |

---

## 9. Économie

**Gold sinks générés** :
- Loyer local taverne : 500-3 000 Éclats / mois selon ville
- Réapprovisionnement boissons : ~30% du chiffre quotidien
- Réparation après bagarres : 50-500 Éclats / incident
- Licence de débit (selon nation) : 1 000-5 000 Éclats / an
- Festival privé / soirée signée : voir [[Économie]] §Festival privé/mariage (10 000+ Éclats)

**Prix indicatifs (vente)** :
- Chope bière commune : 1 Éclat
- Hydromel : 3 Éclats
- Ragoût + pain : 5 Éclats
- Vin de table : 4 Éclats / pichet
- Cuvée d'ère / signée : 50-200 Éclats / pichet
- Soirée privée : 500-5 000 Éclats

**Marges** : ~50-70% sur boissons (haut), ~30% sur cuisine légère.

**Le Tavernier joue un rôle de plateforme** : il génère peu de gold sink direct (loyer local), mais **catalyse** le commerce, la quête, le réseau social → effet économique indirect énorme.

---

## 10. Comportement IA / signatures PNJ

**Cycle quotidien typique** :
- 09:00 lever (tard — soirée tardive)
- 10:00-12:00 — courses, restock, ménage
- 12:00-14:00 — service midi (déjeuner clients)
- 14:00-17:00 — pause / sieste
- 17:00 ouverture officielle soirée
- 17:00-23:00 — service intense (cœur du métier)
- 23:00-01:00 — fermeture, comptes, nettoyage
- 02:00 coucher

**Signatures de PNJ archétypaux** :
- **Le tavernier-bonhomme** — chaleureux, connaît tout le monde, hub de rumeurs (Verbe ★★★★)
- **La taverniere-matriarche** — autorité absolue, ancienne mercenaire, désamorce tout conflit
- **Le tavernier-musicien** — ancien [[Barde]], soirées légendaires, scène ouverte
- **Le tavernier-clandestin** — façade respectable, [[Noctari]], hub contrebandiers
- **Le tavernier-prêtre** — [[Foedus Animae]] : taverne sacrée de paix, serments

**PNJ célèbres** *(Phase 4)* :
- *Vellor "le Brasseur"* — Galenor capitale, taverne "L'Eclat Doré", recette signature "Bière de l'Aube"
- *Mère Tessa* — Aldraan port, taverne "La Cale Pleine", désamorce les bagarres de marins d'un regard
- *La Taverne du Concordant* — Cendara, ouverte à chaque ère par un Concordant différent

---

*Liens : [[Métiers]] · [[Personnage]] · [[Économie]] · [[Crafts]] · [[L'Accord]] · [[Le Souffle]] · [[Armes et Maîtrise]] · [[Aubergiste]] · [[Brasseur]] · [[Cuisinier]] · [[Marchand]] · [[Barde]] · [[Musicien]]*
