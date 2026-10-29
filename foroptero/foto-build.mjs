// Foróptero realista (como la foto de referencia): cuerpo gris oscuro, mandos de acero,
// anillos de escala blancos. Despiece animado en 23 conjuntos.
// Uso: node foroptero/foto-build.mjs
// Unidades: 1 = 1 mm. x a lo ancho (derecha del examinador +), y hacia el examinador, z arriba.
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import * as k from "../.claude/skills/anatomy/kit/iso-kit.mjs";
import * as G from "../.claude/skills/anatomy/kit/lathe.mjs";
import { kitScript } from "../.claude/skills/anatomy/scripts/inline-kit.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const WIDTH = 800;
const HEIGHT = 640;
const FRONT = 60;

// Posiciones de cada batería (s = −1 izquierda, +1 derecha), en el plano x–z
const SPOT = {
  ap: [50, 150, 42], // apertura principal con escala de eje
  loupe: [96, 232, 34], // lupa superior
  aux: [158, 268, 40], // disco auxiliar
  prism: [130, 124, 44], // prisma rotatorio 0–20
  cyl: [92, 40, 54], // mando del cilindro con escala de eje
  red: [176, 22, 18], // mando negro con aro rojo
  btn: [130, 184, 10], // botón negro
  win: [40, 99], // ventana .00
};

const ASSEMBLIES = [
  { id: "head", name: "barra superior y mandos DP", v: [0, 0, 80] },
  { id: "column", name: "columna central", v: [0, 0, 46] },
  { id: "rest", name: "mando del apoyo frontal", v: [0, 120, 0] },
  ...["L", "R"].flatMap((side) => [
    { id: "cyl" + side, name: "mando de cilindro y eje", v: [0, 132, 0], parent: "body" + side },
    { id: "aux" + side, name: "disco auxiliar", v: [0, 118, 0], parent: "body" + side },
    { id: "prism" + side, name: "prisma rotatorio", v: [0, 108, 0], parent: "body" + side },
    { id: "loupe" + side, name: "lupa del cilindro cruzado", v: [0, 96, 0], parent: "body" + side },
    { id: "red" + side, name: "mando de esfera fuerte", v: [0, 90, 0], parent: "body" + side },
    { id: "ap" + side, name: "apertura y escala de eje", v: [0, 80, 0], parent: "body" + side },
    { id: "rear" + side, name: "tapa trasera", v: [0, -60, 0], parent: "body" + side },
  ]),
  { id: "bodyL", name: "batería de lentes OD", v: [-74, 0, -12] },
  { id: "bodyR", name: "batería de lentes OI", v: [74, 0, -12] },
];
const byId = Object.fromEntries(ASSEMBLIES.map((a) => [a.id, a]));

const P = k.fitProjection(
  [
    [-215, -12, -10], [215, -12, -10], [-215, 100, 320], [215, 100, 320], [0, 30, 400],
    [-215 - 74, -72, -22], [215 + 74, 110, -22], [92 + 74, 250, 0], [-92 - 74, 250, -20], [0, 30, 480], [-158 - 74, 230, 300],
  ],
  WIDTH,
  HEIGHT,
  { pad: 18, azimuth: 70, elevation: 20 },
);

const S = (paths, style) => k.solidSvg(paths, style);
const L = (d, style) => k.lineSvg(d, style);
const D = (points, style) => k.dotsSvg(points, style);
const M = (material, inner) => `<g class="m-${material}">${inner}</g>`;
const FY = (x, z) => G.frameOf([x, 0, z], [0, 1, 0], [1, 0, 0], [0, 0, 1]);
const FX = (x, y, z, sign) => G.frameOf([x, y, z], [sign, 0, 0], [0, 1, 0], [0, 0, 1]);
const at = (p) => k.iso(p, P);
const pt = (p) => p.map((v) => v.toFixed(1)).join(" ");
const seg = (a, b) => "M" + pt(at(a)) + "L" + pt(at(b));

function hull2(points) {
  const pts = [...points].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const cross = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const lower = [], upper = [];
  for (const p of pts) { while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0) lower.pop(); lower.push(p); }
  for (const p of pts.slice().reverse()) { while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0) upper.pop(); upper.push(p); }
  return [...lower.slice(0, -1), ...upper.slice(0, -1)];
}
const circlePts = (cx, cz, r, n = 48) => Array.from({ length: n }, (_, i) => [cx + r * Math.cos((i / n) * 2 * Math.PI), cz + r * Math.sin((i / n) * 2 * Math.PI)]);
const lobes = (s, grow = 0) => [
  [s * SPOT.ap[0], SPOT.ap[1], 46 + grow],
  [s * SPOT.loupe[0], SPOT.loupe[1], 40 + grow],
  [s * SPOT.aux[0], SPOT.aux[1], 44 + grow],
  [s * 186, 150, 30 + grow],
  [s * SPOT.cyl[0], SPOT.cyl[1], 62 + grow],
  [s * SPOT.red[0], SPOT.red[1], 26 + grow],
];
const outlineOf = (s, grow = 0) => hull2(lobes(s, grow).flatMap(([x, z, r]) => circlePts(x, z, r)));
const faceLine = (poly, y) => "M" + poly.map(([x, z]) => pt(at([x, y, z]))).join("L") + "Z";

function sideSeamOf(poly, y) {
  const V = G.viewOf(P);
  const n = poly.length;
  const cx = poly.reduce((t, p) => t + p[0], 0) / n, cz = poly.reduce((t, p) => t + p[1], 0) / n;
  let d = "", open = false;
  for (let i = 0; i < n; i++) {
    const a = poly[i], b = poly[(i + 1) % n];
    let nx = b[1] - a[1], nz = -(b[0] - a[0]);
    const mx = (a[0] + b[0]) / 2 - cx, mz = (a[1] + b[1]) / 2 - cz;
    if (nx * mx + nz * mz < 0) { nx = -nx; nz = -nz; }
    const vis = (nx * V[0] + nz * V[2]) / (Math.hypot(nx, nz) || 1) > 0.02;
    if (vis) { d += (open ? "" : "M" + pt(at([a[0], y, a[1]]))) + "L" + pt(at([b[0], y, b[1]])); open = true; } else open = false;
  }
  return d;
}

// ---------- piezas genéricas ----------
function knurled(F, s0, s1, r, ribs, { cap = true } = {}) {
  const out = [S(G.disc(s0, s1, r, F, P), { tone: "hi" })];
  out.push(k.fadedSvg(G.ribsOf(F, s0 + 0.8, s1 - 0.8, r, ribs, P, { fade: [0.04, 0.42], seams: true }), { tone: "lo" }));
  if (cap) {
    out.push(S(G.disc(s1, s1 + 3, r * 0.9, F, P, { bevel: 0.8 }), { tone: "hi" }));
    out.push(L(G.circleOf(F, s1 + 3, r * 0.55, P), { tone: "faint" }));
  }
  return out.join("");
}

function text(x, y, z, t, size = 5.2, tone = "mid") {
  return k.faceTextSvg(k.sideMatrix([x, y], z - size * 0.36, P, "left"), t, { size, tone, anchor: "middle" });
}

function scaleRing(F, s0, s1, rIn, rOut, { ticks = 72, majors = 12, labels = [], size = 5, labelR = null } = {}) {
  const out = [S(G.ringBand(s0, s1, rIn, rOut, F, P), { tone: "hi" })];
  out.push(L(G.circleOf(F, s1, rOut - 2.2, P), { tone: "faint" }));
  if (ticks) out.push(L(G.spokesOf(F, s1, rOut - 2.2, rOut - 4.6, ticks, P), { tone: "lo" }));
  if (majors) out.push(L(G.spokesOf(F, s1, rOut - 2.2, rOut - 6.6, majors, P), { tone: "mid" }));
  const lr = labelR ?? rOut - 11;
  for (const [angle, t] of labels) {
    const p = G.pointOf(F, s1, lr, angle);
    out.push(text(p[0], p[1], p[2], t, size));
  }
  return M("scale", out.join(""));
}

function hole(F, s0, s1, r) {
  return M("glass", [
    S(G.disc(s0, s1, r, F, P), { tone: "hi" }),
    L(G.circleOf(F, s1, r * 0.72, P), { tone: "lo" }),
    L(G.arcOf(F, s1, r * 0.55, P, { least: -1, from: 0.5, to: 1.6 }), { tone: "faint", free: true }),
  ].join(""));
}

// ---------- batería de lentes ----------
function rear(s) {
  return M("dark", S(G.prismOf(FY(0, 0), outlineOf(s, -4), -12, 0, P), { tone: "hi" }));
}

function body(s) {
  const poly = outlineOf(s);
  const out = [S(G.prismOf(FY(0, 0), poly, 0, FRONT, P), { tone: "hi" })];
  out.push(L(sideSeamOf(poly, 36), { tone: "lo" }), L(sideSeamOf(poly, 8), { tone: "faint" }));
  out.push(L(faceLine(outlineOf(s, -6), FRONT), { tone: "lo" }));
  // tornillos
  const screws = [[s * 22, 210], [s * 200, 96], [s * 150, 4], [s * 12, 104], [s * 186, 196]];
  out.push(M("steel", screws.map(([x, z]) => S(G.disc(FRONT, FRONT + 1.2, 2.4, FY(x, z), P), { tone: "hi" }) + L(G.spokesOf(FY(x, z), FRONT + 1.2, 0, 2.4, 2, P, { phase: 0.6 }), { tone: "lo" })).join("")));
  // ventana de lectura .00
  const [wx, wz] = SPOT.win;
  out.push(M("scale", S(G.prismOf(FY(s * wx, wz), [[-11, -7], [11, -7], [11, 7], [-11, 7]], FRONT, FRONT + 1.2, P), { tone: "hi" })));
  out.push(`<g class="m-redtext">${text(s * wx, FRONT + 1.2, wz, ".00", 7, "hi")}</g>`);
  // botón negro y pasador de convergencia
  const [bx, bz, br] = SPOT.btn;
  out.push(M("dark", S(G.disc(FRONT, FRONT + 4, br, FY(s * bx, bz), P), { tone: "hi" }) + S(G.sphereOf([s * bx, FRONT + 4, bz], br * 0.8, P), { tone: "hi" })));
  out.push(M("steel", S(k.cylinder(s * 70, 34, 4, 270, 6, P, 24), { tone: "hi" }) + S(k.cylinder(s * 70, 34, 2.6, 276, 22, P, 16), { tone: "hi", crease: "none" }) + S(G.sphereOf([s * 70, 34, 300], 4.4, P), { tone: "hi" })));
  return M("body", out.join(""));
}

function aperture(s) {
  const [x, z, r] = SPOT.ap;
  const F = FY(s * x, z);
  const labels = [];
  for (let d = 0; d <= 180; d += 15) {
    labels.push([(d * Math.PI) / 180, String(d)]);
    if (d > 0 && d < 180) labels.push([Math.PI + (d * Math.PI) / 180, String(d)]);
  }
  return [
    M("dark", S(G.ringBand(FRONT, FRONT + 3, 14, r + 2, F, P), { tone: "hi" })),
    scaleRing(F, FRONT + 3, FRONT + 7, 17, r, { ticks: 72, majors: 24, labels, size: 5, labelR: r - 10.5 }),
    M("dark", S(G.ringBand(FRONT + 3, FRONT + 9, 13, 17, F, P), { tone: "hi" })),
    hole(F, FRONT + 2, FRONT + 5, 13),
    `<g class="m-arrow">${L(G.spokesOf(F, FRONT + 9, 13, 16.6, 2, P), { tone: "hi" })}</g>`,
  ].join("");
}

function loupe(s) {
  const [x, z, r] = SPOT.loupe;
  const F = FY(s * x, z);
  const out = [
    M("dark", S(G.disc(FRONT, FRONT + 10, r - 4, F, P), { tone: "hi" })),
    scaleRing(F, FRONT + 10, FRONT + 15, 23, r, { ticks: 0, majors: 0, labels: [[0.2, "P"], [Math.PI + 0.2, "P"]], size: 6, labelR: r - 6 }),
    hole(F, FRONT + 6, FRONT + 9, 20),
    M("dark", S(G.ringBand(FRONT + 9, FRONT + 17, 19, 23, F, P), { tone: "hi" })),
  ];
  const red = [1.0, Math.PI + 1.0].map((a) => at(G.pointOf(F, FRONT + 15, r - 6, a)));
  const white = [2.1, Math.PI + 2.1].map((a) => at(G.pointOf(F, FRONT + 15, r - 6, a)));
  out.push(`<g class="m-reddot">${D(red, { size: 1.6, tone: "hi" })}</g>`, M("scale", D(white, { size: 1.3, tone: "mid" })));
  return out.join("");
}

function aux(s) {
  const [x, z, r] = SPOT.aux;
  const F = FY(s * x, z);
  const letters = ["O", "OC", "±.50", "6Δ", "+.12", "P", "R", "PH", "RMV", "WMV", "GL", "O"];
  const labels = letters.map((t, i) => [Math.PI / 2 + s * ((i - 1) / letters.length) * 2 * Math.PI, t]);
  return [
    scaleRing(F, FRONT, FRONT + 4, 0, r, { ticks: 0, majors: 0, labels, size: 5.2, labelR: r - 7 }),
    M("dark", `<g>${D([at(G.pointOf(F, FRONT + 4, r - 2, Math.PI / 2))], { size: 1.8, tone: "hi" })}</g>`),
    M("steel", S(G.disc(FRONT + 4, FRONT + 8, 25, F, P), { tone: "hi" }) + knurled(F, FRONT + 8, FRONT + 40, 22, 64)),
  ].join("");
}

function prism(s) {
  const [x, z, r] = SPOT.prism;
  const F = FY(s * x, z);
  const values = [0, 3, 6, 9, 12, 15, 18, 20];
  const labels = [];
  for (const v of values) {
    const a = (v / 20) * Math.PI;
    const base = s > 0 ? Math.PI : 0;
    labels.push([base + a * (s > 0 ? -1 : 1), String(v)]);
    if (v > 0 && v < 20) labels.push([base - a * (s > 0 ? -1 : 1), String(v)]);
  }
  return [
    M("dark", S(G.disc(FRONT, FRONT + 6, r - 6, F, P), { tone: "hi" })),
    scaleRing(F, FRONT + 6, FRONT + 11, 25, r, { ticks: 80, majors: 0, labels, size: 5.6, labelR: r - 11 }),
    M("dark", S(G.ringBand(FRONT + 6, FRONT + 14, 21, 25, F, P), { tone: "hi" })),
    hole(F, FRONT + 4, FRONT + 7, 21),
    `<g class="m-arrow">${L(G.spokesOf(F, FRONT + 14, 21, 24.6, 1, P, { phase: s > 0 ? Math.PI : 0 }), { tone: "hi" })}</g>`,
    M("dark", S(G.disc(FRONT, FRONT + 9, 7, FY(s * (x + r + 2), z + 14), P), { tone: "hi" }) + k.fadedSvg(G.ribsOf(FY(s * (x + r + 2), z + 14), FRONT + 0.8, FRONT + 8.2, 7, 18, P, { fade: [0.04, 0.42], seams: true }), { tone: "lo" })),
  ].join("");
}

function cylinder(s) {
  const [x, z, r] = SPOT.cyl;
  const F = FY(s * x, z);
  const labels = [];
  for (let d = 0; d <= 180; d += 15) {
    labels.push([(d * Math.PI) / 180, String(d)]);
    if (d > 0 && d < 180) labels.push([Math.PI + (d * Math.PI) / 180, String(d)]);
  }
  return [
    scaleRing(F, FRONT, FRONT + 4, 0, r, { ticks: 72, majors: 24, labels, size: 5, labelR: r - 11 }),
    M("steel", [
      S(G.disc(FRONT + 4, FRONT + 9, 30, F, P), { tone: "hi" }),
      L(G.spokesOf(F, FRONT + 9, 26, 30, 36, P), { tone: "lo" }),
      knurled(F, FRONT + 9, FRONT + 26, 25, 60, { cap: false }),
      S(G.disc(FRONT + 26, FRONT + 30, 21, F, P, { bevel: 0.6 }), { tone: "hi" }),
      knurled(F, FRONT + 30, FRONT + 50, 17, 44),
    ].join("")),
  ].join("");
}

function redKnob(s) {
  const [x, z, r] = SPOT.red;
  const F = FY(s * x, z);
  return [
    M("redring", S(G.ringBand(FRONT, FRONT + 5, r - 4, r, F, P), { tone: "hi" })),
    M("dark", S(G.disc(FRONT, FRONT + 6, r - 4, F, P), { tone: "hi" }) + knurled(F, FRONT + 6, FRONT + 28, 10, 30)),
    M("scale", L(G.spokesOf(F, FRONT + 31, 2, 6, 1, P, { phase: Math.PI / 2 }), { tone: "hi" })),
  ].join("");
}

// ---------- puente, columna, barra superior, apoyo ----------
function bridge() {
  const out = [];
  for (const s of [-1, 1]) out.push(S(k.slabOf({ x: s * 60 - 16, y: 12, w: 32, d: 34, r: 3 }, 268, 30, P, 3, 0.5), { tone: "hi" }));
  const plan = { x: -120, y: 6, w: 240, d: 50, r: 6 };
  out.push(S(k.slabOf(plan, 292, 40, P, 6, 1), { tone: "hi", inner: L(k.sideSeam(plan, 298, P, 6), { tone: "lo" }) }));
  // ventana de distancia pupilar
  const wF = FY(-62, 312);
  out.push(M("scale", S(G.prismOf(wF, [[-26, -9], [26, -9], [26, 9], [-26, 9]], 56, 57.2, P), { tone: "hi" })));
  const minor = [], major = [];
  for (let mm = 50; mm <= 75; mm++) {
    const x = -62 + (mm - 62.5) * 1.8;
    (mm % 5 === 0 ? major : minor).push(seg([x, 57.2, 305], [x, 57.2, mm % 5 === 0 ? 309.5 : 307.8]));
  }
  out.push(M("scale", L(seg([-62 - 23, 57.2, 305], [-62 + 23, 57.2, 305]), { tone: "lo" }) + L(minor.join(""), { tone: "lo", free: "end" }) + L(major.join(""), { tone: "mid", free: "end" })));
  out.push(M("scale", text(-62 - 22.5 * 1.0 + 4, 57.2, 314.5, "50", 4.6) + text(-62 - 4.5, 57.2, 314.5, "60", 4.6) + text(-62 + 13.5, 57.2, 314.5, "70", 4.6)));
  const tip = -62 + (64 - 62.5) * 1.8;
  out.push(`<g class="m-arrowdark">${L(seg([tip, 57.2, 304.5], [tip, 57.2, 299.5]), { tone: "hi", free: "end" })}</g>`);
  // nivel de burbuja
  const lF = FY(62, 312);
  out.push(M("glass", S(G.prismOf(lF, [[-20, -9], [20, -9], [20, 9], [-20, 9]], 56, 57.2, P), { tone: "hi" })));
  out.push(M("bubble", S(G.prismOf(lF, [[-12, -3.6], [12, -3.6], [12, 3.6], [-12, 3.6]], 57.2, 58.2, P), { tone: "hi" })));
  out.push(M("scale", L(seg([60, 58.2, 315.6], [60, 58.2, 308.4]) + seg([64, 58.2, 315.6], [64, 58.2, 308.4]), { tone: "lo" })));
  out.push(M("scale", D([at([62, 58.4, 319])], { size: 1.2, tone: "hi" })));
  out.push(M("steel", D([[-104, 326], [104, 326], [-104, 298], [104, 298]].map(([x, z]) => at([x, 56, z])), { size: 0.9, tone: "hi" })));
  // vástago del apoyo frontal
  out.push(S(k.slabOf({ x: -14, y: 12, w: 28, d: 40, r: 3 }, 246, 46, P, 3, 0.5), { tone: "hi" }));
  return M("body", out.join(""));
}

function column() {
  const plan = { x: -24, y: 10, w: 48, d: 40, r: 4 };
  return M("dark", S(k.slabOf(plan, 332, 50, P, 4, 0.8), { tone: "hi" }) + L(seg([-16, 50, 360], [-16, 50, 376]) + seg([16, 50, 360], [16, 50, 376]), { tone: "lo" }) + M("steel", D([at([-16, 50, 357]), at([16, 50, 357]), at([-16, 50, 379]), at([16, 50, 379])], { size: 0.9, tone: "hi" })));
}

function head() {
  const plan = { x: -150, y: 8, w: 300, d: 42, r: 6 };
  const out = [M("dark", S(k.slabOf(plan, 382, 28, P, 6, 1), { tone: "hi", inner: L(k.sideSeam(plan, 388, P, 6), { tone: "lo" }) }))];
  for (const s of [-1, 1]) {
    const F = FX(s * 150, 29, 396, s);
    out.push(M("steel", S(G.disc(0, 4, 15, F, P), { tone: "hi" }) + knurled(F, 4, 30, 13, 44)));
    out.push(M("steel", S(k.cylinder(s * 100, 29, 12, 410, 4, P, 32), { tone: "hi" }) + S(k.cylinder(s * 100, 29, 10, 414, 12, P, 32, 0.6), { tone: "hi" }) + L(k.knurl(s * 100, 29, 10, 414, 426, 40, P), { tone: "lo" })));
  }
  return out.join("");
}

function rest() {
  const F = FY(0, 270);
  return M("steel", [
    S(G.disc(52, FRONT + 4, 10, F, P), { tone: "hi" }),
    S(G.disc(FRONT + 4, FRONT + 8, 26, F, P), { tone: "hi" }),
    knurled(F, FRONT + 8, FRONT + 24, 24, 64, { cap: false }),
    S(G.disc(FRONT + 24, FRONT + 46, 22, F, P, { bevel: 1 }), { tone: "hi" }),
    L(G.circleOf(F, FRONT + 46, 12, P), { tone: "faint" }),
  ].join(""));
}

// ---------- ensamblaje ----------
const group = (id, inner) => `<g data-a="${id}">${inner}</g>`;
const side = (s) => {
  const t = s < 0 ? "L" : "R";
  return [
    group("body" + t, body(s)),
    group("ap" + t, aperture(s)),
    group("red" + t, redKnob(s)),
    group("loupe" + t, loupe(s)),
    group("prism" + t, prism(s)),
    group("aux" + t, aux(s)),
    group("cyl" + t, cylinder(s)),
  ];
};
const svg = k.figureSvg({
  width: WIDTH,
  height: HEIGHT,
  label:
    "Foróptero manual de consulta, cuerpo gris oscuro con mandos de acero y anillos de escala blancos. Cada batería tiene la apertura con su escala de eje de 0 a 180°, una lupa superior con el cilindro cruzado, el disco auxiliar con letras, el prisma rotatorio de 0 a 20 dioptrías prismáticas, el mando de cilindro con escala de eje y un mando negro con aro rojo. Arriba, el puente con la ventana de distancia pupilar y el nivel de burbuja, la columna y la barra superior con mandos. La figura se desmonta en 23 conjuntos y se vuelve a montar.",
  body: [
    group("rearL", rear(-1)),
    group("rearR", rear(1)),
    group("head", head()),
    group("column", column()),
    bridge(),
    ...side(-1),
    ...side(1),
    group("rest", rest()),
  ],
});

const MATERIALS = `
.m-body,.m-dark,.m-steel,.m-scale,.m-glass,.m-redring,.m-bubble{--anatomy-weight:.55px}
.m-body{--anatomy-paper:#3b3e43;--anatomy-shade-0:#24262a;--anatomy-shade-1:#2d3034;--anatomy-shade-2:#373a3f;--anatomy-shade-3:#41454a;--anatomy-top:#4c5056;--anatomy-hi:#111214;--anatomy-mid:#6c7077;--anatomy-lo:#5a5e64;--anatomy-faint:#4a4e54;--anatomy-dot:#d0d3d7}
.m-dark{--anatomy-paper:#1d1e21;--anatomy-shade-0:#121315;--anatomy-shade-1:#17181b;--anatomy-shade-2:#1d1f22;--anatomy-shade-3:#24262a;--anatomy-top:#2c2f33;--anatomy-hi:#050506;--anatomy-mid:#55585e;--anatomy-lo:#3f4247;--anatomy-faint:#34373b;--anatomy-dot:#e8e8e8}
.m-steel{--anatomy-paper:#b4b8bd;--anatomy-shade-0:#7d8288;--anatomy-shade-1:#979ca2;--anatomy-shade-2:#b1b5ba;--anatomy-shade-3:#c9ccd0;--anatomy-top:#e4e6e8;--anatomy-hi:#3c3f44;--anatomy-mid:#5b5f65;--anatomy-lo:#6f747a;--anatomy-faint:#8d9197;--anatomy-dot:#2a2c30}
.m-scale{--anatomy-paper:#ecece8;--anatomy-shade-0:#bdbdb8;--anatomy-shade-1:#cfcfca;--anatomy-shade-2:#dededa;--anatomy-shade-3:#e9e9e5;--anatomy-top:#f6f6f3;--anatomy-hi:#202124;--anatomy-mid:#16171a;--anatomy-lo:#2b2c2f;--anatomy-faint:#8e8e8a;--anatomy-dot:#16171a}
.m-glass{--anatomy-paper:#0a0b0d;--anatomy-shade-0:#050607;--anatomy-shade-1:#08090b;--anatomy-shade-2:#0c0d10;--anatomy-shade-3:#111317;--anatomy-top:#16191d;--anatomy-hi:#000;--anatomy-lo:#2a2e34;--anatomy-faint:#6d7682}
.m-redring{--anatomy-paper:#c23a30;--anatomy-shade-0:#7e1f19;--anatomy-shade-1:#962620;--anatomy-shade-2:#ad2f27;--anatomy-shade-3:#c23a30;--anatomy-top:#d9544a;--anatomy-hi:#4a0f0b}
.m-bubble{--anatomy-paper:#a6c43a;--anatomy-shade-0:#6f8a1f;--anatomy-shade-1:#86a32a;--anatomy-shade-2:#9cb934;--anatomy-shade-3:#b3cf45;--anatomy-top:#c9e05a;--anatomy-hi:#3d4d0c}
.m-redtext .iso-face-text{fill:#d23b2f}
.m-reddot .iso-dots circle{fill:#e2462f;opacity:1}
.m-scale .iso-dots circle{opacity:1}
.m-arrow .iso-line{stroke:#f2f2ee;stroke-width:1.4px}
.m-arrowdark .iso-line{stroke:#111;stroke-width:1.4px}
.m-scale .iso-face-text{font-family:"Helvetica Neue",Arial,sans-serif;font-weight:600;letter-spacing:0}
.iso-plate{background:radial-gradient(120% 90% at 50% 45%,#2a2d31 0%,#141518 60%,#0b0c0d 100%)}
`;

const live = `
const P = ${JSON.stringify(P)};
const ASSEMBLIES = ${JSON.stringify(ASSEMBLIES)};
const svg = document.querySelector(".iso-stage svg");
const groups = Object.fromEntries(ASSEMBLIES.map((a) => [a.id, svg.querySelector('[data-a="' + a.id + '"]')]));
const readout = document.querySelector("[data-readout]");
const still = matchMedia("(prefers-reduced-motion: reduce)");
const OUT = ["head", "column", "rest", "cylL", "cylR", "auxL", "auxR", "prismL", "prismR", "loupeL", "loupeR", "redL", "redR", "apL", "apR", "rearL", "rearR", "bodyL", "bodyR"];
const MOVE = 1.1, STAGGER = 0.15;
const PHASES = { hold0: 1.6, open: (OUT.length - 1) * STAGGER + MOVE, hold1: 2.8, close: (OUT.length - 1) * STAGGER + MOVE, hold2: 1.8 };
const CYCLE = Object.values(PHASES).reduce((a, b) => a + b, 0);
const ease = (t) => (t <= 0 ? 0 : t >= 1 ? 1 : t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const byId = Object.fromEntries(ASSEMBLIES.map((a) => [a.id, a]));
function shares(t) {
  const share = {};
  const u = t % CYCLE;
  const closeStart = PHASES.hold0 + PHASES.open + PHASES.hold1;
  OUT.forEach((id, i) => {
    share[id] = u < closeStart ? ease((u - PHASES.hold0 - i * STAGGER) / MOVE) : 1 - ease((u - closeStart - (OUT.length - 1 - i) * STAGGER) / MOVE);
  });
  const moving = OUT.filter((id) => share[id] > 0.001 && share[id] < 0.999);
  let phase;
  if (u < PHASES.hold0 || u >= CYCLE - PHASES.hold2) phase = "montado";
  else if (u < PHASES.hold0 + PHASES.open) phase = moving.length ? "desmontando · " + byId[moving[moving.length - 1]].name : "desmontando";
  else if (u < closeStart) phase = "despiece · 19 conjuntos";
  else phase = moving.length ? "montando · " + byId[moving[0]].name : "montando";
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
stage.addEventListener("click", () => { paused = !paused; if (paused) pausedAt = performance.now(); else { start += performance.now() - pausedAt; run(); } });
stage.addEventListener("keydown", (event) => { if (event.key === " " || event.key === "Enter") { event.preventDefault(); stage.click(); } });
pose(0);
`;

const plate = k.plateHtml({
  fig: "Fig 3",
  title: "Foróptero",
  hint: "Toca para pausar",
  readout: "montado",
  keys: [],
  caption:
    "Foróptero manual de consulta dibujado a partir de una foto real: cuerpo gris oscuro, mandos de acero moleteados y anillos de escala blancos. Escala de eje de 0 a 180° en cada apertura y en el mando del cilindro, prisma rotatorio de 0 a 20 Δ, disco auxiliar con sus lentes (O, OC, ±.50, P, R, PH…), ventana de distancia pupilar y nivel de burbuja. La animación separa 19 conjuntos de fuera hacia dentro y los vuelve a montar.",
  body: `<div class="iso-stage" tabindex="0" role="group" aria-label="Foróptero en despiece: toca o pulsa espacio para pausar">${svg}</div>`,
});

const page = k.pageHtml({ title: "Foróptero", theme: "dark", body: plate, script: kitScript() + live, width: 860 }).replace("</style>", MATERIALS + "</style>");
writeFileSync(join(HERE, "foroptero-foto.html"), page);
console.log("wrote foroptero-foto.html");
