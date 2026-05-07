---
tags: [item, archétype, équipement, outil, métier, forge]
type: archetype
category: Équipement
subcategory: Outil
slot: Main (outil)
métier: Forgeron
métiers_secondaires: [Armurier, Métallurgiste, Fondeur]
craft_category: Forge
tier_min: 1
tier_max: 6
era_availability: [toutes]
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-bonus-craft, frontiere-arme-vs-outil]
---

# 🔨 Marteau de forge — Outil-pivot du Forgeron

> Outil signature du [[Forgeron|Forgeron]] : un marteau dédié au **martelage à l'enclume**, distinct du **Marteau à une main** (arme de mêlée). C'est l'outil qui transforme le lingot chauffé en lame, plate, anneau de mailles. Sans Marteau de forge, **aucune recette de Forge** n'est exécutable.

---

## 1. Vue d'ensemble

Le Marteau de forge est l'outil-clé de la catégorie **Forge** ([[Crafts#1. Forge (transformation métallique)]]). Il intervient dans le mini-jeu **timing température + précision frappe enclume** propre au Forgeron. Son tier détermine la **qualité maximale de production** (un Marteau T2 plafonne les sorties à T3 même si le Forgeron est Maître), sa **vitesse de craft**, et la **chance de procs rares** (qualité supérieure spontanée, économie d'intrants).

> [!important] Frontière Outil vs Arme
> | Aspect | Marteau de forge (outil) | [[Marteau à une main]] (arme) |
> |---|---|---|
> | Slot | Main, en station Forge | Main principale en combat |
> | Stats combat | Inutile en combat (dégâts dérisoires) | Stagger / armor break |
> | Recette | Lingot + Bois + Cuir (manche court) | Lingot + Bois + Cuir + manche allongé |
> | Mini-jeu | Frappe enclume / températures | Combat (Maîtrise [[Armes et Maîtrise#Marteau 1H]]) |
> | Affixes | *Précision craft*, *Vitesse forge*, *Qualité* | *Stagger*, *Armor break*, *Vol de vie* |
>
> **Un Marteau de forge ne s'équipe pas en arme** (il se range dans un slot outil dédié, ou dans le sac, et s'active automatiquement à proximité de l'enclume).

---

## 2. Variations culturelles

| Variation | Origine | Profil |
|---|---|---|
| **Marteau d'Alkaran** | Forges-cités d'Alkaran | Tête courte, dense, frappe précise — bonus *qualité* sur Plate fine |
| **Maillet long de Galenor** | Galenor | Tête plus grosse, manche long — bonus *vitesse* sur lingots bruts |
| **Marteau jumelé de Cendara** | Cendara (deux têtes — pic et frappe plate) | Polyvalent, bonus *armes mêlée* |
| **Marteau-glaçon d'Onara** | Onara — manche en os de baleine | Conservation chaleur ; bonus rituel pour Forge magique |
| **Marteau brut de l'Ilthara** | Steppes — pierre + os | T1-T2 uniquement, sac aventurier |

---

## 3. Tier × qualité × bonus métier

| Tier | Nom | Bonus production | Bonus mini-jeu | Slots affixes |
|---|---|---|---|---|
| **T1** Commun | Marteau apprenti | Plafond sortie T1 | −0 % | 1 |
| **T2** Façonné | Marteau d'initié | Plafond sortie T2 · +5 % vitesse | +0.05 s tolérance temp. | 1 |
| **T3** Œuvré | Marteau d'adepte | Plafond T3 · +10 % vitesse · +5 % qualité | +0.1 s tolérance · +5 % proc qualité+ | 2 |
| **T4** Magistral | Marteau de maître-forgeron | Plafond T4 · +15 % vitesse · +10 % qualité · +3 % chance ressource rare | +0.15 s tolérance · +10 % proc qualité+ | 3 |
| **T5** Légendaire | Marteau légendaire | Plafond T5 · +20 % vitesse · +15 % qualité · +5 % chance ressource rare · −1 intrant 5 % | +0.2 s tolérance · +15 % proc qualité+ | 4 |
| **T6** Mythique | Marteau-signature | Plafond T6 (Mythique) · +25 % vitesse · +20 % qualité · +8 % rare · −1 intrant 10 % · *signature* | +0.25 s tolérance · +20 % proc qualité+ · *aura de chaleur* | 4+1 |

> [!note] Bonus passif au métier
> Plus le tier est haut, plus le Marteau de forge **pousse vers la perfection**. À T6, un Forgeron Adepte peut occasionnellement produire des items T5 (proc Maître artificiel via outil).

---

## 4. Mini-jeu de craft (interaction)

Le Forgeron utilise le Marteau de forge dans le triplet **four → enclume → trempe** ([[Crafts#1. Forge]]). Le Marteau intervient à l'**enclume** :

- **Phase 1 — Modelage initial** : 4-8 frappes rythmées, jauge de température à maintenir
- **Phase 2 — Affinage** : précision pixel sur le bord travaillé (3-5 frappes)
- **Phase 3 — Finition** : 1-2 frappes finales, timing de fin de chaleur

**Bonus du Marteau** :
- Tolérance température élargie (zone "verte" de la jauge)
- Réduction du nombre de frappes nécessaires (vitesse)
- Chance de proc *frappe parfaite* qui élève la qualité d'un tier

---

## 5. Affixes outil-spécifiques

| Affixe | Effet T3 | Plafond T6 |
|---|---|---|
| **Bonus Maîtrise Forge** | +1 palier effectif sur recette | +2 paliers |
| **Vitesse forge** | −10 % durée craft | −25 % |
| **Qualité production** | +5 % chance proc qualité+ | +20 % |
| **Chance ressource rare** | +3 % drop affixe rare sur sortie | +10 % |
| **Réduction durabilité outil** | −20 % usure du marteau | −60 % |
| **Bonus mini-jeu** | +0.1 s tolérance température | +0.3 s |
| **Économie d'intrants** | 5 % chance −1 intrant | 15 % |
| **Spécialisation lame/plate/mailles** | +10 % qualité sur famille spécifique | +25 % |

---

## 6. Recette du Marteau de forge — T3 référence

| Champ | Valeur |
|---|---|
| **Métier** | [[Forgeron\|Forgeron]] (auto-fabrication possible) |
| **Station** | Forge à charbon + Établi |
| **Intrants** | 2× [[Sources de Ressources#Source 3 — Fabrication\|Lingot]] (acier ou fer dur) · 1× [[Sources de Ressources#Source 1 — Récolte nature\|Bois]] (manche, frêne ou chêne) · 1× [[Sources de Ressources#Source 2 — Récolte sur créature\|Cuir]] tanné (poignée) · 1× [[Sources de Ressources#Source 3 — Fabrication\|Fil métallique]] (rivetage) |
| **Palier requis** | Adepte |
| **Durée** | 60 s |
| **Mini-jeu** | Timing température + précision frappe (méta-mini-jeu : on forge l'outil avec un outil) |
| **Sortie** | Marteau de forge T3 |

> T1-T2 simplifient (1 lingot, manche brut). T4-T6 ajoutent matériaux exotiques (Alliage T4+, Lingot mithril T5+, Os de cosmique T6).

---

## 7. Variants cosmiques (utilitaires-orientés)

Comme [[Sac à dos]], les outils ne portent pas les 10 variants combat purs. Mais ils peuvent recevoir un **modificateur d'ère** au craft :

| Ère active | Effet utilitaire (Marteau de forge) |
|---|---|
| Feu Endormi | +10 % chance affixe rare sur arme produite |
| Sommeil de Glace | Permet trempe instantanée (gain +5 s par craft) |
| Échos Brisés | Proc rare : item produit reçoit affixe *Brisé* gratuit |
| Ombre Longue | Forge silencieuse (pas de détection en zone sensible) |

---

## 8. Décisions ouvertes

- ⚠️ **Outil exigé pour craft** : binaire (sans outil → craft impossible) ou réducteur (sans outil → qualité −2 tiers) ?
- ⚠️ **Durabilité** : l'outil se casse-t-il ? Si oui, lien avec [[Économie]] (rachat outils). Aujourd'hui : durabilité élevée mais finie.
- ⚠️ **Cumul outils** : peut-on équiper Marteau de forge + Soufflet simultanément (tous deux Forgeron) ? **Proposition** : oui, slots outils distincts.
- ⚠️ **Variants combat** : un Marteau de forge T6 peut-il servir d'arme d'urgence ? **Proposition** : oui, mais dégâts plafonnés à 50 % d'un Marteau 1H équivalent tier.

---

*Liens : [[Items/Index\|← Index Items]] · [[Catégories d'Items]] · [[Crafts]] · [[Métiers]] · [[Marteau à une main]] · [[Soufflet]]*
