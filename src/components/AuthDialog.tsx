import { useEffect, useState } from "react";
import { usePreferences } from "@/lib/preferences";
import { useDemoAuth } from "@/lib/demo-auth";

export function AuthDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { t } = usePreferences();
  const { signIn } = useDemoAuth();
  const [mode, setMode] = useState<"login" | "signup">("login");
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

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim().slice(0, 255);
    const cleanName =
      (mode === "signup" ? name.trim() : "").slice(0, 60) ||
      cleanEmail.split("@")[0] ||
      "";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setError(t("invalidEmail"));
      return;
    }
    if (!cleanName) {
      setError(t("invalidName"));
      return;
    }
    if (password.length < 6) {
      setError(t("invalidPassword"));
      return;
    }
    signIn({ name: cleanName, email: cleanEmail });
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
        className="w-full max-w-md rounded-3xl border border-border bg-card p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-xl font-extrabold text-card-foreground">
            {mode === "login" ? t("login") : t("signup")}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={t("close")}
            className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>

        <form className="mt-5 space-y-3" onSubmit={submit}>
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
            <p className="text-xs font-semibold text-destructive" role="alert">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="mt-2 w-full rounded-xl px-4 py-3 text-sm font-bold text-primary-foreground shadow-md"
            style={{ background: "var(--gradient-hero)" }}
          >
            {mode === "login" ? t("login") : t("signup")}
          </button>
        </form>

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
}: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  maxLength?: number;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-bold text-muted-foreground">{label}</span>
      <input
        type={type}
        required
        value={value}
        maxLength={maxLength}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40"
      />
    </label>
  );
}
