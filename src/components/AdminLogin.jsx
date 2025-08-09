import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BackendFooter from "./Layouts/BackendFooter";
import { loginLocal, isAuthed } from "../utills/Auth"; // <- from the helper I outlined

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // If already authed, go straight to Admin
  useEffect(() => {
    if (isAuthed()) navigate("/Admin", { replace: true });
  }, [navigate]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (loginLocal(email, password)) {
      navigate("/Admin", { replace: true });
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-body-tertiary">
      <main className="form-signin w-100 m-auto py-4" style={{ maxWidth: "400px" }}>
        <form onSubmit={onSubmit}>
          <h1 className="h3 mb-3 fw-bold d-flex align-items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.5em"
              height="1.5em"
              fill="currentColor"
              className="bi bi-person-check me-2"
              viewBox="0 0 16 16"
            >
              <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
              <path d="M8.256 14a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z" />
            </svg>
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
            <input
              className="form-check-input"
              type="checkbox"
              value="remember-me"
              id="checkDefault"
            />
            <label className="form-check-label" htmlFor="checkDefault">
              Remember me
            </label>
          </div>

          <button className="btn btn-primary w-100 py-2" type="submit">
            Sign in
          </button>

          <p className="mt-5 mb-3 text-body-secondary text-center">© 2025 EKurdistan</p>
        </form>
      </main>

      {/* Shared footer at the bottom, no extra whitespace */}
      <BackendFooter />
    </div>
  );
}
