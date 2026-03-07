import type { IsoUtcTimestamp } from './osoh-store';

export type PullCheckErrorReason =
  | 'invalid_url'
  | 'unsupported_protocol'
  | 'request_timeout'
  | 'network_error'
  | 'unknown_error';

export type PullCheckResult = {
  siteId: string;
  checkedAt: IsoUtcTimestamp;
  ok: boolean;
  statusCode: number | null;
  responseTimeMs: number;
  errorReason: PullCheckErrorReason | null;
  errorDetail: string | null;
};

export interface RunPullCheckOptions {
  timeoutMs?: number;
  userAgent?: string;
}

export async function runPullCheck(
  url: string,
  siteId: string,
  options: RunPullCheckOptions = {}
): Promise<PullCheckResult> {
  const started = Date.now();
  const checkedAt: IsoUtcTimestamp = new Date().toISOString();
  const timeoutMs = options.timeoutMs ?? 10000;
  const userAgent = options.userAgent ?? 'sentinel-pull-runner/1.0';
  const elapsedMs = (): number => Date.now() - started;

  let parsedUrl: URL;

  try {
    parsedUrl = new URL(url);
  } catch {
    return {
      siteId,
      checkedAt,
      ok: false,
      statusCode: null,
      responseTimeMs: elapsedMs(),
      errorReason: 'invalid_url',
      errorDetail: 'The provided URL could not be parsed.'
    };
  }

  if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
    return {
      siteId,
      checkedAt,
      ok: false,
      statusCode: null,
      responseTimeMs: elapsedMs(),
      errorReason: 'unsupported_protocol',
      errorDetail: `Unsupported protocol: ${parsedUrl.protocol}`
    };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(parsedUrl, {
      method: 'GET',
      redirect: 'follow',
      headers: { 'user-agent': userAgent },
      signal: controller.signal
    });

    return {
      siteId,
      checkedAt,
      ok: response.ok,
      statusCode: response.status,
      responseTimeMs: elapsedMs(),
      errorReason: null,
      errorDetail: null
    };
  } catch (error) {
    const isAbortError =
      error instanceof Error &&
      (error.name === 'AbortError' || error.message.toLowerCase().includes('abort'));

    return {
      siteId,
      checkedAt,
      ok: false,
      statusCode: null,
      responseTimeMs: elapsedMs(),
      errorReason: isAbortError ? 'request_timeout' : 'network_error',
      errorDetail: error instanceof Error ? error.message : 'unknown_error'
    };
  } finally {
    clearTimeout(timeout);
  }
}

