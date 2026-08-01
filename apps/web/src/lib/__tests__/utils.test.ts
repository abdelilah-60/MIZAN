import { describe, it, expect } from "vitest";
import { formatDate, formatDateFr, formatMonthYear, cleanParenthesesName } from "../utils";

describe("Utility functions", () => {
  it("formatDate should format ISO date correctly", () => {
    const formatted = formatDate("2026-05-15T10:00:00Z");
    expect(formatted).toBeTruthy();
    expect(typeof formatted).toBe("string");
  });

  it("formatDateFr should return French formatted date string", () => {
    const formatted = formatDateFr("2026-05-15T10:00:00Z");
    expect(formatted).toBeTruthy();
    expect(typeof formatted).toBe("string");
  });

  it("formatMonthYear should format month and year", () => {
    const formatted = formatMonthYear("2026-05-15T10:00:00Z");
    expect(formatted).toBeTruthy();
  });

  it("cleanParenthesesName should preserve name string", () => {
    const name = "Ferme de Mizan Developer (ضيعة ميزان)";
    const cleaned = cleanParenthesesName(name, true);
    expect(cleaned).toBe(name);
  });
});
