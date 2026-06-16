"use client";

import type { ReactNode } from "react";

type Props = {
  action: (formData: FormData) => Promise<void>;
  hidden?: Record<string, string>;
  confirmMessage: string;
  children: ReactNode;
  className?: string;
};

export function AdminDeleteForm({
  action,
  hidden,
  confirmMessage,
  children,
  className,
}: Props) {
  return (
    <form
      action={action}
      className={className}
      onSubmit={(e) => {
        if (!confirm(confirmMessage)) e.preventDefault();
      }}
    >
      {hidden
        ? Object.entries(hidden).map(([name, value]) => (
            <input key={name} type="hidden" name={name} value={value} />
          ))
        : null}
      {children}
    </form>
  );
}
