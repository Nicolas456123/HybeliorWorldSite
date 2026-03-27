/**
 * Coastline tracer v4 - MAX PRECISION
 * Level 14 (12500×12500), island detection, multi-polygon output.
 */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const TILES_DIR = path.join(__dirname, 'HybeliorFull', 'HybeliorMap_files');
const LEVEL = 14;
const TILE_SIZE = 254;
const MAX_LEVEL = 17;
const IMG_SIZE = Math.ceil(100000 / Math.pow(2, MAX_LEVEL - LEVEL)); // 12500

const CONTINENTS = [
  { name: 'Cestra',   color: '#8B5CF6', cx: 0.087, cy: 0.090, searchR: 1500 },
  { name: 'Celethor', color: '#34D399', cx: 0.420, cy: 0.189, searchR: 600 },
  { name: 'Nysaria',  color: '#60A5FA', cx: 0.718, cy: 0.143, searchR: 400 },
  { name: 'Galenor',  color: '#F59E0B', cx: 0.247, cy: 0.382, searchR: 200 },
  { name: 'Alkaran',  color: '#EF4444', cx: 0.668, cy: 0.332, searchR: 200 },
  { name: 'Evertia',  color: '#A78BFA', cx: 0.096, cy: 0.670, searchR: 300 },
  { name: 'Iltahra',  color: '#FB923C', cx: 0.292, cy: 0.656, searchR: 200 },
  { name: 'Ulinor',   color: '#2DD4BF', cx: 0.511, cy: 0.630, searchR: 600 },
  { name: 'Endora',   color: '#F472B6', cx: 0.697, cy: 0.571, searchR: 200 },
  { name: 'Onara',    color: '#4ADE80', cx: 0.881, cy: 0.601, searchR: 200 },
  { name: 'Baelor',   color: '#FBBF24', cx: 0.530, cy: 0.720, searchR: 1000 },
  { name: 'Cendara',  color: '#38BDF8', cx: 0.155, cy: 0.770, searchR: 2000 },
  { name: 'Azoria',   color: '#C084FC', cx: 0.717, cy: 0.874, searchR: 200 },
];

// Mask cuts to separate connected continents (wider cuts to ensure clean separation)
const CUTS = [
  { x: 0.798, y1: 0.46, y2: 0.62, w: 20 }, // Endora / Onara — wider cut through the strait
];

// Max distance (in pixels) for an island to be "claimed" by a continent
const ISLAND_CLAIM_RADIUS = 500; // ~4% of map
const MIN_ISLAND_SIZE = 20; // minimum pixels for an island

async function buildLandMask() {
  const W = IMG_SIZE, H = IMG_SIZE;
  const mask = new Uint8Array(W * H);
  const tilesPerSide = Math.ceil(W / TILE_SIZE);
  console.log(`Image: ${W}x${H}, tiles: ${tilesPerSide}x${tilesPerSide}`);

  let loaded = 0;
  for (let col = 0; col < tilesPerSide; col++) {
    for (let row = 0; row < tilesPerSide; row++) {
      const p = path.join(TILES_DIR, String(LEVEL), `${col}_${row}.jpeg`);
      if (!fs.existsSync(p)) continue;
      const { data, info } = await sharp(p).raw().toBuffer({ resolveWithObject: true });
      const tw = info.width, th = info.height;
      for (let ty = 0; ty < th; ty++) {
        const gy = row * TILE_SIZE + ty;
        if (gy >= H) break;
        for (let tx = 0; tx < tw; tx++) {
          const gx = col * TILE_SIZE + tx;
          if (gx >= W) break;
          const pi = (ty * tw + tx) * 3;
          const r = data[pi], b = data[pi + 2];
          // Threshold r>=45 places border at visible shoreline (mid-transition)
          // Also detect dark tile artifacts (low r + high b) as ocean
          mask[gy * W + gx] = (r < 45 && b > 100) ? 0 : 1;
        }
      }
      loaded++;
    }
    if (col % 10 === 0) process.stdout.write(`  tiles: col ${col}/${tilesPerSide}\r`);
  }
  console.log(`  Loaded ${loaded} tiles`);

  // Apply cuts
  for (const cut of CUTS) {
    const cx = Math.round(cut.x * W);
    const y1 = Math.round(cut.y1 * H), y2 = Math.round(cut.y2 * H);
    for (let y = y1; y <= y2; y++)
      for (let dx = -cut.w; dx <= cut.w; dx++) {
        const x = cx + dx;
        if (x >= 0 && x < W) mask[y * W + x] = 0;
      }
  }

  let land = 0;
  for (let i = 0; i < W * H; i++) if (mask[i]) land++;
  console.log(`Land: ${(land * 100 / (W * H)).toFixed(1)}%`);
  return mask;
}

function labelRegions(mask, W, H) {
  const labels = new Int32Array(W * H);
  const regionMeta = {}; // label -> { size, minX, minY, maxX, maxY, centroidX, centroidY }
  let nextLabel = 1;

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const idx = y * W + x;
      if (mask[idx] !== 1 || labels[idx] !== 0) continue;
      const label = nextLabel++;
      const queue = [idx];
      labels[idx] = label;
      let head = 0, size = 0, sumX = 0, sumY = 0;
      let mnX = x, mxX = x, mnY = y, mxY = y;

      while (head < queue.length) {
        const ci = queue[head++];
        const cx = ci % W, cy = (ci - cx) / W;
        size++; sumX += cx; sumY += cy;
        if (cx < mnX) mnX = cx; if (cx > mxX) mxX = cx;
        if (cy < mnY) mnY = cy; if (cy > mxY) mxY = cy;
        const nb = [cy > 0 ? ci - W : -1, cy < H - 1 ? ci + W : -1, cx > 0 ? ci - 1 : -1, cx < W - 1 ? ci + 1 : -1];
        for (const ni of nb) {
          if (ni >= 0 && mask[ni] === 1 && labels[ni] === 0) { labels[ni] = label; queue.push(ni); }
        }
      }
      regionMeta[label] = { size, centroidX: sumX / size, centroidY: sumY / size, minX: mnX, minY: mnY, maxX: mxX, maxY: mxY };
    }
    if (y % 2000 === 0) process.stdout.write(`  labeling: row ${y}/${H}\r`);
  }

  const sorted = Object.entries(regionMeta).sort((a, b) => b[1].size - a[1].size);
  console.log(`Regions: ${sorted.length}`);
  console.log('Top 15:', sorted.slice(0, 15).map(([l, m]) => `#${l}:${m.size}`).join(', '));
  return { labels, regionMeta };
}

function findMainRegion(labels, regionMeta, W, H, svgX, svgY, searchR, claimed) {
  const px = Math.round(svgX * W), py = Math.round(svgY * H);
  // Search for nearest unclaimed region with size >= 100 pixels
  for (let r = 0; r < searchR; r++) {
    for (let dx = -r; dx <= r; dx++) {
      for (let dy = -r; dy <= r; dy++) {
        if (r > 0 && Math.abs(dx) < r && Math.abs(dy) < r) continue;
        const nx = px + dx, ny = py + dy;
        if (nx >= 0 && nx < W && ny >= 0 && ny < H) {
          const lbl = labels[ny * W + nx];
          if (lbl > 0 && regionMeta[lbl] && regionMeta[lbl].size >= 100 && (!claimed || !claimed.has(lbl))) return lbl;
        }
      }
    }
  }
  return 0;
}

function findNearbyIslands(regionMeta, mainLabel, mainMeta, allLabels, W, H) {
  // Find small regions whose centroid is within ISLAND_CLAIM_RADIUS of the main region's bounding box
  const islands = [];
  const pad = ISLAND_CLAIM_RADIUS;
  for (const [lbl, meta] of Object.entries(regionMeta)) {
    const l = parseInt(lbl);
    if (l === mainLabel || meta.size < MIN_ISLAND_SIZE) continue;
    // Check if island centroid is near main region bbox
    const nearX = meta.centroidX >= mainMeta.minX - pad && meta.centroidX <= mainMeta.maxX + pad;
    const nearY = meta.centroidY >= mainMeta.minY - pad && meta.centroidY <= mainMeta.maxY + pad;
    if (nearX && nearY && meta.size < mainMeta.size * 0.3) {
      islands.push({ label: l, ...meta });
    }
  }
  // Sort by size descending
  islands.sort((a, b) => b.size - a.size);
  return islands;
}

function traceBoundary(labels, label, W, H) {
  // Find start pixel
  let sx = -1, sy = -1;
  for (let y = 0; y < H && sy < 0; y++)
    for (let x = 0; x < W; x++)
      if (labels[y * W + x] === label) { sx = x; sy = y; break; }
  if (sx < 0) return [];

  const dx = [1, 1, 0, -1, -1, -1, 0, 1];
  const dy = [0, 1, 1, 1, 0, -1, -1, -1];
  const isR = (x, y) => x >= 0 && x < W && y >= 0 && y < H && labels[y * W + x] === label;

  const boundary = [];
  let cx = sx, cy = sy, dir = 7;
  for (let step = 0; step < W * H * 2; step++) {
    boundary.push([cx, cy]);
    const sd = (dir + 6) % 8;
    let found = false;
    for (let i = 0; i < 8; i++) {
      const d = (sd + i) % 8;
      const nx = cx + dx[d], ny = cy + dy[d];
      if (isR(nx, ny)) { dir = d; cx = nx; cy = ny; found = true; break; }
    }
    if (!found || (cx === sx && cy === sy && boundary.length > 1)) break;
  }
  return boundary;
}

function douglasPeucker(pts, tol) {
  // Iterative version to avoid stack overflow on large arrays
  if (pts.length <= 2) return pts;
  const keep = new Uint8Array(pts.length);
  keep[0] = 1;
  keep[pts.length - 1] = 1;
  const stack = [[0, pts.length - 1]];

  while (stack.length > 0) {
    const [start, end] = stack.pop();
    if (end - start < 2) continue;
    const [ax, ay] = pts[start], [bx, by] = pts[end];
    const len = Math.sqrt((bx - ax) ** 2 + (by - ay) ** 2) || 1;
    let maxD = 0, maxI = start;
    for (let i = start + 1; i < end; i++) {
      const d = Math.abs((by - ay) * pts[i][0] - (bx - ax) * pts[i][1] + bx * ay - by * ax) / len;
      if (d > maxD) { maxD = d; maxI = i; }
    }
    if (maxD > tol) {
      keep[maxI] = 1;
      stack.push([start, maxI], [maxI, end]);
    }
  }

  const result = [];
  for (let i = 0; i < pts.length; i++) if (keep[i]) result.push(pts[i]);
  return result;
}

function simplifyBoundary(boundary, W, H, targetMin, targetMax) {
  // Minimal subsampling - keep as many raw boundary points as possible
  const step = Math.max(1, Math.floor(boundary.length / 30000));
  let pts = [];
  for (let i = 0; i < boundary.length; i += step) pts.push(boundary[i]);

  // Douglas-Peucker with adaptive tolerance
  let tol = 0.8;
  let s = douglasPeucker(pts, tol);
  while (s.length > targetMax && tol < 100) { tol *= 1.15; s = douglasPeucker(pts, tol); }
  while (s.length < targetMin && tol > 0.05) { tol *= 0.7; s = douglasPeucker(pts, tol); }

  return s.map(([x, y]) => ({
    x: Math.round(x / W * 100000) / 100000,
    y: Math.round(y / H * 100000) / 100000
  }));
}

async function main() {
  console.log('=== Coastline Tracer v4 - MAX PRECISION ===\n');

  console.log('1. Building land mask...');
  const W = IMG_SIZE, H = IMG_SIZE;
  const mask = await buildLandMask();

  console.log('\n2. Labeling regions...');
  const { labels, regionMeta } = labelRegions(mask, W, H);

  // Track which regions are already claimed
  const claimed = new Set();

  console.log('\n3. Tracing continents...\n');
  const borders = [];

  for (const cont of CONTINENTS) {
    const mainLabel = findMainRegion(labels, regionMeta, W, H, cont.cx, cont.cy, cont.searchR, claimed);
    const mainMeta = mainLabel ? regionMeta[mainLabel] : null;
    console.log(`${cont.name}: main=#${mainLabel} (${mainMeta ? mainMeta.size + 'px' : 'NOT FOUND'})`);

    if (!mainLabel || !mainMeta || mainMeta.size < 10) {
      borders.push({ name: cont.name, entity_type: 'continentsElements', era_id: 'actuelle',
        points: [], paths: [], color: cont.color, parent_name: null });
      continue;
    }
    claimed.add(mainLabel);

    // Trace main landmass
    const mainBound = traceBoundary(labels, mainLabel, W, H);
    // High point count for smooth coastlines even at max zoom
    const targetMax = mainMeta.size > 1000000 ? 8000 : (mainMeta.size > 100000 ? 4000 : 1500);
    const targetMin = Math.round(targetMax * 0.7);
    const mainSimp = simplifyBoundary(mainBound, W, H, targetMin, targetMax);
    console.log(`  Main: ${mainBound.length} raw → ${mainSimp.length} simplified (target ${targetMin}-${targetMax})`);

    // Find and trace nearby islands
    const islands = findNearbyIslands(regionMeta, mainLabel, mainMeta, labels, W, H);
    const islandPaths = [];
    let islandCount = 0;
    for (const isl of islands) {
      if (claimed.has(isl.label)) continue; // already belongs to another continent
      claimed.add(isl.label);
      const iBound = traceBoundary(labels, isl.label, W, H);
      if (iBound.length < 6) continue;
      const iTargetMax = isl.size > 10000 ? 500 : (isl.size > 1000 ? 200 : 60);
      const iSimp = simplifyBoundary(iBound, W, H, 6, iTargetMax);
      if (iSimp.length >= 4) {
        islandPaths.push(iSimp);
        islandCount++;
      }
    }
    console.log(`  Islands: ${islandCount} detected`);

    // Store as "paths" array: [mainPath, island1, island2, ...]
    const allPaths = [mainSimp, ...islandPaths];

    borders.push({
      name: cont.name,
      entity_type: 'continentsElements',
      era_id: 'actuelle',
      points: mainSimp, // backwards compat: main landmass
      paths: allPaths,  // NEW: all paths including islands
      color: cont.color,
      parent_name: null
    });
  }

  fs.writeFileSync(path.join(__dirname, 'local-borders.json'), JSON.stringify(borders, null, 2));
  console.log('\n=== DONE ===');
  for (const b of borders) {
    const islandCount = (b.paths || []).length - 1;
    console.log(`  ${b.name}: ${b.points.length} pts main${islandCount > 0 ? ` + ${islandCount} islands` : ''}`);
  }
}

main().catch(console.error);
