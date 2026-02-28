const API_BASE = "https://api.protowebstudio.com";

/**
 * Sentinel API client — READ ONLY
 * - No tokens
 * - No Authorization headers
 * - No mutation (POST/PUT/PATCH/DELETE)
 */
export async function apiFetch<T>(
  path: string,
  options: RequestInit & { json?: unknown } = {}
): Promise<T> {
  const method = (options.method || "GET").toUpperCase();

  if (method !== "GET") {
    throw new Error("Sentinel is read-only: only GET is permitted.");
  }

  const headers: Record<string, string> = {
    Accept: "application/json",
    ...(options.headers as Record<string, string> | undefined),
  };

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    method: "GET",
    headers,
  });

  const data = await res.json().catch(() => ({} as any));

  if (!res.ok) {
    const msg = (data && (data.message || data.error)) || `HTTP ${res.status}`;
    throw new Error(msg);
  }

  return data as T;
}
