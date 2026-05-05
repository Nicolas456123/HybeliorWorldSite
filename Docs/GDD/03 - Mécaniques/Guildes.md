---
tags: [mécanique, guildes, territoire, social]
type: mechanic
status: validated
last_review: 2026-05-01
needs_review_for: [siege-mecanique-playtest]
---

# 🏰 Guildes (créées par les joueurs)

> [!important] Deux systèmes coexistent
> Les **Guildes** (ce fichier) sont créées par les joueurs (territoires, sièges, banque). Les **Factions** (voir [[Factions]]) sont définies par le lore (réputation, alignement). Un joueur peut appartenir à une guilde **ET** s'aligner sur une faction simultanément.

---

## Concept

Les guildes sont des organisations de joueurs :

| Fonctionnalité | Description |
|---------------|-------------|
| 💬 Chat dédié | Communication interne |
| 🏦 Banque commune | Ressources partagées |
| 🏷️ Tag affiché | Visible par tous les joueurs |
| 📊 Classements | Inter-guildes |

---

## Territoire conquérable

Les guildes peuvent capturer et défendre trois types de territoires :

```
🏰 Forts & Avant-postes
   Structures défensives dans des zones stratégiques
   Fournissent des bonus défensifs / ressources

🏘️ Villes
   Contrôle = influence sur l'économie locale
   Taxes sur le commerce, accès aux services

⛏️ Zones de ressources
   Mines, forêts, zones de récolte
   Revenus passifs en ressources
```

---

## Construction & développement des structures

> [!important] Progression de guilde, pas de placement manuel
> Les bâtiments se **débloquent automatiquement** via la progression de la guilde — il n'y a pas de placement case par case. La guilde investit des ressources et monte de niveau pour accéder à des structures plus avancées.

```
[Guilde niveau 1]  →  Avant-poste basique (stockage, respawn)
[Guilde niveau 2]  →  Forge de guilde, marché interne
[Guilde niveau 3]  →  Fort défensif, garnison de PNJ
[Guilde niveau 4]  →  Ville avec services complets (auberge, artisans, hôtel des ventes local)
[Guilde niveau 5]  →  Condition cachée 🔒 — structures légendaires
```

> [!note] Ressources requises
> Monter de niveau nécessite des ressources récoltées par les membres (bois, minerai, nourriture, Éclats). L'investissement collectif renforce la valeur sociale de la guilde.

---

## Limites de possession territoriale

> [!important] Plafonds par niveau de guilde
> Une guilde ne peut posséder qu'un nombre limité de territoires, pour éviter la mainmise totale d'un seul groupe.

| Niveau guilde | Avant-postes | Forts | Villes | Zones de ressources |
|---------------|--------------|-------|--------|---------------------|
| **1** | 1 | 0 | 0 | 1 |
| **2** | 2 | 0 | 0 | 2 |
| **3** | 3 | 1 | 0 | 3 |
| **4** | 4 | 2 | 1 | 4 |
| **5** | 5 | 3 | 2 | 5 |

---

## Ville conquise — règles de transition

> [!warning] Ce qui se passe quand une ville change de mains
> La conquête d'une ville n'est **jamais brutale pour les résidents non-combattants**.

| Élément | Règle |
|---------|-------|
| **Période de grâce** | 24h réelles avant que les nouveaux contrôles s'appliquent |
| **Biens des résidents** | Coffres privés, propriétés et items en banque locale **inviolables**, accessibles à tout moment |
| **Joueurs présents** | Téléportés en sécurité au point de passage le plus proche s'ils étaient déconnectés |
| **PNJ marchands** | Conservés mais peuvent voir leur inventaire/prix modifiés |
| **Taxes** | Reprises par la nouvelle guilde dès la fin de grâce |
| **Statut PvP** | La ville reste **zone sûre** — la conquête se fait par mécanique de **siège programmé**, pas par combat libre dans les rues |

---

## Sièges — conquête réglementée

| Phase | Description |
|-------|-------------|
| **1. Déclaration** | La guilde attaquante dépose une déclaration de siège (coût : 5 000 Éclats + ressources) |
| **2. Préavis** | 48h pendant lesquelles la défense peut se préparer et rallier des alliés |
| **3. Bataille** | Fenêtre de 2h, zone PvP forcée pour les participants déclarés |
| **4. Résultat** | Si les attaquants tiennent l'objectif central pendant 15 min, la ville bascule. Sinon, retour au statu quo |
| **5. Cooldown** | Une ville ne peut être assiégée à nouveau qu'après 7 jours réels |

---

## Reconnaissance et Renom des guildes

- **Reconnaissance** (privée) : auprès des factions/PNJ. Une guilde alliée d'une faction lore (voir [[Factions]]) gagne en Reconnaissance auprès d'elle, ce qui ouvre quêtes/services exclusifs.
- **Renom** (public) : classements globaux des guildes (territoires possédés, sièges remportés, longévité). Visible dans l'écran social.

---

## Interactions avec les Factions du lore

> [!tip] Coexistence dynamique
> Les guerres de factions (voir [[Factions]]) peuvent **générer des alliances ou des conflits entre guildes** selon leur alignement respectif.
>
> Une guilde peut aussi officiellement se déclarer comme bras armé d'une faction.

---

*Liens : [[Factions]] | [[Univers]] | [[Économie]] | [[PvP]] | [[La Partie]]*
