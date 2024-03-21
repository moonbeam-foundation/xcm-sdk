/* eslint-disable jest/no-commented-out-tests */
import {
  centrifuge,
  hydraDX,
  hydraDxAlphanet,
  moonbaseAlpha,
  moonbaseBeta,
  moonbeam,
} from '@moonbeam-network/xcm-config';
import { getParachainBalances } from '../../src/sdk';

// E2E balance test wallet
const hydraDXAddress = '7MR8Qxy9sJmN6bfHMggAtFY5DwLxfrssLuTnP5rmkpD92oPH';
const centrifugeAddress = '4fAKSBMGVT9jt1jkuJvXgvMbmqV2BuspFWWEmdVeFj9yRudb';
const moonbeamAddress = '0x4E82143Af671Cc8201Bc7efCBbCED3A69e84405e';
const substrateAddress = '5FtGz8bgoCQ6pNAYLWCfxKx9ekLnX1ewP9q2TjMT2riu7sf9';
const moonbaseBetaAddress = '0x08480769599E23F626efff39B89F3137e9917a40';

describe('sdk', () => {
  describe(`${getParachainBalances.name}`, () => {
    it(`should get expected balances for ${moonbeam.name}`, async () => {
      const result = await getParachainBalances(moonbeam, moonbeamAddress);

      expect(result).toMatchSnapshot();
    });
    it(`should get expected balances for ${hydraDX.name}`, async () => {
      const result = await getParachainBalances(hydraDX, hydraDXAddress);

      expect(result).toMatchSnapshot();
    });
    it(`should get expected balances for ${hydraDX.name} for substrate address`, async () => {
      const result = await getParachainBalances(hydraDX, substrateAddress);

      expect(result).toMatchSnapshot();
    });
    it(`should get expected balances for ${centrifuge.name}`, async () => {
      const result = await getParachainBalances(centrifuge, centrifugeAddress);

      expect(result).toMatchSnapshot();
    });
    it(`should get expected balances for ${centrifuge.name}  for substrate address`, async () => {
      const result = await getParachainBalances(centrifuge, substrateAddress);

      expect(result).toMatchSnapshot();
    });
    it(`should get expected balances for ${hydraDxAlphanet.name}`, async () => {
      const result = await getParachainBalances(
        hydraDxAlphanet,
        hydraDXAddress,
      );

      expect(result).toMatchSnapshot();
    });
    it(`should get expected balances for ${hydraDxAlphanet.name} for substrate address`, async () => {
      const result = await getParachainBalances(
        hydraDxAlphanet,
        substrateAddress,
      );

      expect(result).toMatchSnapshot();
    });
    it(`should get expected balances for ${moonbaseBeta.name}`, async () => {
      const result = await getParachainBalances(
        moonbaseBeta,
        moonbaseBetaAddress,
      );

      expect(result).toMatchSnapshot();
    });
    it(`should get expected balances for ${moonbaseAlpha.name}`, async () => {
      const result = await getParachainBalances(moonbaseAlpha, moonbeamAddress);

      expect(result).toMatchSnapshot();
    });
  });
});

/* eslint-disable jest/max-expects */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable jest/no-standalone-expect */
/* eslint-disable jest/require-hook */
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
