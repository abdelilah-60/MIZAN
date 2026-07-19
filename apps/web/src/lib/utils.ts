export function formatDate(
  dateStr: string,
  locale: string = "en-US",
  opts?: Intl.DateTimeFormatOptions
): string {
  const defaults: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return new Date(dateStr).toLocaleDateString(locale, opts || defaults);
}

export function formatDateFr(dateStr: string): string {
  return formatDate(dateStr, "fr-FR", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatMonthYear(dateStr: string): string {
  return formatDate(dateStr, "fr-FR", { month: "short", year: "numeric" });
}
