import type { ReactNode } from "react";

type Props = {
  lead: string;
  leadHighlight?: string;
};

export function HeroLeadText({ lead, leadHighlight }: Props) {
  if (!leadHighlight?.trim()) {
    return <p>{lead}</p>;
  }
  return (
    <p>
      {lead}
      <strong className="text-kz-brand-pink">{leadHighlight}</strong>
    </p>
  );
}

export function HeroLeadFromStrings({
  lead,
  highlight,
  children,
}: {
  lead?: string;
  highlight?: string;
  children?: ReactNode;
}) {
  if (children) return <>{children}</>;
  if (!lead) return null;
  return <HeroLeadText lead={lead} leadHighlight={highlight} />;
}
