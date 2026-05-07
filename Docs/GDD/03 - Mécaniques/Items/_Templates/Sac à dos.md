---
tags: [item, archétype, équipement, sac-a-dos, utilitaire, slot-dorsal]
type: archetype
category: Équipement
subcategory: Utilitaire
slot: Dos (utilitaire)
materials: [Cuir, Tissu, Cuir renforcé, Spécial-magique]
source: Fabriqué
mastery: [Tannage, Tissage, Maroquinerie, Joaillerie]
tier_min: 1
tier_max: 6
era_availability: [toutes]
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-capacite-port, slot-dorsal-conflit-cape, signatures-objets-csv]
ratio_vs_cuirasse: N/A (non-armure)
---

# 🎒 Sac à dos — Archétype slot dorsal utilitaire

> **Cas particulier** : équipement **non-armure défensive**. Le Sac à dos n'apporte **pas de défense physique/magique**. Il fournit **capacité de port**, **organisation**, et **affixes utilitaires** (récolte automatique, conservation, etc.).
>
> Ne suit pas la structure 5-classes-armure de [[Cuirasse]]. Il utilise une **structure par matériau** (Cuir, Tissu, Cuir renforcé, Spécial-magique) sans multiplicateurs de défense, mais avec progression de capacité par tier.

---

## 1. Vue d'ensemble

Le Sac à dos est un **équipement utilitaire** porté dans un slot dorsal :

- **0 défense** physique/magique (pas d'armure)
- Spécialité : **capacité de port**, **slots inventaire dédiés**, **affixes utilitaires**
- Bonus stat brute : Endurance (port prolongé), Vigueur (porter charges lourdes)
- Slot dorsal **partagé avec Cape** ([[Catégories d'Items]] TypeObjet #6 — non-armure également) → **conflit de slot** à arbitrer (1 seul équipable à la fois ou slots séparés ?). Voir §10.

> [!important] Cas particulier — pas de table 5 classes
> Le Sac à dos n'a **pas de Tissu/Cuir/Mailles/Plate parallèles**. Il a 4 **matériaux** (Cuir, Tissu, Cuir renforcé, Spécial-magique) et 6 tiers de capacité. **Pas de variants cosmiques systémiques** (le sac à dos est utilitaire, pas un marqueur d'identité cosmique). Mais il **peut** porter un variant si fabriqué pendant une ère active (effets utilitaires, voir §7).

---

## 2. Les 4 matériaux — déclinaisons

| Matériau | Profil | Stats brutes mises en valeur | Trade-offs |
|---|---|---|---|
| **Cuir** | Aventurier polyvalent | Endurance, capacité de port modérée | Bonne capacité, esquive non impactée, prix raisonnable |
| **Tissu** | Mage / Lié, exploration légère | Esprit, légèreté max | Capacité plus faible mais **+esquive** (ne ralentit pas) ; vulnérable à l'humidité |
| **Cuir renforcé** | Marchand / Soldat / Porteur | Vigueur, capacité **max** | Capacité maximale ; **−3 % esquive** (volume gênant) |
| **Spécial-magique** | Endgame / Lié alchimiste | Variable | **Réduction encombrement** par enchantement (sac plus léger qu'il ne paraît) ; matériaux rares |

> [!note] Spécial-magique = sac d'extension dimensionnelle
> Les sacs Spécial-magique exploitent un fragment de Voie (typiquement [[Cosmologie#Tempora\|Tempora]] ou un cristal d'Aurion enchâssé) pour **réduire l'encombrement perçu** ou **étendre l'espace interne**. Ce sont les sacs *signature* (voir §8) — souvent uniques, narrativement ancrés.

---

## 3. Stats par tier — table-pivot (capacité)

> Pas de défense. La progression se fait sur **capacité, slots et bonus utilitaires**.

| Tier | Nom | Cuir | Tissu | Cuir renforcé | Spécial-magique | Slots affixes |
|---|---|---|---|---|---|---|
| **T1** Commun | Sac simple | +20 kg · 8 slots | +12 kg · 6 slots · +2 % esquive | +30 kg · 10 slots · −2 % esquive | +25 kg · 10 slots · −5 % encombrement | 1 |
| **T2** Façonné | Sac façonné | +30 kg · 10 slots | +20 kg · 8 slots · +3 % esquive | +45 kg · 12 slots · −3 % esquive | +38 kg · 12 slots · −10 % encombrement | 2 |
| **T3** Œuvré | Sac œuvré | +45 kg · 12 slots · 1 sous-poche | +30 kg · 10 slots · +5 % esquive | +65 kg · 14 slots · −3 % esquive · 1 sous-poche | +55 kg · 14 slots · −15 % encombrement · 1 sous-poche | 2 |
| **T4** Magistral | Sac magistral | +65 kg · 14 slots · 2 sous-poches | +45 kg · 12 slots · +7 % esquive | +90 kg · 16 slots · −3 % esquive · 2 sous-poches | +80 kg · 16 slots · −20 % encombrement · 2 sous-poches | 3 |
| **T5** Légendaire | Sac légendaire | +85 kg · 16 slots · 2 sous-poches · 1 slot fiole | +60 kg · 14 slots · +10 % esquive | +120 kg · 18 slots · −2 % esquive · 3 sous-poches | +110 kg · 18 slots · −30 % encombrement · 3 sous-poches | 4 |
| **T6** Mythique | Sac mythique | +110 kg · 20 slots · 3 sous-poches · 2 slots fioles · *signature* | +80 kg · 18 slots · +15 % esquive · *signature* | +160 kg · 22 slots · 4 sous-poches · *signature* | +150 kg · 22 slots · −40 % encombrement · 4 sous-poches · *signature* | 4+1 |

> [!info] Lecture
> Sac Cuir renforcé T6 = **+160 kg** + **22 slots** — pour caravanier / marchand.
> Sac Spécial-magique T6 = **+150 kg** + **−40 % encombrement** : un sac de 200 kg pèse l'équivalent de 120 kg sur la barre d'encombrement.
> Sac Tissu T6 = **+15 % esquive** ! — paradoxalement, le mage qui porte peu mais agile gagne en mobilité.

### Sous-poches : qu'est-ce que c'est ?

Une **sous-poche** est un sous-inventaire dédié à une catégorie d'items :
- **Sous-poche Alchimie** : potions, fioles, plantes alchimiques
- **Sous-poche Outils** : outils de craft, instruments
- **Sous-poche Documents** : parchemins, livres, cartes
- **Sous-poche Récolte** : ressources brutes (minerai, peaux, plantes)
- **Sous-poche Munitions** : flèches, carreaux, fioles de jet

Chaque sous-poche a **+50 % capacité** pour sa catégorie spécifique, mais **0** pour les autres types. Le joueur **assigne** les sous-poches aux catégories au moment du craft (1 à 4 selon tier).

### Slots fioles (combat-ready)

Identique au système des [[Ceinture (armure)#5. Affixes spécifiques aux Ceintures (armure)]] — accès rapide à 1-2 potions en combat sans pause d'inventaire.

---

## 4. Capacité de port — formule

```
Capacité totale = Capacité_base_personnage (selon Vigueur) + Sac_à_dos + Ceinture + Affixes_capacité
```

> [!note] Plafond
> La capacité totale est plafonnée à **2× Vigueur en kg** (ex. Vigueur 100 → plafond ~200 kg). Le Sac à dos T6 Cuir renforcé apporte +160 kg → un personnage Vigueur 50 atteint le plafond avant même d'utiliser ses bottes ou ceinture.

### Réduction encombrement (Spécial-magique uniquement)

```
Poids effectif = Poids_total_inventaire × (1 − Réduction_encombrement)
```

Spécial-magique T6 (−40 %) : un inventaire pesant nominalement 200 kg pèse 120 kg sur la barre d'encombrement → le joueur conserve la mobilité.

---

## 5. Affixes spécifiques au Sac à dos

> Affixes orientés **utilité** (pas combat). Slots disponibles selon tier (1 à 4+1).

### Affixes universels Sac à dos

| Affixe | Effet T3 |
|---|---|
| **Capacité étendue** | +20 kg port supplémentaire |
| **Slot inventaire +** | +2 slots inventaire |
| **Sous-poche additionnelle** | +1 sous-poche au choix |
| **Conservation prolongée des consommables** | Les potions/aliments se gâtent **−50 % plus vite** (ou pas du tout selon item) |
| **Récolte automatique** | Récolte automatiquement les items au sol dans 2 m (gold, ressources mineures) |
| **Ouverture rapide en combat** | −50 % temps d'accès inventaire pendant combat |
| **Esquive si léger** | Si charge < 50 % capacité : +5 % esquive |
| **Anti-vol** | Immunité 75 % au pickpocket |
| **Sous-poche craft** | Bonus passif : −5 % consommation d'intrants si métier équipé |

### Affixes par matériau (propres)

| Matériau | Affixe |
|---|---|
| **Cuir** | *Sangle ergonomique* — −5 % drain Stamina porter |
| **Tissu** | *Coussin tisséfocus* — +5 % efficacité Voie passive (le sac contient un cristal léger) |
| **Cuir renforcé** | *Armature double* — capacité supplémentaire +30 kg (cumul avec affixe universel) |
| **Spécial-magique** | *Réduction étendue* — −5 % encombrement additionnel · proc 5 % d'apparition d'un slot temporaire en cas de surcharge urgente |

---

## 6. Recettes par matériau — Tier 3 référence

| Matériau | Métier | Intrants T3 | Maîtrise · Durée · Mini-jeu |
|---|---|---|---|
| **Cuir** | [[Tanneur\|Tanneur]] → [[Métiers - Maroquinier\|Maroquinier]] | 5× Cuir tanné · 4× Fil de cuir · 2× Boucle · 1× Sangle de toile | Adepte · 80 s · découpe + couture sangles |
| **Tissu** | [[Tisserand\|Tisserand]] + [[Métiers - Couturier\|Couturier]] | 4× Tissu (toile robuste) · 2× Fil métallique · 1× Pigment · 2× Boucle | Adepte · 70 s · cadence métier à tisser + couture |
| **Cuir renforcé** | Tanneur → Maroquinier + [[Forgeron\|Forgeron]] (renforts) | 6× Cuir tanné · 1× Lingot (renforts cadre) · 4× Fil métallique · 3× Boucle · 1× Sangle | **Expert** (palier 4) · 110 s · découpe + assemblage cadre métallique + couture |
| **Spécial-magique** | [[Métiers - Maroquinier\|Maroquinier]] + [[Enchanteur\|Enchanteur]] (rituel) | 4× Cuir tanné T3+ · 1× Cristal de Voie (Tempora ou autre) · 2× Fil métallique · 1× Essence spirituelle | **Maître** 🔒 · 180 s · rituel d'enchantement (séquence glyphes + audio-pattern) |

---

## 7. Variants — cas spécial

> Le Sac à dos **ne porte généralement pas** les 10 variants cosmiques de [[Cuirasse#7. Variants cosmiques (10 par ère)]] — il est utilitaire, pas marqueur cosmique. **Mais** un sac fabriqué pendant une ère active **peut** recevoir un **effet utilitaire dédié** lié à l'ère.

| Ère active | Effet utilitaire possible (au choix forgeron) |
|---|---|
| **Ère du Sommeil de Glace** | Conservation x3 sur consommables (le froid préserve) |
| **Ère du Verdoiement** | Récolte plantes en bonus (+1 plante par récolte en zone forêt) |
| **Ère de l'Ombre Longue** | Anti-vol total (immunité pickpocket) |
| **Ère des Échos Brisés** | Slot temporel (1 slot accessible "hors-temps", inaccessible 5 min après accès) |
| **Ère du Rêve Lumineux** | Révèle items rares dans 10 m (highlight visuel) |
| **Ère du Feu Endormi** | Résistance combustion intrants (les fioles inflammables ne se brisent pas) |
| **Ère des Vents Bouleversants** | Réduction poids des items légers (plumes, parchemins : −20 % poids) |
| **Ère de la Brume Mortelle** | Sac impossible à pickpocket par PNJ (immunité totale) |
| **Ère du Sommeil Onirique** | Slot rêve (1 slot débloqué uniquement quand le joueur dort) |
| **Ère des Présages** | +1 slot affixe |

> [!note] Cosmétique optionnel
> Visuellement, un sac peut **adopter** un variant cosmétique (Shadow, Spectral, etc.) sans le bonus gameplay propre — pure customisation. Les bonus utilitaires d'ère ci-dessus sont **séparés**.

---

## 8. Signatures — Sacs uniques (issus d'`Objets.csv`)

> 6 sacs à dos signatures issus de la table [[AccessExport/Objets.csv]] (TypeObjet #2). Chacun est un Sac **Spécial-magique T5-T6** narrativement ancré, à étoffer en Phase 4.

| Nom | Tier proposé | Description spéculative | Affixe signature |
|---|---|---|---|
| **Sacrumbrance** | T6 Spécial-magique | Sac d'ombre — contient ce qu'on y cache à la vue de tous | Items dans le sac sont **invisibles aux fouilles** ; immunité totale pickpocket ; aura ombrale visible |
| **Écumevol** | T5 Spécial-magique | Sac écumant, aérien — léger comme l'écume | **−60 % encombrement** (au-delà du plafond standard) ; +10 % esquive ; flotte 10 cm sous le porteur |
| **Légèrefolium** | T5 Spécial-magique | Tressé de feuilles vivantes pérennes | **Conservation infinie** des consommables végétaux (potions plantes, aliments crus, etc.) ; +5 % efficacité Voie de Spiritus |
| **Dracochitine** | T6 Spécial-magique | Carapace draconique transformée en sac | **+250 kg** capacité (record absolu) ; −10 % esquive (volume) ; résistance feu native +30 % |
| **Sylveflot** | T5 Spécial-magique | Sac flottant onarien, voyage maritime/lacustre | **Étanche total** ; capacité aquatique : items conservés sous l'eau intacts ; nage +20 % en zone humide |
| **Célestoplume** | T6 Spécial-magique | Sac fait de plumes du Premier Aigle | **−50 % encombrement** ; +10 % portée saut ; les chutes infligent −50 % dégâts |

> [!todo] Phase 4 : compléter le lore complet (origine, condition de drop/quête, contexte historique). Voir [[Phase 4 — Lore]] pour cadence d'enrichissement.

### Recettes signatures (squelette)

Toutes nécessitent **Maître 🔒** + condition cachée (ère active, item-clé, drop boss). Détails à finaliser P4.

---

## 9. Sets et synergies

> Le Sac à dos **ne fait pas partie d'un set d'armure**. Il est **neutre** vis-à-vis des set bonuses 3/5/8 de [[Cuirasse#9. Sets et synergies (question ouverte)]].

> [!note] Synergies émergentes
> - **Sac Spécial-magique + Ceinture (armure) + affixes capacité** : caravanier-mage qui transporte une économie sur le dos
> - **Sac Tissu + armure Cuir** : explorateur léger, esquive max
> - **Sacrumbrance + cuirasse Cuir Shadow** : voleur fantôme, items invisibles + porteur invisible

---

## 10. Décisions ouvertes

- ⚠️ **Conflit slot dorsal** Sac à dos vs Cape : 1 seul slot ou slots séparés ?
  - Option A : **un seul slot dorsal** → choix entre utilité (sac) et défense/cosmétique (cape). Tension tactique.
  - Option B : **slots séparés** (sac dorsal vs cape sur épaules+dos) → permet cumul mais augmente complexité visuelle.
  - **Proposition** : Option A par défaut, mais **affixe Spécial *Sac-cape*** débloquant cumul rare. → P3 décision.
- ⚠️ **Plafond capacité** : 2× Vigueur kg confirmé ? Comportement au-delà (drop forcé ? mvt = 0 ?).
- ⚠️ **Sous-poches** : assignation au craft (immutable) ou mutable post-craft ? → P3.
- ⚠️ **Spécial-magique vs Sacs signatures** : les 6 sacs d'`Objets.csv` sont-ils tous Spécial-magique ou certains sont-ils Cuir renforcé enchantés ? → P4 décision lore.
- ⚠️ **Effets utilitaires d'ère** : permanents ou tournants avec l'ère active ? Aligne sur la décision Cuirasse §10 affixes ères-spécifiques.
- ⚠️ **Sac à dos = équipement combat ou hors-combat seulement ?** Si sac perd HP/se déchire, ça change la valeur ; aujourd'hui considéré indestructible.

---

*Liens : [[Items/Index\|← Index Items]] · [[Cuirasse]] · [[Catégories d'Items]] · [[Crafts]] · [[Sources de Ressources]] · [[Personnage]] · [[Inventaire]]*
