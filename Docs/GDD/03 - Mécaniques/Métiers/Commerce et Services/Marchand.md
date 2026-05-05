---
tags: [métier, archétype, commerce-services, verbe, mémoire]
type: archetype
category: Métier
catégorie_métier: Commerce et services
stat_principale: Verbe
stats_secondaires: [Mémoire, Acuité, Présence, Endurance]
craft_category: aucune (service/commerce, pas de craft direct)
sources_ressources_accessibles: [Tous (revente)]
stations_principales: [Étal de marché, Boutique sédentaire, Caravane, Comptoir d'échange, Hôtel des ventes]
outils_principaux: [Bascule, Sceau de marchand, Registre comptable, Bourse, Mule de bât, Coffre verrouillé]
paliers_maîtrise: [Novice, Initié, Adepte, Expert, Maître]
métiers_complémentaires: [Banquier, Tavernier, Aubergiste, Cartographe, tous métiers producteurs]
era_modulation: true
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-progression-playtest, taux-marges-régionales]
---

# 💰 Marchand — Archétype Métier

> [!info] Entités tutélaires canoniques
> **[[Cosmologie|Aetheron]]** (Cosmique — *Marchand de l'éther*, commerçant des essences éthérées), **[[Cosmologie|Anima]]** (Céleste — *Négociant des âmes*), **[[Cosmologie|Realis]]** (Céleste — *Échangeur de réalités*), **[[Cosmologie|Somnix]]** (Céleste — *Marchand de rêves*), **[[Cosmologie|Legatus]]** (Céleste — *Collectionneur des légendes*). Voir [[Cosmologie]] §"Liste canonique des entités cosmiques". Source : `AccessExport/Legende.csv` (D-COSMO-LEGENDE-CSV-INTEGRATION).

> *"Mon métier n'est pas de vendre. C'est de faire qu'on m'achète."*

---

## 1. Vue d'ensemble

Le **Marchand** est le **liant économique** d'Hybelior — celui qui déplace les biens là où ils valent plus, qui prédit les pénuries et les abondances, qui connaît les **marges régionales**. Il se distingue du [[Banquier]] (gère l'Éclat lui-même), du [[Tavernier]] / [[Aubergiste]] (vend un service local fixe), et de l'**artisan-vendeur** (qui ne vend que sa production). Le Marchand vend **ce qu'il n'a pas produit** — c'est sa singularité. Trois archétypes principaux : **boutiquier** sédentaire, **caravanier** itinérant, **maître de comptoir** (gros volumes inter-régionaux). Métier-pivot, hub d'information, souvent **politiquement influent**.

---

## 2. Stats brutes & Maîtrises associées

- **Stat principale** : **Verbe** — négociation, baratin, marchandage, persuasion
- **Stats secondaires** : **Mémoire** (prix, lignes de crédit, contacts régionaux), **Acuité** (juger un acheteur, déceler un faux), **Présence** (charisme commercial, prix neutre [[Personnage]]), **Endurance** (caravane longue)
- **Maîtrise contextuelle** : `Maîtrise_Marchandage` — montée par transactions réussies. Sous-maîtrises : `Maîtrise_Estimation`, `Maîtrise_Caravane`, `Maîtrise_Boutique`, `Maîtrise_Hôtel_des_Ventes`.

→ Le Marchand bénéficie directement de la formule **Prix d'achat = Base − Verbe × 0.5%** ([[Personnage]] §Tableau effets, plafond −30%).

---

## 3. Sources de ressources

Le Marchand **ne produit aucune ressource brute**. Il gère un **flux** :

**Consomme** :
- **Stock acheté** à tous métiers producteurs ([[Forgeron]], [[Tisserand]], [[Boulanger]], [[Agriculteur]], [[Bûcheron]], etc.)
- **Éclat** (capital de roulement)
- **Capacité de transport** (caravane, mules, navire pour [[Navigateur]])

**Produit** :
- **Service de revente** (marge sur déplacement géographique ou temporel)
- **Information** (rumeurs, prix régionaux, pénuries) — secondaire mais crucial
- **Liquidité locale** (prend les surplus contre Éclats — débouché aux producteurs)

→ Référence [[Sources de Ressources]] §Tous types (revente).

---

## 4. Stations + outils

| Station | Rôle | Palier requis |
|---------|------|---------------|
| **Étal de marché** | Vente quotidienne sur place de ville | Novice |
| **Boutique sédentaire** | Stock fixe, clientèle régulière | Initié |
| **Caravane** | Itinérance inter-villes | Initié |
| **Comptoir d'échange** | Hub fixe régional, gros volumes | Adepte |
| **[[Économie|Hôtel des ventes]]** | Marché centralisé inter-joueurs | Novice (accessible à tous) |
| **Coffre verrouillé** | Sécurisation stock | Initié |

**Outils** : bascule, sceau de marchand (atteste origine), registre comptable, bourse renforcée, mule de bât, coffre.

→ Pas de craft category (catégorie 0 — métier de service). Mini-jeu : **dialogue de marchandage** (jauge de patience client, compteur d'arguments) + **gestion stock-flux** (acheter bas, vendre haut, anticiper).

---

## 5. Paliers de Maîtrise

| Palier | Capacités débloquées |
|--------|----------------------|
| **Novice** | Étal local, marge ~10%, 5-10 références, marchandage de base (bonus Verbe ×0.5%) |
| **Initié** | Boutique petite, marge ~15-20%, 30-50 références, caravane courte, capital ≤ 10 000 Éclats |
| **Adepte** | Comptoir régional, marge ~25%, 100+ références, caravane longue, accès marchés nationaux, **détection de faux** |
| **Expert** | Réseau inter-nation, marge ~30-35%, accès **marchés exclusifs d'ère**, négociation avec nobles/guildes |
| **Maître** | **Condition cachée 🔒** — Compagnie de commerce signée (Héritage [[L'Accord]]), accès **marchés cosmiques**, marge ~40%, plafond Verbe-bonus relevé à −40% |

> Décroissance : oubli des prix régionaux → erreurs d'estimation. Rouille post-[[Le Souffle|Souffle]] : -15% précision marge la 1ère semaine (l'économie mondiale ré-équilibre).

---

## 6. Crafts/recettes débloqués

> "Recettes" = pratiques commerciales et lignes de produits.

| Palier | Exemples (3-5) |
|--------|----------------|
| **Novice** | Étal de marché · Vente directe sans intermédiaire · Marchandage de base |
| **Initié** | Boutique fixe · Caravane bi-villes · Crédit court (1 mois) · Achat de surplus paysan |
| **Adepte** | Comptoir régional · Caravane multi-nations · Spéculation saisonnière · Contrats d'approvisionnement avec [[Forgeron]]/[[Tisserand]] |
| **Expert** | Compagnie commerciale · Routes inter-continentales · Achat de productions exclusives · Spéculation d'ère ([[Les Ères|reliques d'ère précédente]]) |
| **Maître** | Compagnie signée · Marchés cosmiques · Hub inter-Ères (storage stratégique pré-Souffle) · Sceau Concordant |

---

## 7. Carrière et débouchés

- **Démarrage** : colporteur, étal modeste, achat de surplus paysan
- **Progression** : boutique fixe → caravane → comptoir régional → compagnie inter-nations
- **Établissement** : ville de carrefour pour boutique, ou itinérance pour caravane
- **Réseau** : **tous les métiers** producteurs (fournisseurs), [[Banquier]] (crédit, change), [[Cartographe]] (routes), [[Tavernier]] (rumeurs), [[Aubergiste]] (étapes), [[Garde]] / [[Mercenaire]] (escorte caravane)
- **Faction** : Guildes marchandes nationales, Compagnies inter-nations, [[Hôtel des ventes]] (institution centrale)
- **Influence politique** : marchand prospère = conseiller potentiel de seigneurs (financement, logistique de guerre)

### Sous-spécialisations canoniques (Role.csv)

> Source canonique : `Role.csv` (cat 3 — Commerce et services). Ces rôles correspondent à des **paliers Maître+** absorbés du legacy AccessExport. Le Marchand absorbe l'essentiel de la catégorie 3 ; voir aussi [[Banquier]] pour le rôle « Négociant influent ».

#### Sous-spécialisation Maître+ : Grand marchand

> Source canonique : `Role.csv` (cat 3, role n°9).

- **Description** : titre canonique du palier 5 — Marchand reconnu d'envergure nationale, propriétaire d'une boutique signature ou d'une caravane majeure, source d'information économique pour les puissants.
- **Conditions** : palier Maître + ≥ 1 boutique fixe ou caravane permanente + chiffre d'affaires soutenu ≥ 1 an + Reconnaissance ≥ Adepte régionale + 🔒 condition cachée (avoir prédit avec succès une pénurie post-[[Le Souffle|Souffle]] OU contrat exclusif avec une cour noble).
- **Notes** : équivalent direct du **Marchand-Maître reconnu** dans l'échelle d'évolution (§7).

#### Sous-spécialisation Maître+ : Courtier d'import-export

> Source canonique : `Role.csv` (cat 3, role n°8).

- **Description** : Marchand-Maître spécialisé dans le **commerce inter-nations** — gère caravanes longue distance, comptoirs étrangers, conversion de devises et différentiels de marges régionales.
- **Conditions** : palier Maître (axe **caravanier** ou **comptoir**) + relations établies dans ≥ 2 nations distinctes + 🔒 condition cachée (avoir traversé un Souffle avec une caravane intacte OU concession officielle d'un comptoir étranger).
- **Notes** : pivot avec [[Banquier]] (change de devises) et [[Cartographe]] (routes). Très exposé aux ères perturbantes ([[Les Ères|Échos Brisés]], [[Les Ères|Brume Mortelle]]).

#### Sous-spécialisation Maître+ : Maître des guildes

> Source canonique : `Role.csv` (cat 3, role n°10).

- **Description** : Marchand-Maître dirigeant une **guilde marchande** — siège au conseil, arbitre les conflits commerciaux internes, négocie les privilèges de la guilde auprès des nations.
- **Conditions** : palier Maître + élection ou cooptation par les pairs + ≥ 1 guilde marchande active sous direction + Reconnaissance ≥ Adepte capitale + 🔒 condition cachée (faveur royale OU réforme commerciale validée par une nation).
- **Notes** : frontière forte avec **Gouvernance** ([[Conseiller]]) — un Maître des guildes peut siéger en parallèle au conseil royal. `[REFONTE-NEEDED — frontière Commerce/Gouvernance à valider, possiblement pluri-rôle].`

---

## 8. Modulation par contexte

| Contexte | Effet |
|----------|-------|
| **Ère [[Les Ères|Verdoiement]] (Terranu)** | Surplus céréales/fruits, marges resserrées sur denrées, opportunités sur outils agricoles |
| **Ère [[Les Ères|Sommeil de Glace]] (Climata)** | Pénurie alimentaire, marges +50% sur denrées, conservation prime |
| **Ère [[Les Ères|Vents]] (Aerion)** | Caravanes rapides, marges +20% sur trajet, opportunités relais |
| **Ère [[Les Ères|Brume Mortelle]]** | Trafic de remèdes, marges extrêmes (+200%), risque |
| **Ère [[Les Ères|Ombre Longue]] (Noctis)** | Marché noir, contrebande facile, [[Noctari|recettes obscures]] |
| **Post-[[Le Souffle]]** | **Reliques d'ère précédente** prennent valeur — opportunité majeure (stockage stratégique) |
| **[[L'Accord]] ≥ 75%** | Marchés exclusifs d'ère débloqués, crédit privilégié [[Banquier|Bourse des Augures]] |
| **Religion / Faction** | Marchand de [[Foedus Animae]] : crédit moral, contrats sacrés. Marchand de Galenor : douanes faibles |

---

## 9. Économie

**Gold sinks générés** :
- Loyer boutique : 200-2 000 Éclats / mois selon ville
- Stockage [[Économie|banque]] : 1 Éclat / slot / jour
- Taxe HV : 2% mise en vente + 5% transaction (alimente bounty fund — voir [[Économie]])
- Douanes inter-nations : 2-10% valeur transportée
- Escorte ([[Mercenaire]]) : 50-500 Éclats / mission
- Sceau de marchand certifié : 5 000 Éclats (palier Adepte)

**Prix indicatifs (marges)** :
- Boutique locale : marge 10-20% sur prix coûtant
- Caravane courte : 25-40% (risque + transport)
- Caravane longue (inter-nations) : 50-100% (très risqué)
- Spéculation reliques d'ère : x3-x10 sur 1-2 ans

**Le Marchand joue contre l'inflation** :
- Il **draine** des Éclats par taxes HV, douanes, loyers (gold sinks)
- Il **redistribue** la liquidité entre régions, lisse l'économie mondiale
- Il accélère la **circulation des items joueurs** ([[Économie]] §HV)

→ Le Marchand est l'un des **moteurs économiques principaux** d'Hybelior.

---

## 10. Comportement IA / signatures PNJ

**Cycle quotidien typique (boutiquier)** :
- 06:00 lever — comptage caisse, ouverture
- 07:00-12:00 — vente matinale (clientèle régulière)
- 12:00-13:30 pause repas (souvent à la [[Tavernier|taverne]] voisine, pour rumeurs)
- 13:30-19:00 — vente après-midi + arrivages
- 19:00-21:00 — comptes, restock, soir [[Aubergiste|auberge]] ou maison
- 22:00 coucher

**Cycle quotidien (caravanier)** : 04:00 lever, 05:00-18:00 voyage et vente d'étape, 19:00 [[Aubergiste|auberge]] et négociation.

**Signatures de PNJ archétypaux** :
- **Le marchand cordial** — bavard, bonhomie, hub de rumeurs, prix justes (Verbe haut)
- **Le marchand froid** — calculateur, marges dures, mais fiable et ponctuel
- **La caravanière** — voyageuse, escorte armée, multilingue, [[Aerion]] souvent
- **Le maître-comptoir** — sédentaire, gère 5-10 employés, conseiller politique
- **Le bonimenteur** — [[Hôtel des ventes]], voix portée, attire les foules

**PNJ célèbres** *(Phase 4)* :
- *Vasso d'Aldraan* — comptoir le plus grand de Galenor central
- *La Caravane Pourpre* — itinérante mythique, traverse 6 nations
- *Maitre Tellur* — courtier de l'Hôtel des ventes, oracle des prix

---

*Liens : [[Métiers]] · [[Personnage]] · [[Économie]] · [[Armes et Maîtrise]] · [[L'Accord]] · [[Le Souffle]] · [[Banquier]] · [[Tavernier]] · [[Aubergiste]] · [[Cartographe]] · [[Mercenaire]] · [[Hôtel des ventes]]*
