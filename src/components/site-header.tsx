import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, ChevronDown, Sprout } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { YEARS } from "@/data/curriculum";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Home / Courses" },
  { to: "/updates", label: "ANGRAU Updates" },
  { to: "/colleges", label: "Colleges" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { user, fullName, isAdmin, signOut } = useAuth();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:px-6">
        {/* Logo area — a real logo image will replace this wordmark later. */}
        <Link to="/" className="flex items-center gap-2 shrink-0" onClick={() => setOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Sprout className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="font-display text-xl font-semibold tracking-tight text-primary">
            NarTechAg
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
                pathname === item.to && "bg-accent text-accent-foreground",
              )}
            >
              {item.label}
            </Link>
          ))}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={cn(
                  "flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
                  pathname.startsWith("/semesters") && "bg-accent text-accent-foreground",
                )}
              >
                Semesters <ChevronDown className="h-4 w-4" aria-hidden="true" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              {YEARS.map((y) => (
                <DropdownMenuItem key={y.year} asChild>
                  <Link to="/semesters" hash={`year-${y.year}`}>
                    {y.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-3">
          {user ? (
            <>
              <span className="hidden text-sm text-muted-foreground sm:inline">
                Welcome back, <span className="font-medium text-foreground">{fullName}</span>
              </span>
              {isAdmin && (
                <Button asChild variant="outline" size="sm" className="hidden sm:inline-flex">
                  <Link to="/admin">Admin</Link>
                </Button>
              )}
              <Button variant="ghost" size="sm" onClick={() => void signOut()}>
                Sign out
              </Button>
            </>
          ) : (
            <Button asChild size="sm">
              <Link to="/auth">Login / Sign Up</Link>
            </Button>
          )}

          <button
            className="rounded-md p-2 text-foreground lg:hidden"
            aria-label="Toggle navigation"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-card px-4 py-3 lg:hidden">
          <div className="flex flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-accent"
              >
                {item.label}
              </Link>
            ))}
            <p className="px-3 pt-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Semesters
            </p>
            {YEARS.map((y) => (
              <Link
                key={y.year}
                to="/semesters"
                hash={`year-${y.year}`}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm text-foreground hover:bg-accent"
              >
                {y.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
