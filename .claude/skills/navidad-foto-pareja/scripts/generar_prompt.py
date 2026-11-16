#!/usr/bin/env python3
"""Generador de prompts navideños para Gemini, con caras idénticas a las fotos de referencia.

Dos estilos:
  vintage -> anuncio navideño kitsch de los años 50 (opciones.json)
  actual  -> foto lifestyle navideña natural, ropa de diario, 9:16 (opciones_actual.json)

Quién sale:
  pareja -> 2 personas (IMAGEN 1 = ella, IMAGEN 2 = él)
  ella   -> 1 mujer (IMAGEN 1)
  el     -> 1 hombre (IMAGEN 1)

Ejemplos:
  python3 generar_prompt.py --estilo actual --quien ella
  python3 generar_prompt.py --estilo vintage --quien pareja --n 3
  python3 generar_prompt.py --estilo vintage --escena 6 --pose 4
  python3 generar_prompt.py --estilo actual --actividad galletas
  python3 generar_prompt.py --listar escena          (vintage)
  python3 generar_prompt.py --estilo actual --listar actividades
  python3 generar_prompt.py --reset
"""
import argparse
import json
import random
import sys
import unicodedata
from pathlib import Path

BASE = Path(__file__).resolve().parent.parent
MARCA = ('a small, elegant, discreet watermark reading exactly "Artificial Icon" in white '
         'bouncy script lettering at the bottom of the image, away from the faces')


def cargar(ruta, defecto=None):
    try:
        return json.loads(Path(ruta).read_text(encoding="utf-8"))
    except (FileNotFoundError, json.JSONDecodeError):
        return defecto


def norm(t):
    t = unicodedata.normalize("NFD", t.lower())
    return "".join(c for c in t if unicodedata.category(c) != "Mn")


def fresco(candidatos, recientes, clave=lambda o: o):
    """Elige al azar evitando lo reciente; si no queda nada nuevo, cualquiera."""
    nuevos = [o for o in candidatos if clave(o) not in recientes]
    return random.choice(nuevos or candidatos)


def recientes(historial, cat, n):
    return {g.get(cat) for g in historial[-n:] if cat in g}


# --------------------------------------------------------------------------- #
#  Bloques comunes
# --------------------------------------------------------------------------- #
def bloque_identidad(quien, pelo, estilo, pelo_ella="", pelo_el=""):
    rasgos = ("face shape, forehead, eyes (shape, color, spacing, eyelids), eyebrows, nose, lips, "
              "smile, teeth, jawline, chin, cheekbones, ears, skin tone, ethnicity, freckles, moles, "
              "scars and marks, natural apparent age and real body proportions and build")
    if quien == "pareja":
        intro = ("Use the two attached reference photos. IMAGE 1 is PERSON 1 (the woman). "
                 "IMAGE 2 is PERSON 2 (the man).")
        sujeto = "Both people must be 100% identical to their reference photos and instantly recognizable."
        barba = "The man keeps his exact facial hair (or lack of it) from IMAGE 2."
        mezcla = "Do NOT blend or swap features or hairstyles between them; they must not share the same face."
    else:
        quien_txt = "a woman" if quien == "ella" else "a man"
        intro = f"Use the attached reference photo (IMAGE 1), which shows the person: {quien_txt}."
        sujeto = "The person must be 100% identical to the reference photo and instantly recognizable."
        barba = ("He keeps his exact facial hair (or lack of it) from IMAGE 1." if quien == "el" else "")
        mezcla = ""

    if pelo == "ella-epoca" and (estilo != "vintage" or quien == "el"):
        pelo = "identico"
    if pelo == "ella-epoca":
        p = (f"Restyle the woman's hair as {pelo_ella}, a 1950s hairstyle, keeping her EXACT natural hair "
             "color and texture from IMAGE 1.")
        if quien == "pareja":
            p += (" Keep the man's hair EXACTLY as in IMAGE 2: same color, length, cut, texture, parting "
                  "and hairline, only neatly groomed.")
    elif pelo == "identico":
        if quien == "pareja":
            p = ("Keep each person's hairstyle EXACTLY as in their reference photo: same color, length, "
                 "cut, texture, volume, parting and hairline, only neatly groomed.")
        else:
            p = ("Keep the hairstyle EXACTLY as in IMAGE 1: same color, length, cut, texture, volume, "
                 "parting and hairline, only neatly groomed.")
    elif estilo == "vintage":
        partes = []
        if quien in ("pareja", "ella"):
            ref = "IMAGE 1"
            partes.append(f"Restyle the woman's hair as {pelo_ella}, keeping her EXACT natural hair color and texture from {ref}.")
        if quien in ("pareja", "el"):
            ref = "IMAGE 2" if quien == "pareja" else "IMAGE 1"
            partes.append(f"The man's hair: {pelo_el}, keeping his EXACT natural hair color, hairline and texture from {ref}.")
        p = " ".join(partes)
    else:
        p = ("Hair may be casually styled for the activity (loose, ponytail, messy bun, braid, under a "
             "beanie) but must keep the EXACT natural color, length, texture and recognizable look from the reference.")

    lineas = [
        intro, "",
        "IDENTITY — HIGHEST PRIORITY, OVERRIDES EVERY CREATIVE CHOICE:",
        f"{sujeto} Reproduce exactly: {rasgos}. {barba} Do NOT beautify, idealize, de-age, slim, "
        f"reshape or smooth any face. Do NOT change ethnicity. {mezcla} No generic AI faces. "
        "Faces clearly visible, recognizable and in sharp focus, never hidden by props.",
        f"HAIR: {p}",
    ]
    return "\n".join(l for l in lineas if l is not None).replace("  ", " ")


def bloque_reparto(quien):
    n = "exactly TWO people (PERSON 1 and PERSON 2), each appearing exactly once" if quien == "pareja" \
        else "exactly ONE person, appearing once"
    return (f"CAST: The image contains {n}. ABSOLUTELY NO OTHER HUMANS: no strangers, shoppers, staff, "
            "crowds, children, Santa actors or elves played by people, background silhouettes, and no faces "
            "in windows, mirrors, photos, screens or reflections. No duplicates. Public places are shown "
            "naturally empty (a quiet moment, early before opening). Animals are allowed.")


# Formas de poner el texto que pida el usuario (felicitación, nombre, fecha...).
# (es, en, contextos donde encaja, estilos)
FORMAS_TEXTO = [
    ("Rótulo superpuesto arriba, letra caligráfica", "as elegant festive script lettering overlaid across the top area of the photo, like a Christmas card caption", "todos", "ambos"),
    ("Rótulo superpuesto abajo, letra caligráfica", "as elegant festive script lettering overlaid across the bottom area of the photo, like a Christmas card caption", "todos", "ambos"),
    ("Titular de anuncio años 50", "as a bold retro 1950s advertisement headline in vintage hand-drawn typography at the top of the image", "todos", "vintage"),
    ("Escrito en una pizarra de la escena", "hand-written in chalk on a small chalkboard sign that is part of the scene", "interior", "ambos"),
    ("Formado con luces navideñas", "spelled out in glowing warm string lights hung in the scene", "todos", "ambos"),
    ("En una pancarta en la guirnalda", "on a hand-lettered festive banner hanging from a garland in the scene", "interior", "ambos"),
    ("Escrito en la nieve", "written in the snow in the foreground, as if traced with a finger or stick", "exterior", "ambos"),
    ("Escrito en el vaho de una ventana", "traced by hand in the frost on a window pane in the scene", "interior", "ambos"),
    ("Escrito con glaseado en una galleta o tarta", "piped in icing on a large cookie or cake in the scene", "cocina", "ambos"),
    ("En una etiqueta de regalo grande", "hand-written on a large kraft-paper gift tag tied to a present in the scene", "interior", "ambos"),
]


def elegir_forma_texto(estilo, contexto, forzada=None):
    if forzada:
        return FORMAS_TEXTO[forzada - 1]
    ok = [f for f in FORMAS_TEXTO if f[3] in ("ambos", estilo)
          and (f[2] == "todos" or f[2] == contexto or (f[2] == "interior" and contexto == "cocina"))]
    return random.choice(ok)


def bloque_salida(formato, marca, texto_usuario=None, forma=None):
    base = f"OUTPUT: One single unified photograph, {formato} aspect ratio. No collage, no split screen, no panels, no borders"
    if texto_usuario:
        linea = (f". TEXT: include ONLY this exact text, spelled exactly as written, letter by letter, with its "
                 f"accents: \"{texto_usuario}\" — {forma[1]}. Crisp, legible and beautifully integrated, never "
                 "covering the faces. No other text, captions, logos or watermarks")
        if marca:
            linea += f", except {MARCA}"
        return base + linea + "."
    if marca:
        return base + f", no text — except {MARCA}."
    return base + ". ABSOLUTELY NO text, captions, signatures, logos or watermarks anywhere in the image."


REALISMO = ("REALISM: Indistinguishable from a real photograph. Visible skin pores, peach fuzz, individual "
            "eyelashes, natural smile lines and subtle imperfections. Anatomically correct hands with exactly "
            "five fingers each, no extra limbs. Realistic fabric weave, seams and wrinkles. Physically consistent "
            "shadows and reflections, real lens behavior and depth of field. No CGI or plastic look, no "
            "airbrushing or beauty filter, no cartoon or illustration effects, no floating objects.")


# --------------------------------------------------------------------------- #
#  Estilo VINTAGE (años 50)
# --------------------------------------------------------------------------- #
CAT_VINTAGE = ["prioridad", "escena", "camara", "pose", "moda", "pelo_ella", "pelo_el",
               "maquillaje", "accesorios", "atrezo", "iluminacion", "expresion",
               "composicion", "paleta", "acabado", "guino_kitsch", "formato"]
MEM_V = {"prioridad": 4, "escena": 5, "pose": 6, "camara": 4, "composicion": 3, "moda": 3}
MODA_EXTERIOR = [15, 17]


def encaja(o, eid, quien):
    if o.get("solo_escenas") and eid not in o["solo_escenas"]:
        return False
    if eid in o.get("excluir_escenas", []):
        return False
    if quien != "pareja" and o.get("solo_pareja"):
        return False
    if quien == "pareja" and o.get("solo_individual"):
        return False
    if "para" in o and quien != "pareja" and o["para"] not in ("ambos", quien):
        return False
    return True


def generar_vintage(d, hist, forz, usados, quien):
    sel = {}

    def elegir(cat, banco=None, eid=None):
        lista = d[banco or cat]
        if cat in forz:
            for o in lista:
                if o["id"] == forz[cat]:
                    return o
            sys.exit(f"Error: {cat} no tiene la opción {forz[cat]}. Usa --listar {banco or cat}.")
        cand = [o for o in lista if eid is None or encaja(o, eid, quien)]
        if cat == "moda" and eid in d["exteriores"]:
            cand = [o for o in cand if o["id"] in MODA_EXTERIOR]
        rec = recientes(hist, cat, MEM_V.get(cat, 1)) | usados.get(cat, set())
        return fresco(cand, rec, lambda o: o["id"])

    sel["escena"] = elegir("escena")
    eid = sel["escena"]["id"]
    for cat in CAT_VINTAGE:
        if cat == "escena":
            continue
        if cat == "pose":
            sel[cat] = elegir(cat, "pose" if quien == "pareja" else "pose_solo", eid)
        else:
            sel[cat] = elegir(cat, None, eid)
    return sel


def prompt_vintage(sel, quien, pelo, marca, texto=None, forma=None):
    g = lambda c: sel[c]["en"]
    exterior = sel["escena"]["id"] in (16, 18, 19)

    if quien == "pareja":
        concepto = ("with a real couple who are clearly in love and having fun starring in the world's most "
                    "perfect Christmas ad")
        accion = (f"{g('pose')}. Genuine romantic chemistry, believable weight distribution and contact "
                  "pressure, natural overlapping bodies.")
        ropa = g("moda")
        taste = "Romantic and affectionate but fully non-explicit, appropriate garment coverage."
    else:
        pron = "she" if quien == "ella" else "he"
        concepto = (f"starring this one real person, who knows {pron} is the star of the world's most perfect "
                    "Christmas ad and is having fun with it")
        accion = f"The person {g('pose')}. Believable weight, balance and anatomy, full of charm and personality."
        ropa = ("She wears " if quien == "ella" else "He wears ") + sel["moda"][quien]
        taste = "Charming and tasteful, fully non-explicit, appropriate garment coverage."

    partes = [
        "Create ONE single ultra-photorealistic photograph.",
        bloque_identidad(quien, pelo, "vintage", g("pelo_ella"), g("pelo_el")),
        "",
        bloque_reparto(quien),
        "",
        "CONCEPT: An exaggerated, tongue-in-cheek 1950s American Christmas advertisement brought to life — "
        f"glossy, idealized, kitschy holiday perfection, {concepto}.",
        "",
        f"SCENE: {g('escena')}. Authentic 1950s architecture, furniture, appliances and decorations, richly and practically decorated.",
        "",
        f"ACTION: {accion}",
        "",
        f"CAMERA: {g('camara')}.",
        f"COMPOSITION: {g('composicion')}.",
        "",
        f"WARDROBE: {ropa}. Period-correct construction, realistic fabric weave, seams, drape and wrinkles.",
    ]
    if quien != "el":
        partes.append(f"MAKEUP (woman): {g('maquillaje')}, applied on real textured skin without hiding her features.")
    partes += [
        f"ACCESSORIES: {g('accesorios')}.",
        f"KEY PROP: {g('atrezo')}, held or used with correct anatomy and believable weight.",
        "",
        f"LIGHTING: {g('iluminacion')}. Physically consistent shadows and reflections.",
        f"COLOR PALETTE: {g('paleta')}.",
        f"PHOTOGRAPHIC FINISH: {g('acabado')}.",
        f"MOOD & EXPRESSION: {g('expresion')}.",
    ]
    if g("guino_kitsch"):
        partes.append(f"FUN DETAIL: {g('guino_kitsch')}.")
    partes += [
        "",
        f"CREATIVE PRIORITY: {g('prioridad')} This is the most extraordinary element of the image; everything else supports it without competing.",
        "",
        REALISMO,
        "",
        "PERIOD ACCURACY (1950–1959): Incandescent bulbs only (no LED lights), no modern objects, logos, "
        f"phones, sneakers or contemporary cuts{', snow and visible winter breath where appropriate' if exterior else ''}. "
        "The decorations may be exaggerated; the photographic physics must not be.",
        "",
        f"TASTE: {taste}",
        "",
        bloque_salida(g("formato"), marca, texto, forma),
    ]
    return "\n".join(partes)


def resumen_vintage(sel, quien, pelo):
    nombres = {"prioridad": "Prioridad creativa", "escena": "Escena", "camara": "Cámara", "pose": "Pose",
               "moda": "Vestuario", "pelo_ella": "Pelo ella", "pelo_el": "Pelo él", "maquillaje": "Maquillaje",
               "accesorios": "Accesorios", "atrezo": "Atrezo", "iluminacion": "Iluminación",
               "expresion": "Expresión", "composicion": "Composición", "paleta": "Paleta",
               "acabado": "Acabado", "guino_kitsch": "Guiño kitsch", "formato": "Formato"}
    out = []
    if pelo == "ella-epoca" and quien == "el":
        pelo = "identico"
    for cat in CAT_VINTAGE:
        if pelo == "ella-epoca" and cat == "pelo_el" and quien == "pareja":
            out.append("- Pelo él: idéntico a su foto")
            continue
        if pelo == "ella-epoca" and cat in ("pelo_el", "pelo_ella") and cat == "pelo_el":
            continue
        if pelo == "ella-epoca" and cat == "pelo_ella":
            out.append(f"- Pelo ella: años 50 · [{sel[cat]['id']}] {sel[cat]['es']} (mismo color)")
            continue
        if cat == "pelo_ella" and pelo == "identico":
            out.append("- Pelo: idéntico a las fotos de referencia")
        if cat in ("pelo_ella", "pelo_el") and pelo == "identico":
            continue
        if (cat == "pelo_ella" and quien == "el") or (cat == "pelo_el" and quien == "ella"):
            continue
        if cat == "maquillaje" and quien == "el":
            continue
        o = sel[cat]
        out.append(f"- {nombres[cat]}: [{o['id']}] {o['es']}")
    return "\n".join(out)


# --------------------------------------------------------------------------- #
#  Estilo ACTUAL (lifestyle)
# --------------------------------------------------------------------------- #
def contexto_ropa(grupo, cat, clima):
    if grupo in ("casa", "cocina"):
        ctx = {"casa"}
        if grupo == "cocina":
            ctx.add("cocina")
        if grupo == "casa" and cat in "DGHIJ":
            ctx.add("casa_pijama")
        return ctx
    if grupo == "playa" or (clima and "warm" in clima):
        return {"calor"}
    if grupo in ("nieve", "patinaje", "colina"):
        return {"frio", "nieve"}
    if grupo == "tienda":
        return {"cualquiera", "frio"}
    if clima and ("snow" in clima or "frost" in clima):
        return {"frio"}
    return {"frio", "cualquiera"}


def generar_actual(d, hist, usados, quien, forz_act):
    npers = 2 if quien == "pareja" else 1
    acts = [(i, a) for i, a in enumerate(d["actividades"]) if len(a) < 5 or int(a[4]) <= npers]

    if forz_act:
        q = norm(forz_act)
        coinc = [(i, a) for i, a in acts if q in norm(a[2]) or q in norm(a[3]) or q == str(i + 1)]
        if not coinc:
            sys.exit(f"No hay actividad que coincida con '{forz_act}'. Usa --listar actividades.")
        idx, act = random.choice(coinc)
    else:
        cats_rec = recientes(hist, "categoria", 2)
        acts_rec = {g.get("actividad") for g in hist[-60:]} | usados.get("actividad", set())
        cand = [(i, a) for i, a in acts if a[0] not in cats_rec and i not in acts_rec]
        cand = cand or [(i, a) for i, a in acts if i not in acts_rec] or acts
        idx, act = random.choice(cand)

    cat, grupo = act[0], act[1]
    sel = {"actividad": idx, "categoria": cat, "_act": act}

    lugares = d["lugares"][grupo]
    lug = fresco(lugares, recientes(hist, "lugar", 3) | usados.get("lugar", set()), lambda o: o[1])
    sel["lugar"], sel["_lug"] = lug[1], lug

    clima = None
    if grupo in d["exteriores"]:
        cand = [c for c in d["clima"] if grupo in c["grupos"]]
        clima = fresco(cand, recientes(hist, "clima", 1), lambda o: o["en"])
        sel["clima"], sel["_clima"] = clima["en"], clima

    hora = fresco(d["hora"], recientes(hist, "hora", 2), lambda o: o["en"])
    luces = [l for l in d["luz"] if ("t" not in l or l["t"] == hora["t"])
             and ("grupos" not in l or grupo in l["grupos"])]
    if not luces:  # garantizar coherencia hora/luz
        luces = [l for l in d["luz"] if "grupos" not in l or grupo in l["grupos"]]
    luz = fresco(luces, recientes(hist, "luz", 2), lambda o: o["en"])
    sel.update(hora=hora["en"], luz=luz["en"], _hora=hora, _luz=luz)

    ctx = contexto_ropa(grupo, cat, clima["en"] if clima else None)
    personas = ["ella", "el"] if quien == "pareja" else [quien]
    rec_ropa = recientes(hist, "ropa0", 2) | recientes(hist, "ropa1", 2)
    rec_col = recientes(hist, "color0", 2) | recientes(hist, "color1", 2)
    ropas, colores = [], []
    for k, p in enumerate(personas):
        cand = [r for r in d["ropa"] if set(r["ctx"]) & ctx and r.get("para", p) == p
                and r["en"] not in [x["en"] for x in ropas]]
        if not cand:
            cand = [r for r in d["ropa"] if r.get("para", p) == p]
        r = fresco(cand, rec_ropa, lambda o: o["en"])
        c = fresco([c for c in d["color_ropa"] if c not in colores], rec_col, lambda o: o[1])
        ropas.append(r)
        colores.append(c)
        sel[f"ropa{k}"], sel[f"color{k}"] = r["en"], c[1]
    sel["_ropas"], sel["_colores"] = ropas, colores

    for cat_b, n in (("camara", 4), ("animo", 3), ("emocion", 3), ("giro", 2)):
        o = fresco(d[cat_b], recientes(hist, cat_b, n) | usados.get(cat_b, set()), lambda o: o[1])
        sel[cat_b], sel["_" + cat_b] = o[1], o
    banco = "colocacion_pareja" if quien == "pareja" else "colocacion_solo"
    o = fresco(d[banco], recientes(hist, "colocacion", 3), lambda o: o[1])
    sel["colocacion"], sel["_colocacion"] = o[1], o
    dets = [x for x in d["detalles"] if len(x) < 3 or grupo in x[2]]
    sel["_detalles"] = random.sample(dets, min(3, len(dets)))
    sel["_animal"] = random.choice(d["animal"])
    return sel


def prompt_actual(sel, quien, pelo, marca, texto=None, forma=None):
    act = sel["_act"]
    exterior = "_clima" in sel
    if quien == "pareja":
        ropa = (f"PERSON 1 (woman) wears {sel['_ropas'][0]['en']}, mainly in {sel['_colores'][0][1]}. "
                f"PERSON 2 (man) wears {sel['_ropas'][1]['en']}, mainly in {sel['_colores'][1][1]}. "
                "Distinct outfits, naturally coordinated, not matching.")
        relacion = "They are a real couple: natural familiarity and affection where it fits the moment."
    else:
        ropa = f"The person wears {sel['_ropas'][0]['en']}, mainly in {sel['_colores'][0][1]}."
        relacion = ""
    detalles = ", ".join(x[1] for x in sel["_detalles"])
    animal = sel["_animal"][1]

    partes = [
        "Create ONE ultra-photorealistic, vertical 9:16 Christmas lifestyle photograph: a spontaneous, "
        "candid moment from the Christmas season, like a real memory caught on camera. NOT a formal "
        "portrait: nobody stands still beside a tree holding a mug and smiling at the camera.",
        bloque_identidad(quien, pelo, "actual"),
        "",
        bloque_reparto(quien),
        "",
        f"ACTIVITY: {act[3]}. The activity must be visually obvious through genuine hand and body interaction.",
        f"STORY BEAT: {sel['giro']}.",
        f"LOCATION: {sel['lugar']}" + (f", {sel['clima']}." if exterior else "."),
        f"TIME & LIGHT: {sel['hora']}, {sel['luz']}.",
        "",
        f"WARDROBE: {ropa} Realistic, wearable everyday clothing that suits the activity and weather — no "
        "gowns, lingerie, costumes or excessive glamour.",
        "",
        f"POSE & ARRANGEMENT: {sel['colocacion']}. Natural movement or a believable candid pause, everyone "
        f"engaged in the activity. {relacion}".strip(),
        f"CAMERA: {sel['camara']}. Subjects not simply centered.",
        f"MOOD: {sel['animo']}. EXPRESSION: {sel['emocion']} — natural, never forced; not everyone needs to smile.",
        "",
        f"CHRISTMAS DETAILS: realistic, used-looking quantities that support the activity, such as {detalles}. "
        "Do not stuff every Christmas object into the scene; objects correctly sized and physically plausible.",
    ]
    if animal:
        partes.append(f"ANIMAL: {animal}.")
    partes += ["", REALISMO, "", bloque_salida("9:16 vertical", marca, texto, forma)]
    return "\n".join(partes)


def resumen_actual(sel, d, quien, pelo):
    act = sel["_act"]
    out = [
        f"- Actividad: {act[2]}  ({d['categorias'][act[0]]})",
        f"- Lugar: {sel['_lug'][0]}" + (f" · {sel['_clima']['es']}" if "_clima" in sel else ""),
        f"- Hora y luz: {sel['_hora']['es']} · {sel['_luz']['es']}",
    ]
    if quien == "pareja":
        out.append(f"- Ropa ella: {sel['_ropas'][0]['es']} ({sel['_colores'][0][0]})")
        out.append(f"- Ropa él: {sel['_ropas'][1]['es']} ({sel['_colores'][1][0]})")
    else:
        out.append(f"- Ropa: {sel['_ropas'][0]['es']} ({sel['_colores'][0][0]})")
    out += [
        f"- Pose/colocación: {sel['_colocacion'][0]}",
        f"- Cámara: {sel['_camara'][0]}",
        f"- Momento: {sel['_giro'][0]}",
        f"- Ánimo y expresión: {sel['_animo'][0]} · {sel['_emocion'][0]}",
        f"- Pelo: {'idéntico a las fotos' if pelo == 'identico' else 'peinado casual, mismo color y largo'}",
    ]
    if sel["_animal"][1]:
        out.append(f"- Animal: {sel['_animal'][0]}")
    out.append("- Formato: 9:16 vertical")
    return "\n".join(out)


# --------------------------------------------------------------------------- #
def main():
    p = argparse.ArgumentParser(description="Prompts navideños para Gemini (vintage años 50 o actual)")
    p.add_argument("--estilo", choices=["vintage", "actual"], default="vintage")
    p.add_argument("--quien", choices=["pareja", "ella", "el"], default="pareja",
                   help="pareja = 2 personas; ella / el = 1 persona")
    p.add_argument("--n", type=int, default=1, help="número de prompts distintos")
    p.add_argument("--pelo", choices=["identico", "variado", "epoca", "ella-epoca"], default="identico",
                   help="identico = mismo peinado que las fotos (por defecto); variado/epoca = otro peinado, mismo color")
    p.add_argument("--con-marca", action="store_true", help="añadir la marca de agua 'Artificial Icon' (por defecto no va)")
    p.add_argument("--texto", help='texto a escribir en la foto, p. ej. "Feliz Navidad 2026"')
    p.add_argument("--forma-texto", type=int, metavar="N",
                   help="cómo poner el texto (1-%d); sin indicar, al azar. --listar formas-texto" % len(FORMAS_TEXTO))
    p.add_argument("--semilla", type=int)
    p.add_argument("--sin-historial", action="store_true")
    p.add_argument("--reset", action="store_true", help="borrar historiales y salir")
    p.add_argument("--listar", metavar="CATEGORIA")
    p.add_argument("--actividad", help="(actual) texto o número de la actividad a forzar")
    for cat in CAT_VINTAGE:
        p.add_argument(f"--{cat.replace('_', '-')}", type=int, dest=cat, metavar="ID",
                       help=f"(vintage) forzar opción de {cat}")
    a = p.parse_args()
    pelo = "variado" if a.pelo == "epoca" else a.pelo
    if a.estilo == "actual" and pelo == "ella-epoca":
        pelo = "identico"

    if a.reset:
        for f in BASE.glob(".historial*.json"):
            f.unlink()
        print("Historiales borrados.")
        return

    if a.listar and a.listar.replace("_", "-") == "formas-texto":
        for i, f in enumerate(FORMAS_TEXTO, 1):
            print(f"{i:>3}. {f[0]}  (encaja en: {f[2]}; estilo: {f[3]})")
        return

    fichero = "opciones.json" if a.estilo == "vintage" else "opciones_actual.json"
    d = cargar(BASE / fichero)
    if d is None:
        sys.exit(f"No se pudo leer {fichero}")

    if a.listar:
        cat = a.listar.replace("-", "_")
        if a.estilo == "actual":
            if cat.startswith("activ"):
                for i, x in enumerate(d["actividades"], 1):
                    print(f"{i:>3}. [{x[0]}] {x[2]}")
            elif cat in d and isinstance(d[cat], list):
                for x in d[cat]:
                    print(f" - {x['es'] if isinstance(x, dict) else x[0]}")
            else:
                sys.exit("Categorías (actual): actividades, camara, animo, emocion, ropa, color_ropa, giro, clima, hora, luz")
            return
        if cat not in d or not isinstance(d[cat], list):
            sys.exit(f"Categorías (vintage): {', '.join(CAT_VINTAGE)}, pose_solo")
        for o in d[cat]:
            extra = f"  (solo escenas {o['solo_escenas']})" if o.get("solo_escenas") else ""
            print(f"{o['id']:>3}. {o['es']}{extra}")
        return

    if a.semilla is not None:
        random.seed(a.semilla)

    hist_file = BASE / f".historial_{a.estilo}.json"
    hist = [] if a.sin_historial else cargar(hist_file, [])
    usados = {}
    imgs = "IMAGEN 1 = ella, IMAGEN 2 = él" if a.quien == "pareja" else "IMAGEN 1 = la persona"

    for i in range(max(1, a.n)):
        if a.estilo == "vintage":
            forz = {c: getattr(a, c) for c in CAT_VINTAGE if getattr(a, c) is not None}
            sel = generar_vintage(d, hist, forz, usados, a.quien)
            reg = {c: o["id"] for c, o in sel.items()}
            eid = sel["escena"]["id"]
            ctx = "exterior" if eid in d["exteriores"] else "cocina" if eid in (3, 6, 15) else "interior"
            forma = elegir_forma_texto("vintage", ctx, a.forma_texto) if a.texto else None
            texto, res = prompt_vintage(sel, a.quien, pelo, a.con_marca, a.texto, forma), resumen_vintage(sel, a.quien, pelo)
        else:
            sel = generar_actual(d, hist, usados, a.quien, a.actividad)
            reg = {k: v for k, v in sel.items() if not k.startswith("_")}
            grupo = sel["_act"][1]
            ctx = "exterior" if grupo in d["exteriores"] else "cocina" if grupo == "cocina" else "interior"
            forma = elegir_forma_texto("actual", ctx, a.forma_texto) if a.texto else None
            texto, res = prompt_actual(sel, a.quien, pelo, a.con_marca, a.texto, forma), resumen_actual(sel, d, a.quien, pelo)
        for k, v in reg.items():
            usados.setdefault(k, set()).add(v)
        hist.append(reg)

        titulo = f"PROMPT {i + 1} de {a.n}" if a.n > 1 else "PROMPT"
        quien_txt = {"pareja": "pareja (2 personas)", "ella": "ella sola", "el": "él solo"}[a.quien]
        print(f"===== {titulo} · estilo {a.estilo} · {quien_txt} =====")
        print("Selección:")
        print(res)
        print(f"- Texto: «{a.texto}» · {forma[0]}" if a.texto else "- Texto: ninguno")
        print(f"\n----- Copia esto en Gemini (adjunta {imgs}) -----\n")
        print(texto)
        print()

    if not a.sin_historial:
        hist_file.write_text(json.dumps(hist[-60:], ensure_ascii=False, indent=1), encoding="utf-8")


if __name__ == "__main__":
    main()
