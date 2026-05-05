---
tags: [métier, archétype, commerce-services, mémoire, acuité, gold-sink-majeur]
type: archetype
category: Métier
catégorie_métier: Commerce et services
stat_principale: Mémoire
stats_secondaires: [Acuité, Verbe, Présence]
craft_category: aucune (service financier)
sources_ressources_accessibles: [Éclat (gestion, pas production)]
stations_principales: [Comptoir bancaire, Salle des coffres, Bourse des Augures, Bureau de change, Salle de prêt]
outils_principaux: [Registre comptable, Sceau d'authentification, Bascule de précision, Coffre-fort, Cachet de cire, Quittance]
paliers_maîtrise: [Novice, Initié, Adepte, Expert, Maître]
métiers_complémentaires: [Marchand, Scribe, Juge, Conseiller, Tavernier (information)]
era_modulation: true
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-progression-playtest, taux-prêts-paliers]
---

# 🏦 Banquier — Archétype Métier

> *"Mon coffre n'est pas plein d'Éclats. Il est plein de promesses."*

---

## 1. Vue d'ensemble

Le **Banquier** est le **pivot financier** d'Hybelior — gardien de l'**Éclat** ([[Économie|monnaie]]), prêteur, changeur, dépositaire. Il génère un **gold sink majeur** par les loyers, frais et taxes qu'il prélève. C'est aussi un nœud d'**information économique** : il sait qui possède quoi, qui doit à qui, qui prend des risques. Il opère depuis des **comptoirs bancaires** dans les grandes villes, et certains gèrent la **Bourse des Augures** ([[L'Accord]] / [[Le Souffle]] — spéculation sur les Souffles à venir). Métier de **haute responsabilité**, quasi-toujours adossé à une **institution** (guilde bancaire, ordre, faction noble) — peu de banquiers indépendants.

---

## 2. Stats brutes & Maîtrises associées

- **Stat principale** : **Mémoire** — milliers de comptes, lignes de crédit, échéances, registres de transferts
- **Stats secondaires** : **Acuité** (détection de fausse monnaie, lecture du débiteur, audit), **Verbe** (négociation prêt, recouvrement), **Présence** (autorité contractuelle)
- **Maîtrise contextuelle** : `Maîtrise_Banque` — montée par transactions et prêts gérés. Sous-maîtrises : `Maîtrise_Évaluation_Héritage`, `Maîtrise_Authentification`, `Maîtrise_Bourse_Augures`, `Maîtrise_Recouvrement`.

→ Bénéficie d'effet seuil **Acuité × Mémoire × Maîtrise_Banque** (cf. [[Personnage]] §Qualité de craft généralisé aux services).

---

## 3. Sources de ressources

Le Banquier ne produit ni ne consomme de ressource matérielle. Il **gère un flux d'Éclat** :

**Consomme** :
- **Capital initial** (auto-fourni ou apporté par institution / faction)
- **Espace coffre** (loyer ou propriété)
- **Service [[Scribe]]** (écriture des contrats, tenue des registres)

**Produit** :
- **Service de dépôt** (sécurité contre frais)
- **Service de change** (Esquilles ↔ Éclats ↔ Grands Éclats, devises régionales)
- **Service de prêt** (capital contre intérêt)
- **Service d'authentification** (sceaux, certificats, attestations)
- **Service Bourse des Augures** (spéculation cyclique sur Souffles — voir [[Le Souffle]])

→ Référence [[Économie]] §Anti-inflation, §Banque, §Bourse Augures.

---

## 4. Stations + outils

| Station | Rôle | Palier requis |
|---------|------|---------------|
| **Comptoir bancaire** | Accueil, dépôt, retrait | Novice |
| **Salle des coffres** | Stockage Éclats + items | Initié |
| **Bureau de change** | Conversion devises régionales / unités | Initié |
| **Salle de prêt** | Négociation contrats de crédit | Adepte |
| **[[L'Accord|Bourse des Augures]]** | Spéculation pré-Souffle | Expert |
| **Salle d'audit** | Vérification grands transferts | Adepte |

**Outils** : registre, sceau d'authentification, bascule précision (peser Éclats), coffre-fort, cachet de cire, plumes et encres certifiées.

→ Pas de craft category. Mini-jeu : **gestion de risque** (jauge de défaut sur prêt, prédiction de Souffle pour Bourse), **détection de faux** (timing/observation).

---

## 5. Paliers de Maîtrise

| Palier | Capacités débloquées |
|--------|----------------------|
| **Novice** | Dépôts simples, change basique, capital max 10 000 Éclats, taux d'erreur ~10% (faux non détecté) |
| **Initié** | Coffres privés, prêts ≤ 1 000 Éclats à 10% intérêt, change inter-régional, détection faux courants |
| **Adepte** | Prêts ≤ 50 000 Éclats à 5-15%, hypothèques sur biens, sceau certifié, audit grands comptes |
| **Expert** | Bourse des Augures (spéculation Souffles), prêts à guildes / nations, contrats inter-Parties (Héritage) |
| **Maître** | **Condition cachée 🔒** — Banque signée (Héritage [[L'Accord]]), capital quasi-illimité, conseille des nations, accès marchés cosmiques |

> Décroissance : oubli des comptes = défauts. Rouille post-[[Le Souffle|Souffle]] : 1ère semaine, +20% taux d'erreur sur conversions (économie ré-équilibre).

---

## 6. Crafts/recettes débloqués

> "Recettes" = produits financiers et services.

| Palier | Exemples (3-5) |
|--------|----------------|
| **Novice** | Dépôt simple · Retrait · Change Esquilles ↔ Éclats · Quittance |
| **Initié** | Coffre privé location · Prêt court < 1 mois · Change inter-régional · Authentification basique |
| **Adepte** | Prêt long (1-12 mois) · Hypothèque sur item · Audit · Sceau certifié · Contrat marchand |
| **Expert** | Action de Bourse des Augures · Prêt à guilde/nation · Contrat Héritage inter-Parties · Lettre de change |
| **Maître** | Banque signée · Crédit Concordant · Bourse Cosmique · Caution sur Œuvres signées · Banque inter-Ères |

---

## 7. Carrière et débouchés

- **Démarrage** : commis au comptoir, écriture sur registres, tenue de caisse
- **Progression** : commis → guichet → conseiller → directeur d'agence → maître d'institution
- **Établissement** : grande ville obligatoire (Galenor capitale, Aldraan port, Cendara métropole) — pas de banque rurale
- **Réseau** : [[Marchand]] (clients principaux : prêts, change), [[Scribe]] (rédaction contrats), [[Juge]] (recouvrement, défauts), [[Conseiller]] (conseil seigneurial), [[Garde]] (sécurité coffres)
- **Faction** : Guilde des Banquiers (inter-nations), Maisons aristocratiques (banque privée), Ordre [[Foedus Animae]] (banque sacrée — serment + caution)
- **Influence** : un grand banquier conseille des rois, finance des guerres, fait basculer des successions

### Sous-spécialisations canoniques (Role.csv)

> Source canonique : `Role.csv` (cat 3 — Commerce et services). Ces rôles correspondent à des **paliers Maître+** absorbés du legacy AccessExport.

#### Sous-spécialisation Maître+ : Négociant influent

> Source canonique : `Role.csv` (cat 3, role n°11).

- **Description** : Banquier-Maître (ou Marchand-Maître orienté finance) dont l'influence dépasse le simple commerce — finance les guerres, conseille les rois, arbitre les successions des grandes maisons.
- **Conditions** : palier Maître + Reconnaissance ≥ Expert capitale + ≥ 1 prêt royal honoré OU ≥ 1 financement de guerre OU ≥ 1 mariage politique arrangé via dette + 🔒 condition cachée (faveur durable d'un souverain OU contrôle d'une route commerciale stratégique).
- **Notes** : ce rôle peut s'attacher au **[[Marchand]]** au lieu du Banquier selon la trajectoire du PNJ — note dans `Marchand.md` §7. `[REFONTE-NEEDED — frontière Banquier/Marchand : un Négociant influent peut être pluri-rôle Banquier-Maître + Marchand-Maître].`

---

## 8. Modulation par contexte

| Contexte | Effet |
|----------|-------|
| **Ère [[Les Ères|Verdoiement]] (Terranu)** | Économie expansive, prêts faciles, taux bas (5%) |
| **Ère [[Les Ères|Sommeil de Glace]] (Climata)** | Crise, défauts +30%, taux durs (15-20%) |
| **Ère [[Les Ères|Brume Mortelle]]** | Effondrement de confiance, ruée sur les coffres |
| **Ère [[Les Ères|Ombre Longue]] (Noctis)** | Banques clandestines, contrebande financière |
| **Pré-[[Le Souffle]]** | **Bourse des Augures s'agite** : spéculation maximale, gain ou faillite |
| **Post-[[Le Souffle]]** | Reset partiel des contrats : voir clause "Souffle" obligatoire dans tout contrat majeur |
| **[[L'Accord]] ≥ 75%** | Crédit privilégié pour Concordants ([[Économie]]) |
| **Religion [[Foedus Animae]]** | Caution sacrée — défaut = manquement à serment, conséquences mystiques |
| **Religion [[Rota Mundi]]** | Liturgie cyclique : remise de dette à chaque Souffle (rare, mais renouveau) |

---

## 9. Économie — **Gold sinks majeurs**

> [!important] Le Banquier est le **principal gold sink** d'Hybelior.

| Sink | Coût | Justification |
|------|------|---------------|
| **Loyer slot banque** | 1 Éclat / slot / jour | Accumulation passive — incite à liquider |
| **Coffre privé auberge** | 100 Éclats / mois | Stockage local sécurisé |
| **Frais de transfert** | 1-3% montant | Inter-villes, inter-nations |
| **Frais de change** | 2-5% | Esquilles ↔ Éclats ↔ Grands Éclats, devises régionales |
| **Intérêt prêt** | 5-20% selon contexte / risque | Revenu banquier |
| **Caution authentification** | 100-1 000 Éclats par sceau | Items rares, contrats |
| **Bourse des Augures - mise** | min 1 000 Éclats | Spéculation, retournée au pot ou perdue |
| **Reset Focus hors fenêtre** | 500 × Ères Concordées | Voir [[Économie]] §Flexibilité build |

**Prix indicatifs services** :
- Compte courant : gratuit pour < 100 Éclats / 0.5% au-delà
- Coffre standard : 100 Éclats / mois
- Prêt 1 mois 10 000 Éclats : intérêt 500-1 000 Éclats
- Action Bourse : variable (mise et gain)

**Le Banquier draine massivement** : sans lui, l'Éclat s'accumulerait chez les vétérans → power creep économique. Avec lui, chaque session gameplay paie un loyer minimal au système.

---

## 10. Comportement IA / signatures PNJ

**Cycle quotidien typique** :
- 07:00 lever — vérification coffres, comptage matinal
- 08:00 ouverture comptoir
- 08:00-12:00 — guichet, dépôts, change
- 12:00-13:30 pause (souvent au [[Tavernier|taverne]] de prestige : information)
- 13:30-18:00 — prêts, audits, négociations
- 18:00 fermeture, comptage de fermeture
- 19:00-22:00 vie sociale (réceptions, rumeurs, salons)
- 23:00 coucher

**Signatures de PNJ archétypaux** :
- **Le banquier-patriarche** — institution familiale sur 4 générations, conseiller royal
- **Le banquier-sceptique** — lit chaque débiteur dans les yeux, refuse 50% des prêts mais ne perd jamais
- **Le banquier-spéculateur** — Bourse des Augures, fortunes faites/perdues à chaque [[Le Souffle|Souffle]]
- **La banquière clandestine** — [[Noctari]], finance contrebandiers et Déliés
- **Le banquier-prêtre** — [[Foedus Animae]], serments sacrés, caution mystique

**PNJ célèbres** *(Phase 4)* :
- *Maison Veltarn* — dynastie bancaire de Galenor capitale, 6 générations
- *Selvar le Sec* — Aldraan port, surnom dû à son refus systématique de boire pendant les négociations
- *Maitre Augure Domvar* — directeur de la Bourse des Augures de Cendara

---

*Liens : [[Métiers]] · [[Personnage]] · [[Économie]] · [[L'Accord]] · [[Le Souffle]] · [[Armes et Maîtrise]] · [[Marchand]] · [[Scribe]] · [[Juge]] · [[Conseiller]] · [[Tavernier]]*
