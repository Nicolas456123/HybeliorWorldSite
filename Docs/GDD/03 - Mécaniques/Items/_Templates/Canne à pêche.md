---
tags: [item, archétype, équipement, outil, métier, pêche]
type: archetype
category: Équipement
subcategory: Outil
slot: Main (outil) / Deux mains
métier: Pêcheur
métiers_secondaires: [Cuisinier, Apothicaire (poissons-alchimie)]
craft_category: Récolte et transformation primaire
tier_min: 1
tier_max: 6
era_availability: [toutes]
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-mini-jeu-tension, leurres]
---

# 🎣 Canne à pêche — Outil aquatique du Pêcheur

> Tige flexible, fil et hameçon. Outil signature du **Pêcheur** ([[Métiers]]). Permet la récolte de **poissons**, **algues**, **coquilles**, et — au tier élevé — de **créatures aquatiques rares** (poisson-cœur, algue-mémoire, perle vivante).

---

## 1. Vue d'ensemble

La Canne à pêche opère en [[Crafts#9. Récolte et transformation primaire]]. Elle est intrinsèquement liée à un **mini-jeu QTE de pêche** (voir §4) — sans doute le mini-jeu le plus interactif du jeu, car il combine **timing**, **gestion de tension**, **lecture des courants/météo**.

Son tier détermine :
- la **profondeur** accessible (T1 = bord de rivière, T6 = abysses océaniques)
- la **taille de prise** maximale possible
- la **résistance du fil** (cassures fréquentes en T1, quasi-jamais en T6)
- les **leurres** compatibles (système d'attache de leurres affixés)

---

## 2. Variations culturelles

| Variation | Origine | Profil |
|---|---|---|
| **Canne courte d'Alkaran** | Pêche en rivière | Précision élevée, prise petite/moyenne |
| **Canne longue de Galenor** | Pêche côtière | Portée +30 %, prise moyenne/grosse |
| **Canne harpon d'Onara** | Onara — pour grandes créatures | Bonus *créatures aquatiques* +25 %, prise lente |
| **Canne tressée d'Ilthara** | Steppes — fil en crin de cheval | Économique, qualité standard |
| **Canne de coraille de Cendara** | Cendara — bambou + corail | Bonus *poisson-feu* régions chaudes |

---

## 3. Tier × qualité × bonus métier

| Tier | Nom | Profondeur max | Tension max résistée | Prise tier max | Slots affixes |
|---|---|---|---|---|---|
| **T1** Commun | Canne apprenti | Bord (1 m) | 30 N | T1 | 1 (1 leurre) |
| **T2** Façonné | Canne initié | Bord-moyen (3 m) | 50 N | T2 | 1 (1 leurre) |
| **T3** Œuvré | Canne adepte | Profondeur moyenne (8 m) | 80 N | T3 | 2 (2 leurres) |
| **T4** Magistral | Canne experte | Profond (15 m) | 130 N | T4 | 3 (2 leurres) |
| **T5** Légendaire | Canne légendaire | Très profond (25 m) | 200 N | T5 · proc créature mythique | 4 (3 leurres) |
| **T6** Mythique | Canne-signature | Abysses (50 m+) | 300 N · *fil incassable* | T6 · *signature* (Léviathan, Cœur d'Aquor) | 4+1 (4 leurres) |

---

## 4. Mini-jeu de pêche — Tension dynamique

Une fois la prise mordue :
- Une **jauge de tension** affiche la résistance du fil (rouge = casse imminente, vert = optimal, bleu = poisson trop relâché → fuite)
- Le poisson tire en patterns aléatoires (rapides, lents, secousses, ruées)
- Le joueur **ramène** par séquences (clic maintenu / relâché / direction de la canne)
- **Réussite** : prise capturée, qualité variable selon précision
- **Échec** : fil cassé (durabilité consommée) ou poisson échappé

Tier de la Canne **élargit la zone verte** de la jauge et augmente la résistance du fil. Tier 6 a un **fil quasi-incassable** + une **lecture pré-mordée** (le joueur "voit" le poisson avant qu'il ne morde grâce à la sensibilité de la canne).

---

## 5. Affixes outil-spécifiques (et leurres)

| Affixe | Effet T3 | Plafond T6 |
|---|---|---|
| **Bonus Maîtrise Pêcheur** | +1 palier | +2 |
| **Vitesse remontée** | −10 % durée combat | −25 % |
| **Qualité prise** | +5 % chance qualité+ | +20 % |
| **Chance prise rare** | +3 % drop poisson rare | +12 % |
| **Réduction durabilité fil** | −20 % usure | −60 % |
| **Bonus mini-jeu tension** | Zone verte +0.1 s | +0.3 s |
| **Leurre brillant** | +10 % chance morsure | +30 % |
| **Spécialisation eau douce/salée/abysses** | +15 % rendement zone | +30 % |
| **Pêche silencieuse** | Pas de bruit (créatures peu farouches) | Aucun bruit + invisibilité 5 m |

> **Leurres** = sous-affixes : 1 leurre par slot. Leurres craftables (Apothicaire — *Mouche enchantée*, Cuisinier — *Boulette odorante*).

---

## 6. Recette de la Canne à pêche — T3 référence

| Champ | Valeur |
|---|---|
| **Métier** | [[Métiers - Menuisier\|Menuisier]] (tige) + [[Métiers - Tisserand\|Tisserand]] (fil) + [[Métiers - Forgeron\|Forgeron]] (hameçon) |
| **Station** | Établi de menuiserie + Atelier de couture + Forge |
| **Intrants** | 2× [[Sources de Ressources#Source 1 — Récolte nature\|Bois]] (bambou ou frêne flexible) · 1× [[Sources de Ressources#Source 3 — Fabrication\|Tissu]] (fil tressé) · 1× [[Sources de Ressources#Source 3 — Fabrication\|Lingot]] (fer pour hameçon) · 1× [[Sources de Ressources#Source 2 — Récolte sur créature\|Cuir]] tanné (poignée) |
| **Palier requis** | Adepte |
| **Durée** | 70 s (multi-station) |
| **Mini-jeu** | Cadence tressage fil + précision affûtage hameçon |
| **Sortie** | Canne à pêche T3 |

---

## 7. Variants cosmiques

| Ère active | Effet utilitaire |
|---|---|
| Sommeil de Glace | Pêche sous-glace permise (zone *Frost* exclusive) |
| Vents Bouleversants | Hauturier — bonus prise haute mer +30 % |
| Échos Brisés | Proc rare poisson *spectral* (matériau exotique) |
| Sommeil Onirique | Pêche *poisson de rêve* (matériau Onirique) |

---

## 8. Décisions ouvertes

- ⚠️ **Mini-jeu trop long ?** Si la pêche prend 30-90 s par poisson, est-ce viable en MMO ? **Proposition** : variable selon tier et ressource.
- ⚠️ **Pêche en ligne automatique** : faut-il un mode "passif" (poser la canne et attendre) ? Lien [[Labeur]].
- ⚠️ **Leurres consommables ou réutilisables** ?
- ⚠️ **Canne comme arme** : non — la canne casse à la moindre frappe combat (durabilité dérisoire en arme).

---

*Liens : [[Items - Index\|← Index Items]] · [[Crafts]] · [[Métiers]] · [[Catégories d'Items]] · [[Poisson]] · [[Faux]]*
