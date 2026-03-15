import { sendOsohPushEvent, readOsohPushEnv } from '../src/lib/server/osoh-push-client';

async function main(): Promise<void> {
  const env = readOsohPushEnv();

  const response = await sendOsohPushEvent({
    siteId: env.siteId,
    eventType: 'deployment',
    occurredAt: new Date().toISOString(),
    payload: {
      deploymentId: process.env.OSOH_DEPLOYMENT_ID ?? `deploy_${Date.now()}`,
      environment: process.env.OSOH_DEPLOY_ENV ?? 'unknown',
      versionOrCommit: process.env.OSOH_VERSION_OR_COMMIT ?? 'unknown',
      status: process.env.OSOH_DEPLOY_STATUS ?? 'completed'
    }
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Deployment push failed: ${response.status} ${body}`);
  }

  console.log('deployment push ok');
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
