import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AuthDialog } from "@/components/AuthDialog";
import { usePreferences } from "@/lib/preferences";
import { useDemoAuth } from "@/lib/demo-auth";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const { t, theme, toggleTheme, lang, toggleLang } = usePreferences();
  const { user, initials, signOut } = useDemoAuth();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const close = () => setOpen(false);

  const goToSection = (id: string) => {
    close();
    if (pathname !== "/") {
      navigate({ to: "/", hash: id });
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const navLink =
    "text-sm font-medium text-foreground/80 hover:text-primary transition-colors";

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex min-w-0 items-center gap-2" onClick={close}>
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-primary-foreground shadow-md"
            style={{ background: "var(--gradient-hero)" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
          </div>
          <div className="flex min-w-0 flex-col leading-tight" dir="ltr">
            <span className="truncate text-base font-extrabold tracking-tight text-foreground sm:text-lg">
              SherLocation
            </span>
            <span className="truncate text-[10px] text-muted-foreground sm:text-[11px]">
              {t("brandTagline")}
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          <Link
            to="/"
            activeOptions={{ exact: true }}
            activeProps={{ className: "text-primary" }}
            className={navLink}
          >
            {t("navHome")}
          </Link>
          <button type="button" className={navLink} onClick={() => goToSection("results")}>
            {t("navTeachers")}
          </button>
          <Link to="/teach" activeProps={{ className: "text-primary" }} className={navLink}>
            {t("navBecomeTeacher")}
          </Link>
          <button
            type="button"
            className={navLink}
            onClick={() => goToSection("how-it-works")}
          >
            {t("navHowItWorks")}
          </button>
        </nav>

        <div className="flex shrink-0 items-center gap-1.5">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={t("theme")}
            title={t("theme")}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-foreground hover:border-primary hover:text-primary"
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
          <button
            type="button"
            onClick={toggleLang}
            aria-label={t("language")}
            title={t("language")}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border px-2.5 text-xs font-bold text-foreground hover:border-primary hover:text-primary"
          >
            <GlobeIcon />
            <span dir="ltr">{lang === "ar" ? "EN" : "ع"}</span>
          </button>
          <Link
            to="/settings"
            aria-label={t("settings")}
            title={t("settings")}
            activeProps={{ className: "border-primary text-primary" }}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-foreground hover:border-primary hover:text-primary"
            onClick={close}
          >
            <GearIcon />
          </Link>

          {user ? (
            <div className="hidden items-center gap-1.5 sm:flex">
              <span
                aria-hidden
                title={user.name}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-xs font-extrabold text-primary-foreground shadow-md"
                style={{ background: "var(--gradient-hero)" }}
              >
                {initials}
              </span>
              <span className="hidden max-w-[10rem] truncate text-sm font-bold text-foreground lg:inline">
                {user.name}{" "}
                <span className="font-semibold text-muted-foreground">
                  ({user.role === "teacher" ? t("roleTeacher") : t("roleStudent")})
                </span>
              </span>
              <button
                type="button"
                onClick={() => {
                  signOut();
                  toast.success(t("loggedOut"));
                  setAuthOpen(true);
                }}
                className="rounded-lg border border-border px-2.5 py-1.5 text-xs font-bold text-foreground hover:border-primary hover:text-primary"
              >
                {t("logout")}
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setAuthOpen(true)}
              className="hidden rounded-lg px-3 py-2 text-sm font-semibold text-foreground/80 hover:text-primary sm:inline-flex"
            >
              {t("login")}
            </button>
          )}
          <Link
            to="/teach"
            className="hidden rounded-lg px-4 py-2 text-sm font-bold text-primary-foreground shadow-md transition-transform hover:scale-[1.02] lg:inline-flex"
            style={{ background: "var(--gradient-hero)" }}
          >
            {t("joinTeacher")}
          </Link>
          <button
            type="button"
            aria-label={open ? t("closeMenu") : t("openMenu")}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-foreground hover:border-primary hover:text-primary md:hidden"
          >
            {open ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M18 6 6 18M6 6l12 12"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
            )}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3 text-start sm:px-6">
            <Link
              to="/"
              activeOptions={{ exact: true }}
              activeProps={{ className: "bg-primary/10 text-primary" }}
              onClick={close}
              className="rounded-lg px-3 py-2.5 text-sm font-semibold text-foreground hover:bg-muted"
            >
              {t("navHome")}
            </Link>
            <button
              type="button"
              onClick={() => goToSection("results")}
              className="rounded-lg px-3 py-2.5 text-start text-sm font-semibold text-foreground hover:bg-muted"
            >
              {t("navTeachers")}
            </button>
            <Link
              to="/teach"
              activeProps={{ className: "bg-primary/10 text-primary" }}
              onClick={close}
              className="rounded-lg px-3 py-2.5 text-sm font-semibold text-foreground hover:bg-muted"
            >
              {t("navBecomeTeacher")}
            </Link>
            <button
              type="button"
              onClick={() => goToSection("how-it-works")}
              className="rounded-lg px-3 py-2.5 text-start text-sm font-semibold text-foreground hover:bg-muted"
            >
              {t("navHowItWorks")}
            </button>
            <Link
              to="/about"
              onClick={close}
              activeProps={{ className: "bg-primary/10 text-primary" }}
              className="rounded-lg px-3 py-2.5 text-sm font-semibold text-foreground hover:bg-muted"
            >
              {t("navAbout")}
            </Link>
            <Link
              to="/settings"
              onClick={close}
              activeProps={{ className: "bg-primary/10 text-primary" }}
              className="rounded-lg px-3 py-2.5 text-sm font-semibold text-foreground hover:bg-muted"
            >
              {t("settings")}
            </Link>
            {user && (
              <div className="mt-2 flex items-center gap-2 rounded-lg border border-border p-2.5">
                <span
                  aria-hidden
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-extrabold text-primary-foreground"
                  style={{ background: "var(--gradient-hero)" }}
                >
                  {initials}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-foreground">{user.name}</p>
                  <p className="truncate text-[11px] text-muted-foreground">{user.email}</p>
                </div>
              </div>
            )}
            <div className="mt-2 grid grid-cols-2 gap-2 border-t border-border pt-3">
              <button
                type="button"
                onClick={() => {
                  close();
                  if (user) {
                    signOut();
                    toast.success(t("loggedOut"));
                    setAuthOpen(true);
                  } else {
                    setAuthOpen(true);
                  }
                }}
                className="rounded-lg border border-border px-4 py-2.5 text-sm font-semibold text-foreground hover:border-primary hover:text-primary"
              >
                {user ? t("logout") : t("login")}
              </button>
              <Link
                to="/teach"
                onClick={close}
                className="rounded-lg px-4 py-2.5 text-center text-sm font-bold text-primary-foreground shadow-md"
                style={{ background: "var(--gradient-hero)" }}
              >
                {t("joinTeacher")}
              </Link>
            </div>
          </nav>
        </div>
      )}

      <AuthDialog open={authOpen} onClose={() => setAuthOpen(false)} />
    </header>
  );
}

function SunIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4.5 w-4.5"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M6.3 17.7l-1.4 1.4M19.1 4.9l-1.4 1.4"/></svg>
  );
}
function MoonIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4.5 w-4.5"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/></svg>
  );
}
function GlobeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/></svg>
  );
}
function GearIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4.5 w-4.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-2.9 1.2 2 2 0 1 1-4 0 1.7 1.7 0 0 0-2.9-1.2l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.7 1.7 0 0 0 3 15a2 2 0 1 1 0-4 1.7 1.7 0 0 0 1.2-2.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.7 1.7 0 0 0 10 4.2a2 2 0 1 1 4 0 1.7 1.7 0 0 0 2.9 1.2l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1A1.7 1.7 0 0 0 21 11a2 2 0 1 1 0 4 1.7 1.7 0 0 0-1.6 1Z"/></svg>
  );
}
