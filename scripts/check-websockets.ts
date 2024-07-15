/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
import { chainsList } from '@moonbeam-network/xcm-config';
import { IncomingWebhook } from '@slack/webhook';
import WebSocket from 'ws';

interface ChainEndpoint {
  chainKey: string;
  ws: string;
}

function processArgs() {
  const args = process.argv;
  const includeTestChains = args.some((arg) => arg === '--include-test-chains');
  const slackWebhookArg = args.find((arg) => arg.startsWith('--slack-wh='));
  const webhookUrl = slackWebhookArg ? slackWebhookArg.split('=')[1] : '';
  return { includeTestChains, webhookUrl };
}

function checkIsWebSocketAlive({
  chainKey,
  ws: endpoint,
}: ChainEndpoint): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(endpoint);

    ws.on('error', (error: Error) => {
      console.error(
        `WebSocket ${chainKey} connection to ${endpoint} failed`,
        error,
      );
      ws.close();
      reject(error);
    });

    ws.on('open', () => {
      console.log(
        `WebSocket ${chainKey} connection to ${endpoint} successful.`,
      );
      ws.close();
      resolve(true);
    });
  });
}

async function checkWebSocketEndpoints(endpoints: ChainEndpoint[]): Promise<{
  successfulEndpoints: { endpoint: ChainEndpoint; isAlive: boolean }[];
  failedEndpoints: { endpoint: ChainEndpoint; error: string }[];
}> {
  console.log('Checking WebSocket endpoints...');
  const successfulEndpoints: { endpoint: ChainEndpoint; isAlive: boolean }[] =
    [];
  const failedEndpoints: { endpoint: ChainEndpoint; error: string }[] = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const endpoint of endpoints) {
    try {
      // eslint-disable-next-line no-await-in-loop
      const isAlive = await checkIsWebSocketAlive(endpoint);
      successfulEndpoints.push({ endpoint, isAlive });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      failedEndpoints.push({ endpoint, error: errorMessage });
      console.error(`Error checking ${endpoint.chainKey}: ${errorMessage}`);
    }
  }

  console.log('Finished checking all endpoints.');
  return { failedEndpoints, successfulEndpoints };
}

function getChainsAndEndpoints(includeTestChains: boolean) {
  const filteredChainList = includeTestChains
    ? chainsList
    : chainsList.filter((chain) => !chain.isTestChain);

  const websocketEndpoints = filteredChainList.flatMap(({ key, ws }) => {
    if (Array.isArray(ws)) {
      return ws.map((endpoint) => ({
        chainKey: key,
        ws: endpoint,
      }));
    }
    return { chainKey: key, ws };
  });

  return websocketEndpoints;
}

async function main() {
  console.log('Starting main function...');
  const { includeTestChains, webhookUrl } = processArgs();

  const websocketEndpoints = getChainsAndEndpoints(includeTestChains);

  if (includeTestChains) {
    console.log(
      'Checking the endpoints of all chains, including test chains...',
    );
  }

  console.log('About to check WebSocket endpoints...');
  const { successfulEndpoints, failedEndpoints } =
    await checkWebSocketEndpoints(websocketEndpoints);
  console.log('Finished checking WebSocket endpoints.');

  console.log('\nSummary:');
  console.log(`Working endpoints: ${successfulEndpoints.length}`);
  console.log(`Non-working endpoints: ${failedEndpoints.length}`);

  if (failedEndpoints.length > 0) {
    const errors = failedEndpoints
      .map(({ endpoint }) => `${endpoint.chainKey}: ${endpoint.ws}`)
      .join('\n');
    const text = `The following websocket endpoints from the XCM integrations in the dapp are not working, please review them: \`\`\`${errors}\`\`\``;
    console.log(text);
    if (webhookUrl) {
      const webhook = new IncomingWebhook(webhookUrl);
      await webhook.send({ text });
    } else {
      console.warn('Slack webhook not detected, notification not sent');
    }
  } else {
    console.log('All checked endpoints are working.');
  }
}

main().catch((error) => {
  console.error('An error occurred in the main function:', error);
});
