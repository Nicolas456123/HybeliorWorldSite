---
tags: [pnj, comportement, métier, exploration, mercenaire, ia, template]
type: behavior-template
métier_lié: "[[03 - Mécaniques/Métiers/Exploration/Mercenaire|Mercenaire]]"
mbti_typique: [ISTP, ESTP, ISTJ]
karma_typique: variable (vert à rouge selon contrats)
factions_compatibles: [Mosrack libre, Galenor mercenaires officiels, Pyrtara bandes, Concordants L'Accord, neutres]
catégorie_métier: Exploration
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-mbti-playtest, distinction-Soldat-Chasseur-de-primes, karma-variable-contrats]
---

# ⚔️ Template PNJ — Mercenaire

> Comportement situationnel d'un PNJ Mercenaire. Hérite de [[Routine Quotidienne]] et applique [[Actions Situationnelles]]. **Combat à la demande**. Karma **variable**. Distinct [[03 - Mécaniques/Métiers/Sécurité/Soldat|Soldat]] (allégeance État) et [[03 - Mécaniques/Métiers/Exploration/Chasseur de primes|Chasseur de primes]] (cible spécifique). Métier joueur : [[03 - Mécaniques/Métiers/Exploration/Mercenaire|Mercenaire]].

---

## 1. Vue d'ensemble

Le Mercenaire est le **combattant à la demande**. Vend service martial : escorte caravane, défense village, attaque fort, garde du corps, renfort guerre de faction. Profil : **physique, pragmatique, opportuniste, mobile**. Mode dominant **Itinérant** (~60% du temps en route ou campagne) ; reste en ville pour recrutement et repos. Bascule **Mode Crise = combat actif** (sa spécialité — pas une crise mais une performance).

> [!warning] Karma variable
> Le Mercenaire peut servir cause juste OU criminelle. Un Mercenaire ascendant peut accumuler réputation propre, un autre peut basculer rouge ([[PvP]] §Karma) selon contrats. **`era_modulation: false`** — besoin constant à travers les Ères.

- **Identité comportementale** : combattant pragmatique, souple moralement, fier de la lame
- **Position sociale** : ambivalent — utile mais craint (peut servir qui paie le mieux)
- **Slot Mode Marchand** : non-vendeur — **réception paiement contrat** ; vente trophées/butin secondaire
- **Lien chaîne** : amont [[Forgeron]] (armes, armures), [[Apothicaire]] (potions de combat), [[Tailleur]]/[[Tanneur]] (vêtements campagne) · aval employeurs (seigneurs, marchands, guildes), joueurs aventuriers

---

## 2. Cycle quotidien

### Cycle ville (entre contrats, ~30-40% du temps)

```
07:00  Lever, entretien matériel (anim affûte_lame, polit_armure)
08:00  Petit-déjeuner taverne — réseau social, écoute rumeurs contrats
09:00  Bureau de recrutement / quartier général de compagnie
11:00  Entraînement combat (Maîtrise d'arme — INTJ rare, ISTJ rigoureux)
13:00  Déjeuner taverne (ESTP brille — raconte campagnes)
15:00  Préparation matériel (sac campagne, rations)
17:00  Mode Marchand inverse — vente butin/trophées de précédent contrat
19:00  Repas + jeu de cartes ou taverne (ESTP) ou solitaire (ISTP/ISTJ)
22:00  Coucher
```

### Cycle campagne (sous-mode Itinérant, dominant)

Voyage avec employeur (caravane, troupe) — campement avec employeur, combat selon nécessité, retour ville quand contrat terminé.

> Voir `merc_camp`, `bivouac_campagne`, `compagnie_QG`, `taverne_recrutement`, `champ_bataille_temp` pour ancres.

---

## 3. MBTI typique

| Type | Profil mercenaire | Note |
|------|-------------------|------|
| **ISTP** | Mercenaire solitaire, virtuose technique, peu loquace | Le défaut canonique (Mosrack, Onara) |
| **ESTP** | Mercenaire flamboyant, bagarre frontale, raconteur | Pyrtara, frontière hors-la-loi |
| **ISTJ** | Mercenaire de compagnie, méthode militaire, code interne strict | Galenor compagnie officielle |

Modulateurs ([[Concepts Fondamentaux IA PNJ]] §6) :
- **T** (commun) : factuel, négociation contrat ferme, peu d'empathie
- **S** (commun) : action directe, peu de spéculation
- **J (ISTJ)** : code interne strict, refuse contrats borderline
- **P (ISTP/ESTP)** : adaptable, accepte plus large
- **I vs E** : ISTP/ISTJ silencieux ; ESTP exhibitionniste (taverne, raconte exploits)

---

## 4. Triggers situationnels

| Trigger ID | Conditions | Effet immédiat |
|------------|-----------|----------------|
| **ContractAccepted** | Nouveau contrat signé | Bascule sous-mode `Itinérant` (départ campagne) |
| **CombatEngaged** | Combat actif (employeur attaqué ou attaque planifiée) | Bascule **Mode Crise = combat performance** |
| **EmployerOrder** | Ordre direct employeur | Suit ordre selon code MBTI |
| **ContractEthicallyDubious** | Contrat criminel (assassinat civil, pillage) | Évaluation MBTI (J refuse, P évalue) |
| **PaymentReceived** | Paiement contrat complet | Mood +30, retour ville |
| **PaymentBroken** | Employeur refuse de payer | Mood -50, vendetta possible (P0 escalade) |
| **PlayerArmDrawnNearby** | Player armDégainée | Vigilant, dégaine arme prête |
| **ConflictWithSoldat** | Affrontement avec [[03 - Mécaniques/Métiers/Sécurité/Soldat|Soldat]] | Combat tactique (rivalité technique) |
| **CompagnonInjured** | Mercenaire allié blessé | Soin si Apothicaire connaissances ; venger si Maître/ISTJ |

---

## 5. Modes superposables

| Mode | Activation | Comportement spécifique |
|------|-----------|--------------------------|
| **Routine** *(défaut)* | Ville ou campement | Entretien, entraînement, négociation |
| **Itinérant** | Campagne active | Voyage avec employeur, campement, garde |
| **Marchand** | Vente butin/trophées (rare) | Négocie ; **réception paiement** principal |
| **Dialogue** | Recrutement, négociation contrat | Direct, ferme, parfois intimidant |
| **Crise** | **Combat actif = performance** | `Combat.Engage` (sa spécialité) |
| **Festivité** | Festival local ou victoire militaire | ESTP brille, ISTP discret, ISTJ formel |
| **Religieux** | Variable selon individu — peu de Mercenaires fervents ; certains Lex Petra (loyauté contrat) ou Foedus Animae (pacte) | Atténué |
| **Quête** | Donneur de quête fréquent (mission militaire, escorte) | Continue routine + dialogue |

Cascade priorité : Crise (combat) > Itinérant > Routine.

### 5.bis Sous-mode Itinérant (campagne mercenaire)

- **Pas de domicile fixe** durant 1-12 semaines de contrat
- **Cycle adapté** : réveil 05:30, marche/garde, combat selon ordre, sommeil tactique
- **MBTI J (ISTJ)** : itinéraire **planifié** par employeur, méthode rigoureuse
- **MBTI P (ISTP/ESTP)** : adapte selon situation, opportunité de pillage si faible scrupule
- **Compagnons** : compagnie entière (5-50 mercenaires) ou solitaire selon contrat

---

## 6. Réactions situationnelles canoniques

### 6.1 Joueur s'approche

- **Comportement** :
  - **ISTP** : silence, hoche la tête, attend question concrète
  - **ESTP** : "Vous cherchez une lame ? Mon prix est juste. Pour un travail honorable ou pas, je m'en fous."
  - **ISTJ** : "Compagnie [Nom]. Tarifs affichés. Refusons assassinat civil."
- **Reconnaissance +75** : propose **partenariat** (joueur peut embaucher mercenaire pour expédition)
- **Reconnaissance -50** : refuse contrat (méfiance)

### 6.2 Mode Crise combat (= performance)

- **Trigger** : `CombatEngaged`
- **Branche BT** : `Combat.Engage` (sa spécialité)
- **Comportement** :
  - **ISTP** : combat virtuose, frappes calculées, esquives
  - **ESTP** : bagarre frontale, prend risques, charge
  - **ISTJ** : tactique militaire, formation, discipline
- **Mood** : `Colere +30` (focus combat), `Peur +5` (basse)
- **Lien [[03 - Mécaniques/Métiers/Sécurité/Soldat|Soldat]]** : tactique similaire, mais Mercenaire individualiste

### 6.3 Évaluation contrat éthiquement douteux

- **Trigger** : `ContractEthicallyDubious`
- **Comportement** :
  - **ISTJ** : **refuse** souvent (code interne — "compagnie ne fait pas ça")
  - **ISTP** : évalue rationnellement (risque/bénéfice)
  - **ESTP** : accepte si paiement haut, glissement vers gris/rouge possible
- **Karma** : décisions influent karma cumulatif — Mercenaire peut basculer rouge

### 6.4 Paiement rompu

- **Trigger** : `PaymentBroken`
- **Mood** : -50, `Colere +60`
- **Comportement** :
  - **ISTP** : vendetta froide, traque l'employeur frauduleux
  - **ESTP** : explosion immédiate (combat sur place)
  - **ISTJ** : signale à compagnie, action légale ou collective
- **Mémoire** : weight 100, propagation rumeur (réputation employeur ruinée)

### 6.5 Souffle / changement d'Ère

- **`era_modulation: false`** — besoin de mercenaires constant
- **Effets indirects** : guerres déclenchées par certaines Ères (Ignis = guerre de feu) → demande accrue, prix +30%

### 6.6 Distinction stricte avec Soldat / Chasseur de primes / Garde

- **vs [[03 - Mécaniques/Métiers/Sécurité/Soldat|Soldat]]** : Soldat sert **un État** (drapeau permanent) — Mercenaire **indépendant** (employeur tournant)
- **vs [[03 - Mécaniques/Métiers/Exploration/Chasseur de primes|Chasseur de primes]]** : Chasseur de primes a **cible nommée spécifique** — Mercenaire fait **tout combat à la demande**
- **vs [[03 - Mécaniques/Métiers/Sécurité/Garde|Garde]]** : Garde **statique** (lieu/personne, contrat institutionnel) — Mercenaire **mobile**

---

## 7. Lifecycle PNJ

- **Catégorie** : Famille de génération (compagnies pérennes) ou Nommé authored (3-7 par grande nation)
- **Mort transient/famille** : 7 jours → camarade reprend (compagnies stables)
- **Mort nommé authored** : permanente, side-quest "Vengeance pour [Nom]" possible
- **Apprenti** : compagnies en forment plusieurs (cycle court — Mercenaire jeune au combat)
- **Héritage** : un Maître peut être lié à une **bataille signature** (victoire ou exploit) inscrite aux chroniques

---

## 8. Variantes culturelles + signatures PNJ

| Nation | Style | MBTI dominant | Spécialité |
|--------|-------|---------------|------------|
| **Mosrack** (Compagnies libres) | Compagnies structurées, contrats officiels | ISTJ | Sièges, batailles rangées |
| **Galenor** (impérial mercenaires officiels) | Mercenaires sous tutelle, code semi-militaire | ISTJ | Renforts armée impériale |
| **Onara** (cavaliers nomades) | Lances pour louer | ISTP | Cavalerie, escorte plaines |
| **Pyrtara** (bandes) | Frontière brigandage, contrats borderline | ESTP | Pillage déguisé |
| **L'Accord** (Concordés) | Élite militaire de l'Ère, ≥ 50% Accord | ISTP | Élite, combats rituels d'Ère |

### Signatures PNJ (Phase 4 stub)

- **Capitaine Erevin** (ISTJ Maître, Mosrack) — fondateur de la Compagnie de la Lance Noire
- **Brask le Sanglant** (ESTP Maître, Pyrtara) — chef de bande, karma rouge clair
- **Tarek Cavalier-Vent** (ISTP Maître, Onara) — lance solitaire des plaines
- **Maître Solvane** (ISTP Maître-Légende, L'Accord) — Concordé Élite

---

*Liens : [[NPC Behaviors/Index|← Index]] · [[Routine Quotidienne]] · [[Modes Sociaux]] · [[Concepts Fondamentaux IA PNJ]] · [[Actions Situationnelles]] · [[03 - Mécaniques/Métiers/Exploration/Mercenaire|Mercenaire (gameplay)]] · [[03 - Mécaniques/Métiers/Sécurité/Soldat|Soldat]] · [[03 - Mécaniques/Métiers/Sécurité/Chevalier|Chevalier]] · [[03 - Mécaniques/Métiers/Sécurité/Garde|Garde]] · [[03 - Mécaniques/Métiers/Exploration/Chasseur de primes|Chasseur de primes]] · [[03 - Mécaniques/Métiers/Sécurité/Espion|Espion]] · [[PvP]]*
