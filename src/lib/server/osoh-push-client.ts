export type OsohPushEventType = 'deployment' | 'heartbeat';

export interface OsohPushEventPayload {
  [key: string]: unknown;
}

export interface OsohPushEventInput {
  siteId: string;
  eventType: OsohPushEventType;
  occurredAt: string;
  payload: OsohPushEventPayload;
}

export interface OsohPushEnv {
  siteId: string;
  ingestToken: string;
  ingestUrl: string;
}

function readRequiredEnv(name: string): string {
  const value = process.env[name];

  if (!value || !value.trim()) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value.trim();
}

function validateIngestUrl(rawUrl: string): string {
  let parsed: URL;

  try {
    parsed = new URL(rawUrl);
  } catch {
    throw new Error('OSOH_INGEST_URL is not a valid URL');
  }

  if (!['http:', 'https:'].includes(parsed.protocol)) {
    throw new Error(`OSOH_INGEST_URL uses unsupported protocol: ${parsed.protocol}`);
  }

  return parsed.toString();
}

export function readOsohPushEnv(): OsohPushEnv {
  return {
    siteId: readRequiredEnv('OSOH_SITE_ID'),
    ingestToken: readRequiredEnv('OSOH_INGEST_TOKEN'),
    ingestUrl: validateIngestUrl(readRequiredEnv('OSOH_INGEST_URL'))
  };
}

export async function sendOsohPushEvent(input: OsohPushEventInput): Promise<Response> {
  const env = readOsohPushEnv();

  if (input.siteId !== env.siteId) {
    throw new Error('Push event siteId does not match OSOH_SITE_ID');
  }

  return fetch(env.ingestUrl, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${env.ingestToken}`,
      'content-type': 'application/json'
    },
    body: JSON.stringify(input)
  });
}
