import raw from "./online-courses.json";

export interface OnlineCourse {
  sno: number;
  platform: string;
  title: string;
  duration_hours: string;
  duration_weeks: string;
  credit_points: string;
  level: string;
  cost: string;
  exam_details: string;
  certificate_shows_credit: string;
  ncrf_equivalency: string;
  platform_register_url?: string;
}

export interface PlatformGroup {
  platform: string;
  courses: OnlineCourse[];
}

const byPlatform = raw as unknown as Record<string, OnlineCourse[]>;

/** Platforms sorted alphabetically (case-insensitive). */
export const PLATFORM_GROUPS: PlatformGroup[] = Object.entries(byPlatform)
  .map(([platform, courses]) => ({ platform, courses }))
  .sort((a, b) => a.platform.localeCompare(b.platform, undefined, { sensitivity: "base" }));

export const TOTAL_COURSES = PLATFORM_GROUPS.reduce((sum, g) => sum + g.courses.length, 0);
