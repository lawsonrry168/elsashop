import type { KeyboardEvent } from "react";

type RadioKeyOptions<T extends string> = {
  values: readonly T[];
  current: T;
  onChange: (value: T) => void;
  orientation?: "horizontal" | "vertical";
};

/** Arrow-key navigation for custom `role="radio"` groups */
export function handleRadioGroupKeyDown<T extends string>(
  event: KeyboardEvent<HTMLElement>,
  { values, current, onChange, orientation = "horizontal" }: RadioKeyOptions<T>,
) {
  const index = values.indexOf(current);
  if (index < 0) return;

  const prevKey = orientation === "horizontal" ? "ArrowLeft" : "ArrowUp";
  const nextKey = orientation === "horizontal" ? "ArrowRight" : "ArrowDown";

  if (event.key === prevKey || event.key === nextKey) {
    event.preventDefault();
    const delta = event.key === nextKey ? 1 : -1;
    const next = values[(index + delta + values.length) % values.length];
    onChange(next);
    return;
  }

  if (event.key === "Home") {
    event.preventDefault();
    onChange(values[0]);
    return;
  }

  if (event.key === "End") {
    event.preventDefault();
    onChange(values[values.length - 1]);
  }
}
