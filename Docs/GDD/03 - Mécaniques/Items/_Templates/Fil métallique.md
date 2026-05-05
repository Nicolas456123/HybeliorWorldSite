---
tags: [item, archétype, ressource, fabriqué, intermédiaire, fil, métal]
type: archetype
category: Récolte
subcategory: Fabriqué
source: Fabriqué
métier_producteur: Métallurgiste / Bijoutier
intrants_typiques: [Lingot]
craft_category: Forge
métiers_consommateurs: [Bijoutier, Tisserand, Brodeur, Armurier (mailles)]
tier_min: 1
tier_max: 6
era_availability: [toutes]
status: drafted
last_review: 2026-05-01
needs_review_for: [rendement-étirage-par-tier, fil-magique-Bliysium-vs-Anterium]
---

# 🧵 Archétype — Fil métallique

> Lingot **étiré au tréfilage** en fil long de section fine. Intermédiaire **transversal** : sert à la fois la Joaillerie ([[Anneau]] §recettes), les armures de mailles, et les broderies magiques de [[Tissu]] précieux.

---

## 1. Vue d'ensemble

Le **fil métallique** est produit par étirage répété d'un [[Lingot]] à travers des filières de plus en plus fines. C'est l'opération "post-Lingot" la plus simple métallurgiquement, mais elle débloque trois branches de craft majeures :

1. **Joaillerie** — chaînes de bracelets, montures de bagues, fil de sertissage
2. **Armures de mailles** — anneaux maillés (mille anneaux par cuirasse de mailles)
3. **Broderie magique** — fil d'or/argent/Bliysium pour [[Tissu]] précieux et runes brodées

**Rôle d'intermédiaire :**
- **Sortie** : étirage d'1 Lingot → 4 à 8 mètres de fil (selon métal et tier)
- **Entrée** : recettes Joaillerie ([[Anneau]] §recettes), recettes Mailles ([[Cuirasse]] mailles Phase 2), recettes Broderie ([[Tissu]] §6)

---

## 2. Variations / matériaux

| Matériau | Source Lingot | Tier plancher | Usage principal |
|----------|----------------|---------------|------------------|
| **Fer** | [[Lingot]] de fer | T1 | Anneaux mailles standards |
| **Cuivre** | Lingot cuivre | T1 | Bijouterie économique, fil électrique-rituel |
| **Acier** | Lingot acier | T2 | Mailles militaires, sertissage robuste |
| **Argent** | Lingot argent | T2 | Bijouterie, broderies sacrées (anti-mort-vivant léger) |
| **Or** | Lingot or | T3 | Bijouterie haute, broderies royales |
| **Mithril** | Lingot mithril | T4 | Mailles légères d'élite (Eldoria) |
| **Bliysium** | [[Alliage]] Bliysium | T4 | Broderies magiques, fil de focus |
| **Anterium** | Alliage Anterium | T4 | Fil conducteur de mana, runes brodées |
| **Adamantium** | Lingot adamantium | T5 | Mailles anti-magiques (rare, lourd à étirer) |

---

## 3. Tier × Qualité

| Tier | Nom | Lingot source × | Longueur fil produite | Maîtrise | Durée |
|------|-----|------------------|------------------------|----------|-------|
| T1 | Fil brut | 1 | 4 m | Novice | 60 s |
| T2 | Fil façonné | 1 | 5 m | Initié | 90 s |
| T3 | Fil œuvré | 1 | 6 m | Adepte | 150 s |
| T4 | Fil magistral | 1 | 7 m (uniformité parfaite) | Expert | 240 s |
| T5 | Fil légendaire | 1 | 8 m + résonance préservée | Maître | 480 s |
| T6 | Fil cosmique | 1 + composant ère | 8 m + variant ère permanent | Maître + 🔒 | 900 s |

> **Règle :** un Maître Métallurgiste peut tirer **+50% de longueur** d'un même lingot. Un Novice gaspille 30% en chutes irrécupérables.

---

## 4. Recette de production

> Catégorie : **Forge** (extension fine). Station : **Établi de tréfilage** + Pince à étirer + Filières (4-12 calibres selon tier).

### Recette générique T3 — Fil d'argent œuvré

```yaml
tier: 3
métier: Métallurgiste (ou Bijoutier Adepte+)
mastery_required: Adepte
station: Établi de tréfilage + Filières
intrants:
  - Lingot d'argent × 1 (T3)
  - Huile × 1                # lubrifie l'étirage
durée: 150 s
mini_jeu: rythme_étirage (3 cadences successives, fenêtre 0.8s)
sortie: Fil d'argent × 6 m (T3)
notes:
  - Échec rythme : longueur réduite de 1 m par échec
  - Proc Maître : longueur +50% (9 m)
```

### Recette signature — Fil de Bliysium magistral (broderie magique)

```yaml
tier: 4
métier: Métallurgiste + Bijoutier
mastery_required: Expert + Adepte Bijoutier
station: Établi de tréfilage + Cercle d'enchantement (mini)
intrants:
  - Lingot d'alliage Bliysium × 1 (T4)
  - Huile rare × 1
  - Cristal de Voie mineur × 1 (préserve la résonance pendant l'étirage)
durée: 240 s
mini_jeu: rythme_étirage + canalisation_Voie continue
sortie: Fil de Bliysium × 7 m (T4) — préserve résonance Voie pour broderie magique
```

---

## 5. Variants par ère

| Variant | Effet sur fil |
|---------|----------------|
| **Doré** ([[Les Ères\|Rêve Lumineux]]) | Or étiré pendant Eldoria : broderies T+1 effective |
| **Spectral** ([[Les Ères\|Échos Brisés]]) | Fil translucide, broderies invisibles à 5m |
| **Frost** | Fil cassant à chaud : armures mailles ralentissent les hits feu |
| **Brulé** | Fil rougeoyant léger : broderies portent affixe *DoT feu* possible |
| **Onirique** | Fil persistant en rêve : robes magiques rêve-cohérentes |
| **Verdoyant** | Fil souple : durabilité +5% sur mailles |
| **Pourpre** | Fil opaque : broderies furtivité +5% |
| **Vénérable** | Fil runique : 1 rune gravée gratuitement à la broderie |
| **Brisé** | Fil RNG résistance ±25% par segment |
| **Shadow** | Fil noir : mailles invisibles en faible luminosité |

---

## 6. Crafts / items destinés

| Destination | Type fil | Quantité typique | Référence |
|-------------|----------|-------------------|-----------|
| [[Anneau]] (monture, sertissage) | Or, argent | 0.5 m / anneau | [[Anneau]] §recettes |
| [[Bracelet]] (chaîne) | Or, argent, mithril | 1-2 m / bracelet | TBD |
| [[Amulette]] (chaîne porteuse) | Argent, or | 2 m / amulette | TBD |
| Cuirasse de mailles ([[Cuirasse]] mailles Phase 2) | Fer, acier, mithril | 50-200 m | TBD Phase 2 |
| [[Tissu]] précieux (broderie magique) | Or, Bliysium, Anterium | 2-5 m / robe | [[Tissu]] §6 |
| Cordage rituel (broderie tente, voile, oriflamme) | Cuivre, argent | Variable | TBD |
| [[Boucle d'oreille]], [[Broche]] | Or, argent | 0.2-0.5 m | TBD |
| [[Sceptre]] (enroulements rituels) | Anterium, Bliysium | 1-3 m | [[Sceptre]] |

---

## 7. Signatures notables

| Signature | Matériau | Provenance | Effet |
|-----------|----------|------------|-------|
| **Fil de mailles d'Eldoria** | Mithril | Eldoria (Cités-temple) | Mailles −20% poids, base armures elfes |
| **Fil de cour d'Avalor** | Or pur | Endora | Broderies royales, bonus Verbe quand portées en audience |
| **Fil de Bliysium d'Hibel** | Bliysium | Cité-académie | Broderies focus magique, +5 Esprit sur robe |
| **Fil de relique de Vytharia** | Spuelium étiré | Vytharia (cités-caves) | Anti-Voie, scelle reliques |
| **Tréfil de Mosrack** | Acier | Mosrack | Standard mailles militaires, durabilité +10% |

---

## 8. Décisions ouvertes

- [ ] **Étirage manuel vs station Maître** : un Novice peut-il étirer du Bliysium ? Proposition : non, les alliages T4+ exigent Adepte+ minimum (sinon perte 80% du lingot)
- [ ] **Recyclage** : refondre un fil endommagé en lingot ? Proposition : oui, rendement 70%, pas de perte de tier
- [ ] **Fil cosmique T6** : préserve-t-il les variants d'ère même hors-ère active ? Proposition : oui, le forgeage l'a "scellé" — différence avec items finaux qui n'expriment le variant qu'en ère active
- [ ] **Fil enchanté à la source** : un Bliysium peut-il être étiré + enchanté en une seule passe ? Proposition : oui en Phase 4 via cercle d'enchantement combiné — gain temps mais Maîtrise duale requise

---

*Liens : [[Items - Index|← Index Items]] · [[Lingot]] · [[Alliage]] · [[Sources de Ressources]] · [[Crafts]] · [[Métiers]] · [[Anneau]] · [[Tissu]]*
