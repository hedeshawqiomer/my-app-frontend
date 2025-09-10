// src/utils/nav.js
export function sanitizeNextPath(next) {
  if (typeof next !== "string") return "/admin/pending";

  let safe = next.trim();

  // Block absolute URLs
  const lower = safe.toLowerCase();
  if (
    lower.startsWith("http://") ||
    lower.startsWith("https://") ||
    lower.startsWith("//")
  ) {
    return "/admin/pending";
  }

  // Ensure leading slash
  if (!safe.startsWith("/")) safe = "/" + safe;

  // Must be under /admin
  if (!safe.startsWith("/admin")) return "/admin/pending";

  // Block bare/unsafe variants
  if (
    safe === "/admin" ||
    safe === "/admin/" ||
    safe === "/admin/login"
  ) {
    return "/admin/pending";
  }

  return safe;
}
