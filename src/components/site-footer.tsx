import { Link } from "@tanstack/react-router";
import { Sprout } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border bg-card">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6 md:flex-row md:justify-between">
        <div className="max-w-sm">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Sprout className="h-4 w-4" aria-hidden="true" />
            </span>
            <span className="font-display text-lg font-semibold text-primary">NarTechAg</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            One stop for all your study needs — a study hub for B.Sc (Hons) Agriculture students.
          </p>
        </div>

        <nav className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm">
          <Link to="/" className="text-muted-foreground hover:text-primary">
            Home / Courses
          </Link>
          <Link to="/updates" className="text-muted-foreground hover:text-primary">
            ANGRAU Updates
          </Link>
          <Link to="/semesters" className="text-muted-foreground hover:text-primary">
            Semesters
          </Link>
          <Link to="/colleges" className="text-muted-foreground hover:text-primary">
            Colleges
          </Link>
        </nav>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} NarTechAg. Study resources for agriculture students.
      </div>
    </footer>
  );
}
