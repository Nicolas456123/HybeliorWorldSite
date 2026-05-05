---
tags: [implementation, ue5, lore, dialogue, religions]
type: implementation
status: drafted
last_review: 2026-05-01
needs_review_for: []
implements: []
---

# Lore

Vue d'ensemble du lore HybeliorWorld — 13 continents, **9 religions canoniques** (D-GD-9-RELIGIONS). Référence pour l'écriture des dialogues ([[Dialogue Component]]) et la caractérisation des entités.

## 13 continents principaux

| Continent | Thème dominant |
|-----------|---------------|
| Alkaran | Forge / honneur |
| Galenor | Commerce / arts |
| Ilthara | Nature vivante |
| Endora | Loi / ingénierie |
| Celethor | Magie |
| Onara | Militaire |
| Azoria | Exploration |
| Evertia | Abondance sacrée |
| Ulinor | Chamanisme |
| Cendara | Volcans / alchimie |
| Cestra | Horreur cosmique |
| Baelor | Moines martiaux |
| Nysaria | Îles / brumes |

## 9 religions canoniques (GDD)

> Aligné sur le canon GDD post-refonte. Voir [[00 - Système Religieux]] dans `Lore/Religions/` et les 9 fiches dédiées.

| Religion | Thème | Fiche |
|----------|-------|-------|
| Vael Kurash | Les Esprits | [[Vael Kurash]] |
| Ignis Aeternum | La Flamme | [[Ignis Aeternum]] |
| Ordo Caelum | Le Ciel | [[Ordo Caelum]] |
| Noctari | Les Ombres | [[Noctari]] |
| Rota Mundi | Les Cycles | [[Rota Mundi]] |
| Via Ventus | Le Vent / le voyage | [[Via Ventus]] |
| Lex Petra | La Loi | [[Lex Petra]] |
| Somnium Vigil | Les Rêves | [[Somnium Vigil]] |
| Foedus Animae | Les Âmes | [[Foedus Animae]] |

> Les religions citées dans des versions antérieures comme "Taciti" / "Cantus Mundi" / "Catena Fracta" / "Aqua Nigra" / "Filii Fornacis" sont des **religions mineures / régionales / hérésies** documentées dans `Lore/Religions/_Mineures/`. Elles ne font pas partie du canon des 9 religions principales.

## Integration dans le code

### FHWRarelyChangeCharacterData

Struct repliquee sur [[HW Character]] comprenant :
- Metier
- Religion
- Guilde
- Peurs
- Titres

Ces champs permettent d'ancrer chaque personnage (joueur ou entite) dans le lore.

### DialogueData et lore

Les `FHWDialogueNode` utilisent typiquement :
- `RequiredConditionTag` → verifie religion / faction
- `EmoteTag` → emotes specifiques aux cultures
- `OnReachEventTag` → declenche quetes lore

Voir [[Dialogue Component]].

## Utilisation pour les entites

Les [[HW GAS Entity Character|entites]] peuvent etre associees a un continent ou une religion via :
- Tags GAS (ex: `Lore.Continent.Alkaran`, `Lore.Religion.IgnisAeternum`)
- Randomisation visuelle biased par region (dans [[HW GAS Entity Character]])

## Voir aussi

- [[HW Character]] — struct `FHWRarelyChangeCharacterData` (`HWCharacter.h:357`) UPROPERTY Replicated qui porte les champs lore par personnage : `Metier` (defaut "Bucheron"), `LieuApparition` (defaut "Merias"), `Religion` (defaut "La Confrerie des Souffles Primordiaux"), `Guilde` (defaut "Les Lames de l'Ombre"), `Peur`, et `TArray<FHWTitreStruct> TitreArray`.
- [[Dialogue Component]] — `FHWDialogueNode::RequiredConditionTag` / `EmoteTag` / `OnReachEventTag` (chainage lore via `Lore.Religion.*` / `Lore.Continent.*`) consommes par `IsConditionMet(const FGameplayTag&)` (`HWDialogueComponent.h:85`) pour gater les noeuds selon la religion/faction du joueur.
- [[NPC System]] — `FGameplayTag NPCTag` et `TMap<FGameplayTag, UHWDialogueData*> ConditionalDialogues` (`HWNPCComponent.h:29,37`) permettent d'associer chaque entite a une religion/continent et de router vers un dialogue conditionne sur ces tags lore.
