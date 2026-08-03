import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { SiteHeader } from "@/components/SiteHeader";
import { usePreferences } from "@/lib/preferences";
import { dashboardPathFor, useAuth, type UserRole } from "@/lib/auth";
import { AuthCard, AuthField, PasswordField, SubmitButton, FormError } from "@/components/auth/AuthUI";

const searchSchema = z.object({
  mode: z.enum(["login", "signup", "forgot"]).optional(),
});

export const Route = createFileRoute("/auth")({
  validateSearch: searchSchema,
  component: AuthPage,
  head: () => ({
    meta: [
      { title: "تسجيل الدخول | شيرلوكيشن" },
      {
        name: "description",
        content:
          "سجّل دخولك أو أنشئ حساب طالب أو ولي أمر أو مدرس على شيرلوكيشن للوصول إلى لوحتك التعليمية.",
      },
      { property: "og:title", content: "تسجيل الدخول إلى شيرلوكيشن" },
      {
        property: "og:description",
        content: "حساب واحد للطلاب وأولياء الأمور والمدرسين على منصة شيرلوكيشن.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

type Mode = "login" | "signup" | "forgot";

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const passwordOk = (v: string) => v.length >= 8 && /[A-Za-z]/.test(v) && /\d/.test(v);

function AuthPage() {
  const { t } = usePreferences();
  const navigate = useNavigate();
  const { user, role, loading } = useAuth();
  const search = Route.useSearch();
  const [mode, setMode] = useState<Mode>(search.mode ?? "login");

  useEffect(() => {
    if (search.mode) setMode(search.mode);
  }, [search.mode]);

  // Already signed in → straight to the right dashboard.
  useEffect(() => {
    if (!loading && user) {
      void navigate({ to: dashboardPathFor(role), replace: true });
    }
  }, [loading, user, role, navigate]);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto flex max-w-6xl flex-col items-center px-4 py-10 sm:px-6 sm:py-14">
        {mode === "login" && <LoginForm t={t} onMode={setMode} />}
        {mode === "signup" && <SignupForm t={t} onMode={setMode} />}
        {mode === "forgot" && <ForgotForm t={t} onMode={setMode} />}
        <p className="mt-6 text-center text-xs text-muted-foreground">
          <Link to="/" className="font-semibold text-primary hover:underline">
            {t("backHome")}
          </Link>
        </p>
      </main>
    </div>
  );
}

type T = ReturnType<typeof usePreferences>["t"];

function mapAuthError(message: string, t: T) {
  const m = message.toLowerCase();
  if (m.includes("invalid login") || m.includes("invalid credentials")) return t("errInvalidCredentials");
  if (m.includes("email not confirmed")) return t("errEmailNotConfirmed");
  if (m.includes("already registered") || m.includes("already been registered") || m.includes("user already"))
    return t("errEmailTaken");
  if (m.includes("failed to fetch") || m.includes("network")) return t("errNetwork");
  return message;
}

function LoginForm({ t, onMode }: { t: T; onMode: (m: Mode) => void }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    const next: Record<string, string> = {};
    if (!email.trim()) next["email"] = t("errRequired");
    else if (!emailOk(email.trim())) next["email"] = t("errEmail");
    if (!password) next["password"] = t("errRequired");
    setErrors(next);
    setFormError("");
    if (Object.keys(next).length) return;

    setBusy(true);
    try {
      localStorage.setItem("sl-remember", remember ? "true" : "false");
    } catch {
      /* ignore */
    }
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });
    if (error) {
      setBusy(false);
      setFormError(mapAuthError(error.message, t));
      return;
    }
    const uid = data.user?.id;
    let userRole: UserRole | null = null;
    if (uid) {
      const { data: r } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", uid)
        .limit(1)
        .maybeSingle();
      userRole = (r?.role as UserRole | undefined) ?? null;
    }
    toast.success(t("loginSuccess"));
    setBusy(false);
    void navigate({ to: dashboardPathFor(userRole), replace: true });
  };

  return (
    <AuthCard title={t("authLoginTitle")} subtitle={t("authLoginSubtitle")}>
      <form className="space-y-4" onSubmit={submit} noValidate>
        <AuthField
          id="login-email"
          label={t("email")}
          type="email"
          value={email}
          onChange={setEmail}
          error={errors["email"]}
          autoComplete="email"
          maxLength={255}
          disabled={busy}
        />
        <PasswordField
          id="login-password"
          label={t("password")}
          value={password}
          onChange={setPassword}
          error={errors["password"]}
          autoComplete="current-password"
          disabled={busy}
          showLabel={t("showPassword")}
          hideLabel={t("hidePassword")}
        />

        <div className="flex flex-wrap items-center justify-between gap-2">
          <label className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="h-4 w-4 rounded border-input accent-[hsl(var(--primary))]"
              disabled={busy}
            />
            {t("rememberMe")}
          </label>
          <button
            type="button"
            onClick={() => onMode("forgot")}
            className="text-xs font-bold text-primary hover:underline"
          >
            {t("forgotPassword")}
          </button>
        </div>

        <FormError message={formError} />
        <SubmitButton busy={busy} label={t("login")} busyLabel={t("signingIn")} />
      </form>

      <p className="mt-5 text-center text-xs text-muted-foreground">
        {t("noAccount")}{" "}
        <button type="button" className="font-bold text-primary hover:underline" onClick={() => onMode("signup")}>
          {t("signup")}
        </button>
      </p>
    </AuthCard>
  );
}

function SignupForm({ t, onMode }: { t: T; onMode: (m: Mode) => void }) {
  const navigate = useNavigate();
  const [role, setRole] = useState<UserRole>("student");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    const next: Record<string, string> = {};
    if (!fullName.trim()) next["fullName"] = t("errRequired");
    if (!email.trim()) next["email"] = t("errRequired");
    else if (!emailOk(email.trim())) next["email"] = t("errEmail");
    if (!password) next["password"] = t("errRequired");
    else if (!passwordOk(password)) next["password"] = t("errPasswordShort");
    if (confirm !== password) next["confirm"] = t("errPasswordMatch");
    setErrors(next);
    setFormError("");
    if (Object.keys(next).length) return;

    setBusy(true);
    const { data, error } = await supabase.auth.signUp({
      email: email.trim().toLowerCase(),
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth`,
        data: { full_name: fullName.trim().slice(0, 80), role },
      },
    });
    setBusy(false);
    if (error) {
      setFormError(mapAuthError(error.message, t));
      return;
    }
    if (data.session) {
      toast.success(t("loginSuccess"));
      void navigate({ to: dashboardPathFor(role), replace: true });
      return;
    }
    setSent(true);
  };

  if (sent) {
    return (
      <AuthCard title={t("checkEmailTitle")} subtitle={t("checkEmailDesc")}>
        <button
          type="button"
          onClick={() => onMode("login")}
          className="w-full rounded-xl border border-border px-4 py-3 text-sm font-bold text-foreground hover:border-primary hover:text-primary"
        >
          {t("backToLogin")}
        </button>
      </AuthCard>
    );
  }

  const roles: { value: UserRole; label: string }[] = [
    { value: "student", label: t("roleStudentOnly") },
    { value: "guardian", label: t("roleGuardian") },
    { value: "teacher", label: t("roleTeacher") },
  ];

  return (
    <AuthCard title={t("authSignupTitle")} subtitle={t("authSignupSubtitle")}>
      <form className="space-y-4" onSubmit={submit} noValidate>
        <div>
          <span className="mb-1.5 block text-xs font-bold text-muted-foreground">{t("accountType")}</span>
          <div className="grid grid-cols-3 gap-1 rounded-2xl bg-secondary p-1">
            {roles.map((r) => (
              <button
                key={r.value}
                type="button"
                disabled={busy}
                onClick={() => setRole(r.value)}
                className={`rounded-xl px-2 py-2 text-xs font-bold transition-colors ${
                  role === r.value
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        <AuthField
          id="signup-name"
          label={t("fullName")}
          type="text"
          value={fullName}
          onChange={setFullName}
          error={errors["fullName"]}
          autoComplete="name"
          maxLength={80}
          disabled={busy}
        />
        <AuthField
          id="signup-email"
          label={t("email")}
          type="email"
          value={email}
          onChange={setEmail}
          error={errors["email"]}
          autoComplete="email"
          maxLength={255}
          disabled={busy}
        />
        <PasswordField
          id="signup-password"
          label={t("password")}
          value={password}
          onChange={setPassword}
          error={errors["password"]}
          autoComplete="new-password"
          disabled={busy}
          showLabel={t("showPassword")}
          hideLabel={t("hidePassword")}
        />
        <PasswordField
          id="signup-confirm"
          label={t("confirmPassword")}
          value={confirm}
          onChange={setConfirm}
          error={errors["confirm"]}
          autoComplete="new-password"
          disabled={busy}
          showLabel={t("showPassword")}
          hideLabel={t("hidePassword")}
        />

        <FormError message={formError} />
        <SubmitButton busy={busy} label={t("signup")} busyLabel={t("creatingAccount")} />
      </form>

      <p className="mt-5 text-center text-xs text-muted-foreground">
        {t("haveAccount")}{" "}
        <button type="button" className="font-bold text-primary hover:underline" onClick={() => onMode("login")}>
          {t("login")}
        </button>
      </p>
    </AuthCard>
  );
}

function ForgotForm({ t, onMode }: { t: T; onMode: (m: Mode) => void }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [formError, setFormError] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    if (!email.trim()) {
      setError(t("errRequired"));
      return;
    }
    if (!emailOk(email.trim())) {
      setError(t("errEmail"));
      return;
    }
    setError("");
    setFormError("");
    setBusy(true);
    const { error: err } = await supabase.auth.resetPasswordForEmail(email.trim().toLowerCase(), {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setBusy(false);
    if (err) {
      setFormError(mapAuthError(err.message, t));
      return;
    }
    setSent(true);
  };

  if (sent) {
    return (
      <AuthCard title={t("resetSentTitle")} subtitle={t("resetSentDesc")}>
        <button
          type="button"
          onClick={() => onMode("login")}
          className="w-full rounded-xl border border-border px-4 py-3 text-sm font-bold text-foreground hover:border-primary hover:text-primary"
        >
          {t("backToLogin")}
        </button>
      </AuthCard>
    );
  }

  return (
    <AuthCard title={t("forgotTitle")} subtitle={t("forgotSubtitle")}>
      <form className="space-y-4" onSubmit={submit} noValidate>
        <AuthField
          id="forgot-email"
          label={t("email")}
          type="email"
          value={email}
          onChange={setEmail}
          error={error}
          autoComplete="email"
          maxLength={255}
          disabled={busy}
        />
        <FormError message={formError} />
        <SubmitButton busy={busy} label={t("sendResetLink")} busyLabel={t("sending")} />
      </form>
      <p className="mt-5 text-center text-xs text-muted-foreground">
        <button type="button" className="font-bold text-primary hover:underline" onClick={() => onMode("login")}>
          {t("backToLogin")}
        </button>
      </p>
    </AuthCard>
  );
}
