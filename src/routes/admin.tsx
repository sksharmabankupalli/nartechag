import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { PageShell, PageHeader } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { RESOURCE_CATEGORIES, SEMESTERS } from "@/data/curriculum";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Admin Panel | NarTechAg" },
      {
        name: "description",
        content: "Admin tools to publish ANGRAU updates and course resources on NarTechAg.",
      },
      { property: "og:title", content: "Admin Panel | NarTechAg" },
      { property: "og:description", content: "Publish ANGRAU updates and course resources." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const { isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <PageShell>
        <p className="mx-auto max-w-6xl px-4 py-16 text-sm text-muted-foreground">Loading…</p>
      </PageShell>
    );
  }

  if (!isAdmin) {
    return (
      <PageShell>
        <PageHeader
          eyebrow="Restricted"
          title="Admin only"
          description="You need an admin account to manage updates and resources."
        />
      </PageShell>
    );
  }

  return (
    <PageShell>
      <PageHeader
        eyebrow="Site management"
        title="Admin Panel"
        description="Publish ANGRAU updates and add study resources for each course."
      />
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-2">
        <UpdatesManager />
        <ResourcesManager />
      </div>
    </PageShell>
  );
}

function UpdatesManager() {
  const qc = useQueryClient();
  const [form, setForm] = useState({ title: "", description: "", link: "", update_date: "" });

  const { data: updates = [] } = useQuery({
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

  const add = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("angrau_updates").insert({
        title: form.title,
        description: form.description,
        link: form.link || null,
        ...(form.update_date ? { update_date: form.update_date } : {}),
      });
      if (error) throw error;
    },
    onSuccess: () => {
      setForm({ title: "", description: "", link: "", update_date: "" });
      void qc.invalidateQueries({ queryKey: ["angrau_updates"] });
    },
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("angrau_updates").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => void qc.invalidateQueries({ queryKey: ["angrau_updates"] }),
  });

  return (
    <section className="rounded-2xl border border-border bg-card p-6 shadow-soft">
      <h2 className="font-display text-xl font-semibold">ANGRAU Updates</h2>
      <form
        className="mt-4 space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          add.mutate();
        }}
      >
        <div className="space-y-1.5">
          <Label htmlFor="u-title">Title</Label>
          <Input
            id="u-title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="u-desc">Description</Label>
          <Textarea
            id="u-desc"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="u-link">Link (optional)</Label>
            <Input
              id="u-link"
              value={form.link}
              onChange={(e) => setForm({ ...form, link: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="u-date">Date</Label>
            <Input
              id="u-date"
              type="date"
              value={form.update_date}
              onChange={(e) => setForm({ ...form, update_date: e.target.value })}
            />
          </div>
        </div>
        {add.isError && <p className="text-sm text-destructive">Could not save update.</p>}
        <Button type="submit" disabled={add.isPending}>
          Publish update
        </Button>
      </form>

      <ul className="mt-6 space-y-2">
        {updates.map((u) => (
          <li
            key={u.id}
            className="flex items-center gap-3 rounded-lg border border-border px-3 py-2 text-sm"
          >
            <span className="flex-1">{u.title}</span>
            <button
              aria-label={`Delete ${u.title}`}
              onClick={() => remove.mutate(u.id)}
              className="text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

function ResourcesManager() {
  const qc = useQueryClient();
  const [semester, setSemester] = useState(1);
  const [form, setForm] = useState({ course_name: "", title: "", url: "", resource_type: "lecture_outlines" });

  const currentSem = SEMESTERS.find((s) => s.number === semester);

  const { data: resources = [] } = useQuery({
    queryKey: ["resources"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("resources")
        .select("id, semester, course_name, title, url")
        .order("created_at", { ascending: true });
      if (error) throw error;
      return data ?? [];
    },
  });

  const add = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("resources").insert({
        year: currentSem?.year ?? 1,
        semester,
        course_name: form.course_name,
        title: form.title,
        url: form.url || null,
        resource_type: form.resource_type,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      setForm({ course_name: "", title: "", url: "", resource_type: "link" });
      void qc.invalidateQueries({ queryKey: ["resources"] });
    },
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("resources").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => void qc.invalidateQueries({ queryKey: ["resources"] }),
  });

  return (
    <section className="rounded-2xl border border-border bg-card p-6 shadow-soft">
      <h2 className="font-display text-xl font-semibold">Course Resources</h2>
      <form
        className="mt-4 space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          add.mutate();
        }}
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="r-sem">Semester</Label>
            <select
              id="r-sem"
              value={semester}
              onChange={(e) => {
                setSemester(Number(e.target.value));
                setForm({ ...form, course_name: "" });
              }}
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              {SEMESTERS.map((s) => (
                <option key={s.number} value={s.number}>
                  Semester {s.roman}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="r-course">Course</Label>
            <select
              id="r-course"
              value={form.course_name}
              onChange={(e) => setForm({ ...form, course_name: e.target.value })}
              required
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="">Select a course</option>
              {(currentSem?.courses ?? []).map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="r-title">Resource title</Label>
          <Input
            id="r-title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="r-url">URL</Label>
          <Input
            id="r-url"
            value={form.url}
            onChange={(e) => setForm({ ...form, url: e.target.value })}
          />
        </div>
        {add.isError && <p className="text-sm text-destructive">Could not save resource.</p>}
        <Button type="submit" disabled={add.isPending}>
          Add resource
        </Button>
      </form>

      <ul className="mt-6 space-y-2">
        {resources.map((r) => (
          <li
            key={r.id}
            className="flex items-center gap-3 rounded-lg border border-border px-3 py-2 text-sm"
          >
            <span className="flex-1">
              <span className="text-muted-foreground">Sem {r.semester} · </span>
              {r.title}
            </span>
            <button
              aria-label={`Delete ${r.title}`}
              onClick={() => remove.mutate(r.id)}
              className="text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
