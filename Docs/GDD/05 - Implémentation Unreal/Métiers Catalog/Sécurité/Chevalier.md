---
tags: [métier, archétype, sécurité, vigueur, présence]
type: archetype
category: Métier
catégorie_métier: Sécurité
stat_principale: Vigueur
stats_secondaires: [Présence, Endurance, Verbe]
craft_category: -
paliers_maîtrise: [Novice, Initié, Adepte, Expert, Maître]
factions_compatibles: [Politiques, Religieuses]
karma_typique: vert
métiers_complémentaires: [Soldat, Garde, Conseiller, Ambassadeur, Prêtre]
era_modulation: true
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-progression-jouable, lien-factions-noblesse]
---

# 🛡️ Chevalier — Archétype-métier

## 1. Vue d'ensemble

Le **Chevalier** est l'**élite militaire** d'Hybelior : combattant d'exception, héritier d'un ordre, incarnation d'un **code d'honneur** lié à la faction qui l'a adoubé. Là où le [[#Soldat|Soldat]] est nombre, le Chevalier est figure ; là où le [[#Garde|Garde]] est local, le Chevalier est emblème national ou cultuel.

**Très fortement modulé par [[Factions]]** : il n'existe pas de Chevalier "générique". Chaque ordre chevaleresque (royal, religieux, parfois marchand de prestige) a son **code propre**, son **rituel d'adoubement**, ses **interdits**, ses **valeurs**. Le joueur Chevalier appartient nécessairement à un ordre nommé (cf. Lore/Pays et Lore/Religions).

Ancrage historique : la chevalerie d'Hybelior est née des cours royales et des grands ordres religieux des Premières Lumières. Son **adoubement** est cérémoniel : on n'est pas "Chevalier de fait", on l'**est** par investiture. Briser son code, c'est perdre son titre — irrévocablement dans la plupart des ordres.

Place dans Hybelior : **figure morale et martiale** simultanément. Pour le joueur, c'est l'archétype de la carrière noble et engagée — combat élite, honneur visible, quêtes scriptées d'ordre.

## 2. Stats & Maîtrises associées

| Stat brute | Rôle | Cible Maître |
|------------|------|--------------|
| **Vigueur** *(principale)* | Charge, port d'armure lourde, lance | 90+ |
| **Présence** | Aura, autorité, dissuasion | 80+ |
| **Endurance** | Bataille tenue, port d'armure prolongé | 70+ |
| **Verbe** | Code d'honneur (parler, parlementer, jurer) | 50+ |

**Maîtrise contextuelle principale** : selon ordre — `Maîtrise_Lance_Cavalerie`, `Maîtrise_Épée_Longue`, `Maîtrise_Épée_Bouclier`, `Maîtrise_Marteau_Cérémoniel`.
**Maîtrises secondaires** : `Maîtrise_Équitation` (cavalerie lourde quasi-obligatoire), `Maîtrise_Code_<Ordre>` (compétence narrative), `Maîtrise_Foi_<Religion>` pour ordres religieux.

## 3. Compétences spécifiques

- **Charge montée** : signature du Chevalier — coût Stamina élevé, dégâts et stagger massifs.
- **Duel codifié** : engager un adversaire en cérémonie ; bonus moral et de Reconnaissance si gagné selon les règles.
- **Aura de commandement** : Soldats alentour gagnent un buff Présence × Maîtrise_Code.
- **Tenue d'honneur** : compétence narrative — refuser un acte indigne (et accepter les conséquences).
- **Brèche d'élite** : forme de pénétration de défense par groupe restreint et lourd.
- **Serment** : engagement solennel à un acte ; modifie la jauge de Reconnaissance d'après respect.
- **Refus de la fuite** : mécanique narrative de dernier carré — option de tenir position contre tous.

## 4. Lieux d'exercice + équipement

**Lieux** : **maison de l'ordre** (chapitre, commanderie, château ancestral), **lice de tournoi** (lieu rituel pour exercices d'honneur), **cour royale ou cathédrale** (lieux de cérémonie), **champ de bataille** (en charge ou en duel codifié). Chaque ordre a ses lieux sacrés.

**Équipement typique** :
- Armure complète (lourde, signature de l'ordre — cf. [[Items/Archétypes]] armures).
- Heaume orné (couleurs et blason de l'ordre).
- Lance de cavalerie + épée + bouclier blasonné.
- **Monture** dédiée (souvent dressée par éleveur d'élite).
- Cape aux couleurs de l'ordre.
- Anneau d'adoubement (œuvre signée Bijoutier Maître).

## 5. Paliers de Maîtrise

| Palier | Capacités combat / honoraires |
|--------|------------------------------|
| **Novice** | Écuyer ; sert un Chevalier en titre ; arme Commune ; pas encore adoubé |
| **Initié** | **Chevalier adoubé** ; cérémonie publique ; arme Inhabituelle ; entre dans l'ordre |
| **Adepte** | Chevalier de tournoi ; tier Rare ; commande quelques Soldats |
| **Expert** | Chevalier-banneret ; commande une compagnie élite ; tier Magistral ; siège au chapitre de l'ordre |
| **Maître** 🔒 | **Grand Chevalier** / Maître de l'ordre ; tier Légendaire ; **œuvre signée** (un fait d'arme entré dans les chants) |

**Condition cachée 🔒** au Maître : avoir gagné un duel codifié contre un Maître d'un ordre rival, dans le respect strict du code (la victoire mais aussi la **manière**).

## 6. Activités débloquées

- **Tournoi de chevalerie** : événements festifs récurrents par ère ; gain de Renom et d'objets cérémoniels.
- **Quête d'ordre** : chaîne narrative scriptée propre à chaque ordre.
- **Adoubement d'écuyer** : palier Adepte+, le Chevalier peut adouber son propre écuyer.
- **Serment** : engagement public modifiant la jauge de Reconnaissance.
- **Commandement d'élite** : palier Expert+, mène une compagnie élite en bataille de faction.
- **Siège d'honneur** : palier Maître, peut **déclarer un siège codifié** (variante diplomatique du siège de [[Guildes]]).
- **Conseil de l'ordre** : participer aux décisions internes (élection de Grand Maître, exclusion d'un frère).

## 7. Carrière et progression

```
Page → Écuyer → Chevalier adoubé
     → Chevalier de tournoi → Chevalier-banneret
     → Grand Chevalier / Maître de l'ordre
     → (rare) Régent d'ordre, Conseiller du trône
```

**Rivalités classiques** : Chevaliers d'ordres rivaux (intra-faction parfois plus violent qu'inter-factions), Chevalier vs Soldat (cf. [[#Soldat|Soldat §7]]), Chevalier vs Assassin (l'Assassin **viole** le code par essence — figure d'antagoniste idéal pour Chevalier), Chevalier vs Délié (antagonisme cosmologique scripté).

**Décroissance** : la `Maîtrise_Code_<Ordre>` se conserve par fréquentation des frères. Un Chevalier exilé de son ordre perd progressivement son code (et donc une partie de ses bonus narratifs).

### Sous-spécialisations canoniques (Role.csv)

> Source canonique : `Role.csv` (cat 5 — Sécurité). Trois rôles canoniques se rattachent au Chevalier (palier Maître+).

#### Sous-spécialisation Maître+ : Général des armées

> Source canonique : `Role.csv` (cat 5, role n°18).

- **Description** : Chevalier-Maître élevé au commandement suprême d'une armée nationale — coordonne les corps (cavalerie, infanterie, archers), planifie les campagnes, conseille le souverain en temps de guerre.
- **Conditions** : palier Maître + investiture royale + ≥ 1 campagne menée à bien + Reconnaissance ≥ Expert + 🔒 condition cachée (avoir gagné une bataille décisive OU survécu à un Souffle pendant une campagne sans perte d'armée).
- **Notes** : équivalent canonique de **Régent d'ordre / Conseiller du trône** orienté militaire. Frontière forte avec [[Conseiller]] (Conseiller royal) et [[Soldat]] (Sergent/Major).

#### Sous-spécialisation Maître+ : Chef des chevaliers

> Source canonique : `Role.csv` (cat 5, role n°23).

- **Description** : Chevalier-Maître à la tête d'un **ordre chevaleresque** — incarne le code de l'ordre, adoube les nouveaux chevaliers, arbitre les querelles internes.
- **Conditions** : palier Maître + ≥ 5 ans dans l'ordre + investiture par le Grand Maître précédent ou par élection des frères + 🔒 condition cachée (avoir adoubé ≥ 1 nouveau chevalier ayant atteint Expert OU avoir préservé l'ordre pendant un schisme).
- **Notes** : équivalent canonique de **Maître de l'ordre / Grand Chevalier**. Distinct du Général des armées : un Chef des chevaliers commande **un ordre** (souvent religieux ou aristocratique), pas l'armée d'État.

#### Sous-spécialisation Maître+ : Maître d'armes

> Source canonique : `Role.csv` (cat 5, role n°17).

- **Description** : Chevalier-Maître **instructeur d'élite** — forme les pages, écuyers, soldats prometteurs ; codifie les techniques de combat de son ordre ou de sa cité.
- **Conditions** : palier Maître + ≥ 3 disciples ayant atteint au moins Adepte sous sa formation + Reconnaissance ≥ Adepte + 🔒 condition cachée (avoir codifié une technique signature reconnue par les pairs OU survécu à un duel rituel à l'Expert+).
- **Notes** : ce rôle peut aussi se rattacher au **[[Soldat]]** quand il s'agit de formation au sein d'une armée régulière (instructeur de garnison). `[REFONTE-NEEDED — frontière Chevalier/Soldat à valider : Maître d'armes peut être pluri-rôle.]`

## 8. Modulation par contexte

**Par faction (essentiel)** :
- **Politiques** : ordres royaux nationaux — chacun avec son code (chevalerie courtoise, chevalerie rude, chevalerie raffinée…).
- **Religieuses** : ordres-temple (cf. ordres militaires des cultes majeurs — Ordo Caelum, Ignis Aeternum, Lex Petra notamment se prêtent bien). Combine `Maîtrise_Foi_<Religion>`.
- **Commerciales** : très rare — quelques **ordres marchands de prestige** (ex : "Compagnons du Sceau") mais sont plus cérémoniels que martiaux.
- **Antagonistes** : pas de Chevaliers Déliés au sens strict (le Délié rejette tout code) — mais des **Chevaliers déchus** (bannis de leur ordre) peuvent basculer.

**Par ère** : en **Ère de l'Effroi**, multiplication des serments-suicide ("dernier carré"). En **Ère lumineuse**, prestige des tournois explose. En **Ère du Voile**, les ordres se referment, méfiants.

**Par karma** : Chevalier **vert** strict. Toute action codifiée comme indigne entraîne **honte** (mécanique d'ordre, perte de Reconnaissance interne) avant même un karma jaune. La perte de titre est **plus lourde que le glissement karmique** pour un Chevalier.

## 9. Économie & Reconnaissance

**Revenus** : un Chevalier reçoit souvent un **fief** (revenu foncier) plus qu'une solde régulière. Adepte (banneret junior) ~1 000 Éclats / semaine équivalents en revenus de fief. Maître ~5 000+ avec parts d'apanages, taxes, butin de tournoi et de guerre.

**Gold sinks spécifiques** :
- Armure complète d'élite (renouvelée à chaque palier).
- Monture (entretien continu, cf. Éleveur).
- Tournois (frais de participation, blason, déclamation).
- Apanages à entretenir (vassaux, métairie).

**Reconnaissance** : **double et serrée** — Reconnaissance interne (l'ordre, qui peut vous radier) ET Reconnaissance large auprès de la noblesse. Toute défaillance de code touche les deux.
**Renom** (public) : un Chevalier de tournoi connu fait l'objet de chants ; un Maître entre dans les chroniques (œuvre signée). Cf. [[Registre des Décisions]] §D-GDD-RECONNAISSANCE.

## 10. Signatures PNJ + interactions joueur

**PNJ exemplaires** :
- Le Grand Maître d'un ordre célèbre, gardien d'un code immémorial.
- La Chevalière de tournoi, championne de plusieurs ères, figure populaire.
- Le Chevalier-paladin d'une cathédrale, paladin pieux et guerrier d'élite.
- Le Chevalier déchu (antagoniste tragique récurrent en lore).

**Interactions joueur** :
- **Donneur de quête** : missions d'honneur, défense d'un faible, traque d'un brigand (avec interdiction explicite d'embuscade).
- **Mentor** : un Chevalier Maître peut adouber un joueur écuyer.
- **Métier joué** : forte composante narrative ; carrière noble. Demande engagement profond dans une faction.
- **Allié de faction** : lors des [[PvP|guerres de factions]], les Chevaliers commandent les charges d'élite.
- **Ennemi noble** : un Chevalier hostile cherche le **duel codifié** plutôt que l'embuscade — différence comportementale claire avec Assassin / Soldat hostile.

---

*Liens : [[Métiers]] | [[Personnage]] | [[Combat]] | [[Factions]] | [[Guildes]] | [[PvP]] | [[L'Accord]] | [[Économie]] | [[Registre des Décisions]]*
