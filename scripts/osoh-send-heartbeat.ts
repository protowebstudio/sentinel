import { sendOsohPushEvent, readOsohPushEnv } from '../src/lib/server/osoh-push-client';

async function main(): Promise<void> {
  const env = readOsohPushEnv();

  const response = await sendOsohPushEvent({
    siteId: env.siteId,
    eventType: 'heartbeat',
    occurredAt: new Date().toISOString(),
    payload: {
      status: process.env.OSOH_HEARTBEAT_STATUS ?? 'ok',
      summary: process.env.OSOH_HEARTBEAT_SUMMARY ?? 'sentinel heartbeat'
    }
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Heartbeat push failed: ${response.status} ${body}`);
  }

  console.log('heartbeat push ok');
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
