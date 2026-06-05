---
tags: [métier, archétype, mysticisme, religion, conscience, verbe]
type: archetype
category: Métier
catégorie_métier: Mysticisme
stat_principale: Conscience
stats_secondaires: [Verbe, Mémoire, Présence]
voie_magique: variable (selon religion)
religion_compatible: [Vael'Kurash, Ignis Aeternum, Ordo Caelum, Noctari, Rota Mundi, Via Ventus, Lex Petra, Somnium Vigil, Foedus Animae]
craft_category: -
sources_ressources_accessibles: [Encens sacré, Texte sacré, Eau bénite, Reliques, Calendrier liturgique]
stations_principales: [Temple, Autel, Confessional, Reliquaire, Bibliothèque sacrée]
outils_principaux: [Symbole religieux, Encensoir, Texte sacré, Bâton liturgique]
paliers_maîtrise: [Novice, Initié, Adepte, Expert, Maître]
karma_typique: vert (variantes selon religion)
factions_compatibles: [9 grandes religions canoniques]
era_modulation: true
status: drafted
last_review: 2026-05-01
needs_review_for: [équilibrage-foi-vs-voie, signatures-prêtres-par-religion-phase4]
---

# 🛐 Prêtre — Archétype Métier

> [!info] Entités tutélaires canoniques
> Le Prêtre canalise principalement **[[Cosmologie|Spiritus]]** (Cosmique — *Druide des esprits*) selon la religion vénérée. Selon la foi, il invoque aussi : **Aurion** (Céleste, énergies éthérées), **Aerion** (Cosmique, vents), **Noctis** (Éternel, ombres), **Vortex** (Cosmique, tempêtes), **Cura** (Céleste, soin mystique), **Mythica** (Céleste, soin créatures), **Ancestralis** (Céleste, esprits ancestraux). Voir [[Cosmologie]] §"Liste canonique des entités cosmiques". Source : `AccessExport/Legende.csv` (D-COSMO-LEGENDE-CSV-INTEGRATION).

> *"Je ne demande pas aux dieux. Je traduis. Le mortel parle, l'entité écoute — quand elle écoute. Ma vie est dans cet 'quand'."*
> — **Hierona Cendara**, Ignitari de Pyrtara

---

## 1. Vue d'ensemble

Le **Prêtre** est l'**officiant religieux** d'Hybelior — l'intermédiaire culturellement reconnu entre les mortels et une ou plusieurs entités cosmiques, dans le cadre d'une **religion structurée**. Contrairement au [[Mage]] qui canalise une force par un Lien personnel, le Prêtre **sert une institution** : il porte les rites, conserve les textes sacrés, conseille les fidèles, célèbre les naissances, mariages, funérailles, et exécute les rituels de sa tradition.

Mécaniquement, le Prêtre repose sur la **Maîtrise de Foi** (`Maîtrise_Foi_<Religion>`, cf. [[Prédiction]] §Tradition religieuse) plutôt que sur une Maîtrise de Voie. Cela signifie qu'un Prêtre **n'a pas nécessairement de Lien** établi avec une entité — sa puissance vient de la **dévotion ritualisée**, des textes, et de la communauté de croyants qui amplifie son canal.

Cependant, **un Prêtre peut aussi être Lié** à la Voie de l'entité principale de sa religion (rare et prestigieux : *Prêtre-Lié*). Voir §3.

→ Référence [[Lore/Religions/00 - Système Religieux]] (les 9 grandes religions canoniques) et [[Prédiction]] §5 Tradition religieuse.

---

## 2. Stats brutes & Maîtrises associées

- **Stat principale** : **Conscience** (Couche 0) — perception du sacré, seuil de canalisation rituelle
- **Stats secondaires** :
  - **Verbe** — incantations, prêches, performance liturgique, persuasion des fidèles
  - **Mémoire** — textes sacrés, calendriers liturgiques, généalogies religieuses
  - **Présence** — autorité morale, ascendant sur les fidèles, prix marchand neutre dans les capitales religieuses
- **Maîtrises contextuelles** :
  - `Maîtrise_Foi_<Religion>` — couche 2, par religion ; progresse par actes liturgiques
  - `Maîtrise_Voie_<Voie de l'entité>` — uniquement si le Prêtre est aussi *Lié* (rare)

> **Formule** : efficacité rituelle = `Conscience × Maîtrise_Foi_<Religion>` (cf. [[Prédiction]] §5).
> Pour un Prêtre-Lié : `Conscience × Maîtrise_Foi × Maîtrise_Voie` (cumul plafonné).

→ Référence Couche 0 et Couche 2 [[Personnage]].

---

## 3. Religion + Voie magique

Le Prêtre appartient à **une religion** (les 9 grandes ou 2 significatives — voir [[Lore/Religions/00 - Système Religieux]]). Chaque religion vénère 1-3 entités cosmiques. La religion détermine **la doctrine, les rites, le clergé, les présences régionales**.

### Mapping Prêtre × 9 religions canoniques

| Religion | Clergé (nom) | Entités vénérées | Voie potentielle (si Lié) | Karma typique | Lecture de Souffle |
|----------|--------------|------------------|---------------------------|---------------|--------------------|
| **Vael'Kurash** | *Vael'Kari* | Spiritus · Arborius | Voie de Spiritus | vert | Épreuve guerrière (Vigueur) |
| **Ignis Aeternum** | *Ignitari* | Eldoria | Voie d'Eldoria | vert | Purification par feu (Esprit) |
| **Ordo Caelum** | *Stellari* | Celestia · Stellaris | Voie de Celestia | vert (autorité érodée) | Silence des cieux (Mémoire) |
| **Noctari** | *Veilari* | Noctis · Umbra · Umbralis | Voie de Noctis ou Umbra | jaune | Voile à percer (Conscience) |
| **Rota Mundi** | *Roteri* | Tempora · Climata · Fatum | Voie de Tempora ou Fatum | vert | Roue qui tourne (Mémoire) |
| **Via Ventus** | *Ventari* | Aerion · Navigor | Voie d'Aerion (Navigor disparu) | vert | Souffle à suivre (Acuité) |
| **Lex Petra** | *Petrani* | Terranu · Gravitas · Judicar | Voie de Terranu | vert | Loi à respecter (Esprit) |
| **Somnium Vigil** | *Vigili* | Somnix · Realis · Aurion | Voie de Somnix ou Aurion | jaune | Rêve à interpréter (Conscience) |
| **Foedus Animae** | *Animari* | Anima · Mentor · Ancestralis | Voie de Fatum (rare) | vert | Pacte à honorer (Verbe) |

> [!important] Prêtre vs Prêtre-Lié
> **Un Prêtre standard** sert sa religion par les rites, sans Lien établi avec une Voie. Sa puissance vient de `Maîtrise_Foi`.
> **Un Prêtre-Lié** combine en plus une Voie active (mono-Voie obligatoire). Très puissant mais **double engagement** : rupture du Lien = perte du statut religieux, et inversement.

> [!note] Religions mineures
> Les religions *Taciti* (Silencieux) et *Cantus Mundi* (Chant du Monde) ont leurs propres clergés (*Silentii*, *Cantori*) avec mécaniques spécifiques (vœu de silence, composition rituelle). Voir [[Lore/Religions/00 - Système Religieux]].

---

## 4. Sources / composantes

**Consomme** :
- **Encens sacré** (commun à rare) — amplifie tout rituel divinatoire ou liturgique
- **Texte sacré** (corpus propre à chaque religion) — support de mémoire et de récitation
- **Eau bénite** — utile pour bénédictions et purifications mineures
- **Reliques** (rares) — restes de saints, objets ayant servi à un grand rite
- **Offrandes** (variables : viande, sang, encens, bijoux) selon religion

**Produit** :
- **Bénédictions** — buff temporaire de stat ou résistance (durée 10-60 min)
- **Rituels de naissance / mariage / funérailles** (services PNJ et joueurs)
- **Lecture de présage** — voir [[Prédiction]] §5 Tradition religieuse
- **Exorcisme / scellement** (Foedus Animae, Noctari, Vael'Kurash) — rituel anti-mort-vivant ou anti-malédiction

→ Référence [[Sources de Ressources]] §Encens sacré + §Reliques.

---

## 5. Stations + outils

| Station | Rôle | Palier requis |
|---------|------|---------------|
| **Temple** (selon religion) | Lieu principal du culte, +30% efficacité rituels | Initié |
| **Autel** | Surface de bénédiction et offrande | Novice |
| **Confessional** | Communication privée fidèles ↔ Prêtre — révèle des informations | Adepte |
| **Reliquaire** | Conservation et exposition des reliques sacrées | Expert |
| **Bibliothèque sacrée** | Étude et préservation des textes | Adepte |

**Outils** :
- **Symbole religieux** (médaillon, broche, signe) — signe d'appartenance, +Présence
- **Encensoir** — amplifie rituels
- **Texte sacré** (livre/codex) — corpus de la religion
- **Bâton liturgique** — équivalent Sceptre, mais amplificateur de `Maîtrise_Foi` plutôt que Voie

→ Référence [[Tome]] §Codex de savoir (texte sacré comme variant), [[Anneau]] §Sigillaire (anneau-sceau religieux).

---

## 6. Paliers de Maîtrise

| Palier | Capacités liturgiques débloquées |
|--------|---------------------------------|
| **Novice** | Bénédictions mineures (durée 5min), prières simples, lecture du calendrier, +5 Présence dans temples |
| **Initié** | Rituels de bénédiction (10-30min), célébration de naissance/mariage simple, lecture de présage basique |
| **Adepte** | Rituels d'amplification (buff stat +15 sur 30min sur 1-3 fidèles), exorcisme mineur, lecture de présage avancée |
| **Expert** | Rituels collectifs (10+ fidèles), bénédictions de zone, exorcisme majeur, conseil officiel auprès de seigneurs |
| **Maître** | **Condition cachée 🔒** — Œuvre sacrée signée, autorité religieuse régionale, peut nommer des Initiés. Rituel exceptionnel propre à la religion (cf. §7). |

> Décroissance : un Prêtre qui n'officie pas voit sa `Maîtrise_Foi` décroître. Renoncement public = perte totale.

---

## 7. Sorts/rituels par palier

| Palier | Rituels par religion (exemples canoniques) |
|--------|-------------------------------------------|
| **Novice** | *Bénédiction du voyageur* (Via Ventus +5 Endurance), *Veille des étoiles* (Ordo Caelum, prière nocturne), *Offrande aux ancêtres* (Foedus Animae) |
| **Initié** | *Veillée de flammes* (Ignis Aeternum, +Vigueur en groupe), *Méditation à la pierre* (Lex Petra), *Récolte sacrée* (Vael'Kurash) |
| **Adepte** | *Augure du temple* (lecture de présage), *Bénédiction d'arme* (variable), *Exorcisme mineur* (Foedus Animae, Noctari, Vael'Kurash) |
| **Expert** | *Sermon d'amplification* (buff zone), *Rituel d'allégeance* (lien faction), *Scellement de tombe* (Foedus Animae) |
| **Maître** | **Rituel signature** : *Grand Rituel de Réveil* (Ignis Aeternum, lié à Eldoria endormie), *Calendrier prophétique* (Rota Mundi), *Pacte de lignée* (Foedus Animae), *Veillée des Ombres* (Noctari) |

→ Cross-réf [[Tome]] §Codex de savoir (textes sacrés), [[Anneau]] §Sigillaire (anneau de pacte/serment), [[Potion]] §Signature (Larme de Foedus, Élixir Volcanique de Cendara).

---

## 8. Carrière et progression spirituelle

- **Initiation** — entrer dans un séminaire ou un monastère, vœux mineurs (selon religion)
- **Vœu** — vœux majeurs (silence pour *Taciti*, mobilité pour *Ventari*, crémation rituelle pour *Ignitari*, etc.)
- **Service** — assignation à un temple local, encadrement des fidèles
- **Rang** — montée dans la hiérarchie (chez les religions hiérarchisées : Stellari, Petrani, Ignitari)
- **Reconnaissance** — autorité morale régionale, conseil à un seigneur, accueil dans un Conseil
- **Maîtrise** — titre suprême de la religion (Grand Stellari, Hiérarque Ignitari, Doyenne Vael'Kari...). **Œuvre sacrée signée.**
- **Hérésie** (chemin sombre) — déviation doctrinale → bannissement, possibilité de fonder un culte mineur (cf. [[Lore/Religions/00 - Système Religieux]] §Hérésies)

**Réseau** : autres Prêtres (dans la religion), [[Bibliothécaire]] (textes), [[Historien]] (lore), [[Architecte]] (construction de temple), [[Sculpteur]] (statues sacrées), [[Guérisseur]] et [[Mage]] (collaborations rituelles).

### Sous-spécialisations canoniques (Role.csv)

> Source canonique : `Role.csv` (cat 8 — Mysticisme). Ce rôle correspond à un **palier Maître+** absorbé du legacy AccessExport.

#### Sous-spécialisation Maître+ : Grand prêtre

> Source canonique : `Role.csv` (cat 8, role n°34).

- **Description** : titre suprême du palier 5 — Prêtre élevé à la tête de sa religion ou de sa branche locale (Grand Stellari, Hiérarque Ignitari, Doyenne Vael'Kari, etc.). Voix officielle du culte, autorité morale, conseiller spirituel des souverains.
- **Conditions** : palier Maître + Œuvre sacrée signée + Reconnaissance ≥ Expert dans la religion + investiture par les pairs ou par révélation rituelle + 🔒 condition cachée (avoir conduit un rite majeur durant un [[Le Souffle|Souffle]] OU survécu à une hérésie en gardant l'autorité doctrinale).
- **Notes** : équivalent canonique de la **Maîtrise** dans la progression spirituelle (§8). Frontière forte avec [[Conseiller]] (un Grand prêtre conseille un roi) et — pour les religions hiérarchiques d'État — avec le titre [[Roi (titre)|Roi]] (un souverain peut être aussi Grand prêtre).

---

## 9. Modulation par contexte

| Contexte | Effet |
|----------|-------|
| **Religion alignée à l'ère** ([[Les Ères]]) | +25% efficacité rituels, fidèles plus nombreux |
| **Religion opposée à l'ère** | −20% efficacité, possible crise de foi |
| **Post-[[Le Souffle]]** | Lecture de présage prioritaire (cf. [[Prédiction]] §5), Reconnaissance +10% si lecture juste |
| **[[L'Accord]] ≥ 75%** | +5% efficacité intrinsèque, débloque rituels d'ère |
| **Capitale religieuse** | Présence +10, prix offrandes −20% |
| **Pays opposé** (Ignis Aeternum à Vytharia) | Reconnaissance −30%, hostilité possible |
| **Conflit doctrinal** ([[Lore/Religions/00 - Système Religieux]] §Conflits majeurs) | Combat spirituel, possible PvP religieux |
| **Faction noble protectrice** | Solde clérical, terres concédées au temple |

**Karma typique** :
- **Vert** par défaut pour la plupart des religions (Vael'Kurash, Ignis Aeternum, Lex Petra, Via Ventus, Rota Mundi, Foedus Animae)
- **Vert avec autorité érodée** : Ordo Caelum (silence de Celestia)
- **Jaune** : Noctari (rumeurs d'espionnage), Somnium Vigil (substances hallucinogènes sacrées)
- **Rouge à noir** : hérésies persécutées (*Catena Fracta*, *Aqua Nigra*) — non couvertes par cet archétype standard

---

## 10. Économie + Signatures PNJ

**Gold sinks générés** :
- Encens sacré : 50-500 Éclats / portion (varie par religion)
- Reliques (achat) : 10 000-1 000 000 Éclats (très rare, marché noir partiel)
- Construction de temple : 50 000-5 000 000 Éclats (collab [[Architecte]])
- Offrandes obligatoires : 5-100 Éclats / cérémonie (volume cumulé fort)
- Habit liturgique : 500-20 000 Éclats selon rang

**Revenus typiques** :
- Bénédiction de voyageur : 20-200 Éclats
- Célébration de mariage : 500-10 000 Éclats (selon rang)
- Funérailles : 200-5 000 Éclats
- Lecture de présage : 100-2 000 Éclats (selon précision réputée — voir [[Prédiction]] §Bourse des Augures)
- Conseil officiel à un seigneur : 1 000-50 000 Éclats / mois (rente)

**Chaîne économique** :
```
[[Herboriste]] / [[Alchimiste]] (Encens) → Prêtre (rituel) → Fidèles (offrandes)
[[Sculpteur]] (Statue sacrée) → Temple → Reconnaissance accrue
[[Historien]] / [[Bibliothécaire]] (Texte sacré) → Prêtre (étude) → Autorité doctrinale
```

**Signatures PNJ archétypaux** :
- **L'Ignitari de Cendara** — prêtre-forgeron, double-casquette [[Forgeron]], temple-forge, karma vert mais redouté
- **Le Vael'Kari ermite** — chamane forestier (Alkaran, Ulinor), double-casquette [[Herboriste]] et [[Guérisseur]]
- **Le Stellari d'Astravia** — astrologue de cour, double-casquette [[Astronome]], autorité erodée mais prestige
- **L'Animari de Torkam** — chamane funéraire, double-casquette [[Nécromancien]] *légitime culturellement*
- **Le Petrani de Mosrack** — prêtre-juriste, conseiller royal et juge spirituel
- **Le Veilari de Vytharia** — espion sacré, karma jaune, lien réseau [[Lore/Religions/Noctari\|Noctari]]

**PNJ célèbres dans le monde** *(à étoffer Phase 4)* :
- *Hierona Cendara* — Hiérarque Ignitari de Pyrtara, gardienne du Cœur de Cendra
- *Mère Tirshara* — Doyenne des Vael'Kari d'Alkaran, ermite des grandes forêts
- *Maître Veylan d'Astravia* — Grand Stellari, dernier détenteur de l'Astrolabe d'Astravia
- *L'Animari Anonyme* — chamane Foedus Animae, identité changée à chaque génération (lignée matrilinéaire)

---

*Liens : [[Métiers]] · [[Personnage]] · [[Lore/Religions/00 - Système Religieux]] · [[Cosmologie]] · [[Le Lien]] · [[Prédiction]] · [[L'Accord]] · [[Le Souffle]] · [[Les Ères]] · [[Mage]] · [[Guérisseur]] · [[Oracle]] · [[Nécromancien]] · [[Tome]] · [[Anneau]] · [[Potion]]*
