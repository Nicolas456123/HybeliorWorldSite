---
tags: [implementation, factions, reputation, social, balance, lore]
status: drafted
last_review: 2026-05-07
needs_review_for: [paliers-reputation-playtest, balance-gains-pertes, exclusivites-cosmetiques, balance-guerres]
type: implementation
canonical_concept: "[[Factions]]"
---

# Faction System — Implémentation

> Page d'implémentation technique du concept narratif **[[Factions]]**.
> Cette page contient les **chiffres, formules, paliers, balance et specs Unreal**.
> Pour la philosophie, l'intention de design et la voix in-world : voir [[Factions]].

---

## Définition canonique d'une Faction

Une **Faction** est une organisation prédéfinie par le lore (NPC-driven), avec laquelle le joueur entretient une relation chiffrée appelée **Reconnaissance** (`FactionRep`). Elle est distincte d'une **Guilde** (player-driven, voir [[Guildes]]).

| Propriété | Valeur |
|---|---|
| Type d'organisation | Scriptée, lore-defined |
| Identifiant interne | `FactionID` (FName) |
| Stat principale | `FactionRep` (Int32, [-10000, +10000]) |
| Stockage | Persistant par PlayerCharacter (table `PlayerFactionRep`) |
| Visibilité | Privée (interne à la faction) — distincte du Renom (public) |
| Replication | OwnerOnly |

---

## Liste exhaustive des Factions canoniques

### Religieuses (9 majeures + 6 mineures)

| FactionID | Nom | Type | Continents d'ancrage | Voie associée | Statut |
|---|---|---|---|---|---|
| `Faction.Religion.OrdoCaelum` | Ordo Caelum | Religieuse majeure | Galenor (Seraphia), Celethor (Astravia) | Lumen | Légale partout |
| `Faction.Religion.VaelKurash` | Vael'Kurash | Religieuse majeure | Cendara, Onara | Mortis | Légale (toléré ailleurs) |
| `Faction.Religion.IgnisAeternum` | Ignis Aeternum | Religieuse majeure | Cendara (Pyrevane), Ilthara (Pyrtara) | Ignis | Légale |
| `Faction.Religion.Noctari` | Noctari | Religieuse majeure | Nysaria (Lunasar), Cestra | Umbra | Suspecte / interdite localement |
| `Faction.Religion.RotaMundi` | Rota Mundi | Religieuse majeure | Evertia, Endora | Tempora | Légale |
| `Faction.Religion.ViaVentus` | Via Ventus | Religieuse majeure | Onara, Galenor (Ventera) | Aer | Légale |
| `Faction.Religion.LexPetra` | Lex Petra | Religieuse majeure | Alkaran (Ferrath, Torkam) | Terra | Officielle (orthodoxe) |
| `Faction.Religion.SomniumVigil` | Somnium Vigil | Religieuse majeure | Azoria (Caeloria), Ilthara | Onirae | Marginale |
| `Faction.Religion.FoedusAnimae` | Foedus Animae | Religieuse majeure | Galenor (Lumasar), Ulinor | Animae | Légale |
| `Faction.Religion.FiliiFornacis` | Filii Fornacis | Religieuse mineure | Alkaran | (schisme Ignis/Lex Petra) | Sectaire |
| `Faction.Religion.AquaNigra` | Aqua Nigra | Religieuse mineure | Nysaria, côtes Cestra | Aqua/Umbra | Hérétique |
| `Faction.Religion.CantusMundi` | Cantus Mundi | Religieuse mineure | Evertia (Sylvara) | Animae | Légale |
| `Faction.Religion.Taciti` | Taciti | Religieuse mineure | Ulinor, monastères isolés | (silencieux) | Cryptique |
| `Faction.Religion.CatenaFracta` | Catena Fracta | Religieuse mineure (antagoniste) | Présent partout, base Cendara/Ulinor | (refus du Lien) | **Hors-la-loi** |

### Politiques (royaumes & nations majeurs)

| FactionID | Nom | Continent | Régime | Diplomatie de départ |
|---|---|---|---|---|
| `Faction.Pol.Seraphia` | Royaume de Seraphia | Galenor | Théocratie héliaque | Allié Ordo Caelum |
| `Faction.Pol.Lumasar` | Lumasar | Galenor | Monarchie marchande | Neutre |
| `Faction.Pol.Solena` | Solena | Galenor | République agraire | Neutre |
| `Faction.Pol.Trinoria` | Trinoria | Galenor | Confédération | Allié Marchands Galenor |
| `Faction.Pol.Valoria` | Valoria | Galenor | Monarchie militaire | Hostile Kharazir |
| `Faction.Pol.Kharazir` | Kharazir | Galenor | Théocratie noire | Hostile Seraphia |
| `Faction.Pol.Ventera` | Ventera | Galenor | Cité-état nomade | Allié Via Ventus |
| `Faction.Pol.Ferrath` | Ferrath | Alkaran | Théocratie minérale | Allié Lex Petra |
| `Faction.Pol.Torkam` | Torkam | Alkaran | Empire forgeron | Allié Lex Petra |
| `Faction.Pol.Iskara` | Iskara | Alkaran | Khanat | Neutre |
| `Faction.Pol.Altram` | Altram | Alkaran | Cité-citadelle | Neutre |
| `Faction.Pol.Caeloria` | Caeloria | Azoria | Sénat aérien | Allié Somnium Vigil |
| `Faction.Pol.Azoral` | Azoral | Azoria | République céleste | Neutre |
| `Faction.Pol.Solmaris` | Solmaris | Azoria | Thalassocratie | Neutre |
| `Faction.Pol.Kethvar` | Kethvar | Azoria | Tribu confédérée | Neutre |
| `Faction.Pol.Baelor` | Baelor | Baelor | Cité unique | Isolationniste |
| `Faction.Pol.Astravia` | Astravia | Celethor | Empire stellaire | Allié Ordo Caelum |
| `Faction.Pol.Ryldor` | Ryldor | Celethor | Royaume forestier | Neutre |
| `Faction.Pol.Elarian` | Elarian | Celethor | Magocratie | Neutre |
| `Faction.Pol.Cendara` | Cendara | Cendara | Théocratie funéraire | Allié Vael'Kurash |
| `Faction.Pol.Pyrevane` | Pyrevane | Cendara | Royaume volcanique | Allié Ignis Aeternum |
| `Faction.Pol.Arkhen` | Arkhen | Cendara | Royaume frontière | Neutre |
| `Faction.Pol.Noravia` | Noravia | Cestra | Royaume des neiges | Hostile Noctari |
| `Faction.Pol.Avalor` | Avalor | Endora | Royaume insulaire | Neutre |
| `Faction.Pol.Haldria` | Haldria | Endora | République | Neutre |
| `Faction.Pol.Sanvara` | Sanvara | Endora | Théocratie cyclique | Allié Rota Mundi |
| `Faction.Pol.Evertia` | Evertia | Evertia | Druidocratie | Allié Cantus Mundi |
| `Faction.Pol.Sylvara` | Sylvara | Evertia | Cité-forêt | Neutre |
| `Faction.Pol.Thalmaris` | Thalmaris | Evertia | Cité lacustre | Neutre |
| `Faction.Pol.Drakora` | Drakora | Ilthara | Royaume martial | Hostile à beaucoup |
| `Faction.Pol.Pyrtara` | Pyrtara | Ilthara | Royaume du feu | Allié Ignis Aeternum |
| `Faction.Pol.Sylthara` | Sylthara | Ilthara | Royaume jungle | Neutre |
| `Faction.Pol.Vytharia` | Vytharia | Ilthara | Royaume sorcier | Suspecte |
| `Faction.Pol.Warenthor` | Warenthor | Ilthara | Royaume guerrier | Neutre |
| `Faction.Pol.Gryndor` | Gryndor | Ilthara | Khanat sauvage | Neutre |
| `Faction.Pol.Ackerna` | Ackerna | Ilthara | Cité libre | Neutre |
| `Faction.Pol.Lythar` | Lythar | Ilthara | Royaume marchand | Allié Marchands Ilthara |
| `Faction.Pol.Lunasar` | Lunasar | Nysaria | Monarchie lunaire | Allié Noctari (officieux) |
| `Faction.Pol.Mirathi` | Mirathi | Nysaria | République des Voiles | Neutre |
| `Faction.Pol.Nysaria` | Nysaria | Nysaria | Empire ancien | Neutre |
| `Faction.Pol.Mosrack` | Mosrack | Onara | Cité-marteau | Allié Lex Petra |
| `Faction.Pol.Elarath` | Elarath | Onara | Cité druidique | Neutre |
| `Faction.Pol.Tyndara` | Tyndara | Onara | Royaume de la steppe | Neutre |
| `Faction.Pol.Myrtam` | Myrtam | Onara | Cité-oasis | Neutre |
| `Faction.Pol.Ulinor` | Ulinor | Ulinor | Empire glaciaire | Neutre |
| `Faction.Pol.Skaldoria` | Skaldoria | Ulinor | Confédération clanique | Neutre |
| `Faction.Pol.Dhalvoria` | Dhalvoria | Ulinor | Royaume sombre | Suspecte |

### Commerciales (guildes marchandes inter-nationales)

| FactionID | Nom | Champ | Bases principales |
|---|---|---|---|
| `Faction.Com.GalenorTraders` | Compagnie de Galenor | Routes maritimes Galenor↔Alkaran | Lumasar, Trinoria |
| `Faction.Com.AlkaranForgers` | Hanse des Forges | Métaux, armes | Torkam, Mosrack |
| `Faction.Com.AzoriaSails` | Voiles d'Azoria | Routes aériennes | Caeloria, Solmaris |
| `Faction.Com.CelethorScribes` | Scribes de Celethor | Savoirs, livres, prédictions | Astravia, Elarian |
| `Faction.Com.IltharaCaravans` | Caravanes d'Ilthara | Routes terrestres internes | Lythar, Ackerna |
| `Faction.Com.UlinorIce` | Marché de Glace | Fourrures, ambre, esclaves passés | Skaldoria |

### Antagonistes & marginales

| FactionID | Nom | Nature | Cible PvE/PvP |
|---|---|---|---|
| `Faction.Ant.CatenaFracta` | Catena Fracta | Mouvement Délié, sevrage du Lien | PvE (et PvP par bascule) |
| `Faction.Ant.CorbeauxPourpres` | Corbeaux Pourpres | Mercenaires sans-foi | PvE |
| `Faction.Ant.OrdrePale` | Ordre Pâle | Nécromanciens prohibés | PvE |
| `Faction.Ant.MaraudeursDhalvoriens` | Maraudeurs Dhalvoriens | Pillards de la nuit | PvE |

**Total** : ~70 factions canoniques (15 religieuses, 47 politiques, 6 commerciales, 4 antagonistes).

---

## Échelle de Reconnaissance — paliers canoniques

Plage : `[-10000, +10000]`. Sept paliers positifs, sept négatifs, plus le neutre.

| Palier | Plage | Nom in-world | Effets clés |
|---|---|---|---|
| +7 | `[+9000, +10000]` | **Pilier** | Accès intégral, conseil, événements scriptés, titre exclusif |
| +6 | `[+7000, +8999]` | **Champion** | Quêtes de chapitre, tenue de prestige, mount unique |
| +5 | `[+5000, +6999]` | **Confident** | Donjons réservés, accès aux secrets, tarifs marchands -20% |
| +4 | `[+3500, +4999]` | **Allié** | Quêtes alliées, accès aux quartiers privés, réductions -10% |
| +3 | `[+2000, +3499]` | **Estimé** | Quêtes répétables avancées, accès quartiers généraux |
| +2 | `[+1000, +1999]` | **Reconnu** | Quêtes journalières, salutations PNJ, accès marchands faction |
| +1 | `[+200, +999]` | **Toléré** | Présence acceptée, quêtes d'introduction |
| 0 | `[-199, +199]` | **Inconnu** | Comportement neutre PNJ |
| -1 | `[-999, -200]` | **Suspect** | Surveillance, prix +10%, certains PNJ refusent dialogue |
| -2 | `[-1999, -1000]` | **Indésirable** | Marchands refusent, gardes méfiants |
| -3 | `[-3499, -2000]` | **Banni** | Accès aux villes refusé, quêtes alliés perdues |
| -4 | `[-4999, -3500]` | **Pourchassé** | Patrouilles PNJ ennemies, primes mineures |
| -5 | `[-6999, -5000]` | **Ennemi** | Primes sur la tête, agressions à vue dans territoires faction |
| -6 | `[-8999, -7000]` | **Banni Mortel** | Assassins faction, quêtes spéciales contre joueur |
| -7 | `[-10000, -9000]` | **Némésis** | Boss-events centrés sur la chasse au joueur |

**Démarrage** : tout joueur démarre à `0` sur toutes les factions sauf `+200` (Toléré bas) sur la faction de son continent natal et de sa religion choisie à la création (si Lié).

---

## Gains et pertes par action

### Gains (positifs)

| Action | Δ Reconnaissance | Notes |
|---|---|---|
| Quête d'introduction réussie | `+50` à `+150` | Une fois |
| Quête répétable journalière | `+25` à `+75` | Cap journalier `+300` par faction |
| Quête de chapitre | `+250` à `+800` | Une fois |
| World event lié à la faction | `+100` à `+400` | Selon participation |
| Boss-faction tué (raid) | `+500` | Cooldown hebdo |
| Don d'objet de prestige (token) | `+200` par token | Cap mensuel `+1000` |
| Délivrance d'un membre de la faction (PvE) | `+50` à `+150` | |
| Victoire en Guerre de Faction (campagne) | `+1500` à `+5000` | Une fois par campagne |
| Découverte de lieu sacré (faction religieuse) | `+300` | Une fois |
| Compléter un Pèlerinage | `+1000` | Une fois par pèlerinage |
| Conditions cachées (lore profond) | `+500` à `+2000` | One-shot |

### Pertes (négatifs)

| Action | Δ Reconnaissance | Notes |
|---|---|---|
| Tuer un PNJ neutre de la faction | `-50` à `-200` | Selon importance |
| Tuer un PNJ nommé / officier | `-500` à `-1500` | |
| Tuer un dignitaire | `-3000` | Souvent quête politique |
| Vol détecté dans territoire faction | `-100` à `-300` | |
| Profanation lieu sacré (faction religieuse) | `-1000` | |
| Échec critique de quête (trahison) | `-500` à `-2000` | |
| Action en faveur d'une faction ennemie déclarée | `-50` à `-300` | Voir matrice diplomatique |
| Engagement officiel dans Guerre de Faction (côté ennemi) | `-2000` | Au déclenchement |
| Hérésie ouverte (faction religieuse, voie opposée) | `-200` par acte rituel | |
| Pacte avec Catena Fracta (Délié) | `-5000` toutes factions sauf CF | One-shot |

### Décrochage temporel

Pas de décay automatique de la Reconnaissance positive (ce qui est gagné reste). En revanche :
- **Reconnaissance négative** décroît de `+25/jour` vers 0 si aucune action hostile pendant 14 jours.
- **Reconnaissance positive** ne décroît pas, mais peut être brutalement effacée par actions de trahison (formule `delta = -current * 0.5` minimum sur trahison majeure).

---

## Matrice diplomatique — ennemis / alliés

Liens canoniques pré-écrits (extrait, non exhaustif). Modifiable par l'État du Monde et les Souffles.

### Religieuses

| Faction A | Allié | Ennemi |
|---|---|---|
| Ordo Caelum | Foedus Animae, Rota Mundi | Noctari, Catena Fracta |
| Vael'Kurash | Foedus Animae | Ignis Aeternum (rivalité ancienne) |
| Ignis Aeternum | Lex Petra (orthodoxe) | Noctari, Aqua Nigra |
| Noctari | Aqua Nigra | Ordo Caelum, Ignis Aeternum |
| Rota Mundi | Cantus Mundi, Via Ventus | Lex Petra (figisme) |
| Via Ventus | Rota Mundi | Lex Petra |
| Lex Petra | Ignis Aeternum, Filii Fornacis | Rota Mundi, Via Ventus |
| Somnium Vigil | Foedus Animae | Lex Petra (rejet du rêve) |
| Foedus Animae | Ordo Caelum, Vael'Kurash | Catena Fracta |
| Catena Fracta | (aucune) | **toutes les autres** |

### Politiques (extraits clés)

| Couple | Statut |
|---|---|
| Seraphia ↔ Kharazir | Guerre froide héréditaire (lumière vs ombre) |
| Valoria ↔ Kharazir | Guerre ouverte récurrente |
| Pyrevane ↔ Cendara | Tension religieuse (feu vs morts) |
| Torkam ↔ Ferrath | Rivalité orthodoxe Lex Petra (deux capitales) |
| Mosrack ↔ Elarath | Tension Lex Petra ↔ druides |
| Drakora ↔ tous voisins ilthariens | Hostile par défaut |
| Lunasar ↔ Noravia | Conflit confessionnel (Noctari) |
| Caeloria ↔ Solmaris | Rivalité commerciale aérienne |

### Cross-faction Religion ↔ Politique

```
Si Religion R alliée à Politique P :
  Δ Reconnaissance(R) = +X  →  Δ Reconnaissance(P) = +X * 0.3
  Δ Reconnaissance(R) = -X  →  Δ Reconnaissance(P) = -X * 0.3

Si Religion R ennemie à Politique P :
  Δ Reconnaissance(R) = +X  →  Δ Reconnaissance(P) = -X * 0.2
```

---

## Exclusivités — contenu réservé

### Cosmétiques & équipement

| Faction | Tier | Item / Cosmétique | Palier requis |
|---|---|---|---|
| Ordo Caelum | Légendaire | Tabard de la Lumière | Champion (+6) |
| Ordo Caelum | Magistral | Mount Pégase Solaire | Pilier (+7) |
| Vael'Kurash | Légendaire | Masque des Ancêtres | Champion (+6) |
| Ignis Aeternum | Légendaire | Cape de Braises | Champion (+6) |
| Noctari | Légendaire | Lame de Voile | Confident (+5) |
| Lex Petra | Magistral | Marteau de Pierre Vraie | Pilier (+7) |
| Catena Fracta | Cosmétique unique | Chaîne Brisée (visible) | Pilier (+7) |
| Compagnie de Galenor | Légendaire | Boussole d'Or | Confident (+5) |

### Zones & donjons réservés

| Zone | Faction | Palier requis |
|---|---|---|
| Sanctuaire de Caelum (Seraphia) | Ordo Caelum | Allié (+4) |
| Catacombes de Cendara (profondeurs) | Vael'Kurash | Confident (+5) |
| Forge Première (Torkam) | Lex Petra (orthodoxe) | Champion (+6) |
| Voile de Lunasar (donjon nuit) | Noctari | Confident (+5) |
| Ombre de Catena (sites Délié) | Catena Fracta | Champion (+6) |
| Quartiers Marchands (chaque cité) | Faction commerciale locale | Estimé (+3) |

### Quêtes de chapitre

Chaque faction majeure dispose d'un arc de **7 chapitres** (`Faction.Quest.Chapter.01` à `.07`), un par palier positif. Le chapitre 7 (Pilier) débloque un **titre permanent** transmis à travers les Souffles.

### Maîtrises de Foi

```
Si Faction de type Religieuse + palier ≥ Confident (+5) :
  Déblocage Maîtrise_Foi_<NomReligion>
  Voir [[Le Lien]] et [[Prédiction]] pour effets
```

---

## Balance économique des récompenses

| Source | Éclats | XP | Tokens Faction | Notes |
|---|---|---|---|---|
| Quête journalière (palier +2) | 50-150 | base | 1-3 tokens | Cap journalier 5 quêtes |
| Quête de chapitre | 500-3000 | grand | 10-25 tokens | One-shot |
| Boss-faction (hebdo) | 2000-8000 | grand | 30-50 tokens | Cooldown 7j |
| Guerre de Faction (campagne complète) | 10000-30000 | énorme | 100-300 tokens | + items uniques |
| Pèlerinage | 1500-5000 | moyen | 20-40 tokens | One-shot |

**Tokens Faction** : monnaie spécifique convertible chez le marchand de la faction. Ratios indicatifs :
- Cosmétique mineur : 50 tokens
- Pièce d'équipement Légendaire : 500-1500 tokens
- Mount unique : 3000 tokens
- Item Magistral (Pilier) : 5000-10000 tokens

**Gating** : un objet de palier `+N` requiert palier `+N` ET le coût en tokens. L'argent (Éclats) ne suffit jamais à contourner la Reconnaissance.

---

## Conditions de bascule (changement de faction)

### Bascule positive (rejoindre)

```
Pré-requis :
  - Reconnaissance ≥ +200 (Toléré) sur la faction cible
  - Pas de pacte actif avec faction ennemie déclarée
  - Quête d'allégeance complétée

Effet :
  - Statut "Aligné" sur la faction
  - +500 Reconnaissance bonus
  - Accès aux insignes faction
```

Un joueur peut être **Aligné** à plusieurs factions simultanément SAUF :
- Pas plus d'**une** faction religieuse majeure (alignement religieux exclusif)
- Pas plus d'**une** faction politique d'alignement (vassalité exclusive)
- Les factions commerciales sont cumulables
- Catena Fracta est **exclusive de toutes les autres**

### Bascule négative (défection / trahison)

```
Quitter une faction Aligné :
  - Pénalité brutale : Reconnaissance × 0.3 (perd 70% acquis)
  - Cooldown 30 jours réels avant ré-alignement
  - Quête de défection peut être proposée (alléger pénalité)
  - Faction ennemie de l'ancienne reçoit +1000 Reconnaissance bonus
```

### Bascule extrême (Délié)

```
Pacte Catena Fracta :
  - Toutes Reconnaissances religieuses → -5000 minimum
  - Toutes Reconnaissances politiques → -1500 minimum (sauf Dhalvoria, Cendara)
  - Toutes Reconnaissances commerciales → -1000
  - Catena Fracta → +5000 (Confident immédiat)
  - Marqueur permanent "Délié" (non-réversible sans event Cardinal)
  - Voir [[Le Lien]] §Déliés
```

---

## Guerres de Factions — système

| Phase | Durée | Effets |
|---|---|---|
| **Tension** | 2-4 semaines | World events, escarmouches, quêtes diplomatiques |
| **Déclaration** | Instant | Bascule diplomatique, accès au PvP de faction |
| **Campagne active** | 4-8 semaines | Zones contestées, batailles planifiées, sièges |
| **Résolution** | 1 semaine | Récompenses, traités, paliers de victoire |

**Récompenses de campagne** :

| Niveau de participation | Reconnaissance | Tokens spéciaux | Items |
|---|---|---|---|
| Participation minimale (1 bataille) | +500 | 20 tokens campagne | Cosmétique de campagne |
| Vétéran (10 batailles) | +2000 | 100 tokens | Tabard daté |
| Héros (25 batailles + boss-event) | +5000 | 300 tokens | Item Magistral campagne |
| MVP campagne (top 0,1%) | +8000 | 1000 tokens | Item unique nominatif (Œuvre signée, voir [[Le Souffle]]) |

**Comptage** : `BattleParticipation.Count` incrémenté côté serveur sur engagement réel (≥30s combat actif dans zone marquée).

---

## Cross-link Souffle / Ères

Les Souffles **modulent** les rapports de force entre factions selon la dominante de l'Ère. Voir [[Le Souffle]] et [[Souffle System]].

### Modulation par dominante d'Ère

| Dominante d'Ère | Factions amplifiées | Factions affaiblies |
|---|---|---|
| Lumen | Ordo Caelum, Seraphia, Astravia | Noctari, Lunasar |
| Umbra | Noctari, Aqua Nigra, Lunasar | Ordo Caelum |
| Ignis | Ignis Aeternum, Pyrevane, Pyrtara | Aqua Nigra |
| Aqua | Aqua Nigra, Solmaris | Ignis Aeternum, Pyrtara |
| Terra | Lex Petra, Torkam, Ferrath, Mosrack | Via Ventus, Rota Mundi |
| Aer | Via Ventus, Caeloria, Ventera | Lex Petra |
| Mortis | Vael'Kurash, Cendara | (neutre) |
| Animae | Foedus Animae, Cantus Mundi, Evertia | Catena Fracta |
| Tempora | Rota Mundi, Sanvara | Lex Petra |
| Onirae | Somnium Vigil, Caeloria | Lex Petra |

### Effets gameplay

```
Faction amplifiée (Ère N) :
  - Gain de Reconnaissance × 1.25
  - Récompenses cosmétiques temporaires "saisonnières"
  - World events propres déclenchés
  - PvE faction ennemie -10% efficacité

Faction affaiblie (Ère N) :
  - Gain de Reconnaissance × 0.85
  - Quelques quêtes désactivées (renvoyées Ère suivante)
```

### Souffle Cardinal et factions

Un Souffle Cardinal peut **dissoudre, fusionner ou créer** une faction (event scripté). Cas modélisés :
- Catena Fracta peut être éradiquée pendant un Cardinal de Lumen extrême
- Filii Fornacis pourrait obtenir reconnaissance officielle
- Une nation politique peut tomber (statut `Dissolved`, Reconnaissance gelée)

Voir [[Le Souffle]] §Souffle Cardinal.

---

## Cross-link Religions

Les **9 religions majeures + 6 mineures** sont chacune une faction. Voir :
- [[Cosmologie]] pour la théologie
- [[Le Lien]] pour la mécanique magique de Voie
- [[Lore/Religions/]] pour les fiches canoniques détaillées

**Règle exclusivité religieuse** :
```
Aligned.ReligionMajor.Count ≤ 1
```
Un joueur ne peut être **Aligné** qu'à **une seule** religion majeure. Il peut conserver des Reconnaissances positives sur d'autres (jusqu'à Allié +4) sans conflit, mais le statut "Aligné" exige le choix.

**Maîtrise_Foi_<Religion>** débloquée à Confident (+5) — voir [[Prédiction]] §Foi religieuse.

---

## Cross-link Continents

Les **factions politiques** sont enracinées dans des continents — voir [[Continents/Index]] et fiches `02 - Monde/Continents/`.

| Continent | Factions politiques principales | Religions dominantes |
|---|---|---|
| Galenor | Seraphia, Lumasar, Solena, Trinoria, Valoria, Kharazir, Ventera | Ordo Caelum, Foedus Animae, Via Ventus |
| Alkaran | Ferrath, Torkam, Iskara, Altram | Lex Petra, Filii Fornacis |
| Azoria | Caeloria, Azoral, Solmaris, Kethvar | Somnium Vigil |
| Baelor | Baelor (unique) | (syncrétisme isolé) |
| Celethor | Astravia, Ryldor, Elarian | Ordo Caelum (Astravia) |
| Cendara | Cendara, Pyrevane, Arkhen | Vael'Kurash, Ignis Aeternum |
| Cestra | Noravia | Noctari (clandestin) |
| Endora | Avalor, Haldria, Sanvara | Rota Mundi |
| Evertia | Evertia, Sylvara, Thalmaris | Cantus Mundi, Rota Mundi |
| Ilthara | Drakora, Pyrtara, Sylthara, Vytharia, Warenthor, Gryndor, Ackerna, Lythar | Ignis Aeternum, Somnium Vigil |
| Nysaria | Lunasar, Mirathi, Nysaria | Noctari, Aqua Nigra |
| Onara | Mosrack, Elarath, Tyndara, Myrtam | Via Ventus, Lex Petra |
| Ulinor | Ulinor, Skaldoria, Dhalvoria | Foedus Animae, Taciti |

**Bonus de naissance** : un personnage créé sur un continent commence à `+200` Reconnaissance avec sa nation natale et `+100` avec une religion locale (au choix à la création si Lié).

---

## Stockage & API

### Tables SQL (OWS)

```sql
PlayerFactionRep (
  PlayerCharacterId  UUID,
  FactionId          NVARCHAR(64),
  Reputation         INT,         -- [-10000, +10000]
  AlignedFlag        BIT,
  LastChangeUtc      DATETIME2,
  PRIMARY KEY (PlayerCharacterId, FactionId)
)

FactionDiplomacy (
  FactionA           NVARCHAR(64),
  FactionB           NVARCHAR(64),
  Status             NVARCHAR(16), -- 'Allied' | 'Friendly' | 'Neutral' | 'Hostile' | 'AtWar'
  ModifierFromEra    NVARCHAR(64),  -- override actif en cours
  PRIMARY KEY (FactionA, FactionB)
)

FactionWar (
  WarId              UUID,
  FactionA           NVARCHAR(64),
  FactionB           NVARCHAR(64),
  Phase              NVARCHAR(16),  -- 'Tension' | 'Active' | 'Resolution'
  StartUtc           DATETIME2,
  EndUtc             DATETIME2 NULL
)
```

### API Component (UE5)

```cpp
UFactionComponent : public UActorComponent
  - GetReputation(FName FactionId) -> int32
  - ModifyReputation(FName FactionId, int32 Delta, EReason Reason)
  - SetAligned(FName FactionId, bool bAligned)
  - GetTier(FName FactionId) -> EFactionTier  // -7 .. +7
  - CanAccessContent(FName ContentId) -> bool
  - OnReputationChanged (delegate, replicated)
  - OnTierChanged       (delegate, replicated)
```

Replication : `OwnerOnly`. Diplomatie globale stockée serveur, diffusée via `FactionDiplomacyService`.

---

## Dépendances système

| Composant | Rôle |
|---|---|
| [[OWS Architecture]] | Persistance multi-shard FactionRep |
| [[Global Data Service]] | Sync diplomatie globale et état des Guerres |
| [[Quest System]] | Quêtes faction-tagged, gains/pertes |
| [[HW Progression Component]] | Hook gains via complétion de quête |
| [[Migration Accord]] | Migration legacy Reputation → FactionRep canonique |
| [[Souffle System]] | Modulation par Ère, événements Cardinaux |
| [[PvP]] | Guerres de Factions, primes, kill-on-sight |
| [[Guildes]] | Bras armés, alliances inter-guildes selon faction |

---

## Points de calibrage à playtester

- [ ] Plage `[-10000, +10000]` et 14 paliers — granularité ressentie suffisante ?
- [ ] Cap journalier `+300` quêtes répétables — trop bas ? trop haut ?
- [ ] Pénalité de défection × 0.3 — punitive juste ou trop dure ?
- [ ] Bonus de naissance `+200` continent natal — assez pour orienter sans forcer ?
- [ ] Modulateur Souffle × 1.25 / × 0.85 — ressenti d'amplification d'Ère ?
- [ ] Tokens Faction vs Éclats — économie parallèle saine ?
- [ ] Maîtrise_Foi à Confident (+5) — palier d'accès cohérent ?
- [ ] Catena Fracta exclusivité totale — viable narrativement et statistiquement ?

---

## Décisions actées

- ✅ Plage de Reconnaissance `[-10000, +10000]`, 14 paliers + neutre
- ✅ Pas de decay de Reconnaissance positive (mémoire d'engagement)
- ✅ Decay des négatifs `+25/jour` après 14 jours d'inactivité hostile
- ✅ Exclusivité religieuse stricte (1 seule faction religieuse Aligné)
- ✅ Catena Fracta exclusive de toutes les autres factions
- ✅ Bonus de naissance `+200` nation natale + `+100` religion locale (si Lié)
- ✅ Modulation par dominante d'Ère × 1.25 / × 0.85
- ✅ Maîtrise_Foi débloquée à Confident (+5)
- ✅ Cross-link politique↔religion : 30% de transfert de Reconnaissance
- ✅ Tokens Faction comme monnaie de gating (ne pas convertir depuis Éclats)
- ✅ 7 chapitres par faction majeure, titre permanent au chapitre 7

---

*Liens narratifs : [[Factions]] | [[Guildes]] | [[Cosmologie]] | [[Le Lien]] | [[Univers]]*
*Liens techniques : [[OWS Architecture]] | [[Quest System]] | [[Migration Accord]] | [[Souffle System]] | [[PvP]]*
*Liens monde : [[Continents/Index]] | [[Géographie]] | [[Lore/Religions/]]*
