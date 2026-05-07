---
tags: [index, items, catalogue]
type: index
status: drafted
last_review: 2026-05-01
---

# Catalogue des Items — Index arborescent

> Catalogue **arborescent** d'items concrets (et non plus archétypes plats). La hiérarchie : **Catégorie → Sous-catégorie → Type → Item concret**. Chaque nœud (Catégorie / Sous-catégorie / Type) porte un fichier `_Description.md` qui hérite/extrait du contenu de l'archétype source ; les **feuilles** sont des items concrets nommés (ex. *Épée commune en fer*, *Cometfall - Cristal du Loup*, *Lingot d'acier d'Ivar*).
>
> Le catalogue se construit progressivement : pas d'exhaustivité à T1-T6 systématiquement. Chaque type publie 2-6 items concrets justifiables (T1 commun + milieu de gamme + signature CSV ou inventée).

---

## Branches racines

| Branche | Contenu | Volumétrie cible |
|---------|---------|------------------|
| [[Armes/_Description]] | 14 types d'armes (Mêlée 1H/2H, Distance, Défensif) | 2-6 items/type → ~40-70 items |
| [[Armures/_Description]] | 8 slots × 5 classes (Tissu/Cuir/Mailles/Plate/Spécial) | 1-3 items/slot-classe → ~30-50 items |
| [[Consommables/_Description]] | 11 sous-types (Potions, Pains, Boissons, Parchemins…) | 3-6 items/type → ~40-60 items |
| [[Accessoires/_Description]] | 6 types (Anneaux, Amulettes, Broches, Bracelets, Boucles d'oreille, Ceintures-acc.) | 2-5 items/type → ~20-30 items |
| [[Focus magiques/_Description]] | 5 types (Orbes, Talismans, Tomes, Cristaux de Voie, Bandeaux frontaux) | 2-5 items/type → ~15-25 items |
| [[Vêtements/_Description]] | 6 types (Capes, Tabards, Capuches, Robes, Tuniques, Sacs à dos) | 2-4 items/type → ~15-25 items |
| [[Outils/_Description]] | Outils de craft par métier | 1-2 items/outil → ~15-20 items |
| [[Ressources/_Description]] | Récolte Nature + Récolte Créature + Fabriqué | 3-6 items/type → ~50-80 items |

## Origine du contenu

- **Templates archivés** : `_Templates/` contient les 70+ archétypes paramétriques originaux. Référence normative pour la grille tier × multiplicateurs × affixes.
- **Signatures CSV** : ~65 items nommés dans `AccessExport/Objets.csv` intégrés en items concrets T2-T6 selon leur type.
- **Items canoniques nouveaux** : items T1-T3 standards inventés pour combler les baselines manquantes (ex. *Épée commune en fer*, *Lingot de cuivre*).

## Format d'un item concret

Voir le frontmatter type — chaque item porte `parent_archetype` qui pointe vers le `_Description.md` de son nœud taxonomique. Toutes les valeurs chiffrées sont **héritées** du `_Description.md` (lui-même extrait de l'archétype source).

## Liens canoniques

[[Items/Index]] · [[Catégories d'Items]] · [[Types d'Items]] · [[Sources de Ressources]] · [[Crafts]] · [[L'Accord]] · [[Le Souffle]] · [[Économie]] · [[Métiers]]
