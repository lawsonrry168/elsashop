"use client";

import { MediaFieldPicker } from "@/app/admin/components/MediaFieldPicker";

type Props = {
  defaultImage?: string | null;
  defaultAlt?: string | null;
  folder?: "journal" | "treatments" | "general";
};

export function AdminImageFields({
  defaultImage,
  defaultAlt,
  folder = "general",
}: Props) {
  return (
    <MediaFieldPicker
      urlName="image"
      altName="image_alt"
      label="圖片"
      defaultUrl={defaultImage}
      defaultAlt={defaultAlt}
      folder={folder}
      specKey={folder === "journal" ? "journal" : folder === "treatments" ? "treatments" : "general"}
      hint="上傳或從媒體庫選擇後 URL 會自動填入；亦可手動貼上 /images/... 路徑。"
    />
  );
}
