---
tags: [items, types, taxonomie, catalogue, mécanique]
type: mechanic
status: drafted
last_review: 2026-05-01
needs_review_for: [archétypes-par-type-phase-2]
---

# 📋 Types d'Items — Catalogue master

> Catalogue exhaustif des **types d'items** identifiés au cadrage. Chaque type est rattaché à exactement UNE [[Catégories d'Items|catégorie]] et — pour les Récoltes — à UNE [[Sources de Ressources|source]]. Phase 2 produira un fichier d'archétype par type majeur.

---

## Catalogue par catégorie

### Consommable

| Type | Sous-fonction | Phase 2 archétype |
|------|--------------|-------------------|
| Boisson | Buff temporaire | ✅ |
| Potion | Soin / mana / dispel | ✅ |
| Parchemin | Sort encapsulé | ✅ |
| Fruits | Nourriture rapide | ✅ |
| Légumes | Nourriture | ✅ |
| Poisson | Nourriture | ✅ |
| Viande | Nourriture | ✅ |
| Fromage | Nourriture longue conservation | ✅ |
| Champignons | Nourriture / alchimique | ✅ |
| Gâteaux | Nourriture festive (buff stamina) | ✅ |
| Épices | Modificateur de cuisine | À grouper en archétype "Aromates" ? |
| Herbes | Modificateur d'alchimie | À grouper en archétype "Aromates" ? |
| Cristal | Énergétique / rituel | ✅ (pont avec [[Le Lien]]) |
| Récipient | Contenant | ✅ |
| Livre Récipient | Contenant magique | ✅ |
| Divers consommables | À scinder | ⚠️ catégorie fourre-tout |

### Équipement

#### Armures (8 slots × 5 classes = combinatoire générée)

| Slot | Type canonique | Variations par classe |
|------|---------------|----------------------|
| Tête | Casque / Heaume / Capuche | Heaume de plate, Casque de mailles, Capuche de cuir, Capuche de tissu |
| Torse | Cuirasse / Plastron / Tunique / Robe | Cuirasse de plate, Plastron de mailles, Tunique de cuir, Robe de tissu |
| Épaules | Pauldrons / Épaulières | Idem 4 classes |
| Bras | Brassards / Manches | Idem |
| Mains | Gantelets / Gants / Mitaines | Idem |
| Taille | Ceinture (armure) | Idem |
| Jambes | Jambières / Cuissardes / Pantalon | Idem |
| Pieds | Bottes / Sandales / Chausses | Idem |

**5 classes** : Tissu / Cuir / Mailles / Plate / Spécial-Exotique (Écaille, Os, Carapace, Biométal, Cristaux)

> Phase 2 : 1 archétype **par slot × classe** = 8 × 5 = 40 archétypes d'armure (suffisant pour la combinatoire générée par Material Generator). Plus 5-10 sets signature par pays.

#### Vêtements non-armure

| Type | Sous-fonction | Phase 2 archétype |
|------|--------------|-------------------|
| Cape | Slot dorsal, situationnel | ✅ |
| Tabard | Couche cosmétique faction/guilde | ✅ |
| Capuche (seule) | Tissu, anonymat | ⚠️ parfois fusionné avec Capuche-armure |
| Robe simple (civile) | Vêtement civil | ✅ |
| Tunique (civile) | Vêtement civil | ✅ |

#### Accessoires

| Type | Slots équipables | Phase 2 archétype |
|------|------------------|-------------------|
| Anneau | 2 (mains gauche/droite) | ✅ |
| Amulette / Collier | 1 (cou) | ✅ |
| Broche / Fibule | 1 (épaule) | ✅ |
| Bracelet | 2 (poignets) | ✅ |
| Boucle d'oreille | 1-2 | ✅ |
| Ceinture-accessoire | 1 (taille, sur ceinture-armure) | ✅ |

#### Focus magiques (non-armes)

| Type | Voie principale d'usage | Phase 2 archétype |
|------|------------------------|-------------------|
| Orbe | Polyvalent (toutes Voies) | ✅ |
| Talisman | Pacte / Ancre rituelle | ✅ |
| Tome / Grimoire | Sorts encapsulés | ✅ (recoupe Livre Récipient) |
| Cristal de Voie | Signature d'une Voie | ✅ — 13 variants (5 Éternels + 8 Cosmiques) |
| Reliure / Bandeau frontal | Focus discret | ✅ |

> ⚠️ **Sceptre** = arme (catégorie Arme, classe magique 1H), pas focus.

#### Outils (par métier)

| Type | Métier | Phase 2 archétype |
|------|--------|-------------------|
| Marteau de forge | Forgeron | ✅ |
| Faux | Fermier / Cueilleur | ✅ |
| Pioche | Mineur | ✅ |
| Hache de bûcheron | Bûcheron | ✅ |
| Canne à pêche | Pêcheur | ✅ |
| Plume / Stylet | Scribe / Enchanteur | ✅ |
| Mortier et pilon | Apothicaire / Alchimiste | ✅ |
| Aiguille / Fuseau | Tisserand / Couturier | ✅ |
| Soufflet | Forgeron / Verrier | ✅ |
| Pince et burin | Lapidaire / Bijoutier | ✅ |
| Couteau de tanneur | Tanneur | ✅ |
| (... 63 métiers total) | Voir [[Métiers]] | À étoffer Phase 2 |

### Récolte (40+ types — voir [[Sources de Ressources]] pour le détail)

#### Nature (21)

Bois, Écorce, Sève, Cœur de plante, Plante, Feuille, Fleur, Racine, Graine, Baie, Champignon, Algue, Céréale, Laine plante, Liquide, Miel, Minerai, Pierre, Gemme brut, Coquille, Poudre naturel

#### Créature (25)

Os, Cuir, Peau, Fourrure, Plume, Écaille, Carapace, Antenne, Aile, Patte, Queue, Corne, Griffe, Œil, Cœur de creature, Organe, Sang, Bave, Venin, Larme, Sécrétion, Œuf, Graisse animale, Laine creature, Essence spirituelle

#### Fabriqué (15 — intermédiaires)

Lingot, Alliage, Fil métallique, Plaque de verre, Brique, Planche, Tissu, Farine, Huile, Cire raffinée, Résine traitée, Pigment, Poudre fabriqué, Émulsion alchimique, Gemme taillé

### Arme

#### Mêlée à une main

| Type | Style | Maîtrise dédiée |
|------|-------|----------------|
| Épée à une main | Polyvalent | [[Armes et Maîtrise#Épée 1H]] |
| Lame | Coupante générique (sabre, scimitar, couteau) | [[Armes et Maîtrise#Lame]] |
| Marteau à une main | Stagger / armor break | [[Armes et Maîtrise#Marteau 1H]] |
| Hache à une main | Saignement | [[Armes et Maîtrise#Hache 1H]] |
| Rapière | Précision, parade | [[Armes et Maîtrise#Rapière]] |
| Dague | Stealth, critique | [[Armes et Maîtrise#Dague]] |
| Sceptre | Focus magique | [[Armes et Maîtrise#Sceptre]] · [[Le Lien]] |

#### Mêlée à deux mains

| Type | Style | Maîtrise dédiée |
|------|-------|----------------|
| Épée à deux mains | DPS lourd | [[Armes et Maîtrise#Épée 2H]] |
| Marteau à deux mains | Stagger lourd, anti-armure | [[Armes et Maîtrise#Marteau 2H]] |
| Hache à deux mains | DPS lourd, anti-bouclier | [[Armes et Maîtrise#Hache 2H]] |
| Lance | Allonge, anti-charge | [[Armes et Maîtrise#Lance]] |

#### Distance

| Type | Style | Maîtrise dédiée | Munition |
|------|-------|----------------|----------|
| Arc | Distance | [[Armes et Maîtrise#Arc]] | Flèche |

#### Défensif

| Type | Style | Maîtrise dédiée |
|------|-------|----------------|
| Bouclier | Block, parade passive | [[Armes et Maîtrise#Bouclier]] |

#### Munitions

| Type | Compagne |
|------|----------|
| Flèche | Arc — variants par tier/matériau/effet (incendiaire, perçante, traceuse, etc.) |

---

## Vue Dataview consolidée *(à activer après création des archétypes Phase 2)*

```dataview
TABLE category, source, tier_max, mastery, status
FROM "03 - Mécaniques/Items/Archétypes"
SORT category, type
```

---

## Notes pour la Phase 2 (archétypes)

Pour chaque type majeur, créer un fichier `Archétypes/<Nom>.md` avec :

```yaml
---
tags: [item, archétype, <catégorie>, <source>]
type: archetype
category: Consommable | Équipement | Récolte | Arme
source: Nature | Créature | Fabriqué | -
tier_min: 1
tier_max: 6
mastery: <Maîtrise associée>
era_availability: [toutes | <liste ères>]
status: drafted
last_review: 2026-XX-XX
---
```

**Sections type d'un archétype** :
1. Vue d'ensemble (1-2 lignes)
2. Catégorie / Source / Tier
3. Variations (sous-types : ex. Épée à 1H → Épée courte / Épée longue / Sabre noble / Cimeterre)
4. Recettes (si fabriqué/cuisiné)
5. Effets gameplay (stats, buff, durée)
6. Variants par ère (Spectral, Brulé, Onirique, etc.)
7. Items signatures connus (pointeurs vers Phase 4)
8. Décisions ouvertes / chantiers de profondeur

---

*Liens : [[Items/Index|← Index Items]] · [[Catégories d'Items]] · [[Sources de Ressources]]*
