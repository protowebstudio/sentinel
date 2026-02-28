const API_BASE = "https://api.protowebstudio.com";

const TOKEN_KEY = "osoh_token";

/** Save the Sanctum Bearer token returned by /api/register or /api/login */
export function setAuthToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

/** Read the stored Bearer token (or null if not logged in) */
export function getAuthToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

/** Clear token on logout */
export function clearAuthToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit & { json?: unknown } = {}
): Promise<T> {
  const token = getAuthToken();

  const headers: Record<string, string> = {
    Accept: "application/json",
    ...(options.json ? { "Content-Type": "application/json" } : {}),
    ...(options.headers as Record<string, string> | undefined),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
    body: options.json ? JSON.stringify(options.json) : options.body,
  });

  // Try JSON first (Laravel returns JSON when Accept: application/json)
  const data = await res.json().catch(() => ({} as any));

  if (!res.ok) {
    const msg = (data && (data.message || data.error)) || `HTTP ${res.status}`;
    throw new Error(msg);
  }

  return data as T;
}
