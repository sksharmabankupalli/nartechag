import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Info, Search } from "lucide-react";
import { PageShell, PageHeader } from "@/components/page-shell";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PLATFORM_GROUPS, TOTAL_COURSES, type OnlineCourse } from "@/data/online-courses";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export const Route = createFileRoute("/online-courses")({
  head: () => ({
    meta: [
      { title: "ANGRAU Approved Online Courses | NarTechAg" },
      {
        name: "description",
        content:
          "486 ICAR/ANGRAU-approved online courses for credit equivalency under the ICAR VI Deans' Committee curriculum — browse by platform, search and compare credits.",
      },
      { property: "og:title", content: "ANGRAU Approved Online Courses | NarTechAg" },
      {
        property: "og:description",
        content:
          "The complete ANGRAU-approved list of online courses for credit equivalency, organised platform by platform.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OnlineCoursesPage,
});

function display(value: string | undefined | null) {
  const v = (value ?? "").toString().trim();
  return v === "" || v === "-" ? "—" : v;
}

function RegisterButton({ course, variant = "default" }: { course: OnlineCourse; variant?: "default" | "block" }) {
  const url = course.platform_register_url || "#";
  const helper = `You will be redirected to the official ${course.platform} website to register for this course.`;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Register for ${course.title} on ${course.platform}`}
      title={helper}
      className={cn(
        "inline-flex items-center justify-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-primary-foreground shadow-soft transition-all hover:scale-[1.03] hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        variant === "block" && "w-full py-2.5",
      )}
    >
      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
      Register
    </a>
  );
}

function CourseRow({ course }: { course: OnlineCourse }) {
  return (
    <TableRow>
      <TableCell className="w-12 text-muted-foreground tabular-nums">{course.sno}</TableCell>
      <TableCell className="min-w-64 font-medium">{course.title}</TableCell>
      <TableCell className="whitespace-nowrap">{display(course.duration_hours)}</TableCell>
      <TableCell className="whitespace-nowrap">{display(course.duration_weeks)}</TableCell>
      <TableCell className="text-center tabular-nums">{display(course.credit_points)}</TableCell>
      <TableCell className="whitespace-nowrap">{display(course.level)}</TableCell>
      <TableCell className="whitespace-nowrap">{display(course.cost)}</TableCell>
      <TableCell className="whitespace-nowrap">{display(course.exam_details)}</TableCell>
      <TableCell className="whitespace-nowrap">{display(course.certificate_shows_credit)}</TableCell>
      <TableCell className="text-center tabular-nums">{display(course.ncrf_equivalency)}</TableCell>
      <TableCell className="whitespace-nowrap">
        <RegisterButton course={course} />
      </TableCell>
    </TableRow>
  );
}

function CourseCard({ course }: { course: OnlineCourse }) {
  const fields: Array<[string, string]> = [
    ["Duration (Hours)", display(course.duration_hours)],
    ["Duration (Weeks)", display(course.duration_weeks)],
    ["Credit Points", display(course.credit_points)],
    ["Course Level", display(course.level)],
    ["Cost", display(course.cost)],
    ["Exam Details", display(course.exam_details)],
    ["Credit Info on Certificate", display(course.certificate_shows_credit)],
    ["NCrF Credit Equivalency", display(course.ncrf_equivalency)],
  ];
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <p className="text-xs text-muted-foreground tabular-nums">#{course.sno}</p>
      <p className="mt-0.5 font-medium leading-snug">{course.title}</p>
      <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
        {fields.map(([label, value]) => (
          <div key={label}>
            <dt className="text-xs text-muted-foreground">{label}</dt>
            <dd className="mt-0.5">{value}</dd>
          </div>
        ))}
      </dl>
      <RegisterButton course={course} variant="block" />
    </div>
  );
}

function OnlineCoursesPage() {
  const [query, setQuery] = useState("");
  const [activePlatform, setActivePlatform] = useState<string | null>(null);
  const [open, setOpen] = useState<string[]>([]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PLATFORM_GROUPS.map((g) => {
      if (activePlatform && g.platform !== activePlatform) {
        return { ...g, courses: [] as OnlineCourse[] };
      }
      const courses = q
        ? g.courses.filter(
            (c) =>
              c.title.toLowerCase().includes(q) || c.platform.toLowerCase().includes(q),
          )
        : g.courses;
      return { ...g, courses };
    }).filter((g) => g.courses.length > 0);
  }, [query, activePlatform]);

  const matchCount = filtered.reduce((sum, g) => sum + g.courses.length, 0);

  const jumpTo = (platform: string) => {
    setActivePlatform(platform);
    setOpen([platform]);
    requestAnimationFrame(() => {
      document.getElementById(`platform-${platform}`)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  return (
    <PageShell>
      <PageHeader
        eyebrow="Credit equivalency"
        title="ANGRAU Approved Online Courses"
        description={`${TOTAL_COURSES} approved online courses across ${PLATFORM_GROUPS.length} platforms, organised for the ICAR VI Deans' Committee curriculum.`}
      />

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex items-start gap-3 rounded-lg border border-primary/30 bg-accent p-4 text-sm">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
          <p className="text-accent-foreground/90">
            The following list of Online Courses has been approved by the Academic Council of ANGRAU
            (Ref: Proc. No. 1798(1)/Agril.Sci./A3/2026) for credit equivalency under the ICAR VI
            Deans' Committee curriculum. Students must verify course details, fee structure, and
            credit equivalency with their college's Nodal Officer before registration, as details
            are subject to revision by the respective platforms.
          </p>
        </div>

        {/* Search */}
        <div className="relative mt-8">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by course title or platform…"
            className="pl-9"
            aria-label="Search courses"
          />
        </div>

        {/* Platform filter chips */}
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={() => setActivePlatform(null)}
            className={cn(
              "rounded-full border border-border px-3 py-1 text-xs font-medium transition-colors",
              activePlatform === null
                ? "bg-primary text-primary-foreground"
                : "bg-card text-muted-foreground hover:bg-accent hover:text-accent-foreground",
            )}
          >
            All platforms
          </button>
          {PLATFORM_GROUPS.map((g) => (
            <button
              key={g.platform}
              onClick={() => jumpTo(g.platform)}
              className={cn(
                "rounded-full border border-border px-3 py-1 text-xs font-medium transition-colors",
                activePlatform === g.platform
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              )}
            >
              {g.platform}
            </button>
          ))}
        </div>

        <p className="mt-4 text-sm text-muted-foreground">
          Showing {matchCount} of {TOTAL_COURSES} courses across {filtered.length} platform
          {filtered.length === 1 ? "" : "s"}.
        </p>

        {/* Platform sections */}
        <Accordion
          type="multiple"
          value={open}
          onValueChange={setOpen}
          className="mt-6 space-y-3"
        >
          {filtered.map((g) => (
            <AccordionItem
              key={g.platform}
              value={g.platform}
              id={`platform-${g.platform}`}
              className="scroll-mt-24 overflow-hidden rounded-xl border border-border bg-card shadow-soft"
            >
              <AccordionTrigger className="px-5 py-5 hover:no-underline">
                <div className="flex flex-1 flex-wrap items-center gap-3 pr-3 text-left">
                  <span className="border-b-2 border-primary pb-1 font-display text-lg font-semibold">
                    {g.platform}
                  </span>
                  <Badge variant="secondary">
                    {g.courses.length} course{g.courses.length === 1 ? "" : "s"}
                  </Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-6">
                {/* Desktop table */}
                <div className="hidden overflow-x-auto md:block">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">S.No</TableHead>
                        <TableHead>Course Title</TableHead>
                        <TableHead>Duration (Hours)</TableHead>
                        <TableHead>Duration (Weeks)</TableHead>
                        <TableHead className="text-center">Credit Points</TableHead>
                        <TableHead>Course Level</TableHead>
                        <TableHead>Cost</TableHead>
                        <TableHead>Exam Details</TableHead>
                        <TableHead>Credit Info on Certificate</TableHead>
                        <TableHead className="text-center">NCrF Credit Equivalency</TableHead>
                        <TableHead className="text-center">Register</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {g.courses.map((c) => (
                        <CourseRow key={`${g.platform}-${c.sno}`} course={c} />
                      ))}
                    </TableBody>
                  </Table>
                </div>
                {/* Mobile stacked cards */}
                <div className="space-y-3 md:hidden">
                  {g.courses.map((c) => (
                    <CourseCard key={`${g.platform}-${c.sno}`} course={c} />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {filtered.length === 0 && (
          <p className="mt-6 rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
            No courses match your search.
          </p>
        )}

        <div className="mt-10 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          <p>Last updated: July 2026</p>
          <p className="mt-1">
            Official circular PDF will be available here for download once published.
          </p>
        </div>
      </div>
    </PageShell>
  );
}
