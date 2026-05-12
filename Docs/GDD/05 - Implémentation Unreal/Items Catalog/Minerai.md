---
tags: [item, archétype, ressource, récolte, nature, minéral, minerai, forge]
type: archetype
category: Récolte
subcategory: Nature
source: Récolte nature
mastery: Minage
métiers_de_récolte: [Mineur]
métiers_consommateurs: [Forgeron, Métallurgiste, Fondeur, Armurier, Bijoutier, Verrier (sable), Maçon (pierre)]
biomes: [Montagnes, Cavernes, Falaises, sites volcaniques, profondeurs cosmiques]
era_availability: [toutes]
tier_min: 1
tier_max: 6
status: drafted
last_review: 2026-05-01
needs_review_for: [extension-CSV-minerais-canon, calibration-tier-mithril]
---

# ⛏ Archétype — Minerai

> Sous-catégorie de la **catégorie [[Catégories d'Items|Récolte]]**, source [[Sources de Ressources#Source 1 — Récolte nature|Récolte nature]]. **Pierre angulaire de la Forge** : tous les métaux du jeu sortent du minerai. Récolté à la pioche par le [[Métiers|Mineur]].

---

## 1. Vue d'ensemble

Le **Minerai** est la matière première de la civilisation industrielle d'Hybelior — extrait des veines minérales par le Mineur. Une fois fondu (forge), il devient **Lingot** (intrant fabriqué) qui alimente armes, armures plate/mailles, outils, bijoux. Plus le minerai est noble, plus le lingot est puissant.

Pattern unique : la **profondeur** détermine le tier. Un Mineur Novice extrait du Cuivre/Étain en surface ; les minerais nobles (Argent, Or) demandent des veines profondes ; le **Mithril** et minerais cosmiques se trouvent uniquement dans les profondeurs des cavernes ou sites cosmiques.

Marqueur cosmologique fort : pays miniers (Altram et Myrtam en Alkaran, Elarian en Celethor, montagnes de Voldenor en Galenor) ont leur métal-signature.

---

## 2. Variations / espèces

| Minerai | Tier nominal | Profil | Lingot produit |
|---------|---|--------|----------------|
| **Cuivre** | T1-T2 | Rouge, mou, conducteur | Lingot de cuivre — outils, conduits |
| **Étain** | T1-T2 | Gris clair, allié au cuivre | Étain → Bronze (alliage) |
| **Plomb** | T1-T2 | Sombre, lourd, toxique | Lingot de plomb — alchimie, scellement |
| **Fer** | T2-T3 | Référence, gris-noir | Lingot de fer — armes/armures standards |
| **Argent** | T3-T4 | Blanc précieux, anti-créature | Argent — bijoux, anti-mort-vivant |
| **Or** | T3-T4 | Précieux, malléable | Or — joaillerie, monnaie |
| **Acier (minerai)** *(rare)* | T3-T4 | Fer + carbone naturel | Acier — armes/armures supérieures |
| **Mithril** | T5 | Léger, dur, magique | Mithril — armes/armures Magistrales |
| **Adamantin** *(rare)* | T5-T6 | Très dur, résistant magie | Adamantin — armures Légendaires |
| **Acier Éternel** *(signature Altram/Myrtam)* | T5-T6 | Légendaire, ne rouille jamais | Voir §7 |
| **Spuelium / Anterium / Déterium / Bliysium** *(CSV)* | T3-T6 | Métaux exotiques nommés | Métaux propriétaires |
| **Minerai Cosmique** *(variant ère)* | T5-T6 | Variants : Frost, Brulé, Spectral | Métal d'ère |

> Voir [[AccessExport]] §Objets type 31 : Laiton, Bliysium, Bronze, Acier inoxydable, Acier au tungstène, Acier Ivar, Spuelium, Anterium, Déterium (alliages et métaux propriétaires).

---

## 3. Tier × Qualité

| Tier | Qualité | Conditions typiques | Yield (par veine) |
|------|---------|---------------------|---------------------|
| **T1** | Brut | Cuivre/Étain de surface, frappe novice | 3-5 unités |
| **T2** | Sain | Fer commun, frappe propre | 5-8 unités |
| **T3** | Bonne qualité | Argent/Or, Mineur Adepte, profondeur | 4-6 unités |
| **T4** | Excellent | Acier, métaux nobles, Mineur Expert | 3-5 unités |
| **T5** | Exceptionnel | Mithril, métaux profonds, Mineur Maître | 2-4 unités |
| **T6** *(signature)* | Mythique | Acier Éternel, métaux cosmiques, condition cachée 🔒 | 1-2 unités |

---

## 4. Spawn / Récolte

| Aspect | Détail |
|--------|--------|
| **Biomes** | **Montagnes** (référence — Voldenor, Thalendil), **Cavernes** (toutes profondeurs), **Falaises** (veines exposées), **sites volcaniques** (Cendara), **profondeurs cosmiques** (Mithril, Adamantin) |
| **Outil requis** | **Pioche** ([[Catégories d'Items#Sous-famille — Outils]]) ; pioche supérieure pour minerais nobles (Mithril nécessite Pioche en acier minimum) |
| **Mini-jeu** | **Rythme de pioche** : timing de frappe (jauge précision) ; bonne cadence = +1 yield et chance de proc qualité +1 tier |
| **Palier de Maîtrise minimum** | Novice (T1-T2) ; Adepte (T3 nobles) ; Expert (T4) ; Maître + condition cachée 🔒 (T5-T6) |
| **Saison favorable** | Indépendant des saisons terrestres ; mais Sommeil de Glace bloque accès aux montagnes hautes |
| **Régénération** | Veine épuisée → respawn lent (7-30 jours selon profondeur) ; veines mythiques = 1× par Partie |

---

## 5. Modulation par ère

| Ère | Effet sur les Minerais |
|-----|------------------------|
| **[[Les Ères#🔥 Ère du Feu Endormi]]** | +25 % qualité Forge globale (voir [[Les Ères]]) · variant **Brulé** sur Fer = "Fer-Cendre" · métaux fondus uniques |
| **[[Les Ères#🌑 Ère de l'Ombre Longue]]** | **Fer-Ombre** (variant **Shadow**) — uniquement extrait pendant cette ère, devient relique après · alchimie obscure |
| **[[Les Ères#❄️ Ère du Sommeil de Glace]]** | Variant **Frost** · Mineurs ralentis (gel) · "Glace Pérenne" récoltable comme minerai exotique |
| **[[Les Ères#⏳ Ère des Échos Brisés]]** | Variant **Spectral** rare · veines qui apparaissent/disparaissent |
| **[[Les Ères#🔮 Ère des Présages]]** | Variant **Vénérable** sur métaux nobles · runes naturelles |
| **[[Les Ères#🌪️ Ère des Vents Bouleversants]]** | Météorites tombent · "Fer-Stellaire" rare en surface |

---

## 6. Crafts destinés

- **[[Crafts]] §1 Forge** : intrant central — fondu en **Lingot** (intrant fabriqué — voir [[Sources de Ressources#Source 3]] : Minerai → Lingot via Forgeron/Métallurgiste).
- **[[Crafts]] §1 Forge** (Métallurgiste) : Alliages (combinaison de Lingots), Acier (Fer + Charbon).
- **[[Crafts]] §6 Joaillerie** : Or et Argent → Bijoux, sertissages.
- **[[Crafts]] §1 Forge** (Bijoutier/Métallurgiste) : Fil métallique (Lingot étiré).
- **[[Crafts]] §7 Travail du bois et de la pierre** (Verrier) : Plaque de verre (Minerai sablonneux + Chaleur).
- **[[Crafts]] §2 Alchimie** : Métaux broyés en composants alchimiques (Or pour potions de prestige, Argent anti-mort-vivant).

---

## 7. Signatures notables

- **Acier Éternel d'Altram & Myrtam** (Alkaran) — légende mondiale ; Fer fondu selon technique ancestrale, ne rouille jamais. T6, condition cachée 🔒 d'apprentissage de la technique.
- **Mithril des Profondeurs d'Ulinor** — sous le Grand Canyon de l'Écho ; armures Magistrales prisées.
- **Fer-Cendre de Cendara** — extrait sur les pentes du Mont Cendra en Feu Endormi ; armes ardentes.
- **Or de Voldenor** (Galenor, Pays libres de Kharazir) — citadelles anciennes, joaillerie noble.
- **Argent Lunaire de Cestra** — Pierres Runiques de Lune des Chamanes des Brumes.
- **Adamantin des Forges Souterraines de Thalendil** (Celethor) — armures Légendaires d'Elarian.
- **Bliysium / Spuelium / Anterium / Déterium** *(CSV)* — métaux propriétaires nommés, signatures à développer Phase 4.
- **Fer-Ombre** *(Ombre Longue)* — relique post-ère, prix exorbitants.

---

## 8. Décisions ouvertes

- [ ] **Pioche tier-gating** : faut-il vraiment une pioche supérieure pour extraire Mithril (gating dur) ou simple bonus de yield ?
- [ ] **Mapping CSV** : Bliysium/Spuelium/Anterium/Déterium = quelle ère / quel pays / quel tier ? Phase 4.
- [ ] **Fer-Ombre relique** : devient-il transmutable en Fer standard après l'ère, ou conservation infinie ?
- [ ] **Veines mythiques 1×/Partie** : drop scripté ou farm libre ? Lien [[Économie]].
- [ ] **Minerais cosmiques** : exclusifs à certaines ères ou apparition rare partout ?

---

*Liens : [[Items/Index|← Index Items]] · [[Catégories d'Items]] · [[Sources de Ressources]] · [[Crafts]] · [[Métiers]] · [[Les Ères]] · [[Pierre]] · [[Gemme brut]] · [[Poudre naturel]] · [[Cuirasse]]*
