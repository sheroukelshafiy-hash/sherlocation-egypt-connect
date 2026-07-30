import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { usePreferences, type Lang, type Theme } from "@/lib/preferences";

export const Route = createFileRoute("/settings")({
  component: SettingsPage,
  head: () => ({
    meta: [
      { title: "الإعدادات | شيرلوكيشن" },
      {
        name: "description",
        content:
          "تحكّم في مظهر شيرلوكيشن (فاتح/داكن)، لغة الواجهة (عربي/إنجليزي)، وتفضيلات الإشعارات.",
      },
      { property: "og:title", content: "الإعدادات | شيرلوكيشن" },
      {
        property: "og:description",
        content: "المظهر واللغة وتفضيلات الحساب في منصة شيرلوكيشن.",
      },
    ],
  }),
});

function SettingsPage() {
  const {
    t,
    theme,
    setTheme,
    lang,
    setLang,
    emailNotifications,
    setEmailNotifications,
    whatsappNotifications,
    setWhatsappNotifications,
  } = usePreferences();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight">{t("settingsTitle")}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{t("settingsSubtitle")}</p>

        <section className="mt-8 rounded-3xl border border-border bg-card p-6">
          <h2 className="text-lg font-bold text-card-foreground">{t("theme")}</h2>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {(["light", "dark"] as Theme[]).map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setTheme(v)}
                className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                  theme === v
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-foreground hover:border-primary"
                }`}
              >
                {v === "light" ? t("light") : t("dark")}
              </button>
            ))}
          </div>
        </section>

        <section className="mt-5 rounded-3xl border border-border bg-card p-6">
          <h2 className="text-lg font-bold text-card-foreground">{t("language")}</h2>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {(["ar", "en"] as Lang[]).map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setLang(v)}
                className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                  lang === v
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-foreground hover:border-primary"
                }`}
              >
                {v === "ar" ? t("arabic") : t("english")}
              </button>
            ))}
          </div>
        </section>

        <section className="mt-5 rounded-3xl border border-border bg-card p-6">
          <h2 className="text-lg font-bold text-card-foreground">{t("accountPrefs")}</h2>
          <div className="mt-4 space-y-3">
            <Toggle
              label={t("emailNotif")}
              desc={t("emailNotifDesc")}
              checked={emailNotifications}
              onChange={setEmailNotifications}
            />
            <Toggle
              label={t("waNotif")}
              desc={t("waNotifDesc")}
              checked={whatsappNotifications}
              onChange={setWhatsappNotifications}
            />
          </div>
        </section>

        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex rounded-xl border border-border px-4 py-2.5 text-sm font-semibold text-foreground hover:border-primary hover:text-primary"
          >
            {t("backHome")}
          </Link>
        </div>
      </main>
    </div>
  );
}

function Toggle({
  label,
  desc,
  checked,
  onChange,
}: {
  label: string;
  desc: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl bg-muted/50 p-4">
      <div className="min-w-0">
        <p className="text-sm font-bold text-foreground">{label}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">{desc}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={`relative h-7 w-12 shrink-0 rounded-full transition ${
          checked ? "bg-primary" : "bg-border"
        }`}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-card transition-all ${
            checked ? "left-1" : "left-6"
          }`}
        />
      </button>
    </div>
  );
}
