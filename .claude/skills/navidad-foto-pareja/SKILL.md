---
name: navidad-foto-pareja
description: Genera prompts para Gemini que crean fotos navideñas ultrarrealistas de una pareja real en un anuncio de Navidad kitsch de los años 50, a partir de dos fotos de referencia (ella y él), con caras y pelo 100% idénticos. Elige al azar escena, pose, cámara, vestuario, luz, atrezo, paleta y más, sin repetir entre generaciones. Úsala cuando el usuario pida "navidad foto de pareja", una foto o postal navideña de pareja, un prompt navideño vintage o retro de los 50, o más variaciones de esa serie.
---

# Navidad foto de pareja: anuncio navideño años 50 para Gemini

Crea prompts listos para pegar en **Gemini** (generación de imágenes). El usuario adjunta dos fotos de referencia:

- **IMAGEN 1 = ella**
- **IMAGEN 2 = él**

El objetivo: una foto ultrarrealista de esa pareja exacta dentro de un anuncio navideño americano de los años 50, exagerado y con humor. **Cada prompt debe ser distinto al anterior.**

## Cómo generar

Ejecuta el script. Elige al azar una opción de cada categoría, respeta qué opciones encajan con cada escena y guarda un historial para no repetir:

```bash
python3 .claude/skills/navidad-foto-pareja/scripts/generar_prompt.py
```

Opciones útiles:

| Petición del usuario | Comando |
|---|---|
| Varias de golpe | `--n 3` |
| Peinado de los años 50 (el color de pelo se mantiene) | `--pelo epoca` (por defecto `identico`: mismo peinado que las fotos) |
| Fijar algo concreto | `--escena 6 --pose 4 --camara 2 --moda 3 --iluminacion 11 ...` |
| Ver qué opciones hay | `--listar escena` (también `pose`, `camara`, `moda`, `paleta`...) |
| Repetir exactamente un resultado | `--semilla 42 --sin-historial` |
| Empezar de cero | `--reset` |

Si el usuario describe algo con palabras ("en la cocina", "con abrigos", "desde arriba"), busca la id con `--listar` y fuérzala.

Categorías: prioridad creativa, escena, cámara, pose, vestuario, pelo ella, pelo él, maquillaje, accesorios, atrezo, iluminación, expresión, composición, paleta, acabado fotográfico, guiño kitsch y formato. Las opciones marcadas **EXTRA** son añadidos al prompt original: escenas nuevas (tocadiscos, árbol en el coche, jardín nevado, cena con pavo, escaparate, árbol de aluminio), poses nuevas, paletas de color, acabado de película, guiño kitsch (perro con astas, gato en un regalo…) y formato de imagen.

## Qué entregar al usuario

1. Un resumen corto en español de lo que salió (escena, pose, cámara, vestuario, luz).
2. **El prompt completo en inglés dentro de un bloque de código**, para copiarlo de una vez. Va en inglés porque Gemini sigue mejor las instrucciones de imagen en inglés.
3. Antes de entregarlo, léelo: si dos elecciones chocan (por ejemplo, composición "cuerpo entero" con cámara de retrato cerrado de 85mm), corrige la frase que choca dejando la prioridad creativa intacta. No cambies el bloque de IDENTIDAD.

Si no se puede ejecutar Python, monta el prompt a mano con `opciones.json` siguiendo la misma plantilla de `scripts/generar_prompt.py` (función `construir_prompt`). Nunca quites estos bloques: IDENTITY, REALISM, PERIOD ACCURACY, TASTE y OUTPUT con la marca de agua "Artificial Icon".

## Consejos para que las caras salgan idénticas en Gemini

Díselos al usuario la primera vez:

- **Fotos de referencia**: de frente o casi, bien iluminadas, nítidas, sin gafas de sol ni filtros, cara grande en el encuadre. Cuanta más resolución, mejor; con una foto diminuta (100×100 píxeles) Gemini no tiene detalle para copiar la cara.
- Sube **primero la foto de ella y después la de él**, en ese orden, en el mismo mensaje que el prompt.
- Si una cara sale cambiada, responde en el mismo chat: *"Keep everything the same but make the woman's face exactly identical to IMAGE 1"* (o *the man's face… IMAGE 2*). Retocar suele funcionar mejor que regenerar desde cero.
- Los planos muy lejanos (cenital, toda la estancia) dejan las caras pequeñas y son los que más fallan en parecido. Si el parecido es lo más importante, fuerza cámaras cercanas: `--camara 4`, `14`, `16` o `18`.
- Gemini añade su propia marca invisible (SynthID); el texto "Artificial Icon" va aparte, como firma visible.
