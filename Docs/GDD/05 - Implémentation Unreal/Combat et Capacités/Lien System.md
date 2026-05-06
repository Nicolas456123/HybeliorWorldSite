---
tags: [implementation, lien, magie, voies, balance, combat, capacités]
status: drafted
last_review: 2026-05-07
needs_review_for: [équilibrage-voies, réactions-3-voies, voie-feu]
type: implementation
canonical_concept: "[[Le Lien]]"
---

# Lien System — Implémentation

> Page d'implémentation technique du concept narratif **[[Le Lien]]**.
> Cette page contient les **chiffres, formules, specs Unreal et règles de balance** du système magique d'Hybelior.
> Pour la philosophie, l'intention de design et la voix in-world : voir [[Le Lien]].

---

## Architecture générale

| Paramètre | Valeur |
|---|---|
| Voies des Éternels | 5 |
| Voies des Cosmiques | 12 |
| Voies actives par Lié | 1 (mono-Voie) |
| Voie spéciale antagoniste | Voie des Déliés (1) |
| Niveaux de Lien par Voie | 5 (Initié, Apprenti, Adepte, Maître, Lien Profond) |
| Mana max base | 100 |
| Régénération Mana hors combat | 5/sec |
| Régénération Mana en combat | 1/sec |
| Coefficient Sceptre (multiplicateur global) | ×1.30 sur les sorts |

---

## Niveaux de Lien

| Niveau | Nom | XP requise | Effets cumulés | Sorts débloqués (par Voie) |
|---|---|---|---|---|
| 1 | Initié | 0 | Accès aux 2 sorts de base | 2 sorts mineurs |
| 2 | Apprenti | 1 000 | -10% coût Mana, -5% temps incantation | +1 sort intermédiaire |
| 3 | Adepte | 4 000 | -20% coût Mana, -10% temps incantation, +15% portée | +2 sorts intermédiaires |
| 4 | Maître | 12 000 | -30% coût Mana, -15% temps incantation, +25% portée, +20% efficacité | +1 sort majeur |
| 5 | Lien Profond | 30 000 + condition cachée 🔒 | -40% coût Mana, -20% temps incantation, +35% portée, +35% efficacité, +1 capacité signature | +1 sort signature unique |

**Décroissance** : si le Lié n'utilise pas sa Voie pendant 21 jours réels, perte de 5% XP/semaine jusqu'à un palier plancher (XP du niveau actuel).

**Coût Labeur (apprentissage actif)** :
| Action | Coût Labeur |
|---|---|
| Apprendre nouveau sort intermédiaire | 20 |
| Apprendre sort majeur | 50 |
| Tenter Lien Profond (niv 5) | 100 + condition cachée |

---

## Voies des Éternels — Spécifications

### Voie de Celestia

> Lumière céleste, guidage, protection à distance, vue cosmique.

| Sort | Niv | Coût Mana | Cast | Cooldown | Portée | Effet |
|---|---|---|---|---|---|---|
| Trait d'étoile | 1 | 15 | 0.8s | 1s | 30m | 80 dmg lumière |
| Halo protecteur | 1 | 25 | 1.5s | 8s | self | Bouclier 200 PV, 8s |
| Œil céleste | 2 | 30 | 2s | 30s | 100m | Révèle invisibles dans rayon 40m, 15s |
| Guidage stellaire | 3 | 40 | instant | 60s | groupe 30m | +15% vitesse + immunité désorientation, 20s |
| Constellation | 3 | 50 | 3s | 45s | zone 15m | Marque cible, prochains coups +20% dmg sur elle, 10s |
| Jugement de lumière | 4 | 80 | 2.5s | 90s | 40m | 250 dmg lumière + aveuglement 4s |
| **Aurore vivante** (signature niv 5) | 5 | 150 | 4s | 6 min | zone 25m | 400 dmg lumière, soigne alliés 300 PV, révèle tout, 8s |

**Affinité dégâts** : Lumière (efficace contre Mort-vivant, Démon, créatures de Noctis).

---

### Voie de Tempora

> Manipulation du temps, séquences, vision du passé proche.

| Sort | Niv | Coût Mana | Cast | Cooldown | Portée | Effet |
|---|---|---|---|---|---|---|
| Hâte | 1 | 20 | 1s | 6s | self/allié 30m | +25% vitesse atk + déplacement, 10s |
| Suspension | 1 | 25 | 0.5s | 12s | 25m | Cible ralentie -40%, 5s |
| Écho passé | 2 | 35 | 2s | 30s | self | Voit positions ennemis -3s, 10s |
| Boucle | 3 | 50 | 1.5s | 45s | self | Mémorise position+PV ; déclenche retour 8s plus tard |
| Stase | 3 | 60 | 2s | 60s | 30m | Cible figée totalement, 3s (rompue à dégât) |
| Onde temporelle | 4 | 90 | 3s | 90s | cône 20m | Ralentit -60% + 200 dmg arcaniques, 6s |
| **Reprise** (signature niv 5) | 5 | 200 | 4s | 10 min | self | Annule les 6 dernières secondes (PV, position, cooldowns) |

**Affinité dégâts** : Arcanique pur (peu de résistance), efficace contre constructions.

---

### Voie de Noctis

> Ténèbres, ombres, invisibilité, drain.

| Sort | Niv | Coût Mana | Cast | Cooldown | Portée | Effet |
|---|---|---|---|---|---|---|
| Voile | 1 | 20 | 1s | 8s | self | Invisibilité, 6s (rompue à action offensive) |
| Vague d'ombre | 1 | 25 | 1s | 4s | cône 12m | 90 dmg ombre + ralentit -20%, 4s |
| Marche des ombres | 2 | 30 | instant | 15s | 25m | Téléport vers point d'ombre |
| Drain | 3 | 45 | 2s | 20s | 25m | 120 dmg/s pendant 4s, soigne 50% des dmg infligés |
| Manteau de nuit | 3 | 50 | 1.5s | 30s | self | Invisibilité totale, 12s, attaques depuis ce mode +50% dmg |
| Terreur | 4 | 75 | 2s | 60s | zone 15m | Fuite forcée 5s + -30% défense ensuite 8s |
| **Linceul** (signature niv 5) | 5 | 180 | 3s | 8 min | self/zone 20m | Plonge zone dans ténèbres totales, ennemis aveuglés et drain -10 PV/s, 12s |

**Affinité dégâts** : Ombre (efficace contre Lumière-faible, inefficace contre Eldoria/Celestia).

---

### Voie de Navigor

> Passages entre mondes, âmes, portails, téléportation.

| Sort | Niv | Coût Mana | Cast | Cooldown | Portée | Effet |
|---|---|---|---|---|---|---|
| Pas du voyageur | 1 | 18 | instant | 6s | 15m | Téléport court, traverse obstacles minces |
| Voile des âmes | 1 | 25 | 1s | 10s | 30m | Voit aura morts récents (zone, 30s) |
| Appel d'esprit | 2 | 40 | 2s | 30s | 30m | Invoque esprit-guide (combat), 20s, 200 PV |
| Portail d'urgence | 3 | 50 | 1.5s | 90s | self+groupe 10m | Téléport au dernier sanctuaire visité |
| Lien d'âme | 3 | 55 | 2s | 60s | allié 30m | Partage 30% dmg subis, 15s |
| Faille | 4 | 100 | 3s | 3 min | 50m | Crée portail bidirectionnel persistant 60s |
| **Passage** (signature niv 5) | 5 | 220 | 4s | 15 min | groupe 20m | Téléport longue distance (carte connue), groupe entier |

**Affinité dégâts** : Spectral (efficace contre incarnés, partiel contre Élémentaires).

---

### Voie d'Eldoria

> Lumière pure, création, guérison, révélation.

| Sort | Niv | Coût Mana | Cast | Cooldown | Portée | Effet |
|---|---|---|---|---|---|---|
| Rayon pur | 1 | 15 | 1s | 1s | 25m | 75 dmg lumière, +50% vs corrompus |
| Soin doux | 1 | 30 | 1.5s | 4s | 25m | Soigne 180 PV |
| Bouclier solaire | 2 | 35 | 1s | 15s | self/allié | Bouclier 250 PV + reflète 20% dmg, 10s |
| Révélation | 2 | 25 | 1s | 20s | zone 30m | Annule illusions et invisibilités, 15s |
| Bénédiction | 3 | 50 | 2s | 30s | groupe 25m | +15% dmg + soin 30/s, 12s |
| Verdict de lumière | 4 | 85 | 2.5s | 60s | 30m | 280 dmg lumière, +100% vs Noctis/Umbra |
| **Aube créatrice** (signature niv 5) | 5 | 200 | 4s | 8 min | zone 30m | Soigne pleinement alliés, purge tous debuffs, 350 dmg aux corrompus |

**Affinité dégâts** : Lumière sacrée (×2 contre Démon/Mort-vivant ; ×0.5 contre fidèles d'Eldoria PvP).

---

## Voies des Cosmiques — Spécifications condensées

### Voie d'Aquor — Eau, glace, flux

| Sort clé | Niv | Coût | Cd | Effet |
|---|---|---|---|---|
| Lance d'eau | 1 | 12 | 1s | 60 dmg + ralentit -15%, 3s |
| Bulle | 1 | 20 | 8s | Respiration aquatique 60s |
| Glaçage | 2 | 30 | 12s | Gèle cible 2s + 80 dmg froid |
| Vague | 3 | 50 | 30s | Cône 15m, repousse 8m + 120 dmg |
| Iceberg | 4 | 80 | 60s | Mur de glace bloquant 10s |
| **Maelström** (sig 5) | 5 | 160 | 5 min | Zone 20m, 150 dmg/s, 6s + ralentit -50% |

### Voie d'Aerion — Vent, atmosphère, vol

| Sort clé | Niv | Coût | Cd | Effet |
|---|---|---|---|---|
| Rafale | 1 | 12 | 1s | 50 dmg + repousse 4m |
| Course du vent | 1 | 20 | 10s | +35% vitesse déplacement, 8s |
| Saut éolien | 2 | 25 | 15s | Triple saut, 10s |
| Tornade | 3 | 60 | 45s | Zone 8m, soulève cibles, 4s |
| Plumes d'air | 4 | 70 | 60s | Vol libre, 12s |
| **Tempête** (sig 5) | 5 | 170 | 6 min | Zone 25m, 80 dmg/s + désarme, 8s |

### Voie d'Aurion — Énergie éthérée, arcanisme pur

| Sort clé | Niv | Coût | Cd | Effet |
|---|---|---|---|---|
| Trait arcanique | 1 | 14 | 0.7s | 70 dmg arcanique |
| Bouclier mana | 1 | 25 | 12s | Convertit 50% dmg en perte Mana, 8s |
| Surcharge | 2 | 35 | 20s | +30% dmg sorts, 10s |
| Salve | 3 | 55 | 30s | 5 traits chercheurs, 50 dmg chacun |
| Détonation | 4 | 80 | 50s | Zone 12m, 240 dmg arcaniques |
| **Singularité** (sig 5) | 5 | 180 | 7 min | Implosion zone 15m, 350 dmg + draine Mana |

### Voie d'Umbra — Ombres physiques, furtivité

| Sort clé | Niv | Coût | Cd | Effet |
|---|---|---|---|---|
| Voile mineur | 1 | 18 | 10s | Furtivité, 5s |
| Piège d'ombre | 1 | 22 | 8s | Pose piège, immobilise 3s |
| Confusion | 2 | 30 | 25s | Cible attaque alliés 4s |
| Double ombre | 3 | 50 | 40s | Crée clone, 12s, attire l'attention |
| Toile noire | 4 | 75 | 60s | Zone 12m, ralentit -50%, 10s |
| **Effacement** (sig 5) | 5 | 160 | 8 min | Self disparaît + relocate 50m, +200% dmg prochain coup |

### Voie de Spiritus — Esprits, nature, invocation

| Sort clé | Niv | Coût | Cd | Effet |
|---|---|---|---|---|
| Communion | 1 | 15 | 2s | Parle aux animaux, 30s |
| Lien sylvestre | 1 | 25 | 6s | Soin 120 PV |
| Esprit-loup | 2 | 40 | 30s | Invoque loup combat, 30s, 280 PV |
| Croissance | 3 | 50 | 25s | Zone soin alliés 40/s, 8s |
| Esprit-ours | 4 | 80 | 90s | Invoque ours tank, 45s, 600 PV |
| **Esprit ancien** (sig 5) | 5 | 200 | 10 min | Invoque créature majeure, 60s, 1200 PV, AOE |

### Voie de Fatum — Destins, sorts, malédictions

| Sort clé | Niv | Coût | Cd | Effet |
|---|---|---|---|---|
| Mauvais œil | 1 | 18 | 4s | Cible -10% précision, 10s |
| Augure | 1 | 20 | 30s | Voit prochain événement majeur de la zone |
| Malchance | 2 | 35 | 25s | Cible -20% chance critique, 15s |
| Malédiction | 3 | 55 | 45s | -25% dmg infligés, +25% dmg subis, 12s |
| Fil rompu | 4 | 80 | 90s | Annule un buff actif majeur de la cible |
| **Trame brisée** (sig 5) | 5 | 200 | 10 min | Maudit zone 20m : tous critiques deviennent fumbles, 12s |

### Voie de Terranu — Terres, fertilité, pierre

| Sort clé | Niv | Coût | Cd | Effet |
|---|---|---|---|---|
| Éclat de pierre | 1 | 14 | 1s | 75 dmg physique perforant |
| Peau de pierre | 1 | 25 | 15s | +200 armure, 12s |
| Tremblement | 2 | 35 | 25s | Zone 10m, 60 dmg + chute |
| Mur de pierre | 3 | 50 | 35s | Mur 8m, 800 PV, 20s |
| Pieux | 4 | 80 | 60s | Ligne 15m, 220 dmg + immobilise 3s |
| **Fureur tellurique** (sig 5) | 5 | 190 | 8 min | Zone 25m, 100 dmg/s + ralentit, 10s |

### Voie de Somnix — Rêves, illusions, mental

| Sort clé | Niv | Coût | Cd | Effet |
|---|---|---|---|---|
| Brume | 1 | 18 | 6s | Désoriente cible, 4s |
| Image | 1 | 25 | 12s | Crée leurre visuel, 20s |
| Sommeil | 2 | 40 | 30s | Endort cible, 6s (rompu à dégât) |
| Cauchemar | 3 | 55 | 35s | 80 dmg psychique + frayeur 3s |
| Rêve éveillé | 4 | 80 | 60s | Cible voit ennemis fictifs, 8s |
| **Songe partagé** (sig 5) | 5 | 180 | 10 min | Zone 20m, ennemis endormis, 8s, +100% dmg si rompu |

### Voie d'Ignara — Feu, chaleur, flamme (NOUVELLE — comble Voie de Feu)

| Sort clé | Niv | Coût | Cd | Effet |
|---|---|---|---|---|
| Étincelle | 1 | 14 | 0.8s | 70 dmg feu |
| Bouclier ardent | 1 | 25 | 15s | Reflète 50 dmg feu/coup reçu, 8s |
| Vague de chaleur | 2 | 35 | 20s | Cône 12m, 100 dmg feu + brûlure 30/s 4s |
| Boule de feu | 3 | 55 | 8s | Zone 6m, 180 dmg feu |
| Mur de flammes | 4 | 75 | 50s | Mur 10m, 60 dmg/s à traverser, 12s |
| **Comète** (sig 5) | 5 | 200 | 9 min | Zone 18m, 400 dmg feu + brûlure 60/s, 6s |

### Voie de Sanguis — Sang, vitalité, sacrifice

| Sort clé | Niv | Coût | Cd | Effet |
|---|---|---|---|---|
| Lien sanguin | 1 | 0 (10% PV) | 4s | 90 dmg + soigne lanceur 30 PV |
| Pacte | 1 | 0 (15% PV) | 30s | +25% dmg, 12s, mais aucun soin pendant durée |
| Hémorragie | 2 | 30 | 15s | Saignement 30/s, 8s |
| Rituel sanglant | 3 | 0 (25% PV) | 60s | Ressuscite allié à 30% PV |
| Étreinte écarlate | 4 | 70 | 60s | Zone 10m, draine 80 PV/s, soigne lanceur 50% |
| **Calice** (sig 5) | 5 | 0 (40% PV) | 12 min | +60% dmg, immunité contrôle, 15s |

### Voie de Resonia — Sons, vibrations, harmonie

| Sort clé | Niv | Coût | Cd | Effet |
|---|---|---|---|---|
| Note | 1 | 12 | 0.7s | 65 dmg sonique |
| Mélodie | 1 | 25 | 15s | Soin groupe 100 PV, 25m |
| Dissonance | 2 | 30 | 20s | Cible -20% précision + interruption sorts, 6s |
| Hymne de guerre | 3 | 50 | 60s | Groupe +15% dmg, 20s |
| Cri brisant | 4 | 75 | 45s | Cône 12m, 200 dmg + assomme 2s |
| **Symphonie** (sig 5) | 5 | 180 | 8 min | Groupe : régénération + dmg + résistance, 20s |

### Voie de Vermis — Pourriture, décomposition, miasmes

| Sort clé | Niv | Coût | Cd | Effet |
|---|---|---|---|---|
| Toxine | 1 | 16 | 2s | Empoisonne 25/s, 8s |
| Souffle pourri | 1 | 25 | 12s | Cône 8m, 60 dmg + maladie -10% soins reçus, 12s |
| Essaim | 2 | 40 | 25s | Zone 8m, 50 dmg/s, 6s |
| Décomposition | 3 | 55 | 35s | Cible -30% armure, 15s |
| Miasme | 4 | 75 | 60s | Zone 12m, 80 dmg/s + cécité, 10s |
| **Charnier** (sig 5) | 5 | 190 | 10 min | Zone 20m, dmg + maladie persistante, 12s |

---

## Voie des Déliés (antagoniste, narrative)

| Paramètre | Valeur |
|---|---|
| Accès | Rituel de rupture explicite après condition cachée 🔒 (refus actif d'Accord en fin d'Ère) |
| Voie active | Aucune (pas de Lien) |
| Pool de pouvoir | "Force brute" — substitut au Mana, régénère uniquement par accomplissement violent |
| Régénération | +10 par kill PNJ ennemi, +25 par kill Boss, 0 hors combat |
| Cap pool | 200 |
| Effets passifs | +25% dmg physique, +20% PV, immunité aux Souffles (pas de compression), -100% gain Accord |
| Sorts | 4 capacités fixes (Frappe brute, Endurance, Refus, Fureur) |
| Coût social | Considéré hostile par PNJ religieux ; accès villes Ordo Caelum/Eldoria limité |
| Réversibilité | Possible mais nécessite quête épique (~10h) |

| Capacité Délié | Coût | Cd | Effet |
|---|---|---|---|
| Frappe brute | 30 | 4s | Coup armé +100% dmg, ignore 50% armure |
| Endurance | 50 | 60s | +50% PV temp 15s, immunité ralentissement |
| Refus | 80 | 90s | Annule tous buffs/debuffs sur self, 8s d'invulnérabilité aux sorts |
| Fureur | 150 | 5 min | +75% dmg + +50% vit atk, 15s |

---

## Réactions entre Voies — combos

### Synergies (deux Liés sur même cible/zone, fenêtre 2s)

| Voie A | Voie B | Nom du combo | Effet |
|---|---|---|---|
| Aquor | Aerion | Tempête | Projection 8m + 60 dmg/s pendant 6s |
| Aquor | Ignara | Vapeur ardente | Cécité 4s + 80 dmg/s pendant 4s |
| Terranu | Spiritus | Vergers furieux | Racines immobilisent 5s + 30 dmg/s |
| Aurion | Tempora | Surcharge temporelle | Sorts arcaniques ×1.5 dmg, 8s |
| Celestia | Eldoria | Aube | Soigne alliés 200 PV + révèle invisibles 30m |
| Tempora | Fatum | Ralenti fatal | Cible ralentie -70%, +50% dmg subis, 5s |
| Noctis | Umbra | Manteau profond | Invisibilité partagée groupe, 8s |
| Ignara | Aerion | Brasier | Zone feu 12m, 100 dmg/s, 8s |
| Sanguis | Vermis | Plaie putride | Saignement non-soignable, 90 dmg/s, 12s |
| Resonia | Somnix | Berceuse | Sommeil zone 6s |
| Navigor | Spiritus | Appel des morts | Invoque 3 esprits, 20s |
| Aurion | Resonia | Harmonique | Sorts ×1.4 portée, 10s |

### Oppositions (s'annulent + drain Mana double sur les deux Liés)

| Voie A | Voie B | Effet |
|---|---|---|
| Eldoria | Noctis | Annulation totale dmg + drain Mana ×2 |
| Celestia | Umbra | Annule masquage cible |
| Aquor | Ignara (sans synergie) | Vapeur seulement si timing combo, sinon annulation |
| Tempora | Fatum (mal joué) | Si décalé >2s, annulation |
| Spiritus | Vermis | Annulation soins ; +20% dmg subis pendant 8s |
| Resonia | Vermis | Annulation buffs sonores |

### Réactions à 3 Voies (groupe coordonné, fenêtre 3s)

| Trio | Nom | Effet |
|---|---|---|
| Celestia + Eldoria + Aerion | Aurore divine | Zone 30m, soin 400 PV + 300 dmg lumière + vol 8s alliés |
| Noctis + Umbra + Sanguis | Linceul écarlate | Invisibilité groupe + drain massif zone, 10s |
| Tempora + Aurion + Fatum | Fracture | Cible figée 5s, prend 500 dmg arcaniques différés |
| Aquor + Aerion + Ignara | Cataclysme | Zone 25m, 80 dmg/s × 3 éléments, 10s |
| Terranu + Spiritus + Sanguis | Renaissance | Ressuscite tous alliés morts dans 25m à 50% PV |

---

## Effets selon Ère (cross-link avec [[Souffle System]])

| Position de la Voie dans l'Ère | Effet sem 1 | Effet reste de l'Ère |
|---|---|---|
| Voie dominante | +25% efficacité (dmg/soin/durée) | +10% efficacité |
| Voie secondaire | +10% efficacité | +5% efficacité |
| Voie neutre | aucun | aucun |
| Voie opposée à la dominante | -20% efficacité, +20% coût Mana | -20% efficacité, +20% coût Mana |
| Voie opposée à la secondaire | -10% efficacité | -10% efficacité |

**Compression Mana max post-Souffle** : appliquée selon la formule générale du Souffle (seuil 50, facteur 0.7 / 0.5).

**Rouille des Maîtrises Voie post-Souffle** :
| Magnitude | Durée | Effet |
|---|---|---|
| Petit Souffle | 1 sem | -15% efficacité sorts, +20% coût Mana, +15% temps incantation |
| Grand Souffle | 2 sem | mêmes effets, durée doublée |

Voir [[Souffle System]] pour le détail des transitions.

---

## Effets selon Accord (cross-link avec [[Accord System]])

| Palier Accord | Effet sur la Voie |
|---|---|
| 0-25 (Étranger) | -10% efficacité, +10% coût Mana |
| 26-50 (Présent) | aucun |
| 51-75 (Accordé) | +5% efficacité, -5% coût Mana |
| 76-99 (Profond) | +15% efficacité, -10% coût Mana, +10% portée |
| 100 (Concordant) | +25% efficacité, -15% coût Mana, +15% portée, accès sort signature même hors niv 5 |

L'Accord renforce la résonance entre le Lié et son Ère — pas la Voie en elle-même, mais la **présence du Lié dans la Polyphonie**.

---

## Conditions de déblocage des Voies

| Voie | Méthode de découverte |
|---|---|
| Celestia | Grimoire au sommet du Pic d'Astravia (PNJ : Maître Veyran) ou prière dans temple Ordo Caelum à minuit lors d'une nuit claire |
| Tempora | Ruines temporelles d'Iltheran (donjon niv 30+) ou résoudre énigme de Maître Korn (Cestra) |
| Noctis | Rituel Noctari à minuit dans 5 villes différentes ou condition cachée 🔒 (mourir 7 fois en 24h réelles) |
| Navigor | Survivre à la traversée du Voile (event semi-rare) ou parler à 5 spectres dans 5 régions |
| Eldoria | Sanctuaire d'Aurion (Ordo Caelum) après quête de purification ou défaite d'un démon majeur seul |
| Aquor | PNJ pêcheur au village de Salhar (quête simple) |
| Aerion | Ascension du Mont Veyl (escalade, sans monture) |
| Aurion | Bibliothèque arcanique de Galenor (quête niv 15) |
| Umbra | Guilde des ombres (faction, réputation 1500+) |
| Spiritus | Druide Sylvenne (forêt d'Aldenor, quête naturelle) |
| Fatum | Oracle de Verra (donation 100 éclats + énigme) |
| Terranu | Forgeron-mage Brunhilda (Mosrack, quête sociale) |
| Somnix | Onirique du temple endormi (condition cachée 🔒 dormir 8h réelles in-game) |
| Ignara | Volcan de Karth (épreuve physique) ou Ignis Aeternum réputation 1000+ |
| Sanguis | Rituel auto-sacrificiel (perdre 50% PV en présence d'autel sanguis) |
| Resonia | Maître barde de Cendara (concours musical mini-jeu) |
| Vermis | Cimetière oublié d'Ulvar (quête morbide, choix moraux) |

**Toutes les Voies** : trois entrées possibles minimum (PNJ / lieu / condition cachée).

---

## Rupture du Lien — paramètres

| Étape | Valeur |
|---|---|
| Coût Labeur | 100 pts (1 journée complète) |
| Période de "vide" | 72h réelles (3 jours) sans canalisation possible |
| Perte de niveau Voie quittée | XP tombe à 0 |
| Découverte requise | La nouvelle Voie doit être trouvée comme la première |
| Cooldown global rupture | 30 jours réels entre 2 ruptures |

---

## Magie + Armes

| Interaction | Effet |
|---|---|
| Enchantement temporaire | Infuse arme avec Voie : +30 dmg élément Voie, 60s, coût 40 Mana |
| Sceptre équipé | ×1.30 multiplicateur global sur sorts, +10% portée |
| Bâton | +15% efficacité Voie de la classe Naturelle (Spiritus/Terranu/Aerion/Aquor) |
| Orbe | +15% Voie arcanique (Aurion/Tempora/Fatum) |
| Reliquaire | +15% Voie sacrée (Eldoria/Celestia) |
| Athamé | +15% Voie sombre (Noctis/Umbra/Sanguis/Vermis) |

---

## Économie Mana

```
Mana_max = 100 (base) + 5 par niveau perso + 20 par palier Voie
Régen hors combat = 5/sec
Régen en combat = 1/sec
Régen méditation (channel 4s) = 30 instant, cooldown 60s
```

**Coûts globaux modulés** par :
- Palier Voie : -10% à -40% selon niveau
- Sceptre : pas de réduction coût mais +30% efficacité
- Accord : -5 à -15% selon palier
- Ère (Voie dominante) : pas de modulation coût mais +10/+25% efficacité
- Ère (Voie opposée) : +20% coût

---

## Conditions cachées 🔒 — Lien Profond (niv 5)

| Voie | Condition cachée |
|---|---|
| Celestia | Caster Œil céleste à l'aube exactement, 7 jours consécutifs |
| Tempora | Survivre à la mort grâce à Reprise (signature) 3 fois |
| Noctis | Tuer un Lié d'Eldoria sans être détecté |
| Navigor | Visiter 50 sanctuaires différents et y prier |
| Eldoria | Soigner 10 000 PV cumulés en une seule Ère |
| Aquor | Plonger au plus profond du Gouffre marin de Mar'Kel |
| Aerion | Voler 1h cumulée sans toucher le sol |
| Aurion | Lancer 1000 sorts arcaniques en une Ère |
| Umbra | Rester invisible 30 min cumulées en combat |
| Spiritus | Établir lien actif avec 30 espèces différentes |
| Fatum | Prédire correctement 5 morts de PNJ majeurs |
| Terranu | Construire/aider à construire 3 monuments durables |
| Somnix | Faire endormir 100 ennemis cumulés |
| Ignara | Survivre au volcan en éruption de Karth |
| Sanguis | Sacrifier 50% PV pour ressusciter 10 alliés |
| Resonia | Composer chant unique en concours mondial |
| Vermis | Décomposer 1000 cadavres |

---

## Dépendances système

| Composant | Rôle |
|---|---|
| [[HW Progression Component]] | XP par Voie, niveaux, décroissance |
| [[HW Spell Component]] | Cast, cooldown, coût Mana, FX |
| [[Mana System]] | Pool, régen, modificateurs |
| [[Combat System]] | Application dégâts, types, résistances |
| [[VFX Audio Rendu/Index]] | Variants visuels par Voie |
| [[Quest System]] | Conditions cachées, déblocage |
| [[Souffle System]] | Modulation Ère sur efficacité |
| [[Accord System]] | Modulation Accord sur efficacité |
| [[Faction System]] | Réputation Délié, accès villes |

---

## Points de calibrage à playtester

- [ ] Coûts Mana sorts signature niv 5 (150-220) — trop punitif ou bien dosé ?
- [ ] Bonus Voie dominante +25% sem 1 / +10% reste — équilibrage Liés vs non-Liés
- [ ] Voie Sanguis : coûts en PV — viable solo ou nécessite groupe ?
- [ ] Réactions à 3 Voies : fenêtre 3s — coordination réaliste ?
- [ ] Voie des Déliés : équilibrage face à Liés haut niveau
- [ ] Cooldown rupture 30 jours réels — trop punitif ?
- [ ] Décroissance 21 jours d'inactivité — bonne friction ?
- [ ] Voie Ignara : rééquilibrage face à autres Cosmiques (DPS pur)

---

## Décisions actées

- Mono-Voie strict : un Lié = une Voie active à la fois
- 5 niveaux par Voie, palier 5 = condition cachée 🔒
- 17 Voies au total (5 Éternels + 12 Cosmiques) + Voie des Déliés (antagoniste)
- Décroissance par non-usage : 5%/sem après 21j d'inactivité
- Réactions à 2 et 3 Voies définies
- Voie Ignara ajoutée pour combler la Voie de Feu
- Modulation Ère et Accord cumulatives (multiplicatives)
- Rupture coûteuse : 100 Labeur + 72h vide + cooldown 30 jours

---

*Liens narratifs : [[Le Lien]] | [[Cosmologie]] | [[Le Souffle]] | [[L'Accord]]*
*Liens techniques : [[Souffle System]] | [[Accord System]] | [[Combat System]] | [[Mana System]] | [[HW Progression Component]]*
