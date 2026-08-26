import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/auth")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Login or Sign Up | NarTechAg" },
      {
        name: "description",
        content:
          "Create a free NarTechAg account or sign in to access B.Sc (Hons) Agriculture notes, PDFs and ANGRAU updates.",
      },
      { property: "og:title", content: "Login or Sign Up | NarTechAg" },
      {
        property: "og:description",
        content: "Sign in to access agriculture study resources and ANGRAU updates.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) void navigate({ to: "/", replace: true });
  }, [user, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setMessage(null);
    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: { full_name: fullName },
        },
      });
      setMessage(error ? error.message : "Account created. Check your email to confirm.");
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setMessage(error.message);
    }
    setBusy(false);
  };

  return (
    <PageShell>
      <div className="mx-auto flex max-w-md flex-col px-4 py-16 sm:px-6">
        <h1 className="font-display text-3xl font-semibold">
          {mode === "signin" ? "Welcome back" : "Create your account"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Access notes, PDFs and ANGRAU updates for B.Sc (Hons) Agriculture.
        </p>

        <form onSubmit={submit} className="mt-8 space-y-4">
          {mode === "signup" && (
            <div className="space-y-1.5">
              <Label htmlFor="fullName">Full name</Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
          )}
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {message && <p className="text-sm text-muted-foreground">{message}</p>}
          <Button type="submit" className="w-full" disabled={busy}>
            {mode === "signin" ? "Sign in" : "Sign up"}
          </Button>
        </form>

        <button
          type="button"
          onClick={() => {
            setMode(mode === "signin" ? "signup" : "signin");
            setMessage(null);
          }}
          className="mt-6 text-sm text-primary hover:underline"
        >
          {mode === "signin"
            ? "New here? Create an account"
            : "Already have an account? Sign in"}
        </button>
      </div>
    </PageShell>
  );
}
