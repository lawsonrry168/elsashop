import type { MediaSpec, MediaSpecKey } from "@/app/admin/components/media-specs";
import { MEDIA_SPECS } from "@/app/admin/components/media-specs";

type Props = {
  spec: MediaSpec | MediaSpecKey;
  compact?: boolean;
};

export function MediaSpecBox({ spec, compact }: Props) {
  const data = typeof spec === "string" ? MEDIA_SPECS[spec] : spec;

  return (
    <div
      className={`kz-admin__spec-box${compact ? " kz-admin__spec-box--compact" : ""}`}
      role="note"
    >
      <p className="kz-admin__spec-box__title">{data.title}</p>
      <dl className="kz-admin__spec-box__list">
        {data.items.map((item) => (
          <div key={item.label} className="kz-admin__spec-box__row">
            <dt>{item.label}</dt>
            <dd>{item.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
