---
tags: [métier, archétype, mysticisme, soin, esprit, résonance]
type: archetype
category: Métier
catégorie_métier: Mysticisme
stat_principale: Esprit
stats_secondaires: [Résonance, Conscience, Verbe]
voie_magique: Eldoria | Spiritus | secondaire (Aquor, Aurion)
religion_compatible: [Ignis Aeternum, Vael'Kurash, Foedus Animae, Ordo Caelum]
craft_category: -
sources_ressources_accessibles: [Cristal de Voie d'Eldoria, Essence spirituelle, Larme d'élémentaire, Eau bénite, Plante médicinale]
stations_principales: [Sanctuaire d'Eldoria, Cercle de soin, Source sacrée, Bosquet sacré]
outils_principaux: [Sceptre lumineux, Tome Codex Solis, Anneau d'Eldoria, Talisman]
paliers_maîtrise: [Novice, Initié, Adepte, Expert, Maître]
karma_typique: vert
factions_compatibles: [Ignis Aeternum, Vael'Kurash, Cercles de Voie d'Eldoria]
era_modulation: true
status: drafted
last_review: 2026-05-01
needs_review_for: [équilibrage-soin-vs-régen-passive, frontière-médecin]
---

# 💚 Guérisseur — Archétype Métier

> [!info] Entités tutélaires canoniques
> **[[Cosmologie|Cura]]** (Céleste — *Soigneur des maux mystiques*, guérisseur des maux mystiques et spirituels) et **[[Cosmologie|Mythica]]** (Céleste — *Vétérinaire des créatures mythiques*) pour le soin des bêtes. Voir [[Cosmologie]] §"Liste canonique des entités cosmiques". Source : `AccessExport/Legende.csv` (D-COSMO-LEGENDE-CSV-INTEGRATION).

> *"Le Médecin recoud. Moi, je rappelle au corps qu'il connaissait déjà la santé. Quand la plaie ferme sous ma paume, ce n'est pas moi qui la ferme — c'est le souvenir d'avant la blessure qui revient."*
> — **Sœur Aurelia**, Guérisseuse Voie d'Eldoria de Cendara

---

## 1. Vue d'ensemble

Le **Guérisseur** est le **soigneur mystique** d'Hybelior. Son pouvoir vient d'un Lien avec une entité de soin (principalement **Eldoria** ou **Spiritus**) ou d'une dévotion religieuse à une tradition de guérison. Là où le [[Médecin]] (catégorie Érudition, M4) répare le corps par anatomie, herbes et instruments terrestres, le Guérisseur **rétablit** par canalisation magique — il rappelle au corps son état antérieur à la blessure, ferme les plaies par lumière pure, expulse les venins par invocation de la nature, ou apaise les fièvres par bénédiction.

Le Guérisseur est aussi le **seul archétype** capable d'utiliser la **résurrection** au sens canonique (cf. [[Mort]] §Résurrection par allié) — réservée à la **Voie d'Eldoria**. Cette capacité fait du Guérisseur d'Eldoria un **rôle de groupe critique** en raid et en exploration dangereuse.

→ Référence [[Le Lien]] (Voies), [[Mort]] §Résurrection, [[Cosmologie]] §Eldoria et §Spiritus.

---

## 2. Stats brutes & Maîtrises associées

- **Stat principale** : **Esprit** — Mana max, complexité de sorts de soin
- **Stats secondaires** :
  - **Résonance** — intensité du soin, durée des HoT (Heal over Time)
  - **Conscience** (Couche 0) — perception du Lien, sensibilité aux blessures spirituelles
  - **Verbe** — incantations rituelles, prières de guérison, communication apaisante avec le patient
- **Maîtrises contextuelles** :
  - `Maîtrise_Voie_Eldoria` ou `Maîtrise_Voie_Spiritus` (la plus fréquente — mono-Voie, cf. [[Le Lien]])
  - `Maîtrise_Soin` — sous-maîtrise contextuelle qui s'ajoute aux Voies (techniques de soin spécifiques au corps mortel)
  - `Maîtrise_Foi_<Religion>` si Guérisseur religieux

> **Formule canonique des soins** : `Esprit × Résonance × Maîtrise_Voie × Maîtrise_Soin` (les deux Maîtrises se cumulent multiplicativement, plafond à ×4).

→ Référence [[Personnage]] §Régénération HP — le soin du Guérisseur **s'ajoute** à la régénération passive Vigueur.

---

## 3. Voie magique principale + religion

Le Guérisseur s'appuie sur **2 Voies principales** (mono-Voie obligatoire) avec quelques alternatives secondaires.

### Voies de soin (canoniques)

| Voie | Style de soin | Religion principale | Karma | Spécificité |
|------|---------------|---------------------|-------|-------------|
| **Voie d'Eldoria** | Lumière pure, soin direct, **résurrection** | [[Lore/Religions/Ignis Aeternum\|Ignis Aeternum]] | vert | **Seule Voie qui permet la résurrection** ([[Mort]] §30s). Bouclier de lumière, révélation des malédictions, destruction des morts-vivants. |
| **Voie de Spiritus** | Soin par la nature, communion avec faune/flore | [[Lore/Religions/Vael'Kurash\|Vael'Kurash]] | vert | Soin sur la durée (HoT), invocation animal-guérisseur, communication avec le patient via plantes. Très puissant en forêt/plaine. |

### Voies secondaires (alternatives plus rares)

| Voie | Style | Notes |
|------|-------|-------|
| **Voie d'Aquor** | Soin par eaux thermales/bénites | Régen Stamina + soin léger ; pratiqué dans les sanctuaires de [[Lore/Religions/Foedus Animae\|Foedus Animae]] côtiers |
| **Voie d'Aurion** | Énergie éthérée pure | Soin arcanique ; rare ; pratiqué dans les académies de [[Lore/Religions/Somnium Vigil\|Somnium Vigil]] (Vytharia, Lumasar) |

> [!important] Frontière Guérisseur vs Médecin
> Cette distinction est **capitale** :
>
> | Aspect | **Guérisseur** | **[[Médecin]]** |
> |--------|----------------|-----------------|
> | Source de pouvoir | Voie magique (Eldoria/Spiritus) ou Foi | Anatomie, herbes, instruments |
> | Catégorie métier | Mysticisme | Érudition |
> | Stat principale | Esprit + Résonance | Acuité + Mémoire |
> | Soin instantané (combat) | **Oui** (sorts) | Non (action 5-30s) |
> | Résurrection (30s post-mort) | **Oui** (Voie d'Eldoria) | **Non** |
> | Antidotes complexes | Limité | **Oui** (collab [[Apothicaire]]) |
> | Chirurgie / Greffe | Non | **Oui** (T4+) |
> | Maîtrise de l'opposition magique | Oui | Non |
>
> **Les deux peuvent collaborer** — un Guérisseur ferme une plaie majeure, un Médecin nettoie l'infection résiduelle.

---

## 4. Sources / composantes

**Consomme** :
- **Cristal de Voie d'Eldoria** ou **Cristal de Voie de Spiritus** (mineur à apex)
- **Essence spirituelle** (drop créatures cosmiques, Spiritus particulièrement)
- **Larme d'élémentaire** (rare, soin Magistral+)
- **Eau bénite** (collab [[Prêtre]])
- **Plante médicinale** (collab [[Herboriste]]) — Hémostine, Sanguinaire, Mousse-de-Lumière, Feuille-d'Aurore
- **Fiole rituelle** — pour potions de soin canalisées (collab [[Alchimiste]])

**Produit** (services et items) :
- **Soin ponctuel** — sort instantané sur cible (cf. §7)
- **HoT (Heal over Time)** — soin sur durée (Voie de Spiritus principalement)
- **Bouclier de lumière** (Eldoria) — réduit les dégâts entrants
- **Résurrection** (Eldoria, fenêtre 30s post-mort, cf. [[Mort]])
- **Bénédiction de soin** — buff de régen passive sur 1h
- **Larme de Lumière** (collab [[Alchimiste]] — cf. [[Potion]] §3.1 T5)

→ Référence [[Sources de Ressources]], [[Potion]] §3.1 Soin, [[Tome]] §5 *Codex Solis* + *Tomus Spiritus*.

---

## 5. Stations + outils

| Station | Rôle | Palier requis |
|---------|------|---------------|
| **Sanctuaire d'Eldoria** | Lieu sacré dédié au soin lumineux ; +25% efficacité Eldoria | Adepte |
| **Cercle de soin** | Cercle d'enchantement modifié pour rituels de guérison | Initié |
| **Source sacrée** (Spiritus) | Eaux vives consacrées ; régen Mana et soin amplifiés | Initié |
| **Bosquet sacré** (Spiritus) | Forêt ancienne ; communion avec la faune locale | Adepte |

**Outils** :
- **Sceptre lumineux** (Eldoria) ou **Bâton de bois ancien** (Spiritus) — arme/focus
- **Tome Codex Solis** (Eldoria) ou **Tomus Spiritus** (Spiritus) — sorts encapsulés (cf. [[Tome]] §5)
- **Anneau d'Eldoria** ou **Anneau de Spiritus** — bonus passif Voie (cf. [[Anneau]] §5)
- **Talisman de soin** — amulette portant un sort encapsulé de soin léger à charges illimitées

→ Référence [[Tome]] §5, [[Anneau]] §5, [[Items/Index]] §Focus magiques.

---

## 6. Paliers de Maîtrise

| Palier | Capacités de soin débloquées |
|--------|------------------------------|
| **Novice** | Soin Mineur (+50 HP, 1.5s incantation, 100 Mana). Bénédiction de régen passive (+1 HP/s, 30s). |
| **Initié** | Soin Standard (+150 HP), HoT (+20 HP/s × 10s, Spiritus), Bouclier mineur (+50 HP absorbés sur 10s, Eldoria). Inscription d'Anneau de soin. |
| **Adepte** | Soin Majeur (+350 HP), HoT amplifié, Bouclier moyen, **Antidote magique** (annule poison T1-T2). |
| **Expert** | Soin de zone (+200 HP × 5 alliés), HoT de groupe, **Résurrection Eldoria débloquée** (cf. [[Mort]]), exorcisme mineur. |
| **Maître** | **Condition cachée 🔒** — Soin Apex (+800 HP burst), bouclier de lumière permanent (1/jour), résurrection sans cooldown 1×/jour. *Aube guérisseuse* (Apex Eldoria, soin + révélation 50m). Œuvre signée. |

> Décroissance : un Guérisseur qui ne soigne plus voit sa Maîtrise rouiller. Particulièrement sensible chez les Liés d'Eldoria (Voie active sans usage = lien fragile).

---

## 7. Sorts/rituels par palier

| Palier | Sorts/rituels (exemples) |
|--------|--------------------------|
| **Novice** | *Aube mineure* (Eldoria : +50 HP, 100 Mana), *Sève apaisante* (Spiritus : HoT léger), *Lumière apaisante* (anti-douleur, narratif) |
| **Initié** | *Bouclier solaire mineur* (Eldoria), *Communion mineure avec la faune* (Spiritus), *Bénédiction de marche* (régen passive en voyage) |
| **Adepte** | *Soin de groupe* (4 alliés), *Antidote magique*, *Révélation de malédiction* (Eldoria : voit les debuffs cachés), *Invocation animal-guérisseur* (Spiritus : invoque temporairement un cerf-spirituel) |
| **Expert** | *Aube guérisseuse* (zone, +400 HP sur 5 alliés), *Résurrection* ([[Mort]]), *Convocation de la forêt* (Spiritus, soin zone + entrave ennemis), *Destruction du mal* (Eldoria, dégâts vs morts-vivants/possédés) |
| **Maître** | *Rayon créateur* (Apex Eldoria — recrée temporairement un membre amputé, condition narrative), *Royaume de Spiritus* (Apex Spiritus — invoque un esprit ancien, soin permanent zone tant que canalisé), *Pacte de guérison* (Lien profond — condition Œuvre signée) |

→ Cross-réf [[Tome]] §5 *Codex Solis* + *Tomus Spiritus*, [[Potion]] §3.1 *Larme de Lumière* T5 et *Sève de l'Aube Nouvelle* T6.

---

## 8. Carrière et progression spirituelle

- **Vocation** — souvent suite à un événement marquant (être soigné enfant, perdre un proche, voir un miracle)
- **Apprentissage** — auprès d'un Guérisseur Maître (mentorat) ou dans un sanctuaire (Cendara, Pyrtara pour Eldoria ; Alkaran, Ulinor pour Spiritus)
- **Engagement de Lien** — choix de la Voie (Eldoria ou Spiritus). Souvent accompagné d'un vœu narratif (ne jamais refuser un soin, ne jamais soigner pour de l'argent...)
- **Service public** — beaucoup de Guérisseurs s'attachent à un temple, un village, ou une expédition d'aventuriers
- **Reconnaissance** — la **Reconnaissance** (cf. [[Mort]]) monte rapidement chez un Guérisseur honnête, plus qu'auprès de tout autre métier
- **Maîtrise** — Œuvre signée de soin, parfois nomination au siège Éthéré ***Cura*** (cf. [[Cosmologie]] §Sièges Éthérés)

**Réseau** : [[Médecin]] (collaboration terrestre), [[Apothicaire]] (potions), [[Herboriste]] (plantes), [[Prêtre]] (rituels conjoints), [[Mage]] (réactions de Voie), [[Alchimiste]] (potions de soin haut tier).

### Sous-spécialisations canoniques (Role.csv)

> Source canonique : `Role.csv` (cat 8 — Mysticisme). Ce rôle correspond à un **palier Maître+** absorbé du legacy AccessExport.

#### Sous-spécialisation Maître+ : Guérisseur en chef

> Source canonique : `Role.csv` (cat 8, role n°35).

- **Description** : Guérisseur-Maître à la tête d'un **hospice, d'un sanctuaire de soin ou du service de santé d'une armée** — coordonne les Guérisseurs cadets, supervise les cas critiques, forme les apprentis.
- **Conditions** : palier Maître + Œuvre signée de soin + ≥ 1 hospice/sanctuaire sous direction OU rattachement à une armée en campagne + Reconnaissance ≥ Expert + 🔒 condition cachée (avoir géré une épidémie post-[[Le Souffle|Souffle]] sans perte critique OU sauvé un PNJ-clé d'un état mortel).
- **Notes** : frontière avec [[Médecin]] (chirurgien de guerre) et [[Prêtre]] (sanctuaire = temple). Le titre peut viser un Guérisseur Lié à Eldoria (soin spirituel) ou Spiritus (soin végétal-vital).

---

## 9. Modulation par contexte

| Contexte | Effet |
|----------|-------|
| **Ère du Rêve Lumineux** ([[Les Ères]], Eldoria) | +30% efficacité Voie d'Eldoria, sort Apex *Sève de l'Aube Nouvelle* débloquée |
| **Ère du Verdoiement** (Spiritus) | +25% Voie de Spiritus, recharge Mana en forêt +50% |
| **Ère de l'Ombre Longue** (Noctis) | −15% efficacité Eldoria (opposition), risque de rétrofeu sur soin de groupe |
| **Post-[[Le Souffle]] sem 1-2** | −10% sort/jour, focus Magistral+ rouille |
| **[[L'Accord]] ≥ 75%** | Résurrection débloquée plus tôt (Adepte au lieu d'Expert) |
| **Lieu sacré aligné** | Rituels +25%, recharge Mana +50% |
| **PvP (zone karma rouge)** | Restrictions narratives possibles : un Guérisseur d'Eldoria peut **refuser** de soigner un karma rouge ou noir |
| **Religion alignée** ([[Lore/Religions/Ignis Aeternum\|Ignis Aeternum]] pour Eldoria, [[Lore/Religions/Vael'Kurash\|Vael'Kurash]] pour Spiritus) | +Reconnaissance, accès à des rituels exclusifs |

**Karma typique** : **vert** quasi-systématiquement. Un Guérisseur qui refuse abusivement les soins, ou qui soigne des karma noirs notoires sans discernement, peut basculer en **jaune**.

---

## 10. Économie + Signatures PNJ

**Gold sinks générés** :
- Cristal de Voie d'Eldoria/Spiritus : 100-80 000 Éclats selon tier
- Essence spirituelle : 500-3 000 Éclats / unité
- Plantes médicinales (intrants Spiritus) : 10-500 Éclats / portion
- Eau bénite : 50-200 Éclats / fiole
- Construction de Sanctuaire : 100 000-2 000 000 Éclats (collab [[Architecte]] et [[Prêtre]])

**Revenus typiques** :
- Soin ponctuel (1 cible) : 50-500 Éclats (tier dépendant)
- HoT longue durée : 200-2 000 Éclats
- Bénédiction de marche : 100-1 000 Éclats (très demandé pour caravanes)
- Résurrection (Eldoria, 30s) : **5 000-50 000 Éclats** (haut prix — risque/réputation)
- Service permanent à un raid/expédition : 1 000-10 000 Éclats / jour
- Vente de Larme de Lumière (T5 collab Alchimiste) : 50 000-200 000 Éclats / fiole

**Chaîne économique** :
```
[[Herboriste]] (Plantes) → Guérisseur (Soin Spiritus)
                        → [[Alchimiste]] (Potions de soin haut tier)
[[Mineur]] → [[Lapidaire]] (Cristal d'Eldoria taillé) → Guérisseur (rituels)
[[Prêtre]] (Eau bénite, encens) → Guérisseur (rituels conjoints)
Guérisseur → Aventuriers/Caravanes (services payants)
Guérisseur → Faction religieuse (Reconnaissance, terres)
```

**Signatures PNJ archétypaux** :
- **La Sœur d'Eldoria** — guérisseuse de temple, Cendara/Pyrtara, lié [[Lore/Religions/Ignis Aeternum\|Ignis Aeternum]], karma vert pur
- **Le chamane-guérisseur Vael'Kari** — Spiritus, vit en forêt (Alkaran, Ulinor), double-casquette [[Herboriste]]
- **La Guérisseuse de raid** — itinérante, accompagne expéditions, coût élevé, souvent agnostique
- **Le Guérisseur silencieux** — *Taciti*, soigne sans parler, signé par gestes, rare et puissant
- **L'ancien Guérisseur de Navigor** — *introuvable* aujourd'hui ; les anciens grimoires mentionnent un soin par les âmes (Foedus Animae) qui aurait été perdu

**PNJ célèbres dans le monde** *(à étoffer Phase 4)* :
- *Sœur Aurelia* — Hiérarque guérisseuse de Cendara, dernier détenteur du *Codex Solis* original
- *Mère Talgren* — Vael'Kari Maîtresse de Spiritus, Alkaran ancien, soigne sans bourse
- *Frère Veylan d'Aurion* — Guérisseur arcanique académique, Astravia, controverse pour ses méthodes "froides"

---

*Liens : [[Métiers]] · [[Personnage]] · [[Le Lien]] · [[Cosmologie]] · [[Mort]] · [[Médecin]] · [[Apothicaire]] · [[Herboriste]] · [[Prêtre]] · [[Alchimiste]] · [[Tome]] · [[Anneau]] · [[Potion]] · [[L'Accord]] · [[Le Souffle]] · [[Lore/Religions/Ignis Aeternum]] · [[Lore/Religions/Vael'Kurash]]*
