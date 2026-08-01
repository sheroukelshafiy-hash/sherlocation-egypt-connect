import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type UserRole = "student" | "teacher";

export type DemoUser = {
  name: string;
  email: string;
  role: UserRole;
};

export type AuthResult = { ok: true; user: DemoUser } | { ok: false; error: string };

type AuthCtx = {
  user: DemoUser | null;
  ready: boolean;
  signIn: (email: string, password: string, role: UserRole) => AuthResult;
  signUp: (name: string, email: string, role: UserRole) => AuthResult;
  signOut: () => void;
  initials: string;
};

const STORAGE_KEY = "sl-demo-user";

/** Demo credentials shipped for external testers. */
export const MOCK_USERS = [
  {
    email: "student@sherlocation.com",
    password: "student123",
    name: "شروق الشافعي",
    role: "student" as UserRole,
  },
  {
    email: "teacher@sherlocation.com",
    password: "teacher123",
    name: "أ. أحمد الشافعي",
    role: "teacher" as UserRole,
  },
];

const Ctx = createContext<AuthCtx | null>(null);

export function getInitials(name: string) {
  const parts = name.replace(/^أ\.\s*/, "").trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

function clearWorkspace() {
  try {
    localStorage.removeItem("sl-teacher-classes");
  } catch {
    /* ignore */
  }
}

export function DemoAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<DemoUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as DemoUser;
        if (parsed?.name && parsed?.email) {
          setUser({ ...parsed, role: parsed.role === "teacher" ? "teacher" : "student" });
        }
      }
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  const value = useMemo<AuthCtx>(() => {
    const persist = (u: DemoUser) => {
      setUser(u);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
      } catch {
        /* ignore */
      }
    };

    return {
      user,
      ready,
      initials: user ? getInitials(user.name) : "",
      signIn: (email, password, role) => {
        const found = MOCK_USERS.find(
          (u) =>
            u.email.toLowerCase() === email.trim().toLowerCase() &&
            u.password === password &&
            u.role === role,
        );
        if (!found) return { ok: false, error: "badCredentials" };
        const u: DemoUser = { name: found.name, email: found.email, role: found.role };
        clearWorkspace();
        persist(u);
        return { ok: true, user: u };
      },
      signUp: (name, email, role) => {
        const u: DemoUser = { name: name.trim(), email: email.trim(), role };
        clearWorkspace();
        persist(u);
        return { ok: true, user: u };
      },
      signOut: () => {
        setUser(null);
        try {
          localStorage.removeItem(STORAGE_KEY);
        } catch {
          /* ignore */
        }
        clearWorkspace();
      },
    };
  }, [user, ready]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useDemoAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useDemoAuth must be used within DemoAuthProvider");
  return ctx;
}
