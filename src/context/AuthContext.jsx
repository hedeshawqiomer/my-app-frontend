// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { apiLogin, apiMe, apiLogout } from "../api/auth";

const AuthContext = createContext(null);
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);   // null | { id, email, role }
  const [booted, setBooted] = useState(false);

  // Boot — ask the server who I am (uses session cookie)
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const me = await apiMe(); // GET /auth/me
        if (mounted) setUser(me);
      } catch {
        if (mounted) setUser(null);
      } finally {
        if (mounted) setBooted(true);
      }
    })();
    return () => { mounted = false; };
  }, []);

  // Login — call backend, set user; keep same return shape used by your pages
  const login = async (email, password) => {
    try {
      const me = await apiLogin(email, password); // POST /auth/login
      setUser(me);
      return { ok: true, role: me.role };
    } catch (err) {
      const msg = err?.response?.data?.error || "Invalid credentials";
      return { ok: false, error: msg };
    }
  };

  // Logout — clear server session + local state
  const logout = async () => {
    try { await apiLogout(); } catch {
      // ignore, still clear local state
    }
    setUser(null);
  };
  const hasRole = (allowed = []) => {
    if (!user) return false;
    return allowed.length === 0 || allowed.includes(user.role);
  };

  const value = useMemo(() => ({ user, booted, login, logout, hasRole }), [user, booted]);

  if (!booted) return null; // or a global spinner

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
