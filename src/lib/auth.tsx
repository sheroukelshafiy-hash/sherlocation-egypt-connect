import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export type UserRole = "student" | "guardian" | "teacher";

export type Profile = {
  id: string;
  full_name: string;
  email: string;
};

type AuthCtx = {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  role: UserRole | null;
  loading: boolean;
  initials: string;
  displayName: string;
  signOut: () => Promise<void>;
  refresh: () => Promise<void>;
};

const Ctx = createContext<AuthCtx | null>(null);

export function getInitials(name: string) {
  const parts = name
    .replace(/^أ\.\s*/, "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return (parts[0]![0]! + parts[1]![0]!).toUpperCase();
}

/** Where a signed-in user belongs, based on their backend role. */
export function dashboardPathFor(role: UserRole | null) {
  return role === "teacher" ? "/dashboard/teacher" : "/dashboard/student";
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);

  const loadAccount = useCallback(async (uid: string | undefined) => {
    if (!uid) {
      setProfile(null);
      setRole(null);
      return;
    }
    const [{ data: p }, { data: r }] = await Promise.all([
      supabase.from("profiles").select("id, full_name, email").eq("id", uid).maybeSingle(),
      supabase.from("user_roles").select("role").eq("user_id", uid).limit(1).maybeSingle(),
    ]);
    setProfile((p as Profile | null) ?? null);
    setRole(((r?.role as UserRole | undefined) ?? null) as UserRole | null);
  }, []);

  useEffect(() => {
    let active = true;

    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => {
      if (!active) return;
      setSession(next);
      // Never call other supabase APIs synchronously inside this callback.
      setTimeout(() => {
        void loadAccount(next?.user?.id);
      }, 0);
    });

    void (async () => {
      const { data } = await supabase.auth.getSession();
      if (!active) return;
      setSession(data.session);
      await loadAccount(data.session?.user?.id);
      if (active) setLoading(false);
    })();

    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, [loadAccount]);

  const value = useMemo<AuthCtx>(() => {
    const user = session?.user ?? null;
    const displayName =
      profile?.full_name?.trim() ||
      (user?.user_metadata?.["full_name"] as string | undefined)?.trim() ||
      user?.email?.split("@")[0] ||
      "";

    return {
      user,
      session,
      profile,
      role,
      loading,
      displayName,
      initials: displayName ? getInitials(displayName) : "",
      signOut: async () => {
        await supabase.auth.signOut();
        setProfile(null);
        setRole(null);
      },
      refresh: async () => {
        await loadAccount(session?.user?.id);
      },
    };
  }, [session, profile, role, loading, loadAccount]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
