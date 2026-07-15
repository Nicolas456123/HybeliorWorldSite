---
tags: [métier, archétype, divertissements, verbe, présence]
type: archetype
category: Métier
catégorie_métier: Divertissements
stat_principale: Verbe
stats_secondaires: [Présence, Vivacité, Acuité]
craft_category: "-"
sources_ressources_accessibles: [Bois, Cuir tanné, Tissu, Métal, Os, Corde]
stations_principales: [Place publique, Taverne, Salle de bal, Préau de fête, Atelier de luthier, Cour royale]
outils_principaux: [Luth, Vièle, Flûte, Tambour, Harpe, Cornemuse, Lyre, Diapason, Pupitre]
paliers_maîtrise: [Novice, Initié, Adepte, Expert, Maître]
métiers_complémentaires: [Barde, Acteur, Jongleur, Luthier, Tavernier, Compositeur de sorts]
era_modulation: true
status: drafted
last_review: 2026-05-01
needs_review_for: [calibrage-buffs-musique-playtest]
---

# 🎵 Musicien — Archétype Métier

> *« Une corde tendue est un mensonge. Une corde qui chante est une vérité que tout le monde reconnaît sans pouvoir la dire. »*
> — **Aldira la Pâle**, luthière-musicienne du Conservatoire de Galenor

---

## 1. Vue d'ensemble

Le **Musicien** est le métier de **performance sonore pure**. Là où le [[Barde]] **raconte** par le chant, le Musicien **joue** : il enchaîne mélodies, rythmes, harmonies. Sa stat dominante est **Présence** (charme de scène) couplée au **Verbe** (souffle, intonation, projection vocale si chant). Il est le cœur d'une troupe, l'âme d'une taverne, le tempo d'un mariage.

Hybelior reconnaît trois familles d'instruments : **cordes** (luth, vièle, harpe, lyre), **vents** (flûte, cornemuse), **percussions** (tambour, derbouka). Une [[Voie cosmique|Voie cosmique de la musique]] existe (cf. [[Cantor]] dans [[Cosmologie]]) — certains musiciens hauts paliers développent un Lien.

> [!important] Frontières
> - **Musicien (M4 — Divertissements)** : performance sonore pure. Buffs sociaux, régen [[Labeur]], ambiance.
> - **[[Barde]] (M4 — Divertissements)** : performance narrative + chant + transmission de [[Lore]]. Stat principale **Verbe + Mémoire**.
> - **[[Compositeur de sorts]]** (Mysticisme M5) : musique-magie, sorts encapsulés sonores
> - **[[Luthier]]** : artisan d'instruments (frontière proche, parfois confondu)
>
> Un Barde est presque toujours musicien. Un musicien n'est pas systématiquement barde (il peut jouer sans raconter).

---

## 2. Stats brutes & Maîtrises associées

- **Stat principale** : **Verbe** — souffle (vents), projection (chant), intonation, contrôle vocal
- **Stats secondaires** :
  - **Présence** — charme de scène, capacité à captiver
  - **Vivacité** — précision rythmique, virtuosité instrumentale
  - **Acuité** — oreille musicale, accordage fin
- **Maîtrise contextuelle** : `Maîtrise_Musique` — progresse à chaque représentation publique. Sous-spécialités à partir d'Adepte par instrument : Luth / Vièle / Flûte / Cornemuse / Tambour / Harpe / Voix.

> [!note] Maîtrise par instrument
> Comme pour les armes, la maîtrise est **par instrument**. Un Maître de luth n'est pas automatiquement Maître de cornemuse.

→ Référence Couche 1 [[Personnage]] §Stats brutes. Maîtrise contextuelle [[Personnage]] §Couche 2.

---

## 3. Sources de ressources

**Consomme** (matériel = instruments, fournis par [[Luthier]]) :
- **[[Bois]]** — caisses de résonance ([[Menuisier]] / [[Luthier]])
- **[[Cuir tanné]]** — peaux de tambour ([[Tanneur]])
- **[[Tissu]]** — cordes (anciennes), costumes ([[Tisserand]])
- **Métal** — frettes, mécaniques, anches ([[Forgeron]] / [[Bijoutier]])
- **[[Os]]** — flûtes anciennes
- **Corde** (boyau, métal, soie) — instruments à cordes

**Produit** (output performatif) :
- **Performances** — ambiance, buffs, [[Reconnaissance]]
- **Buffs sociaux / régen [[Labeur]]** — auditoire bénéficie (cf. [[Métiers]] §Divertissements)
- **Compositions** — palier Adepte+, mélodies signées
- **Œuvres signées** — palier Maître, Héritage permanent

→ Pas de craft direct (`craft_category: -`). Output performatif.

---

## 4. Stations + outils

| Station | Rôle | Palier requis |
|---------|------|---------------|
| **Place publique** | Concert ouvert, pourboires | Novice |
| **Taverne** | Engagement régulier, public assis | Novice |
| **Salle de bal** | Bals, mariages | Initié |
| **Préau de fête** | Festival, foule | Adepte |
| **Atelier de luthier** | Fabrication / réparation d'instruments (collaboration ou auto) | Initié |
| **Cour royale** | Ensemble de cour, paie haute | Expert |
| **Conservatoire** *(Astravia, Galenor)* | Formation et reconnaissance académique | Maître |

**Instruments signature** :
- **Luth** — instrument courant, polyvalent
- **Vièle** — corde à archet, mélancolique
- **Flûte** — instrument intime, voyageur
- **Tambour** — rythme, percussion martiale
- **Harpe** — instrument aristocratique, palier Adepte+
- **Cornemuse** — instrument de plein air, festif
- **Lyre** — petit instrument lyrique
- **Diapason** — accordage fin, palier Adepte+
- **Pupitre** — partition, ensemble (palier Adepte+)

---

## 5. Paliers de Maîtrise

| Palier | Capacités débloquées |
|--------|----------------------|
| **Novice** | Mélodies courantes sur 1 instrument, accompagnement simple. Buff public mineur (+5% régen Labeur 5 min) |
| **Initié** | Répertoire élargi, deux instruments possibles (différentes Maîtrises), virtuosité naissante. Buff +10% régen Labeur 15 min |
| **Adepte** | Composition originale, ensemble (3-5 musiciens), sous-spécialité par instrument. Buff +15% régen Labeur 30 min |
| **Expert** | Composition signée, virtuosité reconnue, animation de festival majeur. Buff +20% régen Labeur 1h, zone élargie |
| **Maître** | **Condition cachée 🔒** — Œuvre signée (Héritage), Lien possible avec [[Cantor]], invitation au Conservatoire d'Astravia |

> Décroissance : voir [[Armes et Maîtrise]] §Décroissance. Sans pratique, les doigts perdent leur agilité (rouille -15%).

---

## 6. Activités débloquées

| Palier | Exemples (3-5) |
|--------|----------------|
| **Novice** | Jouer 5 mélodies courantes · Accompagner un chant · Tenir le tempo |
| **Initié** | Maîtriser 2 instruments · Bal de village · Animation de mariage simple |
| **Adepte** | Composer une mélodie originale · Diriger un trio · Concert de taverne réputé |
| **Expert** | Composition signée · Festival majeur · Engagement de cour saisonnier |
| **Maître** | **Œuvre signée** : Mélodie nommée d'après le Musicien (Héritage permanent), entrée au Conservatoire, Lien avec [[Cantor]] |

→ Cross-réf : un Musicien Maître peut composer des mélodies qui circulent dans le monde et deviennent des hymnes locaux/nationaux.

---

## 7. Carrière et débouchés

- **Démarrage** : enfant musical, apprenti chez un Maître, ou autodidacte des tavernes
- **Progression** : tavernes → festivals → cour
- **Établissement** :
  - **Musicien de taverne** — engagement régulier, salaire modeste mais stable
  - **Musicien de cour** — engagement noble, salaire fixe, statut social
  - **Musicien de troupe** — itinérant, intégré à une compagnie ([[Acteur]], [[Jongleur]], [[Barde]])
  - **Maître de Conservatoire** — formation et reconnaissance académique (Maître+)
  - **Lié de [[Cantor]]** — voie magico-musicale (cf. [[Compositeur de sorts]] / [[Cosmologie]])
- **Réseau** :
  - **Pair-troupe** : [[Acteur]], [[Jongleur]], [[Barde]]
  - **Pair-amont** : [[Luthier]] (instruments), [[Menuisier]], [[Forgeron]], [[Tanneur]]
  - **Aval** : [[Tavernier]], [[Aubergiste]], festivals, cours nobles
- **Faction** : Conservatoire d'Astravia, Conservatoire de Galenor, Confrérie des Musiciens, religion [[Cantus Mundi]] (mineure, dédiée à la musique cosmique)

---

## 8. Modulation par contexte

| Contexte | Effet |
|----------|-------|
| **Ère [[Les Ères|Verdoiement]] (Terranu)** | Festivals saisonniers x2, demande accrue |
| **Ère [[Les Ères|Sommeil de Glace]] (Aquor)** | Spectacles d'intérieur (taverne, salle), tempo plus mélancolique valorisé |
| **Ère [[Les Ères|Vents]] (Aerion)** | Instruments à vent +20% effet, musiciens itinérants avantagés |
| **Ère [[Les Ères|Ombre Longue]] (Noctis)** | Mélodies nocturnes, répertoire Noctari débloqué |
| **Post-[[Le Souffle]] semaine 1** | Demande x3 (la communauté guérit par la musique) |
| **[[L'Accord]] ≥ 75%** | Composition d'ère débloquée |
| **[[L'Accord]] = 100%** | Œuvre signée : Mélodie permanente d'ère (Héritage, [[L'Accord]] §Héritage) |
| **Religion [[Cantus Mundi]]** | Lien avec [[Cantor]] possible (cf. [[Cosmologie]]) |
| **Religion [[Foedus Animae]]** | Hymnes de pacte, mariages valorisés |
| **Lien actif [[Cantor]]** | Buffs musicaux amplifiés (+50%), capacité de "musique-magie" |

---

## 9. Économie

**Gold sinks générés** :
- Instrument de qualité ([[Luthier]]) : 200-5 000 Éclats / unité, jusqu'à 50 000 pour Œuvre signée luthière
- Cordes (consommables) : 5-50 Éclats / lot
- Costumes : 50-500 Éclats / set ([[Tailleur]])
- Cotisation Conservatoire : 500 Éclats / ère

**Prix indicatifs** :
- Pourboires place publique : 1-50 Esquilles / spectacle
- Engagement taverne : 10-50 Éclats / soirée
- Mariage / fête : 200-2 000 Éclats / engagement
- Concert de cour : 1 000-10 000 Éclats / saison
- Œuvre signée Maître : Héritage social, redevances sur partition copiée

**Chaîne économique** :
```
[[Luthier]] / [[Menuisier]] / [[Forgeron]] (instruments) → Musicien (Performance)
                                                         ↘ [[Tavernier]] / [[Aubergiste]] (engagement)
                                                         ↘ Festivals, cours nobles
                                                         ↘ Buff [[Labeur]] aux spectateurs
                                                         ↘ Compositions vendues à d'autres musiciens
```

Cross-réf [[Économie]] §Anti-inflation : les festivals sont des gold sinks structurels (cachets aux artistes).

---

## 10. Comportement IA / signatures PNJ

> *Modèle IA pas tranché — voir [[Concepts Fondamentaux IA PNJ]]. Indication gameplay seul.*

**Cycle quotidien typique** :
- 09:00 lever — exercices techniques 1-2h (gammes, doigté)
- 11:00-13:00 — répétition d'ensemble si troupe
- 13:00-14:00 — repas
- 14:00-17:00 — composition, étude de partitions, leçons (si enseigne)
- 17:00-19:00 — préparation du concert
- 19:00-23:00 — performance (taverne, fête)
- 23:00-01:00 — détente, échanges avec confrères

**Signatures de PNJ archétypaux** :
- **Le luthiste de taverne** — figure familière, joue chaque soir, paie en boissons
- **La harpiste de cour** — habit de soie, doigts longs, voile de mystère
- **Le tambourinaire** — physique solide, voix profonde, danse en jouant
- **Le musicien itinérant** — sac de cuir, flûte au cou, jamais en place
- **Le Maître de Conservatoire** — sévère et reconnu, forme la jeunesse musicale

**PNJ célèbres dans le monde** *(à étoffer Phase 4)* :
- *Aldira la Pâle, luthière-musicienne du Conservatoire de Galenor* (cf. citation d'ouverture)
- *Maître Tylan d'Astravia* — virtuose de luth, 5 ères Concordées, hymne de la Couronne signé de sa main
- *Sœur Velira de [[Cantus Mundi]]* — Liée à [[Cantor]], musique-magie

---

*Liens : [[Métiers]] · [[Personnage]] · [[Crafts]] · [[Économie]] · [[Armes et Maîtrise]] · [[L'Accord]] · [[Le Souffle]] · [[Les Ères]] · [[Labeur]] · [[Cosmologie]] · [[Barde]] · [[Acteur]] · [[Jongleur]] · [[Luthier]] · [[Compositeur de sorts]] · [[Tavernier]]*
