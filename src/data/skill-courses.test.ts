import { test } from "node:test";
import assert from "node:assert/strict";
import { SEMESTERS } from "./curriculum";
import { SKILL_COURSES, SKILL_MATERIAL_OPTIONS, semesterResourceCourses } from "./skill-courses";

test("SEC courses have exactly one material option", () => {
  assert.deepEqual(SKILL_MATERIAL_OPTIONS, ["Material Source"]);
});

test("all existing skill courses are collected on the SEC page", () => {
  assert.deepEqual(SKILL_COURSES.map((course) => course.name), [
    "Skill Enhancement Course-I",
    "Skill Enhancement Course-II",
    "Skill Enhancement Course-III",
    "Skill Enhancement Course-IV",
    "Skill Enhancement Course-V",
  ]);
});

test("every semester excludes SEC courses from internal resource options without removing other courses", () => {
  assert.equal(SEMESTERS.length, 8);
  for (const semester of SEMESTERS) {
    const courses = semesterResourceCourses(semester.courses);
    assert.equal(courses.some((course) => course.name.startsWith("Skill Enhancement Course")), false);
    assert.deepEqual(courses, semester.courses.filter((course) => !course.name.startsWith("Skill Enhancement Course")));
  }
});