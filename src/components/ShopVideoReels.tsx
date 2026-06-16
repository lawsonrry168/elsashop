"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import type { ShopVideo } from "@/data/shop-videos";

type Props = {
  videos: ShopVideo[];
};

export function ShopVideoReels({ videos }: Props) {
  const [activeId, setActiveId] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const active = videos.find((v) => v.id === activeId);

  return (
    <section
      className="moana-home__wide moana-home__wide--bordered"
      aria-labelledby="shop-videos-title"
    >
      <div className="container-kz">
        <div className="moana-home__section-head">
          <div>
            <p className="moana-section-label">
              <span className="moana-section-label__rule" aria-hidden />
              Daily
            </p>
            <h2 id="shop-videos-title" className="moana-home__section-title">
              店內日常
            </h2>
            <p className="moana-home__section-desc">
              開店準備、療程進行、儀器操作 — {videos.length} 段真實店內片段，了解康姿健的日常。
            </p>
          </div>
        </div>

        {active && (
          <div className="shop-video-player moana-panel">
            <video
              ref={videoRef}
              key={active.src}
              className="shop-video-player__video"
              controls
              playsInline
              preload="metadata"
              poster={active.poster}
              aria-label={active.title}
            >
              <source src={active.src} type="video/mp4" />
            </video>
            <div className="shop-video-player__meta">
              <span className="shop-video-player__tag">{active.category}</span>
              <h3 className="shop-video-player__title">{active.title}</h3>
              <p className="shop-video-player__desc">{active.excerpt}</p>
              {active.relatedHref && (
                <Link
                  href={active.relatedHref}
                  className="moana-pill-btn moana-pill-btn--ghost"
                >
                  了解相關療程
                  <span aria-hidden>→</span>
                </Link>
              )}
            </div>
          </div>
        )}

        <div className="shop-video-grid" role="list">
          {videos.map((video) => (
            <button
              key={video.id}
              type="button"
              role="listitem"
              className={`shop-video-card${activeId === video.id ? " shop-video-card--active" : ""}`}
              onClick={() => {
                setActiveId(video.id);
                requestAnimationFrame(() => {
                  videoRef.current?.play().catch(() => undefined);
                });
              }}
              aria-pressed={activeId === video.id}
              aria-label={`播放：${video.title}`}
            >
              <span className="shop-video-card__thumb">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={video.poster} alt="" loading="lazy" />
                <span className="shop-video-card__play" aria-hidden>
                  ▶
                </span>
              </span>
              <span className="shop-video-card__body">
                <span className="shop-video-card__cat">{video.category}</span>
                <span className="shop-video-card__title">{video.title}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
