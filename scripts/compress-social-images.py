#!/usr/bin/env python3
"""Compress social PNGs in public/images/social to WebP (optional batch job)."""

from __future__ import annotations

import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    print("Install Pillow: pip install pillow", file=sys.stderr)
    raise SystemExit(1)

ROOT = Path(__file__).resolve().parents[1]
SOCIAL_DIR = ROOT / "public" / "images" / "social"
QUALITY = 82
MAX_WIDTH = 1400


def main() -> None:
    if not SOCIAL_DIR.is_dir():
        print(f"Missing directory: {SOCIAL_DIR}")
        return

    total_in = 0
    total_out = 0
    count = 0

    for src in sorted(SOCIAL_DIR.glob("*.png")):
        out = src.with_suffix(".webp")
        with Image.open(src) as im:
            im = im.convert("RGB")
            w, h = im.size
            if w > MAX_WIDTH:
                h = int(h * MAX_WIDTH / w)
                im = im.resize((MAX_WIDTH, h), Image.Resampling.LANCZOS)
            im.save(out, "WEBP", quality=QUALITY, method=6)

        in_size = src.stat().st_size
        out_size = out.stat().st_size
        total_in += in_size
        total_out += out_size
        count += 1
        print(f"{src.name}: {in_size // 1024} KB -> {out.name}: {out_size // 1024} KB")

    if count:
        print(f"\nDone. {count} files, {total_in // (1024*1024)} MB -> {total_out // (1024*1024)} MB")
    else:
        print("No PNG files found.")


if __name__ == "__main__":
    main()
