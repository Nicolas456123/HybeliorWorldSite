const fs = require("fs");
const path = require("path");

const VAULT = "C:/Users/nicol/iCloudDrive/iCloud~md~obsidian/Hybelior World";
const PAYS_DIR = path.join(VAULT, "Lore", "Pays");

// === KEEP LIST (18 nations + 3 wildland zones) ===
const KEEP_NATIONS = new Set([
  "Cendara", "Sylthara", "Ulinor", "Astravia", "Caeloria", "Vytharia",
  "Baelor", "Kharazir", "Altram", "Iskara", "Mirathi", "Noravia",
  "Solena", "Lumasar", "Avalor", "Gryndor", "Mosrack", "Thalmaris",
  "No man's land Azoria", "No man's land Celethor", "No man's land Cestra",
  "Pays libres de Kharazir"
]);

// Hardcoded protected capitales (some are missed by regex, so we ensure them)
const PROTECTED_NAMES = new Set([
  // Capitales of kept nations (explicit)
  "Brumaris", "Hekorinth", "Olkanoris", "Duskoris", "Myrthorin",
  "Trelios", "Glintaris", "Invernis", "Brystalis", "Holvendar",
  "Oranthor", "Prismalith", "Rukhsar", "Amarendis", "Folgrad", "Ostarith",
  "Crestalis", "Cëpias",
  // Continent names
  "Cendara", "Sylthara", "Ulinor", "Astravia", "Caeloria", "Vytharia",
  "Baelor", "Kharazir", "Altram", "Iskara", "Mirathi", "Noravia",
  "Solena", "Lumasar", "Avalor", "Gryndor", "Mosrack", "Thalmaris",
]);

function extractCitiesFromFile(filepath, nationName) {
  const content = fs.readFileSync(filepath, "utf8");
  const cities = new Set();
  cities.add(nationName);

  // 1) Bold names: **CityName**
  for (const m of content.matchAll(/\*\*([A-ZÀ-Ÿ][a-zà-ÿ\-'][\w\-\s']{1,40})\*\*/g)) {
    const name = m[1].trim();
    if (name.length >= 3 && !name.includes(" - ") && !name.includes(":") && !name.match(/^\d/)) {
      cities.add(name);
    }
  }

  // 2) Headers # ## ### with city-like names — accept "### Name — Capitale" or just "### Name"
  for (const m of content.matchAll(/^#{2,4}\s+([A-ZÀ-Ÿ][a-zà-ÿ\-'][\w\-']{1,30})(?:\s|—|–|-|$)/gm)) {
    const name = m[1].trim();
    if (name.length >= 3) cities.add(name);
  }

  // 3) Table cells: |  CityName  | -- single capitalized word at start of cell
  for (const m of content.matchAll(/\|\s*([A-ZÀ-Ÿ][a-zà-ÿ\-'][\w\-']{2,30})\s*\|/g)) {
    const name = m[1].trim();
    if (name.length >= 3 && !name.match(/^\d/) && !["Capitale","Région","Nation","Pays","Cité","Ville","Village","Territoire","Type","Description","Population"].includes(name)) {
      cities.add(name);
    }
  }

  // 4) Bullet "**CityName** —"
  for (const m of content.matchAll(/[-*]\s+\*\*([A-ZÀ-Ÿ][\w\-']{2,30})\*\*\s*[—:–]/g)) {
    cities.add(m[1].trim());
  }

  return cities;
}

const cityToNation = {};

const continents = fs.readdirSync(PAYS_DIR).filter(d => fs.statSync(path.join(PAYS_DIR, d)).isDirectory());
for (const cont of continents) {
  const dir = path.join(PAYS_DIR, cont);
  for (const f of fs.readdirSync(dir)) {
    if (!f.endsWith(".md")) continue;
    const nationName = f.replace(/\.md$/, "");
    if (nationName === cont || nationName.startsWith(cont + " ")) continue;
    const filepath = path.join(dir, f);
    const cities = extractCitiesFromFile(filepath, nationName);
    for (const c of cities) {
      if (!cityToNation[c]) cityToNation[c] = [];
      if (!cityToNation[c].includes(nationName)) cityToNation[c].push(nationName);
    }
  }
}

console.log("Cities mapped:", Object.keys(cityToNation).length);

// Read site DB
const data = JSON.parse(fs.readFileSync("local-db.json", "utf8"));
console.log("Site entries:", data.length);

const kept = [];
const dropped = [];

for (const e of data) {
  // Continents always kept
  if (e.storage === "continentsElements") { kept.push(e); continue; }
  // Pays: keep only if in KEEP_NATIONS
  if (e.storage === "paysElements") {
    if (KEEP_NATIONS.has(e.name)) kept.push(e);
    else dropped.push(e);
    continue;
  }
  // PROTECTED names always kept
  if (PROTECTED_NAMES.has(e.name)) { kept.push(e); continue; }

  // Capitales: try lookup, also check if name itself matches any nation
  const nations = cityToNation[e.name] || [];
  // Special: also check if entry name IS a nation in KEEP_NATIONS
  if (KEEP_NATIONS.has(e.name)) { kept.push(e); continue; }

  if (nations.length === 0) {
    dropped.push(e);
    continue;
  }

  const isKept = nations.some(n => KEEP_NATIONS.has(n));
  if (isKept) kept.push(e);
  else dropped.push(e);
}

console.log("\n=== Result ===");
console.log("KEPT:", kept.length);
console.log("DROPPED:", dropped.length);
console.log("Reduction %:", ((dropped.length/data.length)*100).toFixed(1) + "%");

function countByStorage(arr) {
  const c = {};
  for (const e of arr) c[e.storage] = (c[e.storage]||0)+1;
  return c;
}
console.log("\nKEPT by storage:", JSON.stringify(countByStorage(kept), null, 2));

// Save outputs
fs.writeFileSync("local-db.json", JSON.stringify(kept, null, 2));
console.log("\n✓ local-db.json updated:", kept.length, "entries");

// Generate Turso DELETE SQL
const deleteSql = "-- Generated " + new Date().toISOString() + "\n-- " + dropped.length + " entries to remove\n\n" +
  dropped.map(e => `DELETE FROM coordinate_overrides WHERE name = '${e.name.replace(/'/g, "''")}' AND storage = '${e.storage}';`).join("\n");
fs.writeFileSync("turso-delete.sql", deleteSql);
console.log("✓ turso-delete.sql:", dropped.length, "DELETE statements");

// Inspect kept by checking each kept nation has its capital
const capsKept = kept.filter(e=>e.storage==="capitalesElements").map(e=>e.name);
const paysKept = kept.filter(e=>e.storage==="paysElements").map(e=>e.name);
console.log("\nKept capitales:", capsKept.join(", "));
console.log("Kept pays:", paysKept.join(", "));

// For each kept nation, count entries
console.log("\n=== Entries per kept nation (incomplete - by name match heuristic) ===");
const expectedNations = ["Cendara","Sylthara","Ulinor","Astravia","Caeloria","Vytharia","Baelor","Kharazir","Altram","Iskara","Mirathi","Noravia","Solena","Lumasar","Avalor","Gryndor","Mosrack","Thalmaris"];
for (const n of expectedNations) {
  const count = kept.filter(e => {
    const nations = cityToNation[e.name] || [];
    return nations.includes(n) || e.name === n;
  }).length;
  console.log(n + ":", count, "entries");
}
