---
tags: [métier, archétype, sécurité, vivacité, acuité]
type: archetype
category: Métier
catégorie_métier: Sécurité
stat_principale: Vivacité
stats_secondaires: [Acuité, Esprit, Vigueur]
craft_category: -
paliers_maîtrise: [Novice, Initié, Adepte, Expert, Maître]
factions_compatibles: [Politiques, Commerciales, Antagonistes]
karma_typique: rouge
métiers_complémentaires: [Espion, Alchimiste, Chasseur de primes]
era_modulation: true
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-progression-jouable, frontière-garde-ombre]
---

# 🗡️ Assassin — Archétype-métier

## 1. Vue d'ensemble

L'**Assassin** opère par la frappe ciblée et discrète. Il **tue** — c'est sa fonction explicite, qu'il vend à la solde d'une faction d'ombre, d'un État, ou en commerce libre. C'est l'archétype Sécurité au **karma typique le plus problématique** : la majorité des kills d'un Assassin sont des **kills non-consentis** au sens [[PvP]] §Karma, ce qui place le métier en **karma rouge** par défaut.

> [!warning] La frontière de légitimité
> Trois variantes coexistent en Hybelior :
> - **Assassin libre** (karma rouge / banni) : tue à la demande, hors de tout cadre légal. Traqué par les Juges.
> - **Garde de l'Ombre** (karma vert / jaune) : assassin officiel d'une faction, agissant sous mandat — **n'accumule pas de karma négatif** car ses cibles sont nominalement déjà rouges/condamnées par sa faction d'origine. Statut juridique très particulier, reconnu par certaines nations seulement.
> - **Assassin d'État / Frappe scellée** (karma vert sous protection royale) : variante institutionnelle ; le sceau du dirigeant couvre l'acte. Décrit comme légal par la faction émettrice et illégal par la faction visée — diplomatiquement explosif.

Ancrage historique : les écoles d'assassinat les plus anciennes d'Hybelior dérivent des temples nocturnes (cf. Noctari) et des confréries d'ombre. Elles forment au geste, au poison, au silence — mais aussi à un **code interne** qui distingue cible "juste" et cible "vile".

Place dans Hybelior : **outil politique et criminel**. Présent dans tous les jeux de pouvoir, expressément absent des chants officiels.

## 2. Stats & Maîtrises associées

| Stat brute | Rôle | Cible Maître |
|------------|------|--------------|
| **Vivacité** *(principale)* | Vitesse de frappe, repli, IFrames | 90+ |
| **Acuité** | Critiques, fenêtre de frappe, lecture de patrouille | 80+ |
| **Esprit** | Si Voie Umbra liée (furtivité magique) | 60+ |
| **Vigueur** | Encaisser une riposte | 50+ |

**Maîtrise contextuelle principale** : `Maîtrise_Dague` (couche 2 — voir [[Armes et Maîtrise]]).
**Maîtrises secondaires** : `Maîtrise_Furtivité`, `Maîtrise_Poison` (lien Alchimiste), `Maîtrise_Voie_Umbra` (option), `Maîtrise_Acrobatie` (toits, escalades).

## 3. Compétences spécifiques

- **Frappe sourde** : depuis le dos, dégât critique ×3 si non détecté.
- **Coup de grâce silencieux** : tue cible blessée sans alerter.
- **Étranglement** : cible non armée, kill sans bruit, drain Stamina important.
- **Empoisonnement** : enduit de lame ou poison alimentaire (cf. Alchimiste).
- **Chute mortelle** : pousser depuis hauteur, "accident" — variante karma jaune.
- **Repli fumigène** : disparition brève, fenêtre d'évasion.
- **Marquage de cible** : mémoriser routine, gardes, faiblesse — préparation longue avant frappe.

## 4. Lieux d'exercice + équipement

**Lieux** : **planque** (refuge urbain, lieu personnel améliorable), **toits et conduits** (mobilité urbaine), **camps de hors-la-loi** pour les Assassins libres, **ailes secrètes des palais** pour les Gardes de l'Ombre. Pas de lieu d'exercice public reconnu par définition.

**Équipement typique** :
- Dagues (cf. [[Armes et Maîtrise]] §Dague).
- Arme cachée secondaire (stylet, lame de manche).
- Tenue sombre, cape légère ; armure réduite (mobilité prime).
- Outils de crochetage (lien Voleur — métier voisin).
- Fioles (poisons, fumigènes — Alchimiste).
- Cordage léger, grappin.

## 5. Paliers de Maîtrise

| Palier | Capacités combat débloquées |
|--------|-----------------------------|
| **Novice** | Frappe arrière simple ; dague Commune |
| **Initié** | Empoisonnement basique ; double dague ; tier Inhabituel |
| **Adepte** | Coup de grâce silencieux ; fumigène ; tier Rare |
| **Expert** | Chute mortelle ; marquage longue durée ; tier Magistral |
| **Maître** 🔒 | Frappe signature (multi-cible furtif) ; dague Légendaire ; **réputation invisible** (les chants n'osent pas nommer le Maître) |

**Condition cachée 🔒** au Maître : avoir éliminé une cible majeure (PNJ politique de premier rang) sans être identifié pendant un Souffle complet.

## 6. Activités débloquées

- **Contrat d'élimination** : missions confidentielles. Variante **rouge** (libre) ou **verte** (Garde de l'Ombre / Frappe scellée).
- **Sabotage** : empoisonner une réserve, neutraliser un témoin, remplacer un document.
- **Infiltration mortelle** : forme spécialisée d'infiltration où l'objectif est la frappe (cf. Espion §3).
- **Bounty inverse** : un Assassin peut **se faire payer pour annuler un contrat sur sa propre tête**.
- **Quêtes secrètes** : guildes d'ombre offrent une chaîne narrative scriptée.
- **Élimination d'un karma rouge / banni** : un Assassin peut chasser les rouges avec le bénéfice du bounty PvP — mécanique ouverte (cf. [[PvP]] §Bounty).

## 7. Carrière et progression

```
Apprenti d'ombre → Lame jurée → Maître-lame
                → Voile (titre interne d'école)
                → (variantes) Garde de l'Ombre / Assassin d'État / Maître libre
```

**Rivalités classiques** : Assassin vs Espion (l'Espion en veut au geste de l'Assassin qui "fait sauter la couverture" ; l'Assassin reproche à l'Espion sa lenteur), Assassin vs Chasseur de primes (chasseur naturel du rouge), Assassin vs Garde de l'Ombre rival (factions concurrentes).

**Décroissance** : `Maîtrise_Furtivité` se rouille vite si non pratiquée. Les Maîtres entretiennent des "faux contrats" pour rester en forme.

## 8. Modulation par contexte

**Par faction** :
- **Politiques** : Assassin d'État (karma vert sous sceau royal — légalité contestée).
- **Commerciales** : rare ; certains consortiums ont des "résolveurs" ; karma jaune.
- **Antagonistes (Catena Fracta)** : Assassins déliés, karma noir nominal — figures d'antagonistes scriptées.
- **Religieuses** : Garde de l'Ombre des cultes nocturnes (Noctari notamment) — karma vert dans la doctrine du culte, rouge ailleurs.

**Par ère** : en **Ère du Voile / Effroi / Crépuscule**, **prime à l'Assassin** (recettes de poison rares débloquées via [[Crafts]] §Ombre Longue, contrats abondants). En **Ère lumineuse**, traque renforcée, métier marginalisé.

**Par karma** :
- **Libre** → **rouge / noir** par accumulation de kills NC (cf. [[PvP]] §Karma).
- **Garde de l'Ombre** → **vert** dans sa faction, mais **rouge** instantané dès qu'il agit hors juridiction.
- **Frappe scellée** → **vert** tant que le sceau couvre.

> [!important] Documentation de la frontière
> La distinction entre Assassin libre et Garde de l'Ombre est **contextuelle** : la **même action** est rouge ou verte selon la faction qui l'a commanditée et la juridiction où elle a lieu. Le système de Reconnaissance (privée, par faction) gère cette ambivalence — un même joueur peut être Reconnu par sa faction tutélaire et Renommé négativement publiquement (cf. [[Registre des Décisions]] §D-GDD-RECONNAISSANCE).

## 9. Économie & Reconnaissance

**Tarifs** : variable et opaque. Cible mineure : 200 Éclats. Cible notable : 1 000-5 000 Éclats. Cible majeure (PNJ scripté) : 20 000+ Éclats, accès restreint.

**Gold sinks spécifiques** :
- Poisons (Alchimiste) — consommables continus.
- Planque (loyer, amélioration de sécurité).
- Information (achetée auprès d'Espions).
- Pots-de-vin pour faire taire témoins.

**Reconnaissance** : **inversée** — l'Assassin Maître est Reconnu **par négation** (les écoles d'ombre, les commanditaires, le contre-monde). **Renom** : à fuir. Un Assassin connu est un Assassin mort. Cf. [[Registre des Décisions]] §D-GDD-RECONNAISSANCE.

## 10. Signatures PNJ + interactions joueur

**PNJ exemplaires** :
- Le Voile, maître d'une école d'ombre transgénérationnelle.
- La Garde de l'Ombre du roi, dont l'existence est niée publiquement.
- L'Assassin délié errant, antagoniste scripté de l'arc Catena Fracta.

**Interactions joueur** :
- **Donneur de quête** : missions à choix moraux (accepter / refuser une cible, choisir l'angle).
- **Ennemi récurrent** : un Assassin envoyé contre le joueur lors de quêtes politiques.
- **Métier joué** : assume le karma rouge ou cherche la légitimité Garde de l'Ombre. Demande engagement narratif fort.
- **Allié temporaire** : pour traquer un karma noir, un Assassin peut être un allié pragmatique.

---

*Liens : [[Métiers]] | [[Personnage]] | [[Combat]] | [[PvP]] | [[Le Lien]] | [[Factions]] | [[Registre des Décisions]]*
