const fs = require("fs");
const path = require("path");

const VAULT = "C:/Users/nicol/iCloudDrive/iCloud~md~obsidian/Hybelior World";
const PAYS_DIR = path.join(VAULT, "Lore", "Pays");

// === FINAL KEEP LIST: 18 nations ===
const KEEP_NATIONS = new Set([
  "Cendara", "Sylthara", "Ulinor", "Astravia", "Caeloria", "Vytharia",
  "Baelor", "Kharazir", "Altram", "Iskara",
  "Solena", "Lumasar", "Avalor", "Gryndor", "Mosrack", "Thalmaris",
  "Evertia", "Ackerna",
  "No man's land Azoria", "No man's land Celethor", "No man's land Cestra",
  "Pays libres de Kharazir"
]);

const PROTECTED_NAMES = new Set([
  "Brumaris", "Hekorinth", "Olkanoris", "Duskoris", "Myrthorin",
  "Trelios", "Glintaris", "Invernis", "Brystalis", "Holvendar",
  "Oranthor", "Prismalith", "Rukhsar", "Amarendis", "Folgrad", "Ostarith",
  "Crestalis", "Cëpias", "Ackerna", "Caëspia",
  "Cendara", "Sylthara", "Ulinor", "Astravia", "Caeloria", "Vytharia",
  "Baelor", "Kharazir", "Altram", "Iskara",
  "Solena", "Lumasar", "Avalor", "Gryndor", "Mosrack", "Thalmaris",
  "Evertia",
]);

function extractCitiesFromFile(filepath, nationName) {
  const content = fs.readFileSync(filepath, "utf8");
  const cities = new Set();
  cities.add(nationName);
  for (const m of content.matchAll(/\*\*([A-ZÀ-Ÿ][a-zà-ÿ\-'][\w\-\s']{1,40})\*\*/g)) {
    const n = m[1].trim();
    if (n.length>=3 && !n.includes(" - ") && !n.includes(":") && !n.match(/^\d/)) cities.add(n);
  }
  for (const m of content.matchAll(/^#{2,4}\s+([A-ZÀ-Ÿ][a-zà-ÿ\-'][\w\-']{1,30})(?:\s|—|–|-|$)/gm)) cities.add(m[1].trim());
  for (const m of content.matchAll(/\|\s*([A-ZÀ-Ÿ][a-zà-ÿ\-'][\w\-']{2,30})\s*\|/g)) {
    const n = m[1].trim();
    if (n.length>=3 && !["Capitale","Région","Nation","Pays","Cité","Ville","Village","Territoire","Type","Description","Population"].includes(n)) cities.add(n);
  }
  for (const m of content.matchAll(/[-*]\s+\*\*([A-ZÀ-Ÿ][\w\-']{2,30})\*\*\s*[—:–]/g)) cities.add(m[1].trim());
  return cities;
}

const cityToNation = {};
const continents = fs.readdirSync(PAYS_DIR).filter(d => fs.statSync(path.join(PAYS_DIR, d)).isDirectory());
for (const cont of continents) {
  for (const f of fs.readdirSync(path.join(PAYS_DIR, cont))) {
    if (!f.endsWith(".md")) continue;
    const nationName = f.replace(/\.md$/, "");
    if (nationName.startsWith(cont + " - ") || nationName === "_index") continue;
    const filepath = path.join(PAYS_DIR, cont, f);
    const cities = extractCitiesFromFile(filepath, nationName);
    for (const c of cities) {
      if (!cityToNation[c]) cityToNation[c] = [];
      if (!cityToNation[c].includes(nationName)) cityToNation[c].push(nationName);
    }
  }
}

const data = JSON.parse(fs.readFileSync("local-db.json", "utf8"));
const kept = [], dropped = [];
for (const e of data) {
  if (e.storage === "continentsElements") { kept.push(e); continue; }
  if (e.storage === "paysElements") {
    if (KEEP_NATIONS.has(e.name)) kept.push(e); else dropped.push(e);
    continue;
  }
  if (PROTECTED_NAMES.has(e.name)) { kept.push(e); continue; }
  if (KEEP_NATIONS.has(e.name)) { kept.push(e); continue; }
  const nations = cityToNation[e.name] || [];
  if (nations.length === 0) { dropped.push(e); continue; }
  const isKept = nations.some(n => KEEP_NATIONS.has(n));
  if (isKept) kept.push(e); else dropped.push(e);
}

console.log("Original:", data.length, "| KEPT:", kept.length, "| DROPPED:", dropped.length, "(" + ((dropped.length/data.length)*100).toFixed(1)+"%)");
function cs(arr) { const c={}; for(const e of arr) c[e.storage]=(c[e.storage]||0)+1; return c; }
console.log("Kept:", JSON.stringify(cs(kept)));
console.log("Pays kept (",kept.filter(e=>e.storage==="paysElements").length,"):", kept.filter(e=>e.storage==="paysElements").map(e=>e.name).join(", "));

fs.writeFileSync("local-db.json", JSON.stringify(kept, null, 2));
const sql = "-- Generated " + new Date().toISOString() + "\n-- " + dropped.length + " entries to remove\n-- Apply via Turso Studio\n\n" +
  dropped.map(e => `DELETE FROM coordinate_overrides WHERE name = '${e.name.replace(/'/g, "''")}' AND storage = '${e.storage}';`).join("\n");
fs.writeFileSync("turso-delete.sql", sql);
console.log("\n✓ local-db.json:", kept.length, "entries");
console.log("✓ turso-delete.sql:", dropped.length, "DELETE statements");
fs.writeFileSync("dropped-entries.json", JSON.stringify(dropped, null, 2));
