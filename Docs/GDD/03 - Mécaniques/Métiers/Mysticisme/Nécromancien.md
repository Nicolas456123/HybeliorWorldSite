---
tags: [métier, archétype, mysticisme, magie, mort, esprit, conscience, tabou]
type: archetype
category: Métier
catégorie_métier: Mysticisme
stat_principale: Esprit
stats_secondaires: [Conscience, Résonance, Mémoire]
voie_magique: Noctis | Tempora | Spiritus (chamanique) | Navigor (relique)
religion_compatible: [Foedus Animae (légitime), Vael Kurash (chamanique), Noctari]
craft_category: -
sources_ressources_accessibles: [Cristal de Voie sombre, Essence d'âme, Os rituel, Sépulcre, Cendre funéraire]
stations_principales: [Cercle d'invocation, Crypte rituelle, Cimetière consacré, Sépulcre des ancêtres]
outils_principaux: [Sceptre d'os, Tome Liber Noctis, Anneau de Navigor, Talisman funéraire]
paliers_maîtrise: [Novice, Initié, Adepte, Expert, Maître]
karma_typique: rouge à noir (variable selon culture, vert dans Foedus Animae traditionnel)
factions_compatibles: [Foedus Animae (légitime), Noctari (clandestin), cultes funéraires tribaux]
era_modulation: true
status: drafted
last_review: 2026-05-01
needs_review_for: [équilibrage-tabou-pvp, distinction-foedus-vs-corrompu, voie-navigor-reliques]
---

# 💀 Nécromancien — Archétype Métier

> *"Vous appelez ça nécromancie. Mes ancêtres appellent ça **respect**. La différence n'est pas dans ce que je fais — c'est dans qui je sers. Les morts ou moi-même."*
> — **Korash de la Cendre**, Animari de Torkam

---

## 1. Vue d'ensemble

Le **Nécromancien** est le pratiquant magique de la **mort, des âmes, et des esprits désincarnés**. C'est l'archétype magique le plus **moralement complexe** d'Hybelior : selon la culture, le Nécromancien peut être un **chamane funéraire respecté** (Animari de Foedus Animae à Torkam) ou un **abomination tabou** (Voie de Noctis offensive en Galenor, Caeloria, Cendara).

Mécaniquement, le Nécromancien combine :
- **Manipulation des âmes** — appel d'esprits errants, dialogue avec les morts
- **Animation de matière morte** — squelettes, cadavres réanimés (rare et tabou)
- **Drain spirituel** — capter l'énergie vitale d'une cible
- **Manipulation temporelle des morts** (Voie de Tempora) — voir leur mort, "rejouer" un instant passé via leur écho
- **Pactes funéraires** (Foedus Animae) — sceller un serment qui survit à la mort

Le Nécromancien est l'archétype **karma-mobile** par excellence : son karma typique est **rouge à noir**, mais il peut être **vert** dans les sociétés qui le légitiment (cf. §3 et §9).

→ Référence [[Cosmologie]] §Noctis + §Tempora + §Anima + §Ancestralis, [[Le Lien]] §Voies, [[Lore/Religions/Foedus Animae\|Foedus Animae]].

---

## 2. Stats brutes & Maîtrises associées

- **Stat principale** : **Esprit** — capacité magique brute, complexité des invocations
- **Stats secondaires** :
  - **Conscience** (Couche 0) — perception des âmes, vue des esprits errants, lecture du Lien funéraire
  - **Résonance** — durée et intensité du contrôle sur entité réanimée ; profondeur du dialogue avec les morts
  - **Mémoire** — connaissance des rituels, des noms des défunts, des généalogies (essentiel pour pactes Foedus Animae)
- **Maîtrises contextuelles** :
  - `Maîtrise_Voie_Noctis` ou `Maîtrise_Voie_Tempora` ou `Maîtrise_Voie_Spiritus` (mono-Voie obligatoire)
  - `Maîtrise_Nécromancie` — sous-maîtrise contextuelle, rituels funéraires spécifiques
  - `Maîtrise_Foi_Foedus_Animae` (pour les chamanes légitimes)

---

## 3. Voie magique principale + religion

### Voies du Nécromancien

| Voie | Style | Religion principale | Karma typique |
|------|-------|---------------------|---------------|
| **Voie de Noctis** | Drain spirituel, terreur, ombre des morts | [[Lore/Religions/Noctari\|Noctari]] (clandestin) | **rouge à noir** |
| **Voie de Tempora** | Manipulation temporelle des morts (voir l'instant de la mort, rejouer un écho) | [[Lore/Religions/Rota Mundi\|Rota Mundi]] (rare, hérétique) | jaune à rouge |
| **Voie de Spiritus** *(chamanique)* | Communication avec esprits ancestraux, pacte funéraire — **considéré sacré** dans certaines tribus | [[Lore/Religions/Vael Kurash\|Vael'Kurash]], [[Lore/Religions/Foedus Animae\|Foedus Animae]] | **vert** dans la culture, jaune ailleurs |
| **Voie de Navigor** *(quasi-disparue)* | Passage des âmes — la Voie originale du nécromancien sacré | [[Lore/Religions/Via Ventus\|Via Ventus]] (rare) | vert, mais relique |

> [!important] Légitimité culturelle (clé du karma)
> Le Nécromancien est **légitime** :
> - À **Torkam, Skaldoria** : Animari de Foedus Animae, gardien des âmes ancestrales
> - À **Alkaran, Ulinor** : chamane Vael'Kari communiquant avec esprits ancestraux
> - Dans les **tribus du Pacte des Âmes**
>
> Il est **toléré mais surveillé** :
> - À **Vytharia, Nysaria, Avalor** : Veilari de Noctari, suspicion publique
> - Dans les **No Man's Land** (Azoria)
>
> Il est **persécuté** :
> - À **Cendara, Pyrtara** ([[Lore/Religions/Ignis Aeternum\|Ignis Aeternum]] — purification par feu, donc opposé à la conservation des morts)
> - À **Caeloria, Astravia** ([[Lore/Religions/Ordo Caelum\|Ordo Caelum]] — destins fixes, pas de retour)
> - À **Mosrack, Iskara, Altram** ([[Lore/Religions/Lex Petra\|Lex Petra]] — la mort est un état définitif, le réveil est une violation de la Loi)

> [!warning] Voie de Navigor — relique
> Navigor est **disparu** ([[Cosmologie]]). Ses Voies sont **quasi-inaccessibles**. Un Nécromancien lié à Navigor est une figure mythique. Voir [[Tome]] §Tome scellé de Navigor (signature unique).

---

## 4. Sources / composantes

**Consomme** :
- **Cristal de Voie sombre** (Noctis ou Tempora, mineur à apex)
- **Essence d'âme** — drop d'entités fantomatiques ou récolte rituelle de mort consenti
- **Os rituel** — humain ou créature, **consenti culturellement** ou tabou selon tradition
- **Sépulcre / Cendre funéraire** — composant rituel pour pacte de lignée
- **Cierge funéraire** (collab [[Cuisinier]] / [[Apothicaire]] — cire spéciale)
- **Sang de la cible** (rare, contesté) — pour rituels d'invocation forcée

**Produit** (services et items) :
- **Communion avec les morts** — dialogue avec un esprit errant, révélation d'informations cachées
- **Pacte funéraire** ([[Lore/Religions/Foedus Animae\|Foedus Animae]]) — sceau qui survit à la mort, transmissible
- **Animation de matière morte** (rare, tabou hors Foedus Animae) — squelette serviteur 24h-1 mois
- **Drain spirituel** (offensif) — vol d'énergie vitale en combat (cf. [[Le Lien]] §Réactions opposées)
- **Scellement de tombe** — protège contre profanation, débloque certaines Reconnaissances

→ Référence [[Sources de Ressources]], [[Tome]] §5 *Liber Noctis* + *Tomus Trans-Mundo* (relique Navigor), [[Anneau]] §5 Noctis + Navigor (relique), [[Potion]] §Larme de Foedus.

---

## 5. Stations + outils

| Station | Rôle | Palier requis |
|---------|------|---------------|
| **Cercle d'invocation** | Variante rituelle du cercle d'enchantement, gravée pour appel des morts | Adepte |
| **Crypte rituelle** | Lieu permanent (souvent souterrain) ; +25% efficacité | Adepte |
| **Cimetière consacré** | Dans les religions légitimantes, sanctuaire-pivot | Initié |
| **Sépulcre des ancêtres** ([[Lore/Religions/Foedus Animae\|Foedus Animae]]) | Lieu de pacte multi-générationnel | Expert |

**Outils** :
- **Sceptre d'os** ou **bâton funéraire** — focus, +Conscience pour appel des morts
- **Tome *Liber Noctis*** ou *Tomus Trans-Mundo* (Navigor, relique) — sorts encapsulés (cf. [[Tome]] §5)
- **Anneau de Noctis** ([[Anneau]] §5 Noctis) — drain Mana sur frappe critique, +Vivacité la nuit
- **Anneau de Navigor** ([[Anneau]] §5 Navigor) — **relique uniquement, signature** : 1 charge téléportation courte
- **Talisman funéraire** — porte un sort encapsulé d'invocation/communion à charges limitées

---

## 6. Paliers de Maîtrise

| Palier | Capacités débloquées |
|--------|----------------------|
| **Novice** | *Murmure aux morts* (entendre échos brefs sur lieu de mort récent), *Drain mineur* (Noctis : −10 HP cible, +5 Mana soi). Marque sociale forte (suspicion). |
| **Initié** | *Communion brève* (dialogue 30s avec esprit errant), *Drain Standard*, *Marque de Foedus* (sceau de pacte personnel) |
| **Adepte** | *Animation de squelette* (1 serviteur 24h, fatigue Mana fort), *Drain Majeur*, *Voie passé proche* (Tempora — voir 30s passées sur lieu de mort) |
| **Expert** | *Pacte multi-générationnel* (Animari Foedus Animae), *Communion prolongée* (1h dialogue avec esprit nommé), *Animation de cadavre* (créature ou humain — **fortement tabou**), *Drain Apex* |
| **Maître** | **Condition cachée 🔒** — *Marche entre les mondes* (Lien profond Navigor — relique), *Pacte éternel* (sceau qui passe à travers les Souffles), *Convocation d'ancêtre nommé* (esprit légendaire historique). Œuvre signée. |

> Décroissance : un Nécromancien qui n'entretient pas son Lien aux morts voit ses pactes s'effriter. Pacte de Foedus Animae rompu = perte massive de Reconnaissance dans la lignée concernée.

---

## 7. Sorts/rituels par palier

| Palier | Rituels signature |
|--------|-------------------|
| **Novice** | *Murmure aux morts*, *Drain mineur* (Noctis), *Cendre apaisante* (rituel funéraire mineur) |
| **Initié** | *Communion brève*, *Marque de Foedus*, *Voile d'ombre* (Noctis), *Lecture du dernier souffle* (sur cadavre frais : voir les 5 dernières secondes de vie) |
| **Adepte** | *Animation de squelette serviteur 24h*, *Pacte de pierre tombale* (sceau permanent sur tombe), *Drain de Mana ennemi*, *Convocation d'écho* (Tempora) |
| **Expert** | *Pacte multi-générationnel*, *Communion prolongée nommée*, *Convocation de la forêt* funéraire (Spiritus chamanique : invoque esprits-bêtes ancestraux), *Animation cadavre humain* (tabou) |
| **Maître** | *Marche entre les mondes* (Apex Navigor — relique légendaire), *Convocation d'ancêtre légendaire historique* (info exclusive sur l'histoire d'Hybelior), *Pacte éternel*, *Œuvre signée — Larme de Foedus* (cf. [[Potion]] §Larme de Foedus T6) |

→ Cross-réf [[Tome]] §5 *Liber Noctis* + *Tomus Trans-Mundo*, [[Anneau]] §5 Noctis/Navigor, [[Potion]] §8 *Larme de Foedus*.

---

## 8. Carrière et progression spirituelle

- **Vocation** — souvent suite à un deuil profond, une vision, ou une lignée familiale (Animari)
- **Apprentissage** — auprès d'un Animari Maître (Torkam, Skaldoria), d'un chamane Vael'Kari (Alkaran), ou clandestinement chez les Veilari Noctari (Vytharia)
- **Engagement** — premier pacte funéraire ; pour les Animari, souvent avec un ancêtre proche
- **Service** — rôle communautaire (chamane funéraire) ou clandestin (Veilari) selon religion
- **Reconnaissance** — chez Foedus Animae uniquement : Reconnaissance accrue. Ailleurs, **Reconnaissance négative** par défaut.
- **Maîtrise** — Œuvre signée funéraire, parfois nomination siège Éthéré ***Cura*** (guérison mystique) ou un siège-âme dédié (à définir Phase 4)
- **Bascule sombre** — abandon des règles culturelles, pratique offensive en PvP, drain de joueurs vivants → karma noir, statut de hors-la-loi spirituel

**Réseau** : [[Prêtre]] Animari (collaboration directe), [[Lore/Religions/Vael Kurash\|chamanes Vael'Kari]], [[Mage]] Noctis ou Tempora (rare alliance), [[Historien]] (généalogies), [[Bibliothécaire]] (textes funéraires anciens).

---

## 9. Modulation par contexte

| Contexte | Effet |
|----------|-------|
| **Ère de l'Ombre Longue** ([[Les Ères]], Noctis) | +30% Voie de Noctis, animations doublées, recettes uniques |
| **Ère des Échos Brisés** (Tempora) | +25% Voie de Tempora, lecture des morts amplifiée |
| **Ère du Rêve Lumineux** (Eldoria) | −25% efficacité (opposition fondamentale), pactes à risque |
| **Post-[[Le Souffle]]** | Pactes Magistral+ rouille −10% sem 1-2 ; un Souffle Cardinal peut **briser tous les pactes non scellés** |
| **[[L'Accord]] ≥ 75%** | Pactes éternels débloqués plus tôt |
| **Cimetière / Crypte / Sépulcre** | +25% efficacité, recharge Mana +30% |
| **Religion légitimante** ([[Lore/Religions/Foedus Animae\|Foedus Animae]] à Torkam) | Karma vert maintenu, Reconnaissance accrue |
| **Religion persécutante** ([[Lore/Religions/Ignis Aeternum\|Ignis Aeternum]] à Cendara) | Hostilité PNJ, possible bannissement, Reconnaissance ×0.3 |
| **PvP — drain spirituel sur joueur** | Bascule karma immédiate (rouge minimum) |
| **PvE — animation de cadavre humain** | Karma rouge automatique hors zone Foedus Animae légitime |

**Karma typique** :
- **Vert** : Animari Foedus Animae à Torkam/Skaldoria, chamane Vael'Kari à Alkaran (chamanique-tribal)
- **Jaune** : Veilari Noctari à Vytharia, Nécromancien itinérant non aligné
- **Rouge** : Drain offensif, animations sans consentement culturel
- **Noir** : Drain massif sur joueurs vivants en PvP, animation de cadavres profanés, pactes forcés

---

## 10. Économie + Signatures PNJ

**Gold sinks générés** :
- Cristal de Voie sombre (Noctis/Tempora) : 100-80 000 Éclats selon tier
- Essence d'âme : 1 000-10 000 Éclats / unité (rare, certains marchés noirs)
- Os rituel consenti : 50-1 000 Éclats / portion (légalement vendu chez Foedus Animae)
- Os rituel non consenti : marché noir, prix variable, **risque légal**
- Construction de Crypte rituelle : 100 000-2 000 000 Éclats (dans culture légitimante)

**Revenus typiques (selon culture)** :
- Service funéraire Animari : 1 000-50 000 Éclats / cérémonie
- Pacte multi-générationnel : 10 000-500 000 Éclats par génération
- Communion avec un défunt nommé (info historique) : 5 000-100 000 Éclats
- Drain offensif (mercenaire clandestin) : 10 000-200 000 Éclats (très risqué)
- Vente de **Larme de Foedus** (cf. [[Potion]] §T6) : 500 000+ Éclats / fiole
- Scellement de tombe (anti-profanation) : 1 000-20 000 Éclats

**Chaîne économique** :
```
[[Mineur]] → [[Bijoutier]] (Cristal de Noctis taillé) → Nécromancien
[[Boucher]] / chasse rituelle → Os rituel (collab avec Foedus Animae uniquement)
[[Apothicaire]] / [[Alchimiste]] (Cire funéraire, encens noir) → Nécromancien
Nécromancien → [[Lore/Religions/Foedus Animae\|Animari]] (rituels familiaux)
Nécromancien → Aventuriers (informations historiques, scellements)
Nécromancien clandestin → Marché noir / commandes Veilari Noctari
```

**Signatures PNJ archétypaux** :
- **L'Animari de Torkam** — chamane funéraire respecté, Voie de Spiritus chamanique, karma vert pur, héritage matrilinéaire
- **Le Veilari Noctari de Vytharia** — clandestin, drain spirituel, espionnage des morts, karma jaune
- **Le Nécromancien hérétique** — banni de Cendara, vit en No Man's Land, karma rouge, recherché par Ignis Aeternum
- **Le Lié de Tempora ermite** — rare, communique avec les morts via leur écho temporel, neutre culturellement
- **Le "dernier" Lié de Navigor** — figure mythique, légende d'un mortel encore vivant qui aurait gardé un fragment du passage entre les mondes (signature, [[Tome]] §Tome Scellé de Navigor)

**PNJ célèbres dans le monde** *(à étoffer Phase 4)* :
- *Korash de la Cendre* — Animari chef de Torkam, gardien du Sépulcre des Mille
- *Mère Vraga* — Vael'Kari chamane d'Ulinor, communique avec les esprits-bêtes ancestraux
- *Le Veilari Sans-Nom* — chef secret du réseau funéraire de Vytharia, identité protégée par 3 sceaux
- *Le Lié Disparu* — figure mythique, Lié de Navigor légendaire ; sa relique (l'Anneau de Navigor) est recherchée

---

*Liens : [[Métiers]] · [[Personnage]] · [[Le Lien]] · [[Cosmologie]] · [[Mort]] · [[Lore/Religions/Foedus Animae]] · [[Lore/Religions/Vael Kurash]] · [[Lore/Religions/Noctari]] · [[Prêtre]] · [[Mage]] · [[Oracle]] · [[Tome]] · [[Anneau]] · [[Potion]] · [[L'Accord]] · [[Le Souffle]] · [[Les Ères]]*
