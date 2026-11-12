/* Interfície. Una sola pàgina; cada vista es pinta des de l'estat. */
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const app = $('#app');
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const ico = (id, cls = 'i') => `<svg class="${cls}" aria-hidden="true"><use href="#${id}"/></svg>`;
const av = id => String(id).startsWith('data:image/') ? { id, src: id, l: 'el meu dibuix' } : (AVATARS.find(a => a.id === id) || AVATARS[0]);
const cvars = areaId => `--c:var(--${areaId});--c-soft:var(--${areaId}-soft);--c-ink:var(--${areaId}-ink)`;
const DAYS_CA = ['diumenge', 'dilluns', 'dimarts', 'dimecres', 'dijous', 'divendres', 'dissabte'];
const MONTHS_CA = ['de gener', 'de febrer', 'de març', "d'abril", 'de maig', 'de juny', 'de juliol', "d'agost", 'de setembre', "d'octubre", 'de novembre', 'de desembre'];
const fmtDate = (k = today()) => { const d = new Date(k + 'T12:00:00'); const s = `${DAYS_CA[d.getDay()]}, ${d.getDate()} ${MONTHS_CA[d.getMonth()]}`; return s[0].toUpperCase() + s.slice(1); };
const relDay = k => { if (!k) return '—'; const n = daysBetween(k, today()); return n === 0 ? 'Avui' : n === 1 ? 'Ahir' : `Fa ${n} dies`; };
const TOTAL = Object.keys(SKILL).length;

let V = { name: P() ? 'home' : A.profiles.length ? 'profiles' : 'intro' };
let Q = null;            // estat efímer de la pregunta actual
let tick = Date.now();   // temps actiu de la sessió

function go(v) { V = v; render(); window.scrollTo(0, 0); app.classList.remove('enter'); void app.offsetWidth; app.classList.add('enter'); }
function toast(msg) { const t = document.createElement('div'); t.className = 'toast'; t.setAttribute('role', 'status'); t.textContent = msg; document.body.appendChild(t); setTimeout(() => t.remove(), 2600); }
function modal(html) { closeModal(); const m = document.createElement('div'); m.className = 'modal'; m.innerHTML = `<div role="dialog" aria-modal="true">${html}</div>`; document.body.appendChild(m); const f = m.querySelector('button,input'); if (f) f.focus(); return m; }
function closeModal() { const m = $('.modal'); if (m) m.remove(); }

/* veu (síntesi del navegador, sense xarxa) */
function say(text, lang = 'ca-ES') {
  if (!('speechSynthesis' in window)) return toast('Aquest navegador no pot llegir en veu alta.');
  speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(strip(text)); u.lang = lang; u.rate = .92;
  const v = speechSynthesis.getVoices().find(v => v.lang && v.lang.toLowerCase().startsWith(lang.slice(0, 2).toLowerCase())); if (v) u.voice = v;
  speechSynthesis.speak(u);
}

function credit(id) {
  const c = CREDITS[id]; if (!c) return '';
  return `<p class="credit">Foto: <a href="${esc(c[4])}" target="_blank" rel="noopener">${esc(c[0])}</a>${c[1] ? ', ' + esc(c[1]) : ''} (${c[3] ? `<a href="${esc(c[3])}" target="_blank" rel="noopener">${esc(c[2])}</a>` : esc(c[2])})</p>`;
}

/* ======================= carcassa ======================= */
const NAVIMG = { home: 'star', map: 'rocket', carnet: 'medal', games: 'puzzle' };
function shell(cur, body) {
  const p = P(), a = av(p.avatar);
  const nav = [['home', 'i-today', 'Avui'], ['map', 'i-map', 'Mapa'], ['carnet', 'i-stamp', 'Carnet']];
  if (p.settings.jocs !== false) nav.push(['games', 'i-game', 'Jocs']);
  const link = ([n, i, l]) => `<a href="#" class="n-${n}" data-go="${n}" ${cur === n ? 'aria-current="page"' : ''}><img class="nimg" src="img/obj/${NAVIMG[n]}.png" alt="">${l}</a>`;
  return `<div class="shell">
  <aside class="side" aria-label="Navegació">
    <div class="brand">${motxi()}Motxilla 2A</div>
    <button class="who" data-go="profiles" aria-label="Canvia de perfil"><img src="${a.src}" alt=""><span><b>${esc(p.alias)}</b><small>Canvia de perfil</small></span></button>
    <nav class="nav">${nav.map(link).join('')}</nav>
    <div class="grow"></div>
    <div class="stars"><img src="img/obj/trophy.png" alt=""><span><b class="num">${p.stars}</b> estrelles</span></div>
    <nav class="nav"><a href="#" data-go="gate" ${cur === 'adults' ? 'aria-current="page"' : ''}>${ico('i-adult')}Famílies</a></nav>
  </aside>
  <main class="main" id="main"><div class="col">${body}</div></main>
  <nav class="tabbar" aria-label="Navegació">${nav.map(link).join('')}<a href="#" data-go="gate" ${cur === 'adults' ? 'aria-current="page"' : ''}>${ico('i-adult')}Famílies</a></nav>
</div>`;
}

/* ======================= perfils ======================= */
function vProfiles() {
  const mos = [PHOTOS[10], PHOTOS[0], PHOTOS[18], PHOTOS[13]];
  return `<div class="center"><div class="welcome split"><div>
  <div class="hello mx"><span class="mxbox big">${motxi('happy')}</span><div><h1>${A.profiles.length ? 'Qui juga avui?' : 'Hola! Sóc Motxi'}</h1>
  <p>${A.profiles.length ? 'Toca el teu dibuix per a començar.' : 'Cada dia, uns minuts: primer repassem el que ja saps i després aprens una cosa nova. Crea el teu perfil per a començar.'}</p></div></div>
  <div class="profiles">
    ${A.profiles.map(p => `<button class="pcard" data-profile="${p.id}"><img src="${av(p.avatar).src}" alt="">${esc(p.alias)}</button>`).join('')}
    <button class="pcard add" data-go="new"><span>${ico('i-plus')}</span>Apunta't</button>
  </div>
  <div class="foot">
    ${A.profiles.length ? `<button class="btn-text" data-go="gate">Zona de famílies</button>` : ''}
    <label class="btn-text" style="display:inline-flex;align-items:center;cursor:pointer">Recupera un progrés guardat<input type="file" accept="application/json,.json" data-import hidden></label>
    <a class="btn-text" href="privacitat.html">Privacitat</a>
    <button class="btn-text" data-go="intro">Com funciona?</button>
  </div>
  ${STORAGE_OK ? '' : `<p class="callout" style="margin-top:20px">Aquest navegador no deixa guardar dades (potser és una finestra privada). El progrés es perdrà en tancar.</p>`}
  </div>
  <div class="mosaic" aria-hidden="true">${mos.map(x => `<img src="${x.s}" alt="">`).join('')}</div>
</div></div>`;
}

function vNew() {
  const sel = V.avatar || AVATARS[0].id;
  return `<div class="center"><div class="welcome">
  <button class="btn-text" data-go="profiles">${ico('i-back')} Tornar</button>
  <div class="hello mx" style="margin-top:12px"><span class="mxbox">${motxi('happy')}</span><div><h1>Apunta't!</h1><p>Sense correu, sense contrasenya i sense nom real: tot es queda en aquest dispositiu.</p></div></div>
  <form class="form" data-form="new">
    <div class="field"><label for="alias">Com et diem?</label><input id="alias" name="alias" autocomplete="off" maxlength="16" required aria-describedby="alias-h" value="${esc(V.alias || '')}">
      <p class="help" id="alias-h">Un àlies o un sobrenom, per exemple «Lluna» o «Capità Pi».</p></div>
    <div class="field"><span style="display:block;font-weight:700;margin-bottom:8px" id="av-l">Tria el teu dibuix</span>
      <div class="avatars" role="group" aria-labelledby="av-l">${V.custom ? `<button type="button" data-avatar="${V.custom}" aria-pressed="${V.custom === sel}" aria-label="El meu dibuix"><img src="${V.custom}" alt=""></button>` : ''}${AVATARS.map(a => `<button type="button" data-avatar="${a.id}" aria-pressed="${a.id === sel}" aria-label="${esc(a.l)}"><img src="${a.src}" alt=""></button>`).join('')}</div>
      <label class="btn btn-soft upav">${ico('i-up')}Puja el teu dibuix<input type="file" accept="image/*" data-avup hidden></label>
      <p class="help">Pots pujar un dibuix del teu personatge preferit. Es queda només en aquest dispositiu.</p></div>
    <div><button class="btn btn-main btn-big" type="submit">Apunta'm i comencem</button></div>
  </form>
</div></div>`;
}

/* ======================= avui ======================= */
function weekInfo(p) {
  const d = new Date(today() + 'T12:00:00'); const dow = (d.getDay() + 6) % 7; const mon = addDays(today(), -dow);
  const days = [...Array(7)].map((_, i) => addDays(mon, i));
  const ms = days.reduce((s, k) => s + (p.days[k]?.ms || 0), 0);
  return { days, n: days.filter(k => p.days[k]?.done).length, min: Math.round(ms / 60000) };
}
function vHome() {
  const p = P(), T = today(), pl = plan(p), done = p.days[T]?.done;
  const live = p.run && p.run.d === T && !p.run.closed && !p.run.practice;
  const fresh = pl.fresh ? SKILL[pl.fresh] : null;
  const nrev = Math.min(pl.nRev, pl.revSkills.length * 2);
  const w = weekInfo(p);
  let fact;
  if (done) fact = 'La sessió d\'avui ja està feta. Demà en tindràs una altra.';
  else if (fresh && nrev) fact = `Avui repassem ${nrev} coses que ja saps i aprens «${fresh.t}».`;
  else if (fresh) fact = `Avui aprens «${fresh.t}».`;
  else if (nrev) fact = `Avui toca repassar ${nrev} coses que ja saps.`;
  else fact = 'Has dominat tots els camins. Ara només queden repassos.';
  const photo = fresh ? fresh.img : PHOTOS[3].s;
  const cap = fresh ? `${AREA[fresh.area].short}: ${fresh.t}` : 'Repàs';
  const stops = [];
  if (nrev) stops.push(`<li><span class="blaze num">${nrev}</span>Escalfem</li>`);
  if (fresh) stops.push(`<li><span class="blaze c" style="${cvars(fresh.area)}">${ico('i-flag')}</span>Aprenc</li>`, `<li><span class="blaze num">${pl.nGuided + pl.nInd}</span>Practique</li>`);
  if (p.settings.game) stops.push(`<li><span class="blaze">${ico('i-star')}</span>Joc</li>`);
  const undiag = AREAS.filter(a => !p.diag[a.id] && !a.topics.some(t => p.skills[t.id] && p.skills[t.id].sess.length));
  return shell('home', `
  <header class="hello mx"><span class="mxbox">${motxi(done ? 'wow' : 'happy')}</span><div><h1>Hola, ${esc(p.alias)}!</h1><p>${fmtDate()}. ${esc(fact)}</p></div></header>
  <div class="grid">
    <section class="panel today s9" style="${fresh ? cvars(fresh.area) : ''}" aria-labelledby="today-h">
      <div class="body">
        <h2 id="today-h">${done ? 'Fins demà!' : 'La sessió d\'avui'}</h2>
        ${done ? `<div class="done-note">${ico('i-check')}<p>Ho has fet tot. Descansar també ajuda a recordar: demà tornarem a repassar.</p></div>`
               : `<p class="lead">Uns ${Math.max(8, Math.min(15, pl.minutes))} minuts. ${nrev && fresh ? 'Primer repassem i després aprens una cosa nova amb un exemple.' : fresh ? 'Mirem com es fa amb un exemple i després practiques.' : 'Avui només repassem el que ja saps.'}</p>
                  <ol class="stops" aria-label="Parts de la sessió">${stops.join('')}<li><span class="blaze">${ico('i-boot')}</span>Refugi</li></ol>
                  <div><button class="btn btn-main btn-big" data-act="start">${live ? 'Continua la sessió' : 'Comença la sessió'}</button></div>`}
      </div>
      <figure class="photo" style="margin:0"><img src="${photo}" alt=""><figcaption>${esc(cap)}</figcaption></figure>
    </section>
    <section class="panel week s3" aria-labelledby="week-h">
      <h2 class="ptitle" id="week-h">Aquesta setmana</h2>
      <p class="big num">${w.n} ${w.n === 1 ? 'dia' : 'dies'}</p>
      <p class="num">${w.min} minuts en total</p>
      <div class="dots" aria-hidden="true">${w.days.map((k, i) => `<i class="${p.days[k]?.done ? 'on' : ''} ${k === T ? 'now' : ''}">${['dl', 'dt', 'dc', 'dj', 'dv', 'ds', 'dg'][i]}</i>`).join('')}</div>
      <p>Una sessió al dia és suficient.</p>
    </section>
    ${undiag.length && !done ? `<div class="callout s12"><p><b>Per on comencem?</b> Una prova curta ens diu què ja saps, i així no repetim coses fàcils.</p>
      <div style="display:flex;gap:8px;flex-wrap:wrap">${undiag.map(a => `<button class="btn" style="background:var(--${a.id});color:var(--${a.id}-ink)" data-diag="${a.id}">${esc(a.short)}</button>`).join('')}</div></div>` : ''}
    ${p.settings.jocs !== false ? `<button class="gbanner s12" data-go="games"><img class="gb-obj" src="img/obj/puzzle.png" alt=""><span><b>Zona de jocs</b><small>Construeix nombres amb barres i quadradets, explota globus de sumes i més.</small></span><span class="btn btn-main">Juga</span></button>` : ''}
    <section class="panel s12" aria-labelledby="tr-h">
      <h2 class="ptitle" id="tr-h">Els meus camins <button class="btn-text" data-go="map">Obri el mapa</button></h2>
      <div class="trails">${AREAS.map(a => {
        const m = a.topics.filter(t => p.skills[t.id]?.st === 'mastered').length, r = a.topics.filter(t => skillState(p, t.id) === 'review').length;
        const cur = currentSkill(p, a.id) || a.topics[a.topics.length - 1];
        return `<button class="trail" style="${cvars(a.id)}" data-map="${a.id}"><img src="${cur.img}" alt=""><b>${esc(a.short)}</b>
          <span class="bar" aria-hidden="true"><i style="width:${m / a.topics.length * 100}%"></i></span>
          <small class="num">${m} de ${a.topics.length} dominades${r ? ` · ${r} per repassar` : ''}</small></button>`; }).join('')}</div>
    </section>
  </div>`);
}

/* ======================= mapa ======================= */
const STATE_TXT = { locked: 'Tancada', learning: 'En camí', mastered: 'Dominada', review: 'Per repassar' };
/* tots els temes estan oberts: «En camí» és el que toca a la sessió o el que ja s'ha començat; la resta, «Oberta» */
function stTxt(p, id, st) { if (st !== 'learning') return STATE_TXT[st]; const c = currentSkill(p, SKILL[id].area); return (c && c.id === id) || sk(p, id).sess.length ? 'En camí' : 'Oberta'; }
function ring(state, p, id) {
  const C = 2 * Math.PI * 45; let frac = 1, col = 'var(--c)', dash = '';
  if (state === 'locked') { col = 'var(--control)'; dash = 'stroke-dasharray="6 8"'; }
  else if (state === 'learning') frac = Math.max(.1, goodDays(sk(p, id)) / MASTER_DAYS);
  else if (state === 'review') col = 'var(--warning)';
  return `<svg class="ring" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="45" fill="none" stroke="var(--surface-2)" stroke-width="7"/>
  <circle cx="50" cy="50" r="45" fill="none" stroke="${col}" stroke-width="7" stroke-linecap="round" ${dash || `stroke-dasharray="${C * frac} ${C}"`}/></svg>`;
}
function vMap() {
  const p = P(); const area = V.area || (plan(p).fresh ? SKILL[plan(p).fresh].area : 'mat'); const a = AREA[area];
  const sel = V.sel && SKILL[V.sel] && SKILL[V.sel].area === area ? V.sel : (currentSkill(p, area) || a.topics[0]).id;
  const badge = { locked: 'i-lock', learning: 'i-flag', mastered: 'i-check', review: 'i-clock' };
  const t = SKILL[sel], st = skillState(p, sel), s = sk(p, sel);
  const prev = a.topics[t.order - 1];
  let what;
  if (st === 'locked') what = `S'obrirà quan domines «${esc((currentSkill(p, area) || prev).t)}».`;
  else if (st === 'learning') what = `Per a dominar-la cal encertar el ${MASTER_PCT} % en dos dies diferents. Portes <b class="num">${goodDays(s)} de ${MASTER_DAYS}</b>.${needsReinforce(s) ? ' La pròxima vegada ho tornarem a explicar d\'una altra manera.' : ''}`;
  else if (st === 'review') what = 'Ja la saps, però fa dies que no la repasses. Eixirà a l\'escalfament de la pròxima sessió.';
  else what = `Dominada${s.diag ? ' a la prova de nivell' : s.on ? ' ' + relDay(s.on).toLowerCase() : ''}. Pròxim repàs: ${s.due ? fmtDate(s.due).toLowerCase() : '—'}.`;
  if (!p.settings.open2) { p.settings.free = true; p.settings.open2 = 1; save(); }
  const canPractice = p.settings.free;
  return shell('map', `
  <header class="hello" style="margin-bottom:24px"><h1>El mapa</h1><p>Cada camí és una àrea. Totes les parades estan obertes: tria la que vulgues i practica tant com vulgues.</p></header>
  <div class="seg" role="group" aria-label="Àrea">${AREAS.map(x => `<button style="${cvars(x.id)}" data-map="${x.id}" aria-pressed="${x.id === area}">${esc(x.short)}</button>`).join('')}</div>
  <div class="maprow" style="${cvars(area)}">
    <section class="mapbox" aria-label="Camí de ${esc(a.short)}">
      ${topo()}
      <svg class="path" id="trailpath" aria-hidden="true"></svg>
      <div class="nodes">${a.topics.map(x => { const ss = skillState(p, x.id); return `
        <button class="node ${ss}" data-sel="${x.id}" aria-pressed="${x.id === sel}" aria-label="${esc(x.t)}: ${stTxt(p, x.id, ss)}">
          <span class="disc"><img src="${x.img}" alt="">${ring(ss, p, x.id)}<span class="badge">${ico(badge[ss])}</span></span>
          <span class="lbl"><b>${esc(x.t)}</b><small>${stTxt(p, x.id, ss)}</small></span></button>`; }).join('')}</div>
    </section>
    <aside class="panel detail" aria-labelledby="det-h">
      <img class="hero" src="${t.img}" alt="">
      <h2 id="det-h">${esc(t.t)}</h2>
      <p class="sub">${esc(t.s || '')}</p>
      <div class="chips"><span class="chip ${st === 'mastered' ? 'ok' : st === 'review' ? 'rev' : st === 'learning' ? 'cur' : ''}">${stTxt(p, sel, st)}</span><span class="chip">${esc(t.block)}</span></div>
      <p>${what}</p>
      ${st !== 'locked' ? `<ul class="learnlist">${(t.learn || []).slice(0, 4).map(l => `<li>${esc(l)}</li>`).join('')}</ul>` : ''}
      <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:16px">
        ${canPractice ? `<button class="btn btn-main" data-practice="${sel}">Practica ara</button>` : ''}
        ${!p.diag[area] ? `<button class="btn btn-soft" data-diag="${area}">Prova de nivell</button>` : ''}
        <button class="btn btn-soft" data-sheet="${sel}">${ico('i-down')}Fitxa en PDF</button>
      </div>
      ${credit(sel)}
    </aside>
  </div>
  <div class="legend" style="${cvars(area)}"><span><i style="border-color:var(--c)"></i>Oberta, en camí o dominada</span><span><i style="border-color:var(--warning)"></i>Per repassar</span></div>`);
}
/* línies de nivell, com en un mapa d'excursió */
function topo() {
  let d = ''; for (let i = 0; i < 9; i++) { const y = 60 + i * 120, a = 30 + (i % 3) * 18; d += `<path d="M-20 ${y} C 120 ${y - a}, 260 ${y + a}, 420 ${y - a / 2} S 700 ${y + a}, 900 ${y}" />`; }
  return `<svg class="topo" viewBox="0 0 800 1100" preserveAspectRatio="none" aria-hidden="true"><g fill="none" stroke="var(--surface-2)" stroke-width="2">${d}</g></svg>`;
}
function drawTrail() {
  const box = $('.mapbox'), svg = $('#trailpath'); if (!box || !svg) return;
  const b = box.getBoundingClientRect();
  const pts = $$('.node .disc').map(e => { const r = e.getBoundingClientRect(); return [r.left - b.left + r.width / 2, r.top - b.top + r.height / 2]; });
  if (pts.length < 2) return;
  let d = `M${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) { const [x0, y0] = pts[i - 1], [x1, y1] = pts[i], my = (y0 + y1) / 2; d += ` C ${x0} ${my}, ${x1} ${my}, ${x1} ${y1}`; }
  svg.setAttribute('viewBox', `0 0 ${b.width} ${b.height}`);
  svg.innerHTML = `<path d="${d}" fill="none" stroke="var(--raised)" stroke-width="16" stroke-linecap="round"/><path d="${d}" fill="none" stroke="var(--c)" stroke-width="5" stroke-dasharray="14 12" stroke-linecap="round" opacity=".8"/>`;
}

/* ======================= carnet ======================= */
function vCarnet() {
  const p = P(); const got = Object.values(p.skills).filter(s => s.st === 'mastered').length;
  return shell('carnet', `
  <header class="hello"><h1>El meu carnet</h1><p>Un segell per cada habilitat dominada: ${got} de ${TOTAL}. Tens ${p.stars} estrelles, una per cada resposta encertada a la primera i cinc per cada segell.</p></header>
  ${AREAS.map(a => { const n = a.topics.filter(t => p.skills[t.id]?.st === 'mastered').length; return `
  <section style="${cvars(a.id)}" aria-labelledby="ca-${a.id}"><div class="areahead"><h2 id="ca-${a.id}">${esc(a.name)}</h2><span class="num">${n} de ${a.topics.length}</span></div>
  <div class="stamps">${a.topics.map(t => { const s = p.skills[t.id], on = s && s.st === 'mastered'; return `
    <div class="stamp ${on ? '' : 'off'}"><span class="seal"><img src="${t.img}" alt=""></span><b>${esc(t.t)}</b><small>${on ? (s.on ? relDay(s.on) : 'Prova de nivell') : 'Encara no'}</small></div>`; }).join('')}</div></section>`; }).join('')}`);
}

/* ======================= sessió ======================= */
const STAGES = { review: 'Escalfem', learn: 'Aprenc', example: 'Exemple resolt', guided: 'Practique amb ajuda', ind: 'Ara tu', sopa: 'Sopa de lletres', creuats: 'Mots encreuats', game: 'Joc', end: 'Refugi' };
function startRun(practiceId, more) {
  const p = P();
  if (practiceId) p.run = buildPractice(p, practiceId, more);
  else if (!(p.run && p.run.d === today() && !p.run.closed && !p.run.practice)) p.run = buildRun(p);
  save(); tick = Date.now(); Q = null; go({ name: 'run' });
}
function addTime() { const p = P(), now = Date.now(), dt = Math.min(now - tick, 120000); tick = now; if (!p.run) return; p.run.ms += dt; dayRec(p).ms += dt; }

function routeBar(run) {
  const groups = []; run.steps.forEach((s, i) => { const k = s.type === 'review' ? 'rev' : s.type === 'end' ? null : s.type === 'game' ? 'game' : 'new'; if (!k) return; const g = groups[groups.length - 1]; if (g && g.k === k) g.n.push(i); else groups.push({ k, n: [i] }); });
  return groups.map(g => { const doneN = g.n.filter(i => i < run.i).length; return `<span class="leg ${g.k}" style="--w:${g.n.length}"><i style="width:${doneN / g.n.length * 100}%"></i></span>`; }).join('');
}
function vRun() {
  const p = P(), run = p.run; if (!run) return vHome();
  const st = run.steps[run.i]; const t = st.skill ? SKILL[st.skill] : null;
  const head = `<div class="runbar" style="${t ? cvars(t.area) : ''}">
    <button class="exit" data-act="exit">${ico('i-x')}<span>Surt</span></button>
    <div class="route" aria-hidden="true">${routeBar(run)}</div>
    <span class="stage">${STAGES[st.type]}</span></div>`;
  let body = '';
  if (st.type === 'learn') body = learnView(st, t);
  else if (st.type === 'example') body = exampleView(st, t);
  else if (st.type === 'creuats') body = crossView(st, t);
  else if (st.type === 'sopa') body = sopaView(st, t);
  else if (st.type === 'game') body = gameView(p);
  else if (st.type === 'end') body = endView(p, run);
  else body = questionView(st, t);
  return `<div class="run">${head}<main class="runbody" id="main">${body}</main></div>`;
}

function visuals(q) {
  let v = '';
  if (q.reading) v += `<div class="reading"><b>${esc(q.reading.t)}</b>${esc(q.reading.x)}</div>`;
  if (q.visual) v += q.visual;
  if (q.pic) v += `<div class="pic" aria-hidden="true">${q.pic}</div>`;
  return v;
}
function answerControls(q) {
  if (q.kind === 'choice') return `<div class="opts">${q.options.map((o, k) => `<button class="opt ${q.sign ? 'sign' : ''}" data-opt="${k}">${esc(o)}</button>`).join('')}</div>`;
  const inVis = (q.visual || '').includes('id="ans"');
  return `${inVis ? '' : `<div class="answer${q.rtl ? ' rtl' : ''}" id="ans" aria-live="polite" aria-label="La teua resposta"><span class="ph">?</span></div>`}
    ${q.rtl ? '<p class="rtlhint">Comença per les unitats: la xifra que toques primer es queda a la dreta, com al quadern.</p>' : ''}
    <div class="pad" role="group" aria-label="Teclat de números">${[1, 2, 3, 4, 5, 6, 7, 8, 9].map(d => `<button data-key="${d}">${d}</button>`).join('')}<button class="del" data-key="del" aria-label="Esborra">${ico('i-del')}</button><button data-key="0">0</button><span></span><button class="ok" data-key="ok">Comprova</button></div>`;
}
function tagLine(st, t) {
  const lbl = st.type === 'review' ? `Escalfem · ${AREA[t.area].short}` : st.type === 'diag' ? st.label : `${STAGES[st.type]} · ${t.t}`;
  return `<div class="qtag"><i></i>${esc(lbl)}</div>`;
}
function questionView(st, t) {
  const q = st.q; Q = Q && Q.i === P().run.i ? Q : { i: P().run.i, tries: 0, typed: '', locked: false };
  return `<section class="qcard" id="card" style="${cvars(t.area)}" aria-labelledby="prompt">
    ${tagLine(st, t)}
    <p class="prompt" id="prompt">${q.prompt}</p>
    <button class="speak" data-act="say">${ico('i-sound')}Escolta</button>
    ${visuals(q)}
    ${answerControls(q)}
    ${st.type === 'guided' ? `<button class="hintbtn" data-act="hint">Vull una pista</button>` : ''}
    <div id="fb" style="width:100%;display:flex;justify-content:center" aria-live="polite"></div>
  </section>`;
}
function learnView(st, t) {
  const L = t.learn || [];
  const reveal = st.again ? (V.step || 1) : L.length;
  return `<section class="qcard wide" style="${cvars(t.area)}" aria-labelledby="ln-h">
    <div class="learn">
      <div><img src="${t.img}" alt="">${credit(t.id)}</div>
      <div>
        <div class="qtag"><i></i>${esc(AREA[t.area].name)}</div>
        <h1 id="ln-h" style="margin-top:10px">${esc(t.t)}</h1>
        <p class="sub">${esc(t.s || '')}</p>
        ${st.again ? '<p class="again">L\'última vegada va costar una mica. Ho mirem pas a pas, a poc a poc.</p>' : ''}
        <ol class="steps">${L.map((l, i) => `<li ${i >= reveal ? 'hidden' : ''}>${esc(l)}</li>`).join('')}</ol>
        ${reveal >= L.length && t.demo ? `<div class="demo">${t.demo}</div>` : ''}
        ${reveal >= L.length && t.ex ? `<p class="exbox">${esc(t.ex)}</p>` : ''}
        <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:20px">
          ${reveal < L.length ? `<button class="btn btn-main btn-big" data-act="step">Següent pas</button>` : `<button class="btn btn-main btn-big" data-act="next">Mira un exemple</button>`}
          <button class="speak" data-act="saylearn">${ico('i-sound')}Escolta</button>
        </div>
      </div>
    </div></section>`;
}
function exampleView(st, t) {
  const q = st.q; let vis = visuals(q).replace('<span class="ph">?</span>', esc(q.answer));
  return `<section class="qcard" style="${cvars(t.area)}" aria-labelledby="prompt">
    <div class="qtag"><i></i>Exemple resolt · ${esc(t.t)}</div>
    <p class="prompt" id="prompt">${q.prompt}</p>
    ${vis}
    <div class="solved"><span>La resposta és</span><span class="ans">${esc(q.answer)}</span>
      ${q.hint ? `<span><b>Com ho pensem:</b> ${esc(q.hint)}</span>` : ''}${q.explain ? `<span>${esc(q.explain)}</span>` : ''}</div>
    <button class="btn btn-main btn-big" data-act="next">Ara tu</button>
  </section>`;
}

function sayQ() { const p = P(); const st = V.name === 'diag' ? { q: V.D.q } : p.run.steps[p.run.i]; const q = st.q; let txt = q.say || q.prompt; if (q.reading) txt = q.reading.t + '. ' + q.reading.x + ' ' + txt; if (q.kind === 'choice' && !q.sign) txt += '. ' + q.options.join(', ') + '.'; say(txt, q.lang || 'ca-ES'); }

function curQ() { return V.name === 'diag' ? { type: 'diag', q: V.D.q, skill: V.D.cur } : P().run.steps[P().run.i]; }
function setAns(text, cls) { const a = $('#ans'); if (!a) return; a.className = 'answer' + (cls ? ' ' + cls : '') + (curQ().q.rtl && !a.closest('.vsum') ? ' rtl' : ''); a.innerHTML = text === '' ? '<span class="ph">?</span>' : esc(text); }
function key(k) {
  if (!Q || Q.locked) return; const q = curQ().q;
  if (k === 'del') Q.typed = q.rtl ? Q.typed.slice(1) : Q.typed.slice(0, -1);
  else if (k === 'ok') { if (Q.typed) answer(Q.typed); return; }
  else if (Q.typed.length < 4) Q.typed = q.rtl ? k + Q.typed : Q.typed + k;
  setAns(Q.typed);
}
function markOpts(val, cls) { $$('.opt').forEach(b => { if (b.textContent === String(val)) b.classList.add(cls); }); }
function lockOpts() { $$('.opt').forEach(b => b.disabled = true); }

/* una resposta: el comportament depèn de la part de la sessió */
function answer(val) {
  const st = curQ(); const q = st.q; const fb = $('#fb'); if (!Q || Q.locked) return;
  const ok = String(val).trim() === q.answer;
  if (st.type === 'diag') return diagAnswerUI(ok, val);
  const p = P(), run = p.run; addTime();
  const first = Q.tries === 0;
  /* Escalfem: intercalat → correcció al final (feedback diferit) */
  if (st.type === 'review') {
    Q.locked = true; run.res.push({ i: run.i, type: 'review', skill: st.skill, ok, given: val }); logAnswer(p, st.skill, ok, q, val); if (ok) p.stars++;
    if (q.kind === 'choice') { markOpts(val, 'picked'); lockOpts(); } else setAns(val);
    fb.innerHTML = `<div class="fb saved">Resposta guardada. La corregim al final.</div>`; save();
    return setTimeout(nextStep, 900);
  }
  if (ok) {
    Q.locked = true; if (first) { run.res.push({ i: run.i, type: st.type, skill: st.skill, ok: true, given: val }); logAnswer(p, st.skill, true, q, val); p.stars++; }
    if (q.kind === 'choice') { markOpts(val, 'right'); lockOpts(); } else setAns(val, 'right');
    beep('ok'); confetti(first ? 16 : 8);
    fb.innerHTML = `<div class="fb good"><strong>${first ? pick(['Correcte!', 'Molt bé!', 'Genial!', 'Això és!']) : 'Ara sí, correcte!'}</strong>${q.explain ? `<span>${esc(q.explain)}</span>` : ''}</div>`;
    save(); return setTimeout(nextStep, q.explain && q.explain.length > 40 ? 2200 : 1500);
  }
  if (first) { run.res.push({ i: run.i, type: st.type, skill: st.skill, ok: false, given: val }); logAnswer(p, st.skill, false, q, val); save(); }
  beep('no');
  if (st.type === 'guided' && first) {
    Q.tries = 1; if (q.kind === 'choice') { markOpts(val, 'wrong'); $$('.opt').forEach(b => { if (b.textContent === String(val)) b.disabled = true; }); } else { setAns(val, 'wrong'); Q.typed = ''; setTimeout(() => setAns(''), 800); }
    const c = $('#card'); c.classList.remove('shake'); void c.offsetWidth; c.classList.add('shake');
    const hb = $('[data-act="hint"]'); if (hb) hb.hidden = true;
    fb.innerHTML = `<div class="fb hint"><strong>Encara no. Torna-ho a provar.</strong><span>Pista: ${esc(q.hint || 'Llig-ho una altra vegada a poc a poc.')}</span></div>`;
    return;
  }
  Q.locked = true;
  if (q.kind === 'choice') { markOpts(val, 'wrong'); markOpts(q.answer, 'right'); lockOpts(); } else setAns(q.answer, 'right');
  fb.innerHTML = `<div class="fb explain"><strong>La resposta és ${esc(q.answer)}.</strong>${q.explain ? `<span>${esc(q.explain)}</span>` : ''}${q.hint ? `<span>Recorda: ${esc(q.hint)}</span>` : ''}<button class="btn btn-main" data-act="next">Entesos</button></div>`;
  const b = fb.querySelector('button'); if (b) b.focus();
}
function nextStep() {
  const p = P(); if (!p.run) return; addTime(); p.run.i = Math.min(p.run.i + 1, p.run.steps.length - 1); V.step = 1; Q = null; save(); render(); window.scrollTo(0, 0);
  if (p.settings.voice && p.run.steps[p.run.i].q) setTimeout(sayQ, 300);
  if (p.run.steps[p.run.i].type === 'end') { beep('win'); confetti(44); }
}

/* final: es tanca la sessió (sense «una més») */
function closeRun(p, run) {
  if (run.closed) return run.sum;
  const sum = { reviews: [], fresh: null, fix: [] };
  const byRev = {}; run.res.filter(r => r.type === 'review').forEach(r => { (byRev[r.skill] ||= []).push(r); });
  Object.entries(byRev).forEach(([id, rs]) => { const a = rs.length, c = rs.filter(r => r.ok).length; if (sk(p, id).st === 'mastered') sum.reviews.push({ id, a, c, out: closeReview(p, id, a, c) }); });
  run.res.filter(r => r.type === 'review' && !r.ok).forEach(r => { const q = run.steps[r.i].q; sum.fix.push({ prompt: strip(q.prompt), given: r.given, answer: q.answer, explain: q.explain || '' }); });
  if (run.fresh) {
    const rs = run.res.filter(r => (r.type === 'guided' || r.type === 'ind') && r.skill === run.fresh);
    const a = rs.length, c = rs.filter(r => r.ok).length;
    if (a) sum.fresh = { id: run.fresh, a, c, ...closeSkillSession(p, run.fresh, a, c) };
    if (!run.practice) p.lastArea = SKILL[run.fresh].area;
  }
  if (!run.practice) dayRec(p).done = true;
  sum.a = run.res.length; sum.c = run.res.filter(r => r.ok).length; sum.min = Math.max(1, Math.round(run.ms / 60000));
  run.closed = true; run.sum = sum; save(); return sum;
}
function endView(p, run) {
  const s = closeRun(p, run); const f = s.fresh; const ft = f ? SKILL[f.id] : null;
  let freshTxt = '';
  if (f && f.mastered) freshTxt = `Has dominat «${esc(ft.t)}». Nou segell al carnet!`;
  else if (f && f.pct >= MASTER_PCT) freshTxt = `«${esc(ft.t)}»: ${f.pct} % a la primera. Si un altre dia també ho fas tan bé, la dominaràs.`;
  else if (f) freshTxt = `«${esc(ft.t)}»: ${f.pct} % a la primera. Tornarem a practicar-la, amb una altra explicació.`;
  const revOk = s.reviews.filter(r => r.out === 'ok').length;
  return `<section class="qcard wide" style="${ft ? cvars(ft.area) : ''}">
  <div class="endgrid">
    <div>
      <div class="qtag"><i></i>Refugi</div>
      <h1 style="margin-top:10px">Sessió acabada!</h1>
      <div class="facts">
        <div><b>${s.c} de ${s.a}</b><small>encertades a la primera</small></div>
        <div><b>${s.min}</b><small>${s.min === 1 ? 'minut' : 'minuts'}</small></div>
        <div><b>+${s.c + (f && f.mastered ? 5 : 0)}</b><small>estrelles</small></div>
      </div>
      ${freshTxt ? `<p style="font-size:1.15rem">${freshTxt}</p>` : ''}
      ${s.reviews.length ? `<p style="margin-top:10px;color:var(--muted)">Repàs: ${revOk} de ${s.reviews.length} habilitats sense cap errada. Les tornarem a veure d'ací a uns dies.</p>` : ''}
      ${s.fix.length ? `<h2 style="font-size:1.1rem;margin-top:22px">Correcció de l'escalfament</h2><ul class="fix">${s.fix.map(x => `<li>${esc(x.prompt)}<br>Has dit <s>${esc(x.given)}</s>, la resposta és <b>${esc(x.answer)}</b>. ${esc(x.explain)}</li>`).join('')}</ul>`
                  : s.reviews.length ? `<p style="margin-top:12px">L'escalfament, tot bé.</p>` : ''}
      <div style="margin-top:26px;display:flex;gap:12px;flex-wrap:wrap">${run.practice && run.pid ? `<button class="btn btn-main btn-big" data-more="${run.pid}">Més exercicis</button><button class="btn btn-soft btn-big" data-act="finish">Torna al mapa</button>` : `<button class="btn btn-main btn-big" data-act="finish">${run.practice ? 'Torna al mapa' : 'Fins demà'}</button>`}</div>
    </div>
    <div>${f && f.mastered ? `<div class="newstamp"><span class="seal"><img src="${ft.img}" alt=""></span><b>${esc(ft.t)}</b><small>Segell nou</small></div>`
       : ft ? `<div class="newstamp"><img src="${ft.img}" alt="" style="width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:14px"><b>${esc(ft.t)}</b><small class="num">Dies amb ${MASTER_PCT} % o més: ${goodDays(sk(p, ft.id))} de ${MASTER_DAYS}</small></div>` : ''}</div>
  </div></section>`;
}

/* minijoc de parelles: recompensa breu; no promet millorar res */
function gameView(p) {
  if (!V.G) { const n = Math.min(8, 4 + Math.floor(p.games / 2)); const pics = shuffle(PHOTOS).slice(0, n); V.G = { cards: shuffle([...pics, ...pics].map((x, i) => ({ k: x.l, s: x.s }))), up: [], ok: [], moves: 0 }; }
  const G = V.G, n = G.cards.length / 2, done = G.ok.length === G.cards.length;
  return `<section class="qcard" aria-labelledby="gm-h">
    <div class="qtag"><i style="background:var(--accent)"></i>Joc de recompensa</div>
    <h2 id="gm-h" class="prompt">${done ? `Fet en ${G.moves} intents!` : `Troba les ${n} parelles`}</h2>
    <div class="memo" style="--cols:${n <= 4 ? 4 : n <= 6 ? 4 : 4}">${G.cards.map((c, i) => { const shown = G.up.includes(i) || G.ok.includes(i); return `<button class="card ${G.ok.includes(i) ? 'ok' : G.up.includes(i) ? 'up' : ''}" data-card="${i}" aria-label="${shown ? esc(c.k) : 'Carta tapada'}" ${G.ok.includes(i) ? 'disabled' : ''}>${ico('i-star', '')}<img src="${c.s}" alt=""></button>`; }).join('')}</div>
    <div style="display:flex;gap:12px;flex-wrap:wrap;justify-content:center">${done ? `<button class="btn btn-main btn-big" data-act="gamedone">Al refugi</button>` : `<button class="btn-text" data-act="gamedone">Salta el joc</button>`}</div>
  </section>`;
}
function flip(i) {
  const G = V.G; if (G.up.length === 2 || G.up.includes(i) || G.ok.includes(i)) return;
  G.up.push(i); render();
  if (G.up.length === 2) { G.moves++; const [a, b] = G.up; setTimeout(() => { if (G.cards[a].k === G.cards[b].k) G.ok.push(a, b); G.up = []; render(); }, G.cards[a].k === G.cards[b].k ? 350 : 900); }
}

/* ======================= prova de nivell ======================= */
function startDiag(areaId) { const D = buildDiag(areaId); diagNext(D); Q = { i: 0, tries: 0, typed: '', locked: false }; tick = Date.now(); go({ name: 'diag', D }); }
function vDiag() {
  const D = V.D; const a = AREA[D.area];
  if (D.over) {
    const r = D.over; const start = currentSkill(P(), D.area);
    return `<div class="run"><div class="runbar"><span class="stage">Prova de nivell · ${esc(a.short)}</span></div><main class="runbody" id="main"><section class="qcard wide" style="${cvars(D.area)}">
      <div class="qtag"><i></i>Prova de nivell</div><h1 class="prompt" style="max-width:none">Ja sabem per on començar</h1>
      <p style="font-size:1.15rem">Has encertat <b class="num">${r.c} de ${r.a}</b>.${r.known.length ? ` Ja saps: ${r.known.map(id => '«' + esc(SKILL[id].t) + '»').join(', ')}. Ho repassarem d'ací a uns dies per a comprovar-ho.` : ''}</p>
      ${start ? `<p style="font-size:1.15rem">El camí de ${esc(a.short)} comença per «${esc(start.t)}».</p>` : ''}
      <div><button class="btn btn-main btn-big" data-go="home">Fet</button></div></section></main></div>`;
  }
  const q = D.q; const t = SKILL[D.cur];
  Q = Q || { i: D.n, tries: 0, typed: '', locked: false };
  return `<div class="run"><div class="runbar" style="${cvars(D.area)}"><button class="exit" data-go="home">${ico('i-x')}<span>Surt</span></button>
    <div class="route" aria-hidden="true"><span class="leg" style="--w:1"><i style="width:${(a.topics.length - D.queue.length - 1) / a.topics.length * 100}%"></i></span></div><span class="stage">Prova de nivell</span></div>
    <main class="runbody" id="main"><section class="qcard" id="card" style="${cvars(D.area)}" aria-labelledby="prompt">
    <div class="qtag"><i></i>Prova de nivell · ${esc(a.short)} · ${esc(t.t)}</div>
    <p class="prompt" id="prompt">${q.prompt}</p>
    <button class="speak" data-act="say">${ico('i-sound')}Escolta</button>
    ${visuals(q)}${answerControls(q)}
    <button class="hintbtn" data-act="dunno">Encara no ho sé</button>
    <div id="fb" style="width:100%;display:flex;justify-content:center" aria-live="polite"></div></section></main></div>`;
}
function diagAnswerUI(ok, val) {
  const D = V.D; Q.locked = true; diagAnswer(D, ok);
  const q = D.q; if (val !== null) { if (q.kind === 'choice') { markOpts(val, 'picked'); lockOpts(); } else setAns(val); }
  $('#fb').innerHTML = `<div class="fb saved">Resposta guardada.</div>`;
  setTimeout(() => { Q = { i: D.n + 1, tries: 0, typed: '', locked: false }; const nq = diagNext(D); if (!nq) { const p = P(); dayRec(p).ms += Math.min(Date.now() - tick, 900000); D.over = diagClose(p, D); } render(); window.scrollTo(0, 0); }, 700);
}

/* ======================= famílies ======================= */
function vGate() {
  if (!V.qa) { const a = 6 + Math.floor(Math.random() * 4), b = 12 + Math.floor(Math.random() * 8); V.qa = { a, b }; }
  const pin = !!A.pin;
  return `<div class="center"><div class="welcome gate">
    <button class="btn-text" data-go="${P() ? 'home' : 'profiles'}">${ico('i-back')} Tornar</button>
    <div class="hello" style="margin:12px 0 10px"><h1>Zona de famílies</h1><p>${pin ? 'Escriu el PIN de la família.' : 'Per a entrar, resol aquesta operació.'}</p></div>
    <form data-form="gate">${pin ? '' : `<p class="q num" aria-hidden="true">${V.qa.a} × ${V.qa.b} =</p>`}
      <label class="sr" for="gate-in">${pin ? 'PIN' : `Quant fa ${V.qa.a} per ${V.qa.b}?`}</label>
      <input id="gate-in" type="${pin ? 'password' : 'text'}" inputmode="numeric" autocomplete="off" required style="max-width:220px">
      <div style="margin-top:16px"><button class="btn btn-main" type="submit">Entra</button></div></form>
  </div></div>`;
}
function minutesChart(p) {
  const days = [...Array(14)].map((_, i) => addDays(today(), i - 13)); const vals = days.map(k => Math.round((p.days[k]?.ms || 0) / 60000));
  const max = Math.max(15, ...vals), top = Math.ceil(max / 5) * 5, W = 640, H = 180, L = 30, B = 26, bw = (W - L) / 14;
  const ticks = [0, top / 3, 2 * top / 3, top].map(v => Math.round(v));
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Minuts de sessió els últims 14 dies">
    ${ticks.map(t => { const y = H - B - (t / top) * (H - B - 10); return `<line x1="${L}" x2="${W}" y1="${y}" y2="${y}" stroke="var(--surface-2)"/><text x="${L - 6}" y="${y + 4}" text-anchor="end" font-size="11" fill="var(--muted)">${t}</text>`; }).join('')}
    ${vals.map((v, i) => { const h = (v / top) * (H - B - 10), x = L + i * bw + 4; return `${v ? `<rect x="${x}" y="${H - B - h}" width="${bw - 8}" height="${h}" fill="var(--accent)"><title>${fmtDate(days[i])}: ${v} min</title></rect>` : ''}${i % 2 === 1 ? `<text x="${x + (bw - 8) / 2}" y="${H - 8}" text-anchor="middle" font-size="11" fill="var(--muted)">${new Date(days[i] + 'T12:00:00').getDate()}</text>` : ''}`; }).join('')}
  </svg>`;
}
function vAdults() {
  const p = P();
  if (!p) return `<div class="center"><div class="welcome"><div class="hello"><h1>Zona de famílies</h1><p>Encara no hi ha cap perfil en aquest dispositiu.</p></div><button class="btn btn-main" data-go="new">Crea un perfil</button></div></div>`;
  const w = weekInfo(p), last14 = [...Array(14)].map((_, i) => addDays(today(), -i)).filter(k => p.days[k]?.done).length;
  const mastered = Object.values(p.skills).filter(s => s.st === 'mastered').length;
  const review = Object.keys(SKILL).filter(id => p.skills[id] && skillState(p, id) === 'review').length;
  const learning = Object.keys(SKILL).filter(id => p.skills[id] && p.skills[id].st === 'learning');
  const tips = [...learning, ...Object.keys(SKILL).filter(id => p.skills[id] && skillState(p, id) === 'review')].slice(0, 5);
  const errs = p.errors.slice(-5).reverse();
  if (p.settings.sopa === undefined) p.settings.sopa = true;   /* perfils anteriors: la sopa de lletres ve activada */
  const toggle = (k, t, d) => `<div class="toggle"><span><b>${t}</b><br><span class="note">${d}</span></span><button class="switch" role="switch" aria-checked="${!!p.settings[k]}" data-set="${k}" aria-label="${esc(t)}"></button></div>`;
  return shell('adults', `
  <header class="hello"><h1>Zona de famílies</h1><p>Progrés de ${esc(p.alias)}. Les dades només estan en aquest navegador; ningú més les rep.</p></header>
  ${famTools(p)}
  ${A.profiles.length > 1 ? `<div class="seg" role="group" aria-label="Perfil" style="margin-bottom:20px">${A.profiles.map(x => `<button data-switch="${x.id}" aria-pressed="${x.id === p.id}" style="--c:var(--accent)">${esc(x.alias)}</button>`).join('')}</div>` : ''}
  <div class="grid">
    <section class="panel s7" aria-labelledby="ad-week">
      <h2 class="ptitle" id="ad-week">Temps de pràctica <span>últims 14 dies, en minuts</span></h2>
      <div class="kv" style="margin-bottom:12px"><div><b class="num">${w.min}</b><small>minuts aquesta setmana</small></div><div><b class="num">${last14}</b><small>dies amb sessió (14 dies)</small></div></div>
      <div class="chart">${minutesChart(p)}</div>
    </section>
    <section class="panel s5" aria-labelledby="ad-sum">
      <h2 class="ptitle" id="ad-sum">Habilitats</h2>
      <div class="kv"><div><b class="num">${mastered}<small style="font-size:1rem"> / ${TOTAL}</small></b><small>dominades</small></div><div><b class="num">${learning.length}</b><small>en camí</small></div><div><b class="num">${review}</b><small>per repassar</small></div></div>
      <h3 style="font-size:1rem;margin:22px 0 8px">Prova de nivell i ara</h3>
      <table><thead><tr><th>Àrea</th><th class="r">A la prova</th><th class="r">Ara</th></tr></thead><tbody>
      ${AREAS.map(a => { const d = p.diag[a.id], now = areaNow(p, a.id); return `<tr><td>${esc(a.short)}</td><td class="r">${d && d.a ? Math.round(d.c / d.a * 100) + ' %' : '—'}</td><td class="r">${now === null ? '—' : now + ' %'}</td></tr>`; }).join('')}
      </tbody></table>
      <p class="note" style="margin-top:8px">«Ara» és l'encert a la primera dels repassos i de les dues últimes sessions de cada habilitat.</p>
    </section>
    <section class="panel s6" aria-labelledby="ad-tips"><h2 class="ptitle" id="ad-tips">Idees per a fer a casa</h2>
      ${tips.length ? `<ul class="tips">${tips.map(id => `<li style="${cvars(SKILL[id].area)}"><span><b>${esc(SKILL[id].t)}</b>${esc(TIPS[id] || '')}</span></li>`).join('')}</ul>` : '<p class="note">Quan comence a practicar, ací eixiran idees per a les habilitats que està aprenent.</p>'}
    </section>
    <section class="panel s6" aria-labelledby="ad-err"><h2 class="ptitle" id="ad-err">Errades recents</h2>
      ${errs.length ? `<ul class="errs">${errs.map(e => `<li>${esc(e.q)}<br><small>${esc(SKILL[e.s]?.t || '')} · ${relDay(e.d)} · va dir «${esc(e.g)}», era «${esc(e.a)}»</small></li>`).join('')}</ul>` : '<p class="note">Cap errada registrada encara.</p>'}
    </section>
    ${AREAS.map(a => `<section class="panel s12" style="${cvars(a.id)}" aria-labelledby="ad-${a.id}"><h2 class="ptitle" id="ad-${a.id}">${esc(a.name)} <span>2n curs, primer cicle</span></h2><div class="tbl"><table>
      <thead><tr><th>Habilitat</th><th>Sabers bàsics (RD 157/2022)</th><th>Estat</th><th class="r">Última sessió</th><th class="r">Repassos</th><th class="r">Últim dia</th></tr></thead><tbody>
      ${a.topics.map(t => { const s = p.skills[t.id], st = skillState(p, t.id), lp = s ? lastPct(s) : null; return `<tr><td><b>${esc(t.t)}</b><small>${esc(t.s || '')}</small></td><td>${esc(t.block)}</td>
        <td><span class="chip ${st === 'mastered' ? 'ok' : st === 'review' ? 'rev' : st === 'learning' ? 'cur' : ''}">${stTxt(p, t.id, st)}</span></td>
        <td class="r">${lp === null ? '—' : lp + ' %'}</td><td class="r">${s && s.ra ? `${s.rc} / ${s.ra}` : '—'}</td><td class="r">${relDay(s?.last)}</td></tr>`; }).join('')}
      </tbody></table></div></section>`).join('')}
  </div>
  <p class="note" style="margin-top:10px">La correspondència amb els blocs de sabers bàsics és orientativa (RD 157/2022 i Decret 106/2022 de la Comunitat Valenciana).</p>

  <section style="margin-top:40px" aria-labelledby="ad-set"><h2 id="ad-set" style="font-family:var(--serif);font-weight:400;font-size:2rem;margin-bottom:10px">Opcions</h2>
    <div class="setrow"><div><h3>Durada de la sessió</h3><p>La sessió s'acaba sola; no hi ha «una més».</p></div>
      <div class="seg" role="group" aria-label="Durada">${[[10, 'Uns 10 minuts'], [15, 'Uns 15 minuts']].map(([v, l]) => `<button data-len="${v}" aria-pressed="${(p.settings.len >= 15 ? 15 : 10) === v}" style="--c:var(--accent)">${l}</button>`).join('')}</div></div>
    <div class="setrow"><div><h3>Durant la sessió</h3><p>El joc és només una recompensa d'un minut.</p></div><div>
      ${toggle('sopa', 'Sopa de lletres i mots encreuats', 'Un joc de paraules en acabar la pràctica de valencià, castellà i anglés.')}
      ${toggle('game', 'Joc de parelles al final', 'Un joc curt de memòria amb fotos.')}
      ${toggle('sound', 'Sons', 'Sons curts quan encerta, quan falla i en els jocs.')}
      ${toggle('jocs', 'Zona de jocs', 'Mostra la pestanya «Jocs» amb jocs de nombres per a jugar quan vulga.')}
      ${toggle('voice', 'Llegir les preguntes en veu alta', 'Fa servir la veu del navegador, sense connexió.')}
      ${toggle('free', 'Pràctica lliure des del mapa', 'Permet practicar habilitats fora de la sessió diària.')}</div></div>
    <div class="setrow"><div><h3>PIN de la família</h3><p>Substitueix l'operació de l'entrada. Es guarda en aquest dispositiu.</p></div>
      <form data-form="pin" style="display:flex;gap:10px;flex-wrap:wrap;align-items:center"><label class="sr" for="pin-in">PIN nou</label><input id="pin-in" type="password" inputmode="numeric" minlength="4" maxlength="8" pattern="[0-9]{4,8}" placeholder="4 a 8 xifres" style="max-width:200px" aria-describedby="pin-h"><button class="btn btn-soft" type="submit">Desa el PIN</button>${A.pin ? `<button class="btn-text" type="button" data-act="nopin">Treu el PIN</button>` : ''}<p class="note" id="pin-h" style="width:100%">Només xifres, de 4 a 8.</p></form></div>
    <div class="setrow"><div><h3>Còpia del progrés</h3><p>Per a canviar de dispositiu sense servidor: desa el fitxer i obri'l a l'altre dispositiu des de «Recupera un progrés guardat». Si esborreu les dades del navegador, el progrés es perd.</p></div>
      <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center"><button class="btn btn-soft" data-act="export">${ico('i-down')}Desa una còpia</button>
      <label class="btn btn-soft" style="cursor:pointer">${ico('i-up')}Recupera una còpia<input type="file" accept="application/json,.json" data-import hidden></label></div></div>
    <div class="setrow"><div><h3>Esborrar el perfil</h3><p>S'esborra tot el progrés de ${esc(p.alias)} d'aquest dispositiu.</p></div><div><button class="btn btn-danger" data-act="delete">Esborra el perfil</button></div></div>
    <div class="setrow"><div><h3>Privacitat</h3><p>Sense comptes, sense analítica, sense publicitat i sense serveis de tercers.</p></div><div><a class="btn btn-soft" href="privacitat.html">Llig la pàgina de privacitat</a></div></div>
  </section>`);
}

/* ======================= render i esdeveniments ======================= */
function render() {
  if (V.name !== 'profiles' && V.name !== 'new' && V.name !== 'intro' && V.name !== 'gate' && V.name !== 'adults' && !P()) V = { name: 'profiles' };
  const views = { profiles: vProfiles, new: vNew, home: vHome, map: vMap, carnet: vCarnet, run: vRun, diag: vDiag, gate: vGate, adults: vAdults, games: vGames, play: vPlay, intro: vIntro, sheet: vSheet };
  if (V.name === 'play' && !V.J) V = { name: 'games' };
  app.innerHTML = (views[V.name] || vHome)();
  document.title = { home: 'Avui', map: 'El mapa', carnet: 'El meu carnet', run: 'Sessió', diag: 'Prova de nivell', adults: 'Famílies', games: 'Jocs', play: 'Jocs', sheet: 'Fitxa' }[V.name] ? `${{ home: 'Avui', map: 'El mapa', carnet: 'El meu carnet', run: 'Sessió', diag: 'Prova de nivell', adults: 'Famílies', games: 'Jocs', play: 'Jocs', sheet: 'Fitxa' }[V.name]} · Motxilla 2A` : 'Motxilla 2A';
  if (V.name === 'map') requestAnimationFrame(drawTrail);
}
window.addEventListener('resize', () => { if (V.name === 'map') drawTrail(); });

app.addEventListener('click', e => {
  const el = e.target.closest('button,a,[data-card]'); if (!el) return;
  const d = el.dataset;
  if (el.tagName === 'A' && d.go) e.preventDefault();
  if (d.go) { if (d.go === 'gate') return go({ name: 'gate' }); if (d.go === 'profiles') { A.current = null; save(); } return go({ name: d.go }); }
  if (d.profile) { A.current = d.profile; save(); return go({ name: 'home' }); }
  if (d.avatar) { V.avatar = d.avatar; V.alias = ($('#alias') || {}).value || ''; render(); const b = $$('[data-avatar]').find(x => x.dataset.avatar === d.avatar); if (b) b.focus(); return; }
  if (d.map) return go({ name: 'map', area: d.map });
  if (d.sel) { V.sel = d.sel; render(); const b = $(`[data-sel="${d.sel}"]`); if (b) b.focus(); if (innerWidth < 860) $('.detail').scrollIntoView({ behavior: 'smooth' }); return; }
  if (d.diag) return startDiag(d.diag);
  if (d.practice) return startRun(d.practice);
  if (d.more) return startRun(d.more, true);
  if (d.opt !== undefined) { const q = curQ().q; return answer(q.options[+d.opt]); }
  if (d.key) return key(d.key);
  if (d.card !== undefined) return flip(+d.card);
  if (d.set) { const p = P(); p.settings[d.set] = !p.settings[d.set]; save(); render(); const s = $(`[data-set="${d.set}"]`); if (s) s.focus(); return; }
  if (d.len) { P().settings.len = +d.len; save(); render(); return; }
  if (d.switch) { A.current = d.switch; save(); render(); return; }
  const act = d.act;
  if (act === 'start') return startRun();
  if (act === 'say') return sayQ();
  if (act === 'saylearn') { const st = P().run.steps[P().run.i], t = SKILL[st.skill]; return say(t.t + '. ' + (t.learn || []).join(' '), AREA[t.area].lang); }
  if (act === 'step') { V.step = (V.step || 1) + 1; render(); return; }
  if (act === 'next') return nextStep();
  if (act === 'hint') { const q = curQ().q; $('#fb').innerHTML = `<div class="fb hint"><strong>Pista</strong><span>${esc(q.hint || 'Llig-ho una altra vegada a poc a poc.')}</span></div>`; el.hidden = true; return; }
  if (act === 'dunno') return diagAnswerUI(false, null);
  if (act === 'gamedone') { P().games++; V.G = null; return nextStep(); }
  if (act === 'finish') { const pr = P().run && P().run.practice; P().run = pr ? null : P().run; save(); return go({ name: pr ? 'map' : 'home' }); }
  if (act === 'exit') {
    const m = modal(`<h2>Vols parar?</h2><p>El que has fet es queda guardat. Pots continuar avui mateix des de l'inici.</p><div class="row"><button class="btn btn-main" data-m="stay">Continue</button><button class="btn btn-soft" data-m="leave">Para</button></div>`);
    m.addEventListener('click', ev => { const b = ev.target.closest('[data-m]'); if (!b) return; closeModal(); if (b.dataset.m === 'leave') { addTime(); save(); go({ name: 'home' }); } });
    return;
  }
  if (act === 'export') { const p = P(); const blob = new Blob([exportData(p)], { type: 'application/json' }); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `motxilla-${p.alias.replace(/[^\w-]+/g, '_')}-${today()}.json`; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 2000); return toast('Còpia desada a les descàrregues.'); }
  if (act === 'nopin') { A.pin = null; save(); render(); return toast('PIN tret.'); }
  if (act === 'delete') {
    const p = P(); const m = modal(`<h2>Esborrar ${esc(p.alias)}?</h2><p>Es perdrà tot el progrés d'aquest perfil en aquest dispositiu. Si voleu, abans podeu desar-ne una còpia.</p><div class="row"><button class="btn btn-soft" data-m="no">No l'esborres</button><button class="btn btn-danger" data-m="yes">Esborra'l</button></div>`);
    m.addEventListener('click', ev => { const b = ev.target.closest('[data-m]'); if (!b) return; closeModal(); if (b.dataset.m === 'yes') { A.profiles = A.profiles.filter(x => x.id !== p.id); A.current = null; save(); go({ name: 'profiles' }); toast('Perfil esborrat.'); } });
  }
});

app.addEventListener('submit', e => {
  e.preventDefault(); const f = e.target.dataset.form;
  if (f === 'new') { const alias = $('#alias').value.trim(); if (!alias) return $('#alias').focus(); newProfile(alias, V.avatar || AVATARS[0].id); go({ name: 'home' }); }
  if (f === 'gate') {
    const v = $('#gate-in').value.trim(); const ok = A.pin ? v === A.pin : +v === V.qa.a * V.qa.b;
    if (ok) { V.qa = null; if (!P() && A.profiles.length) A.current = A.profiles[0].id; go({ name: 'adults' }); }
    else { $('#gate-in').value = ''; toast(A.pin ? 'Aquest no és el PIN.' : 'No és correcte. Torna-ho a provar.'); V.qa = null; render(); }
  }
  if (f === 'pin') { const v = $('#pin-in').value.trim(); if (!/^\d{4,8}$/.test(v)) return toast('El PIN ha de tindre de 4 a 8 xifres.'); A.pin = v; save(); render(); toast('PIN desat.'); }
});

app.addEventListener('change', e => {
  if (!e.target.matches('[data-import]')) return; const file = e.target.files[0]; if (!file) return;
  file.text().then(t => { try { const p = importData(t); toast(`Progrés de ${p.alias} recuperat.`); go({ name: 'home' }); } catch (err) { toast('Aquest fitxer no és una còpia de la Motxilla.'); } });
});

/* teclat físic per als números i les opcions */
document.addEventListener('keydown', e => {
  if (!(V.name === 'run' || V.name === 'diag') || !Q || e.target.matches('input')) return;
  const q = curQ().q; if (!q) return;
  if (q.kind === 'num') { if (/^\d$/.test(e.key)) key(e.key); else if (e.key === 'Backspace') key('del'); else if (e.key === 'Enter') key('ok'); }
  else if (/^[1-4]$/.test(e.key) && q.options[+e.key - 1] !== undefined && !Q.locked) answer(q.options[+e.key - 1]);
});

/* funciona sense connexió quan es publica en un servidor (GitHub Pages, Netlify…) */
if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) navigator.serviceWorker.register('sw.js').catch(() => {});

render();
