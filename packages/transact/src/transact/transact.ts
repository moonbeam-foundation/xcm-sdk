/* eslint-disable @typescript-eslint/no-use-before-define */
import {
  AssetSymbol,
  Chain,
  ChainKey,
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

          const sourceApi = await getPolkadotApi(chain.ws);
          const destinationApi = await getPolkadotApi(moonChain.ws);
          const txWeight = await getTxWeight(callHash, destinationApi);
          const overallWeight = getOverallWeight(txWeight);
          const overallFee = getOverallFee(overallWeight);
          const { address20, address32 } = await getDerivatedAddress(
            destinationApi,
            config.multilocation.account.get(sourceAddress),
          );
          const params = config.transact.getParams({
            callHash,
            overallFee,
            overallWeight,
            txWeight,
          });
          const balance = await getBalance(sourceApi, address20, balanceConfig);
          const destinationBalance = await getBalance(
            destinationApi,
            address20,
            balanceConfig,
          );

          return {
            overallFee,
            overallWeight,
            txWeight,
            source: {
              address: sourceAddress,
              balance,
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
          const address = await signer.getAddress();
          const sourceApi = await getPolkadotApi(moonChain.ws);
          const destinationApi = await getPolkadotApi(chain.ws);
          const txWeight = await getTxWeight(callHash, destinationApi);
          const overallWeight = getOverallWeight(txWeight);
          const overallFee = getOverallFee(overallWeight);
          const { address20, address32 } = await getDerivatedAddress(
            destinationApi,
            config.multilocation.account.get(address),
          );
          const balance = await getBalance(
            destinationApi,
            address20,
            balanceConfig,
          );
          const sourceBalance = await getBalance(
            sourceApi,
            address,
            balanceConfig,
          );

          return {
            overallFee,
            overallWeight,
            txWeight,
            source: {
              address,
              balance: sourceBalance,
              chain: moonChain,
            },
            destination: {
              address: address20,
              address32,
              balance,
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
