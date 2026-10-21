import { describe, expect, test } from "bun:test";
import { isRecentUpdate, sortUpdates, type UniversityUpdate } from "./university-updates";

describe("university announcement rules", () => {
  const now = Date.parse("2026-10-21T12:00:00Z");
  test("NEW applies through seven days, but not older or future dates", () => {
    expect(isRecentUpdate("2026-10-14T12:00:00Z", now)).toBe(true);
    expect(isRecentUpdate("2026-10-14T11:59:59Z", now)).toBe(false);
    expect(isRecentUpdate("2026-10-22T12:00:00Z", now)).toBe(false);
    expect(isRecentUpdate(null, now)).toBe(false);
  });
  test("dated announcements sort newest first, preserving undated source order", () => {
    const item = (id: string, date: string | null): UniversityUpdate => ({ id, date, title: id, summary: "", url: "https://angrau.ac.in/", category: "Notifications" });
    expect(sortUpdates([item("undated-1", null), item("older", "2026-10-10"), item("newer", "2026-10-21"), item("undated-2", null)]).map((entry) => entry.id)).toEqual(["newer", "older", "undated-1", "undated-2"]);
  });
});