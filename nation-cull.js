const fs = require("fs");
const path = require("path");

const VAULT = "C:/Users/nicol/iCloudDrive/iCloud~md~obsidian/Hybelior World";
const PAYS_DIR = path.join(VAULT, "Lore", "Pays");

// === KEEP LIST (18 nations) ===
const KEEP_NATIONS = new Set([
  "Cendara", "Sylthara", "Ulinor", "Astravia", "Caeloria", "Vytharia",
  "Baelor", "Kharazir", "Altram", "Iskara", "Mirathi", "Noravia",
  "Solena", "Lumasar", "Avalor", "Gryndor", "Mosrack", "Thalmaris",
  // Wildland zone aliases
  "No man's land Azoria", "No man's land Celethor", "No man's land Cestra",
  "Pays libres de Kharazir"
]);

// Build nation → cities map from country files
function extractCitiesFromFile(filepath, nationName) {
  const content = fs.readFileSync(filepath, "utf8");
  const cities = new Set();
  cities.add(nationName);

  // 1) Bold names: **CityName**
  for (const m of content.matchAll(/\*\*([A-Z][a-zà-ÿ][a-zà-ÿ\-\s']{1,40})\*\*/g)) {
    const name = m[1].trim();
    if (name.length >= 3 && !name.includes(" - ") && !name.includes(":")) {
      cities.add(name);
    }
  }

  // 2) Headers # ## ### with city-like names
  for (const m of content.matchAll(/^#{1,4}\s+([A-Z][a-zà-ÿ][a-zà-ÿ\-\s']{1,40})\s*$/gm)) {
    const name = m[1].trim();
    if (name.length >= 3 && !name.includes("—")) cities.add(name);
  }

  // 3) Capitalized standalone names mentioned with " — " (often cities in tables)
  for (const m of content.matchAll(/(?:^|\s|\|)([A-Z][a-zà-ÿ][a-zà-ÿ]{2,20})(?=\s+[—\-—–|])/g)) {
    cities.add(m[1].trim());
  }

  return cities;
}

const nationToCities = {};
const cityToNation = {};

const continents = fs.readdirSync(PAYS_DIR).filter(d => fs.statSync(path.join(PAYS_DIR, d)).isDirectory());
for (const cont of continents) {
  const dir = path.join(PAYS_DIR, cont);
  for (const f of fs.readdirSync(dir)) {
    if (!f.endsWith(".md")) continue;
    const nationName = f.replace(/\.md$/, "");
    if (nationName === cont || nationName.startsWith(cont + " ")) continue; // skip continent-index files
    const filepath = path.join(dir, f);
    const cities = extractCitiesFromFile(filepath, nationName);
    nationToCities[nationName] = Array.from(cities);
    for (const c of cities) {
      // Multiple nations might claim same name; latest wins. Acceptable for our purpose.
      if (!cityToNation[c]) cityToNation[c] = [];
      cityToNation[c].push(nationName);
    }
  }
}

console.log("Nations parsed:", Object.keys(nationToCities).length);
console.log("Cities mapped:", Object.keys(cityToNation).length);

// Read site DB
const data = JSON.parse(fs.readFileSync("local-db.json", "utf8"));
console.log("Site entries:", data.length);

// Classify each entry
const kept = [];
const dropped = [];
const orphans = [];

for (const e of data) {
  // Continents always kept
  if (e.storage === "continentsElements") { kept.push(e); continue; }
  // Pays: keep only if in KEEP_NATIONS
  if (e.storage === "paysElements") {
    if (KEEP_NATIONS.has(e.name)) kept.push(e);
    else dropped.push(e);
    continue;
  }
  // Capitales, cités, villes, villages, régions: lookup name → nation
  const nations = cityToNation[e.name];
  if (!nations) {
    // Orphan: not found in any country file
    // For régions, drop if no nation context. For others, drop too (filler).
    orphans.push(e);
    dropped.push(e);
    continue;
  }
  // If any of its mapped nations is in KEEP_NATIONS, keep the entry
  const isKept = nations.some(n => KEEP_NATIONS.has(n));
  if (isKept) kept.push(e);
  else dropped.push(e);
}

console.log("\n=== Result ===");
console.log("KEPT:", kept.length);
console.log("DROPPED:", dropped.length);
console.log("Orphans (not in any country file):", orphans.length);

// Counts per storage
function countByStorage(arr) {
  const c = {};
  for (const e of arr) c[e.storage] = (c[e.storage]||0)+1;
  return c;
}
console.log("\nKEPT by storage:", JSON.stringify(countByStorage(kept), null, 2));
console.log("DROPPED by storage:", JSON.stringify(countByStorage(dropped), null, 2));

// Save outputs
fs.writeFileSync("local-db.json", JSON.stringify(kept, null, 2));
console.log("\n✓ local-db.json updated:", kept.length, "entries");

// Generate Turso DELETE SQL
const deleteSql = dropped.map(e =>
  `DELETE FROM coordinate_overrides WHERE name = '${e.name.replace(/'/g, "''")}' AND storage = '${e.storage}';`
).join("\n");
fs.writeFileSync("turso-delete.sql", deleteSql);
console.log("✓ turso-delete.sql written:", dropped.length, "DELETE statements");

// Save dropped entries for inspection
fs.writeFileSync("dropped-entries.json", JSON.stringify(dropped, null, 2));
console.log("✓ dropped-entries.json saved for inspection");

// Save sample orphans
fs.writeFileSync("orphans.json", JSON.stringify(orphans.slice(0, 50), null, 2));
console.log("✓ orphans.json (first 50) saved");

