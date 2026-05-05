---
tags: [pnj, comportement, personnalite, ia]
status: validated
last_review: 2026-05-01
needs_review_for: []
type: system
---

# 🧍 Système PNJ

## Principe

> [!important]
> Les PNJ d'Hybelior ne sont pas des distributeurs automatiques de quêtes. Chaque PNJ a une **personnalité**, un **métier**, un **comportement physique** et une **façon de parler** qui lui sont propres.
>
> Ces paramètres sont définis en base de données et combinés pour générer des individus crédibles.

---

## Personnalités — Système MBTI

Les 16 types de personnalité définissent le comportement global d'un PNJ.

| Type | Profil | Agressivité | Fuite/Bravoure | Distance sociale |
|------|--------|-------------|----------------|-----------------|
| **ISTJ** | Méthodique, précis | Se défend un peu | Reste calme | Normal |
| **ISFJ** | Chaleureux, empathique | Se défend un peu | Paralysé | Proche |
| **INFJ** | Introspectif, empathique | Ne se défend pas | Reste calme | Très proche |
| **INTJ** | Analytique, stratégique | Attaque doucement | Reste calme | Distant |
| **ISTP** | Pragmatique, calme | Se défend un peu | Reste calme | Distant |
| **ISFP** | Sensible, discret | Ne se défend pas | Prend la fuite | Proche |
| **INFP** | Idéaliste, rêveur | Ne se défend pas | Prend la fuite | Très proche |
| **INTP** | Logique, indépendant | Ne se défend pas | Reste calme | Très distant |
| **ESTP** | Impulsif, actif | Attaque agressive | Courageux | Très proche |
| **ESFP** | Enjoué, spontané | Se défend | Prend la fuite | Très proche |
| **ENFP** | Enthousiaste, créatif | Se défend un peu | Courageux | Proche |
| **ENTP** | Débatteur, innovant | Attaque doucement | Reste calme | Normal |
| **ESTJ** | Organisé, autoritaire | Se défend beaucoup | Courageux | Normal |
| **ESFJ** | Social, attentionné | Se défend | Paralysé | Proche |
| **ENFJ** | Charismatique, altruiste | Se défend un peu | Courageux | Proche |
| **ENTJ** | Déterminé, leader | Attaque agressive | Courageux | Normal |

---

## Comportement physique

### Style de marche
| Style | Description |
|-------|-------------|
| Confiante | Pas assurés, tête haute |
| Hésitante | Lente, regards autour |
| Décidée | Rapide, ligne droite |
| Discrète | Silencieuse, proche des murs |
| Balancement | Démarche oscillante |
| Maladroite | Trébuchements légers |

### Vitesse de marche
Rapide · Très rapide · Normale · Lente · Très lente

### Tics comportementaux
| Tic | Description |
|-----|-------------|
| Bégaiement | Répète les syllabes sous stress |
| Toussotement | Tousse fréquemment |
| Murmure tout seul | Parle à voix basse en marchant |
| Balancement | Se balance d'un pied sur l'autre |
| Claquement de doigts | Quand impatient |
| Réajuste les lunettes | Geste de précision |
| Se gratte le menton | Quand il réfléchit |
| Aucun | PNJ calme, peu expressif |
| Touche ses bijoux | Geste de réconfort |
| Main sur le front | Expression d'inquiétude |
| Geste avec ses mains | Communication gestuelle forte |
| Penche la tête | Curiosité ou doute |
| Se frotte les mains | Anticipation ou nervosité |
| Caresse son épaule | Geste d'auto-réconfort |
| Mordille son pouce | Timidité ou réflexion |
| Joue avec un objet | Distraction, nervosité |
| Bras croisés | Défense, fermeture |

---

## Style de discours

| Style | Description |
|-------|-------------|
| Formel | Vocabulaire soutenu, respect des titres |
| Décontracté | Langage courant, familier |
| Agressif | Ton court, menaçant |
| Diplomate | Prudent, équilibré |
| Vocabulaire riche | Recherché, élaboré |
| Familier | Argot, expressions locales |
| Chaleureux | Accueillant, bienveillant |

---

## Dialogue

Le joueur peut aborder un PNJ de 3 façons, selon sa propre approche :

| Approche joueur | Réaction PNJ (selon personnalité) |
|-----------------|-----------------------------------|
| **Amical** | PNJ chaleureux s'ouvre davantage / PNJ distant reste froid |
| **Hostile** | PNJ agressif répond frontalement / PNJ timide se ferme |
| **Réservé** | PNJ extraverti essaie de briser la glace / PNJ introverti reste neutre |

---

## Distance sociale

Chaque PNJ a une zone de confort physique :

| Distance | Comportement |
|----------|-------------|
| Très proche | S'approche naturellement, touche le joueur |
| Proche | Conversation à bras tendu |
| Normal | Distance de conversation standard |
| Distant | Recule si le joueur s'approche trop |
| Très distant | Garde une large distance, évite le contact |

---

## Comportement face au danger

| Réaction | Description |
|----------|-------------|
| Prend la fuite | Fuit dès qu'une menace est perçue |
| Paralysé | Se fige, incapable d'agir |
| Courageux | Tient bon, peut contre-attaquer |
| Reste calme | Ne réagit pas immédiatement — réévalue la situation |

---

## Rangs et Rôles

Les PNJ ont un rang qui définit leur importance dans le monde :

| Rang | Description |
|------|-------------|
| **Commun** | Habitant ordinaire |
| **Rare** | Artisan reconnu, marchand établi |
| **Épique** | Figure influente, chef de guilde |
| **Légendaire** | Personnage historique, entité puissante |
| **Mythique** | Entité quasi-divine |
| **Unique** | Un seul exemplaire dans le monde entier |

Chaque métier a des **rôles spécialisés** accessibles aux hauts rangs :
- Forgeron → *Maître Forgeron*
- Marchand → *Grand Marchand*
- Mage → *Archimage*
- Soldat → *Général des armées*
- Explorateur → *Cartographe Maître*
- *(et 37 autres rôles)* → [[Métiers]]

---

## Types de lieux habités

Les PNJ vivent dans des lieux classés en 11 catégories :

| Catégorie | Exemples |
|-----------|---------|
| Habité | Hameau, Village, Ville, Capitale |
| Militaire | Forteresse, Château, Tour de guet |
| Naturel | Forêt, Jungle, Désert, Grotte |
| Non-habité | Ruines, Cités perdues |
| Hostile | Repaires de créatures, zones extrêmes |
| Hors-la-loi | Camps de bandits, repaires |
| Mystique | Temples, lieux enchantés |
| Artisanal | Mines, Marchés, Serres |
| Sacré | Sanctuaires, Autels |
| Sous-marin | Cités englouties |
| Nomade | Camps mobiles, caravanes |

---

*Liens : [[Métiers]] | [[Combat]] | [[Cosmologie]] | [[Guildes]]*
