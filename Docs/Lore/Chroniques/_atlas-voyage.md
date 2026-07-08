---
tags: [chroniques, atlas, travail, exile]
type: document-de-travail
status: draft
last_review: 2026-07-08
note: "Document de travail rédacteurs. Sert à écrire des trajets crédibles pour les « Chroniques de l'Exilé ». Fondé sur _atlas-donnees.json (coordonnées carte du site, matrice de distances, route v1, 16 étapes observées) et sur les 12 fiches Continent (Docs/Lore/Pays/<Continent>). Ne pas inventer de géographie neuve : tout obstacle cité est tiré d'une fiche."
---
# Atlas du Voyage — Chroniques de l'Exilé

But : donner à l'auteur une **carte utilisable** — où sont les continents les uns par rapport aux autres, combien de jours pour aller de l'un à l'autre, ce qui ralentit en route, et à quelle vitesse le récit voyage. Tout est calé sur la **route v1** (canon d'ordre de grandeur) et sur les **fiches Continent** (obstacles réels).

Conventions de coordonnées (unités de la carte du site) :
- **x** croît vers l'**est** (négatif = ouest, positif = est).
- **y** croît vers le **sud** (négatif = nord, positif = sud).
- Les deux extrémités glaciales confirment l'axe : **Cestra** (y = −440) et **Celethor** (y = −337) au grand nord ; **Azoria** (y = +380) au grand sud.

---

## §1 — La carte en mots

### Positions absolues (repères carte)

| Continent | x | y | Quadrant | Caractère (fiche) |
|---|---|---|---|---|
| Cestra | −437 | −440 | extrême nord-ouest | polaire, abandonné, quasi inaccessible |
| Celethor | −47 | −337 | grand nord, centre | glacial, « le plus froid d'Hybelior » |
| Alkaran | +172 | −188 | nord-est | froid, volcanique SO / glacial NE |
| Galenor | −266 | −136 | nord-ouest | tempéré, hétérogène, **point de départ v1** |
| Endora | +203 | +63 | est, équatorial | tempéré doux, petit continent |
| Onara | +395 | +95 | extrême est | industriel, tempéré à continental |
| Ulinor | +7 | +125 | centre-sud | archipel fragmenté, Grand Canyon |
| Ilthara | −222 | +152 | ouest-sud | le plus grand continent, tous climats |
| Evertia | −426 | +167 | extrême sud-ouest | archipel-forêt isolationniste |
| Baelor | +71 | +240 | centre-sud | île unique, brumeuse, « Île Fantôme » |
| Cendara | −348 | +291 | sud-ouest | archipel volcanique de feu |
| Azoria | +223 | +380 | extrême sud | arctique en couronne |

### Pays et régions nommés de la route (hors liste des 12 continents) — ajout refonte 2026-07-08

Positions relevées sur la carte du site (mêmes unités). Ces lieux sont des **pays/régions**, pas des continents ; on les situe pour trancher la route des *Chroniques*.

| Lieu | x | y | Quadrant | Rattachement / statut |
|---|---|---|---|---|
| Vytharia (pays) | −193,9 | +224,6 | ouest-sud | **Grappe SO, à ~78 u d'Ilthara** : pleinement dans la sphère d'Ilthara. Ses « enfants » lore : Lunasar et Mirathi. |
| Lunasar | — | — | non cartographiée | **Absente de la carte.** Lore : « Lunasar et Mirathi sont les enfants de Vytharia ». **Rattachement régional : sphère de Vytharia** ; position non cartographiée, traitée comme escale intra-sphère. |
| Caeloria (pays) | +193,6 | +348,5 | **sud-est** | **Voisine de Baelor (~164 u) et d'Azoria (~43 u).** PAS entre Cendara et Evertia. Liaison canon régulière : Baeloris ↔ Caeloria. Escale religieuse (Cardinal-Élu) sur l'approche sud-est de Baelor. |
| Nysaria (pays/région) | +223 | −380 | **nord-est lointain** | **À l'opposé de Vytharia (~734 u).** Plus proche voisin : Alkaran (~199 u). **Hors route** des *Chroniques* (un aller-retour NE coûterait ~60 j en pleine bascule) ; statut continent/île laissé OUVERT au lore. |

> **Conséquence de route (refonte).** Caeloria bascule au **sud-est**, sur l'**approche de Baelor** (elle le précède), non plus entre Cendara et Evertia. Le **retour SO** du protagoniste est la **sphère de Vytharia** (Vytharia + Lunasar en rattachement régional), et **non** un crochet vers Nysaria, géographiquement absurde ici.

### Voisinages (plus proches voisins, distance carte)

Qui touche qui, d'après la matrice de distances :

- **Galenor** (départ) — voisins utiles : **Ilthara 291**, **Celethor 297**, Evertia 343, Cestra 349, Alkaran 442. Position charnière entre le grand nord (Celethor, Cestra) et la masse sud-ouest (Ilthara, Cendara, Evertia).
- **Alkaran** — **Endora 252**, **Celethor 266**, Ulinor 354, Onara 360. Pont du nord-est vers l'axe équatorial.
- **Celethor** — **Alkaran 266**, **Galenor 297**, Cestra 403. Verrou glacial du nord ; peu de voisins, tous lointains.
- **Cestra** — **Galenor 349**, Celethor 403, tout le reste > 600. Cul-de-sac polaire ; on n'y va que par Galenor ou Celethor.
- **Endora** — **Onara 195**, **Ulinor 206**, **Baelor 221**, Alkaran 252. Carrefour de l'est : le continent le mieux connecté à courte portée.
- **Onara** — **Endora 195**, puis tout > 330 (Azoria 333, Baelor 356). Extrémité est ; passe presque toujours par Endora.
- **Ulinor** — **Baelor 132**, **Endora 206**, **Ilthara 231**. Pivot central-sud entre l'est (Endora/Baelor) et l'ouest (Ilthara).
- **Ilthara** — **Cendara 188**, **Evertia 205**, **Ulinor 231**, Galenor 291, Baelor 306. Le grand continent central-ouest, touche presque tout le sud-ouest ; plaque tournante v1.
- **Evertia** — **Cendara 146**, **Ilthara 205**, Galenor 343. Grappe sud-ouest serrée avec Cendara et Ilthara.
- **Cendara** — **Evertia 146**, **Ilthara 188**, puis > 390. Îlot de feu accroché à la grappe Evertia/Ilthara.
- **Baelor** — **Ulinor 132**, **Azoria 207**, **Endora 221**. Plus proche paire de tout l'atlas : Baelor↔Ulinor (132).
- **Azoria** — **Baelor 207**, Endora 318, Onara 333, Ulinor 334. Pôle sud isolé, se raccroche par Baelor.

### Trois blocs géographiques

1. **Bloc nord** — Cestra, Celethor, Galenor, Alkaran. Froid à glacial. Galenor en est la porte tempérée ; Cestra le cul-de-sac.
2. **Bloc est / équatorial** — Endora, Onara, (Alkaran par le haut, Azoria par le bas). Endora est le nœud.
3. **Bloc sud-ouest** — Ilthara, Evertia, Cendara, Ulinor, plus Baelor et Azoria au sud-centre. Grappe la plus dense ; Ilthara et Ulinor y font office de gares de triage.

### Croquis ASCII (grossier — nord en haut, ouest à gauche)

```
        OUEST  <---------------------------------------->  EST
  N   Cestra*                                                        (glacial)
  |         \
  |          \___ Celethor
  |                                              Alkaran
  |     Galenor______________________________________/
  |        (départ)
 EQ                                        Endora ........ Onara
  |                                            :
  |   Evertia   Ilthara      Ulinor___________/
  |      \        /   \        /    \
  |       Cendara      \______/      Baelor
  |                                    |
  S                    Azoria _________/                    (glacial)
```

Lecture du croquis : le voyage v1 part de **Galenor** (NO), monte/pique à l'**est** (Alkaran → Onara → Endora), redescend vers la grappe **sud-ouest** (Ilthara ↔ Endora en navette, puis Celethor, Cendara, Azoria, Evertia), fait des allers-retours autour d'**Ilthara** (la gare de triage), puis pique au **sud-centre** (Baelor) et remonte au **nord-ouest** pour clore la boucle (Cestra → retour Galenor).

---

## §2 — Tableau des liaisons utiles

**Échelle canon (v1)** : une liaison « propre » (terre + traversée normale) coûte **≈ 5 jours / 100 unités** (fourchette 4–7). Une **traversée maritime difficile** ou un **détour forcé** monte à **10–15 j / 100 u**. Les jours indiqués sont une **vitesse de récit** (ils incluent séjours, attentes et détours — voir §4), pas un temps de marche pur.

Colonne « type » : **caravane** = trajet à dominante terrestre/côtière ; **bateau** = traversée maritime obligée entre masses ; **col** = franchissement de reliefs ; **fleuve** = portion navigable exploitable.

Liaisons directes utiles (triées par proximité) :

| A → B | Dist. carte | Jours (récit) | Type dominant | Notes de trajet |
|---|---|---|---|---|
| Baelor ↔ Ulinor | 132 | 7–12 | bateau | Deux îles ; mer courte mais Baelor est voilée de brume (accostage rare) |
| Cendara ↔ Evertia | 146 | 7–10 | bateau | Deux archipels voisins ; mer + marées d'Evertia |
| Cendara ↔ Ilthara | 188 | 9–13 | bateau + col | Archipel de feu vers le grand continent ; débarquement côte ouest d'Ilthara |
| Onara ↔ Endora | 195 | 10–15 | bateau/fleuve | Court mais lent (v1 : 25 j) ; façades maritimes, transbordements |
| Endora ↔ Ulinor | 206 | 10–14 | bateau | Vers l'archipel des Échos ; passes délicates |
| Evertia ↔ Ilthara | 205 | 10–14 | bateau | Côtes fermées d'Evertia ; entrée par le ravin de Valmora seulement |
| Baelor ↔ Endora | 221 | 11–15 | bateau | Baelor visible « au vent du nord-est » uniquement |
| Ilthara ↔ Ulinor | 231 | 12–35 | bateau | **Lent** (v1 : 35 j, 15 j/100u) : archipel fragmenté, Grand Canyon, brumes |
| Alkaran ↔ Endora | 252 | 13–18 | bateau | Descente du nord-est vers l'axe équatorial |
| Alkaran ↔ Celethor | 266 | 13–20 | bateau + glace | Deux terres froides ; fenêtres de mer libre courtes |
| Galenor ↔ Ilthara | 291 | 15–20 | bateau | Ouest tempéré vers le grand continent |
| Galenor ↔ Celethor | 297 | 15–21 | bateau + glace | Porte du nord ; hiver ferme la fenêtre |
| Ilthara ↔ Baelor | 306 | 15–30 | bateau | **Lent** (v1 : 30 j) : approche brumeuse de l'Île du Silence |
| Azoria ↔ Endora | 318 | 16–22 | bateau | Route Solaire estivale (~4 mois d'ouverture) |
| Azoria ↔ Onara | 333 | 17–24 | bateau brise-glace | Route des Chenaux d'Azoral ; escorte glace obligatoire |
| Galenor ↔ Cestra | 349 | 17–25 | bateau polaire | Seule vraie porte de Cestra ; retour rarement complet |
| Alkaran ↔ Onara | 360 | 17–18 | caravane + bateau | v1 : 17 j — liaison « rapide » de référence |
| Galenor ↔ Ulinor | 378 | 19–26 | bateau | Traversée longue centre |
| Onara ↔ Ulinor | 389 | 19–27 | bateau | Est vers centre-sud |
| Celethor ↔ Cestra | 403 | 20–28 | bateau polaire | Deux pôles froids ; navigation dangereuse |
| Baelor ↔ Cendara | 422 | 21–29 | bateau | Traverse tout le sud d'ouest en est |
| Endora ↔ Ilthara | 434 | 20–30 | bateau | **Navette clé v1** (ch.16↔23) : 20 à 30 j selon le sens et la saison |
| Cendara ↔ Galenor | 434 | 22–30 | bateau | Sud-ouest vers nord-ouest |
| Evertia ↔ Ulinor | 436 | 22–30 | bateau | v1 : 30 j ; deux archipels par la mer ouverte |
| Galenor ↔ Alkaran | 442 | 22–25 | bateau | v1 : 25 j — étape d'ouverture du récit (ch.8→9) |
| Ilthara ↔ Celethor | 519 | 25–30 | bateau | Grand saut sud-ouest ↔ grand nord (v1 : 25–30 j) |
| Cendara ↔ Azoria | 578 | 29–30 | bateau | v1 : 30 j — long saut vers le pôle sud |
| Azoria ↔ Evertia | 684 | 30–34 | bateau | v1 : 30 j — remontée du pôle sud vers le SO |
| Celethor ↔ Cendara | 696 | 30–35 | bateau | v1 : 30 j — grande diagonale nord→sud-ouest |
| Baelor ↔ Cestra | 849 | 35–42 | bateau | v1 : 35 j — plus longue étape du récit, île→pôle nord |

**Lecture rapide** : à l'intérieur de la grappe sud-ouest (Ilthara–Evertia–Cendara–Ulinor–Baelor), on compte **1 à 2 semaines** par saut. Vers les pôles (Cestra, Celethor, Azoria) ou pour traverser tout l'atlas, on passe à **3–6 semaines**. Les trois liaisons intrinsèquement lentes à surveiller (mer difficile) sont **Ilthara↔Ulinor**, **Onara↔Endora** et **Ilthara↔Baelor**.

### Liaisons de la route redessinée (ajout refonte 2026-07-08)

Distances relevées sur la carte pour les pays/régions ajoutés ci-dessus ; jours calés sur l'échelle (4–7 j/100 u terre, 10–15 j/100 u mer difficile).

| A → B | Dist. carte | Jours (récit) | Type | Notes |
|---|---|---|---|---|
| Vytharia ↔ Ilthara | ~78 | intra-sphère | caravane | Vytharia est **dans** la grappe d'Ilthara ; déplacements intra-continent (steppes de Lythar, brumes de Vytharia). |
| Vytharia ↔ Cendara | ~168 | 9–13 | bateau | Sphère SO d'Ilthara vers l'archipel de feu. |
| Vytharia ↔ Evertia | ~239 | 10–14 | bateau | Cf. Evertia↔Ilthara (205, 10–14) : Vytharia à peine plus loin. |
| Ilthara/Vytharia ↔ Caeloria | ~407 | 20–25 | bateau | **Long saut SE** (mer ouverte) depuis la sphère SO vers l'approche de Baelor. |
| Caeloria ↔ Baelor | ~164 | 15–20 | bateau (brume) | **Liaison canon Baeloris↔Caeloria** ; approche voilée de l'Île du Silence (visible au seul vent du NE). |
| Caeloria ↔ Azoria | ~43 | 3–5 | bateau | Voisinage immédiat (Azoria hors route depuis la refonte, mais Caeloria en est mitoyenne). |
| Baelor → nord (Celethor) | ~589 | ~55 (sur 2 ch.) | bateau polaire | **Grand saut nord** de l'accélération (Baelor→Celethor→Cestra) ; avale la distance en chapitres de fuite. |

**Note Nysaria (hors route).** Depuis la sphère de Vytharia, Nysaria est à **~734 u** (Ilthara↔Nysaria ~694 u) : un aller-retour au nord-est en pleine bascule serait absurde. Nysaria reste dans le lore (portail canon *entrevu*, jamais visité) mais **ne figure plus sur l'itinéraire**.

---

## §3 — Obstacles par région

Tous tirés des fiches Continent. Chaque obstacle porte son **effet en jours** (surcoût à ajouter à un trajet « propre ») ou en praticabilité.

### Galenor (départ)
- **Massifs nord-est (Valoria, montagnes de Voldenor)** — hauts reliefs, vallées encaissées, **hivers de 6 à 8 mois** ; Voldenor tenu pour **infranchissable**. Effet : le nord-est se contourne, il ne se traverse pas.
- **Forêts du centre-sud (Trinoria, Frondeval)** — canopée dense, sentiers fragiles. Effet : +2 à +4 j sur une traversée forestière vs plaine.
- **Archipel sud-est (Tetramis)** — courants difficiles, isolement. Effet : liaison maritime capricieuse.
- **Route d'Or** (Solena→Etheira→Rukhsar→Soltharis) : axe caravanier praticable de référence à l'intérieur du continent.

### Alkaran
- **Deux dorsales croisées à angle droit** → quadrants séparés par des reliefs. Passages par cols.
- **Sud-ouest volcanique** (Mont Saurthen) — coulées de lave figée « marquant les routes » ; chaleur exploitée mais terrain accidenté.
- **Nord-est glacial** — hauts plateaux, vents polaires, **lacs gelés 8 mois sur 12**, hivers 5 à 9 mois. Effet : nord-est fermé la moitié de l'année.
- **Nord-ouest semi-aride** — **tempêtes de sable durant une saison entière** (désert de Torkam). Effet : traversée saisonnièrement bloquée.
- Route de la Vorne (le long de la rivière noire) = artère intérieure sûre (patrouilles d'Iskara).

### Onara
- **Massif des Cendres Rouges (Myrtam)** — pics > 4000 toises, failles incandescentes, **hivers de 6 mois**. Cols seulement.
- **Grand Fleuve d'Onar** — **artère navigable** NE→SO, 60+ ports fluviaux, barges jour et nuit. **Atout, pas obstacle** : voie rapide interne (fleuve) ; mais **miradors douaniers** Mosrack/Tyndara = attentes de passage.
- **Marais de Fugnord** — bassins saumâtres **infranchissables sans guide**. Effet : détour ou guide obligatoire.

### Endora
- **Forêt d'Indelite / Avalor** — accès étranger au **seul point autorisé (Perivalis)** ; tracé de la Route Verte **négocié saison par saison** avec le Cercle des Murmures. Effet : attente d'autorisation possible.
- **Brumes côtières haldriennes** et **courants qui changent de cap chaque génération**. Effet : navigation côtière peu fiable.
- **Lisière de jungle d'Esperia (est)** — humide, dense.
- Petit continent : **deux semaines de marche** suffisent à le traverser d'un axe à l'autre.

### Ulinor
- **Grand Canyon de l'Écho** — faille de **400+ km**, profondeur 800–2000 m, **jamais traversée** (on le longe). Effet : **coupe l'île en deux** ; unification impossible, détours obligatoires.
- **Archipel fragmenté** + **fjords gelés de Skaldoria** (hivers ~fin 8e mois → début 4e mois, navigation dangereuse). Effet : c'est le continent le plus lent à parcourir (cf. v1 Ilthara→Ulinor à 15 j/100u).
- **Vallées de Dhalvoria** — crêtes **infranchissables sans col** ; axe terrestre **ouvert 3 mois par an** seulement.

### Ilthara (le grand continent, plaque tournante)
- **Ouest** — chaînes cristallines plongeant vers l'archipel volcanique de Pyrtara. Cols.
- **Sud** — **jungle de Warenthor + marécages de Noyrath**, « masse végétale presque impénétrable » ; la **Trace Verte** (Sylthara→Ackerna→Warenthor) est **impraticable à cheval, à pied seulement**. Effet : sud très lent.
- **Est** — **steppes sans fin de Lythar** (terres non cartographiées) et **brumes permanentes de Vytharia** = frontières naturelles floues.
- **Nord** — terres glaciales ; **montagnes de Drakora** au nord-est (caravanes armées, cols de Pyrendor).
- **Voie des Cendres** (ouest-est) : **4 droits de passage, 3 changements de monture**. Effet : attentes douanières multiples.

### Evertia (archipel-forêt fermé)
- **Côtes fermées** : accostage étranger **au seul ravin de Valmora** ; Brumalis **physiquement inaccostable** (récifs, falaises, épaves) ; côte est fermée depuis 400 ans.
- **Forêt primordiale** (80 % du continent) — canopée à 50 m, **labyrinthe naturel autour de Caëspia infranchissable sans guide druidique**.
- **Détroit Evertia–Thalmaris praticable seulement certains jours selon les marées**. Effet : attente de marée.
- Liaison externe régulière unique : **Valmora ↔ Solena (Galenor), ~1 navire / 15 jours**.

### Cendara (archipel de feu)
- **Détroit de Suie** (grande île ↔ Arkhen) — **« l'un des plus traîtres d'Hybelior »** : courants hydrothermaux, **brumes sulfureuses stagnant jusqu'à 10 jours**, récifs de basalte. Seuls les navires à double coque de Thyronis le franchissent avec fiabilité. Effet : **+10 j d'attente possible** rien que pour la fenêtre.
- **Chaîne du Mont Cendra** (> 3000 m, cône tronqué) coupe la grande île ; frontière par cols et coulées.
- **Route des Sept Cratères** : circuit de **3 cols > 2000 m**, marche complète **45 à 60 jours**.
- **Activité volcanique permanente** (tremblements, éruptions possibles) : aléa de fond.

### Celethor (le plus froid)
- **Axe glaciaire nord-est (Elarian)** — **hivers de 6 à 8 mois, certaines vallées sans été**. Effet : NE fermé la majorité de l'année.
- **Terres Brisées** (zone centrale non bornée) — traitée comme **anomalie cartographique** ; on l'évite.
- **Aucune saison sans gel** ; la Route des Cristaux est **saisonnière**, la Route des Plantes dépend de tronçons que l'hiver coupe (d'où la Route Sourde de contrebande comme secours hivernal).

### Azoria (arctique en couronne)
- **Calotte centrale** — plateau gelé de plusieurs km, **vents catabatiques permanents, inhabité** ; traversée seulement par caravanes de malgers. Effet : centre infranchissable au voyageur ordinaire.
- **Nuit polaire** jusqu'à 6 mois (calotte), ~3 semaines à Solmaris. Effet : fenêtres de voyage courtes.
- **Toutes les routes saisonnières** (≤ 8 mois/an praticables). **Route Solaire** ouverte **~4 mois** ; **Route des Chenaux** exige un **brise-glace en tête de convoi** ; **Léviathans des Abysses** en mer.

### Baelor (Île du Silence / Île Fantôme)
- **Falaises noires de basalte (50–120 m)** sur ~200 lieues au nord, **sans plage praticable** ; **unique crique d'accostage** (Baeloris). Effet : on ne débarque qu'à un seul endroit.
- **Brume permanente (« Voile bas »)** — île **visible seulement au vent du nord-est** ; soleil ~1 jour sur 3. Effet : fenêtre d'approche conditionnelle (explique v1 Ilthara→Baelor à ~10 j/100u).
- **Aucune rivière navigable, aucune route intérieure balisée** (sentiers « devinés » sous la bruyère).
- Liaisons externes : 3 seulement, toutes irrégulières (Baeloris↔Caeloria ~tous les 2 mois ; Tholmë↔Tyndara saisonnier).

### Cestra (le Bastion du Nord — cul-de-sac polaire)
- **Continent collectivement abandonné**, **aucune expédition intérieure n'est revenue complète**. Effet narratif : aller-simple à haut risque.
- **Hivers de 8–9 mois (SO) à 10–11 mois (nord)** ; **côtes = seules zones accessibles**, tempêtes imprévisibles, courants traîtres.
- **Tempêtes Vivantes** (fronts erratiques : remontent le vent, s'intensifient sur les campements), **Froid Ancien** (traverse les fourrures, gèle le sang en minutes au-delà de certaines altitudes), **Massif de Givre / Glacier Central** infranchissables (Gardiens de Givre).
- Seule implantation : **Noravia** (crique SO), accès **maritime saisonnier** uniquement.

---

## §4 — Règles de déplacement du récit

### Le principe cardinal : la vitesse v1 est une vitesse de RÉCIT
Les jours de la route v1 **ne sont pas des temps de marche** : ils englobent les **séjours** dans chaque nation, les **attentes de passage** (marées, autorisations, saison), les **détours** imposés par le relief, et le temps « mort » entre deux scènes. Un même segment de 400 unités peut coûter 20 jours (traversée directe en belle saison) ou 35 (attente de fenêtre + séjour). **Ne pas convertir ces jours en cadence de cavalier** : les convertir en **rythme d'étapes narratives**.

### Barème de vitesse (pour arbitrer un trajet neuf)
Ordre de grandeur — à moduler par les obstacles du §3 :

| Mode | Cadence indicative | Usage récit |
|---|---|---|
| **Caravane / à pied chargé** | la référence v1 : ~5 j/100 u (4–7) | déplacement normal du protagoniste, séjours inclus |
| **Cheval / monture** | ~2× la caravane sur terrain ouvert | course, message, poursuite courte ; s'annule en jungle/canyon/glace |
| **Bateau (mer normale)** | comparable caravane en récit, mais **par sauts** | toute liaison intercontinentale ; dépend de la fenêtre |
| **Bateau (mer difficile)** | 10–15 j/100 u | Détroit de Suie, archipel d'Ulinor, approche de Baelor, chenaux d'Azoria |
| **Fuite / marche forcée** | pointe à ~2–3× la caravane, **quelques jours max** | non tenable : pas de séjour, ravitaillement précaire, s'effondre vite |

### Les saisons commandent les fenêtres
Beaucoup de liaisons **n'existent pas toute l'année** (tiré des fiches) :
- **Nord glacial** (Celethor NE, Alkaran NE, Cestra, Azoria) : mer et cols **fermés 6 à 11 mois** ; on part **en belle saison** ou on attend l'année suivante.
- **Ulinor / Dhalvoria** : axe terrestre **ouvert 3 mois/an** ; Skaldoria fermée du 8e au 4e mois.
- **Azoria** : Route Solaire **~4 mois**, nuit polaire jusqu'à 6 mois.
- **Evertia** : détroit **selon marées** ; navire de Solena **tous les 15 j**.
- Règle d'écriture : **si le protagoniste arrive hors fenêtre, il attend** — et l'attente devient un séjour (donc du texte), pas un trou.

### Les attentes de passage sont des événements, pas des délais
Les fiches multiplient les **points de contrôle** narrativement exploitables :
- **Onara** : miradors douaniers Mosrack/Tyndara sur l'Onar.
- **Ilthara** : Voie des Cendres = **4 droits de passage, 3 changements de monture**.
- **Endora/Avalor** : entrée par **Perivalis** seulement, tracé **négocié saison par saison**.
- **Cendara** : fenêtre du **Détroit de Suie** (brume jusqu'à 10 j) ; navires spéciaux de Thyronis.
- **Baelor** : **une seule crique** d'accostage, île visible au seul vent du NE.
- Ces points justifient mécaniquement les jours « en trop » du §2 et donnent des scènes (négociation, attente, rencontre).

### Deux garde-fous de cohérence
1. **Respecter les culs-de-sac** : Cestra ne se visite qu'en aller-risqué par Galenor/Celethor ; Evertia/Baelor/Ulinor sont des îles fermées (accès conditionnel). N'y faire entrer/sortir le protagoniste que par les portes canoniques.
2. **Respecter l'ordre de grandeur v1** (§5) : un saut intra-grappe SO ≈ 1–2 semaines ; un saut polaire ou trans-atlas ≈ 3–6 semaines. Ne pas descendre sous ~4 j/100u ni dépasser ~15 j/100u sans raison tirée d'une fiche.

---

## §5 — Canon v1 : les 16 étapes intercontinentales observées

À **respecter en ordre de grandeur** (durées de récit, séjours inclus). Colonne « j/100u » = vitesse implicite ; **> 10 = traversée maritime difficile ou détour** (marqué ⚠).

| # | Étape | Chapitres | Jours | Dist. carte | j/100u | Lecture |
|---|---|---|---|---|---|---|
| 1 | Galenor → Alkaran | 8→9 | 25 | 441.6 | 5.7 | référence terre/mer |
| 2 | Alkaran → Onara | 10→11 | 17 | 359.8 | 4.7 | rapide |
| 3 | Onara → Endora | 14→15 | 25 | 194.9 | 12.8 | ⚠ court mais lent (façades maritimes, transbordements) |
| 4 | Endora → Ilthara | 16→17 | 30 | 434.2 | 6.9 | navette (aller) |
| 5 | Ilthara → Endora | 21→22 | 20 | 434.2 | 4.6 | navette (retour rapide) |
| 6 | Endora → Ilthara | 22→23 | 25 | 434.2 | 5.8 | navette (re-aller) |
| 7 | Ilthara → Celethor | 24→25 | 30 | 519.0 | 5.8 | grand saut SO→nord |
| 8 | Celethor → Cendara | 26→27 | 30 | 696.0 | 4.3 | longue diagonale, séjour dense |
| 9 | Cendara → Azoria | 27→28 | 30 | 578.2 | 5.2 | descente vers pôle sud |
| 10 | Azoria → Evertia | 29→30 | 30 | 683.6 | 4.4 | remontée pôle sud → SO |
| 11 | Evertia → Ulinor | 31→32 | 30 | 435.6 | 6.9 | deux archipels |
| 12 | Ulinor → Ilthara | 32→33 | 35 | 230.5 | 15.2 | ⚠ le plus lent (archipel fragmenté, Canyon, brumes) |
| 13 | Ilthara → Celethor | 33→34 | 25 | 519.0 | 4.8 | re-saut nord |
| 14 | Celethor → Ilthara | 34→35 | 25 | 519.0 | 4.8 | retour SO |
| 15 | Ilthara → Baelor | 35→36 | 30 | 305.8 | 9.8 | ⚠ approche brumeuse de l'Île du Silence |
| 16 | Baelor → Cestra | 36→37 | 35 | 849.3 | 4.1 | plus longue étape ; île → pôle nord |

**Après ch.37** : Cestra → « En mer » (ch.38, j.870) → retour **Galenor** (ch.39–40, j.895–910). La boucle se referme au point de départ. Durée totale du voyage v1 : **~910 jours** (≈ 2 ans et demi), dont ~40 chapitres.

**Trois enseignements pour les nouveaux trajets :**
1. Les **legs « propres » convergent vers 4,5–5,8 j/100u** — c'est la vitesse de croisière du récit.
2. Les **trois legs lents** (⚠ #3, #12, #15) correspondent tous à des **mers/archipels difficiles** identifiés au §3 : cohérence parfaite entre carte et fiches.
3. La **navette Endora↔Ilthara** (#4–6) montre qu'un même segment peut légitimement varier de **20 à 30 jours** selon le sens et le moment : c'est le jeu narratif autorisé.
