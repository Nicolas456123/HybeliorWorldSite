---
tags: [métier, archétype, gouvernance, mémoire, acuité]
type: archetype
category: Métier
catégorie_métier: Gouvernance
stat_principale: Mémoire
stats_secondaires: [Acuité, Verbe, Esprit]
craft_category: Scriptorium
paliers_maîtrise: [Novice, Initié, Adepte, Expert, Maître]
factions_compatibles: [Politiques, Religieuses, Commerciales]
karma_typique: vert
métiers_complémentaires: [Bibliothécaire, Historien, Enchanteur d'objet, Juge, Conseiller]
era_modulation: true
status: drafted
last_review: 2026-05-01
needs_review_for: [calibration-progression-jouable, overlap-enchanteur]
---

# 📜 Scribe — Archétype-métier

## 1. Vue d'ensemble

Le **Scribe** est gardien de l'écrit : archives, contrats, correspondance officielle, chroniques. C'est l'un des rares métiers de Gouvernance qui possède une **dimension craft** réelle : il **produit des objets** (codex, parchemins, sceaux gravés, livres-Récipients), pivot du [[Crafts]] §Scriptorium et enchantement. Il est donc **pleinement jouable** au-delà du seul rôle social, contrairement aux autres métiers de cette catégorie.

Ancrage historique : avant la chute de la Première Lumière, le Scribe était l'égal du Mage — copier, c'était fixer le réel. Aujourd'hui encore, l'écriture conserve une aura sacrée. Les **chroniques scribales** constituent la mémoire d'Hybelior à travers les Souffles : ce qu'un Scribe a copié survit aux ères ([[L'Accord]] §Héritage — œuvres signées).

Place dans Hybelior : pivot transversal. Le Juge cite des précédents copiés par un Scribe ; le Conseiller lit des rapports rédigés par un Scribe ; l'Enchanteur grave des runes conçues par un Scribe ; l'Historien dépend du Scribe pour reconstituer le passé.

**Frontière avec l'Enchanteur d'objet** (M2) : le Scribe **écrit** (paroles, textes, runes-modèles). L'Enchanteur **imprègne** un objet d'effets magiques. Un parchemin scellé est un objet de Scribe ; un anneau enchanté est un objet d'Enchanteur. Le **livre-Récipient** ([[Crafts]]) est leur point de rencontre : le Scribe écrit dedans, l'Enchanteur peut l'imprégner ensuite.

## 2. Stats & Maîtrises associées

| Stat brute | Rôle | Cible Maître |
|------------|------|--------------|
| **Mémoire** *(principale)* | Retenir le corpus, repérer une copie fautive | 80+ |
| **Acuité** | Précision du tracé, lecture de manuscrits abîmés | 80+ |
| **Verbe** | Style, formulation officielle | 60+ |
| **Esprit** | Pour les écritures runiques (interface avec [[Le Lien]]) | 50+ si rune |

**Maîtrise contextuelle principale** : `Maîtrise_Scriptorium` (couche 2). Sous-maîtrises : `Maîtrise_Calligraphie`, `Maîtrise_Enluminure`, `Maîtrise_Cryptographie`, `Maîtrise_Runique`.
**Maîtrises secondaires** : `Maîtrise_Droit` (utile en chancellerie), `Maîtrise_Foi_<Religion>` pour copies sacrées.

## 3. Compétences spécifiques

- **Copier sans erreur** : `Acuité × Maîtrise_Calligraphie` détermine la qualité de copie.
- **Authentifier un document** : repérer un faux, dater une encre.
- **Cryptographier** : chiffrer un courrier — utile en duo avec Conseiller / Espion.
- **Enluminer** : décoration qui augmente la valeur narrative et marchande.
- **Graver une rune** : prépare un support pour l'enchantement (cf. Enchanteur d'objet).
- **Tenir registre** : archives notariales, registres fonciers, généalogies.

## 4. Lieux d'exercice + équipement

**Lieux** : **Scriptorium** (atelier dédié, lieu de craft canonique — cf. [[Crafts]] §Scriptorium et enchantement), bibliothèques de palais et de temples, chancelleries marchandes, cellules monastiques. Contrairement aux autres Gouvernance, le Scribe a un **lieu de craft physique** identifiable et améliorable.

**Équipement typique** :
- Plumes taillées de qualités variables (corneille standard → plume rare).
- Encres (noir basique, encres colorées, encres à composante magique).
- Parchemins (peau d'animal, papier d'écorce, vélin fin).
- Sceaux personnels et de fonction.
- Pupitre, lutrin, loupes, lampes à huile.
- **Stations de craft** : pupitre de copie, presse à graver, four à encres (variantes selon palier).

## 5. Paliers de Maîtrise

| Palier | Capacités débloquées |
|--------|----------------------|
| **Novice** | Copie de textes simples ; parchemins de tier Commun |
| **Initié** | Calligraphie soignée ; contrats notariaux ; tier Inhabituel |
| **Adepte** | Enluminures ; cryptographie de base ; tier Rare |
| **Expert** | Manuscrits enluminés Magistraux ; runes simples ; tier Magistral |
| **Maître** 🔒 | **Œuvre signée** (livre-Récipient unique, codex-jurisprudence canonique) ; tier Légendaire ; rune complexe |

**Condition cachée 🔒** au Maître : avoir copié un texte d'une ère précédente que personne d'autre ne possède (utilité narrative — le Scribe préserve l'histoire).

## 6. Activités débloquées

- **Recettes débloquées** (le seul archétype Gouvernance avec un vrai pool de recettes — voir [[Crafts]]) :
  - Parchemins, codex, livres-Récipients (cf. [[Items/Archétypes/Livre Récipient]]).
  - Sceaux personnels gravés (cf. [[Items/Archétypes/Tome]], [[Items/Archétypes/Parchemin]]).
  - Cartes (en lien avec Cartographe).
  - Runes-modèles (que l'Enchanteur réutilisera).
- **Fournir le pouvoir** : devenir Scribe officiel d'une cour, d'un temple, d'un consortium → revenu fixe.
- **Falsifier un document** (variante karma jaune) : compétence accessible, illégale ; utile pour Espions et hors-la-loi.
- **Chroniquer une ère** : entreprise au long cours qui produit en fin d'ère une œuvre signée Patrimoniale.

## 7. Carrière et progression

```
Apprenti copiste → Scribe juré → Scribe officiel d'une institution
                → Maître Scribe / Archiviste en chef
                → (rare) Chroniqueur de l'Ère
```

**Rivalités classiques** : Scribes entre confréries (la "main royale" méprise la "main ecclésiastique"), Scribe vs Enchanteur d'objet (qui valide la rune ?), Scribe vs Bibliothécaire (qui contrôle l'archive ?).

**Décroissance** : la `Maîtrise_Calligraphie` se conserve très bien (le geste reste). En revanche, la `Maîtrise_Runique` se rouille comme une Voie magique : il faut continuer à graver.

## 8. Modulation par contexte

**Par faction** :
- **Politiques** : Scribe royal — chartes, traités, lois.
- **Religieuses** : Scribe sacré — copie de textes saints, livres liturgiques, possible accès à des recettes runiques exclusives.
- **Commerciales** : Scribe consulaire — contrats, lettres de change.

**Par ère** : en **Ère du Voile** ou de l'**Effroi**, certaines recettes scriptoriques obscures se débloquent ([[Crafts]] §par ère active). En **Ère du Reflux**, retour des textes anciens redécouverts.

**Par karma** : Scribe est typiquement **vert**. Variante **jaune** : Scribe-faussaire, accessible mais traqué par les Juges.

## 9. Économie & Reconnaissance

**Salaire** : Scribe officiel ~400 Éclats / semaine (Adepte) ; Maître Scribe ~1 500 Éclats / semaine + droits sur ses copies.

**Gold sinks spécifiques** :
- Encres rares (ingrédients d'Alchimie).
- Parchemins de qualité (lien avec [[#Tisserand|Cuir]] et écorces).
- Reliures (lien avec Menuisier / Bijoutier pour fermoirs).
- Apprentis à former (transmission = source de Reconnaissance et Renom).

**Reconnaissance** : forte auprès des factions servies. **Renom** : un Scribe Maître ayant signé une œuvre canonique gagne un Renom durable, parfois transgénérationnel (l'œuvre survit aux Souffles — cf. [[L'Accord]] §Héritage, [[Registre des Décisions]] §D-GDD-RECONNAISSANCE).

## 10. Signatures PNJ + interactions joueur

**PNJ exemplaires** :
- L'Archiviste d'une grande capitale, mémoire vivante des trois derniers Souffles.
- Le Scribe-prêtre d'une cité-temple, qui copie les visions des Oracles.
- Le faussaire renommé d'un quartier louche, vendeur de papiers truqués aux hors-la-loi.

**Interactions joueur** :
- **Vendeur** : achète parchemins, codex, sceaux ; commande des copies pour Conseiller / Juge / Mage.
- **Donneur de quête** : "Récupère ce manuscrit perdu", "Vérifie cette signature".
- **Service** : le joueur peut faire **chroniquer ses exploits** par un Scribe — gain de Renom.
- **Métier joué** : un joueur Scribe gagne en autorité dans toutes les villes où il fournit les institutions. Métier rare et valorisé.

---

*Liens : [[Métiers]] | [[Crafts]] | [[Items/Archétypes/Livre Récipient]] | [[Items/Archétypes/Tome]] | [[Items/Archétypes/Parchemin]] | [[Personnage]] | [[L'Accord]] | [[Registre des Décisions]]*
