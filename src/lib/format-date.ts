const journalDateFormatter = new Intl.DateTimeFormat("zh-Hant", {
  year: "numeric",
  month: "long",
});

/** ISO date string (YYYY-MM-DD) → localized display label */
export function formatJournalDate(iso: string): string {
  const date = new Date(`${iso}T12:00:00`);
  if (Number.isNaN(date.getTime())) return iso;
  return journalDateFormatter.format(date);
}

/** ISO date string for `<time dateTime>` */
export function journalDateTimeAttr(iso: string): string {
  if (/^\d{4}-\d{2}-\d{2}$/.test(iso)) return iso;
  return iso;
}
