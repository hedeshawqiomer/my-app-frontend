// src/utills/Auth.js
export const ADMINS = [
  { email: "admin1@example.com", password: "123456", role: "super" }, // sees all
  { email: "admin2@example.com", password: "654321", role: "moderator" }, // pending only
];

export function loginLocal(email, password) {
  const found = ADMINS.find(a => a.email === email && a.password === password);
  if (found) {
    localStorage.setItem("adminAuth", "true");
    localStorage.setItem("adminRole", found.role);  // NEW
    localStorage.setItem("adminEmail", found.email);
    return true;
  }
  return false;
}

export function logoutLocal() {
  localStorage.removeItem("adminAuth");
  localStorage.removeItem("adminRole");
  localStorage.removeItem("adminEmail");
}

export function isAuthed() {
  return localStorage.getItem("adminAuth") === "true";
}

export function getRole() {
  return localStorage.getItem("adminRole") || "moderator";
}
