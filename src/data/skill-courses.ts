import { SEMESTERS, type Course } from "@/data/curriculum";
import postHarvestAsset from "@/assets/POST_HARVEST_TECHNOLOGY_1-16_NARTECHAG.APP.pdf.asset.json";
import organicProductionAsset from "@/assets/ORGANIC_PRODUCTION_TECHNOLOGY_1-16_LEC_NARTECHAG.APP.pdf.asset.json";

export const SKILL_MATERIAL_OPTIONS = ["Material Source"] as const;

export function isSkillEnhancementCourse(course: Course) {
  return course.name.startsWith("Skill Enhancement Course");
}

// SEC I is Post Harvest Technology and SEC II is Organic Production Technology; the
// remaining skill courses stay placeholders until their materials arrive. Semester
// pages keep every course in its own semester.
const SEC_I: Course = { code: "SEC I", name: "Post Harvest Technology", credits: "2(0+2)" };
const SEC_II: Course = { code: "SEC II", name: "Organic Production Technology", credits: "2(0+2)" };

const SEC_NAMED: Record<string, Course> = {
  "Skill Enhancement Course-I": SEC_I,
  "Skill Enhancement Course-II": SEC_II,
};

// Preserve semester placement; common-page-only uploads need no assumed semester.
const semesterSkillCourses = SEMESTERS.flatMap((semester) => semester.courses)
  .filter(isSkillEnhancementCourse)
  .map((course) => ({ ...course, name: course.name.replace(/\*$/, "") }))
  .map((course) => SEC_NAMED[course.name] ?? course);

export const SKILL_COURSES: Course[] = semesterSkillCourses;

export const SKILL_MATERIALS: Record<string, {
  url: string;
  filename: string;
  lectureStart: number;
  lectureEnd: number;
  coverage: "up to mid";
}> = {
  "SEC I": {
    url: postHarvestAsset.url,
    filename: postHarvestAsset.original_filename,
    lectureStart: 1,
    lectureEnd: 16,
    coverage: "up to mid",
  },
  "SEC II": {
    url: organicProductionAsset.url,
    filename: organicProductionAsset.original_filename,
    lectureStart: 1,
    lectureEnd: 16,
    coverage: "up to mid",
  },
};

export function semesterResourceCourses(courses: Course[]) {
  return courses;
}
