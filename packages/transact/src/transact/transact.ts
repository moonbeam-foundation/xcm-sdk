/* eslint-disable @typescript-eslint/no-use-before-define */
import {
  Chain,
  ChainKey,
  moonbase,
  moonbeam,
  moonriver,
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
    moonbase: initByChain<MoonbaseChains>(moonbase, options),
    moonbeam: initByChain<MoonbeamChains>(moonbeam, options),
    moonriver: initByChain<MoonriverChains>(moonriver, options),
  };
}

function initByChain<ChainKeys extends ChainKey>(
  configBuilder: XcmConfigBuilder<any, ChainKeys>,
  options?: TransactInitOptions,
): Transactor<ChainKeys> {
  const { moonChain, transact } = configBuilder;
  const { chainsFrom, chainsTo, from, to } = transact();

  return {
    moonChain,
    chainsFrom,
    chainsTo,
    from: (
      keyOrChain: ChainKeys | Chain<ChainKeys>,
    ): TransactorFrom<ChainKeys> => {
      const { chain, config, getOverallWeight, getOverallFee } =
        from(keyOrChain);

      return {
        transact: async (
          callHash: string,
          sourceAccount: string | IKeyringPair,
          polkadotSigner?: PolkadotSigner,
        ): Promise<TransactFromData<ChainKeys>> => {
          const signer = polkadotSigner || options?.polkadotSigner;

          if (isString(sourceAccount) && !signer) {
            throw new Error(
              'Polkadot Signer/KeyringPair are not provided to xcm-transact',
            );
          }

          const sourceAddress = isString(sourceAccount)
            ? sourceAccount
            : sourceAccount.address;

          const api = await getPolkadotApi(moonChain.ws);
          const txWeight = await getTxWeight(callHash, api);
          const overallWeight = getOverallWeight(txWeight);
          const overallFee = getOverallFee(overallWeight);
          // TODO: works for substrate address?
          const { address20, address32 } = await getDerivatedAddress(
            api,
            config.multilocation.account.get(sourceAddress),
          );
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
              chain,
              address: sourceAddress,
            },
            target: {
              chain: moonChain,
              address20,
              address32,
            },
            send: async (cb?: ExtrinsicEventsCallback): Promise<Hash> =>
              transactThroughSigned({
                api,
                cb,
                params,
                polkadotSigner,
                sourceAccount,
              }),
          };
        },
      };
    },
    to: (keyOrChain: ChainKeys | Chain<ChainKeys>): TransactorTo<ChainKeys> => {
      const { chain, config, getOverallWeight, getOverallFee } = to(keyOrChain);

      return {
        transact: async (
          callHash: string,
          ethersSigner?: EthersSigner,
        ): Promise<TransactToData<ChainKeys>> => {
          const signer = ethersSigner || options?.ethersSigner;

          if (!signer) {
            throw new Error('Ethers signer is not provided to xcm-transact');
          }

          const contract = new XcmTransactorContract(signer);
          const address = await signer.getAddress();
          const api = await getPolkadotApi(chain.ws);
          const txWeight = await getTxWeight(callHash, api);
          const overallWeight = getOverallWeight(txWeight);
          const overallFee = getOverallFee(overallWeight);
          const { address20, address32 } = await getDerivatedAddress(
            api,
            config.multilocation.account.get(address),
          );

          return {
            overallFee,
            overallWeight,
            txWeight,
            source: {
              chain: moonChain,
              address,
            },
            target: {
              chain,
              address20,
              address32,
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
