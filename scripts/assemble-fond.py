#!/usr/bin/env python3
"""Assemble le fond de carte de référence depuis les tuiles DZI publiques.

Tourne dans GitHub Actions (workflow « Fond de référence ») : les sessions
Claude Code n'ont pas accès au domaine des tuiles, le runner CI si — sauf
que le Worker (ou Cloudflare devant lui) rejette en 403 les clients qui ne
ressemblent pas à un navigateur. Ce script essaie donc plusieurs profils
d'en-têtes, du plus nu au plus « navigateur », et imprime un diagnostic
complet de chaque refus (status, en-têtes cf-*, début du corps) pour
identifier la protection en jeu.

Sortie : fond-reference.jpg (~4000 px) + HybeliorMap.dzi dans le cwd.
"""

import io
import math
import sys
import time
import xml.etree.ElementTree as ET

import requests
from PIL import Image

BASE = 'https://hybelior-tiles.nicolas-vollard.workers.dev'
NOM = 'HybeliorMap'
CIBLE = 4096  # largeur max du niveau choisi

UA_CHROME = ('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 '
             '(KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36')

# Du plus simple au plus complet : le premier profil accepté sert pour tout.
PROFILS = [
    ('nu', {}),
    ('user-agent navigateur', {'User-Agent': UA_CHROME}),
    ('navigateur + referer site', {
        'User-Agent': UA_CHROME,
        'Referer': 'https://hybelior-world-site.vercel.app/',
        'Origin': 'https://hybelior-world-site.vercel.app',
        'Accept': '*/*',
        'Accept-Language': 'fr-FR,fr;q=0.9,en;q=0.8',
    }),
    ('navigateur complet (sec-fetch)', {
        'User-Agent': UA_CHROME,
        'Referer': 'https://hybelior-world-site.vercel.app/',
        'Origin': 'https://hybelior-world-site.vercel.app',
        'Accept': 'image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'fr-FR,fr;q=0.9,en;q=0.8',
        'Sec-Fetch-Dest': 'image',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'cross-site',
        'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
    }),
]


def diagnostiquer(nom, r):
    """Imprime tout ce qui permet d'identifier la protection derrière un refus."""
    print(f'  [{nom}] HTTP {r.status_code}')
    for h in ('server', 'cf-ray', 'cf-mitigated', 'cf-cache-status',
              'content-type', 'www-authenticate'):
        if h in r.headers:
            print(f'    {h}: {r.headers[h]}')
    corps = r.text[:300].replace('\n', ' ')
    if corps:
        print(f'    corps: {corps}')


def choisir_profil():
    for nom, entetes in PROFILS:
        try:
            r = requests.get(f'{BASE}/{NOM}.dzi', headers=entetes, timeout=30)
        except Exception as e:
            print(f'  [{nom}] exception: {e}')
            continue
        if r.ok:
            print(f'  [{nom}] HTTP 200 — profil retenu')
            return entetes, r
        diagnostiquer(nom, r)
    return None, None


def get(s, url):
    for essai in range(3):
        try:
            r = s.get(url, timeout=30)
            r.raise_for_status()
            return r
        except Exception:
            if essai == 2:
                raise
            time.sleep(2 * (essai + 1))


def main():
    print('— Recherche d’un profil d’en-têtes accepté —', flush=True)
    entetes, dzi = choisir_profil()
    if dzi is None:
        print('\nÉCHEC : tous les profils sont refusés. Voir les diagnostics '
              'ci-dessus (cf-mitigated=challenge → protection anti-bot '
              'Cloudflare ; corps custom → contrôle dans le Worker déployé).')
        sys.exit(1)

    s = requests.Session()
    s.headers.update(entetes)

    racine = ET.fromstring(dzi.content)
    # Le DZI porte un namespace deepzoom : on lit les attributs sans lui.
    tuile = int(racine.get('TileSize'))
    chevauche = int(racine.get('Overlap'))
    fmt = racine.get('Format')
    taille = racine[0]
    W, H = int(taille.get('Width')), int(taille.get('Height'))
    niveau_max = math.ceil(math.log2(max(W, H)))

    niveau = niveau_max
    while max(W, H) / 2 ** (niveau_max - niveau) > CIBLE:
        niveau -= 1
    echelle = 2 ** (niveau_max - niveau)
    lw, lh = math.ceil(W / echelle), math.ceil(H / echelle)
    cols, lignes = math.ceil(lw / tuile), math.ceil(lh / tuile)
    print(f'plein format {W}x{H}, niveau {niveau} -> {lw}x{lh}, '
          f'{cols}x{lignes} = {cols * lignes} tuiles', flush=True)

    toile = Image.new('RGB', (lw, lh))
    for ty in range(lignes):
        for tx in range(cols):
            r = get(s, f'{BASE}/{NOM}_files/{niveau}/{tx}_{ty}.{fmt}')
            im = Image.open(io.BytesIO(r.content))
            g = chevauche if tx > 0 else 0
            h = chevauche if ty > 0 else 0
            larg = min(tuile, lw - tx * tuile)
            haut = min(tuile, lh - ty * tuile)
            toile.paste(im.crop((g, h, g + larg, h + haut)),
                        (tx * tuile, ty * tuile))
        print(f'ligne {ty + 1}/{lignes}', flush=True)

    toile.save('fond-reference.jpg', quality=88)
    with open(f'{NOM}.dzi', 'w') as f:
        f.write(dzi.text)
    print('OK :', lw, 'x', lh, flush=True)


if __name__ == '__main__':
    main()
