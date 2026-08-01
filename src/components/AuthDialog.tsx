import { useEffect, useState } from "react";
import { toast } from "sonner";
import { usePreferences } from "@/lib/preferences";
import { useDemoAuth, type UserRole } from "@/lib/demo-auth";

export function AuthDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { t } = usePreferences();
  const { signIn, signUp } = useDemoAuth();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [role, setRole] = useState<UserRole>("student");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) {
      setError("");
      setPassword("");
    }
  }, [open]);

  if (!open) return null;

  const roleLabel = role === "teacher" ? t("roleTeacher") : t("roleStudent");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim().slice(0, 255);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setError(t("invalidEmail"));
      return;
    }
    if (password.length < 6) {
      setError(t("invalidPassword"));
      return;
    }

    if (mode === "login") {
      const res = signIn(cleanEmail, password, role);
      if (!res.ok) {
        setError(t("badCredentials"));
        return;
      }
      toast.success(`${t("welcomeBack")} ${res.user.name} — ${roleLabel}`);
    } else {
      const cleanName = name.trim().slice(0, 60);
      if (!cleanName) {
        setError(t("invalidName"));
        return;
      }
      const res = signUp(cleanName, cleanEmail, role);
      if (!res.ok) {
        setError(t("badCredentials"));
        return;
      }
      toast.success(`${t("accountCreated")} ${res.user.name}`);
    }

    setName("");
    setEmail("");
    setPassword("");
    setError("");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-3xl border border-border bg-card p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-xl font-extrabold text-card-foreground">
              {mode === "login" ? t("login") : t("signup")}
            </h2>
            <p className="mt-0.5 text-xs text-muted-foreground">{t("chooseRoleHint")}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t("close")}
            className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-1 rounded-2xl bg-secondary p-1">
          {(["student", "teacher"] as UserRole[]).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => {
                setRole(r);
                setError("");
              }}
              className={`rounded-xl px-3 py-2 text-xs font-bold transition-colors ${
                role === r
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {r === "student" ? t("roleStudent") : t("roleTeacher")}
            </button>
          ))}
        </div>

        <form className="mt-4 space-y-3" onSubmit={submit}>
          {mode === "signup" && (
            <Field
              label={t("fullName")}
              type="text"
              value={name}
              onChange={setName}
              maxLength={60}
              autoComplete="name"
            />
          )}
          <Field
            label={t("email")}
            type="email"
            value={email}
            onChange={setEmail}
            maxLength={255}
            autoComplete="email"
            placeholder={
              role === "student"
                ? "student@sherlocation.com"
                : "teacher@sherlocation.com"
            }
          />
          <Field
            label={t("password")}
            type="password"
            value={password}
            onChange={setPassword}
            maxLength={72}
            autoComplete={mode === "login" ? "current-password" : "new-password"}
          />
          {error && (
            <p className="rounded-xl bg-destructive/10 px-3 py-2 text-xs font-semibold text-destructive" role="alert">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="mt-2 w-full rounded-xl px-4 py-3 text-sm font-bold text-primary-foreground shadow-md"
            style={{ background: "var(--gradient-hero)" }}
          >
            {mode === "login" ? `${t("login")} — ${roleLabel}` : t("signup")}
          </button>
        </form>

        <div className="mt-4 rounded-2xl border border-dashed border-border bg-secondary/50 p-3">
          <p className="text-[11px] font-bold text-foreground">{t("demoCredsTitle")}</p>
          <p className="mt-1 text-[11px] text-muted-foreground" dir="ltr">
            student@sherlocation.com | student123
          </p>
          <p className="text-[11px] text-muted-foreground" dir="ltr">
            teacher@sherlocation.com | teacher123
          </p>
        </div>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          {mode === "login" ? t("noAccount") : t("haveAccount")}{" "}
          <button
            type="button"
            className="font-bold text-primary hover:underline"
            onClick={() => {
              setError("");
              setMode(mode === "login" ? "signup" : "login");
            }}
          >
            {mode === "login" ? t("signup") : t("login")}
          </button>
        </p>
        <p className="mt-2 text-center text-[11px] text-muted-foreground">{t("demoNote")}</p>
      </div>
    </div>
  );
}

function Field({
  label,
  type,
  value,
  onChange,
  maxLength,
  autoComplete,
  placeholder,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  maxLength?: number;
  autoComplete?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-bold text-muted-foreground">{label}</span>
      <input
        type={type}
        required
        value={value}
        maxLength={maxLength}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40"
      />
    </label>
  );
}
