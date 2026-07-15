---
tags: [implementation, cosmologie, eternels, cosmiques, celestes, religions, polyphonie]
status: drafted
last_review: 2026-05-07
needs_review_for: [equilibrage-presence-eternels, seuils-titres-celestes-playtest]
type: implementation
canonical_concept: "[[Cosmologie]]"
---

# Cosmology Spec — Implémentation

> Page d'implémentation technique du concept narratif **[[Cosmologie]]**.
> Cette page contient les **chiffres, formules, tableaux mécaniques et règles de balance** pour la Polyphonie cosmique, les Éternels, les Cosmiques, les Célestes, les religions et les conditions de manifestation.
> Pour la philosophie, l'intention de design et la voix in-world : voir [[Cosmologie]].

---

## 1. Modèle de la Polyphonie cosmique

### Vecteur de Présence

Chaque entité cosmique est représentée par un **vecteur de présence** dans l'EraConfig courante. La somme normalisée de ces vecteurs forme la signature tonale d'une Ère.

```
PolyphonyVector = {
    eternels:  [Celestia, Tempora, Noctis, Navigor, Eldoria]      // 5 floats [0..1]
    cosmiques: [Aerion, Aquor, Aurion, Umbra, Spiritus, Fatum,
                Terranu, Somnix, Ignara, Sanguis, Resonia, Vermis] // 12 floats [0..1]
}

Contrainte : Σ(eternels) ≈ 1.0 (normalisé)
              Σ(cosmiques) ≈ 1.0 (normalisé)
```

### Bornes de présence par rang

| Rang | Présence min | Présence max | Présence "dormante" | Présence "dominante" |
|------|--------------|--------------|---------------------|----------------------|
| Éternel | 0.05 | 0.55 | < 0.10 | ≥ 0.35 |
| Cosmique | 0.02 | 0.30 | < 0.05 | ≥ 0.18 |
| Céleste | 0.00 | 0.15 | 0.00 | ≥ 0.10 |

Une entité est dite **éloquente** si présence ≥ seuil dominant ; **silencieuse** si < seuil dormant ; **présente** sinon.

---

## 2. Tableau mécanique des 5 Éternels

| Entité | Voie associée ([[Lien System]]) | Présence baseline | Variance Ère | Stat tutélaire | Effet sur l'Ère si dominante |
|--------|--------------------------------|-------------------|--------------|----------------|------------------------------|
| **Celestia** | Voie de la Lumière | 0.20 | ±0.20 | Régulation, Précision | +15 % stabilité météo, -10 % drift d'Accord |
| **Tempora** | Voie du Temps | 0.20 | ±0.25 | Cooldowns, Rythme | -10 % cooldowns globaux, +20 % occurrence Failles temporelles |
| **Noctis** | Voie de l'Ombre | 0.20 | ±0.30 | Furtivité, Secrets | +25 % spawn rate entités nocturnes, -15 % visibilité moyenne |
| **Navigor** | Voie du Passage | 0.20 | ±0.20 | Voyage, Téléport | -20 % coût voyage rapide, +30 % spawn portails interzones |
| **Eldoria** | Voie de la Création | 0.20 | ±0.25 | Craft, Forge | +20 % qualité craft moyenne, +15 % drop matériaux rares |

### Effet d'un Éternel silencieux (présence < 0.10)

| Éternel silencieux | Conséquence systémique |
|--------------------|------------------------|
| Celestia | -20 % stabilité météo, +30 % événements aléatoires |
| Tempora | +15 % cooldowns globaux, +50 % spawn Failles |
| Noctis | -50 % spawn entités nocturnes, +25 % visibilité globale |
| Navigor | +40 % coût voyage rapide, fermeture aléatoire de portails |
| Eldoria | -15 % qualité craft, -25 % drop matériaux rares |

---

## 3. Tableau mécanique des 12 Cosmiques

| Entité | Domaine | Voie associée | Présence baseline | Stat tutélaire | Bonus dominante |
|--------|---------|---------------|-------------------|----------------|-----------------|
| **Aerion** | Vents, atmosphères | Voie du Vent | 0.083 | Vitesse, Esquive | +10 % vitesse déplacement |
| **Aquor** | Eaux, océans | Voie de l'Eau | 0.083 | Régénération, Fluidité | +15 % régen Mana près de l'eau |
| **Aurion** | Énergies éthérées | Voie de l'Éther | 0.083 | Mana max, Channel | +10 % Mana max |
| **Umbra** | Ombres, secrets | Voie de l'Ombre | 0.083 | Furtivité, Crit | +15 % dégâts critiques en furtivité |
| **Spiritus** | Esprits, conscience nature | Voie de l'Esprit | 0.083 | Communion, Empathie | +20 % efficacité invocations naturelles |
| **Fatum** | Destins | Voie du Destin | 0.083 | Chance, Loot | +15 % drop rate global |
| **Terranu** | Terres, fertilité | Voie de la Terre | 0.083 | Défense, Endurance | +10 % défense, +20 % rendement agricole |
| **Somnix** | Rêves, visions | Voie du Rêve | 0.083 | Vision, Prédiction | +25 % portée vision, signes Souffle plus lisibles |
| **Ignara** | Feu profond | Voie du Feu | 0.083 | Dégâts feu, Forge | +15 % dégâts feu, +10 % qualité forge |
| **Sanguis** | Vie, sang, lignées | Voie du Sang | 0.083 | PV max, Régen | +15 % PV max |
| **Resonia** | Résonance, musique | Voie de la Résonance | 0.083 | Buffs, Harmonie | +20 % durée buffs |
| **Vermis** | Décomposition, cycle | Voie du Cycle | 0.083 | Dégâts poison, Décom | +20 % dégâts dégénératifs |

### Interactions Voies — matrice d'affinités

Voir [[Lien System]] §"Matrice des interactions" pour le détail. Synthèse :

| Cosmique A | Cosmique B | Affinité | Effet combiné |
|------------|------------|----------|---------------|
| Aquor | Ignara | Antagoniste | Annulation partielle (-30 % effets si co-dominants) |
| Aerion | Terranu | Complémentaire | Synergie érosion (+15 % effets si co-dominants) |
| Umbra | Aurion | Complémentaire | Magie d'ombre éthérée (+20 % dégâts magiques) |
| Spiritus | Sanguis | Complémentaire | Communion vivante (+15 % regen globale) |
| Fatum | Somnix | Complémentaire | Prédiction renforcée (signes du Souffle +30 % lisibles) |
| Resonia | Vermis | Antagoniste | Friction harmonique (-20 % buffs durée) |

---

## 4. Influence sur les Ères ([[Era System]])

### Dérivation d'EraConfig depuis PolyphonyVector

```
EraConfig.dominant_eternal   = argmax(PolyphonyVector.eternels)
EraConfig.dominant_cosmiques = top3(PolyphonyVector.cosmiques)
EraConfig.silent_entities    = filter(presence < dormant_threshold)
EraConfig.theme_tag          = lookup(dominant_eternal, dominant_cosmiques[0])
EraConfig.continent_emphasis = weighted_pick(continent_affinity_map, dominant_*)
```

### Table thème → biais d'Ère

| Éternel dominant | Cosmique secondaire dominant | Tag thématique d'Ère | Biais quêtes IA |
|------------------|------------------------------|----------------------|-----------------|
| Celestia | Aerion | "Cieux clairs" | Astronomie, voyages aériens |
| Celestia | Aurion | "Constellation éthérée" | Magie céleste, divination |
| Tempora | Fatum | "Heure du Jugement" | Prophéties, destins croisés |
| Tempora | Somnix | "Failles oniriques" | Failles temporelles, rêves prophétiques |
| Noctis | Umbra | "Voile profond" | Espionnage, secrets, sociétés cachées |
| Noctis | Vermis | "Long crépuscule" | Décomposition, mort, cycle inversé |
| Navigor | Aquor | "Routes liquides" | Navigation, exploration océanique |
| Navigor | Aerion | "Errance des vents" | Caravanes, exilés, migration |
| Eldoria | Ignara | "Forge ardente" | Artisanat, fonderies, grandes œuvres |
| Eldoria | Resonia | "Chant créateur" | Bardes, rituels harmoniques |
| Eldoria | Terranu | "Prospérité solide" | Construction, agriculture, monuments |

### Modulation de la durée d'Ère par Polyphonie

| Configuration | Modulateur durée |
|---------------|------------------|
| Tempora dominant (≥ 0.35) | -15 % durée (le temps presse) |
| Tempora silencieux (< 0.10) | +20 % durée (le temps stagne) |
| Eldoria + Resonia co-dominants | +10 % durée (l'Ère veut s'achever en œuvre) |
| Vermis dominant | -20 % durée (le cycle veut se boucler) |
| Plus de 3 entités silencieuses | +25 % durée (Polyphonie appauvrie, monde lent) |

---

## 5. Conditions de manifestation

Une entité ne peut **se manifester** (intervention scriptée, événement mondial) que si certaines conditions sont remplies.

| Type de manifestation | Conditions requises | Fréquence max |
|-----------------------|---------------------|---------------|
| Apparition d'omen (Éternel) | présence ≥ 0.30 ET événement narratif déclencheur | 1 par mois |
| Avatar local d'un Cosmique | présence ≥ 0.20 ET continent affinité ≥ 0.50 | 1 par 2 semaines par continent |
| Intervention directe d'un Céleste | rituel collectif réussi (≥ 50 participants) OU Consécration liée détenue | À la demande, cooldown 7j |
| Réveil d'un Éternel silencieux | Souffle Cardinal OU rituel mondial (≥ 1000 participants) | Très rare, scripté |
| Éveil d'une voix tue (Délié→Lié) | Quête narrative spécifique + Accord ≥ 75 | Cas par cas |

---

## 6. Mécaniques des Consécrations ([[Accord System]])

Une **Consécration** est un **honneur mortel** nommé d'après une entité (Céleste ou Cosmique) : son porteur devient la « main de Forgion », la « voix de Cura », l'« œil d'Asterion »… Ce n'est **pas** un siège dans le chœur cosmique — aucun mortel ne rejoint la Polyphonie. La Consécration se tient tant que le porteur garde son Accord. Voir [[Accord System]] §"Consécrations" pour le système complet.

### Seuils de Consécration

| Étape | Condition | Récompense |
|-------|-----------|------------|
| Candidat | Accord ≥ 80 ET maîtrise Voie ≥ niv 7 | Titre "Aspirant" + invitation rituel |
| Élu | Réussite épreuve dédiée (boss instancié) ET 3 Souffles vécus | Titre "Élu", accès rite de Consécration |
| Consacré | Consécration vacante disponible ET vote/défi remporté | Consécration permanente + buff signature (tant que l'Accord tient) |
| Consécration perdue | Accord < 40 pendant 2 Souffles consécutifs | Perte de la Consécration, honneur rendu disponible |

### Buffs signature des Consécrations

| Consécration (exemples) | Domaine | Buff permanent du détenteur |
|--------------------------|---------|------------------------------|
| **Arcana** | Savoir mystique | +25 % vitesse identification, accès bibliothèques cachées |
| **Forgion** | Enchantement d'armes | +15 % qualité enchantement, déblocage recettes uniques |
| **Cura** | Guérison mystique | +30 % puissance soins, cooldowns -20 % |
| **Asterion** | Cartographie | Carte du monde révélée +50 %, prédiction Souffle améliorée |
| **Explorator** | Découverte | +25 % loot rare, accès zones cachées |

### Règles de défi de Consécration

```
Défi possible si :
  - Consécration tenue depuis ≥ 30 jours
  - Challenger : Accord ≥ 75, maîtrise Voie ≥ niv 6
  - Cooldown défi : 14 jours par challenger par Consécration

Conditions de victoire (propres à la Consécration) — voir Accord System.
```

---

## 7. Tableau mécanique des 9 religions

### Religions favorisées / défavorisées par dominante d'Ère

| Religion | Entité(s) vénérée(s) | Ère favorable (dominante) | Ère défavorable | Bonus en Ère favorable | Malus en Ère défavorable |
|----------|----------------------|---------------------------|-----------------|------------------------|--------------------------|
| **Ordo Caelum** | Celestia, Stellaris | Celestia ≥ 0.35 | Celestia < 0.10 | +20 % rituels collectifs efficaces | -15 % réputation, -10 % rituels |
| **Vael'Kurash** | Spiritus, Arborius | Spiritus ≥ 0.18 | Vermis ≥ 0.18 | +15 % communion nature | -20 % efficacité chamanique |
| **Ignis Aeternum** | Eldoria, Ignara | Eldoria ≥ 0.35 OU Ignara ≥ 0.18 | Aquor ≥ 0.18 ET Eldoria < 0.15 | +20 % rituels de feu, +10 % forge | -25 % rituels |
| **Noctari** | Noctis, Umbra, Umbralis | Noctis ≥ 0.35 | Celestia ≥ 0.35 | +25 % bonus nuit, accès rites secrets | -20 % furtivité rituelle |
| **Rota Mundi** | Tempora, Climata, Fatum | Tempora ≥ 0.30 OU Fatum ≥ 0.18 | Tempora < 0.10 | +15 % prédiction, lecture cycle | -20 % efficacité prophétique |
| **Via Ventus** | Aerion, Navigor | Aerion ≥ 0.18 OU Navigor ≥ 0.30 | Terranu ≥ 0.18 ET Aerion < 0.05 | +15 % voyage, communion vent | -20 % rituels mobiles |
| **Lex Petra** | Terranu, Gravitas, Judicar | Terranu ≥ 0.18 | Aerion ≥ 0.20 | +20 % rituels juridiques, prospérité | -15 % cohésion doctrinale |
| **Somnium Vigil** | Somnix, Realis, Aurion | Somnix ≥ 0.18 | Tempora ≥ 0.35 | +25 % rêves prophétiques, oniromancie | -20 % visions efficaces |
| **Foedus Animae** | Anima, Mentor, Ancestralis | Sanguis ≥ 0.18 OU Spiritus ≥ 0.18 | Vermis ≥ 0.20 | +20 % rituels de serment, médiation âmes | -15 % efficacité serments |

### Modificateurs de réputation religieuse

```
ReputationGain(joueur, religion, Ère) = base_gain
    × (1 + bonus_si_favorable - malus_si_defavorable)
    × (1 + 0.1 × titre_celeste_compatible ? 1 : 0)
    × multiplicateur_ritual_collectif
```

| Activité | Gain de réputation | Modificateur Ère |
|----------|--------------------|--------------------| 
| Prière individuelle quotidienne | +1 | × 1.0 (favorable : × 1.5) |
| Participation rituel mineur | +5 | × 1.0 (favorable : × 1.5) |
| Participation rituel majeur | +25 | × 1.0 (favorable : × 2.0) |
| Quête religieuse complétée | +10 à +50 | × 1.0 (favorable : × 1.5) |
| Hérésie / sacrilège | -30 à -100 | indépendant |

### Religions mineures — table de référence

| Nom | Filiation mécanique | Particularité système |
|-----|---------------------|------------------------|
| Filii Fornacis | Ignis Aeternum populaire | Bonus craft +5 % cumulable avec mère |
| Aqua Nigra | Vael'Kurash + Noctari | Hybride : favorisée si Aquor ≥ 0.15 ET Noctis ≥ 0.20 |
| Catena Fracta | Hors-tradition (post-Cardinal) | -10 % rep avec toutes les autres religions |
| Taciti | Foedus Animae contemplative | Bonus passif méditation +20 % regen Mana hors combat |
| Cantus Mundi | Lumière Ancienne + Présence Visible | Bonus Resonia : +15 % buffs musicaux |

---

## 8. Mécaniques des Déliés

Les Déliés (mortels qui se retirent du tissu cosmique). Voir [[Lien System]] §"Path Délié" pour le détail.

| Stade Délié | Condition | Bénéfice | Coût |
|-------------|-----------|----------|------|
| Délié initial | Refus actif d'Accord ≥ 30 jours | +10 % stats brutes hors compression | -50 % résistance Souffle |
| Délié confirmé | 2 Souffles refusés | +25 % stats, immunité partielle compression | Aucun bonus Voie possible, religions hostiles |
| Délié profond | 4 Souffles refusés | +50 % stats brutes | Hostilité PNJ majoritaires, accès quêtes alternatives uniquement |

```
ResistanceSouffle(Délié) = 1 - 0.5 × stade_délié
StatsBruteBonus(Délié)   = 1 + 0.1 × stade_délié × (1 + 0.5 × souffles_refusés)
```

---

## 9. Pacte Primordial — table d'événements scriptés

Le Pacte Primordial est l'arrière-plan mythologique. Mécaniquement, il déclenche des événements rares.

| Événement | Conditions | Effet mondial | Cooldown |
|-----------|------------|---------------|----------|
| Rappel du Pacte | Souffle Cardinal | Toutes les religions reçoivent un buff temporaire +20 % | 1 par Cardinal |
| Rupture partielle | Plus de 5 entités silencieuses simultanément | Failles spontanées, événement narratif global | Très rare |
| Renouvellement | Rituel mondial réussi (≥ 5000 participants) | Reconfiguration partielle PolyphonyVector | 1 par décennie réelle max |

---

## 10. Dépendances système

| Composant | Rôle |
|-----------|------|
| [[Souffle System]] | Reconfigure PolyphonyVector à chaque Souffle |
| [[Era System]] | Consomme EraConfig dérivée de PolyphonyVector |
| [[Lien System]] | Utilise présence Cosmiques pour bonus/malus Voies |
| [[Accord System]] | Calcule éligibilité Consécrations |
| [[Global Data Service]] | Stockage/sync PolyphonyVector courant |
| [[Quest System]] | Biais thématique selon dominante |
| [[HW Religion Component]] | Gestion réputation, rituels, bonus/malus religieux |
| [[Entity Spawner]] | Spawn rates modulés par présence Cosmiques |

---

## 11. Points de calibrage à playtester

- [ ] Bornes présence Éternels (0.05–0.55) — tonalité d'Ère trop monolithique ou trop diluée ?
- [ ] Seuils dominante Cosmiques (0.18) — biais quêtes assez visible ?
- [ ] Modulateurs durée Ère par Polyphonie — perception ressentie ?
- [ ] Buffs Consécrations — pas trop puissants vs joueur sans Consécration ?
- [ ] Stades Délié — viabilité du path antagoniste sans devenir cassé ou inutile ?
- [ ] Bonus/malus religion par Ère — incite vraiment au switch de pratique ?

---

## 12. Décisions actées (techniques)

- Vecteur de Présence normalisé séparément Éternels / Cosmiques
- Bornes de présence : Éternel [0.05, 0.55], Cosmique [0.02, 0.30], Céleste [0.00, 0.15]
- Seuil dominante Éternel = 0.35, Cosmique = 0.18
- Seuil silencieux Éternel < 0.10, Cosmique < 0.05
- 12 Cosmiques canonisés D-COSMO-4 : Aerion, Aquor, Aurion, Umbra, Spiritus, Fatum, Terranu, Somnix, Ignara, Sanguis, Resonia, Vermis
- Consécrations = honneurs mortels nommés d'après une entité (Arcana, Forgion, Cura, Asterion, Explorator, etc.), tenus tant que l'Accord tient — jamais un siège dans la Polyphonie
- 9 religions canoniques + 5 mineures, modulateurs Ère selon présence des entités vénérées
- Path Délié à 3 stades, immunité partielle compression au prix d'isolement social

---

*Liens narratifs : [[Cosmologie]] | [[Le Souffle]] | [[Les Ères]] | [[L'Accord]] | [[Le Lien]]*
*Liens techniques : [[Souffle System]] | [[Era System]] | [[Lien System]] | [[Accord System]] | [[Global Data Service]]*
