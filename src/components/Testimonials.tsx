const testimonials = [
  {
    quote:
      "以前最怕被硬銷，康姿健單次收費好安心。量膚分析完先建議療程，自己決定做唔做。",
    author: "陳小姐",
    meta: "屯門 · 回訪客人",
  },
  {
    quote:
      "等離子抗痘做完毛孔細咗好多，環境舒服，韓系感覺好放鬆。",
    author: "李小姐",
    meta: "新界西 · Instagram 預約",
  },
  {
    quote:
      "TEGODER 果酸係量膚後先配，敏感肌都做得，專業又溫柔。",
    author: "Grace W.",
    meta: "屯門 · 果酸療程",
  },
];

export function Testimonials({ embedded = false }: { embedded?: boolean }) {
  const content = (
    <div className="moana-voices">
      {testimonials.map((t, i) => (
        <blockquote
          key={t.author}
          className={`moana-voice ${i % 2 === 1 ? "moana-voice--offset" : ""}`}
          style={{ ["--voice-index" as string]: i }}
        >
          <p className="moana-voice__index font-ui" aria-hidden="true">
            {String(i + 1).padStart(2, "0")}
          </p>
          <p className="moana-voice__text">「{t.quote}」</p>
          <footer className="moana-voice__footer font-ui">
            <cite className="moana-voice__author">{t.author}</cite>
            <span className="moana-voice__meta">{t.meta}</span>
          </footer>
        </blockquote>
      ))}
    </div>
  );

  if (embedded) {
    return (
      <section className="moana-home__chapter moana-home__wide--bordered moana-home__voices">
        <p className="moana-section-label">
          <span className="moana-section-label__rule" aria-hidden />
          Voices
        </p>
        <h2 className="moana-home__section-title">客人分享</h2>
        {content}
      </section>
    );
  }

  return (
    <section className="section-editorial">
      <div className="container-kz">{content}</div>
    </section>
  );
}

export function MenBanner() {
  return null;
}
