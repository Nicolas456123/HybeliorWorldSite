---
tags: [item, archétype, équipement, outil, métier, cuir]
type: archetype
category: Équipement
subcategory: Outil
slot: Main (outil)
métier: Tanneur
métiers_secondaires: [Maroquinier, Sellier, Garnisseur, Boucher (préparation cuir brut)]
craft_category: Travail du cuir
tier_min: 1
tier_max: 6
era_availability: [toutes]
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-tanin, frontiere-couteau-vs-dague]
---

# 🔪 Couteau de tanneur — Outil de préparation du cuir

> Couteau large, tranchant, à manche court — utilisé par le **Tanneur** pour gratter peaux brutes, retirer chairs/poils résiduels, étirer le cuir pendant le tannage. Distinct des **Couteaux d'arme** ([[Lame]], [[Dague]]) par sa lame **droite et écharnoir**, non pas pointe perforante.

---

## 1. Vue d'ensemble

Le Couteau de tanneur opère en [[Crafts#5. Travail du cuir (tannage et maroquinerie)]]. Outil **pré-craft** : il prépare la **peau brute** (récoltée par Chasseur ou Boucher) pour le **tannage** proprement dit (cuve à tanin). Sans Couteau, la peau ne peut être préparée correctement → cuir final dégradé.

Tier détermine :
- la **précision d'écharnage** (qualité de cuir final)
- la **vitesse** de préparation
- la **chance** de récupérer **fourrure intacte** (procédure délicate, conserve la pelisse pour Cuir Frost)
- les **types de cuir** accessibles (Écaille de dragon = T5+ uniquement)

---

## 2. Variations culturelles

| Variation | Origine | Profil |
|---|---|---|
| **Couteau d'Alkaran** | Tanneries urbaines | Polyvalent, qualité standard |
| **Écharnoir de Galenor** | Galenor — courbure prononcée | Bonus *cuirs lourds* (gros mammifères) +15 % |
| **Couteau d'os de l'Ilthara** | Steppes — silex affûté | Économique T1-T3 |
| **Couteau rituel d'Onara** | Onara — lame en obsidienne | Bonus *cuir spirituel* (créatures liées) +20 % |
| **Lame double de Cendara** | Cendara — deux fils opposés | Vitesse +20 %, durabilité −10 % |

---

## 3. Tier × qualité × bonus métier

| Tier | Nom | Précision écharnage | Vitesse | Chance fourrure intacte | Slots affixes |
|---|---|---|---|---|---|
| **T1** Commun | Couteau apprenti | base | base | 30 % | 1 |
| **T2** Façonné | Couteau initié | +5 % | +10 % | 40 % | 1 |
| **T3** Œuvré | Couteau adepte | +10 % | +20 % | 55 % | 2 |
| **T4** Magistral | Couteau expert | +15 % | +30 % · proc *peau parfaite* | 70 % | 3 |
| **T5** Légendaire | Couteau légendaire | +20 % · permet Écaille | +40 % | 85 % · proc fourrure exotique | 4 |
| **T6** Mythique | Couteau-signature | +25 % · *coupe absolue* | +50 % · *signature* | 95 % · *récupération essence spirituelle* | 4+1 |

> [!important] Cuir Spécial-Exotique nécessite T5+
> Préparer une peau de dragon ou une carapace insectoïde nécessite un Couteau de tanneur **T5 minimum**. Sinon : la peau se déchire à l'écharnage. Verrouille l'accès au Spécial-Exotique [[Cuirasse#💎 Spécial-Exotique]] pour les Tanneurs amateurs.

---

## 4. Mini-jeu d'écharnage

Sur la peau brute affichée, le joueur **gratte** par **passes** :
- **Pression** : trop fort = trous (perte qualité), trop faible = chair résiduelle
- **Direction** : suivre les fibres (différent par animal)
- **Cadence** : régulière → bonus qualité

Chaque peau a 3-7 zones à traiter. Une fois toutes propres : peau prête pour cuve. Tier élargit tolérance.

---

## 5. Affixes outil-spécifiques

| Affixe | Effet T3 | Plafond T6 |
|---|---|---|
| **Bonus Maîtrise Tanneur** | +1 palier | +2 |
| **Vitesse écharnage** | −10 % durée | −30 % |
| **Qualité cuir** | +5 % chance qualité+ | +20 % |
| **Chance fourrure rare** | +3 % proc fourrure exotique | +12 % |
| **Réduction durabilité** | −20 % usure | −60 % |
| **Bonus mini-jeu pression** | +0.1 s tolérance | +0.3 s |
| **Récolte essence spirituelle** | Proc 5 % récupération essence | proc 20 % |
| **Spécialisation cuir/fourrure/écaille** | +10 % qualité famille | +25 % |
| **Coupe d'art** | Permet patrons artistiques (cosmétique) | patrons magiques |

---

## 6. Recette Couteau de tanneur — T3 référence

| Champ | Valeur |
|---|---|
| **Métier** | [[Forgeron\|Forgeron]] (lame) + Tanneur (poignée cuir auto-fait) |
| **Station** | Forge + Établi cuir |
| **Intrants** | 1× [[Sources de Ressources#Source 3 — Fabrication\|Lingot]] (acier tranchant) · 1× [[Sources de Ressources#Source 1 — Récolte nature\|Bois]] (chêne) · 2× [[Sources de Ressources#Source 2 — Récolte sur créature\|Cuir]] tanné (poignée et fourreau) · 1× [[Sources de Ressources#Source 3 — Fabrication\|Fil métallique]] |
| **Palier requis** | Adepte |
| **Durée** | 45 s |
| **Mini-jeu** | Affûtage + emmanchement |
| **Sortie** | Couteau de tanneur T3 |

---

## 7. Variants cosmiques

| Ère active | Effet utilitaire |
|---|---|
| Sommeil de Glace | +30 % chance fourrure Frost intacte |
| Feu Endormi | Permet préparation écailles draconiques (matériau Brulé) |
| Brume Mortelle | Recettes cuir morbides (cuir des morts-vivants) |
| Présages | +1 slot affixe |

---

## 8. Décisions ouvertes

- ⚠️ **Couteau de tanneur comme arme improvisée** : dégâts ? **Proposition** : 40 % d'une Dague (lame écharnoir, pas perforante).
- ⚠️ **Préparation Spécial-Exotique** : T5+ confirmé ? Lien [[Cuirasse]] §Spécial.
- ⚠️ **Boucher vs Tanneur** : qui prépare la peau brute ? **Proposition** : Boucher dépèce (chair → viande), Tanneur prépare peau (cuir).
- ⚠️ **Frontière avec Dague** : si un joueur équipe une Dague comme outil de tannage, autorisé (avec malus) ?

---

*Liens : [[Items/Index\|← Index Items]] · [[Crafts]] · [[Métiers]] · [[Catégories d'Items]] · [[Dague]] · [[Lame]] · [[Cuirasse]]*
