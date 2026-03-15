import type { APIRoute } from 'astro';
import { loadOsohStoreState, saveOsohStoreState } from '../../../../lib/server/osoh-store';
import { runPullCheck } from '../../../../lib/server/osoh-pull-runner';

export const prerender = false;

const createMonitoringCheckId = () =>
  `mcheck_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

const getActiveMonitoredSite = (state: any) =>
  state.monitoredSites.find((site: any) => site.status === 'active_monitored_surface') ?? null;

export const GET: APIRoute = async () => {
  return new Response(
    JSON.stringify({
      ok: false,
      error: 'method_not_allowed',
    }),
    {
      status: 405,
      headers: { 'content-type': 'application/json' },
    }
  );
};

export const POST: APIRoute = async () => {
  const state = await loadOsohStoreState();
  const site = getActiveMonitoredSite(state);

  if (!site) {
    return new Response(
      JSON.stringify({
        ok: false,
        error: 'no_active_monitored_surface',
      }),
      {
        status: 400,
        headers: { 'content-type': 'application/json' },
      }
    );
  }

  const result = await runPullCheck(site.url, site.siteId);

  state.monitoringChecks.push({
    id: createMonitoringCheckId(),
    siteId: result.siteId,
    checkedAt: result.checkedAt,
    ok: result.ok,
    statusCode: result.statusCode,
    responseTimeMs: result.responseTimeMs,
    errorReason: result.errorReason,
    errorDetail: result.errorDetail,
  });

  await saveOsohStoreState(state);

  return new Response(
    JSON.stringify({
      ok: true,
      check: result,
    }),
    {
      status: 200,
      headers: { 'content-type': 'application/json' },
    }
  );
};
