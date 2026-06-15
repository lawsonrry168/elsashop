"""Copy original brand logo and export transparent PNG."""
from __future__ import annotations

import shutil
import sys
from io import BytesIO
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
CANDIDATES = [
    ROOT / "Materials" / "logo-source.png",
    ROOT / "Materials" / "logo.jpg",
    ROOT / "public" / "brand" / "logo.jpg",
]
PUBLIC_JPG = ROOT / "public" / "brand" / "logo.jpg"
OUT = ROOT / "public" / "brand" / "logo.png"
OUT_ICON = ROOT / "public" / "brand" / "icon-512.png"
APP_ICON = ROOT / "src" / "app" / "icon.png"


def find_source() -> Path:
    for path in CANDIDATES:
        if path.exists():
            return path
    raise FileNotFoundError("No logo source found in Materials/ or public/brand/")


def remove_with_rembg(image_bytes: bytes) -> Image.Image:
    from rembg import remove

    return Image.open(BytesIO(remove(image_bytes)))


def crop_logo_icon(img: Image.Image) -> Image.Image:
    """Square crop around the circular emblem."""
    img = img.convert("RGBA")
    pixels = img.load()
    width, height = img.size

    min_x, min_y = width, height
    max_x, max_y = 0, 0
    for y in range(height):
        for x in range(width):
            if pixels[x, y][3] > 16:
                min_x = min(min_x, x)
                min_y = min(min_y, y)
                max_x = max(max_x, x)
                max_y = max(max_y, y)

    if max_x <= min_x or max_y <= min_y:
        return img

    crop_height = int((max_y - min_y) * 0.42)
    pad = 12
    box = (
        max(0, min_x - pad),
        max(0, min_y - pad),
        min(width, max_x + pad),
        min(height, min_y + crop_height + pad),
    )
    cropped = img.crop(box)
    side = max(cropped.size)
    square = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    offset = ((side - cropped.width) // 2, (side - cropped.height) // 2)
    square.paste(cropped, offset, cropped)
    return square.resize((512, 512), Image.Resampling.LANCZOS)


def main() -> int:
    source = find_source()
    source_bytes = source.read_bytes()

    PUBLIC_JPG.parent.mkdir(parents=True, exist_ok=True)
    if source.suffix.lower() in {".jpg", ".jpeg"}:
        shutil.copy2(source, PUBLIC_JPG)

    try:
        result = remove_with_rembg(source_bytes)
        method = "rembg"
    except Exception as error:
        print(f"rembg failed ({error})", file=sys.stderr)
        return 1

    result.save(OUT, "PNG", optimize=True)
    icon = crop_logo_icon(result)
    icon.save(OUT_ICON, "PNG", optimize=True)
    shutil.copy2(OUT_ICON, APP_ICON)

    print(f"source: {source}")
    print(f"saved: {OUT} via {method} ({OUT.stat().st_size} bytes)")
    print(f"saved: {OUT_ICON} ({OUT_ICON.stat().st_size} bytes)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
