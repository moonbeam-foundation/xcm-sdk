/* eslint-disable @typescript-eslint/no-use-before-define */
// eslint-disable-next-line import/no-extraneous-dependencies
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
  PolkadotXcmExtrinsicSuccessEvent,
  XTokensExtrinsic,
} from '@moonbeam-network/xcm-config';
import {
  Signer as PolkadotSigner,
  UnsubscribePromise,
} from '@polkadot/api/types';
import { Signer as EthersSigner } from 'ethers';
import { XTokensContract } from './contracts/XTokensContract';
import { AssetBalanceInfo, PolkadotService } from './polkadot';

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

export type ExtrinsicEvent =
  | ExtrinsicFailedEvent
  | ExtrinsicSentEvent
  | ExtrinsicSuccessEvent;

export interface ExtrinsicFailedEvent {
  status: ExtrinsicStatus.Failed;
  message: string;
  block: string;
}

export interface ExtrinsicSentEvent {
  status: ExtrinsicStatus.Sent;
}

export interface ExtrinsicSuccessEvent {
  status: ExtrinsicStatus.Success;
  block: string;
}

export enum ExtrinsicStatus {
  Failed = 'Failed',
  Sent = 'Sent',
  Success = 'Success',
}

async function create<Assets extends Asset, Chains extends Chain>(
  configGetter: ConfigGetter<Assets, Chains>,
  options: Options,
) {
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
    deposit: (asset: Assets) => {
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
                    ({ events = [], status }) => {
                      if (status.isReady) {
                        cb?.({ status: ExtrinsicStatus.Sent });
                      }

                      if (status.isInBlock) {
                        const block = status.asInBlock.toString();

                        events.forEach(
                          ({ event: { data, method, section } }) => {
                            if (
                              section === config.extrinsic.pallet &&
                              method === config.extrinsic.successEvent
                            ) {
                              if (
                                method ===
                                PolkadotXcmExtrinsicSuccessEvent.Attempted
                              ) {
                                const eventData = data.at(0) as any;

                                if (eventData.isIncomplete) {
                                  cb?.({
                                    status: ExtrinsicStatus.Failed,
                                    block,
                                    message: eventData.asIncomplete
                                      .toHuman()
                                      .join('; '),
                                  });

                                  return;
                                }
                              }

                              cb?.({
                                status: ExtrinsicStatus.Success,
                                block,
                              });
                            }

                            if (
                              section === 'system' &&
                              method === 'ExtrinsicFailed'
                            ) {
                              cb?.({
                                status: ExtrinsicStatus.Failed,
                                block,
                                message: data.join('; '),
                              });
                            }
                          },
                        );
                      }
                    },
                  );

                  return hash.toString();
                },
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
              const foreignPolkadot = await PolkadotService.create<
                Assets,
                Chains
              >(config.destination.ws);
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
