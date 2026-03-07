import { createHash } from 'node:crypto';

import type {
  IsoUtcTimestamp,
  OsohMonitoringEventType,
  OsohMonitoredSurfaceTokenRecord,
  OsohStoreState,
} from './osoh-store';

export interface OsohIngestPayload {
  eventType: OsohMonitoringEventType;
  occurredAt: IsoUtcTimestamp;
  payload: Record<string, unknown>;
}

export type OsohIngestAuthResult =
  | {
      ok: true;
      token: OsohMonitoredSurfaceTokenRecord;
      siteId: string;
    }
  | {
      ok: false;
      reason:
        | 'missing_token'
        | 'unknown_token'
        | 'revoked_token'
        | 'inactive_site'
        | 'invalid_scope';
    };

export type OsohIngestValidationResult =
  | {
      ok: true;
      normalized: OsohIngestPayload;
    }
  | {
      ok: false;
      reason:
        | 'invalid_payload'
        | 'missing_event_type'
        | 'invalid_event_type'
        | 'missing_occurred_at'
        | 'invalid_occurred_at'
        | 'missing_payload_body'
        | 'invalid_payload_body';
    };

const allowedEventTypes: readonly OsohMonitoringEventType[] = [
  'surface_ping_received',
  'surface_health_changed',
  'surface_token_used',
  'surface_token_revoked',
] as const;

const isOsohMonitoringEventType = (
  value: string,
): value is OsohMonitoringEventType => {
  return (allowedEventTypes as readonly string[]).includes(value);
};

const isIsoUtcTimestamp = (value: string): boolean => {
  const trimmed = value.trim();

  if (trimmed === '') {
    return false;
  }

  const date = new Date(trimmed);

  return !Number.isNaN(date.getTime());
};

const hashToken = (rawToken: string): string =>
  createHash('sha256').update(rawToken).digest('hex');

const normalizeBearerToken = (authorizationHeader?: string): string | null => {
  if (!authorizationHeader) {
    return null;
  }

  const [scheme, value] = authorizationHeader.trim().split(/\s+/, 2);

  if (!scheme || scheme.toLowerCase() !== 'bearer' || !value) {
    return null;
  }

  return value;
};

export const resolveIngestAuth = (
  state: OsohStoreState,
  authorizationHeader?: string,
): OsohIngestAuthResult => {
  const rawToken = normalizeBearerToken(authorizationHeader);

  if (!rawToken) {
    return { ok: false, reason: 'missing_token' };
  }

  const presentedTokenHash = hashToken(rawToken);

  const token = state.monitoredSurfaceTokens.find(
    (candidate) => candidate.tokenHash === presentedTokenHash,
  );

  if (!token) {
    return { ok: false, reason: 'unknown_token' };
  }

  if (token.revoked) {
    return { ok: false, reason: 'revoked_token' };
  }

  if (token.scope !== 'ingest') {
    return { ok: false, reason: 'invalid_scope' };
  }

  const site = state.monitoredSites.find(
    (candidate) => candidate.siteId === token.siteId,
  );

  if (!site || site.status !== 'active_monitored_surface') {
    return { ok: false, reason: 'inactive_site' };
  }

  return {
    ok: true,
    token,
    siteId: token.siteId,
  };
};

export const validateIngestPayload = (
  input: unknown,
): OsohIngestValidationResult => {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    return { ok: false, reason: 'invalid_payload' };
  }

  const candidate = input as Record<string, unknown>;

  if (typeof candidate.eventType !== 'string') {
    return { ok: false, reason: 'missing_event_type' };
  }

  const normalizedEventType = candidate.eventType.trim();

  if (normalizedEventType === '') {
    return { ok: false, reason: 'missing_event_type' };
  }

  if (!isOsohMonitoringEventType(normalizedEventType)) {
    return { ok: false, reason: 'invalid_event_type' };
  }

  if (typeof candidate.occurredAt !== 'string') {
    return { ok: false, reason: 'missing_occurred_at' };
  }

  const normalizedOccurredAt = candidate.occurredAt.trim();

  if (normalizedOccurredAt === '') {
    return { ok: false, reason: 'missing_occurred_at' };
  }

  if (!isIsoUtcTimestamp(normalizedOccurredAt)) {
    return { ok: false, reason: 'invalid_occurred_at' };
  }

  if (!Object.prototype.hasOwnProperty.call(candidate, 'payload')) {
    return { ok: false, reason: 'missing_payload_body' };
  }

  if (
    !candidate.payload ||
    typeof candidate.payload !== 'object' ||
    Array.isArray(candidate.payload)
  ) {
    return { ok: false, reason: 'invalid_payload_body' };
  }

  return {
    ok: true,
    normalized: {
      eventType: normalizedEventType,
      occurredAt: normalizedOccurredAt,
      payload: candidate.payload as Record<string, unknown>,
    },
  };
};
