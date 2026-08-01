import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { usePreferences } from "@/lib/preferences";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "عن نظام شيرلوكيشن | SherLocation System" },
      {
        name: "description",
        content:
          "تعرّف على بنية منصة شيرلوكيشن التقنية: محرك البحث الجغرافي، المكدس البرمجي، وسجل التحديثات.",
      },
      { property: "og:title", content: "عن نظام شيرلوكيشن | SherLocation System" },
      {
        property: "og:description",
        content: "بنية منصة شيرلوكيشن التقنية ومكدسها البرمجي وسجل تحديثاتها.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const CHANGELOG = [
  "[v4.0.2] FIX: Strict auth email/password validation and role separation.",
  "[v4.0.1] FEAT: Dynamic governorates & districts hierarchical dropdowns.",
  "[v4.0.0] REFACTOR: Granular grades split (Primary 1-6, Prep 1-3, Sec 1-3).",
  "[v3.8.0] FEAT: Lesson booking flow with confirmation dialog.",
  "> Status: ALL SYSTEMS OPERATIONAL.",
];

function AboutPage() {
  const { t } = usePreferences();

  const cards = [
    { title: t("aboutFrontend"), desc: t("aboutFrontendDesc") },
    { title: t("aboutData"), desc: t("aboutDataDesc") },
    { title: t("aboutSecurity"), desc: t("aboutSecurityDesc") },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <section
          className="rounded-3xl border border-border bg-card p-6 sm:p-8"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          <p
            className="rounded-xl bg-secondary px-3 py-2 font-mono text-[11px] text-muted-foreground"
            dir="ltr"
          >
            {`const app = { name: "SherLocation", version: "v4.0.2", status: "HEALTHY" };`}
          </p>
          <h1 className="mt-4 text-2xl font-extrabold text-foreground sm:text-3xl">
            {t("aboutTitle")}
          </h1>
          <p className="mt-1 text-sm font-semibold text-primary">{t("aboutVersion")}</p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            {t("aboutIntro")}
          </p>
        </section>

        <h2 className="mt-8 text-lg font-extrabold text-foreground">{t("aboutStack")}</h2>
        <div className="mt-3 grid gap-4 sm:grid-cols-3">
          {cards.map((c) => (
            <div
              key={c.title}
              className="rounded-2xl border border-border bg-card p-5"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <h3 className="text-sm font-bold text-foreground">{c.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{c.desc}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-8 text-lg font-extrabold text-foreground">
          {t("aboutChangelog")}
        </h2>
        <div
          className="mt-3 space-y-1.5 rounded-2xl border border-border bg-secondary/60 p-5 font-mono text-[11px] leading-relaxed text-muted-foreground"
          dir="ltr"
        >
          {CHANGELOG.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>

        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex rounded-xl border border-border px-4 py-2.5 text-sm font-bold text-foreground hover:border-primary hover:text-primary"
          >
            {t("backHome")}
          </Link>
        </div>
      </main>
    </div>
  );
}
