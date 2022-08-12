/* eslint-disable @typescript-eslint/no-use-before-define */
import {
  Asset,
  Chain,
  ConfigGetter,
  ExtrinsicPallet,
  moonbase,
  MoonbaseAssets,
  MoonbaseChains,
  moonbeam,
  MoonbeamAssets,
  MoonbeamChains,
  moonriver,
  MoonriverAssets,
  MoonriverChains,
  XTokensExtrinsic,
} from '@moonbeam-network/xcm-config';
import { UnsubscribePromise } from '@polkadot/api/types';
import { XTokensContract } from '../contracts/XTokensContract';
import { AssetBalanceInfo, PolkadotService } from '../polkadot';
import {
  ExtrinsicEvent,
  SdkOptions,
  XcmSdk,
  XcmSdkByChain,
  XcmSdkDeposit,
  XcmSdkWithdraw,
} from './sdk.interfaces';
import { createExtrinsicEventHandler } from './sdk.utils';

export async function create(options: SdkOptions): Promise<XcmSdkByChain> {
  return {
    moonbase: await createChainSdk<MoonbaseAssets, MoonbaseChains>(
      moonbase,
      options,
    ),
    moonbeam: await createChainSdk<MoonbeamAssets, MoonbeamChains>(
      moonbeam,
      options,
    ),
    moonriver: await createChainSdk<MoonriverAssets, MoonriverChains>(
      moonriver,
      options,
    ),
  };
}

async function createChainSdk<Assets extends Asset, Chains extends Chain>(
  configGetter: ConfigGetter<Assets, Chains>,
  options: SdkOptions,
): Promise<XcmSdk<Assets, Chains>> {
  const contract = new XTokensContract<Assets>(options.ethersSigner);
  const polkadot = await PolkadotService.create<Assets, Chains>(
    configGetter.chain.ws,
  );

  return {
    asset: configGetter.asset,
    chain: configGetter.chain,
    subscribeToAssetsBalanceInfo: async (
      account: string,
      cb: (data: AssetBalanceInfo<Assets>[]) => void,
    ): UnsubscribePromise =>
      polkadot.subscribeToAssetsBalanceInfo(account, configGetter, cb),
    deposit: (asset: Assets): XcmSdkDeposit<Assets, Chains> => {
      const { chains, from } = configGetter.deposit(asset);

      return {
        chains,
        from: (chain: Chains) => {
          const { asset: assetConfig, origin, config } = from(chain);

          return {
            get: async (account: string, primaryAccount?: string) => {
              const foreignPolkadot = await PolkadotService.create<
                Assets,
                Chains
              >(config.origin.ws);
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
                send: async (
                  amount: bigint,
                  cb?: (event: ExtrinsicEvent) => void,
                ): Promise<string> => {
                  const isMultiCurrencies =
                    config.extrinsic.pallet === ExtrinsicPallet.XTokens &&
                    config.extrinsic.extrinsic ===
                      XTokensExtrinsic.TransferMultiCurrencies;

                  const sourceNativeAsset = configGetter.assets[meta.symbol];
                  const fee = isMultiCurrencies
                    ? await polkadot.getAssetFee(
                        sourceNativeAsset.id,
                        config.origin.weight,
                      )
                    : 0n;

                  const extrinsic = foreignPolkadot.getXcmExtrinsic(
                    account,
                    amount,
                    config.extrinsic,
                    fee,
                    primaryAccount,
                  );

                  const hash = await extrinsic.signAndSend(
                    account,
                    {
                      signer: options.polkadotSigner,
                    },
                    cb && createExtrinsicEventHandler(config, cb),
                  );

                  return hash.toString();
                },
              };
            },
          };
        },
      };
    },
    withdraw: (asset: Assets): XcmSdkWithdraw<Assets, Chains> => {
      const { chains, to } = configGetter.withdraw(asset);

      return {
        chains,
        to: (chain: Chains) => {
          const { asset: assetConfig, origin, config } = to(chain);

          return {
            get: async (account: string, amount: bigint) => {
              const foreignPolkadot = await PolkadotService.create<
                Assets,
                Chains
              >(config.destination.ws);
              const meta = foreignPolkadot.getMetadata();
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
                native: { decimals: meta.decimals, symbol: meta.symbol },
                destination: config.destination,
                destinationBalance,
                destinationFee: config.weight * config.feePerWeight,
                existentialDeposit,
                fee,
                origin,
                // TODO: the same as for deposits return events to callback
                send: async () => {
                  const tx = await contract.transfer(
                    account,
                    amount,
                    assetConfig,
                    config,
                  );

                  return tx.hash;
                },
              };
            },
          };
        },
      };
    },
  };
}
