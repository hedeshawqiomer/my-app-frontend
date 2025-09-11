// src/api/client.js
import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000",
  withCredentials: true,
  timeout: 15000,                              // ⬅️ avoid hanging requests
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",     // ⬅️ helps servers detect AJAX
  },
});

let redirectingToLogin = false;

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err?.response?.status;
    const path = typeof window !== "undefined" ? window.location.pathname : "";
    const isAdminRoute = path.startsWith("/admin") && path !== "/admin/login";

    if (status === 401 && isAdminRoute && !redirectingToLogin) {
      redirectingToLogin = true;
      try {
        sessionStorage.setItem("postLoginNext", path + (window.location.search || ""));
      } catch {
        // ignore 
      }
      window.location.replace("/admin/login");
      return new Promise(() => {});                 // ⬅️ stop further handling
    }

    if (status === 403 && isAdminRoute) {
      window.location.replace("/admin/pending");
      return new Promise(() => {});                 // ⬅️ stop further handling
    }

    return Promise.reject(err);
  }
);

