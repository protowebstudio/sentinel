import { randomUUID } from 'node:crypto';
import type { APIRoute } from 'astro';

import type {
  IsoUtcTimestamp,
  OsohAuditTrailRecord,
  OsohMonitoringEventRecord,
  OsohStoreState,
} from '../../../../../lib/server/osoh-store';
import {
  createEmptyOsohStoreState,
} from '../../../../../lib/server/osoh-store';
import {
  resolveIngestAuth,
  validateIngestPayload,
} from '../../../../../lib/server/osoh-ingest';

export const prerender = false;

type RouteStage = 'auth' | 'validation' | 'accepted';

type RouteErrorReason =
  | 'missing_token'
  | 'unknown_token'
  | 'revoked_token'
  | 'inactive_site'
  | 'invalid_scope'
  | 'invalid_json'
  | 'invalid_payload'
  | 'missing_event_type'
  | 'invalid_event_type'
  | 'missing_occurred_at'
  | 'invalid_occurred_at'
  | 'missing_payload_body'
  | 'invalid_payload_body';

const json = (body: unknown, status: number): Response =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    },
  });

const nowIso = (): IsoUtcTimestamp => new Date().toISOString();

const loadOsohStoreState = async (): Promise<OsohStoreState> => {
  return createEmptyOsohStoreState();
};

const appendMonitoringEvent = async (
  state: OsohStoreState,
  event: OsohMonitoringEventRecord,
): Promise<void> => {
  state.monitoringEvents.push(event);
};

const appendAuditTrailRecord = async (
  state: OsohStoreState,
  record: OsohAuditTrailRecord,
): Promise<void> => {
  state.auditTrail.push(record);
};

const auditAuthFailure = async (
  state: OsohStoreState,
  reason: Extract<
    RouteErrorReason,
    'missing_token' | 'unknown_token' | 'revoked_token' | 'inactive_site' | 'invalid_scope'
  >,
): Promise<void> => {
  await appendAuditTrailRecord(state, {
    auditId: randomUUID(),
    siteId: 'unknown',
    action: 'site_updated',
    occurredAt: nowIso(),
    details: {
      category: 'ingest_auth_failure',
      reason,
    },
  });
};

export const POST: APIRoute = async ({ request }) => {
  const state = await loadOsohStoreState();

  const authResult = resolveIngestAuth(
    state,
    request.headers.get('authorization') ?? undefined,
  );

  if (!authResult.ok) {
    await auditAuthFailure(state, authResult.reason);

    return json(
      {
        ok: false,
        stage: 'auth' satisfies RouteStage,
        reason: authResult.reason satisfies RouteErrorReason,
      },
      401,
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return json(
      {
        ok: false,
        stage: 'validation' satisfies RouteStage,
        reason: 'invalid_json' satisfies RouteErrorReason,
      },
      400,
    );
  }

  const validationResult = validateIngestPayload(body);

  if (!validationResult.ok) {
    return json(
      {
        ok: false,
        stage: 'validation' satisfies RouteStage,
        reason: validationResult.reason satisfies RouteErrorReason,
      },
      400,
    );
  }

  const receivedAt = nowIso();
  const eventId = randomUUID();

  await appendMonitoringEvent(state, {
    eventId,
    siteId: authResult.siteId,
    eventType: validationResult.normalized.eventType,
    occurredAt: validationResult.normalized.occurredAt,
    receivedAt,
    payload: validationResult.normalized.payload,
  });

  await appendAuditTrailRecord(state, {
    auditId: randomUUID(),
    siteId: authResult.siteId,
    action: 'site_updated',
    occurredAt: receivedAt,
    details: {
      category: 'ingest_event_accepted',
      eventId,
      eventType: validationResult.normalized.eventType,
    },
  });

  return json(
    {
      ok: true,
      stage: 'accepted' satisfies RouteStage,
      eventId,
      siteId: authResult.siteId,
      receivedAt,
    },
    202,
  );
};
