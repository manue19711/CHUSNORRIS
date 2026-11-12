---
name: disenar-web
description: "Orquestador de diseño web. Úsala SIEMPRE que se pida diseñar, crear, rediseñar, maquetar, mejorar o pulir una página web, landing page, web, sitio, portfolio, hero, one-pager, dashboard o pantalla de app web (también en inglés: design/build/redesign a website, landing page, web page). Carga y combina en orden todas las skills de diseño del proyecto (impeccable, design-taste-frontend, frontend-design, emil-design-eng, estilos, animación, móvil y revisión) para que trabajen a la vez."
user-invocable: true
argument-hint: "[qué página diseñar] [estilo opcional: premium | refined | minimal | clean]"
---

# Diseñar web: todas las skills de diseño a la vez

Esta skill no diseña por sí misma: **encadena las demás skills de diseño** del proyecto para que cualquier
petición de página web pase por todas ellas en el orden correcto. Sigue las fases en orden. En cada fase,
invoca las skills indicadas con la herramienta `Skill` (varias en el mismo mensaje cuando no dependan entre sí)
y aplica sus instrucciones juntas.

Cuando el usuario pase argumentos, reenvíalos como `args` a `impeccable` y úsalos como brief para el resto.

## Fase 1 · Dirección (siempre, antes de escribir código)

Invoca a la vez:

1. `impeccable`: es la skill principal. Marca el modo de la página (Persuade / Experience / Operate / Read),
   el flujo de trabajo y los comandos (`shape`, `critique`, `polish`...).
2. `design-taste-frontend`: dirección de arte, biblioteca de direcciones y estilo de la casa sin “AI slop”.
3. `frontend-design`: criterio estético y tipográfico complementario.
4. `refero:refero-design`, **solo si está disponible**. Necesita autorización del conector Refero; si
   falla, sigue sin ella y no insistas.

Si el usuario pide un estilo concreto, añade **solo una** de estas capas de estilo:

| Estilo pedido | Skill |
|---|---|
| premium, tipo Apple, lujoso | `premium` |
| elegante, serif, sofisticado | `refined` |
| minimalista, despojado | `minimal` |
| limpio, sencillo, claro | `clean` |

Si no pide estilo, no cargues ninguna: la dirección sale de la fase 1.

Antes de programar, deja escrita en 3 a 6 líneas la dirección elegida: idea, composición, tipografía, paleta,
imágenes y movimiento.

## Fase 2 · Construcción

Invoca a la vez:

- `emil-design-eng`: detalles invisibles, pulido de componentes y criterio sobre cuándo animar.
- `mobile-native`: que en el móvil parezca nativa (100vh, notch, hover pegajoso, zoom de inputs...).

Según el caso, añade también:

- `screenshot-to-code` si el usuario da una captura, un mockup o un Figma.
- `unsplash-image` si hacen falta fotos reales.
- `pick-ui-library` si hay que elegir librerías (gráficas, toasts, drag and drop, etc.).
- `ask-sonner` si la página usa toasts con Sonner.

## Fase 3 · Movimiento

Invoca `animate` y `animation-performance`. Añade también:

- `choreograph` si se mueven varios elementos a la vez (entradas del hero, listas escalonadas, cambios de vista).
- `gestures` y `apple-design` si hay arrastrar, deslizar, sheets o físicas de muelle.

Respeta lo que diga `emil-design-eng` y `impeccable` sobre no animar lo que no aporta.

## Fase 4 · Revisión y pulido (siempre, antes de dar el trabajo por terminado)

Invoca a la vez:

- `web-design-guidelines`: accesibilidad y buenas prácticas de interfaz.
- `break-ui`: prueba con datos extremos (nombres largos, vacíos, emojis, textos no latinos).
- `review-animations`: si la página tiene animaciones.

Después:

1. Renderiza la página y haz capturas a 390 px (móvil) y 1440 px (escritorio) con `playwright-cli`
   (o `agent-browser`). Revísalas con los ojos de `impeccable` y `design-taste-frontend`.
2. Corrige lo que salga y aplica el pase final de `impeccable` (`polish`).

## Solo si el usuario lo pide

- `prototype`: varias versiones distintas con selector para comparar.
- `find-animation-opportunities`, `improve-animations`, `remove-animations`: auditorías de movimiento.
- `learn-taste`: al final, ofrece guardar las correcciones del usuario como reglas en `DESIGN.md`.

## Si las skills se contradicen

Manda esta prioridad, de mayor a menor:

1. Lo que pida el usuario.
2. La capa de estilo elegida (`premium` / `refined` / `minimal` / `clean`), en paleta y tipografía.
3. `impeccable`.
4. `design-taste-frontend`.
5. `emil-design-eng` y las skills de animación, en todo lo relativo al movimiento.
6. `frontend-design` y el resto.

No digas al usuario la lista de skills cargadas salvo que pregunte. Entrega el resultado con una frase
sobre la dirección elegida y las capturas.
