---
tags: [pnj, comportement, métier, mage, mysticisme, ia, template]
type: template-pnj-metier
status: drafted
last_review: 2026-05-01
métier_lié: "[[03 - Mécaniques/Métiers/Mysticisme/Mage]]"
mbti_typique: [INTJ, INTP, INFJ]
karma_typique: variable
voie_magique_principale: variable (1 Lien mono-Voie parmi 13)
religion_compatible: [variable selon Voie]
factions_compatibles: [Conclave d'Astravia, Cercles de Voie locaux, Académies magiques]
template_alternatif_souffle: false
ritual_pattern_religion: [variable selon religion]
needs_review_for: [calibration-playtest, signatures-par-voie-phase4]
---

# 🔮 Template PNJ — Mage

> Comportement situationnel d'un PNJ Mage. Hérite de [[Routine Quotidienne]] et applique [[Actions Situationnelles]]. Spécialise les routines avec **l'entretien du Lien mono-Voie**, base structurelle de tous les métiers magiques. Métier joueur correspondant : [[03 - Mécaniques/Métiers/Mysticisme/Mage|Mage]].
>
> **Particularité Mysticisme** : la **Voie active** définit toute la coloration du PNJ. Un Mage de Noctis et un Mage d'Eldoria partagent ce template mais divergent radicalement en mood baseline, religion compatible, fenêtre horaire d'activité, et tabous comportementaux.

---

## 1. Vue d'ensemble

Le Mage est l'**archétype magique générique** — un Lié mono-Voie ([[Le Lien]]) qui canalise une force cosmique via un Lien forgé avec un Éternel ou un Cosmique. Son identité comportementale se cristallise autour de **l'entretien quotidien du Lien** (1-2h/jour), pratique non négociable sans laquelle la Maîtrise de Voie décroît.

- **Identité comportementale** : intellectuel-contemplatif, MBTI fortement Intuitif (N) dominant, obsédé par sa Voie, tolérant aux imprévus seulement quand ils touchent au cosmique
- **Position sociale** : respecté mais distant ; le Mage de capitale (Astravia, Lumasar) tient une posture académique ; le Mage de campagne est plus mystérieux
- **Slot Mode Marchand** : ponctuel — vend services magiques (rupture de malédiction, scellement, divination mineure) plutôt que stock fixe
- **Lien chaîne** : amont [[Herboriste]] (composantes Spiritus/Eldoria) / [[Apothicaire]] (encres rares) / [[Alchimiste]] (essences distillées) · aval joueurs liés/curieux, [[Enchanteur d'objet]] (collab inscription), [[Enchanteur du vivant]] (Spiritus/Aurion)

---

## 2. Cycle quotidien

```
06:30  Lever, méditation pré-Lien (variable selon Voie)
07:00  Entretien du Lien (1-2h) — pratique mono-Voie obligatoire
09:00  Étude / consultation tomes / inscription parchemins
12:30  Repas léger, souvent solitaire (I) ou avec apprenti (mentor §5)
13:00  Cabinet / pupitre — réception clients, services magiques rituels
17:00  Promenade contemplative ou rituel mineur de Voie
19:00  Repas, souvent en compagnie d'autres Liés ou seul
20:00  Étude tardive (Mage Noctis : inversion, voir variantes §8)
22:00  Coucher
```

### Boucle d'entretien du Lien (T2-T3 spécialisés)

```
[T1 Réveil + méditation préparatoire (Conscience)]
   ↓
[T2 Aller au Cercle d'enchantement / Sanctuaire de Voie]
   ↓
[T3 Canalisation rituelle 60-120 min] → VFX selon Voie (lumière Eldoria, ombre Noctis, etc.)
   ↓
[T4 Inscription d'un sort dans tome / parchemin] (optionnel)
   ↓
[T5 Retour cabinet — disponible pour clients / étude]
```

> Voir `cercle_enchantement`, `sanctuaire_voie`, `pupitre_mage`, `lieu_cosmique` pour ancres spatiales (Phase 3 layout).

---

## 3. MBTI typique

| Type | Profil Mage | Note |
|------|-------------|------|
| **INTJ** | Mage stratège, Maître à plan long, peu de clients mais quêtes complexes | Profil dominant — Mage architecte |
| **INTP** | Mage théoricien, recherche pure, bibliothèques d'Astravia, Voie d'Aurion fréquente | Profil idéal pour PNJ astronomes/oracles ([[Prédiction]]) |
| **INFJ** | Mage contemplatif, INFJ Foedus Animae ou Vael'Kurash, Voie de Spiritus / Fatum | Mage prophétique-empathique |

Modulateurs ([[Concepts Fondamentaux IA PNJ]] §6) :
- **N** (commun aux 3) : `fréquence_spéculation +40`, `intérêt_ères +30` — le Mage **commente le Souffle** systématiquement
- **I** (commun) : Mode Festivité = observation depuis le bord, dialogues brefs et profonds
- **T (INTJ/INTP)** : analyse rationnelle des signes cosmiques, prix services rigides
- **F (INFJ)** : empathie envers clients en détresse (rupture de malédiction gratuite si désespoir authentique)
- **J (INTJ/INFJ)** : rituel d'entretien du Lien strict, décalage horaire interdit
- **P (INTP)** : entretien du Lien plus libre, exploration spontanée

---

## 4. Triggers situationnels

> Format canonique [[Actions Situationnelles]] §4.

| Trigger ID | Conditions | Effet immédiat |
|------------|-----------|----------------|
| **LinkMaintenanceStart** | `wake_time + 30min` | Bascule rituel Lien (priorité Utility +40) |
| **LinkMaintenanceSkipped** | rituel non effectué > 24h | `Maîtrise_Voie -1`, mood -15 (anxiété), force rituel d'urgence |
| **CrisisSpellRequest** | Joueur en danger sollicite directement | Bascule Mode Crise (lancement sort selon Voie) — voir §6.2 |
| **CosmicPhenomenonDetected** | `Era.Dimension.TensionCosmique = Critique` + Voie alignée | Mage **N** → spéculation publique, Utility `Routine.Pray` +50 |
| **EraSouffleBroadcast** | Nouveau Souffle | Recalcul `mood_baseline_delta` Voie ; Mage Eldoria → Joy +20, Mage Noctis → Joy -10 |
| **TabooItemPresent** | Item taboué selon Voie/Religion < 5m | Refus de canaliser, mood -20 (Lex Petra item temporel par exemple) |
| **AllyCorrupted** | Allié vu sous influence Voie opposée | Combat.Aggressive si Voie d'Eldoria ; observation si Noctis |
| **LinkRupture** | Quête ou choix → rupture de Lien | Mood -50, état "désorienté" 3 jours, refus de canaliser |

---

## 5. Modes superposables

> [[Actions Situationnelles]] §3 catalogue 8 modes. Pour le Mage :

| Mode | Activation | Comportement spécifique |
|------|-----------|--------------------------|
| **Routine** *(défaut)* | Étude / cabinet / entretien Lien | Cycle Voie + clients ponctuels |
| **Marchand** | Joueur sollicite service magique payant | Service rituel (rupture malédiction, divination mineure) ; prix élevés (T) |
| **Dialogue** | Initiation joueur ou collègue Mage | Dense, références cosmiques, jargon de Voie ; INFJ = empathique |
| **Crise** | ThreatLevel ≥ 50, raid, attaque directe | **Lancement sort selon Voie** (cf §6.2), pas de combat physique |
| **Festivité** | Festival local | Faible engagement (I), célèbre uniquement rituels alignés Voie |
| **Religieux** | Rituel sacré religion compatible | Suspend Étude, participe rituel collectif (Mage-Lié rare) |
| **Deuil** | Mort proche détectée (graphe §5) | Lien suspendu 7j, qualité Maîtrise -1 ; rituel funéraire de Voie |
| **Quête** | Donneur quête (rituel à amener / item rare à récupérer) | Continue routine + dialogue spécifique au joueur cible |

Cascade priorité : Crise > Religieux (sabbat strict si Lié) > Deuil > Marchand > Routine.

---

## 6. Réactions situationnelles canoniques

### 6.1 Joueur sollicite service magique

- **Trigger** : Joueur < 10m + cabinet ouvert + payement potentiel
- **Branche BT** : `ModeSocial.StandardGreet` puis `ModeSocial.MagicalConsultation`
- **Comportement** :
  - INTJ : "Quel est votre besoin ? Je n'ai pas de temps pour les indécis."
  - INTP : "Intéressant... Décrivez-moi exactement le phénomène."
  - INFJ : "Asseyez-vous. Respirez. Ce que vous portez pèse — laissez-moi voir."
- **Prix** : services rituels chers (10-200 Éclats selon tier), T = peu de marge négociation

### 6.2 Mode Crise — Lancement sort selon Voie

- **Trigger** : `ThreatLevel ≥ 50` OU `AllyDirectlyAttacked` OU `CrisisSpellRequest`
- **Branche BT** : `BT_NPCCombat.MagicCast` (sous-arbre dédié Mage)
- **Comportement par Voie principale** :

| Voie | Sort canonique | Profil combat |
|------|---------------|---------------|
| **Eldoria** | Bouclier de lumière, soin allié, destruction morts-vivants | Défensif/soutien |
| **Noctis** | Drain spirituel, terreur, ombre | Offensif/contrôle |
| **Aerion** | Tempête, repoussée par vent | Zone/déplacement |
| **Terranu** | Mur de pierre, projectile minéral | Défensif/contrôle |
| **Aquor** | Glace, courant, soin léger | Polyvalent |
| **Spiritus** | Invocation animal-guérisseur, soin HoT | Soutien nature |
| **Aurion** | Projection arcanique, bouclier mana | Offensif pur |
| **Fatum** | Malédiction mineure, altération probabilités | Subtil/long terme |
| **Tempora** | Ralentissement, vision passé | Contrôle/info |
| **Umbra** | Illusions, furtivité | Évasion |
| **Somnix** | Endormissement, illusion mentale | Contrôle mental |
| **Celestia** | Vue à distance, protection à distance | Soutien tactique |
| **Navigor** | (quasi-disparu) — passage des âmes | Très rare, signature |

- **MBTI** : INTJ choisit le sort optimal ; INTP teste une combinaison non-canonique ; INFJ priorise la protection des innocents
- **Mood** : `Colere +20`, `Peur +15` ; baseline N analyse > Peur

### 6.3 Phénomène cosmique (Brume Mortelle, Échos Brisés, Vent Pourpre)

- **Trigger** : `CosmicPhenomenonDetected`
- **Branche BT** : `Routine.Pray` ou `Combat.Hide` selon alignement Voie
- **Comportement** :
  - Voie alignée (ex. Mage Noctis pendant Brume Mortelle) : **observation rituelle**, dialogues prophétiques publics
  - Voie opposée (ex. Mage Eldoria pendant Brume) : **rituel défensif**, protection collective
- **Mémoire village** : `Memory.Public.MagePredictedPhenomenon` weight 70 si prédit avant
- **Mood** : `Peur +20` chez F (INFJ), `Joy +10` chez N alignée (fascination)

### 6.4 Souffle / changement d'Ère

- **Trigger** : `EraSouffleBroadcast`
- **Effets paramétriques** (§5.5.1) :
  - **Eldoria (Feu Endormi)** : Mage Eldoria → +30% efficacité Lien ; Mage Noctis → -20%, mood -15
  - **Noctis (Ombre Longue)** : Mage Noctis → +30% efficacité ; Mage Eldoria → -20%
  - **Tempora (Échos Brisés)** : tous Mages → instabilité, sorts ratés 10% chance ; Mage Tempora → +50% (rare)
  - **Fatum (Destins Croisés)** : Mage Fatum → +30% précision divination
- **MBTI N** (commun) : longues spéculations publiques, théorie sur le sens du Souffle
- **Templates alternatifs** : non — le Mage standard ne change pas de template ; **seul le Prêtre senior et l'Oracle** ont des templates alternatifs (cf. §17 D-PNJ-AUTHORING)

### 6.5 Rupture du Lien

- **Trigger** : `LinkRupture` (volontaire pour changer de Voie, ou involontaire par pénalité narrative)
- **Effets** :
  - Mood -50, état "désorienté" 3 jours
  - Maîtrise de Voie tombe à 0
  - 100 pts Labeur ([[Le Lien]] §Rupture)
- **Comportement** : reclus, refus de clients, méditation prolongée
- **Mémoire village** : `Memory.Public.MageBrokeLink` weight 50

---

## 7. Lifecycle PNJ

> [[Concepts Fondamentaux IA PNJ]] §9 + §18.

- **Catégorie** : Famille de génération (persistant, ~200-500 par grand pays) ou Nommé authored (1-3 par capitale magique)
- **Mort transient/famille** : 7 jours gameplay → successeur narratif (apprenti hérite parfois de la Voie via rituel funéraire)
- **Mort nommé authored** : permanente, side quest "Le Lien rompu" générée, transmission du Tome de Voie
- **Apprenti** (graphe §5) : 0-2 apprentis selon `mastery_level` (Adepte+) ; sous-PNJ avec entretien Lien partiel
- **Héritage** : un Mage-Maître nommé peut signer un **Tome Héritage** (sort canonique inscrit aux chroniques)

---

## 8. Variantes culturelles + signatures PNJ

### Variantes par Voie principale

| Voie | Religion | MBTI dominant | Cycle horaire | Karma |
|------|----------|---------------|---------------|-------|
| **Eldoria** | Ignis Aeternum | INFJ, INTJ | Diurne strict (06:30-22:00) | vert |
| **Noctis** | Noctari | INTJ, INTP | **Inversé** (sommeil journée, activité nuit) | jaune (rouge si offensif) |
| **Spiritus** | Vael'Kurash | INFJ, INFP | Diurne, aligné soleil | vert |
| **Aurion** | Somnium Vigil | INTP | Diurne souple | vert |
| **Fatum** | Foedus Animae | INFJ | Diurne, rituel crépuscule | jaune |
| **Tempora** | Rota Mundi | INTJ | Diurne, mais ponctuel échos passés | jaune |
| **Terranu** | Lex Petra | INTJ, ISTJ rare | Diurne, sédentaire stricte | vert |
| **Aerion** | Via Ventus | ENFP rare, INTP | Variable, mobile | vert |
| **Aquor** | mineure (Onara) | INFJ, INFP | Diurne, près de l'eau | vert |
| **Umbra** | Noctari | INTJ | Crépusculaire | jaune |
| **Somnix** | Somnium Vigil | INFJ, INFP | Crépusculaire/onirique | jaune |
| **Celestia** | Ordo Caelum | INTP | Nocturne (étoiles) | vert |
| **Navigor** | Via Ventus | INTJ légendaire | Disparu, signature unique | vert mythique |

### Signatures PNJ (Phase 4 stub)

- **Veylar de l'Aurion** (INTP Maître, Astravia) — citation canonique du fichier source
- **Maître Olbar Sève-Ancienne** (INFJ Maître, Alkaran) — Voie de Spiritus, Vael'Kari (chevauche Enchanteur du vivant)
- **Iyas le Veilleur des Cendres** (INTJ Maître, Vytharia) — Voie de Noctis, Veilari clandestin
- **Sœur Lyrena** (INFJ Maître, Lumasar) — Voie de Somnix, Vigili onirique
- **Korash le Sans-Lien** (INTP Adepte, Astravia) — Mage académique non-religieux

---

*Liens : [[Comportements PNJ - Index|← Index]] · [[Routine Quotidienne]] · [[Modes Sociaux]] · [[Concepts Fondamentaux IA PNJ]] · [[Actions Situationnelles]] · [[03 - Mécaniques/Métiers/Mysticisme/Mage|Mage (archétype joueur)]] · [[Le Lien]] · [[Cosmologie]] · [[Lore/Religions/00 - Système Religieux|Système Religieux]] · [[Tome]] · [[Anneau]]*
