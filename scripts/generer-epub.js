#!/usr/bin/env node
/**
 * Fabrique les EPUB téléchargeables des quatre livres → livres/*.epub
 *
 *   node scripts/generer-epub.js            (les quatre)
 *   node scripts/generer-epub.js t1 t3      (seulement ceux-là)
 *
 * Source : les .md de Docs/Lore/Chroniques et Docs/Lore/Romans (le texte que
 * le site sert). À relancer après toute retouche d'un livre, puis committer
 * livres/. Dépendances : pandoc (assemblage), Playwright + Chromium
 * (couverture typographique ; sans eux l'EPUB sort sans couverture).
 */
'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const LORE = path.join(ROOT, 'Docs', 'Lore');
const SORTIE = path.join(ROOT, 'livres');
const AUTEUR = 'Nicolas Vollard';
const TRILOGIE = 'Les Trois Coups';

const LIVRES = [
    {
        cle: 'chroniques',
        fichier: 'les-chroniques-de-l-exile.epub',
        titre: 'Les Chroniques de l’Exilé',
        sousTitre: 'Journal de Sorin Valthen, cartographe déchu de Kharazir',
        dossier: path.join(LORE, 'Chroniques'),
        teinte: '#c9a24a',
    },
    {
        cle: 't1',
        fichier: 'les-trois-coups-1-la-septieme-heure.epub',
        titre: 'La Septième Heure',
        sousTitre: 'L’Arrachement — An 0',
        tome: 1,
        dossier: path.join(LORE, 'Romans', 'Les Trois Coups', 'T1 - La Septième Heure'),
        teinte: '#c9764a',
    },
    {
        cle: 't2',
        fichier: 'les-trois-coups-2-l-heure-qui-se-referme.epub',
        titre: 'L’Heure qui se Referme',
        sousTitre: 'Le Fléau des Failles — Ère V',
        tome: 2,
        dossier: path.join(LORE, 'Romans', 'Les Trois Coups', "T2 - L'Heure qui se Referme"),
        teinte: '#8f9bb5',
    },
    {
        cle: 't3',
        fichier: 'les-trois-coups-3-l-heure-qui-nait.epub',
        titre: 'L’Heure qui Naît',
        sousTitre: 'Le Sillage — Ère VII',
        tome: 3,
        dossier: path.join(LORE, 'Romans', 'Les Trois Coups', "T3 - L'Heure qui Naît"),
        teinte: '#7fb59a',
    },
];

const CSS = `
body { font-family: serif; line-height: 1.5; }
p { margin: 0; text-indent: 1.2em; text-align: justify; hyphens: auto; -webkit-hyphens: auto; }
h1, h2, h3 { font-weight: normal; text-align: center; hyphens: none; -webkit-hyphens: none; page-break-after: avoid; }
h1 { font-size: 1.5em; margin: 3em 0 2em; line-height: 1.3; }
h2 { font-size: 1.25em; margin: 2.5em 0 1.5em; }
h3 { font-size: 1.05em; margin: 2em 0 1em; font-style: italic; }
h1 + p, h2 + p, h3 + p, hr + p, blockquote + p { text-indent: 0; }
hr { border: 0; height: 1.2em; margin: 1.4em 0; text-align: center; }
hr::after { content: "⁂"; }
blockquote { margin: 1.2em 1.5em; }
blockquote p { text-indent: 0; margin-bottom: .5em; }
section.acte h1 { margin-top: 35%; font-size: 1.7em; }
section.presentation p { text-indent: 0; margin-bottom: .9em; }
`;

function sansFrontmatter(md) {
    return md.replace(/^﻿?---\r?\n[\s\S]*?\r?\n---\r?\n/, '').replace(/\r\n/g, '\n').trim();
}

/** Abaisse tous les titres d'un cran (le livre a des actes au-dessus des chapitres). */
function abaisser(md) {
    return md.replace(/^(#{1,5}) /gm, '#$1 ');
}

/** Un chapitre, prêt pour pandoc : chaque réplique (« — … » à la ligne) devient
 *  son propre alinéa, comme dans un livre imprimé. */
function lire(dossier, fichier) {
    return sansFrontmatter(fs.readFileSync(path.join(dossier, fichier), 'utf8')).replace(/([^\n>])\n(?=— )/g, '$1\n\n');
}

function presentation(livre) {
    const f = path.join(livre.dossier, '_resume.md');
    if (!fs.existsSync(f)) return '';
    return '# Présentation {.presentation .unnumbered}\n\n' + sansFrontmatter(fs.readFileSync(f, 'utf8')) + '\n\n';
}

function corpsChroniques(livre) {
    const idx = JSON.parse(fs.readFileSync(path.join(livre.dossier, 'chroniques-index.json'), 'utf8'));
    const parNum = new Map(idx.chapitres.map(c => [c.num, c]));
    let md = presentation(livre);
    let n = 0;
    for (const acte of idx.actes) {
        md += `# Acte ${acte.num} — ${acte.titre} {.acte}\n\n`;
        for (const num of acte.chapitres) {
            md += abaisser(lire(livre.dossier, parNum.get(num).fichier)) + '\n\n';
            n++;
        }
    }
    return { md, n, niveau: 2 };
}

function corpsRoman(livre) {
    const idx = JSON.parse(fs.readFileSync(path.join(livre.dossier, 'roman-index.json'), 'utf8'));
    let md = presentation(livre);
    let n = 0;
    for (const partie of idx.parties) {
        for (const ch of partie.chapitres) {
            md += lire(livre.dossier, ch.file) + '\n\n';
            n++;
        }
    }
    return { md, n, niveau: 1 };
}

function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
}

async function couverture(navigateur, livre, cible) {
    const police = fs.readFileSync(path.join(ROOT, 'fonts', 'Copperplate-Gothic-Std-33-BC.ttf')).toString('base64');
    const serie = livre.tome ? `${TRILOGIE} · ${['', 'I', 'II', 'III'][livre.tome]}` : 'Hybélior';
    const html = `<!doctype html><meta charset="utf-8"><style>
@font-face { font-family: Cop; src: url(data:font/ttf;base64,${police}); }
html, body { margin: 0; }
body { width: 1600px; height: 2400px; box-sizing: border-box; padding: 110px; color: #efe6d2;
  background: radial-gradient(ellipse at 50% 38%, #2a2622 0%, #14110f 60%, #0a0908 100%);
  font-family: Cop, serif; }
.cadre { height: 100%; box-sizing: border-box; border: 3px solid ${livre.teinte}; outline: 1px solid ${livre.teinte};
  outline-offset: 14px; padding: 150px 110px; display: flex; flex-direction: column; align-items: center; text-align: center; }
.serie { font-size: 50px; letter-spacing: .32em; color: ${livre.teinte}; }
.titre { font-size: 148px; line-height: 1.16; margin-top: 420px; letter-spacing: .03em; text-wrap: balance; }
.filet { width: 240px; height: 3px; background: ${livre.teinte}; margin: 90px 0; }
.sous { font-family: Georgia, 'DejaVu Serif', serif; font-style: italic; font-size: 54px; line-height: 1.45; color: #cfc4ab; text-wrap: balance; }
.auteur { margin-top: auto; font-size: 62px; letter-spacing: .2em; }
</style><div class="cadre"><div class="serie">${esc(serie)}</div><div class="titre">${esc(livre.titre)}</div>
<div class="filet"></div><div class="sous">${esc(livre.sousTitre)}</div><div class="auteur">${esc(AUTEUR)}</div></div>`;
    const page = await navigateur.newPage({ viewport: { width: 1600, height: 2400 }, deviceScaleFactor: 1 });
    await page.setContent(html);
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: cible, type: 'jpeg', quality: 88 });
    await page.close();
}

async function main() {
    const voulus = process.argv.slice(2);
    const livres = voulus.length ? LIVRES.filter(l => voulus.includes(l.cle)) : LIVRES;
    if (!livres.length) throw new Error('Livres connus : ' + LIVRES.map(l => l.cle).join(', '));

    fs.mkdirSync(SORTIE, { recursive: true });
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'hybelior-epub-'));
    fs.writeFileSync(path.join(tmp, 'livre.css'), CSS);

    let navigateur = null;
    try {
        navigateur = await require('playwright').chromium.launch();
    } catch (e) {
        console.warn('⚠ Playwright indisponible, EPUB sans couverture :', e.message.split('\n')[0]);
    }

    for (const livre of livres) {
        const { md, n, niveau } = livre.cle === 'chroniques' ? corpsChroniques(livre) : corpsRoman(livre);
        const source = path.join(tmp, livre.cle + '.md');
        fs.writeFileSync(source, md);

        const meta = {
            title: livre.titre,
            subtitle: livre.sousTitre,
            author: AUTEUR,
            lang: 'fr-FR',
            'toc-title': 'Table des matières',
        };
        if (livre.tome) {
            meta['belongs-to-collection'] = TRILOGIE;
            meta['group-position'] = livre.tome;
        }
        const fMeta = path.join(tmp, livre.cle + '.json');
        fs.writeFileSync(fMeta, JSON.stringify(meta));

        const args = [
            source,
            '--from=markdown+hard_line_breaks-yaml_metadata_block-smart',
            '--to=epub3',
            '--metadata-file=' + fMeta,
            '--css=' + path.join(tmp, 'livre.css'),
            '--toc',
            '--toc-depth=' + niveau,
            '--split-level=' + niveau,
            '--output=' + path.join(SORTIE, livre.fichier),
        ];
        if (navigateur) {
            const image = path.join(tmp, livre.cle + '.jpg');
            await couverture(navigateur, livre, image);
            args.push('--epub-cover-image=' + image);
        }
        execFileSync('pandoc', args, { stdio: 'inherit' });
        const ko = Math.round(fs.statSync(path.join(SORTIE, livre.fichier)).size / 1024);
        console.log(`✓ ${livre.fichier} — ${n} chapitres, ${ko} Ko`);
    }

    if (navigateur) await navigateur.close();
    fs.rmSync(tmp, { recursive: true, force: true });
}

main().catch(e => {
    console.error(e);
    process.exit(1);
});
