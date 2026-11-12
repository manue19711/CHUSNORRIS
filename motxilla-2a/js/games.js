/* Zona de jocs, la mascota Motxi, el confeti i els sons.
   Tot funciona sense connexió i sense guardar res fora d'aquest navegador. */

/* ---------- Motxi, la motxilla ---------- */
function motxi(mood = 'happy') {
  const mouth = {
    happy: '<path d="M50 66q10 11 20 0z" fill="#1b2559"/>',
    wow: '<ellipse cx="60" cy="70" rx="5.5" ry="6.5" fill="#1b2559"/>',
    think: '<path d="M53 70q7-4 14 0" fill="none" stroke="#1b2559" stroke-width="4" stroke-linecap="round"/>'
  }[mood] || '';
  return `<svg class="motxi" viewBox="0 0 120 124" aria-hidden="true">
  <path d="M44 28v-8a16 16 0 0 1 32 0v8" fill="none" stroke="#1b2559" stroke-width="7" stroke-linecap="round"/>
  <rect x="34" y="111" width="18" height="11" rx="5.5" fill="#1b2559"/><rect x="68" y="111" width="18" height="11" rx="5.5" fill="#1b2559"/>
  <rect x="16" y="24" width="88" height="92" rx="30" fill="#ff5a4e"/>
  <rect x="32" y="80" width="56" height="26" rx="12" fill="#ffc93c"/><rect x="54" y="76" width="12" height="10" rx="4" fill="#1b2559"/>
  <circle cx="33" cy="66" r="5" fill="#ff9a8f"/><circle cx="87" cy="66" r="5" fill="#ff9a8f"/>
  <g class="eyes"><circle cx="46" cy="50" r="11" fill="#fff"/><circle cx="74" cy="50" r="11" fill="#fff"/><circle cx="48" cy="52" r="5" fill="#1b2559"/><circle cx="76" cy="52" r="5" fill="#1b2559"/></g>
  ${mouth}</svg>`;
}

/* ---------- sons curts (es poden apagar a Famílies) ---------- */
let AC = null;
function beep(kind) {
  const p = P(); if (p && p.settings.sound === false) return;
  try {
    AC = AC || new (window.AudioContext || window.webkitAudioContext)();
    const seq = { ok: [660, 880], no: [233, 196], pop: [523, 784, 1047], win: [523, 659, 784, 1047], tap: [494] }[kind] || [440];
    seq.forEach((f, i) => {
      const o = AC.createOscillator(), g = AC.createGain(), t = AC.currentTime + i * .09;
      o.type = kind === 'no' ? 'triangle' : 'sine'; o.frequency.value = f;
      g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(.16, t + .02); g.gain.exponentialRampToValueAtTime(.0001, t + .17);
      o.connect(g); g.connect(AC.destination); o.start(t); o.stop(t + .2);
    });
  } catch (e) { /* sense so */ }
}

/* ---------- confeti ---------- */
function confetti(n = 26) {
  if (matchMedia('(prefers-reduced-motion:reduce)').matches) return;
  const w = document.createElement('div'); w.className = 'confetti'; w.setAttribute('aria-hidden', 'true');
  const cols = ['var(--mat)', 'var(--val)', 'var(--med)', 'var(--cas)', 'var(--eng)'];
  for (let i = 0; i < n; i++) {
    const c = document.createElement('i');
    c.style.cssText = `left:${R(2, 98)}%;background:${cols[i % cols.length]};--dx:${R(-90, 90)}px;--rot:${R(-540, 540)}deg;animation-delay:${R(0, 280)}ms;${i % 3 ? '' : 'border-radius:50%;height:12px'}`;
    w.appendChild(c);
  }
  document.body.appendChild(w); setTimeout(() => w.remove(), 2100);
}

/* ---------- els jocs ---------- */
const GAMES = [
  { id: 'blocs', t: 'Construeix el nombre', s: 'Fes el nombre amb barres de 10 i quadradets.', c: 'val', n: 6 },
  { id: 'globus', t: 'Explota el globus', s: 'Sumes en línia i en columna: tria el globus bo.', c: 'mat', n: 8 },
  { id: 'tren', t: 'El tren dels nombres', s: 'Enganxa els vagons del més xicotet al més gran.', c: 'med', n: 5 },
  { id: 'parelles', t: 'Parelles de blocs', s: 'Uneix cada nombre amb els seus blocs.', c: 'cas', n: 6 },
  { id: 'sopa', t: 'Sopa de lletres', s: 'Troba les paraules amagades en valencià, castellà i anglés.', c: 'eng', n: 3 },
  { id: 'creuats', t: 'Mots encreuats', s: 'Mira el dibuix i escriu la paraula a les caselles.', c: 'val', n: 3 }
];
const GAME = Object.fromEntries(GAMES.map(g => [g.id, g]));
const best = (p, id) => (p.best || {})[id];

function gameArt(id) {
  if (id === 'blocs') return vBlocks(2, 4, { sm: 1, lbl: false });
  if (id === 'globus') return `<svg viewBox="0 0 150 100" aria-hidden="true">${[[30, 44, 'var(--cas)', 7], [75, 34, '#fff', 12], [120, 48, 'var(--val)', 9]].map(([x, y, c, n]) => `<path d="M${x} ${y + 24}q-6 14 2 28" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><ellipse cx="${x}" cy="${y}" rx="21" ry="25" fill="${c}"/><text x="${x}" y="${y + 8}" text-anchor="middle" font-size="22" font-weight="700" fill="#1b2559" font-family="Fredoka,sans-serif">${n}</text>`).join('')}</svg>`;
  if (id === 'tren') return `<svg viewBox="0 0 170 80" aria-hidden="true"><rect x="4" y="14" width="46" height="44" rx="10" fill="#1b2559"/><rect x="14" y="22" width="18" height="16" rx="4" fill="#fff"/>${[[58, 12], [98, 35], [138, 71]].map(([x, n]) => `<rect x="${x}" y="24" width="34" height="34" rx="8" fill="#fff"/><text x="${x + 17}" y="48" text-anchor="middle" font-size="18" font-weight="700" fill="#1b2559" font-family="Fredoka,sans-serif">${n}</text>`).join('')}${[16, 38, 68, 82, 108, 122, 148, 162].map(x => `<circle cx="${x}" cy="64" r="8" fill="var(--cas)"/>`).join('')}</svg>`;
  if (id === 'creuats') return `<div class="art-sopa" aria-hidden="true">${[...' G SOL S '].map((ch, i) => `<i class="${ch === ' ' ? 'no' : i % 3 === 1 ? 'on' : ''}">${ch}</i>`).join('')}</div>`;
  if (id === 'sopa') return `<div class="art-sopa" aria-hidden="true">${[...'SOLMGATAR'].map((ch, i) => `<i class="${i > 2 && i < 6 ? 'on' : ''}">${ch}</i>`).join('')}</div>`;
  return `<div class="art-cards"><span>34</span><span>${vBlocks(3, 4, { sm: 1, lbl: false })}</span></div>`;
}

function vGames() {
  const p = P();
  return shell('games', `
  <header class="hello mx"><span class="mxbox">${motxi('wow')}</span><div><h1>Zona de jocs</h1><p>Tria un joc. Cada partida és curta: juga, somriu i torna quan vulgues.</p></div></header>
  <div class="gtiles">${GAMES.map(g => `
    <button class="gtile" style="${cvars(g.c)}" data-game="${g.id}">
      <span class="art">${gameArt(g.id)}</span>
      <b>${esc(g.t)}</b><span>${esc(g.s)}</span>
      <small>${best(p, g.id) != null ? `El teu millor resultat: ${best(p, g.id)} de ${g.n}` : 'Encara no hi has jugat'}</small>
    </button>`).join('')}</div>`);
}

function startGame(id) { const J = { id, r: 0, n: GAME[id].n, score: 0 }; newRound(J); go({ name: 'play', J }); }
function newRound(J) {
  J.miss = false; J.lock = false; J.msg = '';
  if (J.id === 'blocs') { J.target = R(11, 99); J.d = 0; J.u = 0; }
  else if (J.id === 'globus') {
    let a, b;
    if (J.r < 3) { a = R(2, 9); b = R(2, 9); } else if (J.r < 6) { a = R(11, 60); b = R(2, 9); } else { a = R(12, 55); b = R(11, 99 - a); }
    J.a = a; J.b = b; J.vert = J.r % 2 === 1;
    J.opts = shuffle([a + b, ...near(a + b, a + b < 20 ? 4 : 11, 1)]);
  }
  else if (J.id === 'tren') { const s = new Set(); const top = J.r < 2 ? 30 : J.r < 4 ? 99 : 500; while (s.size < 5) s.add(R(1, top)); J.yard = [...s]; J.done = []; }
  else if (J.id === 'creuats') { J.C = makeCross(SOPA_AREAS[J.r % 3], null, J.r < 1 ? 4 : 5); }
  else if (J.id === 'sopa') { J.S = makeSopa(SOPA_AREAS[J.r % 3], null, J.r < 1 ? 5 : 6); }
  else { const s = new Set(); while (s.size < 6) s.add(R(11, 59)); J.cards = shuffle([...s].flatMap(n => [{ k: n, b: false }, { k: n, b: true }])); J.up = []; J.ok = []; J.moves = 0; }
}

function vPlay() {
  const J = V.J, g = GAME[J.id], p = P();
  const bar = `<div class="runbar" style="${cvars(g.c)}"><button class="exit" data-go="games">${ico('i-x')}<span>Surt</span></button>
    <div class="route" aria-hidden="true"><span class="leg" style="--w:1"><i style="width:${(J.over ? J.n : J.r) / J.n * 100}%"></i></span></div><span class="stage">${esc(g.t)}</span></div>`;
  let body;
  if (J.over) {
    const top = J.id === 'parelles' ? `Totes les parelles en ${J.moves} intents!` : `${J.score} de ${J.n} a la primera!`;
    body = `<section class="qcard game" style="${cvars(g.c)}"><span class="mxbox big">${motxi(J.score >= J.n / 2 ? 'happy' : 'wow')}</span>
      <h1 class="prompt">${top}</h1><p class="glead">${J.score === J.n ? 'Partida perfecta. Ets una màquina!' : J.score >= J.n / 2 ? 'Molt bé! Cada partida et fa més fort.' : 'Bona partida. La pròxima eixirà millor.'}</p>
      <div class="grow-btns"><button class="btn btn-main btn-big" data-j="again">Torna a jugar</button><button class="btn btn-soft btn-big" data-go="games">Més jocs</button></div></section>`;
  }
  else if (J.id === 'blocs') {
    const have = J.d * 10 + J.u;
    body = `<section class="qcard game" style="${cvars(g.c)}">
      <p class="prompt">Construeix el nombre <b class="target">${J.target}</b></p>
      <div class="work">${vBlocks(J.d, J.u)}</div>
      <div class="steppers">
        <div class="stepper d"><button data-j="d-" aria-label="Lleva una barra" ${J.d ? '' : 'disabled'}>−</button><span><i class="bar mini">${'<b></b>'.repeat(10)}</i>Barra de 10</span><button data-j="d+" aria-label="Posa una barra de deu" ${J.d < 9 ? '' : 'disabled'}>+</button></div>
        <div class="stepper u"><button data-j="u-" aria-label="Lleva un quadradet" ${J.u ? '' : 'disabled'}>−</button><span><i class="cube"></i>Quadradet</span><button data-j="u+" aria-label="Posa un quadradet">+</button></div>
      </div>
      <button class="btn btn-main btn-big" data-j="check" ${have ? '' : 'disabled'}>Comprova</button>
      <div id="fb" class="fbwrap" aria-live="polite">${J.msg}</div></section>`;
  }
  else if (J.id === 'globus') {
    const cols = ['var(--cas)', 'var(--val)', 'var(--med)', 'var(--mat)'];
    body = `<section class="qcard game" style="${cvars(g.c)}">
      <p class="prompt">Quin globus té el resultat?</p>
      ${J.vert ? vColumns(J.a, J.b, '+').replace(' id="ans"', '') : vRow(J.a, J.b, '+').replace(' id="ans"', '')}
      <div class="balloons">${J.opts.map((o, i) => `<button class="balloon" style="--bc:${cols[i % 4]};--d:${i * -0.7}s" data-j="pop" data-v="${o}"><span>${o}</span></button>`).join('')}</div>
      <div id="fb" class="fbwrap" aria-live="polite"></div></section>`;
  }
  else if (J.id === 'tren') {
    body = `<section class="qcard game" style="${cvars(g.c)}">
      <p class="prompt">Toca els vagons del més xicotet al més gran</p>
      <div class="track"><span class="loco" aria-hidden="true"><i></i></span>${J.done.map(n => `<span class="wagon on">${n}</span>`).join('')}${J.yard.map(() => '<span class="wagon slot" aria-hidden="true"></span>').join('')}</div>
      <div class="yard">${J.yard.map(n => `<button class="wagon" data-j="wagon" data-v="${n}">${n}</button>`).join('')}</div>
      <div id="fb" class="fbwrap" aria-live="polite">${J.msg}</div></section>`;
  }
  else if (J.id === 'creuats') {
    const C = J.C, X = CROSS_TXT[C.lang];
    body = `<section class="qcard game" style="${cvars(C.lang)}">
      <div class="qtag"><i></i>${X.t} · ${esc(AREA[C.lang].short)}</div>
      <p class="prompt">${X.p}</p>
      <p class="glead">${X.h}</p>
      ${crossHtml(C)}
      <div id="fb" class="fbwrap" aria-live="polite"></div>
      <div class="grow-btns"><button class="hintbtn" data-cx="hint">${X.hint}</button></div></section>`;
  }
  else if (J.id === 'sopa') {
    const S = J.S, X = SOPA_TXT[S.lang];
    body = `<section class="qcard game" style="${cvars(S.lang)}">
      <div class="qtag"><i></i>${X.t} · ${esc(AREA[S.lang].short)}</div>
      <p class="prompt">${X.p(S.words.length)}</p>
      <p class="glead">${X.h}</p>
      ${sopaHtml(S)}
      <div id="fb" class="fbwrap" aria-live="polite"></div>
      <div class="grow-btns"><button class="hintbtn" data-sopa="hint">${X.hint}</button></div></section>`;
  }
  else {
    body = `<section class="qcard game" style="${cvars(g.c)}">
      <p class="prompt">Uneix cada nombre amb els seus blocs</p>
      <div class="pairs">${J.cards.map((c, i) => { const ok = J.ok.includes(i), up = ok || J.up.includes(i); return `<button class="pcardx ${ok ? 'ok' : up ? 'up' : ''}" data-j="pair" data-v="${i}" aria-label="${up ? (c.b ? 'Blocs del ' : 'Nombre ') + c.k : 'Carta tapada'}" ${ok ? 'disabled' : ''}>${up ? (c.b ? vBlocks(Math.floor(c.k / 10), c.k % 10, { sm: 1, lbl: false }) : `<b>${c.k}</b>`) : `<span class="back">${motxi('happy')}</span>`}</button>`; }).join('')}</div>
      <p class="glead">Intents: ${J.moves}</p></section>`;
  }
  return `<div class="run">${bar}<main class="runbody" id="main">${body}</main></div>`;
}

function fbHtml(kind, strong, text) { return `<div class="fb ${kind}"><strong>${strong}</strong>${text ? `<span>${text}</span>` : ''}</div>`; }
function roundWon(J, delay = 1100) {
  if (!J.miss) J.score++;
  J.lock = true; beep('ok'); confetti(14);
  setTimeout(() => { if (V.J !== J) return; J.r++; if (J.r >= J.n) endGame(J); else newRound(J); render(); }, delay);
}
function endGame(J) {
  J.over = true; const p = P(); p.best = p.best || {};
  if (p.best[J.id] == null || J.score > p.best[J.id]) p.best[J.id] = J.score;
  p.games++; save(); beep('win'); confetti(40);
}

document.addEventListener('click', e => {
  const it = e.target.closest('[data-intro]');
  if (it) { const k = it.dataset.intro, n = INTRO.length, s = V.step || 0; beep('tap');
    if (k === 'skip' || (k === 'next' && s >= n - 1)) return go({ name: 'new' });
    return go({ name: 'intro', step: k === 'back' ? Math.max(0, s - 1) : k === 'next' ? s + 1 : +k }); }
  const el = e.target.closest('[data-j],[data-game]'); if (!el) return;
  if (el.dataset.game) return startGame(el.dataset.game);
  const J = V.J; if (!J) return; const a = el.dataset.j, v = Number(el.dataset.v);
  if (a === 'again') return startGame(J.id);
  if (J.lock) return;

  if (J.id === 'blocs') {
    J.msg = '';
    if (a === 'd+' && J.d < 9) { J.d++; beep('tap'); }
    else if (a === 'd-' && J.d) J.d--;
    else if (a === 'u-' && J.u) J.u--;
    else if (a === 'u+') {
      J.u++; beep('tap');
      if (J.u === 10) { if (J.d < 9) { J.u = 0; J.d++; J.msg = fbHtml('hint', '10 quadradets fan 1 barra!', 'Els he canviat per una barra de 10.'); beep('pop'); } else J.u = 9; }
    }
    else if (a === 'check') {
      const have = J.d * 10 + J.u;
      if (have === J.target) { J.msg = fbHtml('good', J.miss ? 'Ara sí!' : 'Perfecte!', `${J.d} ${J.d === 1 ? 'barra' : 'barres'} i ${J.u} ${J.u === 1 ? 'quadradet' : 'quadradets'} fan ${J.target}.`); render(); return roundWon(J, 1700); }
      J.miss = true; beep('no');
      J.msg = fbHtml('hint', `Ara tens ${have}.`, have < J.target ? `En falten per a arribar a ${J.target}. Mira primer les desenes: en necessites ${Math.floor(J.target / 10)}.` : `En sobren per a fer ${J.target}. Mira primer les desenes: en necessites ${Math.floor(J.target / 10)}.`);
    }
    render(); const f = $(`[data-j="${a}"]`); if (f && !f.disabled) f.focus(); return;
  }

  if (J.id === 'globus' && a === 'pop') {
    if (v === J.a + J.b) { el.classList.add('pop'); $$('.balloon').forEach(b => b.disabled = true); $('#fb').innerHTML = fbHtml('good', J.miss ? 'Ara sí!' : 'Pum! Correcte.', `${J.a} + ${J.b} = ${J.a + J.b}`); beep('pop'); return roundWon(J, 1300); }
    J.miss = true; el.classList.add('away'); el.disabled = true; beep('no');
    $('#fb').innerHTML = fbHtml('hint', 'Eixe no. Prova un altre globus.', J.a > 9 || J.b > 9 ? 'Suma primer les unitats i després les desenes.' : 'Compta amb els dits si et cal.');
    return;
  }

  if (J.id === 'tren' && a === 'wagon') {
    if (v === Math.min(...J.yard)) {
      J.yard = J.yard.filter(n => n !== v); J.done.push(v); J.msg = ''; beep('tap');
      if (!J.yard.length) { J.msg = fbHtml('good', J.miss ? 'Tren complet!' : 'Tren perfecte!', J.done.join(' < ')); render(); return roundWon(J, 1600); }
      return render();
    }
    J.miss = true; beep('no'); el.classList.remove('shake'); void el.offsetWidth; el.classList.add('shake');
    $('#fb').innerHTML = fbHtml('hint', `El ${v} encara no.`, 'Busca el nombre més xicotet dels que queden. Mira primer les desenes.');
    return;
  }

  if (J.id === 'parelles' && a === 'pair') {
    if (J.up.length === 2 || J.up.includes(v) || J.ok.includes(v)) return;
    J.up.push(v); beep('tap'); render();
    if (J.up.length === 2) {
      J.moves++; const [x, y] = J.up, same = J.cards[x].k === J.cards[y].k;
      setTimeout(() => {
        if (V.J !== J) return;
        if (same) { J.ok.push(x, y); beep('ok'); } J.up = [];
        if (J.ok.length === J.cards.length) { J.score = Math.max(1, Math.min(J.n, J.n - Math.max(0, J.moves - 8))); endGame(J); }
        render();
      }, same ? 450 : 1100);
    }
  }
});

/* ---------- arribada des de la portada: la cortina roja s'obri i apareix l'app ---------- */
(function () {
  let on = false; try { on = sessionStorage.getItem('mx-enter') === '1'; sessionStorage.removeItem('mx-enter'); } catch (e) { /* res */ }
  if (!on || matchMedia('(prefers-reduced-motion:reduce)').matches) return;
  const c = document.createElement('div'); c.className = 'arrive'; c.setAttribute('aria-hidden', 'true'); c.innerHTML = '<span>' + motxi('happy') + '</span>';
  document.body.appendChild(c); setTimeout(() => c.remove(), 1500);
})();

/* ---------- com funciona: s'explica en entrar, abans d'apuntar-se ---------- */
const INTRO = [
  { c: 'cas', t: 'Hola! Sóc Motxi', p: 'Vinc amb tu cada dia. Farem una sessió curta, de 10 a 15 minuts, i després a jugar.', art: () => '<span class="mxbox big">' + motxi('happy') + '</span>' },
  { c: 'mat', t: 'Cinc passos i prou', p: 'Cada sessió té cinc parts. Quan s\'acaba, s\'acaba: demà n\'hi ha una altra.', art: () => '<ol class="isteps">' + [['Escalfem', 'Repassem el que ja saps'], ['Aprenc', 'Una cosa nova'], ['Exemple', 'Mirem com es fa'], ['Practique', 'Ara tu, amb pistes'], ['Refugi', 'Estrelles i segells']].map(x => '<li><b>' + x[0] + '</b><span>' + x[1] + '</span></li>').join('') + '</ol>' },
  { c: 'val', t: 'Barres i quadradets', p: 'Cada barra val 10: són les desenes. Cada quadradet val 1: són les unitats.', art: () => '<div class="demo-row">' + vBlocks(4, 7) + '<b class="eq">= 47</b></div>' },
  { c: 'med', t: 'Sumes de dues maneres', p: 'La mateixa suma, en línia i en columna. El resultat és el mateix!', art: () => '<div class="demo-row">' + solvedVis(vRow(38, 25, '+'), '63') + solvedVis(vColumns(38, 25, '+'), '63') + '</div>' },
  { c: 'eng', t: 'I sis jocs!', p: 'Construeix nombres, explota globus, enganxa vagons, troba parelles i resol sopes de lletres i mots encreuats. Guanyaràs estrelles i segells.', art: () => '<div class="igames">' + GAMES.map(x => '<span style="--c:var(--' + x.c + ')">' + gameArt(x.id) + '</span>').join('') + '</div>' }
];
function vIntro() {
  const s = Math.min(V.step || 0, INTRO.length - 1), x = INTRO[s], last = s === INTRO.length - 1;
  return `<div class="center"><section class="intro" style="${cvars(x.c)}" aria-labelledby="in-h">
    <div class="iart">${x.art()}</div>
    <h1 id="in-h">${x.t}</h1><p>${x.p}</p>
    <div class="idots" role="group" aria-label="Pas ${s + 1} de ${INTRO.length}">${INTRO.map((_, i) => `<button data-intro="${i}" aria-label="Pas ${i + 1}" ${i === s ? 'aria-current="step"' : ''}></button>`).join('')}</div>
    <div class="ibtns">${s ? `<button class="btn btn-soft" data-intro="back">Arrere</button>` : ''}<button class="btn btn-main btn-big" data-intro="next">${last ? "Apunta't!" : 'Següent'}</button></div>
    ${last ? '' : `<button class="btn-text" data-intro="skip">Salta l'explicació</button>`}
  </section></div>`;
}

/* ---------- sopa de lletres (valencià, castellà i anglés) ----------
   Es fa servir dins la sessió (pas «sopa») i a la Zona de jocs.
   Paraules sense accents, en horitzontal (d'esquerra a dreta) i en vertical (de dalt a baix). */
const SOPA_WORDS = {
  val: [
    ['GAT', 'GOS', 'CAVALL', 'CONILL', 'PEIX', 'VACA', 'OCELL', 'RATA', 'GALLINA', 'FORMIGA', 'TORTUGA', 'ABELLA'],
    ['LLAPIS', 'GOMA', 'LLIBRE', 'TAULA', 'CADIRA', 'PISSARRA', 'MESTRA', 'PATI', 'CLASSE', 'MOTXILLA', 'REGLE', 'TISORES'],
    ['POMA', 'PERA', 'TARONJA', 'FORMATGE', 'LLET', 'TOMACA', 'MEL', 'SOPA', 'COCA', 'FIGA', 'OLIVA', 'PEIX'],
    ['SOL', 'LLUNA', 'MAR', 'RIU', 'MUNTANYA', 'ARBRE', 'FLOR', 'FULLA', 'PLUJA', 'VENT', 'NEU', 'ESTEL'],
    ['CAP', 'BRAÇ', 'CAMA', 'PEU', 'NAS', 'BOCA', 'ULL', 'ORELLA', 'DIT', 'GENOLL', 'COLL', 'ESQUENA'],
    ['CASA', 'PORTA', 'FINESTRA', 'LLIT', 'CUINA', 'CLAU', 'ESPILL', 'TERRAT', 'CARRER', 'PLAÇA', 'POBLE', 'ESCALA']
  ],
  cas: [
    ['GATO', 'PERRO', 'CABALLO', 'CONEJO', 'VACA', 'OVEJA', 'GALLINA', 'PATO', 'RANA', 'TORTUGA', 'HORMIGA', 'ABEJA'],
    ['LIBRO', 'GOMA', 'MESA', 'SILLA', 'PIZARRA', 'MAESTRA', 'PATIO', 'CLASE', 'MOCHILA', 'REGLA', 'TIJERAS', 'CUADERNO'],
    ['MANZANA', 'PERA', 'NARANJA', 'QUESO', 'LECHE', 'PAN', 'TOMATE', 'ARROZ', 'HUEVO', 'SOPA', 'UVA', 'FRESA'],
    ['SOL', 'LUNA', 'MAR', 'MONTAÑA', 'FLOR', 'HOJA', 'LLUVIA', 'VIENTO', 'NIEVE', 'ESTRELLA', 'NUBE', 'BOSQUE'],
    ['CABEZA', 'BRAZO', 'MANO', 'PIERNA', 'PIE', 'NARIZ', 'BOCA', 'OJO', 'OREJA', 'DEDO', 'RODILLA', 'CUELLO'],
    ['CASA', 'PUERTA', 'VENTANA', 'CAMA', 'COCINA', 'LLAVE', 'ESPEJO', 'TEJADO', 'CALLE', 'PLAZA', 'PUEBLO', 'ESCALERA']
  ]
};
const SOPA_FILL = {
  val: 'AAAEEEIIOOUUBCDFGLLMNPRRSSTTVX',
  cas: 'AAAEEEIIOOUUBCDGLLMNÑPRRSSTTVZ',
  eng: 'AAEEEIIOOUBCDFGHKLMNPRRSSTTWY'
};
const SOPA_TXT = {
  val: { t: 'Sopa de lletres', p: n => `Troba les ${n} paraules amagades`, h: 'Toca la primera lletra i després l\'última, o arrossega el dit per damunt de la paraula.', ok: 'Les has trobades totes!', hint: 'Vull una pista', skip: 'Salta la sopa', go: 'Continua', hmsg: 'Mira la lletra que parpelleja: la paraula comença ací.' },
  cas: { t: 'Sopa de letras', p: n => `Encuentra las ${n} palabras escondidas`, h: 'Toca la primera letra y después la última, o arrastra el dedo por encima de la palabra.', ok: '¡Las has encontrado todas!', hint: 'Quiero una pista', skip: 'Saltar la sopa', go: 'Continúa', hmsg: 'Mira la letra que parpadea: la palabra empieza ahí.' },
  eng: { t: 'Word search', p: n => `Find the ${n} hidden words`, h: 'Toca la primera lletra i després l\'última, o arrossega el dit per damunt de la paraula.', ok: 'Well done! Les has trobades totes!', hint: 'Vull una pista', skip: 'Salta la sopa', go: 'Continua', hmsg: 'Mira la lletra que parpelleja: la paraula comença ací.' }
};
const SOPA_AREAS = ['val', 'cas', 'eng'];

/* paraules per a una sopa: en anglés, el vocabulari del tema (amb el dibuix) */
function sopaWords(lang, skillId) {
  if (lang === 'eng') {
    const ok = v => /^[A-Za-z]{3,8}$/.test(v[1]);
    let V0 = ((LANG_ALL[skillId] && LANG_ALL[skillId].vocab) || []).filter(ok);
    if (V0.length < 5) V0 = Object.values(LANG_ALL).filter(t => t.subj === 'eng').flatMap(t => t.vocab || []).filter(ok);
    const seen = new Set();
    return shuffle(V0).filter(v => { const w = v[1].toUpperCase(); if (seen.has(w)) return false; seen.add(w); return true; }).map(v => ({ w: v[1].toUpperCase(), e: v[0] }));
  }
  return shuffle(pick(SOPA_WORDS[lang])).map(w => ({ w }));
}
function makeSopa(lang, skillId, nWords = 5, n = 8) {
  const pool = sopaWords(lang, skillId).filter(x => x.w.length <= n);
  for (let attempt = 0; attempt < 40; attempt++) {
    const g = Array(n * n).fill(''), words = [];
    for (const it of pool) {
      if (words.length >= nWords) break;
      const w = [...it.w];
      for (let k = 0; k < 60; k++) {
        const vert = Math.random() < .5;
        const r = R(0, vert ? n - w.length : n - 1), c = R(0, vert ? n - 1 : n - w.length);
        const cells = w.map((_, i) => vert ? (r + i) * n + c : r * n + c + i);
        if (!cells.every((x, i) => g[x] === '' || g[x] === w[i])) continue;
        if (cells.every(x => g[x] !== '')) continue;   /* no amagada dins d'una altra */
        cells.forEach((x, i) => g[x] = w[i]);
        words.push({ w: it.w, e: it.e || '', cells, found: false });
        break;
      }
    }
    if (words.length < Math.min(nWords, pool.length)) continue;
    const F = SOPA_FILL[lang];
    for (let i = 0; i < g.length; i++) if (!g[i]) g[i] = F[R(0, F.length - 1)];
    return { lang, n, g, words, sel: null, hints: 0 };
  }
  return null;
}
function sopaLine(a, b, n) {
  const ra = Math.floor(a / n), ca = a % n, rb = Math.floor(b / n), cb = b % n;
  if (ra !== rb && ca !== cb) return null;
  const len = Math.max(Math.abs(rb - ra), Math.abs(cb - ca)), dr = Math.sign(rb - ra), dc = Math.sign(cb - ca);
  return Array.from({ length: len + 1 }, (_, i) => (ra + dr * i) * n + ca + dc * i);
}
const sopaDone = S => S.words.every(w => w.found);
function sopaHtml(S) {
  const own = {}; S.words.forEach((w, k) => { if (w.found) w.cells.forEach(c => { own[c] = k; }); });
  return `<div class="sopa">
    <div class="sgrid" style="--n:${S.n}" role="group" aria-label="${SOPA_TXT[S.lang].t}">${S.g.map((ch, i) => `<button type="button" class="sc${own[i] != null ? ' f f' + own[i] % 6 : ''}${S.sel === i ? ' sel' : ''}" data-sc="${i}">${ch}</button>`).join('')}</div>
    <ul class="swords" aria-label="Paraules">${S.words.map(w => `<li class="${w.found ? 'done' : ''}">${w.e ? `<span aria-hidden="true">${w.e}</span> ` : ''}${w.w}</li>`).join('')}</ul>
  </div>`;
}
/* la sopa que hi ha ara en pantalla (sessió o Zona de jocs) */
function curSopa() {
  if (V.name === 'play' && V.J && V.J.id === 'sopa' && !V.J.over) return V.J.S;
  if (V.name === 'run') { const p = P(), st = p && p.run && p.run.steps[p.run.i]; if (st && st.type === 'sopa') return st.S; }
  return null;
}
function sopaView(st, t) {
  const S = st.S, X = SOPA_TXT[S.lang], done = sopaDone(S);
  return `<section class="qcard game" style="${cvars(t.area)}" aria-labelledby="prompt">
    <div class="qtag"><i></i>${X.t} · ${esc(t.t)}</div>
    <p class="prompt" id="prompt">${done ? X.ok : X.p(S.words.length)}</p>
    ${done ? '' : `<p class="glead">${X.h}</p>`}
    ${sopaHtml(S)}
    <div id="fb" class="fbwrap" aria-live="polite"></div>
    <div class="grow-btns">${done ? `<button class="btn btn-main btn-big" data-act="next">${X.go}</button>` : `<button class="hintbtn" data-sopa="hint">${X.hint}</button><button class="btn-text" data-act="next">${X.skip}</button>`}</div>
  </section>`;
}
function sopaClear() { $$('.sc.pv,.sc.sel').forEach(b => b.classList.remove('pv', 'sel')); }
function sopaPreview(S, cells) {
  $$('.sc.pv').forEach(b => b.classList.remove('pv'));
  (cells || []).forEach(i => { const b = $(`.sc[data-sc="${i}"]`); if (b) b.classList.add('pv'); });
}
function sopaTry(S, a, b) {
  const cells = sopaLine(a, b, S.n); S.sel = null; S.drag = false;
  const str = cells ? cells.map(i => S.g[i]).join('') : '', rev = [...str].reverse().join('');
  const w = cells && S.words.find(x => !x.found && (x.w === str || x.w === rev));
  if (!w) return sopaClear();
  w.found = true; w.cells = str === w.w ? cells : [...cells].reverse();
  const all = sopaDone(S);
  if (V.name === 'play') {
    const J = V.J; render();
    if (all) { $('#fb').innerHTML = fbHtml('good', SOPA_TXT[S.lang].ok, S.words.map(x => x.w).join(' · ')); roundWon(J, 1900); } else beep('ok');
    return;
  }
  if (all && !S.star) { S.star = true; P().stars++; }
  save(); render();
  if (all) { beep('win'); confetti(30); const nb = $('[data-act="next"]'); if (nb) nb.focus(); } else beep('ok');
}
function sopaCellAt(e) { const el = document.elementFromPoint(e.clientX, e.clientY); const b = el && el.closest && el.closest('.sc'); return b ? +b.dataset.sc : null; }
function sopaPick(S, i) {   /* toc: primera lletra i després l'última */
  if (S.sel != null && S.sel !== i) return sopaTry(S, S.sel, i);
  sopaClear(); S.sel = i; const b = $(`.sc[data-sc="${i}"]`); if (b) b.classList.add('sel');
}
document.addEventListener('pointerdown', e => {
  const b = e.target.closest && e.target.closest('.sc'); if (!b) return; const S = curSopa(); if (!S || sopaDone(S) || (V.name === 'play' && V.J.lock)) return;
  e.preventDefault(); try { b.releasePointerCapture(e.pointerId); } catch (x) { /* res */ }
  const i = +b.dataset.sc;
  if (S.sel != null && S.sel !== i) return sopaTry(S, S.sel, i);
  sopaPick(S, i); S.drag = true; S.moved = false;
});
document.addEventListener('pointermove', e => {
  const S = curSopa(); if (!S || !S.drag || S.sel == null) return;
  const i = sopaCellAt(e); if (i == null) return; if (i !== S.sel) S.moved = true;
  sopaPreview(S, sopaLine(S.sel, i, S.n));
});
document.addEventListener('pointerup', e => {
  const S = curSopa(); if (!S || !S.drag) return; S.drag = false;
  const i = sopaCellAt(e);
  if (S.sel != null && i != null && i !== S.sel) return sopaTry(S, S.sel, i);
  if (S.moved) { S.sel = null; sopaClear(); }
});
document.addEventListener('pointercancel', () => { const S = curSopa(); if (S) { S.drag = false; S.sel = null; sopaClear(); } });
document.addEventListener('click', e => {
  const S = curSopa(); if (!S) return;
  const b = e.target.closest('.sc');
  if (b && e.detail === 0 && !sopaDone(S)) return sopaPick(S, +b.dataset.sc);   /* teclat */
  if (!e.target.closest('[data-sopa="hint"]')) return;
  const w = S.words.find(x => !x.found); if (!w) return;
  S.hints++; if (V.name === 'play' && V.J) V.J.miss = true; beep('tap');
  const c = $(`.sc[data-sc="${w.cells[0]}"]`); if (c) { c.classList.remove('hintc'); void c.offsetWidth; c.classList.add('hintc'); setTimeout(() => c.classList.remove('hintc'), 2600); }
  const fb = $('#fb'); if (fb) fb.innerHTML = fbHtml('hint', `${w.e ? w.e + ' ' : ''}${w.w}`, SOPA_TXT[S.lang].hmsg);
});

/* ---------- mots encreuats (valencià, castellà i anglés) ----------
   Cada paraula té un dibuix com a pista. Es fa servir dins la sessió (pas «creuats») i a la Zona de jocs.
   Paraules sense accents. */
const CROSS_WORDS = {
  val: [['GAT', '🐱'], ['GOS', '🐶'], ['CAVALL', '🐴'], ['CONILL', '🐰'], ['PEIX', '🐟'], ['VACA', '🐄'], ['GALLINA', '🐔'], ['FORMIGA', '🐜'], ['TORTUGA', '🐢'], ['ABELLA', '🐝'],
    ['RATA', '🐀'], ['ELEFANT', '🐘'], ['MONA', '🐒'], ['PORC', '🐷'], ['OVELLA', '🐑'], ['GRANOTA', '🐸'], ['SERP', '🐍'], ['DRAC', '🐉'],
    ['LLIBRE', '📕'], ['CADIRA', '🪑'], ['TISORES', '✂️'], ['LLAPIS', '✏️'], ['POMA', '🍎'], ['PERA', '🍐'], ['TARONJA', '🍊'], ['FORMATGE', '🧀'], ['LLET', '🥛'], ['TOMACA', '🍅'], ['MEL', '🍯'], ['MADUIXA', '🍓'], ['GELAT', '🍦'],
    ['SOL', '☀️'], ['LLUNA', '🌙'], ['ARBRE', '🌳'], ['FLOR', '🌸'], ['FULLA', '🍃'], ['PLUJA', '🌧️'], ['NEU', '❄️'], ['ESTEL', '⭐'], ['MUNTANYA', '⛰️'], ['FOC', '🔥'], ['COR', '❤️'],
    ['PEU', '🦶'], ['NAS', '👃'], ['BOCA', '👄'], ['ULL', '👁️'], ['ORELLA', '👂'], ['CASA', '🏠'], ['PORTA', '🚪'], ['LLIT', '🛏️'], ['CLAU', '🔑'],
    ['COTXE', '🚗'], ['TREN', '🚆'], ['BARCA', '⛵'], ['PILOTA', '⚽'], ['RELLOTGE', '⏰'], ['SABATA', '👟'], ['BARRET', '🎩'], ['GUITARRA', '🎸'], ['GLOBUS', '🎈'], ['REGAL', '🎁'], ['ESPELMA', '🕯️'], ['CORONA', '👑'], ['ROBOT', '🤖'], ['COET', '🚀'], ['BICI', '🚲']],
  cas: [['GATO', '🐱'], ['PERRO', '🐶'], ['CABALLO', '🐴'], ['CONEJO', '🐰'], ['PEZ', '🐟'], ['VACA', '🐄'], ['GALLINA', '🐔'], ['HORMIGA', '🐜'], ['TORTUGA', '🐢'], ['ABEJA', '🐝'],
    ['RATA', '🐀'], ['ELEFANTE', '🐘'], ['MONO', '🐒'], ['PATO', '🦆'], ['CERDO', '🐷'], ['OVEJA', '🐑'], ['RANA', '🐸'],
    ['LIBRO', '📕'], ['SILLA', '🪑'], ['TIJERAS', '✂️'], ['MANZANA', '🍎'], ['PERA', '🍐'], ['NARANJA', '🍊'], ['QUESO', '🧀'], ['LECHE', '🥛'], ['TOMATE', '🍅'], ['MIEL', '🍯'], ['FRESA', '🍓'], ['HELADO', '🍦'], ['HUEVO', '🥚'], ['UVA', '🍇'], ['PAN', '🍞'],
    ['SOL', '☀️'], ['LUNA', '🌙'], ['FLOR', '🌸'], ['HOJA', '🍃'], ['LLUVIA', '🌧️'], ['NIEVE', '❄️'], ['ESTRELLA', '⭐'], ['MONTAÑA', '⛰️'], ['NUBE', '☁️'], ['FUEGO', '🔥'],
    ['PIE', '🦶'], ['NARIZ', '👃'], ['BOCA', '👄'], ['OJO', '👁️'], ['OREJA', '👂'], ['MANO', '✋'], ['CASA', '🏠'], ['PUERTA', '🚪'], ['CAMA', '🛏️'], ['LLAVE', '🔑'],
    ['COCHE', '🚗'], ['TREN', '🚆'], ['BARCO', '⛵'], ['PELOTA', '⚽'], ['RELOJ', '⏰'], ['ZAPATO', '👟'], ['SOMBRERO', '🎩'], ['GUITARRA', '🎸'], ['GLOBO', '🎈'], ['REGALO', '🎁'], ['VELA', '🕯️'], ['CORONA', '👑'], ['ROBOT', '🤖'], ['COHETE', '🚀']]
};
const CROSS_TXT = {
  val: { t: 'Mots encreuats', p: 'Escriu la paraula de cada dibuix', h: 'Toca un dibuix o una casella i escriu la paraula amb les lletres de baix.', ok: 'Mots encreuats resolts!', hint: 'Dona\'m una lletra', skip: 'Salta el joc', go: 'Continua', del: 'Esborra' },
  cas: { t: 'Crucigrama', p: 'Escribe la palabra de cada dibujo', h: 'Toca un dibujo o una casilla y escribe la palabra con las letras de abajo.', ok: '¡Crucigrama resuelto!', hint: 'Dame una letra', skip: 'Saltar el juego', go: 'Continúa', del: 'Borrar' },
  eng: { t: 'Crossword', p: 'Write the word for each picture', h: 'Toca un dibuix o una casella i escriu la paraula en anglés amb les lletres de baix.', ok: 'Well done! Crossword solved!', hint: 'Dona\'m una lletra', skip: 'Salta el joc', go: 'Continua', del: 'Esborra' }
};

function crossBank(lang, skillId) {
  if (lang === 'eng') {
    const ok = v => /^[A-Za-z]{3,8}$/.test(v[1]);
    let V0 = ((LANG_ALL[skillId] && LANG_ALL[skillId].vocab) || []).filter(ok);
    if (V0.length < 8) V0 = Object.values(LANG_ALL).filter(t => t.subj === 'eng').flatMap(t => t.vocab || []).filter(ok);
    const seen = new Set();
    return V0.filter(v => { const w = v[1].toUpperCase(); if (seen.has(w)) return false; seen.add(w); return true; }).map(v => ({ w: v[1].toUpperCase(), e: v[0], x: v[2] }));
  }
  return CROSS_WORDS[lang].map(([w, e]) => ({ w, e, x: '' }));
}
function makeCross(lang, skillId, nWords = 5) {
  const N = 14, bank = crossBank(lang, skillId);
  for (let attempt = 0; attempt < 80; attempt++) {
    const want = attempt < 50 ? nWords : Math.max(3, nWords - 1);
    const g = new Map(), placed = [];
    const can = (w, r, c, d, first) => {
      const dr = d === 'v' ? 1 : 0, dc = d === 'h' ? 1 : 0, L = w.length;
      if (r < 0 || c < 0 || r + dr * (L - 1) >= N || c + dc * (L - 1) >= N) return false;
      const at = (rr, cc) => rr < 0 || cc < 0 || rr >= N || cc >= N ? null : g.get(rr * N + cc);
      if (at(r - dr, c - dc) || at(r + dr * L, c + dc * L)) return false;
      let cross = 0;
      for (let i = 0; i < L; i++) {
        const rr = r + dr * i, cc = c + dc * i, cell = at(rr, cc);
        if (cell) { if (cell.ch !== w[i] || cell[d]) return false; cross++; }
        else if (at(rr + dc, cc + dr) || at(rr - dc, cc - dr)) return false;
      }
      return first || (cross >= 1 && cross < L);
    };
    const put = (it, r, c, d) => {
      const w = [...it.w], cells = w.map((ch, i) => { const k = (r + (d === 'v' ? i : 0)) * N + c + (d === 'h' ? i : 0); const cell = g.get(k) || { ch }; cell[d] = true; g.set(k, cell); return k; });
      placed.push({ ...it, d, cells });
    };
    for (const it of shuffle(bank)) {
      if (placed.length >= want) break;
      const w = [...it.w];
      if (!placed.length) { if (w.length >= 4) put(it, 6, Math.floor((N - w.length) / 2), 'h'); continue; }
      const opts = [];
      g.forEach((cell, k) => {
        const d = cell.h && !cell.v ? 'v' : cell.v && !cell.h ? 'h' : null; if (!d) return;
        const r0 = Math.floor(k / N), c0 = k % N;
        w.forEach((ch, i) => { if (ch !== cell.ch) return; const r = d === 'v' ? r0 - i : r0, c = d === 'h' ? c0 - i : c0; if (can(w, r, c, d)) opts.push([r, c, d]); });
      });
      if (opts.length) { const [r, c, d] = opts[R(0, opts.length - 1)]; put(it, r, c, d); }
    }
    if (placed.length < want) continue;
    /* retalla la graella i numera les paraules */
    const ks = [...g.keys()], rs = ks.map(k => Math.floor(k / N)), cs = ks.map(k => k % N);
    const r0 = Math.min(...rs), c0 = Math.min(...cs), rows = Math.max(...rs) - r0 + 1, cols = Math.max(...cs) - c0 + 1;
    if (cols > 9 || rows > 10) continue;
    const map = k => (Math.floor(k / N) - r0) * cols + (k % N - c0);
    const L = {}; g.forEach((cell, k) => { L[map(k)] = cell.ch; });
    const words = placed.map(p => ({ w: p.w, e: p.e, x: p.x, d: p.d, cells: p.cells.map(map), found: false })).sort((a, b) => a.cells[0] - b.cells[0]);
    let num = 0, last = -1; words.forEach(w => { if (w.cells[0] !== last) { num++; last = w.cells[0]; } w.num = num; });
    const A = [...new Set(SOPA_FILL[lang])], used = [...new Set(Object.values(L))];
    const keys = [...used, ...shuffle(A.filter(ch => !used.includes(ch))).slice(0, 3)].sort((a, b) => a.localeCompare(b, 'ca'));
    return { lang, rows, cols, L, v: {}, words, cur: 0, pos: 0, keys, hints: 0, bad: null };
  }
  return null;
}
const crossLocked = (C, i) => C.words.some(w => w.found && w.cells.includes(i));
const crossDone = C => C.words.every(w => w.found);
const crossVal = (C, i) => crossLocked(C, i) ? C.L[i] : (C.v[i] || '');
function crossSeek(C) {   /* cursor a la primera casella buida de la paraula */
  const w = C.words[C.cur]; if (!w) return;
  let k = w.cells.findIndex(i => !crossVal(C, i)); if (k < 0) k = w.cells.findIndex(i => !crossLocked(C, i));
  C.pos = Math.max(0, k);
}
function crossHtml(C) {
  const X = CROSS_TXT[C.lang], done = crossDone(C), cur = done ? null : C.words[C.cur], nums = {};
  C.words.forEach(w => { nums[w.cells[0]] = w.num; });
  const bad = new Set((C.bad || []).flatMap(k => C.words[k].cells.filter(i => !crossLocked(C, i))));
  let cells = '';
  for (let i = 0; i < C.rows * C.cols; i++) {
    if (!(i in C.L)) { cells += '<span class="cx"></span>'; continue; }
    const cls = [crossLocked(C, i) ? 'ok' : '', bad.has(i) ? 'bad' : '', cur && cur.cells.includes(i) ? 'on' : '', cur && cur.cells[C.pos] === i ? 'cur' : ''].filter(Boolean).join(' ');
    cells += `<button type="button" class="cc ${cls}" data-cxc="${i}" aria-label="Casella">${nums[i] ? `<small>${nums[i]}</small>` : ''}${crossVal(C, i)}</button>`;
  }
  return `<div class="cross">
    <div class="cgrid" style="--n:${C.cols}" role="group" aria-label="${X.t}">${cells}</div>
    <ul class="cclues">${C.words.map((w, k) => `<li><button type="button" class="cclue ${w.found ? 'done' : ''} ${cur === w ? 'on' : ''}" data-cxw="${k}"><b>${w.num}${w.d === 'h' ? '→' : '↓'}</b><span class="em" aria-hidden="true">${w.e}</span><span>${w.found ? w.w : (w.x ? esc(w.x) : `${w.w.length} lletres`.replace('lletres', C.lang === 'cas' ? 'letras' : 'lletres'))}</span></button></li>`).join('')}</ul>
  </div>
  ${done ? '' : `<div class="ckeys" role="group" aria-label="Lletres">${C.keys.map(ch => `<button type="button" data-cxk="${ch}">${ch}</button>`).join('')}<button type="button" class="del" data-cxk="del" aria-label="${X.del}">${ico('i-del')}</button></div>`}`;
}
function curCross() {
  if (V.name === 'play' && V.J && V.J.id === 'creuats' && !V.J.over) return V.J.C;
  if (V.name === 'run') { const p = P(), st = p && p.run && p.run.steps[p.run.i]; if (st && st.type === 'creuats') return st.C; }
  return null;
}
function crossView(st, t) {
  const C = st.C, X = CROSS_TXT[C.lang], done = crossDone(C);
  return `<section class="qcard game" style="${cvars(t.area)}" aria-labelledby="prompt">
    <div class="qtag"><i></i>${X.t} · ${esc(t.t)}</div>
    <p class="prompt" id="prompt">${done ? X.ok : X.p}</p>
    ${done ? '' : `<p class="glead">${X.h}</p>`}
    ${crossHtml(C)}
    <div id="fb" class="fbwrap" aria-live="polite"></div>
    <div class="grow-btns">${done ? `<button class="btn btn-main btn-big" data-act="next">${X.go}</button>` : `<button class="hintbtn" data-cx="hint">${X.hint}</button><button class="btn-text" data-act="next">${X.skip}</button>`}</div>
  </section>`;
}
/* després d'escriure: comprova les paraules completes */
function crossCheck(C) {
  const bad = []; let got = false;
  C.words.forEach((w, k) => {
    if (w.found) return; const s = w.cells.map(i => crossVal(C, i)); if (s.some(x => !x)) return;
    if (s.join('') === w.w) { w.found = true; got = true; } else bad.push(k);
  });
  if (C.words[C.cur].found) { const k = C.words.findIndex(w => !w.found); if (k >= 0) { C.cur = k; crossSeek(C); } }
  const all = crossDone(C), inGame = V.name === 'play';
  if (bad.length) {
    C.bad = bad; beep('no');
    setTimeout(() => { bad.forEach(k => C.words[k].cells.forEach(i => { if (!crossLocked(C, i)) delete C.v[i]; })); C.bad = null; crossSeek(C); if (curCross() === C) render(); }, 850);
  }
  if (!inGame) { if (all && !C.star) { C.star = true; P().stars++; } save(); }
  render();
  if (all) {
    if (inGame) { $('#fb').innerHTML = fbHtml('good', CROSS_TXT[C.lang].ok, C.words.map(x => x.w).join(' · ')); roundWon(V.J, 1900); }
    else { beep('win'); confetti(30); const nb = $('[data-act="next"]'); if (nb) nb.focus(); }
  } else if (got && !bad.length) beep('ok');
}
function crossBusy(C) { return !C || C.bad || crossDone(C) || (V.name === 'play' && V.J.lock); }
function crossType(C, ch) {
  if (crossBusy(C)) return; const w = C.words[C.cur]; if (w.found) return;
  if (ch === 'del') {
    let k = C.pos; if (!C.v[w.cells[k]] || crossLocked(C, w.cells[k])) { k--; while (k >= 0 && crossLocked(C, w.cells[k])) k--; }
    if (k >= 0) { delete C.v[w.cells[k]]; C.pos = k; } return render();
  }
  if (crossLocked(C, w.cells[C.pos])) { crossSeek(C); if (crossLocked(C, w.cells[C.pos])) return; }
  C.v[w.cells[C.pos]] = ch; beep('tap');
  const nx = w.cells.findIndex((i, k) => k > C.pos && !crossVal(C, i)); if (nx >= 0) C.pos = nx;
  crossCheck(C);
}
document.addEventListener('click', e => {
  const C = curCross(); if (!C) return; const t = e.target;
  const kb = t.closest('[data-cxk]'); if (kb) return crossType(C, kb.dataset.cxk);
  if (crossBusy(C)) return;
  const wb = t.closest('[data-cxw]'); if (wb) { const k = +wb.dataset.cxw; if (C.words[k].found) return; C.cur = k; crossSeek(C); return render(); }
  const cb = t.closest('[data-cxc]');
  if (cb) {
    const i = +cb.dataset.cxc, cand = C.words.map((w, k) => k).filter(k => !C.words[k].found && C.words[k].cells.includes(i)); if (!cand.length) return;
    const same = cand.includes(C.cur) && C.words[C.cur].cells[C.pos] === i;
    C.cur = cand.includes(C.cur) ? (same && cand.length > 1 ? cand.find(k => k !== C.cur) : C.cur) : cand[0];
    C.pos = C.words[C.cur].cells.indexOf(i); return render();
  }
  if (t.closest('[data-cx="hint"]')) {
    const w = C.words[C.cur], k = w.cells.findIndex(i => crossVal(C, i) !== C.L[i]); if (k < 0) return;
    C.hints++; if (V.name === 'play') V.J.miss = true; C.pos = k; crossType(C, C.L[w.cells[k]]);
  }
});
document.addEventListener('keydown', e => {
  const C = curCross(); if (!C || e.ctrlKey || e.metaKey || e.altKey || (e.target.matches && e.target.matches('input'))) return;
  if (e.key === 'Backspace') { e.preventDefault(); return crossType(C, 'del'); }
  if (e.key.length === 1 && /[a-zçñ]/i.test(e.key)) crossType(C, e.key.toUpperCase());
});
