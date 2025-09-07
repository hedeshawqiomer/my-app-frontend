// src/utils/nav.js
export function sanitizeNextPath(next) {
  if (typeof next !== "string") return "/admin/pending";
  const lower = next.toLowerCase().trim();
  if (lower.startsWith("http://") || lower.startsWith("https://") || lower.startsWith("//")) {
    return "/admin/pending";
  }
  if (!next.startsWith("/")) next = "/" + next;
  if (!next.startsWith("/admin")) return "/admin/pending";
  if (next === "/admin" || next === "/admin/") return "/admin/pending";
  if (next === "/admin/login") return "/admin/pending";
  return next;
}
