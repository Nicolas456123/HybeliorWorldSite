---
tags: [item, archétype, ressource, fabriqué, intermédiaire, planche, bois, menuiserie]
type: archetype
category: Récolte
subcategory: Fabriqué
source: Fabriqué
métier_producteur: Menuisier
intrants_typiques: [Bois]
craft_category: Travail du bois et de la pierre (Menuiserie)
métiers_consommateurs: [Menuisier, Charpentier, Forgeron (manche), Tisserand (cadres), Architecte, Sculpteur]
tier_min: 1
tier_max: 6
era_availability: [toutes]
status: drafted
last_review: 2026-05-01
needs_review_for: [planche-cosmique-T6-existence, essences-nobles-tier-équivalences]
---

# 🪵 Archétype — Planche

> Bois brut **scié, raboté, séché** en planche standardisée. Intermédiaire **omniprésent** : mobilier, construction, manches d'outils et d'armes ([[Arc]] §recettes, [[Épée à une main]] §6 manche), structures, charpentes.

---

## 1. Vue d'ensemble

Le **Menuisier** prend une bûche de Bois (récolte Bûcheron — voir [[Sources de Ressources]] §Nature) et la transforme en planche standardisée par sciage, rabotage, séchage. C'est l'opération de raffinement la plus simple du bois, mais elle débloque presque tous les crafts non-métalliques d'Hybelior : mobilier, construction, armes hampe / manche, instruments.

**Rôle d'intermédiaire :**
- **Sortie** : 1 bûche → 3-8 planches selon essence et palier
- **Entrée** : Forge ([[Épée à une main]] §6 — manche), [[Arc]] (corps d'arc), Mobilier (Phase 4), Architecture (Phase 4), [[Sceptre]] (hampe), reliure de [[Tome]] (couverture)

---

## 2. Variations / matériaux (essences de bois)

> Cohérent avec [[Sources de Ressources]] §Nature ligne Bois. Les **essences nobles** (chêne, ébène, bois cosmique d'ère) montent au tier supérieur.

| Essence | Tier plancher | Tier plafond | Note |
|---------|---------------|--------------|------|
| **Pin / Sapin** | T1 | T2 | Tendre, charpente, mobilier rustique |
| **Hêtre** | T1 | T2 | Standard menuiserie, manches d'outils |
| **Chêne** | T2 | T3 | Dur, charpente noble, manches d'armes |
| **Frêne** | T2 | T3 | Élastique — corps d'[[Arc]] privilégié |
| **If** | T3 | T4 | Très élastique — arcs longs nobles |
| **Bois noble (érable, noyer)** | T2 | T3 | Mobilier de luxe, lutherie |
| **Ébène** | T3 | T4 | Très dense — sceptres, [[Sceptre]] noble |
| **Cœur de plante** *(rare)* | T4 | T5 | Bois magique récolté Botaniste — focus |
| **Bois cosmique** *(variant ère)* | T5 | T6 | Bois récolté pendant ère cosmique précise |

> **Note** : *Cœur de plante* (T4-T5) est listé comme une **récolte nature distincte** dans [[Sources de Ressources]] — il sert ici de matière première pour Planche T4-T5 magique.

---

## 3. Tier × Qualité

| Tier | Nom | Bûche × | Planches produites | Maîtrise | Durée |
|------|-----|---------|---------------------|----------|-------|
| T1 | Planche brute | 1 | 3 | Novice | 60 s |
| T2 | Planche façonnée | 1 | 4 | Initié | 120 s |
| T3 | Planche œuvrée (essence noble) | 1 | 5 | Adepte | 240 s |
| T4 | Planche magistrale (Cœur de plante / ébène) | 1 | 5 | Expert | 480 s |
| T5 | Planche légendaire (Cœur de plante + variant ère) | 1 | 6 | Maître | 900 s |
| T6 | Planche cosmique | 1 + composant ère | 4 (rendement réduit) | Maître + 🔒 | 1800 s |

> **Règle séchage** : T1-T2 = séchage rapide (intégré durée). T3+ = séchage long jusqu'à plusieurs mois IRL — possible **stockage long** au menuisier (économie passive).

---

## 4. Recette de production

> Catégorie : **Travail du bois et de la pierre** ([[Crafts]] §7). Station : **Atelier de menuiserie** + Scie + Rabot + Aire de séchage.

### Recette canonique T2 — Planche façonnée (chêne)

```yaml
tier: 2
métier: Menuisier
mastery_required: Initié
station: Atelier de menuiserie + Aire de séchage
intrants:
  - Bois (bûche de chêne) × 1 (T2)
durée: 120 s (sciage actif) + 24h (séchage passif, accélérable Atelier T2+)
mini_jeu: précision_sciage (3 traits) + rabotage_uniforme
sortie: Planche façonnée × 4 (T2)
notes:
  - Échec sciage : 1 planche T1 + 3 chutes (récupérables en sciure)
  - Proc Maître : 5 planches sortie
```

### Recette signature — Planche d'If pour arc magistral

```yaml
tier: 4
métier: Menuisier Expert + Botaniste Adepte (sélection if mature)
mastery_required: Expert
station: Atelier de menuiserie + Aire de séchage longue
intrants:
  - Bûche d'If de cœur × 1 (T3-T4)
  - Sève × 1 (assouplissement)
durée: 480 s actif + 7 jours séchage
mini_jeu: précision_sciage + rabotage + courbure_naturelle (trois étapes)
sortie: Planche d'If × 5 (T4) — élasticité préservée pour [[Arc]] long
```

---

## 5. Variants par ère

| Variant | Effet planche |
|---------|----------------|
| **Verdoyant** ([[Les Ères\|Verdoiement]]) | Bois vivant continue à pousser : durabilité +15%, légère régen |
| **Frost** ([[Les Ères\|Sommeil de Glace]]) | Bois rigidifié : +10% dégâts si manche d'arme, -20% élasticité d'arc |
| **Brulé** ([[Les Ères\|Feu Endormi]]) | Bois ambré dur : +résistance feu, brûle plus lentement |
| **Spectral** ([[Les Ères\|Échos Brisés]]) | Bois translucide partiel : objets fantômes visibles |
| **Onirique** | Bois persistant en rêve : meubles oniriques |
| **Vénérable** | Bois runique : 1 rune mineure gratuite sur sceptre / arc |
| **Shadow** | Bois noir : objets faible-luminosité |
| **Brisé** | Bois RNG durabilité ±25% |
| **Pourpre** | Bois brume : meubles signalétiques |
| **Doré** | Bois aux veinures dorées : +20% prix revente mobilier |

---

## 6. Crafts / items destinés

| Destination | Essence typique | Quantité | Référence |
|-------------|------------------|----------|-----------|
| **Manche d'arme** ([[Épée à une main]], [[Hache à une main]], [[Marteau à une main]], [[Lance]]) | Hêtre T1, Chêne T2, Frêne T3 | 1 planche / arme | [[Épée à une main]] §6 |
| **Corps d'[[Arc]]** | Frêne, If | 2-3 planches / arc | [[Arc]] §recettes |
| **Hampe de [[Sceptre]]** | Ébène, Cœur de plante | 1-2 planches / sceptre | [[Sceptre]] |
| **Hampe de [[Lance]]** | Frêne, Chêne | 2 planches / lance | [[Lance]] |
| **Couverture de [[Tome]] / [[Livre Récipient]]** | Chêne, Bois noble | 1 planche / livre | [[Tome]], [[Livre Récipient]] |
| **Meubles** (Phase 4) | Toutes essences | 5-50 planches / meuble | Branche Mobilier |
| **Construction** (Phase 4) | Pin, Chêne | 50-500 planches / bâtiment | Branche Architecture |
| **Bouclier** ([[Bouclier]] léger) | Chêne | 3-5 planches | TBD |
| **Cadre** (toile peintre, métier à tisser) | Pin, Hêtre | 2-4 planches | TBD |

---

## 7. Signatures notables

| Signature | Essence | Provenance | Effet |
|-----------|---------|------------|-------|
| **Chêne d'Avalor** | Chêne T3 | Endora | Standard chevalerie, hampes d'armes royales |
| **If des Bois Anciens d'Hibel** | If T4 | Hibel (forêts académiques) | Arcs nobles, +10% portée |
| **Ébène de Vytharia** | Ébène T4 | Vytharia (cavernes-forêts) | Sceptres occultes, hampes magiques |
| **Frêne de Cestra** | Frêne T3 | Cestra (forêts côtières) | Arcs marins, résistant au sel |
| **Cœur de Forêt d'Onara** | Cœur de plante T5 | Onara (forêts cosmiques) | Bois magique vivant — focus haut tier |

---

## 8. Décisions ouvertes

- [ ] **Cœur de plante T4-T5** : doit-il avoir son propre archétype Récolte Nature séparé ? Proposition : oui, mais pas dans cette vague — note pour la vague suivante (Récoltes Nature)
- [ ] **Planche cosmique T6** : confirmer son existence. Proposition : oui mais accessible uniquement pendant ère cosmique précise + condition cachée (cf. armes T6)
- [ ] **Recyclage** : sciure et chutes réutilisables ? Proposition : sciure → matériau Pâte à papier (parchemin) + isolant ; chutes → bois de chauffe
- [ ] **Séchage long T3+** : verrouille un délai gameplay parfois bloquant. Proposition : Atelier de menuiserie T3+ contient Étuve qui accélère ×4 (mais qualité légèrement inférieure)
- [ ] **Variants ère sur Cœur de plante** : un Cœur de plante récolté pendant Verdoiement = automatiquement Verdoyant ? Proposition : oui (les variants ère sur ressources nature s'**appliquent à la récolte**, pas seulement au craft)

---

*Liens : [[Items - Index|← Index Items]] · [[Sources de Ressources]] · [[Crafts]] · [[Métiers]] · [[Arc]] · [[Sceptre]] · [[Épée à une main]] · [[Tome]] · [[Bouclier]]*
