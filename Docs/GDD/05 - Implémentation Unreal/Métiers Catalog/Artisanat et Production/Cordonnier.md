---
tags: [métier, archétype, artisanat, acuité, vivacité, cuir, cordonnerie]
type: archetype
category: Métier
catégorie_métier: Artisanat et production
stat_principale: Acuité
stats_secondaires: [Vivacité, Mémoire, Endurance]
craft_category: Travail du cuir
sources_ressources_accessibles: [Cuir tanné, Peau tannée, Fourrure, Fil (cuir), Boucles métalliques, Pigment, Tannins]
stations_principales: [Établi cuir, Forme à botte, Étendoir, Tour à coutures]
outils_principaux: [Couteau de coupe, Alène, Aiguille à cuir, Marteau de cordonnier, Forme]
paliers_maîtrise: [Novice, Initié, Adepte, Expert, Maître]
métiers_complémentaires: [Tanneur, Forgeron (boucles), Tailleur, Métiers#Maroquinier, Métiers#Sellier]
era_modulation: true
status: drafted
last_review: 2026-05-01
needs_review_for: [frontière-Cordonnier-Maroquinier-Sellier, bottes-vs-armures-cuir, calibration-durabilité]
---

# 👢 Archétype-Métier — Cordonnier

> Métier spécialisé du **travail du cuir appliqué aux pieds et accessoires**. Frontière nette avec le [[Tanneur]] (qui produit le cuir tanné) et avec le [[Forgeron]] (qui produit les bottes en plate / mailles). Le Cordonnier est l'expert des **bottes, chaussures, sandales, ceintures et accessoires en cuir léger**.

---

## 1. Vue d'ensemble

Le **Cordonnier** taille, coud, monte et finit des chaussures/bottes en cuir. Il fournit le slot **Pieds** ([[Personnage]] §Emplacements d'équipement) en classe d'armure **Cuir** et **Tissu** (sandales). Il est la **spécialisation appliquée** du travail du cuir, là où le [[Tanneur]] est la production primaire.

**Place dans la chaîne d'artisanat :**
- **Amont** : [[Tanneur]] (cuir tanné, peau tannée, fourrure), [[Forgeron]] (boucles, ferrures), [[Bijoutier]] (boucles précieuses pour chaussures de cour)
- **Aval** : joueurs (slot Pieds — voir [[Bottes]])
- **Frontière** :
  - **Cordonnier ≠ Tanneur** : Tanneur = production primaire cuir ; Cordonnier = mise en forme finale chaussure
  - **Cordonnier ≠ Forgeron** : bottes plate/mailles = Forgeron ; bottes cuir/tissu = Cordonnier
  - **Cordonnier vs Maroquinier** : Maroquinier produit sacs/ceintures non-armure (frontière partagée — voir §11)
  - **Cordonnier vs Sellier** : Sellier produit selles de monture (frontière partagée — voir §11)

**Identité gameplay :**
- Métier **précis et léger** — `Acuité` (coupe, couture précise), `Vivacité` (cadence, gestes rapides), `Mémoire` (patrons, pointures, signatures), `Endurance` (sessions debout)
- Métier **petit volume haute marge** sur signatures, **grand volume basse marge** sur quotidien
- Métier **cosmétique fort** : les bottes signent un statut social

**Ancrage culturel :** Avalor (bottes royales en cuir doré), Galenor (bottes militaires fonctionnelles), Alkaran (bottes fourrées), Onara (sandales sacrées Foedus Animae), Cendara (bottes volcaniques résistantes chaleur).

---

## 2. Stats & Maîtrises

| Stat | Rôle |
|------|------|
| **Acuité** *(principale)* | Coupe précise, couture régulière, ajustement à la pointure |
| **Vivacité** *(principale)* | Cadence couture, gestes répétés efficaces |
| **Mémoire** *(secondaire)* | Patrons, signatures, pointures clientèle |
| **Endurance** *(secondaire)* | Sessions longues debout |
| Verbe | Vente boutique, présentation client (haut de gamme) |

### Maîtrises contextuelles

- **`Maîtrise_Cordonnerie`** — racine
- **`Maîtrise_Patronnage_Pied`** — sous-spécialité ajustement pointure (palier Adepte+)
- **`Maîtrise_Maroquinerie`** — sous-spécialité accessoires non-chaussure (palier Expert+)
- **`Maîtrise_Sellerie`** — sous-spécialité montures (palier Maître)

---

## 3. Sources de ressources accessibles

> Voir [[Sources de Ressources]] §Fabriqué (Cuir tanné implicite), §Créature.

### Intrants

| Intrant | Source | Notes |
|---------|--------|-------|
| **Cuir tanné** | Fabriqué ([[Tanneur]]) | Tier 1-6 selon créature d'origine |
| **Peau tannée** | Fabriqué (Tanneur) | Variante moins durable, usages légers |
| **[[Fourrure]]** | Créature mammifères froids | Bottes nordiques, doublure |
| **Fil (cuir / lin)** | Fabriqué (Tisserand / Tanneur) | Couture |
| **Boucles métalliques** | Fabriqué ([[Forgeron]]) | Sangles, attaches |
| **Pigment** | Fabriqué (Teinturier) | Coloration cuir |
| **Tannins** *(rares)* | Nature (résine, écorce) | Re-traitement local sur défauts |

### Sortie économique typique

- 1 session (Labeur ~25%) → 1 paire bottes T2-T3 OU 2 paires sandales T1 OU 1 paire bottes signature T4 (en plusieurs sessions)

---

## 4. Stations + outils

| Station | Rôle | Tier débloqué |
|---------|------|---------------|
| **Établi cuir** | Coupe, couture, montage | T1+ |
| **Forme à botte** | Mise en forme sur gabarit (par pointure) | T1+ |
| **Étendoir** | Séchage, tension cuir | T2+ |
| **Tour à coutures** | Couture mécanique répétée (palier Adepte+) | T3+ |

### Outils

| Outil | Notes |
|-------|-------|
| **Couteau de coupe** | Découpe précise patron |
| **Alène** | Perforation cuir avant couture |
| **Aiguille à cuir** | Couture épaisse |
| **Marteau de cordonnier** | Aplanir coutures, fixer talon |
| **Forme** | Gabarit pointure (4-6 tailles standard + sur-mesure) |

---

## 5. Paliers de Maîtrise

| Palier | Capacités | Conditions |
|--------|-----------|------------|
| **1 — Novice** | Sandales simples, chausses basiques. T1. Taux échec 12% (couture défaillante) | Défaut |
| **2 — Initié** | Bottes basses cuir, mocassins. T2. Pigment couleur unique. Échec 7% | Usage : 30 paires |
| **3 — Adepte** | Bottes hautes, bottes fourrées, escarpins de cour. T3. Patrons sur-mesure. Échec 5% | Usage : 100 paires + 1 commande noble |
| **4 — Expert** | Bottes signature pays (Magistral T4). Bottes furtives ([[Catégories d'Items]] §Cuir, +Vivacité). Maroquinerie débloquée | Usage : 300 paires + signature reconnue |
| **5 — Maître** 🔒 | Bottes T5 Légendaires (cuir cosmique, créatures rares). T6 Mythique sur quête. Sellerie débloquée. Héritage | **Condition cachée** : ex. tanner-coudre une botte d'un cuir d'Éternel, livrer une paire à un Roi, marche pieds nus 1000 lieues avant de fonder l'œuvre |

---

## 6. Crafts / recettes débloqués

### Productions par tier

| Palier | Sandales / chausses | Bottes courtes | Bottes hautes | Accessoires |
|--------|----------------------|-----------------|------------------|---------------|
| Novice | T1 | — | — | — |
| Initié | T2 | T2 | — | Lacets, sangles |
| Adepte | T3 | T3 | T3 | Ceintures cuir, pochettes |
| Expert | T4 (signature pays) | T4 furtives | T4 fourrées rituelles | Sacs, fourreaux, bandoulières |
| Maître | T5 sacrées (Onara) | T5 cosmiques | T5 légendaires | Selles, harnais (frontière Sellier) |

### Pattern recette canonique Cordonnerie

> Tier N = **(N-1) cuir tanné T-N** + **(N+1) fil** + **N/2 boucles métalliques** + **station T-1** + **Mastery requis** + (T3+) **patron sur-mesure**.

| Recette type | Tier | Intrants | Durée | Mini-jeu | Sortie |
|--------------|------|----------|-------|----------|--------|
| [[Bottes]] cuir T2 | 2 | Cuir tanné × 2, Fil × 3, Boucle × 1 | 15 min | Coupe + couture (2 jauges) | 1× Bottes Façonnées |
| Bottes fourrées T3 | 3 | Cuir tanné × 2, Fourrure × 1, Fil × 3, Boucle × 2 | 30 min | 3 jauges + ajustement pointure | 1× Bottes Œuvrées (résistance froid +20%) |
| Bottes signature T4 | 4 | Cuir Magistral × 2, Fil signature × 4, Boucles × 2, Pigment × 2 | 1h | 4 jauges + poinçon | 1× Bottes Magistrales (1 affixe signature) |
| Bottes Légendaires T5 | 5 | Cuir T5 (créature rare) × 2, Fil mithril × 2, Boucle bijoutière × 2 | 4h | 5 jauges + canalisation option | 1× Bottes Légendaires |

### Affixes signature (10)

1. **Pas-feutré** — −20% bruit
2. **Patte sûre** — +10% résistance glissade/tomber
3. **Confort durable** — durabilité ×1.5
4. **Cuir-mémoire** — bottes s'ajustent automatiquement (pointure flexible)
5. **Doublure de fourrure** — résistance froid +25%
6. **Talonnette ferrée** — +5% [[Personnage]] Vivacité
7. **Sandale sacrée** *(rituel Onara)* — bonus social, dialogues uniques
8. **Bottes du Voyageur** ([[Les Ères|Vents]]) — −10% Labeur en voyage
9. **Spectral** ([[Les Ères|Échos Brisés]]) — laisse 5s d'empreinte fantôme
10. **Cendrées** ([[Les Ères|Feu Endormi]]) — résistance feu sols chauds (Cendara)

---

## 7. Carrière et débouchés

```
[Apprenti] → [Cordonnier de marché] → [Cordonnier de cité] → [Cordonnier-Maître signature] → [Cordonnier-Légende royal]
```

### Spécialisations

- **Bottier** — focus bottes haut de gamme
- **Cordonnier de pauvre** — sandales/réparations
- **Maroquinier** — sacs, ceintures, fourreaux ([[Métiers|Maroquinier]])
- **Sellier** — selles de monture ([[Métiers|Sellier]] — palier Maître)

### Débouchés

- **Boutique** — clientèle régulière (cycle d'usure naturelle = client revient)
- **Cordonnier de cour** — exclusivité noble (Adepte+)
- **Réparation** — service quotidien gold-sink (cf. [[Économie]] §Cat. 1)
- **Co-fournisseur Tailleur** — bottes assorties à tenue

### Métiers complémentaires

- **[[Tanneur]]** — fournisseur amont obligatoire
- **[[Forgeron]]** — boucles, ferrures
- **[[Bijoutier]]** — boucles précieuses
- **[[Tailleur]]** — co-livraison tenue complète

---

## 8. Modulation par contexte

### Par ère ([[Les Ères]])

| Ère | Effet |
|-----|-------|
| **Sommeil de Glace** (Aquor) | Demande bottes fourrées +50%, fourrure prix x1.5 |
| **Vents** (Aerion) | Bottes du Voyageur boostées (recettes itinérantes) |
| **Feu Endormi** (Eldoria) | Demande bottes résistantes feu (Cendara) |
| **Brume Mortelle** (Umbra) | Bottes silencieuses recherchées (peur, furtivité) |

### Par contexte

- **Saison** — l'hiver double la demande bottes hautes
- **Faction militaire** — commande standardisée (volume / marge basse)
- **Religion** — sandales sacrées ([[Lore/Religions/Foedus Animae]] : Onara), bottes funéraires Vael'Kurash

---

## 9. Économie

### Ratios canoniques

| Palier | Coût intrants | Vente | Marge | Volume |
|--------|----------------|-------|-------|--------|
| Novice | 5-15 Éclats | 30 Éclats | ~50% | 3-5 paires / jour |
| Adepte | 50-100 Éclats | 250-500 | ~70% | 1-2 / jour |
| Expert | 500-2000 | 3000-10000 | ~75% | 1 / 2 jours |
| Maître | 5000-20000 | 50 000-200 000 | ~85% | 1 / semaine |

### Gold sinks

- **Réparation chaussure** ([[Économie]] §Cat. 1) — gold-sink quotidien
- **Bottes signature** — prestige
- **Selles de monture** (palier Maître, frontière Sellier) — gros sink (cf. [[Exploration]] §Monture)

---

## 10. Comportement IA + signatures PNJ

### Routine Cordonnier PNJ (Phase 2)

```
[Lever 06:00] → [Atelier matin : confection commandes en cours]
              → [Boutique 09:00-18:00 : Mode Marchand + réparations]
              → [Soir : finition + livraison]
              → [Coucher 22:00]
```

### Signatures PNJ (Phase 4)

- **Maître Galen le Bottier d'Avalor** — bottes royales
- **Vassia la Fourrée d'Alkaran** — bottes nordiques fourrures
- **Padre Iolan d'Onara** — sandales sacrées Foedus Animae
- **Calir le Pas-Feutré** *(itinérant)* — bottes furtives signature
- **Maître Sandor de Cendara** — bottes volcaniques

---

## 11. Décisions ouvertes

- [ ] **Frontière Cordonnier / Maroquinier / Sellier** : 1 métier avec 3 spé ou 3 métiers ? Proposition : **1 Cordonnier** racine + 2 spé (Maroquinier Expert+, Sellier Maître). Si charge ressentie trop lourde Phase 2, scinder
- [ ] **Bottes en armure cuir** ([[Catégories d'Items]] §Armures Cuir) — frontière avec Tanneur ? Proposition : Cordonnier produit la **chaussure** (cuir + assemblage), peut intégrer protections cuir mais pas plate/mailles
- [ ] **Réparation** : Cordonnier répare aussi bottes plate ? Proposition : non, plate = Forgeron répare
- [ ] **Calibration durabilité** par tier
- [ ] **Pointure sur-mesure** : bonus stat si la pointure est exacte ? Proposition : +5% efficacité bottes T3+ si patron sur-mesure
- [ ] **Sandales sacrées Onara** : statut rituel à formaliser ([[Lore/Religions/Foedus Animae]])

---

*Liens : [[Métiers]] · [[Crafts]] · [[Sources de Ressources]] · [[Catégories d'Items]] · [[Personnage]] · [[Bottes]] · [[Tanneur]] · [[Forgeron]] · [[Tailleur]] · [[Économie]] · [[Les Ères]]*
