"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  uploadMediaFormAction,
  type MediaUploadFormState,
} from "@/app/admin/actions";
import { MediaSpecBox } from "@/app/admin/components/MediaSpecBox";
import { specForMediaFolder } from "@/app/admin/components/media-specs";
import { suggestMediaAlt } from "@/lib/media-alt";

import { CMS_MEDIA_FOLDERS } from "@/data/cms-media-folders";

const folders = CMS_MEDIA_FOLDERS.map((f) => ({ value: f.value, label: f.label }));

const initialState: MediaUploadFormState = { ok: false, error: "" };

export function MediaUploadForm() {
  const router = useRouter();
  const [folder, setFolder] = useState("general");
  const [alt, setAlt] = useState("");
  const [altTouched, setAltTouched] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const [state, formAction, pending] = useActionState(
    uploadMediaFormAction,
    initialState,
  );

  useEffect(() => {
    if (!state.ok) return;
    if (fileRef.current) fileRef.current.value = "";
    setAlt("");
    setAltTouched(false);
    router.refresh();
  }, [state.ok, router]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || altTouched) return;
    setAlt(suggestMediaAlt(file.name, folder));
  }

  return (
    <form action={formAction} className="kz-admin__form">
      <MediaSpecBox spec={specForMediaFolder(folder)} compact />
      <div className="kz-admin__field">
        <label htmlFor="file">選擇圖片</label>
        <input
          ref={fileRef}
          id="file"
          name="file"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          required
          onChange={handleFileChange}
        />
        <p className="text-xs text-kz-plum-muted">上傳時會自動轉為 WebP（GIF 除外）。</p>
      </div>
      <div className="kz-admin__field">
        <label htmlFor="folder">資料夾</label>
        <select
          id="folder"
          name="folder"
          value={folder}
          onChange={(e) => setFolder(e.target.value)}
        >
          {folders.map((f) => (
            <option key={f.value} value={f.value}>
              {f.label}
            </option>
          ))}
        </select>
      </div>
      <div className="kz-admin__field">
        <label htmlFor="alt">Alt 文字（選填）</label>
        <input
          id="alt"
          name="alt"
          value={alt}
          placeholder="選擇檔案後會自動建議"
          onChange={(e) => {
            setAltTouched(true);
            setAlt(e.target.value);
          }}
        />
      </div>
      {state.error ? (
        <p className="text-sm text-red-600" role="alert">
          {state.error}
        </p>
      ) : null}
      {state.ok ? (
        <p className="text-sm text-green-700" role="status">
          上傳成功，列表已更新。
        </p>
      ) : null}
      <button
        type="submit"
        className="moana-pill-btn moana-pill-btn--dark"
        disabled={pending}
      >
        {pending ? "上傳中…" : "上傳"}
      </button>
    </form>
  );
}
