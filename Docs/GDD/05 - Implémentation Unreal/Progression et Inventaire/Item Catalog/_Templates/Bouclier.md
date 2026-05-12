---
tags: [item, archétype, arme, défensif, bouclier]
type: archetype
category: Arme
subcategory: Défensif
source: Fabriqué
mastery: Bouclier
craft_category: Forge + Travail du bois + Travail du cuir
tier_min: 1
tier_max: 6
era_availability: [toutes]
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-block-stagger, conditions-cachées-Maître]
---

# 🛡️ Bouclier — Archétype

> **Arme défensive unique** d'Hybelior. Pas de DPS direct (sauf shield bash). Équipée en **off-hand** uniquement (combinable avec Épée 1H, Marteau 1H, Hache 1H, Lame, Rapière, Sceptre, Dague). Stats par tier centrées sur **Block %, Stagger absorbé, Durabilité, Stamina drain en parade tenue, fenêtre de parade parfaite**. Voir [[Catégories d'Items]] · [[Armes et Maîtrise#Bouclier]] · [[Combat]].

---

## 1. Vue d'ensemble

Le **bouclier** est l'**arme défensive canonique** d'Hybelior. Il ne sert pas à infliger des dégâts directement (sauf via *Shield Bash*) mais à **absorber, parer, encaisser, contre-attaquer**. Culturellement, c'est l'objet du **garde-mur**, du **soldat-tank**, du **chevalier en garde formelle**, du **gardien de portes** ; il évoque la patience, la défense civique, l'ordre. Sa Maîtrise [[Armes et Maîtrise#Bouclier|Bouclier]] structure un moveset défensif **complémentaire** à l'arme principale : *Block angulaire*, *Riposte*, *Aura de protection*. Compatible avec toutes les armes 1H (sauf Tome/Sceptre + Bouclier qui requiert une arbitrage).

> [!info] Position dans le catalogue
> **Pas de DPS direct** (sauf bash). Tier exprimé en **stats défensives** (Block %, Stagger absorbé, Durabilité, Drain stamina, Fenêtre parade).

> [!warning] Pattern défensif unique
> Cet archétype **diverge** du pattern offensif des autres armes. Les sections §3 (Stats) et §4 (Damage types) sont reformulées en termes défensifs. Les autres sections suivent la structure canonique.

---

## 2. Variations / sous-types

| Sous-type | Profil | Ancrage culturel | Modificateur baseline |
|-----------|--------|------------------|-----------------------|
| **Petit bouclier rond** | Mobilité préservée, Block réduit | Éclaireurs, milices | Block ×0.85 · Stamina drain ×0.80 · Fenêtre parade parfaite ×1.10 |
| **Bouclier de soldat** *(baseline)* | Référence neutre, équilibre | Soldats réguliers, gardes urbains | Block ×1.0 · Stamina drain ×1.0 |
| **Grand bouclier (kite shield)** | Block maximal, mobilité réduite | Garde royale, défenseurs de mur | Block ×1.20 · Stamina drain ×1.15 · Vitesse de déplacement −5% |
| **Bouclier-tour (tower shield)** | Forteresse mobile, presque immobile | Phalange lourde, sièges | Block ×1.40 · Stamina drain ×1.30 · Vitesse −15% · Permet *Stand* (immobile, Block 100%) |
| **Bouclier cérémoniel** | Gravé, social/Voie | Templiers, ambassadeurs | Block ×0.90 · *Aura de présence* gratuit · Bonus social |

> [!note] Grand bouclier dans [[Armes et Maîtrise]]
> [[Armes et Maîtrise]] mentionne déjà **Bouclier** + **Grand bouclier** comme deux types distincts. Décision : **on les fusionne** ici comme sous-types d'un même archétype Bouclier (cohérent avec *Petit/Soldat/Tour* progression). Si distinction nécessaire ultérieurement (Maîtrises séparées), à arbitrer Phase 3.

---

## 3. Stats par tier — défensives

> [!important] Multiplicateurs identiques à [[Épée à une main]] §3
> ×1.00 / ×1.30 / ×1.70 / ×2.20 / ×2.80 / ×3.60 — appliqués cette fois aux **stats défensives** (Block, Stagger absorbé, Durabilité).

### Table absolue — Bouclier de soldat (baseline)

| Tier | Block % | Stagger absorbé | Durabilité | Drain stamina parade | Fenêtre parade parfaite | Bash dégâts |
|------|---------|-----------------|------------|----------------------|-------------------------|-------------|
| **T1 Commun** | **50%** | 30 | 250 | 12 pts/s | 0.20 s | 25 |
| **T2 Façonné** | 58% | 39 | 350 | 11 pts/s | 0.21 s | 32 |
| **T3 Œuvré** | 67% | 51 | 470 | 10 pts/s | 0.22 s | 42 |
| **T4 Magistral** | 75% | 66 | 620 | 9 pts/s | 0.24 s | 54 |
| **T5 Légendaire** | 82% | 84 | 810 | 8 pts/s | 0.26 s | 70 |
| **T6 Mythique** | **88%** *(plafond mou)* | 108 | 1060 | 7 pts/s | 0.28 s | 90 |

> [!note] Plafond Block %
> 88% est le plafond mou ; le plafond dur reste 95% (jamais 100% d'absorption). Garantit qu'un coup massif passe toujours partiellement.

### Shield Bash — seule attaque offensive

- **Coût stamina** : 50 pts (T1) → 35 pts (T6)
- **Cooldown** : 8s (T1) → 5s (T6)
- **Dégâts** : Contondants (table ci-dessus)
- **Effet** : Push 1m + *Stagger léger* (T1-T2) → *Stagger lourd* (T3+)

### Formule de réduction de dégâts (parade tenue)

```
Dégâts encaissés = Dégâts entrants × (1 - Block%) × (1 - Réduction armure) - Durabilité_drain
```

**Parade parfaite** (timing fenêtre §3 ci-dessus) : annule 100% des dégâts + applique *Stagger* à l'attaquant + ne consomme pas de durabilité.

### Durabilité

- **Perte par hit absorbé** : 2 pts (parade tenue), 0 pts (parade parfaite), 5 pts (parade ratée — coup partiel passe)
- **À 50% durabilité** : −10% Block %, le bouclier est visiblement endommagé
- **À 0** : bouclier brisé, ne peut plus parer (équipé mais inutile jusqu'à réparation forgeron 5–60 Éclats selon tier)

---

## 4. Damage types — défense, pas attaque

| Type encaissé | Réduction par bouclier |
|---------------|------------------------|
| **Tranchant** | Block % standard |
| **Perçant** | Block % standard, mais −10% efficacité (la pointe perce parfois) |
| **Contondant** | Block % standard, durabilité −1 supplémentaire (l'impact endommage le cadre) |
| **Élémentaire (Feu, Givre, Foudre, Ombre)** | Block % atténué (×0.70) — pas de Block magique pur |

> [!note] Bouclier non-magique
> Le bouclier baseline n'absorbe pas la magie efficacement. Variants élémentaires (voir §7) ou affixe *Résistance élémentaire* compensent partiellement.

---

## 5. Affixes typiques

> [!important] Catalogue défensif spécifique
> Les 13 affixes baseline de [[Épée à une main]] **ne s'appliquent pas tels quels** (pas de dégâts à booster). Catalogue spécifique :

| Affixe | Effet | Tier min | Notes |
|--------|-------|----------|-------|
| **Block angulaire** | Block % +5/10/15% sur coups venant de côté (cône latéral 60°) | T1 | Commun |
| **Riposte** | Post-parade parfaite, prochaine attaque +30/50/75% dégâts (gratuit) | T2 | Commun — synergie majeure |
| **Aura de protection** | Allies dans 3m bénéficient de +10/15/20% Block %  | T3 | Rare — anti-raid |
| **Encaissement renforcé** | Durabilité +25/40/60%, perte par hit −1 pt | T2 | Commun |
| **Résistance élémentaire** | +20/30/40% Block contre élémentaire (Feu/Givre/Foudre/Ombre — 1 type au choix) | T3 | Rare |
| **Bash amplifié** | Bash dégâts +25/40/60%, applique *Stagger lourd* dès T3 | T2 | Commun — pour builds hybrides offense |
| **Garde infatigable** | Drain stamina parade tenue −20/30/40% | T3 | Rare |
| **Bouclier-foudre** *(rare)* | Sur parade parfaite, l'ennemi prend 20 dégâts Foudre | T4 | Rare — synergie Voie |
| **Réflecteur** *(très rare)* | 5/10/15% des dégâts encaissés sont renvoyés à l'attaquant | T5 | Très rare |
| **Sort embrassé** *(signature)* | Le bouclier stocke 1 sort (T6 uniquement) — déclenchable post-parade parfaite | T6 | Signature — sur sceptre/tome préalablement enchanté |

Règles d'apposition : T1: 1 Commun · T2: 1 Commun · T3: 1 Commun + 1 Rare possible · T4: 1 Commun + 1 Rare garanti · T5: 2 Rares + 1 Commun + 1 Très rare possible · T6: 3 Rares + 1 signature.

---

## 6. Recettes (Forge + Travail du bois + Travail du cuir)

> [!important] Recette **triple craft** — comme le Sceptre
> Le bouclier combine **plaque/cadre métallique** (Forge), **plateau en bois** (Travail du bois) et **garniture cuir** (Travail du cuir). Sous-type tour shield = ×1.5 sur tous les intrants.

| Tier | Plaque (Forge) | Plateau (Bois) | Garniture (Cuir) | Durée | Mini-jeu |
|------|----------------|----------------|------------------|-------|----------|
| **T1** | Lingot fer ×2 (cadre) | Bois ×3 + Planche ×1 | Cuir tanné ×2 | 110 s | timing_température + assemblage_chevillage + couture_cuir |
| **T2** | Lingot acier ×2 + Plaque verre ×1 (vision) | Planche ×3 + Sève ×1 | Cuir tanné fin ×2 | 220 s | + précision_assemblage |
| **T3** | Alliage acier-trempé ×2 + Lingot ×1 + Plaque verre ×1 | Planche d'essence noble ×3 | Cuir tanné fin ×2 + Pigment ×1 | 420 s | chaîne complète + sertissage emblème |
| **T4** | Alliage rare ×3 + Lingot précieux ×1 + Cœur creature ×1 + Gemme taillé ×1 | Planche noble ×3 + Cœur de plante ×1 | Cuir tanné fin ×3 + Cire raffinée ×1 | 1100 s | chaîne complète + rituel d'enchantement (si élémentaire) |
| **T5** | Alliage légendaire ×3 + Cœur creature ×2 + Cristal de Voie ×1 + Essence spirituelle ×1 | Planche cosmique ×3 | Cuir tanné cosmique ×3 | 2200 s | + condition cachée 🔒 |
| **T6** | Composants cosmiques + emblème signature de pays | Bois d'Arbre-Cœur | Cuir d'un boss mondial | variable | quête scénarisée |

> Métiers : Forgeron + Menuisier + Maroquinier. Stations : Forge + Établi de menuiserie + Établi cuir. Maîtrise minimale Adepte (palier 3) dans les 3 métiers pour T3+.

---

## 7. Variants cosmiques

Mêmes 10 variants que [[Épée à une main]] §7. Adaptations Bouclier :
- **Shadow** : Block +10% en zone d'ombre, l'ennemi est visiblement déstabilisé après parade parfaite (*Stagger ×1.5*)
- **Frost** : sur parade parfaite, applique *Frost* à l'attaquant (ralentit 15% pendant 2s)
- **Brulé** : sur Bash, zone de feu 1.5s (DoT zone)
- **Doré** : Block +15% contre Shadow/Spectral/Pourpre
- **Vénérable** : 1ère parade parfaite du combat = *Riposte amplifiée* gratuite (×2 dégâts)

---

## 8. Exemples de signatures

> Pas d'item Bouclier nominé dans `Objets.csv`. Signatures inventées par grand pays.

### Endora (chevalerie, garde royale)

| Nom | Tier | Lore court | Bonus narratif |
|-----|------|------------|----------------|
| **Bouclier-Aurore d'Avalor** | Mythique (T6) | Bouclier cérémoniel des chevaliers d'Avalor | *Aura de protection* triplée (10m, +30%). *Réflecteur* gratuit. Héritage |
| **Garde-Tour d'Endora** | Légendaire (T5) | Tower shield des défenseurs des murailles | *Stand* permanent (Block 100% si immobile 1s+). *Garde infatigable* gratuit |
| **Bouclier des Templiers** | Magistral (T4) | Standard des templiers d'Endora | *Bouclier-foudre* gratuit. *Aura de protection* simple |

### Mosrack (cité-forge)

| Nom | Tier | Lore court | Bonus narratif |
|-----|------|------------|----------------|
| **Bouclier-Maître de Mosrack** | Légendaire (T5) | Bouclier signé par Aldric, fondateur de la Guilde | *Encaissement renforcé* gratuit. Bonus craft Forge +10% en station |
| **Acier-Mosrack défensif** | Œuvré (T3) | Standard de qualité, poinçon Mosrack | *Block angulaire* gratuit |

### Cestra (corsaires nobles)

| Nom | Tier | Lore court | Bonus narratif |
|-----|------|------------|----------------|
| **Bouclier-Récif** | Magistral (T4) | Bouclier en cuir d'écaille de créature côtière | *Résistance élémentaire* (Givre) gratuite. Bonus contre faune aquatique +20% |

### Veshrim (anciens royaumes)

| Nom | Tier | Lore court | Bonus narratif |
|-----|------|------------|----------------|
| **Bouclier des Sept Tours** | Légendaire (T5) | Un des sept boucliers rituels | +1 palier effectif Maîtrise pendant ère Tempora-dominante. Variant *Spectral* permanent |

---

## 9. Mini-jeu de combat

### Moveset baseline

- **Block tenu (RMB)** : drain stamina (selon table §3), absorbe Block % du coup
- **Parade parfaite (RMB pulse fenêtre §3)** : annule 100% + *Stagger* attaquant + ouvre *Riposte*
- **Bash (Shift + RMB)** : attaque contondante off-hand (cooldown §3, dégâts §3)
- **Stand (Shift + RMB tenu, sous-type tour shield)** : immobile, Block 100% pendant 3s, drain stamina ×2

### Combos par palier

| Palier | Capacité débloquée |
|--------|--------------------|
| **Novice** | Block tenu, parade parfaite, bash basique |
| **Initié** | *Riposte* devient garantie post-parade parfaite (vs aléatoire). Compétence *Bash chargé* (60 stamina, push 3m, CD 12s) |
| **Adepte** | Passif *Sentinelle* : régen 5 pts stamina/s en parade tenue (vs drain). Compétence *Charge bouclier* (sprint + bash, applique *Stagger lourd*) |
| **Expert** | *Stand* devient disponible sur tous sous-types (avec malus adapté). Compétence *Mur de boucliers* (avec alliés à 3m, +50% Block partagé pendant 5s) |
| **Maître** 🔒 | Technique signature *Bouclier du Cycle* (200 pts stamina, 120s CD, immobile 5s mais Block 100% + *Réflecteur* 50% + Aura 20m) |

### Synergies (off-hand)

- **Bouclier + Épée 1H** : combo canonique, équilibre offense/défense
- **Bouclier + Marteau 1H** : "templier", anti-armure + parade
- **Bouclier + Hache 1H** : "raider défensif", saignement + bash
- **Bouclier + Sceptre** : "templier-mage", parade + canalisation
- **Bouclier + Dague/Rapière** : possible mais peu intuitif (perd l'agilité)
- **Bouclier + Tome** : interdit (deux focus magiques OU défensif/magique → choix Phase 3)

---

## 10. Décisions ouvertes

> [!warning] Bouclier vs Grand bouclier — fusion sous-types
> Décision actée : **on fusionne** les deux Maîtrises de [[Armes et Maîtrise]] (Bouclier + Grand bouclier) en un seul archétype avec sous-types. À valider Phase 3 si on rouvre la décision (impact sur Maîtrise progression).

> [!warning] Plafond Block %
> 88% mou / 95% dur. Si trop élevé, le bouclier devient "pas-perdant" — joueurs spamment la parade. À playtest.

> [!warning] Conditions cachées 🔒 Maître
> - Réussir 200 parades parfaites consécutives sans rater une seule
> - Tuer un boss mondial uniquement par *Riposte* + *Bash* (aucune attaque arme principale)
> - Maintenir une *Mur de boucliers* avec 3 alliés pendant un combat de boss complet

---

*Liens : [[Épée à une main]] · [[Catégories d'Items]] · [[Armes et Maîtrise]] · [[Combat]] · [[Personnage]]*
