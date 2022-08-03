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
import { call } from './utils';

export interface Options {
  ethersSigner: EthersSigner;
  polkadotSigner: PolkadotSigner;
}

export async function XcmSDK(options: Options) {
  return {
    moonbase: await create<MoonbaseAssets, MoonbaseChains>(moonbase, options),
    moonbeam: await create<MoonbeamAssets, MoonbeamChains>(moonbeam, options),
    moonriver: await create<MoonriverAssets, MoonriverChains>(
      moonriver,
      options,
    ),
  };
}

async function create<Assets extends Asset, Chains extends Chain>(
  configGetter: ConfigGetter<Assets, Chains>,
  options: Options,
) {
  const contract = new XTokensContract<Assets>(options.ethersSigner);
  const polkadot = await PolkadotService.create(configGetter.chain.ws);

  return {
    // TODO: balances
    asset: configGetter.asset,
    chain: configGetter.chain,
    deposit: (asset: Assets) => {
      const { chains, from } = configGetter.deposit(asset);

      return {
        chains,
        from: (chain: Chains) => {
          const { asset: assetConfig, origin, config } = from(chain);

          return {
            get: async (account: string, amount: bigint) => {
              const foreignPolkadot = await PolkadotService.create(
                config.origin.ws,
              );
              const [decimals, sourceBalance] = await Promise.all([
                polkadot.getAssetDecimals(assetConfig.id),
                foreignPolkadot.getGenericBalance(account, config.balance),
              ]);
              const extrinsicFeeBalance = config.extrinsicFeeBalance
                ? await foreignPolkadot.getGenericBalance(
                    account,
                    config.extrinsicFeeBalance,
                  )
                : undefined;
              const extrinsicFeeBalance2 = call(
                foreignPolkadot.getGenericBalance,
                account,
                config.extrinsicFeeBalance,
              );

              return {
                asset: { ...assetConfig, decimals },
                origin,
                source: config.origin,
                sourceBalance,
                extrinsicFeeBalance,
              };
            },
          };
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
              const foreignPolkadot = await PolkadotService.create(
                config.destination.ws,
              );
              const [decimals, destinationBalance, fee] = await Promise.all([
                foreignPolkadot.getAssetDecimals(assetConfig.id),
                foreignPolkadot.getGenericBalance(account, config.balance),
                contract.getTransferFees(account, amount, assetConfig, config),
              ]);

              // TODO: create interface
              return {
                asset: { ...assetConfig, decimals },
                destination: config.destination,
                destinationBalance,
                destinationFee: config.weight * config.feePerWeight,
                existentialDeposit: config.existentialDeposit,
                fee,
                origin,
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
