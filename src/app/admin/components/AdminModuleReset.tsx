"use client";

import { useTransition } from "react";

type Props = {
  action: (formData: FormData) => Promise<void>;
  /** FormData 欄位名稱（預設 module） */
  fieldName?: string;
  moduleId: string;
  label: string;
  confirmMessage?: string;
};

export function AdminModuleReset({
  action,
  fieldName = "module",
  moduleId,
  label,
  confirmMessage,
}: Props) {
  const [pending, startTransition] = useTransition();
  const message = confirmMessage ?? `確定還原「${label}」為預設內容？`;

  function handleClick() {
    if (!confirm(message)) return;
    const fd = new FormData();
    fd.set(fieldName, moduleId);
    startTransition(() => action(fd));
  }

  return (
    <div className="kz-admin__section-reset">
      <button
        type="button"
        className="kz-admin__btn kz-admin__btn--ghost"
        onClick={handleClick}
        disabled={pending}
      >
        {pending ? "還原中…" : "還原預設"}
      </button>
    </div>
  );
}
