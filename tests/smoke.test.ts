import { describe, it, expect } from "vitest";

const BASE = process.env.SENTINEL_BASE_URL ?? "http://localhost:4321";

async function req(path: string, init?: RequestInit) {
  return fetch(`${BASE}${path}`, { redirect: "manual", ...init });
}

describe("sentinel: no control plane", () => {
  it("GET / is 200-399", async () => {
    const r = await req("/");
    expect(r.status).toBeGreaterThanOrEqual(200);
    expect(r.status).toBeLessThan(400);
  });

  it("Mutation verbs are blocked (405)", async () => {
    for (const method of ["POST", "PUT", "PATCH", "DELETE"]) {
      const r = await req("/", { method });
      expect(r.status).toBe(405);
    }
  });

  it("Security headers present + no Set-Cookie", async () => {
    const r = await req("/");
    expect(r.headers.get("content-security-policy")).toBeTruthy();
    expect(r.headers.get("x-frame-options")).toBeTruthy();
    expect(r.headers.get("x-content-type-options")).toBeTruthy();
    expect(r.headers.get("set-cookie")).toBeNull();
  });
  it("GET /architecture is 200-399", async () => {
    const r = await req("/architecture");
    expect(r.status).toBeGreaterThanOrEqual(200);
    expect(r.status).toBeLessThan(400);
  });
});
