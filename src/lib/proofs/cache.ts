type CacheEntry<T> = { ts: number; data: T };
const mem = new Map<string, CacheEntry<any>>();

export function cacheGet<T>(key: string): CacheEntry<T> | null {
  return (mem.get(key) as CacheEntry<T> | undefined) ?? null;
}

export function cacheSet<T>(key: string, data: T): void {
  mem.set(key, { ts: Date.now(), data });
}
