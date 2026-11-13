/* Motxilla 2A · mes.js — més exercicis i més variats.
   Cada funció fabrica un exercici nou amb nombres, noms i situacions triats a l'atzar,
   de manera que no s'acaben mai. S'afigen als exercicis que ja tenia cada tema (no en lleven cap).
   Per a tornar als exercicis d'abans n'hi ha prou amb llevar la línia de mes.js d'app.html. */
(function () {
'use strict';
const sl = t => `<div class="cmp">${t.replace('?', '<span class="slot">?</span>')}</div>`;
const other = (list, ok, n = 3) => shuffle(list.filter(x => x !== ok)).slice(0, n);
const nom = () => pick(NAMES);
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const des = n => n + (n === 1 ? ' desena' : ' desenes');
const plu = d => /s$/.test(d) ? d : d + 's'; /* dissabte → dissabtes, sábado → sábados */

/* afig tipus nous a un tema: una part de les vegades ix un exercici dels nous */
function extend(id, share, makers) {
  const t = SKILL[id]; if (!t) return; const old = t.gen;
  t.gen = lv => { if (Math.random() < share) { const ok = makers.filter(m => (m.min || 1) <= lv); const q = pick(ok.length ? ok : makers).f(lv); if (q) return q; } return old(lv); };
}

/* parelles de nombres segons el nivell */
function sumPair(lv) {
  let a, b;
  if (lv === 1) { a = R(10, 79); b = R(1, 9); }
  else if (lv === 2) { do { a = R(12, 79); b = R(11, 80); } while (a + b > 99); }
  else { do { a = R(110, 780); b = R(15, 210); } while (a + b > 999); }
  return [a, b];
}
function subPair(lv) {
  let a, b;
  if (lv === 1) { a = R(12, 99); b = R(1, 9); }
  else if (lv === 2) { a = R(30, 99); b = R(11, a - 4); }
  else { a = R(200, 999); b = R(15, Math.min(299, a - 10)); }
  return [a, b];
}

/* ======================= SUMES ======================= */
const SUM_STORY = [
  (n, a, b) => [`${n} té ${a} cromos i una amiga li'n dona ${b}. Quants cromos té ara?`, 'cromos'],
  (n, a, b) => [`En un autobús hi ha ${a} persones. En la parada en pugen ${b} més. Quantes persones hi ha ara?`, 'persones'],
  (n, a, b) => [`A la biblioteca de classe hi ha ${a} contes i ${b} còmics. Quants llibres hi ha en total?`, 'llibres'],
  (n, a, b) => [`${n} ha llegit ${a} pàgines al matí i ${b} a la vesprada. Quantes pàgines ha llegit en total?`, 'pàgines'],
  (n, a, b) => [`Un llapis costa ${a} cèntims i una goma ${b} cèntims. Quant costen les dues coses juntes?`, 'cèntims'],
  (n, a, b) => [`Al pati hi ha ${a} xiquetes i ${b} xiquets. Quants alumnes hi ha al pati?`, 'alumnes'],
  (n, a, b) => [`En un hort hi ha ${a} tomaqueres i ${b} encisams. Quantes plantes hi ha en total?`, 'plantes'],
  (n, a, b) => [`${n} fa ${a} passos fins a la font i ${b} més fins a l'escola. Quants passos fa en total?`, 'passos'],
  (n, a, b) => [`Al matí passen ${a} cotxes pel carrer i a la vesprada ${b}. Quants cotxes han passat?`, 'cotxes'],
  (n, a, b) => [`En una caixa hi ha ${a} taronges i en una altra ${b}. Quantes taronges hi ha entre les dues?`, 'taronges'],
];
extend('m3', .55, [
  { f: lv => { const [a, b] = sumPair(lv); return num('Quin nombre falta?', b, { rtl: false, visual: sl(`${a} + ? = ${a + b}`), hint: `Pensa: des del ${a}, quant falta per a arribar al ${a + b}?`, explain: `${a} + ${b} = ${a + b}. Faltava el ${b}.` }); } },
  { f: lv => { const [a, b] = sumPair(lv); return num('Quin nombre falta?', a, { rtl: false, visual: sl(`? + ${b} = ${a + b}`), hint: `Lleva ${b} del ${a + b}.`, explain: `${a} + ${b} = ${a + b}. Faltava el ${a}.` }); } },
  { f: lv => { const a = R(1, lv === 1 ? 5 : 8) * 10, b = R(1, Math.min(9 - a / 10, lv === 1 ? 4 : 8)) * 10; return num(`Calcula de cap: ${a} + ${b}`, a + b, { rtl: false, hint: `Suma les desenes: ${a / 10} + ${b / 10}.`, explain: `${des(a / 10)} + ${des(b / 10)} = ${des((a + b) / 10)}: ${a + b}.` }); } },
  { f: lv => { const a = R(11, lv === 3 ? 880 : 79), k = pick(lv === 1 ? [10] : [10, 20, 30]); if (a + k > 999) return null; return num(`Calcula de cap: ${a} + ${k}`, a + k, { rtl: false, hint: `Només canvien les desenes: suma-n'hi ${k / 10}.`, explain: `${a} + ${k} = ${a + k}. Les unitats no canvien.` }); } },
  { min: 2, f: lv => { const a = R(11, lv === 3 ? 45 : 30), b = R(11, lv === 3 ? 40 : 30), c = R(5, lv === 3 ? 40 : 25); return num(`Quant fa ${a} + ${b} + ${c}?`, a + b + c, { rtl: true, hint: `Primer suma ${a} + ${b}. Després afig ${c}.`, explain: `${a} + ${b} = ${a + b}. ${a + b} + ${c} = ${a + b + c}.` }); } },
  { f: lv => { const n = R(lv === 1 ? 2 : 6, lv === 3 ? 250 : lv === 2 ? 45 : 10); return num(`Quin és el doble de ${n}?`, n * 2, { rtl: false, hint: `El doble és sumar el nombre amb ell mateix: ${n} + ${n}.`, explain: `${n} + ${n} = ${n * 2}.` }); } },
  { f: lv => { const n = lv === 3 ? R(101, 989) : R(11, 88); if (n % 10 === 0) return null; const t = n - n % 10 + 10; return num(`Quant li falta al ${n} per a arribar al ${t}?`, t - n, { rtl: false, hint: `Compta des del ${n} fins al ${t}.`, explain: `${n} + ${t - n} = ${t}.` }); } },
  { f: lv => { const [a, b] = sumPair(Math.min(lv, 2)); const s = a + b, ok = `${a} + ${b}`; const w = [`${a + 1} + ${b + 1}`, `${a} + ${b + 10 > 89 ? b - 10 || 1 : b + 10}`, `${a - 1} + ${b - 1 || 2}`]; return choice(`Quina suma dona ${s}?`, ok, w, { hint: 'Calcula cada suma a poc a poc.', explain: `${a} + ${b} = ${s}.` }); } },
  { f: lv => { const [a, b] = sumPair(lv); const [p, u] = pick(SUM_STORY)(nom(), a, b); return num(p, a + b, { rtl: true, story: true, hint: 'Ajuntem dues quantitats: és una suma.', explain: `${a} + ${b} = ${a + b} ${u}.` }); } },
  { min: 2, f: lv => { const [a, b] = sumPair(lv); const ok = a + b, right = Math.random() < .5, shown = right ? ok : ok + pick([-10, 10, -1, 1]); return choice(`És correcta esta suma? ${a} + ${b} = ${shown}`, right ? 'Sí' : 'No', [right ? 'No' : 'Sí'], { hint: 'Fes la suma tu i compara.', explain: `${a} + ${b} = ${ok}.` }); } },
]);

/* ======================= RESTES ======================= */
const SUB_STORY = [
  (n, a, b) => [`${n} tenia ${a} cromos i n'ha perdut ${b}. Quants cromos té ara?`, 'cromos'],
  (n, a, b) => [`En un autobús hi havia ${a} persones. En baixen ${b}. Quantes en queden?`, 'persones'],
  (n, a, b) => [`Un llibre té ${a} pàgines. ${n} n'ha llegit ${b}. Quantes pàgines li falten?`, 'pàgines'],
  (n, a, b) => [`En una caixa hi ha ${a} taronges. Se'n venen ${b}. Quantes en queden?`, 'taronges'],
  (n, a, b) => [`${n} té ${a} euros i en gasta ${b} en un regal. Quants euros li queden?`, 'euros'],
  (n, a, b) => [`Al pati hi havia ${a} alumnes. ${b} entren a classe. Quants alumnes queden al pati?`, 'alumnes'],
  (n, a, b) => [`Una corda fa ${a} metres. En tallem ${b}. Quants metres en queden?`, 'metres'],
  (n, a, b) => [`${n} té ${a} bales i el seu cosí en té ${b}. Quantes bales més té ${n}?`, 'bales més'],
  (n, a, b) => [`En un arbre hi havia ${a} pardals. Se'n van volant ${b}. Quants en queden?`, 'pardals'],
  (n, a, b) => [`El forner ha fet ${a} pans i n'ha venut ${b}. Quants pans li queden?`, 'pans'],
];
extend('m4', .55, [
  { f: lv => { const [a, b] = subPair(lv); return num('Quin nombre falta?', b, { rtl: false, visual: sl(`${a} − ? = ${a - b}`), hint: `Pensa: quant he de llevar al ${a} perquè en queden ${a - b}?`, explain: `${a} − ${b} = ${a - b}. Faltava el ${b}.` }); } },
  { f: lv => { const [a, b] = subPair(lv); return num('Quin nombre falta?', a, { rtl: false, visual: sl(`? − ${b} = ${a - b}`), hint: `Suma ${a - b} + ${b}.`, explain: `${a} − ${b} = ${a - b}. Faltava el ${a}.` }); } },
  { f: lv => { const a = R(3, 9) * 10, b = R(1, a / 10 - 1) * 10; return num(`Calcula de cap: ${a} − ${b}`, a - b, { rtl: false, hint: `Resta les desenes: ${a / 10} − ${b / 10}.`, explain: `${des(a / 10)} − ${des(b / 10)} = ${des((a - b) / 10)}: ${a - b}.` }); } },
  { f: lv => { const a = R(lv === 3 ? 140 : 35, lv === 3 ? 990 : 99), k = pick(lv === 1 ? [10] : [10, 20, 30]); return num(`Calcula de cap: ${a} − ${k}`, a - k, { rtl: false, hint: `Només canvien les desenes: lleva'n ${k / 10}.`, explain: `${a} − ${k} = ${a - k}. Les unitats no canvien.` }); } },
  { f: lv => { const n = R(lv === 1 ? 2 : 6, lv === 3 ? 240 : lv === 2 ? 48 : 10) * 2; return num(`Quina és la meitat de ${n}?`, n / 2, { rtl: false, hint: 'La meitat és repartir en dues parts iguals.', explain: `${n / 2} + ${n / 2} = ${n}. La meitat de ${n} és ${n / 2}.` }); } },
  { min: 2, f: lv => { const [a, b] = subPair(lv); return num(`Si ${a} − ${b} = ${a - b}, quant fa ${a - b} + ${b}?`, a, { rtl: false, hint: 'La suma desfà la resta: torna al nombre del principi.', explain: `${a - b} + ${b} = ${a}. Així comprovem que la resta està bé.` }); } },
  { f: lv => { const [a, b] = subPair(Math.min(lv, 2)); const d = a - b, ok = `${a} − ${b}`; const w = [`${a} − ${b + 1}`, `${a + 10 > 99 ? a - 10 : a + 10} − ${b}`, `${a - 1} − ${b + 1}`]; return choice(`Quina resta dona ${d}?`, ok, w, { hint: 'Calcula cada resta a poc a poc.', explain: `${a} − ${b} = ${d}.` }); } },
  { f: lv => { const [a, b] = subPair(lv); const [p, u] = pick(SUB_STORY)(nom(), a, b); return num(p, a - b, { rtl: true, story: true, hint: 'En queden menys, o busquem la diferència: és una resta.', explain: `${a} − ${b} = ${a - b} ${u}.` }); } },
  { min: 2, f: lv => { const [a, b] = subPair(lv); const ok = a - b, right = Math.random() < .5, shown = right ? ok : Math.max(1, ok + pick([-10, 10, -1, 1])); return choice(`És correcta esta resta? ${a} − ${b} = ${shown}`, right ? 'Sí' : 'No', [right ? 'No' : 'Sí'], { hint: 'Fes la resta tu i compara.', explain: `${a} − ${b} = ${ok}.` }); } },
  { min: 2, f: lv => { const a = R(30, 60), b = R(5, 15), c = R(3, 12); return num(`Quant fa ${a} − ${b} − ${c}?`, a - b - c, { rtl: true, hint: `Primer fes ${a} − ${b}. Després lleva ${c}.`, explain: `${a} − ${b} = ${a - b}. ${a - b} − ${c} = ${a - b - c}.` }); } },
]);

/* ======================= NOMBRES ======================= */
function serie(max, steps) {
  const k = pick(steps), up = Math.random() < .7, len = 4;
  const start = up ? R(1, Math.max(1, Math.floor((max - k * len) / k))) * k : R(len + 1, Math.floor(max / k)) * k;
  const s = Array.from({ length: len }, (_, i) => start + (up ? i : -i) * k), next = start + (up ? len : -len) * k;
  return num(`Quin nombre continua la sèrie? ${s.join(', ')}, …`, next, { rtl: false, hint: `Mira quant canvia d'un nombre al següent: va de ${k} en ${k}${up ? '' : ' cap arrere'}.`, explain: `La sèrie va de ${k} en ${k}${up ? '' : ' cap arrere'}: després del ${s[len - 1]} ve el ${next}.` });
}
function major(lo, hi) {
  const s = new Set(); while (s.size < 4) s.add(R(lo, hi)); const v = [...s], big = Math.random() < .5, ok = big ? Math.max(...v) : Math.min(...v);
  return choice(`Quin és el nombre més ${big ? 'gran' : 'xicotet'}?`, ok, v.filter(x => x !== ok), { hint: hi > 99 ? 'Mira primer les centenes, després les desenes.' : 'Mira primer les desenes.', explain: `El més ${big ? 'gran' : 'xicotet'} és el ${ok}.` });
}
extend('m1', .4, [
  { f: lv => serie(99, lv === 1 ? [2, 10] : [2, 5, 10, 3]) },
  { f: () => major(10, 99) },
  { f: () => { const n = R(11, 99), u = n % 10, d = n - u; if (!u) return null; return num('Quin nombre falta?', u, { rtl: false, visual: sl(`${n} = ${d} + ?`), hint: 'Són les unitats soltes.', explain: `${n} = ${d} + ${u}.` }); } },
  { f: () => { const n = R(10, 99), par = n % 2 === 0; return choice(`El ${n} és parell o senar?`, par ? 'parell' : 'senar', [par ? 'senar' : 'parell'], { hint: 'Mira l\'última xifra: 0, 2, 4, 6 i 8 són parells.', explain: `El ${n} acaba en ${n % 10}: és ${par ? 'parell' : 'senar'}.` }); } },
  { min: 2, f: () => { const n = R(11, 98); return num(`Quin nombre està entre el ${n - 1} i el ${n + 1}?`, n, { rtl: false, hint: 'És el que va just després del primer.', explain: `${n - 1}, ${n}, ${n + 1}.` }); } },
  { min: 2, f: () => { const d = R(1, 8), u = pick([1, 2, 3, 7, 8, 9]), n = d * 10 + u, ok = u < 5 ? d * 10 : d * 10 + 10; return choice(`Quina és la desena més pròxima al ${n}?`, ok, [u < 5 ? d * 10 + 10 : d * 10, ok + 10, Math.max(0, ok - 10)], { hint: 'Mira les unitats: si en són menys de 5, cap avall; si en són més, cap amunt.', explain: `El ${n} està més prop del ${ok}.` }); } },
]);
extend('m2', .4, [
  { f: lv => serie(999, lv === 1 ? [100, 10] : [100, 50, 10, 5]) },
  { f: () => major(100, 999) },
  { f: () => { const c = R(1, 9), d = R(1, 9), u = R(1, 9), n = c * 100 + d * 10 + u; return num('Quin nombre falta?', d * 10, { rtl: false, visual: sl(`${n} = ${c * 100} + ? + ${u}`), hint: 'Són les desenes: la xifra del mig.', explain: `${n} = ${c * 100} + ${d * 10} + ${u}.` }); } },
  { f: () => { const n = R(101, 999); return num(`Quin nombre va just abans del ${n}?`, n - 1, { rtl: false, hint: 'Abans vol dir un menys.', explain: `${n} − 1 = ${n - 1}.` }); } },
  { min: 2, f: () => { const n = R(110, 880), k = pick([10, 100]); return num(`Quin nombre és ${k} més que ${n}?`, n + k, { rtl: false, hint: k === 100 ? 'Només canvien les centenes.' : 'Només canvien les desenes.', explain: `${n} + ${k} = ${n + k}.` }); } },
]);

/* ======================= MULTIPLICACIÓ ======================= */
const MUL_STORY = [
  (g, k) => [`Hi ha ${g} bosses amb ${k} caramels cada una. Quants caramels hi ha?`, 'caramels'],
  (g, k) => [`Un gat té 4 potes. Quantes potes tenen ${g} gats?`, 'potes', 4],
  (g, k) => [`Cada bicicleta té 2 rodes. Quantes rodes tenen ${g} bicicletes?`, 'rodes', 2],
  (g, k) => [`En cada taula seuen ${k} alumnes. Quants alumnes seuen en ${g} taules?`, 'alumnes'],
  (g, k) => [`Cada mà té 5 dits. Quants dits hi ha en ${g} mans?`, 'dits', 5],
  (g, k) => [`Un paquet porta ${k} cromos. Quants cromos hi ha en ${g} paquets?`, 'cromos'],
];
extend('m5', .45, [
  { f: lv => { const t = pick(lv === 1 ? [2, 5, 10] : [2, 3, 4, 5, 10]), k = R(2, 10); return num('Quin nombre falta?', k, { rtl: false, visual: sl(`? × ${t} = ${k * t}`), hint: `Compta de ${t} en ${t} fins al ${k * t}. Quantes vegades?`, explain: `${k} × ${t} = ${k * t}.` }); } },
  { f: lv => { let g = R(2, lv === 1 ? 5 : 9), k = pick(lv === 1 ? [2, 5, 10] : [2, 3, 4, 5, 10]); const [p, u, fix] = pick(MUL_STORY)(g, k); if (fix) k = fix; return num(p, g * k, { rtl: false, story: true, hint: `Són grups iguals: ${g} vegades ${k}.`, explain: `${g} × ${k} = ${g * k} ${u}.` }); } },
  { f: lv => { const t = pick(lv === 1 ? [2, 5, 10] : [2, 3, 4, 5, 10]), i = R(1, 6), s = [0, 1, 2, 3].map(x => (i + x) * t); return num(`Continua la taula del ${t}: ${s.join(', ')}, …`, (i + 4) * t, { rtl: false, hint: `Suma ${t} a l'últim nombre.`, explain: `${s[3]} + ${t} = ${(i + 4) * t}.` }); } },
  { f: lv => { const n = R(2, lv === 1 ? 10 : 30), tri = lv > 1 && Math.random() < .5; if (tri && n > 12) return null; return num(`Quin és el ${tri ? 'triple' : 'doble'} de ${n}?`, n * (tri ? 3 : 2), { rtl: false, hint: tri ? `El triple és ${n} + ${n} + ${n}.` : `El doble és ${n} + ${n}.`, explain: `${n} × ${tri ? 3 : 2} = ${n * (tri ? 3 : 2)}.` }); } },
  { min: 2, f: () => { const a = R(2, 5), b = R(2, 10); return choice(`Quina suma és igual que ${a} × ${b}?`, Array(a).fill(b).join(' + '), [Array(a).fill(a).join(' + '), `${a} + ${b}`, Array(a + 1).fill(b).join(' + ')], { hint: `${a} × ${b} vol dir ${a} vegades el ${b}.`, explain: `${a} × ${b} = ${Array(a).fill(b).join(' + ')} = ${a * b}.` }); } },
]);

/* ======================= PROBLEMES ======================= */
extend('m9', .5, [
  { f: lv => { const [a, b] = sumPair(Math.min(lv, 2)); const [p, u] = pick(SUM_STORY)(nom(), a, b); return num(p, a + b, { rtl: true, story: true, hint: 'Ajuntem: suma.', explain: `${a} + ${b} = ${a + b} ${u}.` }); } },
  { f: lv => { const [a, b] = subPair(Math.min(lv, 2)); const [p, u] = pick(SUB_STORY)(nom(), a, b); return num(p, a - b, { rtl: true, story: true, hint: 'En queden menys: resta.', explain: `${a} − ${b} = ${a - b} ${u}.` }); } },
  { f: () => { const g = R(2, 9), k = pick([2, 5, 10]); const [p, u, fix] = pick(MUL_STORY)(g, k), kk = fix || k; return num(p, g * kk, { rtl: false, story: true, hint: 'Grups iguals: multiplica.', explain: `${g} × ${kk} = ${g * kk} ${u}.` }); } },
  { f: () => { const [a, b] = Math.random() < .5 ? sumPair(2) : subPair(2), add = a + b < 100 && Math.random() < .5; const p = add ? pick(SUM_STORY)(nom(), a, b)[0] : pick(SUB_STORY)(nom(), Math.max(a, b), Math.min(a, b))[0]; return choice(`Quina operació resol el problema? ${p}`, add ? 'una suma' : 'una resta', [add ? 'una resta' : 'una suma', 'una multiplicació'], { story: true, hint: 'Hi ha més coses al final o menys?', explain: add ? 'Ajuntem dues quantitats: és una suma.' : 'En queden menys o busquem la diferència: és una resta.' }); } },
  { min: 2, f: () => { const n = nom(), a = R(40, 60), b = R(5, 20), c = R(3, 15); return num(`${n} té ${a} euros. Compra un conte de ${b} euros i un joc de ${c} euros. Quants euros li queden?`, a - b - c, { rtl: true, story: true, hint: `Primer suma el que gasta: ${b} + ${c}. Després resta-ho de ${a}.`, explain: `${b} + ${c} = ${b + c}. ${a} − ${b + c} = ${a - b - c} euros.` }); } },
  { min: 2, f: () => { const g = R(2, 5), k = pick([2, 5, 10]), x = R(1, 9); return num(`Hi ha ${g} caixes amb ${k} llapis cada una i ${x} llapis solts. Quants llapis hi ha en total?`, g * k + x, { rtl: true, story: true, hint: `Primer multiplica ${g} × ${k}. Després suma els solts.`, explain: `${g} × ${k} = ${g * k}. ${g * k} + ${x} = ${g * k + x} llapis.` }); } },
  { min: 2, f: () => { const n = nom(), a = R(6, 14), d = R(2, 5); return num(`${n} té ${a} anys. La seua germana té ${d} anys menys. Quants anys té la germana?`, a - d, { rtl: false, story: true, hint: 'Menys anys: resta.', explain: `${a} − ${d} = ${a - d} anys.` }); } },
]);

/* ======================= LECTURES QUE CANVIEN CADA VEGADA ======================= */
function story(L) {
  const girl = Math.random() < .5, n = pick(girl ? L.girls : L.boys), who = L.art(n, girl), frame = pick(L.frames);
  return frame({ n, who, Who: cap(who), girl, of: L.of(n, girl) });
}

/* ---------- valencià ---------- */
const VA = {
  girls: ['Marta', 'Laia', 'Neus', 'Júlia', 'Carla', 'Núria', 'Paula', 'Mireia'],
  boys: ['Pau', 'Biel', 'Vicent', 'Pep', 'Marc', 'Jordi', 'Toni', 'Quim'],
  art: (n, g) => (g ? 'la ' : 'en ') + n, of: (n, g) => (g ? 'de la ' : 'd\'en ') + n,
  days: ['dilluns', 'dimarts', 'dimecres', 'dijous', 'divendres', 'dissabte', 'diumenge'],
  colors: ['roja', 'blava', 'verda', 'groga', 'blanca', 'negra'],
  nums: ['dos', 'tres', 'quatre', 'cinc', 'sis', 'set', 'huit', 'nou'],
};
VA.names = [...VA.girls, ...VA.boys];
VA.frames = [
  c => { const an = pick(['gos', 'gat', 'conill', 'cadell']), pn = pick(['Tro', 'Núvol', 'Xispa', 'Coco', 'Pinyol', 'Bru', 'Llamp', 'Taca']), col = pick(['blanc', 'negre', 'marró', 'gris', 'taronja']), size = pick(['xicotet', 'gran', 'molt juganer', 'molt tranquil']);
    const when = pick(['cada matí', 'cada vesprada', 'cada dissabte', 'cada diumenge']), pl = pick(['al parc', 'a la platja', 'al riu', 'a la plaça', 'al camp']), toy = pick(['una pilota', 'un pal', 'una corda', 'un os de joguet']), bed = pick(['al sofà', 'al seu llit', 'damunt d\'un coixí', 'davall de la taula']);
    return { t: `${c.Who} i ${pn}`, x: `${c.Who} té un ${an} que es diu ${pn}. És ${size} i té el pèl ${col}. ${cap(when)}, ${c.who} i ${pn} van ${pl}. Allí ${pn} juga amb ${toy}. Quan tornen a casa, ${pn} beu aigua i s'adorm ${bed}.`,
      q: [[`Com es diu el ${an}?`, pn, other(['Tro', 'Núvol', 'Xispa', 'Coco', 'Pinyol', 'Bru', 'Llamp', 'Taca'], pn)], [`Quin animal té ${c.who}?`, `un ${an}`, other(['un gos', 'un gat', 'un conill', 'un cadell', 'un peix', 'un pardal'], `un ${an}`)], ['De quin color té el pèl?', col, other(['blanc', 'negre', 'marró', 'gris', 'taronja'], col)], ['On van?', pl, other(['al parc', 'a la platja', 'al riu', 'a la plaça', 'al camp'], pl)], ['Quan hi van?', when, other(['cada matí', 'cada vesprada', 'cada dissabte', 'cada diumenge'], when)], [`Amb què juga ${pn}?`, `amb ${toy}`, other(['una pilota', 'un pal', 'una corda', 'un os de joguet'], toy).map(x => 'amb ' + x)], [`On s'adorm ${pn}?`, bed, other(['al sofà', 'al seu llit', 'damunt d\'un coixí', 'davall de la taula'], bed)]] }; },
  c => { const P = [['a la granja', ['vaques i ovelles', 'gallines i conills']], ['al zoo', ['lleons i girafes', 'micos i elefants']], ['a la platja', ['gavines i crancs', 'petxines i peixos']], ['a la muntanya', ['àguiles i cabres', 'esquirols i pardals']], ['al museu', ['quadres i escultures', 'ossos de dinosaure']]];
    const [pl, seen] = pick(P), see = pick(seen), day = pick(VA.days.slice(0, 5)), tr = pick(['amb autobús', 'amb tren', 'a peu']), eat = pick(['un entrepà de formatge', 'un entrepà de truita', 'una coca de tomaca', 'fruita i galetes']), made = pick(['un dibuix', 'una foto', 'un mural']);
    return { t: `Excursió ${pl}`, x: `${cap(day)}, la classe de segon va d'excursió ${pl}. Hi van ${tr}. Allí veuen ${see}. Al migdia mengen ${eat}. Abans de tornar, ${c.who} fa ${made} per a recordar el dia.`,
      q: [['On van d\'excursió?', pl, other(P.map(x => x[0]), pl)], ['Quin dia hi van?', day, other(VA.days, day)], ['Com hi van?', tr, other(['amb autobús', 'amb tren', 'a peu', 'amb barca', 'amb bicicleta'], tr)], ['Què veuen allí?', see, other(P.flatMap(x => x[1]).filter(x => !seen.includes(x)), see)], ['Què mengen al migdia?', eat, other(['un entrepà de formatge', 'un entrepà de truita', 'una coca de tomaca', 'fruita i galetes'], eat)], [`Què fa ${c.who} abans de tornar?`, made, other(['un dibuix', 'una foto', 'un mural', 'un pastís'], made)], [`Qui fa ${made}?`, c.n, other(VA.names, c.n)]] }; },
  c => { const age = pick(['set', 'huit', 'nou']), fr = pick(VA.nums.slice(2)), cake = pick(['un pastís de xocolate', 'una coca de llanda', 'un pastís de maduixa', 'una coca de poma']), game = pick(['a l\'amagatall', 'a pilota', 'a les cadires', 'a pillar']), gift = pick(['una bicicleta', 'un conte', 'una pilota', 'un trencaclosques', 'uns patins']);
    return { t: `L'aniversari ${c.of}`, x: `Hui és l'aniversari ${c.of}. Fa ${age} anys. A la festa venen ${fr} amics. Tots mengen ${cake} i després juguen ${game}. El regal que més li agrada és ${gift}.`,
      q: [['De qui és l\'aniversari?', c.of, other(VA.girls.map(x => 'de la ' + x).concat(VA.boys.map(x => 'd\'en ' + x)), c.of)], ['Quants anys fa?', age, other(['sis', 'set', 'huit', 'nou', 'deu'], age)], ['Quants amics venen a la festa?', fr, other(VA.nums, fr)], ['Què mengen?', cake, other(['un pastís de xocolate', 'una coca de llanda', 'un pastís de maduixa', 'una coca de poma'], cake)], ['A què juguen?', game, other(['a l\'amagatall', 'a pilota', 'a les cadires', 'a pillar'], game)], ['Quin regal li agrada més?', gift, other(['una bicicleta', 'un conte', 'una pilota', 'un trencaclosques', 'uns patins'], gift)], ['Què fan primer?', 'mengen', ['juguen', 'obrin els regals', 'se\'n van a casa']]] }; },
  c => { const day = pick(['dissabte', 'diumenge', 'dimecres', 'divendres']), wi = pick(['amb la seua iaia', 'amb el seu iaio', 'amb sa mare', 'amb son pare', 'amb la seua tia']), b1 = pick(['tomaques', 'creïlles', 'cebes', 'carlotes']), b2 = pick(['pa', 'formatge', 'ous', 'peix']), free = pick(['una poma', 'una mandarina', 'una pera', 'un grapat de cireres']), back = pick(['a peu', 'amb autobús', 'amb bicicleta']);
    return { t: `${c.Who} va al mercat`, x: `${cap(day)} de matí, ${c.who} va al mercat ${wi}. Compren ${b1} i ${b2}. A la parada de la fruita, el venedor li regala ${free}. Després tornen a casa ${back}, amb la cistella plena.`,
      q: [['Amb qui va al mercat?', wi, other(['amb la seua iaia', 'amb el seu iaio', 'amb sa mare', 'amb son pare', 'amb la seua tia'], wi)], ['Quin dia hi va?', day, other(VA.days, day)], ['Què compren?', `${b1} i ${b2}`, [`${other(['tomaques', 'creïlles', 'cebes', 'carlotes'], b1)[0]} i ${other(['pa', 'formatge', 'ous', 'peix'], b2)[0]}`, 'sabates i mitjons', 'llibres i llapis']], ['Què li regala el venedor?', free, other(['una poma', 'una mandarina', 'una pera', 'un grapat de cireres'], free)], ['Com tornen a casa?', back, other(['a peu', 'amb autobús', 'amb bicicleta', 'amb tren'], back)], ['Com porten la cistella?', 'plena', ['buida', 'trencada']], ['On van?', 'al mercat', ['a l\'escola', 'al parc', 'a la platja']]] }; },
  c => { const S = [['a la tardor', 'la tardor', ['les fulles cauen dels arbres', 'els dies es fan més curts'], ['una jaqueta', 'unes botes'], ['xafar les fulles seques', 'arreplegar castanyes'], ['un got de llet calenta', 'una sopa']], ['a l\'hivern', 'l\'hivern', ['fa molt de fred', 'a la muntanya neva'], ['un abric i una bufanda', 'uns guants i un gorro'], ['fer ninots de neu', 'mirar com plou des de la finestra'], ['una tassa de xocolate calent', 'un caldo calentet']], ['a la primavera', 'la primavera', ['els camps s\'omplin de flors', 'els arbres trauen fulles noves'], ['una samarreta de màniga llarga', 'una jaqueta fina'], ['mirar les papallones', 'collir flors'], ['un suc de taronja', 'un got d\'aigua fresca']], ['a l\'estiu', 'l\'estiu', ['fa molta calor', 'els dies són molt llargs'], ['un banyador', 'una gorra i unes sandàlies'], ['nadar a la piscina', 'fer castells d\'arena'], ['un gelat de maduixa', 'un tall de meló d\'Alger']]];
    const s = pick(S), w = pick(s[2]), cl = pick(s[3]), act = pick(s[4]), dr = pick(s[5]), o = k => S.filter(x => x !== s).map(x => pick(x[k]));
    return { t: `${cap(s[1])}`, x: `${cap(s[0])}, ${w}. ${c.Who} es posa ${cl} per a eixir al carrer. El que més li agrada és ${act}. Quan arriba a casa, pren ${dr}.`,
      q: [['De quina estació parla el text?', s[1], S.filter(x => x !== s).map(x => x[1])], [`Què passa ${s[0]}?`, w, o(2)], [`Què es posa ${c.who} per a eixir?`, cl, o(3)], ['Què li agrada més?', act, o(4)], ['Què pren quan arriba a casa?', dr, o(5)], ['Qui ix al carrer?', c.n, other(VA.names, c.n)]] }; },
  c => { const wi = pick(['son pare', 'sa mare', 'el seu iaio', 'la seua iaia']), dish = pick(['una coca', 'un pastís', 'unes galetes', 'una pizza']), fem = dish !== 'un pastís', pl = dish === 'unes galetes', obj = pl ? 'les' : fem ? 'la' : 'el', time = pick(['mitja hora', 'vint minuts', 'un quart d\'hora']), top = pick(['maduixes', 'xocolate', 'formatge', 'ametles']), meal = pick(['berenar', 'sopar', 'esmorzar']);
    return { t: `${c.Who} cuina`, x: `${c.Who} i ${wi} fan ${dish} per a ${meal}. Primer mesclen la farina amb l'aigua i pasten bé. Després ${obj} posen al forn ${time}. Quan ja està tot fet, hi posen ${top} damunt. Tota la casa fa bona olor.`,
      q: [['Què cuinen?', dish, other(['una coca', 'un pastís', 'unes galetes', 'una pizza', 'una sopa'], dish)], [`Amb qui cuina ${c.who}?`, `amb ${wi}`, other(['son pare', 'sa mare', 'el seu iaio', 'la seua iaia'], wi).map(x => 'amb ' + x)], ['Quant de temps està al forn?', time, other(['mitja hora', 'vint minuts', 'un quart d\'hora', 'dues hores'], time)], ['Què hi posen damunt?', top, other(['maduixes', 'xocolate', 'formatge', 'ametles'], top)], ['Què fan primer?', 'mesclen la farina amb l\'aigua', ['ho posen al forn', 'hi posen coses damunt', 'se\'l mengen']], ['Per a quan ho fan?', `per a ${meal}`, other(['berenar', 'sopar', 'esmorzar', 'dinar'], meal).map(x => 'per a ' + x)], ['Com fa olor la casa?', 'bona olor', ['mala olor', 'olor de fum']]] }; },
  c => { const sp = pick(['futbol', 'handbol', 'hoquei']), day = pick(VA.days.slice(0, 5)), col = pick(VA.colors), w = pick(['tres', 'quatre', 'cinc']), l = pick(['u', 'dos']), g = pick(['un gol', 'dos gols', 'tres gols']), feel = c.girl ? 'molt contenta' : 'molt content';
    return { t: `El partit ${c.of}`, x: `${c.Who} juga a ${sp} tots els ${day}. El seu equip porta una samarreta ${col}. Hui han guanyat ${w} a ${l}. ${c.Who} ha marcat ${g} i està ${feel}. Després del partit, tot l'equip berena al parc.`,
      q: [[`A què juga ${c.who}?`, `a ${sp}`, other(['futbol', 'handbol', 'hoquei', 'tenis', 'bàsquet'], sp).map(x => 'a ' + x)], ['Quin dia juga?', `els ${day}`, other(VA.days, day).map(x => 'els ' + plu(x))], ['De quin color és la samarreta?', col, other(VA.colors, col)], [`Quants gols ha marcat ${c.who}?`, g, other(['un gol', 'dos gols', 'tres gols', 'cap gol'], g)], ['Com ha acabat el partit?', 'el seu equip ha guanyat', ['el seu equip ha perdut', 'han empatat']], [`Com està ${c.who}?`, feel, c.girl ? ['trista', 'enfadada', 'avorrida'] : ['trist', 'enfadat', 'avorrit']], ['Què fan després del partit?', 'berenen al parc', ['se\'n van a dormir', 'tornen a jugar', 'van a l\'escola']]] }; },
];

/* ---------- castellano ---------- */
const ES = {
  girls: ['Marta', 'Lucía', 'Sara', 'Julia', 'Carla', 'Paula', 'Elena', 'Nora'],
  boys: ['Pablo', 'Hugo', 'Mateo', 'Dani', 'Marcos', 'Leo', 'Bruno', 'Álex'],
  art: n => n, of: n => 'de ' + n,
  days: ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'],
  colors: ['roja', 'azul', 'verde', 'amarilla', 'blanca', 'negra'],
  nums: ['dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'],
};
ES.names = [...ES.girls, ...ES.boys];
ES.frames = [
  c => { const an = pick(['perro', 'gato', 'conejo', 'cachorro']), pn = pick(['Trueno', 'Nube', 'Chispa', 'Coco', 'Pipo', 'Bruno', 'Rayo', 'Lunar'].filter(x => x !== c.n)), col = pick(['blanco', 'negro', 'marrón', 'gris', 'naranja']), size = pick(['pequeño', 'grande', 'muy juguetón', 'muy tranquilo']);
    const when = pick(['cada mañana', 'cada tarde', 'cada sábado', 'cada domingo']), pl = pick(['al parque', 'a la playa', 'al río', 'a la plaza', 'al campo']), toy = pick(['una pelota', 'un palo', 'una cuerda', 'un hueso de juguete']), bed = pick(['en el sofá', 'en su cama', 'encima de un cojín', 'debajo de la mesa']);
    return { t: `${c.n} y ${pn}`, x: `${c.n} tiene un ${an} que se llama ${pn}. Es ${size} y tiene el pelo ${col}. ${cap(when)}, ${c.n} y ${pn} van ${pl}. Allí ${pn} juega con ${toy}. Cuando vuelven a casa, ${pn} bebe agua y se duerme ${bed}.`,
      q: [[`¿Cómo se llama el ${an}?`, pn, other(['Trueno', 'Nube', 'Chispa', 'Coco', 'Pipo', 'Rayo', 'Lunar'], pn)], [`¿Qué animal tiene ${c.n}?`, `un ${an}`, other(['un perro', 'un gato', 'un conejo', 'un cachorro', 'un pez', 'un pájaro'], `un ${an}`)], ['¿De qué color tiene el pelo?', col, other(['blanco', 'negro', 'marrón', 'gris', 'naranja'], col)], ['¿Adónde van?', pl, other(['al parque', 'a la playa', 'al río', 'a la plaza', 'al campo'], pl)], ['¿Cuándo van?', when, other(['cada mañana', 'cada tarde', 'cada sábado', 'cada domingo'], when)], [`¿Con qué juega ${pn}?`, `con ${toy}`, other(['una pelota', 'un palo', 'una cuerda', 'un hueso de juguete'], toy).map(x => 'con ' + x)], [`¿Dónde se duerme ${pn}?`, bed, other(['en el sofá', 'en su cama', 'encima de un cojín', 'debajo de la mesa'], bed)]] }; },
  c => { const P = [['a la granja', ['vacas y ovejas', 'gallinas y conejos']], ['al zoo', ['leones y jirafas', 'monos y elefantes']], ['a la playa', ['gaviotas y cangrejos', 'conchas y peces']], ['a la montaña', ['águilas y cabras', 'ardillas y pájaros']], ['al museo', ['cuadros y esculturas', 'huesos de dinosaurio']]];
    const [pl, seen] = pick(P), see = pick(seen), day = pick(ES.days.slice(0, 5)), tr = pick(['en autobús', 'en tren', 'a pie']), eat = pick(['un bocadillo de queso', 'un bocadillo de tortilla', 'una empanada', 'fruta y galletas']), made = pick(['un dibujo', 'una foto', 'un mural']);
    return { t: `Excursión ${pl}`, x: `El ${day}, la clase de segundo va de excursión ${pl}. Van ${tr}. Allí ven ${see}. A mediodía comen ${eat}. Antes de volver, ${c.n} hace ${made} para recordar el día.`,
      q: [['¿Adónde van de excursión?', pl, other(P.map(x => x[0]), pl)], ['¿Qué día van?', `el ${day}`, other(ES.days, day).map(x => 'el ' + x)], ['¿Cómo van?', tr, other(['en autobús', 'en tren', 'a pie', 'en barca', 'en bicicleta'], tr)], ['¿Qué ven allí?', see, other(P.flatMap(x => x[1]).filter(x => !seen.includes(x)), see)], ['¿Qué comen a mediodía?', eat, other(['un bocadillo de queso', 'un bocadillo de tortilla', 'una empanada', 'fruta y galletas'], eat)], [`¿Qué hace ${c.n} antes de volver?`, made, other(['un dibujo', 'una foto', 'un mural', 'un pastel'], made)], [`¿Quién hace ${made}?`, c.n, other(ES.names, c.n)]] }; },
  c => { const age = pick(['siete', 'ocho', 'nueve']), fr = pick(ES.nums.slice(2)), cake = pick(['una tarta de chocolate', 'un bizcocho', 'una tarta de fresa', 'una tarta de manzana']), game = pick(['al escondite', 'a la pelota', 'a las sillas', 'al pilla-pilla']), gift = pick(['una bicicleta', 'un cuento', 'una pelota', 'un puzle', 'unos patines']);
    return { t: `El cumpleaños de ${c.n}`, x: `Hoy es el cumpleaños de ${c.n}. Cumple ${age} años. A la fiesta vienen ${fr} amigos. Todos comen ${cake} y después juegan ${game}. El regalo que más le gusta es ${gift}.`,
      q: [['¿De quién es el cumpleaños?', `de ${c.n}`, other(ES.names, c.n).map(x => 'de ' + x)], ['¿Cuántos años cumple?', age, other(['seis', 'siete', 'ocho', 'nueve', 'diez'], age)], ['¿Cuántos amigos vienen a la fiesta?', fr, other(ES.nums, fr)], ['¿Qué comen?', cake, other(['una tarta de chocolate', 'un bizcocho', 'una tarta de fresa', 'una tarta de manzana'], cake)], ['¿A qué juegan?', game, other(['al escondite', 'a la pelota', 'a las sillas', 'al pilla-pilla'], game)], ['¿Qué regalo le gusta más?', gift, other(['una bicicleta', 'un cuento', 'una pelota', 'un puzle', 'unos patines'], gift)], ['¿Qué hacen primero?', 'comen', ['juegan', 'abren los regalos', 'se van a casa']]] }; },
  c => { const day = pick(['sábado', 'domingo', 'miércoles', 'viernes']), wi = pick(['con su abuela', 'con su abuelo', 'con su madre', 'con su padre', 'con su tía']), b1 = pick(['tomates', 'patatas', 'cebollas', 'zanahorias']), b2 = pick(['pan', 'queso', 'huevos', 'pescado']), free = pick(['una manzana', 'una mandarina', 'una pera', 'un puñado de cerezas']), back = pick(['a pie', 'en autobús', 'en bicicleta']);
    return { t: `${c.n} va al mercado`, x: `El ${day} por la mañana, ${c.n} va al mercado ${wi}. Compran ${b1} y ${b2}. En el puesto de la fruta, el vendedor le regala ${free}. Después vuelven a casa ${back}, con la cesta llena.`,
      q: [['¿Con quién va al mercado?', wi, other(['con su abuela', 'con su abuelo', 'con su madre', 'con su padre', 'con su tía'], wi)], ['¿Qué día va?', `el ${day}`, other(ES.days, day).map(x => 'el ' + x)], ['¿Qué compran?', `${b1} y ${b2}`, [`${other(['tomates', 'patatas', 'cebollas', 'zanahorias'], b1)[0]} y ${other(['pan', 'queso', 'huevos', 'pescado'], b2)[0]}`, 'zapatos y calcetines', 'libros y lápices']], ['¿Qué le regala el vendedor?', free, other(['una manzana', 'una mandarina', 'una pera', 'un puñado de cerezas'], free)], ['¿Cómo vuelven a casa?', back, other(['a pie', 'en autobús', 'en bicicleta', 'en tren'], back)], ['¿Cómo llevan la cesta?', 'llena', ['vacía', 'rota']], ['¿Adónde van?', 'al mercado', ['al colegio', 'al parque', 'a la playa']]] }; },
  c => { const S = [['en otoño', 'el otoño', ['las hojas caen de los árboles', 'los días se hacen más cortos'], ['una chaqueta', 'unas botas'], ['pisar las hojas secas', 'recoger castañas'], ['un vaso de leche caliente', 'una sopa']], ['en invierno', 'el invierno', ['hace mucho frío', 'en la montaña nieva'], ['un abrigo y una bufanda', 'unos guantes y un gorro'], ['hacer muñecos de nieve', 'mirar la lluvia desde la ventana'], ['una taza de chocolate caliente', 'un caldo calentito']], ['en primavera', 'la primavera', ['los campos se llenan de flores', 'a los árboles les salen hojas nuevas'], ['una camiseta de manga larga', 'una chaqueta fina'], ['mirar las mariposas', 'recoger flores'], ['un zumo de naranja', 'un vaso de agua fresca']], ['en verano', 'el verano', ['hace mucho calor', 'los días son muy largos'], ['un bañador', 'una gorra y unas sandalias'], ['nadar en la piscina', 'hacer castillos de arena'], ['un helado de fresa', 'una raja de sandía']]];
    const s = pick(S), w = pick(s[2]), cl = pick(s[3]), act = pick(s[4]), dr = pick(s[5]), o = k => S.filter(x => x !== s).map(x => pick(x[k]));
    return { t: cap(s[1]), x: `${cap(s[0])}, ${w}. ${c.n} se pone ${cl} para salir a la calle. Lo que más le gusta es ${act}. Cuando llega a casa, toma ${dr}.`,
      q: [['¿De qué estación habla el texto?', s[1], S.filter(x => x !== s).map(x => x[1])], [`¿Qué pasa ${s[0]}?`, w, o(2)], [`¿Qué se pone ${c.n} para salir?`, cl, o(3)], ['¿Qué le gusta más?', act, o(4)], ['¿Qué toma cuando llega a casa?', dr, o(5)], ['¿Quién sale a la calle?', c.n, other(ES.names, c.n)]] }; },
  c => { const wi = pick(['su padre', 'su madre', 'su abuelo', 'su abuela']), D = [['una tarta', 'la'], ['un bizcocho', 'lo'], ['unas galletas', 'las'], ['una pizza', 'la']], [dish, obj] = pick(D), time = pick(['media hora', 'veinte minutos', 'un cuarto de hora']), top = pick(['fresas', 'chocolate', 'queso', 'almendras']), meal = pick(['merendar', 'cenar', 'desayunar']);
    return { t: `${c.n} cocina`, x: `${c.n} y ${wi} hacen ${dish} para ${meal}. Primero mezclan la harina con el agua y amasan bien. Después ${obj} meten en el horno ${time}. Cuando ya está todo hecho, ponen ${top} por encima. Toda la casa huele muy bien.`,
      q: [['¿Qué cocinan?', dish, other(['una tarta', 'un bizcocho', 'unas galletas', 'una pizza', 'una sopa'], dish)], [`¿Con quién cocina ${c.n}?`, `con ${wi}`, other(['su padre', 'su madre', 'su abuelo', 'su abuela'], wi).map(x => 'con ' + x)], ['¿Cuánto tiempo está en el horno?', time, other(['media hora', 'veinte minutos', 'un cuarto de hora', 'dos horas'], time)], ['¿Qué ponen por encima?', top, other(['fresas', 'chocolate', 'queso', 'almendras'], top)], ['¿Qué hacen primero?', 'mezclan la harina con el agua', ['lo meten en el horno', 'ponen cosas por encima', 'se lo comen']], ['¿Para cuándo lo hacen?', `para ${meal}`, other(['merendar', 'cenar', 'desayunar', 'comer'], meal).map(x => 'para ' + x)], ['¿Cómo huele la casa?', 'muy bien', ['muy mal', 'a humo']]] }; },
  c => { const sp = pick(['fútbol', 'balonmano', 'hockey']), day = pick(ES.days.slice(0, 5)), col = pick(ES.colors), w = pick(['tres', 'cuatro', 'cinco']), l = pick(['uno', 'dos']), g = pick(['un gol', 'dos goles', 'tres goles']), feel = c.girl ? 'muy contenta' : 'muy contento';
    return { t: `El partido de ${c.n}`, x: `${c.n} juega al ${sp} todos los ${day}. Su equipo lleva una camiseta ${col}. Hoy han ganado ${w} a ${l}. ${c.n} ha marcado ${g} y está ${feel}. Después del partido, todo el equipo merienda en el parque.`,
      q: [[`¿A qué juega ${c.n}?`, `al ${sp}`, other(['fútbol', 'balonmano', 'hockey', 'tenis', 'baloncesto'], sp).map(x => 'al ' + x)], ['¿Qué día juega?', `los ${day}`, other(ES.days, day).map(x => 'los ' + plu(x))], ['¿De qué color es la camiseta?', col, other(ES.colors, col)], [`¿Cuántos goles ha marcado ${c.n}?`, g, other(['un gol', 'dos goles', 'tres goles', 'ningún gol'], g)], ['¿Cómo ha acabado el partido?', 'su equipo ha ganado', ['su equipo ha perdido', 'han empatado']], [`¿Cómo está ${c.n}?`, feel, c.girl ? ['triste', 'enfadada', 'aburrida'] : ['triste', 'enfadado', 'aburrido']], ['¿Qué hacen después del partido?', 'meriendan en el parque', ['se van a dormir', 'vuelven a jugar', 'van al colegio']]] }; },
];

function readQ(L, lang, hint, say) {
  const tx = story(L), it = pick(tx.q);
  return choice(it[0], it[1], it[2], { reading: { t: tx.t, x: tx.x }, lang, hint, explain: say(it[1]) });
}
extend('v1', .7, [{ f: () => readQ(VA, 'ca-ES', 'Torna a llegir el text i busca la resposta.', a => `En el text diu: ${a}.`) }]);
extend('l1', .7, [{ f: () => readQ(ES, 'es-ES', 'Vuelve a leer el texto y busca la respuesta.', a => `En el texto dice: ${a}.`) }]);

window.__mes = { story, VA, ES };

/* ======================= NOMBRES EN VALENCIÀ, DEL 1 AL 100 ======================= */
const VUN = ['zero','u','dos','tres','quatre','cinc','sis','set','huit','nou','deu','onze','dotze','tretze','catorze','quinze','setze','disset','divuit','dinou'];
const VDEC = ['','','vint','trenta','quaranta','cinquanta','seixanta','setanta','huitanta','noranta'];
const paraula = n => { if (n === 100) return 'cent'; if (n < 20) return VUN[n]; const t = Math.floor(n / 10), u = n % 10; return u ? VDEC[t] + (t === 2 ? '-i-' : '-') + VUN[u] : VDEC[t]; };
/* formes que un alumne pot escriure malament: sense la «i», amb espai, o amb una unitat de més/menys */
const formesMalament = n => { const ok = paraula(n), out = new Set([ok.replace(/-i-/g, '-'), ok.replace(/-/g, ' '), ok.replace(/-i-/g, ' i ')]); if (n > 1) out.add(paraula(n - 1)); if (n < 100) out.add(paraula(n + 1)); out.delete(ok); return [...out].slice(0, 3); };
const nDeuN = n => { const t = Math.floor(n / 10), u = n % 10; const us = `${u} ${u === 1 ? 'unitat' : 'unitats'}`; return t ? `${t} ${t === 1 ? 'desena' : 'desenes'} i ${us}` : us; };
const bloc = n => { const t = Math.floor(n / 10), u = n % 10; return `<div class="demo-row">${vDUC(null, t, u)}</div>`; };

extend('m1', .4, [
  /* 1. escoltar i escriure amb xifres */
  { min: 1, f: lv => { const n = R(1, lv === 1 ? 30 : 100); return num('Escolta i escriu el nombre amb xifres.', n, { say: paraula(n), lang: 'ca-ES', rtl: false, hint: 'Els nombres de la dècada van en una paraula: «dèneu» no existeix, és «deu», «onze», «dotze»...', explain: `«${paraula(n)}» és el ${n}: ${nDeuN(n)}.` }); } },
  /* 2. llegir la paraula i escriure la xifra */
  { min: 1, f: lv => { const n = R(1, lv === 1 ? 30 : 100); return num(`Quin nombre és «${paraula(n)}»? Escriu-ho amb xifres.`, n, { rtl: false, say: `${paraula(n)}. Quin nombre és?`, hint: 'Mira les desenes (vint, trenta...) i després les unitats (u, dos, tres...).', explain: `«${paraula(n)}» és el ${n}: ${nDeuN(n)}.` }); } },
  /* 3. quina és la forma ben escrita */
  { min: 2, f: lv => { const n = R(1, 100); const w = formesMalament(n); return choice(`Quina és la forma ben escrita del ${n}?`, paraula(n), w, { say: `Quina és la forma ben escrita del ${n}?`, lang: 'ca-ES', hint: 'Les desenes van amb «-i-» quan hi ha unitats: vint-i-u, trenta-dos...', explain: `${n} s'escriu «${paraula(n)}».` }); } },
  /* 4. escoltar i triar la xifra */
  { min: 1, f: lv => { const n = R(1, lv === 1 ? 30 : 100); const w = [n + 1, n - 1, n + 10].filter(x => x >= 1 && x <= 100 && x !== n); return choice('Escolta i tria el nombre que sents.', String(n), w.slice(0, 3).map(String), { say: paraula(n), lang: 'ca-ES', hint: 'Escolta amb atenció: primer la desena i després la unitat.', explain: `«${paraula(n)}» és el ${n}.` }); } },
  /* 5. escriu el número en lletres: triar la paraula que falta de l'escala */
  { min: 2, f: lv => { const n = R(2, 100); const w = [paraula(n - 1), paraula(n + 1 > 100 ? 99 : n + 1), formesMalament(n)[0]]; return choice(`Quin nombre va just després de «${paraula(n - 1)}»?`, paraula(n), w.filter(x => x !== paraula(n)), { say: `Quin nombre va just després de ${paraula(n - 1)}?`, lang: 'ca-ES', hint: 'Compta: després d\'un ve el següent.', explain: `${n - 1} + 1 = ${n}: «${paraula(n)}».` }); } },
  /* 6. quin nombre va abans */
  { min: 2, f: lv => { const n = R(2, 100); return choice(`Quin nombre va just abans de «${paraula(n)}»?`, paraula(n - 1), [paraula(n + 1 > 100 ? 99 : n + 1), formesMalament(n - 1)[0]].filter(x => x !== paraula(n - 1)), { say: `Quin nombre va just abans de ${paraula(n)}?`, lang: 'ca-ES', hint: 'Abans vol dir un menys.', explain: `${n} − 1 = ${n - 1}: «${paraula(n - 1)}».` }); } },
  /* 7. amb blocs: quin nombre és i com s'escriu */
  { min: 1, f: lv => { const n = R(10, lv === 1 ? 59 : 99); return choice('Quin nombre formen els blocs? Escolta i tria la paraula.', paraula(n), [paraula(n + 10 > 99 ? n - 10 : n + 10), formesMalament(n)[0], paraula(Math.max(1, n - 1))], { visual: bloc(n), say: 'Quin nombre formen els blocs?', lang: 'ca-ES', hint: 'Les barres són desenes: compta-les primer.', explain: `${Math.floor(n / 10)} desenes i ${n % 10} unitats: «${paraula(n)}» (${n}).` }); } },
  /* 8. el 100 */
  { min: 2, f: () => choice('Quin és el nombre que va just després del noranta-nou?', 'cent', ['cent-deu', 'noranta-deu', 'cent-u'], { say: 'Quin és el nombre que va just després del noranta-nou?', lang: 'ca-ES', hint: 'Després del 99 ve el 100, que és ben rodó: cent.', explain: '99 + 1 = 100: «cent».' }) },
]);
})();
