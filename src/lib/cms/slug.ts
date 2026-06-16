export function slugifyInput(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^\u4e00-\u9fff\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

export function uniqueSlug(base: string): string {
  const core = slugifyInput(base) || `item-${Date.now().toString(36)}`;
  return `${core}-${Date.now().toString(36).slice(-4)}`;
}
