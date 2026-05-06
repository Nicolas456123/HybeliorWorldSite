#!/usr/bin/env bash
# audio-merge-and-upload.sh
#
# Pipeline post-génération ElevenLabs :
#   1. Cherche le MP3 ElevenLabs le plus récent dans Downloads
#   2. Le déplace/renomme sous audio/chronique-XX-partN.mp3
#   3. Concatène toutes les parts de chronique-XX en chronique-XX.mp3
#   4. Upload chronique-XX.mp3 sur R2 (bucket hybelior-tiles, key audio/chronique-XX.mp3)
#
# Usage : bash scripts/audio-merge-and-upload.sh <num_chapitre> <num_part>
# Ex.   : bash scripts/audio-merge-and-upload.sh 1 2
#         (récupère la dernière génération ElevenLabs, l'enregistre comme part2 du chap.1)

set -e

CHAP_NUM="${1:?Usage: $0 <num_chapitre> <num_part>}"
PART_NUM="${2:?Usage: $0 <num_chapitre> <num_part>}"
CHAP_PADDED=$(printf "%02d" "$CHAP_NUM")
DOWNLOADS_DIR="${USERPROFILE:-$HOME}/Downloads"
DOWNLOADS_DIR="${DOWNLOADS_DIR//\\//}"  # backslash -> slash
SITE_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
AUDIO_DIR="$SITE_ROOT/audio"

mkdir -p "$AUDIO_DIR"

echo "[1/4] Recherche du dernier MP3 ElevenLabs dans $DOWNLOADS_DIR..."
LATEST_MP3=$(ls -t "$DOWNLOADS_DIR"/ElevenLabs_*.mp3 2>/dev/null | head -1)
if [ -z "$LATEST_MP3" ]; then
  echo "ERREUR : aucun MP3 ElevenLabs trouvé dans $DOWNLOADS_DIR"
  exit 1
fi
echo "  -> $(basename "$LATEST_MP3")"

PART_PATH="$AUDIO_DIR/chronique-${CHAP_PADDED}-part${PART_NUM}.mp3"
echo "[2/4] Renommage vers $(basename "$PART_PATH")..."
mv -f "$LATEST_MP3" "$PART_PATH"

# Liste des parts déjà présentes pour ce chapitre
PARTS=$(ls -1 "$AUDIO_DIR"/chronique-${CHAP_PADDED}-part*.mp3 2>/dev/null | sort -V)
PART_COUNT=$(echo "$PARTS" | wc -l)
echo "[3/4] Concaténation de $PART_COUNT part(s) en chronique-${CHAP_PADDED}.mp3..."

COMBINED="$AUDIO_DIR/chronique-${CHAP_PADDED}.mp3"
CONCAT_LIST="$AUDIO_DIR/.concat-list-${CHAP_PADDED}.txt"
# Use basenames (relative to AUDIO_DIR) to dodge ffmpeg's Windows path quirks
{
  while IFS= read -r p; do
    echo "file '$(basename "$p")'"
  done <<< "$PARTS"
} > "$CONCAT_LIST"

(cd "$AUDIO_DIR" && ffmpeg -y -hide_banner -loglevel error -f concat -safe 0 -i ".concat-list-${CHAP_PADDED}.txt" -c copy "chronique-${CHAP_PADDED}.mp3")
rm "$CONCAT_LIST"
echo "  -> $(basename "$COMBINED") ($(du -h "$COMBINED" | cut -f1))"

echo "[4/4] Upload R2 (hybelior-tiles/audio/chronique-${CHAP_PADDED}.mp3)..."
npx --yes wrangler r2 object put \
  "hybelior-tiles/audio/chronique-${CHAP_PADDED}.mp3" \
  --file="$COMBINED" \
  --content-type="audio/mpeg" \
  --remote 2>&1 | tail -3

echo ""
echo "=========================================="
echo "✓ chronique-${CHAP_PADDED}.mp3 uploadé sur R2"
echo "  URL : https://hybelior-tiles.nicolas-vollard.workers.dev/audio/chronique-${CHAP_PADDED}.mp3"
echo "  Parts incluses : $PART_COUNT"
echo "=========================================="
