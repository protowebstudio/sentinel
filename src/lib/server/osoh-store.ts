import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

export type IsoUtcTimestamp = string;

export type OsohMonitoredSurfaceClass = 'external_monitored_surface';

export type OsohSurfaceStatus =
  | 'inactive'
  | 'active_monitored_surface'
  | 'disabled';

export type OsohMonitoringEventType =
  | 'surface_ping_received'
  | 'surface_health_changed'
  | 'surface_token_used'
  | 'surface_token_revoked'
  | 'deployment'
  | 'heartbeat';

export type OsohAuditAction =
  | 'site_created'
  | 'site_updated'
  | 'site_disabled'
  | 'token_created'
  | 'token_revoked'
  | 'ingest_auth_failed'
  | 'ingest_event_accepted';

export interface OsohMonitoredSiteRecord {
  siteId: string;
  siteSlug: string;
  displayName: string;
  classification: OsohMonitoredSurfaceClass;
  status: OsohSurfaceStatus;
  createdAt: IsoUtcTimestamp;
  updatedAt: IsoUtcTimestamp;
}

export interface OsohMonitoredSurfaceTokenRecord {
  tokenId: string;
  siteId: string;

  /**
   * One-way hash only. Never persist raw token material.
   */
  tokenHash: string;

  scope: 'ingest';
  revoked: boolean;
  createdAt: IsoUtcTimestamp;
  updatedAt: IsoUtcTimestamp;
}

export interface OsohMonitoringEventRecord {
  eventId: string;
  siteId: string;
  eventType: OsohMonitoringEventType;
  occurredAt: IsoUtcTimestamp;
  receivedAt: IsoUtcTimestamp;
  payload: Record<string, unknown>;
}

export interface OsohAuditTrailRecord {
  auditId: string;
  siteId: string;
  action: OsohAuditAction;
  occurredAt: IsoUtcTimestamp;
  details: Record<string, unknown>;
}

export interface OsohStoreState {
  monitoredSites: OsohMonitoredSiteRecord[];
  monitoredSurfaceTokens: OsohMonitoredSurfaceTokenRecord[];
  monitoringEvents: OsohMonitoringEventRecord[];
  auditTrail: OsohAuditTrailRecord[];
}

const statePath = resolve(process.cwd(), 'src/lib/server/osoh-state.json');

export const createEmptyOsohStoreState = (): OsohStoreState => ({
  monitoredSites: [],
  monitoredSurfaceTokens: [],
  monitoringEvents: [],
  auditTrail: [],
});

export const loadOsohStoreState = async (): Promise<OsohStoreState> => {
  const raw = await readFile(statePath, 'utf8');
  const parsed = JSON.parse(raw) as OsohStoreState;
  return parsed;
};

export const saveOsohStoreState = async (state: OsohStoreState): Promise<void> => {
  await writeFile(statePath, JSON.stringify(state, null, 2) + "`n", 'utf8');
};




