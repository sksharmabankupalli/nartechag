import { SEMESTERS, type Course } from "@/data/curriculum";
import postHarvestAsset from "@/assets/POST_HARVEST_TECHNOLOGY_1-16_NARTECHAG.APP.pdf.asset.json";

export const SKILL_MATERIAL_OPTIONS = ["Material Source"] as const;

export function isSkillEnhancementCourse(course: Course) {
  return course.name.startsWith("Skill Enhancement Course");
}

// Preserve semester placement; common-page-only uploads need no assumed semester.
const semesterSkillCourses = SEMESTERS.flatMap((semester) => semester.courses)
  .filter(isSkillEnhancementCourse)
  .map((course) => ({ ...course, name: course.name.replace(/\*$/, "") }));

export const SKILL_COURSES: Course[] = [
  ...semesterSkillCourses,
  { code: "SEC VI", name: "Post Harvest Technology", credits: "2(0+2)" },
];

export const SKILL_MATERIALS: Record<string, {
  url: string;
  filename: string;
  lectureStart: number;
  lectureEnd: number;
  coverage: "up to mid";
}> = {
  "SEC VI": {
    url: postHarvestAsset.url,
    filename: postHarvestAsset.original_filename,
    lectureStart: 1,
    lectureEnd: 16,
    coverage: "up to mid",
  },
};

export function semesterResourceCourses(courses: Course[]) {
  return courses;
}