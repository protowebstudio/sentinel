import type { MiddlewareHandler } from "astro";

const ALLOW = new Set(["GET", "HEAD", "POST"]);

export const onRequest: MiddlewareHandler = async (context, next) => {
  const method = context.request.method.toUpperCase();

  // Read-only hard gate (no control plane)
  if (!ALLOW.has(method)) {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const res = await next();

  // Security headers (tight-by-default)
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("Referrer-Policy", "no-referrer");
  res.headers.set("Permissions-Policy", "geolocation=(), microphone=(), camera=()");
  res.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self'; base-uri 'none'; frame-ancestors 'none'"
  );

  // No cookies/sessions
  res.headers.delete("Set-Cookie");

  // Safe caching for HTML (short TTL; read-only surface)
  const ct = res.headers.get("Content-Type") ?? "";
  if (ct.includes("text/html")) {
    res.headers.set("Cache-Control", "public, max-age=15, stale-while-revalidate=60");
  }

  return res;
};


