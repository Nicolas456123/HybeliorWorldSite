---
tags: [métier, archétype, gouvernance, verbe, présence]
type: archetype
category: Métier
catégorie_métier: Gouvernance
stat_principale: Verbe
stats_secondaires: [Présence, Mémoire, Acuité]
craft_category: -
paliers_maîtrise: [Novice, Initié, Adepte, Expert, Maître]
factions_compatibles: [Politiques, Religieuses, Commerciales]
karma_typique: vert
métiers_complémentaires: [Conseiller, Espion, Scribe, Garde, Marchand]
era_modulation: true
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-progression-jouable]
---

# 🕊️ Ambassadeur — Archétype-métier

## 1. Vue d'ensemble

L'**Ambassadeur** porte la voix d'une faction chez une autre. Il négocie, observe, transmet — sans appartenir vraiment à sa cour de résidence. C'est un métier **majoritairement PNJ**, mais devenu accessible au joueur qui développe une Reconnaissance suffisante auprès d'au moins deux factions (l'envoyante et l'accueillante doivent l'accepter).

Ancrage historique : depuis les Accords de la Première Lumière, les ambassades fonctionnent par **inviolabilité** : un Ambassadeur ne peut être attaqué tant qu'il porte les couleurs de son émetteur. Cette règle, sacralisée par les anciens [[Le Lien|Liés]], tient encore — la rompre déclenche des guerres immédiates entre [[Factions]].

Place dans Hybelior : **liant inter-factions**. Sans Ambassadeurs, pas de paix négociée, pas de routes commerciales sécurisées, pas d'alliance contre un boss mondial. Pour le joueur, c'est la **carrière sociale par excellence** : voyager, parler, comprendre des cultures, rapporter chez soi — sans craft, sans combat (ou très peu).

## 2. Stats & Maîtrises associées

| Stat brute | Rôle | Cible Maître |
|------------|------|--------------|
| **Verbe** *(principale)* | Négociation, formulation, persuasion publique | 90+ |
| **Présence** | Crédibilité, port d'honneur de la faction représentée | 80+ |
| **Mémoire** | Connaître les usages, généalogies, traités antérieurs | 70+ |
| **Acuité** | Lire les intentions, identifier un piège diplomatique | 60+ |

**Maîtrise contextuelle principale** : `Maîtrise_Diplomatie` (couche 2). Spécialisations : `Maîtrise_Diplomatie_<Faction>` — un Ambassadeur expert chez les nains commerciaux est novice à la cour des elfes religieux.
**Maîtrises secondaires** : `Maîtrise_Rhétorique`, `Maîtrise_Marchandage` (concessions chiffrées), `Maîtrise_Foi_<Religion>` si poste cultuel.

## 3. Compétences spécifiques

- **Présenter ses lettres de créance** : cérémonie d'arrivée, gain initial de Reconnaissance auprès de la faction d'accueil.
- **Négocier un traité** : compétence-pivot, conduit une session de négociation à plusieurs tours (mini-jeu social).
- **Décrypter les usages** : éviter l'impair culturel — un mot mal choisi peut casser des semaines de progrès.
- **Concession mesurée** : céder peu pour obtenir beaucoup, ne céder rien d'irréversible.
- **Tenir un banquet** : lieu privilégié de la diplomatie en Hybelior ; gain Reconnaissance + collecte d'informations.
- **Refuser sans rompre** : compétence narrative décisive, dire non sans humilier l'autre.
- **Faire rapport** : rédaction codée à destination du Conseiller / dirigeant de la faction d'origine.

## 4. Lieux d'exercice + équipement

**Lieux** : **ambassade** (résidence officielle dans la faction d'accueil), **palais étrangers** lors d'audiences, **routes diplomatiques** entre nations, **conférences inter-factions** ponctuelles. Lors de guerres, le poste devient **émissaire de paix** errant.

**Équipement typique** :
- Tenue d'apparat aux couleurs de la faction émettrice (jamais celles de la faction d'accueil).
- Sceau d'ambassade (œuvre de Scribe Magistral).
- Cadeaux diplomatiques (œuvres signées, items rares — gold sink majeur).
- Lettre de créance (parchemin spécial, scellé).
- Pas d'arme visible (sauf cérémoniale). Une **escorte de Gardes** assure la sécurité.

## 5. Paliers de Maîtrise

| Palier | Capacités sociales débloquées |
|--------|-------------------------------|
| **Novice** | Attaché culturel ; participe sans parler aux audiences |
| **Initié** | Secrétaire d'ambassade ; mène les négociations mineures (visas, escortes) |
| **Adepte** | Chargé d'affaires ; représente l'Ambassadeur en titre lorsqu'il est absent |
| **Expert** | Ambassadeur en titre ; négocie traités commerciaux et accords d'État |
| **Maître** 🔒 | **Plénipotentiaire** ; signe au nom de son dirigeant ; peut conclure une paix sans contre-signature |

**Condition cachée 🔒** au Maître : avoir réconcilié deux factions en guerre déclarée (œuvre signée par les Scribes des deux camps).

## 6. Activités débloquées

- **Quête diplomatique** : missions d'État inter-factions (escorte, message, négociation).
- **Modifier la jauge de Reconnaissance** : un Ambassadeur Maître peut transférer une partie de la Reconnaissance d'une faction à une autre (alliance), au prix de la Reconnaissance personnelle s'il échoue.
- **Ouvrir une route commerciale** : impacte directement [[Économie]] et [[Guildes]] alliées.
- **Suspendre les hostilités** : trêve ponctuelle pour des [[PvP|guerres de factions]] en cours.
- **Médiation de siège** : suspendre un siège de [[Guildes]] le temps d'une négociation.
- **Événements diplomatiques** : banquets, mariages politiques, conférences — accessibles comme donneur de quête ou organisateur.

## 7. Carrière et progression

```
Attaché → Secrétaire → Chargé d'affaires
       → Ambassadeur en titre → Plénipotentiaire
       → (rare) Conseiller diplomatique de retour à la cour mère
```

**Rivalités classiques** : Ambassadeur vs Conseiller (qui parle au nom du dirigeant ?), Ambassadeur vs Espion (l'Ambassadeur est public, l'Espion souterrain — ils se croisent sans s'avouer), Ambassadeur vs Ambassadeur d'une faction tierce (course aux concessions).

**Décroissance** : un Ambassadeur sans poste actif perd vite sa `Maîtrise_Diplomatie_<Faction>` (langues et usages s'oublient). Un Souffle sans audience tenue = 1 palier perdu.

## 8. Modulation par contexte

**Par faction** :
- **Politiques** : Ambassadeur classique entre couronnes.
- **Religieuses** : Légat / Émissaire d'une église ; négocie des concessions dogmatiques.
- **Commerciales** : Délégué consulaire ; spécialisé en commerce et droits de douane.
- **Antagonistes** : Catena Fracta n'envoie pas d'ambassadeurs officiels, mais des **émissaires de l'ombre** (chevauchement avec Espion).

**Par ère** : en **Ère du Voile**, les ambassades se ferment, retour aux émissaires secrets. En **Ère lumineuse / d'Aube**, multiplication des conférences ouvertes. En **Ère de l'Effroi**, certains Ambassadeurs sont retenus en otage — risque de carrière réel.

**Par karma** : Ambassadeur **vert** strict. Aucune tolérance — un Ambassadeur jaune est rappelé immédiatement.

## 9. Économie & Reconnaissance

**Salaire** : Adepte ~700 Éclats / semaine ; Maître Plénipotentiaire ~3 000+ Éclats / semaine, plus indemnités de mission, frais de représentation, escorte et logement officiel.

**Gold sinks spécifiques** :
- Cadeaux diplomatiques (poste majeur — œuvres signées, montures rares).
- Banquets et réceptions : 1 000 à 50 000 Éclats selon enjeu.
- Habits d'apparat renouvelés à chaque ère importante.
- Voyages et escortes (si non couverts par la faction).

**Reconnaissance** : **dédoublée** — auprès de la faction émettrice ET d'accueil. Doit jongler. Trop de Reconnaissance d'accueil = soupçon de loyauté brouillée.
**Renom** (public) : un Plénipotentiaire est célèbre par définition ; le Renom monte fort, mais expose. Cf. [[Registre des Décisions]] §D-GDD-RECONNAISSANCE.

## 10. Signatures PNJ + interactions joueur

**PNJ exemplaires** :
- Le Plénipotentiaire d'une vieille couronne, exilé permanent qui ne rentre jamais chez lui.
- La Légate d'une église majeure auprès d'un État laïc, à la frontière du sacré et du politique.
- Le Délégué consulaire d'un consortium, tient son ambassade comme un comptoir.

**Interactions joueur** :
- **Donneur de quête** : convoyage diplomatique, recherche de cadeau rare, médiation de litige.
- **Service** : le joueur peut demander à un Ambassadeur de **plaider sa cause** auprès d'une faction où il est mal vu — coût en Éclats et en faveurs.
- **Allié / ennemi** : un Ambassadeur favorable ouvre des portes dans toute sa nation d'accueil ; un Ambassadeur hostile les ferme.
- **Métier joué** : carrière de prestige, voyage permanent, peu de combat. Pour joueur narratif, social, patient.

---

*Liens : [[Métiers]] | [[Personnage]] | [[Factions]] | [[Guildes]] | [[Économie]] | [[L'Accord]] | [[Registre des Décisions]]*
