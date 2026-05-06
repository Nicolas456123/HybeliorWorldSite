---
tags: [implementation, combat, balance, gameplay, ue5]
status: drafted
last_review: 2026-05-07
needs_review_for: [posture-poise, anim-cancel, friendly-fire, valeurs-playtest]
type: implementation
canonical_concept: "[[Combat]]"
---

# Combat System — Implémentation

> Page d'implémentation technique du concept narratif **[[Combat]]**.
> Cette page contient les **chiffres, formules, fenêtres de timing, coûts, cooldowns et règles de balance**.
> Pour la philosophie, l'intention de design et la voix in-world : voir [[Combat]].
>
> Pour la couche GAS / Blueprint (Abilities, Effects, Tags concrets) : voir [[Index Combat]], [[Abilities Combat]], [[Effects Combat]], [[Combo System]], [[Hit Boxes]].

---

## Style général

- Combat **hybride** : action en temps réel + barre de compétences avec cooldowns.
- Référence de feel : **New World / Black Desert Online**.
- Visée libre par défaut, lock-on optionnel.

---

## Ressources de combat

Deux ressources principales, lecture immédiate à l'écran :

- **Stamina** → toute action physique (attaques, parade, esquive, sprint, compétences d'arme).
- **Mana** → toute compétence de Voie (voir [[Lien System]]).

Pas d'autres barres. Stats canoniques utilisées : voir [[Personnage]] (8 stats brutes Couche 1 : Vigueur, Vivacité, Endurance, Acuité, Esprit, Résonance, Mémoire, Verbe).

### Pool de Stamina

Formule canonique : `Stamina max = Souffle (couche 0) + Endurance (couche 1) × 2`.

| Élément | Valeur |
|---|---|
| Base (Souffle fondamental seul, sans usage) | ~100 pts |
| + par point d'Endurance | +2 pts |
| + par point de Vigueur | +0.5 pt |
| Pool max théorique (Endurance 100, Vigueur élevée, Souffle élevé) | ~350-450 pts |
| Bonus armure légère | +5 à +10% |
| Malus armure lourde | −10 à −20% |

### Pool de Mana

Formule canonique : `Mana max = Conscience (couche 0) + Esprit (couche 1) × 2` (si Voie active).

| Élément | Valeur |
|---|---|
| Base si Voie active | Conscience fondamentale + 50 pts (à la première liaison) |
| + par point d'Esprit | +2 pts |
| + par point de Résonance | +1 pt |
| Pool max théorique (Esprit 100, Résonance élevée) | ~400-550 pts |
| Sans Voie active | Pool = 0, barre invisible |

---

## Coûts détaillés par action

> **Lecture du tableau**
> - **Coût base** : sans aucun bonus, à la maîtrise minimum.
> - **Réduction par maîtrise** : appliquée à chaque palier de maîtrise (5 paliers — voir [[Armes et Maîtrise]]).
> - **Réduction par stat** : Vivacité réduit les actions vives, Vigueur réduit les actions de poussée, Esprit/Résonance réduisent les sorts.
> - **Plancher** : coût minimum atteignable, jamais en dessous.

### Stamina — actions de base

| Action | Coût base | Réduc. maîtrise | Réduc. stat | Plancher |
|---|---|---|---|---|
| Attaque légère | 8 pts | −0.5 pt / palier | −1% / 10 Vivacité | 4 pts |
| Attaque lourde | 25 pts | −1.5 pt / palier | −1% / 10 Vigueur | 12 pts |
| Combo finisseur (3e+ coup) | 12 pts | −1 pt / palier | −1% / 10 Vivacité | 5 pts |
| Esquive (roulade) | 20 pts | — | −1% / 10 Vivacité, plafonné −30% | 14 pts |
| Esquive 2e consécutive | +25% | — | — | — |
| Esquive 3e consécutive | +50% | — | — | — |
| Parade tenue | 10 pts/s drain | −1 pt/s / palier (bouclier) | — | 5 pts/s |
| Parade parfaite | 0 pt | — | — | 0 pt |
| Absorption sur parade | 30% des dégâts | −5% / palier | — | 5% |
| Guard break (offensif) | 35 pts | −2 pt / palier | −1% / 10 Vigueur | 18 pts |
| Sprint hors combat | 15 pts/s | — | −1% / 10 Endurance | 8 pts/s |
| Sprint en combat | 25 pts/s | — | −1% / 10 Endurance | 15 pts/s |
| Saut | 5 pts | — | — | 5 pts |
| Saut + attaque | 30 pts | −2 pt / palier | — | 18 pts |

### Stamina — compétences d'arme (par tier)

| Tier de compétence | Coût Stamina base | Cooldown | Plancher (à maîtrise max) |
|---|---|---|---|
| Basique (déblocable niv 2 maîtrise) | 30 pts | 5 s | 18 pts |
| Avancée (niv 3) | 50 pts | 12 s | 30 pts |
| Experte (niv 4) | 80 pts | 25 s | 48 pts |
| Signature / Maître (niv 5 🔒) | 150 pts | 90 s | 90 pts |

### Mana — sorts de Voie (par tier)

| Tier de sort | Coût Mana base | Temps incantation | Cooldown | Plancher (à Esprit/Résonance max) |
|---|---|---|---|---|
| Mineur (palier 1) | 25 pts | 0.4 s | 4 s | 15 pts |
| Standard (palier 2) | 60 pts | 1.0 s | 12 s | 35 pts |
| Majeur (palier 3) | 120 pts | 2.0 s | 30 s | 70 pts |
| Apex (palier 4) | 200 pts | 3.5 s | 60 s | 120 pts |
| Lien profond (palier 5 🔒) | 350 pts | 5.0 s | 240 s | 220 pts |

### Compétences universelles (Stamina)

| Compétence | Coût | Cooldown |
|---|---|---|
| Cri de guerre (taunt zone) | 40 pts | 25 s |
| Méditation (regen Mana hors combat) | 0 pt — drain Stamina passif | toggle |
| Premiers soins (heal léger hors combat) | 30 pts | 30 s |
| Effort (sprint long, ignore plafond stamina 3 s) | 100 pts upfront | 60 s |

---

## Régénération

### Stamina

| Contexte | Régen base | Modificateur Endurance |
|---|---|---|
| Hors combat, immobile | 80 pts/s | +0.5 pt/s par 10 Endurance |
| Hors combat, en marche | 60 pts/s | idem |
| En combat | 15 pts/s | +0.3 pt/s par 10 Endurance |
| Stamina à 0 (épuisement) | Pause forcée 1 s + barre clignote | — |
| Repos en auberge | +50 pts/s temporaire | Pendant 10 s après s'être assis |

### Mana

| Contexte | Régen base | Modificateur Esprit / Résonance |
|---|---|---|
| Hors combat, immobile | 5 pts/s | +0.5 pt/s par 10 Esprit |
| Hors combat, en marche | 3 pts/s | idem |
| En combat | 1 pt/s | +0.1 pt/s par 10 Esprit |
| Méditation active (touche F maintenue) | +10 pts/s en plus | Cumulable avec Esprit + Résonance |
| Potions de Mana | Burst direct | Cooldown propre |

---

## Plafonds & courbes de progression

> **Toutes les réductions ont un plancher**
> Aucune action ne peut descendre **en dessous de 50% de son coût base**, quel que soit le cumul des bonus. C'est ce qui empêche les builds dégénérés où on spamme à l'infini.

| Mécanique | Cumul max possible | Plancher |
|---|---|---|
| Réduction coût Stamina | −50% | 50% du coût base |
| Réduction coût Mana | −50% | 50% du coût base |
| Réduction cooldown | −30% | 70% du CD base |
| Vitesse d'attaque | +40% | 140% de la vitesse base |
| Vitesse de déplacement | +25% (hors monture) | 125% |
| Régen HP en combat | 3% HP/s | (Vigueur très haute uniquement) |

---

## Régénération HP en combat

Entièrement déterminée par la **Vigueur** et le statut "en combat" → voir [[Personnage]].

| Contexte | Effet |
|---|---|
| Hors combat (5 s sans dégât) | Régen rapide |
| En combat | Régen quasi nulle sauf Vigueur élevée |
| Potions et nourriture | S'ajoutent toujours, en combat comme hors combat |

---

## Mécaniques fondamentales — résumé chiffré

| Mécanique | Coût Stamina | Comportement clé |
|---|---|---|
| Attaque légère | ~8 pts | Rapide, faible dégât, s'enchaîne en combo |
| Attaque lourde | ~25 pts | Lente, dégâts élevés, peut briser une garde |
| Combo (3e attaque) | gratuit (issu du combo) | Ouvre un finisseur après 3 légères |
| Esquive | ~20 pts | Roulade avec IFrames, 4 directions |
| Parade tenue | drain ~10 pts/s | Réduit les dégâts (50%) tant que la touche est tenue |
| Parade parfaite | 0 pt | Annulation totale + stagger attaquant |
| Guard break | 35 pts | Stamina défenseur à 0 en bloquant → ouverture forcée |
| Hit reaction | — | Stagger / knockback selon intensité du coup |
| Hit stop | — | Légère pause sur les coups impactants (feedback) |
| Sprint | drain ~15 pts/s | Course rapide hors combat |

> **Stamina à 0** : le personnage ne peut plus attaquer ni esquiver jusqu'à régénération minimale (20 pts). Il peut encore se déplacer normalement et bloquer (mais subit les dégâts complets). Force des choix tactiques.

---

## Fenêtres de timing

| Action | Durée | Intention de design |
|---|---|---|
| Fenêtre de combo entre 2 attaques légères | **0.6 s** | Assez large pour être lisible, assez courte pour exiger du rythme |
| Parade parfaite | **0.20 s** (12 frames @60 fps) | Récompense la lecture sans être un QTE pixel-perfect |
| IFrames d'esquive | **0.40 s** au début, **0.55 s** à haute Vivacité | Récompense l'investissement en Vivacité |
| Récupération esquive | **0.30 s** | Empêche le spam-roulade |
| Stagger léger | **0.5 s** | Sur attaque lourde non parée |
| Stagger lourd / knockback | **1.5 s + animation de relevage** | Sur finisseur de combo ou compétence dédiée |
| Hit-stop | **80 ms** | Feedback sans casser le rythme |
| Cooldown d'esquive consécutive | 2e = +25% stamina, 3e = +50% | Limite l'abus |
| Sortie de combat | **5 s** sans dégât donné/reçu | Active la régen HP/Stamina rapide |

> Implémentation des fenêtres concrètes côté GAS : voir [[Combo System]] (`Combat.Combo.Window.*`), [[Abilities Combat]] (Dodge `delay_i_frame_application`, IFrames durée), [[Hit Boxes]] (DataTable hitboxes frame-par-frame).

---

## Ciblage

- **Défaut** : visée libre avec la caméra (style action pur).
- **Touche dédiée** : verrouillage sur l'ennemi le plus proche.
- Les compétences de la barre ciblent automatiquement la cible verrouillée si elle existe.
- **Switch de cible** : input directionnel + touche modifier (changer de cible sans relâcher le lock).

---

## Barre de compétences

**6 à 8 emplacements actifs.** Les compétences disponibles viennent de :

- La maîtrise de l'arme équipée — voir [[Armes et Maîtrise]] / [[Weapon Mastery]].
- La progression en Lien (Voie unique du joueur) — voir [[Le Lien]] / [[Lien System]].
- Des compétences universelles (cri de guerre, taunt, méditation, etc.).

**Cooldowns par tranche** :

| Tranche | Cooldown |
|---|---|
| Compétence basique | 4–8 s |
| Compétence forte | 15–30 s |
| Ultime / signature | 60–180 s |

Un même slot peut être réassigné à tout moment hors combat.

---

## Réactions élémentaires

Certaines compétences de Voie déclenchent des **réactions élémentaires** quand combinées avec celle d'un allié.

Pour le détail des combinaisons, multiplicateurs de dégâts, états infligés (gel, brûlure, électrification, etc.) et la table complète : voir [[Elemental Reactions]] et [[Effects Elemental States]] (côté implémentation), ainsi que [[Le Lien]] (côté narratif).

---

## Combat de groupe

- Les rôles émergent **naturellement** (tank, soin, DPS) — pas assignés.
- Les boss ont des **phases distinctes** avec comportements spécifiques.
- Coordination nécessaire pour les contenus de haut rang.
- Pas de threat-meter explicite : la cible se choisit selon proximité, dommages infligés, taunts actifs.

---

## IA ennemie

| Type | Comportement clé |
|---|---|
| Créature sauvage | Territoire, chasse en groupe, comportements sociaux, adaptation au joueur |
| Ennemi humanoïde | Anticipe, parade, esquive, tactiques de groupe, encerclement |
| Boss | Phases multiples, compétences ultimes, exploite les faiblesses des joueurs |
| PNJ allié | Complémentaire au joueur, suit les directives, s'adapte |

---

## Flux de combat type

```
[Approche / Verrouillage si voulu]
     ↓
[Attaque légère × 3]  →  [Finisseur de combo]
     ↓
[Compétence active si ouverture]      [Esquive si telegraph ennemi]
     ↓                                       ↓
[Parade parfaite si lecture]    →    [Stagger ennemi → ouverture]
     ↓
[Repositionnement / Recovery stamina]
```

---

## Modulation par Ère

Le combat est coloré par l'Ère cosmologique en cours (voir [[Le Souffle]], [[Les Ères]]).

| Effet | Détail | Source |
|---|---|---|
| Bonus/malus Voie selon Ère | +25% sem 1 / +10% reste si Voie dominante ; −20% si Voie opposée | [[Souffle System]] |
| Rouille Maîtrise post-Souffle | Dégâts −15%, vitesse arme −10%, durée incantation +15% pendant ~1 sem | [[Souffle System]] |
| Mana max compressé | Seuil 50, facteur 0.7 (Petit Souffle) | [[Souffle System]] |
| Items haut tier post-Souffle | −10% stats pendant 2 sem (Magistral, Légendaire) | [[Souffle System]] |

---

## Décisions ouvertes (à trancher)

- [ ] **Système de "posture" / poise** (façon Sekiro) — barre secondaire qui se brise et expose ?
  - **Pour** : profondeur tactique, lisibilité, récompense la parade.
  - **Contre** : alourdit le HUD, complexifie l'apprentissage.
- [ ] **Friendly fire** dans les compétences de zone PvE ? Et en PvP avec flag ?
- [ ] **Animation canceling** autorisé ou non (et lequel) — gros impact skill ceiling.
- [ ] **Esquive consomme Stamina** ou utilise une **ressource dédiée** (jauge d'esquive style Elden Ring) ?
- [ ] **Critiques** : feedback visuel/sonore distinct + zoom léger ?
- [ ] **Compétences universelles ouvertes à tous** — liste exhaustive à figer (taunt, cri de guerre, sprint combat, méditation).

---

## Points de calibrage à playtester

- [ ] Coût attaque lourde 25 pts — friction perçue comme tactique ou comme punitive ?
- [ ] Fenêtre parade parfaite 0.20 s — trop punitif ? trop indulgent ?
- [ ] IFrames esquive 0.40 s base / 0.55 s à haute Vivacité — courbe de récompense lisible ?
- [ ] Cooldowns ultimes 60–180 s — assez rares pour rester signature, assez fréquents pour rester utiles ?
- [ ] Stamina à 0 = pause forcée 1 s — punition perçue comme juste ou frustrante ?
- [ ] Régen Mana en combat 1 pt/s — Liés se sentent-ils à sec trop vite ?

---

## Décisions actées

- ✅ Deux ressources : Stamina (physique) + Mana (Voie).
- ✅ Plancher 50% du coût base sur toute action, quel que soit le build.
- ✅ Visée libre par défaut, lock-on optionnel.
- ✅ Barre 6-8 slots, réassignable hors combat.
- ✅ Sortie de combat : 5 s sans dégât donné/reçu.
- ✅ Fenêtre parade parfaite : 0.20 s.
- ✅ IFrames esquive : 0.40 s → 0.55 s selon Vivacité.
- ✅ Cooldown ultime : 60–180 s.
- ✅ Pas de niveau global ; pools dépendent des stats brutes (montent par usage), accès items via [[L'Accord]].

---

## Dépendances système

| Composant | Rôle dans le combat |
|---|---|
| [[Ability System Component]] | Routeur d'input, exécuteur des Gameplay Abilities |
| [[Gameplay Ability]] | Classe de base de toutes les abilities combat |
| [[Combat Attribute Set]] | 15 attributs (Health/Mana/Stamina + stats combat) |
| [[Combo System]] | Fenêtres de combo (`Combat.Combo.Window.*`) |
| [[Effects Combat]] | GE de dégâts, ReadyToFight, Blocking, etc. |
| [[Hit Boxes]] | DataTable hitboxes frame-par-frame |
| [[Movesets]] | Catalogues d'animations par arme |
| [[Weapon Mastery]] | Paliers de maîtrise et déblocages |
| [[Lien System]] | Sorts de Voie (Mana, incantation, cooldowns) |
| [[Elemental Reactions]] | Synergies élémentaires entre joueurs |
| [[Souffle System]] | Compression / rouille / bonus Voie selon Ère |

---

*Liens narratifs : [[Combat]] | [[Le Lien]] | [[Armes et Maîtrise]] | [[Mort]] | [[Personnage]] | [[L'Accord]]*
*Liens techniques : [[Index Combat]] | [[Abilities Combat]] | [[Effects Combat]] | [[Combo System]] | [[Hit Boxes]] | [[Lien System]] | [[Souffle System]]*
