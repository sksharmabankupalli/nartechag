import { useState } from "react";
import { Download, ExternalLink, Minus, Plus, RotateCcw, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import calendar from "@/assets/ANGRAU_2026_Agricultural_University_Calendar.png.asset.json";

const DATES = [
  { date: "2026-01-14", label: "Bhogi", type: "Holiday" },
  { date: "2026-01-15", label: "Makara Sankranti", type: "Holiday" },
  { date: "2026-01-26", label: "Republic Day", type: "Holiday" },
  { date: "2026-03-19", label: "Ugadi", type: "Holiday" },
  { date: "2026-04-14", label: "Dr. B. R. Ambedkar’s Birthday", type: "Holiday" },
  { date: "2026-08-15", label: "Independence Day", type: "Holiday" },
  { date: "2026-10-20", label: "Vijaya Dasami", type: "Holiday" },
  { date: "2026-11-07", label: "Acharya N. G. Ranga Birth Anniversary", type: "University event" },
  { date: "2026-11-08", label: "Deepavali", type: "Holiday" },
  { date: "2026-12-03", label: "Agricultural Education Day", type: "University event" },
  { date: "2026-12-25", label: "Christmas", type: "Holiday" },
];

export function UniversityCalendar() {
  const [zoom, setZoom] = useState(100);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState("");
  async function download() {
    setDownloading(true);
    setError("");
    try {
      const response = await fetch(calendar.url);
      if (!response.ok) throw new Error("Download failed");
      const url = URL.createObjectURL(await response.blob());
      const link = document.createElement("a");
      link.href = url;
      link.download = "ANGRAU-2026-University-Calendar.png";
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch {
      setError("The download couldn’t start. Open the full calendar to save a copy.");
    } finally {
      setDownloading(false);
    }
  }
  return (
    <section id="academic-calendar" className="university-section border-t border-border py-12 sm:py-16">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-primary">UNIVERSITY YEAR · 2026</p>
          <h2 className="mt-2 text-2xl sm:text-3xl">Academic calendar</h2>
          <p className="mt-3 text-muted-foreground">ANGRAU holidays and special events for 2026.</p>
        </div>
        <CalendarDays className="mt-2 size-8 shrink-0 text-primary" aria-hidden="true" />
      </div>
      <div className="mt-7 grid items-start gap-8 lg:grid-cols-[minmax(0,1.8fr)_minmax(0,1fr)]">
        <div className="min-w-0">
          <div className="overflow-hidden rounded-xl border border-border bg-card shadow-soft">
            <div className="flex items-center justify-between gap-2 border-b border-border px-3 py-2">
              <span className="text-sm font-medium">2026 calendar</span>
              <div className="flex shrink-0 items-center gap-1">
                <Button variant="ghost" size="icon" title="Zoom out" aria-label="Zoom out calendar" disabled={zoom <= 100} onClick={() => setZoom(zoom - 25)}><Minus /></Button>
                <span className="w-12 text-center text-xs tabular-nums" aria-live="polite">{zoom}%</span>
                <Button variant="ghost" size="icon" title="Zoom in" aria-label="Zoom in calendar" disabled={zoom >= 250} onClick={() => setZoom(zoom + 25)}><Plus /></Button>
                <Button variant="ghost" size="icon" title="Reset zoom" aria-label="Reset calendar zoom" onClick={() => setZoom(100)}><RotateCcw /></Button>
              </div>
            </div>
            <div className={`calendar-viewport calendar-zoom-${zoom} overflow-auto`} tabIndex={0} aria-label="University calendar image viewer">
              <img src={calendar.url} alt="Acharya N. G. Ranga Agricultural University 2026 calendar with monthly dates, general holidays, optional holidays and special events" className="calendar-image block max-w-none" width="950" height="768" />
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button onClick={() => void download()} disabled={downloading}><Download />{downloading ? "Downloading…" : "Download Calendar"}</Button>
            <Button asChild variant="outline"><a href={calendar.url} target="_blank" rel="noopener noreferrer">Open full calendar <ExternalLink /></a></Button>
          </div>
          {error && <p className="mt-3 text-sm text-destructive" role="alert">{error}</p>}
        </div>
        <aside aria-label="Key university dates" className="min-w-0">
          <h3 className="text-xl">Key dates</h3>
          <p className="mt-2 text-sm text-muted-foreground">Selected holidays and university events from the uploaded calendar.</p>
          <ol className="mt-6 ml-2 border-l-2 border-border">
            {DATES.map((item) => (
              <li key={item.date} className="relative pb-6 pl-6 last:pb-0">
                <span className="absolute -left-[7px] top-1.5 size-3 rounded-full border-2 border-card bg-primary" />
                <time dateTime={item.date} className="text-sm font-semibold text-primary">{new Date(`${item.date}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "UTC" })}</time>
                <p className="mt-1 text-sm font-medium">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.type}</p>
              </li>
            ))}
          </ol>
          <div className="mt-6 border-t border-border pt-5 text-sm text-muted-foreground">
            <p className="font-semibold text-foreground">Semester starts & examinations</p>
            <p className="mt-2">Semester start dates and exam schedules are not listed in this calendar. Refer to the latest official academic notifications.</p>
          </div>
        </aside>
      </div>
    </section>
  );
}