import { createFileRoute, useNavigate, type SearchSchemaInput } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { ArrowDown, ArrowUpRight, Search, X, Bell, CalendarDays, ExternalLink } from "lucide-react";
import { useState } from "react";
import { PageShell } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { UniversityCalendar } from "@/components/university-calendar";
import { supabase } from "@/integrations/supabase/client";
import { getOfficialUpdates } from "@/lib/university-updates.functions";
import { UPDATE_CATEGORIES, categorizeUpdate, isRecentUpdate, sortUpdates, type UniversityUpdate } from "@/lib/university-updates";

const updatesQuery = queryOptions({
  queryKey: ["university-updates"],
  staleTime: 5 * 60 * 1000,
  queryFn: async () => {
    const [official, saved] = await Promise.all([
      getOfficialUpdates(),
      supabase.from("angrau_updates").select("id, title, description, link, update_date").order("update_date", { ascending: false }),
    ]);
    const existing: UniversityUpdate[] = (saved.data ?? []).filter((item) => !item.title.startsWith("Sample Update — Replace via Admin Panel")).map((item) => ({
      id: item.id, title: item.title, summary: item.description ?? "University announcement published on NarTechAg.",
      url: item.link ?? "https://angrau.ac.in/", date: item.update_date, category: categorizeUpdate(item.title),
    }));
    const seen = new Set(official.items.map((item) => item.title.toLowerCase()));
    return { ...official, items: sortUpdates([...official.items, ...existing.filter((item) => !seen.has(item.title.toLowerCase()))]) };
  },
});

export const Route = createFileRoute("/updates")({
  validateSearch: (search: SearchSchemaInput & { q?: string; category?: string; count?: number }) => ({
    q: typeof search.q === "string" ? search.q : "",
    category: UPDATE_CATEGORIES.find((category) => category === search.category) ?? "All",
    count: Math.max(6, Math.min(300, Number(search.count) || 6)),
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(updatesQuery),
  head: () => ({ meta: [
    { title: "ANGRAU University Updates & 2026 Calendar | NarTechAg" },
    { name: "description", content: "Official ANGRAU announcements, admissions, examinations, results and the 2026 university calendar." },
    { property: "og:title", content: "ANGRAU University Updates & 2026 Calendar | NarTechAg" },
    { property: "og:description", content: "Latest university announcements and the ANGRAU 2026 holiday and event calendar." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: UpdatesPage,
  errorComponent: () => <PageShell><div className="mx-auto max-w-6xl px-4 py-12"><h1 className="text-3xl">ANGRAU Updates</h1><FeedFallback /><UniversityCalendar /></div></PageShell>,
  notFoundComponent: () => <PageShell><p className="p-8">University page not found.</p></PageShell>,
});

function FeedFallback() {
  return <div role="status" className="my-6 rounded-xl border border-border bg-muted p-6"><h3 className="text-base">The latest announcements are temporarily unavailable.</h3><p className="mt-2 text-sm text-muted-foreground">Please check the official ANGRAU website for current notices.</p><Button asChild variant="link" className="mt-2 h-auto p-0"><a href="https://angrau.ac.in/" target="_blank" rel="noopener noreferrer">Visit ANGRAU <ExternalLink /></a></Button></div>;
}

function UpdatesPage() {
  const { data } = useSuspenseQuery(updatesQuery);
  const { q, category, count } = Route.useSearch();
  const navigate = useNavigate({ from: "/updates" });
  const [section, setSection] = useState("latest-updates");
  const items = data.items.filter((item) => (category === "All" || item.category === category) && `${item.title} ${item.summary}`.toLowerCase().includes(q.trim().toLowerCase()));
  function scrollTo(id: string) {
    setSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }
  return (
    <PageShell>
      <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 sm:pt-14">
        <p className="text-sm font-semibold text-primary">ACHARYA N. G. RANGA AGRICULTURAL UNIVERSITY</p>
        <h1 className="mt-3 text-3xl sm:text-4xl">ANGRAU Updates</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">University announcements, academic notices and your 2026 calendar.</p>
      </div>
      <nav aria-label="University sections" className="sticky top-[72px] z-30 mt-7 border-y border-border bg-card shadow-soft">
        <div className="mx-auto flex max-w-6xl gap-2 px-4 py-3 sm:px-6">
          <Button variant={section === "latest-updates" ? "default" : "ghost"} onClick={() => scrollTo("latest-updates")}><Bell />Latest updates</Button>
          <Button variant={section === "academic-calendar" ? "default" : "ghost"} onClick={() => scrollTo("academic-calendar")}><CalendarDays />Calendar</Button>
        </div>
      </nav>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <section id="latest-updates" className="university-section py-10 sm:py-12">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
            <h2 className="min-w-0 text-2xl sm:text-3xl">Latest updates</h2>
            <a href="https://angrau.ac.in/" target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-primary hover:underline">ANGRAU <ArrowUpRight className="size-4" /></a>
          </div>
          <div className="relative mt-6 max-w-xl">
            <Search className="absolute left-3 top-3.5 size-5 text-muted-foreground" aria-hidden="true" />
            <input aria-label="Search university announcements" type="search" value={q} placeholder="Search announcements…" className="h-12 w-full border border-input bg-card pl-10 pr-11 text-base outline-none focus-visible:ring-2 focus-visible:ring-ring" onChange={(e) => void navigate({ search: (prev) => ({ ...prev, q: e.target.value, count: 6 }), replace: true, resetScroll: false })} />
            {q && <Button variant="ghost" size="icon" className="absolute right-1 top-1.5" aria-label="Clear announcement search" onClick={() => void navigate({ search: (prev) => ({ ...prev, q: "", count: 6 }), replace: true, resetScroll: false })}><X /></Button>}
          </div>
          <div className="mt-4 flex flex-wrap gap-2" aria-label="Announcement categories">
            {["All", ...UPDATE_CATEGORIES].map((value) => <Button key={value} size="sm" variant={category === value ? "default" : "outline"} aria-pressed={category === value} onClick={() => void navigate({ search: (prev) => ({ ...prev, category: value, count: 6 }), resetScroll: false })}>{value}</Button>)}
          </div>
          {data.unavailable && <FeedFallback />}
          {!data.unavailable && <p className="mt-5 text-xs text-muted-foreground">Official ANGRAU notices · Dated items newest first; undated notices retain the official website’s order. Publication dates are shown only when provided.</p>}
          <p className="mt-4 text-sm text-muted-foreground" role="status">{items.length} {items.length === 1 ? "announcement" : "announcements"}{category !== "All" ? ` · ${category}` : ""}</p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {items.slice(0, count).map((item) => (
              <article key={item.id} className="flex min-w-0 flex-col rounded-xl border border-border bg-card p-5 shadow-soft sm:p-6">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="font-semibold text-primary">{item.category}</span>
                  {isRecentUpdate(item.date, Date.parse(data.checkedAt)) && <span className="rounded bg-primary px-2 py-0.5 font-bold text-primary-foreground">NEW</span>}
                  {item.date ? <time dateTime={item.date} className="ml-auto text-muted-foreground">{new Date(item.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" })}</time> : <span className="ml-auto text-muted-foreground">Date not published</span>}
                </div>
                <h3 className="mt-4 break-words text-lg leading-relaxed">{item.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{item.summary}</p>
                <Button asChild variant="link" className="mt-auto h-auto justify-start self-start px-0 pt-5"><a href={/^https?:\/\//i.test(item.url) ? item.url : "https://angrau.ac.in/"} target="_blank" rel="noopener noreferrer" aria-label={`Read more: ${item.title}`}>Read more <ArrowUpRight /></a></Button>
              </article>
            ))}
          </div>
          {items.length === 0 && !data.unavailable && <div className="mt-5 border-y border-border py-10 text-center"><p className="font-medium">No matching announcements</p><p className="mt-2 text-sm text-muted-foreground">{q || category !== "All" ? "Try a different search or category." : "Check the official ANGRAU website for current notices."}</p></div>}
          {items.length > count && <div className="mt-7 text-center"><Button variant="outline" onClick={() => void navigate({ search: (prev) => ({ ...prev, count: prev.count + 6 }), resetScroll: false })}>Load more <ArrowDown /></Button></div>}
        </section>
        <UniversityCalendar />
      </div>
    </PageShell>
  );
}