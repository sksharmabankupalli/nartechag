import { test } from "node:test";
import assert from "node:assert/strict";
import { SEMESTERS } from "./curriculum";
import { SKILL_COURSES, SKILL_MATERIAL_OPTIONS, SKILL_MATERIALS, semesterResourceCourses } from "./skill-courses";

test("SEC courses have exactly one material option", () => {
  assert.deepEqual(SKILL_MATERIAL_OPTIONS, ["Material Source"]);
});

test("SEC I is Post Harvest Technology, followed by the remaining skill courses", () => {
  assert.deepEqual(SKILL_COURSES.map((course) => course.name), [
    "Post Harvest Technology",
    "Skill Enhancement Course-II",
    "Skill Enhancement Course-III",
    "Skill Enhancement Course-IV",
    "Skill Enhancement Course-V",
  ]);
});

test("Post Harvest Technology is SEC I with lectures 1–16 up to mid", () => {
  const course = SKILL_COURSES.find((entry) => entry.code === "SEC I");
  assert.equal(course?.name, "Post Harvest Technology");
  assert.equal(SKILL_COURSES.some((entry) => entry.code === "SEC VI"), false);
  const material = SKILL_MATERIALS["SEC I"];
  assert.equal(material?.lectureStart, 1);
  assert.equal(material?.lectureEnd, 16);
  assert.equal(material?.coverage, "up to mid");
  assert.ok(material?.url.endsWith("/POST_HARVEST_TECHNOLOGY_1-16_NARTECHAG.APP.pdf"));
});

test("skill courses stay in their respective semesters alongside all other courses", () => {
  assert.equal(SEMESTERS.length, 8);
  assert.deepEqual(SEMESTERS.map((semester) =>
    semesterResourceCourses(semester.courses)
      .filter((course) => course.name.startsWith("Skill Enhancement Course"))
      .map((course) => course.name.replace(/\*$/, "")),
  ), [
    ["Skill Enhancement Course-I", "Skill Enhancement Course-II"],
    ["Skill Enhancement Course-III", "Skill Enhancement Course-IV"],
    ["Skill Enhancement Course-V"], [], [], [], [], [],
  ]);
  for (const semester of SEMESTERS) {
    const courses = semesterResourceCourses(semester.courses);
    assert.deepEqual(courses, semester.courses);
  }
});
