/* eslint-disable @typescript-eslint/no-use-before-define */
import {
  AssetSymbol,
  Chain,
  ChainKey,
  createBalanceBuilder,
  moonbase,
  MoonbaseAssets,
  moonbeam,
  MoonbeamAssets,
  moonriver,
  MoonriverAssets,
  type MoonbaseChains,
  type MoonbeamChains,
  type MoonriverChains,
  type XcmConfigBuilder,
} from '@moonbeam-network/xcm-config';
import {
  createTxEventHandler,
  getPolkadotApi,
  type ExtrinsicEventsCallback,
  type Hash,
} from '@moonbeam-network/xcm-utils';
import type { Signer as PolkadotSigner } from '@polkadot/api/types';
import type { IKeyringPair } from '@polkadot/types/types';
import { isString } from '@polkadot/util';
import type { Signer as EthersSigner } from 'ethers';
import { XcmTransactorContract } from '../contracts';
import type {
  TransactFromData,
  Transactor,
  TransactorFrom,
  TransactorTo,
  TransactToData,
} from './transact.interfaces';
import {
  getBalance,
  getDerivatedAddress,
  getTxWeight,
  transactThroughSigned,
} from './transact.utils';

export interface TransactInitOptions {
  ethersSigner?: EthersSigner;
  polkadotSigner?: PolkadotSigner;
}

export function init(options: TransactInitOptions) {
  return {
    moonbase: initByChain<MoonbaseAssets, MoonbaseChains>(moonbase, options),
    moonbeam: initByChain<MoonbeamAssets, MoonbeamChains>(moonbeam, options),
    moonriver: initByChain<MoonriverAssets, MoonriverChains>(
      moonriver,
      options,
    ),
  };
}

function initByChain<Symbols extends AssetSymbol, ChainKeys extends ChainKey>(
  configBuilder: XcmConfigBuilder<any, ChainKeys>,
  options?: TransactInitOptions,
): Transactor<Symbols, ChainKeys> {
  const { moonChain, transact } = configBuilder;
  const { chainsFrom, chainsTo, from, to } = transact();
  const balanceBuilder = createBalanceBuilder<Symbols>();
  const moonBalanceConfig = balanceBuilder.system();

  return {
    moonChain,
    chainsFrom,
    chainsTo,
    from: (
      keyOrChain: ChainKeys | Chain<ChainKeys>,
    ): TransactorFrom<Symbols, ChainKeys> => {
      const {
        balance: balanceConfig,
        chain,
        config,
        getOverallWeight,
        getOverallFee,
      } = from(keyOrChain);

      return {
        transact: async (
          callHash: string,
          sourceAccount: string | IKeyringPair,
          polkadotSigner?: PolkadotSigner,
        ): Promise<TransactFromData<Symbols, ChainKeys>> => {
          const signer = polkadotSigner || options?.polkadotSigner;

          if (isString(sourceAccount) && !signer) {
            throw new Error(
              'Polkadot Signer/KeyringPair are not provided to xcm-transact',
            );
          }

          const sourceAddress = isString(sourceAccount)
            ? sourceAccount
            : sourceAccount.address;

          const [sourceApi, destinationApi] = await Promise.all([
            getPolkadotApi(chain.ws),
            getPolkadotApi(moonChain.ws),
          ]);
          const [txWeight, { address20, address32 }] = await Promise.all([
            getTxWeight(callHash, destinationApi),
            getDerivatedAddress(
              destinationApi,
              config.multilocation.account.get(sourceAddress),
            ),
          ]);
          const [sourceBalance, destinationBalance] = await Promise.all([
            getBalance<Symbols>(sourceApi, sourceAddress, balanceConfig),
            getBalance<Symbols>(destinationApi, address20, moonBalanceConfig),
          ]);

          const overallWeight = getOverallWeight(txWeight);
          const overallFee = getOverallFee(overallWeight);
          const params = config.transact.getParams({
            callHash,
            overallFee,
            overallWeight,
            txWeight,
          });

          return {
            overallFee,
            overallWeight,
            txWeight,
            source: {
              address: sourceAddress,
              balance: sourceBalance,
              chain,
            },
            destination: {
              address: address20,
              address32,
              balance: destinationBalance,
              chain: moonChain,
            },
            send: async (cb?: ExtrinsicEventsCallback): Promise<Hash> =>
              transactThroughSigned({
                api: destinationApi,
                cb,
                params,
                polkadotSigner,
                sourceAccount,
              }),
          };
        },
      };
    },
    to: (
      keyOrChain: ChainKeys | Chain<ChainKeys>,
    ): TransactorTo<Symbols, ChainKeys> => {
      const {
        balance: balanceConfig,
        chain,
        config,
        getOverallWeight,
        getOverallFee,
      } = to(keyOrChain);

      return {
        transact: async (
          callHash: string,
          ethersSigner?: EthersSigner,
        ): Promise<TransactToData<Symbols, ChainKeys>> => {
          const signer = ethersSigner || options?.ethersSigner;

          if (!signer) {
            throw new Error('Ethers signer is not provided to xcm-transact');
          }

          const contract = new XcmTransactorContract(signer);

          const [sourceAddress, sourceApi, destinationApi] = await Promise.all([
            signer.getAddress(),
            getPolkadotApi(moonChain.ws),
            getPolkadotApi(chain.ws),
          ]);
          const [txWeight, { address20, address32 }] = await Promise.all([
            getTxWeight(callHash, destinationApi),
            getDerivatedAddress(
              destinationApi,
              config.multilocation.account.get(sourceAddress),
            ),
          ]);
          const [sourceBalance, destinationBalance] = await Promise.all([
            getBalance<Symbols>(sourceApi, sourceAddress, moonBalanceConfig),
            getBalance<Symbols>(destinationApi, address20, balanceConfig),
          ]);
          const overallWeight = getOverallWeight(txWeight);
          const overallFee = getOverallFee(overallWeight);

          return {
            overallFee,
            overallWeight,
            txWeight,
            source: {
              address: sourceAddress,
              balance: sourceBalance,
              chain: moonChain,
            },
            destination: {
              address: address20,
              address32,
              balance: destinationBalance,
              chain,
            },
            send: async (cb?: ExtrinsicEventsCallback): Promise<Hash> => {
              const tx = await contract.transactThroughSignedMultilocation(
                config.transact.getParams({
                  callHash,
                  overallFee,
                  overallWeight,
                  txWeight,
                }),
              );

              if (cb) {
                createTxEventHandler(signer, tx.hash, cb);
              }

              return tx.hash;
            },
          };
        },
      };
    },
  };
}
