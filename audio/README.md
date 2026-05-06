# Audio des Chroniques

Fichiers audio générés pour la lecture audiobook des Chroniques de Sorin Valthen.

## Convention de nommage

- `chronique-XX.mp3` — chapitre complet (ex. `chronique-01.mp3`)
- `chronique-XX-partN.mp3` — chunks intermédiaires en cours d'enregistrement (ex. `chronique-01-part1.mp3`)

## Pipeline de génération

1. Source annotée : `Documentation/GDD/Lore/_Audio/Chroniques/Chapitre XX - Titre.md` (dans le repo `HybeliorWorld_Project`)
2. Voix : **Nicolas - Audiobook Narrator** (ElevenLabs)
3. Modèle : **Eleven v3** (alpha — supporte les balises d'intonation)
4. Découpage en chunks de ~3-5K caractères pour rester dans les quotas
5. Concaténation finale avec ffmpeg : `ffmpeg -f concat -i parts.txt -c copy chronique-XX.mp3`

## Référencement dans le site

Champ `audio` dans `Docs/Lore/Chroniques/chroniques-index.json` :

```json
{ "num": 1, ..., "audio": "/audio/chronique-01.mp3" }
```

Le lecteur audio s'affiche automatiquement en tête du modal de lecture si ce champ est présent.

## .gitignore

Les MP3 ne sont **pas** versionnés (taille). Voir `audio/.gitignore`.
