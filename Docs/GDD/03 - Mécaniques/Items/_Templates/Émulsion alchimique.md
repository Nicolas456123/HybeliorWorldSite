---
tags: [item, archétype, ressource, fabriqué, intermédiaire, émulsion, alchimie]
type: archetype
category: Récolte
subcategory: Fabriqué
source: Fabriqué
métier_producteur: Alchimiste
intrants_typiques: [Liquide, Poudre fabriqué, Composant créature, Huile]
craft_category: Alchimie
métiers_consommateurs: [Alchimiste, Apothicaire, Mage rituel, Médecin]
tier_min: 2
tier_max: 6
era_availability: [toutes]
status: drafted
last_review: 2026-05-01
needs_review_for: [émulsion-vs-potion-frontière, doses-par-émulsion]
---

# 🧪 Archétype — Émulsion alchimique

> **Liquide + Poudre + Composant créature** liés en suspension stable par l'**Alchimiste** dans son alambic. **Pré-potion** : l'émulsion n'est pas encore une potion finie ([[Potion]]) — c'est la **base alchimique active** qui sera ensuite dosée, scellée en fiole, et nommée selon son effet final. Le passage Émulsion → Potion = scellement + activation finale.

---

## 1. Vue d'ensemble

L'**Alchimiste** combine trois grandes familles d'intrants pour créer une émulsion stable :

- **Liquide** (eau pure, sang, larme, bave, venin, liquide cosmique)
- **Poudre** ([[Poudre fabriqué]] : plante raffinée, Voie, cosmique)
- **Composant créature** (Cœur de creature, Œil, Organe, Sang, Larme, Essence spirituelle — voir [[Sources de Ressources]] §Créature)

Le résultat est une **suspension active** dans laquelle les principes actifs sont **liés** mais **pas encore activés**. C'est le **dernier intermédiaire** avant la [[Potion]] : l'émulsion est versée dans une fiole de [[Plaque de verre]], **scellée**, et **activée** par un mot-clé (rituel ou simple verbalisation alchimique). La [[Potion]] finale **est** l'émulsion scellée.

**Rôle d'intermédiaire :**
- **Sortie** : 1 cycle d'alambic → 1-3 doses d'émulsion selon palier
- **Entrée** : [[Potion]] §recettes (l'émulsion est la base de **toutes** les potions T2+), Élixirs (potions T4+ scellées avec Cristal de Voie), Onguents (émulsion + Cire raffinée), Poisons (émulsion + Venin)

> **Note** : les potions T1 basiques peuvent contourner l'émulsion (ex. potion de soin T1 = Plante + Eau bouillie sans alambic). À partir de T2, l'émulsion devient nécessaire.

---

## 2. Variations / matériaux (familles d'émulsions)

| Famille émulsion | Composant clé | Tier plancher | Type de potion finale |
|------------------|----------------|---------------|------------------------|
| **Émulsion de soin** | Plante régénérante + Sang allié | T2 | Potion de soin |
| **Émulsion de mana** | Cristal de Voie broyé + Larme | T3 | Potion de mana |
| **Émulsion de buff stat** | Plante stat + Cœur de creature ciblé | T3 | Élixir stat (Vigueur, Vivacité…) |
| **Émulsion de poison** | Venin + Plante toxique + Bave | T2 | Poison contact ou ingestion |
| **Émulsion d'antidote** | Plante antidote + Œuf de creature | T3 | Antidote spécifique |
| **Émulsion oraculaire** | Larme + Champignon hallucinogène + Voie | T4 | Élixir de vision |
| **Émulsion de transformation** | Cœur de creature + Sang + Cristal | T5 | Élixir de polymorphe |
| **Émulsion cosmique** | Composant ère + Essence spirituelle + Voie | T6 | Potion mythique |

---

## 3. Tier × Qualité

| Tier | Nom | Liquide × | Poudre × | Composant créature × | Doses produites | Maîtrise | Durée |
|------|-----|-----------|----------|------------------------|-------------------|----------|-------|
| T2 | Émulsion façonnée | 2 | 1 | 1 (T1-T2) | 3 doses | Initié | 240 s |
| T3 | Émulsion œuvrée | 2 | 1 | 1 (T2-T3) | 2 doses | Adepte | 480 s |
| T4 | Émulsion magistrale | 2 | 2 | 1 (T3-T4) | 2 doses | Expert | 900 s |
| T5 | Émulsion légendaire | 2 + Cristal mineur | 2 | 2 (T4-T5) | 1 dose | Maître | 1800 s |
| T6 | Émulsion cosmique | 2 + Cristal majeur | 2 + cosmique | 2 (T5-T6) | 1 dose | Maître + 🔒 | 3600 s |

> **Règle** : les émulsions hautes (T5+) produisent **moins de doses** mais d'effet plus puissant. Une dose T2 = 1 potion T2 ; une dose T5 = 1 potion T5 (pas additive).

---

## 4. Recette de production

> Catégorie : **Alchimie** ([[Crafts]] §2). Station : **Alambic** + Cucurbite + Cornue + Mortier (préparation). Émulsions T4+ exigent **Cercle d'enchantement** complémentaire.

### Recette canonique T3 — Émulsion de mana œuvrée

```yaml
tier: 3
métier: Alchimiste
mastery_required: Adepte (palier 3)
station: Alambic + Cucurbite + Cornue
intrants:
  - Liquide (eau pure) × 2
  - Poudre fabriqué (plante raffinée — Vivacis broyée) × 1 (T2-T3)
  - Larme × 1 (créature T2-T3)
durée: 480 s (8 min — 3 phases : montée, fusion, refroidissement)
mini_jeu: dosage_proportionnel (3 jauges) + timing_température (3 phases) + combinaison_réactive
sortie: Émulsion de mana × 2 doses (T3)
notes:
  - Échec dosage : émulsion instable (T2) — 1 dose seulement
  - Proc Maître : 3 doses sortie + qualité T+1 possible
  - Effet caché Verdoiement : régen mana sur la durée du buff
```

### Recette signature — Émulsion oraculaire magistrale

```yaml
tier: 4
métier: Alchimiste Expert + Apothicaire Adepte (préparation champignons)
mastery_required: Expert Alchimie
station: Alambic + Cercle d'enchantement (mini)
intrants:
  - Liquide consacré × 2
  - Poudre de Voie × 2 (voir [[Poudre fabriqué]])
  - Larme × 1 (créature T3+)
  - Champignon hallucinogène T4 × 1 (voir [[Champignons]] §3.3)
  - Cristal de Voie mineur × 1
durée: 900 s (15 min — non interruptible)
mini_jeu: dosage + timing + canalisation_Voie continue
sortie: Émulsion oraculaire × 2 doses (T4) — base des élixirs de vision
```

### Recette ultime — Émulsion cosmique mythique

```yaml
tier: 6
métier: Alchimiste Maître + Mage Maître
mastery_required: Maître + condition cachée 🔒 (œuvre signée déjà existante)
station: Alambic rituel + Cercle d'enchantement majeur + ère active
intrants:
  - Liquide cosmique (drop event d'ère) × 2
  - Poudre cosmique × 2 (voir [[Poudre fabriqué]] §3 T5)
  - Cœur de creature × 2 (boss mondial)
  - Essence spirituelle × 1
  - Cristal de Voie majeur × 1
  - Composant signature (à inventer par l'alchimiste)
durée: 3600 s (1h) — plus quête de fabrication scénarisée
mini_jeu: aucun standard — quête narrative
sortie: Émulsion mythique × 1 dose (T6) — devient Héritage ([[L'Accord]]) si réussite Maître
```

---

## 5. Variants par ère

| Variant | Effet émulsion |
|---------|------------------|
| **Verdoyant** | Émulsion régénérante : potions soin +20% magnitude |
| **Brulé** | Émulsion ardente : potions feu +15% dégâts |
| **Frost** | Émulsion givrante : potions ralentissement +durée |
| **Spectral** | Émulsion translucide : potions invisibles |
| **Onirique** | Émulsion onirique : potions persistent en rêve |
| **Vénérable** | Émulsion runique : 1 effet supp gratuit en potion |
| **Pourpre** | Émulsion brume : potions signalétiques |
| **Doré** | Émulsion dorée : prestige potions, +5% prix |
| **Brisé** | Émulsion RNG : effet ±30% par dose |
| **Shadow** | Émulsion noire : potions silencieuses (consommation discrète) |

---

## 6. Crafts / items destinés

| Destination | Type émulsion | Quantité | Référence |
|-------------|---------------|----------|-----------|
| **Potion** ([[Potion]] standard, T2+) | Toute émulsion | 1 dose / potion | [[Potion]] §recettes (canonique) |
| **Élixir** (T4+ scellé Cristal de Voie) | Magistral, légendaire | 1 dose / élixir | [[Potion]] §6 T4-T5 |
| **Onguent** (avec [[Cire raffinée]] mélangée) | Soin, antidote | 1 dose / onguent | [[Cire raffinée]] §6 |
| **Poison** (émulsion poison + Venin) | Poison, antidote | 1 dose / projectile | [[Dague]] (lame empoisonnée — TBD) |
| **Boisson alchimique** ([[Boisson]] festive haute) | Buff stat, oraculaire | 1 dose / verre alchimique | [[Boisson]] |
| **Composant rituel magique** (Mage rituel — Phase 4) | Voie, cosmique | 1 dose / rituel haut tier | TBD Phase 4 |
| **Bandage soin imbibé** | Soin | 0.3 dose / bandage | [[Tissu]] §6 (Apothicaire) |

---

## 7. Signatures notables

| Signature | Type | Provenance | Effet |
|-----------|------|------------|-------|
| **Émulsion d'Hibel** | Mana T3-T4 | Hibel (académie alchimique) | Standard mages, +Mana max |
| **Émulsion oraculaire d'Avalor** | Vision T4 | Endora (cours royales d'oracles) | Vision +durée, lecture des intentions |
| **Émulsion de soin de Galenor** | Soin T3 | Galenor | Standard médecine de cour |
| **Émulsion de poison de Vytharia** | Poison T3-T4 | Vytharia (espionnage) | Poisons couverts, signature assassins |
| **Émulsion cosmique d'Onara** | Cosmique T5-T6 | Onara | Élixirs mythiques, Héritage alchimistes |

---

## 8. Décisions ouvertes

- [ ] **Frontière Émulsion / Potion** : émulsion = base non-scellée ; potion = émulsion scellée + activée. Confirmer le **passage** : oui, c'est le scellement final qui fait la potion. Sans scellement, l'émulsion se dégrade en 24h
- [ ] **Doses par émulsion** : modéliser la fragmentation d'une émulsion en plusieurs potions. Proposition : oui, chaque dose remplit 1 fiole standard. Émulsion T6 = 1 dose unique = 1 potion mythique
- [ ] **Conservation émulsion non-scellée** : 24h max. Doit-on permettre le stockage long ? Proposition : non, force le scellement rapide
- [ ] **Émulsions hybrides** : peut-on mélanger 2 familles (soin + buff stat) ? Proposition : oui en Phase 4 (Phase 4 Recipe Generator), avec malus stabilité
- [ ] **Émulsion T6 en Héritage** : confirme le statut "œuvre signée Maître" — non commerçable, lié au personnage

---

*Liens : [[Items/Index|← Index Items]] · [[Sources de Ressources]] · [[Crafts]] · [[Métiers]] · [[Potion]] · [[Boisson]] · [[Poudre fabriqué]] · [[Cire raffinée]] · [[Champignons]] · [[L'Accord]]*
