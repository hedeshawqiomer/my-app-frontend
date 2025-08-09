// src/auth.js
export const ADMINS = [
  { email: "admin1@example.com", password: "123456" },
  { email: "admin2@example.com", password: "654321" },
];

export function loginLocal(email, password) {
  const ok = ADMINS.some(a => a.email === email && a.password === password);
  if (ok) localStorage.setItem("adminAuth", "true");
  return ok;
}

export function logoutLocal() {
  localStorage.removeItem("adminAuth");
}

export function isAuthed() {
  return localStorage.getItem("adminAuth") === "true";
}
