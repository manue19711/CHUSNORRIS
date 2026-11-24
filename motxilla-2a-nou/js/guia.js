/* Motxilla 2A · guia.js — «Com explicar-ho»: guia per a l'adult abans dels exercicis.
   Una fitxa per tema: què ha d'entendre, com explicar-ho pas a pas, un exemple, una activitat a casa,
   errors típics, preguntes per a comprovar i el vocabulari (valencià ↔ castellà).
   La guia està en castellà perquè és per a l'adult; les paraules que veu l'alumne van en valencià. */
(function () {
'use strict';

const G = {
/* ======================= MATEMÀTIQUES ======================= */
m1: { idea: 'Que entienda que un número de dos cifras está hecho de decenas (grupos de 10) y unidades sueltas, y que sepa compararlos.',
  pasos: ['Coged 10 objetos pequeños (macarrones, legos) y atadlos con una goma: eso es <b>una desena</b> (una decena).',
    'Haced varios paquetes de 10 y dejad algunos sueltos. Contad: «3 paquetes y 4 sueltos son 34».',
    'Escribid el número y señalad: la cifra de la izquierda dice cuántos paquetes (D) y la de la derecha cuántos sueltos (U).',
    'Para comparar dos números, primero comparad los paquetes (decenas). Solo si son iguales, mirad los sueltos.',
    'Los signos &gt; y &lt;: dibujadlos como una boca de cocodrilo que siempre quiere comerse el número más grande.'],
  ej: '47 = 4 D + 7 U = 40 + 7. ¿Qué es mayor, 47 o 52? 5 decenas son más que 4, así que 52 &gt; 47.',
  casa: 'Juego «Pienso un número»: «Estoy pensando en un número que tiene 6 decenas y 2 unidades». Luego cambiad los papeles.',
  err: ['Leer 41 como 14 (confunde el orden de las cifras).', 'Comparar mirando solo las unidades: cree que 29 &gt; 31 porque 9 &gt; 1.', 'Girar el signo &gt; / &lt;.'],
  preg: ['¿Cuántas decenas tiene el 63? ¿Y unidades?', '¿Qué número va justo antes del 50?', '¿Cuál es mayor, 38 o 83? ¿Por qué?'],
  voc: [['desena (D)', 'decena'], ['unitat (U)', 'unidad'], ['anterior / posterior', 'anterior / posterior'], ['és major que / és menor que', 'es mayor que / es menor que']] },

m2: { idea: 'Que vea que 10 decenas forman una centena y que cada cifra vale distinto según su lugar.',
  pasos: ['Recordad la decena (paquete de 10). Ahora juntad 10 paquetes: eso es <b>una centena</b> (100).',
    'Usad billetes y monedas de juguete: 100 €, 10 € y 1 €. El 352 son 3 de 100, 5 de 10 y 2 de 1.',
    'Dibujad una tabla con tres columnas C | D | U y colocad las cifras.',
    'Para comparar números de tres cifras, mirad primero las centenas.',
    'Practicad el «salto»: después del 399 viene el 400, después del 199 el 200.'],
  ej: '352 = 3 C + 5 D + 2 U = 300 + 50 + 2. Se lee «tres-cents cinquanta-dos».',
  casa: 'Mirad los números de las páginas de un libro o de los portales y decid cuántas centenas tienen.',
  err: ['Escribir «tres-cents cinquanta-dos» como 30052.', 'No saber qué viene después del 399.', 'Pensar que el 5 de 352 vale 5 (vale 50).'],
  preg: ['¿Cuánto vale el 4 en el 481?', '¿Qué número tiene 6 C, 0 D y 3 U?', '¿Qué va después del 299?'],
  voc: [['centena (C)', 'centena'], ['xifra', 'cifra'], ['cent, dos-cents, tres-cents', 'cien, doscientos, trescientos']] },

m3: { idea: 'Que sume números de dos cifras de dos maneras: por descomposición (decenas con decenas y unidades con unidades) y en columna, llevándose una cuando las unidades pasan de 9.',
  pasos: ['<b>Suma por descomposición</b> (como en el libro): 26 + 12. Separad cada número: 26 = 2 D + 6 U y 12 = 1 D + 2 U.',
    'Juntad las decenas: 20 + 10 = 30. Juntad las unidades: 6 + 2 = 8. Al final, 30 + 8 = 38.',
    '<b>Suma en columna</b>: escribid un número debajo del otro, unidades debajo de unidades y decenas debajo de decenas.',
    'Empezad siempre por las unidades (por la derecha).',
    'Si las unidades suman 10 o más (8 + 5 = 13), se escribe el 3 y «me llevo una» decena, que se pone encima de las decenas.'],
  ej: 'Por descomposición: 26 + 12 → 20 + 10 = 30, 6 + 2 = 8 → 38. En columna llevando: 38 + 25 → 8 + 5 = 13, escribo 3 y me llevo 1; 3 + 2 + 1 = 6 → 63.',
  casa: 'Con paquetes de 10 macarrones y sueltos: haced 38 y 25, juntadlo todo y cuando haya 10 sueltos, atadlos en un paquete nuevo. Eso es «llevarse una».',
  err: ['Empezar por la izquierda.', 'Olvidarse de sumar la que se lleva.', 'Escribir 513 en lugar de 63 (pone el 13 entero).', 'Colocar mal las columnas (unidades debajo de decenas).'],
  preg: ['¿Cuántas decenas y unidades tiene el 34? ¿Y el 25? ¿Cuánto suman juntos?', '¿Por qué en 47 + 6 nos llevamos una?', '¿Por dónde empezamos a sumar en columna?'],
  voc: [['sumar / suma', 'sumar / suma'], ['portar-ne una', 'llevarse una'], ['en columna / en línia', 'en columna / en fila'], ['descompondre', 'descomponer']] },

m4: { idea: 'Que reste en columna y entienda que, cuando arriba hay menos unidades que abajo, se «pide prestada» una decena.',
  pasos: ['Escribid el número grande arriba y el pequeño debajo, unidades con unidades.',
    'Empezad por las unidades.',
    'Si arriba hay menos (2 − 7 no se puede), se rompe una decena: el 2 se convierte en 12, y en las decenas queda una menos.',
    'Restad las unidades (12 − 7 = 5) y después las decenas que quedan (4 − 1 = 3).',
    'Comprobad sumando: el resultado + el número de abajo = el de arriba.'],
  ej: '52 − 17: 2 − 7 no se puede → 12 − 7 = 5; quedan 4 decenas: 4 − 1 = 3 → 35. Comprobación: 35 + 17 = 52.',
  casa: 'Con monedas: tenéis 5 de 10 € y 2 de 1 €. Hay que pagar 17 €. Cambiad una moneda de 10 por diez de 1 para poder pagar los 7.',
  err: ['Restar al revés (7 − 2 = 5) para no pedir prestado.', 'Pedir la decena y olvidarse de quitarla de arriba.', 'Poner el número pequeño arriba.'],
  preg: ['En 43 − 18, ¿hace falta pedir una decena? ¿Por qué?', '¿Cómo compruebas que una resta está bien?'],
  voc: [['restar / resta', 'restar / resta'], ['demanar una desena', 'pedir una decena (llevarse)'], ['quedar', 'quedar']] },

m5: { idea: 'Que entienda que multiplicar es sumar grupos iguales, y que empiece a memorizar las tablas del 2, 3, 4, 5 y 10.',
  pasos: ['Haced grupos iguales con objetos: 3 platos con 4 galletas cada uno.',
    'Contad sumando: 4 + 4 + 4 = 12. Decid: «3 veces 4 son 12» y escribid 3 × 4 = 12.',
    'Enseñad que el orden no importa: 3 grupos de 4 = 4 grupos de 3.',
    'Las tablas con trucos: la del 2 es contar de 2 en 2 (dobles), la del 5 acaba en 0 o 5, la del 10 añade un 0.',
    'Repasad una tabla cada día, cantándola o saltando en la escalera.'],
  ej: '3 × 4 = 4 + 4 + 4 = 12. 5 × 2 = 10. 7 × 10 = 70.',
  casa: 'Contad cosas que vienen en grupos: ruedas de 3 coches (3 × 4), dedos de 2 manos (2 × 5), huevos de cajas.',
  err: ['Sumar los dos números (3 × 4 = 7).', 'Perder la cuenta al contar de 3 en 3 o de 4 en 4.'],
  preg: ['¿Cuánto es 4 grupos de 5? ¿Cómo lo sabes?', '¿5 × 3 es lo mismo que 3 × 5?', '¿Cuánto es 6 × 10?'],
  voc: [['multiplicar / multiplicació', 'multiplicar / multiplicación'], ['grups iguals', 'grupos iguales'], ['la taula del 2', 'la tabla del 2'], ['vegades', 'veces']] },

m6: { idea: 'Que sepa leer la hora en punto, y cuarto, y media y menos cuarto en el reloj de agujas y en el digital, que sepa cuántos minutos tiene una hora, media hora y un cuarto, y que lo diga en valenciano.',
  pasos: ['<b>Las dos agujas</b>: la corta (gruesa) marca las horas; la larga marca los minutos. Que las señale con el dedo.',
    '<b>En punto</b>: la larga mira al 12 → «les tres en punt». La corta dice qué hora es.',
    '<b>Y media</b>: la larga mira al 6 (ha dado media vuelta) → «les tres i mitja». La corta está entre el 3 y el 4.',
    '<b>Y cuarto</b>: la larga mira al 3 (un cuarto de vuelta) → «les tres i quart».',
    '<b>Menos cuarto</b>: la larga mira al 9. ¡Ojo! Se dice la hora <u>siguiente</u>: 3:45 → «les quatre menys quart», porque faltan 15 minutos para las cuatro.',
    '<b>Reloj digital</b>: el número antes de los dos puntos son las horas y el de después, los minutos. :00 en punto, :15 y cuarto, :30 y media, :45 menos cuarto (de la hora siguiente).',
    '<b>Minutos</b>: 1 hora = 60 minutos. Media hora = 30. Un cuarto de hora = 15. Tres cuartos = 45.'],
  ej: '11:00 «les onze en punt» · 11:15 «les onze i quart» · 11:30 «les onze i mitja» · 11:45 «les dotze menys quart» · 1:00 «la una en punt» (¡la una, en singular!).',
  casa: 'Usad el reloj de abajo: mueve la hora con los botones y preguntadle qué hora es. Después, durante el día, preguntad: «¿Qué hora es? ¿Y dentro de media hora?». Si tenéis un reloj de agujas en casa, mejor.',
  err: ['Confundir las agujas (lee la larga como horas).', 'Decir «les tres menys quart» para las 3:45 (es «les quatre menys quart»).', 'En el digital, leer 3:45 como «tres y cuarenta y cinco» y no saber que es menos cuarto.', 'Decir «les una» en lugar de «la una».', 'En y media, mirar dónde está la corta y decir la hora siguiente.'],
  preg: ['Si la aguja larga mira al 6, ¿qué es: en punto, y cuarto, y media o menos cuarto?', '¿Cómo se dice 7:45? ¿Por qué se dice «les huit»?', '¿Cuántos minutos tiene media hora? ¿Y un cuarto?', 'Si son las 5 en punto, ¿qué hora será dentro de media hora?'],
  voc: [['el rellotge', 'el reloj'], ['l\'agulla curta / llarga', 'la aguja corta / larga'], ['en punt', 'en punto'], ['i quart', 'y cuarto'], ['i mitja', 'y media'], ['menys quart', 'menos cuarto'], ['la una, les dues, les tres...', 'la una, las dos, las tres...'], ['huit', 'ocho'], ['el matí / el migdia / la vesprada / la nit', 'la mañana / el mediodía / la tarde / la noche'], ['minut / hora', 'minuto / hora']],
  extra: 'clock' },

m7: { idea: 'Que cuente dinero con monedas y billetes, empezando por lo que vale más, y que calcule la vuelta (el cambio).',
  pasos: ['Enseñad las monedas de 1 € y 2 € y los billetes de 5 € y 10 €.',
    'Para contar, ordenad de mayor a menor y sumad: 10 + 5 + 2 + 1 = 18 €.',
    'La vuelta: si algo cuesta 7 € y pago con 10 €, me devuelven 10 − 7 = 3 €.',
    'Truco para la vuelta: contar hacia arriba desde el precio: «7… 8, 9, 10: me devuelven 3».',
    'Cuando esté seguro, introducid los céntimos: 1 € = 100 céntimos.'],
  ej: 'Un billete de 5 €, una moneda de 2 € y una de 1 € son 8 €. Un libro de 6 € pagado con 10 € → vuelta de 4 €.',
  casa: 'Jugad a la tienda con precios en papelitos. Mejor aún: que pague él el pan y compruebe la vuelta.',
  err: ['Contar monedas sin mirar su valor (3 monedas = 3 €).', 'Restar al revés para la vuelta.'],
  preg: ['¿Cuánto dinero es un billete de 10 € y dos monedas de 2 €?', 'Si algo cuesta 4 € y pagas con 5 €, ¿cuánto te devuelven?'],
  voc: [['moneda / bitllet', 'moneda / billete'], ['cèntims', 'céntimos'], ['el canvi', 'la vuelta / el cambio'], ['costar / pagar', 'costar / pagar']] },

m8: { idea: 'Que reconozca los polígonos (figuras cerradas con lados rectos), cuente sus lados y vértices y los nombre: triángulo, cuadrilátero, pentágono y hexágono. Y que distinga figuras planas de cuerpos.',
  pasos: ['Recordad la línea poligonal cerrada (tema «Línies i rectes»): trozos rectos que acaban donde empiezan.',
    'Un <b>polígon</b> es esa línea cerrada más todo lo de dentro. Los <b>costats</b> son los trozos rectos y los <b>vèrtexs</b> son las puntas.',
    'Que pase el dedo por cada lado contándolos, y que toque cada punta contando vértices. Siempre salen los mismos.',
    'El nombre depende de los lados: 3 triángulo, 4 cuadrilátero (el cuadrado y el rectángulo son cuadriláteros), 5 pentágono, 6 hexágono.',
    'El círculo no es un polígono: no tiene lados rectos.',
    'Los cuerpos tienen volumen: cubo (dado), esfera (pelota), cilindro (lata), cono (cucurucho).'],
  ej: 'Un hexágono tiene 6 lados y 6 vértices. Un rectángulo es un cuadrilátero porque tiene 4 lados.',
  casa: 'Buscad figuras por casa: la puerta (rectángulo), una señal de tráfico (triángulo), una tuerca o las celdas de un panal (hexágono). Con palillos y plastilina, construid polígonos y contad vértices.',
  err: ['Pensar que el cuadrado no es un cuadrilátero.', 'Contar dos veces el mismo vértice.', 'Llamar polígono a una figura abierta o con curvas.'],
  preg: ['¿Cuántos vértices tiene un pentágono?', '¿El círculo es un polígono? ¿Por qué?', '¿Qué tienen en común el cuadrado y el rectángulo?'],
  voc: [['polígon', 'polígono'], ['costat', 'lado'], ['vèrtex', 'vértice'], ['quadrilàter', 'cuadrilátero'], ['pentàgon / hexàgon', 'pentágono / hexágono'], ['cercle', 'círculo']] },

m10: { idea: 'Que distinga los tipos de líneas (recta, poligonal, curva y mixta; abierta o cerrada) y sepa si dos rectas son paralelas o secantes.',
  pasos: ['<b>Recta</b>: va siempre en la misma dirección, sin girar. Usad una regla.',
    '<b>Poligonal</b>: hecha de trozos rectos, como un zigzag. <b>Curva</b>: no tiene ningún trozo recto, como una ola. <b>Mixta</b>: tiene trozos rectos y trozos curvos.',
    '<b>Abierta o cerrada</b>: que ponga el dedo al principio y siga la línea. Si vuelve al mismo sitio, es cerrada; si no, es abierta.',
    '<b>Secantes</b>: dos rectas que se cortan en un punto, como una X.',
    '<b>Paralelas</b>: dos rectas que nunca se cortan, aunque las alarguemos, como las vías del tren.'],
  ej: 'Un zigzag es una línea poligonal abierta. Un triángulo dibujado es una línea poligonal cerrada. Un círculo es una línea curva cerrada.',
  casa: 'Buscad líneas por la calle: las vías del tren y las rayas del paso de cebra son paralelas; dos calles que se cruzan son secantes. Que dibuje con el dedo en el aire cada tipo de línea.',
  err: ['Confundir curva cerrada con poligonal cerrada.', 'Pensar que dos rectas que no se tocan en el dibujo pero se cortarían al alargarlas son paralelas.'],
  preg: ['¿Por qué las vías del tren tienen que ser paralelas?', 'Dibuja una línea mixta abierta.', '¿Una letra O es una línea abierta o cerrada?'],
  voc: [['línia recta', 'línea recta'], ['línia poligonal', 'línea poligonal'], ['línia corba', 'línea curva'], ['línia mixta', 'línea mixta'], ['oberta / tancada', 'abierta / cerrada'], ['paral·leles / secants', 'paralelas / secantes'], ['es tallen', 'se cortan']] },

m9: { idea: 'Que lea un problema con calma, encuentre los datos y la pregunta y decida si hay que sumar, restar o multiplicar.',
  pasos: ['Leed el problema dos veces en voz alta, despacio.',
    'Subrayad los números (los datos) y la pregunta.',
    'Preguntad: «¿Al final habrá más o menos?». Si juntamos o nos dan, sumamos. Si perdemos, gastamos o se van, restamos. Si hay grupos iguales, multiplicamos.',
    'Que lo dibuje si le cuesta: unos palitos o círculos ayudan mucho.',
    'Resolved la operación y responded con una frase completa y la unidad: «Tiene 17 cromos».'],
  ej: '«Marta tiene 12 cromos y le dan 5». Le dan → hay más → suma: 12 + 5 = 17. «Marta tiene 17 cromos».',
  casa: 'Inventad problemas con cosas de casa: «En el frutero hay 8 naranjas y nos comemos 3, ¿cuántas quedan?». Después, que invente él uno para vosotros.',
  err: ['Operar con los números sin leer la pregunta.', 'Sumar siempre, aunque el problema sea de quitar.', 'Responder solo con el número, sin la unidad.'],
  preg: ['En este problema, ¿al final hay más o menos?', '¿Qué te pregunta el problema?', '¿Qué palabras te dicen que hay que restar?'],
  voc: [['problema / dades / pregunta', 'problema / datos / pregunta'], ['en total', 'en total'], ['quants en queden?', '¿cuántos quedan?'], ['regalar / gastar / perdre', 'regalar / gastar / perder']] },

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

/* ======================= CONEIXEMENT DEL MEDI ======================= */
c1: { idea: 'Que conozca las partes del cuerpo y sepa para qué sirven los huesos, los músculos y las articulaciones.',
  pasos: ['El cuerpo tiene tres partes: cap (cabeza), tronc (tronco) y extremitats (brazos y piernas).',
    'Los huesos sostienen el cuerpo; el cráneo protege el cerebro.',
    'Los músculos mueven los huesos: que note el bíceps al doblar el brazo.',
    'Las articulaciones permiten doblarnos: coll, colze, canell, genoll, turmell. Que las toque.'],
  ej: 'Para chutar un balón usamos los músculos de la pierna y doblamos el genoll (rodilla).',
  casa: 'Juego «Simón dice»: toca el colze, el turmell, el canell…',
  err: ['Confundir colze (codo) con genoll (rodilla) y canell (muñeca) con turmell (tobillo).'],
  preg: ['¿Para qué sirven los huesos?', '¿Dónde está el turmell?'],
  voc: [['cap / tronc / extremitats', 'cabeza / tronco / extremidades'], ['ossos / músculs', 'huesos / músculos'], ['coll', 'cuello'], ['colze', 'codo'], ['canell', 'muñeca'], ['genoll', 'rodilla'], ['turmell', 'tobillo'], ['crani', 'cráneo']] },

c2: { idea: 'Que conozca los cinco sentidos, el órgano de cada uno y cómo cuidarlos.',
  pasos: ['Vista con los ojos, oído con las orejas, olfato con la nariz, gusto con la lengua, tacto con la piel.',
    'Haced experimentos con los ojos cerrados: oler, tocar, probar.',
    'Cómo cuidarlos: no mirar el sol, no poner la música muy alta, lavarse bien.'],
  ej: 'Con los ojos cerrados, olemos una naranja (olfacte) y tocamos una esponja (tacte).',
  casa: 'Con los ojos tapados, adivinad alimentos por el olor y por el tacto.',
  err: ['Confundir olfacte (olfato) con gust (gusto).'],
  preg: ['¿Con qué sentido notas que algo quema?', '¿Cómo cuidamos los oídos?'],
  voc: [['vista / oïda / olfacte / gust / tacte', 'vista / oído / olfato / gusto / tacto'], ['ulls / orelles / nas / llengua / pell', 'ojos / orejas / nariz / lengua / piel']] },

c3: { idea: 'Que sepa qué es una alimentación sana y unos buenos hábitos de higiene, descanso y ejercicio.',
  pasos: ['Hay que comer de todo: fruita, verdura, llegums, peix, carn, llet i cereals.',
    'Los dulces y las chuches, solo de vez en cuando.',
    'Buenos hábitos: lavarse las manos, cepillarse los dientes después de comer, dormir unas 10 horas y hacer deporte.',
    'Cuando tenemos sed, bebemos agua.'],
  ej: 'Un buen almuerzo: un bocadillo y una pieza de fruta.',
  casa: 'Preparad juntos un almuerzo sano y clasificad los alimentos.',
  err: ['Pensar que el zumo envasado es igual que la fruta.'],
  preg: ['¿Qué alimentos debemos comer todos los días?', '¿Cuándo nos cepillamos los dientes?'],
  voc: [['fruita / verdura / llegums', 'fruta / verdura / legumbres'], ['peix / carn / llet', 'pescado / carne / leche'], ['llepolies', 'golosinas'], ['raspallar-se les dents', 'cepillarse los dientes']] },

c4: { idea: 'Que clasifique animales: vertebrados e invertebrados, cómo nacen y qué comen.',
  pasos: ['Vertebrados (tienen huesos): mamíferos (pelo), aves (plumas), peces (escamas), reptiles y anfibios.',
    'Invertebrados (sin huesos): caracol, hormiga, mariposa.',
    'Ovíparos nacen de un huevo (gallina). Vivíparos nacen de la barriga de la madre (perro).',
    'Herbívoros comen plantas, carnívoros comen carne, omnívoros comen de todo.'],
  ej: 'El gato: mamífero, vivíparo y carnívoro. La gallina: ave, ovípara y omnívora.',
  casa: 'Cuando veáis un animal, preguntad: ¿tiene pelo, plumas o escamas? ¿Qué come? ¿Nace de un huevo?',
  err: ['Pensar que el delfín o la ballena son peces (son mamíferos).'],
  preg: ['¿El caracol tiene huesos?', '¿Qué come un animal herbívoro?'],
  voc: [['vertebrats / invertebrats', 'vertebrados / invertebrados'], ['mamífers / aus / peixos', 'mamíferos / aves / peces'], ['ovípars / vivípars', 'ovíparos / vivíparos'], ['pèl / plomes / escates', 'pelo / plumas / escamas']] },

c5: { idea: 'Que conozca las partes de una planta y lo que necesita para vivir.',
  pasos: ['Partes: arrel (raíz), tija (tallo), fulles (hojas), flor y fruit (fruto).',
    'La raíz está bajo tierra y toma el agua; el tallo la sube hasta las hojas.',
    'Dentro del fruto están las semillas (llavors), que dan plantas nuevas.',
    'Las plantas necesitan agua, luz y aire.',
    'Tipos: árboles (tronco grueso), arbustos (como el romero) y hierbas.'],
  ej: 'En una naranja, las pepitas son las semillas.',
  casa: 'Plantad lentejas en algodón mojado y mirad cada día cómo crecen.',
  err: ['Confundir tija (tallo) con arrel (raíz).'],
  preg: ['¿Para qué sirve la raíz?', '¿Qué necesita una planta para vivir?'],
  voc: [['arrel / tija / fulles', 'raíz / tallo / hojas'], ['fruit / llavors', 'fruto / semillas'], ['arbre / arbust / herba', 'árbol / arbusto / hierba']] },

c6: { idea: 'Que conozca los estados del agua, el tiempo atmosférico y las estaciones.',
  pasos: ['El agua puede ser sólida (hielo), líquida (la del grifo) o gas (vapor).',
    'Experimento: hielo que se derrite; agua que hierve y hace vapor.',
    'La lluvia cae de las nubes.',
    'Estaciones: primavera, estiu, tardor, hivern.',
    'El termómetro mide la temperatura. Hay que ahorrar agua.'],
  ej: 'Un cubito de hielo (sòlid) se convierte en agua (líquid).',
  casa: 'Cada mañana, mirad el cielo y apuntad si hace sol, nubes, lluvia o viento.',
  err: ['Confundir tardor (otoño) con hivern (invierno).'],
  preg: ['¿Qué le pasa al hielo si lo dejas fuera de la nevera?', '¿En qué estación hace más calor?'],
  voc: [['sòlid / líquid / gas', 'sólido / líquido / gas'], ['gel / vapor', 'hielo / vapor'], ['primavera / estiu / tardor / hivern', 'primavera / verano / otoño / invierno'], ['núvol / pluja', 'nube / lluvia']] },

c7: { idea: 'Que distinga paisaje de costa y de montaña y conozca su Comunidad: provincias, capital, ríos y la Albufera.',
  pasos: ['Paisaje de costa: playa y mar. Paisaje de montaña: montañas, ríos y bosques.',
    'La Comunidad Valenciana tiene tres provincias: Castelló, València y Alacant. La capital es València.',
    'Nos baña el mar Mediterráneo. Ríos: Túria, Xúquer y Segura.',
    'L\'Albufera es un lago muy grande cerca de València.'],
  ej: 'Benicarló está en la provincia de Castelló, en la costa.',
  casa: 'Buscad en un mapa dónde vivís y qué río o montaña tenéis cerca.',
  err: ['Pensar que València es la única provincia.'],
  preg: ['¿Cuáles son las tres provincias?', '¿Qué mar baña nuestras costas?'],
  voc: [['paisatge de costa / muntanya', 'paisaje de costa / montaña'], ['província / capital', 'provincia / capital'], ['riu / llac', 'río / lago']] },

c8: { idea: 'Que conozca los oficios del pueblo, el ayuntamiento, los transportes y las normas básicas de seguridad vial.',
  pasos: ['En el pueblo hay muchas personas que trabajan para todos: médicas, panaderos, bomberos, maestros, carteros.',
    'El ayuntamiento cuida del pueblo; lo gobierna el alcalde o la alcaldesa.',
    'Transportes por tierra (coche, tren), por agua (barco) y por aire (avión).',
    'Cruzamos por el paso de peatones y con el semáforo de peatones en verde.'],
  ej: 'La bombera apaga fuegos; el cartero reparte cartas.',
  casa: 'Por la calle, hablad de los oficios que veis y de las señales de tráfico.',
  err: ['Cruzar mirando solo a un lado.'],
  preg: ['¿Quién gobierna el pueblo?', '¿Por dónde cruzamos la calle?'],
  voc: [['ofici', 'oficio'], ['ajuntament / alcalde', 'ayuntamiento / alcalde'], ['pas de vianants', 'paso de peatones'], ['semàfor', 'semáforo']] },

c9: { idea: 'Que sepa los días de la semana, los meses, use el calendario y entienda ayer, hoy, mañana y antes/ahora.',
  pasos: ['La semana tiene 7 días: dilluns, dimarts, dimecres, dijous, divendres, dissabte, diumenge.',
    'El año tiene 12 meses: gener, febrer, març, abril, maig, juny, juliol, agost, setembre, octubre, novembre, desembre.',
    'Ahir (ayer) ya ha pasado; hui (hoy); demà (mañana) vendrá.',
    'Antes se vivía distinto: lavar a mano, cartas, carros.'],
  ej: 'Si hui és dimarts, ahir va ser dilluns i demà serà dimecres.',
  casa: 'Marcad en el calendario los cumpleaños de la familia y contad cuántos días faltan.',
  err: ['Confundir dimarts (martes) con dimecres (miércoles).'],
  preg: ['¿Qué día va después del dijous?', '¿Cuántos meses tiene el año?'],
  voc: [['dilluns … diumenge', 'lunes … domingo'], ['gener … desembre', 'enero … diciembre'], ['ahir / hui / demà', 'ayer / hoy / mañana'], ['abans / ara', 'antes / ahora']] },

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
      <button class="btn btn-soft" data-gc="60">+ 1 hora</button><button class="btn btn-main" data-gc="rnd">Hora al azar</button>
    </div>
    <p class="gclock-tip">Truco: tapa la frase con la mano y pregúntale «Quina hora és?». Después destápala para comprobar.</p></div>`;
}
function paintClock(box) {
  const h = +box.dataset.h, m = +box.dataset.m, [ca, es] = frases(h, m);
  box.querySelector('.gclock-an').innerHTML = vClock(h, m);
  box.querySelector('.gclock-dg').innerHTML = vDigital(h, m);
  box.querySelector('.gclock-say').innerHTML = `<b>${ca.charAt(0).toUpperCase() + ca.slice(1)}</b><small>(en castellano: ${es})</small>`;
}
const quarts = `<div class="gtable"><table><thead><tr><th>Aguja larga</th><th>Digital</th><th>Se dice (valenciano)</th><th>Minutos</th></tr></thead><tbody>
  <tr><td>al 12</td><td>3:00</td><td>les tres <b>en punt</b></td><td>0</td></tr>
  <tr><td>al 3</td><td>3:15</td><td>les tres <b>i quart</b></td><td>15</td></tr>
  <tr><td>al 6</td><td>3:30</td><td>les tres <b>i mitja</b></td><td>30</td></tr>
  <tr><td>al 9</td><td>3:45</td><td>les <u>quatre</u> <b>menys quart</b></td><td>45</td></tr></tbody></table></div>
  <p class="gnote">Partes del día: <b>el matí</b> (la mañana), <b>el migdia</b> (el mediodía), <b>la vesprada</b> (la tarde) y <b>la nit</b> (la noche). Si en un reloj digital ve 13:00 o más, se resta 12: 15:30 son «les tres i mitja de la vesprada».</p>`;

/* ---------- vista ---------- */
const AREA_TXT = { mat: 'Matemàtiques', val: 'Valencià', med: 'Medi', cas: 'Castellano', eng: 'English' };
function card(id) {
  const t = SKILL[id], g = G[id]; if (!t || !g) return '';
  const li = a => (a || []).map(x => `<li>${x}</li>`).join('');
  return `<article class="gcard" style="${cvars(t.area)}" id="g-${id}">
    <header class="ghead"><img src="${t.img}" alt=""><div><div class="qtag"><i></i>${esc(AREA[t.area].name)}</div><h2>${esc(t.t)}</h2><p class="sub">${esc(t.s || '')}</p></div></header>
    <section class="gsec gidea"><h3>Qué tiene que aprender</h3><p>${g.idea}</p></section>
    <section class="gsec"><h3>Cómo explicarlo, paso a paso</h3><ol>${li(g.pasos)}</ol></section>
    ${g.extra === 'clock' ? `<section class="gsec"><h3>Reloj para explicar las horas</h3>${clockBox()}${quarts}</section>` : ''}
    ${t.demo ? `<section class="gsec"><h3>Cómo lo verá en la app</h3><div class="demo">${t.demo}</div></section>` : ''}
    <section class="gsec gex"><h3>Ejemplo</h3><p>${g.ej}</p></section>
    <section class="gsec"><h3>Para hacer en casa</h3><p>${g.casa}</p></section>
    <div class="gtwo">
      <section class="gsec gwarn"><h3>Errores típicos</h3><ul>${li(g.err)}</ul></section>
      <section class="gsec"><h3>Pregúntale para comprobar</h3><ul>${li(g.preg)}</ul></section>
    </div>
    ${g.voc ? `<section class="gsec"><h3>Vocabulario</h3><div class="gtable"><table><thead><tr><th>${t.area === 'eng' ? 'Inglés' : t.area === 'cas' ? 'Valenciano' : 'Valenciano (app)'}</th><th>Castellano</th></tr></thead><tbody>${g.voc.map(v => `<tr><td>${v[0]}</td><td>${v[1]}</td></tr>`).join('')}</tbody></table></div></section>` : ''}
  </article>`;
}

window.vGuia = function () {
  const id = V.guia, all = id === 'all';
  const ids = all ? AREAS.flatMap(a => a.topics.map(t => t.id)) : [id];
  const back = V.back || 'map';
  const area = all ? null : SKILL[id] && SKILL[id].area;
  return shell(back === 'adults' ? '' : 'map', `
  <div class="gtop noprint">
    <button class="btn btn-soft" data-gback="1">← Volver</button>
    ${!all && P().settings.free !== false ? `<button class="btn btn-main" data-practice="${id}">Ya lo hemos explicado: ¡a los ejercicios!</button>` : ''}
    <button class="btn btn-soft" data-gprint="1">Imprimir</button>
  </div>
  <header class="hello"><h1>${all ? 'Temario y guía para explicar' : 'Cómo explicarlo'}</h1>
    <p>${all ? 'Todas las asignaturas y todos los temas. Para cada tema: qué tiene que aprender, cómo explicarlo paso a paso, un ejemplo, una actividad para casa, los errores típicos y preguntas para comprobar.' : 'Guía para el adulto. Leedla antes de hacer los ejercicios.'} <small>(Las palabras que ve el niño en la app están en valenciano.)</small></p></header>
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
