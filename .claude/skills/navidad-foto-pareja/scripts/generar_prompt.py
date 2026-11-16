#!/usr/bin/env python3
"""Generador de prompts para Gemini: "Navidad foto de pareja" (anuncio navideño años 50).

Elige al azar una opción de cada categoría de opciones.json, respeta qué opciones
encajan con cada escena y evita repetir lo que salió en las generaciones anteriores.

Uso rápido:
  python3 generar_prompt.py                  # 1 prompt aleatorio
  python3 generar_prompt.py --n 3            # 3 prompts distintos entre sí
  python3 generar_prompt.py --escena 6 --pose 4
  python3 generar_prompt.py --pelo epoca     # peinados años 50 (mismo color de pelo)
  python3 generar_prompt.py --listar pose    # ver opciones de una categoría
  python3 generar_prompt.py --reset          # borrar historial
"""
import argparse
import json
import random
import sys
from pathlib import Path

BASE = Path(__file__).resolve().parent.parent
OPCIONES = BASE / "opciones.json"
HISTORIAL = BASE / ".historial.json"

# Cuántas generaciones anteriores se evitan por categoría (si quedan opciones).
MEMORIA = {"prioridad": 4, "escena": 5, "pose": 6, "camara": 4, "composicion": 3, "moda": 3}
MEMORIA_DEFECTO = 1

CATEGORIAS = [
    "prioridad", "escena", "camara", "pose", "moda", "pelo_ella", "pelo_el",
    "maquillaje", "accesorios", "atrezo", "iluminacion", "expresion",
    "composicion", "paleta", "acabado", "guino_kitsch", "formato",
]
MODA_EXTERIOR = [15, 17]


def cargar_json(ruta, defecto):
    try:
        return json.loads(ruta.read_text(encoding="utf-8"))
    except (FileNotFoundError, json.JSONDecodeError):
        return defecto


def encaja(opcion, escena_id):
    solo = opcion.get("solo_escenas")
    if solo and escena_id not in solo:
        return False
    return escena_id not in opcion.get("excluir_escenas", [])


def elegir(cat, opciones, historial, escena_id, forzado, ya_usados):
    lista = opciones[cat]
    if forzado is not None:
        for o in lista:
            if o["id"] == forzado:
                return o
        sys.exit(f"Error: {cat} no tiene la opción {forzado}. Usa --listar {cat}.")

    candidatos = [o for o in lista if escena_id is None or encaja(o, escena_id)]
    if cat == "moda" and escena_id in opciones["exteriores"]:
        candidatos = [o for o in candidatos if o["id"] in MODA_EXTERIOR]

    # Evitar lo reciente (historial + lo ya elegido en esta misma tanda).
    n = MEMORIA.get(cat, MEMORIA_DEFECTO)
    recientes = {g.get(cat) for g in historial[-n:]} | ya_usados.get(cat, set())
    frescos = [o for o in candidatos if o["id"] not in recientes]
    return random.choice(frescos or candidatos)


def generar(opciones, historial, forzados, ya_usados):
    sel = {}
    sel["escena"] = elegir("escena", opciones, historial, None, forzados.get("escena"), ya_usados)
    eid = sel["escena"]["id"]
    for cat in CATEGORIAS:
        if cat != "escena":
            sel[cat] = elegir(cat, opciones, historial, eid, forzados.get(cat), ya_usados)
    return sel


def construir_prompt(sel, pelo_modo):
    g = lambda c: sel[c]["en"]
    exterior = sel["escena"]["id"] in (16, 18, 19)

    if pelo_modo == "identico":
        pelo = (
            "Keep the woman's hairstyle EXACTLY as in IMAGE 1: same color, length, cut, "
            "texture, volume and parting, only neatly groomed. Keep the man's hair EXACTLY "
            "as in IMAGE 2: same color, length, cut, hairline and texture."
        )
    else:
        pelo = (
            f"Restyle the woman's hair as {g('pelo_ella')}, keeping her EXACT natural hair "
            f"color and texture from IMAGE 1. The man's hair: {g('pelo_el')}, keeping his "
            "EXACT natural hair color, hairline and texture from IMAGE 2."
        )

    guino = g("guino_kitsch")
    linea_guino = f"\nFUN DETAIL: {guino}.\n" if guino else ""

    return f"""Create ONE single ultra-photorealistic photograph using the two attached reference photos. IMAGE 1 is the woman. IMAGE 2 is the man.

IDENTITY — HIGHEST PRIORITY, DO NOT ALTER:
Both people must be 100% identical to their reference photos and instantly recognizable. Reproduce exactly: face shape, forehead, eyes (shape, color, spacing, eyelids), eyebrows, nose, lips, smile, teeth, jawline, chin, cheekbones, ears, skin tone, freckles, moles, scars and marks, apparent age and real body proportions. The man keeps his exact facial hair (or lack of it) from IMAGE 2. Do NOT beautify, idealize, de-age, slim, reshape or smooth either face. Do NOT blend features between them. No generic AI faces, no extra people, no duplicates. Faces clearly visible and in sharp focus, never hidden by props.

CONCEPT: An exaggerated, tongue-in-cheek 1950s American Christmas advertisement brought to life — glossy, idealized, kitschy holiday perfection, with a real couple who are clearly in love and having fun starring in the world's most perfect Christmas ad.

SCENE: {g('escena')}. Authentic 1950s architecture, furniture, appliances and decorations, richly and practically decorated.

ACTION: {g('pose')}. Genuine romantic chemistry, believable weight distribution and contact pressure, natural overlapping bodies.

CAMERA: {g('camara')}.
COMPOSITION: {g('composicion')}.

WARDROBE: {g('moda')}. Period-correct construction, realistic fabric weave, seams, drape and wrinkles.
HAIR: {pelo}
MAKEUP (woman): {g('maquillaje')}, applied on real textured skin without hiding her features.
ACCESSORIES: {g('accesorios')}.
KEY PROP: {g('atrezo')}, held or used with correct anatomy and believable weight.

LIGHTING: {g('iluminacion')}. Physically consistent shadows and reflections.
COLOR PALETTE: {g('paleta')}.
PHOTOGRAPHIC FINISH: {g('acabado')}.
MOOD & EXPRESSION: {g('expresion')}.
{linea_guino}
CREATIVE PRIORITY: {g('prioridad')} This is the most extraordinary element of the image; everything else supports it without competing.

REALISM: Indistinguishable from a real photograph of two real people on a physically built 1950s Christmas set. Visible skin pores, peach fuzz, individual eyelashes, natural smile lines and subtle imperfections. Anatomically correct hands with exactly five fingers each. Real lens behavior and depth of field. No CGI or plastic look, no airbrushing, no merged or extra limbs, no floating props, no fake vintage blur.

PERIOD ACCURACY (1950–1959): Incandescent bulbs only (no LED lights), no modern objects, logos, phones, sneakers or contemporary cuts{', snow and winter breath where appropriate' if exterior else ''}. The decorations may be exaggerated; the photographic physics must not be.

TASTE: Romantic and affectionate but fully non-explicit, appropriate garment coverage.

OUTPUT: A single unified photograph, {g('formato')} aspect ratio. No collage, no split screen, no borders, no text — except a small, elegant, discreet watermark reading exactly "Artificial Icon" in white bouncy script lettering at the bottom of the image, away from the faces."""


def resumen(sel, pelo_modo):
    nombres = {
        "prioridad": "Prioridad creativa", "escena": "Escena", "camara": "Cámara",
        "pose": "Pose", "moda": "Vestuario", "pelo_ella": "Pelo ella", "pelo_el": "Pelo él",
        "maquillaje": "Maquillaje", "accesorios": "Accesorios", "atrezo": "Atrezo",
        "iluminacion": "Iluminación", "expresion": "Expresión", "composicion": "Composición",
        "paleta": "Paleta", "acabado": "Acabado", "guino_kitsch": "Guiño kitsch",
        "formato": "Formato",
    }
    lineas = []
    for cat in CATEGORIAS:
        if pelo_modo == "identico" and cat in ("pelo_ella", "pelo_el"):
            if cat == "pelo_ella":
                lineas.append("- Pelo: idéntico a las fotos de referencia")
            continue
        o = sel[cat]
        lineas.append(f"- {nombres[cat]}: [{o['id']}] {o['es']}")
    return "\n".join(lineas)


def main():
    p = argparse.ArgumentParser(description="Prompt aleatorio 'Navidad foto de pareja' para Gemini")
    p.add_argument("--n", type=int, default=1, help="número de prompts distintos")
    p.add_argument("--pelo", choices=["identico", "epoca"], default="identico",
                   help="identico = mismo peinado que las fotos (por defecto); epoca = peinado años 50 con el mismo color")
    p.add_argument("--semilla", type=int, help="semilla para repetir un resultado")
    p.add_argument("--sin-historial", action="store_true", help="no leer ni guardar historial")
    p.add_argument("--reset", action="store_true", help="borrar historial y salir")
    p.add_argument("--listar", metavar="CATEGORIA", help="mostrar las opciones de una categoría")
    for cat in CATEGORIAS:
        p.add_argument(f"--{cat.replace('_', '-')}", type=int, dest=cat, metavar="ID",
                       help=f"forzar opción de {cat}")
    a = p.parse_args()

    opciones = cargar_json(OPCIONES, None)
    if opciones is None:
        sys.exit(f"No se pudo leer {OPCIONES}")

    if a.reset:
        HISTORIAL.unlink(missing_ok=True)
        print("Historial borrado.")
        return
    if a.listar:
        cat = a.listar.replace("-", "_")
        if cat not in opciones or cat.startswith("_") or cat == "exteriores":
            sys.exit(f"Categoría desconocida. Disponibles: {', '.join(CATEGORIAS)}")
        for o in opciones[cat]:
            extra = f"  (solo escenas {o['solo_escenas']})" if o.get("solo_escenas") else ""
            print(f"{o['id']:>3}. {o['es']}{extra}")
        return

    if a.semilla is not None:
        random.seed(a.semilla)

    historial = [] if a.sin_historial else cargar_json(HISTORIAL, [])
    forzados = {c: getattr(a, c) for c in CATEGORIAS if getattr(a, c) is not None}
    ya_usados = {}

    for i in range(max(1, a.n)):
        sel = generar(opciones, historial, forzados, ya_usados)
        for cat, o in sel.items():
            ya_usados.setdefault(cat, set()).add(o["id"])
        historial.append({cat: o["id"] for cat, o in sel.items()})

        titulo = f"PROMPT {i + 1} de {a.n}" if a.n > 1 else "PROMPT"
        print(f"===== {titulo} =====")
        print("Selección:")
        print(resumen(sel, a.pelo))
        print("\n----- Copia esto en Gemini (adjunta IMAGEN 1 = ella, IMAGEN 2 = él) -----\n")
        print(construir_prompt(sel, a.pelo))
        print()

    if not a.sin_historial:
        HISTORIAL.write_text(json.dumps(historial[-30:], ensure_ascii=False, indent=1), encoding="utf-8")


if __name__ == "__main__":
    main()
