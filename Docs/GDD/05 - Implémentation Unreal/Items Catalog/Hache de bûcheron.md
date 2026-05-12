---
tags: [item, archétype, équipement, outil, métier, bois]
type: archetype
category: Équipement
subcategory: Outil
slot: Main (outil) / Deux mains
métier: Bûcheron
métiers_secondaires: [Menuisier, Charpentier]
craft_category: Récolte et transformation primaire
tier_min: 1
tier_max: 6
era_availability: [toutes]
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-arbres-massifs, frontiere-arme-vs-outil]
---

# 🪓 Hache de bûcheron — Outil de récolte du bois

> Hache lourde, lame large, manche court — dédiée à l'**abattage d'arbres** et à la **fente de bûches**. Distincte des **Haches d'arme** ([[Hache à une main]] et [[Hache à deux mains]]) qui ont lame fine, manche allongé, et profil combat.

---

## 1. Vue d'ensemble

La Hache de bûcheron opère en [[Crafts#9. Récolte et transformation primaire]]. Son tier détermine :
- le **tier d'arbre exploitable** (Hache T2 → arbre T2 max)
- la **vitesse d'abattage** (un arbre se coupe en 4-15 frappes selon tier vs gabarit)
- la **chance** de proc *bois rare* (cœur d'arbre, sève précieuse, écorce médicinale)
- le **mini-jeu** *frappe précise sur entaille* (voir §4)

> [!important] Frontière Outil vs Arme
> | Aspect | Hache de bûcheron (outil) | [[Hache à une main]] / [[Hache à deux mains]] (armes) |
> |---|---|---|
> | Lame | Large, dense, non affûtée à un fil tranchant | Fine, fil tranchant, parfois doublement biseautée |
> | Manche | Court à moyen | Allongé pour swing combat |
> | Stats | Bonus *vitesse abattage*, *qualité bois* | Saignement, dégâts élevés |
> | Slot | Slot outil | Main principale combat |
>
> Une Hache de bûcheron T6 peut s'équiper en arme improvisée : dégâts ~50 % d'une Hache 1H combat équivalent tier.

---

## 2. Variations culturelles

| Variation | Origine | Profil |
|---|---|---|
| **Hache courte d'Alkaran** | Forêts du sud — manche court | Bonus *vitesse* +15 %, durabilité standard |
| **Hache longue de Galenor** | Forêts profondes — manche long | Bonus *arbres massifs* +20 % (gabarit +1) |
| **Hachette d'Ilthara** | Steppes — petite hache portative | T1-T3 uniquement, sac aventurier |
| **Hache rituelle d'Onara** | Onara — lame en obsidienne | Bonus *bois rituel* (Cèdre noir, Saule-mère) +25 % |
| **Double-hache de Cendara** | Cendara — deux lames | Bonus arme improvisée +30 %, récolte standard |

---

## 3. Tier × qualité × bonus métier

| Tier | Nom | Tier arbre max | Frappes par arbre standard | Vitesse | Chance bois rare | Slots affixes |
|---|---|---|---|---|---|---|
| **T1** Commun | Hache apprenti | T1 | 15 frappes | base | 0 % | 1 |
| **T2** Façonné | Hache initié | T2 | 12 | +10 % | +2 % | 1 |
| **T3** Œuvré | Hache adepte | T3 | 8 | +20 % | +5 % | 2 |
| **T4** Magistral | Hache experte | T4 | 6 | +30 % | +10 % | 3 |
| **T5** Légendaire | Hache légendaire | T5 | 4 · abat 2 arbres simultanément (proc) | +40 % | +15 % | 4 |
| **T6** Mythique | Hache-signature | T6 | 3 · proc abattage instantané | +50 % | +25 % · garantie cœur précieux | 4+1 |

---

## 4. Mini-jeu d'abattage — Frappe sur entaille

L'arbre affiche une **entaille** progressive (anneau qui s'élargit). Chaque frappe doit toucher la zone d'entaille active (déplacée à chaque coup) :
- **Touche centre entaille** : −2 frappes restantes (proc *frappe nette*)
- **Touche zone** : −1 frappe (standard)
- **Hors entaille** : 0 progrès, durabilité consommée

Tier de la Hache élargit la zone-cible et augmente la durée d'affichage.

---

## 5. Affixes outil-spécifiques

| Affixe | Effet T3 | Plafond T6 |
|---|---|---|
| **Bonus Maîtrise Bûcheron** | +1 palier | +2 |
| **Vitesse abattage** | −10 % frappes nécessaires | −30 % |
| **Qualité bois** | +5 % chance qualité+ | +20 % |
| **Chance bois rare** | +3 % proc cœur précieux | +12 % |
| **Réduction durabilité** | −20 % usure | −60 % |
| **Bonus mini-jeu** | +0.1 s zone visible | +0.3 s · zone +50 % |
| **Récolte sève** | +1 unité sève / arbre | +3 unités |
| **Spécialisation cèdre/chêne/résineux** | +10 % rendement famille | +25 % |
| **Préservation écorce** | Récolte d'écorce intacte (proc 30 %) | proc 70 % |

---

## 6. Recette de la Hache de bûcheron — T3 référence

| Champ | Valeur |
|---|---|
| **Métier** | [[Forgeron\|Forgeron]] (lame) + [[Menuisier\|Menuisier]] (manche) |
| **Station** | Forge + Établi |
| **Intrants** | 2× [[Sources de Ressources#Source 3 — Fabrication\|Lingot]] (acier) · 1× [[Sources de Ressources#Source 3 — Fabrication\|Planche]] (frêne) · 1× [[Sources de Ressources#Source 2 — Récolte sur créature\|Cuir]] tanné (poignée) · 1× Charbon |
| **Palier requis** | Adepte |
| **Durée** | 55 s |
| **Mini-jeu** | Timing température + emmanchement |
| **Sortie** | Hache de bûcheron T3 |

---

## 7. Variants cosmiques

| Ère active | Effet utilitaire |
|---|---|
| Verdoiement | +20 % rendement bois ; +1 sève par arbre |
| Sommeil de Glace | Récolte bois gelé (matériau Frost) |
| Feu Endormi | Proc *bois ardent* (matériau Brulé) |
| Échos Brisés | Proc rare bois *spectral* |

---

## 8. Décisions ouvertes

- ⚠️ **Hache de bûcheron comme arme** : 50 % dégâts d'une Hache 1H confirmé ?
- ⚠️ **Arbres respawn** : durée respawn par tier de zone ? Lien [[Sources de Ressources]].
- ⚠️ **Récolte sève automatique** ou mini-jeu séparé ?
- ⚠️ **Frontière avec Hache à une main** : si un joueur équipe une Hache 1H comme outil de récolte, est-ce autorisé (avec malus) ?

---

*Liens : [[Items/Index\|← Index Items]] · [[Crafts]] · [[Métiers]] · [[Catégories d'Items]] · [[Hache à une main]] · [[Hache à deux mains]] · [[Pioche]]*
