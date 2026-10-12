# -*- coding: utf-8 -*-
"""Cartes de l'audit 1012 : une par continent, cas marqués (lecture seule).
Usage : python cartes.py <dossier_sortie>"""
import json, sys, os
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.patches import Polygon
from matplotlib.lines import Line2D

ICI = os.path.dirname(os.path.abspath(__file__))
SITE = os.path.abspath(os.path.join(ICI, '..', '..'))
OUT = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ICI, 'cartes')
os.makedirs(OUT, exist_ok=True)

kg = json.load(open(os.path.join(SITE, 'data', 'kg-base.json'), encoding='utf-8'))
cont = json.load(open(os.path.join(SITE, 'data', 'monde-contours.json'), encoding='utf-8'))
aud = json.load(open(os.path.join(ICI, 'audit_cas.json'), encoding='utf-8'))
jeu = [j for j in cont['jeux'] if j['era_id'] is None][0]
masses = jeu['masses']
terres = [m for m in masses if m['niveau'] == 'continent']
eaux = [m for m in masses if m['niveau'] == 'eau']
E = {e['id']: e for e in kg['entities']}

def pos(e):
    d = e.get('data') or {}
    if d.get('coord_x') is not None:
        return d['coord_x'], d['coord_y'], 'c'
    pe = (d.get('carte') or {}).get('position_estimee')
    if pe and pe.get('x') is not None:
        return pe['x'], pe['y'], 'e'
    return None

AGG = {'cite', 'ville', 'bourg', 'hameau'}
fond = []
for e in kg['entities']:
    if e['type'] == 'lieu' and (e.get('data') or {}).get('echelle') in AGG:
        p = pos(e)
        if p and p[2] == 'c':
            fond.append((p[0], p[1]))

# pire gravité par id et contrôles
pire = {}
for c in aud['cas']:
    i = c['id']
    if i in (None, '-'):
        continue
    if c['ctrl'] in ('A5', 'D1') or c['gravite'] == 3 and c['ctrl'] not in ('A1', 'A2', 'A3', 'A4'):
        continue
    d = pire.setdefault(i, {'g': 9, 'ctrl': set(), 'nom': c['nom'], 'cc': c.get('continent_carte')})
    d['g'] = min(d['g'], c['gravite'])
    d['ctrl'].add(c['ctrl'][0] if c['ctrl'] != 'D1b' else 'D')
vides = [c for c in aud['cas'] if c['ctrl'] == 'D2']

def centre(m):
    xs = [p[0] for p in m['points']]; ys = [p[1] for p in m['points']]
    return min(xs), max(xs), min(ys), max(ys)

def masse_nom(m):
    return m.get('nom')

nommees = [m for m in terres if m.get('nom')]
def rattache(m):
    if m.get('nom'):
        return m['nom']
    cx = sum(p[0] for p in m['points']) / len(m['points']); cy = sum(p[1] for p in m['points']) / len(m['points'])
    best, bd = None, 1e9
    for n in nommees:
        for q in n['points']:
            d = ((q[0]-cx)**2 + (q[1]-cy)**2) ** .5
            if d < bd:
                bd, best = d, n['nom']
    return best

COUL = {1: '#d62728', 2: '#ff7f0e', 3: '#e6c200'}
noms = ['Galenor', 'Celethor', 'Ilthara', 'Onara', 'Endora', 'Azoria', 'Cestra', 'Alkaran', 'Cendara', 'Evertia', 'Ulinor']
chemins = []
for nom in noms:
    ms = [m for m in terres if rattache(m) == nom and (m.get('nom') == nom or m['aire'] < 8000 or nom == 'Cendara' and m['aire'] > 5000)]
    # îles anonymes proches seulement (aire<8000) ; île#8 (6013) ajoutée à Cendara
    x0 = min(centre(m)[0] for m in ms) - 20; x1 = max(centre(m)[1] for m in ms) + 20
    y0 = min(centre(m)[2] for m in ms) - 20; y1 = max(centre(m)[3] for m in ms) + 20
    w, h = x1 - x0, y1 - y0
    fig_w = 11; fig_h = max(5, min(13, fig_w * h / w))
    fig, ax = plt.subplots(figsize=(fig_w, fig_h), dpi=110)
    ax.set_facecolor('#cfe3ee')
    for m in terres:
        ax.add_patch(Polygon(m['points'], closed=True, fc='#e9e3cf', ec='#6b6450', lw=.8, zorder=1))
    for m in eaux:
        ax.add_patch(Polygon(m['points'], closed=True, fc='#cfe3ee', ec='#5c8aa5', lw=.6, zorder=2))
    fx = [p for p in fond if x0 <= p[0] <= x1 and y0 <= p[1] <= y1]
    ax.scatter([p[0] for p in fx], [p[1] for p in fx], s=6, c='#8a8a8a', zorder=3, lw=0)
    for v in vides:
        if x0 <= v['x'] <= x1 and y0 <= v['y'] <= y1:
            ax.scatter([v['x']], [v['y']], s=900, marker='o', fc='none', ec='#7a3db8', lw=1.5, ls='--', zorder=4)
            ax.annotate('vide %d km²' % v['km2'], (v['x'], v['y']), fontsize=7, color='#7a3db8', ha='center', va='center')
    n1 = n2 = n3 = 0
    lab = []
    for i, d in pire.items():
        e = E.get(i)
        if not e:
            continue
        p = pos(e)
        if not p or not (x0 <= p[0] <= x1 and y0 <= p[1] <= y1):
            continue
        if d['cc'] != nom and not (nom == 'Cendara' and d['cc'] in ('Cendara',)):
            continue
        g = d['g']
        mk = 's' if d['ctrl'] == {'C'} else ('^' if d['ctrl'] == {'D'} else 'o')
        ax.scatter([p[0]], [p[1]], s=46 if g == 1 else 34, marker=mk, fc=COUL[g], ec='k', lw=.6, zorder=6 - g)
        if g == 1: n1 += 1
        elif g == 2: n2 += 1
        else: n3 += 1
        lab.append((g, p, d['nom']))
    lab.sort(key=lambda t: t[0])
    for g, p, nm in lab[:45]:
        ax.annotate(nm, (p[0], p[1]), xytext=(3, 3), textcoords='offset points', fontsize=6, color='#222', zorder=9)
    # nom des continents
    for m in nommees:
        if m['nom'] and x0 <= sum(q[0] for q in m['points'])/len(m['points']) <= x1:
            pass
    ax.set_xlim(x0, x1); ax.set_ylim(y1, y0); ax.set_aspect('equal')
    ax.set_title('%s (masse sur la carte) : cas de l\'audit 1012 — %d grav.1, %d grav.2, %d grav.3 | 1 u = 0,955 km' % (nom, n1, n2, n3), fontsize=9)
    ax.grid(color='#ffffff', alpha=.4, lw=.4)
    lg = [Line2D([0], [0], marker='o', color='w', mfc=COUL[g], mec='k', ms=7, label='gravité %d' % g) for g in (1, 2, 3)]
    lg += [Line2D([0], [0], marker='s', color='w', mfc='#ccc', mec='k', ms=7, label='texte (C)'),
           Line2D([0], [0], marker='^', color='w', mfc='#ccc', mec='k', ms=7, label='jeu/routes (D)'),
           Line2D([0], [0], marker='.', color='w', mfc='#8a8a8a', ms=6, label='agglomération sans cas')]
    ax.legend(handles=lg, loc='lower left', fontsize=7, framealpha=.85)
    f = os.path.join(OUT, 'audit1012_%s.png' % nom.lower())
    fig.savefig(f, bbox_inches='tight')
    plt.close(fig)
    chemins.append(f)
    print(f, n1, n2, n3)
