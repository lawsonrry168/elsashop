"use client";

type Props = {
  url: string;
  label?: string;
};

export function CopyUrlButton({ url, label = "複製 URL" }: Props) {
  return (
    <button
      type="button"
      className="text-xs text-kz-rose underline-offset-2 hover:underline"
      onClick={() => {
        void navigator.clipboard.writeText(url);
      }}
    >
      {label}
    </button>
  );
}
