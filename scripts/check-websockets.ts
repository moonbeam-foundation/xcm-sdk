/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
import { IncomingWebhook } from '@slack/webhook';
import WebSocket from 'ws';
// eslint-disable-next-line import/no-relative-packages
import { chainsList } from '../packages/config/src';

function procesArgs() {
  const args = process.argv;
  const incudeTestChains = args.some((arg) => arg === '--include-test-chains');
  const slackWebhookArg = args.find((arg) => arg.startsWith('--slack-wh='));
  const webhookUrl = slackWebhookArg ? slackWebhookArg.split('=')[1] : '';
  return { incudeTestChains, webhookUrl };
}

async function checkWebSocketEndpoints(
  endpoints: ChainEndpoint[],
): Promise<{ endpoint: ChainEndpoint; isAlive: boolean }[]> {
  async function checkIsWebSocketAlive({
    chainKey,
    ws: endpoint,
  }: ChainEndpoint): Promise<boolean> {
    return new Promise((resolve) => {
      const ws = new WebSocket(endpoint);

      let isAlive = false;

      ws.on('error', (error) => {
        console.error(
          `WebSocket ${chainKey} connection to ${endpoint} failed. Error: ${error.message}`,
        );
        resolve(false);
      });

      ws.on('open', () => {
        console.log(
          `WebSocket ${chainKey} connection to ${endpoint} successful.`,
        );
        isAlive = true;
        ws.terminate();
      });

      ws.on('close', () => {
        resolve(isAlive);
      });
    });
  }

  return Promise.all(
    endpoints.map(async (endpoint) => {
      const isAlive = await checkIsWebSocketAlive(endpoint);

      return { endpoint, isAlive };
    }),
  );
}

const { incudeTestChains, webhookUrl } = procesArgs();

const webhook = new IncomingWebhook(webhookUrl);

interface ChainEndpoint {
  chainKey: string;
  ws: string;
}

const filteredChainList = incudeTestChains
  ? chainsList
  : chainsList.filter((chain) => !chain.isTestChain);

const websocketEndpoints = filteredChainList.map(({ key, ws }) => ({
  chainKey: key,
  ws,
}));

if (incudeTestChains) {
  console.log('Checking the endpoints of all chains, including test chains...');
}

checkWebSocketEndpoints(websocketEndpoints).then(async (results) => {
  let output = '';

  results.forEach(({ isAlive, endpoint: { chainKey, ws } }) => {
    if (!isAlive) {
      output += `\n${chainKey}: \`${ws}\`,`;
    }
  });

  if (output) {
    const text = `The following websocket endpoints from the XCM integrations in the dapp are not working, please review them: ${output}`;

    console.log(text);
    if (webhookUrl) {
      await webhook.send({
        text,
      });
    } else {
      console.warn('Slack webhook not detected, notification not sent');
    }
  }
});
