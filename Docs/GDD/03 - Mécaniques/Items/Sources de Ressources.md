---
tags: [items, ressources, métiers, taxonomie, mécanique]
type: mechanic
status: drafted
last_review: 2026-05-01
needs_review_for: [biomes-spawn-tables, créatures-loot-tables]
---

# 🌾 Sources de Ressources — d'où viennent les matériaux

> Les ressources d'Hybelior proviennent de **3 sources** distinctes. Chaque ressource appartient à exactement une source. Les **15 ressources fabriquées** sont des intermédiaires : leurs intrants viennent toujours des deux premières sources.

---

## Vue d'ensemble

```
┌────────────────────┐      ┌──────────────────────────┐
│ Récolte NATURE     │──┐   │  FABRICATION             │
│ 21 types brutes    │  │   │  15 types intermédiaires │
└────────────────────┘  │   │  (Forge, Tissage, etc.)  │
                        ├──>└──────────────────────────┘
┌────────────────────┐  │
│ Récolte CRÉATURE   │──┘
│ 25 types brutes    │
└────────────────────┘
```

Les ressources fabriquées sont les **intrants des items finis** (équipements, consommables, armes).

---

## Source 1 — Récolte nature (21 types)

Récoltée dans le monde via les métiers de récolte (Botaniste, Mineur, Bûcheron, Pêcheur, Apiculteur, Herboriste…).

| Type | Sous-catégorie | Métier principal | Biomes principaux *(à confirmer Phase 2)* |
|------|---------------|------------------|-------------------------------------------|
| Bois | Végétal | Bûcheron | Forêts, Jungles |
| Écorce | Végétal | Bûcheron / Botaniste | Forêts |
| Sève | Végétal | Botaniste | Forêts à arbres résineux |
| Cœur de plante | Végétal | Botaniste | Plantes magiques rares |
| Plante | Végétal | Botaniste | Tous biomes |
| Feuille | Végétal | Botaniste | Tous biomes |
| Fleur | Végétal | Botaniste | Plaines, Jardins, Forêts |
| Racine | Végétal | Botaniste | Sous-bois, Marécages |
| Graine | Végétal | Botaniste | Tous biomes |
| Baie | Végétal | Botaniste / Cueilleur | Forêts, Toundras |
| Champignon | Mycologique | Mycologue / Botaniste | Sous-bois, Cavernes, Marécages |
| Algue | Aquatique | Pêcheur / Plongeur | Eaux douces, Côtes |
| Céréale | Cultivé | Fermier | Plaines cultivées |
| Laine plante | Fibreux | Tisserand / Botaniste | Plaines (coton-like), Forêts |
| Liquide | Liquide | Variable | Sources, Lacs, Cavernes |
| Miel | Animal-végétal | Apiculteur | Forêts, Plaines |
| Minerai | Minéral | Mineur | Montagnes, Cavernes |
| Pierre | Minéral | Mineur / Tailleur | Montagnes, Cavernes |
| Gemme brut | Minéral | Mineur | Cavernes profondes |
| Coquille | Aquatique | Pêcheur / Ramasseur | Côtes, Plages |
| Poudre naturel | Minéral / Volcanique | Mineur | Zones volcaniques, Cavernes |

## Source 2 — Récolte sur créature (25 types)

Récoltée par dépeçage des créatures abattues. Métier principal : **Dépéceur** (sous-catégorie Maîtrise dépeçage). Voir [[Bestiaire - Index]] pour les créatures et leurs loot tables.

| Type | Note |
|------|------|
| Os | Tier varie selon créature (humanoïde vs colosse vs cosmique) |
| Cuir | Le plus commun ; tier varie selon créature |
| Peau | Variante moins durable que cuir |
| Fourrure | Mammifères des biomes froids |
| Plume | Aviens, dragons-aviens |
| Écaille | Reptiles, dragons, poissons |
| Carapace | Insectoïdes, crustacés |
| Antenne | Insectoïdes |
| Aile | Aviens, insectoïdes, démons |
| Patte | Cuir spécial selon créature |
| Queue | Variable (pelage, écaille, tentacule) |
| Corne | Bovidés, démons, licornes |
| Griffe | Prédateurs |
| Œil | Composant alchimique rare |
| Cœur de creature | Composant alchimique haut tier |
| Organe | Foie, rein, etc. — alchimie |
| Sang | Composant alchimique très commun |
| Bave | Limaces, dragons, monstres |
| Venin | Serpents, scorpions, araignées |
| Larme | Composant rare (élémentaires, dragons) |
| Sécrétion | Glandes spécialisées (parfum, poison, attractif) |
| Œuf | Aviens, reptiles — peut être nourriture OU composant alchimique |
| Graisse animale | Cuisson, lubrification, base d'huile |
| Laine creature | Mammifères tondus (moutons, alpaca-like) |
| Essence spirituelle | Créatures cosmiques / fantomatiques — composant magique très rare |

## Source 3 — Fabrication (15 types intermédiaires)

Produits par les métiers à partir des deux sources précédentes. Servent d'intrants aux items finis.

| Produit fabriqué | Métier | Intrants typiques |
|------------------|--------|-------------------|
| Lingot | Forgeron / Métallurgiste | Minerai (fondu) |
| Alliage | Métallurgiste | 2+ Lingots de minerais différents |
| Fil métallique | Métallurgiste / Bijoutier | Lingot étiré |
| Plaque de verre | Verrier | Minerai sablonneux + Chaleur |
| Brique | Maçon | Pierre / Argile + Chaleur |
| Planche | Menuisier | Bois travaillé |
| Tissu | Tisserand | Laine (plante ou créature) + Fil |
| Cuir tanné *(implicite)* | Tanneur | Cuir brut + Tannins |
| Farine | Meunier | Céréale moulue |
| Huile | Pressier / Apothicaire | Graine, Fruit, Graisse animale |
| Cire raffinée | Apiculteur / Apothicaire | Miel + Sève |
| Résine traitée | Apothicaire | Sève + Chaleur |
| Pigment | Teinturier | Plante / Fleur / Minerai broyé |
| Poudre fabriqué | Apothicaire / Alchimiste | Minerai / Plante broyée raffinée |
| Émulsion alchimique | Alchimiste | Liquide + Poudre + Composant créature |
| Gemme taillé | Lapidaire / Bijoutier | Gemme brut |

> ⚠️ Cuir tanné n'est pas dans la liste fabriquée mais devrait l'être. Arbitrage Phase 2 : ajouter explicitement, ou garder "Cuir" comme produit fini directement de la récolte.

---

## Mapping métier ↔ source de ressource

> Tableau de référence pour la Phase 2 (archétypes de métier). Voir [[Métiers]] pour la liste complète des 63 métiers.

| Métier | Source(s) | Type d'opération |
|--------|----------|------------------|
| Bûcheron | Nature (Bois, Écorce) | Récolte |
| Botaniste | Nature (Plante, Fleur, Racine, etc.) | Récolte |
| Mineur | Nature (Minerai, Pierre, Gemme brut) | Récolte |
| Pêcheur | Nature (Algue, Coquille) + Créature (poissons) | Récolte mixte |
| Apiculteur | Nature (Miel) | Récolte |
| Mycologue | Nature (Champignon) | Récolte |
| Fermier | Nature (Céréale) | Cultivé |
| Dépéceur | Créature (tous loots créature) | Récolte |
| Forgeron | Fabrication (Lingot, Alliage) → Armes/Armures | Forge |
| Tisserand | Fabrication (Tissu) → Robes/Vêtements | Tissage |
| Tanneur | Fabrication (Cuir tanné) → Armures cuir | Tannage |
| Apothicaire | Fabrication (Huile, Émulsion, Poudre) → Potions | Alchimie / Apothicairerie |
| Alchimiste | Fabrication (Émulsion alchimique, Poudre fabriqué) → Potions haut tier | Alchimie |
| Bijoutier | Fabrication (Gemme taillé, Fil métallique) → Bijoux | Joaillerie |
| Verrier | Fabrication (Plaque de verre) → Vitres, fioles | Verrerie |
| Maçon | Fabrication (Brique) → Construction | Maçonnerie |
| Meunier | Fabrication (Farine) → Boulanger | Meunerie |
| Boulanger | Cuisine (Pain, Gâteaux) | Cuisine |
| Menuisier | Fabrication (Planche) → Mobilier, Arc | Menuiserie |
| Teinturier | Fabrication (Pigment) → Tissus colorés | Teinture |
| Lapidaire | Fabrication (Gemme taillé) → Bijoux | Taille |

---

## À détailler en Phase 2

- **Spawn tables par biome** : pour chaque ressource nature, où elle apparaît exactement (avec densité par ère cosmique — voir [[Les Ères]] et [[Architecture Data-Driven]] §PlantDecoration Generator)
- **Loot tables par créature** : pour chaque créature, quels composants tombent — branché sur [[Bestiaire - Taxonomie des Créatures]]
- **Recettes complètes** : Recipe Generator paramétrise les recettes de fabrication avec intrants/qualité/palier de Maîtrise requis
- **Variants par ère** : un Bois récolté pendant l'Ère du Voile peut être un *Bois Spectral* (variant), affectant les items qu'on en tire

---

*Liens : [[Items - Index|← Index Items]] · [[Catégories d'Items]] · [[Types d'Items]] · [[Métiers]] · [[Architecture Data-Driven]] · [[Bestiaire - Index]]*
