---
tags: [pnj, comportement, métier, architecture, chantier, lapidaire, ia, template]
type: behavior-template
métier_lié: "[[03 - Mécaniques/Métiers/Artisanat et Production/Lapidaire|Lapidaire]]"
mbti_typique: [INTP, ISTP, ISFJ]
karma_typique: vert
factions_compatibles: [Ordo Caelum (cristaux), Lex Petra (taille rituelle), Lumasar académique, Avalor royal, Mosrack libre]
catégorie_métier: Architecture chantier
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-mbti-playtest, frontière-Bijoutier-Sertisseur, frappe-ratée-gold-sink-extrême, gemmes-cosmiques]
---

# 💎 Template PNJ — Lapidaire

> Comportement situationnel d'un PNJ Lapidaire. Hérite de [[Routine Quotidienne]] et applique [[Actions Situationnelles]]. **Perfectionniste** — taille de gemme, frappe ratée détruit fortune. Triade coopérative haut tier : **Lapidaire (taille brute) → [[Bijoutier]] (conçoit) → [[Sertisseur]] (sertit)**. Métier joueur : [[03 - Mécaniques/Métiers/Artisanat et Production/Lapidaire|Lapidaire]].

---

## 1. Vue d'ensemble

Le Lapidaire transforme la **gemme brute** en **gemme taillée** : facettes, cabochons, cristaux taillés. Lit la gemme (axes optiques, inclusions, lignes faiblesse), trace plan de taille, tourne sous disque abrasif, polit. Une seule frappe ratée détruit une fortune (mécanique gold sink + tension narrative). Profil : **perfectionniste extrême, méticuleux, méditatif, silencieux**. Mode dominant Routine atelier ; rare Mode Crise.

> [!important] Triade coopérative haut tier
> - **Lapidaire (ce fichier)** = **taille brute** (transforme gemme brute → gemme taillée)
> - **[[Bijoutier]]** = **conçoit** (assemble gemme taillée + métaux en bijou)
> - **[[Sertisseur]]** = **sertit** (mise en place finale sur support — anneau, arme, couronne)
>
> Trois métiers **distincts coopératifs** sur haut tier (Maître+).

- **Identité comportementale** : artisan perfectionniste, méditatif, silencieux, tension extrême avant chaque frappe
- **Position sociale** : artisan rare et précieux (cités majeures uniquement)
- **Slot Mode Marchand** : ouvre comptoir aux clients érudits / nobles / [[Bijoutier]] / [[Sertisseur]]
- **Lien chaîne** : amont [[03 - Mécaniques/Métiers/Exploration/Mineur|Mineur]] (gemmes brutes), [[Forgeron]] (outils précision : disques, burins fins), [[Verrier]] (parfois — frontière imitation gemme verre coloré) · aval [[Bijoutier]], [[Sertisseur]], [[Architecte]]/[[Maçon]] (sertissage architectural T5-T6), [[Enchanteur d'objet]] (cristaux Voie taillés rituels), [[Astronome]] (cristaux optiques)

---

## 2. Cycle quotidien

```
07:00  Lever, méditation matinale (concentration — frappes précises imminentes)
07:30  Petit-déjeuner solitaire frugal
08:00  Examen gemmes brutes du jour (loupe, lecture inclusions — Acuité)
09:00  Tracé plan de taille (cristal par cristal, INTP réfléchit longuement)
10:00  T3 spé : taille première facette (anim 30s tour à polir, concentration extrême)
12:00  Pause méditative (15 min, repos visuel)
12:15  Reprise taille
16:00  Polissoir final (anim doux, satisfaction)
17:30  Mode Marchand (vente Bijoutier/Sertisseur)
19:00  Repas + lecture (INTP étudie textes gemmologiques)
22:00  Coucher
```

### Boucle taille canonique (T3+T5 spécialisés, perfectionniste)

```
[T1 Examen gemme brute (loupe)] (Acuité — détecte inclusions, axes)
   ↓
[T2 Tracé plan de taille] (INTP médite longuement)
   ↓
[T3 Première facette au disque diamant] (anim 30s — irréversible)
   ↓
[T4 Tournage gemme entre facettes] (anim 5s)
   ↓
[T5 Taille facettes successives] (8-58 facettes selon coupe, méditatif)
   ↓
[T6 Polissoir final] (anim 60s — satisfaction)
   ↓
[T7 Inspection finale (refus si défaut)]
```

> Voir `établi_lapidaire`, `tour_polir`, `loupe_examen`, `bac_eau`, `coffre_gemmes` pour ancres.

---

## 3. MBTI typique

| Type | Profil lapidaire | Note |
|------|------------------|------|
| **INTP** | Lapidaire-théoricien, étude des cristaux, expérimente coupes | Le défaut canonique (Lumasar, Mosrack) |
| **ISTP** | Lapidaire solitaire, virtuose technique, frappes précises | Cendara, Avalor |
| **ISFJ** | Lapidaire soigné, perfection silencieuse, refuse imperfection | Rare, service noble (Galenor) |

Modulateurs ([[Concepts Fondamentaux IA PNJ]] §6) :
- **I** (commun) : silencieux extrême, méditatif (concentration absolue)
- **T (INTP/ISTP)** : factuel, rationnel, prix justifiés
- **F (ISFJ)** : perfection comme service (refus du défaut)
- **P (INTP/ISTP)** : adapte selon gemme (chaque pierre unique)
- **J (ISFJ)** : méthode rigoureuse, refuse la précipitation
- **N (INTP)** : spéculation cosmique (gemmes cosmiques [[Lore/Religions/Ordo Caelum]]), interprétation symbolique
- **S (ISTP/ISFJ)** : sens tactile, lumière, structure cristalline

---

## 4. Triggers situationnels

| Trigger ID | Conditions | Effet immédiat |
|------------|-----------|----------------|
| **TailleStart** | `wake_time` + jour ouvré | Méditation puis examen |
| **GemmeArrivée** | [[03 - Mécaniques/Métiers/Exploration/Mineur|Mineur]] livre gemme brute | T1 examen, négociation prix |
| **PlanTracé** | Plan de taille validé mentalement | Bascule T3 (engagement irréversible) |
| **FrappeRatée** | RNG fail (frappe disque) | **Gemme détruite — perte totale** ; mood -50 (catastrophe MBTI **T**) |
| **CommandeBijoutier** | [[Bijoutier]] commande gemme taillée pour bijou | Mode Marchand variant co-craft |
| **CommandeSertisseur** | [[Sertisseur]] commande gemme pour serti | Co-craft tier élevé |
| **GemmeCosmique** | Gemme cosmique (mythique, [[Cristaux cosmiques]]) | Mode Quête exclusif (taille rituelle, [[Lore/Religions/Ordo Caelum]]) |
| **PlayerArmDrawnNearby** | Player armDégainée < 30m | Saisit boîte gemmes, fuit (priorité protection) |
| **EraSouffleBroadcast** | Nouveau Souffle | Gemmes cosmiques actives (Tempora, Eldoria) |
| **MasterworkSession** | Pièce signature en cours | **Concentration absolue** — refuse interruption (cri si dérangé) |

---

## 5. Modes superposables

| Mode | Activation | Comportement spécifique |
|------|-----------|--------------------------|
| **Routine** *(défaut)* | Atelier | Examen, taille, polissoir |
| **Marchand** | Heures vente (17h30-19h) | Présente gemmes taillées, prix très élevés justifiés |
| **Dialogue** | Client érudit ou collègue | INTP plus loquace (gemmologie), ISTP/ISFJ bref |
| **Crise** | Vol gemmes ou attaque | `Combat.Flee` priorité (sauve coffre gemmes — fortune) |
| **Festivité** | Festival local (rare car concentration) | Atténué (continue taille matinale, rejoint le soir) |
| **Religieux** | [[Lore/Religions/Ordo Caelum]] (cristaux cosmiques sacrés) ou [[Lore/Religions/Lex Petra]] (taille rituelle) | Rituel pré-taille pour gemmes spéciales |
| **Deuil** | Mort proche | Suspend taille pendant 7j (concentration impossible) |
| **Quête** | Gemme cosmique ou commande royale | Mode Quête exclusif |

Cascade priorité : Crise (vol) > Religieux (taille rituelle) > Quête > Marchand > Routine.

---

## 6. Réactions situationnelles canoniques

### 6.1 Joueur s'approche

- **Comportement** :
  - **INTP** : "Bonjour. Vous cherchez quel type de coupe ? Brillant, émeraude, cabochon ?" — peut s'animer si client érudit
  - **ISTP** : silence, montre les gemmes, attend question concrète
  - **ISFJ** : "Bienvenue. Permettez-moi de vous montrer cette taille." — chaleureux mais discret
- **Reconnaissance +75** : montre gemmes signature (Maître+), explique technique optique
- **Reconnaissance -50** : refuse vente (gemmes réservées commande prioritaire ou noble)

### 6.2 Frappe ratée — gemme perdue (gold sink extrême)

- **Trigger** : `FrappeRatée`
- **Mood** : -50 immédiat (catastrophe rationnelle MBTI **T**)
- **Comportement** :
  - **INTP** : silence prolongé, analyse cause technique (ligne faiblesse non vue)
  - **ISTP** : juron, range outils, retraite
  - **ISFJ** : larmes silencieuses (rare — extrême détresse)
- **Mémoire** : weight 100 ; vigilance future
- **Effet économique** : perte 100-10 000 Éclats selon gemme — **gold sink douce** (mécanique)

### 6.3 Mode Crise vol gemmes

- **Trigger** : tentative vol coffre / gemmes
- **Branche BT** : `Combat.Engage` direct (court-circuit P1 — fortune attaquée)
- **Comportement** : crie alarme, saisit burin (arme T1 dérisoire), résiste ; alerte voisins
- **Mémoire** : weight 100, propagation rumeur (vol grave)

### 6.4 Souffle / changement d'Ère

- **Eldoria** : gemmes plus lumineuses (réfraction accentuée), mood +10
- **Tempora** : gemmes temporellement instables — fissures imprévisibles, frappes ratées +30%
- **Ordo Caelum dominant** : cristaux cosmiques actifs — Mode Quête fréquent (rituels)
- **MBTI N (INTP)** : spéculation cosmique forte ("la gemme garde l'Ère")

### 6.5 Triade coopérative haut tier

- **Trigger** : `CommandeSertisseur` ou `CommandeBijoutier` pour pièce Maître+
- **Comportement** : co-craft session — Lapidaire taille gemme à dimensions exactes spécifiées par [[Bijoutier]] (qui conçoit) ; [[Sertisseur]] récupère pour sertissage final
- **Mémoire** : partagée triade, fierté collective
- **Effet** : pièce inscrite aux Héritages si Maître+

### 6.6 Distinction Bijoutier / Sertisseur / Lapidaire

- **Lapidaire (ce fichier)** : transforme gemme brute → gemme taillée (intermédiaire)
- **[[Bijoutier]]** : conçoit le bijou (assemble gemmes + métaux + design)
- **[[Sertisseur]]** : sertit la gemme dans son support final (anneau, arme, couronne)

---

## 7. Lifecycle PNJ

- **Catégorie** : Nommé authored prioritaire (rare — 1 par cité majeure érudite)
- **Mort transient/famille** : 21 jours (apprentissage très long) → apprenti reprend si formé
- **Mort nommé authored** : permanente, side-quest "Le tour à polir silencieux" (joueur peut tenter relance)
- **Apprenti** : 0-1 (transmission millimétrique — apprentissage 7-10 ans)
- **Héritage** : un Maître peut signer une **gemme Héritage** (gemme légendaire taillée, ex. couronne royale) inscrite aux chroniques

---

## 8. Variantes culturelles + signatures PNJ

| Nation | Style | MBTI dominant | Spécialité |
|--------|-------|---------------|------------|
| **Lumasar** (académique) | Lapidaire-théoricien, gemmologie | INTP | Coupes expérimentales, gemmes cosmiques |
| **Mosrack** (libre) | Lapidaire indépendant, contrats privés | ISTP | Coupes commerciales prestigieuses |
| **Avalor** (royal) | Lapidaire royal, frontière joaillerie | ISFJ | Couronnes, gemmes royales |
| **Cendara** ([[Lore/Religions/Ignis Aeternum]]) | Lapidaire de gemmes ignées | ISTP | Gemmes feu (rubis, grenat) |
| **Astravia** (haute) | Lapidaire céleste, [[Lore/Religions/Ordo Caelum]] | INTP | Cristaux astraux, taille rituelle |

### Signatures PNJ (Phase 4 stub)

- **Maître Solvane le Précis** (INTP Maître-Légende, Lumasar) — taille du Cristal des Onze Étoiles
- **Maître Aldric** (ISTP Maître, Mosrack) — coupe brillant signature "Mosrack 58 facettes"
- **Sœur Yulia** (ISFJ Maître, Avalor) — gemme de la Couronne Royale
- **Branneck le Cosmique** (INTP Maître, Astravia) — cristaux astraux Ordo Caelum

---

*Liens : [[Comportements PNJ - Index|← Index]] · [[Routine Quotidienne]] · [[Modes Sociaux]] · [[Concepts Fondamentaux IA PNJ]] · [[Actions Situationnelles]] · [[03 - Mécaniques/Métiers/Artisanat et Production/Lapidaire|Lapidaire (gameplay)]] · [[Bijoutier]] · [[Sertisseur]] · [[03 - Mécaniques/Métiers/Exploration/Mineur|Mineur]] · [[Verrier]] · [[Forgeron]] · [[Enchanteur d'objet]] · [[Astronome]] · [[Architecte]] · [[Architecture/Index]]*
