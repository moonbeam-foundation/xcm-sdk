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
    // TODO: subscribe to balances
    asset: configGetter.asset,
    chain: configGetter.chain,
    deposit: (asset: Assets) => {
      const { chains, from } = configGetter.deposit(asset);

      return {
        chains,
        from: (chain: Chains) => {
          const { asset: assetConfig, origin, config } = from(chain);

          return {
            get: async (account: string) => {
              const foreignPolkadot = await PolkadotService.create(
                config.origin.ws,
              );
              const meta = foreignPolkadot.getMetadata();
              const [
                decimals,
                sourceBalance,
                existentialDeposit,
                extrinsicFeeBalance,
                minBalance,
              ] = await Promise.all([
                polkadot.getAssetDecimals(assetConfig.id),
                foreignPolkadot.getGenericBalance(account, config.balance),
                foreignPolkadot.getExistentialDeposit(),
                config.extrinsicFeeBalance
                  ? await foreignPolkadot.getGenericBalance(
                      account,
                      config.extrinsicFeeBalance,
                    )
                  : undefined,
                config.minBalance
                  ? foreignPolkadot.getAssetMinBalance(config.minBalance)
                  : undefined,
              ]);

              return {
                asset: { ...assetConfig, decimals },
                native: { decimals: meta.decimals, symbol: meta.symbol },
                origin,
                source: config.origin,
                sourceBalance,
                existentialDeposit,
                minBalance,
                extrinsicFeeBalance: extrinsicFeeBalance
                  ? {
                      amount: extrinsicFeeBalance,
                      decimals: meta.decimals,
                      symbol: meta.symbol,
                    }
                  : undefined,
                send: async (amount: bigint) => {},
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
              const [decimals, destinationBalance, fee, existentialDeposit] =
                await Promise.all([
                  polkadot.getAssetDecimals(assetConfig.id),
                  foreignPolkadot.getGenericBalance(account, config.balance),
                  contract.getTransferFees(
                    account,
                    amount,
                    assetConfig,
                    config,
                  ),
                  foreignPolkadot.getExistentialDeposit(),
                ]);

              return {
                asset: { ...assetConfig, decimals },
                destination: config.destination,
                destinationBalance,
                destinationFee: config.weight * config.feePerWeight,
                existentialDeposit,
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
