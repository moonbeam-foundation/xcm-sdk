/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
import { chainsList } from '@moonbeam-network/xcm-config';
import { AnyChain } from '@moonbeam-network/xcm-types';
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
        `${chainKey} WebSocket connection to ${endpoint} failed`,
        error,
      );
      ws.close();
      reject(error);
    });

    ws.on('open', () => {
      console.log(
        `${chainKey} WebSocket connection to ${endpoint} successful.`,
      );
      ws.close();
      resolve(true);
    });
  });
}

async function checkWebSocketEndpoints(endpoints: ChainEndpoint[]): Promise<{
  successfulEndpoints: ChainEndpoint[];
  failingEndpoints: ChainEndpoint[];
}> {
  console.log('Checking WebSocket endpoints...');
  const successfulEndpoints: ChainEndpoint[] = [];
  const failingEndpoints: ChainEndpoint[] = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const endpoint of endpoints) {
    try {
      // eslint-disable-next-line no-await-in-loop
      const isAlive = await checkIsWebSocketAlive(endpoint);
      if (isAlive) {
        successfulEndpoints.push(endpoint);
      } else {
        failingEndpoints.push(endpoint);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      failingEndpoints.push(endpoint);
      console.error(`Error checking ${endpoint.chainKey}: ${errorMessage}`);
    }
  }

  console.log('Finished checking all endpoints.');
  return { failingEndpoints, successfulEndpoints };
}

function filterChainList(includeTestChains: boolean): AnyChain[] {
  return includeTestChains
    ? chainsList
    : chainsList.filter((chain) => !chain.isTestChain);
}

function getChainsAndEndpoints(includeTestChains: boolean) {
  const filteredChainList = filterChainList(includeTestChains);

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

function countChainKeys(endpoints: ChainEndpoint[]): Record<string, number> {
  return endpoints.reduce(
    (acc, endpoint) => {
      if (acc[endpoint.chainKey]) {
        acc[endpoint.chainKey] += 1;
      } else {
        acc[endpoint.chainKey] = 1;
      }
      return acc;
    },
    {} as Record<string, number>,
  );
}

async function sendNotification(
  chainsToReview: string[],
  webhookUrl: string | undefined,
) {
  const text = `All the websocket endpoints available to the XCM integrations in the dapp for \`\`\`${chainsToReview.join(', ')}\`\`\` are not working, please review them`;
  console.log(text);

  if (webhookUrl) {
    const webhook = new IncomingWebhook(webhookUrl);
    await webhook.send({ text });
  } else {
    console.warn('Slack webhook not detected, notification not sent');
  }
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
  const { successfulEndpoints, failingEndpoints } =
    await checkWebSocketEndpoints(websocketEndpoints);
  console.log('Finished checking WebSocket endpoints.');

  console.log('\nSummary:');
  console.log(`Working endpoints: ${successfulEndpoints.length}`);
  console.log(`Non-working endpoints: ${failingEndpoints.length}`);

  if (failingEndpoints.length > 0) {
    const failingEndpointsByChainCount = countChainKeys(failingEndpoints);
    const filteredChainList = filterChainList(includeTestChains);

    const chainsToReview: string[] = [];
    filteredChainList.forEach(async (chain) => {
      if (failingEndpointsByChainCount[chain.key] === chain.ws.length) {
        chainsToReview.push(chain.key);
      }
    });

    if (chainsToReview.length) {
      await sendNotification(chainsToReview, webhookUrl);
    }
  } else {
    console.log('All checked endpoints are working.');
  }
}

main().catch((error) => {
  console.error('An error occurred in the main function:', error);
});
