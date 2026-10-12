export const UPDATE_CATEGORIES = ["Admissions", "Exams", "Results", "Notifications", "Events"] as const;
export type UpdateCategory = (typeof UPDATE_CATEGORIES)[number];
export type UniversityUpdate = {
  id: string;
  title: string;
  summary: string;
  url: string;
  date: string | null;
  category: UpdateCategory;
};

export function categorizeUpdate(title: string): UpdateCategory {
  if (/result|merit list|rank list/i.test(title)) return "Results";
  if (/admission|application|registration|counsell|web.?options|agricet/i.test(title)) return "Admissions";
  if (/exam|timetable|time table|academic calendar/i.test(title)) return "Exams";
  if (/convocation|award|event|conference|workshop|anniversary/i.test(title)) return "Events";
  return "Notifications";
}

export function isRecentUpdate(date: string | null, now: number): boolean {
  if (!date) return false;
  const age = now - new Date(date).getTime();
  return age >= 0 && age <= 7 * 24 * 60 * 60 * 1000;
}

export function sortUpdates(updates: UniversityUpdate[]): UniversityUpdate[] {
  return [...updates].sort((a, b) => (b.date ? Date.parse(b.date) : 0) - (a.date ? Date.parse(a.date) : 0));
}