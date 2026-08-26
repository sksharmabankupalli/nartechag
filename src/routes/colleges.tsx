import { createFileRoute } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { PageShell, PageHeader } from "@/components/page-shell";
import { Badge } from "@/components/ui/badge";
import { COLLEGES } from "@/data/colleges";

export const Route = createFileRoute("/colleges")({
  head: () => ({
    meta: [
      { title: "ANGRAU Agriculture Colleges List | NarTechAg" },
      {
        name: "description",
        content:
          "Government and affiliated agricultural colleges under ANGRAU offering B.Sc (Hons) Agriculture, with their locations.",
      },
      { property: "og:title", content: "ANGRAU Agriculture Colleges List | NarTechAg" },
      {
        property: "og:description",
        content: "Government and affiliated ANGRAU agricultural colleges and their locations.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CollegesPage,
});

function CollegesPage() {
  const groups = ["Government", "Affiliated"] as const;

  return (
    <PageShell>
      <PageHeader
        eyebrow="Where to study"
        title="Colleges"
        description="Agricultural colleges under ANGRAU offering the B.Sc (Hons) Agriculture programme."
      />
      <div className="mx-auto max-w-6xl space-y-10 px-4 py-12 sm:px-6">
        {groups.map((group) => (
          <section key={group}>
            <h2 className="text-2xl font-semibold sm:text-3xl">{group} Colleges</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {COLLEGES.filter((c) => c.category === group).map((c) => (
                <div
                  key={c.name}
                  className="rounded-2xl border border-border bg-card p-5 shadow-soft"
                >
                  <Badge variant={group === "Government" ? "secondary" : "outline"}>{group}</Badge>
                  <h3 className="mt-3 font-display text-lg font-semibold leading-snug">{c.name}</h3>
                  <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
                    {c.location}
                  </p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </PageShell>
  );
}
