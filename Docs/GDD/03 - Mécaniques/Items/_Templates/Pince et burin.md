---
tags: [item, archétype, équipement, outil, métier, joaillerie]
type: archetype
category: Équipement
subcategory: Outil
slot: Main (outil de précision)
métier: Lapidaire
métiers_secondaires: [Bijoutier, Sertisseur, Orfèvre, Émailleur]
craft_category: Joaillerie et lapidaire
tier_min: 1
tier_max: 6
era_availability: [toutes]
status: drafted
last_review: 2026-05-01
needs_review_for: [pince-vs-burin-distinction, ratés-coût-gemme]
---

# 💎 Pince et burin — Outil-couple du Lapidaire

> Couple d'outils de précision : la **pince** maintient la gemme brute, le **burin** taille les facettes. Outil-pivot du **Lapidaire** (taille de gemmes), du **Sertisseur** (insertion de gemmes dans bijoux/armes/armures), du **Bijoutier** (ouvrage métallique fin).

---

## 1. Vue d'ensemble

Pince et burin opèrent en [[Crafts#6. Joaillerie et lapidaire (gemmes et orfèvrerie)]]. C'est un outil-couple comme [[Aiguille et fuseau]] et [[Plume]] — fonctionnellement traité comme **un archétype unique** avec deux instruments complémentaires.

Le tier détermine :
- la **complexité de taille** possible (T1 = forme simple, T6 = facettes multiples + gravure)
- la **chance** de raté (qui détruit ou réduit la gemme)
- la **finesse** des sertissages (T6 permet sertissage de gemmes T6 dans armes T6)
- les **gemmes exotiques** accessibles (Cristal de Voie taillable seulement en T5+)

> [!warning] Coût d'un raté
> Le craft de joaillerie a le **plus haut coût d'échec** du jeu : un raté sur une gemme T5 perd la gemme (qui peut valoir 10× le prix d'une cuirasse T3 sur la [[Économie|Bourse]]). Outils et palier de Maîtrise sont critiques.

---

## 2. Variations culturelles

| Variation | Origine | Profil |
|---|---|---|
| **Pince d'Alkaran** | Forges-cités | Polyvalente, qualité standard |
| **Burin de Galenor** | Galenor — précision urbaine | Bonus *facettes complexes* +15 % |
| **Pince-foudre d'Onara** | Onara — magnétisée | Bonus *cristaux énergétiques* +20 % |
| **Burin de Cendara** | Cendara — diamant noir | Bonus *gemmes dures* (rubis, saphir) +15 % |
| **Pince d'os d'Ilthara** | Steppes — bois et os | Économique T1-T2 uniquement |

---

## 3. Tier × qualité × bonus métier

| Tier | Nom | Tier gemme max taillable | Complexité facettes | Chance raté | Slots affixes |
|---|---|---|---|---|---|
| **T1** Commun | Pince apprenti | T1 | 4 facettes | 25 % | 1 |
| **T2** Façonné | Pince initié | T2 | 8 facettes | 18 % | 1 |
| **T3** Œuvré | Pince adepte | T3 | 16 facettes | 10 % | 2 |
| **T4** Magistral | Pince experte | T4 | 32 facettes · gravure simple | 5 % · proc *taille parfaite* | 3 |
| **T5** Légendaire | Pince légendaire | T5 (Cristal de Voie possible) | 64 facettes · gravure complexe | 2 % · *signature* | 4 |
| **T6** Mythique | Pince-signature | T6 (Cristal cosmique) | Taille libre · *gravure magique* | <1 % · *transmutation cristalline* | 4+1 |

---

## 4. Mini-jeu de taille — Précision absolue

Le mini-jeu de taille est le plus exigeant du jeu :
- Une **gemme brute** s'affiche en 3D, avec **facettes guides** projetées
- Le joueur doit **trancher** chaque facette par un clic-glisser précis le long du guide
- **Pixel parfait** : facette propre (qualité+)
- **Léger écart** : facette acceptable
- **Écart important** : ébréchure (qualité−1)
- **Ratage** : gemme **fendue** (perte totale ou réduction T−1)

Acuité ([[Personnage]]) du joueur est critique. Tier de Pince élargit la marge de tolérance et **agrandit** le guide visuel.

---

## 5. Affixes outil-spécifiques

| Affixe | Effet T3 | Plafond T6 |
|---|---|---|
| **Bonus Maîtrise Lapidaire/Bijoutier** | +1 palier | +2 |
| **Vitesse taille** | −10 % durée | −30 % |
| **Qualité taille** | +5 % chance qualité+ | +20 % |
| **Chance gemme rare** | +3 % proc qualité supérieure | +12 % |
| **Réduction durabilité** | −20 % usure | −60 % |
| **Bonus mini-jeu précision** | Guide +20 % visible | +50 % |
| **Réduction risque raté** | −5 % chance échec | −15 % |
| **Spécialisation rubis/saphir/diamant/cristaux** | +10 % qualité famille | +25 % |
| **Sertissage parfait** | +5 % qualité bijou serti | +20 % |
| **Pince magnétique** | Évite chute / glissement gemme | Permet manipulation à distance T5+ |

---

## 6. Recette Pince et burin — T3 référence

| Champ | Valeur |
|---|---|
| **Métier** | [[Forgeron\|Forgeron]] (lames) + [[Bijoutier\|Bijoutier]] (assemblage fin) |
| **Station** | Forge + Établi de bijoutier |
| **Intrants** | 2× [[Sources de Ressources#Source 3 — Fabrication\|Lingot]] (mithril ou acier de précision) · 1× [[Sources de Ressources#Source 1 — Récolte nature\|Bois]] (chêne pour manche) · 1× [[Sources de Ressources#Source 3 — Fabrication\|Fil métallique]] · 1× [[Sources de Ressources#Source 1 — Récolte nature\|Gemme brut]] T1 (calibre) |
| **Palier requis** | Adepte |
| **Durée** | 60 s |
| **Mini-jeu** | Précision affûtage (méta : Pince taille les pointes du Burin) |
| **Sortie** | Pince + Burin (couple) T3 |

---

## 7. Variants cosmiques

| Ère active | Effet utilitaire |
|---|---|
| Feu Endormi | +20 % qualité gemme *ardente* (rubis flamboyant) |
| Échos Brisés | Permet taille d'éclats *temporels* (matériau exotique) |
| Rêve Lumineux | +25 % qualité gemme *Doré* (lien Eldoria) |
| Présages | Réduit risque raté de moitié |

---

## 8. Décisions ouvertes

- ⚠️ **Pince vs Burin** : 2 archétypes ou 1 couple ? **Proposition** : 1 couple.
- ⚠️ **Coût d'échec** : perte totale ou réduction T−1 ? Lien [[Économie]].
- ⚠️ **Sertissage = compétence séparée** ou inclus ? **Proposition** : Pince/Burin permet aussi sertissage (variant à T4+).
- ⚠️ **Pince comme arme** : non — pointe trop fine.

---

*Liens : [[Items/Index\|← Index Items]] · [[Crafts]] · [[Métiers]] · [[Catégories d'Items]] · [[Anneau]] · [[Amulette]] · [[Cristal de Voie]]*
