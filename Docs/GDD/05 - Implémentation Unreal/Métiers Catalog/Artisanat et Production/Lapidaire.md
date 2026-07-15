---
tags: [métier, archétype, artisanat, acuité, mémoire, gemmes, taille, joaillerie]
type: archetype
category: Métier
catégorie_métier: Artisanat et production
stat_principale: Acuité
stats_secondaires: [Mémoire, Endurance, Vivacité]
craft_category: Joaillerie et lapidaire
sources_ressources_accessibles: [Gemme brut, Gemme taillé, Cristal, Cristaux cosmiques, Pierre semi-précieuse, Eau (refroidissement), Poudre abrasive]
stations_principales: [Établi de lapidaire, Tour à polir, Loupe d'examen, Bac à eau]
outils_principaux: [Disque diamant, Pince à gemme, Loupe, Compas de précision, Polissoir, Burin fin]
paliers_maîtrise: [Novice, Initié, Adepte, Expert, Maître]
métiers_complémentaires: [Bijoutier, Sertisseur, Mineur, Verrier, Forgeron, Enchanteur d'objet, Tailleur de pierre]
era_modulation: true
status: drafted
last_review: 2026-05-01
needs_review_for: [frontière-Lapidaire-Bijoutier-Sertisseur, gemmes-cosmiques-co-craft, taille-rituelle-Foi]
---

# 💎 Archétype-Métier — Lapidaire

> Métier de la **taille de gemme**. Le Lapidaire prend la **gemme brute** extraite par le [[Mineur]] et la transforme en **gemme taillée** ([[Sources de Ressources]] §Fabrication) : facettes, cabochons, cristaux taillés. **Distinct du [[Bijoutier]]** (assemblage de bijoux) et du **[[Sertisseur]]** (mise en place sur support) — voir frontière §11.

---

## 1. Vue d'ensemble

Le **Lapidaire** transforme un caillou opaque en pierre lumineuse. Il **lit** la gemme brute (axes optiques, inclusions, lignes de faiblesse), **trace** le plan de taille, **tourne** la pierre sous un disque abrasif, **polit**. Une seule frappe ratée détruit une fortune (mécanique gold sink + tension narrative).

**Place dans la chaîne d'artisanat :**
- **Amont** : [[Mineur]] (extraction de gemmes brutes en filons), [[Forgeron]] (outils de précision — disques, burins fins), [[Verrier]] (parfois — frontière imitation gemme verre coloré)
- **Aval** :
  - [[Bijoutier]] (assemble la gemme taillée en bijou)
  - [[Sertisseur]] (sertit la gemme dans un anneau, une arme, une couronne)
  - [[Architecte]] / [[Maçon]] (sertissage architectural de gemmes dans pierre — niveau 5-6 voir [[Matériaux de Construction]])
  - [[Enchanteur d'objet]] (cristaux de Voie taillés pour rituels)
  - [[Astronome]] (cristaux à propriétés optiques — frontière fine [[Verrier]])
- **Frontière joueur/PNJ** : Lapidaire produit l'**intermédiaire** (gemme taillée), revendable en l'état comme bien d'investissement

**Identité gameplay :**
- Métier **précision pure** — `Acuité` (lecture axes optiques, tracé exact), `Mémoire` (recettes de taille par espèce — diamant ≠ saphir ≠ émeraude), `Endurance` (concentration prolongée), `Vivacité` (réflexes au disque rotatif)
- Métier **à fort risque** : une gemme T4 ratée = perte de plusieurs dizaines de milliers d'Éclats (gold sink narratif)
- Métier **discret et urbain** : pratiqué en atelier fermé (sécurité, lumière contrôlée) — Lapidaires de cour, Lapidaires de Guildes marchandes, Lapidaires-Maîtres d'Astravia (cristaux astraux)

**Ancrage culturel :** Astravia (cristaux astraux alignés sur constellations), Lumasar (école académique, lapidaires-savants), Mosrack (lapidaires de cour impériale), Ulinor (cavernes à gemmes du Nord), Ilthara (gemmes vivantes de l'Anneau de Pyrtara — Trace).

---

## 2. Stats brutes & Maîtrises associées

### Stats brutes

| Stat | Rôle | Magnitude |
|------|------|-----------|
| **Acuité** *(principale)* | Lecture des axes optiques, tracé exact du plan de taille, finesse de la frappe | Direct — qualité de la pierre finale (brillance, pureté, taille) |
| **Mémoire** *(principale)* | Recettes de taille par espèce (brillant, rose, cabochon, marquise…), reconnaissance de gemmes rares | Direct — débloque recettes hautes et identification |
| **Endurance** *(secondaire)* | Concentration sur 4-8h, position assise pénible | Multiplicative — durée session |
| **Vivacité** *(secondaire)* | Réflexes au disque rotatif (vitesse arrêt en cas de dérive) | Marginale — prévention casse |

### Maîtrises contextuelles

- **`Maîtrise_Lapidaire`** — racine du métier
- **`Maîtrise_Taille_Brillant`** — sous-spécialisation taille à facettes (diamant, saphir clair)
- **`Maîtrise_Taille_Cabochon`** — sous-spécialisation taille bombée (opale, lune, pierre semi-précieuse)
- **`Maîtrise_Cristal_Cosmique`** — sous-spécialisation cristaux de Voie (palier Maître, frontière [[Enchanteur d'objet]])

> **Cohérent avec [[Personnage]]** : `Qualité de gemme = Acuité × Mémoire × Maîtrise_Lapidaire`. Un Lapidaire Acuité 90, Mémoire 85, palier 4 produit du **Magistral** (gemme à valeur × 5 par rapport au brut).

---

## 3. Sources de ressources

### Intrants principaux

| Intrant | Source | Notes |
|---------|--------|-------|
| **Gemme brute** | [[Mineur]] (filons spécifiques) | Diamant, saphir, rubis, émeraude, opale, topaze, améthyste — qualité variable |
| **Pierre semi-précieuse** | [[Mineur]] | Quartz, agate, lapis, turquoise — gemmes de tier moyen |
| **Cristal** | [[Mineur]] / [[Architecture/Index|Architecture]] (cristaux cosmiques) | Cristaux de Voie ([[Le Lien]]) à tailler — palier Maître |
| **Eau** | Liquide | Refroidissement disque, lubrification |
| **Poudre abrasive** | Carbure de bore, diamant, émeri | Polissoirs de précision |
| **Cire** | [[Apothicaire]] / [[Apiculteur]] | Maintien temporaire de la gemme sur support |

### Outputs (production directe)

- **[[Gemme taillé|Gemme taillée]]** (intermédiaire fabriqué — voir [[Sources de Ressources]] §Fabrication)
- **Cabochon** (gemme bombée, taille douce)
- **Brillant** (gemme à facettes, taille classique 57 facettes)
- **Cristal de Voie taillé** (T5+ — frontière [[Enchanteur d'objet]])
- **Lentille de cristal** (frontière [[Verrier]] §Maîtrise_Optique : intersection rare, gemmes optiques)

---

## 4. Stations + outils

### Stations principales

| Station | Rôle | Tier débloqué |
|---------|------|---------------|
| **Établi de lapidaire** | Lieu principal de travail (lumière contrôlée, fenêtre Nord) | T1+ |
| **Tour à polir** | Disque rotatif abrasif (eau + poudre) | T1+ (basique), T3+ (multi-vitesses), T5+ (tour signature) |
| **Loupe d'examen** | Inspection inclusions, vérification des facettes | T2+ |
| **Bac à eau** | Refroidissement / vérification optique de la gemme dans l'eau | T1+ |
| **Atelier portable de Lapidaire** | Version réduite (qualité plafonnée T2) | T2+ |

### Outils

| Outil | Catégorie | Notes |
|-------|-----------|-------|
| **Disque diamant** | Outils | Outil signature — taille les facettes |
| **Pince à gemme** | Outils | Maintien de la pierre sans contact direct |
| **Loupe (10x, 20x)** | Outils | Inspection précise (palier ↑ = grossissement ↑) |
| **Compas de précision** | Outils | Tracé géométrique (proportions de taille classiques) |
| **Polissoir / Brunissoir** | Outils | Finition lustrée |
| **Burin fin** | Outils | Retouche manuelle des arêtes |

---

## 5. Paliers de Maîtrise

| Palier | Capacités débloquées | Conditions |
|--------|----------------------|------------|
| **1 — Novice** | Pierres semi-précieuses (quartz, agate, turquoise), cabochon simple. Taux d'éclatement ~30% (perte de gemme) | Défaut |
| **2 — Initié** | Gemmes communes (améthyste, citrine, topaze), brillant 17 facettes, cabochon haute qualité. Taux éclatement ~15% | Usage : 30 gemmes taillées |
| **3 — Adepte** | Saphir, rubis, émeraude (T3-T4), brillant 33 facettes, taille marquise/poire. Taux éclatement ~8% | Usage + condition : 80 gemmes + 1 émeraude T4 réussie |
| **4 — Expert** | Diamant taillé (brillant 57 facettes), gemmes de variants régionaux (Opale d'Onara, Améthyste astrale d'Astravia). Co-craft avec [[Sertisseur]]. Taux éclatement ~3% | Usage + condition : 200 gemmes + 1 diamant T5 réussi |
| **5 — Maître** 🔒 | Cristaux cosmiques de Voie taillés (palier Voie pertinent requis), gemmes vivantes de Pyrtara (Trace), tailles signature inscrites. Procs T6 | **Condition cachée** : ex. tailler un cristal de Voie sans rompre le Lien, tailler une gemme vivante de l'Anneau de Pyrtara, tailler la Larme de Cosmique (gemme unique-monde) |

> **Décroissance** : −1 palier latent après 90 jours sans taille. Rouille post-Souffle : taux d'éclatement +50% la 1ère semaine.

---

## 6. Crafts/recettes débloqués

> Voir [[Crafts]] §6 *Joaillerie et lapidaire*. Le Lapidaire produit l'**intermédiaire** (gemme taillée) ; le [[Bijoutier]] assemble ; le [[Sertisseur]] appose.

### Recettes signature par palier

| Palier | Production | Cible client |
|--------|------------|---------------|
| **Novice** | Cabochon de quartz, agate polie | [[Bijoutier]] (bijoux populaires) |
| **Initié** | Brillant 17 facettes en améthyste/citrine/topaze | [[Bijoutier]] (bijoux honnêtes), [[Sertisseur]] (anneaux T2-T3) |
| **Adepte** | Émeraude/rubis/saphir taillés, marquise, poire | Bijoux nobles T3-T4, sertissage royal, [[Architecte]] (sertissage architectural) |
| **Expert** | Diamant 57 facettes, gemmes signature régionales | Couronnes royales, bijoux de cour, [[Forgeron]] (gemmes serties dans armes T4-T5 — co-craft) |
| **Maître** | Cristal de Voie taillé, gemme cosmique signature | [[Enchanteur d'objet]] (rituels T5-T6), monuments cosmiques ([[Catégories de Constructions]] §10) |

### Pattern recette canonique Lapidaire

> Tier N requiert : **1 gemme brute de tier ≥ N** + **(N-1) heures taille** + **N×0.5 poudre abrasive** + **palier Mastery requis**. Risque d'éclatement = `(palier_max - palier_actuel) × 5%` × variant_dureté.

**Mini-jeu** : examen (lecture inclusions, choix d'orientation), tracé (précision compas), taille (timing arrêt disque rotatif — Vivacité), polissage (cadence régulière). Échec = gemme éclatée (perte totale ou récupération partielle en fragments).

---

## 7. Carrière et débouchés

### Échelle d'évolution joueur

```
[Apprenti à la loupe] → [Lapidaire d'atelier] → [Lapidaire de cour] → [Maître Lapidaire] → [Lapidaire-Légende]
        ↓                  ↓                     ↓                    ↓                     ↓
   Cabochons quartz    Brillants courants     Émeraudes/rubis       Diamants signature   Cristaux cosmiques
                                                                    Couronnes royales    Trace inscrite
```

### Débouchés économiques

- **Lapidaire d'atelier indépendant** : achète gemmes brutes au [[Mineur]], revend taillées (marge 200-500%)
- **Lapidaire de [[Bijoutier]]** : sous-traitance fixe, salaire + bonus
- **Lapidaire de cour** : exclusivité noble, taille des gemmes royales (Reconnaissance ≥ Adepte)
- **Lapidaire d'académie** (Lumasar) : taille de cristaux scientifiques (frontière [[Astronome]])
- **Lapidaire-Restaurateur** : restauration de gemmes anciennes (cohérent avec Tailleur de pierre / Maçon Restaurateurs)

### Métiers complémentaires fortement liés

- **[[Bijoutier]]** — client direct (assemblage du bijou — frontière clé voir §11)
- **[[Sertisseur]]** — client direct (mise en place — frontière clé voir §11)
- **[[Mineur]]** — fournisseur amont obligatoire
- **[[Forgeron]]** — co-craft pour gemmes serties dans armes/armures T4-T5 (logement préparé par Forgeron, pierre par Lapidaire, sertissage par Sertisseur)
- **[[Enchanteur d'objet]]** — co-craft cristaux de Voie (palier Maître)
- **[[Verrier]]** — frontière fine `Maîtrise_Optique` (lentilles optiques cristal vs verre)
- **[[Tailleur de pierre]]** — frontière à grande échelle (Tailleur taille la pierre noble, Lapidaire taille la gemme)

---

## 8. Modulation par contexte

### Par ère ([[Les Ères]])

| Ère | Effet sur le Lapidaire |
|-----|-------------------------|
| **Cieux Lus** (Stellaris) | Gemmes astrales d'Astravia bonifiées, +25% qualité cristaux à propriétés optiques |
| **Feu Endormi** (Eldoria) | Rubis et grenat (gemmes feu) +20% qualité |
| **Sommeil de Glace** (Aquor) | Diamant (gemme froide) +20% qualité, taille plus stable (vibrations amorties) |
| **Verdoiement** (Terranu) | Émeraude +20% qualité |
| **Brume Mortelle** (Umbra) | Gemmes sombres (onyx, obsidienne) bonifiées |
| **Échos Brisés** (Tempora) | Taux éclatement doublé (vibrations parasites) |

### Par culture / faction

- **Astravia** : cristaux astraux taillés sur alignement de constellations — école Aerion-Stellaris
- **Lumasar** (Galenor) : académie de Lapidaire, recettes savantes documentées
- **Mosrack** : Lapidaires de cour impériale, fournisseurs des couronnes
- **Ulinor** : cavernes à gemmes nordiques, technique du froid
- **[[Guildes]] marchandes** : Lapidaire-Évaluateur (frontière Antiquaire — voir [[Mapping Métiers de Construction]])

### Par religion

- **[[Lore/Religions/00 - Système Religieux|Religions cosmiques]]** : gemmes consacrées par religion (9 styles de taille rituelle)
- **Foedus Animae** : gemmes-réceptacles d'âme (taille rituelle obligatoire pour réceptacles)

---

## 9. Économie

### Marges typiques

| Palier | Coût intrants (gemme brute) | Vente moyenne (gemme taillée) | Marge |
|--------|------------------------------|-------------------------------|--------|
| Novice | 2-10 Éclats (quartz brut) | 15-50 Éclats | ~80% |
| Adepte | 200-1000 Éclats (saphir/rubis) | 1500-8000 Éclats | ~85% |
| Expert | 5000-20 000 Éclats (diamant) | 50 000-200 000 Éclats | ~90% |
| Maître | Cristal cosmique (non-marchand brut) | Cristal taillé (parfois non-marchand) | non standardisé |

### Gold sinks contribués

- **Éclatement de gemme** : perte de gemme brute (gold sink majeur — peut coûter une fortune)
- **Outils premium** (disques diamant, loupes 20x) : 200-2000 Éclats
- **Atelier sécurisé** (loyer + sécurité contre vols) : gold sink continu

### Chaîne économique

```
[Mineur (gemme brute, filons rares)]
            ↓
        [LAPIDAIRE] (taille — étape qui fait la valeur ×5 à ×20)
            ↓
   ┌────────┼─────────────┐
   ↓        ↓             ↓
[Bijoutier]  [Sertisseur]  [Enchanteur d'objet]
(bijou)      (mise place)   (cristal Voie)
            ↓
[Joueurs / Nobles / Guildes]
```

---

## 10. Comportement IA / signatures PNJ

### Cycle quotidien

```
[07:00 lever — atelier ouvert tard pour la lumière du Nord]
[08:00-12:00 examen et tracé matin (la lumière naturelle est critique)]
[12:00-13:30 pause repas dans l'atelier (rarement à l'extérieur — sécurité)]
[13:30-17:30 taille et polissage après-midi]
[17:30-19:00 inspection finale, mise en coffre des pièces du jour]
[19:00-22:00 vie sociale discrète (Lapidaires souvent solitaires — sécurité, concentration)]
[22:00 coucher]
```

### Signatures PNJ canoniques (5 PNJ — pays différents)

- **Maître Veylor d'Astravia** — Maître Lapidaire des cristaux astraux, signataire de la Couronne d'Étoiles, école Aerion
- **Maîtresse Sera de Lumasar** (Galenor) — académicienne, traités de taille canoniques, formatrice de la majorité des Lapidaires de cour
- **Old Drogvan de Mosrack** — Lapidaire impérial, fournisseur des couronnes royales, gemmes d'Acier-Mosrack
- **Vala la Cavernicole d'Ulinor** — Maîtresse Lapidaire des gemmes nordiques, technique du froid, réputation discrète
- **Ystrid l'Anneau d'Ilthara** — frontière Trace : taille des gemmes vivantes de l'Anneau de Pyrtara (Trace cosmique), unique pratiquante connue

---

## 11. Décisions ouvertes

- [ ] **Frontière Lapidaire / Bijoutier / Sertisseur** : trois métiers distincts mais coopératifs — confirmé par [[Crafts]] §6 et [[Mapping Métiers de Construction]]. **Frontière canonique** :
  - **Lapidaire** = transforme la gemme brute en gemme taillée (intermédiaire fabriqué)
  - **Bijoutier** = conçoit et assemble le bijou (anneau + monture + chaîne)
  - **Sertisseur** = appose la gemme dans le support (bijou, arme, couronne, vitrail)
  - Sur bijoux haut tier, les 3 collaborent. Un Maître peut acquérir 2 spécialisations max (palier 5 dans 1, palier 3 dans 1 autre).
- [ ] **Lapidaire = Sertisseur ?** : actuellement [[Crafts]] §6 liste *« Bijoutier · Lapidaire · Sertisseur »* comme 3 métiers distincts. Confirmation : **3 métiers distincts** (proposition). Sertisseur reste à archétyper en Phase suivante.
- [ ] **Cristaux cosmiques** : Lapidaire seul ou co-craft Enchanteur ? **Proposition** : Lapidaire-Maître taille, [[Enchanteur d'objet]]-Maître éveille (deux étapes distinctes)
- [ ] **Taille rituelle religieuse** : effets gameplay quantifiés (bonus par religion sur la gemme) ? À playtester
- [ ] **Calibration paliers** : 30/80/200 gemmes à valider
- [ ] **Récupération de fragments** : une gemme éclatée laisse-t-elle des fragments réutilisables (mini-cabochons) ? **Proposition** : oui, 30% du brut récupérable au palier Adepte+, 0% en dessous
- [ ] **Gemme vivante de Pyrtara** ([[Traces des Ères]]) : recette unique-monde ou variant générique ? **Proposition** : variant générique avec 1 gemme vivante signature par Trace

---

*Liens : [[Métiers]] · [[Crafts]] · [[Sources de Ressources]] · [[Architecture/Index|Architecture]] · [[Matériaux de Construction]] · [[Mapping Métiers de Construction]] · [[Gemme taillé]] · [[Bijoutier]] · [[Sertisseur]] · [[Enchanteur d'objet]] · [[Forgeron]] · [[Verrier]] · [[Tailleur de pierre]] · [[Mineur]] · [[Astronome]] · [[Le Lien]] · [[Le Souffle]] · [[Traces des Ères]] · [[Lore/Religions/00 - Système Religieux]]*
