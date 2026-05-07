---
tags: [architecture, métiers, mapping, construction, mécanique]
type: mechanic
status: drafted
last_review: 2026-05-01
needs_review_for: [métiers-manquants-vs-63-canoniques, sous-spécialisations-existants, ajout-couvreur-tapissier-décorateur]
---

# 👷 Mapping Métiers de Construction — Qui construit quoi

> Ce fichier établit la **chaîne de responsabilité** des métiers impliqués dans la construction d'Hybelior. Une construction d'envergure mobilise **plusieurs métiers en collaboration**, sous la supervision de l'**Architecte** (chef de chantier).
>
> **Tension critique (D-ARCHITECTURE-02)** : plusieurs métiers de construction ne sont pas **explicitement listés** dans les 63 métiers canoniques de [[Métiers]]. Ce fichier les pose en **proposition** — Nicolas doit trancher pour la Phase 2.

---

## L'Architecte — chef de chantier

> [[Métiers#Architecte|Architecte]] est listé dans [[Métiers]] §Artisanat et Production (l'un des **63 métiers canoniques**).

| Aspect | Détail |
|--------|--------|
| **Rôle** | **Conception** des plans + **supervision** du chantier. Pas un métier d'exécution physique. |
| **Mini-jeu** | Placement et structure (cf. [[Métiers]]) — mini-jeu de plan, contraintes statiques, harmonie esthétique. |
| **Catégories couvertes** | **Toutes** (10/10) — l'Architecte conçoit tout type de construction. |
| **Niveau d'intervention** | À partir du niveau 2 *Honnête* (le niveau 1 *Modeste* est auto-construit). Maître requis pour niveau 5+. |
| **Production** | Plans, contrats, devis. Le bâtiment est physiquement érigé par les corps de métiers. |
| **Frontmatter** | Recipe = "Plan de construction" (intrant pour le chantier réel) |

---

## Tableau principal — Métiers ↔ Catégories de Constructions

| Métier | Statut | Catégorie principale | Catégorie secondaire | Spécialisation |
|--------|--------|---------------------|---------------------|---------------|
| **Architecte** | ✅ Canonique 63 | Toutes | — | Conception + supervision (chef de chantier) |
| **Maçon** | ⚠️ **Mentionné** dans [[Crafts]] et [[Sources de Ressources]] mais **non listé** dans les 63 — D-ARCHITECTURE-02 | Pierre, Brique | Fortifications, Habitations | Murs, voûtes, ponts |
| **Menuisier** | ✅ Canonique 63 | Bois (mobilier intérieur) | Charpente légère, mobilier | Mobilier, ouvertures, planchers |
| **Charpentier** | ⚠️ **Non listé** 63 — actuellement implicite dans Menuisier ? — D-ARCHITECTURE-02 | Bois (lourd) | Construction lourde, ponts en bois | Charpentes, mâts de navire, échafaudages |
| **Sculpteur** | ✅ Canonique 63 | Décor pierre/bois | Statues, ornements | Héritage, statues commémoratives |
| **Tailleur de pierre** | ⚠️ **Mentionné** dans [[Crafts]] §7 mais **non listé** explicitement 63 — D-ARCHITECTURE-02 | Pierre fine, Marbre | Sculpture utilitaire, fondations | Marbre, granite, ardoise |
| **Verrier** | ✅ Canonique 63 *(Verrier mentionné dans [[Crafts]], implicite dans [[Métiers]])* | Vitrage | Fenêtres, vitraux, lustres | Cathédrales, verrières |
| **Vitrier** | ⚠️ **Mentionné** dans `Métiers.md` ? **Non explicite** — recommandation : sous-spécialisation de Verrier (Verrier = Plaque de verre brute ; Vitrier = pose et assemblage) | Vitrage architectural | Réparation vitraux | Pose, scellement |
| **Forgeron** | ✅ Canonique 63 | (côté Items §Forge) | — | Armes, armures |
| **Forgeron architectural** *(variant proposé)* | 🆕 **À proposer** — variant spécialisé du Forgeron pour pièces de structure (charpente métallique, herses, ornements monumentaux) — D-ARCHITECTURE-02 | Métal | Charpentes métalliques, ornements | Variant spécialisé |
| **Couvreur** | 🆕 **À proposer** — métier de toiture, peut-être hors 63 — D-ARCHITECTURE-02 | Toiture | Tuile, chaume, ardoise | Métier spécialisé probable |
| **Tapissier / Décorateur** | 🆕 **À proposer** — métier flou, peut être sous-spécialisation de Tisserand ou Peintre | Aménagement intérieur | Tissus, mobilier disposé | Métier flou, à arbitrer |
| **Maçon-Restaurateur** | 🆕 **Mentionné** dans [[Traces des Ères]] §Architecturales — variant du Maçon spécialisé en archéologie | Restauration héritage | Lecture de traces architecturales | Métier de Trace, Phase 4+ |
| **Antiquaire** | 🆕 **Mentionné** dans [[Traces des Ères]] §Reliques — métier de marchand spécialisé | Évaluation, vente | Pas de construction | Phase 4+ |
| **Tisserand** | ✅ Canonique 63 | Tentures, voiles | Mobilier (sièges, baldaquins) | Décor textile architectural |
| **Tanneur** | ⚠️ **Mentionné** dans [[Crafts]] §5 mais **non explicite** dans [[Métiers]] | Sellerie, sièges, reliures | — | Cuir architectural |
| **Bijoutier / Orfèvre** | ✅ Canonique 63 | Ornements précieux | Coupoles, sertissage | Niveaux 5-6 |
| **Lapidaire** | ⚠️ **Mentionné** dans [[Crafts]] §6 mais **non explicite** dans [[Métiers]] | Cristal architectural | Sertissage | Niveaux 5-6 |
| **Enchanteur d'objet** | ✅ Canonique 63 | Consécration, enchantement de bâtiment | Cercles d'enchantement | Niveau 6, lieux religieux |
| **Peintre** | ✅ Canonique 63 (Divertissements) | Décor mural, fresques | Cosmétique extérieur | Tous niveaux |

---

## Problème central — Métiers manquants dans les 63 canoniques

> [!warning] Cohérence à valider — D-ARCHITECTURE-02
> [[Métiers]] liste **63 métiers canoniques** dont seulement **Architecte, Menuisier, Sculpteur, Forgeron, Verrier (implicite), Tisserand, Bijoutier, Enchanteur, Peintre** couvrent l'architecture.
>
> Mais [[Crafts]] §7 *Travail du bois et de la pierre* mentionne en plus : **Maçon, Charpentier, Tailleur de pierre**.
>
> Et [[Sources de Ressources]] §Mapping métier mentionne : **Maçon** (Brique), **Tanneur** (Cuir tanné), **Lapidaire** (Gemme taillé).
>
> **Trois options pour résoudre :**
>
> ### Option A — Ajouter aux 63 canoniques *(recommandation forte)*
> Métiers à ajouter explicitement dans [[Métiers]] §Artisanat et Production :
> - **Maçon** (mini-jeu : assemblage / mortier)
> - **Charpentier** (mini-jeu : levée de charpente)
> - **Tailleur de pierre** (mini-jeu : taille au burin)
> - **Verrier** (à expliciter — actuellement implicite)
> - **Tanneur** (mini-jeu : trempage / temps tannage — déjà décrit dans [[Crafts]] §5)
> - **Lapidaire** (mini-jeu : précision taille — déjà décrit dans [[Crafts]] §6)
>
> Les 63 deviendraient **69-70 métiers**. Cohérent avec la richesse artisanale d'Hybelior.
>
> ### Option B — Sous-spécialisations de métiers existants
> - Maçon = sous-spé de Sculpteur (travail de la pierre)
> - Charpentier = sous-spé de Menuisier (travail du bois lourd)
> - Tailleur de pierre = sous-spé de Sculpteur
> - Vitrier = sous-spé de Verrier
> - Tanneur = sous-spé de Cordonnier
> - Lapidaire = sous-spé de Bijoutier
>
> Garde 63 mais introduit des **paliers de spécialisation par mini-jeu** (Maître Menuisier → spécialise en Charpenterie au palier 4-5).
>
> ### Option C — Hybride
> - Maçon, Charpentier, Tailleur de pierre, Verrier explicite, Tanneur, Lapidaire = **ajoutés aux 63** car centraux
> - Vitrier, Couvreur, Tapissier-Décorateur, Forgeron architectural, Maçon-Restaurateur = **sous-spécialisations** des métiers ajoutés
>
> **Recommandation pour Phase 2 : Option C** — donne un cadre clair sans exploser la liste.

---

## Chaîne de chantier typique (par niveau)

### Niveau 1 *Modeste* — Auto-construction

```
[Joueur] (avec un peu d'aide) ─→ Hutte (4-7 jours)
   ├─ Bûcheron (matières : Bois)
   └─ Mineur (matières : Pierre simple)
```

### Niveau 2 *Honnête* — Petit chantier

```
[Architecte Initié] ─ supervise ─→ Maison de village (1-2 mois)
   ├─ [Maçon Initié] (fondations, murs)
   ├─ [Charpentier Initié] (charpente, plancher)
   ├─ [Couvreur] (toiture chaume/tuile)
   └─ [Menuisier Initié] (ouvertures, mobilier de base)
```

### Niveau 3 *Aisé* — Chantier intermédiaire

```
[Architecte Adepte] ─ supervise ─→ Demeure de marchand (3-12 mois)
   ├─ [Maçon Adepte]
   ├─ [Charpentier Adepte]
   ├─ [Menuisier Adepte] (escalier, mobilier signature)
   ├─ [Verrier] (fenêtres vitrées)
   ├─ [Forgeron architectural Initié] (serrures, ferronneries)
   └─ [Sculpteur Initié] (ornements de façade)
```

### Niveau 4 *Distingué* — Grand chantier

```
[Architecte Expert] ─ supervise ─→ Manoir / Cathédrale provinciale (1-5 ans)
   ├─ [Maçon Expert]
   ├─ [Tailleur de pierre Expert] (marbre, granite)
   ├─ [Charpentier Expert] (charpente lourde de cathédrale)
   ├─ [Verrier Expert] + [Vitrier] (vitraux)
   ├─ [Forgeron architectural Adepte] (charpente métallique, ornements)
   ├─ [Sculpteur Expert] (statues, gargouilles)
   ├─ [Tisserand] (tentures monumentales)
   └─ [Peintre] (fresques)
```

### Niveau 5 *Magnifique* — Chantier de civilisation

```
[Architecte Maître] ─ supervise ─→ Palais / Cathédrale capitale (5-50 ans)
   ├─ Tous les corps de métier ci-dessus, en Maître
   ├─ [Bijoutier / Orfèvre Maître] (ornements précieux, coupoles)
   ├─ [Lapidaire Maître] (cristaux et gemmes serties dans la pierre)
   ├─ [Enchanteur Maître] (consécration partielle)
   └─ Coopération avec faction religieuse / politique
```

### Niveau 6 *Cosmique* — Œuvre signature

```
[Architecte Maître + Condition cachée 🔒] ─→ Construction cosmique (durée variable / inscrite par Trace)
   ├─ Tous les Maîtres requis
   ├─ [Enchanteur Maître] avec accès Voie pertinente
   ├─ [Liés] de plusieurs Voies en coopération rituelle
   ├─ Souvent : Siège Éthéré pertinent (Forgion, Talos, Luxa…)
   └─ Souvent : Trace permanente plutôt que chantier littéral
```

---

## Mapping métier → catégorie de construction (matrice)

> Lecture : un ✓ signifie que le métier est **principal ou secondaire** pour cette catégorie. Un ★ signifie **essentiel** (la catégorie ne peut être construite sans ce métier).

| Métier ↓ \\ Catégorie → | Habit. | Prod. | Social | Relig. | Savoir | Fortif. | Infra urb. | Infra rur. | Mobilier | Cosmique |
|------------------------|:------:|:-----:|:------:|:------:|:------:|:-------:|:----------:|:----------:|:--------:|:--------:|
| **Architecte** | ★ | ★ | ★ | ★ | ★ | ★ | ★ | ✓ | ✓ | ★ |
| **Maçon** | ★ | ★ | ✓ | ★ | ★ | ★ | ★ | ✓ | — | ★ |
| **Charpentier** | ★ | ★ | ★ | ✓ | ✓ | ★ | ✓ | ★ | ✓ | ✓ |
| **Menuisier** | ★ | ✓ | ✓ | ✓ | ★ | — | — | ✓ | ★ | ✓ |
| **Tailleur de pierre** | ✓ | ✓ | ✓ | ★ | ✓ | ★ | ★ | — | ✓ | ★ |
| **Sculpteur** | ✓ | — | ✓ | ★ | ✓ | ✓ | ★ | — | ✓ | ★ |
| **Verrier** | ✓ | ★ | ✓ | ★ | ★ | — | ✓ | ✓ (serres) | ✓ | ★ |
| **Vitrier** | ✓ | ✓ | ✓ | ★ | ★ | — | ✓ | — | — | ✓ |
| **Forgeron archi.** | ✓ | ★ | ✓ | ✓ | ✓ | ★ | ★ | ✓ | ✓ | ★ |
| **Couvreur** | ★ | ✓ | ✓ | ✓ | ✓ | ✓ | — | ★ | — | ✓ |
| **Tisserand** | ✓ | — | ✓ | ✓ | ✓ | — | — | — | ★ | ✓ |
| **Tanneur** | ✓ | ✓ (sellerie) | ✓ (sièges) | ✓ | ✓ | — | — | ✓ (sellerie) | ★ | ✓ |
| **Bijoutier / Orfèvre** | ✓ (haut tier) | — | — | ★ (haut tier) | ✓ | — | — | — | ✓ | ★ |
| **Lapidaire** | ✓ (haut tier) | — | — | ★ (haut tier) | ✓ | — | — | — | ✓ | ★ |
| **Enchanteur** | ✓ (haut tier) | ✓ (atelier d'enchantement) | — | ★ | ✓ | ✓ | — | — | ✓ | ★ |
| **Peintre** | ✓ | ✓ | ✓ | ★ (fresques) | ✓ | — | ✓ (statues peintes) | — | ✓ | ✓ |
| **Tapissier / Décorateur** | ★ | ✓ | ★ | ✓ | ✓ | — | — | — | ★ | ✓ |

---

## Métiers d'occupation (qui *occupe* la construction)

Distinct des métiers **constructeurs**, les métiers **occupants** définissent l'usage. Ce mapping aide à concevoir les archétypes Phase 2 (un archétype "Forge" appartient à la catégorie Production, est construit par les métiers ci-dessus, et est *occupé* par un Forgeron).

| Catégorie de construction | Métiers occupants typiques |
|---------------------------|---------------------------|
| **Habitations** | Tout joueur, PNJ familial |
| **Production** | Forgeron, Tisserand, Tanneur, Apothicaire, Alchimiste, Bijoutier, Verrier, Boulanger, Brasseur, Cuisinier, Boucher, Cordonnier, Tailleur, Meunier, Scribe, Cartographe, Enchanteur |
| **Social** | Tavernier, Aubergiste, Marchand, Banquier, Acteur, Musicien, Barde, Jongleur |
| **Religieux** | Prêtre, Guérisseur, Mage (variants par religion) |
| **Savoir** | Bibliothécaire, Astronome, Cartographe, Scribe, Enseignant, Historien, Chercheur |
| **Fortifications** | Soldat, Garde, Chevalier, Mercenaire, Espion, Assassin, Juge (justice locale) |
| **Infrastructure urbaine** | Aucun métier dédié — *occupée par tous* |
| **Infrastructure rurale** | Agriculteur, Berger, Apiculteur, Éleveur de créature, Meunier, Dresseur de créature |
| **Mobilier** | *(occupé par les métiers du bâtiment qui l'héberge)* |
| **Cosmique** | Liés (Voies de magie), Conseiller, Oracle, Historien, parfois Sièges Éthérés |

---

## Maîtrise et progression

[[Métiers]] §Progression définit 5 paliers (Novice → Maître). Pour les métiers de construction :

| Niveau d'opulence à construire | Palier minimum requis |
|-------------------------------|-----------------------|
| Niveau 1 *Modeste* | Novice (pas de Maîtrise du métier requise — auto-construction possible) |
| Niveau 2 *Honnête* | Initié |
| Niveau 3 *Aisé* | Adepte |
| Niveau 4 *Distingué* | Expert |
| Niveau 5 *Magnifique* | Maître |
| Niveau 6 *Cosmique* | Maître + Conditions cachées 🔒 + parfois Siège Éthéré |

**Procs de Maître** : un Architecte Maître a une chance de produire un plan d'un niveau supérieur au minimum requis (un plan de Manoir distingué de classe Magnifique sans coût supplémentaire).

---

## Décisions ouvertes (récap)

| Code | Décision | Recommandation |
|------|----------|----------------|
| **D-ARCHITECTURE-02** | Métiers manquants : Maçon, Charpentier, Tailleur de pierre, Verrier explicite, Tanneur, Lapidaire | **Option C — Hybride** : ajouter ces 6 aux 63, sous-spécialiser Vitrier, Couvreur, Tapissier, Forgeron architectural, Maçon-Restaurateur |
| **D-MÉTIERS-01** | Mise à jour de [[Métiers]] §Artisanat et Production avec les 6 métiers ajoutés | À faire par Nicolas après validation |
| **D-MÉTIERS-02** | Couvreur : métier à part entière ou implicite dans Charpentier ? | Recommandation : sous-spécialisation de Charpentier (palier 3+) |
| **D-MÉTIERS-03** | Décorateur / Tapissier : métier ou sous-spécialisation de Tisserand ? | À arbitrer |
| **D-MÉTIERS-04** | Vitrier vs Verrier — distincts ou même métier ? | Recommandation : sous-spécialisation (Verrier = matière première, Vitrier = pose) |
| **D-MÉTIERS-05** | Forgeron architectural — variant ou métier dédié ? | Recommandation : variant spécialisé du Forgeron (compétence émergente palier 4+) |

---

*Liens : [[Architecture/Index|← Index Architecture]] · [[Catégories de Constructions]] · [[Échelles et Niveaux]] · [[Matériaux de Construction]] · [[Métiers]] · [[Crafts]] · [[Sources de Ressources]] · [[Armes et Maîtrise]]*
