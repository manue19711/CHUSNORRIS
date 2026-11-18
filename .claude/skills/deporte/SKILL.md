---
name: deporte
description: Resumen deportivo del día en español. Úsala cuando el usuario pida "los resúmenes de hoy de los deportes", "resultados de hoy", "qué ha pasado en el deporte", "skill de deporte", "/deporte" o cualquier variante sobre resultados, partidos o noticias deportivas del día (fútbol, tenis, baloncesto, motor, ciclismo, béisbol, etc.).
---

# Deporte: resumen deportivo del día

Prepara un resumen claro y verificado de la actualidad deportiva del día de hoy (o de la fecha que pida el usuario), en español.

## 1. Fecha y alcance
- Usa la fecha actual del sistema salvo que el usuario indique otra.
- Si el usuario nombra un deporte, equipo o competición, céntrate en eso. Si no, cubre todo con prioridad para España.

## 2. Buscar (en paralelo, solo noticias del último día)
Lanza varias búsquedas a la vez con la herramienta de búsqueda web (filtro de últimas 24 h si existe):
- "resultados deportes hoy <fecha>"
- "resultados fútbol <fecha>" (LaLiga, Champions, Copa del Rey, selecciones, Champions femenina)
- "tenis resultados <fecha>" (ATP/WTA, especialmente jugadores españoles)
- "baloncesto resultados <fecha>" (ACB, Euroliga, NBA)
- "Fórmula 1 / MotoGP / ciclismo <fecha>" si hay competición activa
- Fuentes preferidas: Marca, AS, Mundo Deportivo, Sport, El País Deportes, Europa Press, ESPN, RTVE.

## 3. Verificar
- Abre (scrape) los 3-6 artículos más relevantes para confirmar marcadores y goleadores.
- Distingue siempre entre **resultado final**, **en juego** y **programado (sin resultado aún)**.
- No inventes marcadores. Si un dato no está confirmado, dilo.

## 4. Formato de salida
```
Resumen deportivo — <día de la semana, fecha>

### ⚽ Fútbol
- **Equipo A 2-1 Equipo B** — goleadores / dato clave / consecuencia (clasifica, eliminado…).

### 🎾 Tenis
### 🏀 Baloncesto
### 🏎️ Motor / 🚴 Ciclismo / ⚾ Otros  (solo si hay noticias)

### 📅 Hoy se juega (sin resultado todavía)
- Partido — competición — hora (hora peninsular española)
```
- Frases cortas, marcador en negrita, máximo 3-5 puntos por deporte.
- Omite secciones vacías.
- Termina ofreciendo: actualizar con los resultados finales más tarde, o centrarse en un equipo/deporte.

## 5. Opcional: página visual
Si el usuario pide una "web" o "página", publica el resumen como artifact HTML (cargando antes la skill `artifact-design`), con una tarjeta por deporte y el enlace al final.
