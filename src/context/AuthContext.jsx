import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
// ^ Imports React helpers for context/state/effect/memoization

// ---- TEMP local storage keys (easy to swap later) ----
const LS_AUTH = "adminAuth";
const LS_ROLE = "adminRole";
const LS_EMAIL = "adminEmail";

// ---- Create a Context the whole app can read from ----
const AuthContext = createContext(null);

// ---- Hook to consume the context succinctly ----
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}

// ---- Provider component that holds auth state & actions ----
export function AuthProvider({ children }) {
  // 'user' can be expanded later (id, name). For now we infer from email.
  const [user, setUser] = useState(null);    // null | { email, role }
  const [booted, setBooted] = useState(false); // becomes true after initial check

  // ---- Boot-time check: today from localStorage; later from /api/auth/me ----
  useEffect(() => {
    // READ TEMP STATE from localStorage
    const authed = localStorage.getItem(LS_AUTH) === "true";
    const role = localStorage.getItem(LS_ROLE);
    const email = localStorage.getItem(LS_EMAIL);

    // If authed, set a user object; else keep null
    setUser(authed ? { email: email || "", role: role || "moderator" } : null);
    setBooted(true); // mark that we finished the boot check
  }, []);

  // ---- login() for the login page ----
  const login = async (email, password) => {
    // TODAY: mimic your local credential check (move your current logic here)
    // NOTE: You can import your ADMINS array here, or keep your existing helper and call it.
    const ADMINS = [
      { email: "admin1@example.com", password: "123456", role: "super" },
      { email: "admin2@example.com", password: "654321", role: "moderator" },
    ];

    const match = ADMINS.find(a => a.email === email && a.password === password);
    if (!match) return { ok: false, error: "Invalid credentials" };

    // Persist TEMP state for refresh. In production, server sets httpOnly cookie instead.
    localStorage.setItem(LS_AUTH, "true");
    localStorage.setItem(LS_ROLE, match.role);
    localStorage.setItem(LS_EMAIL, match.email);

    setUser({ email: match.email, role: match.role });
    return { ok: true, role: match.role };
  };

  // ---- logout() for the navbar button ----
  const logout = async () => {
    // TODAY: clear localStorage
    localStorage.removeItem(LS_AUTH);
    localStorage.removeItem(LS_ROLE);
    localStorage.removeItem(LS_EMAIL);
    setUser(null);

    // LATER: call /api/auth/logout then clear context
    // await api.post('/auth/logout');
  };

  // ---- small helpers ----
  const hasRole = (allowed = []) => {
    if (!user) return false;
    return allowed.length === 0 || allowed.includes(user.role);
  };

  // Memoize the value so consumers don’t re-render unnecessarily
  const value = useMemo(
    () => ({ user, booted, login, logout, hasRole }),
    [user, booted]
  );

  // Don’t render children until we finish the boot check (prevents flicker)
  if (!booted) return null; // or a global loader

  // Provide the auth state/actions to the whole subtree
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
