import { EditorialHeading } from "./EditorialHeading";

const usps = [
  {
    title: "量膚定制",
    desc: "先分析膚況，再建議療程，不推銷套裝。",
  },
  {
    title: "韓系質感",
    desc: "少女感視覺與舒適空間，療程資訊清晰易讀。",
  },
  {
    title: "單次收費",
    desc: "明碼實價或諮詢報價，絕無硬銷。",
  },
  {
    title: "專業認證",
    desc: "IBDR 金獎 + ITEC LV4 國際資格。",
  },
];

export function USPGrid() {
  return (
    <section className="section-editorial">
      <div className="container-kz editorial-split editorial-split--offset">
        <EditorialHeading
          index="02"
          eyebrow="Why Kang Zi Jian"
          title="為什麼選擇康姿健"
          description="專業、透明、不推銷 — 一人小店的安心護理。"
        />
        <ul className="usp-editorial">
          {usps.map((usp, i) => (
            <li key={usp.title} className="usp-editorial__item">
              <span className="usp-editorial__num">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="usp-editorial__title">{usp.title}</h3>
              <p className="usp-editorial__desc">{usp.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export { EditorialHeading, EditorialHeading as SectionHeading } from "./EditorialHeading";
