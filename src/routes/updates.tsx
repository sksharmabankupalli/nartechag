import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ExternalLink } from "lucide-react";
import { PageShell, PageHeader } from "@/components/page-shell";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/updates")({
  head: () => ({
    meta: [
      { title: "ANGRAU Updates & Notifications | NarTechAg" },
      {
        name: "description",
        content:
          "Latest ANGRAU announcements, exam notifications and academic circulars for B.Sc (Hons) Agriculture students.",
      },
      { property: "og:title", content: "ANGRAU Updates & Notifications | NarTechAg" },
      {
        property: "og:description",
        content: "Latest ANGRAU announcements, exam notifications and academic circulars.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: UpdatesPage,
});

function UpdatesPage() {
  const { data: updates = [], isLoading } = useQuery({
    queryKey: ["angrau_updates"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("angrau_updates")
        .select("id, title, description, link, update_date")
        .order("update_date", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  return (
    <PageShell>
      <PageHeader
        eyebrow="University news"
        title="ANGRAU Updates"
        description="Announcements, exam notifications and academic circulars, newest first."
      />
      <div className="mx-auto max-w-4xl space-y-4 px-4 py-12 sm:px-6">
        {isLoading && <p className="text-sm text-muted-foreground">Loading updates…</p>}
        {!isLoading && updates.length === 0 && (
          <p className="rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
            No updates published yet.
          </p>
        )}
        {updates.map((u) => (
          <article key={u.id} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              {new Date(u.update_date).toLocaleDateString(undefined, {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
            <h2 className="mt-2 font-display text-xl font-semibold">{u.title}</h2>
            {u.description && (
              <p className="mt-2 text-sm text-muted-foreground">{u.description}</p>
            )}
            {u.link && (
              <a
                href={u.link}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
              >
                Open notification <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            )}
          </article>
        ))}
      </div>
    </PageShell>
  );
}
