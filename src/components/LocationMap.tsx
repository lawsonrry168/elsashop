import { site } from "@/data/site";

export function LocationMap() {
  return (
    <section className="info-card" aria-labelledby="location-map-title">
      <header className="info-card__header">
        <h2 id="location-map-title" className="info-card__title">
          地圖
        </h2>
        <a
          href={site.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="info-card__link"
        >
          查看大地圖
        </a>
      </header>

      <div className="location-map__frame">
        <iframe
          title={`${site.name} 地圖 — ${site.address}`}
          src={site.mapEmbedUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          className="location-map__embed"
        />
      </div>

      <p className="location-map__address">{site.address}</p>
    </section>
  );
}
