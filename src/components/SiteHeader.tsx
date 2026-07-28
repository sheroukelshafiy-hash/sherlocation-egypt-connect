import { Link } from "@tanstack/react-router";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl text-primary-foreground shadow-md"
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
          <div className="flex flex-col leading-tight">
            <span className="text-lg font-extrabold tracking-tight">شيرلوكيت</span>
            <span className="text-[11px] text-muted-foreground">
              ابحث عن مدرسك المثالي
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

        <div className="flex items-center gap-2">
          <button className="hidden rounded-lg px-4 py-2 text-sm font-semibold text-foreground/80 hover:text-primary sm:inline-flex">
            تسجيل الدخول
          </button>
          <Link
            to="/teach"
            className="rounded-lg px-4 py-2 text-sm font-bold text-primary-foreground shadow-md transition-transform hover:scale-[1.02]"
            style={{ background: "var(--gradient-hero)" }}
          >
            انضم كمدرس
          </Link>
        </div>
      </div>
    </header>
  );
}
