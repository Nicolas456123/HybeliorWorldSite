---
tags: [métier, archétype, gouvernance, mémoire, verbe]
type: archetype
category: Métier
catégorie_métier: Gouvernance
stat_principale: Mémoire
stats_secondaires: [Verbe, Acuité, Présence]
craft_category: -
paliers_maîtrise: [Novice, Initié, Adepte, Expert, Maître]
factions_compatibles: [Politiques, Religieuses, Commerciales]
karma_typique: vert
métiers_complémentaires: [Avocat, Scribe, Conseiller, Garde]
era_modulation: true
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-progression-jouable]
---

# ⚖️ Juge — Archétype-métier

> [!info] Entités tutélaires canoniques
> **[[Cosmologie|Judicar]]** (Astral — *Gardien des lois cosmiques*, arbitre de l'ordre cosmique) et **[[Cosmologie|Fatum]]** (Cosmique — *Juge des destins*). Voir [[Cosmologie]] §"Liste canonique des entités cosmiques". Source : `AccessExport/Legende.csv` (D-COSMO-LEGENDE-CSV-INTEGRATION).

## 1. Vue d'ensemble

Le **Juge** applique les lois locales au nom de la nation, de la cité ou de la faction qui l'a investi. C'est avant tout un **métier de PNJ** : la magistrature suppose une légitimité reconnue par le pouvoir politique, ce qui ne se monte pas en quelques quêtes. Un joueur peut s'orienter vers ce métier comme **carrière sociale tardive**, après avoir gagné une Reconnaissance suffisante auprès d'une faction politique ou religieuse, et au minimum un palier d'[[L'Accord]] crédible.

Ancrage historique : la Magistrature en Hybelior n'est pas uniforme. Chaque nation a sa tradition — codes écrits dans certaines, jurisprudence orale dans d'autres, juges-prêtres dans les zones religieuses. Le Juge porte la **parole de la loi** : son verdict engage le pouvoir qui le mandate. C'est pourquoi le métier oscille entre **politique** (le Juge sert un trône) et **érudition** (il maîtrise un corpus). Les chevaucheurs d'ères se rappellent que la jurisprudence d'une ère ancienne survit parfois à travers le [[Héritage]] des juges qui l'ont écrite.

Place dans Hybelior : pivot de la stabilité urbaine. Sans juges, pas de [[Économie|marchés]] sereins, pas de contrats de [[Guildes]] applicables, pas d'arbitrage entre [[Factions]] alliées. Un joueur lésé (vol, escroquerie, rupture de contrat de guilde) peut demander à un Juge un arbitrage officiel — qui produit une décision opposable au sein de la juridiction.

## 2. Stats & Maîtrises associées

| Stat brute | Rôle | Cible Maître |
|------------|------|--------------|
| **Mémoire** *(principale)* | Retenir codes, jurisprudence, précédents | 80+ |
| **Verbe** | Énoncer le verdict, mener l'audience | 70+ |
| **Acuité** | Repérer une contradiction dans un témoignage | 60+ |
| **Présence** | Imposer le silence dans la salle, gravité du verdict | 50+ |

**Maîtrise contextuelle principale** : `Maîtrise_Droit` (couche 2). Spécialisée par juridiction : `Maîtrise_Droit_<Nation>` ou `Maîtrise_Droit_Religieux_<Religion>`. Ces maîtrises **ne se transfèrent pas** — un Juge expert en droit royal ignore le droit ecclésiastique.
**Maîtrises secondaires** : `Maîtrise_Diplomatie` (concilier les parties), `Maîtrise_Rhétorique` (formuler les attendus).

## 3. Compétences spécifiques

- **Lire un témoignage** : croiser les déclarations, repérer la contradiction (Acuité × Maîtrise_Droit).
- **Citer un précédent** : convoquer une jurisprudence ancienne — un précédent issu d'une **œuvre signée** d'un Juge antérieur (cf. [[Héritage]]) renforce l'autorité du verdict.
- **Tenir une audience** : maintenir l'ordre, distribuer la parole, refuser une interruption sans dégrader la solennité.
- **Rédiger un attendu** : fixer par écrit la motivation du verdict (compétence partagée avec le Scribe).
- **Évaluer la peine** : graduer la sanction selon le code et l'intention — peines pécuniaires, exil, peine corporelle, jugement dernier.
- **Refuser la corruption** : compétence narrative invisible mais traquée par la faction tutélaire ; un Juge corrompu perd Reconnaissance d'un coup brutal s'il est démasqué.

## 4. Lieux d'exercice + équipement

**Lieux** : palais de justice des grandes cités, salles d'audience adossées aux temples (juridiction religieuse), chambre seigneuriale dans les forteresses, **assises itinérantes** dans les terres frontalières où le Juge voyage avec une petite escorte de [[#Garde|Gardes]].

**Équipement typique** :
- Robe de fonction (couleur selon nation/religion) — accessoire de tier Magistral à Maître.
- Sceau personnel gravé (cf. [[Crafts]] §Scriptorium et enchantement).
- Codex relié contenant le corpus de référence — souvent une **œuvre signée** d'un Scribe.
- Marteau cérémoniel (rituel, pas arme).
- Aucun équipement de combat propre au métier ; le Juge dépend de sa garde rapprochée pour la sécurité.

## 5. Paliers de Maîtrise

| Palier | Capacités sociales débloquées |
|--------|-------------------------------|
| **Novice** | Assistant de greffe ; lit et résume un dossier ; aucun pouvoir de verdict propre |
| **Initié** | Juge de paix local ; arbitre les litiges mineurs (vols < 100 Éclats, querelles de voisinage) |
| **Adepte** | Juge de district ; connaît une juridiction entière ; peut refuser une affaire pour conflit d'intérêt |
| **Expert** | Juge cantonal ; tranche les cas de [[PvP|karma]] orange/rouge devant le pouvoir civil ; siège en cour d'appel |
| **Maître** 🔒 | Juge de la Haute Cour ; **fait jurisprudence** ; un de ses verdicts devient précédent canonique consultable par les Juges suivants jusqu'au prochain [[Le Souffle|Souffle]] |

**Condition cachée 🔒** au Maître : avoir rédigé un attendu de verdict sur une affaire impliquant deux factions en guerre, et que cet attendu ait été reconnu par les deux parties.

## 6. Activités débloquées

- **Tenir audience publique** : événement social, gain de Renom proportionnel à l'enjeu.
- **Délivrer un mandat** : ordre opposable aux Gardes locaux pour traquer un suspect (utile pour les guildes voulant régler un conflit légalement).
- **Plaider devant la Haute Cour** : palier Expert+, donne accès aux cas politiques.
- **Annuler un bounty** (cf. [[PvP]]) : un Juge Maître peut suspendre une mise à prix s'il juge qu'elle a été émise abusivement — pouvoir rare et politiquement coûteux.
- **Légaliser un statut** : reconnaître officiellement un mariage, une succession, une charte de guilde.
- **Quêtes politiques** : enquêtes royales, procès retentissants à choix moraux multiples.

## 7. Carrière et progression

Filière nettement hiérarchisée. La promotion se fait par **investiture** d'un pouvoir, jamais par seule maîtrise technique.

```
Greffier → Juge de paix → Juge de district → Juge cantonal
        → Juge de la Haute Cour → (rare) Grand Juge / Conseiller du trône
```

**Rivalités classiques** : Juges contre Avocats (procès médiatiques), Juges contre Conseillers (le Conseiller veut résoudre par diplomatie ce que le Juge tranche par verdict), Juges contre [[#Chevalier|Chevaliers]] (la justice du sang vs la justice du code).

**Décroissance** : un Juge qui n'exerce pas perd lentement sa `Maîtrise_Droit` (rouille de [[Le Souffle]]). Si trois Souffles passent sans audience tenue, le titre devient honoraire — il faut une réinvestiture.

### Sous-spécialisations canoniques (Role.csv)

> Source canonique : `Role.csv` (cat 4 — Gouvernance). Ce rôle correspond à un **palier Maître+** absorbé du legacy AccessExport.

#### Sous-spécialisation Maître+ : Gardien des lois et coutumes

> Source canonique : `Role.csv` (cat 4, role n°13).

- **Description** : Juge-Maître élevé au rang de **gardien officiel** du corpus juridique d'une nation — codifie les lois, supervise la formation des juges cadets, tranche les litiges constitutionnels.
- **Conditions** : palier Maître + investiture par le souverain ou la Haute Cour + ≥ 1 codification ou réforme juridique portée à son nom + 🔒 condition cachée (rendre un verdict contre un Conseiller royal et survivre à la riposte politique OU rédiger une charte de droit reconnue).
- **Notes** : équivalent canonique de **Grand Juge** dans l'échelle d'évolution (§7). Frontière partielle avec [[Historien]] (mémoire des coutumes) et [[Bibliothécaire]] (archives juridiques).

## 8. Modulation par contexte

**Par faction** :
- **Politiques** : le Juge sert un code royal, prête serment au monarque — Reconnaissance liée au trône.
- **Religieuses** : Juge ecclésiastique, applique le droit canon ; cumule avec `Maîtrise_Foi_<Religion>` (cf. [[Factions]] et [[Prédiction]]).
- **Commerciales** : Juge consulaire, spécialisé en contrats et faillites ; plus pragmatique, moins de cérémonial.
- **Antagonistes (Catena Fracta)** : pas de juges officiels — la "justice Déliée" est arbitraire et n'apparaît qu'en lore.

**Par ère** : en **Ère du Voile** ou de l'**Effroi**, la magistrature durcit (peines aggravées, exécutions sommaires). En **Ère lumineuse**, retour à la mesure et à l'amnistie. Les codes anciens d'une ère ancienne deviennent parfois caducs au [[Le Souffle|Souffle]] suivant — d'où l'importance des Scribes pour conserver la jurisprudence.

**Par karma** : un Juge devrait être **vert**. Un Juge ayant glissé en jaune perd 20% de son autorité narrative ; en orange ou pire, il est démis automatiquement par sa faction tutélaire.

## 9. Économie & Reconnaissance

**Salaire** : versé par la faction (royale, religieuse, marchande). Niveau Adepte : ~500 Éclats / semaine. Niveau Maître : 2 000+ Éclats / semaine, plus avantages en nature (logement officiel, garde affectée).

**Gold sinks spécifiques** :
- Robe et sceau de fonction : 1 000 à 10 000 Éclats selon le palier.
- Bibliothèque privée (codex copiés par Scribe) : investissement continu.
- Pots-de-vin refusés rituellement → effet narratif (mais pas une dépense).

**Reconnaissance** (privée — cf. [[Registre des Décisions]] §D-GDD-RECONNAISSANCE) : pivot du métier. La faction qui investit le Juge mesure sa Reconnaissance interne ; perdre la confiance = perdre la charge.
**Renom** (public — classements globaux) : un Juge Maître ayant rendu un verdict historique apparaît dans les classements de Renom social, ce qui lui ouvre des invitations diplomatiques mais ne change pas son salaire.

## 10. Signatures PNJ + interactions joueur

**PNJ exemplaires** (à étoffer en Lore) :
- Le Grand Juge d'une capitale royale, gardien d'un code centenaire.
- Le Juge ecclésiastique d'une cité-temple, qui ne reconnaît pas la justice civile.
- Le Juge itinérant des frontières, qui voyage avec deux Gardes et un Scribe.

**Interactions joueur** :
- **Donneur de quête** : enquêtes, traque de hors-la-loi, cas de jurisprudence à trancher.
- **Allié** : peut suspendre un bounty, légaliser un acte de guilde.
- **Ennemi** : si le joueur a glissé en karma rouge, le Juge devient figure d'autorité hostile dans toute la juridiction.
- **Référent** : le joueur Avocat ou Conseiller doit régulièrement faire approuver ses dossiers par un Juge.

---

*Liens : [[Métiers]] | [[Personnage]] | [[Factions]] | [[PvP]] | [[Économie]] | [[L'Accord]] | [[Registre des Décisions]]*
