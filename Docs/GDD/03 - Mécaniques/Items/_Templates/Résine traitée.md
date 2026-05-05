---
tags: [item, archétype, ressource, fabriqué, intermédiaire, résine, alchimie]
type: archetype
category: Récolte
subcategory: Fabriqué
source: Fabriqué
métier_producteur: Apothicaire
intrants_typiques: [Sève, Charbon (chaleur)]
craft_category: Alchimie
métiers_consommateurs: [Apothicaire, Tanneur (tannins), Menuisier (vernis), Scribe (encres), Apiculteur (encens)]
tier_min: 1
tier_max: 4
era_availability: [toutes]
status: drafted
last_review: 2026-05-01
needs_review_for: [résine-cosmique-T5-existence, frontière-Tannins-Résine]
---

# 🟤 Archétype — Résine traitée

> Sève brute **chauffée doucement, filtrée, durcie** en pâte ambrée stable. Intermédiaire **multi-usage** : adhésif (luthiers, archers — colle d'arc), tannins (Tanneur — tannage cuir), vernis (Menuisier), encens (avec [[Cire raffinée]]), composant alchimique.

---

## 1. Vue d'ensemble

L'**Apothicaire** prend de la Sève brute (récolte Botaniste, Bûcheron — voir [[Sources de Ressources]] §Nature ligne Sève) et la traite par **chauffage doux + filtration + concentration**. Le résultat est une résine ambrée stable, beaucoup plus pratique que la sève brute (qui est collante, instable, périssable).

**Rôle d'intermédiaire :**
- **Sortie** : 1 brassée de sève → 1 cruche de résine traitée
- **Entrée** : Adhésif universel (collage de [[Planche]], colle d'[[Arc]]), Tannins ([[Sources de Ressources]] §Fabriqué *Cuir tanné* — note résolue dans archétype Cuir Récolte Créature), Vernis bois, Encens (alchimie + religion), Composant alchimique ([[Émulsion alchimique]])

---

## 2. Variations / matériaux

| Type | Sève source | Tier plancher | Usage principal |
|------|-------------|---------------|------------------|
| **Résine de pin** | Sève de pin | T1 | Adhésif standard, tannins |
| **Résine de chêne** | Sève de chêne | T2 | Tannins haut tier (cuir noble) |
| **Résine d'épicéa** | Sève d'épicéa | T2 | Vernis, instruments musicaux |
| **Résine de cèdre** | Sève de cèdre | T3 | Encens religieux, parfumerie |
| **Résine de Cœur de plante** | Sève de Cœur | T4 | Encens magique, alchimie focus |
| **Résine cosmique** *(stub)* | Sève d'arbre cosmique | T4 | Encens oraculaire (Phase 4) |

---

## 3. Tier × Qualité

| Tier | Nom | Sève × | Charbon × | Cruches produites | Maîtrise | Durée |
|------|-----|--------|-----------|---------------------|----------|-------|
| T1 | Résine standard | 4 | 2 | 1 | Novice | 180 s |
| T2 | Résine façonnée (filtrée) | 4 | 3 | 1 | Initié | 360 s |
| T3 | Résine œuvrée (cèdre, encens) | 4 + Pigment × 1 | 4 | 1 | Adepte | 600 s |
| T4 | Résine magistrale (Cœur de plante) | 4 + Cristal mineur × 1 | 6 | 1 (résonante) | Expert | 1200 s |

> Pas de T5/T6 : résine plafonne T4. Au-delà = encens-relique scénarisé.

---

## 4. Recette de production

> Catégorie : **Alchimie** (raffinage doux). Station : **Cucurbite** ou **Marmite à fondre douce** + Filtre + Cruche.

### Recette canonique T2 — Résine de pin façonnée

```yaml
tier: 2
métier: Apothicaire
mastery_required: Initié
station: Cucurbite + Filtre fin
intrants:
  - Sève (de pin) × 4 (T1-T2)
  - Charbon × 3 (chauffe douce)
durée: 360 s
mini_jeu: timing_température_douce + filtration_3_passes
sortie: Résine traitée × 1 cruche (T2)
notes:
  - Sous-produit : Eau résineuse (parfumerie basique)
  - Échec : résine T1 collante non-filtrée + perte 1 sève
  - Proc Maître : 1.5 cruche sortie
```

### Recette signature — Résine de Cœur de plante magistrale

```yaml
tier: 4
métier: Apothicaire Expert + Botaniste Adepte
mastery_required: Expert
station: Cucurbite haute + Cercle d'enchantement (mini)
intrants:
  - Sève de Cœur de plante × 4 (T3-T4)
  - Cristal de Voie mineur × 1 (broyé)
  - Charbon × 6
durée: 1200 s (20 min)
mini_jeu: timing_température + canalisation_Voie continue + filtration_5_passes
sortie: Résine magistrale × 1 cruche (T4) — base d'encens magique focus
```

---

## 5. Variants par ère

| Variant | Effet résine |
|---------|---------------|
| **Verdoyant** | Résine vivace : adhésif régen joints |
| **Brulé** | Résine ambrée brûlante : encens +20% portée fumée |
| **Frost** | Résine durcie : adhésif fragile à chaud |
| **Doré** | Résine dorée : vernis bois prestigieux |
| **Onirique** | Résine onirique : encens persistant en rêve |
| **Vénérable** | Résine pré-runique : encens portent rune gratuite |
| **Pourpre** | Résine brume : encens signalétique faction |
| **Spectral** | Résine translucide : adhésif invisible |
| **Brisé** | Résine RNG durée |
| **Shadow** | Résine noire : encens furtifs, masquent |

---

## 6. Crafts / items destinés

| Destination | Type résine | Quantité | Référence |
|-------------|-------------|----------|-----------|
| **Adhésif universel** (assemblage [[Planche]] mobilier, colle [[Arc]]) | Pin, épicéa | 0.2 cruche / assemblage | [[Arc]], [[Planche]] |
| **Tannins** (Tanneur — note voir Cuir Récolte Créature) | Chêne, cèdre | 0.5 cruche / tannage cuir | Voir note §6.1 |
| **Vernis bois** (Menuisier — finition [[Planche]] noble) | Épicéa, cèdre | 0.1 cruche / m² bois | [[Planche]] |
| **Encens** (avec [[Cire raffinée]]) | Cèdre, Cœur | 0.3 cruche / bâton | [[Cire raffinée]] §6 |
| **Composant alchimique** ([[Émulsion alchimique]]) | Cœur, cosmique | 0.2 cruche / émulsion | [[Émulsion alchimique]] §recettes |
| **Encre** (Scribe — base liant) | Pin, chêne + Pigment | 0.2 cruche / fiole encre | [[Parchemin]] |
| **Sceau secondaire** (cachet provincial — alternative à [[Cire raffinée]]) | Chêne, ambré | 0.1 cruche / sceau | TBD |

### 6.1 Note importante — Tannins et Cuir tanné

> Le **Cuir tanné** (mentionné dans [[Sources de Ressources]] §Fabriqué notes) **n'a pas d'archétype distinct** dans cette vague. Il est documenté dans l'archétype **Cuir** (Récolte Créature, vague suivante) avec un **état "tanné"** produit par le Tanneur à partir de **Cuir brut + Tannins (Résine traitée chêne/cèdre)**. Cet archétype Résine traitée est donc **l'amont** du tannage — la résine de chêne/cèdre est la source des tannins.

---

## 7. Signatures notables

| Signature | Type | Provenance | Effet |
|-----------|------|------------|-------|
| **Résine de pin de Cestra** | Standard T2 | Cestra (forêts côtières) | Adhésif marin, +résistance humidité |
| **Tannins de chêne d'Avalor** | Chêne T2 | Endora | Cuir noble (cf. archétype Cuir Récolte Créature) |
| **Résine de cèdre d'Onara** | Cèdre T3 | Onara | Encens religieux Animari, +Reconnaissance Foedus |
| **Résine de Cœur d'Hibel** | Cœur de plante T4 | Hibel (académie) | Encens focus magique, +5 Esprit en étude |
| **Résine ambrée de Vytharia** | Variant Brulé | Vytharia (cavernes-forêts) | Adhésif et encens des cités-caves |

---

## 8. Décisions ouvertes

- [ ] **Frontière Tannins / Résine** : les tannins sont-ils une résine spécifique (chêne/cèdre) ou ressource séparée ? Proposition : **les tannins sont la résine traitée de chêne/cèdre, pas une ressource indépendante** — économie simplifiée
- [ ] **Conservation** : résine stable indéfiniment en cruche scellée. Proposition : oui
- [ ] **Recyclage** : encens consommé = perte définitive. Vernis bois reposable ? Proposition : non, vernis durci irréversible
- [ ] **Encens fonctionnel** : un encens de Cœur de plante = focus +Esprit, ou simplement narratif ? Proposition : effet mécanique léger (+2 Esprit en zone) en Phase 4
- [ ] **Résine cosmique T5** : confirmer plafond T4 vs T5. Proposition : T4 max, T5 = encens-relique scénarisée (pas tier standard)

---

*Liens : [[Items - Index|← Index Items]] · [[Sources de Ressources]] · [[Crafts]] · [[Métiers]] · [[Cire raffinée]] · [[Émulsion alchimique]] · [[Parchemin]] · [[Planche]] · [[Arc]]*
