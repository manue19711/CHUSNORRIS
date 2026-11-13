/* Motor: perfils locals, repàs espaiat, domini i construcció de la sessió diària.
   Tot es guarda només en aquest navegador (localStorage). Cap servidor, cap compte, cap analítica. */

const KEY = 'motxilla2.v1';
const INTERVALS = [1, 3, 7, 14, 30];          // dies fins al pròxim repàs
const MASTER_PCT = 85;                          // domini: ≥ 85 % a la primera…
const MASTER_DAYS = 2;                          // …en dues sessions de dies diferents
const MIN_ITEMS = 4;                            // ítems mínims perquè una sessió compte

const dayKey = (d = new Date()) => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
const today = () => dayKey();
const addDays = (k, n) => { const d = new Date(k + 'T12:00:00'); d.setDate(d.getDate() + n); return dayKey(d); };
const daysBetween = (a, b) => Math.round((new Date(b + 'T12:00:00') - new Date(a + 'T12:00:00')) / 864e5);
const uid = () => Math.random().toString(36).slice(2, 9);
/* el dilluns de la setmana d'una data (clau AAAA-MM-DD) */
function monday(k) { const d = new Date(k + 'T12:00:00'); return addDays(k, -((d.getDay() + 6) % 7)); }
/* empremta de la contrasenya: no es guarda mai escrita tal qual */
function pwHash(id, s) { let h = 5381; const t = id + '·' + String(s).trim().toLowerCase(); for (let i = 0; i < t.length; i++) h = ((h << 5) + h + t.charCodeAt(i)) >>> 0; return h.toString(36); }

let STORAGE_OK = true;
function load() {
  try { const r = JSON.parse(localStorage.getItem(KEY)); if (r && r.v === 1) return r; } catch (e) { STORAGE_OK = false; }
  return { v: 1, profiles: [], pin: null, current: null };
}
let A = load();
/* opcions noves (sons i zona de jocs): activades per defecte també en perfils antics */
function normProfile(p) { p.settings = p.settings || {}; for (const k of ['sound', 'jocs']) if (p.settings[k] === undefined) p.settings[k] = true; p.best = p.best || {}; return p; }
A.profiles.forEach(normProfile);
function save() { try { localStorage.setItem(KEY, JSON.stringify(A)); STORAGE_OK = true; } catch (e) { STORAGE_OK = false; } }

const P = () => A.profiles.find(p => p.id === A.current) || null;
/* La variable S la fan servir els generadors de problemes per a posar l'àlies en els enunciats. */
const S = { get name() { const p = P(); return p ? p.alias : ''; } };

function newProfile(alias, avatar) { /* torna el perfil creat */
  const p = { id: uid(), alias: alias.trim().slice(0, 16), avatar, created: today(), stars: 0, games: 0,
    settings: { len: 12, game: true, voice: false, free: true, open2: 1, sound: true, jocs: true }, best: {},
    skills: {}, days: {}, errors: [], diag: {}, run: null, lastArea: null };
  A.profiles.push(p); A.current = p.id; save(); return p;
}
const sk = (p, id) => (p.skills[id] ||= { st: 'new', sess: [], box: 0, due: null, weak: 0, ra: 0, rc: 0, last: null });

/* ---------- estat d'una habilitat al mapa ---------- */
function currentSkill(p, areaId) { return AREA[areaId].topics.find(t => sk(p, t.id).st !== 'mastered') || null; }
function skillState(p, id) {
  const s = sk(p, id), t = SKILL[id];
  if (s.st === 'mastered') return (s.weak || (s.due && s.due <= today())) ? 'review' : 'mastered';
  const cur = currentSkill(p, t.area);
  return 'learning'; /* tots els temes oberts: es pot practicar qualsevol parada */
}
const goodDays = s => new Set(s.sess.filter(x => x.a >= MIN_ITEMS && x.c / x.a * 100 >= MASTER_PCT).map(x => x.d)).size;
const lastPct = s => { const l = s.sess[s.sess.length - 1]; return l && l.a ? Math.round(l.c / l.a * 100) : null; };
const needsReinforce = s => { const l = lastPct(s); return l !== null && l < MASTER_PCT; };

/* ---------- registre ---------- */
function dayRec(p, d = today()) { return (p.days[d] ||= { ms: 0, a: 0, c: 0, done: false }); }
function logAnswer(p, skillId, ok, q, given) {
  const d = dayRec(p); d.a++; if (ok) d.c++;
  const ar = SKILL[skillId] && SKILL[skillId].area; if (ar) { const w = ((p.wk ||= {})[monday(today())] ||= {}), x = (w[ar] ||= { a: 0, c: 0 }); x.a++; if (ok) x.c++; }
  sk(p, skillId).last = today();
  if (!ok) { p.errors.push({ d: today(), s: skillId, q: strip(q.prompt).slice(0, 140), g: given == null ? '—' : String(given), a: q.answer }); if (p.errors.length > 80) p.errors.shift(); }
}

/* Resultat del contingut nou d'un dia → domini */
function closeSkillSession(p, id, a, c) {
  const s = sk(p, id); if (!a) return { mastered: false, pct: null };
  const ex = s.sess.find(x => x.d === today());
  if (ex) { ex.a += a; ex.c += c; } else s.sess.push({ d: today(), a, c });
  if (s.st === 'new') s.st = 'learning';
  const pct = Math.round(c / a * 100);
  if (s.st !== 'mastered' && goodDays(s) >= MASTER_DAYS) {
    s.st = 'mastered'; s.box = 0; s.due = addDays(today(), INTERVALS[0]); s.weak = 0; s.on = today(); p.stars += 5;
    return { mastered: true, pct };
  }
  return { mastered: false, pct, good: goodDays(s) };
}

/* Repàs espaiat: tots encertats → interval següent; una errada → demà; dues seguides → torna a «en curs». */
function closeReview(p, id, a, c) {
  const s = sk(p, id); s.ra += a; s.rc += c;
  const wasDue = s.weak || (s.due && s.due <= today());
  if (c === a && !wasDue) return 'ok';              // repàs extra: no avança el calendari
  if (c === a) { s.box = Math.min(s.box + 1, INTERVALS.length - 1); s.due = addDays(today(), INTERVALS[s.box]); s.weak = 0; return 'ok'; }
  if (s.weak) { s.st = 'learning'; s.weak = 0; s.box = 0; s.due = null; return 'back'; }
  s.weak = 1; s.box = 0; s.due = addDays(today(), 1); return 'weak';
}

/* ---------- generar ítems sense repetir ---------- */
function makeItems(id, lv, n, seen = new Set()) {
  const out = [];
  for (let i = 0; i < n; i++) {
    let q, g = 0;
    do { q = SKILL[id].gen(lv); } while (seen.has(q.prompt + '|' + q.answer) && g++ < 20);
    seen.add(q.prompt + '|' + q.answer); out.push(q);
  }
  return out;
}

/* ---------- la sessió d'avui ---------- */
function plan(p) {
  const long = p.settings.len >= 15;
  const nRev = long ? 8 : 5, nGuided = 3, nInd = long ? 7 : 5;
  const T = today();
  const mastered = Object.keys(p.skills).filter(id => SKILL[id] && p.skills[id].st === 'mastered');
  let due = mastered.filter(id => p.skills[id].weak || (p.skills[id].due && p.skills[id].due <= T))
                    .sort((a, b) => (p.skills[a].due || '') < (p.skills[b].due || '') ? -1 : 1);
  if (!due.length && mastered.length) due = mastered.sort((a, b) => (p.skills[a].last || '') < (p.skills[b].last || '') ? -1 : 1).slice(0, 2);
  const revSkills = due.slice(0, nRev);

  /* contingut nou: primer, el que ja té un dia bo i en necessita un segon; després, rotació d'àrees */
  const cands = AREAS.map(a => currentSkill(p, a.id)).filter(Boolean);
  let fresh = cands.find(t => { const s = sk(p, t.id); return goodDays(s) >= 1 && !s.sess.some(x => x.d === T); })
           || cands.find(t => { const s = sk(p, t.id); return s.st === 'learning' && needsReinforce(s) && !s.sess.some(x => x.d === T); });
  if (!fresh && cands.length) {
    const order = AREAS.map(a => a.id); const start = (order.indexOf(p.lastArea) + 1) % order.length;
    for (let k = 0; k < order.length && !fresh; k++) fresh = cands.find(t => t.area === order[(start + k) % order.length]);
  }

  return { revSkills, fresh: fresh ? fresh.id : null, nRev, nGuided, nInd,
           minutes: Math.round((Math.min(nRev, revSkills.length * 2) * 25 + (fresh ? 90 + (nGuided + nInd) * 40 : 0)) / 60) || 1 };
}

/* Sopa de lletres en acabar la pràctica de valencià, castellà i anglés (es pot apagar a Famílies) */
function addSopa(p, steps, id) {
  if (!id || p.settings.sopa === false || !SOPA_AREAS.includes(SKILL[id].area)) return;
  if (Math.random() < .5) { const C = makeCross(SKILL[id].area, id); if (C) return steps.push({ type: 'creuats', skill: id, C }); }   /* uns dies sopa, uns altres mots encreuats */
  const S = makeSopa(SKILL[id].area, id); if (S) steps.push({ type: 'sopa', skill: id, S });
}

function buildRun(p) {
  const pl = plan(p), steps = [], seen = new Set();
  /* 1. Escalfem: repàs espaiat i intercalat, amb correcció al final */
  const rev = [];
  if (pl.revSkills.length) {
    let k = 0;
    while (rev.length < Math.min(pl.nRev, pl.revSkills.length * 2)) { const id = pl.revSkills[k % pl.revSkills.length]; rev.push({ type: 'review', skill: id, q: makeItems(id, 3, 1, seen)[0] }); k++; }
  }
  shuffle(rev).forEach(x => steps.push(x));
  /* 2-4. Contingut nou: explicació, exemple resolt, pràctica guiada i pràctica autònoma */
  if (pl.fresh) {
    const s = sk(p, pl.fresh), re = needsReinforce(s);
    steps.push({ type: 'learn', skill: pl.fresh, again: re });
    steps.push({ type: 'example', skill: pl.fresh, q: makeItems(pl.fresh, 1, 1, seen)[0] });
    makeItems(pl.fresh, 1, pl.nGuided, seen).forEach(q => steps.push({ type: 'guided', skill: pl.fresh, q }));
    const lvl = re ? 2 : (goodDays(s) >= 1 ? 3 : 2);
    makeItems(pl.fresh, lvl, pl.nInd, seen).forEach((q, i) => steps.push({ type: 'ind', skill: pl.fresh, q: i >= pl.nInd - 2 ? makeItems(pl.fresh, 3, 1, seen)[0] : q }));
  }
  addSopa(p, steps, pl.fresh);
  if (p.settings.game && steps.length) steps.push({ type: 'game' });
  steps.push({ type: 'end' });
  return { d: today(), i: 0, steps, res: [], fresh: pl.fresh, ms: 0 };
}

/* Pràctica lliure (si la família l'activa): una habilitat, sense límit de dia */
function buildPractice(p, id, more) {
  const st = skillState(p, id), seen = new Set(), steps = [];
  if (st === 'learning') { if (!more) steps.push({ type: 'learn', skill: id }); [1, 2, 2, 2, 2, 3, 3, 3].forEach(lv => makeItems(id, lv, 1, seen).forEach(q => steps.push({ type: 'ind', skill: id, q }))); }
  else [2, 2, 3, 3, 3, 3, 2, 3].forEach(lv => makeItems(id, lv, 1, seen).forEach(q => steps.push({ type: 'review', skill: id, q })));
  addSopa(p, steps, id);
  steps.push({ type: 'end' });
  return { d: today(), i: 0, steps, res: [], fresh: st === 'learning' ? id : null, ms: 0, practice: true, pid: id };
}

/* ---------- prova de nivell adaptativa (per àrea) ----------
   Cada habilitat: un ítem de nivell 2; si l'encerta, un de nivell 3. Dos encerts = «ja ho sap» (es repassarà igualment). */
function buildDiag(areaId) {
  const seen = new Set();
  return { d: today(), area: areaId, i: 0, queue: AREA[areaId].topics.map(t => t.id), cur: null, stage: 2, q: null, res: {}, n: 0 };
}
function diagNext(D) {
  if (!D.cur || D.stage === 3 || !D.lastOk) { D.cur = D.queue.shift() || null; D.stage = 2; if (!D.cur) return null; D.res[D.cur] = { c2: false, c3: false }; }
  else D.stage = 3;
  D.q = SKILL[D.cur].gen(D.stage); D.n++; return D.q;
}
function diagAnswer(D, ok) { D.lastOk = ok; if (D.stage === 2) D.res[D.cur].c2 = ok; else D.res[D.cur].c3 = ok; }
function diagClose(p, D) {
  let a = 0, c = 0; const known = [];
  Object.entries(D.res).forEach(([id, r]) => { a += r.c2 !== undefined ? 1 : 0; c += r.c2 ? 1 : 0; if (r.c3 !== undefined && r.c2) { a++; if (r.c3) c++; }
    const s = sk(p, id);
    if (r.c2 && r.c3 && s.st !== 'mastered') { s.st = 'mastered'; s.box = 1; s.due = addDays(today(), INTERVALS[1]); s.diag = true; known.push(id); } });
  p.diag[D.area] = { d: today(), a, c }; save();
  return { a, c, known };
}

/* Mesura pròpia (sense analítica): encert a la prova de nivell vs. encert actual en repassos */
function areaNow(p, areaId) {
  let a = 0, c = 0;
  AREA[areaId].topics.forEach(t => { const s = p.skills[t.id]; if (!s) return; a += s.ra; c += s.rc; s.sess.slice(-2).forEach(x => { a += x.a; c += x.c; }); });
  return a ? Math.round(c / a * 100) : null;
}

/* ---------- utilitats ---------- */
function strip(h) { return String(h).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim(); }
function exportData(p) { return JSON.stringify({ app: 'motxilla2', v: 1, exported: new Date().toISOString(), profile: { ...p, run: null } }, null, 1); }
function importData(txt) {
  const o = JSON.parse(txt);
  if (!o || o.app !== 'motxilla2' || !o.profile || !o.profile.alias) throw new Error('format');
  const p = normProfile(o.profile); const ex = A.profiles.find(x => x.id === p.id);
  if (ex) Object.assign(ex, p); else A.profiles.push(p);
  A.current = p.id; save(); return p;
}
