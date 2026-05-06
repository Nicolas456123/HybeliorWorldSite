---
tags: [créature, archétype, bestiaire, polymorphe, sapient, gardien, spiritus, planar]
type: archetype
forme: Polymorphe
taille: Variable
revêtement: [Brume vivante, Lumière mutable]
sens: [Vision diurne, Vision 360°, Détection magique, Perception des intentions]
cognition: Sapient
socialité: Solitaire
territorialité: Fixe
milieu: [Forêt sacrée, Sanctuaires, Cercles de pierres, Planar (astral, éthéré), Sources de Spiritus]
locomotion: [Marche, Lévitation, Téléportation courte, Phasage]
aire_influence: Régionale
reproduction: Bourgeonnement
métamorphose: Réversible
durée_vie: Immortelle
trophicité: Détritivore énergétique
fonction_éco: Gardien rituel / Témoin spirituel
pouvoirs: [Forme adaptée à l'observateur, Vision des intentions, Téléportation rituelle, Verdict, Bénédiction conditionnelle, Dissolution]
élément: Âme
résistances: [Physique 70%, Anti-tempo, Anti-énergie partielle, Poison total]
cr: 8-22
hp_base: 380
loot_table: [Essence spirituelle, Larme, Sécrétion (rosée spirituelle), Cœur de creature (cristal d'Âme)]
variants_cosmiques: [Shadow, Spectral, Frost, Verdoyant, Brulé, Pourpre, Doré, Brisé, Onirique, Vénérable]
status: drafted
last_review: 2026-05-01
needs_review_for: [perception-intentions-mécanique, forme-rituelle-cible, dialogue-Phase4]
---

> [!note] Archive : ce fichier est conservé comme template paramétrique de référence.
> Voir [[Espèces/Cosmiques/Polymorphes/_Description|Cosmiques/Polymorphes]] pour les espèces concrètes décomposées de cet archétype.

# 🌫️ Esprit changeforme — Archétype-référence

> Archétype canonique du **gardien polymorphe spirituel** d'Hybelior. Pose le pattern **Polymorphe + Sapient** (lié à Spiritus), distinct du [[Métamorphe]] (prédateur sauvage Apprenant). L'Esprit ne **chasse pas** — il **juge**. Il prend la forme attendue par l'observateur (rite d'initiation, défi spirituel, archétype culturel). Premier vrai combat de **dialogue + jugement** du bestiaire.
>
> Voir [[Bestiaire - Index]] · [[Métamorphe]] · [[Spectre des Ères]] · [[Cosmologie]]

---

## 1. Vue d'ensemble

### Description sensorielle

L'Esprit changeforme **n'a pas de forme propre** — il est **brume lumineuse vivante** au repos (silhouette humanoïde indistincte de 2-4 m, halo doré-argenté, particules flottantes). Devant un observateur, il **se reforme** en 3-5 secondes en la silhouette **attendue par cet observateur** (issue de sa culture, ses peurs, ses espoirs).

**Pattern canonique de forme adoptée** :
- *Lié de Voie d'Eldoria* le voit en **figure de mentor solaire** (sage doré, lumière diffuse)
- *Lié de Voie de Vael'Kurash* le voit en **passeur en cape sombre** (silhouette voilée, faux courte)
- *Onarien* (Plaines Libres) le voit en **chamane à plumes** (totemique, mêlant animal et humain)
- *Skaldorien* le voit en **ancêtre-loup géant**
- *Voyageur sans foi forte* le voit en **lui-même légèrement décalé** (effet miroir troublant — signature canonique)

Sons : **silence absolu** quand observé, **murmures multilingues** dans les angles morts. Lumière : éclaire à 5-10 m, intensité variable selon l'humeur (jugement bienveillant = doré chaud ; jugement défavorable = blanc froid).

### Place écologique et culturelle

**Gardien rituel / Témoin spirituel** — pas créature de chasse, créature de **lieu**. Garde un **sanctuaire** (cercle de pierres, source sacrée, arbre-totem, faille de Spiritus). Son rôle : **juger** les visiteurs, accorder/refuser passage, bénir ou maudire. Affinité forte **Spiritus**, secondaire **Tempora** (perception du passé), **Eldoria** (lumière).

**Folklore** :
- *Cestra* → "**Les Présents Toujours**", esprits de Spiritus, vénérés ; Druides du Verbe Doux dialoguent avec eux
- *Skaldoria* → "**L'Ancien**", apparaît au rite de passage de Vael'Kurash
- *Galenor (Trinoria)* → "**Le Maître au Visage Choisi**", légende des duels d'esprit
- *Onara* → "**Le Totem Mouvant**", apparaît aux visions chamaniques
- *Eldhoryn* → "**Le Doré**", gardien doré de la Source de l'Aube

**Importance gameplay** :
- Première **rencontre de jugement** (pas combat obligatoire) typique d'un joueur Adepte-Expert
- Pédagogie : enseigne au joueur que **toutes les créatures ne se combattent pas**
- **Pivot de Voie spirituelle** : peut accorder palier de Voie de Spiritus / Eldoria si jugement favorable
- Loot **uniquement si combat** (rare et précieux : Essence d'Âme, Larme spirituelle)

---

## 2. Caractérisation sur les 9 axes V2

### Axe 1 — Morphologie & Physiologie

**Polymorphe + Sapient**. Forme native = **brume lumineuse anthropomorphe** indistincte. Taille **Variable** (2-4 m forme native, ajustée à la forme adoptée). Revêtement **Brume vivante** + **Lumière mutable** (peut imiter cuir, plumes, métal, mais ce sont des illusions cohérentes — pas de matière réelle ; à la frappe, l'observateur traverse partiellement). Sens : **Vision 360°**, **Détection magique** (50 m), **Perception des intentions** (lit hostilité/respect du joueur — base du jugement), **Vision diurne** standard.

> [!important] Cap de taille spirituel
> Contrairement au [[Métamorphe]], l'Esprit changeforme **peut dépasser** sa taille native (en forme rituelle uniquement) **si le joueur s'attend à une figure colossale** (ex. dragon-ancêtre). Coût : drainage massif d'Essence (équivalent perte de 10% HP/min). Convention : **forme rituelle Colosse maximale, max 5 min en combat**.

### Axe 2 — Comportement & Cognition

**Sapient** : Behavior Tree + dialogue + planification + **mémoire longue** (souvent millénaire). L'Esprit **se souvient** des visiteurs précédents — il peut citer des paroles d'un ancêtre du joueur. **Socialité Solitaire** (un esprit par sanctuaire). **Territorialité Fixe** (lié à son sanctuaire, ne peut s'éloigner > 1 km sans drainage). **Communication** : voix (multilingue, langue maternelle de l'observateur), postures, **télépathie courte** (uniquement avec Liés à Spiritus / Voie de Verbe Doux).

### Axe 3 — Habitat & Mobilité

Milieux : **Forêt sacrée, Sanctuaires, Cercles de pierres, Planar, Sources de Spiritus**. Évite : zones désacralisées, routes commerciales. **Locomotion : Marche** (sous forme adoptée), **Lévitation** (sous forme native), **Téléportation courte** (10 m, rituelle), **Phasage** (peut traverser pierre du sanctuaire). **Aire d'influence Régionale** mais **liée au sanctuaire** (l'esprit se dissout s'il s'éloigne).

### Axe 4 — Cycle de vie & Reproduction

**Bourgeonnement** rare (un esprit majeur peut **engendrer** un esprit mineur en cédant 30% de son Essence — événement rare, 1 par millénaire). **Métamorphose Réversible** (à volonté). **Durée de vie Immortelle** sur le plan astral, **Longue** en manifestation matérielle (jusqu'à dissolution forcée).

### Axe 5 — Écologie & Régime alimentaire

**Détritivore énergétique** : se nourrit de **prières, méditations, rituels** accomplis dans son sanctuaire. Pas de chasse. **Méthode** : **Absorption d'énergie** (Spiritus, Voie de Verbe Doux). Ne mange pas, ne boit pas.

### Axe 6 — Rôle & Relations

**Gardien rituel / Témoin spirituel**. **Alliances : Pacte magique** (avec Liés de Spiritus, Druides du Verbe Doux, Élus d'Eldoria). **Partenariat planaire** avec autres esprits du même panthéon. **Menacé** par : profanateurs (Voie de Vortex, Voie de Vide), démons mineurs envoyés en assaut, **dévot transformé en blasphémateur** (lore-driven), gel ou destruction du sanctuaire.

### Axe 7 — Capacités & Affinités

**Élément : Âme** (Spiritus). **Pouvoirs** : Forme adaptée à l'observateur (passive, automatique), Vision des intentions (lit hostilité 0-100%), Téléportation rituelle (dans le sanctuaire uniquement), **Verdict** (mécanique de jugement — voir §5), Bénédiction conditionnelle (donne palier Voie ou objet rituel si jugement favorable), Dissolution (fuite planaire si HP < 10%). **Résistances** : Physique 70% (corps semi-incorporel), Anti-tempo (résiste manipulation temporelle), Anti-énergie partielle, **Poison total** (immunité — pas d'organes biologiques). **Vulnérabilité** : Voie de Vortex (×2.5), Voie de Vide (×3), Fer froid forgé en Voie de Vael'Kurash (×2 — lore canonique).

### Axe 8 — Statistiques de jeu

Voir §3. HP base 380 (CR 12 standard adulte). **Pas de Stamina** (créature spirituelle). **Mana / Essence** (jauge dédiée 200 pts ; régen +10/s dans sanctuaire, +2/s hors).

### Axe 9 — Récompenses & Interactions

**Loot uniquement si combat** (§6). **Bénédiction** = **alternative au loot**, peut être **plus précieuse** (palier Voie). **XP accordée** ×1.6 vs créature physique de même CR (récompense la difficulté Sapient + magique). **Événements** : *Rite d'initiation* (jugement, choix moral), *Pacte de Voie* (Phase 4 — accède Voie de Spiritus), *Sanctuaire profané* (combat forcé, lore-driven).

---

## 3. Stats de combat par CR

### Table de variantes par maturité — Esprit changeforme

| Variante | CR | HP | Essence | Vitesse | Dégâts type | Comportement |
|----------|----|----|---------|---------|-------------|--------------|
| **Veilleur** *(jeune, sanctuaire mineur)* | **8** | 280 | 140 | 6 m/s | 24-34 (lumière) | Pacifié par défaut, juge simple |
| **Gardien** *(adulte, standard)* | **12** | 380 | 200 | 7 m/s | 36-50 | Pleinement opérationnel, dialogue, verdict |
| **Ancien** *(sanctuaire majeur)* | **17** | 580 | 320 | 7 m/s | 50-70 | Phases multiples, forme rituelle Colosse possible |
| **Avatar** *(unique régional)* | **22** | 920 | 500 | 6 m/s | 70-95 | Boss conditionnel, parle plusieurs langues, miracles mineurs |

> **Calibrage Gardien CR 12** : 380 HP face à un joueur Expert (~350 HP, ~50 dmg/coup léger). Mais **le combat est presque toujours évitable** — le joueur qui dialogue avec respect obtient passage. Combat **lisible 80-120 s** quand provoqué.

### Régen et endurance

| Stat | Hors sanctuaire | En sanctuaire |
|------|------------------|----------------|
| HP | +1 HP/s | +6 HP/s |
| Essence | +2/s | +10/s |

**Mécanique de phase** : à **50% HP**, l'Esprit **change de forme** (passe de figure attendue → forme native brume — désorientation joueur 1.5 s). À **20% HP**, peut activer **Dissolution** (fuite planaire, retour le lendemain dans le sanctuaire à HP plein — *combat répétable*).

---

## 4. Attaques canoniques

| Attaque | Type | Coût Essence | Cooldown | Effet | Telegraph |
|---------|------|---------------|----------|-------|-----------|
| **Frappe lumineuse** | Magique Âme | 12 | 1.5 s | Dégât base, **Aveuglement** 1 s sur 30% chance | Halo (0.4 s) |
| **Verdict** *(canonique)* | Magique Âme (utility) | 50 | 30 s | Lit hostilité 0-100%. Si > 70% → buff l'esprit (+20% dmg 10 s) ; si < 30% → désengage et **propose dialogue** ; entre = combat standard | Voix amplifiée (1.0 s) |
| **Téléportation rituelle** | Mobilité | 25 | 8 s | Reposition 10 m dans sanctuaire ; CD 8 s | Flash (0.5 s) |
| **Onde de jugement** | AoE Âme | 70 | 20 s | Onde rayon 8 m, dmg ×1.2, **applique malus** selon orientation Voie joueur (Vortex → ×1.5 dmg) | Compression (1.0 s — **fenêtre interrupt**) |
| **Forme rituelle Colosse** *(Ancien+, 5 min max)* | Buff transformation | 100 | une fois par combat | Devient Colosse (taille ×2.5, dmg ×1.4, vitesse −20%) ; coûte 10% HP/min | 1.5 s — vision spectaculaire |
| **Dissolution** *(< 20% HP)* | Fuite planaire | gratuit | déclenché | Disparaît, sanctuaire reste accessible, retour lendemain à HP plein | 2 s — **fenêtre dernière frappe** |
| **Bénédiction** *(non-hostile)* | Utility (rituel) | 200 (vidé) | quête-driven | Si jugement >70% favorable, accorde **palier de Voie** ou objet rituel | scénarisé |

**Pattern d'attaque IA** : **Verdict en ouverture systématique** (le joueur doit avoir l'occasion de désengager). Si combat : Frappe lumineuse + téléportation rituelle pour repositionner + Onde de jugement à mi-combat + forme rituelle si Ancien+. Au < 20% HP : Dissolution.

---

## 5. Pouvoirs spécifiques de l'Esprit changeforme

| Pouvoir | Description | Activation |
|---------|-------------|------------|
| **Forme adaptée à l'observateur** | Lit la culture / attentes / peurs / Voie du joueur, prend la forme attendue. **Multi-joueur** : prend la forme du joueur le plus dominant. | Passive (automatique) |
| **Vision des intentions** | Lit hostilité 0-100% à la rencontre. Détermine le Verdict. | Passive |
| **Verdict** | **Mécanique canonique** : 3 issues — Hostile (combat boost), Neutre (combat standard), Pacifique (dialogue obligatoire ; combat impossible sans premier coup joueur). | Actif rituel |
| **Téléportation rituelle** | 10 m, intra-sanctuaire uniquement. | Actif |
| **Bénédiction conditionnelle** | Si jugement >70% favorable + offrande appropriée + dialogue complet = palier de Voie OU objet rituel. **Alternative au loot.** | Quête-driven |
| **Dissolution** | < 20% HP : fuite planaire, retour le lendemain. **Combat répétable** mais pas de loot ce jour. | Passive (déclenchée) |
| **Forme rituelle Colosse** | Ancien+ uniquement. Drain HP 10%/min, taille ×2.5. Spectacle de combat. | Actif |

> [!important] Pédagogie de design
> L'Esprit enseigne : (1) **toutes les créatures ne se combattent pas**, (2) **la Voie a des conséquences sociales** (un Lié de Vortex est jugé hostile par défaut), (3) **le dialogue peut donner plus que le loot** (palier de Voie > Essence spirituelle).

---

## 6. Loot table — Récolte sur créature

> [!warning] Convention canonique
> **Le loot n'apparaît que si l'Esprit est tué** (Dissolution = pas de loot). Et **tuer un Esprit malédiction le sanctuaire** : −10% Accord Spiritus permanent jusqu'à un autre rituel de purification (Phase 4).

| Ressource | Drop rate (Gardien CR 12) | Modificateur tier | Métier requis | Palier minimum |
|-----------|----------------------------|-------------------|---------------|----------------|
| **Essence spirituelle** *(Essence d'Âme)* | 100% (1-2 unités) — **3-5 Ancien**, **8 Avatar** | Tier alchimique +2 par âge ; intrant Magistral pour rituels | Dépéceur + Apothicaire | Expert (palier 4) |
| **Larme** *(Larme spirituelle)* | 30% (1) — **70% Ancien**, **100% Avatar** | Composant **Mythique** : intrant pour potion *Vision Vraie* (révèle illusions) | Alchimiste expert | Maître (palier 5) |
| **Sécrétion** *(rosée spirituelle)* | 60% (2-4 unités) | Composant Verbe / parfum sacré | Apothicaire | Adepte |
| **Cœur de creature** *(cristal d'Âme)* | 20% — **50% Ancien**, **100% Avatar** | **Composant Mythique unique** : intrant pour Voie de Spiritus palier 5 (objet rituel) | Alchimiste maître | Maître |

> [!note] Pas de Cuir, Os, Plume
> L'Esprit n'a pas de matière biologique. Pattern partagé avec [[Élémentaire de feu]] et [[Spectre des Ères]].

---

## 7. Variants cosmiques

| Variant | Entité | Modification | Rareté |
|---------|--------|---------------|--------|
| **Shadow Esprit** | Noctis | Forme adoptée = **figure d'ombre du joueur** (peurs profondes) ; jugement plus sévère | Ère de l'Ombre Longue |
| **Spectral Esprit** | Tempora | Forme **multiple** (3 silhouettes superposées) ; verdict prend en compte passé du joueur | Ère des Échos Brisés |
| **Frost Esprit** | Climata | Sanctuaire glacé, forme rigide ; jugement froid, neutre par défaut | Toundra / Cestra / Celethor |
| **Verdoyant Esprit** | Spiritus + Terranu | Forme = **figure végétale** (arbre-mère, totem-cerf) ; Bénédiction = palier de Voie de Spiritus accéléré | Ère du Verdoiement |
| **Brulé Esprit** *(paradoxe)* | Eldoria endormie | Forme **flammèches** (impossible à imiter à l'observateur) ; combat plus dur, dialogue rare | Ère du Feu Endormi (paradoxe) |
| **Pourpre Esprit** | Aetheron | Forme **brumeuse-violet** ; jugement délire (verdict aléatoire 30%) | Ère de la Brume Mortelle |
| **Doré Esprit** *(forme canonique d'Eldhoryn)* | Celestia / Eldoria active | Forme dorée éclatante ; **Bénédiction systématique** si dialogue respectueux ; rare combat | Ère du Rêve Lumineux + sanctuaire d'Eldhoryn |
| **Brisé Esprit** | Tempora aigu / Vortex | Forme **glitche** (3-5 silhouettes simultanées, instables) ; jugement instable | Ère des Échos Brisés Cardinal |
| **Onirique Esprit** | Somnix | **N'apparaît qu'aux rêveurs** ; forme = **figure de rêve récurrent** du joueur (mémoire de session) | Ère du Sommeil Onirique |
| **Vénérable Esprit** | Fatum / Spiritus ancien | **Forme canonique** dans son archétype ; toujours Ancien ou Avatar ; voix multiple | Conditions cachées 🔒 (sanctuaire majeur) |

---

## 8. Comportement IA

### Routine de présence

L'Esprit **n'erre pas** — il **veille** son sanctuaire 24h/24. Il manifeste sa forme **uniquement** en présence d'un visiteur. Hors visiteur : reste en brume mineure, économie d'Essence.

### Cycle de rencontre

```
[Visiteur entre dans sanctuaire]
   ↓
[Manifestation 3-5 s — forme adaptée]
   ↓
[Verdict — lecture des intentions]
   ↓
   ┌─ < 30% hostilité → Dialogue forcé (combat impossible sauf premier coup joueur)
   │     ├─ Joueur respectueux + offrande → Bénédiction (palier Voie OU objet)
   │     └─ Joueur quitte → Esprit disparaît, sanctuaire ouvert
   │
   ├─ 30-70% → Combat standard (§4)
   │
   └─ > 70% hostilité → Combat boosté (esprit +20% dmg, ouvre Onde de jugement)
```

### Décisions clés (différences vs Métamorphe)

- **Sapient et dialoguant** : peut négocier, juger, refuser, bénir
- **Pas de chasse** — l'Esprit n'attaque jamais le premier hors profanation
- **Pas de poursuite** — lié au sanctuaire, ne sort pas
- **Mémoire longue** : reconnaît un joueur qui revient ; peut réviser jugement (positif si quête accomplie, négatif si trahison passée)
- **Multi-joueur** : prend forme du joueur dominant, jugement collectif

> [!note] Branche [[Comportements PNJ - Index]]
> Pattern canonique pour créatures **Sapient Solitaire Polymorphe Gardienne**. Hérité par : Esprits de Source, Avatars de Voie mineurs, Anges-juges (Phase 4).

---

## 9. Exemples de signatures (PHASE 4 stub)

### Le Doré d'Eldhoryn (Galenor, Plaines)
- **Localisation** : **Source de l'Aube**, Eldhoryn, plaines centrales de Galenor
- **CR** : 17 (Ancien)
- **Variante** : Doré Esprit changeforme
- **Lore** : *« Le Doré accueille tous ceux qui jeûnent 3 jours avant d'arriver. Il prend la forme d'un proche aimé. Il dit ce que ce proche n'a jamais dit. Puis il bénit — ou il refuse. »* Bénédiction = palier Voie d'Eldoria + objet *Goutte de l'Aube*.

### Le Veilleur d'Ulinor (Galenor, Forêt)
- **Localisation** : **Cercle de Pierres** au cœur de la Forêt d'Ulinor
- **CR** : 12 (Gardien)
- **Variante** : Verdoyant Esprit
- **Lore** : *« Forme de cerf-totem. Refuse les armes en main. Demande au visiteur de chanter. Si la chanson est honnête, il bénit. Si elle est calculée, il fond en brume et ferme la forêt 100 jours. »*

### L'Avatar du Sommet de Cestra
- **Localisation** : **Pic du Verbe**, Cestra
- **CR** : 22 (Avatar)
- **Variante** : Vénérable Esprit changeforme
- **Lore** : *« Au sommet, l'Avatar prend la forme du joueur. Il pose une question : "Que cherches-tu vraiment ?" La réponse honnête débloque palier Voie de Spiritus 5 (Maître). La réponse calculée est punie — l'Avatar combat sans pitié. »* Combat **conditionnel scénarisé** uniquement.

> [!warning] CHANTIER PHASE 4
> 1 Esprit signature par grand pays (~10-12 esprits totaux). Toujours dialogables. Combat = exception scénarisée.

---

## 10. Décisions ouvertes

### Mécanique de Verdict canonique

> [!important] Convention canonique
>
> 1. **Lecture d'hostilité** = analyse 5 facteurs : armes en main (poids), Voie active du joueur, paroles prononcées, offrande, historique de session (PNJ tués en zone sacrée).
> 2. **3 paliers de verdict** : Pacifique (< 30%) / Neutre (30-70%) / Hostile (> 70%).
> 3. **Bénédiction** alternative au loot — palier Voie OU objet rituel.
> 4. **Combat malédit** : tuer un Esprit = −10% Accord Spiritus régional jusqu'à purification.
>
> Pattern réutilisé : Avatars cosmiques, Anges-juges, Esprits de Source.

### Chantiers

- **Voie de Spiritus** : à formaliser dans [[Le Lien]]. L'Esprit changeforme est le **principal donneur de palier** non-tutoré
- **Système d'offrande** : à canoniser ([[Sources de Ressources]] §Offrandes — non créé)
- **Multi-Esprits** : un sanctuaire majeur peut-il abriter 2-3 Esprits (gardiens-jumeaux) ? Proposition : oui pour Avatar de continent (1 cas par continent maxi)

### Notes pour autres agents

| Pattern | Réutilisation |
|---------|---------------|
| Verdict 3 paliers | Anges-juges, Avatars cosmiques, Druides-esprits |
| Forme adaptée à l'observateur | Tous les Esprits Sapient |
| Bénédiction = alternative loot | Tous les Esprits non-hostiles |
| Sanctuaire-lié | Tous les Esprits Fixe |
| Cap de taille rituel (Colosse) | Esprits Anciens / Avatars uniquement |

---

*Liens : [[Bestiaire - Index|← Index Bestiaire]] · [[Taxonomie des Créatures]] · [[Métamorphe]] · [[Spectre des Ères]] · [[Élémentaire de feu]] · [[Cosmologie]] · [[Le Lien]] · [[L'Accord]] · [[Combat]]*
