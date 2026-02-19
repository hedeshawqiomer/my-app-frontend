// src/pages/admin/AdminLogin.jsx
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../PublicpagesComponents/Footer";
import { useAuth } from "../../context/AuthContext";
import { sanitizeNextPath } from "../../utills/nav";

export default function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, booted, login } = useAuth();
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState("");

  // Already authed? Go to role-safe landing immediately
  useEffect(() => {
    if (!booted || !user) return;
    const safe = user.role === "super" ? "/admin/accepted" : "/admin/pending";
    navigate(safe, { replace: true });
  }, [booted, user, navigate]);

  // Helper: read ?next= from querystring
  const nextFromSearch = (() => {
    try {
      const sp = new URLSearchParams(location.search);
      const raw = sp.get("next") || "";
      return raw;
    } catch {
      return "";
    }
  })();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setErr("");
    setSubmitting(true);

    const res = await login(email, password);
    if (!res.ok) {
      setErr(res.error || "Invalid credentials");
      setSubmitting(false);
      return;
    }

    // Preferred destination: state.next → sessionStorage → ?next=
    const rawNext =
      location.state?.next ||
      (() => {
        try {
          const s = sessionStorage.getItem("postLoginNext");
          sessionStorage.removeItem("postLoginNext");
          return s || "";
        } catch {
          return "";
        }
      })() ||
      nextFromSearch;

    const next = sanitizeNextPath(rawNext);
    const safeDefault = res.role === "super" ? "/admin/accepted" : "/admin/pending";
    const target = res.role === "super" ? next || safeDefault : safeDefault;

    try {
      const store = remember ? localStorage : sessionStorage;
      store.setItem("adminRemember", remember ? "1" : "0");
    } catch { /* ignore */ }

    navigate(target, { replace: true });
    setSubmitting(false);
  };

  if (!booted) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "40vh" }}>
        <div className="text-muted">{t('admin.login.loading')}</div>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column min-vh-100  me-4 ms-4">
      <main className="form-signin w-100 m-auto " style={{ maxWidth: 400 }}>
        <form onSubmit={onSubmit} noValidate>
          <h1 className="h3 mb-3 fw-bold d-flex align-items-center">{t('admin.login.portalTitle')}</h1>
          <p className="text-muted mb-4">{t('admin.login.portalSubtitle')}</p>

          {err && <div className="alert alert-danger py-2" role="alert">
            {err === "Invalid credentials" ? t('admin.login.invalid') : err}
          </div>}

          <div className="form-floating mb-3">
            <input
              type="email" className="form-control" id="floatingInput"
              placeholder="name@example.com" value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username" required
            />
            <label htmlFor="floatingInput">{t('admin.login.emailLabel')}</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="password" className="form-control" id="floatingPassword"
              placeholder="Password" value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password" required
            />
            <label htmlFor="floatingPassword">{t('admin.login.passwordLabel')}</label>
          </div>

          <div className="form-check text-start my-3">
            <input
              className="form-check-input" type="checkbox" id="checkDefault"
              checked={remember} onChange={(e) => setRemember(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="checkDefault">{t('admin.login.rememberMe')}</label>
          </div>

          <button className="btn btn-primary w-100 pt-2" type="submit" disabled={submitting}>
            {submitting ? t('admin.login.signingIn') : t('admin.login.signIn')}
          </button>


        </form>
      </main>
      <Footer simple />
    </div>
  );
}
