// Foróptero manual tipo Topcon VT-10 (335 × 97 × 294 mm), en despiece animado.
// Uso: node foroptero/vt-build.mjs [--light]
// Unidades del mundo: 1 = 1 mm. x a lo ancho (derecha del examinador +), y hacia el examinador, z arriba.
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import * as k from "../.claude/skills/anatomy/kit/iso-kit.mjs";
import * as G from "../.claude/skills/anatomy/kit/lathe.mjs";
import { kitScript } from "../.claude/skills/anatomy/scripts/inline-kit.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const theme = process.argv.includes("--light") ? "light" : "dark";
const WIDTH = 760;
const HEIGHT = 640;

const FRONT = 62; // cara delantera de las carcasas
const PD = 64;
const AP_Z = 176; // altura de las aperturas

// Despiece: vector de cada conjunto (mm) y orden de salida
const ASSEMBLIES = [
  { id: "head", name: "cabezal de montaje", v: [0, 0, 70] },
  { id: "column", name: "columna", v: [0, 0, 42] },
  { id: "pdL", name: "mando DP izquierdo", v: [-46, 0, 0] },
  { id: "pdR", name: "mando DP derecho", v: [46, 0, 0] },
  { id: "rest", name: "apoyo frontal", v: [0, 100, 0] },
  { id: "cylL", name: "mando de cilindro y eje", v: [0, 124, 0], parent: "bodyL" },
  { id: "cylR", name: "mando de cilindro y eje", v: [0, 124, 0], parent: "bodyR" },
  { id: "sphL", name: "dial de esferas", v: [0, 104, 0], parent: "bodyL" },
  { id: "sphR", name: "dial de esferas", v: [0, 104, 0], parent: "bodyR" },
  { id: "loupeL", name: "lupas de cilindro cruzado y prisma", v: [0, 80, 0], parent: "bodyL" },
  { id: "loupeR", name: "lupas de cilindro cruzado y prisma", v: [0, 80, 0], parent: "bodyR" },
  { id: "apL", name: "apertura y lente", v: [0, 64, 0], parent: "bodyL" },
  { id: "apR", name: "apertura y lente", v: [0, 64, 0], parent: "bodyR" },
  { id: "auxL", name: "disco auxiliar", v: [0, 50, 0], parent: "bodyL" },
  { id: "auxR", name: "disco auxiliar", v: [0, 50, 0], parent: "bodyR" },
  { id: "rearL", name: "tapa trasera", v: [0, -54, 0], parent: "bodyL" },
  { id: "rearR", name: "tapa trasera", v: [0, -54, 0], parent: "bodyR" },
  { id: "bodyL", name: "batería de lentes OD", v: [-58, 0, -14] },
  { id: "bodyR", name: "batería de lentes OI", v: [58, 0, -14] },
];
const byId = Object.fromEntries(ASSEMBLIES.map((a) => [a.id, a]));
const totalOf = (id) => {
  const a = byId[id];
  const p = a.parent ? totalOf(a.parent) : [0, 0, 0];
  return [a.v[0] + p[0], a.v[1] + p[1], a.v[2] + p[2]];
};

const P = k.fitProjection(
  [
    [-170, -12, 0], [170, -12, 0], [-170, 98, 0], [170, 98, 0], [-60, 30, 380], [70, 30, 380],
    [-170 - 58, -66, -14], [170 + 58, 150, -14], [-150 - 46, 30, 265], [0, 30, 450], [0, 190, 120], [64 + 58, 230, 0], [-64 - 58, 230, 16],
  ],
  WIDTH,
  HEIGHT,
  { pad: 22, azimuth: 66, elevation: 24 },
);

const S = (paths, style) => k.solidSvg(paths, style);
const L = (d, style) => k.lineSvg(d, style);
const D = (points, style) => k.dotsSvg(points, style);
const fadedRibs = (list) => k.fadedSvg(list, { tone: "lo" });
const FY = (x, z) => G.frameOf([x, 0, z], [0, 1, 0], [1, 0, 0], [0, 0, 1]);
const FX = (x, y, z, sign) => G.frameOf([x, y, z], [sign, 0, 0], [0, 1, 0], [0, 0, 1]);
const FZ = (x, y, z) => G.frameOf([x, y, z], [0, 0, 1], [1, 0, 0], [0, 1, 0]);
const at = (p) => k.iso(p, P);

function hull2(points) {
  const pts = [...points].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const cross = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const lower = [], upper = [];
  for (const p of pts) { while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0) lower.pop(); lower.push(p); }
  for (const p of pts.slice().reverse()) { while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0) upper.pop(); upper.push(p); }
  return [...lower.slice(0, -1), ...upper.slice(0, -1)];
}
const circlePts = (cx, cz, r, n = 48) => Array.from({ length: n }, (_, i) => [cx + r * Math.cos((i / n) * 2 * Math.PI), cz + r * Math.sin((i / n) * 2 * Math.PI)]);
// Silueta de riñón de cada carcasa: lóbulo exterior (dial de esferas), lóbulo de la apertura y lóbulo bajo (cilindro)
const lobes = (s, grow = 0) => [
  [s * 100, 172, 66 + grow],
  [s * PD / 2, AP_Z, 23 + grow],
  [s * 64, 56, 50 + grow],
];
const outlineOf = (s, grow = 0) => hull2(lobes(s, grow).flatMap(([x, z, r]) => circlePts(x, z, r)));
const faceLine = (poly, y) => "M" + poly.map(([x, z]) => at([x, y, z]).map((v) => v.toFixed(1)).join(" ")).join("L") + "Z";

// Costura visible alrededor del canto de una carcasa a la profundidad y
function sideSeamOf(poly, y) {
  const V = G.viewOf(P);
  const n = poly.length;
  const seen = poly.map((a, i) => {
    const b = poly[(i + 1) % n];
    const nx = b[1] - a[1], nz = -(b[0] - a[0]);
    const len = Math.hypot(nx, nz) || 1;
    return (nx * V[0] + nz * V[2]) / len;
  });
  // orientación: si la normal calculada apunta hacia dentro, invertir
  const cx = poly.reduce((t, p) => t + p[0], 0) / n, cz = poly.reduce((t, p) => t + p[1], 0) / n;
  const a0 = poly[0], b0 = poly[1];
  const flip = ((b0[1] - a0[1]) * (a0[0] - cx) - (b0[0] - a0[0]) * (a0[1] - cz)) < 0 ? -1 : 1;
  let d = "", open = false;
  for (let i = 0; i < n; i++) {
    const vis = seen[i] * flip > 0.02;
    const a = at([poly[i][0], y, poly[i][1]]), b = at([poly[(i + 1) % n][0], y, poly[(i + 1) % n][1]]);
    if (vis) { d += (open ? "" : "M" + a[0].toFixed(1) + " " + a[1].toFixed(1)) + "L" + b[0].toFixed(1) + " " + b[1].toFixed(1); open = true; } else open = false;
  }
  return d;
}

// ---------- piezas ----------
function knurledKnob(F, s0, s1, r, ribs, { cap = true, tone = "mid" } = {}) {
  const out = [S(G.disc(s0, s1, r, F, P), { tone })];
  out.push(fadedRibs(G.ribsOf(F, s0 + 0.8, s1 - 0.8, r, ribs, P, { fade: [0.04, 0.42], seams: true })));
  if (cap) {
    out.push(S(G.disc(s1, s1 + 2.4, r * 0.82, F, P, { bevel: 0.6 }), { tone: "hi" }));
    out.push(L(G.circleOf(F, s1 + 2.4, r * 0.5, P), { tone: "faint" }));
  }
  return out.join("");
}

function scaleRing(F, s0, s1, rIn, rOut, ticks, majors, labels = []) {
  const out = [S(G.ringBand(s0, s1, rIn, rOut, F, P), { tone: "hi" })];
  out.push(L(G.circleOf(F, s1, rOut - 2.2, P), { tone: "faint" }));
  out.push(L(G.spokesOf(F, s1, rOut - 2.2, rOut - 5, ticks, P), { tone: "lo" }));
  out.push(L(G.spokesOf(F, s1, rOut - 2.2, rOut - 7.5, majors, P), { tone: "mid" }));
  for (const [angle, text] of labels) {
    const p = G.pointOf(F, s1, rOut - 12, angle);
    out.push(k.faceTextSvg(k.sideMatrix([p[0], p[1]], p[2] - 2, P, "left"), text, { size: 5, tone: "lo", anchor: "middle" }));
  }
  return out.join("");
}

function windowOn(x, z, w, h, text) {
  const F = FY(x, z);
  const out = [S(G.prismOf(F, [[-w / 2, -h / 2], [w / 2, -h / 2], [w / 2, h / 2], [-w / 2, h / 2]], FRONT, FRONT + 1.2, P), { tone: "lo" })];
  out.push(k.faceTextSvg(k.sideMatrix([x, FRONT + 1.2], z - h / 2 + 2.4, P, "left"), text, { size: Math.min(6, h - 2), tone: "hi", anchor: "middle" }));
  return out.join("");
}

// ---------- carcasa (batería de lentes) ----------
function rear(s) {
  const F = FY(0, 0);
  const poly = outlineOf(s, -3);
  return S(G.prismOf(F, poly, -10, 0, P), { tone: "lo" }) + D(lobes(s, -9).map(([x, z]) => at([x, -10, z])), { size: 0.5 });
}

function body(s) {
  const F = FY(0, 0);
  const poly = outlineOf(s);
  const out = [S(G.prismOf(F, poly, 0, FRONT, P), { tone: "mid" })];
  out.push(L(faceLine(outlineOf(s, -5), FRONT), { tone: "faint" }));
  out.push(L(sideSeamOf(poly, 34), { tone: "lo" }));
  out.push(L(sideSeamOf(poly, 6), { tone: "faint" }));
  // tornillos de la tapa delantera
  const screws = [[s * 150, 140], [s * 116, 230], [s * 30, 30], [s * 104, 22], [s * 12, 120]];
  out.push(L(screws.map(([x, z]) => G.circleOf(FY(x, z), FRONT, 2.6, P)).join(""), { tone: "lo" }));
  out.push(D(screws.map(([x, z]) => at([x, FRONT, z])), { size: 0.55 }));
  // ventanas de lectura: esfera y cilindro
  out.push(windowOn(s * 112, 112, 26, 10, s < 0 ? "−2.25" : "−1.75"));
  out.push(windowOn(s * 98, 98, 22, 8, "−0.50"));
  // palanca de convergencia arriba
  const top = [s * 120, 30];
  out.push(S(k.cylinder(top[0], top[1], 4.5, 228, 6, P, 24), { tone: "mid" }));
  out.push(S(k.cylinder(top[0], top[1], 2.4, 234, 22, P, 16), { tone: "mid", crease: "none" }));
  out.push(S(G.sphereOf([top[0], top[1], 259], 4.6, P), { tone: "hi" }));
  return out.join("");
}

function sphereDial(s) {
  const F = FY(s * 104, 174);
  const labels = [[Math.PI / 2, "0"], [Math.PI / 2 - 1.1, "3"], [Math.PI / 2 + 1.1, "6"], [Math.PI / 2 + 2.2, "9"], [Math.PI / 2 - 2.2, "12"]];
  return [
    scaleRing(F, FRONT, FRONT + 4, 0, 42, 60, 12, labels),
    S(G.disc(FRONT + 4, FRONT + 8, 26, F, P), { tone: "mid" }),
    knurledKnob(F, FRONT + 8, FRONT + 30, 22, 56),
    L(G.spokesOf(F, FRONT + 4, 26, 31, 1, P, { phase: Math.PI / 2 }), { tone: "mid" }),
  ].join("");
}

function cylinderKnob(s) {
  const F = FY(s * 64, 52);
  const labels = [[Math.PI, "0"], [Math.PI / 2, "90"], [0, "180"]];
  return [
    scaleRing(F, FRONT, FRONT + 4, 0, 36, 72, 12, labels),
    S(G.ringBand(FRONT + 4, FRONT + 7, 18, 24, F, P), { tone: "hi" }),
    L(G.spokesOf(F, FRONT + 7, 21, 24, 36, P), { tone: "lo" }),
    knurledKnob(F, FRONT + 7, FRONT + 20, 18, 48, { cap: false }),
    knurledKnob(F, FRONT + 20, FRONT + 36, 11.5, 32),
  ].join("");
}

function aperture(s) {
  const F = FY(s * PD / 2, AP_Z);
  return [
    S(G.ringBand(FRONT, FRONT + 9, 13, 21, F, P), { tone: "hi" }),
    L(G.spokesOf(F, FRONT + 9, 17.5, 20.2, 36, P), { tone: "lo" }),
    L(G.circleOf(F, FRONT + 9, 17.5, P), { tone: "faint" }),
    S(G.ringBand(FRONT + 2, FRONT + 10.5, 10, 13, F, P), { tone: "lo" }),
    S(G.disc(FRONT + 4, FRONT + 6, 10, F, P), { tone: "hi", lit: true }),
    L(G.arcOf(F, FRONT + 6, 7, P, { least: -1 }), { tone: "faint" }),
  ].join("");
}

function loupes(s) {
  // torreta con dos lupas: cilindro cruzado de Jackson y prisma rotatorio
  const out = [];
  const jcc = FY(s * 22, 130);
  out.push(S(G.ringBand(FRONT, FRONT + 8, 10, 17, jcc, P), { tone: "hi" }));
  out.push(L(G.spokesOf(jcc, FRONT + 8, 14, 16.4, 24, P), { tone: "lo" }));
  out.push(S(G.disc(FRONT + 2, FRONT + 5, 10, jcc, P), { tone: "lo" }));
  out.push(L(G.spokesOf(jcc, FRONT + 5, 2, 10, 2, P, { phase: Math.PI / 4 }), { tone: "red" }));
  out.push(L(G.spokesOf(jcc, FRONT + 5, 2, 10, 2, P, { phase: -Math.PI / 4 }), { tone: "blue" }));
  out.push(L(G.circleOf(jcc, FRONT + 5, 2, P), { tone: "faint" }));
  const prism = FY(s * 52, 120);
  out.push(S(G.ringBand(FRONT, FRONT + 6, 9, 15, prism, P), { tone: "hi" }));
  out.push(L(G.spokesOf(prism, FRONT + 6, 12, 14.4, 40, P, { from: 0, to: Math.PI }), { tone: "lo" }));
  out.push(L(G.arcOf(prism, FRONT + 6, 12, P, { least: -1, from: 0, to: Math.PI }), { tone: "lo" }));
  out.push(S(G.disc(FRONT + 1, FRONT + 4, 9, prism, P), { tone: "lo" }));
  out.push(S(G.disc(FRONT + 6, FRONT + 12, 4, FY(s * 66, 110), P), { tone: "mid" }));
  out.push(knurledKnob(FY(s * 66, 110), FRONT + 6, FRONT + 12, 4.2, 14, { cap: false }));
  return out.join("");
}

function auxKnob(s) {
  const F = FY(s * 60, 214);
  return [
    S(G.disc(FRONT, FRONT + 3, 13, F, P), { tone: "hi" }),
    L(G.spokesOf(F, FRONT + 3, 10, 12.6, 12, P), { tone: "lo" }),
    knurledKnob(F, FRONT + 3, FRONT + 14, 8.5, 28),
  ].join("");
}

// ---------- puente, columna, cabezal ----------
function bridge() {
  const out = [S(k.slabOf({ x: -5, y: 18, w: 10, d: 12, r: 2 }, 204, 48, P, 2, 0.4), { tone: "mid" })];
  for (const s of [-1, 1]) out.push(S(k.slabOf({ x: s * 52 - 13, y: 16, w: 26, d: 30, r: 3 }, 208, 46, P, 3, 0.5), { tone: "mid" }));
  const plan = { x: -104, y: 8, w: 208, d: 46, r: 8 };
  out.push(S(k.slabOf(plan, 250, 32, P, 8, 1.2), { tone: "mid", inner: L(k.sideSeam(plan, 256, P, 8), { tone: "faint" }) }));
  // escala de distancia pupilar en el frente del puente
  const win = G.prismOf(FY(0, 266), [[-34, -7], [34, -7], [34, 7], [-34, 7]], 54, 55.4, P);
  out.push(S(win, { tone: "hi" }));
  const minor = [], major = [];
  for (let mm = 48; mm <= 75; mm++) {
    const x = (mm - 61.5) * 2.2;
    (mm % 5 === 0 ? major : minor).push("M" + at([x, 55.4, 273]).map((v) => v.toFixed(1)).join(" ") + "L" + at([x, 55.4, mm % 5 === 0 ? 266 : 269]).map((v) => v.toFixed(1)).join(" "));
  }
  out.push(L("M" + at([-31, 55.4, 273]).join(" ") + "L" + at([31, 55.4, 273]).join(" "), { tone: "lo" }));
  out.push(L(minor.join(""), { tone: "lo", free: "end" }), L(major.join(""), { tone: "mid", free: "end" }));
  out.push(L("M" + at([(PD - 61.5) * 2.2, 55.4, 274]).join(" ") + "L" + at([(PD - 61.5) * 2.2, 55.4, 262]).join(" "), { tone: "red", free: "end" }));
  out.push(k.faceTextSvg(k.sideMatrix([0, 55.4], 260.5, P, "left"), "P.D. 64", { size: 4.2, tone: "lo", anchor: "middle" }));
  out.push(D([[-92, 274], [92, 274], [-92, 258], [92, 258]].map(([x, z]) => at([x, 54, z])), { size: 0.5 }));
  // nivel de burbuja encima
  const vial = { x: 40, y: 22, w: 34, d: 12, r: 6 };
  out.push(S(k.slabOf(vial, 282, 4, P, 6, 0.4), { tone: "hi" }));
  out.push(L(k.lineOnTop([vial.x + 15, vial.y], [vial.x + 15, vial.y + vial.d], 286, P) + k.lineOnTop([vial.x + 19, vial.y], [vial.x + 19, vial.y + vial.d], 286, P), { tone: "lo" }));
  out.push(D([at([vial.x + 17, vial.y + 6, 286])], { size: 1.2, tone: "hi" }));
  return out.join("");
}

function pdKnob(s) {
  const F = FX(s * 104, 30, 266, s);
  return [S(G.disc(0, 5, 15, F, P), { tone: "mid" }), knurledKnob(F, 5, 24, 13, 40)].join("");
}

function column() {
  const plan = { x: -17, y: 13, w: 34, d: 34, r: 5 };
  const out = [S(k.slabOf(plan, 282, 54, P, 5, 0.8), { tone: "mid" })];
  out.push(S(G.prismOf(FY(0, 312), [[-13, -6], [13, -6], [13, 6], [-13, 6]], 47, 48, P), { tone: "lo" }));
  out.push(L("M" + at([-8, 48, 312]).map((v) => v.toFixed(1)).join(" ") + "L" + at([8, 48, 312]).map((v) => v.toFixed(1)).join(" "), { tone: "faint", free: true }));
  out.push(D([at([-11, 48, 312]), at([11, 48, 312])], { size: 0.45, tone: "hi" }));
  return out.join("");
}

function head() {
  const plan = { x: -34, y: 6, w: 104, d: 48, r: 8 };
  const out = [`<path class="iso-halo" d="${k.haloOf(plan, 336, 0.1, P)}" style="filter:blur(4px)"/>`];
  out.push(S(k.slabOf(plan, 336, 30, P, 8, 1.2), { tone: "mid", inner: L(k.sideSeam(plan, 342, P, 8), { tone: "faint" }) }));
  for (const x of [-16, 46]) {
    out.push(S(k.cylinder(x, 30, 13, 366, 4, P, 40), { tone: "mid" }));
    out.push(S(k.cylinder(x, 30, 11, 370, 14, P, 40, 0.6), { tone: "hi" }));
    out.push(L(k.knurl(x, 30, 11, 370, 384, 44, P), { tone: "lo" }));
    out.push(L(k.ring(x, 30, 6, 384, P, 28), { tone: "faint" }));
  }
  const F = FX(70, 30, 351, 1);
  out.push(S(G.disc(0, 4, 13, F, P), { tone: "mid" }), knurledKnob(F, 4, 22, 11, 36));
  // placa con rótulo
  out.push(S(G.prismOf(FY(10, 351), [[-30, -7], [30, -7], [30, 7], [-30, 7]], 54, 55, P), { tone: "lo" }));
  out.push(k.faceTextSvg(k.sideMatrix([10, 55], 348.5, P, "left"), "REFRACTOR", { size: 6, tone: "hi", anchor: "middle" }));
  return out.join("");
}

function rest() {
  const F = FY(0, 214);
  return [
    S(G.disc(30, FRONT + 4, 5, F, P), { tone: "mid" }),
    S(G.disc(FRONT + 4, FRONT + 8, 15, F, P), { tone: "mid" }),
    knurledKnob(F, FRONT + 8, FRONT + 26, 11, 36),
  ].join("");
}

// ---------- ensamblaje ----------
const group = (id, inner) => `<g data-a="${id}">${inner}</g>`;
const svg = k.figureSvg({
  width: WIDTH,
  height: HEIGHT,
  label:
    "Foróptero manual de dos baterías de lentes, colgado de un puente con escala de distancia pupilar, una columna y un cabezal de montaje. Cada batería tiene un dial de esferas con escala, un mando concéntrico de cilindro y eje, la apertura con su lente, una torreta con el cilindro cruzado y el prisma rotatorio, un disco auxiliar y una tapa trasera. La figura se desmonta en 19 conjuntos y se vuelve a montar.",
  body: [
    `<path class="iso-halo" d="${k.haloOf({ x: -170, y: -10, w: 340, d: 108, r: 40 }, -6, 0.1, P)}" style="filter:blur(8px);opacity:.3"/>`,
    group("rearL", rear(-1)),
    group("rearR", rear(1)),
    group("column", column()),
    group("head", head()),
    bridge(),
    group("bodyL", body(-1)),
    group("auxL", auxKnob(-1)),
    group("loupeL", loupes(-1)),
    group("apL", aperture(-1)),
    group("cylL", cylinderKnob(-1)),
    group("sphL", sphereDial(-1)),
    group("bodyR", body(1)),
    group("auxR", auxKnob(1)),
    group("loupeR", loupes(1)),
    group("apR", aperture(1)),
    group("cylR", cylinderKnob(1)),
    group("sphR", sphereDial(1)),
    group("pdL", pdKnob(-1)),
    group("pdR", pdKnob(1)),
    group("rest", rest()),
  ],
});

const live = `
const P = ${JSON.stringify(P)};
const ASSEMBLIES = ${JSON.stringify(ASSEMBLIES)};
const TOTAL = ${JSON.stringify(Object.fromEntries(ASSEMBLIES.map((a) => [a.id, totalOf(a.id)])))};
const svg = document.querySelector(".iso-stage svg");
const groups = Object.fromEntries(ASSEMBLIES.map((a) => [a.id, svg.querySelector('[data-a="' + a.id + '"]')]));
const readout = document.querySelector("[data-readout]");
const still = matchMedia("(prefers-reduced-motion: reduce)");
// Orden de despiece: de fuera hacia dentro. El montaje va al revés.
const OUT = ["head", "column", "pdL", "pdR", "rest", "cylL", "cylR", "sphL", "sphR", "loupeL", "loupeR", "apL", "apR", "auxL", "auxR", "rearL", "rearR", "bodyL", "bodyR"];
const MOVE = 1.1, STAGGER = 0.16;
const PHASES = { hold0: 1.4, open: (OUT.length - 1) * STAGGER + MOVE, hold1: 2.6, close: (OUT.length - 1) * STAGGER + MOVE, hold2: 1.6 };
const CYCLE = Object.values(PHASES).reduce((a, b) => a + b, 0);
const ease = (t) => (t <= 0 ? 0 : t >= 1 ? 1 : t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const byId = Object.fromEntries(ASSEMBLIES.map((a) => [a.id, a]));
function shares(t) {
  const share = {};
  let u = t % CYCLE;
  let phase = "montado";
  OUT.forEach((id, i) => {
    let e = 0;
    const open = u - PHASES.hold0 - i * STAGGER;
    const closeStart = PHASES.hold0 + PHASES.open + PHASES.hold1;
    const close = u - closeStart - (OUT.length - 1 - i) * STAGGER;
    if (u < closeStart) e = ease(open / MOVE); else e = 1 - ease(close / MOVE);
    share[id] = e;
  });
  const moving = OUT.filter((id) => share[id] > 0.001 && share[id] < 0.999);
  if (u < PHASES.hold0) phase = "montado · 4,5 kg · 335 × 97 × 294 mm";
  else if (u < PHASES.hold0 + PHASES.open) phase = moving.length ? "desmontando · " + byId[moving[moving.length - 1]].name : "desmontando";
  else if (u < PHASES.hold0 + PHASES.open + PHASES.hold1) phase = "despiece · 19 conjuntos";
  else if (u < CYCLE - PHASES.hold2) phase = moving.length ? "montando · " + byId[moving[0]].name : "montando";
  else phase = "montado · 4,5 kg · 335 × 97 × 294 mm";
  return { share, phase };
}
function offsetOf(id, share) {
  const a = byId[id];
  const own = a.v.map((v) => v * share[id]);
  if (!a.parent) return own;
  const p = offsetOf(a.parent, share);
  return [own[0] + p[0], own[1] + p[1], own[2] + p[2]];
}
function pose(t) {
  const { share, phase } = shares(t);
  for (const id of OUT) groups[id].setAttribute("transform", translateAlong(P, offsetOf(id, share)));
  if (readout.textContent !== phase) readout.textContent = phase;
}
window.__cycle = CYCLE;
window.__pose = pose;
let start = 0, frame = 0, visible = false, paused = false, pausedAt = 0;
function tick(now) {
  if (window.__manual) { frame = 0; return; }
  if (!start) start = now;
  pose((now - start) / 1000);
  frame = visible && !paused ? requestAnimationFrame(tick) : 0;
}
const run = () => { if (!frame && visible && !paused && !still.matches) frame = requestAnimationFrame(tick); };
const stage = document.querySelector(".iso-stage");
new IntersectionObserver((entries) => { visible = entries[entries.length - 1].isIntersecting; if (visible) run(); }, { rootMargin: "120px 0px" }).observe(stage);
stage.addEventListener("click", () => {
  paused = !paused;
  if (paused) { pausedAt = performance.now(); } else { start += performance.now() - pausedAt; run(); }
});
stage.addEventListener("keydown", (event) => { if (event.key === " " || event.key === "Enter") { event.preventDefault(); stage.click(); } });
pose(still.matches ? 0 : 0);
`;

const plate = k.plateHtml({
  fig: "Fig 2",
  title: "Foróptero manual",
  hint: "Toca para pausar",
  readout: "montado · 4,5 kg · 335 × 97 × 294 mm",
  keys: [
    { mark: "lit", label: "Lentes de prueba en las aperturas (DP 64 mm)" },
    { mark: "red", label: "Ejes del cilindro cruzado de Jackson (±0,25 D)" },
    { mark: "raised", label: "Diales con escala: esfera, cilindro y eje, prisma" },
  ],
  caption:
    "Basado en un foróptero manual de consulta (Topcon VT-10): 335 × 97 × 294 mm y 4,5 kg. Cada batería gira discos de lentes: esferas de +16,75 a −19,00 D en pasos de 0,25 D, cilindros de 0 a −6,00 D, eje de 0 a 180° y prisma rotatorio de 20 Δ. El puente ajusta la distancia pupilar de 48 a 75 mm. La animación separa 19 conjuntos de fuera hacia dentro y los vuelve a montar en orden inverso.",
  body: `<div class="iso-stage" tabindex="0" role="group" aria-label="Foróptero en despiece: toca o pulsa espacio para pausar">${svg}</div>`,
});

const name = theme === "light" ? "foroptero-real-light.html" : "foroptero-real.html";
writeFileSync(join(HERE, name), k.pageHtml({ title: "Foróptero manual", theme, body: plate, script: kitScript() + live, width: 820 }));
console.log("wrote", name);
