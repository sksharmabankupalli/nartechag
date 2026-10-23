import { SEMESTERS, type Course } from "@/data/curriculum";

export const SKILL_MATERIAL_OPTIONS = ["Material Source"] as const;

export function isSkillEnhancementCourse(course: Course) {
  return course.name.startsWith("Skill Enhancement Course");
}

// Retain the curriculum's existing numbered entries until named courses arrive.
export const SKILL_COURSES = SEMESTERS.flatMap((semester) => semester.courses)
  .filter(isSkillEnhancementCourse)
  .map((course) => ({ ...course, name: course.name.replace(/\*$/, "") }));

export function semesterResourceCourses(courses: Course[]) {
  return courses;
}