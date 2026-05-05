---
tags: [item, archétype, ressource, fabriqué, intermédiaire, verre, verrerie]
type: archetype
category: Récolte
subcategory: Fabriqué
source: Fabriqué
métier_producteur: Verrier
intrants_typiques: [Sable, Charbon, Cendre / Soude]
craft_category: Travail du bois et de la pierre (Verrerie)
métiers_consommateurs: [Verrier, Apothicaire (fioles), Alchimiste (cornues), Architecte (vitrages), Lapidaire (lentilles)]
tier_min: 1
tier_max: 5
era_availability: [toutes]
status: drafted
last_review: 2026-05-01
needs_review_for: [verre-cosmique-T6-existence, frontière-verre-cristal-Voie]
---

# 🪟 Archétype — Plaque de verre

> Sable + Cendre + Chaleur intense = verre. La **Plaque de verre** est l'unité standardisée du Verrier — une plaque coulée prête à découpe, soufflage ou polissage. Elle se décline en **vitrages** (architecture), **fioles** ([[Récipient]] alchimiques), **lentilles** (focus magique, optique).

---

## 1. Vue d'ensemble

Le **Verrier** prend du sable (Minerai sablonneux récolté en désert ou rivière), le mélange à de la cendre (alcali fondant), et chauffe le tout à très haute température dans un **Four à verre**. Une fois fondu, il **coule la masse en plaque** sur un lit de cendre, ou la **souffle** au bout d'une canne. La plaque est l'**unité économique** : on la découpe ensuite en formes diverses.

**Rôle d'intermédiaire :**
- **Sortie** : 1 fournée → 1-4 plaques selon la quantité de sable et la maîtrise
- **Entrée** : Vitrages (architecture, [[Brique]] §6), Fioles ([[Récipient]] §recettes — Phase 2), Lentilles (focus, scribes, télescopes)

---

## 2. Variations / matériaux

| Type de verre | Sable source | Additif | Tier | Usage |
|---------------|--------------|---------|------|-------|
| **Verre commun** | Sable de rivière | Cendre de bois | T1 | Vitres maisons paysannes, fioles standard |
| **Verre clair** | Sable blanc fin | Cendre purifiée | T2 | Vitres villes, fioles d'alchimiste |
| **Verre teinté** | Sable + Pigment ([[Pigment]]) | Cendre + colorant | T2-T3 | Vitraux, fioles signalétiques |
| **Cristal** | Sable + Plomb (Lingot plomb fondu) | Cendre raffinée | T3 | Verre dense, vibrant, Lapidaire / focus |
| **Verre de Voie** | Sable + Cristal de Voie broyé | Cendre + Essence spirituelle | T4 | Lentilles magiques, tomes-vitrines, [[Sceptre]] |
| **Verre obsidien** | Sable volcanique (Poudre naturel) | Cendre noire | T3 | Lames courtes, miroirs occultes |
| **Verre cosmique** *(T5 stub)* | Sable d'ère + composant ère | Variable | T5 | Lentilles oraculaires (Phase 4) |

> **Note :** un Cristal de Voie pur ≠ Verre de Voie. Le premier est une [[Sources de Ressources|ressource minérale brute]] (gemme), le second est un **fabriqué** qui *contient* du Cristal de Voie broyé. Voir [[Cristal de Voie]].

---

## 3. Tier × Qualité

| Tier | Nom | Sable × | Cendre × | Charbon × | Plaques produites | Maîtrise | Durée |
|------|-----|---------|----------|-----------|---------------------|----------|-------|
| T1 | Plaque commune | 4 | 1 | 4 | 1 | Novice | 240 s |
| T2 | Plaque claire | 4 | 2 | 5 | 1 (uniforme) | Initié | 360 s |
| T3 | Plaque cristalline | 4 + Plomb × 1 | 2 | 6 | 1 (vibrante) | Adepte | 600 s |
| T4 | Plaque de Voie | 4 + Cristal mineur × 1 | 3 | 8 + Essence × 1 | 1 (résonante) | Expert | 1200 s |
| T5 | Plaque cosmique | 4 + composant ère × 1 | 4 | 12 | 1 + variant permanent | Maître + 🔒 | 2400 s |

> **Règle de coulée** : 4 unités de sable → 1 plaque (rendement 4:1). La maîtrise n'augmente pas le rendement (la physique du verre fixe la coulée), mais réduit les défauts (bulles, stries) qui font passer Tier-1.

---

## 4. Recette de production

> Catégorie : **Travail du bois et de la pierre** ([[Crafts]] §7) — sous-branche Verrerie. Station : **Four à verre** (très haute température, dédié) + Lit de cendre + Canne à souffler (pour fioles).

### Recette canonique T2 — Plaque de verre claire

```yaml
tier: 2
métier: Verrier
mastery_required: Initié (palier 2)
station: Four à verre + Lit de cendre
intrants:
  - Sable blanc × 4 (récolte Mineur, désert/rivière)
  - Cendre purifiée × 2 (sous-produit Bûcheron / Bois brûlé)
  - Charbon × 5
durée: 360 s (chauffe 5 min + coulée 1 min)
mini_jeu: timing_température_fournée (jauge montée + jauge stable + jauge coulée) + précision_coulée (étalement uniforme)
sortie: Plaque de verre claire × 1 (T2)
notes:
  - Échec coulée : plaque T1 avec bulles + perte 1 sable
  - Proc Maître : 2 plaques sortie
```

### Recette signature — Plaque de Voie magistrale

```yaml
tier: 4
métier: Verrier Expert + Enchanteur Adepte
mastery_required: Expert Verrerie + Adepte Enchantement
station: Four à verre + Cercle d'enchantement
intrants:
  - Sable blanc fin × 4
  - Cendre rituelle × 3
  - Cristal de Voie mineur × 1 (broyé)
  - Essence spirituelle × 1
  - Charbon × 8
durée: 1200 s (20 min)
mini_jeu: timing_température + canalisation_Voie continue + précision_coulée
sortie: Plaque de Voie × 1 (T4) — résonne avec la Voie du forgeron
```

---

## 5. Variants par ère

| Variant | Effet plaque |
|---------|---------------|
| **Brulé** ([[Les Ères\|Feu Endormi]]) | Plaque ambrée, vitrages +5% chaleur intérieure |
| **Frost** ([[Les Ères\|Sommeil de Glace]]) | Plaque givrée permanente, cosmétique |
| **Verdoyant** | Verre lierre-incrusté, vitraux animés |
| **Brisé** ([[Les Ères\|Échos Brisés]]) | Verre craquelé qui se "répare" : durabilité ±RNG |
| **Spectral** | Verre presque invisible, fenêtres cachées |
| **Pourpre** | Verre opaque pourpre, fioles brume signalétiques |
| **Doré** | Verre doré, vitraux de cathédrale lumineux |
| **Onirique** | Verre qui montre les rêves (cosmétique, peut révéler souvenirs) |
| **Vénérable** | Verre runique, +1 capacité gravée pour fioles |
| **Shadow** | Verre fumé noir, fenêtres anti-détection |

---

## 6. Crafts / items destinés

| Destination | Type plaque | Quantité | Référence |
|-------------|-------------|----------|-----------|
| **Vitrages** (architecture) | Commune, claire, teintée | 1-100 plaques / bâtiment | Branche Architecture (Phase 4) |
| **Fioles** ([[Récipient]] alchimiques) | Claire (Initié), Cristal (Expert) | 1 plaque → 4 fioles standard | [[Récipient]] §recettes |
| **Lentilles** (focus magique, scribes, télescopes) | Cristal, Verre de Voie | 1 plaque → 1-2 lentilles polies | TBD Phase 4 |
| **Vitraux** (cathédrales, temples) | Teintée, Doré (variant) | 50-500 plaques / vitrail | Branche Architecture |
| **Miroirs** (Maroquinerie haute, salons nobles) | Claire + tain métallique | 1 plaque → 1 miroir | TBD |
| **Lames de verre courtes** ([[Dague]] cérémonielle) | Verre obsidien | 1 plaque → 1 dague rituelle | [[Dague]] |

---

## 7. Signatures notables

| Signature | Type | Provenance | Effet |
|-----------|------|------------|-------|
| **Verre clair de Cestra** | Plaque claire T2 | Cestra (cité-port, sable de récif) | Standard commercial, +5% prix de revente |
| **Cristal d'Avalor** | Plaque cristalline T3 | Endora | Bijouterie haute, focus optique |
| **Verre de Voie d'Hibel** | Plaque de Voie T4 | Hibel (cité-académie) | Lentilles oraculaires, tome-vitrine |
| **Obsidienne d'Eldoria** | Verre obsidien T3 | Cratères volcaniques | Miroirs occultes, dagues rituelles |
| **Vitrail de Vytharia** | Plaque teintée T2-T3 | Vytharia | Vitraux narratifs des cités-caves (raconte le lore) |

---

## 8. Décisions ouvertes

- [ ] **Verre cosmique T6** : existe-t-il ou plafond T5 ? Proposition : plafond T5, le verre n'atteint pas T6 (cap matériel — la physique du verre limite)
- [ ] **Cristal de Voie pur vs Verre de Voie** : confirmer la frontière. Cristal = ressource brute ; Verre de Voie = ressource fabriquée qui *contient* du Cristal broyé. Ne pas confondre dans les recettes
- [ ] **Recyclage** : un verre cassé peut-il être refondu ? Proposition : oui, rendement 80%, mais variant cosmique perdu
- [ ] **Vitraux animés** (variant Verdoyant) : effet purement visuel ou narratif ? Proposition : narratif (motif évolue selon ère), mécanique nulle

---

*Liens : [[Items - Index|← Index Items]] · [[Sources de Ressources]] · [[Crafts]] · [[Métiers]] · [[Récipient]] · [[Brique]] · [[Cristal de Voie]]*
