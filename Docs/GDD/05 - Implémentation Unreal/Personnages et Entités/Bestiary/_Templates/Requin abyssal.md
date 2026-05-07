---
tags: [créature, archétype, bestiaire, quadrupède, poisson, prédateur, océan, abyssal]
type: archetype
forme: Quadrupède
taille: Grand
revêtement: [Écaille, Cuir]
sens: [Vision aquatique, Électroception, Détection vibrations, Odorat aquatique du sang]
cognition: Apprenant
socialité: Solitaire
territorialité: Nomade
milieu: [Océan profond, Côte profonde, Failles abyssales]
locomotion: [Nage]
aire_influence: Étendue
reproduction: Vivipare
métamorphose: Aucune
durée_vie: Longue
trophicité: Carnivore
fonction_éco: Prédateur apex marin
pouvoirs: [Frenzy au sang, Morsure broyeuse, Rapidité d'attaque, Embuscade abyssale, Détection sang à 1 km]
élément: "-"
résistances: [Eau, Pression, Physique mineur]
cr: 12
hp_base: 480
loot_table: [Cuir, Écaille, Os, Crocs, Cœur de creature, Sang, Graisse animale, Aileron]
variants_cosmiques: [Shadow, Spectral, Frost, Verdoyant, Brulé, Pourpre, Doré, Brisé, Onirique, Vénérable]
status: drafted
last_review: 2026-05-01
needs_review_for: [combat-aquatique-mécanique, frenzy-sang-déclencheur]
---

> [!note] Archive : ce fichier est conservé comme template paramétrique de référence.
> Voir [[Espèces/Poissons/Abysses/_Description|Poissons/Abysses]] pour les espèces concrètes décomposées de cet archétype.

# 🦈 Requin abyssal — Archétype-référence

> Archétype canonique du **prédateur apex marin** d'Hybelior. Pattern pour requins (blanc, marteau, bouledogue), grands prédateurs aquatiques (orque-géante, leviathan-mineur). Pose le pattern **combat aquatique** (joueur en milieu hostile, mécanique de respiration, mouvement 3D limité).
>
> Voir [[Bestiary/Index]] · [[Tortue ancestrale]] · [[Tentacule abyssal]]

---

## 1. Vue d'ensemble

### Description sensorielle

Le Requin abyssal est un poisson colossal (4-7 m de long, 800-2500 kg). Peau **rugueuse comme du cuir** (denticules cutanés), **écailles fines** sur le dos. Coloration gris-bleu à noir abyssal. **Mâchoire en cône bardée de 4 rangées de dents** (3000+), **œil noir vide**, fentes branchiales latérales.

Sons : **silence absolu** sous l'eau (pas de cri), mais **bruit de remous** caractéristique en attaque rapide. Trace : **proies vidées**, **eau ensanglantée**, fragment d'os de requin parfois visible (mâchoires anciennes).

### Place écologique et culturelle

**Prédateur apex marin** : chasse phoques, dauphins, gros poissons, charognes flottantes (baleines mortes). Régulé par : leviathans cosmiques, créatures planaires, conditions abyssales extrêmes, **chasse à la baleine humaine** (rare — coût élevé).

**Folklore** :
- *Sigeleon (Trinoria)* → requin = symbole maritime, dent montée en talisman
- *Cestra* → requin pâle = présage de tempête divine
- *Pyrtara, Ilthara* → requin-marais (variant adapté) = gardien d'eaux noires
- *Mosrack (Onara)* → requin-cuirassé (variant Brulé/Cendara) = légende du naufrage de la flotte d'Or
- *Cendara* → requin éteint dans la mer du Cendre (variant Brulé) = monture des Forgerons abyssaux

**Importance gameplay** :
- **Première rencontre apex marin** typique d'un joueur Adepte+
- Mentor de **combat aquatique** (gestion respiration, mobilité 3D, fuite vers surface)
- Loot très utile : **Aileron** (composant alchimique rare), **Crocs** (couteaux), **Cuir** (armures aquatiques)

---

## 2. Caractérisation sur les 9 axes V2

### Axe 1 — Morphologie

**Quadrupède Grand** (4-7 m). Revêtement **Écaille + Cuir** (denticules). Sens : **Vision aquatique** moyenne, **Électroception** (détecte impulsions nerveuses à 100 m), **Détection vibrations** (latérale, 200 m), **Odorat aquatique du sang** (1 km — déclencheur Frenzy). Pas d'audition aérienne.

### Axe 2 — Comportement

**Apprenant** : BT + mémoire courte. Mémorise zones de **carcasse** (revient sur charogne). **Socialité Solitaire** (sauf Frenzy multi-individuel — voir §5). **Territorialité Nomade** (suit courants, charogne, troupeaux phoques).

### Axe 3 — Habitat

**Océan profond, Côte profonde, Failles abyssales**. Évite eau douce, eau peu profonde (sauf chasse rare). **Locomotion : Nage (8 m/s croisière, 14 m/s pointe)**. **Aire d'influence Étendue**.

### Axe 4 — Cycle de vie

**Vivipare** (rare pour poisson — 1-3 petits par portée tous les 2-3 ans, gestation 9-12 mois). **Pas de métamorphose**. **Durée de vie Longue** (40-80 ans).

### Axe 5 — Écologie

**Carnivore** (gros poissons 40%, phoques/dauphins 30%, charogne 20%, autres requins 10%). **Méthode : Embuscade abyssale + Frenzy au sang**.

### Axe 6 — Rôle

**Prédateur apex marin**. Pas d'alliance. **Menacé** par : leviathans cosmiques, créatures planaires, **Tentacule abyssal** (cf. archétype).

### Axe 7 — Capacités

**Pas d'élément**. **Pouvoirs** : Frenzy au sang (mécanique canonique), Morsure broyeuse, Rapidité d'attaque, Embuscade abyssale, Détection sang. **Résistances** : Eau, Pression abyssale, Physique mineur. Vulnérable au feu (rare en eau), à l'électricité (Voie de Aetheron / Foudre × 2), aux dégâts perçants à la branchie.

### Axe 8 — Stats

Voir §3. HP base 480 (CR 12). Stamina haute. **Vitesse pointe 14 m/s sous eau** — joueur ne peut pas distancer sans Voie d'Aquor / monture aquatique.

### Axe 9 — Récompenses

**Loot** : 8 ressources (§6). **Aileron** (rare, alchimie). **Combat aquatique XP** spécifique.

---

## 3. Stats par CR

| Variante | CR | HP | Stamina | Vitesse | Morsure dmg | Comportement |
|----------|----|----|---------|---------|-------------|--------------|
| **Jeune requin** | 4 | 180 | 180 | 10 m/s | 22-30 | Curieux, attaque petits |
| **Adulte côtier** | 8 | 320 | 240 | 12 m/s | 36-50 | Pattern complet côtier |
| **Adulte abyssal** *(standard)* | 12 | 480 | 320 | 14 m/s | 50-70 | Pattern complet abyssal |
| **Vétéran** | 16 | 680 | 380 | 14 m/s | 64-90 | Anticipe, ignore parade |
| **Requin-Roi** *(unique régional)* | 18 | 880 | 440 | 15 m/s | 78-110 | Boss continental, Frenzy permanent <40% HP |

> **Calibrage Adulte CR 12** : 480 HP face à joueur Expert (~350 HP). Combat aquatique = **fuite vers surface** = pédagogie obligatoire.

### Régen

| Stat | Hors combat | En combat |
|------|-------------|-----------|
| HP | +3 HP/s en zone abyssale (régen environnementale) | 0 |
| Stamina | +25/s | +10/s |

---

## 4. Attaques canoniques

| Attaque | Type | Stamina | CD | Effet | Telegraph |
|---------|------|---------|----|----|-----------|
| **Morsure broyeuse** | Perçant + Tranchant lourd | 18 | 2.0 s | Dégât base, **Saignement** stack 2 | Mâchoire ouverte (0.5 s) |
| **Charge tournoyante** | Contondant lourd | 50 | 10 s | Sprint 18 m/s, dmg ×1.5 + **stagger** | Recul + virage (0.7 s) |
| **Coup de queue** *(à proximité)* | Contondant | 25 | 4 s | Repousse 5 m, dmg 0.7× | Pivot queue (0.4 s) |
| **Frenzy au sang** *(passif déclenché)* | Mode | drain 5/s | passif | **+30% dmg, +20% vitesse, ignore stagger** pendant 15 s — déclenche sur sang dans l'eau (joueur ou autre proie blessée à <30% HP) | Cercles serrés (visible) |
| **Frappe de branchies** *(joueur frappe branchies)* | Réaction | 30 | 8 s | Recul brutal + Coup de queue ×2 | Réflexe |
| **Tournis** | Mobilité | 15 | 6 s | Cercle 360° autour joueur en 2 s, repositionne attaque | Pivot rapide |

**Pattern IA standard** : Détection → Tournis (observation 4 s) → Morsure broyeuse → recul → Charge tournoyante. **Frenzy si sang détecté** : pattern accéléré. **Phase 2 < 30% HP (Vétéran+)** : Frenzy permanent.

---

## 5. Pouvoirs spécifiques

| Pouvoir | Description |
|---------|-------------|
| **Frenzy au sang** | Voir §4. **Mécanique d'arène canonique aquatique** : sang dans l'eau (joueur blessé OU proie tuée par joueur) déclenche Frenzy. Pédagogie : enseigner la **gestion HP en aquatique** (fuir avant de saigner). |
| **Morsure broyeuse** | Saignement stack 2. À 3 stacks : **HP −1/s pendant 5 s** (mort lente possible). |
| **Embuscade abyssale** | Si profondeur > 30 m + obscurité : embuscade depuis dessous, **× 1.5 dmg** premier coup. |
| **Détection sang** | Joueur saignant détecté à 1 km — **impossible de fuir** sans soin / couverture. |
| **Frenzy multi-individuel** | Si plusieurs requins zone (rare — sauf charogne), **tous entrent en Frenzy** simultanément. Encounter de groupe rare mais létal. |
| **Rapidité d'attaque** | Cooldowns réduits de 30% en Frenzy. |

---

## 6. Loot table

| Ressource | Drop rate (Adulte CR 12) | Modificateur | Métier |
|-----------|---------------------------|--------------|--------|
| **Cuir** *(Cuir abyssal)* | 100% (4-8) | × 2 vétéran, × 3 Roi (intrant armure aquatique) | Dépéceur Adepte |
| **Écaille** | 80% (3-5) | Composant armure | Dépéceur Adepte |
| **Os** | 90% (4-7) | × 1.5 vétéran | Dépéceur Adepte |
| **Crocs** *(Dents de requin)* | 100% (8-15 — multi-rangées) | Couteaux signature | Dépéceur Adepte |
| **Cœur de creature** | 30% adulte — **80% Roi** | Tier alch +2 | Apothicaire Expert |
| **Sang** | 70% (2-4 fioles) | Composant alchimie de prédation | Apothicaire Adepte |
| **Graisse animale** *(Huile de requin)* | 90% (3-6) | Excellent intrant lampe / onguent | Dépéceur Adepte |
| **Aileron** *(rare composant)* | 60% — **100% Roi** | **Composant alchimie Mythique** (potion de Frenzy contrôlé) | Apothicaire Maître |

---

## 7. Variants cosmiques

| Variant | Spécificité |
|---------|-------------|
| **Shadow** | Peau noire, invisible en abysses |
| **Spectral** | Translucide, traverse coque navires |
| **Frost** | Eau gelée autour, peau bleu-pâle |
| **Verdoyant** | Algues fixées (paradoxe — abysses sans lumière) |
| **Brulé** | Mer chaude / volcanique sous-marine, requin de cendre |
| **Pourpre** | Brume aquatique violette, Confusion sur Morsure |
| **Doré** | Halo lumineux, **pacifié** rare en abysses |
| **Brisé** | Téléportation courte (4 m, 8 s CD) |
| **Onirique** | N'apparaît que rêveurs (rare en abysses) |
| **Vénérable** | Géant (10+ m), Frenzy contrôlé |

---

## 8. Comportement IA

### Décisions de combat

- **Détecté** (joueur en eau profonde) : Tournis observation
- **Sang détecté** : Frenzy déclenché — agressivité maximale
- **Joueur en surface (bateau)** : attaque coque (déstabilise — perte HP bateau, joueur tombe à l'eau)
- **HP < 40% (Vétéran+)** : Frenzy permanent
- **Joueur en surface respirant** : tourne 30 s puis désengage si pas attaqué
- **Charogne** : priorise charogne sur joueur si gros (baleine = ignore joueur)

### Cycle Ère

- **Ère du Verbe** (Aquor) : requins **plus actifs**
- **Ère des Échos Brisés** : variant Brisé apparait en abysses
- **Ère du Feu Endormi** : variant Brulé en mer du Cendre

---

## 9. Signatures (PHASE 4 stub)

### Le Maître des Failles (Sigeleon)
- **Localisation** : Failles abyssales au large de Sigeleon (Trinoria)
- **CR** : 18
- **Variante** : Vénérable Requin-Roi
- **Lore** : *« Trois flottes ont sombré sous lui. Les pêcheurs de Sigeleon lui jettent une part de chaque prise. Il accepte. »*

### Le Cuirassé de Cendara
- **Localisation** : Mer du Cendre (Cendara)
- **CR** : 16
- **Variante** : Brulé adulte abyssal (paradoxe — requin volcanique)
- **Lore** : *« Né d'une éruption sous-marine, il a la peau brûlée comme un manteau de cuir cuit. »*

---

## 10. Décisions ouvertes

- **Combat aquatique** : système global à formaliser ([[Combat]] §Aquatique — proposition Phase 3)
- **Frenzy multi-individuel** : encounter de groupe — à playtest
- **Aileron** : composant Mythique unique — à formaliser dans [[Sources de Ressources]]
- **Mer du Cendre** : biome à canoniser ([[Géographie]] §Cendara)

---

*Liens : [[Bestiary/Index|← Index Bestiaire]] · [[Tortue ancestrale]] · [[Tentacule abyssal]] · [[Combat]] · [[Sources de Ressources]] · [[Les Ères]]*
