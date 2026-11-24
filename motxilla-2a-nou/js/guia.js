/* Motxilla 2A · guia.js — «Com explicar-ho»: guia per a l'adult abans dels exercicis.
   Una fitxa per tema: què ha d'entendre, com explicar-ho pas a pas, un exemple, una activitat a casa,
   errors típics, preguntes per a comprovar i el vocabulari (valencià ↔ castellà).
   La guia està en castellà perquè és per a l'adult; les paraules que veu l'alumne van en valencià. */
(function () {
'use strict';

const G = {
/* ======================= MATEMÀTIQUES (en valencià, senzill) ======================= */
m1: { idea: 'Saber que un nombre de dues xifres té desenes i unitats, i comparar nombres.',
  pasos: ['Una <b>desena</b> són 10 unitats juntes.', 'La xifra de l\'esquerra són les desenes. La de la dreta, les unitats.', 'Per a comparar, mira primer les desenes.'],
  ej: ['47 → 4 desenes i 7 unitats', '47 = 40 + 7', '52 &gt; 47 (5 desenes és més que 4)', '30 &lt; 33'],
  casa: 'Feu paquets de 10 macarrons amb una goma. 3 paquets i 4 solts = 34.',
  err: ['Llegir 41 com 14.', 'Mirar només les unitats per a comparar.'],
  preg: ['Quantes desenes té el 63?', 'Quin és més gran, 38 o 83?'] },

m2: { idea: 'Saber que 10 desenes fan una centena i què val cada xifra.',
  pasos: ['Una <b>centena</b> són 100 (10 desenes).', 'En un nombre de tres xifres: centenes, desenes i unitats.', 'Per a comparar, mira primer les centenes.'],
  ej: ['352 → 3 C, 5 D i 2 U', '352 = 300 + 50 + 2', 'Després del 399 ve el 400', '481: el 4 val 400'],
  casa: 'Mireu els números dels portals o de les pàgines i digueu les centenes.',
  err: ['Pensar que el 5 de 352 val 5 (val 50).', 'No saber què ve després del 399.'],
  preg: ['Quant val el 4 en el 481?', 'Quin nombre té 6 C, 0 D i 3 U?'] },

m3: { idea: 'Sumar de dues maneres: per descomposició i en columna (portant-ne una).',
  pasos: ['<b>Per descomposició:</b> separa desenes i unitats, suma-les a part i ajunta-ho.', '<b>En columna:</b> unitats davall d\'unitats. Comença per les unitats.', 'Si les unitats fan 10 o més, escrius les unitats i en portes una.'],
  ej: ['26 + 12 → 20 + 10 = 30 · 6 + 2 = 8 → <b>38</b>', '34 + 25 → 30 + 20 = 50 · 4 + 5 = 9 → <b>59</b>', '38 + 25 → 8 + 5 = 13, escric 3 i en porte 1 → 3 + 2 + 1 = 6 → <b>63</b>', '47 + 6 → 7 + 6 = 13 → <b>53</b>'],
  casa: 'Amb paquets de 10 macarrons: quan tens 10 solts, fes un paquet nou. Això és «portar-ne una».',
  err: ['Començar per l\'esquerra.', 'Oblidar la que portes.'],
  preg: ['Quant fa 23 + 14 per descomposició?', 'En 47 + 6, per què en portem una?'] },

m4: { idea: 'Restar en columna i demanar una desena quan dalt n\'hi ha menys.',
  pasos: ['El més gran, dalt. Comença per les unitats.', 'Si dalt n\'hi ha menys, demana una desena: el 2 es fa 12.', 'A les desenes, ara n\'hi ha una menys.'],
  ej: ['58 − 23 = <b>35</b> (sense demanar)', '52 − 17 → 12 − 7 = 5 · 4 − 1 = 3 → <b>35</b>', '40 − 6 → 10 − 6 = 4 · 3 − 0 = 3 → <b>34</b>', 'Comprova: 35 + 17 = 52 ✔'],
  casa: 'Amb monedes: tens 5 de 10 € i 2 d\'1 €. Per a pagar 7 €, canvia una de 10 per deu d\'1.',
  err: ['Fer 7 − 2 en lloc de demanar.', 'Demanar la desena i no llevar-la de dalt.'],
  preg: ['En 43 − 18, cal demanar una desena?', 'Com comproves una resta?'] },

m5: { idea: 'Multiplicar és sumar grups iguals.',
  pasos: ['Fes grups iguals amb objectes.', 'Suma\'ls: és una multiplicació.', 'L\'ordre no importa: 3 × 4 = 4 × 3.'],
  ej: ['3 plats amb 4 galetes → 4 + 4 + 4 = 12 → <b>3 × 4 = 12</b>', '2 mans amb 5 dits → <b>2 × 5 = 10</b>', 'Taula del 10: 6 × 10 = 60', 'Taula del 5: acaba en 0 o en 5'],
  casa: 'Compteu coses en grups: rodes de 3 cotxes (3 × 4), dits de 2 mans (2 × 5).',
  err: ['Sumar els dos nombres: 3 × 4 = 7.'],
  preg: ['Quant fan 4 grups de 5?', '5 × 3 és igual que 3 × 5?'] },

m6: { idea: 'Llegir l\'hora en punt, i quart, i mitja i menys quart, en el rellotge d\'agulles i en el digital.',
  pasos: ['L\'agulla <b>curta</b> diu l\'hora. La <b>llarga</b>, els minuts.', 'Llarga al 12: <b>en punt</b>. Al 3: <b>i quart</b>. Al 6: <b>i mitja</b>. Al 9: <b>menys quart</b>.', 'Menys quart: diem l\'hora <b>següent</b>.', 'Digital: abans dels punts, les hores; després, els minuts.'],
  ej: ['3:00 → les tres en punt', '3:15 → les tres i quart', '3:30 → les tres i mitja', '3:45 → les <b>quatre</b> menys quart', '1:00 → <b>la</b> una en punt', '1 hora = 60 minuts · mitja hora = 30 · un quart = 15'],
  casa: 'Moveu el rellotge de dalt i pregunteu-li: «Quina hora és?». Durant el dia: «I d\'ací a mitja hora?».',
  err: ['Confondre les agulles.', 'Dir «les tres menys quart» per a les 3:45 (són les quatre menys quart).', 'Dir «les una» en lloc de «la una».'],
  preg: ['Si la llarga mira el 6, quina hora és?', 'Com es diu 7:45?', 'Quants minuts té mitja hora?'],
  extra: 'clock' },

m7: { idea: 'Comptar diners i calcular el canvi.',
  pasos: ['Comença pel bitllet o la moneda que val més.', 'Ves sumant.', 'El canvi: el que pagues menys el que costa.'],
  ej: ['10 € + 5 € + 2 € = <b>17 €</b>', '2 € + 2 € + 1 € = <b>5 €</b>', 'Costa 7 €, pague amb 10 € → em tornen <b>3 €</b>', '1 euro = 100 cèntims'],
  casa: 'Jugueu a la botiga, o que pague ell el pa i revise el canvi.',
  err: ['Comptar monedes sense mirar quant valen (3 monedes ≠ 3 €).'],
  preg: ['Quant és un bitllet de 10 € i dues monedes de 2 €?', 'Costa 4 € i pagues amb 5 €: quant et tornen?'] },

m8: { idea: 'Conéixer els polígons i comptar costats i vèrtexs.',
  pasos: ['Un <b>polígon</b> és una figura tancada amb costats rectes.', 'Els <b>costats</b> són les línies. Els <b>vèrtexs</b> són les puntes.', 'El nom depén dels costats.'],
  ej: ['Triangle → 3 costats i 3 vèrtexs', 'Quadrilàter → 4 (el quadrat i el rectangle ho són)', 'Pentàgon → 5', 'Hexàgon → 6', 'El cercle <b>no</b> és un polígon: no té costats rectes'],
  casa: 'Busqueu figures per casa: la porta (rectangle), un senyal (triangle). Feu polígons amb escuradents.',
  err: ['Pensar que el quadrat no és un quadrilàter.', 'Comptar dues vegades el mateix vèrtex.'],
  preg: ['Quants vèrtexs té un pentàgon?', 'El cercle és un polígon?'] },

m10: { idea: 'Conéixer els tipus de línies i saber si dues rectes són paral·leles o secants.',
  pasos: ['<b>Recta:</b> no gira. <b>Poligonal:</b> trossos rectes. <b>Corba:</b> sense trossos rectes. <b>Mixta:</b> rectes i corbes.', '<b>Tancada:</b> acaba on comença. <b>Oberta:</b> no.', '<b>Secants:</b> es tallen. <b>Paral·leles:</b> no es tallen mai.'],
  ej: ['Un ziga-zaga → poligonal oberta', 'Un triangle dibuixat → poligonal tancada', 'Una O → corba tancada', 'Una X → rectes secants', 'Les vies del tren → rectes paral·leles'],
  casa: 'Pel carrer: les vies del tren i les ratlles del pas de vianants són paral·leles; dos carrers que es creuen, secants.',
  err: ['Confondre corba tancada i poligonal tancada.'],
  preg: ['Una lletra O és oberta o tancada?', 'Per què les vies del tren són paral·leles?'] },

m9: { idea: 'Llegir un problema i saber si cal sumar, restar o multiplicar.',
  pasos: ['Llig-lo dues vegades.', 'Busca els nombres i la pregunta.', 'Al final, n\'hi ha més o menys? Més → suma. Menys → resta. Grups iguals → multiplica.'],
  ej: ['«Té 12 cromos i li\'n donen 5» → més → 12 + 5 = <b>17 cromos</b>', '«Hi ha 20 persones i en baixen 8» → menys → 20 − 8 = <b>12</b>', '«3 caixes amb 5 ous» → grups → 3 × 5 = <b>15 ous</b>'],
  casa: 'Inventeu problemes amb coses de casa: «Hi ha 8 taronges i en mengem 3. Quantes en queden?».',
  err: ['Sumar sempre.', 'Respondre sense la unitat (17 què?).'],
  preg: ['Al final, n\'hi ha més o menys?', 'Què et pregunta el problema?'] },

/* ======================= VALENCIÀ ======================= */
v1: { idea: 'Que lea un texto corto en valenciano, lo entienda y encuentre en él las respuestas.',
  pasos: ['Primero leedlo en voz alta juntos; después que lo lea él solo.',
    'Antes de las preguntas, que os cuente con sus palabras de qué va.',
    'Usad las preguntas clave: ¿quién? (qui), ¿dónde? (on), ¿cuándo? (quan), ¿qué pasa? (què).',
    'Si no sabe una respuesta, no se la digáis: «Vamos a buscarla en el texto». Que señale la frase.'],
  ej: 'Texto: «La Marta va al parc amb el seu gos». ¿Qui? La Marta. ¿On va? Al parc. ¿Amb qui? Amb el seu gos.',
  casa: 'Leed un cuento corto en valenciano antes de dormir y haced tres preguntas: qui, on, què ha passat.',
  err: ['Responder de memoria o inventando, sin volver al texto.', 'Leer muy deprisa y saltarse palabras.'],
  preg: ['¿Quién sale en el texto?', '¿Dónde pasa?', '¿En qué frase lo dice?'],
  voc: [['qui?', '¿quién?'], ['on?', '¿dónde?'], ['quan?', '¿cuándo?'], ['què?', '¿qué?'], ['per què?', '¿por qué?']] },

v2: { idea: 'Que sepa el abecedario en orden, distinga vocales y consonantes y ordene palabras alfabéticamente.',
  pasos: ['Cantad el abecedario juntos (en valenciano son 26 letras; no tiene ñ).',
    'Vocales: a, e, i, o, u. Las demás son consonantes.',
    'Para ordenar palabras, mirad la primera letra. Si es igual, mirad la segunda.',
    'Usad un diccionario infantil: las palabras están en orden alfabético.'],
  ej: 'casa, cotxe, cullera (c igual → a, o, u). abella va antes que barca.',
  casa: 'Ordenad alfabéticamente los nombres de la familia o de sus amigos.',
  err: ['Saltarse letras al recitarlo (k, w, y).', 'Ordenar solo por la primera letra cuando es igual.'],
  preg: ['¿Qué letra va después de la m?', '¿Cuáles son las vocales?', '¿Qué va antes: pera o poma?'],
  voc: [['l\'abecedari', 'el abecedario'], ['vocal / consonant', 'vocal / consonante'], ['ordre alfabètic', 'orden alfabético']] },

v3: { idea: 'Que separe palabras en sílabas (golpes de voz) y las cuente.',
  pasos: ['Decid una palabra despacio dando una palmada en cada golpe de voz: ca-sa (2 palmadas).',
    'Cada palmada es una síl·laba.',
    'Probad con palabras más largas: pi-lo-ta (3), pa-pa-llo-na (4).',
    'Que escriba la palabra separando con guiones.'],
  ej: 'sol (1) · ca-sa (2) · pi-lo-ta (3) · pa-pa-llo-na (4).',
  casa: 'Dad palmadas con los nombres de los objetos de la cocina o de los miembros de la familia.',
  err: ['Separar letra por letra en lugar de por golpes de voz.', 'Contar mal en palabras largas.'],
  preg: ['¿Cuántas sílabas tiene «finestra»?', '¿Cuál es la primera sílaba de «cadira»?'],
  voc: [['síl·laba', 'sílaba'], ['paraula', 'palabra'], ['picar de mans', 'dar palmadas']] },

v4: { idea: 'Que escriba bien c/qu, g/gu, r/rr y c/ç en valenciano.',
  pasos: ['Sonido /k/: ca, co, cu, pero <b>que, qui</b> (cotxe, queixal, quinze).',
    'Sonido de «gat»: ga, go, gu, pero <b>gue, gui</b> (gota, guitarra, foguera).',
    'Sonido fuerte de r entre vocales: rr (torre). Suave: r (pera). Al principio de palabra, siempre r (ratolí).',
    'Sonido /s/ con c: ce, ci, pero <b>ça, ço, çu</b> (ceba, plaça, calçot). La ç (ce trencada) no va nunca delante de e o i.'],
  ej: 'cotxe, quatre, queixal, quinze · gat, guerra, guineu · torre, pera, ratolí · ceba, plaça, braç.',
  casa: 'Escribid juntos la lista de la compra y fijaos en estas letras.',
  err: ['Escribir «qe» o «ke».', 'Escribir «ge» por «gue» (gerra / guerra).', 'Poner ç delante de e o i.'],
  preg: ['¿Se escribe «plaça» o «plasa»?', '¿Por qué «guitarra» lleva u?'],
  voc: [['ce trencada (ç)', 'c con cedilla'], ['so fort / suau', 'sonido fuerte / suave']] },

v5: { idea: 'Que use mayúscula al empezar una frase y en los nombres propios, y que acabe las frases con punto.',
  pasos: ['La primera palabra de una frase va con mayúscula.',
    'Los nombres propios también: personas (Marta), pueblos y ciudades (Castelló), ríos (Xúquer), mascotas.',
    'Al final de la frase, un punto.',
    'Que repase sus frases buscando estas tres cosas.'],
  ej: '«El Pau viu a València.» → mayúscula en El, Pau y València; punto al final.',
  casa: 'Escribid juntos una nota o una felicitación y revisad mayúsculas y puntos.',
  err: ['Escribir los nombres de ciudades en minúscula.', 'Olvidar el punto final.', 'Poner mayúsculas en medio de las palabras.'],
  preg: ['¿Qué palabras de esta frase llevan mayúscula?', '¿Qué ponemos al final de una frase?'],
  voc: [['majúscula / minúscula', 'mayúscula / minúscula'], ['nom propi', 'nombre propio'], ['punt', 'punto']] },

v6: { idea: 'Que distinga masculino y femenino, singular y plural, y forme el plural correctamente en valenciano.',
  pasos: ['Masculino: el gat. Femenino: la gata. Muchas palabras hacen el femenino añadiendo -a.',
    'Singular es uno; plural, más de uno.',
    'Plural general: añadir -s (flor → flors).',
    'Palabras que acaban en -a: cambian a -es (casa → cases, poma → pomes).',
    'Algunas acabadas en -s, -x, -ç añaden -os (peix → peixos).'],
  ej: 'el xiquet → la xiqueta → els xiquets → les xiquetes.',
  casa: 'Juego «un, molts»: un gat, molts gats; una poma, moltes pomes.',
  err: ['Hacer el plural de «casa» como «casas» (en valenciano es «cases»).', 'Confundir el/la con els/les.'],
  preg: ['¿Cómo es el plural de «taula»?', '¿Cuál es el femenino de «mestre»?'],
  voc: [['masculí / femení', 'masculino / femenino'], ['singular / plural', 'singular / plural'], ['el, la, els, les', 'el, la, los, las']] },

v7: { idea: 'Que sepa qué son los sinónimos (significan lo mismo) y los contrarios (significan lo opuesto).',
  pasos: ['Sinónimos: palabras que quieren decir lo mismo (content = alegre).',
    'Truco: cambiad la palabra en una frase; si la frase significa lo mismo, son sinónimos.',
    'Contrarios o antónimos: significan lo opuesto (alt ↔ baix).',
    'Jugad con pares: dia/nit, obrir/tancar, gran/xicotet.'],
  ej: 'El gos està content = El gos està alegre. Alt ↔ baix.',
  casa: 'Juego de decir el contrario mientras paseáis: «alt» → «baix», «ràpid» → «lent».',
  err: ['Confundir sinónimo con contrario.'],
  preg: ['Dime un sinónimo de «bonic».', '¿Cuál es el contrario de «ple»?'],
  voc: [['sinònim', 'sinónimo'], ['contrari / antònim', 'contrario / antónimo'], ['xicotet', 'pequeño']] },

v8: { idea: 'Que distinga el nombre (qué es), el adjetivo (cómo es) y el verbo (qué hace).',
  pasos: ['Nombre: persona, animal o cosa. Truco: se puede poner «el» o «la» delante (el gos, la taula).',
    'Adjetivo: dice cómo es. Truco: «és molt…» (és molt gran).',
    'Verbo: una acción. Truco: «jo vull…» (jo vull córrer).',
    'Con una frase sencilla, que señale cada clase de palabra.'],
  ej: '«El gos blanc corre.» gos = nom, blanc = adjectiu, corre = verb.',
  casa: 'Describid una foto: qué hay (nombres), cómo es (adjetivos), qué hacen (verbos).',
  err: ['Pensar que «córrer» es un nombre porque es una palabra conocida.', 'Confundir adjetivo y nombre.'],
  preg: ['En «La nena salta», ¿qué palabra es el verbo?', 'Dime un adjetivo para describir el mar.'],
  voc: [['nom', 'nombre / sustantivo'], ['adjectiu', 'adjetivo'], ['verb', 'verbo']] },

/* ======================= CONEIXEMENT DEL MEDI (en valencià, senzill) ======================= */
c1: { idea: 'Conéixer les parts del cos, els ossos, els músculs i les articulacions.',
  pasos: ['El cos té tres parts: cap, tronc i extremitats.', 'Els <b>ossos</b> ens sostenen. Els <b>músculs</b> ens mouen.', 'Les <b>articulacions</b> ens deixen doblegar.'],
  ej: ['El crani protegeix el cervell', 'Per a xutar: músculs de la cama i doblem el genoll', 'Articulacions: coll, colze, canell, genoll, turmell'],
  casa: 'Jugueu a «Simó diu»: toca\'t el colze, el turmell, el canell…',
  err: ['Confondre colze i genoll, o canell i turmell.'],
  preg: ['Per a què serveixen els ossos?', 'On tens el turmell?'] },

c2: { idea: 'Conéixer els cinc sentits i com cuidar-los.',
  pasos: ['Tenim cinc sentits.', 'Cada sentit té un òrgan.', 'Els hem de cuidar.'],
  ej: ['Vista → ulls', 'Oïda → orelles', 'Olfacte → nas', 'Gust → llengua', 'Tacte → pell', 'No mirar el sol · música no massa alta'],
  casa: 'Amb els ulls tapats, endevineu aliments per l\'olor i pel tacte.',
  err: ['Confondre olfacte i gust.'],
  preg: ['Amb quin sentit notes que una cosa crema?', 'Com cuidem les orelles?'] },

c3: { idea: 'Saber què és menjar sa i tindre bons hàbits.',
  pasos: ['Cal menjar de tot.', 'Dolços, només de tant en tant.', 'Rentar-se, dormir i fer esport.'],
  ej: ['Cada dia: fruita, verdura, llet, cereals', 'Algunes vegades: peix, carn, llegums', 'Poques vegades: llepolies', 'Dents → després de menjar', 'Dormir unes 10 hores', 'Si tens set → aigua'],
  casa: 'Prepareu junts un esmorzar sa.',
  err: ['Pensar que el suc de brick és igual que la fruita.'],
  preg: ['Què hem de menjar cada dia?', 'Quan ens raspallem les dents?'] },

c4: { idea: 'Classificar els animals.',
  pasos: ['Amb ossos (vertebrats) o sense (invertebrats).', 'Com naixen: d\'un ou o de la panxa de la mare.', 'Què mengen.'],
  ej: ['Gos → mamífer, vivípar, carnívor', 'Gallina → au, ovípara, omnívora', 'Peix → escates', 'Caragol → invertebrat (no té ossos)', 'Vaca → herbívora', 'El dofí és un mamífer, no un peix'],
  casa: 'Quan veieu un animal: té pèl, plomes o escates? Què menja?',
  err: ['Pensar que el dofí i la balena són peixos.'],
  preg: ['El caragol té ossos?', 'Què menja un herbívor?'] },

c5: { idea: 'Conéixer les parts de la planta i què necessita.',
  pasos: ['Parts: arrel, tija, fulles, flor i fruit.', 'L\'arrel agafa l\'aigua. La tija la puja.', 'Les plantes necessiten aigua, llum i aire.'],
  ej: ['Les pepites de la taronja → llavors', 'Arbre → tronc gros (taronger)', 'Arbust → romer', 'Herba → gespa'],
  casa: 'Planteu llenties en cotó mullat i mireu cada dia com creixen.',
  err: ['Confondre tija i arrel.'],
  preg: ['Per a què serveix l\'arrel?', 'Què necessita una planta?'] },

c6: { idea: 'Conéixer els estats de l\'aigua, el temps i les estacions.',
  pasos: ['L\'aigua pot ser sòlida, líquida o gas.', 'L\'any té quatre estacions.', 'Hem d\'estalviar aigua.'],
  ej: ['Gel → sòlid', 'Aigua de l\'aixeta → líquid', 'Vapor de l\'olla → gas', 'Primavera, estiu, tardor, hivern', 'El termòmetre mesura la temperatura'],
  casa: 'Cada matí, mireu el cel: fa sol, núvols, pluja o vent?',
  err: ['Confondre tardor i hivern.'],
  preg: ['Què li passa al gel fora del congelador?', 'En quina estació fa més calor?'] },

c7: { idea: 'Conéixer el paisatge i la Comunitat Valenciana.',
  pasos: ['Paisatge de costa o de muntanya.', 'La Comunitat té tres províncies.', 'Rius, mar i l\'Albufera.'],
  ej: ['Costa → platja i mar', 'Muntanya → muntanyes, rius i boscos', 'Províncies: Castelló, València i Alacant', 'Capital: València', 'Mar Mediterrani', 'Rius: Túria, Xúquer i Segura'],
  casa: 'Busqueu al mapa on viviu i quin riu teniu a prop.',
  err: ['Pensar que València és l\'única província.'],
  preg: ['Quines són les tres províncies?', 'Quin mar tenim?'] },

c8: { idea: 'Conéixer els oficis, els transports i com creuar el carrer.',
  pasos: ['Moltes persones treballen per a tots.', 'L\'ajuntament cuida del poble.', 'Creuem pel pas de vianants i amb el semàfor verd.'],
  ej: ['Bombera → apaga focs', 'Forner → fa pa', 'Carter → porta cartes', 'Terra → cotxe, tren', 'Aigua → vaixell', 'Aire → avió'],
  casa: 'Pel carrer, parleu dels oficis i dels senyals que veieu.',
  err: ['Creuar mirant només a un costat.'],
  preg: ['Qui governa el poble?', 'Per on creuem el carrer?'] },

c9: { idea: 'Conéixer els dies, els mesos i ahir, hui i demà.',
  pasos: ['La setmana té 7 dies.', 'L\'any té 12 mesos.', 'Ahir ja ha passat, demà vindrà.'],
  ej: ['Dilluns, dimarts, dimecres, dijous, divendres, dissabte, diumenge', 'Gener, febrer, març… desembre', 'Si hui és dimarts → ahir dilluns, demà dimecres', 'Abans: rentar a mà · Ara: rentadora'],
  casa: 'Marqueu al calendari els aniversaris i compteu quants dies falten.',
  err: ['Confondre dimarts i dimecres.'],
  preg: ['Quin dia ve després del dijous?', 'Quants mesos té l\'any?'] },
/* ======================= LENGUA CASTELLANA ======================= */
l1: { idea: 'Que lea un texto corto en castellano, lo entienda y busque las respuestas en él.',
  pasos: ['Leedlo juntos en voz alta y después que lo lea solo.', 'Que cuente con sus palabras de qué va.', 'Preguntas clave: ¿quién?, ¿dónde?, ¿cuándo?, ¿qué pasa?', 'Si no sabe, que vuelva al texto y señale la frase.'],
  ej: '«Lucía juega en el parque con su perro». ¿Quién? Lucía. ¿Dónde? En el parque.',
  casa: 'Leed un cuento en castellano y preguntad qué ha pasado al final.',
  err: ['Responder sin volver a leer.'], preg: ['¿Quién aparece?', '¿Dónde lo dice?'] },
l2: { idea: 'Que sepa el abecedario castellano (27 letras, con ñ) y ordene palabras alfabéticamente.',
  pasos: ['Cantad el abecedario: tiene la ñ, que en valenciano no está.', 'Vocales: a, e, i, o, u.', 'Para ordenar, mirad la primera letra y, si es igual, la segunda.'],
  ej: 'casa, coche, cuchara.', casa: 'Decid una palabra que empiece por cada letra.',
  err: ['Olvidar la ñ o ponerla en mal sitio (va después de la n).'], preg: ['¿Qué letra va después de la n?', '¿Qué va antes, sol o sal?'] },
l3: { idea: 'Que separe palabras en sílabas y sepa los nombres según el número de sílabas.',
  pasos: ['Palmadas: ca-sa (2), pe-lo-ta (3), ma-ri-po-sa (4).', 'Una sílaba: monosílaba; dos: bisílaba; tres: trisílaba; cuatro o más: polisílaba.'],
  ej: 'sol (monosílaba), mesa (bisílaba), pelota (trisílaba).', casa: 'Palmadas con los nombres de los juguetes.',
  err: ['Separar letra a letra.'], preg: ['¿Cuántas sílabas tiene «zapato»? ¿Cómo se llama?'] },
l4: { idea: 'Que escriba bien c/qu/z, g/gu, r/rr y m antes de p y b.',
  pasos: ['ca, co, cu / que, qui (casa, queso).', 'za, zo, zu / ce, ci (zapato, cine).', 'ga, go, gu / gue, gui (gato, guitarra).', 'rr entre vocales con sonido fuerte (perro); al principio, r (ratón).', 'Antes de p y b, siempre m (campo, hombre).'],
  ej: 'queso, cereza, guerra, perro, campo.', casa: 'Escribid la lista de la compra en castellano.',
  err: ['Escribir «zine» o «qeso».', 'Escribir «canpo».'], preg: ['¿Se escribe «zapato» o «capato»?', '¿Qué letra va antes de la b?'],
  voc: [['ç (valencià)', 'en castellano no existe: se usa z o c'], ['qu + e/i', 'igual en las dos lenguas']] },
l5: { idea: 'Que use mayúscula al empezar y en nombres propios, y punto al final.',
  pasos: ['Mayúscula al principio de la frase.', 'Mayúscula en nombres de personas, ciudades, ríos y mascotas.', 'Punto al final.'],
  ej: '«Lucía vive en Valencia.»', casa: 'Revisad juntos un mensaje corto.',
  err: ['Olvidar el punto.', 'Ciudades en minúscula.'], preg: ['¿Qué palabras llevan mayúscula en «mi perro Canelo vive en Castellón»?'] },
l6: { idea: 'Que distinga masculino/femenino y singular/plural en castellano.',
  pasos: ['el niño / la niña: muchas palabras cambian -o por -a.', 'Plural: si acaba en vocal, -s (mesa → mesas); si acaba en consonante, -es (flor → flores).'],
  ej: 'el gato, la gata, los gatos, las gatas.', casa: 'Juego «uno, muchos».',
  err: ['Hacer «casa → cases» por influencia del valenciano.', 'Decir «flors» en lugar de «flores».'], preg: ['¿Plural de «árbol»?', '¿Femenino de «león»?'] },
l7: { idea: 'Que sepa qué son sinónimos y antónimos.',
  pasos: ['Sinónimos: significan lo mismo (contento = alegre).', 'Antónimos: lo contrario (alto ↔ bajo).', 'Truco: cambia la palabra en la frase; si significa lo mismo, son sinónimos.'],
  ej: 'bonito = precioso · día ↔ noche.', casa: 'Decid contrarios mientras paseáis.',
  err: ['Confundir sinónimo y antónimo.'], preg: ['Un sinónimo de «grande».', 'El contrario de «abrir».'] },
l8: { idea: 'Que distinga sustantivo, adjetivo y verbo.',
  pasos: ['Sustantivo: personas, animales o cosas; se puede poner «el» o «la» delante.', 'Adjetivo: cómo es; «es muy…».', 'Verbo: una acción; «yo quiero…».'],
  ej: '«El perro blanco corre»: perro (sustantivo), blanco (adjetivo), corre (verbo).', casa: 'Describid una foto en castellano.',
  err: ['Confundir adjetivo y sustantivo.'], preg: ['¿Cuál es el verbo en «La niña salta»?'] },

/* ======================= ENGLISH ======================= */
i1: { idea: 'Que diga los números del 1 al 20 y los colores en inglés.',
  pasos: ['Contad en inglés objetos reales (escaleras, juguetes).', 'Ojo con thirteen (13) y thirty (30): el 13–19 acaba en -teen.', 'Colores: señalad cosas de casa y decid el color.'],
  ej: 'one, two, three… ten · red, blue, yellow, green.', casa: 'Contad los escalones en inglés y decid los colores que veis de camino al cole.',
  err: ['Confundir twelve (12) y twenty (20).'], preg: ['How many fingers? (ten)', 'What colour is the sky?'],
  voc: [['one, two, three', 'uno, dos, tres'], ['red, blue, yellow, green', 'rojo, azul, amarillo, verde'], ['orange, pink, purple', 'naranja, rosa, morado'], ['black, white, brown', 'negro, blanco, marrón']] },
i2: { idea: 'Que nombre animales de casa, de granja y salvajes en inglés.',
  pasos: ['Pets: dog, cat, fish, bird, rabbit.', 'Farm: cow, pig, horse, sheep, hen, duck.', 'Wild: lion, elephant, monkey, giraffe, snake, tiger.', 'Haced el sonido del animal y que diga el nombre.'],
  ej: 'It\'s a dog. It\'s a cow.', casa: 'Mirad dibujos o fotos de animales y decid sus nombres.',
  err: ['Pronunciar «sheep» como «ship».'], preg: ['What animal says «moo»?'],
  voc: [['dog / cat / bird', 'perro / gato / pájaro'], ['cow / pig / horse / sheep', 'vaca / cerdo / caballo / oveja'], ['hen / duck', 'gallina / pato']] },
i3: { idea: 'Que nombre a la familia en inglés.',
  pasos: ['mum, dad, brother, sister, baby, grandma, grandpa.', 'Usad fotos de la familia: «This is my mum».'],
  ej: 'This is my grandma.', casa: 'Nombrad a la familia en una foto.',
  err: ['Confundir brother y sister.'], preg: ['Who is your dad\'s mum? (grandma)'],
  voc: [['mum / dad', 'mamá / papá'], ['brother / sister', 'hermano / hermana'], ['grandma / grandpa', 'abuela / abuelo']] },
i4: { idea: 'Que nombre las partes del cuerpo en inglés y algunos plurales.',
  pasos: ['head, eyes, ears, nose, mouth, hair, arms, hands, legs, feet, fingers.', 'Canción «Head, shoulders, knees and toes».', 'Plural especial: one foot → two feet.'],
  ej: 'Touch your nose!', casa: 'Jugad a «Simon says: touch your…».',
  err: ['Decir «foots» en lugar de «feet».'], preg: ['Touch your ears.', 'How many eyes have you got?'],
  voc: [['head / eyes / ears', 'cabeza / ojos / orejas'], ['nose / mouth / hair', 'nariz / boca / pelo'], ['hands / legs / feet', 'manos / piernas / pies']] },
i5: { idea: 'Que nombre alimentos y diga lo que le gusta y lo que no.',
  pasos: ['Fruit: apple, banana, orange, strawberry, grapes.', 'Food: bread, cheese, egg, chicken, pizza, cake.', 'I like… / I don\'t like…'],
  ej: 'I like apples. I don\'t like fish.', casa: 'En el desayuno, preguntad «Do you like…?».',
  err: ['Olvidar el «don\'t» en negativo.'], preg: ['Do you like pizza?'],
  voc: [['apple / banana / orange', 'manzana / plátano / naranja'], ['bread / cheese / egg', 'pan / queso / huevo'], ['I like / I don\'t like', 'me gusta / no me gusta']] },
i6: { idea: 'Que nombre la ropa en inglés y diga lo que lleva puesto.',
  pasos: ['T-shirt, trousers, dress, skirt, jumper, coat, shoes, socks, hat, cap, scarf.', 'I\'m wearing a red T-shirt.'],
  ej: 'I\'m wearing blue trousers.', casa: 'Al vestirse, nombrad cada prenda en inglés.',
  err: ['Confundir «trousers» (pantalones) con «T-shirt».'], preg: ['What are you wearing today?'],
  voc: [['T-shirt / trousers', 'camiseta / pantalones'], ['dress / skirt', 'vestido / falda'], ['jumper / coat', 'jersey / abrigo'], ['shoes / socks', 'zapatos / calcetines']] },
i7: { idea: 'Que nombre el material y la clase en inglés y entienda instrucciones.',
  pasos: ['pencil, rubber, ruler, pen, book, crayon.', 'desk, chair, board, teacher, window, door.', 'Sit down. Stand up. Open your book. Be quiet!'],
  ej: 'This is my pencil.', casa: 'Nombrad lo que hay en la mochila.',
  err: ['Confundir rubber (goma) y ruler (regla).'], preg: ['Show me your rubber.'],
  voc: [['pencil / rubber / ruler', 'lápiz / goma / regla'], ['desk / chair / board', 'pupitre / silla / pizarra']] },
i8: { idea: 'Que diga los días de la semana, el tiempo que hace y saludos en inglés.',
  pasos: ['Monday … Sunday (empiezan con mayúscula).', 'It\'s sunny, rainy, cloudy, windy, snowy, hot, cold.', 'Hello! Good morning! Goodbye! How are you? I\'m fine, thank you.'],
  ej: 'It\'s Monday. It\'s sunny.', casa: 'Cada mañana, decid el día y el tiempo en inglés.',
  err: ['Confundir Tuesday y Thursday.'], preg: ['What day is it today?', 'What\'s the weather like?'],
  voc: [['Monday … Sunday', 'lunes … domingo'], ['sunny / rainy / cloudy', 'soleado / lluvioso / nublado'], ['windy / cold / hot', 'ventoso / frío / calor']] }
};
window.GUIA = G;

/* ---------- rellotge interactiu (tema m6) ---------- */
const HC = ['dotze', 'una', 'dues', 'tres', 'quatre', 'cinc', 'sis', 'set', 'huit', 'nou', 'deu', 'onze', 'dotze'];
const HE = ['doce', 'una', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez', 'once', 'doce'];
function frases(h, m) {
  const a = x => (x === 1 ? 'la ' : 'les ') + HC[x], b = x => (x === 1 ? 'la ' : 'las ') + HE[x], n = h % 12 + 1;
  if (m === 0) return [a(h) + ' en punt', b(h) + ' en punto'];
  if (m === 15) return [a(h) + ' i quart', b(h) + ' y cuarto'];
  if (m === 30) return [a(h) + ' i mitja', b(h) + ' y media'];
  if (m === 45) return [a(n) + ' menys quart', b(n) + ' menos cuarto'];
  return [`${a(h)} i ${m} minuts`, `${b(h)} y ${m} minutos`];
}
function clockBox() {
  return `<div class="gclock" data-h="3" data-m="0">
    <div class="gclock-faces"><div class="gclock-an"></div><div class="gclock-dg"></div></div>
    <p class="gclock-say"></p>
    <div class="gclock-btns">
      <button class="btn btn-soft" data-gc="-15">− 15 min</button><button class="btn btn-soft" data-gc="15">+ 15 min</button>
      <button class="btn btn-soft" data-gc="60">+ 1 hora</button><button class="btn btn-main" data-gc="rnd">Hora a l'atzar</button>
    </div>
    <p class="gclock-tip">Truc: tapa la frase amb la mà i pregunta-li «Quina hora és?».</p></div>`;
}
function paintClock(box) {
  const h = +box.dataset.h, m = +box.dataset.m, [ca, es] = frases(h, m);
  box.querySelector('.gclock-an').innerHTML = vClock(h, m);
  box.querySelector('.gclock-dg').innerHTML = vDigital(h, m);
  box.querySelector('.gclock-say').innerHTML = `<b>${ca.charAt(0).toUpperCase() + ca.slice(1)}</b>`;
}
const quarts = `<div class="gtable"><table><thead><tr><th>Agulla llarga</th><th>Digital</th><th>Es diu</th><th>Minuts</th></tr></thead><tbody>
  <tr><td>al 12</td><td>3:00</td><td>les tres <b>en punt</b></td><td>0</td></tr>
  <tr><td>al 3</td><td>3:15</td><td>les tres <b>i quart</b></td><td>15</td></tr>
  <tr><td>al 6</td><td>3:30</td><td>les tres <b>i mitja</b></td><td>30</td></tr>
  <tr><td>al 9</td><td>3:45</td><td>les <u>quatre</u> <b>menys quart</b></td><td>45</td></tr></tbody></table></div>
  <p class="gnote">Parts del dia: el matí, el migdia, la vesprada i la nit. Si veu 15:30, resta 12: les tres i mitja de la vesprada.</p>`;

/* ---------- vista ---------- */
const AREA_TXT = { mat: 'Matemàtiques', val: 'Valencià', med: 'Medi', cas: 'Castellano', eng: 'English' };
/* títols: en valencià per a Matemàtiques i Medi; en castellà per a la resta */
const TX = {
  ca: { idea: 'Què ha d\'aprendre', pasos: 'Explica-ho així', clock: 'Rellotge per a explicar les hores', demo: 'Així ho veurà a l\'app', ej: 'Exemples', casa: 'A casa', err: 'Compte amb...', preg: 'Pregunta-li' },
  es: { idea: 'Qué tiene que aprender', pasos: 'Cómo explicarlo, paso a paso', clock: 'Reloj para explicar las horas', demo: 'Cómo lo verá en la app', ej: 'Ejemplo', casa: 'Para hacer en casa', err: 'Errores típicos', preg: 'Pregúntale para comprobar' }
};
const langOf = area => (area === 'mat' || area === 'med') ? 'ca' : 'es';
function card(id) {
  const t = SKILL[id], g = G[id]; if (!t || !g) return '';
  const L = TX[langOf(t.area)];
  const li = a => (a || []).map(x => `<li>${x}</li>`).join('');
  const ej = Array.isArray(g.ej) ? `<ul class="gexlist">${li(g.ej)}</ul>` : `<p>${g.ej}</p>`;
  return `<article class="gcard" style="${cvars(t.area)}" id="g-${id}">
    <header class="ghead"><img src="${t.img}" alt=""><div><div class="qtag"><i></i>${esc(AREA[t.area].name)}</div><h2>${esc(t.t)}</h2><p class="sub">${esc(t.s || '')}</p></div></header>
    <section class="gsec gidea"><h3>${L.idea}</h3><p>${g.idea}</p></section>
    <section class="gsec"><h3>${L.pasos}</h3><ol>${li(g.pasos)}</ol></section>
    <section class="gsec gex"><h3>${L.ej}</h3>${ej}</section>
    ${g.extra === 'clock' ? `<section class="gsec"><h3>${L.clock}</h3>${clockBox()}${quarts}</section>` : ''}
    ${t.demo ? `<section class="gsec"><h3>${L.demo}</h3><div class="demo">${t.demo}</div></section>` : ''}
    <section class="gsec"><h3>${L.casa}</h3><p>${g.casa}</p></section>
    <div class="gtwo">
      <section class="gsec gwarn"><h3>${L.err}</h3><ul>${li(g.err)}</ul></section>
      <section class="gsec"><h3>${L.preg}</h3><ul>${li(g.preg)}</ul></section>
    </div>
    ${g.voc ? `<section class="gsec"><h3>Vocabulario</h3><div class="gtable"><table><thead><tr><th>${t.area === 'eng' ? 'Inglés' : 'Valenciano'}</th><th>Castellano</th></tr></thead><tbody>${g.voc.map(v => `<tr><td>${v[0]}</td><td>${v[1]}</td></tr>`).join('')}</tbody></table></div></section>` : ''}
  </article>`;
}

window.vGuia = function () {
  const id = V.guia, all = id === 'all';
  const ids = all ? AREAS.flatMap(a => a.topics.map(t => t.id)) : [id];
  const back = V.back || 'map';
  const area = all ? null : SKILL[id] && SKILL[id].area;
  return shell(back === 'adults' ? '' : 'map', `
  <div class="gtop noprint">
    <button class="btn btn-soft" data-gback="1">← ${!area || langOf(area) === 'ca' ? 'Torna' : 'Volver'}</button>
    ${!all && P().settings.free !== false ? `<button class="btn btn-main" data-practice="${id}">${langOf(area) === 'ca' ? 'Ja ho hem explicat: als exercicis!' : 'Ya lo hemos explicado: ¡a los ejercicios!'}</button>` : ''}
    <button class="btn btn-soft" data-gprint="1">${!area || langOf(area) === 'ca' ? 'Imprimeix' : 'Imprimir'}</button>
  </div>
  <header class="hello"><h1>${all ? 'Temari i guia per a explicar' : langOf(area) === 'ca' ? 'Com explicar-ho' : 'Cómo explicarlo'}</h1>
    <p>${all ? 'Totes les assignatures i tots els temes. Per a cada tema: què ha d\'aprendre, com explicar-ho, exemples, una activitat per a casa, errors típics i preguntes.' : langOf(area) === 'ca' ? 'Llegiu-ho junts abans de fer els exercicis.' : 'Guía para el adulto. Leedla antes de hacer los ejercicios.'}</p></header>
  ${all ? `<nav class="gindex noprint">${AREAS.map(a => `<div style="${cvars(a.id)}"><b>${esc(a.name)}</b>${a.topics.map(t => `<a href="#g-${t.id}" data-gjump="${t.id}">${esc(t.t)}</a>`).join('')}</div>`).join('')}</nav>` : ''}
  ${ids.map(card).join('')}`);
};

/* esdeveniments propis de la guia */
document.addEventListener('click', e => {
  const g = e.target.closest('[data-guia]');
  if (g) { e.preventDefault(); return go({ name: 'guia', guia: g.dataset.guia, back: g.dataset.back || 'map', area: V.area, sel: V.sel }); }
  if (e.target.closest('[data-gback]')) { const b = V.back || 'map'; return go(b === 'map' ? { name: 'map', area: V.area, sel: V.sel } : { name: b }); }
  if (e.target.closest('[data-gprint]')) return window.print();
  const j = e.target.closest('[data-gjump]');
  if (j) { e.preventDefault(); const el = document.getElementById('g-' + j.dataset.gjump); if (el) el.scrollIntoView({ behavior: 'smooth' }); return; }
  const c = e.target.closest('[data-gc]');
  if (c) { const box = c.closest('.gclock'); let h = +box.dataset.h, m = +box.dataset.m; const k = c.dataset.gc;
    if (k === 'rnd') { h = R(1, 12); m = pick([0, 15, 30, 45]); }
    else { let t = ((h % 12) * 60 + m + Number(k) + 720) % 720; h = Math.floor(t / 60) || 12; m = t % 60; }
    box.dataset.h = h; box.dataset.m = m; paintClock(box); }
});
/* pinta els rellotges quan apareixen */
new MutationObserver(() => document.querySelectorAll('.gclock:not([data-ok])').forEach(b => { b.dataset.ok = 1; paintClock(b); }))
  .observe(document.getElementById('app'), { childList: true, subtree: true });
})();
