import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { UniversityCalendar } from "@/components/university-calendar";

export const Route = createFileRoute("/updates")({
  head: () => ({ meta: [
    { title: "ANGRAU Updates & ANGRAU Calendar 2026 | NarTechAg" },
    { name: "description", content: "The ANGRAU 2026 university calendar: holidays, optional holidays, special events and key dates for B.Sc (Hons) Agriculture students." },
    { property: "og:title", content: "ANGRAU Updates & ANGRAU Calendar 2026 | NarTechAg" },
    { property: "og:description", content: "Browse and download the ANGRAU 2026 holiday and event calendar with a timeline of key university dates." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: UpdatesPage,
  errorComponent: () => <PageShell><div className="mx-auto max-w-6xl px-4 py-12"><h1 className="text-3xl">ANGRAU Calendar</h1><UniversityCalendar /></div></PageShell>,
  notFoundComponent: () => <PageShell><p className="p-8">University page not found.</p></PageShell>,
});

function UpdatesPage() {
  return (
    <PageShell>
      <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 sm:pt-14">
        <p className="text-sm font-semibold text-primary">ACHARYA N. G. RANGA AGRICULTURAL UNIVERSITY</p>
        <h1 className="mt-3 text-3xl sm:text-4xl">ANGRAU Updates</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">The university’s 2026 holiday and event calendar.</p>
      </div>
      <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <UniversityCalendar />
      </div>
    </PageShell>
  );
}
