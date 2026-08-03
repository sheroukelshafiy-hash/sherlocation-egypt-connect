import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { SiteHeader } from "@/components/SiteHeader";
import { usePreferences } from "@/lib/preferences";
import { dashboardPathFor, useAuth } from "@/lib/auth";
import { AuthCard, FormError, PasswordField, SubmitButton } from "@/components/auth/AuthUI";

export const Route = createFileRoute("/reset-password")({
  ssr: false,
  component: ResetPasswordPage,
  head: () => ({
    meta: [
      { title: "تعيين كلمة مرور جديدة | شيرلوكيشن" },
      {
        name: "description",
        content: "أنشئ كلمة مرور جديدة لحسابك على شيرلوكيشن بعد طلب استعادة كلمة المرور.",
      },
      { property: "og:title", content: "تعيين كلمة مرور جديدة | شيرلوكيشن" },
      {
        property: "og:description",
        content: "صفحة آمنة لإعادة تعيين كلمة مرور حسابك على شيرلوكيشن.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

const passwordOk = (v: string) => v.length >= 8 && /[A-Za-z]/.test(v) && /\d/.test(v);

function ResetPasswordPage() {
  const { t } = usePreferences();
  const navigate = useNavigate();
  const { role } = useAuth();
  const [checking, setChecking] = useState(true);
  const [canReset, setCanReset] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!active) return;
      if (session) {
        setCanReset(true);
        setChecking(false);
      }
    });
    void (async () => {
      const { data } = await supabase.auth.getSession();
      if (!active) return;
      setCanReset(Boolean(data.session));
      setChecking(false);
    })();
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    const next: Record<string, string> = {};
    if (!password) next["password"] = t("errRequired");
    else if (!passwordOk(password)) next["password"] = t("errPasswordShort");
    if (confirm !== password) next["confirm"] = t("errPasswordMatch");
    setErrors(next);
    setFormError("");
    if (Object.keys(next).length) return;

    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (error) {
      setFormError(error.message);
      return;
    }
    toast.success(t("passwordUpdated"));
    void navigate({ to: dashboardPathFor(role), replace: true });
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto flex max-w-6xl flex-col items-center px-4 py-10 sm:px-6 sm:py-14">
        {checking ? (
          <AuthCard title={t("loadingText")}>
            <div className="flex justify-center py-2 text-muted-foreground">
              <span className="h-6 w-6 animate-spin rounded-full border-2 border-current border-t-transparent" />
            </div>
          </AuthCard>
        ) : canReset ? (
          <AuthCard title={t("resetTitle")} subtitle={t("resetSubtitle")}>
            <form className="space-y-4" onSubmit={submit} noValidate>
              <PasswordField
                id="new-password"
                label={t("newPassword")}
                value={password}
                onChange={setPassword}
                error={errors["password"]}
                autoComplete="new-password"
                disabled={busy}
                showLabel={t("showPassword")}
                hideLabel={t("hidePassword")}
              />
              <PasswordField
                id="confirm-new-password"
                label={t("confirmNewPassword")}
                value={confirm}
                onChange={setConfirm}
                error={errors["confirm"]}
                autoComplete="new-password"
                disabled={busy}
                showLabel={t("showPassword")}
                hideLabel={t("hidePassword")}
              />
              <FormError message={formError} />
              <SubmitButton busy={busy} label={t("updatePassword")} busyLabel={t("saving")} />
            </form>
          </AuthCard>
        ) : (
          <AuthCard title={t("resetLinkInvalid")}>
            <button
              type="button"
              onClick={() => navigate({ to: "/auth", search: { mode: "forgot" } })}
              className="w-full rounded-xl px-4 py-3 text-sm font-bold text-primary-foreground shadow-md"
              style={{ background: "var(--gradient-hero)" }}
            >
              {t("sendResetLink")}
            </button>
          </AuthCard>
        )}
      </main>
    </div>
  );
}
