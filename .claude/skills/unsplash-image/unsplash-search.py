#!/usr/bin/env python3
"""Search Unsplash, download a photo and optionally add a title/subtitle overlay.

Needs UNSPLASH_CLIENT_ID (an Unsplash "Access Key") in the environment or in
~/.agents/tools/.env as UNSPLASH_CLIENT_ID=...
"""
import argparse
import os
import random
import sys
import textwrap
from pathlib import Path

import requests

API = "https://api.unsplash.com"


def load_key():
    key = os.environ.get("UNSPLASH_CLIENT_ID")
    if key:
        return key.strip()
    for env in (Path.home() / ".agents/tools/.env", Path(__file__).with_name(".env")):
        if env.exists():
            for line in env.read_text().splitlines():
                if line.strip().startswith("UNSPLASH_CLIENT_ID="):
                    return line.split("=", 1)[1].strip().strip('"').strip("'")
    sys.exit("Falta UNSPLASH_CLIENT_ID: ponlo en el entorno o en ~/.agents/tools/.env")


def search(key, args):
    params = {"query": args.query, "per_page": min(max(args.count, 1), 30)}
    if args.orientation:
        params["orientation"] = args.orientation
    if args.color:
        params["color"] = args.color
    r = requests.get(f"{API}/search/photos", params=params,
                     headers={"Authorization": f"Client-ID {key}", "Accept-Version": "v1"}, timeout=30)
    r.raise_for_status()
    return r.json().get("results", [])


def credit(photo):
    u = photo["user"]
    return f'Foto de {u["name"]} ({u["links"]["html"]}) en Unsplash: {photo["links"]["html"]}'


def overlay(path, title, subtitle):
    from PIL import Image, ImageDraw, ImageFont

    img = Image.open(path).convert("RGB")
    w, h = img.size
    band = int(h * 0.32)
    layer = Image.new("RGBA", img.size, (0, 0, 0, 0))
    ImageDraw.Draw(layer).rectangle([0, h - band, w, h], fill=(0, 0, 0, 150))
    img = Image.alpha_composite(img.convert("RGBA"), layer)
    d = ImageDraw.Draw(img)

    def font(size):
        for name in ("DejaVuSans-Bold.ttf", "Arial Bold.ttf", "LiberationSans-Bold.ttf"):
            try:
                return ImageFont.truetype(name, size)
            except OSError:
                continue
        return ImageFont.load_default()

    tsize = max(24, w // 18)
    tf, sf = font(tsize), font(max(16, tsize // 2))
    y = h - band + band // 6
    for line in textwrap.wrap(title, width=max(10, int(w / (tsize * 0.55)))):
        d.text((w // 20 + 2, y + 2), line, font=tf, fill=(0, 0, 0))
        d.text((w // 20, y), line, font=tf, fill=(255, 255, 255))
        y += int(tsize * 1.15)
    if subtitle:
        d.text((w // 20, y + tsize // 4), subtitle, font=sf, fill=(200, 200, 200))
    out = img.convert("RGB")
    out.save(path)


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--query", "-q", required=True)
    ap.add_argument("--output", "-o")
    ap.add_argument("--orientation", choices=["landscape", "portrait", "squarish"])
    ap.add_argument("--color")
    ap.add_argument("--pick", choices=["random", "first"], default="random")
    ap.add_argument("--title")
    ap.add_argument("--subtitle")
    ap.add_argument("--list", action="store_true")
    ap.add_argument("--count", type=int, default=30)
    args = ap.parse_args()
    if not args.list and not args.output:
        ap.error("--output es obligatorio salvo con --list")

    key = load_key()
    results = search(key, args)
    if not results:
        sys.exit(f'Sin resultados para "{args.query}"')

    if args.list:
        for i, p in enumerate(results):
            print(f'{i:2d}  {p["width"]}x{p["height"]}  {p.get("alt_description") or ""}\n    {p["urls"]["regular"]}\n    {credit(p)}')
        return

    photo = results[0] if args.pick == "first" else random.choice(results)
    # Unsplash API terms: register the download.
    requests.get(photo["links"]["download_location"], headers={"Authorization": f"Client-ID {key}"}, timeout=30)
    url = photo["urls"]["regular"]
    img = requests.get(url, timeout=60)
    img.raise_for_status()
    out = Path(args.output)
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_bytes(img.content)
    print("URL:", url)
    print("Crédito:", credit(photo))
    print("Guardado en:", out)
    if args.title:
        overlay(out, args.title, args.subtitle)
        print("Texto añadido sobre la imagen")


if __name__ == "__main__":
    main()
