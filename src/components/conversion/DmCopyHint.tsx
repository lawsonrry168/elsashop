"use client";

import { useState } from "react";

type DmCopyHintProps = {
  message: string;
};

export function DmCopyHint({ message }: DmCopyHintProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="conversion-funnel__dm-hint moana-panel moana-panel--tip">
      <p className="moana-panel__title">IG 私訊建議文案</p>
      <p className="conversion-funnel__dm-text">{message}</p>
      <button
        type="button"
        className="conversion-funnel__dm-copy"
        onClick={copy}
      >
        {copied ? "已複製" : "複製文案"}
      </button>
      <p className="conversion-funnel__hint">
        前往 Instagram 後，貼上以上訊息即可。
      </p>
    </div>
  );
}
