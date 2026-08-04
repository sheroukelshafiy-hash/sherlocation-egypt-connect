import { Link } from "@tanstack/react-router";
import { usePreferences } from "@/lib/preferences";

export function SiteFooter() {
  const { t } = usePreferences();

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="min-w-0">
          <p className="text-sm font-extrabold text-foreground">SherLocation</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {t("brandTagline")}
          </p>
        </div>

        <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-semibold text-muted-foreground">
          <Link to="/" className="hover:text-primary">
            {t("navHome")}
          </Link>
          <Link to="/about" className="hover:text-primary">
            {t("navAbout")}
          </Link>
          <Link to="/teach" className="hover:text-primary">
            {t("navBecomeTeacher")}
          </Link>
          <Link to="/settings" className="hover:text-primary">
            {t("settingsTitle")}
          </Link>
        </nav>

        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} SherLocation
        </p>
      </div>
    </footer>
  );
}
