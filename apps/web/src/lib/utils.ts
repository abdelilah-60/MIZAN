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

export function cleanParenthesesName(name?: string, isAr: boolean = true): string {
  if (!name) return "";
  const str = String(name).trim();

  // Match "(Arabic) French" or "French (Arabic)"
  const match1 = str.match(/^(.*?)\s*\((.*?)\)$/);
  const match2 = str.match(/^\((.*?)\)\s*(.*?)$/);
  const match = match1 || match2;

  if (match) {
    const part1 = match[1].trim();
    const part2 = match[2].trim();
    const part1IsAr = /[\u0600-\u06FF]/.test(part1);
    const part2IsAr = /[\u0600-\u06FF]/.test(part2);

    if (isAr) {
      if (part1IsAr) return part1;
      if (part2IsAr) return part2;
      return part1;
    } else {
      if (!part1IsAr && part1.length > 0) return part1;
      if (!part2IsAr && part2.length > 0) return part2;
      return part2;
    }
  }

  return str;
}
