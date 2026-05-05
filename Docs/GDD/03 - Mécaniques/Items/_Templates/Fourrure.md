---
tags: [item, archétype, ressource, récolte, créature, fourrure, dépeçage, biome-froid]
type: archetype
category: Récolte
subcategory: Créature
source: Récolte sur créature
mastery: Dépéceur (sous-Maîtrise: Dépeçage cuir + traitement pelage)
métier_principal: Dépéceur
créatures_sources: [Loup forestier, Ours brun, Cerf majestueux]
métiers_consommateurs: [Tanneur, Couturier, Tailleur, Maroquinier, Sellier]
tier_min: 1
tier_max: 5
era_availability: [toutes — favorisée Sommeil de Glace]
status: drafted
last_review: 2026-05-01
needs_review_for: [biomes-froid-mapping, fourrure-vs-cuir-bundle]
---

# 🟫 Fourrure — Archétype ressource créature

> Pelage dense des mammifères des biomes **froids** (taïga, toundra, montagne, biome enneigé). Récolte secondaire au Cuir : on prélève d'abord le Cuir avec le pelage encore attaché, puis on **sépare** la Fourrure pour transformation textile distincte. Sert à **vêtements chauds, capes, doublures, tapis, couvertures**.
>
> Voir [[Sources de Ressources]] §Récolte créature · [[Crafts]] §Travail du cuir + §Tissage · [[Cuir]] (archétype frère)

---

## 1. Vue d'ensemble

La **Fourrure** est le revêtement isolant qui garde les mammifères des biomes froids en vie. Récoltée comme **bonus du dépeçage cuir** (× 2 quantité si biome froid), elle se travaille séparément :
- **Brossée et nettoyée** par le Dépéceur (sous-Maîtrise *traitement pelage*)
- **Tannée avec pelage attaché** (cuir + fourrure ensemble) OU **séparée** pour devenir une **fibre textile chaude**

**Pas de Fourrure chez** : Reptiles (écailles), Aviens (plumes), Élémentaires/Slimes/Spectres (rien), Insectoïdes (poils-soies, voir [[Sécrétion]]). Mammifères tropicaux donnent de la Fourrure **basse densité** (T1 max), peu valorisable.

---

## 2. Variations / origines créatures

### Mammifères froids (T2-T4)
- [[Loup forestier]] (CR 4) en biome **Taïga/Toundra** : Fourrure × 2, dense, isolante
- [[Ours brun]] (CR 8) en biome **Montagne/Forêt boréale** : Fourrure massive, idéale capes lourdes
- [[Cerf majestueux]] (CR 5) variant nordique : Fourrure tachetée, vêtements raffinés

### Mammifères tropicaux (T1)
- [[Loup forestier]] en biome chaud : Fourrure rase, basse densité, peu valorisée
- [[Sanglier]] : pas de vraie Fourrure (Cuir + soies, voir [[Cuir]])

### Mammifères mythiques (T4-T5)
- *Yeti* (à créer, Bestiaire Phase 2) : Fourrure légendaire des hauts sommets
- *Mammouth ancien* (à créer) : Fourrure colossale, capes royales

### Variants cosmiques (T3-T5)
- **Frost Wolf** → Fourrure givrée, conserve la fraîcheur
- **Doré Wolf** → Fourrure dorée, cosmétique signature
- **Vénérable** → Fourrure runique, focus divinatoire

---

## 3. Tier × Qualité

| Tier | Source CR / Biome | Exemple | Usage typique |
|------|-------------------|---------|---------------|
| **T1** | CR 1-3 / biome chaud | Fourrure de loup tropical | Doublure intérieure |
| **T2** | CR 4-7 / biome tempéré | Fourrure de loup standard | Cape légère, manteau |
| **T3** | CR 4-7 / biome froid (× 2 densité) | Fourrure de loup taïga, Fourrure de cerf nordique | Cape isolante Adepte |
| **T4** | CR 8-12 / biome froid | Fourrure d'ours brun, Fourrure de yéti juvénile | Cape Maître éclaireur |
| **T5** | CR 13+ / signatures | Fourrure d'Antérix, Fourrure dorée d'Eldhoryn | Capes royales, cosmétiques uniques |

---

## 4. Drop / Récolte

| Critère | Détail |
|---------|--------|
| **Métier** | Dépéceur (sous-Maîtrise *Dépeçage cuir* + *traitement pelage*) |
| **Palier minimum** | Novice (T1-T2), Initié (T3), Adepte (T4), Expert (T5) |
| **Outil requis** | Couteau de tanneur + Brosse à pelage (T3+) |
| **Drop rate** | 90 % sur mammifères ; **× 2 unités en biome froid** ; × 3 sur alpha/colosse |
| **Mini-jeu** | Brosser dans le sens du poil + retirer en bandes propres ; échec = pelage taché (T-1) |
| **Modificateur saisonnier** | Hiver = +50 % densité ; Été = -30 % (créature mue) ; Ère **Sommeil de Glace** = × 2 |

> **Bundle Cuir+Fourrure** : tannage avec pelage attaché donne un **Cuir-Fourrure** (item composite) — +chaud, -souplesse. Recette Tanneur palier Adepte.

---

## 5. Modulation par variant cosmique

| Variant | Fourrure obtenue | Effet |
|---------|------------------|-------|
| **Shadow** | Fourrure d'ombre | Camouflage zone sombre |
| **Spectral** | Fourrure translucide | Léger flou visuel sur porteur |
| **Frost** | Fourrure givrée | Résistance Froid +30 %, immune cryogénie légère |
| **Verdoyant** | Fourrure mousseuse | Régen Stamina forêt |
| **Brulé** | Fourrure cendrée | Résistance Feu, signe de paradoxe |
| **Pourpre** | Fourrure brumeuse | Camouflage brume Umbra |
| **Doré** | Fourrure dorée | **Cosmétique signature**, brille faiblement |
| **Brisé** | Fourrure fragmentée | Texture glitchée, esthétique unique |
| **Onirique** | Fourrure de songe | Disparaît à l'éveil |
| **Vénérable** | Fourrure runique | Marques argent, focus divinatoire |

---

## 6. Crafts destinés

| Métier | Usage | Ref |
|--------|-------|-----|
| **Tanneur** | Cuir-Fourrure tanné (composite) | [[Crafts]] §Travail du cuir |
| **Couturier / Tailleur** | Capes, manteaux, doublures de [[Cuirasse]] et [[Bottes]] | [[Crafts]] §Tissage |
| **Maroquinier** | Sacs doublés fourrure (régions froides) | [[Crafts]] §Travail du cuir |
| **Sellier** | Selles et harnais doublés (montures alpines) | [[Crafts]] §Travail du cuir |
| **Décorateur / Sculpteur** | Tapis, couvertures, parures domestiques | [[Crafts]] §Bois |

---

## 7. Signatures notables

| Signature | Créature source | Usage canonique |
|-----------|-----------------|-----------------|
| **Fourrure d'Antérix** | Ours brun signature Skaldoria | Cape Maître Vael'Kurash, totem clan |
| **Manteau de Vargheist** | Loup vétéran Vénérable Ulinor | Cape unique cosmétique |
| **Fourrure dorée d'Eldhoryn** | Doré Wolf signature Galenor | Cape royale, conditions Accord 75 % |
| **Fourrure de Yeti des Cimes** | Yeti signature Celethor | Cape Maître anti-froid extrême |

---

## 8. Décisions ouvertes

- **Bundle vs séparé** : faut-il forcer le Cuir-Fourrure composite, ou laisser séparation par Dépéceur palier 3+ ? **Proposition** : séparation = palier 3+ (perte 10 % qualité), bundle automatique sinon.
- **Mue saisonnière** : récolter une touffe de mue (sans tuer) = quantité réduite mais éthique. **Proposition** : oui, accessible Cueilleur palier 2+, drop T1.
- **Fourrure synthétique** (Voie de Vesta?) : tissage de laine plante avec sève réchauffante peut-il imiter ? **Proposition** : oui, sous-archétype textile alternatif (voir [[Laine creature]]).
- **Variants cosmiques + signature** : Antérix Frost donne quoi ? Probablement Fourrure de mythe (T6 conditions cachées). À cadrer.

---

*Liens : [[Sources de Ressources]] · [[Crafts]] · [[Cuir]] · [[Laine creature]] · [[Cuirasse]] · [[Bottes]] · [[Loup forestier]] · [[Ours brun]] · [[Bestiaire - Index]]*
