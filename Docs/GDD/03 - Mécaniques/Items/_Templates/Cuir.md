---
tags: [item, archétype, ressource, récolte, créature, cuir, dépeçage, tannage]
type: archetype
category: Récolte
subcategory: Créature
source: Récolte sur créature
mastery: Dépéceur (sous-Maîtrise: Dépeçage cuir)
métier_principal: Dépéceur
créatures_sources: [Loup forestier, Ours brun, Sanglier, Cerf majestueux, Démon mineur, Tortue ancestrale, Goblin, Orc, Requin abyssal]
métiers_consommateurs: [Tanneur, Maroquinier, Cordonnier, Sellier, Relieur, Couturier]
tier_min: 1
tier_max: 6
era_availability: [toutes]
status: drafted
last_review: 2026-05-01
needs_review_for: [drop-rates-playtest, tanin-recipe-pipeline, cuir-vs-peau-distinction]
---

# 🟫 Cuir — Archétype ressource créature

> Revêtement externe rigide ou semi-rigide des mammifères, reptiles et certains démoniaques. Récolte la **plus commune** du dépéceur (chaque mammifère en porte). Sert d'intrant à toute une **classe d'armure** ([[Cuirasse]] cuir, [[Bottes]] cuir) et à la maroquinerie (sacs, ceintures, reliures). **Distinct de la [[Peau]]** : Cuir = tannable et durable, Peau = plus fine, plus fragile.
>
> Voir [[Sources de Ressources]] §Récolte créature · [[Crafts]] §Travail du cuir · [[Bestiaire - Index]]

---

## 1. Vue d'ensemble

Le Cuir est la **première ressource cosmétique-fonctionnelle** que rencontre un joueur Novice : tout loup, ours, sanglier, cerf en donne. Sa transformation passe **obligatoirement** par le Tanneur (Cuir brut → Cuir tanné) avant usage en armure, sac, botte, etc. Le **rendement de tannage** dépend du Tanneur (palier Maîtrise) et des tannins disponibles (écorce, sève, certaines résines).

**Pas de Cuir chez** : Élémentaires, Slimes, Spectres, Insectoïdes (Carapace), Tentacules, Aviens (Cuir-peau fin uniquement, voir [[Peau]]).

**Cuir = pièce dorsale-flanc** (la plus large, la plus résistante). Les pièces moins nobles (ventre, gorge) sont vendues comme [[Peau]] ou récupérées comme **chutes**.

---

## 2. Variations / origines créatures

### Cuirs polyvalents (T1-T3)
- [[Loup forestier]] (CR 4) : Cuir souple, idéal armure légère, bottes, sacs
- [[Sanglier]] (CR 3) : Cuir épais et grossier, idéal jambières, ceintures lourdes
- [[Cerf majestueux]] (CR 5) : Cuir fin et noble, vêtements civils raffinés
- [[Goblin]], [[Orc]] (humanoïdes) : Cuir bas de gamme, chutes, marché gris

### Cuirs lourds (T3-T4)
- [[Ours brun]] (CR 8) : Cuir massif, dense, armure de combat éclaireur lourd
- **Cuir lourd d'Orc** : variant épais (vétérans), excellent pour ceintures-armures

### Cuirs spéciaux (T4-T6)
- [[Requin abyssal]] (CR 9) : Cuir-écaille hybride (galuchat), résiste à l'eau, prisé pour gaines d'armes
- [[Tortue ancestrale]] (CR 11) : Cuir des pattes & cou (sous la carapace), extrêmement résistant
- [[Démon mineur]] (CR 8) : Cuir corrompu, conducteur magique faible, focus Voie de Noctis
- *Cuir de Dragon nain* : T5+, ultra-rare, ignifugé natif (voir [[Dragon nain]])

### 9 signatures Pays (variants nobles potentiels)
Chaque grand Pays a son **cuir signature** lié à une créature emblématique : Cuir d'Antérix (Skaldoria), Cuir de Paboucs (Ilthara), etc. — voir signatures §7.

---

## 3. Tier × Qualité

| Tier | Source CR | Exemple | Usage typique |
|------|-----------|---------|---------------|
| **T1** | CR 1-3 | Cuir de sanglier juvénile | Sac de novice, ceinture |
| **T2** | CR 4-7 | Cuir de loup, cuir de cerf | Bottes, gilet cuir |
| **T3** | CR 8-12 | Cuir d'ours, cuir d'orc lourd | Cuirasse cuir éclaireur |
| **T4** | CR 13-18 | Cuir de requin, cuir de dragon nain juvénile | Cuirasse cuir Adepte+ |
| **T5** | CR 19-24 | Cuir de tortue ancestrale, cuir d'Antérix | Armures Maître |
| **T6** | CR 25-30 | Cuir cosmique signature | Conditions cachées 🔒 |

**Qualité** : Brut (cru) → Salé/Séché (préservé) → **Tanné** (transformé par Tanneur) → Souple (qualité Œuvré) → Magistral.

---

## 4. Drop / Récolte

| Critère | Détail |
|---------|--------|
| **Métier** | Dépéceur (sous-Maîtrise *Dépeçage cuir*) |
| **Palier minimum** | Novice (T1-T2), Initié (T3), Adepte (T4), Expert (T5), Maître (T6) |
| **Outil requis** | Couteau de dépéceur ; Cuir requin/dragon → Couteau enchanté ou affilé palier 4+ |
| **Drop rate** | 100 % sur mammifères (1-2 unités) ; +1 unité par tier de créature |
| **Mini-jeu** | Inciser dans le sens du grain (timing), retirer en bandes — un échec déchire (T-1, qualité chute) |
| **Modificateur** | × 1.5 vétéran, × 2.5 colosse alpha, × 2 si biome froid (cuir + dense) |

> **Préservation** : un cuir doit être **salé ou séché** dans 6 h, sinon pourrit (T-2). Sel = ressource Pêcheur. Tannage final dans 7 jours.

---

## 5. Modulation par variant cosmique

| Variant créature | Cuir obtenu | Effet |
|------------------|-------------|-------|
| **Shadow** | Cuir d'ombre | Camouflage passif (-10 % détection joueur en zone sombre) |
| **Spectral** | Cuir spectral | Léger, demi-tangible, +parade magique faible |
| **Frost** | Cuir givré | Résistance Froid native, conserve la fraîcheur (cuir réfrigérant) |
| **Verdoyant** | Cuir mousseux | Régen passive Stamina en biome végétal |
| **Brulé** | Cuir calciné | Résistance Feu, fragile en gel |
| **Pourpre** | Cuir brumeux | +résistance Confusion |
| **Doré** | Cuir doré | Sacré, ne se corrompt pas, focus Eldoria |
| **Brisé** | Cuir glitché | Stats erratiques (+/- 20 %) |
| **Onirique** | Cuir de songe | Disparaît à l'éveil — usage rituel |
| **Vénérable** | Cuir runique | Marques runiques natives, +inscription enchant |

---

## 6. Crafts destinés

| Métier | Usage | Ref |
|--------|-------|-----|
| **Tanneur** | Cuir brut → Cuir tanné (intermédiaire fabriqué) | [[Crafts]] §Travail du cuir |
| **Maroquinier** | Sacs, [[Sac à dos]], pochettes, étuis | [[Crafts]] §Travail du cuir |
| **Cordonnier** | [[Bottes]] cuir 5 classes, sandales | [[Crafts]] §Travail du cuir |
| **Sellier** | Selles, harnais (montures, voir [[Exploration]]) | [[Crafts]] §Travail du cuir |
| **Couturier / Tailleur** | Vestes, gilets, [[Cuirasse]] cuir | [[Crafts]] §Travail du cuir + §Tissage |
| **Relieur** | Reliures de [[Tome]], [[Livre Récipient]] | [[Crafts]] §Scriptorium |
| **Forgeron** | Poignée d'arme, fourreau, gaine — recouvrement os/manche | [[Crafts]] §Forge |
| **Bijoutier** | Bracelets de cuir, lacets pour amulettes | [[Crafts]] §Joaillerie |

---

## 7. Signatures notables

| Signature | Créature source | Nation | Usage canonique |
|-----------|-----------------|--------|-----------------|
| **Cuir d'Antérix** | Ours brun signature Skaldoria | Skaldoria | Cuirasse Maître éclaireur |
| **Cuir de Paboucs** | Bovidé Ilthara | Ilthara | Bottes du marais, ceinture armure |
| **Cuir d'Eldhoryn** | Doré Wolf signature Galenor | Galenor | Cuir doré sacré, robes royales |
| **Cuir de Vargheist** | Vénérable Loup Ulinor | Trinoria | Manteau-cape unique, dague signée |
| **Cuir d'Acier Éternel** | Dragon nain signature | Cendara | Recouvrement de poignée Acier Éternel |

---

## 8. Décisions ouvertes

- **Cuir brut vs Cuir tanné** : Sources de Ressources note que "Cuir tanné" devrait être dans la liste fabriquée. **Proposition** : Cuir = brut (récolte créature), Cuir tanné = fabriqué (Tanneur). Cette fiche couvre uniquement le brut.
- **Distinction Cuir / Peau** : posée mais à formaliser sur les drop rates (un cerf donne combien de Cuir vs combien de Peau ?). **Proposition** : 70/30 par défaut, 90/10 sur grosse créature, 30/70 sur jeune ou avienne.
- **Cuir d'humanoïde** : taboue (karma rouge), marché noir — voir [[PvP]].
- **Variants cosmiques cuir + classe armure** : un Cuir Spectral porté par un Mage = double bonus magique ? À cadrer Phase 2.

---

*Liens : [[Sources de Ressources]] · [[Crafts]] · [[Bestiaire - Index]] · [[Peau]] · [[Fourrure]] · [[Cuirasse]] · [[Bottes]] · [[Sac à dos]] · [[Loup forestier]] · [[Ours brun]]*
