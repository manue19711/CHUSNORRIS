// Catàleg d'activitats (contingut original de demostració)
const TOPICS = {
  num: "Nombres i operacions",
  alg: "Àlgebra",
  geo: "Geometria",
  fun: "Funcions",
  est: "Estadística i probabilitat",
  pro: "Proporcionalitat",
};
const TYPES = { joc: "Joc", ws: "Fitxa", rep: "Repte" };

const ACTIVITIES = [
  ["Arrels quadrades al teorema de Pitàgores", "geo", "joc", ["2n d'ESO"]],
  ["Descobreix el valor de π amb polígons", "geo", "rep", ["2n d'ESO"]],
  ["La suma dels angles d'un triangle", "geo", "joc", ["1r d'ESO", "2n d'ESO"]],
  ["Dibuixa rectes a partir de la seva taula", "fun", "joc", ["2n d'ESO"]],
  ["Compta xifres significatives", "num", "ws", ["2n d'ESO"]],
  ["Notació científica en situacions reals", "num", "joc", ["2n d'ESO", "3r d'ESO"]],
  ["Compara mitjanes de dos grups", "est", "joc", ["2n d'ESO"]],
  ["Histogrames amb dades contínues", "est", "ws", ["2n d'ESO"]],
  ["Llegeix gràfics i treu conclusions", "est", "rep", ["1r d'ESO", "2n d'ESO"]],
  ["Núvols de punts i correlació", "est", "joc", ["2n d'ESO"]],
  ["Probabilitat d'esdeveniments compostos", "est", "joc", ["2n d'ESO"]],
  ["Taules de contingència i probabilitat", "est", "ws", ["2n d'ESO"]],
  ["El principi multiplicatiu", "est", "rep", ["2n d'ESO"]],
  ["Descomposició en factors primers", "num", "joc", ["1r d'ESO", "2n d'ESO"]],
  ["Interès simple i el seu gràfic", "pro", "joc", ["2n d'ESO"]],
  ["Potències amb exponent enter", "num", "ws", ["2n d'ESO"]],
  ["Multiplica polinomis amb àrees", "alg", "joc", ["2n d'ESO"]],
  ["Àrees de figures compostes", "geo", "rep", ["2n d'ESO"]],
  ["Expressions equivalents", "alg", "joc", ["2n d'ESO"]],
  ["Tradueix enunciats a llenguatge algebraic", "alg", "ws", ["1r d'ESO", "2n d'ESO"]],
  ["Escala de mapes i distàncies", "pro", "joc", ["2n d'ESO"]],
  ["Diagrames de flux i seqüències", "alg", "rep", ["2n d'ESO"]],
  ["Patrons amb imatges i regles", "alg", "joc", ["2n d'ESO"]],
  ["Continua seqüències visuals", "alg", "ws", ["2n d'ESO"]],
  ["Construeix cercles amb compàs", "geo", "joc", ["2n d'ESO"]],
  ["Arrodoniment a xifres significatives", "num", "joc", ["2n d'ESO"]],
  ["Bisectrius i perpendiculars", "geo", "ws", ["2n d'ESO"]],
  ["Arena: operacions combinades", "num", "rep", ["2n d'ESO"]],
  ["Arena: propietats dels nombres", "num", "rep", ["2n d'ESO", "3r d'ESO"]],
  ["Interseccions de cercles", "geo", "joc", ["2n d'ESO"]],
  ["Equacions de primer grau amb balances", "alg", "joc", ["2n d'ESO"]],
  ["Sistemes d'equacions gràficament", "alg", "rep", ["2n d'ESO", "3r d'ESO"]],
  ["Pendent i ordenada a l'origen", "fun", "joc", ["2n d'ESO"]],
  ["Funcions a partir d'enunciats", "fun", "ws", ["2n d'ESO"]],
  ["Proporcionalitat directa i inversa", "pro", "joc", ["2n d'ESO"]],
  ["Percentatges encadenats", "pro", "ws", ["2n d'ESO"]],
  ["Volum de prismes i cilindres", "geo", "joc", ["2n d'ESO"]],
  ["Semblança de triangles", "geo", "rep", ["2n d'ESO"]],
  ["Mediana, moda i rang", "est", "joc", ["1r d'ESO", "2n d'ESO"]],
  ["Fraccions i decimals periòdics", "num", "ws", ["2n d'ESO"]],
  ["Teorema de Tales", "geo", "joc", ["2n d'ESO", "3r d'ESO"]],
  ["Identitats notables", "alg", "ws", ["2n d'ESO", "3r d'ESO"]],
];

const PALETTES = [
  ["#7cc242", "#4e9a1f"], ["#3aa3e3", "#1d6fb8"], ["#f7b733", "#e08a00"], ["#e86fa7", "#b83c7b"],
  ["#8f7cf0", "#5a45c9"], ["#2cc0a8", "#138a78"], ["#f2784b", "#c94a1d"], ["#c9a46a", "#8e6a33"],
];
const GLYPHS = { num: ["7·10³", "0,25", "2³·3", "√49"], alg: ["4x−8", "a²+b²", "x=?", "3(x+2)"], geo: ["△", "π", "90°", "◯"], fun: ["y=mx", "f(x)", "↗", "(2,5)"], est: ["μ", "P(A)", "📊", "x̄"], pro: ["%", "1:50", "a/b", "×1,2"] };

function art(i, topic) {
  const [a, b] = PALETTES[i % PALETTES.length];
  const g = GLYPHS[topic][i % 4];
  const r = (n) => ((i * 37 + n * 53) % 100);
  return `<svg viewBox="0 0 300 200" aria-hidden="true">
    <defs><radialGradient id="g${i}" cx="30%" cy="30%" r="90%"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></radialGradient></defs>
    <rect width="300" height="200" fill="url(#g${i})"/>
    <circle cx="${40 + r(1) * 2.2}" cy="${30 + r(2) * 1.2}" r="${18 + r(3) / 4}" fill="#fff" opacity=".14"/>
    <circle cx="${60 + r(4) * 2}" cy="${120 + r(5) * .6}" r="${30 + r(6) / 3}" fill="#fff" opacity=".1"/>
    <g transform="rotate(${(i % 5) - 2} 150 100)">
      <rect x="70" y="52" width="160" height="96" rx="6" fill="#fffdf6"/>
      ${[0, 1, 2, 3, 4].map((k) => `<line x1="78" x2="222" y1="${70 + k * 18}" y2="${70 + k * 18}" stroke="#bcd6f2" stroke-width="1"/>`).join("")}
      <text x="150" y="112" text-anchor="middle" font-family="Nunito Sans, sans-serif" font-weight="700" font-size="34" fill="#1d3f66">${g}</text>
    </g>
    <circle cx="252" cy="160" r="20" fill="#fff" opacity=".9"/><circle cx="246" cy="156" r="3" fill="#162736"/><circle cx="258" cy="156" r="3" fill="#162736"/>
    <path d="M244 166 q8 7 16 0" stroke="#162736" stroke-width="2" fill="none" stroke-linecap="round"/>
  </svg>`;
}

const PER_PAGE = 24;
const state = { topics: new Set(), types: new Set(), page: 1 };
const $ = (s) => document.querySelector(s);

function renderFilterList(el, dict, set) {
  el.innerHTML = Object.entries(dict).map(([k, v]) =>
    `<li><label><input type="checkbox" value="${k}"> ${v} <small>(${ACTIVITIES.filter((a) => a[1] === k || a[2] === k).length})</small></label></li>`).join("");
  el.addEventListener("change", (e) => {
    e.target.checked ? set.add(e.target.value) : set.delete(e.target.value);
    state.page = 1;
    render();
  });
}

function render() {
  const list = ACTIVITIES.map((a, i) => ({ a, i })).filter(({ a }) =>
    (!state.topics.size || state.topics.has(a[1])) && (!state.types.size || state.types.has(a[2])));
  const pages = Math.max(1, Math.ceil(list.length / PER_PAGE));
  state.page = Math.min(state.page, pages);
  const start = (state.page - 1) * PER_PAGE;
  const slice = list.slice(start, start + PER_PAGE);

  $("#count").textContent = list.length
    ? `${start + 1} - ${start + slice.length} de ${list.length} resultats`
    : "0 resultats";

  $("#grid").innerHTML = slice.length ? slice.map(({ a: [title, topic, type, grades], i }) => `
    <article class="card" tabindex="0">
      <div class="card__img">${art(i, topic)}<span class="badge">${grades.join(" · ")}</span></div>
      <h3>${title}</h3>
      <small>${TOPICS[topic]} · ${TYPES[type]}</small>
    </article>`).join("") : `<p class="empty">Cap activitat coincideix amb aquests filtres.</p>`;

  const pager = $("#pager");
  pager.innerHTML = Array.from({ length: pages }, (_, k) =>
    `<button data-p="${k + 1}" ${k + 1 === state.page ? 'aria-current="page"' : ""}>${k + 1}</button>`).join("") +
    `<button class="arrow" data-p="${state.page + 1}" aria-label="Pàgina següent" ${state.page >= pages ? "disabled" : ""}>›</button>`;
}

$("#pager").addEventListener("click", (e) => {
  const p = e.target.closest("button")?.dataset.p;
  if (!p) return;
  state.page = +p;
  render();
  document.querySelector(".results").scrollIntoView({ behavior: "smooth" });
});

renderFilterList($("#topicList"), TOPICS, state.topics);
renderFilterList($("#typeList"), TYPES, state.types);
render();

// Menú mòbil i calaix de filtres
const scrim = document.querySelector("[data-scrim]");
document.querySelector("[data-toggle-nav]").addEventListener("click", (e) => {
  const open = $("#nav").classList.toggle("open");
  e.currentTarget.setAttribute("aria-expanded", open);
});
document.querySelectorAll("[data-toggle-filters]").forEach((b) => b.addEventListener("click", () => {
  const open = $("#filters").classList.toggle("open");
  scrim.classList.toggle("on", open);
}));
scrim.addEventListener("click", () => { $("#filters").classList.remove("open"); scrim.classList.remove("on"); });
