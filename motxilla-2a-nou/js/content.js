/* Continguts reutilitzats de "La Motxilla de Segon" (disseny anterior).
   Generadors d'exercicis: retornen {kind, prompt, answer, options?, hint, explain, visual?, reading?, pic?}. */
const IMG={"c1": "img/c1.jpg", "c2": "img/c2.jpg", "c3": "img/c3.jpg", "c4": "img/c4.jpg", "c5": "img/c5.jpg", "c6": "img/c6.jpg", "c7": "img/c7.jpg", "c8": "img/c8.jpg", "c9": "img/c9.jpg", "m1": "img/m1.jpg", "m2": "img/m2.jpg", "m3": "img/m3.jpg", "m4": "img/m4.jpg", "m5": "img/m5.jpg", "m6": "img/m6.jpg", "m7": "img/m7.jpg", "m8": "img/m8.jpg", "m9": "img/m9.jpg", "v1": "img/v1.jpg", "v2": "img/v2.jpg", "v3": "img/v3.jpg", "v4": "img/v4.jpg", "v5": "img/v5.jpg", "v6": "img/v6.jpg", "v7": "img/v7.jpg", "v8": "img/v8.jpg", "l1": "img/l1.jpg", "l2": "img/l2.jpg", "l3": "img/l3.jpg", "l5": "img/l5.jpg", "l6": "img/l6.jpg", "l7": "img/l7.jpg", "i1": "img/i1.jpg", "i2": "img/i2.jpg", "i3": "img/i3.jpg", "i4": "img/i4.jpg", "i5": "img/i5.jpg", "i7": "img/i7.jpg", "i8": "img/i8.jpg", "i6": "img/i6.jpg", "l4": "img/l4.jpg", "l8": "img/l8.jpg"};
const CREDITS={"c1": ["Skeleton Model 5579 HaJN", "Hans-Jürgen Neubert", "CC BY 4.0", "https://creativecommons.org/licenses/by/4.0", "https://commons.wikimedia.org/wiki/File:Skeleton_Model_5579_HaJN.jpg"], "c2": ["Eye iris", "Petr Novák, Wikipedia", "CC BY-SA 2.5", "https://creativecommons.org/licenses/by-sa/2.5", "https://commons.wikimedia.org/wiki/File:Eye_iris.jpg"], "c3": ["Botanical Fruit and Culinary Vegetables (LVA)", "Zirneklītis", "CC0", "https://creativecommons.org/publicdomain/zero/1.0/deed.en", "https://commons.wikimedia.org/wiki/File:Botanical_Fruit_and_Culinary_Vegetables_(LVA).png"], "c4": ["Pekin hen with seven chicks, March 2021 13", "Calistemon", "CC BY-SA 4.0", "https://creativecommons.org/licenses/by-sa/4.0", "https://commons.wikimedia.org/wiki/File:Pekin_hen_with_seven_chicks,_March_2021_13.jpg"], "c5": ["Sunflower seedlings", "", "CC BY-SA 3.0", "https://creativecommons.org/licenses/by-sa/3.0/", "https://commons.wikimedia.org/w/index.php?curid=282629"], "c6": ["Dark rain clouds departing over Brofjorden", "W.carter", "CC BY-SA 4.0", "https://creativecommons.org/licenses/by-sa/4.0", "https://commons.wikimedia.org/wiki/File:Dark_rain_clouds_departing_over_Brofjorden.jpg"], "c7": ["ES Valencia Albufera", "Tobias Maschler (Plochingen, Germany)", "CC BY-SA 3.0", "https://creativecommons.org/licenses/by-sa/3.0/", "https://commons.wikimedia.org/wiki/File:ES_Valencia_Albufera.jpg"], "c8": ["French fire engine parading DSC00870", "", "CC BY-SA 1.0", "https://creativecommons.org/licenses/by-sa/1.0/", "https://commons.wikimedia.org/w/index.php?curid=25837"], "c9": ["3 Hourglasses", "", "CC BY 4.0", "https://creativecommons.org/licenses/by/4.0", "https://commons.wikimedia.org/wiki/File:3_Hourglasses_Wellcome_L0011331.jpg"], "m1": ["Abacus actually in use at kimono shop in Otaru", "Syced", "CC0", "https://creativecommons.org/publicdomain/zero/1.0/deed.en", "https://commons.wikimedia.org/wiki/File:Abacus_actually_in_use_at_kimono_shop_in_Otaru.jpg"], "m2": ["Dienes Material (Dyskalkulie)", "Rhetos", "CC0", "https://creativecommons.org/publicdomain/zero/1.0/deed.en", "https://commons.wikimedia.org/wiki/File:Dienes_Material_(Dyskalkulie).jpg"], "m3": ["ZR20 (Dienes-Material)", "Rhetos", "CC0", "https://creativecommons.org/publicdomain/zero/1.0/deed.en", "https://commons.wikimedia.org/wiki/File:ZR20_(Dienes-Material).jpg"], "m4": ["Math01", "MathKnight", "CC BY 2.5", "https://creativecommons.org/licenses/by/2.5", "https://commons.wikimedia.org/wiki/File:Math01.jpg"], "m5": ["6-Pack-Chicken-Eggs", "Evan-Amos", "domini públic", "https://creativecommons.org/publicdomain/mark/1.0/", "https://commons.wikimedia.org/wiki/File:6-Pack-Chicken-Eggs.jpg"], "m6": ["London Big Ben Inner Clock Face 1070925-PSD", "Ermell", "CC BY-SA 4.0", "https://creativecommons.org/licenses/by-sa/4.0", "https://commons.wikimedia.org/wiki/File:London_Big_Ben_Inner_Clock_Face_1070925-PSD.jpg"], "m7": ["EURO stardikomplekt", "Dmitry G", "CC BY-SA 3.0", "https://creativecommons.org/licenses/by-sa/3.0", "https://commons.wikimedia.org/wiki/File:EURO_stardikomplekt.JPG"], "m8": ["Magnetic tangram", "Fumikas Sagisavas", "CC0", "https://creativecommons.org/publicdomain/zero/1.0/deed.en", "https://commons.wikimedia.org/wiki/File:Magnetic_tangram.jpg"], "m9": ["School Supplies", "TheUltimateGrass", "CC0", "https://creativecommons.org/publicdomain/zero/1.0/deed.en", "https://commons.wikimedia.org/wiki/File:School_Supplies.jpg"], "v1": ["Child reading book", "Widad.sirkhotte", "CC BY 4.0", "https://creativecommons.org/licenses/by/4.0", "https://commons.wikimedia.org/wiki/File:Child_reading_book.jpg"], "v2": ["Blocks, alphabet", "", "CC BY 4.0", "https://creativecommons.org/licenses/by/4.0", "https://commons.wikimedia.org/wiki/File:Blocks,_alphabet_(AM_1990.255-2).jpg"], "v3": ["Painted Wooden Letters (5494543957)", "Garry Knight from London, England", "CC BY 2.0", "https://creativecommons.org/licenses/by/2.0", "https://commons.wikimedia.org/wiki/File:Painted_Wooden_Letters_(5494543957).jpg"], "v4": ["Writing Drawing", "Startup Stock Photos", "CC0", "https://creativecommons.org/publicdomain/zero/1.0/", "https://stocksnap.io/photo/writing-drawing-Y2P39NGLLO"], "v5": ["Type case with movable types for letterpress printing in the Gutenberg", "dronepicr", "CC BY 2.0", "https://creativecommons.org/licenses/by/2.0", "https://commons.wikimedia.org/wiki/File:Type_case_with_movable_types_for_letterpress_printing_in_the_Gutenberg_Museum,_Mainz,_Germany_(48988492232).jpg"], "v6": ["Six weeks old cat (aka)", "André Karwath aka Aka", "CC BY-SA 2.5", "https://creativecommons.org/licenses/by-sa/2.5", "https://commons.wikimedia.org/wiki/File:Six_weeks_old_cat_(aka).jpg"], "v7": ["Tortoise portrait", "Moise Nicu", "CC BY 3.0", "https://creativecommons.org/licenses/by/3.0", "https://commons.wikimedia.org/wiki/File:Tortoise_portrait.JPG"], "v8": ["Children running on the running track of the Baozhong Junior High Scho", "褒忠國中 雲端網", "CC BY 2.0", "https://creativecommons.org/licenses/by/2.0", "https://commons.wikimedia.org/wiki/File:Children_running_on_the_running_track_of_the_Baozhong_Junior_High_School_20130311.jpg"], "l1": ["Close-up of child reading a book", "Widad.sirkhotte", "CC BY 4.0", "https://creativecommons.org/licenses/by/4.0", "https://commons.wikimedia.org/wiki/File:Close-up_of_child_reading_a_book.jpg"], "l2": ["A pile of alphabet wooden blocks", "Bobjgalindo", "CC BY 4.0", "https://creativecommons.org/licenses/by/4.0", "https://commons.wikimedia.org/wiki/File:A_pile_of_alphabet_wooden_blocks.jpg"], "l3": ["Two children are joyfully playing a game indoors", "Shixart1985", "CC BY 2.0", "https://creativecommons.org/licenses/by/2.0", "https://commons.wikimedia.org/wiki/File:Two_children_are_joyfully_playing_a_game_indoors.jpg"], "l5": ["Painted Wooden Letters (5494543957)", "Garry Knight from London, England", "CC BY 2.0", "https://creativecommons.org/licenses/by/2.0", "https://commons.wikimedia.org/wiki/File:Painted_Wooden_Letters_(5494543957).jpg"], "l6": ["Six weeks old cat (aka)", "André Karwath aka Aka", "CC BY-SA 2.5", "https://creativecommons.org/licenses/by-sa/2.5", "https://commons.wikimedia.org/wiki/File:Six_weeks_old_cat_(aka).jpg"], "l7": ["A juvenile elephant at Mpala Research Centre", "FlyTheMouse", "CC BY 4.0", "https://creativecommons.org/licenses/by/4.0", "https://commons.wikimedia.org/wiki/File:A_juvenile_elephant_at_Mpala_Research_Centre.jpg"], "i1": ["Crayons beside child coloring (Unsplash)", "Aaron Burden aaronburden", "CC0", "https://creativecommons.org/publicdomain/zero/1.0/deed.en", "https://commons.wikimedia.org/wiki/File:Crayons_beside_child_coloring_(Unsplash).jpg"], "i2": ["Sheep and goats on a farm in Tarn, France, 29 September 2012", "Barry Lewis", "CC BY 2.0", "https://creativecommons.org/licenses/by/2.0", "https://commons.wikimedia.org/wiki/File:Sheep_and_goats_on_a_farm_in_Tarn,_France,_29_September_2012.jpg"], "i3": ["Family Picnic (52842627487)", "Reba Spike", "CC BY 2.0", "https://creativecommons.org/licenses/by/2.0", "https://commons.wikimedia.org/wiki/File:Family_Picnic_(52842627487).jpg"], "i4": ["Paint on hands", "Ingvar Kjøllesdal", "CC BY 2.0", "https://creativecommons.org/licenses/by/2.0", "https://commons.wikimedia.org/wiki/File:Paint_on_hands.jpg"], "i5": ["Exotic Fruit Gift Basket (4461109309)", "Vegan Feast Catering", "CC BY 2.0", "https://creativecommons.org/licenses/by/2.0", "https://commons.wikimedia.org/wiki/File:Exotic_Fruit_Gift_Basket_(4461109309).jpg"], "i7": ["School supplies", "DiwangPingkian", "CC BY-SA 3.0", "https://creativecommons.org/licenses/by-sa/3.0", "https://commons.wikimedia.org/wiki/File:School_supplies.jpg"], "i8": ["A rainbow appears in the sky after the rain shower", "Paul-shy", "CC BY 4.0", "https://creativecommons.org/licenses/by/4.0", "https://commons.wikimedia.org/wiki/File:A_rainbow_appears_in_the_sky_after_the_rain_shower.jpg"], "i6": ["Baby warm clothes, Moscow, Russia", "Vyacheslav Argenberg", "CC BY 4.0", "https://creativecommons.org/licenses/by/4.0", "https://commons.wikimedia.org/wiki/File:Baby_warm_clothes,_Moscow,_Russia.jpg"], "l4": ["Pen-writing-notes-studying", "Tookapic", "CC0", "https://creativecommons.org/publicdomain/zero/1.0/deed.en", "https://commons.wikimedia.org/wiki/File:Pen-writing-notes-studying.jpg"], "l8": ["2014-11-15 Relay race on the Sports day of Haikou Elementary School (Zhunan)", "曾 成訓", "CC BY 2.0", "https://creativecommons.org/licenses/by/2.0", "https://commons.wikimedia.org/wiki/File:2014-11-15_Relay_race_on_the_Sports_day_of_Haikou_Elementary_School_(Zhunan).jpg"]};
const PHOTOS=[{"l": "els llapis de colors", "s": "img/p00.jpg", "c": ["Colored pencils in holder", "ThoBel-0043", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Colored_pencils_in_holder.jpg"]}, {"l": "el globus terraqüi", "s": "img/p01.jpg", "c": ["Terrestrial globe-BHM 5396a-P6141268-gradient", "Rama", "CC BY-SA 3.0", "https://commons.wikimedia.org/wiki/File:Terrestrial_globe-BHM_5396a-P6141268-gradient.jpg"]}, {"l": "l'àbac", "s": "img/p02.jpg", "c": ["Abacus actually in use at kimono shop in Otaru", "Syced", "CC0", "https://commons.wikimedia.org/wiki/File:Abacus_actually_in_use_at_kimono_shop_in_Otaru.jpg"]}, {"l": "els llibres", "s": "img/p03.jpg", "c": ["Stack of multicolored books on a table", "Alexander Grey", "CC0", "https://commons.wikimedia.org/wiki/File:Stack_of_multicolored_books_on_a_table.jpg"]}, {"l": "la lupa", "s": "img/p04.jpg", "c": ["Magnifying glass with focus on paper", "Niabot", "CC BY-SA 3.0", "https://commons.wikimedia.org/wiki/File:Magnifying_glass_with_focus_on_paper.png"]}, {"l": "el tangram", "s": "img/p05.jpg", "c": ["Magnetic tangram", "Fumikas Sagisavas", "CC0", "https://commons.wikimedia.org/wiki/File:Magnetic_tangram.jpg"]}, {"l": "les tisores", "s": "img/p06.jpg", "c": ["Small pair of blue scissors", "ZooFari", "CC BY-SA 3.0", "https://commons.wikimedia.org/wiki/File:Small_pair_of_blue_scissors.jpg"]}, {"l": "les ceres", "s": "img/p07.jpg", "c": ["Box of crayons IMG 0009", "Collin Anderson", "CC BY 2.0", "https://commons.wikimedia.org/wiki/File:Box_of_crayons_IMG_0009.jpg"]}, {"l": "les lletres", "s": "img/p08.jpg", "c": ["Painted Wooden Letters (5494543957)", "Garry Knight from London, England", "CC BY 2.0", "https://commons.wikimedia.org/wiki/File:Painted_Wooden_Letters_(5494543957).jpg"]}, {"l": "el microscopi", "s": "img/p09.jpg", "c": ["Fine rotative table Microscope 5 (12996283235)", "Les Chatfield from Brighton, England", "CC BY 2.0", "https://commons.wikimedia.org/wiki/File:Fine_rotative_table_Microscope_5_(12996283235).jpg"]}, {"l": "els blocs de base deu", "s": "img/p10.jpg", "c": ["Dienes Material (Dyskalkulie)", "Rhetos", "CC0", "https://commons.wikimedia.org/wiki/File:Dienes_Material_(Dyskalkulie).jpg"]}, {"l": "el regle", "s": "img/p11.jpg", "c": ["Ruler on table", "Douglas Perkins", "CC0", "https://commons.wikimedia.org/wiki/File:Ruler_on_table.jpg"]}, {"l": "els pinzells", "s": "img/p12.jpg", "c": ["A notebook with paint brushes", "Tim Arterbury", "CC0", "https://commons.wikimedia.org/wiki/File:A_notebook_with_paint_brushes.jpg"]}, {"l": "les monedes d'euro", "s": "img/p13.jpg", "c": ["EURO stardikomplekt", "Dmitry G", "CC BY-SA 3.0", "https://commons.wikimedia.org/wiki/File:EURO_stardikomplekt.JPG"]}, {"l": "l'imant", "s": "img/p14.jpg", "c": ["Magnet - Horseshoe, 'Carl Breiging & Sohn' Solingen, Germany", "Photographer: William Barlow", "CC BY 4.0", "https://collections.museumsvictoria.com.au/items/2592136"]}, {"l": "el rellotge d'arena", "s": "img/p15.jpg", "c": ["3 Hourglasses", "", "CC BY 4.0", "https://commons.wikimedia.org/wiki/File:3_Hourglasses_Wellcome_L0011331.jpg"]}, {"l": "el cub de l'abecedari", "s": "img/p16.jpg", "c": ["Blocks, alphabet", "", "CC BY 4.0", "https://commons.wikimedia.org/wiki/File:Blocks,_alphabet_(AM_1990.255-2).jpg"]}, {"l": "l'esquelet", "s": "img/p17.jpg", "c": ["Skeleton Model 5579 HaJN", "Hans-Jürgen Neubert", "CC BY 4.0", "https://commons.wikimedia.org/wiki/File:Skeleton_Model_5579_HaJN.jpg"]}, {"l": "les plantes", "s": "img/p18.jpg", "c": ["Sunflower seedlings", "", "CC BY-SA 3.0", "https://commons.wikimedia.org/w/index.php?curid=282629"]}, {"l": "el rellotge", "s": "img/p19.jpg", "c": ["London Big Ben Inner Clock Face 1070925-PSD", "Ermell", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:London_Big_Ben_Inner_Clock_Face_1070925-PSD.jpg"]}];
/* ======================= utilitats ======================= */
const R = (a,b) => a + Math.floor(Math.random()*(b-a+1));
const pick = (()=>{const M=new WeakMap();return a=>{if(!a||!a.length)return undefined;if(a.length<3)return a[Math.floor(Math.random()*a.length)];let m=M.get(a);if(!m||!m.q.length){const q=[...a.keys()];for(let i=q.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[q[i],q[j]]=[q[j],q[i]];}if(m&&q[0]===m.last)q.push(q.shift());m={q,last:m?m.last:-1};M.set(a,m);}const i=m.q.shift();m.last=i;return a[i];};})();
const shuffle = a => { a=[...a]; for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; };
const todayKey = (d=new Date()) => d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');

/* un exercici d'opcions: correcte primer, la resta distractors */
function choice(prompt, correct, wrongs, extra={}){
  const opts = shuffle([String(correct), ...[...new Set(wrongs.map(String))].filter(w=>w!==String(correct)).slice(0,3)]);
  return {kind:'choice', prompt, answer:String(correct), options:opts, ...extra};
}
function num(prompt, answer, extra={}){ return {kind:'num', prompt, answer:String(answer), rtl:/[+−×]/.test(prompt), ...extra}; }
function near(n, spread, min=0){ const s=new Set(); let g=0; while(s.size<3 && g++<60){ const v=n+R(-spread,spread); if(v!==n && v>=min) s.add(v);} return [...s]; }

/* nombres en valencià */
const U=['zero','u','dos','tres','quatre','cinc','sis','set','huit','nou','deu','onze','dotze','tretze','catorze','quinze','setze','disset','divuit','dinou'];
const T=['','','vint','trenta','quaranta','cinquanta','seixanta','setanta','huitanta','noranta'];
const w99 = n => { if(n<20) return U[n]; const t=Math.floor(n/10), u=n%10; return u ? T[t]+(t===2?'-i-':'-')+U[u] : T[t]; };
const words = n => { if(n<100) return w99(n); const c=Math.floor(n/100), r=n%100; const cs = c===1 ? 'cent' : U[c]+'-cents'; return r ? cs+' '+w99(r) : cs; };

/* ======================= visuals ======================= */
function vColumns(a, b, op){
  const w = Math.max(String(a).length, String(b).length);
  const col = s => { s=String(s).padStart(w,' '); const cls=['c','d','u'].slice(3-w); return [...s].map((ch,i)=>`<span class="${cls[i]}">${ch===' '?'&nbsp;':ch}</span>`).join(''); };
  return `<div class="vsum" aria-label="${a} ${op==='+'?'més':op==='×'?'per':'menys'} ${b}"><div>${col(a)}</div><div class="op">${op} ${col(b)}</div><div class="answer" id="ans" aria-live="polite" aria-label="La teua resposta"><span class="ph">?</span></div></div>`;
}
function vDUC(c,d,u){
  let h='<div class="duc">';
  if(c!==null) h+=`<span style="background:var(--mat)">${c}<small>C</small></span>`;
  h+=`<span style="background:var(--val)">${d}<small>D</small></span><span style="background:var(--med)">${u}<small>U</small></span></div>`;
  return h;
}
/* blocs de base 10: una barra = 1 desena, un quadradet = 1 unitat */
function vBlocks(d, u, o={}){
  const bar = '<i class="bar">' + '<b></b>'.repeat(10) + '</i>';
  const lbl = t => o.lbl===false ? '' : `<small>${t}</small>`;
  return `<div class="blocks${o.sm?' sm':''}" role="img" aria-label="${d} barres de deu i ${u} quadradets solts">`
    + `<div class="bl"><div class="bl-d">${bar.repeat(d)}</div>${lbl('desenes')}</div>`
    + `<div class="bl"><div class="bl-u">${'<i class="cube"></i>'.repeat(u)}</div>${lbl('unitats')}</div></div>`;
}
/* operació en línia (horitzontal): 38 + 25 = ? */
function vRow(a, b, op, blocks){
  const col = n => { const s=String(n), cls=['c','d','u'].slice(3-s.length); return [...s].map((ch,i)=>`<span class="${cls[i]}">${ch}</span>`).join(''); };
  return `<div class="hwrap"><div class="hsum" aria-label="${a} ${op==='+'?'més':'menys'} ${b}"><span>${col(a)}</span><span class="sg">${op}</span><span>${col(b)}</span><span class="sg">=</span><div class="answer" id="ans" aria-live="polite" aria-label="La teua resposta"><span class="ph">?</span></div></div>`
    + (blocks ? `<div class="hblocks">${vBlocks(Math.floor(a/10),a%10,{sm:1,lbl:false})}<span class="sg">${op}</span>${vBlocks(Math.floor(b/10),b%10,{sm:1,lbl:false})}</div>` : '') + `</div>`;
}
/* una operació ja resolta, per a les explicacions */
const solvedVis = (h, ans) => h.replace('<span class="ph">?</span>', ans).replace(' id="ans"', '');
function vClock(h, m){
  const ha = ((h%12) + m/60)*30, ma = m*6;
  let nums=''; for(let i=1;i<=12;i++){ const a=(i*30-90)*Math.PI/180; nums+=`<text x="${100+72*Math.cos(a)}" y="${100+72*Math.sin(a)+7}" text-anchor="middle" font-size="20" font-weight="700" fill="var(--ink)" font-family="Andika,sans-serif">${i}</text>`; }
  let ticks=''; for(let i=0;i<60;i++){ const a=i*6*Math.PI/180, r1=i%5?88:84; ticks+=`<line x1="${100+r1*Math.sin(a)}" y1="${100-r1*Math.cos(a)}" x2="${100+92*Math.sin(a)}" y2="${100-92*Math.cos(a)}" stroke="var(--muted)" stroke-width="${i%5?1.5:3}"/>`; }
  return `<svg class="clock" viewBox="0 0 200 200" role="img" aria-label="Rellotge"><circle cx="100" cy="100" r="96" fill="var(--paper)" stroke="var(--ink)" stroke-width="6"/>${ticks}${nums}
  <line x1="100" y1="100" x2="100" y2="52" stroke="var(--val)" stroke-width="9" stroke-linecap="round" transform="rotate(${ha} 100 100)"/>
  <line x1="100" y1="100" x2="100" y2="24" stroke="var(--mat)" stroke-width="6" stroke-linecap="round" transform="rotate(${ma} 100 100)"/>
  <circle cx="100" cy="100" r="7" fill="var(--ink)"/></svg>`;
}
function vCoin(v){
  if(v>=5){ const col = v===5?'#8fa3a8':'#d77d6c'; return `<svg width="104" height="56" viewBox="0 0 104 56" role="img" aria-label="Bitllet de ${v} euros"><rect x="2" y="2" width="100" height="52" rx="6" fill="${col}" stroke="var(--ink)" stroke-width="3"/><circle cx="76" cy="28" r="16" fill="rgba(255,255,255,.4)"/><text x="30" y="37" text-anchor="middle" font-size="26" font-weight="800" fill="#13262b" font-family="Rokkitt,serif">${v}€</text></svg>`; }
  const two = v===2;
  return `<svg width="60" height="60" viewBox="0 0 60 60" role="img" aria-label="Moneda de ${v} euro${v>1?'s':''}"><circle cx="30" cy="30" r="27" fill="${two?'#c9ccd0':'#e6b94a'}" stroke="var(--ink)" stroke-width="3"/><circle cx="30" cy="30" r="18" fill="${two?'#e6b94a':'#c9ccd0'}"/><text x="30" y="37" text-anchor="middle" font-size="20" font-weight="800" fill="#13262b" font-family="Rokkitt,serif">${v}€</text></svg>`;
}
const SHAPES = {
  'triangle': {sides:3, svg:'<polygon points="90,20 165,155 15,155"/>'},
  'quadrat': {sides:4, svg:'<rect x="25" y="25" width="130" height="130"/>'},
  'rectangle': {sides:4, svg:'<rect x="10" y="50" width="160" height="85"/>'},
  'cercle': {sides:0, svg:'<circle cx="90" cy="90" r="72"/>'},
  'pentàgon': {sides:5, svg:'<polygon points="90,15 165,70 137,160 43,160 15,70"/>'},
  'hexàgon': {sides:6, svg:'<polygon points="50,20 130,20 170,90 130,160 50,160 10,90"/>'}
};
const vShape = name => `<svg class="shape" viewBox="0 0 180 180" role="img" aria-label="Una figura"><g fill="var(--mat-soft)" stroke="var(--mat)" stroke-width="6" stroke-linejoin="round">${SHAPES[name].svg}</g></svg>`;

/* banc d'exercicis d'opcions: [pregunta, correcta, [errònies], pista, explicació, nivell, dibuix] */
function fromBank(bank){
  return lv => {
    const pool = bank.filter(b => (b[5]||1) <= lv);
    const pref = pool.filter(b => (b[5]||1) === lv);
    const it = pick(pref.length && Math.random()<.6 ? pref : pool);
    return choice(it[0], it[1], it[2], {hint:it[3], explain:it[4], pic:it[6]});
  };
}

/* ======================= TEMARI ======================= */
const NAMES = ['Marta','Pau','Aina','Vicent','Laia','Biel','Neus','Arnau','Júlia','Pep','Carla','Hug'];

const MAT = [
 {id:'m1', t:'Nombres fins al 99', s:'Desenes i unitats, anterior i posterior, comparar', link:['Comptem en valencià','https://claude.ai/artifact/VsgaFaU1YqZEY83xTE3gvo'],
  demo:`<div class="demo-row">${vBlocks(4,7)}<b class="eq">= 47</b></div>`,
  learn:['Una desena (D) són 10 unitats (U). La dibuixem com una barra de 10 quadradets.','Les unitats soltes són quadradets. En el 47 hi ha 4 barres i 7 quadradets: 4 D i 7 U.','Per a comparar, mira primer les desenes. Si són iguals, mira les unitats.','El signe > vol dir "és major que" i < vol dir "és menor que". La boca oberta sempre mira el nombre més gran.'],
  ex:'47 = 40 + 7  ·  52 > 47',
  gen: lv => {
    const t = pick(lv===1?['blk','du','des','blk','cmp']:['blk','du','des','uni','cmp','ant','post','w']);
    if(t==='blk'){ const d=R(1,9),u=R(0,9); return num('Quin nombre formen els blocs?', d*10+u, {visual:vBlocks(d,u), hint:`Compta les barres: cada una val 10. Després suma els quadradets solts.`, explain:`${d} ${d===1?'barra':'barres'} ${d===1?'és':'són'} ${d*10}. Amb ${u} ${u===1?'quadradet':'quadradets'}: ${d*10} + ${u} = ${d*10+u}.`}); }
    if(t==='du'){ const d=R(1,9),u=R(0,9); return num(`${d} desenes i ${u} unitats. Quin nombre és?`, d*10+u, {visual:vDUC(null,d,u)+vBlocks(d,u,{sm:1,lbl:false}), hint:`Les desenes van primer: ${d}. Després les unitats.`, explain:`${d} desenes són ${d*10}. ${d*10} + ${u} = ${d*10+u}.`}); }
    if(t==='des'){ const n=R(10,99); return num(`Quantes desenes té el nombre ${n}?`, Math.floor(n/10), {visual:vBlocks(Math.floor(n/10),n%10), hint:'Les desenes són les barres: la xifra de l\'esquerra.', explain:`En el ${n} hi ha ${Math.floor(n/10)} barres: la xifra de les desenes és ${Math.floor(n/10)}.`}); }
    if(t==='uni'){ const n=R(10,99); return num(`Quantes unitats soltes té el nombre ${n}?`, n%10, {visual:vBlocks(Math.floor(n/10),n%10), hint:'Les unitats són els quadradets solts: la xifra de la dreta.', explain:`En el ${n} hi ha ${n%10} quadradets solts: la xifra de les unitats és ${n%10}.`}); }
    if(t==='cmp'){ let a=R(10,99), b=Math.random()<.15?a:R(10,99); const s=a>b?'>':a<b?'<':'='; return choice(`Quin signe va entre ${a} i ${b}?`, s, ['>','<','='], {sign:true, visual:`<div class="cmp">${a}<span class="slot">?</span>${b}</div>`, hint:'Compara primer les desenes.', explain:`${a} ${s} ${b}.`}); }
    if(t==='ant'){ const n=R(11,99); return num(`Quin nombre va just abans del ${n}?`, n-1, {hint:'Abans vol dir un menys.', explain:`${n} − 1 = ${n-1}.`}); }
    if(t==='post'){ const n = lv===3 ? pick([19,29,39,49,59,69,79,89]) : R(10,98); return num(`Quin nombre va just després del ${n}?`, n+1, {hint:'Després vol dir un més.', explain:`${n} + 1 = ${n+1}.`}); }
    const n=R(21,99); const sw = Number(String(n%10)+String(Math.floor(n/10)));
    return choice(`Com s'escriu el ${n} amb lletres?`, words(n), [words(sw>=1?sw:n+10), words(n+10>99?n-10:n+10), words(n%10===9?n-1:n+1)], {hint:'Primer diem les desenes i després les unitats.', explain:`${n} s'escriu "${words(n)}".`});
  }},
 {id:'m2', t:'Nombres fins al 999', s:'Centenes, valor de cada xifra, ordenar', link:['Comptem en valencià','https://claude.ai/artifact/VsgaFaU1YqZEY83xTE3gvo'],
  learn:['Una centena (C) són 10 desenes, és a dir, 100 unitats.','En el 352 hi ha 3 C, 5 D i 2 U: 300 + 50 + 2.','Per a comparar nombres de tres xifres, mira primer les centenes.','Després del 399 ve el 400: les unitats i les desenes tornen a zero.'],
  ex:'352 = 300 + 50 + 2  ·  "tres-cents cinquanta-dos"',
  gen: lv => {
    const t = pick(lv===1?['cdu','cen','cmp']:['cdu','cen','cmp','post','w','val']);
    if(t==='cdu'){ const c=R(1,9),d=R(0,9),u=R(0,9); return num(`${c} centenes, ${d} desenes i ${u} unitats. Quin nombre és?`, c*100+d*10+u, {visual:vDUC(c,d,u), hint:'Escriu les xifres en ordre: C, D, U.', explain:`${c*100} + ${d*10} + ${u} = ${c*100+d*10+u}.`}); }
    if(t==='cen'){ const n=R(100,999); return num(`Quantes centenes té el nombre ${n}?`, Math.floor(n/100), {hint:'Les centenes són la primera xifra.', explain:`En el ${n} hi ha ${Math.floor(n/100)} centenes.`}); }
    if(t==='cmp'){ const a=R(100,999); const b = Math.random()<.5 ? Number(String(a)[0]+String(R(0,99)).padStart(2,'0')) : R(100,999); const s=a>b?'>':a<b?'<':'='; return choice(`Quin signe va entre ${a} i ${b}?`, s, ['>','<','='], {sign:true, visual:`<div class="cmp">${a}<span class="slot">?</span>${b}</div>`, hint:'Mira primer les centenes; si són iguals, les desenes.', explain:`${a} ${s} ${b}.`}); }
    if(t==='post'){ const n = lv===3 ? pick([199,299,399,499,599,699,799,899,109,209,490,590]) : R(100,998); return num(`Quin nombre va just després del ${n}?`, n+1, {hint:'Suma 1. Compte quan acaba en 9!', explain:`${n} + 1 = ${n+1}.`}); }
    if(t==='val'){ const n=R(111,999); const pos=pick([0,1]); const dig=String(n)[pos]; const v=Number(dig)*(pos===0?100:10); return choice(`Quant val el ${dig} de l'esquerra en el ${n}?`, v, [Number(dig), Number(dig)*(pos===0?10:100), v+1], {hint:pos===0?'És la xifra de les centenes.':'És la xifra de les desenes.', explain:`El ${dig} està en el lloc de les ${pos===0?'centenes':'desenes'}, així que val ${v}.`}); }
    const n=R(101,999);
    return choice(`Com s'escriu el ${n} amb lletres?`, words(n), [words(n>=200?n-100:n+100), words(n%10===9?n-1:n+1), words((n+10)%1000||110)], {hint:'Primer les centenes, després la resta.', explain:`${n} s'escriu "${words(n)}".`});
  }},
 {id:'m3', t:'Sumes portant-ne', s:'Sumar en columna i portar una desena', learn:['Escriu els nombres en columna: unitats davall d\'unitats, desenes davall de desenes.','Comença sempre per les unitats.','Si les unitats sumen 10 o més, escrius les unitats i "en portes una" a les desenes.','Exemple: 38 + 25 → 8 + 5 = 13: escric 3 i en porte 1. 3 + 2 + 1 = 6. Total: 63.','La mateixa suma es pot escriure en línia o en columna. El resultat és el mateix!'],
  ex:'38 + 25 = 63',
  demo:`<div class="demo-row">${solvedVis(vRow(38,25,'+'),'63')}<span class="eq">és igual que</span>${solvedVis(vColumns(38,25,'+'),'63')}</div>`,
  gen: lv => {
    let a,b;
    if(lv===1){ a=R(10,89); b=R(1,9); if((a%10)+b>9) b=9-(a%10)||1; }
    else if(lv===2){ do{ a=R(15,79); b=R(11,89-a+10);}while(a+b>99 || (a%10)+(b%10)<10); }
    else { do{ a=R(120,799); b=R(15,199);}while(a+b>999 || (a%10)+(b%10)<10); }
    const hz = Math.random()<.5;   /* la meitat en línia (horitzontal), la meitat en columna (vertical) */
    return num(`Quant fa ${a} + ${b}?`, a+b, {rtl:true, visual:hz?vRow(a,b,'+',a<100&&b<100):vColumns(a,b,'+'), hint:`Comença per les unitats: ${a%10} + ${b%10} = ${a%10+b%10}.${(a%10)+(b%10)>9?' En portes una!':''}`, explain:`${a} + ${b} = ${a+b}.`});
  }},
 {id:'m4', t:'Restes portant-ne', s:'Restar en columna i demanar una desena', learn:['Escriu els nombres en columna, el més gran dalt.','Comença per les unitats.','Si la xifra de dalt és més xicoteta, demana una desena: el 2 es converteix en 12.','Exemple: 52 − 17 → 12 − 7 = 5. Com que hem demanat una desena, ara queden 4 desenes: 4 − 1 = 3. Total: 35.'],
  ex:'52 − 17 = 35',
  gen: lv => {
    let a,b;
    if(lv===1){ a=R(20,99); b=R(1,a%10||1); if(b>a%10) b=a%10; if(b===0) b=R(1,9), a=a-(a%10)+9; }
    else if(lv===2){ do{ a=R(30,99); b=R(11,a-5);}while((a%10)>=(b%10)); }
    else { do{ a=R(200,999); b=R(15,199);}while((a%10)>=(b%10) || b>=a); }
    const hz = Math.random()<.5;
    return num(`Quant fa ${a} − ${b}?`, a-b, {rtl:true, visual:hz?vRow(a,b,'−'):vColumns(a,b,'−'), hint:(a%10)<(b%10)?`${a%10} és menys que ${b%10}: demana una desena i fes ${a%10+10} − ${b%10}.`:`Comença per les unitats: ${a%10} − ${b%10}.`, explain:`${a} − ${b} = ${a-b}.`});
  }},
 {id:'m5', t:'La multiplicació', s:'Suma de grups iguals i taules del 2, 3, 4, 5 i 10', learn:['Multiplicar és sumar grups iguals.','3 grups de 4 són 4 + 4 + 4 = 12. S\'escriu 3 × 4 = 12.','La taula del 2 va de 2 en 2, la del 5 acaba en 0 o en 5, i la del 10 acaba en 0.','L\'ordre no canvia el resultat: 3 × 4 = 4 × 3.'],
  ex:'3 × 4 = 4 + 4 + 4 = 12',
  gen: lv => {
    if(lv===1){ const g=R(2,5), k=R(2,5); const e=pick(['🍎','🍓','⚽','🐟','🌼','🍪']); return num(`Hi ha ${g} grups amb ${k} cada un. Quants n'hi ha en total?`, g*k, {rtl:true, visual:`<div class="groups">${Array.from({length:g},()=>`<span>${e.repeat(k)}</span>`).join('')}</div>`, hint:`Suma ${g} vegades el ${k}: ${Array(g).fill(k).join(' + ')}.`, explain:`${g} × ${k} = ${g*k}.`}); }
    const t = lv===2 ? pick([2,5,10]) : pick([2,3,4,5,10]); const k=R(1,10);
    return num(`Quant fa ${k} × ${t}?`, k*t, {visual:vColumns(k,t,'×'), hint:`Compta de ${t} en ${t}, ${k} vegades.`, explain:`${k} × ${t} = ${k*t}.`});
  }},
 {id:'m6', t:'El rellotge', s:'En punt, i mitja, i quart i menys quart', learn:['L\'agulla curta marca les hores. L\'agulla llarga marca els minuts.','Si la llarga mira el 12, és en punt: "les tres en punt".','Si la llarga mira el 6, és i mitja: "les tres i mitja".','Si mira el 3 és i quart; si mira el 9 és menys quart de l\'hora següent.'],
  ex:'3:00 les tres en punt · 3:30 les tres i mitja · 3:15 les tres i quart · 3:45 les quatre menys quart',
  gen: lv => {
    const HH=['dotze','una','dues','tres','quatre','cinc','sis','set','huit','nou','deu','onze','dotze'];
    const art = h => (h===1?'la ':'les ')+HH[h];
    const lbl = (h,m) => m===0?art(h)+' en punt':m===30?art(h)+' i mitja':m===15?art(h)+' i quart':art(h%12+1)+' menys quart';
    const ms = lv===1?[0,30]:[0,30,15,45];
    const h=R(1,12), m=pick(ms);
    const wr = new Set(); while(wr.size<3){ const h2=pick([h,h%12+1,R(1,12)]), m2=pick([0,30,15,45]); const l=lbl(h2,m2); if(l!==lbl(h,m)) wr.add(l); }
    return choice('Quina hora marca el rellotge?', lbl(h,m), [...wr], {visual:vClock(h,m), hint:'Mira primer on apunta l\'agulla llarga (la blava).', explain:`L'agulla curta marca ${HH[h]} i la llarga ${m===0?'el 12':m===30?'el 6':m===15?'el 3':'el 9'}: són ${lbl(h,m)}.`});
  }},
 {id:'m7', t:'Euros i cèntims', s:'Comptar monedes i bitllets, calcular el canvi', learn:['Les monedes més comunes són d\'1 € i de 2 €. Els bitllets més xicotets són de 5 € i de 10 €.','Per a comptar diners, comença pel bitllet o la moneda que val més.','1 euro són 100 cèntims.','Si pagues més del que costa, et tornen el canvi: el que pagues menys el preu.'],
  ex:'5 € + 2 € + 1 € = 8 €',
  gen: lv => {
    if(lv<3){ const set = lv===1?[1,2]:[1,2,5,10]; const n=R(2,lv===1?4:5); const cs=Array.from({length:n},()=>pick(set)).sort((a,b)=>b-a); const tot=cs.reduce((a,b)=>a+b,0);
      return num('Quants euros hi ha en total?', tot, {rtl:true, visual:`<div class="money">${cs.map(vCoin).join('')}</div>`, hint:'Comença pel que val més i ves sumant.', explain:`${cs.join(' + ')} = ${tot} €.`}); }
    const thing=pick([['un llibre',R(3,8)],['una pilota',R(4,9)],['un gelat',R(2,4)],['uns colors',R(3,7)]]); const pay = thing[1]<5?5:10;
    return num(`Compres ${thing[0]} que costa ${thing[1]} €. Pagues amb un bitllet de ${pay} €. Quant et tornen?`, pay-thing[1], {rtl:true, visual:`<div class="money">${vCoin(pay)}</div>`, hint:`Fes una resta: ${pay} − ${thing[1]}.`, explain:`${pay} − ${thing[1]} = ${pay-thing[1]} €.`});
  }},
 {id:'m8', t:'Figures i cossos', s:'Triangle, quadrat, rectangle, cercle; costats i vèrtexs', learn:['Les figures planes són planes com un paper: triangle, quadrat, rectangle, cercle.','El triangle té 3 costats. El quadrat i el rectangle en tenen 4. El cercle no en té cap.','Els cossos geomètrics tenen volum: el cub (com un dau), l\'esfera (com una pilota), el cilindre (com una llauna) i el con (com un gelat).'],
  ex:'Triangle: 3 costats i 3 vèrtexs',
  gen: lv => {
    const t = pick(lv===1?['name','sides']:['name','sides','body']);
    if(t==='name'){ const pool = lv===1?['triangle','quadrat','rectangle','cercle']:Object.keys(SHAPES); const n=pick(pool); return choice('Com es diu aquesta figura?', n, shuffle(Object.keys(SHAPES).filter(x=>x!==n)), {visual:vShape(n), hint:'Compta els costats.', explain:`És un ${n}${SHAPES[n].sides?`: té ${SHAPES[n].sides} costats`:': és rodó i no té costats'}.`}); }
    if(t==='sides'){ const n=pick(['triangle','quadrat','rectangle','pentàgon','hexàgon'].slice(0,lv===1?3:5)); return num(`Quants costats té un ${n}?`, SHAPES[n].sides, {visual:vShape(n), hint:'Passa el dit per cada costat i compta.', explain:`El ${n} té ${SHAPES[n].sides} costats.`}); }
    const b=pick([['🎲','cub'],['⚽','esfera'],['🥫','cilindre'],['🍦','con']]); return choice('A quin cos geomètric s\'assembla?', b[1], ['cub','esfera','cilindre','con'], {pic:b[0], hint:'Pensa en la forma: té cares planes o és rodó?', explain:`S'assembla a un ${b[1]}.`});
  }},
 {id:'m9', t:'Problemes', s:'Llegir bé, triar l\'operació i resoldre', learn:['Llig el problema a poc a poc, dues vegades.','Busca les dades (els nombres) i la pregunta.','Si ajuntem o ens donen més, sumem. Si perdem, gastem o en queden menys, restem.','Si hi ha grups iguals, multipliquem.'],
  ex:'Tinc 12 cromos i me\'n donen 5. 12 + 5 = 17 cromos.',
  gen: lv => {
    const n=(S.name&&Math.random()<.35)?S.name:pick(NAMES);
    const T = [
      () => { const a=R(8,40), b=R(3,25); return [`${n} té ${a} cromos i li'n regalen ${b}. Quants cromos té ara?`, a+b, 'Li\'n regalen: ara en té més. Suma.', `${a} + ${b} = ${a+b} cromos.`]; },
      () => { const a=R(20,60), b=R(5,a-5); return [`A l'autobús van ${a} persones. En la parada en baixen ${b}. Quantes en queden?`, a-b, 'En baixen: en queden menys. Resta.', `${a} − ${b} = ${a-b} persones.`]; },
      () => { const g=R(2,6), k=pick([2,5,10]); return [`Hi ha ${g} caixes amb ${k} ous cada una. Quants ous hi ha?`, g*k, 'Són grups iguals: multiplica.', `${g} × ${k} = ${g*k} ous.`]; },
      () => { const a=R(10,30), b=R(2,a-2); return [`${n} té ${a} euros i en gasta ${b} en un llibre. Quants euros li queden?`, a-b, 'Gasta diners: li\'n queden menys. Resta.', `${a} − ${b} = ${a-b} euros.`]; },
      () => { const a=R(12,45), b=R(12,45); return [`En la classe de segon hi ha ${a} llibres i en la de tercer ${b}. Quants llibres hi ha en total?`, a+b, 'En total vol dir ajuntar. Suma.', `${a} + ${b} = ${a+b} llibres.`]; },
    ];
    if(lv===3) T.push(() => { const a=R(15,40), b=R(5,20), c=R(3,10); return [`${n} té ${a} bales. Li'n donen ${b} i després en perd ${c}. Quantes en té ara?`, a+b-c, `Primer suma ${a} + ${b}. Després resta ${c}.`, `${a} + ${b} = ${a+b}. ${a+b} − ${c} = ${a+b-c}.`]; });
    const [p,ans,h,e] = pick(T)();
    return num(p, ans, {hint:h, explain:e, story:true, rtl:true});
  }},
];

/* ---------- LLENGUA ---------- */
const TEXTS = [
 {t:'La Neus i el seu gos', x:'La Neus té un gos que es diu Tomàtic. És xicotet i té el pèl blanc i negre. Cada vesprada, la Neus i Tomàtic van al parc. Allí el gos corre darrere d\'una pilota roja. Quan tornen a casa, Tomàtic beu aigua i s\'adorm al sofà.',
  q:[['Com es diu el gos?','Tomàtic',['Neus','Pilota','Blanquet']],['De quin color és la pilota?','roja',['blava','blanca','verda']],['Quan van al parc?','cada vesprada',['cada matí','els diumenges','a la nit']],['Què fa Tomàtic quan torna a casa?','beu aigua i s\'adorm',['menja una poma','juga amb la pilota','se\'n va al carrer']]]},
 {t:'Excursió a l\'Albufera', x:'Divendres, la classe de segon va d\'excursió a l\'Albufera. Pugen en una barca i veuen ànecs i garses. La mestra explica que l\'Albufera és un llac molt gran prop de València. Al migdia mengen un entrepà a la vora de l\'aigua. En Pau fa una foto d\'un peix que salta.',
  q:[['On van d\'excursió?','a l\'Albufera',['a la platja','a la muntanya','al museu']],['Quin dia hi van?','divendres',['dilluns','dissabte','diumenge']],['Quins animals veuen?','ànecs i garses',['lleons i zebres','vaques i cavalls','gats i gossos']],['Qui fa una foto?','Pau',['la mestra','Neus','el barquer']],['Què és l\'Albufera?','un llac',['un riu','una muntanya','un bosc']]]},
 {t:'Festes al poble', x:'Al poble de l\'Aina fan festes a l\'agost. Hi ha música, focs artificials i una cercavila amb gegants i cabuts. L\'Aina balla amb el seu iaio. A la nit, tots sopen a la plaça i, al final, es tiren els focs. L\'Aina es tapa les orelles perquè fan molt de soroll.',
  q:[['Quan són les festes?','a l\'agost',['al desembre','a l\'abril','al gener']],['Amb qui balla l\'Aina?','amb el seu iaio',['amb la seua mare','amb el seu germà','amb la mestra']],['On sopen?','a la plaça',['a casa','a la platja','a l\'escola']],['Per què es tapa les orelles?','els focs fan molt de soroll',['fa fred','té son','no li agrada la música']]]},
 {t:'La planta d\'en Biel', x:'En Biel planta una llavor en un test. Cada dia li posa una mica d\'aigua i el deixa a la finestra perquè li toque el sol. Després d\'una setmana ix una tija verda amb dues fulletes. En Biel està molt content i ho dibuixa en la seua llibreta.',
  q:[['On planta la llavor?','en un test',['al jardí','al riu','en una caixa']],['Per què deixa el test a la finestra?','perquè li toque el sol',['perquè faça fred','perquè plou','perquè no el veja ningú']],['Què ix després d\'una setmana?','una tija amb dues fulles',['una flor roja','una taronja','un arbre gran']],['Com està en Biel?','content',['trist','enfadat','cansat']]]},
];
const ABC = 'abcdefghijklmnopqrstuvwxyz'.split('');
const SYL = [['sol','sol'],['mar','mar'],['flor','flor'],['peix','peix'],['ca-sa'],['tau-la'],['lla-pis'],['cot-xe'],['ga-ta'],['po-ma'],['pi-lo-ta'],['es-co-la'],['to-ma-ca'],['fi-nes-tra'],['ma-dui-xa'],['e-le-fant'],['mun-ta-nya'],['pa-pa-llo-na'],['bi-ci-cle-ta'],['xo-co-la-ta'],['ta-ron-ja'],['ca-ra-gol']];
const ORTO = [ // [paraula amb buit, correcta, opcions, explicació]
 ['_otxe','c',['c','qu'],'Davant de la o escrivim c: cotxe.'], ['_eixal','qu',['c','qu'],'Davant de la e, per a fer el so /k/ escrivim qu: queixal.'],
 ['pa_et','qu',['c','qu'],'Davant de e escrivim qu: paquet.'], ['_inze','qu',['c','qu'],'Davant de i escrivim qu: quinze.'],
 ['es_ola','c',['c','qu'],'Davant de la o escrivim c: escola.'], ['bos_','c',['c','qu'],'Al final de paraula escrivim c: bosc.'],
 ['_at','g',['g','gu'],'Davant de a escrivim g: gat.'], ['_itarra','gu',['g','gu'],'Davant de i, per a fer el so de "gat", escrivim gu: guitarra.'],
 ['fo_era','gu',['g','gu'],'Davant de e escrivim gu: foguera.'], ['_ota','g',['g','gu'],'Davant de o escrivim g: gota.'], ['_ineu','gu',['g','gu'],'Davant de i escrivim gu: guineu.'],
 ['pe_a','r',['r','rr'],'Entre vocals, el so suau és r: pera.'], ['to_e','rr',['r','rr'],'Entre vocals, el so fort és rr: torre.'],
 ['ca_er','rr',['r','rr'],'Entre vocals, el so fort és rr: carrer.'], ['_atolí','r',['r','rr'],'A principi de paraula sempre és r, encara que sone fort: ratolí.'], ['go_a','rr',['r','rr'],'Entre vocals, el so fort és rr: gorra.'],
 ['pla_a','ç',['c','ç'],'Davant de a, per a fer el so /s/ escrivim ç: plaça.'], ['cal_ot','ç',['c','ç'],'Davant de o, per a fer el so /s/ escrivim ç: calçot.'], ['_eba','c',['c','ç'],'Davant de e escrivim c, mai ç: ceba.'], ['ca_a','ç',['c','ç'],'Davant de a, el so /s/ suau entre vocals pot ser ç: caça.'],
];
const OPP = [['alt','baix'],['gran','xicotet'],['content','trist'],['ràpid','lent'],['obrir','tancar'],['dia','nit'],['calent','fred'],['ple','buit'],['dalt','baix'],['net','brut'],['entrar','eixir'],['nou','vell'],['llarg','curt'],['fort','dèbil']];
const SYN = [['content','alegre'],['bonic','preciós'],['xicotet','menut'],['parlar','xarrar'],['cotxe','auto'],['mirar','observar'],['començar','iniciar'],['cansat','esgotat'],['ràpid','veloç'],['casa','llar']];
const VERB = ['córrer','menjar','saltar','dormir','llegir','cantar','nadar','escriure','jugar','pintar'];
const NOUN = ['taula','gos','poma','escola','llibre','cotxe','flor','mestra','pilota','finestra'];
const ADJ = ['gran','blau','content','alt','ràpid','bonic','fred','xicotet','dolç','rodó'];

const VAL = [
 {id:'v1', t:'Comprensió lectora', s:'Llegir un text curt i respondre preguntes', learn:['Llig el text a poc a poc. Si cal, llig-lo dues vegades.','Fixa\'t en qui hi ha, on passa, quan passa i què fan.','La resposta sempre és en el text: torna a buscar-la!'],
  ex:'Qui? On? Quan? Què fa?',
  gen: lv => { const tx=pick(TEXTS); const it=pick(tx.q); return choice(it[0], it[1], it[2], {reading:tx, hint:'Torna a llegir el text i busca la resposta.', explain:`En el text diu: ${it[1]}.`}); }},
 {id:'v2', t:'L\'abecedari', s:'Ordre de les lletres i ordre alfabètic', learn:['L\'abecedari té 26 lletres: a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z.','Les vocals són a, e, i, o, u. La resta són consonants.','Per a ordenar paraules alfabèticament, mira la primera lletra. Si és igual, mira la segona.'],
  ex:'casa · gat · poma (c va abans que g, i g abans que p)',
  gen: lv => {
    const t = pick(lv===1?['after','before','vow']:['after','before','order','order']);
    if(t==='after'){ const i=R(0,24); return choice(`Quina lletra va després de la ${ABC[i].toUpperCase()}?`, ABC[i+1], [ABC[Math.max(0,i-1)], ABC[Math.min(25,i+2)], ABC[(i+5)%26]], {hint:'Recita l\'abecedari en veu baixa.', explain:`Després de la ${ABC[i]} ve la ${ABC[i+1]}.`}); }
    if(t==='before'){ const i=R(1,25); return choice(`Quina lletra va abans de la ${ABC[i].toUpperCase()}?`, ABC[i-1], [ABC[Math.min(25,i+1)], ABC[Math.max(0,i-2)], ABC[(i+7)%26]], {hint:'Recita l\'abecedari fins a arribar-hi.', explain:`Abans de la ${ABC[i]} va la ${ABC[i-1]}.`}); }
    if(t==='vow'){ const v=pick(['a','e','i','o','u']); return choice('Quina d\'aquestes lletres és una vocal?', v, shuffle(['b','m','t','s','p','l','r']).slice(0,3), {hint:'Les vocals són a, e, i, o, u.', explain:`La ${v} és una vocal.`}); }
    const set = shuffle([...NOUN,...VERB]).filter((w,i,a)=>a.findIndex(z=>z[0]===w[0])===i).slice(0,3); const first=[...set].sort((a,b)=>a.localeCompare(b,'ca'))[0];
    return choice('Quina paraula va primer en ordre alfabètic?', first, set, {hint:'Mira només la primera lletra de cada paraula.', explain:`${first} comença per ${first[0]}, que va abans en l'abecedari.`});
  }},
 {id:'v3', t:'Les síl·labes', s:'Separar paraules en síl·labes', learn:['Una síl·laba és cada colp de veu quan diem una paraula.','Pica de mans mentre dius la paraula: cada palmada és una síl·laba.','ca-sa té 2 síl·labes. pi-lo-ta en té 3. pa-pa-llo-na en té 4.'],
  ex:'ma-dui-xa → 3 síl·labes',
  gen: lv => {
    const it=pick(SYL), parts=it[0].split('-'), w=parts.join('');
    if(lv===1 || Math.random()<.5) return num(`Quantes síl·labes té la paraula "${w}"?`, parts.length, {hint:'Pica de mans mentre la dius.', explain:`${parts.join(' - ')}: ${parts.length} síl·labes.`, say:`Quantes síl·labes té la paraula ${w}?`});
    if(parts.length<2) return num(`Quantes síl·labes té la paraula "${w}"?`, 1, {hint:'Pica de mans mentre la dius.', explain:`${w} té només 1 síl·laba.`});
    const other = shuffle(SYL.filter(s=>s[0].includes('-')&&s!==it)).slice(0,3).map(s=>s[0].split('-')[0]);
    return choice(`Quina és la primera síl·laba de "${w}"?`, parts[0], [...other, w.slice(0,parts[0].length+1)], {hint:'Digues la paraula a poc a poc i para en el primer colp de veu.', explain:`${parts.join(' - ')}: la primera és "${parts[0]}".`});
  }},
 {id:'v4', t:'Ortografia', s:'c/qu, g/gu, r/rr i c/ç', learn:['Per al so /k/: ca, co, cu però que, qui (cotxe, queixal, quinze).','Per al so de "gat": ga, go, gu però gue, gui (gota, guitarra, foguera).','Entre vocals, so fort rr i so suau r (torre, pera). A principi de paraula sempre r (ratolí).','Per al so /s/: ce, ci però ça, ço, çu (ceba, plaça, calçot).'],
  ex:'cotxe · queixal · guitarra · torre · plaça',
  gen: lv => { const it=pick(ORTO); return choice(`Quina lletra falta? <span style="color:var(--c)">${it[0].replace('_','__')}</span>`, it[1], it[2], {say:'Quina lletra falta en aquesta paraula?', hint:'Mira quina vocal ve després del buit.', explain:`${it[3]}`}); }},
 {id:'v5', t:'Majúscules i punt', s:'Noms propis, inici de frase i punt final', learn:['Escrivim amb majúscula la primera paraula d\'una frase.','També els noms propis: persones (Marta), pobles i ciutats (Castelló), rius (Xúquer) i mascotes (Tomàtic).','Al final de la frase posem un punt.'],
  ex:'La Marta viu a Castelló.',
  gen: fromBank([
    ['Quina frase està ben escrita?','La Marta viu a Castelló.',['la Marta viu a Castelló.','La marta viu a castelló.','La Marta viu a Castelló'],'Mira l\'inici, els noms propis i el final.','Comença amb majúscula, Marta i Castelló són noms propis i acaba en punt.'],
    ['Quina frase està ben escrita?','En Pau té un gos.',['en Pau té un gos.','En pau té un gos.','En Pau té un gos'],'Mira l\'inici, el nom i el punt.','Majúscula a l\'inici i en Pau, i punt al final.'],
    ['Quina frase està ben escrita?','El meu gat es diu Mixet.',['el meu gat es diu Mixet.','El meu gat es diu mixet.','El Meu Gat es diu Mixet.'],'El nom d\'una mascota és un nom propi.','Mixet és un nom propi i va amb majúscula.'],
    ['Quina frase està ben escrita?','Anem a la platja de Dénia.',['anem a la platja de Dénia.','Anem a la platja de dénia.','Anem a la Platja de dénia.'],'Dénia és un poble.','Dénia és un nom propi de lloc.',2],
    ['Quina paraula s\'escriu sempre amb majúscula?','Alacant',['taula','cadira','finestra'],'Busca el nom d\'un lloc.','Alacant és el nom d\'una ciutat: nom propi.'],
    ['Quina paraula s\'escriu sempre amb majúscula?','Júlia',['xiqueta','llibre','pilota'],'Busca el nom d\'una persona.','Júlia és el nom d\'una persona: nom propi.'],
    ['Quina paraula s\'escriu sempre amb majúscula?','Xúquer',['riu','aigua','pont'],'Busca el nom d\'un riu.','El Xúquer és un riu: nom propi.',2],
    ['Què posem al final d\'una frase?','un punt',['una coma','res','una majúscula'],'Les frases acaben amb...','Al final de la frase va un punt.'],
    ['Després d\'un punt, la paraula següent comença amb...','majúscula',['minúscula','un número','un punt'],'Una frase nova comença...','Després de punt comença una frase nova, amb majúscula.',2],
  ])},
 {id:'v6', t:'Gènere i nombre', s:'Masculí i femení, singular i plural', learn:['Les paraules poden ser masculines (el gat) o femenines (la gata).','Moltes paraules fan el femení afegint -a: gat → gata, xiquet → xiqueta.','El plural vol dir més d\'un: poma → pomes, flor → flors, peix → peixos.','Les paraules acabades en -a fan el plural en -es: casa → cases.'],
  ex:'el gat · la gata · els gats · les gates',
  gen: fromBank([
    ['Quin és el femení de "gat"?','gata',['gats','gatet','gates'],'Afegeix una lletra.','gat → gata.'],
    ['Quin és el femení de "xiquet"?','xiqueta',['xiquets','xiquetes','xiquetet'],'Afegeix una -a.','xiquet → xiqueta.'],
    ['Quin és el femení de "mestre"?','mestra',['mestres','mestret','mestrea'],'La -e es canvia per -a.','mestre → mestra.'],
    ['Quin és el plural de "casa"?','cases',['casas','casos','casa'],'Les paraules en -a fan el plural en -es.','casa → cases.'],
    ['Quin és el plural de "flor"?','flors',['flores','florets','flor'],'Afegeix una -s.','flor → flors.'],
    ['Quin és el plural de "peix"?','peixos',['peixs','peixes','peix'],'Les paraules acabades en -x solen afegir -os.','peix → peixos.',2],
    ['Quin és el plural de "llapis"?','llapis',['llapissos','llapises','llapi'],'Hi ha paraules que no canvien.','un llapis, dos llapis: no canvia.',2],
    ['Quina paraula és femenina?','la taula',['el llibre','el got','el pa'],'Fixa\'t en l\'article: el o la.','"la taula" porta l\'article femení la.'],
    ['Quina paraula està en plural?','les pomes',['la poma','el pomer','una poma'],'Plural vol dir més d\'un.','"les pomes" són més d\'una.'],
    ['Quin és el femení de "actor"?','actriu',['actora','actors','actoreta'],'Aquesta és especial!','actor → actriu.',3],
  ])},
 {id:'v7', t:'Sinònims i contraris', s:'Paraules que volen dir el mateix o el contrari', learn:['Els sinònims són paraules que volen dir el mateix: content i alegre.','Els contraris (antònims) volen dir el contrari: alt i baix.','Pots canviar una paraula pel seu sinònim i la frase vol dir el mateix.'],
  ex:'gran ↔ xicotet · bonic = preciós',
  gen: lv => {
    if(lv===1 || Math.random()<.55){ const p=pick(OPP); const [a,b]=Math.random()<.5?p:[p[1],p[0]]; return choice(`Quin és el contrari de "${a}"?`, b, shuffle(OPP.filter(x=>x!==p)).slice(0,3).map(x=>x[0]), {hint:'Pensa en la paraula que vol dir tot el contrari.', explain:`El contrari de ${a} és ${b}.`}); }
    const p=pick(SYN); const [a,b]=Math.random()<.5?p:[p[1],p[0]]; return choice(`Quina paraula vol dir el mateix que "${a}"?`, b, shuffle(SYN.filter(x=>x!==p)).slice(0,3).map(x=>x[1]), {hint:'Canvia-la en una frase: vol dir el mateix?', explain:`${a} i ${b} són sinònims.`});
  }},
 {id:'v8', t:'Nom, adjectiu i verb', s:'Coses, com són i què fan', learn:['El nom diu el nom d\'una persona, un animal o una cosa: gos, mestra, taula.','L\'adjectiu diu com és: gran, blau, content.','El verb diu una acció, el que fem: córrer, menjar, llegir.'],
  ex:'El gos (nom) gran (adjectiu) corre (verb).',
  gen: lv => {
    const t = pick(['v','n','a']);
    const cor = t==='v'?pick(VERB):t==='n'?pick(NOUN):pick(ADJ);
    const others = shuffle([...(t!=='v'?VERB:[]),...(t!=='n'?NOUN:[]),...(t!=='a'?ADJ:[])]).slice(0,3);
    const q = t==='v'?'Quina paraula és un verb (una acció)?':t==='n'?'Quina paraula és un nom (persona, animal o cosa)?':'Quina paraula és un adjectiu (diu com és)?';
    return choice(q, cor, others, {hint:t==='v'?'Pots dir "jo vull ..."?':t==='n'?'Pots dir "el" o "la" davant?':'Pots dir "és molt ..."?', explain:`"${cor}" és un ${t==='v'?'verb':t==='n'?'nom':'adjectiu'}.`});
  }},
];

/* ---------- CONEIXEMENT DEL MEDI ---------- */
const DAYS=['dilluns','dimarts','dimecres','dijous','divendres','dissabte','diumenge'];
const MONTHS=['gener','febrer','març','abril','maig','juny','juliol','agost','setembre','octubre','novembre','desembre'];
const MED = [
 {id:'c1', t:'El cos humà', s:'Parts del cos, ossos, músculs i articulacions', learn:['El cos té tres parts: cap, tronc i extremitats (braços i cames).','Els ossos sostenen el cos. El crani protegeix el cervell.','Els músculs mouen els ossos.','Les articulacions ens deixen doblegar el cos: el coll, el colze, el canell, el genoll i el turmell.'],
  ex:'cap · tronc · extremitats',
  gen: fromBank([
    ['En quines tres parts dividim el cos?','cap, tronc i extremitats',['mans, peus i ulls','ossos, pell i cabells','nas, boca i orelles'],'Pensa de dalt a baix.','El cos té cap, tronc i extremitats.'],
    ['Com es diuen els braços i les cames?','extremitats',['articulacions','òrgans','músculs'],'Són les parts que ixen del tronc.','Braços i cames són les extremitats.'],
    ['On és el cor?','al tronc',['al cap','a les cames','als braços'],'És al pit.','El cor és dins del tronc, al pit.'],
    ['Amb què respirem?','amb els pulmons',['amb l\'estómac','amb els ossos','amb el cor'],'Són dins del pit i s\'omplin d\'aire.','Respirem amb els pulmons.'],
    ['Què protegeix el crani?','el cervell',['el cor','l\'estómac','els pulmons'],'El crani és l\'os del cap.','El crani protegeix el cervell.',2],
    ['Què ens permet doblegar el colze i el genoll?','les articulacions',['les ungles','els cabells','les dents'],'Són les "frontisses" del cos.','Les articulacions ens deixen doblegar el cos.',2],
    ['Què mou els ossos?','els músculs',['la pell','les dents','les ungles'],'Quan fas força, notes que s\'endureixen.','Els músculs mouen els ossos.',2],
    ['Quina d\'aquestes parts NO és una articulació?','el nas',['el colze','el genoll','el turmell'],'Les articulacions es dobleguen.','El nas no es doblega: no és una articulació.',2],
    ['Quants dits tenim en una mà?','5',['4','6','10'],'Compta els teus!','Una mà té 5 dits.'],
  ])},
 {id:'c2', t:'Els sentits', s:'Vista, oïda, olfacte, gust i tacte', link:['Els Sentits','https://claude.ai/artifact/CVivDjWyRUHRLNz2FdowQz'],
  learn:['Tenim cinc sentits: vista, oïda, olfacte, gust i tacte.','Veiem amb els ulls, escoltem amb les orelles, olorem amb el nas, tastem amb la llengua i toquem amb la pell.','Hem de cuidar els sentits: no mirar el sol, no escoltar música molt alta i rentar-nos bé.'],
  ex:'ulls → vista · orelles → oïda · nas → olfacte · llengua → gust · pell → tacte',
  gen: fromBank([
    ['Amb quin òrgan veiem?','amb els ulls',['amb les orelles','amb el nas','amb la llengua'],'Els tanques quan dorms.','Veiem amb els ulls: és el sentit de la vista.',1,'👀'],
    ['La pell és l\'òrgan del sentit del...','tacte',['gust','olfacte','oïda'],'Ens diu si una cosa és suau o aspra.','Amb la pell notem el tacte.',1,'✋'],
    ['Amb la llengua notem el...','gust',['tacte','olfacte','oïda'],'Ens diu si és dolç o salat.','La llengua és l\'òrgan del gust.',1,'👅'],
    ['Quin sentit fem servir per a escoltar música?','l\'oïda',['la vista','l\'olfacte','el gust'],'Fem servir les orelles.','Escoltem amb l\'oïda.',1,'🎵'],
    ['Per a olorar una flor fem servir...','el nas',['les mans','els ulls','les orelles'],'És al mig de la cara.','Olorem amb el nas: és l\'olfacte.',1,'🌸'],
    ['Quants sentits tenim?','5',['3','7','4'],'Compta: vista, oïda...','Tenim cinc sentits.'],
    ['Quin gust té el llimó?','àcid',['dolç','salat','amarg'],'Fa arrufar la cara!','El llimó té gust àcid.',2,'🍋'],
    ['Com cuidem les orelles?','no escoltant música molt alta',['posant-hi objectes','cridant molt fort','escoltant música a tot volum'],'Els sorolls forts fan mal.','Hem d\'evitar els sorolls molt forts.',2],
    ['Per a què serveixen les ulleres de sol?','per a protegir els ulls',['per a olorar millor','per a escoltar millor','per a tastar'],'El sol és molt fort.','Les ulleres de sol protegeixen els ulls de la llum forta.',2,'🕶️'],
  ])},
 {id:'c3', t:'Salut i alimentació', s:'Aliments sans i bons hàbits', learn:['Per a créixer sans hem de menjar de tot: fruita, verdura, llegums, peix, carn, llet i cereals.','Els dolços i les llepolies, només de tant en tant.','Bons hàbits: rentar-se les mans, raspallar-se les dents després de menjar, dormir unes 10 hores i fer esport.','Quan tenim set, bevem aigua.'],
  ex:'Esmorzar sa: entrepà, fruita i llet',
  gen: fromBank([
    ['Quin és un hàbit saludable?','rentar-se les mans abans de menjar',['menjar llepolies cada dia','dormir molt poc','no esmorzar mai'],'Pensa en el que ens fa estar bé.','Rentar-se les mans evita els microbis.'],
    ['Quan ens hem de raspallar les dents?','després de cada menjar',['una vegada a la setmana','només els diumenges','mai'],'Les restes de menjar fan mal a les dents.','Ens raspallem després de cada menjar.',1,'🪥'],
    ['Quin aliment és una fruita?','la poma',['el pa','el formatge','l\'ou'],'Creix en un arbre i és dolça.','La poma és una fruita.',1,'🍎'],
    ['La llet, el iogurt i el formatge són...','làctics',['fruites','verdures','llegums'],'Tots vénen de la llet.','Són làctics: es fan amb llet.',1,'🧀'],
    ['Quin aliment hauríem de menjar MENYS?','les llepolies',['les fruites','les verdures','els llegums'],'Tenen molt de sucre.','Les llepolies tenen molt de sucre: només de tant en tant.',1,'🍬'],
    ['Què bevem quan tenim set?','aigua',['refresc','suc de sobre','res'],'És la beguda més sana.','L\'aigua és la millor beguda.',1,'💧'],
    ['Quantes hores ha de dormir un xiquet de 7 anys?','unes 10 hores',['3 hores','5 hores','20 hores'],'Dormim tota la nit.','Necessitem unes 10 hores de son.',2],
    ['Quin és el millor esmorzar?','entrepà, fruita i llet',['patates i refresc','només caramels','res'],'Busca el que té més aliments sans.','Un bon esmorzar té cereals, fruita i làctics.',2],
    ['Les llentilles i els cigrons són...','llegums',['fruites','làctics','dolços'],'Es posen en el putxero.','Les llentilles i els cigrons són llegums.',2],
  ])},
 {id:'c4', t:'Els animals', s:'Com són, com naixen i què mengen', learn:['Els vertebrats tenen ossos: mamífers (pèl), aus (plomes), peixos (escates), rèptils i amfibis.','Els invertebrats no tenen ossos: el caragol, la formiga, la papallona.','Els ovípars naixen d\'un ou (gallina). Els vivípars naixen de la panxa de la mare (gos).','Els herbívors mengen plantes, els carnívors mengen carn i els omnívors mengen de tot.'],
  ex:'gallina: au, ovípara, omnívora',
  gen: fromBank([
    ['Quin animal té plomes?','el colom',['el gos','el peix','la serp'],'Les plomes són de les aus.','El colom és una au i té plomes.'],
    ['Quin animal té escates?','el peix',['el gat','la gallina','el cavall'],'Viu a l\'aigua.','Els peixos tenen escates.',1,'🐟'],
    ['On viu la balena?','al mar',['al bosc','al desert','a la muntanya'],'És molt gran i neda.','La balena viu al mar.',1,'🐋'],
    ['Quin animal és domèstic?','el gat',['el llop','el tigre','l\'àguila'],'Viu amb les persones.','El gat viu a casa amb nosaltres: és domèstic.'],
    ['Com es desplaça la serp?','s\'arrossega',['vola','salta','camina amb quatre potes'],'No té potes.','La serp s\'arrossega.',1,'🐍'],
    ['Els animals que naixen d\'un ou són...','ovípars',['vivípars','herbívors','invertebrats'],'Ou = ovípar.','Els que naixen d\'un ou són ovípars.',2,'🥚'],
    ['El gos naix de la panxa de la mare. És...','vivípar',['ovípar','invertebrat','herbívor'],'No naix d\'un ou.','El gos és vivípar.',2],
    ['Un animal que només menja plantes és...','herbívor',['carnívor','omnívor','ovípar'],'Herba = herbívor.','Els que mengen plantes són herbívors.',2],
    ['El lleó menja carn. És...','carnívor',['herbívor','omnívor','vivípar'],'Carn = carnívor.','El lleó és carnívor.',2,'🦁'],
    ['Quin animal NO té ossos?','el caragol',['el cavall','l\'àguila','el gat'],'És tou i porta la casa a sobre.','El caragol és invertebrat: no té ossos.',2,'🐌'],
  ])},
 {id:'c5', t:'Les plantes', s:'Parts de la planta i què necessita', learn:['Les parts de la planta són: arrel, tija, fulles, flor i fruit.','L\'arrel està davall de terra i agafa l\'aigua. La tija la puja fins a les fulles.','Dins del fruit hi ha les llavors, que fan noves plantes.','Les plantes necessiten aigua, llum i aire. Hi ha arbres (tronc gros), arbustos (com el romer) i herbes.'],
  ex:'arrel → tija → fulles → flor → fruit',
  gen: fromBank([
    ['Quina part de la planta està davall de terra?','l\'arrel',['la flor','la fulla','el fruit'],'Agafa l\'aigua de la terra.','L\'arrel està davall de terra.'],
    ['Què necessita una planta per a viure?','aigua, llum i aire',['només foscor','sucre i sal','res'],'Pensa en què li posa en Biel.','Les plantes necessiten aigua, llum i aire.',1,'🌱'],
    ['La taronja és el ... del taronger.','fruit',['arrel','tija','fulla'],'Es menja i té llavors dins.','La taronja és el fruit del taronger.',1,'🍊'],
    ['De quin color són normalment les fulles?','verdes',['blaves','negres','blanques'],'Mira un arbre.','Les fulles solen ser verdes.',1,'🍃'],
    ['Un arbre té el tronc...','gros i dur',['tou i verd','de plàstic','transparent'],'Pensa en un pi.','Els arbres tenen el tronc gros i de fusta.',1,'🌳'],
    ['Per on puja l\'aigua des de l\'arrel fins a les fulles?','per la tija',['per la flor','pel fruit','per l\'aire'],'És com un tub.','L\'aigua puja per la tija.',2],
    ['Dins del fruit hi ha...','les llavors',['les arrels','les fulles','la tija'],'Obri una poma i mira.','Dins del fruit hi ha les llavors.',2],
    ['El romer és...','un arbust',['un arbre molt alt','una alga','un fruit'],'És xicotet i té moltes branques des de baix.','El romer és un arbust.',2],
    ['Una planta xicoteta amb la tija tendra és...','una herba',['un arbre','un arbust gran','una roca'],'Com la gespa.','Les herbes són xicotetes i tendres.',2],
  ])},
 {id:'c6', t:'L\'aigua i el temps', s:'Estats de l\'aigua, el temps i les estacions', learn:['L\'aigua pot ser sòlida (gel), líquida (la de l\'aixeta) o gas (vapor).','La pluja cau dels núvols.','L\'any té quatre estacions: primavera, estiu, tardor i hivern.','El termòmetre mesura la temperatura. Hem d\'estalviar aigua: tanca l\'aixeta!'],
  ex:'gel (sòlid) → aigua (líquid) → vapor (gas)',
  gen: fromBank([
    ['El gel és aigua en estat...','sòlid',['líquid','gas','calent'],'És dur.','El gel és aigua sòlida.',1,'🧊'],
    ['La pluja cau de...','els núvols',['les muntanyes','els arbres','el sol'],'Mira al cel quan plou.','La pluja cau dels núvols.',1,'🌧️'],
    ['Quina estació ve després de l\'hivern?','la primavera',['l\'estiu','la tardor','l\'hivern'],'Les flors comencen a eixir.','Després de l\'hivern ve la primavera.'],
    ['En quina estació cauen les fulles de molts arbres?','la tardor',['l\'estiu','la primavera','l\'hivern'],'Va després de l\'estiu.','A la tardor cauen les fulles.',1,'🍂'],
    ['Quantes estacions té l\'any?','4',['2','12','7'],'Primavera, estiu...','L\'any té 4 estacions.'],
    ['Com estalviem aigua?','tancant l\'aixeta mentre ens raspallem',['deixant l\'aixeta oberta','banyant-nos tres vegades al dia','regant al migdia'],'L\'aigua no s\'ha de malgastar.','Tancar l\'aixeta estalvia molta aigua.',1,'🚰'],
    ['Quan l\'aigua bull es converteix en...','vapor',['gel','neu','sorra'],'Mira l\'olla quan cuines.','L\'aigua calenta es converteix en vapor.',2],
    ['Per a saber la temperatura fem servir un...','termòmetre',['rellotge','regle','calendari'],'També el fem servir quan tenim febre.','El termòmetre mesura la temperatura.',2,'🌡️'],
    ['En quina estació fa més calor?','l\'estiu',['l\'hivern','la tardor','la primavera'],'És quan anem a la platja.','A l\'estiu fa més calor.',1,'☀️'],
  ])},
 {id:'c7', t:'El paisatge i la Comunitat Valenciana', s:'Muntanya i costa, províncies, rius i l\'Albufera', learn:['Un paisatge de costa té platja i mar. Un paisatge de muntanya té muntanyes, rius i boscos.','La Comunitat Valenciana té tres províncies: Castelló, València i Alacant. La capital és València.','El mar Mediterrani banya les nostres costes. Els rius principals són el Túria, el Xúquer i el Segura.','L\'Albufera és un llac molt gran prop de València.'],
  ex:'Castelló · València · Alacant',
  gen: fromBank([
    ['Quines són les tres províncies de la Comunitat Valenciana?','Castelló, València i Alacant',['Madrid, Sevilla i Bilbao','Múrcia, Terol i Conca','Barcelona, Girona i Lleida'],'Una és al nord, una al mig i una al sud.','Les tres províncies són Castelló, València i Alacant.'],
    ['Quina és la capital de la Comunitat Valenciana?','València',['Alacant','Castelló','Elx'],'Té el mateix nom que la comunitat.','La capital és València.'],
    ['Un paisatge amb platja i mar és un paisatge de...','costa',['muntanya','desert','neu'],'Pensa en l\'estiu.','És un paisatge de costa.',1,'🏖️'],
    ['Un paisatge amb muntanyes, rius i boscos és de...','muntanya',['costa','mar','platja'],'Hi ha cims alts.','És un paisatge de muntanya.',1,'⛰️'],
    ['Quina llengua és pròpia de la Comunitat Valenciana?','el valencià',['el francés','l\'anglés','l\'alemany'],'És la llengua d\'aquesta app!','El valencià és la nostra llengua pròpia.'],
    ['Quin mar banya la Comunitat Valenciana?','el Mediterrani',['el Cantàbric','el mar Roig','el mar del Nord'],'És el de les nostres platges.','El mar Mediterrani.',2],
    ['L\'Albufera és...','un llac prop de València',['una muntanya','una ciutat','un desert'],'Hi ha barques i ànecs.','L\'Albufera és un llac.',2],
    ['Quin d\'aquests riu és valencià?','el Xúquer',['el Nil','l\'Amazones','el Tàmesi'],'Passa per Alzira.','El Xúquer és un riu valencià.',2],
    ['Quin element del paisatge l\'han fet les persones?','un pont',['un riu','una muntanya','un bosc'],'No és natural.','El pont l\'han construït les persones.',2,'🌉'],
  ])},
 {id:'c8', t:'On vivim: oficis i transports', s:'El poble, els treballs i la seguretat viària', learn:['Al poble o a la ciutat hi ha moltes persones que treballen per a tots: metgesses, forners, bombers, mestres, carters...','L\'ajuntament s\'encarrega del poble. L\'alcalde o l\'alcaldessa el governa.','Els transports poden anar per terra (cotxe, tren), per aigua (vaixell) o per aire (avió).','Creuem pel pas de vianants i quan el semàfor dels vianants està verd.'],
  ex:'terra 🚗 · aigua ⛵ · aire ✈️',
  gen: fromBank([
    ['Qui cura els malalts a l\'hospital?','la metgessa o el metge',['el forner','el pilot','el carter'],'Porta bata blanca.','Els metges i les metgesses curen els malalts.',1,'🩺'],
    ['Qui fa el pa?','el forner o la fornera',['el bomber','la mestra','el pescador'],'Treballa al forn.','El forner fa el pa.',1,'🍞'],
    ['Qui apaga els incendis?','els bombers',['els pescadors','els pintors','els cuiners'],'Van en un camió roig.','Els bombers apaguen els incendis.',1,'🚒'],
    ['Quin transport va per l\'aigua?','el vaixell',['el tren','l\'avió','la bicicleta'],'Sura.','El vaixell va per l\'aigua.',1,'⛵'],
    ['Quin transport va per l\'aire?','l\'avió',['l\'autobús','la bicicleta','el tren'],'Vola.','L\'avió va per l\'aire.',1,'✈️'],
    ['Si el semàfor dels vianants està roig, què fem?','esperem',['creuem corrent','creuem a poc a poc','tanquem els ulls'],'Roig vol dir parar.','Amb el roig ens esperem.',1,'🚦'],
    ['Per on creuem el carrer?','pel pas de vianants',['per qualsevol lloc','entre els cotxes','per la rotonda'],'Té ratlles blanques.','Creuem pel pas de vianants.'],
    ['Qui ens porta les cartes?','el carter',['el cuiner','el jardiner','el dentista'],'Les deixa a la bústia.','El carter porta les cartes.',1,'✉️'],
    ['Qui governa el poble o la ciutat?','l\'alcalde o l\'alcaldessa',['el metge','el carter','el forner'],'Treballa a l\'ajuntament.','L\'alcalde o l\'alcaldessa governa des de l\'ajuntament.',2],
    ['Quin lloc té molts edificis alts i molta gent?','una ciutat',['un poble xicotet','una masia','un bosc'],'València n\'és una.','Les ciutats són grans i tenen molts edificis.',2],
  ])},
 {id:'c9', t:'El pas del temps', s:'Dies, mesos, calendari i abans i ara', learn:['La setmana té 7 dies: dilluns, dimarts, dimecres, dijous, divendres, dissabte i diumenge.','L\'any té 12 mesos: gener, febrer, març, abril, maig, juny, juliol, agost, setembre, octubre, novembre i desembre.','Ahir és el dia que ja ha passat; demà és el dia que vindrà.','Abans, la gent vivia diferent: llavaven la roba a mà, escrivien cartes i viatjaven en carro.'],
  ex:'ahir · hui · demà',
  gen: lv => {
    const t = pick(lv===1?['dnext','dprev','nweek']:['dnext','dprev','mnext','mprev','nyear','old']);
    if(t==='dnext'){ const i=R(0,6); return choice(`Quin dia va després de ${DAYS[i]}?`, DAYS[(i+1)%7], DAYS.filter((_,j)=>j!==(i+1)%7), {hint:'Recita els dies de la setmana.', explain:`Després de ${DAYS[i]} ve ${DAYS[(i+1)%7]}.`}); }
    if(t==='dprev'){ const i=R(0,6); return choice(`Quin dia va abans de ${DAYS[i]}?`, DAYS[(i+6)%7], DAYS.filter((_,j)=>j!==(i+6)%7), {hint:'Pensa quin dia era ahir si hui fóra '+DAYS[i]+'.', explain:`Abans de ${DAYS[i]} va ${DAYS[(i+6)%7]}.`}); }
    if(t==='nweek') return num('Quants dies té una setmana?', 7, {hint:'Compta de dilluns a diumenge.', explain:'La setmana té 7 dies.'});
    if(t==='nyear') return num('Quants mesos té un any?', 12, {hint:'Compta de gener a desembre.', explain:'L\'any té 12 mesos.'});
    if(t==='mnext'){ const i=R(0,11); return choice(`Quin mes va després de ${MONTHS[i]}?`, MONTHS[(i+1)%12], [MONTHS[(i+11)%12], MONTHS[(i+2)%12], MONTHS[(i+6)%12]], {hint:'Recita els mesos de l\'any.', explain:`Després de ${MONTHS[i]} ve ${MONTHS[(i+1)%12]}.`}); }
    if(t==='mprev'){ const i=R(0,11); return choice(`Quin mes va abans de ${MONTHS[i]}?`, MONTHS[(i+11)%12], [MONTHS[(i+1)%12], MONTHS[(i+10)%12], MONTHS[(i+6)%12]], {hint:'Recita els mesos fins a arribar-hi.', explain:`Abans de ${MONTHS[i]} va ${MONTHS[(i+11)%12]}.`}); }
    const it = pick([['Abans, com llavaven la roba?','a mà, al llavador',['amb rentadora','amb el mòbil','no la llavaven'],'Fa molts anys no hi havia rentadores.','Abans llavaven la roba a mà.'],['Abans, com parlaven amb la família que vivia lluny?','escrivint cartes',['amb el mòbil','per videotrucada','amb la tauleta'],'No hi havia mòbils.','Abans s\'escrivien cartes.'],['Quin d\'aquests objectes és més antic?','el carro',['el cotxe elèctric','el mòbil','la tauleta'],'Era tirat per un cavall.','El carro és molt més antic.']]);
    return choice(it[0], it[1], it[2], {hint:it[3], explain:it[4]});
  }},
];

const LANG_ALL={
/* ===== LLENGUA I LECTURA (valencià) ===== */
v1:{id:'v1', subj:'val', lang:'ca-ES', name:'Comprensió lectora', sq:'📖', file:'Comprensió lectora.html',
 title:'<span class="d">Llig</span> i <span class="u">entén</span>', lead:'Llig un text curt i respon les preguntes. La resposta sempre està en el text!',
 learn:[['Llig a poc a poc','Si cal, llig el text dues vegades.','📖'],['Qui? On? Quan? Què?','Fixa\'t en qui hi ha, on passa, quan passa i què fan.','🔎'],['Torna al text','La resposta sempre és en el text: torna a buscar-la!','👀']],
 modes:[
  {id:'llig',t:'Llig i respon',p:'Llig el text i tria la resposta correcta.',type:'read',bank:'TEXTS'},
  {id:'cf',t:'Cert o fals?',p:'Llig el text i digues si la frase és certa.',type:'readtf',bank:'TEXTS'},
  {id:'ordre',t:'Ordena la frase',p:'Toca les paraules en ordre per a fer una frase.',type:'order',bank:['La Neus té un gos.','El gos corre pel parc.','Anem d\'excursió amb la classe.','En Biel planta una llavor.','L\'Aina balla amb el seu iaio.','La mestra llig un conte.','Els ànecs neden en el llac.','Hui fa molt de sol.','M\'agrada molt llegir contes.','El gat dorm al sofà.']}
 ],
 TEXTS:[
  {t:'La Neus i el seu gos', x:'La Neus té un gos que es diu Tomàtic. És xicotet i té el pèl blanc i negre. Cada vesprada, la Neus i Tomàtic van al parc. Allí el gos corre darrere d\'una pilota roja. Quan tornen a casa, Tomàtic beu aigua i s\'adorm al sofà.',
   q:[['Com es diu el gos?','Tomàtic',['Neus','Pilota','Blanquet']],['De quin color és la pilota?','roja',['blava','blanca','verda']],['Quan van al parc?','cada vesprada',['cada matí','els diumenges','a la nit']],['Què fa Tomàtic quan torna a casa?','beu aigua i s\'adorm',['menja una poma','juga amb la pilota','se\'n va al carrer']]],
   tf:[['El gos es diu Tomàtic.',true],['El gos és molt gran.',false],['Van al parc cada matí.',false],['La pilota és roja.',true],['Tomàtic s\'adorm al sofà.',true]]},
  {t:'Excursió a l\'Albufera', x:'Divendres, la classe de segon va d\'excursió a l\'Albufera. Pugen en una barca i veuen ànecs i garses. La mestra explica que l\'Albufera és un llac molt gran prop de València. Al migdia mengen un entrepà a la vora de l\'aigua. En Pau fa una foto d\'un peix que salta.',
   q:[['On van d\'excursió?','a l\'Albufera',['a la platja','a la muntanya','al museu']],['Quin dia hi van?','divendres',['dilluns','dissabte','diumenge']],['Quins animals veuen?','ànecs i garses',['lleons i zebres','vaques i cavalls','gats i gossos']],['Qui fa una foto?','Pau',['la mestra','Neus','el barquer']],['Què és l\'Albufera?','un llac',['un riu','una muntanya','un bosc']]],
   tf:[['L\'excursió és divendres.',true],['Pugen en un autobús per l\'aigua.',false],['L\'Albufera és un llac.',true],['Mengen un entrepà.',true],['En Pau fa una foto d\'un gos.',false]]},
  {t:'Festes al poble', x:'Al poble de l\'Aina fan festes a l\'agost. Hi ha música, focs artificials i una cercavila amb gegants i cabuts. L\'Aina balla amb el seu iaio. A la nit, tots sopen a la plaça i, al final, es tiren els focs. L\'Aina es tapa les orelles perquè fan molt de soroll.',
   q:[['Quan són les festes?','a l\'agost',['al desembre','a l\'abril','al gener']],['Amb qui balla l\'Aina?','amb el seu iaio',['amb la seua mare','amb el seu germà','amb la mestra']],['On sopen?','a la plaça',['a casa','a la platja','a l\'escola']],['Per què es tapa les orelles?','els focs fan molt de soroll',['fa fred','té son','no li agrada la música']]],
   tf:[['Les festes són a l\'agost.',true],['L\'Aina balla amb la seua iaia.',false],['Sopen a la plaça.',true],['Els focs no fan soroll.',false]]},
  {t:'La planta d\'en Biel', x:'En Biel planta una llavor en un test. Cada dia li posa una mica d\'aigua i el deixa a la finestra perquè li toque el sol. Després d\'una setmana ix una tija verda amb dues fulletes. En Biel està molt content i ho dibuixa en la seua llibreta.',
   q:[['On planta la llavor?','en un test',['al jardí','al riu','en una caixa']],['Per què deixa el test a la finestra?','perquè li toque el sol',['perquè faça fred','perquè plou','perquè no el veja ningú']],['Què ix després d\'una setmana?','una tija amb dues fulles',['una flor roja','una taronja','un arbre gran']],['Com està en Biel?','content',['trist','enfadat','cansat']]],
   tf:[['En Biel planta la llavor en un test.',true],['No li posa mai aigua.',false],['Ix una tija verda.',true],['En Biel està trist.',false]]},
  {t:'El berenar de la Laia', x:'La Laia arriba de l\'escola amb molta gana. La seua mare li prepara un got de llet i un entrepà de formatge. Després, la Laia menja una taronja ben dolça. Quan acaba, renta el got i se\'n va a fer els deures.',
   q:[['Com arriba la Laia de l\'escola?','amb molta gana',['amb son','plorant','amb fred']],['Qui li prepara el berenar?','la seua mare',['el seu pare','la Laia','la iaia']],['De què és l\'entrepà?','de formatge',['de pernil','de truita','de xocolate']],['Quina fruita menja?','una taronja',['una poma','un plàtan','una pera']]],
   tf:[['La Laia té molta gana.',true],['Beu un suc de taronja.',false],['L\'entrepà és de formatge.',true],['Després se\'n va a jugar al carrer.',false]]},
  {t:'El dia de pluja', x:'Dilluns plou molt. En Marc es posa les botes grogues i agafa el paraigua blau. Al pati de l\'escola hi ha bassals i els xiquets no poden eixir. La mestra porta jocs de taula a la classe. En Marc juga al parxís amb la Clara i guanya dues partides.',
   q:[['Quin dia plou?','dilluns',['dimarts','divendres','diumenge']],['De quin color són les botes?','grogues',['roges','verdes','negres']],['Què porta la mestra?','jocs de taula',['un pastís','una pilota','uns llibres']],['A què juga en Marc?','al parxís',['a futbol','a l\'amagatall','a les cartes']]],
   tf:[['En Marc agafa un paraigua blau.',true],['Els xiquets juguen al pati.',false],['En Marc juga amb la Clara.',true],['En Marc perd totes les partides.',false]]},
  {t:'El gat del veí', x:'El veí de la Sara té un gat taronja que es diu Pipo. Pipo puja a la teulada i mira els coloms. Un dia, Pipo entra per la finestra de la Sara i s\'adorm damunt del seu llit. La Sara el torna al veí, que li dona les gràcies amb un caramel de maduixa.',
   q:[['Com es diu el gat?','Pipo',['Sara','Coloms','Taronjo']],['De quin color és el gat?','taronja',['negre','blanc','gris']],['On s\'adorm Pipo?','al llit de la Sara',['al sofà','a la teulada','al jardí']],['Què li dona el veí a la Sara?','un caramel',['un gat','una flor','un llibre']]],
   tf:[['El gat és taronja.',true],['Pipo mira els peixos.',false],['La Sara torna el gat al veí.',true],['El caramel és de llima.',false]]}
 ]},
v2:{id:'v2', subj:'val', lang:'ca-ES', name:'L\'abecedari', sq:'Ab', file:'L\'abecedari.html',
 title:'L\'<span class="d">abece</span><span class="u">dari</span>', lead:'Aprén l\'ordre de les lletres, les vocals i com s\'ordenen les paraules alfabèticament.',
 learn:[['26 lletres','a b c d e f g h i j k l m n o p q r s t u v w x y z','🔤'],['Vocals i consonants','Les vocals són a, e, i, o, u. Les altres són consonants.','🅰️'],['Ordre alfabètic','Mira la primera lletra. Si és igual, mira la segona: casa, cotxe, cullera.','📚']],
 modes:[
  {id:'despres',t:'Quina va després?',p:'Tria la lletra que va després.',type:'gen',gen:'abcAfter'},
  {id:'abans',t:'Quina va abans?',p:'Tria la lletra que va abans.',type:'gen',gen:'abcBefore'},
  {id:'vocal',t:'Vocal o consonant?',p:'Digues si la lletra és vocal o consonant.',type:'gen',gen:'abcVowel'},
  {id:'primer',t:'Quina va primer?',p:'Tria la paraula que va primer en ordre alfabètic.',type:'gen',gen:'abcFirst'},
  {id:'ordena',t:'Ordena alfabèticament',p:'Toca les paraules en ordre alfabètic.',type:'gen',gen:'abcOrder'}
 ],
 WORDS:['abella','barca','casa','dau','escola','flor','gat','hora','illa','jardí','kiwi','lluna','mar','nas','ona','poma','quadre','riu','sol','taula','ull','vaca','xocolate','zebra','cotxe','cullera','bici','pilota','peix','gos','granota','llibre','mestra','taronja','finestra']},
v3:{id:'v3', subj:'val', lang:'ca-ES', name:'Les síl·labes', sq:'ca-sa', file:'Les síl·labes.html',
 title:'Les <span class="d">sí</span>l·<span class="u">la</span>bes', lead:'Pica de mans: cada palmada és una síl·laba. Compta-les, troba la primera i separa paraules.',
 learn:[['Què és una síl·laba?','És cada colp de veu quan diem una paraula.','👏'],['Pica de mans','ca-sa (2 palmades), pi-lo-ta (3), pa-pa-llo-na (4).','🙌'],['Noms','1 síl·laba: monosíl·laba. 2: bisíl·laba. 3: trisíl·laba. 4 o més: polisíl·laba.','🔢']],
 modes:[
  {id:'compta',t:'Compta les síl·labes',p:'Quantes palmades té la paraula?',type:'gen',gen:'sylCount'},
  {id:'primera',t:'La primera síl·laba',p:'Tria la primera síl·laba de la paraula.',type:'gen',gen:'sylFirst'},
  {id:'ultima',t:'L\'última síl·laba',p:'Tria l\'última síl·laba de la paraula.',type:'gen',gen:'sylLast'},
  {id:'forma',t:'Forma la paraula',p:'Ordena les síl·labes per a formar la paraula.',type:'gen',gen:'sylOrder'},
  {id:'separa',t:'Separa-la',p:'Escriu la paraula separada amb guions: ca-sa.',type:'gen',gen:'sylWrite'}
 ],
 SYL:['sol','mar','flor','peix','pa','ca-sa','tau-la','lla-pis','cot-xe','ga-ta','po-ma','lli-bre','ga-to','nu-vol','pi-lo-ta','es-co-la','to-ma-ca','fi-nes-tra','ma-dui-xa','e-le-fant','mun-ta-nya','ta-ron-ja','ca-ra-gol','pa-pa-llo-na','bi-ci-cle-ta','xo-co-la-ta','ma-ri-po-sa','te-le-vi-sió']},
v4:{id:'v4', subj:'val', lang:'ca-ES', name:'Ortografia', sq:'ç', file:'Ortografia.html',
 title:'<span class="d">Orto</span><span class="u">grafia</span>', lead:'c o qu, g o gu, r o rr, c o ç, ny i ll: tria la lletra bona i escriu sense faltes.',
 learn:[['c / qu','ca, co, cu però que, qui: cotxe, queixal, quinze.','🚗'],['g / gu','ga, go, gu però gue, gui: gota, guitarra, foguera.','🎸'],['r / rr','Entre vocals: so fort rr (torre), so suau r (pera). A l\'inici sempre r (ratolí).','🐭'],['c / ç','ce, ci però ça, ço, çu: ceba, plaça, calçot.','🧅'],['ny i ll','Són sons especials: muntanya, any, lluna, cavall.','🌙']],
 modes:[
  {id:'falta',t:'Quina lletra falta?',p:'Tria la lletra que completa la paraula.',type:'choice',bank:[
   ['_otxe','c',['qu'],'Davant de la o escrivim c: cotxe.'],['_eixal','qu',['c'],'Davant de e, el so /k/ és qu: queixal.'],['pa_et','qu',['c'],'Davant de e escrivim qu: paquet.'],['_inze','qu',['c'],'Davant de i escrivim qu: quinze.'],['es_ola','c',['qu'],'Davant de o escrivim c: escola.'],['bos_','c',['qu'],'Al final de paraula escrivim c: bosc.'],
   ['_at','g',['gu'],'Davant de a escrivim g: gat.'],['_itarra','gu',['g'],'Davant de i escrivim gu: guitarra.'],['fo_era','gu',['g'],'Davant de e escrivim gu: foguera.'],['_ota','g',['gu'],'Davant de o escrivim g: gota.'],['_ineu','gu',['g'],'Davant de i escrivim gu: guineu.'],
   ['pe_a','r',['rr'],'Entre vocals, el so suau és r: pera.'],['to_e','rr',['r'],'Entre vocals, el so fort és rr: torre.'],['ca_er','rr',['r'],'Entre vocals, el so fort és rr: carrer.'],['_atolí','r',['rr'],'A principi de paraula sempre r: ratolí.'],['go_a','rr',['r'],'So fort entre vocals: gorra.'],
   ['pla_a','ç',['c'],'Davant de a, el so /s/ és ç: plaça.'],['cal_ot','ç',['c'],'Davant de o, el so /s/ és ç: calçot.'],['_eba','c',['ç'],'Davant de e escrivim c, mai ç: ceba.'],['ca_a','ç',['c'],'caça s\'escriu amb ç.'],
   ['munta_a','ny',['ll','n'],'muntanya s\'escriu amb ny.'],['_una','ll',['ny','l'],'lluna s\'escriu amb ll.'],['cava_','ll',['ny','l'],'cavall acaba en ll.'],['a_','ny',['n','ll'],'any acaba en ny.'],['pa_asso','ll',['ny','l'],'pallasso s\'escriu amb ll.'],['_uadre','qu',['c'],'El so /kw/ davant de a s\'escriu qu: quadre.'],['ra_eta','qu',['c'],'Davant de e, qu: raqueta.'],['va_a','c',['qu'],'Davant de a, c: vaca.'],['for_eta','qu',['c'],'Davant de e, qu: forqueta.'],['_oma','g',['gu'],'Davant de o, g: goma.'],['ju_ar','g',['gu'],'Davant de a, g: jugar.'],['_erra','gu',['g'],'Davant de e, gu: guerra.'],['ba_ca','r',['rr'],'Davant de consonant, r: barca.'],['te_a','rr',['r'],'So fort entre vocals: terra.'],['_osa','r',['rr'],'A principi de paraula, r: rosa.'],['ca_ador','ç',['c'],'Davant de a, ç: caçador.'],['_iutat','c',['ç'],'Davant de i, c: ciutat.'],['bra_','ç',['c'],'Al final, el so /s/ amb ç: braç.'],['dol_','ç',['c'],'dolç acaba en ç.'],['ba_','ny',['ll','n'],'bany acaba en ny.'],['ga_ina','ll',['ny','l'],'gallina s\'escriu amb ll.'],['pi_a','ny',['ll','n'],'pinya s\'escriu amb ny.'],['_ibre','ll',['ny','l'],'llibre comença per ll.']]},
  {id:'bona',t:'Quina està ben escrita?',p:'Tria la paraula escrita sense faltes.',type:'choice',bank:[
   ['🚗','cotxe',['qotxe','cotche']],['🦷','queixal',['ceixal','queishal']],['🎸','guitarra',['gitarra','guitara']],['🗼','torre',['tore','torrre']],['🧅','ceba',['çeba','seba']],['🏙️','plaça',['placa','plassa']],['🐭','ratolí',['rratolí','ratoli']],['🌙','lluna',['luna','lyuna']],['🏔️','muntanya',['muntaña','muntania']],['🐴','cavall',['caball','cavayl']],['🧢','gorra',['gora','gorrra']],['🦊','guineu',['gineu','guinéu']],['🐄','vaca',['baca','vaqa']],['🏓','raqueta',['racueta','raketa']],['🍴','forqueta',['forcueta','forketa']],['🐔','gallina',['gaïna','galina']],['🍍','pinya',['piña','pinia']],['📕','llibre',['libre','yibre']],['🌍','terra',['tera','terrra']],['🌹','rosa',['rrosa','roza']],['🛁','bany',['baño','bani']],['💪','braç',['bras','brac']],['🐢','tortuga',['tortuja','tortugua']],['🏙️','ciutat',['çiutat','siutat']]]},
  {id:'escriu',t:'Escriu la paraula',p:'Mira el dibuix i escriu la paraula ben escrita.',type:'write',bank:[
   ['🚗 c...','cotxe'],['🎸 g...','guitarra'],['🌙 ll...','lluna'],['🧅 c...','ceba'],['🗼 t...','torre'],['🐭 r...','ratolí'],['🏔️ m...','muntanya'],['🐴 c...','cavall'],['🍐 p...','pera'],['🐱 g...','gat'],['🐄 v...','vaca'],['🐔 g...','gallina'],['🍍 p...','pinya'],['📕 ll...','llibre'],['🌹 r...','rosa'],['🛁 b...','bany'],['🏓 r...','raqueta'],['🍴 f...','forqueta'],['🐢 t...','tortuga'],['💪 b...','braç'],['🏙️ c...','ciutat'],['🦊 g...','guineu']]}
 ]},
v5:{id:'v5', subj:'val', lang:'ca-ES', name:'Majúscules i punt', sq:'A.', file:'Majúscules i punt.html',
 title:'<span class="d">Majúscules</span> i <span class="u">punt</span>', lead:'Comença la frase amb majúscula, escriu els noms propis amb majúscula i acaba amb un punt.',
 learn:[['Inici de frase','La primera paraula d\'una frase va amb majúscula.','🔠'],['Noms propis','Persones (Marta), pobles (Castelló), rius (Xúquer) i mascotes (Tomàtic).','🏷️'],['El punt','Al final de la frase posem un punt.','⏺️']],
 modes:[
  {id:'frase',t:'Quina frase està bé?',p:'Tria la frase ben escrita.',type:'choice',bank:[
   ['Quina frase està ben escrita?','La Marta viu a Castelló.',['la Marta viu a Castelló.','La marta viu a castelló.','La Marta viu a Castelló']],['Quina frase està ben escrita?','En Pau té un gos.',['en Pau té un gos.','En pau té un gos.','En Pau té un gos']],['Quina frase està ben escrita?','El meu gat es diu Mixet.',['el meu gat es diu Mixet.','El meu gat es diu mixet.','El Meu Gat es diu Mixet.']],['Quina frase està ben escrita?','Anem a la platja de Dénia.',['anem a la platja de Dénia.','Anem a la platja de dénia.','Anem a la Platja de dénia.']],['Quina frase està ben escrita?','La Júlia menja una poma.',['la júlia menja una poma.','La júlia menja una poma.','La Júlia menja una poma']],['Quina frase està ben escrita?','El riu Túria passa per València.',['El riu túria passa per valència.','el riu Túria passa per València.','El riu Túria passa per València']],['Quina frase està ben escrita?','La meua gata es diu Lluna.',['la meua gata es diu Lluna.','La meua gata es diu lluna.','La meua gata es diu Lluna']],['Quina frase està ben escrita?','En Pau i l\'Aina van al cine.',['en Pau i l\'Aina van al cine.','En pau i l\'aina van al cine.','En Pau i l\'Aina van al cine']],['Quina frase està ben escrita?','Visc a Castelló.',['visc a Castelló.','Visc a castelló.','Visc a Castelló']]]},
  {id:'propi',t:'Nom propi?',p:'Tria la paraula que va sempre amb majúscula.',type:'choice',bank:[
   ['Quina va sempre amb majúscula?','Alacant',['taula','cadira','finestra']],['Quina va sempre amb majúscula?','Júlia',['xiqueta','llibre','pilota']],['Quina va sempre amb majúscula?','Xúquer',['riu','aigua','pont']],['Quina va sempre amb majúscula?','Biel',['xiquet','mestre','amic']],['Quina va sempre amb majúscula?','València',['ciutat','carrer','plaça']],['Quina va sempre amb majúscula?','Tomàtic',['gos','gat','peix']],['Quina va sempre amb majúscula?','Gandia',['platja','muntanya','poble']],['Quina va sempre amb majúscula?','Marta',['iaia','germana','veïna']],['Quina va sempre amb majúscula?','Montgó',['muntanya','camí','bosc']]]},
  {id:'cf',t:'Cert o fals?',p:'Llig la frase i decideix.',type:'tf',bank:[
   ['Les frases comencen amb majúscula.',true,'Sí, sempre.'],['Al final de la frase posem una coma.',false,'Posem un punt.'],['"marta" s\'escriu amb minúscula.',false,'Marta és un nom propi: majúscula.'],['Els noms dels pobles van amb majúscula.',true,'Sí, són noms propis.'],['Després d\'un punt, la paraula següent va amb majúscula.',true,'Comença una frase nova.'],['"gos" és un nom propi.',false,'gos és un nom comú.'],['"València" va amb majúscula.',true,'És el nom d\'una ciutat.'],['El nom de la meua mascota va amb minúscula.',false,'El nom d\'una mascota és nom propi: majúscula.'],['"taula" va sempre amb majúscula.',false,'taula és un nom comú.'],['Al final d\'una pregunta posem ?.',true,'Sí, el signe d\'interrogació.'],['Els dies de la setmana van amb majúscula.',false,'En valencià, dilluns, dimarts... van amb minúscula.'],['Els noms dels rius van amb majúscula.',true,'Sí: el Túria, el Xúquer.']]},
  {id:'escriu',t:'Escriu-la bé',p:'Torna a escriure la frase amb majúscules i punt.',type:'write',bank:[
   ['la marta juga','La Marta juga.'],['en pau menja','En Pau menja.'],['visc a elx','Visc a Elx.'],['la neus canta','La Neus canta.'],['el gos es diu bruc','El gos es diu Bruc.'],['anem a gandia','Anem a Gandia.'],['la júlia salta','La Júlia salta.'],['en biel riu','En Biel riu.'],['vaig a dénia','Vaig a Dénia.'],['el meu gat es diu nit','El meu gat es diu Nit.'],['la clara dibuixa','La Clara dibuixa.'],['som d\'alcoi','Som d\'Alcoi.']],exact:true}
 ]},
v6:{id:'v6', subj:'val', lang:'ca-ES', name:'Gènere i nombre', sq:'el/la', file:'Gènere i nombre.html',
 title:'<span class="d">Gènere</span> i <span class="u">nombre</span>', lead:'Masculí i femení, singular i plural: el gat, la gata, els gats, les gates.',
 learn:[['Masculí i femení','el gat (masculí) · la gata (femení).','🐱'],['Fer el femení','Moltes paraules afegeixen -a: xiquet → xiqueta.','➕'],['Singular i plural','Un (singular) o més d\'un (plural): poma → pomes, flor → flors.','🍎'],['Paraules en -a','Fan el plural en -es: casa → cases.','🏠']],
 modes:[
  {id:'fem',t:'Fes el femení',p:'Tria el femení de la paraula.',type:'choice',bank:[['gat','gata',['gats','gatet']],['xiquet','xiqueta',['xiquets','xiquetes']],['mestre','mestra',['mestres','mestret']],['amic','amiga',['amics','amigues']],['cosí','cosina',['cosins','cosinet']],['veí','veïna',['veïns','veinet']],['gos','gossa',['gossos','gosset']],['actor','actriu',['actora','actors']],['pare','mare',['pares','paret']],['rei','reina',['reis','reia']],['germà','germana',['germans','germanet']],['nen','nena',['nens','nenet']]]},
  {id:'plu',t:'Fes el plural',p:'Tria el plural de la paraula.',type:'choice',bank:[['casa','cases',['casas','casos']],['flor','flors',['flores','florets']],['peix','peixos',['peixs','peixes']],['llapis','llapis',['llapissos','llapises']],['poma','pomes',['pomas','pomos']],['taula','taules',['taulas','taulos']],['gat','gats',['gates','gatos']],['llibre','llibres',['llibrens','llibras']],['nas','nassos',['nasos','nas']],['peu','peus',['peues','peuos']],['mà','mans',['màs','manes']],['llum','llums',['llumes','llumos']],['ou','ous',['oues','ouos']]]},
  {id:'quin',t:'Masculí o femení?',p:'Digues si és masculí o femení.',type:'choice',bank:[['la taula','femení',['masculí']],['el llibre','masculí',['femení']],['la poma','femení',['masculí']],['el cotxe','masculí',['femení']],['la lluna','femení',['masculí']],['el sol','masculí',['femení']],['la mestra','femení',['masculí']],['el gos','masculí',['femení']]]},
  {id:'escriu',t:'Escriu el plural',p:'Escriu la paraula en plural.',type:'write',bank:[['casa','cases'],['flor','flors'],['gat','gats'],['poma','pomes'],['llibre','llibres'],['taula','taules'],['nena','nenes'],['arbre','arbres'],['peix','peixos'],['cotxe','cotxes'],['porta','portes'],['ou','ous'],['mà','mans'],['gos','gossos']]}
 ]},
v7:{id:'v7', subj:'val', lang:'ca-ES', name:'Sinònims i contraris', sq:'↔', file:'Sinònims i contraris.html',
 title:'<span class="d">Sinònims</span> i <span class="u">contraris</span>', lead:'Paraules que volen dir el mateix (content = alegre) i paraules que volen dir el contrari (alt ↔ baix).',
 learn:[['Sinònims','Volen dir el mateix: content i alegre.','🟰'],['Contraris','Volen dir tot el contrari: alt i baix, dia i nit.','↔️'],['Truc','Canvia la paraula en una frase. Vol dir el mateix? Són sinònims!','💡']],
 modes:[
  {id:'contrari',t:'El contrari',p:'Tria el contrari de la paraula.',type:'pairs',bank:'OPP',ask:'Quin és el contrari de'},
  {id:'sinonim',t:'El sinònim',p:'Tria la paraula que vol dir el mateix.',type:'pairs',bank:'SYN',ask:'Quina vol dir el mateix que'},
  {id:'escriu',t:'Escriu el contrari',p:'Escriu el contrari de la paraula.',type:'pairswrite',bank:'OPP'}
 ],
 OPP:[['alt','baix'],['gran','xicotet'],['content','trist'],['ràpid','lent'],['obrir','tancar'],['dia','nit'],['calent','fred'],['ple','buit'],['net','brut'],['entrar','eixir'],['nou','vell'],['llarg','curt'],['fort','dèbil'],['blanc','negre'],['dalt','baix'],['riure','plorar'],['dur','tou'],['pujar','baixar'],['davant','darrere'],['molt','poc'],['guanyar','perdre'],['sec','mullat'],['primer','últim'],['encendre','apagar']],
 SYN:[['content','alegre'],['bonic','preciós'],['xicotet','menut'],['parlar','xarrar'],['cotxe','auto'],['mirar','observar'],['començar','iniciar'],['cansat','esgotat'],['ràpid','veloç'],['casa','llar'],['acabar','finalitzar'],['espantat','atemorit'],['enfadat','emprenyat'],['gros','gran'],['tranquil','calmat'],['llançar','tirar'],['regal','obsequi'],['camí','senda']]},
v8:{id:'v8', subj:'val', lang:'ca-ES', name:'Nom, adjectiu i verb', sq:'N·A·V', file:'Nom, adjectiu i verb.html',
 title:'<span class="d">Nom</span>, <span class="t">adjectiu</span> i <span class="u">verb</span>', lead:'El nom diu què és, l\'adjectiu diu com és i el verb diu què fa.',
 learn:[['Nom','Persones, animals o coses: gos, mestra, taula. Pots dir "el" o "la" davant.','🐶'],['Adjectiu','Diu com és: gran, blau, content. Pots dir "és molt..."','🎨'],['Verb','Diu una acció: córrer, menjar, llegir. Pots dir "jo vull..."','🏃']],
 modes:[
  {id:'quin',t:'Què és?',p:'Digues si la paraula és nom, adjectiu o verb.',type:'gen',gen:'navWhat'},
  {id:'troba',t:'Troba-la',p:'Tria la paraula que és un nom, un adjectiu o un verb.',type:'gen',gen:'navFind'},
  {id:'frase',t:'En la frase',p:'Quina paraula de la frase és el verb?',type:'choice',bank:[
   ['El gos <u>corre</u> pel parc. Quina paraula és el verb?','corre',['gos','parc']],['La Marta <u>menja</u> una poma roja. Quin és el verb?','menja',['poma','roja']],['El gat negre dorm. Quin és l\'adjectiu?','negre',['gat','dorm']],['La mestra llig un conte. Quin és el nom de persona?','mestra',['llig','conte']],['Els xiquets canten molt fort. Quin és el verb?','canten',['xiquets','fort']],['La casa és gran. Quin és l\'adjectiu?','gran',['casa','és']],['La Neus pinta un sol groc. Quin és el verb?','pinta',['sol','groc']],['El gos menut borda. Quin és l\'adjectiu?','menut',['gos','borda']],['L\'avi llig el diari. Quin és el nom?','diari',['llig','el']],['Els ocells volen alt. Quin és el verb?','volen',['ocells','alt']],['La poma verda és dolça. Quin és el nom?','poma',['verda','dolça']],['En Pau beu aigua freda. Quin és l\'adjectiu?','freda',['beu','aigua']]]}
 ],
 VERB:['córrer','menjar','saltar','dormir','llegir','cantar','nadar','escriure','jugar','pintar','ballar','beure'],
 NOUN:['taula','gos','poma','escola','llibre','cotxe','flor','mestra','pilota','finestra','gat','arbre'],
 ADJ:['gran','blau','content','alt','ràpid','bonic','fred','xicotet','dolç','rodó','verd','trist']},
/* ===== LENGUA CASTELLANA ===== */
l1:{id:'l1', subj:'cas', lang:'es-ES', name:'Comprensión lectora', sq:'📖', file:'Comprensión lectora (castellano).html',
 title:'<span class="d">Lee</span> y <span class="u">entiende</span>', lead:'Lee un texto corto y responde las preguntas. ¡La respuesta siempre está en el texto!',
 learn:[['Lee despacio','Si hace falta, lee el texto dos veces.','📖'],['¿Quién? ¿Dónde? ¿Cuándo? ¿Qué?','Fíjate en quién aparece, dónde pasa, cuándo pasa y qué hacen.','🔎'],['Vuelve al texto','La respuesta siempre está en el texto: ¡búscala otra vez!','👀']],
 modes:[
  {id:'lee',t:'Lee y responde',p:'Lee el texto y elige la respuesta correcta.',type:'read',bank:'TEXTS'},
  {id:'vf',t:'¿Verdadero o falso?',p:'Lee el texto y di si la frase es verdadera.',type:'readtf',bank:'TEXTS'},
  {id:'orden',t:'Ordena la frase',p:'Toca las palabras en orden para formar una frase.',type:'order',bank:['Lucía tiene un perro.','El perro corre por el parque.','Vamos de excursión al río.','Mi abuelo cuenta cuentos.','La profesora lee un libro.','Hoy hace mucho calor.','Me gusta jugar al fútbol.','El gato duerme en el sofá.','Los patos nadan en el lago.','Mañana es mi cumpleaños.']}
 ],
 TEXTS:[
  {t:'El perro de Lucía', x:'Lucía tiene un perro que se llama Canelo. Es pequeño y tiene el pelo marrón. Todas las tardes, Lucía y Canelo van al parque. Allí el perro corre detrás de una pelota azul. Cuando vuelven a casa, Canelo bebe agua y se duerme en su cesta.',
   q:[['¿Cómo se llama el perro?','Canelo',['Lucía','Pelota','Rayo']],['¿De qué color es la pelota?','azul',['roja','verde','amarilla']],['¿Cuándo van al parque?','todas las tardes',['por la mañana','los domingos','por la noche']],['¿Dónde se duerme Canelo?','en su cesta',['en el sofá','en la cama','en el jardín']]],
   tf:[['El perro se llama Canelo.',true],['El perro es muy grande.',false],['La pelota es azul.',true],['Van al parque por la noche.',false]]},
  {t:'Un día en la playa', x:'El sábado, Daniel fue a la playa con sus padres. Hizo un castillo de arena muy alto con su pala y su cubo. Después se bañó en el mar y vio un cangrejo pequeño. A mediodía comieron bocadillos debajo de la sombrilla.',
   q:[['¿Qué día fue Daniel a la playa?','el sábado',['el lunes','el viernes','el domingo']],['¿Con quién fue?','con sus padres',['con su clase','con su abuela','solo']],['¿Qué hizo con la arena?','un castillo',['un muñeco','una casa','un barco']],['¿Qué animal vio?','un cangrejo',['un pez grande','una gaviota','un delfín']]],
   tf:[['Daniel fue a la playa el sábado.',true],['Hizo un castillo de arena.',true],['Vio un tiburón.',false],['Comieron en un restaurante.',false]]},
  {t:'La gallina Pepa', x:'En la granja del abuelo vive una gallina que se llama Pepa. Pepa es blanca y pone un huevo cada mañana. A Pepa le gusta comer maíz y pasear por el huerto. Por la noche duerme en el gallinero con las otras gallinas.',
   q:[['¿Dónde vive Pepa?','en la granja del abuelo',['en el bosque','en el colegio','en la ciudad']],['¿De qué color es Pepa?','blanca',['negra','marrón','roja']],['¿Qué le gusta comer?','maíz',['pescado','hierba','pan']],['¿Dónde duerme?','en el gallinero',['en la casa','en un árbol','en el huerto']]],
   tf:[['Pepa es una gallina.',true],['Pepa es negra.',false],['Pone un huevo cada mañana.',true],['Duerme en la cocina.',false]]},
  {t:'El cumpleaños de Hugo', x:'Hoy Hugo cumple ocho años. Su madre ha hecho una tarta de chocolate con ocho velas. Han venido sus amigos del colegio y juegan en el jardín. Hugo sopla las velas y todos cantan. Su regalo favorito es una bicicleta roja.',
   q:[['¿Cuántos años cumple Hugo?','ocho',['siete','nueve','seis']],['¿De qué es la tarta?','de chocolate',['de fresa','de limón','de nata']],['¿Dónde juegan?','en el jardín',['en la calle','en el colegio','en la playa']],['¿Cuál es su regalo favorito?','una bicicleta roja',['un balón','un libro','un coche']]],
   tf:[['Hugo cumple ocho años.',true],['La tarta es de fresa.',false],['Sus amigos juegan en el jardín.',true],['La bicicleta es azul.',false]]},
  {t:'Un día de lluvia', x:'El lunes llueve mucho. Marcos se pone las botas amarillas y coge el paraguas azul. En el patio del colegio hay charcos y los niños no pueden salir. La profesora trae juegos de mesa a la clase. Marcos juega al parchís con Clara y gana dos partidas.',
   q:[['¿Qué día llueve?','el lunes',['el martes','el viernes','el domingo']],['¿De qué color son las botas?','amarillas',['rojas','verdes','negras']],['¿Qué trae la profesora?','juegos de mesa',['una tarta','una pelota','unos libros']],['¿A qué juega Marcos?','al parchís',['al fútbol','al escondite','a las cartas']]],
   tf:[['Marcos coge un paraguas azul.',true],['Los niños juegan en el patio.',false],['Marcos juega con Clara.',true],['Marcos pierde todas las partidas.',false]]},
  {t:'El gato del vecino', x:'El vecino de Sara tiene un gato naranja que se llama Pipo. Pipo sube al tejado y mira las palomas. Un día, Pipo entra por la ventana de Sara y se duerme encima de su cama. Sara se lo devuelve al vecino, que le da las gracias con un caramelo de fresa.',
   q:[['¿Cómo se llama el gato?','Pipo',['Sara','Paloma','Naranjo']],['¿De qué color es el gato?','naranja',['negro','blanco','gris']],['¿Dónde se duerme Pipo?','en la cama de Sara',['en el sofá','en el tejado','en el jardín']],['¿Qué le da el vecino a Sara?','un caramelo',['un gato','una flor','un libro']]],
   tf:[['El gato es naranja.',true],['Pipo mira los peces.',false],['Sara devuelve el gato al vecino.',true],['El caramelo es de limón.',false]]}
 ]},
l2:{id:'l2', subj:'cas', lang:'es-ES', name:'El abecedario', sq:'Ab', file:'El abecedario.html',
 title:'El <span class="d">abece</span><span class="u">dario</span>', lead:'Aprende el orden de las letras, las vocales y a ordenar palabras alfabéticamente.',
 learn:[['27 letras','a b c d e f g h i j k l m n ñ o p q r s t u v w x y z','🔤'],['Vocales y consonantes','Las vocales son a, e, i, o, u. Las demás son consonantes.','🅰️'],['Orden alfabético','Mira la primera letra. Si es igual, mira la segunda: casa, coche, cuchara.','📚']],
 modes:[
  {id:'despues',t:'¿Cuál va después?',p:'Elige la letra que va después.',type:'gen',gen:'abcAfter'},
  {id:'antes',t:'¿Cuál va antes?',p:'Elige la letra que va antes.',type:'gen',gen:'abcBefore'},
  {id:'vocal',t:'¿Vocal o consonante?',p:'Di si la letra es vocal o consonante.',type:'gen',gen:'abcVowel'},
  {id:'primero',t:'¿Cuál va primero?',p:'Elige la palabra que va primero en orden alfabético.',type:'gen',gen:'abcFirst'},
  {id:'ordena',t:'Ordena alfabéticamente',p:'Toca las palabras en orden alfabético.',type:'gen',gen:'abcOrder'}
 ],
 WORDS:['abeja','barco','casa','dado','escuela','flor','gato','hoja','isla','jardín','kiwi','luna','mar','nariz','ñu','oso','pera','queso','río','sol','tomate','uva','vaca','xilófono','yogur','zapato','coche','cuchara','bici','pelota','pez','perro','rana','libro','naranja']},
l3:{id:'l3', subj:'cas', lang:'es-ES', name:'Las sílabas', sq:'ca-sa', file:'Las sílabas.html',
 title:'Las <span class="d">sí</span><span class="u">la</span>bas', lead:'Da palmadas: cada palmada es una sílaba. Cuéntalas, busca la primera y separa palabras.',
 learn:[['¿Qué es una sílaba?','Es cada golpe de voz al decir una palabra.','👏'],['Da palmadas','ca-sa (2 palmadas), pe-lo-ta (3), ma-ri-po-sa (4).','🙌'],['Nombres','1 sílaba: monosílaba. 2: bisílaba. 3: trisílaba. 4 o más: polisílaba.','🔢']],
 modes:[
  {id:'cuenta',t:'Cuenta las sílabas',p:'¿Cuántas palmadas tiene la palabra?',type:'gen',gen:'sylCount'},
  {id:'primera',t:'La primera sílaba',p:'Elige la primera sílaba de la palabra.',type:'gen',gen:'sylFirst'},
  {id:'ultima',t:'La última sílaba',p:'Elige la última sílaba de la palabra.',type:'gen',gen:'sylLast'},
  {id:'forma',t:'Forma la palabra',p:'Ordena las sílabas para formar la palabra.',type:'gen',gen:'sylOrder'},
  {id:'separa',t:'Sepárala',p:'Escribe la palabra separada con guiones: ca-sa.',type:'gen',gen:'sylWrite'}
 ],
 SYL:['sol','mar','flor','pez','pan','ca-sa','me-sa','lá-piz','co-che','ga-to','pe-ra','li-bro','nu-be','lu-na','pe-lo-ta','es-cue-la','to-ma-te','ven-ta-na','fre-sa','e-le-fan-te','mon-ta-ña','na-ran-ja','ca-ra-col','ma-ri-po-sa','bi-ci-cle-ta','cho-co-la-te','te-le-vi-sión','za-pa-to']},
l4:{id:'l4', subj:'cas', lang:'es-ES', name:'Ortografía', sq:'qu', file:'Ortografía.html',
 title:'<span class="d">Orto</span><span class="u">grafía</span>', lead:'c, qu o z; g o gu; r o rr; m antes de p y b: elige la letra correcta.',
 learn:[['c / qu','ca, co, cu y que, qui: casa, queso, quince.','🧀'],['c / z','za, zo, zu y ce, ci: zapato, cereza, cine.','👟'],['g / gu','ga, go, gu y gue, gui: gato, guerra, guitarra.','🎸'],['r / rr','Entre vocales: sonido fuerte rr (perro), suave r (pera). Al principio siempre r (ratón).','🐶'],['mp y mb','Antes de p y b siempre se escribe m: campo, hombre.','⛺']],
 modes:[
  {id:'falta',t:'¿Qué letra falta?',p:'Elige la letra que completa la palabra.',type:'choice',bank:[
   ['_asa','c',['qu'],'Delante de a escribimos c: casa.'],['_eso','qu',['c'],'Delante de e, el sonido /k/ es qu: queso.'],['_ince','qu',['c'],'Delante de i escribimos qu: quince.'],['bos_ue','qu',['c'],'Delante de e escribimos qu: bosque.'],
   ['_apato','z',['c'],'Delante de a escribimos z: zapato.'],['_ereza','c',['z'],'Delante de e escribimos c: cereza.'],['_ine','c',['z'],'Delante de i escribimos c: cine.'],['pi_arra','z',['c'],'Delante de a escribimos z: pizarra.'],
   ['_ato','g',['gu'],'Delante de a escribimos g: gato.'],['_itarra','gu',['g'],'Delante de i escribimos gu: guitarra.'],['hormi_ero','gu',['g'],'Delante de e escribimos gu: hormiguero.'],['_ota','g',['gu'],'Delante de o escribimos g: gota.'],
   ['pe_o','rr',['r'],'Entre vocales, el sonido fuerte es rr: perro.'],['pe_a','r',['rr'],'Entre vocales, el sonido suave es r: pera.'],['_atón','r',['rr'],'Al principio de palabra siempre r: ratón.'],['ca_o','rr',['r'],'Sonido fuerte entre vocales: carro.'],
   ['ca_po','m',['n'],'Antes de p siempre m: campo.'],['ho_bre','m',['n'],'Antes de b siempre m: hombre.'],['ca_pana','m',['n'],'Antes de p siempre m: campana.'],['ta_bor','m',['n'],'Antes de b siempre m: tambor.'],['_uchara','c',['qu'],'Delante de u escribimos c: cuchara.'],['pa_uete','qu',['c'],'Delante de e, qu: paquete.'],['_orro','z',['c'],'Delante de o escribimos z: zorro.'],['ta_a','z',['c'],'Delante de a escribimos z: taza.'],['_ielo','c',['z'],'Delante de i escribimos c: cielo.'],['man_ana','z',['c'],'Delante de a escribimos z: manzana.'],['_uisante','gu',['g'],'Delante de i escribimos gu: guisante.'],['_orila','g',['gu'],'Delante de o escribimos g: gorila.'],['_osa','r',['rr'],'Al principio siempre r: rosa.'],['co_ona','r',['rr'],'Sonido suave entre vocales: corona.'],['bu_o','rr',['r'],'Sonido fuerte entre vocales: burro.'],['so_brero','m',['n'],'Antes de b siempre m: sombrero.'],['li_pio','m',['n'],'Antes de p siempre m: limpio.'],['tortu_a','g',['gu'],'Delante de a escribimos g: tortuga.']]},
  {id:'bien',t:'¿Cuál está bien escrita?',p:'Elige la palabra escrita sin faltas.',type:'choice',bank:[
   ['🧀','queso',['keso','cueso']],['👟','zapato',['sapato','capato']],['🎸','guitarra',['gitarra','guitara']],['🐶','perro',['pero','perrro']],['🍒','cereza',['zereza','serecca']],['🐭','ratón',['rratón','raton']],['⛺','campo',['canpo','kampo']],['🥁','tambor',['tanbor','tamvor']],['🦓','cebra',['zebra','sebra']],['🐜','hormiga',['ormiga','hormija']],['🥄','cuchara',['cuxara','kuchara']],['🦊','zorro',['sorro','zoro']],['☕','taza',['tasa','tacca']],['🍏','manzana',['mansana','manxana']],['🦍','gorila',['gorrila','gorilla']],['🌹','rosa',['rrosa','roza']],['👑','corona',['corrona','korona']],['🫛','guisante',['gisante','guisannte']],['🎩','sombrero',['sonbrero','sombrerro']],['🐢','tortuga',['tortuja','tortugua']],['🍋','limón',['limon','lirmón']],['🫏','burro',['buro','vurro']]]},
  {id:'escribe',t:'Escribe la palabra',p:'Mira el dibujo y escribe la palabra bien escrita.',type:'write',bank:[
   ['🧀 q...','queso'],['👟 z...','zapato'],['🎸 g...','guitarra'],['🐶 p...','perro'],['🐭 r...','ratón'],['⛺ c...','campo'],['🐱 g...','gato'],['🍐 p...','pera'],['🌙 l...','luna'],['🏠 c...','casa'],['🦊 z...','zorro'],['☕ t...','taza'],['🍏 m...','manzana'],['🌹 r...','rosa'],['👑 c...','corona'],['🫛 g...','guisante'],['🎩 s...','sombrero'],['🥄 c...','cuchara'],['🐢 t...','tortuga'],['🍋 l...','limón'],['🫏 b...','burro'],['🦓 c...','cebra']]}
 ]},
l5:{id:'l5', subj:'cas', lang:'es-ES', name:'Mayúsculas y punto', sq:'A.', file:'Mayúsculas y punto.html',
 title:'<span class="d">Mayúsculas</span> y <span class="u">punto</span>', lead:'Empieza la frase con mayúscula, escribe los nombres propios con mayúscula y termina con punto.',
 learn:[['Inicio de frase','La primera palabra de una frase va con mayúscula.','🔠'],['Nombres propios','Personas (Lucía), ciudades (Valencia), ríos (Ebro) y mascotas (Canelo).','🏷️'],['El punto','Al final de la frase ponemos un punto.','⏺️']],
 modes:[
  {id:'frase',t:'¿Qué frase está bien?',p:'Elige la frase bien escrita.',type:'choice',bank:[
   ['¿Qué frase está bien escrita?','Lucía vive en Valencia.',['lucía vive en Valencia.','Lucía vive en valencia.','Lucía vive en Valencia']],['¿Qué frase está bien escrita?','Mi perro se llama Canelo.',['mi perro se llama Canelo.','Mi perro se llama canelo.','Mi Perro se llama Canelo.']],['¿Qué frase está bien escrita?','Hugo juega al fútbol.',['hugo juega al fútbol.','Hugo juega al fútbol','hugo Juega al fútbol.']],['¿Qué frase está bien escrita?','El río Ebro es muy largo.',['El río ebro es muy largo.','el río Ebro es muy largo.','El río Ebro es muy largo']],['¿Qué frase está bien escrita?','Vamos a Madrid en tren.',['vamos a Madrid en tren.','Vamos a madrid en tren.','Vamos a Madrid en tren']],['¿Qué frase está bien escrita?','Mi gata se llama Luna.',['mi gata se llama Luna.','Mi gata se llama luna.','Mi gata se llama Luna']],['¿Qué frase está bien escrita?','Pablo y Ana van al cine.',['pablo y Ana van al cine.','Pablo y ana van al cine.','Pablo y Ana van al cine']],['¿Qué frase está bien escrita?','Vivo en Castellón.',['vivo en Castellón.','Vivo en castellón.','Vivo en Castellón']],['¿Qué frase está bien escrita?','El tren llega a Alicante.',['el tren llega a Alicante.','El tren llega a alicante.','El Tren llega a Alicante.']]]},
  {id:'propio',t:'¿Nombre propio?',p:'Elige la palabra que siempre va con mayúscula.',type:'choice',bank:[
   ['¿Cuál va siempre con mayúscula?','Alicante',['mesa','silla','ventana']],['¿Cuál va siempre con mayúscula?','Daniel',['niño','libro','pelota']],['¿Cuál va siempre con mayúscula?','Ebro',['río','agua','puente']],['¿Cuál va siempre con mayúscula?','Sara',['niña','profesora','amiga']],['¿Cuál va siempre con mayúscula?','España',['país','mapa','ciudad']],['¿Cuál va siempre con mayúscula?','Canelo',['perro','gato','pez']],['¿Cuál va siempre con mayúscula?','Valencia',['playa','montaña','pueblo']],['¿Cuál va siempre con mayúscula?','Marta',['abuela','hermana','vecina']],['¿Cuál va siempre con mayúscula?','Turia',['río','puente','barca']],['¿Cuál va siempre con mayúscula?','Pablo',['primo','tío','chico']]]},
  {id:'vf',t:'¿Verdadero o falso?',p:'Lee la frase y decide.',type:'tf',bank:[
   ['Las frases empiezan con mayúscula.',true,'Sí, siempre.'],['Al final de la frase ponemos una coma.',false,'Ponemos un punto.'],['"lucía" se escribe con minúscula.',false,'Lucía es un nombre propio: mayúscula.'],['Los nombres de ciudades van con mayúscula.',true,'Sí, son nombres propios.'],['Después de un punto, la palabra siguiente va con mayúscula.',true,'Empieza una frase nueva.'],['"perro" es un nombre propio.',false,'perro es un nombre común.'],['"Valencia" va con mayúscula.',true,'Es el nombre de una ciudad.'],['El nombre de mi mascota va con minúscula.',false,'Es un nombre propio: mayúscula.'],['"mesa" va siempre con mayúscula.',false,'mesa es un nombre común.'],['Las preguntas llevan ¿ al principio y ? al final.',true,'Sí, en castellano llevan los dos.'],['Los días de la semana van con mayúscula.',false,'En castellano, lunes, martes... van con minúscula.'],['Los nombres de los ríos van con mayúscula.',true,'Sí: el Ebro, el Turia.']]},
  {id:'escribe',t:'Escríbela bien',p:'Vuelve a escribir la frase con mayúsculas y punto.',type:'write',bank:[
   ['lucía canta','Lucía canta.'],['hugo come','Hugo come.'],['vivo en elche','Vivo en Elche.'],['sara salta','Sara salta.'],['mi gato se llama tom','Mi gato se llama Tom.'],['vamos a sevilla','Vamos a Sevilla.'],['julia salta','Julia salta.'],['pablo ríe','Pablo ríe.'],['voy a denia','Voy a Denia.'],['mi perro se llama rex','Mi perro se llama Rex.'],['clara dibuja','Clara dibuja.'],['somos de alcoy','Somos de Alcoy.']],exact:true}
 ]},
l6:{id:'l6', subj:'cas', lang:'es-ES', name:'Género y número', sq:'el/la', file:'Género y número.html',
 title:'<span class="d">Género</span> y <span class="u">número</span>', lead:'Masculino y femenino, singular y plural: el gato, la gata, los gatos, las gatas.',
 learn:[['Masculino y femenino','el niño (masculino) · la niña (femenino).','🧒'],['Hacer el femenino','Muchas palabras cambian -o por -a: gato → gata.','➕'],['Singular y plural','Uno (singular) o más de uno (plural): casa → casas, flor → flores.','🌸'],['Plural','Si acaba en vocal, añade -s (mesa → mesas). Si acaba en consonante, -es (flor → flores).','📏']],
 modes:[
  {id:'fem',t:'Haz el femenino',p:'Elige el femenino de la palabra.',type:'choice',bank:[['gato','gata',['gatos','gatito']],['niño','niña',['niños','niñas']],['profesor','profesora',['profesores','profesoro']],['amigo','amiga',['amigos','amigas']],['abuelo','abuela',['abuelos','abuelito']],['perro','perra',['perros','perrito']],['actor','actriz',['actora','actores']],['padre','madre',['padres','padra']],['león','leona',['leones','leóna']],['rey','reina',['reyes','reya']],['caballo','yegua',['caballa','caballos']],['hermano','hermana',['hermanos','hermanita']],['tío','tía',['tíos','tiíta']]]},
  {id:'plu',t:'Haz el plural',p:'Elige el plural de la palabra.',type:'choice',bank:[['casa','casas',['cases','casaes']],['flor','flores',['flors','floros']],['lápiz','lápices',['lápizs','lápizes']],['pez','peces',['pezes','pezs']],['nariz','narices',['narizes','narizs']],['reloj','relojes',['relojs','relojas']],['ratón','ratones',['ratóns','ratonas']],['luz','luces',['luzes','luzs']],['mesa','mesas',['meses','mesaes']],['árbol','árboles',['árbols','árbolos']],['libro','libros',['libroes','libras']],['camión','camiones',['camións','camionas']]]},
  {id:'cual',t:'¿Masculino o femenino?',p:'Di si es masculino o femenino.',type:'choice',bank:[['la mesa','femenino',['masculino']],['el libro','masculino',['femenino']],['la manzana','femenino',['masculino']],['el coche','masculino',['femenino']],['la luna','femenino',['masculino']],['el sol','masculino',['femenino']],['la profesora','femenino',['masculino']],['el perro','masculino',['femenino']]]},
  {id:'escribe',t:'Escribe el plural',p:'Escribe la palabra en plural.',type:'write',bank:[['casa','casas'],['flor','flores'],['gato','gatos'],['mesa','mesas'],['libro','libros'],['árbol','árboles'],['niña','niñas'],['papel','papeles'],['lápiz','lápices'],['pez','peces'],['coche','coches'],['ratón','ratones'],['mar','mares']]}
 ]},
l7:{id:'l7', subj:'cas', lang:'es-ES', name:'Sinónimos y antónimos', sq:'↔', file:'Sinónimos y antónimos.html',
 title:'<span class="d">Sinónimos</span> y <span class="u">antónimos</span>', lead:'Palabras que significan lo mismo (contento = alegre) y palabras que significan lo contrario (alto ↔ bajo).',
 learn:[['Sinónimos','Significan lo mismo: contento y alegre.','🟰'],['Antónimos','Significan lo contrario: alto y bajo, día y noche.','↔️'],['Truco','Cambia la palabra en una frase. ¿Significa lo mismo? ¡Son sinónimos!','💡']],
 modes:[
  {id:'contrario',t:'El antónimo',p:'Elige lo contrario de la palabra.',type:'pairs',bank:'OPP',ask:'¿Cuál es lo contrario de'},
  {id:'sinonimo',t:'El sinónimo',p:'Elige la palabra que significa lo mismo.',type:'pairs',bank:'SYN',ask:'¿Cuál significa lo mismo que'},
  {id:'escribe',t:'Escribe el antónimo',p:'Escribe lo contrario de la palabra.',type:'pairswrite',bank:'OPP'}
 ],
 OPP:[['alto','bajo'],['grande','pequeño'],['contento','triste'],['rápido','lento'],['abrir','cerrar'],['día','noche'],['caliente','frío'],['lleno','vacío'],['limpio','sucio'],['entrar','salir'],['nuevo','viejo'],['largo','corto'],['fuerte','débil'],['blanco','negro'],['reír','llorar'],['arriba','abajo'],['duro','blando'],['subir','bajar'],['delante','detrás'],['mucho','poco'],['ganar','perder'],['seco','mojado'],['primero','último'],['encender','apagar']],
 SYN:[['contento','alegre'],['bonito','precioso'],['pequeño','chico'],['hablar','charlar'],['coche','auto'],['mirar','observar'],['empezar','comenzar'],['cansado','agotado'],['rápido','veloz'],['casa','hogar'],['terminar','acabar'],['asustado','miedoso'],['enfadado','enojado'],['tranquilo','calmado'],['tirar','lanzar'],['regalo','obsequio'],['camino','sendero'],['alumno','estudiante']]},
l8:{id:'l8', subj:'cas', lang:'es-ES', name:'Sustantivo, adjetivo y verbo', sq:'S·A·V', file:'Sustantivo, adjetivo y verbo.html',
 title:'<span class="d">Sustantivo</span>, <span class="t">adjetivo</span> y <span class="u">verbo</span>', lead:'El sustantivo dice qué es, el adjetivo dice cómo es y el verbo dice qué hace.',
 learn:[['Sustantivo','Personas, animales o cosas: perro, profesora, mesa. Puedes decir "el" o "la" delante.','🐶'],['Adjetivo','Dice cómo es: grande, azul, contento. Puedes decir "es muy..."','🎨'],['Verbo','Dice una acción: correr, comer, leer. Puedes decir "yo quiero..."','🏃']],
 modes:[
  {id:'que',t:'¿Qué es?',p:'Di si la palabra es sustantivo, adjetivo o verbo.',type:'gen',gen:'navWhat'},
  {id:'busca',t:'Búscala',p:'Elige la palabra que es un sustantivo, un adjetivo o un verbo.',type:'gen',gen:'navFind'},
  {id:'frase',t:'En la frase',p:'Busca el verbo, el adjetivo o el sustantivo en la frase.',type:'choice',bank:[
   ['El perro corre por el parque. ¿Cuál es el verbo?','corre',['perro','parque']],['Lucía come una manzana roja. ¿Cuál es el verbo?','come',['manzana','roja']],['El gato negro duerme. ¿Cuál es el adjetivo?','negro',['gato','duerme']],['La profesora lee un cuento. ¿Cuál es el sustantivo de persona?','profesora',['lee','cuento']],['Los niños cantan muy alto. ¿Cuál es el verbo?','cantan',['niños','alto']],['La casa es grande. ¿Cuál es el adjetivo?','grande',['casa','es']],['Nieves pinta un sol amarillo. ¿Cuál es el verbo?','pinta',['sol','amarillo']],['El perro pequeño ladra. ¿Cuál es el adjetivo?','pequeño',['perro','ladra']],['El abuelo lee el periódico. ¿Cuál es el sustantivo?','periódico',['lee','el']],['Los pájaros vuelan alto. ¿Cuál es el verbo?','vuelan',['pájaros','alto']],['La manzana verde es dulce. ¿Cuál es el sustantivo?','manzana',['verde','dulce']],['Pablo bebe agua fría. ¿Cuál es el adjetivo?','fría',['bebe','agua']]]}
 ],
 VERB:['correr','comer','saltar','dormir','leer','cantar','nadar','escribir','jugar','pintar','bailar','beber'],
 NOUN:['mesa','perro','manzana','escuela','libro','coche','flor','profesora','pelota','ventana','gato','árbol'],
 ADJ:['grande','azul','contento','alto','rápido','bonito','frío','pequeño','dulce','redondo','verde','triste']},
/* ===== ENGLISH ===== vocab: [emoji, english, valencià] */
i1:{id:'i1', subj:'eng', lang:'en-GB', name:'Numbers and colours', sq:'123', file:'Numbers and colours.html',
 title:'<span class="d">Numbers</span> and <span class="u">colours</span>', lead:'Aprén a dir els números de l\'1 al 20 i els colors en anglés.',
 learn:[['Numbers 1-10','one, two, three, four, five, six, seven, eight, nine, ten','🔢'],['Numbers 11-20','eleven, twelve, thirteen, fourteen, fifteen, sixteen, seventeen, eighteen, nineteen, twenty','➕'],['Colours','red, blue, yellow, green, orange, pink, purple, black, white, brown','🌈']],
 vocab:[['1️⃣','one','u'],['2️⃣','two','dos'],['3️⃣','three','tres'],['4️⃣','four','quatre'],['5️⃣','five','cinc'],['6️⃣','six','sis'],['7️⃣','seven','set'],['8️⃣','eight','huit'],['9️⃣','nine','nou'],['🔟','ten','deu'],['12','twelve','dotze'],['15','fifteen','quinze'],['20','twenty','vint'],
  ['🔴','red','roig'],['🔵','blue','blau'],['🟡','yellow','groc'],['🟢','green','verd'],['🟠','orange','taronja'],['🩷','pink','rosa'],['🟣','purple','morat'],['⚫','black','negre'],['⚪','white','blanc'],['🟤','brown','marró'],['🔶','eleven','onze'],['🧱','thirteen','tretze'],['🎂','sixteen','setze'],['🩶','grey','gris'],['🥇','gold','daurat']],
 tf:[['🍌 A banana is yellow.',true,'Yes!'],['🫐 Blueberries are red.',false,'No, they are blue.'],['Five plus five is ten.',true,'5 + 5 = 10.'],['🐷 A pig is pink.',true,'Yes!'],['🍎 An apple is red.',true,'Yes! The apple is red.'],['☀️ The sun is blue.',false,'No, the sun is yellow.'],['🐸 A frog is green.',true,'Yes, frogs are green.'],['Two plus two is five.',false,'2 + 2 = four.'],['🌨️ Snow is white.',true,'Yes, snow is white.'],['Ten is "deu".',true,'Yes, ten = deu.']],
 sent:['I can count to twenty.','Three plus four is seven.','The sky is blue.','I like pink and purple.','My favourite colour is blue.','I am seven years old.','The car is red.','I have two cats.','The grass is green.']},
i2:{id:'i2', subj:'eng', lang:'en-GB', name:'Animals', sq:'🐶', file:'Animals.html',
 title:'<span class="d">Ani</span><span class="u">mals</span>', lead:'Els animals de casa, de la granja i del zoo en anglés.',
 learn:[['Pets','dog, cat, fish, bird, rabbit','🐶'],['Farm animals','cow, pig, horse, sheep, hen, duck','🐄'],['Wild animals','lion, elephant, monkey, giraffe, snake, tiger','🦁']],
 vocab:[['🐶','dog','gos'],['🐱','cat','gat'],['🐟','fish','peix'],['🐦','bird','ocell'],['🐰','rabbit','conill'],['🐄','cow','vaca'],['🐷','pig','porc'],['🐴','horse','cavall'],['🐑','sheep','ovella'],['🐔','hen','gallina'],['🦆','duck','ànec'],['🦁','lion','lleó'],['🐘','elephant','elefant'],['🐒','monkey','mona'],['🦒','giraffe','girafa'],['🐍','snake','serp'],['🐯','tiger','tigre'],['🐸','frog','granota'],['🐻','bear','ós'],['🐭','mouse','ratolí'],['🦓','zebra','zebra'],['🐧','penguin','pingüí'],['🦉','owl','mussol'],['🐢','turtle','tortuga'],['🦊','fox','guineu'],['🐝','bee','abella'],['🦋','butterfly','papallona'],['🐳','whale','balena']],
 tf:[['🦒 A giraffe has got a long neck.',true,'Yes!'],['🐢 A turtle is very fast.',false,'No, it is slow.'],['🐝 A bee makes honey.',true,'Yes!'],['🐧 A penguin lives in the desert.',false,'No, it lives where it is cold.'],['🐘 An elephant is big.',true,'Yes, elephants are big.'],['🐭 A mouse is big.',false,'No, a mouse is small.'],['🐟 A fish can swim.',true,'Yes, fish swim.'],['🐄 A cow can fly.',false,'No! Cows can\'t fly.'],['🐦 A bird can fly.',true,'Yes, birds fly.'],['🐍 A snake has got legs.',false,'No, snakes haven\'t got legs.']],
 sent:['The elephant is grey.','My rabbit is white.','The monkey eats bananas.','Fish live in water.','I have got a dog.','The cat is black.','A bird can fly.','The lion is big.','I like monkeys.']},
i3:{id:'i3', subj:'eng', lang:'en-GB', name:'My family', sq:'👪', file:'My family.html',
 title:'My <span class="u">family</span>', lead:'Mare, pare, germans, iaios... La família en anglés.',
 learn:[['Parents','mum (mare), dad (pare)','👩'],['Brothers and sisters','brother (germà), sister (germana), baby (bebé)','👦'],['Grandparents','grandma (iaia), grandpa (iaio)','👵']],
 vocab:[['👩','mum','mare'],['👨','dad','pare'],['👦','brother','germà'],['👧','sister','germana'],['👶','baby','bebé'],['👵','grandma','iaia'],['👴','grandpa','iaio'],['🧑','cousin','cosí'],['👩‍🦰','aunt','tia'],['👨‍🦱','uncle','tio'],['👪','family','família'],['🧒','friend','amic'],['👫','brother and sister','germà i germana'],['🐕','pet','mascota'],['🏠','house','casa'],['❤️','love','estimar'],['👨‍👩‍👧','parents','pares']],
 tf:[['My mum\'s mum is my grandma.',true,'Yes!'],['A baby is older than grandpa.',false,'No! Grandpa is older.'],['Brother is a boy.',true,'Yes!'],['Aunt is a boy.',false,'No, aunt is a woman.'],['Mum is "mare".',true,'Yes!'],['Grandpa is "germà".',false,'No, grandpa is "iaio".'],['A baby is very small.',true,'Yes, babies are small.'],['Sister is "germana".',true,'Yes!'],['Dad is "tia".',false,'No, dad is "pare".']],
 sent:['My brother is eight.','I play with my cousin.','My grandpa is very kind.','This is my big family.','This is my mum.','I have got a sister.','My dad is tall.','I love my family.','My grandma is funny.']},
i4:{id:'i4', subj:'eng', lang:'en-GB', name:'My body', sq:'🙂', file:'My body.html',
 title:'My <span class="d">body</span>', lead:'Cap, ulls, mans, peus... Les parts del cos en anglés.',
 learn:[['Face','head, eyes, ears, nose, mouth, hair','🙂'],['Body','arms, hands, legs, feet, fingers','✋'],['Plural','one eye → two eyes, one hand → two hands, one foot → two feet!','👣']],
 vocab:[['🗣️','head','cap'],['👀','eyes','ulls'],['👂','ears','orelles'],['👃','nose','nas'],['👄','mouth','boca'],['💇','hair','cabells'],['💪','arm','braç'],['✋','hand','mà'],['🦵','leg','cama'],['🦶','foot','peu'],['☝️','finger','dit'],['🦷','teeth','dents'],['🦵','knee','genoll'],['💪','elbow','colze'],['😀','face','cara'],['🫃','tummy','panxa'],['🧔','beard','barba'],['🦴','bones','ossos']],
 tf:[['I smell with my nose.',true,'Yes!'],['I have got three legs.',false,'No, two legs.'],['I clap with my hands.',true,'Yes!'],['I see with my ears.',false,'No, with my eyes.'],['I see with my eyes.',true,'Yes! Eyes see.'],['I hear with my nose.',false,'No, I hear with my ears.'],['I have got two hands.',true,'Yes!'],['I walk with my arms.',false,'No, I walk with my legs.'],['I eat with my mouth.',true,'Yes!']],
 sent:['Wash your hands.','I have got short hair.','Open your mouth.','My legs are strong.','I have got two eyes.','Touch your nose.','My hair is brown.','Clap your hands.','I have got ten fingers.']},
i5:{id:'i5', subj:'eng', lang:'en-GB', name:'Food', sq:'🍎', file:'Food.html',
 title:'<span class="u">Food</span> and drinks', lead:'Fruites, menjars i begudes en anglés. What do you like?',
 learn:[['Fruit','apple, banana, orange, strawberry, grapes','🍎'],['Food','bread, cheese, egg, chicken, pizza, cake','🍞'],['I like / I don\'t like','I like apples. I don\'t like fish.','👍']],
 vocab:[['🍎','apple','poma'],['🍌','banana','plàtan'],['🍊','orange','taronja'],['🍓','strawberry','maduixa'],['🍇','grapes','raïm'],['🍞','bread','pa'],['🧀','cheese','formatge'],['🥚','egg','ou'],['🍗','chicken','pollastre'],['🍕','pizza','pizza'],['🍰','cake','pastís'],['🥛','milk','llet'],['💧','water','aigua'],['🍦','ice cream','gelat'],['🥕','carrot','safanòria'],['🍐','pear','pera'],['🍉','watermelon','meló d\'Alger'],['🍅','tomato','tomaca'],['🍟','chips','creïlles fregides'],['🥪','sandwich','entrepà'],['🍚','rice','arròs'],['🐟','fish','peix'],['🧃','juice','suc']],
 tf:[['🍉 A watermelon is green outside.',true,'Yes!'],['🍕 Pizza is a fruit.',false,'No, pizza is food, not fruit.'],['🥚 Hens lay eggs.',true,'Yes!'],['🍅 A tomato is blue.',false,'No, it is red.'],['🍌 A banana is yellow.',true,'Yes!'],['🥛 Milk is black.',false,'No, milk is white.'],['🍓 A strawberry is red.',true,'Yes!'],['🥕 A carrot is blue.',false,'No, it is orange.'],['Water is "aigua".',true,'Yes!']],
 sent:['I like pizza.','Bananas are yellow.','I drink milk every day.','Can I have an apple?','I like apples.','I don\'t like fish.','Can I have water, please?','The cake is yummy.','I eat bread for breakfast.']},
i6:{id:'i6', subj:'eng', lang:'en-GB', name:'Clothes', sq:'👕', file:'Clothes.html',
 title:'<span class="d">Clothes</span>', lead:'La roba que portem en anglés: samarreta, pantalons, sabates...',
 learn:[['Clothes','T-shirt, trousers, dress, skirt, jumper, coat','👕'],['Shoes and more','shoes, socks, hat, cap, scarf','👟'],['I\'m wearing...','I\'m wearing a red T-shirt.','🧥']],
 vocab:[['👕','T-shirt','samarreta'],['👖','trousers','pantalons'],['👗','dress','vestit'],['🧥','coat','abric'],['🧦','socks','calcetins'],['👟','shoes','sabates'],['🎩','hat','barret'],['🧢','cap','gorra'],['🧣','scarf','bufanda'],['🧤','gloves','guants'],['👓','glasses','ulleres'],['🩳','shorts','pantalons curts'],['👢','boots','botes'],['🩱','swimsuit','banyador'],['🥿','slippers','sabatilles'],['🧥','jacket','jaqueta'],['👚','blouse','brusa'],['🎒','backpack','motxilla']],
 tf:[['In summer I wear shorts.',true,'Yes!'],['Boots go on my hands.',false,'No, on my feet.'],['A scarf goes on my neck.',true,'Yes!'],['I wear a swimsuit in the snow.',false,'No, at the beach!'],['In winter I wear a coat.',true,'Yes, it is cold.'],['Socks go on my head.',false,'No, socks go on my feet.'],['Gloves go on my hands.',true,'Yes!'],['A hat goes on my feet.',false,'No, on my head.'],['Shoes are "sabates".',true,'Yes!']],
 sent:['I\'m wearing red shoes.','Take off your hat.','My jacket is green.','I need my gloves.','I\'m wearing a blue T-shirt.','Put on your coat.','My shoes are new.','I like your hat.','It is cold, wear a scarf.']},
i7:{id:'i7', subj:'eng', lang:'en-GB', name:'School things', sq:'✏️', file:'School things.html',
 title:'<span class="d">School</span> things', lead:'Les coses de l\'escola i de la classe en anglés.',
 learn:[['School bag','pencil, rubber, ruler, pen, book, crayon','🎒'],['Classroom','desk, chair, board, teacher, window, door','🏫'],['Instructions','Sit down. Stand up. Open your book. Be quiet!','🤫']],
 vocab:[['✏️','pencil','llapis'],['🧽','rubber','goma'],['📏','ruler','regle'],['🖊️','pen','bolígraf'],['📕','book','llibre'],['🖍️','crayon','cera'],['🎒','school bag','motxilla'],['✂️','scissors','tisores'],['🪑','chair','cadira'],['🧑‍🏫','teacher','mestre'],['🚪','door','porta'],['🪟','window','finestra'],['📓','notebook','llibreta'],['🖌️','paintbrush','pinzell'],['🧮','abacus','àbac'],['🗺️','map','mapa'],['💻','computer','ordinador'],['🖍️','colour pencil','llapis de color'],['🗑️','bin','paperera']],
 tf:[['I paint with a paintbrush.',true,'Yes!'],['I write on the door.',false,'No! I write in my notebook.'],['A ruler is long.',true,'Yes!'],['I put rubbish in the bin.',true,'Yes!'],['I write with a pencil.',true,'Yes!'],['I cut with a ruler.',false,'No, I cut with scissors.'],['I sit on a chair.',true,'Yes!'],['A book is "llibre".',true,'Yes!'],['The teacher is a desk.',false,'No, the teacher is a person.']],
 sent:['Stand up, please.','Where is my rubber?','I like my school.','Put your pencil in the bag.','Open your book.','Sit down, please.','This is my pencil.','I have got a red crayon.','Close the door.']},
i8:{id:'i8', subj:'eng', lang:'en-GB', name:'Days and weather', sq:'☀️', file:'Days and weather.html',
 title:'<span class="d">Days</span> and <span class="u">weather</span>', lead:'Els dies de la setmana, les salutacions i el temps que fa en anglés.',
 learn:[['Days','Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday','📅'],['Weather','It\'s sunny, rainy, cloudy, windy, snowy, hot, cold.','🌦️'],['Greetings','Hello! Good morning! Goodbye! How are you? I\'m fine, thank you.','👋']],
 vocab:[['1️⃣📅','Monday','dilluns'],['2️⃣📅','Tuesday','dimarts'],['3️⃣📅','Wednesday','dimecres'],['4️⃣📅','Thursday','dijous'],['5️⃣📅','Friday','divendres'],['6️⃣📅','Saturday','dissabte'],['7️⃣📅','Sunday','diumenge'],['☀️','sunny','fa sol'],['🌧️','rainy','plou'],['☁️','cloudy','està núvol'],['💨','windy','fa vent'],['❄️','snowy','neva'],['🔥','hot','fa calor'],['🥶','cold','fa fred'],['👋','hello','hola'],['🙏','thank you','gràcies'],['🌈','rainbow','arc de Sant Martí'],['🌙','night','nit'],['🌅','morning','matí'],['⛈️','stormy','tempesta'],['🙋','please','per favor'],['👋','goodbye','adéu']],
 tf:[['Saturday comes after Friday.',true,'Yes!'],['It\'s sunny at night.',false,'No, the sun is in the day.'],['☔ I need an umbrella when it\'s rainy.',true,'Yes!'],['Wednesday comes after Monday.',false,'No, Tuesday comes after Monday.'],['Monday is "dilluns".',true,'Yes!'],['Sunday is "dimarts".',false,'No, Sunday is "diumenge".'],['🌧️ It\'s rainy: take an umbrella.',true,'Yes!'],['❄️ When it\'s snowy it is hot.',false,'No, it is cold.'],['There are seven days in a week.',true,'Yes, seven!']],
 sent:['It is cold and windy.','Good morning, teacher!','I go to school on Monday.','Today is a sunny day.','Today is Monday.','It is sunny today.','How are you?','I\'m fine, thank you.','Goodbye, see you tomorrow.']},
};

/* ---------- CASTELLÀ i ANGLÉS (dades compartides amb les apps de tema) ---------- */
function langTopic(T){
  const isEng=T.subj==='eng', cert=T.subj==='cas'?'Verdadero':isEng?'True':'Cert', fals=T.subj==='cas'?'Falso':isEng?'False':'Fals';
  const hint0 = T.subj==='cas'?'Léelo otra vez despacio.':'Llig-ho una altra vegada a poc a poc.';
  const big = t => `<span class="lbig">${t}</span>`;
  const P=[];
  if(T.vocab){
    P.push(()=>{ const v=pick(T.vocab); return choice(`Com es diu en anglés? ${big(v[0])}`, v[1], shuffle(T.vocab.filter(x=>x!==v)).slice(0,3).map(x=>x[1]), {say:'Com es diu en anglés?', hint:'Pensa en la paraula que has après.', explain:`${v[0]} = ${v[1]} (${v[2]})`}); });
    P.push(()=>{ const v=pick(T.vocab); return choice(`Què vol dir ${big(v[1])}?`, v[2], shuffle(T.vocab.filter(x=>x!==v)).slice(0,3).map(x=>x[2]), {say:v[1], lang:T.lang, hint:'Mira el dibuix de l\'apartat Aprén.', explain:`${v[1]} vol dir ${v[2]}.`}); });
  }
  (T.modes||[]).forEach(m=>{
    if(m.type==='choice') P.push(()=>{ const [p,c,w,ex]=pick(m.bank); return choice(/[?¿]/.test(p)?p:`${m.p} ${big(String(p).replace('_','<u>?</u>'))}`, c, w, {say:m.p, lang:T.lang, hint:hint0, explain:ex||`${c}`}); });
    if(m.type==='tf') P.push(()=>{ const [s,v,ex]=pick(m.bank); return choice(s, v?cert:fals, [v?fals:cert], {lang:T.lang, hint:hint0, explain:ex||''}); });
    if(m.type==='read') P.push(()=>{ const tx=pick(T.TEXTS), it=pick(tx.q); return choice(it[0], it[1], it[2], {reading:{t:tx.t,x:tx.x}, lang:T.lang, hint:hint0, explain:it[1]}); });
    if(m.type==='pairs') P.push(()=>{ const L=T[m.bank], pr=pick(L), [a,c]=Math.random()<.5?pr:[pr[1],pr[0]]; return choice(`${m.ask} «${a}»?`, c, shuffle(L.filter(x=>x!==pr).flat()).slice(0,3), {lang:T.lang, hint:hint0, explain:`${a} → ${c}`}); });
    if(m.gen==='abcAfter'){ const A=T.subj==='cas'?'abcdefghijklmnñopqrstuvwxyz':'abcdefghijklmnopqrstuvwxyz'; P.push(()=>{ const i=R(0,A.length-2); return choice(`¿Qué letra va después de la ${A[i].toUpperCase()}?`, A[i+1], [A[Math.max(0,i-1)],A[Math.min(A.length-1,i+2)],A[(i+5)%A.length]], {lang:T.lang, hint:'Recita el abecedario.', explain:`${A[i]} → ${A[i+1]}`}); }); }
    if(m.gen==='sylCount') P.push(()=>{ const w=pick(T.SYL), p=w.split('-'); return num(`¿Cuántas sílabas tiene «${p.join('')}»?`, p.length, {lang:T.lang, say:`¿Cuántas sílabas tiene ${p.join('')}?`, hint:'Da una palmada por cada sílaba.', explain:`${p.join(' - ')}: ${p.length}`}); });
    if(m.gen==='navFind'){ const N=['sustantivo','adjetivo','verbo']; P.push(()=>{ const k=R(0,2), L=[T.NOUN,T.ADJ,T.VERB]; const c=pick(L[k]); return choice(`¿Qué palabra es un ${N[k]}?`, c, shuffle([...L[(k+1)%3],...L[(k+2)%3]]).slice(0,3), {lang:T.lang, hint:k===2?'¿Puedes decir "yo quiero..."?':k===0?'¿Puedes decir "el" o "la" delante?':'¿Puedes decir "es muy..."?', explain:`${c} es un ${N[k]}.`}); }); }
  });
  return {id:T.id, t:T.name, s:T.lead, emo:T.sq, lang:T.lang, learn:T.learn.map(([t,x])=>`${t}: ${x}`), ex:T.learn[0][1], gen: lv => pick(P)()};
}
const CAS = Object.values(LANG_ALL).filter(t=>t.subj==='cas').map(langTopic);
const ENG = Object.values(LANG_ALL).filter(t=>t.subj==='eng').map(langTopic);

