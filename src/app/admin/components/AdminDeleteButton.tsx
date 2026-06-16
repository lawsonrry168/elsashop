"use client";

import { useTransition, type ReactNode } from "react";

type Props = {
  action: (formData: FormData) => Promise<void>;
  hidden: Record<string, string>;
  confirmMessage: string;
  children: ReactNode;
  className?: string;
};

export function AdminDeleteButton({
  action,
  hidden,
  confirmMessage,
  children,
  className,
}: Props) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      className={className}
      disabled={pending}
      onClick={() => {
        if (!confirm(confirmMessage)) return;
        const formData = new FormData();
        for (const [name, value] of Object.entries(hidden)) {
          formData.set(name, value);
        }
        startTransition(() => {
          void action(formData);
        });
      }}
    >
      {children}
    </button>
  );
}
