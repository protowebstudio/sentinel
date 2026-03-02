export type ProofResult = {
  name: string;
  url: string;
  ok: boolean;
  status: number;
  servedFrom: "cache_fresh" | "cache_stale" | "upstream";
  ts: string;
  headers: Record<string, string>;
  badge: "OK" | "FAIL" | "STALE" | "UNAVAILABLE";
  staleReason?: string;
};
