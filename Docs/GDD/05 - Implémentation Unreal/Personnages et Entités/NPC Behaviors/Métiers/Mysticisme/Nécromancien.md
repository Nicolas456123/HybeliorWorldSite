---
tags: [pnj, comportement, métier, nécromancien, mysticisme, mort, tabou, ia, template]
type: template-pnj-metier
status: drafted
last_review: 2026-05-01
métier_lié: "[[03 - Mécaniques/Métiers/Mysticisme/Nécromancien]]"
mbti_typique: [INTJ, INTP, ENTJ]
karma_typique: variable
voie_magique_principale: Noctis | Tempora | Spiritus (chamanique) | Navigor (relique)
religion_compatible: [Foedus Animae (légitime), Vael Kurash (chamanique), Noctari (clandestin)]
factions_compatibles: [Foedus Animae, Noctari clandestin, cultes funéraires tribaux]
template_alternatif_souffle: false
ritual_pattern_religion: [RP_FOEDUS_ANIMAE, RP_VAEL_KURASH, RP_NOCTARI]
needs_review_for: [calibration-playtest, équilibrage-tabou-pvp, distinction-foedus-vs-corrompu]
---

# 💀 Template PNJ — Nécromancien

> Comportement situationnel d'un PNJ Nécromancien. Hérite de [[Routine Quotidienne]] et applique [[Actions Situationnelles]]. **Karma rouge/noir typique sauf religion Foedus Animae** (Animari à Torkam/Skaldoria — légitimes). Métier joueur correspondant : [[03 - Mécaniques/Métiers/Mysticisme/Nécromancien|Nécromancien]].
>
> **Particularité Mysticisme** : métier **tabou** dans la majorité des cultures, **persécuté** par Ignis Aeternum (Cendara, Pyrtara), Ordo Caelum (Caeloria, Astravia), Lex Petra (Mosrack, Iskara, Altram). **Routine clandestine + nocturne** pour la plupart. La **légitimité culturelle** est la clé du karma : `vert` à Torkam/Skaldoria (Animari), `jaune` à Vytharia/Nysaria, `rouge à noir` ailleurs.

---

## 1. Vue d'ensemble

Le Nécromancien est le pratiquant magique de la **mort, des âmes, et des esprits désincarnés** — l'archétype magique le plus **moralement complexe** d'Hybelior. Selon la culture, il peut être un **chamane funéraire respecté** (Animari de Foedus Animae) ou un **abomination tabou** (Voie de Noctis offensive en Galenor, Caeloria, Cendara).

- **Identité comportementale** : intellectuel-isolé (I+T+J dominants), MBTI Intuitifs, calme face à la mort, nocturne fréquent
- **Position sociale** :
  - **Légitime** (Foedus Animae à Torkam/Skaldoria, Vael'Kari chamane à Alkaran) : respecté, gardien des âmes ancestrales
  - **Toléré-surveillé** (Noctari à Vytharia, Nysaria, No Man's Land) : suspicion publique
  - **Persécuté** (ailleurs) : clandestin, persécution active
- **Slot Mode Marchand** : présent mais clandestin selon culture (services rituels chers)
- **Lien chaîne** : amont [[Apothicaire]] (cire funéraire), [[03 - Mécaniques/Métiers/Mysticisme/Herboriste|Herboriste]] (encens noir), [[Cuisinier]] (cierges spéciaux) · aval clients en deuil ([[03 - Mécaniques/Métiers/Mysticisme/Prêtre|Prêtre Foedus Animae]] collab légitime)

---

## 2. Cycle quotidien — variantes selon légitimité

### 2.1 Animari légitime (Foedus Animae, Torkam/Skaldoria)

```
06:30  Lever, salutation aux ancêtres (autel familial)
07:00  Entretien Lien (Spiritus chamanique ou Tempora rare)
08:00  Office matinal au cimetière communautaire (visite tombes)
10:00  Réception clients (pactes funéraires, communion morts)
12:00  Repas
13:00  Rituels funéraires programmés (durée 1-3h)
17:00  Conseil aux endeuillés
19:00  **Offrande quotidienne autel familial** (RP_FOEDUS_ANIMAE)
20:00  Repas, dialogue avec ancêtres
22:00  Coucher
```

### 2.2 Veilari clandestin (Noctari, Vytharia/Nysaria)

```
14:00  Lever (cycle inversé Noctari)
15:00  Réveil + entretien Lien Noctis
17:00  Office crépusculaire à voix basse (cellule sombre)
19:00  Repas léger
20:00-04:00  **Activité principale** — rituels nocturnes, drains, communion sombre
04:00  Méditation finale
05:00  Coucher (cache de jour)
```

### 2.3 Persécuté (Ignis/Ordo/Lex Petra zones)

```
Variable — routine de dissimulation, cellules cachées, déplacements nocturnes secrets
Aucun temple public ; rituels en sous-sol ou ruine ; fuite si découverte
```

### Boucle de rituel canonique

```
[T1 Préparation — composantes (os rituel, cendres, sépulcre, sang consenti)]
   ↓
[T2 Cercle d'invocation — Conscience perception âmes]
   ↓
[T3 Canalisation rituelle (15 min - 3h selon tier)]
   ↓
[T4 Communion / Animation / Drain selon Voie]
   ↓
[T5 Scellement + offrande au défunt (Foedus Animae) OU dispersion (Noctis)]
```

> Voir `cercle_invocation`, `crypte_rituelle`, `cimetiere_consacre`, `sepulcre_ancetres` pour ancres.

---

## 3. MBTI typique

| Type | Profil Nécromancien | Note |
|------|----------------------|------|
| **INTJ** | Nécromancien stratège, plan long, Voie de Noctis ou Tempora | Profil dominant — intellectuel sombre |
| **INTP** | Nécromancien théoricien, recherche pure sur âmes, Voie de Tempora | Profil rare-érudit |
| **ENTJ** | Nécromancien-leader (Hierach Foedus Animae à Torkam), commande chamanique | Profil rare-public |

Modulateurs ([[Concepts Fondamentaux IA PNJ]] §6) :
- **N** (commun aux 3) : interprétation symbolique de la mort, dialogues métaphysiques
- **T** (commun) : analyse rationnelle, calme face au deuil, prix services calculés
- **I (INTJ/INTP)** : isolement, dialogues brefs avec vivants
- **J (INTJ/ENTJ)** : rituels stricts, calendrier funéraire respecté
- **P (INTP)** : exploration libre des Voies, expérimentation
- **E (ENTJ)** : commande équipe rituelle, voix forte aux funérailles publiques

---

## 4. Triggers situationnels

| Trigger ID | Conditions | Effet immédiat |
|------------|-----------|----------------|
| **FuneralRequested** | Décès dans communauté + Foedus Animae | Pacte funéraire scellé (légitime) |
| **GhostManifestation** | Esprit errant détecté + Conscience perception | Communion/dialogue avec esprit |
| **PersecutionRisk** | Garde Lex Petra/Ignitari < 50m + zone hostile | Mode Crise = fuite/dissimulation immédiate |
| **TabooBreachByOther** | Ignitari profane sépulture | Court-circuit P1 → `Combat.Defense` (Foedus Animae légitime) |
| **AllyDeadFresh** | Allié mort < 1h | Tente communion/scellement (selon Voie) |
| **EraSouffleBroadcast** | Nouveau Souffle | Modulation : Noctis/Tempora alignment +30%, Eldoria -30% |
| **SoulHunterApproach** | Joueur Karma rouge sollicite drain offensif | Refus si Animari ; accepte si Veilari clandestin |
| **AncestralDay** | Jour des morts dans calendrier liturgique | Service massif, rituels publics (Foedus Animae) |

---

## 5. Modes superposables

| Mode | Activation | Comportement spécifique |
|------|-----------|--------------------------|
| **Routine** *(défaut)* | Rituels / cabinet / études | Cycle selon variante (légitime/clandestin) |
| **Marchand** | Client sollicite service | Service rituel cher (50-500 Éclats) ; **refuse certains services selon karma** |
| **Dialogue** | Initiation joueur ou client en deuil | Calme, métaphysique, références aux âmes ; INTJ = froid analytique, ENTJ = autoritaire |
| **Crise** | Persécution / lieu sacré profané / allié mort | Variable : fuite (clandestin) OU défense (Animari légitime) |
| **Festivité** | Festival local | Faible engagement (sauf Foedus Animae jour des morts) |
| **Religieux** | RitualPattern Foedus/Vael/Noctari | Office selon religion (cf §8) |
| **Deuil** | Mort proche | Deuil rituel codifié (sceau funéraire, communion) |
| **Quête** | Donneur (récupérer relique funéraire, communiquer avec disparu) | Continue routine + dialogue spécifique |

Cascade : **Crise (fuite si persécuté, défense si légitime profané) > Religieux > Deuil > Marchand > Routine**.

---

## 6. Réactions situationnelles canoniques

### 6.1 Joueur sollicite communion avec mort

- **Trigger** : Joueur < 5m + cabinet ouvert + paiement
- **Branche BT** : `ModeSocial.NecromancyConsultation`
- **Comportement** :
  - Animari (légitime) : "Asseyez-vous. Quel ancêtre cherchez-vous ? Donnez-moi son nom complet."
  - Veilari (clandestin) : voix basse, regard méfiant, "Vous savez ce que vous demandez ?"
  - INTJ : "La précision de votre demande déterminera la précision de la réponse."
- **Prix** : 20-200 Éclats selon ancienneté du défunt (rituel court / long)
- **Refus** : si requête malveillante (animation cadavre joueur ennemi sans cause valable)

### 6.2 Pacte funéraire (Foedus Animae légitime)

- **Trigger** : `FuneralRequested` Foedus Animae
- **Branche BT** : `ModeReligious.PactFuneraire`
- **Comportement** :
  - Veillée funéraire familiale (3-12h)
  - Sceau de pacte transmissible parent → enfant
  - **Service public, transparent** dans cultures Foedus Animae
- **Mémoire village** : `Memory.Public.NecromancerSealedPact` weight 30 (positif Torkam/Skaldoria)

### 6.3 Persécution (zone hostile Ignitari/Stellari/Petrani)

- **Trigger** : `PersecutionRisk` détecté
- **Branche BT** : Mode Crise — fuite/dissimulation
- **Comportement** :
  - Cache outils rituels (sceptre d'os dans manche)
  - Bascule en routine "civil ordinaire" trompeuse
  - Si combat inévitable : **Drain spirituel** (Noctis offensive) ou retraite via brume Spiritus
- **Mood** : `Peur +40` saturée fréquente, `Colere +20`
- **Mémoire individuelle** : `PersecutedByFaction` weight 70

### 6.4 Communion avec esprit errant

- **Trigger** : `GhostManifestation`
- **Branche BT** : `Routine.GhostCommunion`
- **Comportement** : approche calme, parole rituelle, écoute longue (INTJ patient), éventuel scellement si esprit en peine
- **Récompense narrative** : informations cachées, side-quest générée

### 6.5 Profanation sépulture par ennemi

- **Trigger** : `TabooBreachByOther` — Ignitari brûle tombe Foedus Animae
- **Branche BT** : court-circuit P1 → `Combat.Defense` (Foedus Animae défend ses morts)
- **Comportement** : Colère sacrée +60, dénonciation publique, drain spirituel sur profanateur si possible
- **Réputation** : Animari peut s'allier à joueur qui défend tombes

### 6.6 Souffle / changement d'Ère

- **Effets paramétriques** :
  - **Noctis (Ombre Longue)** : Voie de Noctis → +30% efficacité ; activité publique accrue (Veilari)
  - **Tempora (Échos Brisés)** : Voie de Tempora → +50% (rare !) — Nécromancien Tempora vit son apogée
  - **Eldoria (Feu Endormi)** : -30% efficacité Noctis, persécution Ignitari +50%, mode dissimulation
  - **Fatum (Destins Croisés)** : Foedus Animae célèbre, sceaux multipliés
- **Templates alternatifs** : non — non-PNJ-clé (sauf si nommé Hierach Foedus Animae, alors voir Prêtre)

### 6.7 Drain offensif (Voie de Noctis offensive — karma noir)

- **Trigger** : combat actif + Voie Noctis offensive
- **Branche BT** : `BT_NPCCombat.Drain`
- **Comportement** : drain HP/Mana cible, étapes longues (cohérent canonique [[03 - Mécaniques/Métiers/Mysticisme/Nécromancien]])
- **Karma** : **noir** si appliqué à innocent ; rouge si self-defense
- **Mémoire** : `Memory.Public.NecromancerDrainedSomeone` weight 90 (très négatif sauf Foedus Animae justifié)

---

## 7. Lifecycle PNJ

- **Catégorie** : Famille de génération (rare ; persistant 1-3 par capitale Torkam/Skaldoria, 0-1 ailleurs) ou Nommé authored (1-3 par grand pays Foedus Animae)
- **Mort transient/famille** : 7 jours → successeur **uniquement en culture légitime** (Animari) ; ailleurs, métier disparait du village
- **Mort nommé authored** : permanente, side quest "Le sceau brisé" générée — héritage funéraire
- **Apprenti** (graphe §5) : 0-1 apprenti (rare — métier transmis dans famille en culture Foedus Animae)
- **Héritage** : Hierach Animari peut signer une **Lignée Funéraire Héritage**

---

## 8. Variantes culturelles + signatures PNJ

### Variantes par Voie + culture

| Voie | Religion | Culture | Karma | MBTI dominant | Cycle |
|------|----------|---------|-------|---------------|-------|
| **Voie de Spiritus chamanique** | Vael'Kurash, Foedus Animae | Alkaran, Ulinor, tribus | **vert** | INFJ, INTJ | Diurne |
| **Voie de Noctis (légitime Animari)** | Foedus Animae | Torkam, Skaldoria | **vert** local, **jaune** ailleurs | INTJ | Crépusculaire |
| **Voie de Noctis (Veilari clandestin)** | Noctari | Vytharia, Nysaria | jaune | INTJ, INTP | Nocturne (inversé) |
| **Voie de Noctis offensive** | (souvent indépendant) | No Man's Land, Avalor | **rouge à noir** | INTJ, ENTJ | Nocturne dissimulé |
| **Voie de Tempora** | Rota Mundi (rare hérétique) | partout (rare) | jaune à rouge | INTP | Diurne discret |
| **Voie de Navigor** *(quasi-disparue)* | Via Ventus relique | mythique, signature unique | vert mythique | INTJ légendaire | Variable |

### RitualPattern compatibles

- **Foedus Animae (Animari légitime)** : offrande autel 19:00 + repas avec morts mensuel + **pacte avec compagnon vivant** (parfait alignement)
- **Vael'Kurash chamanique** : offrande matinale + bois sacré (esprits ancestraux dans la nature)
- **Noctari (Veilari)** : activité dominante nocturne + méditation obscurité totale (cycle complet inversé)

### Signatures PNJ (Phase 4 stub)

- **Korash de la Cendre** (ENTJ Maître, Torkam) — Animari Foedus Animae, citation canonique du fichier source
- **Iyas le Veilleur des Cendres** (INTJ Maître, Vytharia) — Veilari clandestin Noctari (chevauche Mage de Noctis)
- **Mère Tarna aux Esprits** (INFJ Maître, Alkaran) — Vael'Kari chamane, communion ancestrale
- **L'Innommé de la Brèche** (INTJ Légende, No Man's Land) — Voie de Navigor relique, signature unique mythique
- **Hierach Voren des Pactes** (ENTJ Maître, Skaldoria) — Animari senior, candidat PNJ-clé Phase 4

---

*Liens : [[NPC Behaviors/Index|← Index]] · [[Routine Quotidienne]] · [[Modes Sociaux]] · [[Concepts Fondamentaux IA PNJ]] · [[Actions Situationnelles]] · [[03 - Mécaniques/Métiers/Mysticisme/Nécromancien|Nécromancien (archétype joueur)]] · [[Lore/Religions/Foedus Animae|Foedus Animae]] · [[Lore/Religions/Noctari|Noctari]] · [[Le Lien]] · [[Cosmologie]] · [[Mort]]*
