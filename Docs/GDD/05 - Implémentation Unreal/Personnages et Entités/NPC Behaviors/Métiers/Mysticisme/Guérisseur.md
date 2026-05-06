---
tags: [pnj, comportement, métier, guérisseur, mysticisme, soin, ia, template]
type: template-pnj-metier
status: drafted
last_review: 2026-05-01
métier_lié: "[[03 - Mécaniques/Métiers/Mysticisme/Guérisseur]]"
mbti_typique: [ISFJ, INFJ, ENFJ]
karma_typique: vert
voie_magique_principale: Eldoria | Spiritus | Aurion (rare)
religion_compatible: [Ignis Aeternum, Vael Kurash, Foedus Animae, Ordo Caelum]
factions_compatibles: [Ignis Aeternum, Vael Kurash, Cercles de Voie d'Eldoria, Foedus Animae]
template_alternatif_souffle: false
ritual_pattern_religion: [RP_IGNIS_AETERNUM, RP_VAEL_KURASH, RP_FOEDUS_ANIMAE]
needs_review_for: [calibration-playtest, frontière-médecin]
---

# 💚 Template PNJ — Guérisseur

> Comportement situationnel d'un PNJ Guérisseur. Hérite de [[Routine Quotidienne]] et applique [[Actions Situationnelles]]. **Spécialise les routines autour du soin mystique** (Voie d'Eldoria ou Spiritus). Métier joueur correspondant : [[03 - Mécaniques/Métiers/Mysticisme/Guérisseur|Guérisseur]].
>
> **Particularité Mysticisme** : le Guérisseur Voie d'Eldoria est le **seul archétype capable de ressusciter** (cf. [[Mort]] §Résurrection par allié, fenêtre 30s). Cette capacité fait du Guérisseur d'Eldoria un **rôle de groupe critique** en raid et exploration dangereuse, et donne à son PNJ une **priorité absolue Mode Crise** (soin avant fuite, voire avant défense).

---

## 1. Vue d'ensemble

Le Guérisseur est le **soigneur mystique** d'Hybelior. Là où le [[Médecin]] (M4 Érudition) répare le corps par anatomie/herbes/instruments, le Guérisseur **rétablit** par canalisation magique — il rappelle au corps son état antérieur à la blessure, ferme les plaies par lumière pure, expulse venins par invocation de la nature.

- **Identité comportementale** : altruiste-empathique (F dominant), MBTI majoritaires Feeling, calme face au sang, devoir de soin transcendant
- **Position sociale** : très respecté (équivalent Prêtre en charisme moral) ; refuge de village, présence constante en infirmerie
- **Slot Mode Marchand** : présent (potions, baumes, encens) mais secondaire — service de soin >> commerce
- **Lien chaîne** : amont [[03 - Mécaniques/Métiers/Mysticisme/Herboriste|Herboriste]] (plantes médicinales) / [[03 - Mécaniques/Métiers/Mysticisme/Apothicaire|Apothicaire]] (remèdes) / [[03 - Mécaniques/Métiers/Mysticisme/Prêtre|Prêtre]] (eau bénite) · aval blessés, aventuriers, mourants

---

## 2. Cycle quotidien

```
05:30  Lever, prière/méditation Voie (Eldoria = lumière, Spiritus = nature)
06:00  Entretien du Lien (45 min — léger vs Mage)
06:45  Petit-déjeuner
07:00  Ouverture infirmerie / sanctuaire / bosquet sacré
07:00-12:00  Consultations matinales (blessures, fièvres, accouchements)
12:00  Repas léger
12:30  Tournée à domicile (visite malades alités au village)
15:00  Retour infirmerie + préparation onguents/encens
17:00  Consultations soir (urgences)
19:00  Office religieux selon religion (cf §8 RitualPattern)
20:00  Repas, méditation
21:30  Coucher (mais réveil possible pour urgence vitale)
```

### Boucle de soin canonique (T2-T6 spécialisés)

```
[T1 Patient se présente]
   ↓
[T2 Diagnostic — Conscience perception aura]
   ↓
[T3 Choix sort selon Voie + sévérité]
   ↓
[T4 Canalisation rituelle (5-30s combat / 1-5min hors combat)]
   ↓
[T5 VFX selon Voie (lumière Eldoria / sève Spiritus)]
   ↓
[T6 Ablution / encens de finition (rituel ?)]
```

> Voir `infirmerie`, `sanctuaire_eldoria`, `bosquet_sacre`, `source_sacree` pour ancres spatiales.

---

## 3. MBTI typique

| Type | Profil Guérisseur | Note |
|------|-------------------|------|
| **ISFJ** | Guérisseur communautaire, présent à toute urgence, mémoire des familles | Profil dominant — défenseur protecteur |
| **INFJ** | Guérisseur contemplatif-mystique, idéal Voie de Spiritus, bosquet sacré | Profil rare-précieux |
| **ENFJ** | Guérisseur charismatique, mentor d'apprentis, voix forte en raid | Profil leader bienveillant |

Modulateurs ([[Concepts Fondamentaux IA PNJ]] §6) :
- **F** (commun aux 3) : empathie ×1.5, ressent émotionnellement la souffrance, refuse de quitter blessé
- **J (ISFJ/INFJ)** : routine de tournée stricte, mémoire des cas, suivi long-terme
- **N (INFJ/ENFJ)** : interprétation symbolique des blessures (lecture spirituelle)
- **S (ISFJ)** : focus pratique, concret, mémoire des plantes et des doses
- **I (ISFJ/INFJ)** : présence calme, voix douce
- **E (ENFJ)** : commande équipe d'urgence, voix forte en triage

---

## 4. Triggers situationnels

> Format canonique [[Actions Situationnelles]] §4.

| Trigger ID | Conditions | Effet immédiat |
|------------|-----------|----------------|
| **WoundedNearby** | Acteur tag `World.Wounded` < 30m | Court-circuit P2 → `Help.Heal` (priorité absolue) |
| **PlayerNearDeath** | Joueur HP critique + Voie d'Eldoria du PNJ | Court-circuit P0 → **rituel de résurrection** (fenêtre 30s) |
| **AllyDied** | PNJ allié vient de mourir + Voie Eldoria | Tente résurrection si fenêtre 30s ouverte |
| **PlagueOutbreak** | `Memory.Public.Plague` village | Mode Crise sanitaire — tournée intensifiée |
| **CombatNearby** | Combat <50m | **Reste sur place pour soigner** (vs fuite — courageux par devoir) |
| **PoisonedAlly** | Allié tag `Status.Poisoned` <20m | `Help.Cure` priorité, expulse venin |
| **BabyBornInVillage** | Naissance détectée | Bénédiction/soin nouveau-né (Spiritus particulièrement) |
| **EraSouffleBroadcast** | Nouveau Souffle | Modulation paramétrique : Eldoria → +20% efficacité, Noctis → -10% |
| **RitualHourReligion** | Heure rituel religion compatible | Suspend consultations 5-15 min pour office |

---

## 5. Modes superposables

| Mode | Activation | Comportement spécifique |
|------|-----------|--------------------------|
| **Routine** *(défaut)* | Consultations / tournée / préparation onguents | Cycle de soin |
| **Marchand** | Joueur achète onguent / encens | Vente accessoire (priorise soin gratuit aux pauvres — F) |
| **Dialogue** | Patient sollicite consultation | Ton apaisant, voix douce ; INFJ = lecture aura ; ISFJ = mémoire familiale |
| **Crise** | Combat, raid, blessés multiples | **Reste, soigne** ; pas de fuite (devoir de soin) |
| **Festivité** | Festival local | Reste disponible (urgences possibles), participation modérée |
| **Religieux** | Rituel selon religion (Ignis Aeternum, Vael'Kurash) | Office au temple/bosquet, bénédiction collective |
| **Deuil** | Mort proche ou patient perdu | Auto-blâme bref (F), méditation, présence aux funérailles |
| **Quête** | Donneur quête (chercher plante rare, sauver malade lointain) | Continue routine + dialogue spécifique |

Cascade Guérisseur : **Crise (soin priorité absolue) > Religieux > Deuil > Marchand > Routine**.

---

## 6. Réactions situationnelles canoniques

### 6.1 Joueur vient se faire soigner

- **Trigger** : Joueur HP < 100% + < 5m + infirmerie ouverte
- **Branche BT** : `ModeSocial.HealingConsultation`
- **Comportement** :
  - ISFJ : "Asseyez-vous, montrez-moi cette plaie."
  - INFJ : "Votre blessure n'est pas que physique. Que portez-vous ?"
  - ENFJ : "Vous avez bien fait de venir. Restez calme, je m'en occupe."
- **Prix** : modulé Reconnaissance × F (–20% si pauvre / désespoir authentique) ; refuse marchandage rigide
- **Soin** : `Esprit × Résonance × Maîtrise_Voie × Maîtrise_Soin` (cf [[03 - Mécaniques/Métiers/Mysticisme/Guérisseur]])

### 6.2 Mode Crise — soin priorité absolue

- **Trigger** : `WoundedNearby` OU `RaidOnVillage` OU `CombatNearby`
- **Branche BT** : `Help.Heal` priorité absolue (P0 court-circuit)
- **Comportement Voie d'Eldoria** :
  - Bouclier de lumière sur allié, soin direct, **résurrection** (fenêtre 30s post-mort)
  - Reste exposé pour soigner — **F+J devoir transcende Peur**
- **Comportement Voie de Spiritus** :
  - HoT (Heal over Time) sur plusieurs alliés, invocation animal-guérisseur
  - Préfère couverture forêt/plaine (bonus Spiritus)
- **Mood** : `Peur +20` mais saturation rare (devoir suspend Peur seuil) ; `Colere +10` si patient meurt par négligence joueur
- **Mémoire** : `Memory.Public.HealerSavedAlly` weight 80 (renommée locale)

### 6.3 Résurrection (Voie d'Eldoria uniquement)

- **Trigger** : `AllyDied` ou `PlayerNearDeath` + fenêtre 30s + Voie Eldoria + Mana suffisant
- **Branche BT** : `BTTask_Resurrect` (sous-arbre dédié)
- **Coût** : Mana max consommé, cooldown 1h gameplay
- **Comportement** : se précipite vers cadavre, lance rituel de résurrection (5-15s incantation)
- **Réussite** : VFX lumière intense, allié relevé HP minimum
- **Échec si fenêtre dépassée** : mood -30, deuil bref ; F = larmes rituelles

### 6.4 Épidémie locale (Plague Outbreak)

- **Trigger** : `PlagueOutbreak`
- **Branche BT** : Mode Crise sanitaire
- **Comportement** :
  - Tournée intensifiée (visite tous foyers infectés)
  - Préparation massive d'onguents/potions Anti-Maladie
  - Collab [[03 - Mécaniques/Métiers/Mysticisme/Apothicaire|Apothicaire]] (intrants) et [[Médecin]] (M4) si présent
  - Spiritus = invoque vent purificateur ; Eldoria = lumière purificatrice de masse
- **Risque** : peut tomber malade lui-même (mémoire individuelle weight 100)

### 6.5 Souffle / changement d'Ère

- **Trigger** : `EraSouffleBroadcast`
- **Effets paramétriques** :
  - **Eldoria (Feu Endormi)** : Voie d'Eldoria → +30% efficacité résurrection ; mood +20
  - **Noctis (Ombre Longue)** : Voie d'Eldoria → -20% efficacité, fatigue +5/s ; Spiritus stable
  - **Tempora (Échos Brisés)** : 10% chance soin instable (HoT erratique)
  - **Spiritus alignement** (Verdoiement) : Voie de Spiritus → +30%, dialogue plante-allié actif
- **Templates alternatifs** : non — le Guérisseur reste Guérisseur (non PNJ-clé)

### 6.6 Funérailles d'un patient perdu

- **Trigger** : décès d'un patient récemment soigné
- **Branche BT** : Mode Deuil léger 3-5j, présence aux funérailles
- **Comportement** : F = auto-blâme bref puis acceptation rituelle ; INFJ = méditation longue
- **Mémoire individuelle** : `PatientLost.<id>` weight 70

---

## 7. Lifecycle PNJ

> [[Concepts Fondamentaux IA PNJ]] §9 + §18.

- **Catégorie** : Famille de génération (persistant, ~1-3 par village) ou Nommé authored (1-2 par capitale, "Sœur/Frère X")
- **Mort transient/famille** : 7 jours → successeur (apprenti devient Guérisseur ; rituel de transmission Voie pour Eldoria/Spiritus)
- **Mort nommé authored** : permanente, side quest "Le sanctuaire silencieux" générée
- **Apprenti** (graphe §5) : 0-2 apprentis selon `mastery_level`
- **Héritage** : un Guérisseur-Maître nommé peut signer un **Recueil de soins Héritage**

---

## 8. Variantes culturelles + signatures PNJ

### Variantes par Voie principale

| Voie | Religion | MBTI dominant | Cycle | Spécialité |
|------|----------|---------------|-------|------------|
| **Voie d'Eldoria** | Ignis Aeternum | ISFJ, INFJ | Diurne strict | **Résurrection** (canonique [[Mort]]), bouclier lumière |
| **Voie de Spiritus** | Vael'Kurash | INFJ, INFP | Diurne, près nature | HoT, animal-guérisseur, communication patient via plantes |
| **Voie d'Aquor** | mineure (Onara) | INFJ | Près de l'eau | Régen Stamina + soin léger, sanctuaires Foedus Animae côtiers |
| **Voie d'Aurion** | Somnium Vigil | INTP rare | Académique | Soin arcanique pur, académies Vytharia/Lumasar |

### RitualPattern compatibles (selon religion)

- **Ignis Aeternum** : prière à l'aube + tabou pluie (cf [[Métiers - Forgeron]] et §8 Prêtre)
- **Vael'Kurash** : offrande matinale à l'esprit local + visite bois sacré 1×/sem
- **Foedus Animae** : offrande quotidienne à l'autel familial 19:00 + pacte avec compagnon
- **Ordo Caelum** : prière midi + nuit (rare, si Guérisseur Voie de Celestia — académique)

### Signatures PNJ (Phase 4 stub)

- **Sœur Aurelia** (ISFJ Maître, Cendara) — Voie d'Eldoria, Ignitari ; citation canonique du fichier source
- **Frère Olwyn-Plante** (INFJ Maître, Alkaran) — Voie de Spiritus, Vael'Kari, dialogue avec arbres anciens
- **Mère Tirshara la Doyenne** (ISFJ Maître, Alkaran) — chevauche Herboriste-Guérisseur Vael'Kari (cf citation [[03 - Mécaniques/Métiers/Mysticisme/Herboriste|Herboriste]])
- **Sœur Imna des Onsens** (INFJ Adepte, Onara) — Voie d'Aquor, Foedus Animae côtier

---

*Liens : [[Comportements PNJ - Index|← Index]] · [[Routine Quotidienne]] · [[Modes Sociaux]] · [[Concepts Fondamentaux IA PNJ]] · [[Actions Situationnelles]] · [[03 - Mécaniques/Métiers/Mysticisme/Guérisseur|Guérisseur (archétype joueur)]] · [[Mort]] · [[Le Lien]] · [[Cosmologie]] · [[Médecin]]*
