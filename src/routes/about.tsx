import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { usePreferences } from "@/lib/preferences";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "عن شيرلوكيشن | About SherLocation" },
      {
        name: "description",
        content:
          "شيرلوكيشن منصة تعليمية مصرية تربط الطلاب بالمدرسين الخصوصيين المناسبين حسب المحافظة والمركز والمرحلة والمادة والسعر.",
      },
      { property: "og:title", content: "عن شيرلوكيشن | About SherLocation" },
      {
        property: "og:description",
        content:
          "تعرّف على شيرلوكيشن: البحث عن مدرس خصوصي في منطقتك حسب المحافظة والمركز والمرحلة والمادة والسعر.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { t } = usePreferences();

  const pillars = [
    { title: t("aboutWhatTitle"), desc: t("aboutWhatDesc") },
    { title: t("aboutSearchTitle"), desc: t("aboutSearchDesc") },
    { title: t("aboutValueTitle"), desc: t("aboutValueDesc") },
  ];

  const students = [t("aboutStudentsP1"), t("aboutStudentsP2"), t("aboutStudentsP3")];
  const teachers = [t("aboutTeachersP1"), t("aboutTeachersP2"), t("aboutTeachersP3")];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
        <section
          className="rounded-3xl border border-border bg-card p-6 sm:p-9"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
            {t("navAbout")}
          </span>
          <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            {t("aboutPageTitle")}
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {t("aboutLead")}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/"
              className="rounded-xl px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-md transition-transform hover:scale-[1.02]"
              style={{ background: "var(--gradient-hero)" }}
            >
              {t("aboutCtaSearch")}
            </Link>
            <Link
              to="/teach"
              className="rounded-xl border border-border px-5 py-2.5 text-sm font-bold text-foreground hover:border-primary hover:text-primary"
            >
              {t("aboutCtaTeacher")}
            </Link>
          </div>
        </section>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {pillars.map((c) => (
            <article
              key={c.title}
              className="rounded-2xl border border-border bg-card p-5"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <h2 className="text-sm font-extrabold text-foreground">{c.title}</h2>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{c.desc}</p>
            </article>
          ))}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Panel title={t("aboutStudentsTitle")} items={students} />
          <Panel title={t("aboutTeachersTitle")} items={teachers} />
        </div>

        <section className="mt-6 rounded-2xl border border-border bg-secondary/50 p-5">
          <h2 className="text-sm font-extrabold text-foreground">{t("aboutTech")}</h2>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            {t("aboutFrontendDesc")} {t("aboutDataDesc")}
          </p>
        </section>

        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex rounded-xl border border-border px-4 py-2.5 text-sm font-bold text-foreground hover:border-primary hover:text-primary"
          >
            {t("backHome")}
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function Panel({ title, items }: { title: string; items: string[] }) {
  return (
    <section
      className="rounded-2xl border border-border bg-card p-5"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <h2 className="text-base font-extrabold text-foreground">{title}</h2>
      <ul className="mt-3 space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5">
            <span
              aria-hidden
              className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
            />
            <span className="text-xs leading-relaxed text-muted-foreground">{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
