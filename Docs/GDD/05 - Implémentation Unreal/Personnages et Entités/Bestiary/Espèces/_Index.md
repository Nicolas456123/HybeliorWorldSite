---
tags: [bestiaire, taxonomie, espèces, index]
type: index-taxonomie
status: drafted
last_review: 2026-05-01
---

# 🐾 Espèces — Index de la taxonomie biologique

> Branche **Espèces concrètes** du Bestiaire d'Hybelior. Réorganisation V2 du Bestiaire en **vraie taxonomie biologique** (catégories → sous-familles → espèces) au lieu d'une liste plate d'archétypes-templates.
>
> Les **28 archétypes paramétriques** d'origine sont conservés en référence dans `Bestiaire/_Templates/` — ils servent de **patrons de production** (forme V2, frontmatter spécialisé, mécaniques canoniques) mais **les feuilles de la taxonomie sont des espèces concrètes**.

---

## Architecture

| Niveau | Exemple | Fichier |
|--------|---------|---------|
| **Catégorie** | Mammifères | `Mammifères/_Description.md` |
| **Famille / sous-famille** | Canidés | `Mammifères/Canidés/_Description.md` |
| **Espèce concrète** | Loup gris | `Mammifères/Canidés/Loup gris.md` |
| **Variant régional** | Loup forestier d'Astravia | `Mammifères/Canidés/Loup forestier d'Astravia.md` |
| **Signature CSV** | Antérix, Sparutor, Zocshawk… | dans la sous-famille adéquate |

## Catégories

- [[Espèces/Mammifères/_Description|Mammifères]] — Canidés, Bovidés, Cervidés, Ursidés, Géants humanoïdes
- [[Espèces/Reptiles/_Description|Reptiles]] — Serpentidés, Tortues, Sauriens (dragons)
- [[Espèces/Oiseaux/_Description|Oiseaux]] — Aigles, Faucons
- [[Espèces/Poissons/_Description|Poissons]] — Eaux douces, Abysses
- [[Espèces/Arthropodes/_Description|Arthropodes]] — Insectes, Crustacés, Arachnides
- [[Espèces/Cosmiques/_Description|Cosmiques]] — Élémentaires, Spectres, Démons, Polymorphes, Fractals, Tentaculaires
- [[Espèces/Amorphes/_Description|Amorphes]]
- [[Espèces/Sapients sauvages/_Description|Sapients sauvages]] — Goblinoïdes, Autres (frontière avec [[PNJ]])

## Frontières taxonomiques

- **Mammifères ↔ Géants humanoïdes** : Yéti reste dans Mammifères (bipède mammalien), pas dans Sapients sauvages (cognition Apprenant tendant vers Sapient via lien soutenu, pas Sapient natif).
- **Cosmiques ↔ Élémentaires/Spectres/etc.** : tous les êtres planaires (sans biologie indigène) sont regroupés sous Cosmiques. Le sous-groupement (Élémentaires, Spectres, Polymorphes, Fractals, Tentaculaires) reflète l'**axe morphologique** dominant.
- **Sapients sauvages ↔ [[PNJ]]** : un Goblin/Orc **clan amical / dialogable / domestiqué** sort du Bestiaire pour devenir PNJ. Pattern de **promotion narrative** canonique.
- **Reptiles/Sauriens** : les dragons sont des reptiles évolués, pas des cosmiques (même Sapients) — leur biologie reste indigène à Hybelior.

## Liens canoniques

- [[Bestiary/Index]] — hub bestiaire
- [[Taxonomie des Créatures]] — 9 axes V2 (frontmatter spécialisé)
- [[Sources de Ressources]] — 25 ressources de récolte créature
- [[Géographie]] — biomes et régions
- [[PNJ]] — frontière Sapients sauvages
- [[Les Ères]] — variants cosmiques (10 visuels par espèce)
- [[Combat]] — CR canonique 1-30
- [[Écosystèmes]] — branche parallèle (chaînes alimentaires par biome)

---

*Dataview catalogue dynamique :*
```dataview
TABLE famille, sous_famille, biomes, cr_range, status
FROM "04 - Systèmes/Bestiaire/Espèces"
WHERE type = "espece"
SORT famille ASC, sous_famille ASC
```

---

*Liens : [[Bestiary/Index|← Index Bestiaire]] · [[Taxonomie des Créatures]] · [[PNJ]] · [[Écosystèmes]] · [[Sources de Ressources]]*
