---
tags: [métier, archétype, érudition, mémoire, acuité]
type: archetype
category: Métier
catégorie_métier: Erudition
stat_principale: Mémoire
stats_secondaires: [Acuité, Verbe, Endurance]
craft_category: 2 — Alchimie (partiel)
sources_ressources_accessibles: [Plante, Racine, Fleur, Liquide, Sang, Os, Organe, Émulsion alchimique, Huile]
stations_principales: [Cabinet médical, Table d'examen, Mortier et pilon, Hospice, Atelier de bandages]
outils_principaux: [Trousse médicale, Scalpel, Forceps, Stéthoscope rudimentaire, Bandages, Aiguilles à suturer]
paliers_maîtrise: [Novice, Initié, Adepte, Expert, Maître]
métiers_complémentaires: [Apothicaire, Herboriste, Alchimiste, Chercheur, Bibliothécaire]
era_modulation: true
status: drafted
last_review: 2026-05-01
needs_review_for: [frontière-guérisseur-mystique-stabilisée, soins-non-magiques-effets-playtest]
---

# 🩺 Médecin — Archétype Métier

> *« La main qui tient le scalpel ne prie pas. Elle tranche au bon endroit. C'est tout ce que les morts demandent qu'on apprenne. »*
> — **Maître Salvarian de Galenor**, fondateur de l'École médicale de la Côte

---

## 1. Vue d'ensemble

Le **Médecin** soigne par le **savoir terrestre** : anatomie, herbes simples, sutures, antidotes, gestion des maladies. C'est le pendant **rationnel** du soin, là où le [[Guérisseur]] (M5 — Mysticisme) opère par la **Voie magique**, la prière ou le rituel.

Sa force est sa **fiabilité** : un médecin ne dépend pas d'un Lien, ne s'épuise pas en mana, ne perd pas son efficacité avec les paliers d'[[L'Accord|Accord]]. Il opère avec ce qu'il a vu, étudié et pratiqué. C'est aussi ce qui le **limite** : il ne ressuscite pas, ne purge pas une malédiction, ne lit pas une âme.

> [!important] Frontière avec le Guérisseur
> - **Médecin (M4 — Érudition)** : soins terrestres, anatomie, herbes simples, antidotes, sutures, gestion d'épidémies. Pas de magie. Stat principale **Mémoire**.
> - **[[Guérisseur]] (M5 — Mysticisme)** : soins mystiques, [[Voie]] magique (souvent [[Salus]]), prière, rituel. Régénère mana, purge malédictions. Stat principale **Esprit / Conscience**.
>
> Beaucoup de PNJ exercent les deux (le « médecin-prêtre » est un archétype social fort), mais les **Maîtrises sont distinctes** : `Maîtrise_Médecine` ≠ `Maîtrise_Guérison_Mystique`.

> [!important] Frontière avec l'Apothicaire
> - **Médecin** : soigne le **patient** (acte clinique), prescrit les remèdes
> - **[[Apothicaire]]** : prépare les **remèdes** (boutique, comptoir), peut conseiller mais ne pratique pas l'acte clinique
>
> Le médecin **prescrit**, l'apothicaire **prépare**, l'alchimiste **invente**.

---

## 2. Stats brutes & Maîtrises associées

- **Stat principale** : **Mémoire** — anatomie, pharmacopée, identification des symptômes, archives de cas
- **Stats secondaires** :
  - **Acuité** — diagnostic visuel, lecture du pouls, suture précise
  - **Verbe** — relation patient, rassurer, transmettre la prescription
  - **Endurance** — gardes longues à l'hospice, opérations prolongées
- **Maîtrise contextuelle** : `Maîtrise_Médecine` — progresse à chaque diagnostic correct, chaque suture réussie, chaque patient sauvé. Sous-spécialités à partir d'Adepte : Chirurgie / Pharmacopée / Épidémiologie / Pédiatrie / Médecine de campagne.

→ Référence Couche 1 [[Personnage]] §Stats brutes. Maîtrise contextuelle [[Personnage]] §Couche 2.

---

## 3. Sources de ressources

**Consomme** :
- **Source 1 — Nature** : [[Plante]] médicinales, [[Racine]], [[Fleur]], [[Feuille]], [[Liquide]] (eau pure, sources)
- **Source 2 — Créature** : [[Sang]] (transfusions rudimentaires palier Maître), [[Os]] (poudre calcium), [[Graisse animale]] (onguents), [[Sécrétion]] (rares cas)
- **Source 3 — Fabrication** : [[Émulsion alchimique]] (acquise auprès de l'[[Alchimiste]]), [[Huile]], [[Cire raffinée]] (pour bandages imprégnés)
- **Tissus** ([[Tisserand]]) : bandages, charpie

**Produit** :
- **Soins directs** (acte) : sutures, réductions de fractures, traitement de poisons, accouchements
- **Remèdes simples** : décoctions, infusions, baumes terrestres (sans dimension magique)
- **Diagnostics** (output documentaire) — précieux : un bon diagnostic vaut une potion
- **Antidotes terrestres** — par opposition aux antidotes alchimiques avancés (alchimiste)

→ Référence [[Crafts]] §2 — Alchimie (partiel, pour les remèdes simples). Acte clinique non couvert par Crafts (gameplay-acte direct).

---

## 4. Stations + outils

| Station | Rôle | Palier requis |
|---------|------|---------------|
| **Cabinet médical** | Consultation, examen, conservation des remèdes | Novice |
| **Table d'examen** | Acte clinique de base, suture | Novice |
| **Mortier et pilon** | Préparation de remèdes simples | Novice |
| **Atelier de bandages** | Confection de pansements imprégnés | Initié |
| **Hospice** | Gestion de patients en chambrée, épidémies | Adepte |
| **Salle d'opération** | Chirurgie avancée | Expert |

**Outils signature** :
- **Trousse médicale** — portable, contient scalpel, forceps, fil, aiguilles
- **Scalpel** (qualité [[Bijoutier]] / [[Forgeron]] de précision)
- **Stéthoscope rudimentaire** (palier Adepte+)
- **Forceps** — accouchements, extractions
- **Aiguilles à suturer** — fines (Bijoutier)
- **Bandages** — du [[Tisserand]] ou [[Couturier]]

→ Référence [[Crafts]] §Stations §Mortier et pilon (partagé avec Apothicaire et Alchimiste).

---

## 5. Paliers de Maîtrise

| Palier | Capacités débloquées |
|--------|----------------------|
| **Novice** | Premiers secours, suture simple, diagnostic des maladies communes. Taux d'échec ~15% (mauvais diagnostic) |
| **Initié** | Réduction de fractures, traitement des poisons légers, accouchements simples |
| **Adepte** | Chirurgie de base (extraction de flèche, amputation contrôlée), gestion d'épidémie locale, sous-spécialité déclarable |
| **Expert** | Chirurgie complexe, remèdes contre maladies rares, gestion d'épidémie majeure, formation d'apprentis |
| **Maître** | **Condition cachée 🔒** — Acte chirurgical signé (sauve un patient « condamné »), traité médical publié (Héritage), école médicale fondée |

> Décroissance : voir [[Armes et Maîtrise]] §Décroissance. Un médecin qui ne pratique plus pendant longtemps oublie les gestes techniques (rouille -15%).

---

## 6. Activités débloquées

| Palier | Exemples (3-5) |
|--------|----------------|
| **Novice** | Soigner blessure légère · Diagnostiquer fièvre · Préparer décoction de saule |
| **Initié** | Réduire fracture · Suturer plaie profonde · Identifier 5 poisons communs · Accoucher d'un nouveau-né |
| **Adepte** | Extraire flèche barbelée · Traiter peste mineure · Diagnostiquer maladie rare · Former un apprenti |
| **Expert** | Opérer une plaie pénétrante · Gérer une épidémie de quartier · Identifier maladie d'ère · Conseiller un seigneur |
| **Maître** | **Œuvre signée** : traité médical (Héritage), école médicale, "miracle médical" sans magie (Acte signé) |

→ Cross-réf maladies d'ère : [[Les Ères]] §Brume Mortelle module les épidémies.

---

## 7. Carrière et débouchés

- **Démarrage** : apprenti dans un hospice urbain, ou aide de campagne (rural). Sutures, ramassage d'herbes
- **Progression** : médecin de quartier → médecin de guilde → médecin de campagne militaire (chirurgien de guerre)
- **Établissement** :
  - **Médecin de cour** — soigne les seigneurs (haute Présence requise indirectement)
  - **Médecin d'hospice** — service public, rémunération modeste mais [[L'Accord]] social fort
  - **Chirurgien de guerre** — accompagne armées, suit les campagnes
  - **Médecin-chercheur** — collabore avec [[Chercheur]] et [[Alchimiste]] sur nouveaux remèdes
- **Réseau** :
  - **Amont** : [[Herboriste]] (plantes), [[Apothicaire]] (remèdes), [[Alchimiste]] (potions complexes), [[Tisserand]] (bandages)
  - **Pair** : [[Guérisseur]] (souvent collaborent face à un cas mixte terrestre/spirituel)
  - **Aval** : patients (économie directe), guildes, factions militaires
- **Faction** : Écoles médicales (Galenor, Astravia), confréries d'hospitaliers, religion [[Foedus Animae]] (pacte de soin entre vivants)

### Sous-spécialisations canoniques (Role.csv)

> Source canonique : `Role.csv` (cat 8 — Mysticisme). Ce rôle correspond à un **palier Maître+** absorbé du legacy AccessExport, mais classé en frontière Mysticisme/Erudition.

#### Sous-spécialisation Maître+ : Chirurgien royal

> Source canonique : `Role.csv` (cat 8, role n°36).

- **Description** : Médecin-Maître attaché à une cour royale ou à un état-major militaire — pratique la **chirurgie d'élite** (amputations, sutures complexes, extractions de projectiles), responsable de la santé physique du souverain et de la noblesse rapprochée.
- **Conditions** : palier Maître axe **chirurgical** + investiture par la cour OU l'armée + ≥ 1 opération critique réussie sur un PNJ-clé + Reconnaissance ≥ Expert + 🔒 condition cachée (avoir sauvé la vie d'un souverain ou héritier OU survécu à une bataille comme chirurgien de guerre sans abandon de poste).
- **Notes** : `[REFONTE-NEEDED — frontière Mysticisme (cat 8 CSV) / Erudition (Médecin cat 6 archétype). Le Médecin est canoniquement Erudition mais le rôle « Chirurgien royal » est listé en cat 8 dans le CSV — rattachement ici par cohérence métier (Médecin), avec note de frontière à arbitrer.]` Frontière avec [[Guérisseur]] (Guérisseur en chef = collaboration sanitaire).

---

## 8. Modulation par contexte

| Contexte | Effet |
|----------|-------|
| **Ère [[Les Ères|Verdoiement]] (Terranu)** | +20% efficacité remèdes végétaux, abondance d'herbes |
| **Ère [[Les Ères|Brume Mortelle]]** | Épidémies actives → demande médicale x3, recettes spéciales débloquées, danger de contagion personnelle |
| **Ère [[Les Ères|Sommeil de Glace]] (Climata)** | Maladies hivernales (gelures, pneumonie), conservation des remèdes facilitée |
| **Ère [[Les Ères|Vents]] (Aerion)** | Maladies aéroportées, médecine itinérante valorisée |
| **Post-[[Le Souffle]] semaine 1** | Pic de demande (dérégulation des organismes par le Souffle), médecin sur-sollicité |
| **[[L'Accord]] ≥ 75%** | Accès à une nouvelle pharmacopée d'ère |
| **[[L'Accord]] = 100%** | Œuvre signée : Traité médical d'ère (Héritage permanent) |
| **Religion [[Foedus Animae]]** | Pacte de soin, médecin reconnu comme officiant social |
| **Religion [[Ignis Aeternum]]** | Cautérisation rituelle, soins par le feu (frontière avec [[Guérisseur]]) |
| **Faction militaire** | Chirurgien de guerre, expérience accélérée mais usure psychique |

---

## 9. Économie

**Gold sinks générés** :
- Loyer cabinet : 200-1 000 Éclats / mois
- Outils chirurgicaux : 100-500 Éclats / set ([[Bijoutier]] / [[Forgeron]] de précision)
- Bandages et tissus : 20-100 Éclats / lot ([[Tisserand]])
- Stock de plantes médicinales : 50-300 Éclats / semaine ([[Herboriste]])

**Prix indicatifs** :
- Consultation simple : 5-20 Éclats
- Suture : 20-50 Éclats
- Réduction de fracture : 50-150 Éclats
- Accouchement : 100-500 Éclats (selon complications)
- Chirurgie complexe : 500-5 000 Éclats
- Acte signé Maître : prix négocié, souvent en Héritage social

**Chaîne économique** :
```
[[Herboriste]] / [[Apothicaire]] / [[Alchimiste]] (composants & remèdes) → Médecin (Acte clinique)
                                                                         ↘ Patient (paiement direct)
                                                                         ↘ Hospice (service public)
                                                                         ↘ Armée / Guilde (contrat)
                                                                         ↘ [[Bibliothécaire]] (publication)
```

Cross-réf [[Économie]] : la médecine est l'un des rares services « inélastiques » (on paie quand on a mal).

---

## 10. Comportement IA / signatures PNJ

> *Modèle IA pas tranché — voir [[Concepts Fondamentaux IA PNJ]]. Indication gameplay seul.*

**Cycle quotidien typique** :
- 06:00 lever — visite des patients de l'hospice
- 07:00-12:00 — consultations au cabinet
- 12:00-13:00 — pause (souvent interrompue par urgences)
- 13:00-18:00 — actes cliniques, sutures, visites à domicile
- 18:00-20:00 — préparation de remèdes simples, courrier
- 20:00-22:00 — étude (anatomie, traités), correspondance avec confrères

**Signatures de PNJ archétypaux** :
- **Le médecin de quartier** — connu de tous, paye-en-nature accepté, gestes sûrs
- **La sage-femme** — métier très ancien, transmission matrilinéaire, mémoire orale
- **Le chirurgien de guerre** — mains rapides, regard dur, peu de paroles inutiles
- **Le médecin-chercheur** — atelier mêlé d'herbes et de cadavres, méfiance sociale (frontière trouble avec nécromancie)
- **Le médecin de cour** — habits soignés, langue précise, connaît les poisons aussi bien que les remèdes

**PNJ célèbres dans le monde** *(à étoffer Phase 4)* :
- *Maître Salvarian de Galenor* — fondateur de l'École médicale de la Côte (cf. citation d'ouverture)
- *Dame Mireia, l'Hospitalière de Mosrack* — soigna 3 épidémies, sainte mineure de [[Foedus Animae]]
- *Frère Tobeck l'Anatomiste* — controversé, premier traité d'anatomie illustré (Héritage)

---

*Liens : [[Métiers]] · [[Personnage]] · [[Crafts]] · [[Sources de Ressources]] · [[Économie]] · [[Armes et Maîtrise]] · [[L'Accord]] · [[Le Souffle]] · [[Les Ères]] · [[Apothicaire]] · [[Herboriste]] · [[Alchimiste]] · [[Guérisseur]] · [[Bibliothécaire]] · [[Tisserand]]*
