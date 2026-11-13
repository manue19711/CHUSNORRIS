/* Arbre d'habilitats: àrea → cicle (1r cicle, 2n curs) → bloc de sabers bàsics → habilitat → ítems (generats).
   Correspondència orientativa amb l'Annex II del RD 157/2022 i el Decret 106/2022 (currículum de Primària de la Comunitat Valenciana).
   L'ordre de cada llista és l'ordre del camí al mapa. */

const AREAS = [
  { id:'mat', name:'Matemàtiques', short:'Mates', lang:'ca-ES', topics:MAT,
    blocks:{ m1:'A. Sentit numèric', m2:'A. Sentit numèric', m3:'A. Sentit numèric', m4:'A. Sentit numèric', m5:'A. Sentit numèric',
             m6:'B. Sentit de la mesura', m7:'B. Sentit de la mesura', m8:'C. Sentit espacial', m9:'A. Sentit numèric i F. Sentit socioafectiu' } },
  { id:'val', name:'Valencià: llengua i literatura', short:'Valencià', lang:'ca-ES', topics:VAL,
    blocks:{ v1:'B. Comunicació: comprensió lectora', v2:'D. Reflexió sobre la llengua', v3:'D. Reflexió sobre la llengua', v4:'D. Reflexió sobre la llengua: ortografia',
             v5:'D. Reflexió sobre la llengua: ortografia', v6:'D. Reflexió sobre la llengua: gramàtica', v7:'D. Reflexió sobre la llengua: lèxic', v8:'D. Reflexió sobre la llengua: gramàtica' } },
  { id:'med', name:'Coneixement del medi', short:'Medi', lang:'ca-ES', topics:MED,
    blocks:{ c1:'A. Cultura científica: el cos humà', c2:'A. Cultura científica: el cos humà', c3:'A. Cultura científica: salut', c4:'A. Cultura científica: éssers vius',
             c5:'A. Cultura científica: éssers vius', c6:'A. Cultura científica: matèria i fenòmens', c7:'C. Societats i territoris', c8:'C. Societats i territoris', c9:'C. Societats i territoris: el temps' } },
  { id:'cas', name:'Lengua castellana', short:'Castellano', lang:'es-ES', topics:CAS,
    blocks:{ l1:'B. Comunicación: comprensión lectora', l2:'D. Reflexión sobre la lengua', l3:'D. Reflexión sobre la lengua', l4:'D. Reflexión sobre la lengua: ortografía',
             l5:'D. Reflexión sobre la lengua: ortografía', l6:'D. Reflexión sobre la lengua: gramática', l7:'D. Reflexión sobre la lengua: léxico', l8:'D. Reflexión sobre la lengua: gramática' } },
  { id:'eng', name:'English', short:'English', lang:'en-GB', topics:ENG,
    blocks:{ i1:'A. Comunicació: vocabulari', i2:'A. Comunicació: vocabulari', i3:'A. Comunicació: vocabulari', i4:'A. Comunicació: vocabulari',
             i5:'A. Comunicació: vocabulari', i6:'A. Comunicació: vocabulari', i7:'A. Comunicació: vocabulari', i8:'A. Comunicació: vocabulari' } }
];

/* Idees per a practicar a casa (panell de famílies): convertir l'adult en mediador. */
const TIPS = {
  m1:'Jugueu a endevinar nombres: «penso un nombre entre 40 i 50, té 7 unitats».',
  m2:'Mireu els números de les portes o de les pàgines i digueu quantes centenes tenen.',
  m3:'A la compra, sumeu dos preus redons de cap (24 + 18) abans de pagar.',
  m4:'Comptes enrere de 10 en 10 i de 9 en 9 mentre aneu caminant.',
  m5:'Pareu taula per grups: 3 plats amb 2 coberts cada un, quants coberts?',
  m6:'Pregunteu l\'hora en un rellotge d\'agulles: «quina hora és? i d\'ací a mitja hora?».',
  m7:'Deixeu-li pagar el pa amb monedes i comprovar el canvi.',
  m8:'Busqueu figures per casa: rectangles a les portes, cercles als plats.',
  m9:'Inventeu problemes curts amb coses de casa i que vos diga si cal sumar o restar.',
  v1:'Després de llegir un conte, feu-li tres preguntes: qui?, on?, què ha passat?',
  v2:'Ordeneu alfabèticament els noms de la família o dels amics.',
  v3:'Feu palmades per cada síl·laba dels noms dels objectes de la cuina.',
  v4:'Escriviu la llista de la compra junts i fixeu-vos en c/qu, g/gu i r/rr.',
  v5:'Quan escriga una frase, que revise: majúscula al principi i punt al final.',
  v6:'Jugueu a «un, molts»: un gat, molts gats; una flor, moltes flors.',
  v7:'Jugueu a dir el contrari: alt-baix, obrir-tancar, de pressa-a poc a poc.',
  v8:'Descriviu una foto: què hi ha (noms), com és (adjectius), què fa (verbs).',
  c1:'Toqueu-vos les articulacions: coll, colze, canell, genoll i turmell.',
  c2:'Amb els ulls tancats, endevineu aliments per l\'olor i pel tacte.',
  c3:'Prepareu un esmorzar sa junts i classifiqueu els aliments.',
  c4:'Quan veieu un animal, pregunteu: té pèl, plomes o escates? què menja?',
  c5:'Planteu unes llenties en cotó i mireu cada dia com creixen.',
  c6:'Mireu el cel cada matí i anoteu si fa sol, núvols, pluja o vent.',
  c7:'Busqueu al mapa on viviu i quin riu o quina muntanya hi ha a prop.',
  c8:'Pel carrer, parleu dels oficis que veieu i dels senyals de trànsit.',
  c9:'Assenyaleu al calendari els aniversaris de la família i compteu quants dies falten.',
  l1:'Leed juntos un cuento corto en castellano y preguntad qué ha pasado al final.',
  l2:'Jugad a decir una palabra que empiece por cada letra del abecedario.',
  l3:'Dad palmadas por cada sílaba de los nombres de los juguetes.',
  l4:'Escribid juntos la lista de la compra en castellano.',
  l5:'Revisad un mensaje corto: mayúscula al empezar y punto al acabar.',
  l6:'Jugad a «uno, muchos»: un perro, muchos perros.',
  l7:'Jugad a decir lo contrario: grande-pequeño, día-noche.',
  l8:'Describid una foto en castellano: qué hay, cómo es, qué hace.',
  i1:'Count the stairs in English and name the colours you see on the way to school.',
  i2:'Look at animal pictures and say their names in English.',
  i3:'Name the family in a photo: mum, dad, brother, sister, grandma.',
  i4:'Play «Simon says»: touch your nose, your knees, your toes.',
  i5:'At breakfast, ask «Do you like…?» with what is on the table.',
  i6:'When getting dressed, name each piece of clothing in English.',
  i7:'Name what is in the school bag: pencil, rubber, book, ruler.',
  i8:'Every morning, say the day and the weather: «It\'s Monday. It\'s sunny.»'
};

/* Índex: habilitat → dades */
const SKILL = {};
AREAS.forEach(a => a.topics.forEach((t, i) => { t.area = a.id; t.order = i; t.block = a.blocks[t.id] || ''; t.img = IMG[t.id] || ''; SKILL[t.id] = t; }));
const AREA = Object.fromEntries(AREAS.map(a => [a.id, a]));

/* Avatars: fotos (mai la foto ni el nom real de l'alumne). */
const AVATARS = [
  { id:'heroi', l:'la superheroïna' }, { id:'ninja', l:'el ninja' }, { id:'astronauta', l:"l'astronauta" }, { id:'maga', l:'la maga' },
  { id:'fada', l:'la fada' }, { id:'geni', l:'el geni' }, { id:'vampir', l:'el vampir' }, { id:'alien', l:"l'extraterrestre" },
  { id:'monstre', l:'el monstre' }, { id:'fantasma', l:'el fantasma' }, { id:'drac', l:'el drac' }, { id:'robot', l:'el robot' },
  { id:'unicorn', l:"l'unicorn" }, { id:'dino', l:'el dinosaure' }, { id:'gat', l:'el gat' }, { id:'rabosa', l:'la rabosa' },
  { id:'pop', l:'el pop' }, { id:'tortuga', l:'la tortuga' }, { id:'coet', l:'el coet' }, { id:'polls', l:'el pollet' },
  { id:'anim-cometa', l:'el cometa', anim:1 }, { id:'anim-bolet', l:'el bolet', anim:1 }, { id:'anim-peixet', l:'el peixet', anim:1 }, { id:'anim-pingui', l:'el pingüí', anim:1 },
  { id:'anim-cuc', l:'el cuc', anim:1 }, { id:'anim-nuvol', l:'el núvol', anim:1 }, { id:'anim-sol', l:'el sol', anim:1 }, { id:'anim-estrella', l:"l'estrella", anim:1 }
].map(a => ({ ...a, src: a.anim ? 'img/anim/' + a.id + '.svg' : 'img/art/av-' + a.id + '.svg' }));
