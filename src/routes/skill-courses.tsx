import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Download, Eye } from "lucide-react";
import { PageShell, PageHeader } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SKILL_COURSES, SKILL_MATERIAL_OPTIONS, SKILL_MATERIALS } from "@/data/skill-courses";

export const Route = createFileRoute("/skill-courses")({
  head: () => ({
    meta: [
      { title: "Skill Enhancment Courses (SEC) | NarTechAg" },
      { name: "description", content: "Skill enhancement courses and material sources for NarTechAg agriculture students." },
      { property: "og:title", content: "Skill Enhancment Courses (SEC) | NarTechAg" },
      { property: "og:description", content: "Find all skill enhancement course materials together on NarTechAg." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SkillCoursesPage,
});

function SkillCoursesPage() {
  return (
    <PageShell>
      <PageHeader title="Skill Enhancment Courses (SEC)" />
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <Button asChild variant="outline" className="mb-6">
          <Link to="/semesters"><ArrowLeft aria-hidden="true" />Semesters</Link>
        </Button>
        <Accordion type="multiple" className="space-y-4">
          {SKILL_COURSES.map((course) => {
            const material = SKILL_MATERIALS[course.code];
            return (
            <AccordionItem key={course.name} value={course.name} className="rounded-xl border-2 border-border bg-card px-5 shadow-soft data-[state=open]:border-primary last:border-b-2">
              <AccordionTrigger className="py-5 text-left font-display text-lg font-semibold hover:no-underline">
                <span className="min-w-0 break-words">
                  {course.name}
                  {course.code !== "—" && <span className="text-primary"> — Course Code ({course.code})</span>}
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <h2 className="text-sm font-medium">{SKILL_MATERIAL_OPTIONS[0]}</h2>
                {material ? (
                  <div className="mt-3 space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Lectures {material.lectureStart}–{material.lectureEnd} ({material.coverage})
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Button asChild size="sm">
                        <a href={material.url} target="_blank" rel="noopener noreferrer" aria-label={`View ${course.name} PDF`}>
                          <Eye aria-hidden="true" />View
                        </a>
                      </Button>
                      <Button asChild size="sm">
                        <a href={material.url} download={material.filename} aria-label={`Download ${course.name} PDF`}>
                          <Download aria-hidden="true" />Download
                        </a>
                      </Button>
                    </div>
                  </div>
                ) : <p className="mt-2 text-sm text-muted-foreground">Materials and links coming soon.</p>}
              </AccordionContent>
            </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </PageShell>
  );
}