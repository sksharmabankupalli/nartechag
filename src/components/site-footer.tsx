import { Link } from "@tanstack/react-router";
import { Sprout } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-footer-border bg-footer text-footer-foreground">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6 md:flex-row md:justify-between">
        <div className="max-w-sm">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-footer-foreground/10 text-footer-foreground">
              <Sprout className="h-4 w-4" aria-hidden="true" />
            </span>
            <span className="font-display text-lg font-bold text-footer-foreground">NarTechAg</span>
          </div>
          <p className="mt-3 text-sm text-footer-muted">
            One stop for all your study needs — a study hub for B.Sc (Hons) Agriculture students.
          </p>
        </div>

        <nav className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm">
          <Link to="/" className="text-footer-muted hover:text-footer-foreground">
            Home / Courses
          </Link>
          <Link to="/updates" className="text-footer-muted hover:text-footer-foreground">
            ANGRAU Updates
          </Link>
          <Link to="/semesters" className="text-footer-muted hover:text-footer-foreground">
            Semesters
          </Link>
          <Link to="/colleges" className="text-footer-muted hover:text-footer-foreground">
            Colleges
          </Link>
        </nav>
      </div>
      <div className="border-t border-footer-border py-4 text-center text-xs text-footer-muted">
        © {new Date().getFullYear()} NarTechAg. Study resources for agriculture students.
      </div>
    </footer>
  );
}
