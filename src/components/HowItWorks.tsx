import { usePreferences } from "@/lib/preferences";

export function HowItWorks() {
  const { t } = usePreferences();
  const steps = [
    { title: t("step1Title"), desc: t("step1Desc") },
    { title: t("step2Title"), desc: t("step2Desc") },
    { title: t("step3Title"), desc: t("step3Desc") },
  ];

  return (
    <section
      id="how-it-works"
      className="scroll-mt-20 border-t border-border bg-muted/40 py-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            {t("howItWorksTitle")}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            {t("howItWorksSubtitle")}
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {steps.map((s, i) => (
            <div
              key={s.title}
              className="rounded-3xl border border-border bg-card p-6 shadow-sm"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <div
                className="flex h-11 w-11 items-center justify-center rounded-2xl text-base font-extrabold text-primary-foreground"
                style={{ background: "var(--gradient-hero)" }}
              >
                {i + 1}
              </div>
              <h3 className="mt-4 text-lg font-bold text-card-foreground">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
