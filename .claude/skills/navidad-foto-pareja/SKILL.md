---
name: navidad-foto-pareja
description: Genera prompts para Gemini que crean fotos navideñas ultrarrealistas de personas reales (1 persona o pareja) a partir de sus fotos de referencia, con caras y pelo 100% idénticos. Dos estilos - "vintage" (anuncio navideño kitsch de los años 50) y "actual" (foto lifestyle navideña natural con ropa de diario, 9:16, más de 200 actividades). Elige todo al azar sin repetir entre generaciones. Úsala cuando el usuario pida "navidad foto de pareja", una foto o postal navideña (de pareja o de una sola persona), un prompt navideño vintage, retro o actual, o diga "NEXT" / "otra" para la siguiente de la serie.
---

# Navidad foto de pareja: prompts navideños para Gemini

Crea prompts listos para pegar en **Gemini** (generación de imágenes) a partir de fotos de referencia reales. **Lo más importante es que las caras y el pelo salgan idénticos.** Después de eso, que cada foto sea completamente distinta a la anterior.

## Paso 1: preguntar SIEMPRE antes del primer prompt

Antes de generar el primer prompt de la conversación, pregunta con AskUserQuestion (las dos preguntas en una sola llamada):

1. **¿Cuántas personas?** Opciones:
   - "Pareja (2 personas)": ella = IMAGEN 1, él = IMAGEN 2
   - "Ella sola (1 persona)"
   - "Él solo (1 persona)"
2. **¿Qué estilo?** Opciones:
   - "Actual": foto natural del día a día navideño, ropa normal, 9:16
   - "Vintage años 50": anuncio navideño kitsch y exagerado
   - "Sorpresa": elige tú al azar

Si el usuario ya lo dijo en su mensaje ("solo yo", "estilo años 50"…), no lo vuelvas a preguntar. En los siguientes prompts de la misma conversación reutiliza la respuesta: si escribe **NEXT**, "otra" o "siguiente", genera otro al instante sin preguntar. Vuelve a preguntar solo si pide cambiar de personas o de estilo.

## Paso 2: generar

```bash
python3 .claude/skills/navidad-foto-pareja/scripts/generar_prompt.py --estilo actual --quien pareja
```

| Opción | Valores |
|---|---|
| `--estilo` | `actual` · `vintage` |
| `--quien` | `pareja` (2 personas) · `ella` · `el` (1 persona) |
| `--n 3` | varios prompts distintos de golpe |
| `--pelo` | `identico` (por defecto: mismo peinado que la foto) · `variado` (otro peinado con el mismo color y largo: casual en "actual", de los años 50 en "vintage") |
| `--sin-marca` | quita la marca de agua "Artificial Icon" (por defecto va puesta) |
| `--actividad galletas` | (actual) fuerza una actividad por texto o número |
| `--escena 6 --pose 4 --camara 2 ...` | (vintage) fuerza opciones concretas |
| `--listar actividades` / `--listar escena` | ver opciones (con el `--estilo` que toque) |
| `--reset` | borrar el historial antirrepetición |

El script guarda un historial por estilo. Nunca repite actividad, categoría de actividad, escena, pose, cámara ni lugar entre prompts seguidos.

### Estilo "actual" (lifestyle navideño)

- **205 actividades** en 11 categorías: repostería, decorar, compras, envolver, nieve, salidas y viajes, casa acogedora, caos divertido, tradiciones, magia extra y **EXTRA** (Belén, roscón, polvorones, carta a los Reyes, castañas, uvas…).
- Cada actividad lleva su tipo de lugar (cocina, casa, porche, tienda, mercadillo, nieve, pista de patinaje, colina, pueblo, coche, granja de árboles, cabaña, playa).
- El script elige al azar el lugar concreto, el clima (si es exterior), una hora y una luz coherentes entre sí, y ropa de diario según el contexto: abrigo en la nieve, pijama en casa, delantal en la cocina. Cada persona lleva un color distinto.
- También sortea la colocación o pose, la cámara, el ánimo, la expresión, el momento de la historia (justo antes de que algo salga mal, acaban de conseguirlo…), detalles navideños realistas y, a veces, un perro o un gato.
- **Sin más personas** que las de las fotos: ni dependientes, ni gente de fondo, ni reflejos.
- Formato fijo 9:16.

### Estilo "vintage" (anuncio de los años 50)

- **22 escenas.** Poses de pareja (38) o poses en solitario (24).
- Vestuario de época separado para ella y para él, peinados, maquillaje (solo si sale ella), accesorios, atrezo, luz, paleta, acabado, guiño kitsch y formato.
- Una **prioridad creativa** al azar: el elemento que debe destacar sobre todo lo demás.

## Paso 3: qué entregar

1. Un resumen corto en español de lo que salió.
2. **El prompt completo en inglés dentro de un bloque de código.** Va en inglés porque Gemini sigue mejor las instrucciones de imagen en inglés.
3. Una línea recordando qué fotos adjuntar: *IMAGEN 1 = ella, IMAGEN 2 = él*, o *IMAGEN 1 = tu foto*.

Antes de entregar, léelo. Si dos elecciones chocan (por ejemplo, cámara cenital con "caminando a mitad de paso", o un detalle que no pinta nada en ese lugar), corrige solo esa frase. **No toques nunca** los bloques IDENTITY, HAIR, CAST, REALISM ni OUTPUT.

Si el usuario pide algo que no está en la lista ("en un tren", "con mi perro"), genera el prompt con el script y cambia a mano la línea ACTIVITY, SCENE o ANIMAL. Si no se puede ejecutar Python, monta el prompt a mano con `opciones.json` u `opciones_actual.json` siguiendo las funciones `prompt_vintage` / `prompt_actual` del script.

## Consejos para que las caras salgan idénticas

Díselos al usuario la primera vez:

- **Fotos de referencia**: de frente o casi, bien iluminadas, nítidas, sin gafas de sol ni filtros, con la cara grande en el encuadre y buena resolución. Con una foto diminuta (por ejemplo 100×100 píxeles) Gemini no tiene detalle para copiar la cara.
- En pareja, sube **primero la foto de ella y después la de él**, en el mismo mensaje que el prompt.
- Si una cara sale cambiada, responde en el mismo chat de Gemini: *"Keep everything the same but make the woman's face exactly identical to IMAGE 1"* (o *the man's face… IMAGE 2*). Retocar suele funcionar mejor que regenerar desde cero.
- Los planos lejanos (cenital, plano general, teleobjetivo) dejan las caras pequeñas y son los que más fallan en parecido. Si el parecido es lo primordial, vuelve a generar o pide un plano más cercano.
- Para seguir la serie en Gemini, se puede pegar un prompt nuevo en el mismo chat con las mismas fotos.
