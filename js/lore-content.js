/**
 * lore-content.js — Préparation centralisée du contenu lore avant rendu.
 *
 * Chargé tôt dans index.html, expose window.LoreContent. Utilisé par tous les
 * chemins de rendu markdown (lore-reader, nation.html, lore-chroniques,
 * md-renderer) pour garantir un traitement uniforme :
 *
 *   1. stripInternalSections(md) — retire les sections éditoriales (## Cadre
 *      interne — Patterns, ## Données canoniques) qui portent la mention
 *      « N'apparaît jamais in-world » et ne doivent jamais être servies au
 *      lecteur. Couvre tous les fichiers d'un coup, sans édition de masse.
 *
 *   2. sanitizeHtml(html) — passe le HTML généré par marked à DOMPurify quand
 *      il est présent (défense en profondeur contre une injection éventuelle).
 *      Dégrade proprement en no-op si DOMPurify n'est pas chargé.
 */
(function () {
    'use strict';

    // Titres de section de niveau h2 strictement réservés aux rédacteurs.
    // Le corps de ces fichiers indique explicitement : « Encadré technique
    // réservé aux rédacteurs et agents travaillant le Lore. N'apparaît jamais
    // in-world. »
    var INTERNAL_HEADING_RE = /^##\s+(Cadre interne|Données canoniques)\b/i;
    var H2_RE = /^##\s+/;       // h2 uniquement (### ne matche pas : ## suivi de #)
    var HR_TAIL_RE = /(?:\n\s*-{3,}\s*)+\s*$/; // séparateurs --- résiduels en fin

    /** Retire les sections internes (de leur titre h2 jusqu'au prochain h2 ou EOF). */
    function stripInternalSections(md) {
        if (!md) return md;
        // Retire le frontmatter YAML en tête (--- ... ---) pour qu'il ne s'affiche pas au lecteur.
        md = md.replace(/^﻿?---\r?\n[\s\S]*?\r?\n---\r?\n?/, '');
        if (md.indexOf('##') === -1) return md;
        var lines = md.split('\n');
        var out = [];
        var skipping = false;
        for (var i = 0; i < lines.length; i++) {
            var line = lines[i];
            if (H2_RE.test(line)) {
                skipping = INTERNAL_HEADING_RE.test(line);
            }
            if (!skipping) out.push(line);
        }
        // Nettoie les séparateurs/blancs laissés par une section finale retirée.
        return out.join('\n').replace(HR_TAIL_RE, '\n').replace(/\s+$/, '') + '\n';
    }

    /** Sanitize le HTML rendu via DOMPurify si disponible, sinon renvoie tel quel. */
    function sanitizeHtml(html) {
        if (typeof DOMPurify !== 'undefined' && DOMPurify && typeof DOMPurify.sanitize === 'function') {
            return DOMPurify.sanitize(html, { USE_PROFILES: { html: true } });
        }
        return html;
    }

    window.LoreContent = {
        stripInternalSections: stripInternalSections,
        sanitizeHtml: sanitizeHtml
    };
})();
