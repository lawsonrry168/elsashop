import type { ContentPanel } from "@/data/page-content";

type Props = {
  panels: readonly ContentPanel[];
  className?: string;
};

export function PageContentPanels({ panels, className = "moana-about" }: Props) {
  return (
    <div className={className}>
      {panels.map((panel) => (
        <div key={panel.id} className="moana-panel">
          <h2 className="moana-panel__title">{panel.title}</h2>
          {panel.body && <p>{panel.body}</p>}
          {panel.list && (
            <ul className="moana-panel__list">
              {panel.list.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
