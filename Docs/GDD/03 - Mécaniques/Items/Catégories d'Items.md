---
tags: [items, catégories, taxonomie, mécanique]
type: mechanic
status: drafted
last_review: 2026-05-01
needs_review_for: [arbitrages-categorie-ambiguë]
---

# 🗂 Catégories d'Items — 4 grandes familles

> Les items d'Hybelior se classent en **4 catégories** canoniques. Cette taxonomie est la première couche du système : tout type d'item appartient à exactement UNE catégorie principale.

---

## Les 4 catégories

| Catégorie | Définition courte | Exemples typiques |
|-----------|-------------------|-------------------|
| **Consommable** | Item à usage unique ou limité, déclenche un effet quand consommé | Potions, parchemins, nourriture, boissons |
| **Équipement** | Item porté/équipé qui affecte les stats du personnage | Robes, armures, accessoires, outils, livres-récipient |
| **Récolte** | Ressource brute ou fabriquée, sert d'intrant aux métiers | Bois, minerai, cuir, alliage, farine, écorce |
| **Arme** | Item équipé pour le combat (à une main, à deux mains, distance, défensif) | Épée, hache, marteau, arc, dague, bouclier |

---

## Catégorie *Consommable*

| Type | Notes |
|------|-------|
| Boisson | Effet de buff temporaire (régénération, focus, résistance) |
| Potion | Soin / mana / dispel / antidote — voir [[Le Lien]] pour effets liés à la magie |
| Parchemin | Sort encapsulé, single-use — accessible aux non-Liés |
| Poisson | Nourriture — buff temporaire selon préparation |
| Viande | Idem |
| Fruits | Idem |
| Légumes | Idem |
| Fromage | Idem |
| Champignons | Nourriture — certains champignons ont des effets alchimiques |
| Gâteaux | Nourriture festive, buff stamina |
| Épices | Modificateur de recettes culinaires (qualité/effets) |
| Herbes | Modificateur alchimique / culinaire |
| Cristal | Catégorie spéciale énergétique — voir [[Le Lien]] (recharge mana, rituels) |
| Récipient | Bouteille, fiole, gourde — contient un Liquide ou Émulsion |
| Livre Récipient | Livre-objet contenant un sort, parchemin, ou recette — pont avec Équipement |
| Divers consommables | Catégorie fourre-tout — à scinder en archétypes Phase 2 |

> ⚠️ `Récipient` et `Livre Récipient` peuvent aussi être des Équipements selon usage. Arbitrage en Phase 2 : double-classement autorisé via tag.

## Catégorie *Équipement*

L'équipement se subdivise en **5 sous-familles** : Armures, Vêtements, Accessoires, Focus magiques, Outils.

### Sous-famille — Armures (8 slots canoniques)

| Slot | Type | Matériaux typiques | Notes |
|------|------|-------------------|-------|
| Tête | **Heaume / Casque / Capuche** | Plate / Mailles / Cuir / Tissu | Le terme dépend du matériau et de la classe d'armure |
| Torse | **Cuirasse / Plastron / Tunique / Robe** *(armure de magie)* | Plate / Mailles / Cuir / Tissu | Slot principal, gros impact sur les stats |
| Épaules | **Pauldrons / Épaulières** | Plate / Cuir / Tissu | Optionnel pour armures légères |
| Bras | **Brassards / Manches** | Plate / Cuir / Tissu | |
| Mains | **Gantelets / Gants / Mitaines** | Plate / Mailles / Cuir / Tissu | |
| Taille | **Ceinture (armure)** | Cuir / Tissu / Plate | Distincte de la ceinture-accessoire |
| Jambes | **Jambières / Cuissardes / Pantalon** | Plate / Mailles / Cuir / Tissu | |
| Pieds | **Bottes / Sandales / Chausses** | Plate / Cuir / Tissu | |

**5 classes d'armure canoniques** (matériau dominant) :

| Classe | Matériau primaire | Profil typique |
|--------|------------------|----------------|
| **Tissu** | Tissu / Soie / Laine | Mage, érudit — protection physique faible, conduit magique élevé |
| **Cuir** | Cuir / Peau / Fourrure | Éclaireur, voleur, archer — agilité préservée |
| **Mailles** | Fil métallique / Mailles | Polyvalent — soldat, combattant moyen |
| **Plate** | Plaques / Lingot / Alliage | Tank, chevalier — protection physique maximale |
| **Spécial / Exotique** | Écaille, Os, Carapace, Biométal, Cristaux | Armures de créatures, items rares post-Souffle |

> ⚠️ Les **5 stats brutes** de [[Personnage]] (Vigueur, Vivacité, Endurance, Acuité, Esprit, Résonance, Mémoire, Verbe) sont impactées différemment par chaque classe — à mapper en archétypes Phase 2.

### Sous-famille — Vêtements (non-armure)

| Type | Notes |
|------|-------|
| **Cape** | Slot dorsal, modificateur situationnel (résistance froid, camouflage…) |
| **Tabard** | Couche cosmétique sur cuirasse — peut afficher faction/guilde |
| **Capuche** *(seule, sans armure)* | Tissu, anonymat |
| **Robe simple** *(non-magique)* | Vêtement civil, faible protection, fort caractère social |
| **Tunique** *(civile)* | Vêtement de tous les jours |

### Sous-famille — Accessoires

| Type | Slots | Notes |
|------|-------|-------|
| **Anneau** | 2 (mains gauche/droite) | Bonus stat / proc effet |
| **Amulette / Collier / Pendentif** | 1 (cou) | Souvent porteur d'enchantement majeur |
| **Broche / Fibule** | 1 (épaule/manteau) | Bonus social, allégeance, signature |
| **Bracelet** | 2 (poignets) | Souvent magique |
| **Boucle d'oreille** | 1-2 | Bonus mineur, esthétique forte |
| **Ceinture-accessoire** | 1 (taille, sur ceinture-armure) | Pochettes, bourse, breloques |

### Sous-famille — Focus magiques

> Conduits dédiés à [[Le Lien]]. **Sceptre** est déjà classé en Arme (1H, magique). Cette sous-famille concerne les focus **non-armes**.

| Type | Note |
|------|------|
| **Orbe** | Sphère cristalline tenue en main libre, amplifie une Voie spécifique |
| **Talisman** | Petit objet porté (ceinture, cou) — souvent pacte ou ancre rituelle |
| **Tome / Grimoire** | Livre-récipient (lien avec catégorie Consommable §Livre Récipient) — contient sorts ou rituels |
| **Cristal de Voie** | Cristal taillé attaché à l'équipement — signature de la Voie pratiquée |
| **Reliure / Bandeau frontal** | Tissu enchanté autour du front — focus discret |

### Sous-famille — Outils

| Type | Métier associé | Notes |
|------|----------------|-------|
| **Marteau de forge** | Forgeron | Différent du Marteau (arme) — outil de craft |
| **Faux** | Fermier / Cueilleur | Récolte céréales, herbes |
| **Pioche** | Mineur | Récolte minerai, pierre |
| **Hache de bûcheron** | Bûcheron | Différent de Hache (arme) |
| **Canne à pêche** | Pêcheur | |
| **Plume / Stylet** | Scribe / Enchanteur | Inscription, scriptorium |
| **Mortier et pilon** | Apothicaire / Alchimiste | Broyage |
| **Aiguille / Fuseau** | Tisserand / Couturier | Couture, tissage |
| **Soufflet** | Forgeron / Verrier | Attiser le feu |
| **Pince et burin** | Lapidaire / Bijoutier | Taille de gemmes |
| **Couteau de tanneur** | Tanneur | Préparation cuir |

> **63 métiers** au total (voir [[Métiers]]) — chaque métier a son ou ses outils spécifiques. La liste ci-dessus est représentative, non exhaustive.

## Catégorie *Récolte*

Les ressources se subdivisent en **3 sources de production** — voir [[Sources de Ressources]] pour le détail.

| Sous-source | Volume | Exemples |
|-------------|--------|----------|
| **Récolte nature** | 21 types | Écorce, Céréale, Fleur, Gemme brut, Feuille, Liquide, Champignon, Minerai, Plante, Poudre naturel, Racine, Graine, Coquille, Pierre, Bois, Laine plante, Miel, Sève, Cœur de plante, Algue, Baie |
| **Récolte sur créature** | 25 types | Os, Œuf, Œil, Plume, Fourrure, Cuir, Patte, Peau, Queue, Aile, Laine creature, Venin, Corne, Cœur de creature, Larme, Écaille, Sang, Bave, Griffe, Graisse animale, Essence spirituelle, Organe, Carapace, Antenne, Sécrétion |
| **Fabriqué** (intermédiaire) | 15 types | Alliage, Farine, Gemme taillé, Huile, Tissu, Planche, Poudre fabriqué, Lingot, Plaque de verre, Brique, Fil métallique, Pigment, Émulsion alchimique, Résine traitée, Cire raffinée |

## Catégorie *Arme*

| Type | Main(s) | Portée | Notes |
|------|---------|--------|-------|
| Épée à une main | 1H | Mêlée | Polyvalent, parry possible |
| Épée à deux mains | 2H | Mêlée | DPS lourd, pas de bouclier |
| Lame | 1H | Mêlée | Catégorie générique (couteau, sabre, scimitar…) |
| Marteau à une main | 1H | Mêlée | Stagger / armor break |
| Marteau à deux mains | 2H | Mêlée | Stagger lourd, anti-armure |
| Hache à une main | 1H | Mêlée | Saignement, dégâts élevés |
| Hache à deux mains | 2H | Mêlée | DPS lourd, anti-bouclier |
| Lance | 2H | Mêlée long | Allonge, anti-charge |
| Rapière | 1H | Mêlée | Précision, parade, anti-armure légère |
| Dague | 1H | Mêlée courte | Stealth, dual-wield, dégâts critiques |
| Arc | 2H | Distance | Munitions : Flèche |
| Sceptre | 1H | Magique | Focus/conduit pour [[Le Lien]] |
| Bouclier | 1H | Défensif | Block, parry passif, équipé hors-main |
| Flèche | — | Munition | Pour Arc — types variants par tier/effet |

> ⚠️ Catégorie liée à [[Armes et Maîtrise]] — chaque type d'arme a sa propre Maîtrise (5 paliers Novice→Maître).

---

## Cas ambigus à arbitrer (Phase 2)

| Type | Tension | Recommandation initiale |
|------|---------|--------------------------|
| Outils | Équipement OU Récolte (outil de récolte) ? | **Équipement** (porté), avec tag `usage: récolte` |
| Récipient / Livre Récipient | Consommable OU Équipement ? | Selon contenu : récipient vide = Équipement, récipient plein = Consommable |
| Cristal | Consommable (single-use rituel) OU Récolte (matériau) ? | **Récolte** par défaut, sous-tag `énergétique` |
| New table | Entrée de placeholder dans le brain-dump | Ignorer, à supprimer en Phase 2 |
| Divers consommables | Fourre-tout | À scinder en archétypes spécifiques |

---

*Liens : [[Items - Index|← Index Items]] · [[Types d'Items]] · [[Sources de Ressources]] · [[Économie]] · [[Métiers]] · [[Armes et Maîtrise]]*
