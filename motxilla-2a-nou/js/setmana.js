/* Motxilla 2A · setmana.js
   1) Contrasenya de cada alumne (opcional) per a entrar al seu perfil.
   2) Avaluació setmanal: una prova curta amb preguntes de totes les àrees.
   3) Informe setmanal per a les famílies, per a mirar-lo o imprimir-lo.
   Tot es guarda només en aquest navegador, com la resta de l'app. */

/* ======================= 1. CONTRASENYA DE L'ALUMNE ======================= */
function enterProfile(id) {
  const x = A.profiles.find(q => q.id === id); if (!x) return;
  const inside = () => { A.current = id; save(); go({ name: 'home' }); };
  if (!x.pw) return inside();
  const m = modal(`<h2>Hola, ${esc(x.alias)}!</h2><p>Escriu la teua contrasenya secreta per a entrar.</p>
    <form data-pwform><label class="sr" for="pw-in">Contrasenya</label><input id="pw-in" type="password" autocomplete="off" maxlength="12" required>
    <p class="note" id="pw-msg" role="status" style="min-height:1.4em;margin-top:8px"></p>
    <div class="row" style="margin-top:8px"><button class="btn btn-main" type="submit">Entra</button><button class="btn btn-soft" type="button" data-m="no">Torna</button></div></form>
    <p class="note">No te'n recordes? Demana-ho a casa: a la Zona de famílies es pot canviar.</p>`);
  const inp = m.querySelector('#pw-in'); inp.focus();
  m.addEventListener('click', ev => { if (ev.target.closest('[data-m="no"]')) closeModal(); });
  m.querySelector('form').addEventListener('submit', ev => {
    ev.preventDefault(); ev.stopPropagation();
    if (pwHash(x.id, inp.value) === x.pw) { closeModal(); inside(); }
    else { inp.value = ''; inp.focus(); m.querySelector('#pw-msg').textContent = 'Eixa no és la contrasenya. Torna-ho a provar.'; }
  });
}
/* des de la Zona de famílies: posar, canviar o llevar la contrasenya d'un alumne */
function pwManage(id) {
  const x = A.profiles.find(q => q.id === id); if (!x) return;
  const m = modal(`<h2>Contrasenya de ${esc(x.alias)}</h2><p>${x.pw ? 'Ara té contrasenya. Escriu-ne una de nova, o lleva-la.' : 'Ara entra sense contrasenya. Escriu-ne una si voleu que la demane.'}</p>
    <form data-pwform><label class="sr" for="pw-new">Contrasenya nova</label><input id="pw-new" type="text" autocomplete="off" maxlength="12" placeholder="Contrasenya nova">
    <div class="row" style="margin-top:14px"><button class="btn btn-main" type="submit">Desa</button>${x.pw ? '<button class="btn btn-danger" type="button" data-m="rm">Lleva-la</button>' : ''}<button class="btn btn-soft" type="button" data-m="no">Torna</button></div></form>`);
  const inp = m.querySelector('#pw-new'); inp.focus();
  m.addEventListener('click', ev => {
    const b = ev.target.closest('[data-m]'); if (!b) return; closeModal();
    if (b.dataset.m === 'rm') { delete x.pw; save(); render(); toast(`${x.alias} ja entra sense contrasenya.`); }
  });
  m.querySelector('form').addEventListener('submit', ev => {
    ev.preventDefault(); ev.stopPropagation(); const v = inp.value.trim();
    if (!v) { inp.focus(); return toast('Escriu una contrasenya o toca «Torna».'); }
    x.pw = pwHash(x.id, v); save(); closeModal(); render(); toast(`Contrasenya de ${x.alias} desada.`);
  });
}

/* ======================= 2. AVALUACIÓ SETMANAL ======================= */
const EVAL_PER_AREA = 4;
/* els temes que entren en l'avaluació d'una àrea: els que ja ha treballat; si encara no n'hi ha, els primers */
function evalTopics(p, areaId) {
  const ts = AREA[areaId].topics, seen = ts.filter(t => p && p.skills[t.id] && (p.skills[t.id].sess.length || p.skills[t.id].st === 'mastered' || p.skills[t.id].last));
  return (seen.length >= 2 ? seen : ts.slice(0, 3)).map(t => t.id);
}
function evalQuestions(p, per, lv) {
  const seen = new Set();
  return AREAS.map(a => { const ids = shuffle(evalTopics(p, a.id)); return { area: a.id, qs: Array.from({ length: per }, (_, i) => { const id = ids[i % ids.length]; return { id, q: makeItems(id, lv, 1, seen)[0] }; }) }; });
}
function buildEval(p) {
  const steps = [];
  evalQuestions(p, EVAL_PER_AREA, 2).forEach(g => g.qs.forEach(x => steps.push({ type: 'review', skill: x.id, q: x.q })));
  steps.push({ type: 'end' });
  return { d: today(), i: 0, steps, res: [], fresh: null, ms: 0, practice: true, eval: true };
}
function startEval() { const p = P(); p.run = buildEval(p); save(); tick = Date.now(); Q = null; go({ name: 'run' }); }
/* per a imprimir: una pàgina per àrea */
function evalPaper(n, lv) { const per = Math.max(2, Math.round((n || 20) / AREAS.length)); return evalQuestions(P(), per, lv || 2).map(g => ({ area: g.area, id: g.qs[0].id, qs: g.qs.map(x => x.q) })); }

const pct = (c, a) => a ? Math.round(c / a * 100) : null;
const weekEval = (p, wk) => (p.evals || []).filter(e => e.wk === wk).slice(-1)[0] || null;
function evalCard(p) {
  const e = weekEval(p, monday(today()));
  return `<div class="callout s12 evalcard"><p><b>Avaluació de la setmana.</b> ${e ? `Ja l'has feta: ${e.c} de ${e.a} encertades. Pots repetir-la quan vulgues.` : `${EVAL_PER_AREA * AREAS.length} preguntes de totes les àrees per a veure com vas. Es corregeix al final.`}</p>
    <div><button class="btn btn-main" data-ev="start">${e ? 'Repeteix l\'avaluació' : 'Fes l\'avaluació'}</button></div></div>`;
}
function areaRows(areas) {
  return AREAS.map(a => { const x = areas && areas[a.id], v = x ? pct(x.c, x.a) : null;
    return `<tr><td>${esc(a.name)}</td><td class="r">${x ? `${x.c} de ${x.a}` : '—'}</td><td class="r">${v === null ? '—' : v + ' %'}</td><td class="barcell"><span class="pbar" style="--c:var(--${a.id})"><i style="width:${v || 0}%"></i></span></td></tr>`; }).join('');
}
function evalEnd(p, run) {
  const s = closeRun(p, run), areas = {};
  run.res.forEach(r => { const ar = SKILL[r.skill].area, x = (areas[ar] ||= { a: 0, c: 0 }); x.a++; if (r.ok) x.c++; });
  if (!run.saved) { (p.evals ||= []).push({ d: today(), wk: monday(today()), a: s.a, c: s.c, areas }); if (p.evals.length > 80) p.evals.shift(); run.saved = true; save(); }
  const v = pct(s.c, s.a) || 0;
  return `<section class="qcard wide"><div style="width:100%;text-align:left">
    <div class="qtag"><i></i>Avaluació de la setmana</div>
    <h1 style="margin-top:10px">Avaluació acabada!</h1>
    <div class="facts"><div><b>${s.c} de ${s.a}</b><small>encertades</small></div><div><b>${v} %</b><small>d'encert</small></div><div><b>${s.min}</b><small>${s.min === 1 ? 'minut' : 'minuts'}</small></div></div>
    <p style="font-size:1.15rem">${v >= 85 ? 'Molt bé! Ho portes tot molt ben aprés.' : v >= 60 ? 'Bona faena. Mira baix què convé repassar.' : 'Ho has intentat, i això és el que compta. Repassarem el que ha costat més.'}</p>
    <table class="evt" style="margin-top:14px"><thead><tr><th>Àrea</th><th class="r">Encerts</th><th class="r">%</th><th></th></tr></thead><tbody>${areaRows(areas)}</tbody></table>
    ${s.fix.length ? `<h2 style="font-size:1.1rem;margin-top:22px">Correcció</h2><ul class="fix">${s.fix.map(x => `<li>${esc(x.prompt)}<br>Has dit <s>${esc(x.given)}</s>, la resposta és <b>${esc(x.answer)}</b>. ${esc(x.explain)}</li>`).join('')}</ul>` : '<p style="margin-top:12px">Cap errada!</p>'}
    <div style="margin-top:26px;display:flex;gap:12px;flex-wrap:wrap"><button class="btn btn-main btn-big" data-act="finish">Torna a l'inici</button><button class="btn btn-soft btn-big" data-ev="runpdf">${ico('i-down')}Imprimeix estos exercicis (PDF)</button></div>
  </div></section>`;
}

/* ======================= 3. INFORME SETMANAL PER A LES FAMÍLIES ======================= */
const shortDate = k => { const d = new Date(k + 'T12:00:00'); return `${d.getDate()} ${MONTHS_CA[d.getMonth()]}`; };
function weekData(p, wk) {
  const days = [...Array(7)].map((_, i) => addDays(wk, i)), end = days[6];
  const recs = days.map(k => p.days[k] || null);
  const a = recs.reduce((s, r) => s + (r ? r.a : 0), 0), c = recs.reduce((s, r) => s + (r ? r.c : 0), 0);
  return { wk, days, end, recs, a, c, min: recs.reduce((s, r) => s + (r && r.ms ? Math.max(1, Math.round(r.ms / 60000)) : 0), 0),
    sessions: recs.filter(r => r && r.done).length, active: recs.filter(r => r && (r.a || r.ms > 30000)).length,
    areas: (p.wk || {})[wk] || null, ev: weekEval(p, wk),
    mastered: Object.keys(SKILL).filter(id => p.skills[id] && p.skills[id].st === 'mastered' && p.skills[id].on >= wk && p.skills[id].on <= end),
    errors: p.errors.filter(e => e.d >= wk && e.d <= end) };
}
/* targeta de la Zona de famílies */
function famWeek(p) {
  const w = weekData(p, monday(today())), evs = (p.evals || []).slice(-6).reverse();
  return `<div class="grid ftools">
  <section class="panel s7" aria-labelledby="fw-h"><h2 class="ptitle" id="fw-h">Informe setmanal <span>per a mirar o imprimir</span></h2>
    <div class="kv" style="margin-bottom:14px"><div><b class="num">${w.active}</b><small>dies amb faena</small></div><div><b class="num">${w.min}</b><small>minuts</small></div><div><b class="num">${w.a}</b><small>exercicis</small></div><div><b class="num">${pct(w.c, w.a) === null ? '—' : pct(w.c, w.a) + ' %'}</b><small>encert</small></div></div>
    <div style="display:flex;gap:10px;flex-wrap:wrap"><button class="btn btn-main" data-ev="report">Obri l'informe d'aquesta setmana</button><button class="btn btn-soft" data-ev="report-1">El de la setmana passada</button></div>
    <p class="note" style="margin-top:12px">Resum de la setmana de ${esc(p.alias)}: dies, minuts, encert per àrea, l'avaluació, temes dominats i errades per a repassar.</p>
  </section>
  <section class="panel s5" aria-labelledby="fe-h"><h2 class="ptitle" id="fe-h">Avaluacions setmanals</h2>
    ${evs.length ? `<table><thead><tr><th>Dia</th><th class="r">Encerts</th><th class="r">%</th></tr></thead><tbody>${evs.map(e => `<tr><td>${shortDate(e.d)}</td><td class="r">${e.c} de ${e.a}</td><td class="r">${pct(e.c, e.a)} %</td></tr>`).join('')}</tbody></table>` : `<p class="note">${esc(p.alias)} encara no n'ha fet cap. La troba a la pantalla «Avui».</p>`}
    <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:14px"><button class="btn btn-soft" data-ev="paper">${ico('i-down')}Avaluació en paper</button></div>
  </section></div>`;
}
function vReport() {
  const p = P(); if (!p) return vProfiles();
  const wk = V.wk || monday(today()), w = weekData(p, wk), cur = wk === monday(today()), v = pct(w.c, w.a);
  const dn = ['dl', 'dt', 'dc', 'dj', 'dv', 'ds', 'dg'];
  const weak = AREAS.filter(a => { const x = (w.ev && w.ev.areas[a.id]) || (w.areas && w.areas[a.id]); return x && x.a >= 3 && x.c / x.a < .7; });
  const errs = w.errors.slice(-12).reverse();
  return `<div class="shwrap">
    <div class="shbar noprint">
      <button class="btn btn-soft" data-go="adults">${ico('i-back')}Tornar</button>
      <button class="btn btn-main" data-mk="print">${ico('i-down')}Guarda en PDF o imprimeix</button>
      <button class="btn btn-soft" data-ev="wk-1">Setmana anterior</button>
      ${cur ? '' : '<button class="btn btn-soft" data-ev="wk+1">Setmana següent</button>'}
      <p class="note">Al quadre d'impressió, tria «Guardar com a PDF» com a impressora.</p>
    </div>
    <article class="sheet rep"><section class="shpage">
      <header class="shhead"><b>Motxilla 2A</b><span>Informe setmanal</span></header>
      <h1>${esc(p.alias)}</h1><p class="sub">Setmana del ${shortDate(wk)} al ${shortDate(w.end)}</p>
      <div class="repfacts"><div><b>${w.active}</b><small>dies amb faena</small></div><div><b>${w.sessions}</b><small>sessions completes</small></div><div><b>${w.min}</b><small>minuts</small></div><div><b>${w.a}</b><small>exercicis fets</small></div><div><b>${v === null ? '—' : v + ' %'}</b><small>encert a la primera</small></div></div>
      <h2>Dia a dia</h2>
      <table><thead><tr>${w.days.map((k, i) => `<th class="r">${dn[i]} ${new Date(k + 'T12:00:00').getDate()}</th>`).join('')}</tr></thead><tbody>
        <tr>${w.recs.map(r => `<td class="r">${r && r.ms ? Math.max(1, Math.round(r.ms / 60000)) + ' min' : '—'}</td>`).join('')}</tr>
        <tr>${w.recs.map(r => `<td class="r">${r && r.a ? `${r.c}/${r.a}` : '—'}</td>`).join('')}</tr></tbody></table>
      <p class="note">Dalt, minuts de cada dia. Baix, respostes encertades sobre les fetes.</p>
      <h2>Per àrees</h2>
      ${w.areas ? `<table><thead><tr><th>Àrea</th><th class="r">Encerts</th><th class="r">%</th><th></th></tr></thead><tbody>${areaRows(w.areas)}</tbody></table>` : '<p class="note">No hi ha exercicis apuntats per àrea en aquesta setmana.</p>'}
      <h2>Avaluació de la setmana</h2>
      ${w.ev ? `<p>Feta el ${shortDate(w.ev.d)}: <b>${w.ev.c} de ${w.ev.a}</b> (${pct(w.ev.c, w.ev.a)} %).</p><table><thead><tr><th>Àrea</th><th class="r">Encerts</th><th class="r">%</th><th></th></tr></thead><tbody>${areaRows(w.ev.areas)}</tbody></table>` : '<p class="note">No s\'ha fet l\'avaluació en aquesta setmana.</p>'}
      <h2>Temes dominats aquesta setmana</h2>
      ${w.mastered.length ? `<p>${w.mastered.map(id => esc(SKILL[id].t)).join(' · ')}</p>` : '<p class="note">Cap de nou.</p>'}
      <h2>Què convé repassar</h2>
      ${weak.length ? `<p>Han costat més: <b>${weak.map(a => esc(a.name)).join(', ')}</b>. Al mapa es pot practicar qualsevol tema, i a «Fitxes en PDF» es poden imprimir exercicis.</p>` : '<p class="note">Res a destacar amb les dades d\'aquesta setmana.</p>'}
      ${errs.length ? `<h2>Errades de la setmana</h2><ul class="fix">${errs.map(e => `<li><b>${esc(SKILL[e.s] ? SKILL[e.s].t : '')}</b>: ${esc(e.q)}<br>Va dir <s>${esc(e.g)}</s>, la resposta era <b>${esc(e.a)}</b>.</li>`).join('')}</ul>` : ''}
    </section></article></div>`;
}

/* ======================= 4. ELS EXERCICIS QUE ACABA DE FER, EN PDF ======================= */
function runSheet() {
  const p = P(), run = p && p.run; if (!run) return;
  const items = [], by = {};
  run.steps.forEach((s, i) => { if (!s.q || !s.skill) return; const r = run.res.find(x => x.i === i);
    const q = { ...s.q, ...(r ? { given: r.given == null ? '—' : String(r.given), ok: r.ok } : {}) };
    if (!by[s.skill]) { by[s.skill] = { id: s.skill, tag: '', qs: [] }; items.push(by[s.skill]); } by[s.skill].qs.push(q); });
  if (!items.length) return toast('En esta sessió no hi ha exercicis per a imprimir.');
  go({ name: 'sheet', S: { skill: 'run', items, fixed: true, learn: false, sol: true, named: true, n: 0, lv: 2, back: 'run' } });
}

document.addEventListener('click', e => {
  const pw = e.target.closest('[data-pwp]'); if (pw) return pwManage(pw.dataset.pwp);
  const b = e.target.closest('[data-ev]'); if (!b) return;
  const k = b.dataset.ev;
  if (k === 'start') return startEval();
  if (k === 'runpdf') return runSheet();
  if (k === 'report') return go({ name: 'report', wk: monday(today()) });
  if (k === 'report-1') return go({ name: 'report', wk: addDays(monday(today()), -7) });
  if (k === 'wk-1') return go({ name: 'report', wk: addDays(V.wk || monday(today()), -7) });
  if (k === 'wk+1') return go({ name: 'report', wk: addDays(V.wk || monday(today()), 7) });
  if (k === 'paper') return go({ name: 'sheet', S: { skill: 'eval', n: 20, lv: 2, sol: true, back: 'adults' } });
});
