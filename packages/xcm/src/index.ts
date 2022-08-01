/* eslint-disable @typescript-eslint/no-use-before-define */
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  Asset,
  Chain,
  ConfigGetter,
  moonbase,
  MoonbaseAssets,
  MoonbaseChains,
  moonbeam,
  MoonbeamAssets,
  MoonbeamChains,
  moonriver,
  MoonriverAssets,
  MoonriverChains,
} from '@moonbeam-network/xcm-config';
import { Signer as PolkadotSigner } from '@polkadot/api/types';
import { Signer as EthersSigner } from 'ethers';
import { XTokensContract } from './contracts/XTokensContract';
import { PolkadotService } from './polkadot';

export interface Options {
  ethersSigner: EthersSigner;
  polkadotSigner: PolkadotSigner;
}

export function XcmSDK(options: Options) {
  return {
    moonbase: setup<MoonbaseAssets, MoonbaseChains>(moonbase, options),
    moonbeam: setup<MoonbeamAssets, MoonbeamChains>(moonbeam, options),
    moonriver: setup<MoonriverAssets, MoonriverChains>(moonriver, options),
  };
}

function setup<Assets extends Asset, Chains extends Chain>(
  configGetter: ConfigGetter<Assets, Chains>,
  options: Options,
) {
  const contract = new XTokensContract<Assets>(options.ethersSigner);

  return {
    deposit: (asset: Assets) => {
      const depositConfig = configGetter.deposit(asset);

      return {
        chains: depositConfig.chains,
        from: async (chain: Chains) => {
          const cfg = depositConfig.from(chain);

          return { cfg, options };
        },
      };
    },
    withdraw: (asset: Assets) => {
      const { chains, to } = configGetter.withdraw(asset);

      return {
        chains,
        to: (chain: Chains) => {
          const { asset: assetConfig, origin, config } = to(chain);

          return {
            get: async (account: string, amount: bigint) => {
              const polkadot = await PolkadotService.create(
                config.destination.ws,
              );

              return {
                asset: assetConfig,
                origin,
                destination: config.destination,
                destinationBalance: await polkadot.getGenericBalance(
                  account,
                  config.balance,
                ),
                fee: await contract.getTransferFees(
                  account,
                  amount,
                  assetConfig,
                  config,
                ),
                send: async () =>
                  contract.transfer(account, amount, assetConfig, config),
              };
            },
          };
        },
      };
    },
  };
}
