import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ExternalLink, FileText } from "lucide-react";
import { PageShell, PageHeader } from "@/components/page-shell";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RESOURCE_CATEGORIES, YEARS, type Semester } from "@/data/curriculum";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/semesters")({
  head: () => ({
    meta: [
      { title: "Semesters & Course Resources | NarTechAg" },
      {
        name: "description",
        content:
          "Browse B.Sc (Hons) Agriculture study resources by year and semester — every course has its own section for notes, PDFs and links.",
      },
      { property: "og:title", content: "Semesters & Course Resources | NarTechAg" },
      {
        property: "og:description",
        content:
          "Year-wise and semester-wise course structure with space for notes, PDFs and links under each course.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SemestersPage,
});

type Resource = {
  id: string;
  semester: number;
  course_name: string;
  title: string;
  resource_type: string;
  url: string | null;
};

function SemestersPage() {
  // Resources are uploaded by the site owner through the admin panel and are
  // tagged Year -> Semester -> Course, so they slot straight into these cards.
  const { data: resources = [] } = useQuery({
    queryKey: ["resources"],
    queryFn: async (): Promise<Resource[]> => {
      const { data, error } = await supabase
        .from("resources")
        .select("id, semester, course_name, title, resource_type, url")
        .order("created_at", { ascending: true });
      if (error) throw error;
      return data ?? [];
    },
  });

  const resourcesFor = (semester: number, course: string) =>
    resources.filter((r) => r.semester === semester && r.course_name === course);

  return (
    <PageShell>
      <PageHeader
        eyebrow="Study material"
        title="Semesters"
        description="Pick your year, then your semester. Each course has its own space for notes, PDFs and links."
      />

      <div className="mx-auto max-w-6xl space-y-10 px-4 py-12 sm:px-6">
        {YEARS.map((y) => (
          <section key={y.year} id={`year-${y.year}`} className="scroll-mt-24">
            <div className="flex items-baseline gap-3">
              <h2 className="text-2xl font-semibold sm:text-3xl">{y.label}</h2>
              <span className="text-sm text-muted-foreground">
                Semester {y.semesters.map((s) => s.number).join(" & ")}
              </span>
            </div>

            <div className="mt-5 grid gap-5 lg:grid-cols-2">
              {y.semesters.map((sem) => (
                <SemesterCard key={sem.number} semester={sem} resourcesFor={resourcesFor} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </PageShell>
  );
}

function SemesterCard({
  semester,
  resourcesFor,
}: {
  semester: Semester;
  resourcesFor: (semester: number, course: string) => Resource[];
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-display text-xl font-semibold">Semester {semester.roman}</h3>
        <Badge variant={semester.total ? "secondary" : "outline"}>
          {semester.total ? `${semester.total} credits` : "Content coming soon"}
        </Badge>
      </div>

      {semester.courses.length === 0 ? (
        <p className="mt-5 rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
          Content coming soon — courses and resources for this semester will be added shortly.
        </p>
      ) : (
        <Accordion type="multiple" className="mt-4">
          {semester.courses.map((course) => {
            const items = resourcesFor(semester.number, course.name);
            return (
              <AccordionItem key={course.name} value={course.name} className="border-border">
                <AccordionTrigger className="py-3.5 text-left text-sm font-medium hover:no-underline">
                  <span className="pr-3">{course.name}</span>
                </AccordionTrigger>
                <AccordionContent>
                  {semester.year === 4 ? (
                    items.length === 0 ? (
                      <p className="rounded-lg bg-muted px-4 py-3 text-sm text-muted-foreground">
                        Resources coming soon.
                      </p>
                    ) : (
                      <ul className="space-y-2">
                        {items.map((r) => (
                          <ResourceRow key={r.id} resource={r} />
                        ))}
                      </ul>

                    )
                  ) : (
                    <div className="space-y-2.5">
                      {RESOURCE_CATEGORIES.map((cat) => {
                        const catItems = items.filter(
                          (r) => (r.resource_type ?? "") === cat.key,
                        );
                        return (
                          <div
                            key={cat.key}
                            className="rounded-lg border border-border px-3 py-2.5"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-sm font-medium">{cat.label}</span>
                              <Badge variant="outline" className="text-xs">
                                {catItems.length}
                              </Badge>
                            </div>
                            {catItems.length === 0 ? (
                              <p className="mt-1.5 text-xs text-muted-foreground">
                                Coming soon.
                              </p>
                            ) : (
                               <ul className="mt-2 space-y-1.5">
                                 {catItems.map((r) => (
                                   <ResourceRow key={r.id} resource={r} />
                                 ))}
                               </ul>

                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      )}
    </div>
  );
}
