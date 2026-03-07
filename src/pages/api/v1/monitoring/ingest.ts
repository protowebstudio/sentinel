import { randomUUID } from 'node:crypto';
import type { APIRoute } from 'astro';

import type {
  IsoUtcTimestamp,
  OsohAuditTrailRecord,
  OsohMonitoringEventRecord,
  OsohStoreState,
} from '../../../../lib/server/osoh-store';
import {
  loadOsohStoreState,
  saveOsohStoreState,
} from '../../../../lib/server/osoh-store';
import {
  resolveIngestAuth,
  validateIngestPayload,
} from '../../../../lib/server/osoh-ingest';

export const prerender = false;

type RouteStage = 'auth' | 'validation' | 'storage' | 'accepted';

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
  | 'invalid_payload_body'
  | 'state_write_failed';

const json = (body: unknown, status: number): Response =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    },
  });

const nowIso = (): IsoUtcTimestamp => new Date().toISOString();

const appendMonitoringEvent = (
  state: OsohStoreState,
  event: OsohMonitoringEventRecord,
): void => {
  state.monitoringEvents.push(event);
};

const appendAuditTrailRecord = (
  state: OsohStoreState,
  record: OsohAuditTrailRecord,
): void => {
  state.auditTrail.push(record);
};

export const POST: APIRoute = async ({ request }) => {
  const state = await loadOsohStoreState();

  const authResult = resolveIngestAuth(
    state,
    request.headers.get('authorization') ?? undefined,
  );

  if (!authResult.ok) {
    appendAuditTrailRecord(state, {
      auditId: randomUUID(),
      siteId: 'unknown',
      action: 'ingest_auth_failed',
      occurredAt: nowIso(),
      details: {
        category: 'ingest_auth_failure',
        reason: authResult.reason,
      },
    });

    try {
      await saveOsohStoreState(state);
    } catch {
      return json(
        {
          ok: false,
          stage: 'storage',
          reason: 'state_write_failed',
        },
        500,
      );
    }

    return json(
      {
        ok: false,
        stage: 'auth',
        reason: authResult.reason,
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
        stage: 'validation',
        reason: 'invalid_json',
      },
      400,
    );
  }

  const validationResult = validateIngestPayload(body);

  if (!validationResult.ok) {
    return json(
      {
        ok: false,
        stage: 'validation',
        reason: validationResult.reason,
      },
      400,
    );
  }

  const receivedAt = nowIso();
  const eventId = randomUUID();

  appendMonitoringEvent(state, {
    eventId,
    siteId: authResult.siteId,
    eventType: validationResult.normalized.eventType,
    occurredAt: validationResult.normalized.occurredAt,
    receivedAt,
    payload: validationResult.normalized.payload,
  });

  appendAuditTrailRecord(state, {
    auditId: randomUUID(),
    siteId: authResult.siteId,
    action: 'ingest_event_accepted',
    occurredAt: receivedAt,
    details: {
      category: 'ingest_event_accepted',
      eventId,
      eventType: validationResult.normalized.eventType,
    },
  });

  try {
    await saveOsohStoreState(state);
  } catch {
    return json(
      {
        ok: false,
        stage: 'storage',
        reason: 'state_write_failed',
      },
      500,
    );
  }

  return json(
    {
      ok: true,
      stage: 'accepted',
      eventId,
      siteId: authResult.siteId,
      receivedAt,
    },
    202,
  );
};


