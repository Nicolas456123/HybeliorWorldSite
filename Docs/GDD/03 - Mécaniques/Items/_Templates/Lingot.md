---
tags: [item, archétype, ressource, fabriqué, intermédiaire, lingot, métal]
type: archetype
category: Récolte
subcategory: Fabriqué
source: Fabriqué
métier_producteur: Forgeron / Métallurgiste / Fondeur
intrants_typiques: [Minerai, Charbon, Fondant]
craft_category: Forge
métiers_consommateurs: [Forgeron, Armurier, Bijoutier, Métallurgiste, Lapidaire]
tier_min: 1
tier_max: 6
era_availability: [toutes]
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-rendement-fonte-par-tier, frontière-Lingot-Alliage, signatures-précieuses-par-pays]
---

# 🧱 Archétype — Lingot

> Premier archétype de la **branche Fabriqué intermédiaire**. Pose les **patterns canoniques** de la fonte (Minerai → Lingot) et l'enchaînement vers [[Alliage]], [[Fil métallique]], [[Gemme taillé]] et tous les items Forge ([[Épée à une main]], [[Hache à une main]], [[Cuirasse]], [[Anneau]]…).

---

## 1. Vue d'ensemble

Le **lingot** est la **forme transformée de base d'un minerai**. Le [[Métiers|Forgeron]] (ou [[Métiers|Métallurgiste]] / Fondeur) fait fondre un Minerai brut récolté par le [[Métiers|Mineur]] (voir [[Sources de Ressources]] §Nature), élimine les scories via un Fondant, et coule un lingot standardisé prêt à l'emploi. C'est l'**unité économique** du métal en Hybelior : on parle en lingots, on stocke en lingots, on commerce en lingots.

**Rôle d'intermédiaire :**
- **Sortie** d'une opération de fonte (Minerai + Charbon + Chaleur)
- **Entrée** dans presque tout craft Forge ([[Épée à une main]] §6, [[Cuirasse]] Phase 2, [[Anneau]], [[Hache à une main]]…), Joaillerie ([[Anneau]], [[Bracelet]]…) et Métallurgie avancée ([[Alliage]], [[Fil métallique]])

**Ancrage culturel :** chaque grand pays a son **standard de lingot poinçonné** ; les lingots de Mosrack portent le poinçon-marteau et sont la référence économique des plaines centrales (voir [[Épée à une main]] §8 *Acier-Mosrack*).

---

## 2. Variations / matériaux

> **Cohérent avec [[Sources de Ressources]] §Nature ligne Minerai.** Chaque matériau a un tier **plancher** (le minerai brut le plus bas auquel on le rencontre) et un tier **plafond** (sa qualité maximale en lingot pur, avant alliage).

| Matériau | Tier plancher | Tier plafond | Note de rareté / lore |
|----------|---------------|--------------|------------------------|
| **Fer** | T1 | T3 | Métal universel, base du monde — partout |
| **Cuivre** | T1 | T2 | Mou, conducteur — outils, fil |
| **Étain** | T1 | T2 | Avec cuivre = bronze (voir [[Alliage]]) |
| **Plomb** | T1 | T2 | Lourd, toxique — projectiles, sceaux |
| **Zinc** | T2 | T3 | Avec cuivre = laiton (voir [[Alliage]]) |
| **Argent** | T2 | T4 | Précieux, anti-mort-vivant léger — bijouterie |
| **Or** | T3 | T4 | Précieux pur, monétaire — bijouterie, dorure |
| **Chrome** | T2 | T3 | Avec fer = acier inoxydable — protection |
| **Tungstène** | T3 | T4 | Très dense, avec acier = acier au tungstène |
| **Mithril** *(rumeur Eldoria)* | T4 | T5 | Léger + résistant — mailles, lames d'élite |
| **Adamantium** | T5 | T6 | Très dur, rare — armures haut tier, anti-magique |
| **Orichalque** | T4 | T5 | Cuivre cosmique — résonant, rituels et focus |
| **Cosmium** *(stub Phase 4)* | T6 | T6 | Résidu cosmique drop d'event d'ère, cf. [[Cosmologie]] |

> Les **alliages nommés du CSV** (Laiton, Bronze, Acier inoxydable, Acier au tungstène, Acier Ivar, Bliysium, Spuelium, Anterium, Déterium) sont **des Alliages, pas des Lingots** — voir l'archétype [[Alliage]] §7 (signatures).

---

## 3. Tier × Qualité — table chiffrée canonique

> **Règle centrale :** la qualité d'un lingot est **héritée du minerai brut + modulée par le palier de Maîtrise du fondeur**. Un Mineur Adepte qui rapporte du Minerai T3 + un Forgeron Initié au four = lingot T2.5 (arrondi inférieur = T2 en sortie standard, sauf proc rare).

### Formule de tier en sortie de fonte

```
Tier_Lingot = floor( (Tier_Minerai + Mod_Mastery + Mod_Station) / divisor )
```

- **Mod_Mastery** : Novice 0, Initié +0.3, Adepte +0.6, Expert +1.0, Maître +1.5
- **Mod_Station** : Four à charbon basique 0, Four amélioré +0.3, Forge cosmique +0.6
- **Divisor** : 1 (le minerai dicte ; le métier raffine, n'invente pas)

### Table de référence

| Tier sortie | Nom commercial | Minerai requis | Palier requis | Charbon × | Durée | Taux échec Novice |
|-------------|----------------|----------------|----------------|-----------|-------|--------------------|
| **T1 Commun** | Lingot brut (de fer / cuivre…) | T1 | Novice | 2 | 60 s | 15% |
| **T2 Façonné** | Lingot façonné | T2 (ou T1+Adepte) | Initié | 3 | 120 s | 8% |
| **T3 Œuvré** | Lingot œuvré | T3 (ou T2+Expert) | Adepte | 4 | 240 s | 5% |
| **T4 Magistral** | Lingot magistral | T3-T4 + métier précis | Expert | 6 | 480 s | 3% |
| **T5 Légendaire** | Lingot légendaire (mithril, orichalque) | T5 brut + variant ère | Maître | 8 | 900 s | 1% |
| **T6 Mythique** | Lingot cosmique (cosmium…) | T6 + composant ère + condition cachée 🔒 | Maître + signature | 12 | 1800 s | 0% (mais quête de fonte) |

> **Pattern canonique** : Charbon = (Tier × 2). Durée x2 par tier. Taux d'échec divisé par ~2 par palier.

---

## 4. Recette de production — pattern Forge

> Catégorie de craft : **Forge** ([[Crafts]] §Forge). Métier : Forgeron / Métallurgiste / Fondeur. Station triplette : **Four à fondre** + (option Bac à scories) + Moule à lingot.

### Recette générique T3 — Lingot d'acier (exemple)

```yaml
tier: 3
métier: Forgeron
mastery_required: Adepte (palier 3)
station: Four à fondre + Moule à lingot
intrants:
  - Minerai de fer × 3        # T3 brut
  - Charbon × 4
  - Fondant × 1               # silice ou poudre naturelle
durée: 240 s
mini_jeu: timing_température_fonte (3 jauges : montée, fonte, coulée)
sortie: Lingot d'acier × 1 (T3)
sortie_qualité: Œuvré (Adepte peut produire jusqu'à T4 sur proc Maître)
notes:
  - Échec mini-jeu : sortie T2 + scories (perte 30% Charbon)
  - Procs Maître : +1 lingot bonus (rendement T+1)
```

### Pattern recette par tier (à propager aux autres minerais)

| Tier sortie | Minerai × | Charbon × | Fondant × | Durée | Mini-jeu |
|-------------|-----------|-----------|-----------|-------|----------|
| T1 | 2 | 2 | 0 | 60 s | timing simple |
| T2 | 3 | 3 | 1 | 120 s | timing 2 phases |
| T3 | 3 | 4 | 1 | 240 s | timing 3 jauges |
| T4 | 4 | 6 | 2 | 480 s | timing 4 jauges + précision coulée |
| T5 | 5 | 8 | 3 | 900 s | timing 5 jauges + canalisation Voie (option) |
| T6 | 6 | 12 | 5 | 1800 s | quête scénarisée — pas de mini-jeu standard |

---

## 5. Variants par ère

| Variant | Ère | Effet sur le lingot |
|---------|-----|----------------------|
| **Brulé** ([[Les Ères\|Feu Endormi]]) | Eldoria | +5% dégâts feu sur tout item forgé à partir |
| **Frost** ([[Les Ères\|Sommeil de Glace]]) | Climata | +résistance givre, durabilité +10% |
| **Verdoyant** ([[Les Ères\|Verdoiement]]) | Terranu | -5% durabilité, +affixe régénération possible |
| **Onirique** ([[Les Ères\|Sommeil Onirique]]) | Somnix | Items forgés persistent à travers le sommeil (cf. [[Champignons]] §7) |
| **Brisé** ([[Les Ères\|Échos Brisés]]) | Tempora | Lingot RNG ±15% rendement (peut couler 2 lingots ou 0) |
| **Pourpre** ([[Les Ères\|Brume Mortelle]]) | Umbra | Affixe *Pourpre* gratuit sur item final |
| **Doré** ([[Les Ères\|Rêve Lumineux]]) | Eldoria | +5% prix de revente |
| **Spectral** ([[Les Ères\|Échos Brisés]]) | Tempora | Lingot translucide, items finaux *Spectral* possibles |
| **Vénérable** ([[Les Ères\|Présages]]) | Fatum | Marquage runique, +1 affixe possible sur item final |
| **Shadow** ([[Les Ères\|Ombre Longue]]) | Noctis | Lingot noir, items à variant *Shadow* gratuit |

> Les variants par ère se **propagent à l'item final** : forger une [[Épée à une main]] avec un *Lingot Brulé* donne une épée à variant *Brulé* permanent.

---

## 6. Crafts / items destinés

| Destination | Tier consommé | Quantité typique | Référence |
|-------------|---------------|-------------------|-----------|
| [[Alliage]] (Métallurgiste) | 2-3 lingots de minerais différents | 2-5 par alliage | [[Alliage]] §4 |
| [[Fil métallique]] (Métallurgiste / Bijoutier) | 1 lingot | 1 lingot → 4-6 m de fil | [[Fil métallique]] §4 |
| [[Épée à une main]], [[Hache à une main]], [[Lance]]… | T1-T6 | 2-3 lingots / arme | [[Épée à une main]] §6 |
| [[Cuirasse]] (Phase 2), [[Heaume]] (Phase 2) | T1-T6 | 4-8 lingots / pièce | TBD |
| [[Anneau]], [[Bracelet]], [[Amulette]] | T2-T6 (précieux) | 1-2 lingots | TBD |
| [[Bouclier]] (renfort métallique) | T1-T4 | 2 lingots | TBD |

> **Lingots précieux** (argent, or, mithril) sont consommés majoritairement en Joaillerie. **Lingots fer/acier/adamantium** majoritairement en Forge d'armes/armures.

---

## 7. Signatures notables

| Signature | Matériau | Tier | Provenance | Effet narratif |
|-----------|----------|------|------------|----------------|
| **Acier-Mosrack** | Acier (fer + carbone) | T3 | Mosrack (cité-forge) | Poinçon-marteau, +10% prix de revente — voir [[Épée à une main]] §8 |
| **Mithril d'Eldoria** | Mithril | T5 | Cités-temple d'Eldoria | Léger, items mailles -20% poids |
| **Or d'Avalor** | Or | T4 | Endora | Pur, base monétaire des bijoux royaux |
| **Adamantium des Profondeurs** | Adamantium | T6 | Cavernes profondes (Bestiaire colosses) | Anti-magique, items résistent à la dispel |
| **Cuivre de Cestra** | Cuivre | T2 | Cestra (cité-port) | Conducteur, base d'orichalque résonant |
| **Plomb de Vytharia** | Plomb | T2 | Vytharia (cités-caves) | Sceaux et reliques anti-Voie |

---

## 8. Décisions ouvertes

- [ ] **Frontière Lingot / Alliage** : un acier (fer + carbone via charbon) est-il un lingot ou un alliage ? Proposition : **lingot** si un seul minerai principal + additif (carbone via charbon), **alliage** si ≥ 2 minerais. Acier = lingot, Bronze = alliage.
- [ ] **Recyclage** : peut-on refondre une arme cassée en lingots ? Proposition : oui, rendement 50% du métal originel, pas de perte de tier mais perte du variant cosmique
- [ ] **Lingot précieux vs commun** : l'or T4 ne devrait pas faire armure (trop mou). Verrouiller via tag *usage_armure: false* sur les lingots précieux ?
- [ ] **Cosmium T6** : drop d'event d'ère uniquement — confirmer que c'est une ressource temporellement limitée (économie raretés)

---

*Liens : [[Items - Index|← Index Items]] · [[Sources de Ressources]] · [[Crafts]] · [[Métiers]] · [[Alliage]] · [[Fil métallique]] · [[Épée à une main]] · [[Anneau]] · [[Les Ères]]*
