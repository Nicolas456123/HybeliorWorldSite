---
tags: [métier, archétype, gouvernance, mémoire, verbe]
type: archetype
category: Métier
catégorie_métier: Gouvernance
stat_principale: Mémoire
stats_secondaires: [Verbe, Acuité, Présence]
craft_category: -
paliers_maîtrise: [Novice, Initié, Adepte, Expert, Maître]
factions_compatibles: [Politiques, Commerciales, Religieuses]
karma_typique: vert
métiers_complémentaires: [Juge, Scribe, Marchand, Conseiller]
era_modulation: true
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-progression-jouable]
---

# 📚 Avocat — Archétype-métier

## 1. Vue d'ensemble

L'**Avocat** défend les intérêts d'un client devant la Justice, ou rédige et négocie pour lui des contrats opposables. Là où le [[#Juge|Juge]] **prononce**, l'Avocat **plaide**. Le métier se prête bien au joueur : il existe une vraie clientèle (autres joueurs, guildes, marchands), des honoraires concrets, et la possibilité de se faire un nom sans s'attacher à une seule cour comme un Conseiller.

Ancrage historique : le métier d'Avocat existe sous trois formes anciennes selon les nations : **plaideur public** (royaume de droit romain équivalent), **homme de confiance** (royaumes féodaux où l'Avocat est attaché à un seigneur), **rédacteur consulaire** (cités marchandes, où l'Avocat est avant tout notaire). Le joueur peut basculer d'une forme à l'autre selon où il s'établit.

Place dans Hybelior : pivot entre [[Économie]] et [[#Juge|Justice]]. Toute transaction lourde (achat de territoire de [[Guildes]], succession, fondation d'atelier) passe par contrat ; tout litige passe par audience. L'Avocat est l'**interface des joueurs avec la machine légale**.

## 2. Stats & Maîtrises associées

| Stat brute | Rôle | Cible Maître |
|------------|------|--------------|
| **Mémoire** *(principale)* | Codes, jurisprudence, dossiers en cours | 80+ |
| **Verbe** | Plaidoirie, formulation contractuelle | 80+ |
| **Acuité** | Repérer une faille adverse, une clause piégée | 70+ |
| **Présence** | Imposer en audience, rassurer un client | 50+ |

**Maîtrise contextuelle principale** : `Maîtrise_Droit` (couche 2) — partagée avec le Juge, mais déclinée différemment : `Maîtrise_Plaidoirie`, `Maîtrise_Contrat`.
**Maîtrises secondaires** : `Maîtrise_Rhétorique`, `Maîtrise_Marchandage` (négociation extra-judiciaire), `Maîtrise_Diplomatie` (médiation).

## 3. Compétences spécifiques

- **Étudier un dossier** : Mémoire × Maîtrise_Droit pour reconstituer les faits.
- **Plaider** : compétence-vedette, mini-jeu rhétorique en audience devant Juge.
- **Rédiger un contrat** : produire un document opposable (cf. Scribe pour la copie).
- **Négocier hors audience** : éviter le procès — souvent plus rentable que de plaider.
- **Repérer une clause** : sur un contrat tiers, identifier ce qui piège un client.
- **Conseil informel** : discussion rémunérée à l'heure, base de revenus.

## 4. Lieux d'exercice + équipement

**Lieux** : **cabinet privé** (atelier louable et améliorable, comparable à une station de craft sociale), **palais de justice** (audiences), **chancelleries marchandes**, **chambres de guilde** lors de rédaction de chartes. Les Avocats itinérants existent aussi (frontières, terres en litige).

**Équipement typique** :
- Robe (couleurs sobres, parfois ornée selon palier).
- Bibliothèque de codex (achetés au Scribe).
- Sceau personnel d'authentification.
- Carnet d'audience.
- Aucun équipement de combat. Si menace, l'Avocat embauche un [[#Garde|Garde]].

## 5. Paliers de Maîtrise

| Palier | Capacités sociales débloquées |
|--------|-------------------------------|
| **Novice** | Clerc d'Avocat ; classe les dossiers, ne plaide pas |
| **Initié** | Avocat plaidant junior ; cas mineurs (vols, contrats à faible enjeu) |
| **Adepte** | Avocat reconnu ; clientèle de marchands et guildes ; tarifs concurrentiels |
| **Expert** | Avocat de cour ; plaide en cour cantonale ; **rédige des chartes de guilde** |
| **Maître** 🔒 | Avocat à la Haute Cour ; **plaide devant un Juge Maître** ; produit des **œuvres signées** (chartes historiques, contrats de référence) |

**Condition cachée 🔒** au Maître : avoir gagné un procès contre une faction adverse plus puissante que la sienne (effet narratif fort).

## 6. Activités débloquées

- **Plaider une affaire** : interaction structurée avec un [[#Juge|Juge]] (PNJ ou joueur).
- **Rédiger une charte de guilde** : service très demandé (cf. [[Guildes]]). Honoraires souvent en parts/avantages plutôt qu'en Éclats.
- **Médiation marchande** : éviter le procès, prendre 5-10% de la valeur du litige réglé.
- **Défense d'un karma jaune/orange** : un Avocat peut **réduire la peine** d'un joueur traîné devant Juge — utilité réelle au système [[PvP|karma]].
- **Plaidoirie historique** : palier Maître, peut faire évoluer la jurisprudence (œuvre signée).
- **Conseil de guilde résident** : poste fixe rémunéré.

## 7. Carrière et progression

```
Clerc → Avocat junior → Avocat reconnu (cabinet)
     → Avocat de cour → Avocat à la Haute Cour
     → (alternative) Avocat consulaire / Conseiller juridique d'une grande guilde
```

**Rivalités classiques** : Avocats entre eux (cabinets concurrents), Avocat vs Juge (le Juge méprise parfois la rhétorique vs la loi pure), Avocat vs Conseiller (le Conseiller veut résoudre par influence ce que l'Avocat veut juridiciser).

**Décroissance** : `Maîtrise_Plaidoirie` se rouille un peu si pas plaidée régulièrement (1 palier par 2 Souffles sans audience). `Maîtrise_Contrat` se conserve mieux (même la rédaction de contrats privés entretient la maîtrise).

## 8. Modulation par contexte

**Par faction** :
- **Politiques** : Avocat de la couronne ou de l'opposition — la frontière compte.
- **Commerciales** : Avocat consulaire — c'est la forme **la plus jouable** pour le joueur (clientèle large, revenu régulier).
- **Religieuses** : Avocat ecclésiastique — défense canonique, nécessite `Maîtrise_Foi_<Religion>`.

**Par ère** : en **Ère du Voile / Effroi**, les peines durcissent (cf. Juge §8) — la défense devient plus difficile mais plus demandée. En **Ère lumineuse**, retour des amnisties — clientèle changeante.

**Par karma** : l'Avocat doit rester **vert**. Variante "Avocat du diable" jaune (défend des hors-la-loi notoires) existe mais le marginalise auprès des cours respectables.

## 9. Économie & Reconnaissance

**Honoraires** (à la différence des autres Gouvernance, l'Avocat est rarement salarié — il facture à l'affaire) :
- Cas mineur : 50–200 Éclats.
- Cas commercial : 5–10% de la valeur du litige.
- Cas politique : négocié, souvent en avantages plutôt qu'en Éclats.
- Charte de guilde : 1 000 à 20 000 Éclats selon palier de la guilde.

**Gold sinks spécifiques** :
- Bibliothèque (Scribe).
- Cabinet (loyer / amélioration).
- Apprenti à former.

**Reconnaissance** (privée) : double — auprès du milieu juridique (Juges, Avocats) ET auprès de sa clientèle (guildes, marchands). **Renom** (public) : un grand procès gagné se chante. Cf. [[Registre des Décisions]] §D-GDD-RECONNAISSANCE.

## 10. Signatures PNJ + interactions joueur

**PNJ exemplaires** :
- Le maître plaideur d'une grande capitale, dont les Concordants connaissent le nom.
- L'Avocate consulaire d'une cité marchande, plus riche que beaucoup de nobles.
- Le défenseur des hors-la-loi des frontières, jaune toléré, indispensable aux camps rouges.

**Interactions joueur** :
- **Service direct** : tout joueur peut **engager un Avocat** pour défense karma, contrat, charte.
- **Donneur de quête** : "Récupère ce témoignage", "Vérifie cette propriété", "Discrédite ce témoin (légalement)".
- **Métier joué** : carrière entièrement compatible avec un mode "social-PNJ-driven", avec mini-jeux d'audience et de négociation.
- **Allié des guildes** : un Avocat sous contrat avec une guilde gagne en sécurité et en clientèle, mais perd en indépendance.

---

*Liens : [[Métiers]] | [[Personnage]] | [[PvP]] | [[Guildes]] | [[Économie]] | [[L'Accord]] | [[Registre des Décisions]]*
