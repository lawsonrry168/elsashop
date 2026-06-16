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
  allowEmpty?: boolean;
  emptyLabel?: string;
  customPlaceholder?: string;
  required?: boolean;
};

function groupOptions(options: CmsSelectOption[]) {
  const groups = new Map<string, CmsSelectOption[]>();
  for (const opt of options) {
    const key = opt.group ?? "";
    const list = groups.get(key) ?? [];
    list.push(opt);
    groups.set(key, list);
  }
  return groups;
}

export function AdminComboSelect({
  name,
  id,
  options,
  defaultValue = "",
  allowEmpty = true,
  emptyLabel = "（無）",
  customPlaceholder = "自訂…",
  required,
}: Props) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  const inList = !defaultValue || optionValueInList(defaultValue, options);
  const [mode, setMode] = useState<"preset" | "custom">(inList ? "preset" : "custom");
  const [preset, setPreset] = useState(inList ? defaultValue : "");
  const [custom, setCustom] = useState(inList ? "" : defaultValue);

  const grouped = groupOptions(options);

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
        <button
          type="button"
          className="kz-admin__combo-back"
          onClick={() => {
            setMode("preset");
            if (optionValueInList(custom, options)) {
              setPreset(custom);
            }
          }}
        >
          改選預設
        </button>
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
        {allowEmpty && <option value="">{emptyLabel}</option>}
        {Array.from(grouped.entries()).map(([group, items]) =>
          group ? (
            <optgroup key={group} label={group}>
              {items.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </optgroup>
          ) : (
            items.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))
          ),
        )}
        <option value={CUSTOM_VALUE}>自訂輸入…</option>
      </select>
    </div>
  );
}
