'use strict';
const L = require('./lib.js');
const AGG = new Set(['cite', 'ville', 'bourg', 'hameau']);
function run() {
  const cas = [];
  for (const e of L.kg.entities) {
    const p = L.pos(e); if (!p) continue;
    const d = e.data || {};
    const ech = d.echelle || (e.type === 'entite-politique' ? 'nation' : e.type);
    const agg = AGG.has(ech);
    const loc = L.localiser(p.x, p.y);
    const F = L.continentsFiche(e);
    const Fn = [...F.keys()];
    const txt = (e.name + ' ' + (e.summary || '') + ' ' + (d.nature || '') + ' ' + (d.genre || '') + ' ' + (d.ile ? 'île' : '')).toString();
    const portIle = L.RE_PORT.test(txt) || d.ile || (d.carte && (d.carte.port || d.carte.nature));
    const lac = L.RE_LAC.test(txt);
    const base = { id: e.id, nom: e.name, type: e.type, echelle: ech, x: +p.x.toFixed(1), y: +p.y.toFixed(1), src: p.src, fiche: Fn.join('/') || '(aucun)' };
    const phys = loc.type === 'eau' ? `${loc.eau.type} ${loc.eau.dans || ''}` : loc.terre ? L.nomMasse(loc.terre) : '-';
    const physC = loc.terre ? L.continentMasse(loc.terre) : null;
    if (loc.type === 'terre') {
      if (Fn.length && !Fn.includes(physC)) {
        cas.push({ ...base, ctrl: 'A1', cat: 'continent différent', phys: phys, gravite: p.src === 'estimee' ? (agg ? 2 : 3) : (agg ? 1 : (ech === 'region' ? 2 : 3)),
          detail: `posé sur ${phys}, fiches : ${Fn.join('/')}` });
      } else if (!Fn.length) {
        cas.push({ ...base, ctrl: 'A5', cat: 'sans continent de fiche', phys, gravite: 3, detail: `posé sur ${phys}` });
      }
    } else if (loc.type === 'eau') {
      const phC = loc.eau.dans;
      const ok = lac || /lacustre|île|ilot|îlot|quai|port|rive/i.test(txt);
      const mismatch = Fn.length && phC && !Fn.includes(phC);
      if (mismatch) cas.push({ ...base, ctrl: 'A1', cat: 'eau d\'un autre continent', phys, gravite: agg ? 1 : 3, detail: `dans ${loc.eau.type} (${phC}), fiches : ${Fn.join('/')}` });
      else if (!ok && ech !== 'continent' && ech !== 'region' && ech !== 'nation') cas.push({ ...base, ctrl: 'A3', cat: 'en lac / mer intérieure', phys, gravite: agg ? 2 : 3, detail: `dans ${loc.eau.type} ${phC || ''}, sans mot lacustre dans la fiche` });
    } else { // mer
      const km = loc.dist * L.KM;
      if (loc.dist <= 0.5) continue;
      const nearC = L.continentMasse(loc.terre);
      const mism = Fn.length && !Fn.includes(nearC);
      let g;
      if (loc.dist > 10) g = agg ? 1 : 3; else if (loc.dist > 3) g = agg ? 2 : 3; else g = 3;
      if (portIle && g > 2 && loc.dist <= 10) g = 3;
      if (ech === 'continent' || ech === 'nation') g = 3;
      cas.push({ ...base, ctrl: loc.dist > 20 / L.KM ? 'A4' : 'A2', cat: loc.dist > 20 / L.KM ? 'loin de toute terre (>20 km)' : 'en mer',
        phys: `mer près de ${L.nomMasse(loc.terre)}`, gravite: g, dist_u: +loc.dist.toFixed(2), dist_km: +km.toFixed(1),
        detail: `${km.toFixed(1)} km de la côte de ${nearC}${mism ? ` (fiches : ${Fn.join('/')} — autre continent)` : ''}${portIle ? ' ; port/île dit' : ''}` });
    }
  }
  return cas;
}
module.exports = { run };
if (require.main === module) {
  const c = run();
  const g = {}; c.forEach((x) => { const k = x.ctrl + ' g' + x.gravite; g[k] = (g[k] || 0) + 1; }); console.log(g);
  c.filter((x) => x.gravite === 1).forEach((x) => console.log(x.ctrl, x.id, x.nom, x.echelle, x.src, x.detail));
}
