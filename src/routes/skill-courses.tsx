import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { PageShell, PageHeader } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SKILL_COURSES, SKILL_MATERIAL_OPTIONS } from "@/data/skill-courses";

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
          {SKILL_COURSES.map((course) => (
            <AccordionItem key={course.name} value={course.name} className="rounded-xl border-2 border-border bg-card px-5 shadow-soft data-[state=open]:border-primary last:border-b-2">
              <AccordionTrigger className="py-5 text-left font-display text-lg font-semibold hover:no-underline">
                {course.name}
              </AccordionTrigger>
              <AccordionContent>
                <h2 className="text-sm font-medium">{SKILL_MATERIAL_OPTIONS[0]}</h2>
                <p className="mt-2 text-sm text-muted-foreground">Materials and links coming soon.</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </PageShell>
  );
}