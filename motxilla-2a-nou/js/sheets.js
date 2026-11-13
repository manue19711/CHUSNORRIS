/* Fitxes per a imprimir o guardar en PDF, gestió d'alumnes i dibuix propi per al perfil.
   El PDF el fa el navegador mateix (Imprimeix > Guardar com a PDF): sense servidors ni programes afegits. */

/* ---------- eines de la zona de famílies ---------- */
function famTools(p) {
  const cur = plan(p).fresh || 'm1';
  return `<div class="grid ftools">
  <section class="panel s7" aria-labelledby="ft-pdf"><h2 class="ptitle" id="ft-pdf">Fitxes en PDF <span>per a imprimir i practicar amb llapis</span></h2>
    <div class="sform">
      <label>Tema<select id="sh-skill"><optgroup label="Tot"><option value="eval">Avaluació de totes les àrees</option><option value="all">Tots els temes, un darrere l'altre</option></optgroup>${AREAS.map(a => `<optgroup label="${esc(a.name)}"><option value="area:${a.id}">Tota l'àrea: ${esc(a.short)}</option>${a.topics.map(t => `<option value="${t.id}" ${t.id === cur ? 'selected' : ''}>${esc(t.t)}</option>`).join('')}</optgroup>`).join('')}</select></label>
      <label>Exercicis<select id="sh-n"><option value="0">Només l'explicació</option><option value="6">6 exercicis</option><option value="8">8 exercicis</option><option value="12" selected>12 exercicis</option><option value="20">20 exercicis</option><option value="30">30 exercicis</option><option value="40">40 exercicis</option></select></label>
      <label>Nivell<select id="sh-lv"><option value="1">Fàcil</option><option value="2" selected>Mitjà</option><option value="3">Difícil</option></select></label>
      <label>Models diferents<select id="sh-cp"><option value="1" selected>1 model</option><option value="2">2 models (A i B)</option><option value="3">3 models (A, B i C)</option></select></label>
      <label>Lletra<select id="sh-big"><option value="0" selected>Normal</option><option value="1">Gran</option></select></label>
      <label>Columnes<select id="sh-col"><option value="2" selected>2 columnes</option><option value="1">1 columna, amb més espai</option></select></label>
      <label class="chk"><input type="checkbox" id="sh-learn" checked>Amb l'explicació del tema</label>
      <label class="chk"><input type="checkbox" id="sh-sol" checked>Afig el full de solucions</label>
    </div>
    <button class="btn btn-main" data-mk="sheet">Prepara la fitxa</button>
    <p class="note" style="margin-top:12px">Exercicis nous cada vegada. Amb «Tota l'àrea» o «Tots els temes» ixen els temes seguits (fins a 6 exercicis de cada un). L'«Avaluació» barreja totes les àrees en una prova. Amb diversos models, cada un porta exercicis diferents.</p>
  </section>
  <section class="panel s5" aria-labelledby="ft-al"><h2 class="ptitle" id="ft-al">Alumnes <span>${A.profiles.length} en aquest dispositiu</span></h2>
    <ul class="alist">${A.profiles.map(x => `<li><img src="${av(x.avatar).src}" alt=""><span><b>${esc(x.alias)}</b><small>${Object.values(x.skills).filter(s => s.st === 'mastered').length} dominades · ${x.stars} estrelles</small></span><button class="btn btn-soft" data-pwp="${x.id}">${ico('i-lock')}${x.pw ? 'Canvia' : 'Contrasenya'}</button><button class="btn btn-danger" data-delp="${x.id}">Elimina</button></li>`).join('')}</ul>
    <button class="btn btn-soft" data-go="new">Afig un alumne</button>
  </section></div>`;
}

/* ---------- la fitxa ---------- */
function sheetItems(S) {
  if (!S.items) {
    const cp = Math.max(1, S.cp || 1), all = [];
    for (let m = 0; m < cp; m++) {
      const tag = cp > 1 ? 'Model ' + 'ABC'[m] : '';
      if (S.skill === 'eval') { evalPaper(S.n || 20, S.lv).forEach(g => all.push({ ...g, tag })); continue; }
      const ids = S.skill === 'all' ? Object.keys(SKILL) : S.skill.startsWith('area:') ? AREA[S.skill.slice(5)].topics.map(t => t.id) : [S.skill];
      const per = ids.length > 1 ? Math.min(S.n, 6) : S.n;
      ids.forEach(id => all.push({ id, tag, qs: per ? makeItems(id, S.lv, per) : [] }));
    }
    S.items = all;
  }
  return S.items;
}
function shQ(q) {
  let vis = '';
  if (q.reading) vis += `<div class="reading"><b>${esc(q.reading.t)}</b>${esc(q.reading.x)}</div>`;
  const inVis = (q.visual || '').includes('id="ans"');
  if (q.visual) vis += q.visual.replace(/ id="ans"/g, '').replace(/ aria-live="polite"/g, '').replace(/<span class="ph">\?<\/span>/g, '');
  if (q.pic) vis += `<div class="pic" aria-hidden="true">${q.pic}</div>`;
  const ans = q.kind === 'choice' ? `<ul class="shopts">${q.options.map(o => `<li><i></i>${esc(o)}</li>`).join('')}</ul>` : inVis ? '' : `<div class="shline">Resposta:<i></i></div>`;
  return `<li class="shq"><p>${q.prompt}</p>${vis}${ans}</li>`;
}
function vSheet() {
  const S = V.S, items = sheetItems(S), p = P();
  const head = `<header class="shhead"><b>Motxilla 2A</b><span>Nom: ${p && S.named ? esc(p.alias) : '<i></i>'}</span><span>Data: <i></i></span></header>`;
  const pages = items.map(({ id, qs, tag, area }) => {
    if (area) return `
    <section class="shpage" style="${cvars(area)}">${head}
      <p class="sharea">Avaluació${tag ? ' · ' + tag : ''}</p><h1>${esc(AREA[area].name)}</h1>
      <ol class="shqs">${qs.map(shQ).join('')}</ol>
    </section>`;
    const t = SKILL[id]; return `
    <section class="shpage" style="${cvars(t.area)}">${head}
      <p class="sharea">${esc(AREA[t.area].name)}${tag ? ' · ' + tag : ''}</p><h1>${esc(t.t)}</h1><p class="sub">${esc(t.s || '')}</p>
      ${S.learn === false ? '' : `<div class="shlearn"><h2>Recorda</h2><ol>${(t.learn || []).map(l => `<li>${esc(l)}</li>`).join('')}</ol>${t.demo ? `<div class="demo">${t.demo}</div>` : ''}${t.ex ? `<p class="shex">${esc(t.ex)}</p>` : ''}</div>`}
      ${qs.length ? `<h2>Practica</h2><ol class="shqs">${qs.map(shQ).join('')}</ol>` : ''}
    </section>`; }).join('');
  const sols = S.sol && items.some(x => x.qs.length) ? `<section class="shpage shsol">${head}<h1>Solucions</h1>${items.filter(x => x.qs.length).map(({ id, qs, tag, area }) => `<h2>${esc(area ? AREA[area].name : SKILL[id].t)}${tag ? ' · ' + tag : ''}</h2><ol class="shans">${qs.map(q => `<li><b>${esc(q.answer)}</b>${q.given !== undefined ? `<span>${q.ok ? 'Encertada.' : 'Va respondre: ' + esc(q.given) + '.'}</span>` : ''}${q.explain ? `<span>${esc(q.explain)}</span>` : ''}</li>`).join('')}</ol>`).join('')}</section>` : '';
  return `<div class="shwrap">
    <div class="shbar noprint">
      <button class="btn btn-soft" data-go="${S.back || 'adults'}">${ico('i-back')}Tornar</button>
      <button class="btn btn-main" data-mk="print">${ico('i-down')}Guarda en PDF o imprimeix</button>
      ${items.some(x => x.qs.length) && !S.fixed ? `<button class="btn btn-soft" data-mk="again">Canvia els exercicis</button>` : ''}
      <label class="chk"><input type="checkbox" data-mk="named" ${S.named ? 'checked' : ''}>Posa-hi el nom de ${p ? esc(p.alias) : "l'alumne"}</label>
      <p class="note">Al quadre d'impressió, tria «Guardar com a PDF» com a impressora.</p>
    </div>
    <article class="sheet${S.big ? ' big' : ''}${S.col === 1 ? ' one' : ''}">${pages}${sols}</article></div>`;
}

document.addEventListener('click', e => {
  const sh = e.target.closest('[data-sheet]');
  if (sh) return go({ name: 'sheet', S: { skill: sh.dataset.sheet, n: 12, lv: 2, sol: true, back: 'map' } });
  const mk = e.target.closest('[data-mk]');
  if (mk) {
    const k = mk.dataset.mk;
    if (k === 'sheet') return go({ name: 'sheet', S: { skill: $('#sh-skill').value, n: +$('#sh-n').value, lv: +$('#sh-lv').value, sol: $('#sh-sol').checked, learn: $('#sh-learn').checked, cp: +$('#sh-cp').value, big: $('#sh-big').value === '1', col: +$('#sh-col').value, back: 'adults' } });
    if (k === 'print') return window.print();
    if (k === 'again') { V.S.items = null; render(); return toast('Exercicis nous.'); }
    if (k === 'named') { V.S.named = mk.checked; return render(); }
  }
  const del = e.target.closest('[data-delp]');
  if (del) {
    const x = A.profiles.find(q => q.id === del.dataset.delp); if (!x) return;
    const m = modal(`<h2>Eliminar ${esc(x.alias)}?</h2><p>Es perdrà tot el progrés d'aquest alumne en aquest dispositiu. No es pot desfer.</p><div class="row"><button class="btn btn-soft" data-m="no">No l'elimines</button><button class="btn btn-danger" data-m="yes">Elimina'l</button></div>`);
    m.addEventListener('click', ev => {
      const b = ev.target.closest('[data-m]'); if (!b) return; closeModal();
      if (b.dataset.m !== 'yes') return;
      A.profiles = A.profiles.filter(q => q.id !== x.id);
      if (A.current === x.id) A.current = A.profiles.length ? A.profiles[0].id : null;
      save(); toast(`${x.alias}: alumne eliminat.`);
      go({ name: A.profiles.length && V.name === 'adults' ? 'adults' : 'profiles' });
    });
  }
});

/* ---------- dibuix propi per al perfil (es queda només en aquest dispositiu) ---------- */
document.addEventListener('change', e => {
  if (!e.target.matches('[data-avup]')) return; const file = e.target.files[0]; if (!file) return;
  const img = new Image(), url = URL.createObjectURL(file);
  img.onload = () => {
    const c = document.createElement('canvas'), s = Math.min(img.width, img.height); c.width = c.height = 220;
    c.getContext('2d').drawImage(img, (img.width - s) / 2, (img.height - s) / 2, s, s, 0, 0, 220, 220);
    URL.revokeObjectURL(url);
    V.alias = ($('#alias') || {}).value || ''; V.pw = ($('#pw') || {}).value || ''; V.custom = c.toDataURL('image/jpeg', .82); V.avatar = V.custom; render();
  };
  img.onerror = () => { URL.revokeObjectURL(url); toast('Aquest fitxer no és una imatge.'); };
  img.src = url;
});
