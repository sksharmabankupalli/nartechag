import { createServerFn } from "@tanstack/react-start";
import { categorizeUpdate, type UniversityUpdate } from "./university-updates";

export const getOfficialUpdates = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const response = await fetch("https://angrau.ac.in/", {
      signal: AbortSignal.timeout(15000),
      headers: { Accept: "text/html" },
    });
    if (!response.ok) throw new Error(`ANGRAU responded ${response.status}`);
    const { parseHTML } = await import("linkedom");
    const { document } = parseHTML(await response.text());
    const seen = new Set<string>();
    const items: UniversityUpdate[] = [];
    for (const row of Array.from(document.querySelectorAll(".slider-section ul li"))) {
      const title = row.querySelector("span")?.textContent?.replace(/\s+/g, " ").trim();
      const href = row.querySelector("a.blinktext")?.getAttribute("href");
      if (!title || !href || seen.has(title)) continue;
      const url = new URL(href, "https://angrau.ac.in/");
      if (!["https:", "http:"].includes(url.protocol)) continue;
      seen.add(title);
      // Only explicit publication metadata qualifies as a date. Embedded dates are often deadlines.
      const rawDate = row.querySelector("time[datetime]")?.getAttribute("datetime");
      const date = rawDate && Number.isFinite(Date.parse(rawDate)) ? new Date(rawDate).toISOString() : null;
      const category = categorizeUpdate(title);
      items.push({ id: `official-${items.length}`, title, url: url.href, date, category,
        summary: ({ Admissions: "Admission and registration information from ANGRAU.", Exams: "Academic and examination information from ANGRAU.", Results: "Results and selection information from ANGRAU.", Notifications: "An official university notice from ANGRAU.", Events: "University event and award information from ANGRAU." })[category] });
    }
    if (!items.length) throw new Error("ANGRAU announcement feed was unavailable");
    return { items, unavailable: false, checkedAt: new Date().toISOString() };
  } catch (error) {
    console.error("Official ANGRAU feed:", error instanceof Error ? error.message : "Fetch failed");
    return { items: [] as UniversityUpdate[], unavailable: true, checkedAt: new Date().toISOString() };
  }
});