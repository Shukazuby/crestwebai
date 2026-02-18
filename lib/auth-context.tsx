"use client";

import * as React from "react";
import { AuthModal } from "@/components/AuthModal";

const STORAGE_KEY = "crestweb_user";
const TOKEN_KEY = "crestweb_token";

export interface User {
  id: string;
  email: string;
  name: string;
  company?: string;
  credits: number;
}

interface AuthContextValue {
  user: User | null;
  isReady: boolean;
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, data?: { name?: string; company?: string }) => Promise<boolean>;
  logout: () => void;
  updateUser: (updates: Partial<Omit<User, "id">>) => void;
  setCredits: (credits: number) => void;
  refreshUser: () => Promise<void>;
  /** Headers to attach to API requests when the user is authenticated (e.g. Authorization: Bearer &lt;token&gt;) */
  getAuthHeaders: () => HeadersInit;
  authModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
}

const DEFAULT_CREDITS = 5;

function loadUser(): User | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const u = JSON.parse(raw) as User;
    if (typeof u.credits !== "number") u.credits = DEFAULT_CREDITS;
    return u;
  } catch {
    return null;
  }
}

function saveUser(user: User | null) {
  if (typeof window === "undefined") return;
  if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  else localStorage.removeItem(STORAGE_KEY);
}

function loadToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

function saveToken(token: string | null) {
  if (typeof window === "undefined") return;
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

const AuthContext = React.createContext<AuthContextValue | null>(null);

const API_BASE = typeof window !== "undefined" ? (process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3045") : "";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null);
  const [token, setTokenState] = React.useState<string | null>(null);
  const [isReady, setIsReady] = React.useState(false);
  const [authModalOpen, setAuthModalOpen] = React.useState(false);

  // Restore session from storage; only keep user when we have a token so UI stays in sync
  React.useEffect(() => {
    const storedToken = loadToken();
    const storedUser = loadUser();
    setTokenState(storedToken);
    setUser(storedToken ? storedUser : null);
    setIsReady(true);
  }, []);

  // Validate session with GET /auth/me when we have a token (wire auth API to app)
  React.useEffect(() => {
    if (!API_BASE || !token) return;
    const controller = new AbortController();
    fetch(`${API_BASE}/auth/me`, {
      signal: controller.signal,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (res.status === 401) {
          setUser(null);
          setTokenState(null);
          saveUser(null);
          saveToken(null);
          return;
        }
        if (!res.ok) return;
        return res.json();
      })
      .then((data) => {
        if (!data?.id) return;
        const u: User = {
          id: data.id,
          email: data.email ?? "",
          name: data.name ?? "",
          company: data.company ?? "",
          credits: typeof data.credits === "number" ? data.credits : DEFAULT_CREDITS,
        };
        setUser(u);
        saveUser(u);
      })
      .catch(() => {});
    return () => controller.abort();
  }, [token]);

  // Sync credits from backend when user is present (GET /user/:id as fallback refresh)
  React.useEffect(() => {
    if (!user?.id || !API_BASE) return;
    refreshUser();
  }, [user?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const login = React.useCallback(async (email: string, password: string): Promise<boolean> => {
    if (!API_BASE) return false;
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });
      const data = await res.json();
      if (!res.ok) {
        return false;
      }
      const u: User = {
        id: data.user.id,
        email: data.user.email,
        name: data.user.name ?? "",
        company: data.user.company ?? "",
        credits: data.user.credits ?? DEFAULT_CREDITS,
      };
      setUser(u);
      setTokenState(data.access_token);
      saveUser(u);
      saveToken(data.access_token);
      return true;
    } catch {
      return false;
    }
  }, []);

  const register = React.useCallback(
    async (
      email: string,
      password: string,
      data?: { name?: string; company?: string }
    ): Promise<boolean> => {
      if (!API_BASE) return false;
      try {
        const res = await fetch(`${API_BASE}/auth/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email.trim(),
            password,
            name: data?.name ?? "",
            company: data?.company ?? "",
          }),
        });
        const result = await res.json();
        if (!res.ok) {
          return false;
        }
        const u: User = {
          id: result.user.id,
          email: result.user.email,
          name: result.user.name ?? "",
          company: result.user.company ?? "",
          credits: result.user.credits ?? DEFAULT_CREDITS,
        };
        setUser(u);
        setTokenState(result.access_token);
        saveUser(u);
        saveToken(result.access_token);
        return true;
      } catch {
        return false;
      }
    },
    []
  );

  const setCredits = React.useCallback((credits: number) => {
    setUser((prev) => {
      if (!prev) return null;
      const next = { ...prev, credits };
      saveUser(next);
      return next;
    });
  }, []);

  const refreshUser = React.useCallback(async () => {
    const current = loadUser();
    const authToken = loadToken();
    if (!current?.id || !API_BASE) return;
    try {
      const headers: HeadersInit = {};
      if (authToken) headers["Authorization"] = `Bearer ${authToken}`;
      const res = await fetch(`${API_BASE}/user/${encodeURIComponent(current.id)}`, { headers });
      if (!res.ok) return;
      const data = await res.json();
      setUser((prev) => {
        if (!prev || prev.id !== data.id) return prev;
        const next = { ...prev, credits: data.credits ?? prev.credits };
        saveUser(next);
        return next;
      });
    } catch {
      // ignore
    }
  }, []);

  const logout = React.useCallback(() => {
    setUser(null);
    setTokenState(null);
    saveUser(null);
    saveToken(null);
  }, []);

  const updateUser = React.useCallback((updates: Partial<Omit<User, "id">>) => {
    setUser((prev) => {
      if (!prev) return null;
      const next = { ...prev, ...updates };
      saveUser(next);
      return next;
    });
  }, []);

  const openAuthModal = React.useCallback(() => setAuthModalOpen(true), []);
  const closeAuthModal = React.useCallback(() => setAuthModalOpen(false), []);

  const getAuthHeaders = React.useCallback((): HeadersInit => {
    const t = typeof window !== "undefined" ? loadToken() : null;
    if (!t) return {};
    return { Authorization: `Bearer ${t}` };
  }, []);

  const value = React.useMemo(
    () => ({
      user,
      isReady,
      token,
      login,
      register,
      logout,
      updateUser,
      setCredits,
      refreshUser,
      getAuthHeaders,
      authModalOpen,
      openAuthModal,
      closeAuthModal,
    }),
    [
      user,
      isReady,
      token,
      login,
      register,
      logout,
      updateUser,
      setCredits,
      refreshUser,
      getAuthHeaders,
      authModalOpen,
      openAuthModal,
      closeAuthModal,
    ]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
      <AuthModal
        open={authModalOpen}
        onClose={closeAuthModal}
        onSuccessRedirect="/dashboard"
      />
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = React.useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
