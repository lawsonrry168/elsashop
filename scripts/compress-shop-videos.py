"""Compress Materials/Video/*.mov → public/videos/reels/*.mp4 for web.

Usage:
  python scripts/compress-shop-videos.py
  python scripts/compress-shop-videos.py --limit 5   # test first N
  python scripts/compress-shop-videos.py --dry-run

Settings: 720x1280 H.264 CRF 28, AAC 96k — ~10x smaller than source HEVC.
"""

from __future__ import annotations

import argparse
import json
import re
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
VIDEO_IN = ROOT / "Materials" / "Video"
POSTER_OUT = ROOT / "public" / "videos" / "reels" / "posters"
MP4_OUT = ROOT / "public" / "videos" / "reels"
REPORT = ROOT / ".video-analysis" / "compress-report.json"


def ffmpeg_exe() -> str:
    try:
        import imageio_ffmpeg

        return imageio_ffmpeg.get_ffmpeg_exe()
    except ImportError as exc:
        raise SystemExit("pip install imageio-ffmpeg") from exc


def probe(ff: str, path: Path) -> dict:
    proc = subprocess.run([ff, "-i", str(path)], capture_output=True, text=True, errors="replace")
    text = proc.stderr
    dur = re.search(r"Duration: (\d+:\d+:\d+\.\d+)", text)
    secs = 0.0
    if dur:
        h, m, s = dur.group(1).split(":")
        secs = int(h) * 3600 + int(m) * 60 + float(s)
    return {"durationSec": round(secs, 1), "sizeMb": round(path.stat().st_size / 1024 / 1024, 1)}


def compress_one(ff: str, src: Path, dst: Path, poster: Path) -> dict:
    dst.parent.mkdir(parents=True, exist_ok=True)
    poster.parent.mkdir(parents=True, exist_ok=True)

    before = probe(ff, src)

    if not poster.exists():
        subprocess.run(
            [ff, "-y", "-ss", "2", "-i", str(src), "-frames:v", "1", "-q:v", "2", str(poster)],
            check=True,
            capture_output=True,
        )

    if not dst.exists():
        subprocess.run(
            [
                ff,
                "-y",
                "-i",
                str(src),
                "-vf",
                "scale=720:1280:force_original_aspect_ratio=decrease,"
                "pad=720:1280:(ow-iw)/2:(oh-ih)/2",
                "-c:v",
                "libx264",
                "-crf",
                "28",
                "-preset",
                "medium",
                "-c:a",
                "aac",
                "-b:a",
                "96k",
                "-movflags",
                "+faststart",
                str(dst),
            ],
            check=True,
            capture_output=True,
        )

    after_mb = round(dst.stat().st_size / 1024 / 1024, 2)
    ratio = round(before["sizeMb"] / after_mb, 2) if after_mb else 0
    return {**before, "outMb": after_mb, "ratio": ratio}


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--limit", type=int, default=0)
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    if not VIDEO_IN.exists():
        print(f"Missing {VIDEO_IN}", file=sys.stderr)
        return 1

    ff = ffmpeg_exe()
    files = sorted(VIDEO_IN.glob("*.mov"), key=lambda p: int(p.stem))
    if args.limit:
        files = files[: args.limit]

    report = []
    total_in = total_out = 0.0

    for src in files:
        n = src.stem
        dst = MP4_OUT / f"{n}.mp4"
        poster = POSTER_OUT / f"{n}.jpg"
        print(f"→ {src.name}", flush=True)
        if args.dry_run:
            info = probe(ff, src)
            report.append({"file": src.name, **info, "dryRun": True})
            total_in += info["sizeMb"]
            continue
        info = compress_one(ff, src, dst, poster)
        report.append({"file": src.name, **info})
        total_in += info["sizeMb"]
        total_out += info.get("outMb", 0)
        print(f"  {info['sizeMb']} MB → {info.get('outMb')} MB ({info.get('ratio')}x)", flush=True)

    summary = {
        "count": len(files),
        "totalInMb": round(total_in, 1),
        "totalOutMb": round(total_out, 1),
        "items": report,
    }
    REPORT.parent.mkdir(parents=True, exist_ok=True)
    REPORT.write_text(json.dumps(summary, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"\nDone. {summary['totalInMb']} MB → {summary['totalOutMb']} MB")
    print(f"Report: {REPORT}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
