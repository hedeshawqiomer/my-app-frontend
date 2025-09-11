import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { apiLogin, apiMe, apiLogout } from "../api/auth";

const AuthContext = createContext(null);
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const me = await apiMe();
        if (mounted) setUser(me || null);
      } catch {
        if (mounted) setUser(null);
      } finally {
        if (mounted) setBooted(true);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const login = async (email, password) => {
    try {
      const me = await apiLogin(email, password);
      setUser(me);
      return { ok: true, role: me.role };
    } catch (err) {
      const msg = err?.response?.data?.error || "Invalid credentials";
      return { ok: false, error: msg };
    }
  };

  const logout = async () => {
  try { await apiLogout(); } catch { /* ignore */ }
    setUser(null);
    try { await apiLogout(); } catch { /* ignore */ }
    // tell the interceptor we are intentionally logging out
    try { sessionStorage.setItem("loggingOut", "1"); } catch {
      // ignore
    }
    setUser(null);
    // clear any stale "next" and land on login by REPLACING history
    try { sessionStorage.removeItem("postLoginNext"); } catch {
      // ignore
    }
    // Replace so the previous entry isn't a protected admin page
    window.location.replace("/admin/login");
  };

  const hasRole = (allowed = []) => {
    if (!user) return false;
    if (!allowed?.length) return true;
    const wanted = new Set(allowed.map((r) => String(r || "").toLowerCase()));
    return wanted.has(String(user.role || "").toLowerCase());
  };

  const value = useMemo(() => ({ user, booted, login, logout, hasRole }), [user, booted]);

  if (!booted) {
    return <div className="text-center py-5" role="status" aria-live="polite">Loading…</div>;
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
