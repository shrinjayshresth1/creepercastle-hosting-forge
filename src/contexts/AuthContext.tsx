import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { User } from "@/lib/api";
import * as api from "@/lib/api";

// ─── Types ────────────────────────────────────────────────────────────────────

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  /** Called by Register page after completion */
  setSession: (accessToken: string, user: User) => void;
  /** Re-fetches user from /api/auth/me — call after KYC or profile update */
  refreshUser: () => Promise<void>;
}

// ─── Context ─────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue | null>(null);

// ─── Token refresh scheduling ─────────────────────────────────────────────────

/** Refresh 60 seconds before a 15-minute token expires (14 min = 840 000 ms) */
const REFRESH_INTERVAL_MS = 14 * 60 * 1000;

// ─── Provider ────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    accessToken: null,
    isAuthenticated: false,
    isLoading: true,
  });

  const refreshTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Schedule the next silent refresh
  const scheduleRefresh = useCallback(() => {
    if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current);
    refreshTimerRef.current = setTimeout(async () => {
      try {
        const { accessToken } = await api.refreshToken();
        const { user } = await api.getMe(accessToken);
        setState({ user, accessToken, isAuthenticated: true, isLoading: false });
        scheduleRefresh();
      } catch {
        // Refresh failed — log the user out silently
        setState({ user: null, accessToken: null, isAuthenticated: false, isLoading: false });
      }
    }, REFRESH_INTERVAL_MS);
  }, []);

  // On mount: try a silent refresh to restore session
  useEffect(() => {
    (async () => {
      try {
        const { accessToken } = await api.refreshToken();
        const { user } = await api.getMe(accessToken);
        setState({ user, accessToken, isAuthenticated: true, isLoading: false });
        scheduleRefresh();
      } catch {
        setState({ user: null, accessToken: null, isAuthenticated: false, isLoading: false });
      }
    })();

    return () => {
      if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current);
    };
  }, [scheduleRefresh]);

  // ─── External API ──────────────────────────────────────────────────────────

  const login = useCallback(
    async (email: string, password: string) => {
      const { accessToken, user } = await api.login(email, password);
      setState({ user, accessToken, isAuthenticated: true, isLoading: false });
      scheduleRefresh();
    },
    [scheduleRefresh]
  );

  const logout = useCallback(async () => {
    try {
      await api.logout();
    } catch {
      // Even if server call fails, clear local state
    }
    if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current);
    setState({ user: null, accessToken: null, isAuthenticated: false, isLoading: false });
  }, []);

  /** Used by Register.tsx after successful registration */
  const setSession = useCallback(
    (accessToken: string, user: User) => {
      setState({ user, accessToken, isAuthenticated: true, isLoading: false });
      scheduleRefresh();
    },
    [scheduleRefresh]
  );

  /** Re-fetches the user object — call after KYC or profile changes */
  const refreshUser = useCallback(async () => {
    if (!state.accessToken) return;
    try {
      const { user } = await api.getMe(state.accessToken);
      setState((prev) => ({ ...prev, user }));
    } catch {
      // Silently ignore
    }
  }, [state.accessToken]);

  return (
    <AuthContext.Provider
      value={{ ...state, login, logout, setSession, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
