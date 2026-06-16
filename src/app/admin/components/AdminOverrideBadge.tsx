type Props = {
  overridden: boolean;
};

export function AdminOverrideBadge({ overridden }: Props) {
  return (
    <span
      className={[
        "kz-admin__override-badge",
        overridden ? "kz-admin__override-badge--custom" : "kz-admin__override-badge--default",
      ].join(" ")}
    >
      {overridden ? "已自訂" : "使用預設"}
    </span>
  );
}
