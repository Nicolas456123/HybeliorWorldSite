---
tags: [métier, archétype, commerce-services, présence, verbe, Labeur]
type: archetype
category: Métier
catégorie_métier: Commerce et services
stat_principale: Présence
stats_secondaires: [Verbe, Mémoire, Endurance, Acuité]
craft_category: 3 — Cuisine (légère, petit-déj) + service de repos
sources_ressources_accessibles: [Repos, Petit-déjeuner, Sécurité, Stockage temporaire]
stations_principales: [Hall d'accueil, Chambres, Salle à manger, Étable d'auberge, Coffre privé, Bains]
outils_principaux: [Registre des hôtes, Clés numérotées, Cloche d'accueil, Service à laver, Nappes et linge, Cire à cacheter]
paliers_maîtrise: [Novice, Initié, Adepte, Expert, Maître]
métiers_complémentaires: [Tavernier, Boulanger, Cuisinier, Marchand, Garde, Eleveur de créature]
era_modulation: true
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-progression-playtest, taux-régen-Labeur-paliers]
---

# 🛏️ Aubergiste — Archétype Métier

> *"Sous mon toit, tu dors. Et quand tu te lèves, tu es à nouveau prêt à porter le monde."*

---

## 1. Vue d'ensemble

L'**Aubergiste** est le **maître de la nuit et du matin** d'Hybelior — vendeur de **repos**, de **sécurité** et de **petit-déjeuner**. Son service-clé est la **régénération accélérée du [[Labeur]]** : dormir dans une vraie auberge restaure plus vite que dormir dehors ou sur le banc d'une [[Tavernier|taverne]]. Il se distingue du Tavernier (qui anime la soirée) par son rôle **silencieux et structurant** : il accueille, héberge, protège, et relance le voyageur. L'auberge est aussi un **point fixe** dans une géographie hostile : on sait qu'on peut y arriver tard, payer 50 Éclats, et **redémarrer** le lendemain. Pour les voyageurs au long cours (caravaniers, [[Marchand]], aventuriers, [[Berger]] en transhumance), c'est un service **vital**.

---

## 2. Stats brutes & Maîtrises associées

- **Stat principale** : **Présence** — accueil chaleureux et autoritaire, marque la qualité ressentie de l'auberge
- **Stats secondaires** : **Verbe** (réservation, prix, marchandage), **Mémoire** (clients réguliers, préférences), **Endurance** (cycles de jour ET de nuit), **Acuité** (lecture des arrivants — danger ou client paisible ?)
- **Maîtrise contextuelle** : `Maîtrise_Auberge` — montée par nuitées servies. Sous-maîtrises : `Maîtrise_Accueil`, `Maîtrise_Petit_Déjeuner`, `Maîtrise_Sécurité_Nocturne`, `Maîtrise_Gestion_Hôtes`.

→ **Effet gameplay clé** : les maîtrises de l'aubergiste **modulent la régénération du [[Labeur]]** des dormeurs (cf. §9 Économie).

---

## 3. Sources de ressources

**Consomme** :
- **Pain** ([[Boulanger]]), **lait, œufs, fromage** ([[Cuisinier|Fermier]] / [[Cuisinier|Fromager]]), **boissons légères** ([[Tavernier]] voisin ou [[Brasseur]])
- **Linge / draps** ([[Tisserand]])
- **Bois de chauffage** ([[Bûcheron]]), **bougies** ([[Apiculteur]])
- **Foin / paille** ([[Berger]] — pour étable des voyageurs)

**Produit** :
- **Service de chambre** (1 nuit ou plus, sécurisé)
- **Petit-déjeuner** (régen Labeur prolongée)
- **Stockage temporaire** (coffre privé en chambre — voir [[Économie]] §Coffre privé)
- **Étable** pour montures voyageurs ([[Eleveur de créature]] amont)
- **Bains** (palier Adepte+) — buff bien-être / Présence
- **Information ciblée** (différente du Tavernier : info de **client identifié**, plus discrète)

→ Référence [[Crafts]] §Catégorie 3 (Cuisine légère).

---

## 4. Stations + outils

| Station | Rôle | Palier requis |
|---------|------|---------------|
| **Hall d'accueil** | Réception, registre des hôtes | Novice |
| **Chambres** | 5 à 30 selon taille auberge | Novice |
| **Salle à manger** | Petit-déjeuner, dîner léger | Novice |
| **Étable d'auberge** | Logement montures | Initié |
| **Coffre privé** | Stockage clients | Initié |
| **Bains chauds** | Détente, buff | Adepte |
| **Salle privée** | Réunions discrètes | Adepte |

**Outils** : registre, clés numérotées (sécurité), cloche d'accueil, services à laver (broc, bassine), nappes et linge, cire à cacheter (sceau auberge).

→ Pas de mini-jeu de craft direct. Mini-jeu : **gestion d'occupation** (planning chambres) + **lecture clients** (anticipation conflit / risque).

---

## 5. Paliers de Maîtrise

| Palier | Capacités débloquées |
|--------|----------------------|
| **Novice** | Petite auberge (≤ 5 chambres), petit-déj basique, **régen Labeur ×1.2** vs sans-abri |
| **Initié** | Auberge moyenne (≤ 10 chambres), étable, coffre privé, **régen Labeur ×1.4**, sécurité nocturne (gardien) |
| **Adepte** | Grande auberge (≤ 20 chambres), bains, salle privée, **régen Labeur ×1.6**, accueil VIP |
| **Expert** | Auberge réputée inter-régions, signée par les [[Marchand|caravanes]] qui font détour, **régen Labeur ×1.8**, recette de petit-déjeuner d'ère |
| **Maître** | **Condition cachée 🔒** — Auberge légendaire (Héritage [[L'Accord]]), **régen Labeur ×2.0**, "Sanctuaire de la Route" (paix sacrée — pas de combat possible à l'intérieur) |

> Décroissance : auberge mal tenue → réputation chute. Rouille post-[[Le Souffle|Souffle]] : -15% qualité accueil 1 semaine.

---

## 6. Crafts/recettes débloqués

> "Recettes" = niveaux de service et préparations matin.

| Palier | Exemples (3-5) |
|--------|----------------|
| **Novice** | Chambre commune (dortoir) · Petit-déj pain+lait · Étable basique · Foyer commun |
| **Initié** | Chambre privée · Petit-déj œufs+fromage · Coffre numéroté · Étable couverte · Veilleur de nuit |
| **Adepte** | Suite · Bain chaud · Petit-déj copieux (charcuterie, fruits) · Salle privée · Sécurité 2 gardiens |
| **Expert** | Suite VIP avec balcon · Petit-déj signé · Accueil personnalisé Concordant · Sceau d'auberge réputée |
| **Maître** | Suite Concordée · Petit-déj cosmique post-[[Le Souffle|Souffle]] · Sanctuaire de la Route · Recette signature de bain rituel |

---

## 7. Carrière et débouchés

- **Démarrage** : femme/homme de chambre, valet d'étable, marmiton
- **Progression** : reprise familiale OU ouverture indépendante (capital min 10 000 Éclats — gros bâti) OU gestion seigneuriale
- **Établissement** : **route entre 2 villes** (relais), porte de ville, port, sanctuaire ou pèlerinage — emplacement vital
- **Réseau** : [[Tavernier]] (souvent même bâtiment, complémentarité critique), [[Boulanger]] (petit-déj), [[Cuisinier]] (cuisine), [[Marchand]] / [[Cartographe]] (clients réguliers), [[Garde]] (sécurité), [[Eleveur de créature]] (étable)
- **Faction** : Guilde des Aubergistes (réseaux inter-régions, sceau de garantie), Indépendants
- **Particularité** : un aubergiste connu **garantit la sécurité** — son auberge est un point neutre (no PvP autorisé sous son toit, voir [[PvP]] §Zones safes)

---

## 8. Modulation par contexte

| Contexte | Effet |
|----------|-------|
| **Ère [[Les Ères|Verdoiement]] (Terranu)** | Petit-déj copieux, fréquentation +20%, Labeur regen +10% bonus |
| **Ère [[Les Ères|Sommeil de Glace]] (Climata)** | Bois de chauffage cher, prix +30%, fréquentation +30% (besoin chaleur) |
| **Ère [[Les Ères|Vents]] (Aerion)** | Caravanes nombreuses, étables pleines, marges étables x2 |
| **Ère [[Les Ères|Brume Mortelle]]** | Sécurité critique, prix gardiens +50%, bains rares |
| **Ère [[Les Ères|Ombre Longue]] (Noctis)** | Auberges fortifiées, ouverture précoce, [[Noctari]] discrets |
| **Post-[[Le Souffle]]** | Voyageurs désorientés, sur-fréquentation 1 semaine, prix +20% |
| **[[L'Accord]] ≥ 75%** | Suite Concordée débloquable, accueil VIP automatique |
| **Religion [[Foedus Animae]]** | Auberge sacrée — pas de combat possible (serment du seuil) |
| **Religion [[Via Ventus]]** | Auberge des routes pour pèlerins, prix réduits aux marcheurs |

---

## 9. Économie — **Régénération Labeur**

> [!important] Le service signature de l'Aubergiste est la **régénération accélérée du [[Labeur]]** ([[Métiers]] §Labeur).

**Multiplicateurs de régen Labeur** *(indicatifs, à calibrer playtest)* :

| Lieu de repos | Multiplicateur |
|---------------|---------------|
| Pleine nature | ×1.0 (base) |
| Camp avec feu | ×1.1 |
| Grange / abri | ×1.15 |
| Auberge Novice | ×1.2 |
| Auberge Initié | ×1.4 |
| Auberge Adepte | ×1.6 |
| Auberge Expert | ×1.8 |
| Auberge Maître / Concordée | ×2.0 |

**Gold sinks générés** :
- Loyer / propriété auberge : 1 000-10 000 Éclats / mois
- Restock linge, chauffage : ~20% chiffre quotidien
- Personnel (femmes de chambre, gardiens) : 30 Éclats / pers / jour
- Licence d'auberge : 2 000-10 000 Éclats / an
- Coffre privé client : 100 Éclats / mois (= [[Économie]] §Coffre privé)

**Prix indicatifs (vente)** :
- Chambre commune : 5 Éclats / nuit
- Chambre privée : 20-50 Éclats / nuit
- Suite : 100-500 Éclats / nuit
- Suite Concordée : 1 000+ Éclats / nuit
- Petit-déjeuner inclus → +50% sur tarif chambre
- Étable monture : 5-15 Éclats / nuit + foin
- Bain chaud : 10 Éclats

---

## 10. Comportement IA / signatures PNJ

**Cycle quotidien typique** :
- 05:00 lever — préparation petit-déj, cuisine matinale
- 06:00-10:00 — service petit-déjeuner, départs voyageurs
- 10:00-14:00 — ménage chambres, lessive, préparation soir
- 14:00-17:00 — pause / réception fournisseurs
- 17:00-22:00 — accueil arrivants, service dîner léger
- 22:00-00:00 — fermeture, registre, comptes
- 00:00-05:00 — sommeil (gardien de nuit prend le relais)

**Signatures de PNJ archétypaux** :
- **L'aubergiste-matriarche** — Présence imposante, ancienne aventurière, surveillance maternelle des clients
- **L'aubergiste-cordial** — sourire, mémoire des visages, info précieuse aux voyageurs réguliers
- **L'aubergiste-discret** — accueille sans poser de questions, bonne pour clients louches
- **L'aubergiste-prêtre** — [[Foedus Animae]], auberge sacrée, paix garantie
- **L'aubergiste-vétéran** — ancien [[Soldat]] / [[Mercenaire]], sécurité absolue, [[PvP]] interdit

**PNJ célèbres** *(Phase 4)* :
- *Mère Aldira "des Cinq Routes"* — Galenor central, auberge mythique au croisement
- *L'Hôte de la Brume* — Aldraan, auberge sur la route maritime, légendaire pour son thé
- *Vorr "le Silencieux"* — Cendara montagne, auberge fortifiée, ancien chevalier

---

*Liens : [[Métiers]] · [[Personnage]] · [[Économie]] · [[Crafts]] · [[Labeur]] · [[L'Accord]] · [[Le Souffle]] · [[Armes et Maîtrise]] · [[Tavernier]] · [[Boulanger]] · [[Cuisinier]] · [[Marchand]] · [[Garde]] · [[Eleveur de créature]] · [[PvP]]*
