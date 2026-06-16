"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { saveHomeSectionsSettings } from "@/app/admin/actions";
import { AdminPresetSelect } from "@/app/admin/components/AdminPresetSelect";
import { AdminTips } from "@/app/admin/components/AdminTips";
import { MediaFieldPicker } from "@/app/admin/components/MediaFieldPicker";
import {
  HOME_SECTION_FIELD_LABELS,
  HOME_SECTION_REGISTRY,
  type HomeSectionField,
  type HomeSectionId,
} from "@/data/home-sections";
import type { ResolvedHomeSection } from "@/lib/cms/home-sections";
import type { CmsSelectOption } from "@/lib/cms/admin-field-options";

type Props = {
  sections: ResolvedHomeSection[];
  pathOptions: CmsSelectOption[];
};

function reorderIdList(ids: HomeSectionId[], fromId: HomeSectionId, toId: HomeSectionId) {
  const next = [...ids];
  const from = next.indexOf(fromId);
  const to = next.indexOf(toId);
  if (from < 0 || to < 0 || from === to) return next;
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

function isPathField(field: HomeSectionField) {
  return field === "linkHref" || field === "secondaryLinkHref";
}

function isImageField(field: HomeSectionField) {
  return field === "image";
}

function isLongTextField(field: HomeSectionField) {
  return field === "body" || field === "sectionDesc";
}

export function AdminHomeSectionsEditor({ sections, pathOptions }: Props) {
  const initialOrder = useMemo(() => sections.map((s) => s.id), [sections]);
  const sectionById = useMemo(
    () => Object.fromEntries(sections.map((s) => [s.id, s])) as Record<HomeSectionId, ResolvedHomeSection>,
    [sections],
  );

  const [order, setOrder] = useState<HomeSectionId[]>(initialOrder);
  const [dragId, setDragId] = useState<HomeSectionId | null>(null);
  const [dragOverId, setDragOverId] = useState<HomeSectionId | null>(null);
  const [expanded, setExpanded] = useState<HomeSectionId | null>(null);

  function handleDrop(targetId: HomeSectionId) {
    if (!dragId) return;
    setOrder((prev) => reorderIdList(prev, dragId, targetId));
    setDragId(null);
    setDragOverId(null);
  }

  return (
    <form action={saveHomeSectionsSettings} className="kz-admin__card kz-admin__form kz-admin__home-sections">
      <input type="hidden" name="order" value={JSON.stringify(order)} readOnly />

      <AdminTips
        items={[
          "拖曳左側 ⠿ 調整區塊順序；取消勾選可隱藏整個區塊。",
          "點區塊列可展開編輯 Teaser 文案；留空欄位會恢復預設值。",
          <>詳見 <Link href="/admin/guide#home-sections">使用說明 · 首頁區塊</Link>。</>,
        ]}
      />
      <p className="kz-admin__list-hint kz-admin__list-hint--reorder">
        拖曳左側 ⠿ 調整順序（儲存表單時一併寫入）
      </p>

      <ul className="kz-admin__section-list">
        {order.map((id, index) => {
          const def = HOME_SECTION_REGISTRY[id];
          const section = sectionById[id];
          const hasFields = def.editableFields.length > 0;
          const isOpen = expanded === id;

          return (
            <li
              key={id}
              className={[
                "kz-admin__section-item",
                dragOverId === id ? "kz-admin__section-item--drag-over" : "",
                dragId === id ? "kz-admin__section-item--dragging" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOverId(id);
              }}
              onDragLeave={() => {
                if (dragOverId === id) setDragOverId(null);
              }}
              onDrop={(e) => {
                e.preventDefault();
                handleDrop(id);
              }}
            >
              <div className="kz-admin__section-item__head">
                <button
                  type="button"
                  className="kz-admin__drag-handle"
                  draggable
                  aria-label={`拖曳調整「${def.label}」順序`}
                  onDragStart={(e) => {
                    setDragId(id);
                    e.dataTransfer.effectAllowed = "move";
                  }}
                  onDragEnd={() => {
                    setDragId(null);
                    setDragOverId(null);
                  }}
                >
                  ⠿
                </button>

                <div className="kz-admin__section-item__meta">
                  <span className="kz-admin__section-item__index">{index + 1}</span>
                  <div>
                    <p className="kz-admin__section-item__title">{def.label}</p>
                    <p className="kz-admin__section-item__desc">{def.description}</p>
                  </div>
                </div>

                <label className="kz-admin__section-toggle">
                  <input
                    type="checkbox"
                    name={`section_${id}_enabled`}
                    value="1"
                    defaultChecked={section.enabled}
                  />
                  顯示
                </label>

                {hasFields ? (
                  <button
                    type="button"
                    className="kz-admin__section-expand"
                    aria-expanded={isOpen}
                    onClick={() => setExpanded(isOpen ? null : id)}
                  >
                    {isOpen ? "收合" : "編輯文案"}
                  </button>
                ) : null}
              </div>

              {hasFields ? (
                <fieldset
                  className="kz-admin__fieldset kz-admin__section-item__fields"
                  hidden={!isOpen}
                >
                  <legend className="kz-admin__legend">{def.label} · 文案</legend>
                  {def.editableFields.map((field) => {
                    const fieldId = `section_${id}_${field}`;
                    const label = HOME_SECTION_FIELD_LABELS[field];
                    const defaultValue = section.content[field] ?? "";

                    if (isImageField(field)) {
                      return (
                        <MediaFieldPicker
                          key={`${id}-${field}`}
                          urlName={fieldId}
                          altName={`section_${id}_imageAlt`}
                          label={label}
                          defaultUrl={section.content.image || undefined}
                          defaultAlt={section.content.imageAlt || undefined}
                          folder="general"
                          specKey="posters"
                          hint="建議 4:5 直式海報；留空使用預設圖。"
                        />
                      );
                    }

                    if (field === "imageAlt") {
                      return null;
                    }

                    return (
                      <div key={field} className="kz-admin__field">
                        <label htmlFor={fieldId}>{label}</label>
                        {isPathField(field) ? (
                          <AdminPresetSelect
                            id={fieldId}
                            name={fieldId}
                            options={pathOptions}
                            defaultValue={defaultValue}
                            customPlaceholder="/path 或 https://"
                          />
                        ) : isLongTextField(field) ? (
                          <textarea
                            id={fieldId}
                            name={fieldId}
                            rows={3}
                            defaultValue={defaultValue}
                            placeholder={def.defaults[field] ?? ""}
                          />
                        ) : (
                          <input
                            id={fieldId}
                            name={fieldId}
                            defaultValue={defaultValue}
                            placeholder={def.defaults[field] ?? ""}
                          />
                        )}
                      </div>
                    );
                  })}
                </fieldset>
              ) : null}
            </li>
          );
        })}
      </ul>

      <div className="kz-admin__form-actions">
        <button type="submit" className="kz-admin__btn kz-admin__btn--primary">
          儲存首頁區塊
        </button>
      </div>
    </form>
  );
}
