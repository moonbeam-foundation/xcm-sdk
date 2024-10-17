import { describe, expect, it } from 'vitest';

import {
  centrifuge,
  hydration,
  hydrationAlphanet,
  moonbaseAlpha,
  moonbaseBeta,
  moonbeam,
  peaqAlphanet,
  peaqChain,
  peaqEvm,
  peaqEvmAlphanet,
} from '@moonbeam-network/xcm-config';
import type { AnyParachain } from '@moonbeam-network/xcm-types';
import { getParachainBalances } from '../../src/sdk';

// E2E balance test wallet
const hydrationAddress = '7MR8Qxy9sJmN6bfHMggAtFY5DwLxfrssLuTnP5rmkpD92oPH';
const moonEvmAddress = '0x4E82143Af671Cc8201Bc7efCBbCED3A69e84405e';
const substrateAddress = '5FtGz8bgoCQ6pNAYLWCfxKx9ekLnX1ewP9q2TjMT2riu7sf9';

const config: { chain: AnyParachain; address: string }[] = [
  { chain: moonbeam, address: moonEvmAddress },
  { chain: hydration, address: hydrationAddress },
  { chain: hydration, address: substrateAddress },
  {
    chain: centrifuge,
    address: '4fAKSBMGVT9jt1jkuJvXgvMbmqV2BuspFWWEmdVeFj9yRudb',
  },
  { chain: centrifuge, address: substrateAddress },
  { chain: hydrationAlphanet, address: hydrationAddress },
  { chain: hydrationAlphanet, address: substrateAddress },
  {
    chain: moonbaseBeta,
    address: '0x4E82143Af671Cc8201Bc7efCBbCED3A69e84405e',
  },
  { chain: moonbaseAlpha, address: moonEvmAddress },
  { chain: peaqEvmAlphanet, address: moonEvmAddress },
  { chain: peaqAlphanet, address: substrateAddress },
  { chain: peaqChain, address: substrateAddress },
  { chain: peaqEvm, address: moonEvmAddress },
];

describe('sdk', () => {
  describe(`${getParachainBalances.name}`, () => {
    describe.each(config)(
      'on $chain.name for address: $address',
      ({ chain, address }) => {
        it('should get expected balances', async () => {
          const result = await getParachainBalances(chain, address);
          expect(result).toMatchSnapshot();
        });
      },
    );
  });
});

// import {
//   AssetSymbol,
//   ChainKey,
//   MoonChainKey,
// } from '@moonbeam-network/xcm-config';
// import { KeyringPair } from '@polkadot/keyring/types';
// import { Wallet } from 'ethers';
// import _ from 'lodash';
// import { ExtrinsicStatus, init } from '../../src';
// import { getEthersWalletSigner, getPolkadotKeyringPair } from '../utils/auth';
// import { itIf } from '../utils/itIf';

// const CONFIG = {
//   [MoonChainKey.Moonbeam]: {
//     [AssetSymbol.IBTC]: {
//       deposit: { [ChainKey.Interlay]: true },
//       withdraw: { [ChainKey.Interlay]: true },
//     },
//     [AssetSymbol.USDT]: {
//       deposit: { [ChainKey.polkadotAssetHub]: true },
//       withdraw: { [ChainKey.polkadotAssetHub]: true },
//     },
//   },
// };

// describe('sdk', () => {
//   const { moonbeam } = init();
//   // to hide polkadot unnecessary warnings
//   const consoleWarnMock = jest.spyOn(console, 'warn').mockImplementation();

//   let ethersSigner: Wallet;
//   let keyringPair: KeyringPair;

//   beforeAll(async () => {
//     ethersSigner = getEthersWalletSigner(moonbeam.moonChain);
//     keyringPair = await getPolkadotKeyringPair();
//   });

//   afterAll(() => consoleWarnMock.mockRestore());

//   describe.each([moonbeam])('on $moonChain.name', (sdk) => {
//     describe.each(sdk.symbols)('%s', (symbol) => {
//       const { chains: fromChains, from } = sdk.deposit(symbol);
//       const { chains: toChains, to } = sdk.withdraw(symbol);

//       fromChains.length &&
//         describe.each(fromChains)('deposit from $key', (chain) => {
//           const skip: boolean | undefined = _.get(CONFIG, [
//             sdk.moonChain.key,
//             symbol,
//             'deposit',
//             chain.key,
//           ]);

//           itIf(!skip)('should deposit', (done) => {
//             from(chain)
//               .get(ethersSigner.address, keyringPair)
//               .then(({ min, send }) => {
//                 const hash = send(min, (event) => {
//                   expect(event.status).not.toBe(ExtrinsicStatus.Failed);

//                   if (event.status === ExtrinsicStatus.Success) {
//                     expect(event.txHash).toBeDefined();
//                     expect(event.blockHash).toBeDefined();
//                     done();
//                   }
//                 });

//                 expect(hash).toBeDefined();
//               });
//           });
//         });

//       toChains.length &&
//         describe.each(toChains)('withdraw to $key', (chain) => {
//           const skip: boolean | undefined = _.get(CONFIG, [
//             sdk.moonChain.key,
//             symbol,
//             'withdraw',
//             chain.key,
//           ]);

//           itIf(!skip)('should withdraw', (done) => {
//             to(chain)
//               .get(keyringPair.address, {
//                 ethersSigner,
//               })
//               .then(({ min, send }) => {
//                 const hash = send(min, (event) => {
//                   expect(event.status).not.toBe(ExtrinsicStatus.Failed);

//                   if (event.status === ExtrinsicStatus.Success) {
//                     expect(event.txHash).toBeDefined();
//                     expect(event.blockHash).toBeDefined();
//                     done();
//                   }
//                 });

//                 expect(hash).toBeDefined();
//               });
//           });
//         });
//     });
//   });
// });
