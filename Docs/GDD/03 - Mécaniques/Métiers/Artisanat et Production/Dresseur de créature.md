---
tags: [métier, archétype, artisanat, verbe, présence, dressage, bestiaire]
type: archetype
category: Métier
catégorie_métier: Artisanat et production
stat_principale: Verbe
stats_secondaires: [Présence, Mémoire, Endurance]
craft_category: Transversal (lié Bestiaire)
sources_ressources_accessibles: [Créature sauvage à apprivoiser, Nourriture animale, Harnais, Selle, Friandise apprivoisement]
stations_principales: [Enclos de dressage, Carrière, Chenil/écurie, Palier de dressage spécialisé]
outils_principaux: [Sifflet, Lasso, Harnais, Friandise, Bâton de commandement]
paliers_maîtrise: [Novice, Initié, Adepte, Expert, Maître]
métiers_complémentaires: [Métiers#Éleveur de créature, Métiers#Chasseur de créature, Métiers#Berger, Cordonnier (sellier), Métiers#Vétérinaire, Métiers#Dresseur (Exploration)]
era_modulation: true
status: drafted
last_review: 2026-05-01
needs_review_for: [frontière-Dresseur-Eleveur-Berger-Vétérinaire, créatures-dressables-vs-non, dressage-vs-pacte-magique]
---

# 🐺 Archétype-Métier — Dresseur de créature

> Métier **transversal** au croisement [[Bestiaire - Index|Bestiaire]] / [[Exploration]] / Artisanat. Le Dresseur transforme une **créature sauvage** (capturée vivante par lui-même ou un Chasseur) en **monture, animal de combat, animal de travail ou animal domestique** dressé.

> **Frontière canonique avec [[Métiers|Éleveur de créature]] (M1)** : l'**Éleveur** se concentre sur la **reproduction et l'élevage en captivité** (cycles de reproduction, lignées, naissance, alimentation des juvéniles). Le **Dresseur** se concentre sur l'**apprivoisement et l'entraînement comportemental** d'une créature spécifique. Les deux métiers sont **complémentaires** (un Éleveur produit le poulain, le Dresseur le forme), pas concurrents.

> **Frontière avec [[Métiers|Dresseur (Exploration)]]** : le métier "Dresseur" listé en catégorie Exploration ([[Métiers]]) est en réalité le **même métier** vu sous l'angle "apprivoisement de créatures sauvages dans la nature". Cet archétype Artisanat **fusionne les deux angles** (capture/apprivoisement + entraînement comportemental d'atelier).

---

## 1. Vue d'ensemble

Le **Dresseur de créature** apprivoise et entraîne des créatures pour qu'elles deviennent utiles à un joueur ou une faction : **monture** (cf. [[Exploration]] §Monture), **compagnon de combat**, **animal de travail** (cheval de trait, chien de berger), **animal de service** (faucon de chasse, chien pisteur, créature exotique cosmétique).

**Place dans la chaîne d'artisanat :**
- **Amont** : [[Métiers|Chasseur]] (capture vivante de créatures sauvages), [[Métiers|Éleveur de créature]] (juvéniles d'élevage), [[Métiers|Berger]] (animaux d'élevage standards)
- **Aval** : joueurs (équipement monture/compagnon), [[Cordonnier]] § sous-spé Sellier (selles), [[Métiers|Vétérinaire]] *(stub futur)*, [[Factions]] (cavalerie militaire)

**Identité gameplay :**
- Métier **socio-comportemental** — `Verbe` (commandes, lien vocal), `Présence` (autorité naturelle, charisme animal), `Mémoire` (espèces, comportements, signaux), `Endurance` (sessions longues sur le terrain)
- Métier **temps long** : un dressage T3+ prend des **jours réels** (cycle d'apprivoisement)
- Métier **transversal** : pivot entre [[Bestiaire - Index|Bestiaire]] (créatures), [[Exploration]] (montures), [[Combat]] (compagnons combattants), [[Économie]] (commerce de créatures dressées)

**Ancrage culturel :** Galenor (cavaliers impériaux), Alkaran (chiens de meute, cerfs nordiques), Cendara (créatures volcaniques exotiques), Onara (faucons sacrés Foedus Animae), Cestra (créatures marines), Endora (compagnons exotiques de cour).

---

## 2. Stats & Maîtrises

| Stat | Rôle |
|------|------|
| **Verbe** *(principale)* | Commandes vocales, lien sonore, habituation au signal |
| **Présence** *(principale)* | Autorité naturelle, charisme animal, dominance non-violente |
| **Mémoire** *(secondaire)* | Espèces, signaux comportementaux, lignées |
| **Endurance** *(secondaire)* | Sessions terrain longues |
| Acuité | Lecture comportementale, détection signe d'agression / soumission |
| Vigueur | Marginal — utile pour creatures lourdes (boucle physique) |

### Maîtrises contextuelles

- **`Maîtrise_Dressage`** — racine
- **`Maîtrise_Apprivoisement`** — sous-spécialité capture/début (palier Novice → Adepte)
- **`Maîtrise_Cavalerie`** — sous-spécialité monture combattante (palier Adepte+)
- **`Maîtrise_Compagnon_Combat`** — créatures de combat (palier Expert+)
- **`Maîtrise_Pacte_Cosmique`** — créatures rares/cosmiques (palier Maître, frontière [[Le Lien]])

---

## 3. Sources de ressources accessibles

### Intrants

| Intrant | Source | Notes |
|---------|--------|-------|
| **Créature sauvage capturée vivante** | Chasseur (capture non-létale) | Voir [[Bestiaire - Index]] |
| **Juvénile d'élevage** | Éleveur de créature (M1) | Plus docile, dressage plus rapide |
| **Animal d'élevage standard** | Berger | Chien, mouton-monture, cheval commun |
| **Friandise / appât** | Boucher (viande), Boulanger (pain), Apothicaire (apaisant) | Récompense apprivoisement |
| **Harnais / Selle** | Cordonnier (sellier) | Voir [[Cordonnier]] §Spé Sellier |
| **Cage de transport** | Menuisier / Forgeron | Capture |

### Sortie

- 1 cycle de dressage (1-30 jours selon tier) → 1 créature dressée prête à être équipée par un joueur

---

## 4. Stations + outils

| Station | Rôle | Tier débloqué |
|---------|------|---------------|
| **Enclos de dressage** | Espace clos sécurisé | T1+ |
| **Carrière** *(grande aire ouverte)* | Dressage monture, manège | T2+ |
| **Chenil / Écurie** | Logement créatures dressées | T1+ |
| **Palier de dressage spécialisé** | Spé combat / cavalerie / faucon | T3+ |

### Outils

| Outil | Notes |
|-------|-------|
| **Sifflet** | Signal sonore, dressage à distance |
| **Lasso** | Capture, contrôle initial |
| **Harnais / Bride** | Maintien physique |
| **Friandise** | Récompense (consommable) |
| **Bâton de commandement** | Autorité visuelle (palier Adepte+) |

---

## 5. Paliers de Maîtrise

| Palier | Capacités | Conditions |
|--------|-----------|------------|
| **1 — Novice** | Apprivoisement créatures T1 dociles (chien, oiseau commun, mouton). 1 commande de base | Défaut |
| **2 — Initié** | Créatures T2 (cerf, faucon, loup juvénile). 3 commandes simples. Premier cycle complet | Usage : 5 dressages T1 |
| **3 — Adepte** | Créatures T3 (cheval de cavalerie, ours brun, panthère). 5 commandes + monture combat | Usage : 15 dressages + 1 commande noble |
| **4 — Expert** | Créatures T4 Magistral (créatures Bestiaire rares, montures de prestige, faucons sacrés). 7-10 commandes. Co-combat | Usage : 30 dressages + 1 signature reconnue |
| **5 — Maître** 🔒 | Créatures T5 Légendaires (dragons mineurs, montures cosmiques, créatures cosmiques). T6 Mythique sur quête. **Pacte cosmique** (frontière [[Le Lien]]) | **Condition cachée** : ex. dresser un descendant d'Éternel, créer un compagnon-pacte qui survit au [[Le Souffle|Souffle]] sans rouille, fonder une école de cavalerie |

---

## 6. Crafts / recettes débloqués

> Le "craft" du Dresseur est un **processus temporel** (pas un assemblage matériel). On parlera de **cycles de dressage** plutôt que de recettes.

### Cycles de dressage par tier

| Tier | Créature type | Durée cycle | Mini-jeu | Commandes débloquées |
|------|---------------|--------------|----------|------------------------|
| 1 | Chien commun, mouton, oiseau | 1 jour réel (8h gameplay) | 3 jauges (confiance + obéissance + santé) | Suivre, attendre |
| 2 | Cheval, faucon, loup | 3 jours réels (cycles répétés) | 4 jauges + signature comportementale | + Charger, monter, attaquer cible |
| 3 | Ours, panthère, monture cavalerie | 7 jours réels | 5 jauges + canalisation Présence | + Couvert, éclair, défense, patrouille |
| 4 | Créatures Bestiaire rares | 14 jours réels | 6 jauges + co-craft sellier | + Co-combat, signaux complexes |
| 5 | Créatures cosmiques, dragons mineurs | 30 jours réels | Quête + canalisation [[Le Lien]] | Pacte cosmique + commandes uniques |

### Pattern canonique dressage

> Tier N requiert : **N×2 friandises** + **station T-1** + **cycle de N×2-N×7 jours réels** + **N réussites consécutives au mini-jeu** + **Mastery requis**.

> Échec mini-jeu : régression (créature redevient sauvage en partie), recommencer 1 cycle.

### Affixes signature compagnon (10)

1. **Lien indéfectible** — créature résiste à la séparation (ne fuit jamais)
2. **Compagnon de combat** — co-attaque automatique en combat
3. **Pacte cosmique** *(palier Maître)* — survit au [[Le Souffle|Souffle]] sans rouille
4. **Voix de son maître** — répond uniquement au dresseur signataire
5. **Nourricier** — la créature trouve sa propre nourriture (autonomie)
6. **Endurance de la steppe** — distance voyage +50%
7. **Yeux de chasseur** — détection +20% pour le maître
8. **Pas de fantôme** — création silencieuse en montant
9. **Doré** ([[Les Ères|Rêve Lumineux]]) — créature brille faiblement
10. **Spectral** ([[Les Ères|Échos Brisés]]) — créature peut traverser brièvement les obstacles

---

## 7. Carrière et débouchés

```
[Apprivoiseur] → [Dresseur de cavalerie] → [Dresseur de cour] → [Dresseur-Maître] → [Dresseur-Légende des Bêtes Cosmiques]
```

### Spécialisations

- **Apprivoiseur sauvage** — captures terrain ([[Métiers|Chasseur]] partenariat)
- **Dresseur de cavalerie** — montures de combat ([[Factions]])
- **Maître-faucon** — oiseaux de chasse, signal et observation
- **Dresseur de meute** — chiens (chasse, garde)
- **Pactiseur cosmique** — créatures rares, frontière [[Le Lien]]

### Débouchés

- **Vente créature dressée** : marge énorme (créature sauvage 100 Éclats → dressée 1000+ Éclats)
- **Cavalerie de faction** ([[Factions]]) — contrat fixe
- **Compagnon de noble** — exotique, prestige (10 000+ Éclats)
- **Dresseur de [[Guildes|guilde]]** — montures collectives

### Métiers complémentaires

- **[[Métiers|Éleveur de créature]]** (M1) — fournisseur juvéniles
- **[[Métiers|Chasseur]]** — fournisseur captures sauvages
- **[[Métiers|Berger]]** — animaux d'élevage standards
- **[[Cordonnier]]** §Sellier — selles, harnais
- **[[Apothicaire]]** — apaisants, soins créature

---

## 8. Modulation par contexte

### Par ère ([[Les Ères]])

| Ère | Effet |
|-----|-------|
| **Verdoiement** (Terranu) | Créatures dociles, +20% taux apprivoisement |
| **Brume Mortelle** (Umbra) | Créatures hostiles, dressage difficile mais variants Pourpres possibles |
| **Sommeil Onirique** (Somnix) | Créatures oniriques apprivoisables (variants Onirique) |
| **Présages** (Fatum) | Créatures-augures rares apparaissent |
| **Échos Brisés** (Tempora) | Créatures Spectrales rares (compagnons translucides) |

### Par contexte

- **Saison de chasse** — afflux captures
- **Faction militaire** — commande cavalerie en série
- **Religion** ([[Lore/Religions/Foedus Animae]]) : faucons sacrés Onara, [[Lore/Religions/Vael Kurash]] : esprits-animaux

---

## 9. Économie

### Ratios canoniques

| Palier | Coût intrants | Vente créature dressée | Marge | Volume |
|--------|----------------|-----------------------------|-------|--------|
| Novice | 5-30 Éclats | 50-100 | ~60% | 1 / jour |
| Adepte | 200-1000 | 1000-5000 | ~75% | 1 / 3 jours |
| Expert | 2000-10 000 | 20 000-100 000 | ~80% | 1 / 2 semaines |
| Maître | 50 000+ | 500 000+ | ~90% | 1 / mois |

### Gold sinks contribués

- **Compagnon de prestige** ([[Économie]] §Cat. 5) — créature exotique haut de gamme
- **Cavalerie militaire** (faction) — gros sinks groupés
- **Selle / Harnais** (co-craft Cordonnier-Sellier) — partage marges

---

## 10. Comportement IA + signatures PNJ

### Routine Dresseur PNJ (Phase 2)

```
[Lever 06:00] → [Soin matinal créatures (chenil/écurie)]
              → [09:00-13:00 : sessions de dressage individuelles]
              → [Mi-journée : présentation aux clients (Mode Marchand sur enclos)]
              → [Après-midi : sessions terrain ou cavalerie]
              → [Soir : nourrissage, repos]
              → [Coucher 22:00]
```

### Signatures PNJ (Phase 4)

- **Maître Erwan le Sifflet d'Or de Galenor** — cavalerie impériale
- **Vrana la Meute d'Alkaran** — chiens de meute nordiques
- **Padre Iliom d'Onara** — faucons sacrés Foedus Animae
- **Sigrid l'Aigle de Skaldoria** — rapaces nordiques
- **Maître Théron le Pactiseur** *(Maître-Légende, créatures cosmiques)* — frontière [[Le Lien]]

---

## 11. Décisions ouvertes

- [ ] **Frontière Dresseur / Éleveur / Berger / Vétérinaire** : 4 métiers distincts. Proposition canonique : **Éleveur** (reproduction), **Dresseur** (apprivoisement+entraînement), **Berger** (élevage de masse simple), **Vétérinaire** (soins) — tous complémentaires, pas concurrents
- [ ] **Dresseur (Exploration) vs Dresseur de créature (Artisanat)** : même métier ? Proposition : **OUI**, fusion via cet archétype. Le Dresseur capture en terrain (Exploration) puis dresse en atelier (Artisanat)
- [ ] **Pacte cosmique** : frontière avec [[Le Lien]] et [[Mage]] — apprivoiser une créature cosmique est-il un dressage ou un pacte magique ? Proposition : pacte = canalisation Voie + dressage = tisser un lien comportemental. Les deux peuvent coexister (créature pactée + dressée).
- [ ] **Créatures non-dressables** : certaines créatures sont absolument sauvages (Éternels, monstres légendaires). Proposition : T6 Mythique sur quête narrative seulement, jamais dressage automatique
- [ ] **Mort de la créature dressée** : que se passe-t-il ? Proposition : Renom créature inscrit dans héritage du joueur ; créature peut être ressuscitée par Voie de Navigor (rare)
- [ ] **Cycles temps réel** : 1-30 jours réels — à playtester (peut-être trop long pour T5)
- [ ] **Compagnon en combat** : limite à 1 compagnon par joueur ? Proposition : oui (sauf Maître = 2 compagnons)

---

*Liens : [[Métiers]] · [[Bestiaire - Index]] · [[Exploration]] · [[Combat]] · [[Crafts]] · [[Personnage]] · [[Sources de Ressources]] · [[Le Lien]] · [[Économie]] · [[Les Ères]] · [[Cordonnier]] · [[Lore/Religions/Foedus Animae]]*
