---
tags: [mécanique, combat, gameplay]
type: mechanic
status: drafted
last_review: 2026-05-01
needs_review_for: [posture-poise, anim-cancel, friendly-fire]
---

# ⚔️ Système de Combat

## Style général

> [!important]
> Combat **hybride** : action en temps réel + barre de compétences avec cooldowns.
> Style : **New World / Black Desert Online**

---

## Ressources de combat

> [!note] Deux ressources, lecture immédiate
> - **Stamina** → toute action physique (attaques, parade, esquive, sprint, compétences d'arme)
> - **Mana** → toute compétence de Voie ([[Le Lien|magie]])
>
> Pas d'autres barres. Voir [[Personnage]].

### Pool de Stamina

> Formule canonique : `Stamina max = Souffle (couche 0) + Endurance (couche 1) × 2` — voir [[Personnage]].

| Élément | Valeur (proposée) |
|---------|-------------------|
| **Base** (Souffle fondamental seul, sans usage) | ~100 pts |
| **+ par point d'Endurance** (couche 1, monte par usage) | +2 pts |
| **+ par point de Vigueur** (encaissement) | +0.5 pt |
| **Pool max théorique** (Endurance 100, Vigueur élevée, Souffle élevé) | ~350-450 pts |
| **Bonus armure légère** | +5 à +10% |
| **Malus armure lourde** | −10 à −20% |

### Pool de Mana

> Formule canonique : `Mana max = Conscience (couche 0) + Esprit (couche 1) × 2` (si Voie active) — voir [[Personnage]].

| Élément | Valeur (proposée) |
|---------|-------------------|
| **Base si Voie active** | Conscience fondamentale + 50 pts (à la première liaison) |
| **+ par point d'Esprit** (couche 1) | +2 pts |
| **+ par point de Résonance** (intensité) | +1 pt |
| **Pool max théorique** (Esprit 100, Résonance élevée) | ~400-550 pts |
| **Sans Voie active** | Pool = 0, barre invisible |

---

## Coûts détaillés par action

> [!info] Stats canoniques
> Le combat utilise les **8 stats brutes canoniques** (Couche 1) : Vigueur, Vivacité, Endurance, Acuité, Esprit, Résonance, Mémoire, Verbe — voir [[Personnage]]. Les anciennes stats Force / Agilité / Constitution / Volonté ont été remplacées (mapping : Force → Vigueur, Agilité → Vivacité, Constitution → Vigueur (HP) + Endurance (Stamina), Volonté → Esprit + Résonance).
> Il n'y a **plus de niveau global** : les pools dépendent des stats brutes (montent par usage) et l'accès aux items dépend de l'**Accord** (voir [[L'Accord]]).

> [!note] Lecture du tableau
> - **Coût base** : sans aucun bonus, à la maîtrise minimum
> - **Réduction par maîtrise** : appliquée à chaque palier de maîtrise (5 paliers — voir [[Armes et Maîtrise]])
> - **Réduction par stat** : **Vivacité** réduit les actions vives, **Vigueur** réduit les actions de poussée, **Esprit / Résonance** réduisent le coût des sorts (voir [[Personnage]] pour les 8 stats brutes canoniques)
> - **Plancher** : coût minimum atteignable, jamais en dessous

### Stamina — actions de base

| Action | Coût base | Réduc. maîtrise | Réduc. stat | Plancher |
|--------|-----------|-----------------|-------------|----------|
| **Attaque légère** | 8 pts | −0.5 pt / palier | −1% / 10 Vivacité | 4 pts |
| **Attaque lourde** | 25 pts | −1.5 pt / palier | −1% / 10 Vigueur | 12 pts |
| **Combo finisseur** (3e+ coup) | 12 pts | −1 pt / palier | −1% / 10 Vivacité | 5 pts |
| **Esquive** (roulade) | 20 pts | — | −1% / 10 Vivacité, plafonné −30% | 14 pts |
| **Esquive 2e consécutive** | +25% | — | — | — |
| **Esquive 3e consécutive** | +50% | — | — | — |
| **Parade tenue** | 10 pts/s drain | −1 pt/s / palier (bouclier) | — | 5 pts/s |
| **Parade parfaite** | 0 pt | — | — | 0 pt |
| **Absorption sur parade** | 30% des dégâts | −5% / palier | — | 5% |
| **Guard break (offensif)** | 35 pts | −2 pt / palier | −1% / 10 Vigueur | 18 pts |
| **Sprint hors combat** | 15 pts/s | — | −1% / 10 Endurance | 8 pts/s |
| **Sprint en combat** | 25 pts/s | — | −1% / 10 Endurance | 15 pts/s |
| **Saut** | 5 pts | — | — | 5 pts |
| **Saut + attaque** | 30 pts | −2 pt / palier | — | 18 pts |

### Stamina — compétences d'arme (par tier)

| Tier de compétence | Coût Stamina base | Cooldown | Plancher (à maîtrise max) |
|--------------------|-------------------|----------|--------------------------|
| **Basique** (déblocable niv 2 maîtrise) | 30 pts | 5 s | 18 pts |
| **Avancée** (niv 3) | 50 pts | 12 s | 30 pts |
| **Experte** (niv 4) | 80 pts | 25 s | 48 pts |
| **Signature / Maître** (niv 5 🔒) | 150 pts | 90 s | 90 pts |

### Mana — sorts de Voie (par tier)

| Tier de sort | Coût Mana base | Temps incantation | Cooldown | Plancher (à Esprit/Résonance max) |
|--------------|----------------|-------------------|----------|-----------------------------------|
| **Mineur** (palier 1) | 25 pts | 0.4 s | 4 s | 15 pts |
| **Standard** (palier 2) | 60 pts | 1.0 s | 12 s | 35 pts |
| **Majeur** (palier 3) | 120 pts | 2.0 s | 30 s | 70 pts |
| **Apex** (palier 4) | 200 pts | 3.5 s | 60 s | 120 pts |
| **Lien profond** (palier 5 🔒) | 350 pts | 5.0 s | 240 s | 220 pts |

> [!tip] Compétences universelles (Stamina)
> Hors compétences d'arme, certaines actions universelles existent :
>
> | Compétence | Coût | Cooldown |
> |---|---|---|
> | **Cri de guerre** (taunt zone) | 40 pts | 25 s |
> | **Méditation** (regen Mana hors combat) | 0 pt — drain Stamina passif | toggle |
> | **Premiers soins** (heal léger hors combat) | 30 pts | 30 s |
> | **Effort** (sprint long, ignore plafond stamina 3 s) | 100 pts upfront | 60 s |

---

## Régénération chiffrée

### Stamina

| Contexte | Régen base | Modificateur Endurance |
|----------|-----------|------------------------|
| **Hors combat, immobile** | 80 pts/s | +0.5 pt/s par 10 Endurance |
| **Hors combat, en marche** | 60 pts/s | idem |
| **En combat** | 15 pts/s | +0.3 pt/s par 10 Endurance |
| **Stamina à 0 (épuisement)** | Pause forcée 1 s + barre clignote | — |
| **Repos en auberge** | +50 pts/s temporaire | Pendant 10 s après s'être assis |

### Mana

| Contexte | Régen base | Modificateur Esprit / Résonance |
|----------|-----------|---------------------------------|
| **Hors combat, immobile** | 5 pts/s | +0.5 pt/s par 10 Esprit |
| **Hors combat, en marche** | 3 pts/s | idem |
| **En combat** | 1 pt/s | +0.1 pt/s par 10 Esprit |
| **Méditation active** (touche F maintenue) | +10 pts/s en plus | Cumulable avec Esprit + Résonance |
| **Potions de Mana** | Burst direct | Cooldown propre |

---

## Plafonds & courbes de progression

> [!important] Toutes les réductions ont un plancher
> Aucune action ne peut descendre **en dessous de 50% de son coût base**, quel que soit le cumul des bonus. C'est ce qui empêche les builds dégénérés où on spamme à l'infini.

| Mécanique | Cumul max possible | Plancher |
|-----------|--------------------|----------|
| Réduction coût Stamina | −50% | 50% du coût base |
| Réduction coût Mana | −50% | 50% du coût base |
| Réduction cooldown | −30% | 70% du CD base |
| Vitesse d'attaque | +40% | 140% de la vitesse base |
| Vitesse de déplacement | +25% (hors monture) | 125% |
| Régen HP en combat | 3% HP/s | (Vigueur très haute uniquement) |

---

## Mécaniques fondamentales

| Mécanique | Description | Coût Stamina (proposé) |
|-----------|-------------|------------------------|
| ⚡ **Attaque légère** | Rapide, faible dégât, s'enchaîne en combo | ~8 pts |
| 💥 **Attaque lourde** | Lente, dégâts élevés, peut briser une garde | ~25 pts |
| 🔗 **Combo** | Enchaîner 3 attaques légères ouvre un finisseur | gratuit (issu du combo) |
| 🏃 **Esquive** | Roulade avec IFrames, 4 directions | ~20 pts |
| 🛡️ **Parade tenue** | Réduit les dégâts (50%) tant que la touche est tenue | drain ~10 pts/s + coût absorption |
| ✨ **Parade parfaite** | Fenêtre courte → annulation totale + stagger attaquant | 0 pts (récompense le timing) |
| 💢 **Guard break** | Stamina défenseur à 0 en bloquant → ouverture forcée | — |
| 😵 **Hit reaction** | Coups puissants = stagger / knockback selon intensité | — |
| ⏸️ **Hit stop** | Légère pause sur les coups impactants (feedback) | — |
| 🏃‍♂️ **Sprint** | Course rapide hors combat | drain ~15 pts/s |

> [!tip] Stamina à 0
> Le personnage **ne peut plus attaquer ni esquiver** jusqu'à régénération minimale (20 pts). Il peut encore se déplacer normalement et bloquer (mais subit dégâts complets). Force des choix tactiques.

---

## Fenêtres de timing — proposition de chiffres

> [!note] Valeurs à valider en playtest

| Action | Durée | Intention de design |
|--------|-------|--------------------|
| **Fenêtre de combo** entre 2 attaques légères | **0.6 s** | Assez large pour être lisible, assez courte pour exiger du rythme |
| **Parade parfaite** | **0.20 s** (12 frames @60 fps) | Récompense la lecture sans être un QTE pixel-perfect |
| **IFrames d'esquive** | **0.40 s** au début, **0.55 s** à haute Vivacité | Récompense l'investissement en Vivacité |
| **Récupération esquive** | **0.30 s** | Empêche le spam-roulade |
| **Stagger léger** | **0.5 s** | Sur attaque lourde non parée |
| **Stagger lourd / knockback** | **1.5 s + animation de relevage** | Sur finisseur de combo ou compétence dédiée |
| **Hit-stop** | **80 ms** | Feedback sans casser le rythme |
| **Cooldown d'esquive consécutive** | 2e esquive = +25% stamina, 3e = +50% | Limite l'abus |
| **Sortie de combat** | **5 s** sans dégât donné/reçu | Active la régen HP/Stamina rapide |

---

## Ciblage

> [!tip] Lock-on optionnel
> - **Défaut** : visée libre avec la caméra (style action pur)
> - **Touche dédiée** : verrouillage sur l'ennemi le plus proche
> - Les compétences de la barre ciblent automatiquement la cible verrouillée si elle existe
> - **Switch de cible** : input directionnel + touche modifier (changer de cible sans relâcher le lock)

---

## Barre de compétences

**6 à 8 emplacements actifs.** Les compétences disponibles viennent de :
- La [[Armes et Maîtrise|maîtrise de l'arme équipée]]
- La progression en [[Le Lien|Lien]] (Voie unique du joueur)
- Des compétences universelles (cri de guerre, taunt, méditation, etc.)

> [!note] Cooldowns
> Tranches proposées :
> - **Compétence basique** : 4–8 s
> - **Compétence forte** : 15–30 s
> - **Ultime / signature** : 60–180 s
> Un même slot peut être réassigné à tout moment hors combat.

---

## Régénération HP en combat

Entièrement déterminée par la **Vigueur** (anciennement Constitution) et le statut "en combat" → [[Personnage]]

> [!important] Règle simple
> - **Hors combat** (5 s sans dégât) → régen rapide
> - **En combat** → régen quasi nulle sauf Vigueur élevée
> - Les **potions** et la **nourriture** s'ajoutent toujours, en combat comme hors combat

---

## Combat de groupe

- Les rôles émergent **naturellement** (tank, soin, DPS) — pas assignés
- Les boss ont des **phases distinctes** avec comportements spécifiques
- Coordination nécessaire pour les contenus de haut rang

> [!tip] Synergies de Voies
> Certaines compétences de Voie déclenchent des **réactions élémentaires** quand combinées avec celle d'un allié → voir [[Le Lien]].

---

## IA ennemie

| Type | Comportement clé |
|------|-----------------|
| 🐺 **Créature sauvage** | Territoire, chasse en groupe, comportements sociaux, adaptation au joueur |
| ⚔️ **Ennemi humanoïde** | Anticipe, parade, esquive, tactiques de groupe, encerclement |
| 👑 **Boss** | Phases multiples, compétences ultimes, exploite les faiblesses des joueurs |
| 🤝 **PNJ allié** | Complémentaire au joueur, suit les directives, s'adapte |

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

## Propositions ouvertes pour discussion

> [!todo] Décisions à trancher
> 1. **Système de "posture" / poise** (façon Sekiro) — barre secondaire qui se brise et expose ?
>    - **Pour** : profondeur tactique, lisibilité, récompense la parade
>    - **Contre** : alourdit le HUD, complexifie l'apprentissage
> 2. **Friendly fire** dans les compétences de zone PvE ? Et en PvP avec flag ?
> 3. **Animation canceling** autorisé ou non (et lequel) — gros impact skill ceiling
> 4. **Esquive consomme Stamina** ou utilise une **ressource dédiée** (jauge d'esquive style Elden Ring) ?
> 5. **Critiques** : feedback visuel/sonore distinct + zoom léger ?
> 6. **Compétences universelles ouvertes à tous** : taunt, cri de guerre, sprint combat, méditation (regen Mana hors combat). À lister exhaustivement.

---

*Liens : [[Personnage]] | [[Armes et Maîtrise]] | [[Le Lien]] | [[Mort]]*
