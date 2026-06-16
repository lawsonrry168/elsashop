"use client";

import type { ReactNode } from "react";

type Props = {
  label: string;
  description?: string;
  selected: boolean;
  onSelect: () => void;
  ctaId: string;
  children?: ReactNode;
};

export function TappableOption({
  label,
  description,
  selected,
  onSelect,
  ctaId,
  children,
}: Props) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      data-cta-id={ctaId}
      className={`conversion-option ${selected ? "conversion-option--active" : ""}`}
      onClick={onSelect}
    >
      <span className="conversion-option__label">{label}</span>
      {description && (
        <span className="conversion-option__desc">{description}</span>
      )}
      {children}
    </button>
  );
}
