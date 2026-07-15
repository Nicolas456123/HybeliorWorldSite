---
tags: [métier, archétype, agriculture-élevage, endurance, verbe]
type: archetype
category: Métier
catégorie_métier: Agriculture et élevage
stat_principale: Endurance
stats_secondaires: [Verbe, Acuité, Vivacité, Vigueur]
craft_category: 9 — Récolte et transformation primaire
sources_ressources_accessibles: [Laine creature, Lait, Cuir, Peau, Plante, Herbes, Champignon]
stations_principales: [Bergerie mobile, Pâturage saisonnier, Refuge de nuit, Abreuvoir naturel, Camp temporaire]
outils_principaux: [Houlette, Sifflet, Fronde, Ciseaux à tondre, Sacoche d'herbes, Cape étanche]
paliers_maîtrise: [Novice, Initié, Adepte, Expert, Maître]
métiers_complémentaires: [Eleveur de créature, Tisserand, Tanneur, Boucher, Herboriste, Cartographe]
era_modulation: true
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-progression-playtest, intégration-transhumance]
---

# 🐑 Berger — Archétype Métier

> *"Le troupeau ne se garde pas, il s'écoute. Quand une bête s'écarte, je le sais avant elle."*

---

## 1. Vue d'ensemble

Le **Berger** est le **gardien mobile** des troupeaux : moutons, chèvres, parfois aurochs ou créatures herbivores semi-sauvages. Métier de **patience, de mobilité et de sociabilité animale**. Il se distingue de l'[[Eleveur de créature]] (focus reproduction sédentaire) par sa **pratique nomade et saisonnière** : transhumance entre pâturages d'été (montagnes) et d'hiver (vallées). Le berger est aussi un **observateur du monde** — il sait avant tout autre quand une [[Le Souffle|ère]] tourne (les bêtes le sentent), il connaît les sentiers, les sources, les prédateurs locaux. Excellent métier d'apprentissage des **cycles cosmiques** d'Hybelior.

---

## 2. Stats brutes & Maîtrises associées

- **Stat principale** : **Endurance** — journées de marche, nuits dehors, météo
- **Stats secondaires** : **Verbe** (commande chiens et bêtes, conversation rares), **Acuité** (lecture du paysage, détection prédateur), **Vivacité** (rattraper une bête, esquive prédateur), **Vigueur** (porter agneaux, défendre)
- **Maîtrise contextuelle** : `Maîtrise_Pastoralisme` — montée par jours en garde réussis. Sous-maîtrises : `Maîtrise_Tonte`, `Maîtrise_Conduite_Chien`, `Maîtrise_Survie_Pâturage`.

→ Forte synergie avec `Maîtrise_Pistage` et `Maîtrise_Survie` (ne se transfèrent pas mais montent en parallèle).

---

## 3. Sources de ressources

**Consomme** :
- **Plante / Herbe / Champignon / Baie** (auto-cueillette opportune en pâturage)
- **Liquide** (sources, ruisseaux)

**Produit** :
- **Laine creature** (Source 2 Créature) — tonte annuelle ou saisonnière → [[Tisserand]]
- **Lait** (traite quotidienne) → [[Cuisinier]] / [[Cuisinier|Fromager]]
- **Cuir / Peau / Fourrure** (à l'abattage par [[Boucher]])
- **Connaissance du terrain** (revente cartographique au [[Cartographe]] : routes pastorales)
- **Champignons et herbes rares** glanés en transhumance ([[Herboriste]] s'achète)

→ Référence [[Sources de Ressources]] §Source 2 Créature.

---

## 4. Stations + outils

| Station | Rôle | Palier requis |
|---------|------|---------------|
| **Bergerie mobile** | Abri démontable de nuit | Novice |
| **Pâturage saisonnier** | Été (montagne), hiver (vallée) | Novice |
| **Refuge de nuit** (cabane / grotte) | Repos berger en transhumance | Initié |
| **Abreuvoir naturel** | Source repérée et marquée | Novice |
| **Camp temporaire** | 2-3 jours fixe, tonte, traite | Initié |

→ Référence [[Crafts]] §Catégorie 9. Mini-jeu : **conduite de troupeau** (gestion 3D : qui s'écarte, où sont les prédateurs, quel sentier prendre).

---

## 5. Paliers de Maîtrise

| Palier | Capacités débloquées |
|--------|----------------------|
| **Novice** | Garde 1 troupeau ≤ 20 bêtes, taux de perte ~10% (prédateurs, pertes), tonte basique |
| **Initié** | Troupeau ≤ 50, dressage 1 chien, tonte régulière, lecture météo basique, taux perte ~5% |
| **Adepte** | Troupeau ≤ 100, 2 chiens, transhumance courte, défense contre prédateur seul, tonte de qualité Façonnée |
| **Expert** | Troupeau ≤ 200, transhumance longue (multi-régions), repère troupeaux variants post-Souffle, laine Œuvrée |
| **Maître** | **Condition cachée 🔒** — Connaissance d'un **chemin de transhumance signé** (route inscrite dans [[L'Accord|l'Héritage]]), créatures sauvages s'agrègent au troupeau (compagnonnage), laine Magistrale |

> Décroissance : voir [[Armes et Maîtrise]]. Rouille post-[[Le Souffle|Souffle]] -15% : les bêtes ne reconnaissent plus les commandes pendant ~1 semaine.

---

## 6. Crafts/recettes débloqués

> "Recettes" = pratiques pastorales et préparations.

| Palier | Exemples (3-5) |
|--------|----------------|
| **Novice** | Conduite de troupeau ≤ 20 · Tonte commune · Traite manuelle · Camp d'1 nuit |
| **Initié** | Dressage chien de berger · Tonte saisonnière · Préparation peau de mouton · Onguent répulsif basique |
| **Adepte** | Transhumance courte (1 vallée) · Pâte aux herbes (calmant bêtes) · Sifflement codé (multi-chiens) · Laine teintée nature |
| **Expert** | Garde de créature rare ([[Bestiary/Index|cervidé d'ère]]) · Transhumance multi-frontières · Laine variant post-Souffle · Repérage source d'eau cachée |
| **Maître** | Compagnonnage créature sauvage · Chemin de [[L'Accord|Héritage]] · Laine de Concordant · Pacte avec créatures cosmiques *(Foedus Animae)* |

---

## 7. Carrière et débouchés

- **Démarrage** : aide-berger familial, garde de chèvres au village
- **Progression** : reprise du troupeau, contrat de transhumance avec un seigneur OU avec une guilde laine
- **Établissement** : pas de "lieu" — un berger appartient à une **route** plus qu'à un village. Domicile d'hiver, transhumance d'été
- **Réseau** : [[Eleveur de créature]] (sédentaire complémentaire), [[Tisserand]] (acheteur principal), [[Tanneur]] (peaux), [[Herboriste]] (échanges botaniques), [[Cartographe]] (savoir géographique)
- **Faction** : Confréries pastorales (rares mais puissantes en Aerion et Climata), libres (la majorité)
- **Voie possible** : [[Le Lien|Lié]] de [[Spiritus]] ou [[Aerion]] — proximité de la nature, des animaux

---

## 8. Modulation par contexte

| Contexte | Effet |
|----------|-------|
| **Ère [[Les Ères|Verdoiement]] (Terranu)** | Pâturages riches +30% lait, agneaux abondants |
| **Ère [[Les Ères|Sommeil de Glace]] (Aquor)** | Transhumance hâtive, pertes +15%, laine épaisse +20% |
| **Ère [[Les Ères|Vents]] (Aerion)** | Idéal — bergers chantent, troupeaux mobiles, chiens en forme |
| **Ère [[Les Ères|Ombre Longue]] (Noctis)** | Prédateurs +50%, garde de nuit obligatoire, pertes +20% |
| **Post-[[Le Souffle]]** | Bêtes désorientées 1 semaine, taux perte temporaire x2 |
| **[[L'Accord]] ≥ 75%** | Chemins signés débloqués, lecture des cycles facilitée |
| **Religion [[Rota Mundi]]** | Bergers liturgiques (cycles annuels = liturgie) |
| **Religion [[Spiritus]] / [[Foedus Animae]]** | Pacte animal, troupeaux résistants aux ères dures |

---

## 9. Économie

**Gold sinks générés** :
- Achat / dressage chien de berger : 200-1 500 Éclats
- Réparation houlette / cape : 10-50 Éclats
- Remplacement bête perdue (assurance noble) : 50-500 Éclats / tête
- Paiement passages frontière : 1-5% par troupeau (voir [[Économie]] §Douanes)

**Prix indicatifs** :
- Service de garde : 30 Éclats / jour pour 50 bêtes
- Laine brute : 5 Éclats / kg · Laine Œuvrée : 30 Éclats / kg
- Lait livré : 1 Éclat / pinte
- Renseignement géographique : 50-300 Éclats par "route" auprès d'un [[Cartographe]]

**Chaîne économique** :
```
[[Eleveur de créature]] (jeunes bêtes) → Berger (garde, lait, laine, peaux) → [[Tisserand]] (Laine)
                                                                            → [[Tanneur]] (Peaux)
                                                                            → [[Boucher]] (Viande)
                                                                            → [[Cartographe]] (Routes)
```

---

## 10. Comportement IA / signatures PNJ

**Cycle quotidien typique (saison pâturage)** :
- 04:00 lever — traite matinale
- 05:00-12:00 — sortie troupeau, garde, déplacement
- 12:00-13:00 pause repas / surveillance
- 13:00-18:00 — retour progressif vers camp / village
- 18:00-19:00 — comptage, soins, traite du soir
- 20:00 coucher (avec une oreille)

**Cycle hivernal (sédentaire)** : routine bergerie, tonte, vente, tannage léger.

**Signatures de PNJ archétypaux** :
- **Le berger taciturne** — peu de mots, observation aiguë, sait des choses sur le monde
- **La bergère-mage** — Liée [[Spiritus]], les bêtes la suivent étrangement
- **Le berger-voyageur** — connaît 3 nations, transmet rumeurs et nouvelles, hub social mobile
- **Le berger-prédicateur** — [[Rota Mundi]], lit le ciel, prédit les Souffles avec succès

**PNJ célèbres** *(Phase 4)* :
- *Vieux Damarrec* — Climata, transhumance des Hauts-Pics, 50 ans de garde
- *Selka du Vent* — Aerion, troupeau mixte chèvres + faucons d'éclat

---

*Liens : [[Métiers]] · [[Personnage]] · [[Crafts]] · [[Sources de Ressources]] · [[Économie]] · [[Armes et Maîtrise]] · [[L'Accord]] · [[Le Souffle]] · [[Eleveur de créature]] · [[Tisserand]] · [[Tanneur]] · [[Herboriste]] · [[Cartographe]] · [[Le Lien]]*
