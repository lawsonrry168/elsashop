/** Derive a human-readable alt from an uploaded filename. */
export function suggestMediaAlt(filename: string, folder?: string): string {
  const base = filename
    .replace(/\.[^.]+$/, "")
    .replace(/^\d+-/, "")
    .replace(/[-_]+/g, " ")
    .trim();

  if (!base) return folder ? `${folder} 圖片` : "圖片";

  const cleaned = base
    .replace(/\b(img|image|photo|pic|dsc|dscn|p\d+)\b/gi, "")
    .replace(/\s+/g, " ")
    .trim();

  return cleaned || (folder ? `${folder} 圖片` : "圖片");
}
