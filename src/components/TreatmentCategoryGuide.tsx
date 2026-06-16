import type { ContentPanel } from "@/data/page-content";

type Props = {
  panels: readonly ContentPanel[];
};

export function TreatmentCategoryGuide({ panels }: Props) {
  return (
    <section className="moana-category-guide" aria-label="療程類別說明">
      <p className="moana-section-label">
        <span className="moana-section-label__rule" aria-hidden />
        Guide
      </p>
      <h2 className="moana-catalog__title">如何選擇療程？</h2>
      <div className="moana-category-guide__grid">
        {panels.map((panel, i) => (
          <article key={panel.id} className="moana-panel moana-panel--card">
            <span className="moana-category-guide__num">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="moana-panel__title">{panel.title}</h3>
            {panel.body && <p className="moana-panel__desc">{panel.body}</p>}
            {panel.list && (
              <ul className="moana-panel__list">
                {panel.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
