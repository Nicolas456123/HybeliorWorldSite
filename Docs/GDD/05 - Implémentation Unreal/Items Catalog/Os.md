---
tags: [item, archétype, ressource, récolte, créature, os, dépeçage, structure]
type: archetype
category: Récolte
subcategory: Créature
source: Récolte sur créature
mastery: Dépéceur (sous-Maîtrise: Dépeçage osseux)
métier_principal: Dépéceur
créatures_sources: [Loup forestier, Ours brun, Sanglier, Cerf majestueux, Aigle royal, Faucon, Dragon nain, Requin abyssal, Serpent géant, Tortue ancestrale, Truite mystique, Démon mineur, Goblin, Orc]
métiers_consommateurs: [Forgeron, Bijoutier, Apothicaire, Alchimiste, Menuisier, Maçon, Sculpteur]
tier_min: 1
tier_max: 6
era_availability: [toutes]
status: drafted
last_review: 2026-05-01
needs_review_for: [drop-rates-playtest, signatures-9-csv-mapping, os-zocshawk-acier-éternel-pipeline]
---

# 🦴 Os — Archétype ressource créature

> Structure rigide interne des créatures vertébrées. Récolté par dépeçage osseux après prélèvement chair/cuir. **Le squelette est la couche dure** : moins polyvalent que le cuir, mais **plus durable** et **dense en signature** (chaque créature laisse un os reconnaissable). Sert de manche, de focus, de composant alchimique, de matériau de construction et — pour les os signatures — d'**intrant de forge légendaire** (cf. *Os de Zocshawk* → Acier Éternel).
>
> Voir [[Sources de Ressources]] §Récolte créature · [[Bestiary/Index]] · [[Crafts]] §Forge §Joaillerie §Travail du bois et de la pierre

---

## 1. Vue d'ensemble

L'**Os** est la ressource **structurelle** par excellence : tout vertébré en porte. Récolte universelle des dépéceurs, l'os varie radicalement en propriétés selon **la créature source** (densité, élasticité, charge magique résiduelle), **la pièce** (fémur dense, côte plate, crâne ornemental) et **l'âge** (jeune = friable, adulte = optimal, vénérable = parfois cristallisé).

**Pas d'Os chez** : Élémentaires (amorphes), Slimes, Spectres incorporels, Insectoïdes (qui ont une Carapace), Tentacules abyssaux.

**Distinguer de** : Crocs/Griffes/Cornes (sous-types spécialisés ; voir [[Griffe]] et [[Corne]]). Les **Crocs** sont taxonomiquement des os, mais récoltés à part.

---

## 2. Variations / origines créatures

### Mammifères terrestres
- [[Loup forestier]] (CR 4) : os de membre fin, fémur pour manche dague
- [[Ours brun]] (CR 8) : os massifs, idéal manche marteau 2H
- [[Sanglier]] (CR 3) : os trapus, défense de sanglier = sous-type Croc
- [[Cerf majestueux]] (CR 5) : os longs élégants, fémur pour focus magique
- *(Mouton, Bœuf, Cheval — à créer Phase 2)*

### Aviens
- [[Aigle royal]] (CR 6) : os creux légers, idéal flèches sifflantes
- [[Faucon]] (CR 3) : os fins, scribe (stylet), couture aviaire

### Reptiles & Aquatiques
- [[Requin abyssal]] (CR 9) : cartilage dur (os hybride), forge maritime
- [[Serpent géant]] (CR 7) : vertèbres en chapelet, joaillerie totémique
- [[Tortue ancestrale]] (CR 11) : os interne dense sous la carapace
- [[Truite mystique]] (CR 2) : arêtes magiques, alchimie aquatique
- [[Dragon nain]] (CR 13) : os ignifugés ultra-denses

### Humanoïdes & Démoniaques
- [[Goblin]], [[Orc]] : os communs, manches d'outils bas tier
- [[Démon mineur]] (CR 8) : os corrompus, inscription rituelle Voie de Noctis

### 9 signatures CSV (variants nobles)
Voir §7. **Os d'Antérix, Os de Feopsingale, Os de Ceapeecu, Os de Loumatée, Os de Fallilla, Os de Zastalo, Os de Zocshawk, Os de Paboucs, Os de Sparutor** — chacun lié à une créature signature ou un archétype Bestiaire spécifique (mapping P2.5bis).

---

## 3. Tier × Qualité

Le tier de l'os récolté résulte de **CR créature × méthode de dépeçage × palier Maîtrise dépéceur** :

| Tier | Source CR | Qualité dépeçage | Exemple |
|------|-----------|------------------|---------|
| **T1** | CR 1-3 | Novice ou jeune créature | Os de lapin, os de juvénile loup |
| **T2** | CR 4-7 | Initié, créature adulte | Os de loup adulte, os de cerf, os de sanglier |
| **T3** | CR 8-12 | Adepte, créature vétéran | Os d'ours brun, os de tortue ancestrale |
| **T4** | CR 13-18 | Expert, créature signature | Os de dragon nain, os de requin abyssal vétéran |
| **T5** | CR 19-24 | Maître, créature mythique | Os d'Antérix (Ours signature), Os de Zocshawk (Dragon Nain signature) |
| **T6** | CR 25-30 | Conditions cachées 🔒 | Os de Zastalo, Os anciens cosmiques, vénérables |

**Qualité supplémentaire** : Brut (à nettoyer) → Nettoyé → Sculpté → Gravé → Runique → Magistral.

---

## 4. Drop / Récolte

| Critère | Détail |
|---------|--------|
| **Métier** | Dépéceur (sous-Maîtrise *Dépeçage osseux*) |
| **Palier minimum** | Novice (T1-T2), Initié (T3), Adepte (T4), Expert (T5+), Maître (signatures) |
| **Outil requis** | Couteau de tanneur OU Scie d'os (dédiée, T3+) |
| **Drop rate moyen** | 85 % (1-4 unités) sur tous vertébrés ; +1 unité par tier de créature |
| **Mini-jeu** | Découpe précise des articulations (timing) — un échec fragmente l'os (T-1) |
| **Modificateur** | × 1.5 sur créature vénérable, × 2 sur signature (variant), × 0.5 si carcasse vieille (>1 jour) |

> **Modulation temps** : un os récolté >24 h après mort perd un tier (décomposition). Une **fiole de Sang** appliquée dans l'heure préserve la qualité.

---

## 5. Modulation par variant cosmique

Chaque variant Bestiaire produit un **Os signé** :

| Variant créature | Os obtenu | Effet |
|------------------|-----------|-------|
| **Shadow** (Noctis) | Os d'ombre | +Voie de Noctis sur sertis ; absorbe 5 % lumière |
| **Spectral** (Tempora) | Os translucide | Léger (-30 % poids), demi-tangible — focus rare |
| **Frost** (Climata) | Os givré | Ne fond pas ; forge cryogénique |
| **Verdoyant** (Spiritus) | Os mousseux | Couvert de lichen vivant, alchimie Botanique |
| **Brulé** (Eldoria) | Os calciné | Résistant feu, fragile — focus Voie de Feu |
| **Pourpre** (Aetheron) | Os brumeux | Pose Confusion sur arme sertie |
| **Doré** (Celestia) | Os doré | Ne se corrompt pas, sacré, focus Voie d'Eldoria |
| **Brisé** (Tempora aigu) | Os fragmenté | Glitché — dégâts erratiques sur arme |
| **Onirique** (Somnix) | Os de songe | Disparaît à l'éveil — usage rituel uniquement |
| **Vénérable** (Fatum) | Os runique | Marques runiques natives, focus divinatoire |

---

## 6. Crafts destinés

| Métier | Usage | Ref |
|--------|-------|-----|
| **Forgeron** | Manche d'arme (dague, marteau, hache), poignée recouverte de cuir | [[Crafts]] §Forge |
| **Bijoutier / Lapidaire** | Pendentifs taillés, anneaux d'os, broches signature | [[Crafts]] §Joaillerie |
| **Apothicaire / Alchimiste** | Poudre d'os (composant alchimique, calcium magique), os broyé pour émulsion solidifiante | [[Crafts]] §Alchimie |
| **Menuisier / Sculpteur** | Sculpture totémique, manche outil non-métallique, instrument de musique (flûte d'os) | [[Crafts]] §Travail du bois et de la pierre |
| **Maçon** | Mortier d'os calcaire (ciment rituel), construction sépulcrale | [[Crafts]] §Travail du bois et de la pierre |
| **Scribe / Calligraphe** | Stylet d'os taillé (avienne fin), porte-plume | [[Crafts]] §Scriptorium |
| **Enchanteur** | Inscription runique (l'os retient bien la rune) | [[Crafts]] §Scriptorium |

> [!important] Pipeline Acier Éternel
> **Os de Zocshawk** + Cœur de la Cendre Vivante → fondu dans forge spéciale ([[Bestiaire/Archétypes/Dragon nain]] §10) → **Acier Éternel**. Recette palier Maître Forgeron exclusivement. Voir [[Bestiaire/Archétypes/Élémentaire de feu]] §Acier Éternel pipeline.

---

## 7. Signatures notables (9 origines CSV)

| Signature | Créature source proposée | Nation | Usage canonique |
|-----------|--------------------------|--------|-----------------|
| **Os d'Antérix** | Ours brun signature (apex Skaldoria) | Skaldoria | Manche marteau légendaire, totem Vael'Kurash |
| **Os de Feopsingale** | Aigle royal signature avienne (haut sommet) | Galenor / Aerion | Flèches sifflantes, focus Voie d'Aerion |
| **Os de Ceapeecu** | Cervidé signature de Onara (Cerf cosmique) | Onara | Focus magique druidique, sceptre rituel |
| **Os de Loumatée** | Mammifère marin / Loutre géante (Astravia côtes) | Astravia | Outils de Pêcheur expert, manche canne |
| **Os de Fallilla** | Petit prédateur félin (Trinoria savanes) | Trinoria | Dague légère, broche militaire Galenor |
| **Os de Zastalo** | Créature cosmique cataclysmique (Tempora ancien) | Failles temporelles | Composant rituel T6, conditions cachées 🔒 |
| **Os de Zocshawk** | [[Dragon nain]] signature (Cendara/Alkaran) | Cendara, Alkaran | **Intrant Acier Éternel** — palier Maître Forgeron |
| **Os de Paboucs** | Bovidé/Sanglier des marais (Ilthara) | Ilthara | Manche outil Boucher, ceinture-armure |
| **Os de Sparutor** | Reptile géant désertique (Pyrtara) | Pyrtara | Lance, arc rigide, sertis joaillerie |

> [!note] Mapping P2.5bis
> Les 9 origines CSV ont été pré-mappées vers archétypes Bestiaire dans la passe P2.5bis. Cette table fige la convention canonique. À enrichir avec les fiches Pays correspondantes en Phase 4.

---

## 8. Décisions ouvertes

- **Distinction Os vs Crocs vs Griffes** : actuellement Crocs et Griffes sont des sous-types listés à part. Faut-il les fusionner sous "Os spécialisés" ? **Proposition** : garder distincts car **drop rate** et **usages** diffèrent (Crocs = dague tranchante, Os = manche).
- **Os d'humanoïde** (PNJ tué) : récolte taboue dans la plupart des cultures, statut karma rouge — voir [[PvP]]. Quel marché noir ?
- **Décomposition** : faut-il un timer fin (heure par heure) ou un palier (frais/séché/décomposé) ? **Proposition** : 3 paliers, plus lisibles.
- **Os fossile** (récolte par Mineur, pas Dépéceur) : couvert par cette fiche ou archétype Pierre ? **Proposition** : sous-type d'Os via tag `fossile`, métier Mineur en plus.
- **Pipeline Acier Éternel** : recette détaillée à formaliser (intrants, station, palier, mini-jeu) — Phase 2 Recipe Generator.
- **9 signatures × variants cosmiques** : un Os de Zocshawk Brulé est-il pertinent ? Probablement redondant (le dragon nain est déjà igné). **À cadrer**.

---

*Liens : [[Sources de Ressources]] · [[Crafts]] · [[Bestiary/Index]] · [[Loup forestier]] · [[Ours brun]] · [[Dragon nain]] · [[Élémentaire de feu]] · [[Griffe]] · [[Corne]] · [[Cuir]]*
