# Rapport Beta-2 — Analyse Complète du Corpus Hybelior

> **Analyste :** Beta-2 (module d'analyse lore indépendant)
> **Date d'analyse :** 2026-03-19
> **Corpus analysé :** 12 fichiers lore — Era0 à Era7 + index Chronologie.md
> **Méthode :** Lecture séquentielle intégrale, comparaison croisée, vérification arithmétique

---

## 1. Incohérences de noms

| # | Élément | Fichier A | Fichier B | Nature du conflit | Sévérité |
|---|---------|-----------|-----------|-------------------|----------|
| N-01 | **Cercle des Huit — membres** | `Era3_Religions_Chute.md` : Sera, Drakhan, Mirathis, Vorath, Aelindra, Thessan, Kayara, Iveth | `Era4_Arrachement.md` : Serna Veld, Orath Koss, Ysala Thorne, Merith l'Aveugle, Casta Drel, Boran Shult, Pelara Ash | Deux ensembles de noms entièrement incompatibles pour le même groupe. Era3 déclare ses noms « seuls canoniques » via NOTE explicite. Era4 ignore cette déclaration. | **CRITIQUE** |
| N-02 | **Cercle des Huit — structure** | `Era3_Religions_Chute.md` : L'Étudiant est séparé/supérieur aux 8 disciples. Le Cercle = 8 personnes nommées + L'Étudiant = 9 au total. | `Era4_Arrachement.md` : L'Étudiant est lui-même le 8e membre. Le Cercle = 7 disciples + L'Étudiant = 8 au total. | Conflits sur la composition structurelle (Étudiant inclus ou non dans le compte) et sur le nombre total (9 vs. 8). | **CRITIQUE** |
| N-03 | **Orivanel (ville/capitale)** | `Era3_Lien_Empires.md` : « Orivanel (ancré) » est une ville au sein de la Théocratie de Celith (Ère III). | `Era6_Guerres_Nations.md` / `Era7_Monde_Actuel.md` : « Orivanel » est la capitale du Sanctuaire d'Orivane (Ère VI-VII). | Deux entités géographiques distinctes portent le même nom, sur (probablement) le même continent, à des époques très différentes. Aucun lien explicite n'est établi. | **MAJEUR** |
| N-04 | **Lumasar (ville/nation)** | `Era3_Religions_Chute.md` : Lumasar est une ville académique ancienne (Ère III). | `Chronologie.md` (note explicite) : « Lumasar » désigne aussi une nation fondée ~7 500 ap.A (Ère VI). | Le doublon est reconnu dans l'index, mais aucun fichier d'ère ne l'explique narrativement (hommage ? coïncidence ? succession directe ?). | **MODÉRÉ** |
| N-05 | **Marcheurs de Cendre — territoire** | `Era2_Berceaux.md` : territoire désigné comme « futur Cendara/Onara » | `Chronologie.md` (table de référence) : seul « Cendara » est mentionné comme territoire de ce peuple | Discordance mineure sur le nom complet du territoire futur. Onara n'apparaît pas dans l'index. | **MINEUR** |
| N-06 | **Orvane / Orivane / Orivanel** | Plusieurs fichiers utilisent les variantes « Orvane » et « Orivane » pour désigner apparemment la même entité politique | — | Fluctuation orthographique non résolue. À confirmer si ce sont deux entités ou une seule avec nom instable. | **MINEUR** |

### Note sur N-01 et N-02 (cas prioritaire)

L'index `Chronologie.md` contient une NOTE qui déclare explicitement les noms d'Era3 comme canoniques. Cependant, Era4 non seulement utilise des noms entièrement différents, mais modifie aussi le rôle structurel de L'Étudiant et introduit un personnage absent d'Era3 (Pelara Ash, sacrifiée en premier) avec une dimension morale inédite (Boran Shult, membre « innocent » ignorant le vrai but du rituel). Ces différences dépassent une simple divergence de nommage : elles signalent deux versions incompatibles de la même scène.

---

## 2. Incohérences chronologiques

| # | Événement | Fichier A | Fichier B | Conflit | Sévérité |
|---|-----------|-----------|-----------|---------|----------|
| C-01 | **Tyndara et Solena fondées avant leur guerre d'origine** | `Era6_Guerres_Nations.md` : Tyndara fondée ~5 100 ap.A ; Solena fondée ~5 150 ap.A | `Era6_Guerres_Nations.md` (même fichier) : Guerre des Trois Couronnes (~5 180–5 230) est censée scinder Galenthis et donner naissance à ces deux nations | Les deux nations existent 30–80 ans avant la guerre qui est censée les créer. Contradiction interne dans le même fichier. | **MAJEUR** |
| C-02 | **Biographie de Verithan — âge à la mort de Thyara** | `Era3_Religions_Chute.md` : Verithan entre à Lumasar à ~18 ans ; ses compagnons le quittent après 30 ans (donc ~48 ans) → Thyara meurt | `Era3_Religions_Chute.md` (même passage) : le texte décrit Verithan comme « ayant ~80 ans » au moment de la mort de Thyara | Si Verithan commence à 18 ans et Thyara meurt 30 ans après leur rencontre, il a ~48 ans, non ~80. Soit « 30 ans » est faux, soit « ~80 ans » est faux. | **MODÉRÉ** |
| C-03 | **Durée de l'Arrachement — « en un an » vs. « sur 3 000 ans »** | `Era4_Arrachement.md` (section population) : « ~120 millions → ~30 millions en un an » | `Era4_Arrachement.md` (cadre narratif général) + `Chronologie.md` : l'Arrachement est un processus « sur ~3 000 ans » | La perte de 90 millions de personnes est tantôt présentée comme instantanée (un an), tantôt comme étalée sur trois millénaires. | **MAJEUR** |
| C-04 | **Repères de l'Ère IV** | `Era4_Arrachement.md` : début de l'ère situé après la chute de l'Ère III | `Chronologie.md` : bornes floues pour l'Ère IV (aucune date précise en ap.A ou av.A dans l'index) | Absence de borne de début absolue pour l'Ère IV rendant impossible la vérification de cohérence avec les Ères III et V. | **MINEUR** |

---

## 3. Incohérences causales (entre ères)

| # | Élément causal | Ère source | Ère cible | Rupture logique | Sévérité |
|---|---------------|-----------|-----------|-----------------|----------|
| CA-01 | **7 grands empires historiques vs. 6 empires de l'Âge d'Or** | `Era3_Lien_Empires.md` : liste de 7 empires séquentiels sur ~20 000 ans | `Era3_Lien_Empires.md` (même fichier) : liste de 6 empires simultanés à l'Âge d'Or pré-Arrachement | Ces deux listes ne sont pas explicitement reliées. Le lecteur ne sait pas si les 6 empires de l'Âge d'Or sont un sous-ensemble des 7, leur succèdent, ou coexistent avec certains d'entre eux. Aucune phrase de transition ne l'explique. | **MAJEUR** |
| CA-02 | **Pelara Ash (sacrifice inaugural) — absence en Era3** | `Era4_Arrachement.md` : Pelara Ash est sacrifiée en premier pour déclencher le rituel ; moment fondateur de l'Arrachement | `Era3_Religions_Chute.md` : aucun personnage de ce nom, aucun sacrifice inaugural mentionné dans la description du Cercle des Huit | Un événement aussi dramatique (premier sacrifice, catalyseur du rituel) devrait avoir une trace ou une anticipation en Era3. Son absence complète fragilise la cohérence causale. | **MODÉRÉ** |
| CA-03 | **Boran Shult (membre ignorant) — dimension morale absente en Era3** | `Era4_Arrachement.md` : Boran Shult est présenté comme un membre du Cercle qui ne connaissait pas le vrai but du rituel (dimension morale de la manipulation) | `Era3_Religions_Chute.md` : les membres du Cercle sont décrits uniformément sans nuance morale différenciée | L'idée qu'un membre était manipulé enrichit la causalité du rituel mais est absente du fichier canonique. Soit c'est un ajout Era4 non synchronisé, soit Era3 est incomplet sur ce point. | **MODÉRÉ** |
| CA-04 | **Survie du Grand Gel → Reconstruction** | `Era2_Gel_Reconstruction.md` : ~12 300 survivants sur ~45 000 (73% de mortalité) | `Era3_Lien_Empires.md` : les premiers empires se développent très rapidement avec des populations qui semblent beaucoup plus grandes sans explication du taux de croissance | Le bond démographique entre ~12 300 survivants du Gel et les populations d'empire de l'Ère III n'est jamais expliqué, même approximativement. | **MINEUR** |
| CA-05 | **Les Éternels et la Faille d'Ordavan (Era7)** | `Era0_Le_Vide.md` : les 5 Éternels sont présentés comme fondements passifs du Substrat | `Era7_Monde_Actuel.md` : la Faille d'Ordavan est listée comme un des 4 mystères cosmiques actifs, potentiellement liée aux Éternels | Le lien causal entre la Faille et les Éternels est évoqué mais non établi. Si un Éternel se réveille ou se fracture, le mécanisme devrait être préfiguré en Era0. | **MINEUR** |

---

## 4. Incohérences de faits

| # | Fait | Valeur A | Source A | Valeur B | Source B | Nature du conflit | Sévérité |
|---|------|----------|----------|----------|----------|-------------------|----------|
| F-01 | **Taux de mortalité du Grand Gel** | ~73% (calcul : 45 000 → 12 300) | `Era2_Gel_Reconstruction.md` (tableau détaillé par peuple) | ~80% | `Era2_Gel_Reconstruction.md` (texte du résumé) + `Chronologie.md` | Le tableau interne contredit le résumé du même fichier. L'index reprend la valeur fausse du résumé. | **MAJEUR** |
| F-02 | **Population mondiale lors de l'Arrachement** | ~120 millions avant, ~30 millions après | `Era4_Arrachement.md` | Population de fin d'Ère V : ~15–18 millions | `Era5_Grande_Nuit.md` | Si l'Ère IV laisse ~30 millions et que l'Ère V (Fléau des Failles, ~40% de mortalité) suit, la population de fin d'Ère V devrait être ~18 millions — ce qui est cohérent. Mais si la chute à 30M s'est produite « en un an » (C-03), toute la démographie intermédiaire des ~3 000 ans d'Ère IV devient incohérente. | **MAJEUR** |
| F-03 | **Nombre de membres du Cercle des Huit** | 8 disciples nommés + L'Étudiant (= 9 personnes au total dans le groupe) | `Era3_Religions_Chute.md` | 7 disciples nommés + L'Étudiant comme 8e (= 8 personnes au total) | `Era4_Arrachement.md` | Désaccord sur le nombre absolu de membres. « Huit » est dans le nom du groupe, mais les deux fichiers ne s'accordent pas sur qui est inclus dans ce huit. | **CRITIQUE** |
| F-04 | **Statut du Mont Jumeau** | Englouti sous la glace de Cestra lors de la Fracture du Panghor | `Era1_Etheres_Panghor.md` | Non mentionné dans les ères suivantes | — | Fait établi sans aucune résolution narrative. Est-il toujours sous la glace en Ère VII ? Sa disparition est-elle définitive ? Le silence est cohérent mais constitue un point ouvert non balisé. | **MINEUR** |
| F-05 | **Cantor — parenté** | Eldoria × Arborius | `Era1_Cosmiques.md` (tableau) | Eldoria × Arborius | `Era1_Cosmiques.md` (récit) | *Cohérent* — mentionné ici pour confirmer l'absence de conflit après vérification. | — |

---

## 5. Points flous / lacunes

| # | Point flou | Fichier(s) concerné(s) | Description | Impact sur la cohérence |
|---|-----------|----------------------|-------------|------------------------|
| P-01 | **Passage des 7 empires séquentiels aux 6 empires simultanés** | `Era3_Lien_Empires.md` | Aucune phrase de transition n'explique le rapport entre les deux listes d'empires. Le lecteur ne sait pas si les 6 empires de l'Âge d'Or incluent certains des 7, leur sont postérieurs, ou constituent une liste entièrement distincte. | Élevé — crée une confusion de base sur la structure impériale de l'Ère III |
| P-02 | **Mécanique exacte de l'Arrachement** | `Era4_Arrachement.md`, `Era3_Religions_Chute.md` | Le rituel du Cercle des Huit est décrit en termes symboliques mais la mécanique précise (quoi exactement a été « arraché », comment, avec quelles conséquences physiques sur le monde) reste vague. | Modéré — affecte la compréhension causale des Ères IV à VII |
| P-03 | **Croissance démographique entre Grand Gel et Ère III** | `Era2_Gel_Reconstruction.md`, `Era3_Lien_Empires.md` | ~12 300 survivants du Gel doivent produire des populations d'empire en Ère III (des siècles plus tard, certes, mais sans aucun repère intermédiaire). Le taux de croissance implicite n'est jamais évoqué. | Faible — lacune de détail plutôt qu'incohérence active |
| P-04 | **Sort des 45 Éthérés après l'Ère I** | `Era1_Etheres_Panghor.md` | Les Éthérés sont très présents en Ère I. Leur disparition, retrait, ou transformation dans les ères suivantes n'est jamais explicitée. Quelques apparaissent en Era7 (Silence des Phénix) mais sans continuité narrative. | Modéré — fossé entre présence intense en Ère I et quasi-silence ensuite |
| P-05 | **Orivanel ancré (Ère III) et Orivanel capitale (Ère VI-VII)** | `Era3_Lien_Empires.md`, `Era6_Guerres_Nations.md` | Deux villes portant le même nom dans des contextes distincts. Si c'est la même ville qui survit, cela doit être établi. Si ce sont deux villes différentes, la coïncidence de nom devrait être expliquée (hommage ? reconquête symbolique ?). | Modéré |
| P-06 | **Lumasar — continuité ville/nation** | `Era3_Religions_Chute.md`, `Chronologie.md` | L'index signale le doublon mais aucun fichier n'explique le lien narratif entre la ville académique de l'Ère III et la nation de l'Ère VI portant le même nom. | Faible |
| P-07 | **Faille d'Ordavan — nature et origine** | `Era7_Monde_Actuel.md` | Listée comme mystère cosmique actif majeur mais son origine n'est tracée dans aucune ère antérieure. Aucune mention d'Ordavan avant l'Ère VII. | Modéré — anomalie de préfiguration |
| P-08 | **Liés / Déliés — mécanisme d'apparition** | `Era7_Monde_Actuel.md` | Le clivage Liés/Déliés est présenté comme une réalité sociale de l'Ère VII sans ancrage clairement établi dans un événement des ères précédentes. | Modéré |
| P-09 | **Les 25 Éthérés détaillés sur 45** | `Era1_Etheres_Panghor.md` | Seuls 25 des 45 Éthérés sont décrits. Les 20 restants ne sont pas nommés ou sont traités comme un bloc. Est-ce intentionnel (seuls les 25 sont narrativement pertinents) ou une lacune de rédaction ? | Faible — à clarifier pour les auteurs |
| P-10 | **Catena Fracta — fondation et objectifs** | `Era7_Monde_Actuel.md` | Organisation présentée comme majeure en Ère VII mais sans trace dans les ères précédentes. Quand a-t-elle été fondée ? Par qui ? En réponse à quoi exactement ? | Faible |

---

## 6. Propositions d'amélioration

| # | Priorité | Fichier(s) cibles | Proposition | Justification |
|---|----------|------------------|-------------|---------------|
| A-01 | **URGENTE** | `Era4_Arrachement.md` | Remplacer tous les noms du Cercle des Huit par les noms canoniques d'Era3 : Sera, Drakhan, Mirathis, Vorath, Aelindra, Thessan, Kayara, Iveth. Réintégrer L'Étudiant comme personnage séparé/supérieur au groupe (non compté parmi les huit). | Résout N-01, N-02, F-03 — l'incohérence la plus grave du corpus. La NOTE dans Chronologie.md déclare Era3 canonique : Era4 doit s'y conformer. |
| A-02 | **URGENTE** | `Era4_Arrachement.md` | Supprimer ou reformuler « en un an » dans la phrase sur la chute démographique. La remplacer par une formulation cohérente avec le cadre « sur ~3 000 ans » (ex. : « sur l'ensemble de la période »). | Résout C-03 et F-02. |
| A-03 | **HAUTE** | `Era2_Gel_Reconstruction.md` + `Chronologie.md` | Corriger le taux de mortalité du Grand Gel : le calcul interne donne ~73%, non ~80%. Mettre à jour le résumé du fichier et la table de l'index en conséquence. | Résout F-01. Correction arithmétique simple. |
| A-04 | **HAUTE** | `Era6_Guerres_Nations.md` | Clarifier les dates de fondation de Tyndara et Solena : soit les reculer après ~5 230 ap.A (fin de la Guerre des Trois Couronnes), soit expliquer que ces nations existaient sous une autre forme avant la guerre et ont été officiellement refondées/renommées à l'issue du conflit. | Résout C-01. |
| A-05 | **HAUTE** | `Era3_Lien_Empires.md` | Ajouter un paragraphe de transition explicitant le rapport entre les 7 empires séquentiels et les 6 empires de l'Âge d'Or (sous-ensemble ? succession ? liste distincte ?). | Résout CA-01 et P-01. Impact lecture très significatif. |
| A-06 | **HAUTE** | `Era4_Arrachement.md` | Si Pelara Ash et Boran Shult sont conservés comme personnages (sous les noms canoniques d'Era3 après A-01), ajouter une mention ou anticipation de leurs rôles spécifiques (sacrifice inaugural, membre manipulé) dans `Era3_Religions_Chute.md`. | Résout CA-02 et CA-03. Renforce la cohérence causale. |
| A-07 | **MODÉRÉE** | `Era3_Religions_Chute.md` | Corriger la biographie de Verithan : harmoniser l'âge à la mort de Thyara avec les 30 ans de compagnonnage depuis les ~18 ans d'entrée à Lumasar (→ ~48 ans à sa mort, non ~80). Ou revoir la durée du compagnonnage. | Résout C-02. |
| A-08 | **MODÉRÉE** | `Era3_Lien_Empires.md` + `Era6_Guerres_Nations.md` | Clarifier la relation entre Orivanel (ville de la Théocratie de Celith, Ère III) et Orivanel (capitale du Sanctuaire d'Orivane, Ères VI-VII). Si c'est la même ville, l'établir. Si ce sont deux villes, distinguer les noms ou expliquer l'hommage. | Résout N-03 et P-05. |
| A-09 | **MODÉRÉE** | `Era3_Religions_Chute.md` ou nouveau fichier | Ajouter une note ou section sur la continuité Lumasar (ville académique, Ère III → nation, Ère VI). Expliquer si c'est un hommage, une succession directe, ou une coïncidence. | Résout N-04 et P-06. |
| A-10 | **FAIBLE** | `Era1_Etheres_Panghor.md` | Ajouter un encadré ou une note précisant intentionnellement que les 20 Éthérés non détaillés sont des entités mineures sans rôle narratif établi (ou les nommer si pertinent). | Résout P-09. Clarifie l'intention éditoriale. |
| A-11 | **FAIBLE** | `Era7_Monde_Actuel.md` | Ajouter la date de fondation de la Catena Fracta et un lien vers l'événement déclencheur. | Résout P-10 partiellement. |

---

## 7. Questions ouvertes prioritaires

Ces questions nécessitent une décision d'auteur avant toute correction de fichier.

**Q-01 [BLOQUANTE — Cercle des Huit]**
Quelle est la version authoritaire du Cercle des Huit ?
- Option A : Era3 est canonique (noms : Sera, Drakhan, Mirathis, Vorath, Aelindra, Thessan, Kayara, Iveth ; L'Étudiant hors du compte des huit). → Era4 doit être réécrit en intégralité sur ce point.
- Option B : Era4 est en réalité la version retenue, et la NOTE dans Chronologie.md est obsolète. → Era3 et la NOTE doivent être mis à jour.
- Option C : Les deux versions coexistent intentionnellement (narration intradiégétique, sources divergentes). → Le faire savoir explicitement dans l'index.

**Q-02 [BLOQUANTE — Structure du Cercle]**
L'Étudiant est-il l'un des huit membres du Cercle, ou le fondateur/maître au-dessus des huit ?
Cette décision change le rôle dramatique du personnage et la signification du rituel. Elle doit être tranchée avant toute harmonisation des deux fichiers.

**Q-03 [HAUTE PRIORITÉ — Arrachement]**
La chute démographique de ~90 millions se produit-elle sur une année (catastrophe instantanée) ou sur 3 000 ans (déclin lent) ?
Les deux lectures impliquent des univers narratifs radicalement différents. La précision à apporter dans Era4 est critique pour toutes les ères suivantes.

**Q-04 [HAUTE PRIORITÉ — Tyndara/Solena]**
Tyndara et Solena ont-elles été fondées avant la Guerre des Trois Couronnes (ce qui implique de revoir leur origine) ou après (ce qui implique de corriger leurs dates de fondation en Era6) ?

**Q-05 [MODÉRÉE — Orivanel]**
Est-ce que « Orivanel (ancré) » dans la Théocratie de Celith est la même ville qu'Orivanel capitale du Sanctuaire d'Orivane, ou deux entités distinctes portant le même nom par hommage, conquête symbolique, ou coïncidence ?

**Q-06 [MODÉRÉE — Pelara Ash et Boran Shult]**
Ces personnages (membre sacrifié en premier ; membre ignorant le vrai but) sont-ils des ajouts narratifs à conserver sous des noms canoniques Era3 ? Si oui, quel(s) membre(s) d'Era3 jouent ces rôles ?

**Q-07 [FAIBLE — Éthérés post-Era I]**
Quelle est la destinée narrative des Éthérés après l'Ère I ? Sont-ils dormants, disparus, transformés ? Cela a une incidence directe sur les mystères de l'Ère VII (Silence des Phénix).

---

*Fin du rapport Beta-2. Total des points relevés : 6 incohérences de noms, 4 incohérences chronologiques, 5 incohérences causales, 5 incohérences de faits, 10 points flous, 11 propositions d'amélioration, 7 questions ouvertes.*
