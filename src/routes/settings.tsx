import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { usePreferences, type Lang, type Theme } from "@/lib/preferences";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { deleteMyAccount } from "@/lib/account.functions";

export const Route = createFileRoute("/settings")({
  component: SettingsPage,
  head: () => ({
    meta: [
      { title: "الإعدادات | شيرلوكيشن" },
      {
        name: "description",
        content:
          "تحكّم في بيانات حسابك، المظهر (فاتح/داكن)، لغة الواجهة (عربي/إنجليزي)، الإشعارات، والخصوصية والأمان.",
      },
      { property: "og:title", content: "الإعدادات | شيرلوكيشن" },
      {
        property: "og:description",
        content: "الحساب والمظهر واللغة والإشعارات والخصوصية في منصة شيرلوكيشن.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
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
    bookingNotifications,
    setBookingNotifications,
  } = usePreferences();

  const { user, profile, role, loading, displayName, refresh, signOut } = useAuth();
  const navigate = useNavigate();

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [sendingReset, setSendingReset] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteText, setDeleteText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setName(profile?.full_name ?? displayName ?? "");
  }, [profile?.full_name, displayName]);

  const roleLabel =
    role === "teacher" ? t("roleTeacher") : role === "guardian" ? t("roleGuardian") : t("roleStudentOnly");

  const saveProfile = async () => {
    if (!user) return;
    const trimmed = name.trim();
    if (!trimmed) {
      toast.error(t("errRequired"));
      return;
    }
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({ full_name: trimmed })
      .eq("id", user.id);
    setSaving(false);
    if (error) {
      toast.error(t("profileUpdateFailed"));
      return;
    }
    await refresh();
    setEditing(false);
    toast.success(t("profileUpdated"));
  };

  const sendPasswordEmail = async () => {
    if (!user?.email) return;
    setSendingReset(true);
    const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setSendingReset(false);
    if (error) {
      toast.error(t("errNetwork"));
      return;
    }
    toast.success(t("passwordEmailSent"));
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteMyAccount();
      await supabase.auth.signOut();
      toast.success(t("accountDeleted"));
      void navigate({ to: "/", replace: true });
    } catch {
      toast.error(t("deleteAccountFailed"));
    } finally {
      setDeleting(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    toast.success(t("loggedOut"));
    void navigate({ to: "/", replace: true });
  };

  const fmt = (value?: string | null) => {
    if (!value) return "—";
    try {
      return new Date(value).toLocaleString(lang === "ar" ? "ar-EG" : "en-GB");
    } catch {
      return "—";
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight">{t("settingsTitle")}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{t("settingsSubtitle")}</p>

        {/* A) Account */}
        <Card title={t("settingsAccount")} desc={t("settingsAccountDesc")}>
          {loading ? (
            <p className="text-sm text-muted-foreground">{t("loadingText")}</p>
          ) : !user ? (
            <div>
              <p className="text-sm font-bold text-foreground">{t("notSignedIn")}</p>
              <p className="mt-1 text-xs text-muted-foreground">{t("notSignedInDesc")}</p>
              <Link
                to="/auth"
                search={{ mode: "login" as const }}
                className="mt-4 inline-flex rounded-xl px-4 py-2.5 text-sm font-bold text-primary-foreground shadow-md"
                style={{ background: "var(--gradient-hero)" }}
              >
                {t("login")}
              </Link>
            </div>
          ) : editing ? (
            <div className="space-y-4">
              <div>
                <label htmlFor="full-name" className="text-xs font-bold text-foreground">
                  {t("fullName")}
                </label>
                <input
                  id="full-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={100}
                  className="mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none focus:border-primary"
                />
              </div>
              <p className="text-xs text-muted-foreground">{t("emailNotEditable")}</p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  disabled={saving}
                  onClick={() => void saveProfile()}
                  className="rounded-xl px-4 py-2.5 text-sm font-bold text-primary-foreground shadow-md disabled:opacity-60"
                  style={{ background: "var(--gradient-hero)" }}
                >
                  {saving ? t("saving") : t("saveChanges")}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditing(false);
                    setName(profile?.full_name ?? displayName ?? "");
                  }}
                  className="rounded-xl border border-border px-4 py-2.5 text-sm font-semibold text-foreground hover:border-primary hover:text-primary"
                >
                  {t("cancel")}
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <Row label={t("fullName")} value={profile?.full_name || displayName || "—"} />
              <Row label={t("email")} value={user.email ?? "—"} ltr />
              <Row label={t("accountType")} value={roleLabel} />
              <button
                type="button"
                onClick={() => setEditing(true)}
                className="mt-1 rounded-xl border border-border px-4 py-2.5 text-sm font-semibold text-foreground hover:border-primary hover:text-primary"
              >
                {t("editProfile")}
              </button>
            </div>
          )}
        </Card>

        {/* B) Preferences */}
        <Card title={t("settingsPreferences")}>
          <h3 className="text-sm font-bold text-foreground">{t("theme")}</h3>
          <div className="mt-3 grid grid-cols-2 gap-3">
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

          <h3 className="mt-6 text-sm font-bold text-foreground">{t("language")}</h3>
          <div className="mt-3 grid grid-cols-2 gap-3">
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

          <div className="mt-5 rounded-2xl bg-muted/50 p-4">
            <p className="text-sm font-bold text-foreground">{t("rememberPrefs")}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{t("rememberPrefsDesc")}</p>
          </div>
        </Card>

        {/* C) Notifications */}
        <Card title={t("settingsNotifications")} desc={t("notifLocalNote")}>
          <div className="space-y-3">
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
            <Toggle
              label={t("bookingNotif")}
              desc={t("bookingNotifDesc")}
              checked={bookingNotifications}
              onChange={setBookingNotifications}
            />
          </div>
        </Card>

        {/* D) Privacy & security */}
        <Card title={t("settingsPrivacy")}>
          {user ? (
            <>
              <div className="rounded-2xl bg-muted/50 p-4">
                <p className="text-sm font-bold text-foreground">{t("changePassword")}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{t("changePasswordDesc")}</p>
                <button
                  type="button"
                  disabled={sendingReset}
                  onClick={() => void sendPasswordEmail()}
                  className="mt-3 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground hover:border-primary hover:text-primary disabled:opacity-60"
                >
                  {sendingReset ? t("sending") : t("sendPasswordEmail")}
                </button>
              </div>

              <div className="mt-4 space-y-3">
                <h3 className="text-sm font-bold text-foreground">{t("securityInfo")}</h3>
                <Row label={t("signInMethod")} value={t("emailPassword")} />
                <Row label={t("lastSignIn")} value={fmt(user.last_sign_in_at)} />
                <Row label={t("accountCreatedAt")} value={fmt(user.created_at)} />
              </div>
            </>
          ) : null}
          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{t("privacyNote")}</p>
        </Card>

        {/* E) Account actions */}
        {user && (
          <Card title={t("settingsActions")}>
            <button
              type="button"
              onClick={() => void handleSignOut()}
              className="w-full rounded-xl border border-border px-4 py-2.5 text-sm font-bold text-foreground hover:border-primary hover:text-primary sm:w-auto"
            >
              {t("logout")}
            </button>

            <div className="mt-5 rounded-2xl border border-destructive/40 bg-destructive/5 p-4">
              <p className="text-sm font-bold text-destructive">{t("deleteAccount")}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{t("deleteAccountDesc")}</p>
              {!confirmDelete ? (
                <button
                  type="button"
                  onClick={() => setConfirmDelete(true)}
                  className="mt-3 rounded-xl border border-destructive px-4 py-2.5 text-sm font-bold text-destructive hover:bg-destructive hover:text-destructive-foreground"
                >
                  {t("deleteAccount")}
                </button>
              ) : (
                <div className="mt-3 space-y-3">
                  <p className="text-xs font-semibold text-foreground">
                    {t("deleteAccountConfirmDesc")}
                  </p>
                  <input
                    value={deleteText}
                    onChange={(e) => setDeleteText(e.target.value)}
                    aria-label={t("deleteAccountConfirmTitle")}
                    placeholder="DELETE"
                    dir="ltr"
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none focus:border-destructive"
                  />
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      disabled={deleteText.trim() !== "DELETE" || deleting}
                      onClick={() => void handleDelete()}
                      className="rounded-xl bg-destructive px-4 py-2.5 text-sm font-bold text-destructive-foreground disabled:opacity-50"
                    >
                      {deleting ? t("deleting") : t("deleteAccount")}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setConfirmDelete(false);
                        setDeleteText("");
                      }}
                      className="rounded-xl border border-border px-4 py-2.5 text-sm font-semibold text-foreground hover:border-primary hover:text-primary"
                    >
                      {t("cancel")}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </Card>
        )}

        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex rounded-xl border border-border px-4 py-2.5 text-sm font-semibold text-foreground hover:border-primary hover:text-primary"
          >
            {t("backHome")}
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function Card({
  title,
  desc,
  children,
}: {
  title: string;
  desc?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className="mt-6 rounded-3xl border border-border bg-card p-6"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <h2 className="text-lg font-bold text-card-foreground">{title}</h2>
      {desc ? <p className="mt-1 text-xs text-muted-foreground">{desc}</p> : null}
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Row({ label, value, ltr }: { label: string; value: string; ltr?: boolean }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-muted/50 px-4 py-3">
      <span className="text-xs font-semibold text-muted-foreground">{label}</span>
      <span
        className="min-w-0 truncate text-sm font-bold text-foreground"
        {...(ltr ? { dir: "ltr" as const } : {})}
      >
        {value}
      </span>
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
