import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { usePreferences } from "@/lib/preferences";
import { dashboardPathFor, useAuth } from "@/lib/auth";

export const Route = createFileRoute("/_authenticated/dashboard/student")({
  component: StudentDashboard,
  head: () => ({
    meta: [
      { title: "لوحة الطالب | شيرلوكيشن" },
      {
        name: "description",
        content: "لوحة الطالب وولي الأمر على شيرلوكيشن: متابعة البحث عن المدرسين والحجوزات.",
      },
      { property: "og:title", content: "لوحة الطالب | شيرلوكيشن" },
      {
        property: "og:description",
        content: "تابع بحثك عن المدرسين وحجوزاتك من مكان واحد على شيرلوكيشن.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

function StudentDashboard() {
  const { t } = usePreferences();
  const navigate = useNavigate();
  const { role, loading, displayName, profile, user } = useAuth();

  useEffect(() => {
    if (!loading && role === "teacher") {
      void navigate({ to: dashboardPathFor(role), replace: true });
    }
  }, [loading, role, navigate]);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <h1 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
          {t("studentDashboard")}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">{t("dashboardStudentDesc")}</p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <section className="rounded-2xl border border-border bg-card p-5">
            <h2 className="text-sm font-bold text-card-foreground">{t("accountInfo")}</h2>
            <dl className="mt-3 space-y-2 text-sm">
              <Row label={t("fullName")} value={displayName} />
              <Row label={t("email")} value={profile?.email ?? user?.email ?? ""} />
              <Row
                label={t("roleLabel")}
                value={role === "guardian" ? t("roleGuardian") : t("roleStudentOnly")}
              />
            </dl>
          </section>

          <section className="flex flex-col justify-between rounded-2xl border border-border bg-card p-5">
            <div>
              <h2 className="text-sm font-bold text-card-foreground">{t("browseTeachers")}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{t("step1Desc")}</p>
            </div>
            <Link
              to="/"
              className="mt-4 inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-bold text-primary-foreground shadow-md"
              style={{ background: "var(--gradient-hero)" }}
            >
              {t("searchBtn")}
            </Link>
          </section>
        </div>
      </main>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="truncate font-semibold text-foreground">{value}</dd>
    </div>
  );
}
