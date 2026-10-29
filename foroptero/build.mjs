// Fig: cómo funciona un foróptero, montado como banco óptico.
// Uso: node foroptero/build.mjs [--light]
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import * as k from "../.claude/skills/anatomy/kit/iso-kit.mjs";
import * as G from "../.claude/skills/anatomy/kit/lathe.mjs";
import { kitScript } from "../.claude/skills/anatomy/scripts/inline-kit.mjs";
import { MODEL, focusOf } from "./model.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const theme = process.argv.includes("--light") ? "light" : "dark";

const WIDTH = 640;
const HEIGHT = 360;
const H = 80; // altura del eje óptico

const BASE = { x: -236, y: -42, w: 400, d: 84, r: 8 };
const BASE_H = 12;
const FOOT_H = 5;
const RAIL = { x: -224, y: -8, w: 376, d: 16, r: 1.5 };
const RAIL_H = 6;

// Ojo modelo
const RETINA_X = -200;
const CORNEA_X = -108;
const TROUGH = { x: -200, y: -22, w: 90, d: 44, r: 1.5 };
const FLOOR_Z = 46;

// Foróptero (unidad del ojo derecho), eje a lo largo de x
const POD = { back: -48, wheel0: -42, wheel1: -33, face: -28, r: 40, wheelR: 44 };
// Colimador
const COL = { lens: 74, end: 132, r: 17 };

const P = k.fitProjection(
  [...k.boxCorners(BASE, -BASE_H - FOOT_H, 0), [POD.face, 0, H + POD.r + 18], [RETINA_X, -32, 120], [COL.end + 8, 0, H + 20]],
  WIDTH,
  HEIGHT,
  { pad: 26, azimuth: 62 },
);

const at = (point) => k.iso(point, P);
const S = (paths, style) => k.solidSvg(paths, style);
const L = (d, style) => k.lineSvg(d, style);
const D = (points, style) => k.dotsSvg(points, style);
const pathOf = (points) => "M" + points.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join("L");
const alongX = (x, y = 0, z = H) => G.frameOf([x, y, z], [1, 0, 0], [0, 1, 0], [0, 0, 1]);
const AX = alongX(0);

// ---------- base y raíl ----------
function base() {
  const out = [`<path class="iso-halo" d="${k.haloOf(BASE, -BASE_H - FOOT_H, BASE_H, P)}"/>`];
  const feet = k.corners(BASE, 20).sort((a, b) => k.depthOf([a[0], a[1], 0], P) - k.depthOf([b[0], b[1], 0], P));
  for (const [x, y] of feet) {
    out.push(S(k.cylinder(x, y, 7, -BASE_H - FOOT_H, 1.6, P, 28), { tone: "lo" }));
    out.push(S(k.cylinder(x, y, 5.4, -BASE_H - FOOT_H + 1.6, FOOT_H - 1.6, P, 28), { tone: "mid" }));
  }
  out.push(S(k.slabOf(BASE, -BASE_H, BASE_H, P, 8, 1.6), { tone: "mid", inner: L(k.sideSeam(BASE, -BASE_H + 4, P, 8), { tone: "faint" }) }));
  out.push(L(k.planOutline(k.insetPlan(BASE, 5), 0, P), { tone: "lo" }));
  const screws = k.corners(BASE, 10);
  out.push(L(screws.map(([x, y]) => k.ring(x, y, 2.2, 0, P, 16)).join(""), { tone: "lo" }));
  out.push(D(screws.map(([x, y]) => at([x, y, 0])), { size: 0.5 }));
  // regla milimetrada a lo largo del borde delantero
  const strip = { x: -214, y: BASE.y + BASE.d - 16, w: 330, d: 7, r: 1 };
  out.push(S(k.slabOf(strip, 0, 0.6, P, 3), { tone: "lo", crease: "none" }));
  const ticks = k.topTicks(strip.x + 5, strip.x + strip.w - 5, 5, 5, strip.y + 0.8, 0.6, [2, 3.8], P);
  out.push(L(ticks.minor, { tone: "lo" }), L(ticks.major, { tone: "mid" }));
  out.push(D([at([strip.x + 2.5, strip.y + 3.5, 0.6]), at([strip.x + strip.w - 2.5, strip.y + 3.5, 0.6])], { size: 0.45 }));
  // placa de identificación
  const label = { x: 126, y: BASE.y + BASE.d - 22, w: 26, d: 14, r: 1 };
  out.push(S(k.slabOf(label, 0, 0.8, P, 3, 0.3), { tone: "lo" }));
  for (const [i, y] of [3.5, 7, 10.5].entries()) out.push(L(k.lineOnTop([label.x + 4, label.y + y], [label.x + (i === 2 ? 14 : 22), label.y + y], 0.8, P), { tone: "faint", free: true }));
  out.push(D([at([label.x + 2, label.y + 2, 0.8]), at([label.x + 24, label.y + 12, 0.8])], { size: 0.4 }));
  // raíl óptico
  out.push(S(k.slabOf(RAIL, 0, RAIL_H, P, 3, 0.5), { tone: "mid", inner: L(k.sideSeam(RAIL, 2.5, P, 3), { tone: "faint" }) }));
  out.push(L(k.lineOnTop([RAIL.x, 0], [RAIL.x + RAIL.w, 0], RAIL_H, P), { tone: "faint" }));
  out.push(D([-210, -110, -10, 90].map((x) => at([x, -4, RAIL_H])), { size: 0.4 }));
  for (const x of [RAIL.x - 4, RAIL.x + RAIL.w]) {
    out.push(S(k.slabOf({ x, y: -12, w: 4, d: 24, r: 1 }, 0, 9, P, 3, 0.4), { tone: "mid" }));
    out.push(D([at([x + 2, -7, 9]), at([x + 2, 7, 9])], { size: 0.4 }));
  }
  return out.join("");
}

// jinete del raíl con tornillo de apriete
function carrier(cx, w = 22) {
  const plan = { x: cx - w / 2, y: -13, w, d: 26, r: 2 };
  const out = [`<path class="iso-halo" d="${k.haloOf(plan, RAIL_H, 0.1, P)}" style="filter:blur(3px)"/>`];
  out.push(S(k.slabOf(plan, RAIL_H, 7, P, 4, 0.5), { tone: "mid" }));
  out.push(D([at([plan.x + 3, plan.y + 3, RAIL_H + 7]), at([plan.x + w - 3, plan.y + 3, RAIL_H + 7])], { size: 0.4, tone: "lo" }));
  const thumb = [cx + w / 2 - 6, plan.y + plan.d + 3];
  out.push(S(k.slabOf({ x: thumb[0] - 1.4, y: plan.y + plan.d - 1, w: 2.8, d: 3, r: 0.8 }, RAIL_H + 2, 3, P, 2), { tone: "mid", crease: "none" }));
  out.push(S(k.cylinder(thumb[0], thumb[1] + 1, 2.8, RAIL_H + 1, 5, P, 20), { tone: "mid" }));
  out.push(L(k.knurl(thumb[0], thumb[1] + 1, 2.8, RAIL_H + 1, RAIL_H + 6, 18, P), { tone: "lo" }));
  return out.join("");
}

function post(cx, top, r = 4) {
  const z0 = RAIL_H + 7;
  return [
    S(k.cylinder(cx, 0, r + 1.6, z0, 3, P, 24), { tone: "mid" }),
    S(k.cylinder(cx, 0, r, z0 + 3, top - z0 - 3, P, 24), { tone: "mid", crease: "none", inner: L(k.sideArc(cx, 0, r, (z0 + top) / 2, P, 16), { tone: "faint" }) }),
  ].join("");
}

// ---------- ojo modelo ----------
function eyeBack() {
  const out = [];
  out.push(carrier(-188, 18), carrier(-124, 18));
  out.push(post(-188, FLOOR_Z - 4, 3.5), post(-124, FLOOR_Z - 4, 3.5));
  // cubeta abierta: suelo y pared trasera
  out.push(S(k.slabOf(TROUGH, FLOOR_Z - 4, 4, P, 3, 0.5), { tone: "lo" }));
  const wall = { x: TROUGH.x, y: TROUGH.y, w: TROUGH.w, d: 3, r: 0.6 };
  out.push(S(k.slabOf(wall, FLOOR_Z, 108 - FLOOR_Z, P, 2, 0.4), { tone: "lo" }));
  // pantalla de la retina
  const screen = { x: RETINA_X - 6, y: -30, w: 6, d: 60, r: 1.2 };
  out.push(S(k.slabOf(screen, FLOOR_Z - 4, 120 - FLOOR_Z + 4, P, 3, 0.6), { tone: "mid" }));
  const F = alongX(RETINA_X);
  out.push(L(G.circleOf(F, 0, 24, P), { tone: "lo" }));
  out.push(L(G.circleOf(F, 0, 22.4, P), { tone: "faint" }));
  out.push(D([[-26, 34], [26, 34], [-26, -34], [26, -34]].map(([u, v]) => k.iso(G.pointOf(F, 0, Math.hypot(u, v), Math.atan2(v, u)), P)), { size: 0.45 }));
  // vasos de la retina: arcos finos que nacen de la papila
  const disc = [10, 4];
  const vessel = (pts) => pathOf(pts.map(([u, v]) => at([RETINA_X, u, H + v])));
  out.push(L(vessel([[disc[0], disc[1]], [4, 12], [-6, 17], [-15.84, 15.84]]) + vessel([[disc[0], disc[1]], [3, -6], [-7, -12], [-17.92, -13.44]]), { tone: "faint" }));
  out.push(L(G.circleOf(alongX(RETINA_X, disc[0], H + disc[1]), 0, 2.6, P), { tone: "lo" }));
  out.push(D([at([RETINA_X, 0, H])], { size: 0.55, tone: "lo" }));
  out.push(k.faceTextSvg(k.sideMatrix([RETINA_X, 0], 116, P, "right"), "RETINA", { size: 3, tone: "lo", anchor: "middle" }));
  // escala axial grabada en el suelo (mm de ojo)
  const mm = (CORNEA_X - RETINA_X) / MODEL.axial;
  const minor = [], major = [];
  for (let i = 0; i <= 22; i++) {
    const x = RETINA_X + i * mm;
    (i % 5 === 0 ? major : minor).push(k.lineOnTop([x, TROUGH.y + 3], [x, TROUGH.y + 3 + (i % 5 === 0 ? 4 : 2.2)], FLOOR_Z, P));
  }
  out.push(L(k.lineOnTop([TROUGH.x + 1, TROUGH.y + 3], [TROUGH.x + TROUGH.w - 1, TROUGH.y + 3], FLOOR_Z, P), { tone: "faint" }));
  out.push(L(minor.join(""), { tone: "faint" }), L(major.join(""), { tone: "lo" }));
  return out.join("");
}

function eyeFront() {
  const out = [];
  const wall = { x: TROUGH.x, y: TROUGH.y + TROUGH.d - 3, w: TROUGH.w, d: 3, r: 0.6 };
  out.push(S(k.slabOf(wall, FLOOR_Z, 12, P, 2, 0.4), { tone: "lo" }));
  out.push(D([TROUGH.x + 6, TROUGH.x + TROUGH.w - 6].map((x) => at([x, wall.y + 1.5, FLOOR_Z + 12])), { size: 0.4 }));
  // córnea: lente en su aro
  const F = alongX(0);
  out.push(S(G.ringBand(CORNEA_X - 4, CORNEA_X + 3, 24, 29, F, P), { tone: "mid" }));
  out.push(S(G.disc(CORNEA_X - 2, CORNEA_X + 2, 24, F, P), { tone: "hi", lit: true }));
  out.push(L(G.arcOf(F, CORNEA_X + 2, 18, P, { least: -1 }), { tone: "faint" }));
  out.push(D(G.dotsOf(F, CORNEA_X + 3, 26.5, 8, P, { all: true, phase: Math.PI / 8 }), { size: 0.45 }));
  out.push(k.faceTextSvg(k.sideMatrix([CORNEA_X + 3, 0], H - 31, P, "right"), "CÓRNEA", { size: 2.6, tone: "lo", anchor: "middle" }));
  // pie del aro
  out.push(S(k.slabOf({ x: CORNEA_X - 4, y: -6, w: 7, d: 12, r: 1 }, FLOOR_Z - 4, H - 29 - FLOOR_Z + 4, P, 2, 0.4), { tone: "mid" }));
  return out.join("");
}

// ---------- foróptero ----------
const KNOB = { y: 22, z: H - 22, r: 6.5 };
const WHEEL_PHASES = 16;
const WHEEL_RIBS = 64;
const wheelRibs = (i) => k.fadedSvg(G.ribsOf(AX, POD.wheel0 + 0.6, POD.wheel1 - 0.6, POD.wheelR, WHEEL_RIBS, P, { phase: (i / WHEEL_PHASES) * ((2 * Math.PI) / WHEEL_RIBS), fade: [0.04, 0.42] }), { tone: "lo" });
const knobF = G.frameOf([POD.face, KNOB.y, KNOB.z], [1, 0, 0], [0, 1, 0], [0, 0, 1]);
const knobRibs = (i) => k.fadedSvg(G.ribsOf(knobF, 1, 7, KNOB.r, 24, P, { phase: (i / WHEEL_PHASES) * ((2 * Math.PI) / 24), fade: [0.04, 0.42] }), { tone: "lo" });

function podPost() {
  return carrier(-38) + post(-38, H - POD.r - 6, 4.5) + S(k.slabOf({ x: -46, y: -8, w: 16, d: 16, r: 2 }, H - POD.r - 6, 7, P, 3, 0.5), { tone: "mid" });
}

function pod() {
  const out = [`<path class="iso-halo" d="${k.haloOf({ x: -50, y: -30, w: 24, d: 60, r: 10 }, RAIL_H + 7, 0.1, P)}" style="filter:blur(6px)"/>`];
  // carcasa trasera, disco de esferas, carcasa delantera
  out.push(S(G.disc(POD.back, POD.wheel0, POD.r, AX, P), { tone: "mid" }));
  out.push(S(G.disc(POD.wheel0, POD.wheel1, POD.wheelR, AX, P), { tone: "mid" }));
  out.push(`<g data-part="wheel">${wheelRibs(0)}</g>`);
  out.push(S(G.disc(POD.wheel1, POD.face, POD.r, AX, P), { tone: "mid", inner: L(G.arcOf(AX, POD.face - 2.2, POD.r, P), { tone: "faint" }) }));
  // botón superior (disco auxiliar)
  out.push(S(k.slabOf({ x: -42, y: -6, w: 10, d: 12, r: 2 }, H + POD.r - 3, 6, P, 3, 0.4), { tone: "mid" }));
  out.push(S(k.cylinder(-37, 0, 7, H + POD.r + 3, 6, P, 32, 0.5), { tone: "mid" }));
  out.push(L(k.knurl(-37, 0, 7, H + POD.r + 3, H + POD.r + 9, 30, P), { tone: "lo" }));
  out.push(L(k.lineOnTop([-37, 0], [-37 + 6, 0], H + POD.r + 9, P), { tone: "mid", free: "end" }));
  // cara: tornillos, escala de ejes 0–180°, ventanas y lente
  const face = POD.face;
  out.push(L(G.circleOf(AX, face, 36, P), { tone: "lo" }));
  out.push(D(G.dotsOf(AX, face, 38, 12, P, { all: true, phase: Math.PI / 12 }), { size: 0.45 }));
  out.push(L(G.arcOf(AX, face, 30, P, { least: -1, from: 0, to: Math.PI }), { tone: "lo" }));
  out.push(L(G.spokesOf(AX, face, 30, 33.4, 36, P, { from: 0, to: Math.PI }), { tone: "lo" }));
  out.push(L(G.spokesOf(AX, face, 30, 36, 6, P, { from: 0, to: Math.PI }) + G.spokesOf(AX, face, 30, 36, 1, P, { from: Math.PI, to: Math.PI + 0.001 }), { tone: "mid" }));
  for (const deg of [0, 90, 180]) {
    const a = (deg * Math.PI) / 180;
    out.push(k.faceTextSvg(k.sideMatrix([face, Math.cos(a) * 25], H + Math.sin(a) * 25 + 1, P, "right"), String(deg), { size: 2.4, tone: "lo", anchor: "middle" }));
  }
  // aguja del eje del cilindro (90°)
  out.push(L(pathOf([at([face, 0, H + 11]), at([face, 0, H + 31])]), { tone: "mid", free: "end" }));
  // ventanas de lectura
  const win = (y0, y1, z0, z1) => G.prismOf(AX, [[y0, z0], [y1, z0], [y1, z1], [y0, z1]], face, face + 1.4, P);
  out.push(S(win(-30, -10, -18, -9), { tone: "lo" }));
  out.push(S(win(-30, -10, -30, -21), { tone: "lo" }));
  const label = (y, z, text) => k.faceTextSvg(k.sideMatrix([face + 1.4, y], H + z, P, "right"), text, { size: 2.2, tone: "lo", anchor: "middle" });
  out.push(label(-20, -6.8, "ESF"), label(-20, -18.8, "CIL"));
  out.push(`<g data-part="sph">${k.faceTextSvg(k.sideMatrix([face + 1.4, -20], H - 11.2, P, "right"), "+0,00", { size: 3.6, tone: "hi", anchor: "middle" })}</g>`);
  out.push(`<g data-part="cyl">${k.faceTextSvg(k.sideMatrix([face + 1.4, -20], H - 23.2, P, "right"), "−0,00", { size: 3.6, tone: "hi", anchor: "middle" })}</g>`);
  // mando del cilindro
  out.push(S(G.disc(0, 1, KNOB.r + 1.6, knobF, P), { tone: "mid" }));
  out.push(S(G.disc(1, 7, KNOB.r, knobF, P, { bevel: 0.5 }), { tone: "mid" }));
  out.push(`<g data-part="knob">${knobRibs(0)}</g>`);
  out.push(L(pathOf([k.iso(G.pointOf(knobF, 7, 0, 0), P), k.iso(G.pointOf(knobF, 7, KNOB.r - 1.5, Math.PI / 2), P)]), { tone: "mid", free: "end" }));
  // lente de prueba en la apertura
  out.push(S(G.ringBand(face, face + 2.4, 9, 12.5, AX, P), { tone: "mid" }));
  out.push(S(G.disc(face - 0.5, face + 1.6, 9, AX, P), { tone: "hi", lit: true }));
  out.push(L(G.arcOf(AX, face + 1.6, 6.5, P, { least: -1 }), { tone: "faint" }));
  out.push(k.faceTextSvg(k.sideMatrix([face, 6], H - 33, P, "right"), "OD", { size: 3, tone: "mid", anchor: "middle" }));
  return out.join("");
}

// ---------- colimador (optotipo en el infinito) ----------
function collimator() {
  const out = [carrier(104, 26), post(104, H - COL.r - 5, 5)];
  out.push(S(k.slabOf({ x: 94, y: -9, w: 20, d: 18, r: 2 }, H - COL.r - 5, 6, P, 3, 0.5), { tone: "mid" }));
  const F = AX;
  out.push(S(G.solidOf([[COL.lens, 14.5], [COL.lens + 4, 14.5], [COL.lens + 4, COL.r], [COL.end - 12, COL.r], [COL.end - 12, 15]], F, P), { tone: "mid" }));
  for (let i = 0; i < 4; i++) {
    const s = COL.end - 12 + i * 3;
    out.push(S(G.ringBand(s, s + 1.6, 12, 18.5, F, P), { tone: "mid" }));
    out.push(S(G.disc(s + 1.6, s + 3, 12, F, P), { tone: "lo" }));
  }
  out.push(S(G.disc(COL.end, COL.end + 3, 13, F, P, { bevel: 0.5 }), { tone: "mid" }));
  out.push(D(G.dotsOf(F, COL.end + 3, 10.5, 6, P, { all: true }), { size: 0.45 }));
  out.push(S(G.ringBand(COL.lens + 18, COL.lens + 24, COL.r, COL.r + 1.6, F, P), { tone: "mid" }));
  out.push(L(G.ribsOf(F, COL.lens + 18.4, COL.lens + 23.6, COL.r + 1.6, 40, P), { tone: "lo" }));
  // corredera del optotipo con la E
  out.push(S(k.slabOf({ x: COL.lens + 30, y: -6, w: 7, d: 12, r: 1 }, H + COL.r - 2, 9, P, 2, 0.4), { tone: "hi" }));
  out.push(k.faceTextSvg(k.sideMatrix([COL.lens + 37, 0], H + COL.r + 5.6, P, "right"), "E", { size: 5, tone: "lo", anchor: "middle" }));
  // cable de la lámpara hasta la base
  const cable = [[COL.end + 3, 0, H], [COL.end + 14, 0, H], [COL.end + 22, 0, H - 8], [COL.end + 22, 0, 9]];
  out.push(k.wireSvg(at(cable[0]), at(cable[3]), { via: [at(cable[1]), at(cable[2])], tone: "lo", ends: "both", size: 1 }));
  return out.join("");
}

const svg = k.figureSvg({
  width: WIDTH,
  height: HEIGHT,
  label:
    "Banco óptico con un foróptero. A la derecha, un colimador envía luz paralela desde un optotipo con la letra E. En el centro, la unidad del ojo derecho del foróptero con su disco de esferas, el mando del cilindro y la escala de ejes. A la izquierda, un ojo modelo abierto: la córnea delante y la retina al fondo. Dos haces, uno vertical y otro horizontal, muestran dónde enfoca cada meridiano; al corregir la esfera y el cilindro los dos llegan a la retina.",
  body: [
    base(),
    eyeBack(),
    `<path data-part="blur" class="iso-line" data-tone="lit" d="" style="stroke-width:0.9"/>`,
    `<g data-part="inside"></g>`,
    eyeFront(),
    `<g data-part="between"></g>`,
    podPost(),
    pod(),
    `<g data-part="incoming"></g>`,
    collimator(),
  ],
});

// ---------- parte viva ----------
const variants = {
  wheel: Array.from({ length: WHEEL_PHASES }, (_, i) => wheelRibs(i)),
  knob: Array.from({ length: WHEEL_PHASES }, (_, i) => knobRibs(i)),
};

const live = `
const P = ${JSON.stringify(P)};
const MODEL = ${JSON.stringify(MODEL)};
const focusOf = ${focusOf.toString()};
const VARIANTS = ${JSON.stringify(variants)};
const H = ${H}, RETINA_X = ${RETINA_X}, CORNEA_X = ${CORNEA_X}, POD_BACK = ${POD.back}, POD_FACE = ${POD.face}, COL_LENS = ${COL.lens};
const SPREAD = 0.0011, ZOOM = ${(CORNEA_X - RETINA_X) / MODEL.axial} * 4, OFF = 7;
const stage = document.querySelector(".iso-stage");
const svg = stage.querySelector("svg");
const part = (name) => svg.querySelector('[data-part="' + name + '"]');
const parts = { inside: part("inside"), between: part("between"), incoming: part("incoming"), blur: part("blur"), wheel: part("wheel"), knob: part("knob"), sph: part("sph").querySelector("text"), cyl: part("cyl").querySelector("text") };
const readout = document.querySelector("[data-readout]");
const still = matchMedia("(prefers-reduced-motion: reduce)");
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const snap = (v) => Math.round(v * 4) / 4;
const fmt = (v) => (v > 0.001 ? "+" : v < -0.001 ? "−" : "±") + Math.abs(v).toFixed(2).replace(".", ",");
const mm = (v) => Math.abs(v).toFixed(2).replace(".", ",") + " mm";
const pt = (x, y, z) => iso([x, y, z], P);
const line = (a, b, tone, extra = "") => '<path class="iso-line" data-tone="' + tone + '"' + extra + ' d="M' + a[0].toFixed(1) + " " + a[1].toFixed(1) + "L" + b[0].toFixed(1) + " " + b[1].toFixed(1) + '"/>';
const dot = (a, tone, r = 0.8) => '<circle style="fill:var(--anatomy-' + tone + ')" cx="' + a[0].toFixed(1) + '" cy="' + a[1].toFixed(1) + '" r="' + r + '"/>';
const TOUR = [[0, 0], [-1, 0], [-2.25, 0], [-2.25, -0.5], [-2.25, -1], [-2.25, -1], [-3, -1], [-1.25, -1]];
let state = { sph: 0, cyl: 0 }, target = { sph: 0, cyl: 0 };
let frame = 0, last = 0, clock = 0, touring = !still.matches, visible = false, idleTimer = 0;

function rays() {
  const meridians = [
    { tone: "red", lens: state.sph, eye: MODEL.eyeV, dir: [0, 1] },
    { tone: "blue", lens: state.sph + state.cyl, eye: MODEL.eyeH, dir: [1, 0] },
  ];
  let incoming = "", between = "", inside = "", blur = [0, 0], focus = [];
  meridians.forEach((m, index) => {
    const f = focusOf(m.eye, m.lens);
    const xf = RETINA_X - f.error * ZOOM;
    for (const sign of [-1, 1]) {
      const o = sign * OFF;
      const p = (x, off) => pt(x, m.dir[0] * off, H + m.dir[1] * off);
      incoming += line(p(COL_LENS, o), p(POD_FACE + 1.6, o), m.tone) + dot(p(POD_FACE + 1.6, o), m.tone);
      const oc = o * (1 - m.lens * SPREAD * (POD_BACK - CORNEA_X));
      between += line(p(POD_BACK, o), p(CORNEA_X + 2, oc), m.tone) + dot(p(CORNEA_X + 2, oc), m.tone);
      const offAt = (x) => oc * (xf - x) / (xf - (CORNEA_X - 2));
      const end = offAt(RETINA_X);
      inside += line(p(CORNEA_X - 2, oc), p(RETINA_X, end), m.tone);
      blur[index] = Math.max(blur[index], Math.abs(end));
    }
    if (xf > RETINA_X + 0.5 && xf < CORNEA_X - 4) focus.push(pt(xf, 0, H));
    m.f = f;
  });
  parts.incoming.innerHTML = incoming;
  parts.between.innerHTML = between;
  parts.inside.innerHTML = inside + focus.map((f) => dot(f, "lit", 1.1)).join("");
  const [bh, bv] = [Math.max(blur[1], 0.8), Math.max(blur[0], 0.8)];
  const ring = [];
  for (let i = 0; i <= 40; i++) { const t = (i / 40) * Math.PI * 2; ring.push(pt(RETINA_X + 0.2, Math.cos(t) * bh, H + Math.sin(t) * bv)); }
  parts.blur.setAttribute("d", "M" + ring.map(([x, y]) => x.toFixed(1) + " " + y.toFixed(1)).join("L") + "Z");
  return meridians;
}

function draw() {
  const ms = rays();
  const sph = snap(state.sph), cyl = snap(state.cyl);
  const wi = ((Math.round(-state.sph * 4 * 4) % 16) + 16) % 16;
  const ki = ((Math.round(-state.cyl * 4 * 4) % 16) + 16) % 16;
  if (parts.wheel.dataset.i !== String(wi)) { parts.wheel.innerHTML = VARIANTS.wheel[wi]; parts.wheel.dataset.i = wi; }
  if (parts.knob.dataset.i !== String(ki)) { parts.knob.innerHTML = VARIANTS.knob[ki]; parts.knob.dataset.i = ki; }
  parts.sph.textContent = fmt(sph);
  parts.cyl.textContent = fmt(cyl).replace("±", "");
  const say = (e) => Math.abs(e) < 0.02 ? "ok" : (e < 0 ? "−" : "+") + mm(e);
  const ok = ms.every((m) => Math.abs(m.f.error) < 0.02);
  const text = "Esf " + fmt(sph) + " · Cil " + fmt(cyl).replace("±", "") + " · " + (ok ? "en la retina" : "V " + say(ms[0].f.error) + " · H " + say(ms[1].f.error));
  if (readout.textContent !== text) readout.textContent = text;
  stage.setAttribute("aria-valuetext", text);
}

function tick(now) {
  const dt = last ? Math.min((now - last) / 1000, 1 / 30) : 1 / 60;
  last = now;
  const calm = still.matches;
  if (touring) { clock += dt; const [s, c] = TOUR[Math.floor(clock / 2.4) % TOUR.length]; target = { sph: s, cyl: c }; }
  const ease = calm ? 1 : 1 - Math.exp(-dt / 0.35);
  let moving = false;
  for (const key of ["sph", "cyl"]) {
    state[key] += (target[key] - state[key]) * ease;
    if (Math.abs(target[key] - state[key]) < 0.002) state[key] = target[key]; else moving = true;
  }
  draw();
  frame = visible && (touring || moving) ? requestAnimationFrame(tick) : 0;
}
const run = () => { if (!frame && visible) { last = 0; frame = requestAnimationFrame(tick); } };
const steer = (next) => {
  touring = false;
  target = { sph: clamp(snap(next.sph), -4, 1), cyl: clamp(snap(next.cyl), -2, 0) };
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => { touring = !still.matches; clock = 0; run(); }, 5000);
  run();
};
new IntersectionObserver((entries) => { visible = entries[entries.length - 1].isIntersecting; if (visible) run(); }, { rootMargin: "120px 0px" }).observe(stage);
stage.addEventListener("pointermove", (event) => {
  const box = svg.getBoundingClientRect();
  const sx = clamp(((event.clientX - box.left) / box.width - 0.1) / 0.8, 0, 1);
  const sy = clamp(((event.clientY - box.top) / box.height - 0.15) / 0.7, 0, 1);
  steer({ sph: 1 - sx * 5, cyl: -sy * 2 });
});
stage.addEventListener("keydown", (event) => {
  const d = { ArrowLeft: [0.25, 0], ArrowRight: [-0.25, 0], ArrowUp: [0, 0.25], ArrowDown: [0, -0.25] }[event.key];
  if (!d) return;
  event.preventDefault();
  steer({ sph: target.sph + d[0], cyl: target.cyl + d[1] });
});
draw();
`;

const body = k.plateHtml({
  fig: "Fig 1",
  title: "Foróptero",
  hint: "Puntero o flechas",
  readout: "Esf ±0,00 · Cil 0,00",
  keys: [
    { mark: "red", label: "Meridiano vertical (90°): lo corrige la esfera" },
    { mark: "blue", label: "Meridiano horizontal (180°): esfera + cilindro" },
    { mark: "lit", label: "Lentes y mancha de desenfoque en la retina" },
  ],
  caption:
    "Un foróptero es una caja de lentes en ruedas. El disco de esferas suma o resta potencia en pasos de 0,25 D en todos los meridianos; el cilindro la cambia en uno solo, a lo largo del eje que marca la escala. Este ojo modelo es miope con astigmatismo (−2,25 −1,00 × 90): sin lente, los dos haces enfocan delante de la retina y la mancha es una elipse. Con −2,25 D de esfera el haz vertical llega a la retina; al añadir −1,00 D de cilindro también el horizontal, y la mancha se cierra en un punto. Potencias según el ojo reducido (60 D, 1,336); la distancia del foco a la retina se dibuja ampliada 4×.",
  body: `<div class="iso-stage" tabindex="0" role="slider" aria-label="Foróptero: flechas izquierda y derecha cambian la esfera, arriba y abajo el cilindro" aria-valuemin="-4" aria-valuemax="1" aria-valuenow="0">${svg}</div>`,
});

const name = theme === "light" ? "foroptero-light.html" : "foroptero.html";
writeFileSync(join(HERE, name), k.pageHtml({ title: "Foróptero", theme, body, script: kitScript() + live, width: 700 }));
console.log("wrote", name);
