import Link from "next/link";
import { sitePages } from "@/data/site";

export default function NotFound() {
  return (
    <section className="moana-page">
      <div className="container-kz moana-page__narrow text-center">
        <p className="moana-section-label justify-center">
          <span className="moana-section-label__rule" aria-hidden />
          404
        </p>
        <h1 className="mt-4 font-serif text-3xl font-semibold text-kz-plum">
          找不到此頁面
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-kz-plum-muted">
          連結可能已更新或輸入有誤。請從以下頁面繼續瀏覽。
        </p>
        <nav
          className="moana-hub-grid mt-10 text-left"
          aria-label="主要頁面"
        >
          {sitePages.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              className="moana-hub-card moana-panel moana-panel--card no-underline"
            >
              <p className="moana-hub-card__eyebrow">{page.eyebrow}</p>
              <h2 className="moana-hub-card__title">{page.label}</h2>
              <p className="moana-hub-card__desc">{page.desc}</p>
            </Link>
          ))}
        </nav>
        <p className="mt-10">
          <Link href="/" className="moana-pill-btn moana-pill-btn--dark">
            返回首頁
          </Link>
        </p>
      </div>
    </section>
  );
}
