"use client";

import { useId, useState } from "react";
import type { CmsSelectOption } from "@/lib/cms/admin-field-options";
import { optionValueInList } from "@/lib/cms/admin-field-options";

const CUSTOM_VALUE = "__custom__";

type Props = {
  name: string;
  id?: string;
  options: CmsSelectOption[];
  defaultValue?: string;
  allowCustom?: boolean;
  customPlaceholder?: string;
  required?: boolean;
};

export function AdminPresetSelect({
  name,
  id,
  options,
  defaultValue = "",
  allowCustom = true,
  customPlaceholder = "自訂…",
  required,
}: Props) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  const inList = optionValueInList(defaultValue, options);
  const [mode, setMode] = useState<"preset" | "custom">(
    !defaultValue || inList ? "preset" : "custom",
  );
  const [preset, setPreset] = useState(inList ? defaultValue : options[0]?.value ?? "");
  const [custom, setCustom] = useState(inList ? "" : defaultValue);

  if (mode === "custom") {
    return (
      <div className="kz-admin__combo">
        <input
          id={fieldId}
          name={name}
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
          placeholder={customPlaceholder}
          required={required}
        />
        {allowCustom && (
          <button
            type="button"
            className="kz-admin__combo-back"
            onClick={() => {
              setMode("preset");
              if (optionValueInList(custom, options)) setPreset(custom);
            }}
          >
            改選預設
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="kz-admin__combo">
      <select
        id={fieldId}
        name={name}
        value={preset}
        required={required}
        onChange={(e) => {
          const next = e.target.value;
          if (next === CUSTOM_VALUE) {
            setMode("custom");
            setCustom(preset);
            return;
          }
          setPreset(next);
        }}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
        {allowCustom && <option value={CUSTOM_VALUE}>自訂輸入…</option>}
      </select>
    </div>
  );
}
