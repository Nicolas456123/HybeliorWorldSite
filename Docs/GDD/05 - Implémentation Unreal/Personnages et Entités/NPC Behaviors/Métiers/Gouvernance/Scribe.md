---
tags: [pnj, comportement, métier, scribe, gouvernance]
type: template-pnj-metier
status: drafted
last_review: 2026-05-01
métier_lié: [[03 - Mécaniques/Métiers/Gouvernance/Scribe]]
mbti_typique: [ISTJ, INTJ, ISFJ]
karma_typique: vert
factions_compatibles: [Politiques, Religieuses, Commerciales]
needs_review_for: [calibration-playtest]
---

# 📜 Template comportement PNJ — Scribe

> Template de comportement IA d'un PNJ **Scribe**. Hérite de [[Routine Quotidienne]] et applique les [[Concepts Fondamentaux IA PNJ|20 Concepts]] + [[Actions Situationnelles]].
>
> Métier source : [[03 - Mécaniques/Métiers/Gouvernance/Scribe]].
>
> **Particularité** : **Seul métier Gouvernance avec un cycle craft réel** (Scriptorium). Cycle quotidien plus proche d'un métier d'**Erudition** que d'un Gouvernance "social". Mode Marchand activable (vend parchemins, codex, livres-Récipients). Cycle long de copie + boucle d'enluminure/cryptographie.

---

## 1. Vue d'ensemble — mode dominant

| Mode dominant | Modes secondaires fréquents | Modes interdits |
|---------------|------------------------------|-----------------|
| **Mode Routine** (boucle Scriptorium) + **Mode Marchand** (atelier ouvert) | **Mode Dialogue** (clientèle), **Mode Religieux** (Scribe sacré), **Mode Quête** (donneur de "récupère ce manuscrit") | Aucun |

**MBTI typiques** :
- **ISTJ** (Logisticien) : Scribe administrateur, méthodique, patient, archétype canonique des chancelleries — l'archiviste fiable.
- **INTJ** (Architecte) : Scribe-stratège des chroniques, voit l'œuvre de toute une vie, codifie pour les Souffles à venir.
- **ISFJ** (Défenseur) : Scribe-prêtre, copie patiente des textes sacrés, mémoire vivante des cultes.

**Karma typique** : 🟢 **vert**. Variant 🟡 **jaune** : Scribe-faussaire (cf §8 source) — accessible, traqué par Juges, alimente Espions et hors-la-loi.

**Catégorie population (§9)** : **Persistant famille de génération** — chaque cité majeure a un Scribe officiel + 1-2 Scribes secondaires. Mort = succession narrative ~7 jours (apprenti devient maître).

---

## 2. Cycle quotidien

```
[06:00] Réveil — préparation encres et plumes (rituel matinal)
   ↓
[07:00] Aller au Scriptorium
   ↓
[07:30–12:00] Boucle Scriptorium (cf §3) — copie principale du jour
   ↓
[12:00–13:00] Repas — souvent au pupitre, frugal
   ↓
[13:00–17:00] Boucle Scriptorium — enluminures, cryptographie, runes-modèles
   ↓
[17:00–18:00] Mode Marchand — clientèle (commande de codex, sceaux, livres-Récipients)
   ↓
[18:00] Fermeture atelier
   ↓
[19:00–22:00] Loisir — lecture personnelle, correspondance, transmission à apprenti
   ↓
[22:00] Dormir
```

### Boucle Scriptorium (cycle craft)

```
[Préparer support : tailler plume, mélanger encre]
       ↓
[Installer parchemin sur pupitre]
       ↓
[Copie ou enluminure — boucle 30-90 min]
       ↓
[Vérifier qualité (Acuité × Maîtrise_Calligraphie)]
       ↓
[Sécher / sceller la pièce]
       ↓
[Ranger sur lutrin de pièces finies]
       ↓ (boucle nouvelle pièce)
```

**Paramètres canoniques** :

| Paramètre | Valeur par défaut | Variations |
|-----------|-------------------|------------|
| `wake_time` | 06:00 | ISTJ strict |
| `work_start` | 07:30 | |
| `work_end` | 18:00 | INTJ chronique : 20:00 (chroniqueur de l'ère) |
| `weekend_pattern` | `lecture` | ISFJ Scribe sacré : `prière` |
| `leisure_preference` | `lecture` ou `atelier` | INTJ : `atelier` (codifie ses notes) |
| `workplace_location` | Scriptorium (atelier dédié) — cf §4 source | ISFJ : cellule monastique |
| `home_location` | Logement adjacent au Scriptorium | — |
| `current_recipe` | `parchemin_standard` | tourne entre codex, sceaux, livres-Récipients, runes-modèles |
| `mastery_level` | `Initié` | Novice → Maître selon palier |

---

## 3. Modes contextuels actifs

### Mode Routine (Boucle Scriptorium dominante)

Sous-mode **`Routine.Copie`** :
- Action : assis au pupitre, animation `écrire`, son plume sur parchemin
- Modulation MBTI : ISTJ travaille à cadence régulière, INTJ alterne phases longues d'écriture et pauses analyse, ISFJ patience profonde
- Joueur observe à 5m : continue mais peut saluer entre pages

Sous-mode **`Routine.Enluminure`** (palier Adepte+) :
- Action : couleur, dorure, animation lente et précise
- Coût concentration : `Routine.Pause` -30 (interruption coûte cher)

Sous-mode **`Routine.Runique`** (palier Expert+) :
- Action : gravure rune sur support — interface avec [[03 - Mécaniques/Le Lien]]
- Trigger Esprit ≥ 50

### Mode Marchand

- Trigger : créneau horaire (17:00-18:00 typique) OU client à `interaction_distance`
- Inventaire : parchemins, codex, sceaux personnels, livres-Récipients (cf [[03 - Mécaniques/Crafts]] §Scriptorium)
- Pricing modulé par MBTI (T = rigidité +30, F = empathie -20) et Reconnaissance joueur (§7 modulation seuils)
- Cf [[Modes Sociaux]] §Marchand

### Mode Dialogue

- Trigger : client commande pièce sur mesure OU joueur demande chronique d'exploits (gain Renom — §6 source)
- Sous-mode `Dialogue.CommandeSpécifique` : négociation longue, prend des notes
- ISFJ : très accueillant, F = +empathie

### Mode Religieux (Scribe sacré seulement)

- Trigger : sabbat ou heure de rituel
- Override Mode Marchand pendant créneau (cohérent §3.2 : Religieux > Marchand)
- Variantes : copie de textes saints sous bénédiction, livres liturgiques

### Mode Crise

- Trigger : `RaidOnVillage`, `WeatherStormStarting` (encres et parchemins fragiles)
- Branche BT : `RoutineAdjust.ProtectArchives` — sauvegarde des œuvres signées avant fuite
- ISFJ : mémoire d'archive priorisée même au péril (saturation Fatigue avant Peur)
- Saturation Peur ≥ 80 : `Combat.Flee` — laisse archives derrière (drame narratif)
- Pas d'engagement combat (pas d'arme)

### Mode Quête (donneur)

- "Récupère ce manuscrit perdu", "Vérifie cette signature", "Authentifie ce document"
- Sous-mode `Quête.ChroniqueÈre` : entreprise au long cours produisant œuvre signée Patrimoniale (§6 source)

### Mode Festivité

- Présent aux cérémonies civiques (greffier officiel) — peu actif, prend notes pour archive
- Cantus Mundi (§13) : peut chanter en chorale collective si religieux

### Mode Deuil

- Mort d'un Maître Scribe : Mode Deuil + reprise de ses œuvres en cours (§18 succession narrative)
- ISFJ : durée ×1.5

---

## 4. Triggers spécifiques

| Trigger | Effet | Concept |
|---------|-------|---------|
| **PlayerCommissionsExploitChronicle** | Active sous-mode `Quête.ChroniqueExploits` — produit œuvre signée → Renom joueur | §6 source, §3 Mémoire Héritage |
| **PlayerSeeksFalseDocument** (Scribe-faussaire variant jaune) | Si rep ≥ +25 ET karma joueur ≤ jaune : accepte commande illégale | §7, §8 source |
| **EraVoileOuEffroi** | Recettes scriptoriques obscures débloquées (cf §8 source + [[03 - Mécaniques/Crafts]]) | §14 |
| **EraReflux** | Textes anciens redécouverts — bascule en Mode Quête `RetrouverManuscritPerdu` | §14 |
| **WeatherStormStarting** | Court-circuit P3 (équivalent profanation pour archives) → ferme volets, protège parchemins | §13 Ignis |
| **JugeOuConseillerCommande** | Reconnaissance interne forte — priorité sur travail commercial | §7 |

---

## 5. Réactions situationnelles canoniques

### 5.1 Joueur entre dans Scriptorium

| Rep effective | Réaction |
|---------------|----------|
| +75 (allié) | Accueil chaleureux, propose codex rare, discount -30%, peut chroniquer exploits |
| Neutre | Salutation polie depuis pupitre, continue son travail, attend approche |
| -50 | Refuse de prendre commande complexe, "ma file d'attente est pleine" |
| < -75 | Demande de quitter, signale Garde si vol détecté |

### 5.2 Vol de manuscrit détecté

- Trigger : `Memory.Public.PlayerStoleLocal` weight 50 (parchemin signé volé = grave)
- Réaction : ISTJ alerte Garde immédiatement, ISFJ prie, INTJ note et planifie représailles longues
- Mémoire : entrée individuelle weight 80 contre joueur

### 5.3 Joueur demande chronique d'exploits (Renom)

- Sous-mode `Mode Quête.Chronique`
- Coût : 100-2000 Éclats selon rang du Scribe et envergure exploits
- Délai : 1-3 sessions IRL (génère œuvre signée → Héritage, cf §10 source)

### 5.4 Crise climatique (tempête)

- Court-circuit P3 → fermeture immédiate volets/portes
- Saturation Peur baseline élevée (parchemins = vie)
- Travail intérieur seulement, suspendre rituel runique (Esprit perturbé)

---

## 6. Modulation MBTI

| Dichotomie | Effet sur Scribe |
|------------|-------------------|
| **I** (Introverti) | **Métier dominé par I** — concentration longue, peu de dialogue spontané |
| **E** (Extraverti) | **Inadapté** — le Scribe extraverti est un médiocre copiste mais bon vendeur de codex |
| **N** (Intuition) | INTJ chroniqueur — vision longue, projet d'œuvre Patrimoniale |
| **S** (Sensation) | **Métier dominé par S** — précision du tracé, attention au détail matériel |
| **F** (Sentiment) | ISFJ Scribe sacré, copie comme acte de dévotion |
| **T** (Pensée) | ISTJ administratif — rigueur, exactitude |
| **J** (Jugement) | **Métier dominé par J** — calendrier, séries, archives ordonnées |
| **P** (Perception) | **Inadapté** — Scribe désordonné est mauvais Scribe |

**Triplet typique** :
- **ISTJ** : Scribe administratif canonique — patient, méthodique, fiable.
- **INTJ** : Chroniqueur visionnaire — projet d'œuvre Patrimoniale, lit les Souffles.
- **ISFJ** : Scribe sacré — copie patiente, mémoire vivante des textes saints.

---

## 7. Modulation Karma / Reconnaissance / Faction

**Karma** :
- 🟢 **Vert** par défaut.
- 🟡 **Jaune** : Scribe-faussaire (variant scriptable, traqué par Juges, accessible aux hors-la-loi et Espions).

**Reconnaissance** (§7) :
- Forte auprès des factions servies (royale, ecclésiastique, consulaire).
- Cf [[_Pilotage/Registre des Décisions]] §D-GDD-RECONNAISSANCE.

**Renom** :
- Scribe Maître ayant signé œuvre canonique → Renom durable, parfois transgénérationnel (l'œuvre survit aux Souffles, cf §10 source — Héritage).

**Factions** :
- **Politiques** : Scribe royal — chartes, traités, lois.
- **Religieuses** : Scribe sacré — accès recettes runiques exclusives par culte.
- **Commerciales** : Scribe consulaire — contrats, lettres de change.

---

## 8. Hooks Phase 2 — Authoring, NPC↔NPC, Lifecycle

**Authoring (§17)** :
- Chaque cité majeure : 1 Maître Scribe officiel + 2-4 Scribes secondaires + apprentis.
- Templates alternatifs par Ère (§14 5%) :
  - Ère du Voile : `Scribe_Cryptographe_Variant` — recettes obscures, cryptographie ×2.
  - Ère du Reflux : `Scribe_Archéologue_Variant` — quêtes de récupération de textes anciens.

**NPC↔NPC (§19)** :
- **Scène scriptée Tribunal** : Scribe greffier prend l'attendu de verdict (cf template Juge §8).
- **Scène scriptée Atelier** : Maître + 1-2 apprentis — transmission scriptée.
- Croisement avec Enchanteur d'objet (Crafts §Scriptorium et enchantement) — frontière `qui valide la rune ?`.

**Lifecycle (§18)** :
- Mort = succession narrative apprenti → maître (§9 source) après 7j gameplay.
- Œuvre signée du Maître **survit** au Souffle (cf §10 source — Héritage).
- Side quest générée si manuscrit critique non terminé : "L'œuvre inachevée du Maître X".

**Cross-références** :
- [[03 - Mécaniques/Métiers/Gouvernance/Scribe]] — métier joueur source
- [[03 - Mécaniques/Crafts]] §Scriptorium et enchantement
- [[03 - Mécaniques/Métiers/Gouvernance/Juge]] — rédige attendus
- [[03 - Mécaniques/Métiers/Gouvernance/Conseiller]] — rapports chiffrés
- [[03 - Mécaniques/Métiers/Sécurité/Espion]] — Scribe-faussaire alimente faux papiers
- [[Actions Situationnelles]] §5.4 (météo + archives), §5.5 (changement d'Ère)
- [[Concepts Fondamentaux IA PNJ]] §6 MBTI, §10 Persistance Héritage

---

*Liens : [[NPC Behaviors/Index|← Index]] · [[Routine Quotidienne]] · [[Modes Sociaux]] · [[Actions Situationnelles]] · [[Concepts Fondamentaux IA PNJ]]*
