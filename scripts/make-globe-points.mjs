// Run once from the project root: node scripts/make-globe-points.mjs
// Turns the world-atlas land outline into a list of dot positions on a sphere.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { feature } from "topojson-client";
import { geoContains } from "d3-geo";

const topo = JSON.parse(
  readFileSync("node_modules/world-atlas/land-110m.json", "utf8"),
);
const land = feature(topo, topo.objects.land);

const RADIUS = 2;
const STEP = 3; // degrees between sample points: bigger = fewer dots, faster

const points = [];
for (let lat = -80; lat <= 80; lat += STEP) {
  for (let lon = -180; lon <= 180; lon += STEP) {
    if (!geoContains(land, [lon, lat])) continue;
    const phi = ((90 - lat) * Math.PI) / 180;
    const theta = ((lon + 180) * Math.PI) / 180;
    points.push(
      +(-RADIUS * Math.sin(phi) * Math.cos(theta)).toFixed(3),
      +(RADIUS * Math.cos(phi)).toFixed(3),
      +(RADIUS * Math.sin(phi) * Math.sin(theta)).toFixed(3),
    );
  }
}

mkdirSync("app/data", { recursive: true });
writeFileSync("app/data/globe-points.json", JSON.stringify(points));
console.log(`Wrote ${points.length / 3} points to app/data/globe-points.json`);

