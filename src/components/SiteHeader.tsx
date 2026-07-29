import { Link } from "@tanstack/react-router";
import { useState } from "react";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

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
              Find Your Ideal Teacher
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            to="/"
            activeOptions={{ exact: true }}
            activeProps={{ className: "text-primary" }}
            className="text-sm font-medium text-foreground/80 hover:text-primary"
          >
            الرئيسية
          </Link>
          <a className="text-sm font-medium text-foreground/80 hover:text-primary" href="#results">
            المدرسون
          </a>
          <Link
            to="/teach"
            activeProps={{ className: "text-primary" }}
            className="text-sm font-medium text-foreground/80 hover:text-primary"
          >
            كن مدرساً
          </Link>
          <a className="text-sm font-medium text-foreground/80 hover:text-primary" href="#">
            كيف يعمل
          </a>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <button className="hidden rounded-lg px-4 py-2 text-sm font-semibold text-foreground/80 hover:text-primary sm:inline-flex">
            تسجيل الدخول
          </button>
          <Link
            to="/teach"
            className="hidden rounded-lg px-4 py-2 text-sm font-bold text-primary-foreground shadow-md transition-transform hover:scale-[1.02] sm:inline-flex"
            style={{ background: "var(--gradient-hero)" }}
          >
            انضم كمدرس
          </Link>
          <button
            type="button"
            aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background text-foreground hover:border-primary hover:text-primary md:hidden"
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
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3 text-right sm:px-6">
            <Link
              to="/"
              activeOptions={{ exact: true }}
              activeProps={{ className: "bg-primary/10 text-primary" }}
              onClick={close}
              className="rounded-lg px-3 py-2.5 text-sm font-semibold text-foreground hover:bg-muted"
            >
              الرئيسية
            </Link>
            <a
              href="#results"
              onClick={close}
              className="rounded-lg px-3 py-2.5 text-sm font-semibold text-foreground hover:bg-muted"
            >
              المدرسون
            </a>
            <Link
              to="/teach"
              activeProps={{ className: "bg-primary/10 text-primary" }}
              onClick={close}
              className="rounded-lg px-3 py-2.5 text-sm font-semibold text-foreground hover:bg-muted"
            >
              كن مدرساً
            </Link>
            <a
              href="#"
              onClick={close}
              className="rounded-lg px-3 py-2.5 text-sm font-semibold text-foreground hover:bg-muted"
            >
              كيف يعمل
            </a>
            <div className="mt-2 grid grid-cols-2 gap-2 border-t border-border pt-3">
              <button className="rounded-lg border border-border px-4 py-2.5 text-sm font-semibold text-foreground hover:border-primary hover:text-primary">
                تسجيل الدخول
              </button>
              <Link
                to="/teach"
                onClick={close}
                className="rounded-lg px-4 py-2.5 text-center text-sm font-bold text-primary-foreground shadow-md"
                style={{ background: "var(--gradient-hero)" }}
              >
                انضم كمدرس
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
