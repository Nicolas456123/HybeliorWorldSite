---
tags: [item, archétype, arme, mêlée-2H, marteau]
type: archetype
category: Arme
subcategory: Mêlée 2H
source: Fabriqué
mastery: Marteau 2H
craft_category: Forge
tier_min: 1
tier_max: 6
era_availability: [toutes]
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-anti-armure, conditions-cachées-Maître]
---

# ⚒️ Marteau à deux mains — Archétype

> Version 2H du [[Marteau à une main]] : **stagger lourd, anti-armure plate massif, dégâts +85%, vitesse −35%, stagger +75%** vs épée 1H. Hérite des patterns canoniques (grille tier, formule, 13 affixes, 10 variants, recettes Forge). Voir [[Catégories d'Items]] · [[Armes et Maîtrise#Marteau 2H]].

---

## 1. Vue d'ensemble

Le **marteau à deux mains** est l'**arme contondante lourde** par excellence. Conçu pour **briser les armures plate, fissurer les gardes lourdes, abattre les colosses**. Culturellement, c'est l'arme des **briseurs de siège**, des **gardiens de portes**, des **berserkers du nord**, des **prêtres-juges des grands temples** ; rare en armée régulière car peu utile contre infanterie légère, indispensable face aux chevaliers en plate ou aux boss à structures osseuses. Sa Maîtrise [[Armes et Maîtrise#Marteau 2H|Marteau 2H]] mise sur le **timing du wind-up** (les coups lourds ont 1.5s de préparation) et la **gestion de stamina extrême**.

> [!info] Position dans la mêlée canonique
> **Dégâts ×1.85 vs épée 1H · Vitesse ×0.65 · Stagger ×1.75 · Contondant pur · Anti-armure plate ignorée 30%**.
> L'arme la plus lente du catalogue, la plus dévastatrice par coup réussi.

---

## 2. Variations / sous-types

| Sous-type | Profil | Ancrage culturel | Modificateur baseline |
|-----------|--------|------------------|-----------------------|
| **Marteau de guerre 2H** *(baseline)* | Référence neutre | Briseurs de siège, garde royale d'élite | Dégâts ×1.0 · Stagger ×1.0 |
| **Maillet titanesque** | Tête énorme, swing très ample | Berserkers du nord, géants-chevaliers | Dégâts ×1.10 · Vitesse ×0.90 · Allonge ×1.05 |
| **Marteau-pic** | Côté pointu (perçant) + côté plat (contondant) | Mineurs-soldats, ordres montagnards | Dégâts ×0.95 · 30% Perçant · Anti-armure plate +10% |
| **Marteau cérémoniel** | Tête sculptée, bonus social/Voie | Prêtres-juges, templiers d'élite | Dégâts ×0.85 · *Aura de présence* gratuit · Canalisation Voie +5% |
| **Massue brute** *(rare)* | Bois renforcé fer, presque primitif | Tribus, géants, exilés | Dégâts ×1.0 · Vitesse ×0.95 · Stagger ×1.10 · Coût Forge réduit (T1 = Bois ×3 + Lingot ×1) |

---

## 3. Stats par tier

> [!important] Dérivation depuis [[Épée à une main]] §3
> Multiplicateurs identiques. Valeurs absolues = épée 1H × 1.85 sur dégâts, ×0.65 sur vitesse, ×1.75 sur stagger.

### Table absolue — Marteau de guerre 2H

| Tier | Dégâts/coup | Vitesse (coups/s) | Critique base | Stagger | Durabilité | Stamina/coup |
|------|-------------|-------------------|---------------|---------|------------|--------------|
| **T1 Commun** | **74** | 0.78 | 3% | 44 | 250 | 14 |
| **T2 Façonné** | 96 | 0.80 | 3% | 47 | 350 | 14 |
| **T3 Œuvré** | 126 | 0.81 | 4% | 53 | 470 | 14 |
| **T4 Magistral** | 163 | 0.83 | 5% | 61 | 620 | 14 |
| **T5 Légendaire** | 207 | 0.86 | 6% | 73 | 810 | 14 |
| **T6 Mythique** | 266 | 0.88 | 7% | 88 | 1060 | 13 |

### Anti-armure plate massif

Le marteau 2H **ignore 30% de la réduction d'armure** des armures plate (vs 25% pour le marteau 1H). Avec affixe *Brise-armure* T6, **ignore 95%** — efficacement, l'armure plate ne sert à rien.

### Stagger lourd dominant

À T6, **88 pts de stagger** par coup → *Stagger lourd* garanti en 1 coup sur la plupart des humanoïdes T1-T3. Sur boss : 3-4 coups suffisent. **Arme anti-boss canonique**.

---

## 4. Damage types

| Type | Pourcentage |
|------|-------------|
| **Contondant** | 100% (sauf marteau-pic 70% + 30% perçant) |

**Anti-armure plate +30%, anti-os/structures +20%, malus −10% vs cuir mou.**

---

## 5. Affixes typiques

> [!important] Catalogue = baseline + affixes Marteau 1H + 2 spécifiques 2H
> Hérite *Stagger renforcé* gratuit T1, *Brise-armure*, *Onde de choc* du Marteau 1H. Ajoute :

| Affixe | Effet | Tier min | Notes |
|--------|-------|----------|-------|
| **Frappe sismique** | Coup lourd génère onde au sol 3m, applique *Stagger léger* en zone | T3 | Spécifique 2H |
| **Anti-colosse** | +25% dégâts contre cibles taille L+ (boss, géants) | T4 | Rare |

Règles d'apposition identiques à l'épée 1H.

---

## 6. Recettes (Forge)

> [!note] Pattern Forge identique à [[Épée à une main]] §6 + intrants 2H amplifiés
> Mêmes durées, plus de Lingots (+1 par tier), pas de finition tranchant.

| Tier | Intrants spécifiques | Durée | Mini-jeu |
|------|----------------------|-------|----------|
| **T1** | Lingot fer ×4, Planche ×2 (manche long), Cuir tanné ×1 | 130 s | timing_température (4 frappes lourdes) |
| **T2** | Lingot acier ×4, Planche d'essence ×2, Cuir tanné ×1 | 240 s | + équilibrage_masse_2H |
| **T3** | Alliage acier-trempé ×4, Lingot ×1, Planche noble ×2, Cuir tanné fin ×1, Fil métallique ×1 | 440 s | équilibrage + sertissage tête |
| **T4** | Alliage rare ×5, Lingot précieux ×1, Planche noble ×2, Cœur creature ×1, Gemme taillé ×1 | 1100 s | chaîne complète |
| **T5** | Alliage légendaire ×5, Cœur creature ×2, Cristal de Voie ×1, Essence spirituelle ×1 | 2200 s | + condition cachée 🔒 |
| **T6** | Composants cosmiques + signature | variable | quête scénarisée |

---

## 7. Variants cosmiques

Mêmes 10 variants que [[Épée à une main]] §7. Adaptations marteau 2H :
- **Frost** : la frappe sismique gèle le sol 3s (zone glissante pour ennemis)
- **Brulé** : zone d'impact en feu 3s (DoT zone)
- **Spectral** : pas de "traverser garde" classique — au lieu, la frappe traverse 1 ennemi pour toucher le suivant aligné
- **Vénérable** : *Stagger lourd* du 1er coup applique *Marqué* (l'ennemi prend +20% dégâts pdt 5s)

---

## 8. Exemples de signatures

> Pas d'item Marteau 2H nominé dans `Objets.csv`. Signatures inventées.

### Mosrack (cité-forge)

| Nom | Tier | Lore court | Bonus narratif |
|-----|------|------------|----------------|
| **Maillet-Foudre de Mosrack** | Mythique (T6) | Marteau de cérémonie des fondateurs de la Guilde de Mosrack | Variant *Vénérable* permanent. *Frappe sismique* gratuite zone 5m. Héritage permanent |
| **Marteau du Maître-Forge** | Légendaire (T5) | Récompense pour l'œuvre signée d'un Maître Forgeron | Bonus craft Forge +20% qualité (porté en station). *Anti-colosse* gratuit |

### Nord (Highlanders, berserkers)

| Nom | Tier | Lore court | Bonus narratif |
|-----|------|------------|----------------|
| **Maillet du Glacier** | Légendaire (T5) | Marteau berserker forgé dans la glace cosmique | Variant *Frost* permanent. Stagger augmenté de +30% en zones froides |

### Endora (templiers)

| Nom | Tier | Lore court | Bonus narratif |
|-----|------|------------|----------------|
| **Marteau du Verdict** | Légendaire (T5) | Marteau cérémoniel des juges-bourreaux d'Avalor | Bonus +50% dégâts contre PNJ *Hors-la-loi*. Aura de présence triplée |
| **Massue de la Garde** | Magistral (T4) | Standard de la garde royale lourde | Brise-armure gratuit. Stagger +20% |

### Veshrim (anciens royaumes)

| Nom | Tier | Lore court | Bonus narratif |
|-----|------|------------|----------------|
| **Marteau des Cratères** | Légendaire (T5) | Trouvé dans les Cratères du Cardinal de l'Arrachement | Variant *Spectral* permanent. Traverse un ennemi pour toucher le suivant |

---

## 9. Mini-jeu de combat

### Moveset baseline

- **Combo 3 coups (LMB)** : sweep gauche-droit + smash vertical — fenêtre combo **0.85s** (le plus généreux du catalogue, l'arme est lente)
- **Attaque lourde (LMB tenu)** : wind-up 1.5s + frappe verticale dévastatrice + onde sismique au sol — 50 pts stamina
- **Parade tenue (RMB)** : drain 18 pts/s, absorbe 70% (le manche est large) — la plus haute absorption du catalogue mêlée
- **Parade parfaite** : fenêtre 0.16s (la plus exigeante — l'arme est si lente qu'il faut anticiper longtemps avant)
- **Esquive** : 4 directions, IFrames 0.30s (plus court — l'armure assortie ralentit)

### Combos par palier

| Palier | Capacité débloquée |
|--------|--------------------|
| **Novice** | Combo 3 coups, attaque lourde sismique |
| **Initié** | Finisseur *Smash mondial* (zone 3m + *Stagger lourd*) ; compétence *Charge* (60 stamina, CD 12s) |
| **Adepte** | Passif *Force tranquille* : régen 8 pts stamina/s pendant le wind-up. Compétence *Tremblement* (zone 5m frontale) |
| **Expert** | Combo 5 coups étendu, finisseur applique *Stun* 1s. Compétence *Marteau du Géant* (saut + smash, 120 stamina) |
| **Maître** 🔒 | Technique signature *Briseur de Mondes* (200 pts stamina, 120s CD, smash en zone 8m, applique *Stun* 4s + *Marqué* sur tous les ennemis) |

### Synergies

- **Pas de dual-wield** (occupe les deux mains)
- **Synergie Voie de Vigueur** : compétences de Voie peuvent canaliser dans la frappe (cri + smash)
- **Anti-bouclier total** : 2 coups lourds suffisent à briser un bouclier T1-T3

---

## 10. Décisions ouvertes

> [!warning] Wind-up et anim-cancel
> Le marteau 2H repose sur des wind-ups longs (1.5s). Si [[Combat]] §Anim-cancel est autorisé, ça détruit l'arme. Décision Phase 3 : interdire l'anim-cancel sur les coups lourds 2H.

> [!warning] Conditions cachées 🔒 Maître
> - Briser 100 boucliers en une saison (1 ère IRL)
> - Tuer un boss mondial uniquement à coups lourds, sans esquive
> - *Stagger lourd* 200 ennemis humanoïdes en plate

---

*Liens : [[Épée à une main]] · [[Marteau à une main]] · [[Catégories d'Items]] · [[Armes et Maîtrise]] · [[Combat]]*
