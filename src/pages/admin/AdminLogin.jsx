// src/pages/admin/AdminLogin.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BackendFooter from "./DashboardComponents/BackendFooter";
import { useAuth } from "../../context/AuthContext"; // <— use context

export default function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, booted, login } = useAuth(); // <— context
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // If already authed, go straight to a role-safe landing
  useEffect(() => {
    if (!booted || !user) return;
    const safe = user.role === "super" ? "/admin/accepted" : "/admin/pending";
    navigate(safe, { replace: true });
  }, [booted, user, navigate]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await login(email, password); // <— updates context immediately
    if (!res.ok) {
      alert(res.error || "Invalid credentials");
      return;
    }
    const role = res.role;
    const safeDefault = role === "super" ? "/admin/accepted" : "/admin/pending";
    const next = location.state?.next;
    const target =
      role === "super"
        ? (next && next.startsWith("/admin") ? next : safeDefault)
        : safeDefault;

    navigate(target, { replace: true });
  };

  return (
    <div className="d-flex flex-column min-vh-100  m-4">
      <main className="form-signin w-100 m-auto py-4" style={{ maxWidth: "400px" }}>
        <form onSubmit={onSubmit}>
          <h1 className="h3 mb-3 fw-bold d-flex align-items-center">
            {/* … your SVG … */}
            Admin Portal
          </h1>

          <p className="text-muted mb-4">Administrator Login</p>

          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
              required
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <div className="form-check text-start my-3">
            <input className="form-check-input" type="checkbox" id="checkDefault" />
            <label className="form-check-label" htmlFor="checkDefault">Remember me</label>
          </div>

          <button className="btn btn-primary w-100 py-2" type="submit">Sign in</button>
          <p className="mt-5 mb-3 text-body-secondary text-center">© 2025 EKurdistan</p>
        </form>
      </main>
      <BackendFooter />
    </div>
  );
}
