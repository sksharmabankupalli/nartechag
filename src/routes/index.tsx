import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, GraduationCap, Info, Layers, Newspaper } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PROGRAM_TOTALS, SEMESTERS } from "@/data/curriculum";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NarTechAg — Study Hub for B.Sc (Hons) Agriculture" },
      {
        name: "description",
        content:
          "One stop for all your study needs. Course structure, credits, semester resources, ANGRAU updates and college listings for B.Sc (Hons) Agriculture students.",
      },
      { property: "og:title", content: "NarTechAg — Study Hub for B.Sc (Hons) Agriculture" },
      {
        property: "og:description",
        content:
          "Course structure, credits, semester-wise resources and ANGRAU updates for agriculture students, in one organised place.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const HIGHLIGHTS = [
  {
    icon: Layers,
    title: "8 semesters, organised",
    body: "Every course and credit value laid out year by year, so nothing gets lost.",
  },
  {
    icon: Newspaper,
    title: "ANGRAU updates",
    body: "Notifications, calendars and announcements collected in one chronological feed.",
  },
  {
    icon: BookOpen,
    title: "Resources by course",
    body: "Notes, PDFs and links filed under the exact course they belong to.",
  },
];

function Home() {
  return (
    <PageShell>
      <section className="surface-field border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
          <Badge variant="secondary" className="mb-5">
            B.Sc (Hons) Agriculture · ANGRAU
          </Badge>
          <h1 className="max-w-3xl text-4xl font-semibold leading-[1.08] sm:text-5xl lg:text-6xl">
            <span className="text-gradient-crop">NarTechAg</span>
            <span className="block text-foreground">One stop for all your study needs.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            Study material for the agriculture degree is scattered across groups, drives and notice
            boards. NarTechAg gathers the course structure, semester resources and university updates
            into one calm, organised study hub.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/semesters">Browse semesters</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/updates">See ANGRAU updates</Link>
            </Button>
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <a
                href="https://eps.eshiksa.net/DirectFeesv3/NGRanga/"
                target="_blank"
                rel="noopener noreferrer"
              >
                ANGRAU Students Semester Fee Registration
              </a>
            </Button>
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <a
                href="http://eps.eshiksa.net/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Payment Receipt Download
              </a>
            </Button>
          </div>

          <div className="mt-5 flex max-w-2xl items-start gap-3 rounded-lg border border-border bg-secondary/60 p-4">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" aria-hidden="true" />
            <div className="text-sm text-muted-foreground">
              <p className="font-medium text-foreground">Login Instructions:</p>
              <p className="mt-1">
                Username: Your ID Number (format: NA/2024-YourID)
                <br />
                Password: 12345
                <br />
                Enter the captcha as shown, then navigate to Transaction Details to download your
                receipt.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-5 sm:grid-cols-3">
          {HIGHLIGHTS.map((h) => (
            <div key={h.title} className="rounded-xl border border-border bg-card p-6 shadow-soft">
              <h.icon className="h-6 w-6 text-primary" aria-hidden="true" />
              <h3 className="mt-4 text-lg font-semibold">{h.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{h.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-6 sm:px-6">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-soft sm:p-10">
          <div className="flex items-start gap-3">
            <GraduationCap className="mt-1 h-6 w-6 shrink-0 text-primary" aria-hidden="true" />
            <div>
              <h2 className="text-2xl font-semibold sm:text-3xl">
                The B.Sc (Hons) Agriculture programme
              </h2>
              <p className="mt-3 max-w-3xl text-muted-foreground">
                A four-year degree divided into eight semesters, grouped into four academic years.
                The 1st Year covers Semesters 1 and 2, the 2nd Year covers Semesters 3 and 4, the 3rd
                Year covers Semesters 5 and 6, and the Final Year covers Semesters 7 and 8 — ending
                with electives and the Student READY experiential learning programme.
              </p>
            </div>
          </div>

          <dl className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-secondary/60 p-5">
              <dt className="text-sm text-muted-foreground">Core credits (Sem I–VIII)</dt>
              <dd className="mt-1 font-display text-3xl font-semibold text-primary">
                {PROGRAM_TOTALS.coreCredits}
              </dd>
            </div>
            <div className="rounded-xl border border-border bg-secondary/60 p-5">
              <dt className="text-sm text-muted-foreground">Online course credits</dt>
              <dd className="mt-1 font-display text-3xl font-semibold text-primary">
                {PROGRAM_TOTALS.onlineCredits}
              </dd>
            </div>
            <div className="rounded-xl border border-primary/30 bg-accent p-5">
              <dt className="text-sm text-accent-foreground/80">Grand total</dt>
              <dd className="mt-1 font-display text-3xl font-semibold text-accent-foreground">
                {PROGRAM_TOTALS.grandTotal}
              </dd>
            </div>
          </dl>
          <p className="mt-3 text-xs text-muted-foreground">
            * Online courses account for 10 credits over the programme.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <h2 className="text-2xl font-semibold sm:text-3xl">Semester-wise course structure</h2>
        <p className="mt-2 text-muted-foreground">
          Expand any semester to see its courses and credit values.
        </p>

        <Accordion type="multiple" className="mt-6 space-y-3">
          {SEMESTERS.map((sem) => (
            <AccordionItem
              key={sem.number}
              value={`sem-${sem.number}`}
              className="overflow-hidden rounded-xl border border-border bg-card px-5 shadow-soft"
            >
              <AccordionTrigger className="py-5 hover:no-underline">
                <div className="flex flex-1 flex-wrap items-center justify-between gap-3 pr-3 text-left">
                  <span className="font-display text-lg font-semibold">
                    Semester {sem.roman}
                    <span className="ml-2 text-sm font-normal text-muted-foreground">
                      {sem.yearLabel}
                    </span>
                  </span>
                  <Badge variant={sem.total ? "secondary" : "outline"}>
                    {sem.total ? `Total: ${sem.total} credits` : "Content coming soon"}
                  </Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                {sem.courses.length === 0 ? (
                  <p className="rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                    Content coming soon — this semester's course list will be added shortly.
                  </p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">#</TableHead>
                        <TableHead>Course</TableHead>
                        <TableHead className="w-40 text-right">Credits</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sem.courses.map((course, i) => (
                        <TableRow key={course.name}>
                          <TableCell className="text-muted-foreground">{i + 1}</TableCell>
                          <TableCell className="font-medium">
                            {course.name}
                            {course.note && (
                              <span className="ml-2 text-xs font-normal text-muted-foreground">
                                ({course.note})
                              </span>
                            )}
                          </TableCell>
                          <TableCell className="text-right tabular-nums">{course.credits}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </PageShell>
  );
}
