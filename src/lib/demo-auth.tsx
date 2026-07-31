import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type DemoUser = {
  name: string;
  email: string;
};

type AuthCtx = {
  user: DemoUser | null;
  ready: boolean;
  signIn: (user: DemoUser) => void;
  signOut: () => void;
  initials: string;
};

const STORAGE_KEY = "sl-demo-user";

const Ctx = createContext<AuthCtx | null>(null);

export function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

export function DemoAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<DemoUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as DemoUser;
        if (parsed?.name && parsed?.email) setUser(parsed);
      }
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  const value = useMemo<AuthCtx>(
    () => ({
      user,
      ready,
      initials: user ? getInitials(user.name) : "",
      signIn: (u) => {
        setUser(u);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
          // zero-state workspace for each new tester
          localStorage.removeItem("sl-teacher-classes");
        } catch {
          /* ignore */
        }
      },
      signOut: () => {
        setUser(null);
        try {
          localStorage.removeItem(STORAGE_KEY);
          localStorage.removeItem("sl-teacher-classes");
        } catch {
          /* ignore */
        }
      },
    }),
    [user, ready],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useDemoAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useDemoAuth must be used within DemoAuthProvider");
  return ctx;
}
