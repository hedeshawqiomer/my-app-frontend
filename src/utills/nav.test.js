// src/utils/nav.test.js (Vitest)
import { describe, it, expect } from "vitest";
import { sanitizeNextPath } from "./nav";

describe("sanitizeNextPath", () => {
  it("blocks absolute URLs", () => {
    expect(sanitizeNextPath("https://evil.com")).toBe("/admin/pending");
    expect(sanitizeNextPath("//evil.com/a")).toBe("/admin/pending");
  });
  it("forces /admin scope", () => {
    expect(sanitizeNextPath("/user")).toBe("/admin/pending");
    expect(sanitizeNextPath("admin/pending")).toBe("/admin/pending"); // missing leading slash becomes /admin/pending
  });
  it("allows safe admin routes", () => {
    expect(sanitizeNextPath("/admin/pending")).toBe("/admin/pending");
    expect(sanitizeNextPath("/admin/accepted")).toBe("/admin/accepted");
  });
  it("blocks bare admin and login", () => {
    expect(sanitizeNextPath("/admin")).toBe("/admin/pending");
    expect(sanitizeNextPath("/admin/")).toBe("/admin/pending");
    expect(sanitizeNextPath("/admin/login")).toBe("/admin/pending");
  });
});
