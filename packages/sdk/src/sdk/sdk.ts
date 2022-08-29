/* eslint-disable @typescript-eslint/no-use-before-define */
import {
  AssetSymbol,
  ChainKey,
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
import { UnsubscribePromise } from '@polkadot/api/types';
import { XTokensContract } from '../contracts/XTokensContract';
import {
  AssetBalanceInfo,
  createPolkadotServices,
  PolkadotService,
} from '../polkadot';
import { getDepositData } from './sdk.deposit';
import {
  DepositTransferData,
  ExtrinsicEvent,
  SdkOptions,
  WithdrawTransferData,
  XcmSdk,
  XcmSdkByChain,
  XcmSdkDeposit,
  XcmSdkWithdraw,
} from './sdk.interfaces';
import { sortByBalanceAndChainName } from './sdk.utils';
import { createTransactionEventHandler } from './sdk.withdraw';

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

async function createChainSdk<
  Symbols extends AssetSymbol,
  ChainKeys extends ChainKey,
>(
  configGetter: ConfigGetter<Symbols, ChainKeys>,
  options: SdkOptions,
): Promise<XcmSdk<Symbols, ChainKeys>> {
  const contract = new XTokensContract<Symbols>(options.ethersSigner);

  return {
    moonAsset: configGetter.moonAsset,
    moonChain: configGetter.moonChain,
    subscribeToAssetsBalanceInfo: async (
      account: string,
      cb: (data: AssetBalanceInfo<Symbols>[]) => void,
    ): UnsubscribePromise => {
      const polkadot = await PolkadotService.create<Symbols, ChainKeys>(
        configGetter.moonChain.ws,
      );
      let lastBalance = 0n;
      let lastInfo: AssetBalanceInfo<Symbols>[] = [];
      const handler = (data: bigint | AssetBalanceInfo<Symbols>[]) => {
        const isBalance = typeof data === 'bigint';

        lastBalance = isBalance ? data : lastBalance;
        lastInfo = (isBalance ? lastInfo : data)
          .map((info) => {
            if (info.asset.isNative) {
              // eslint-disable-next-line no-param-reassign
              info.balance = lastBalance;
            }

            return info;
          })
          .sort(sortByBalanceAndChainName);

        cb(lastInfo);
      };

      const unsubscribeBalance = await polkadot.subscribeToBalance(
        account,
        handler,
      );
      const unsubscribeInfo = await polkadot.subscribeToAssetsBalanceInfo(
        account,
        configGetter,
        handler,
      );

      return () => {
        unsubscribeBalance();
        unsubscribeInfo();
      };
    },
    deposit: (symbol: Symbols): XcmSdkDeposit<Symbols, ChainKeys> => {
      const { chains, from } = configGetter.deposit(symbol);

      return {
        chains,
        from: (chain: ChainKeys) => {
          const { asset, origin, config } = from(chain);

          return {
            get: async (
              account: string,
              sourceAccount: string,
              primaryAccount?: string,
            ): Promise<DepositTransferData<Symbols>> => {
              const [polkadot, foreignPolkadot] = await createPolkadotServices<
                Symbols,
                ChainKeys
              >([configGetter.moonChain.ws, config.origin.ws]);
              const meta = foreignPolkadot.getMetadata();
              const nativeAsset = configGetter.assets[meta.symbol];

              return getDepositData({
                account,
                asset,
                config,
                foreignPolkadot,
                moonChain: configGetter.moonChain,
                nativeAsset,
                options,
                origin,
                polkadot,
                primaryAccount,
                sourceAccount,
              });
            },
          };
        },
      };
    },
    withdraw: (symbol: Symbols): XcmSdkWithdraw<Symbols, ChainKeys> => {
      const { chains, to } = configGetter.withdraw(symbol);

      return {
        chains,
        to: (chain: ChainKeys) => {
          const { asset: assetConfig, origin, config } = to(chain);

          return {
            get: async (
              destinationAccount: string,
            ): Promise<WithdrawTransferData<Symbols>> => {
              const [polkadot, destinationPolkadot] =
                await createPolkadotServices<Symbols, ChainKeys>([
                  configGetter.moonChain.ws,
                  config.destination.ws,
                ]);
              const meta = destinationPolkadot.getMetadata();
              const nativeAsset = configGetter.assets[meta.symbol];
              const [decimals, destinationBalance, existentialDeposit] =
                await Promise.all([
                  assetConfig.isNative
                    ? configGetter.moonChain.decimals
                    : polkadot.getAssetDecimals(assetConfig.id),
                  destinationPolkadot.getGenericBalance(
                    destinationAccount,
                    config.balance,
                  ),
                  destinationPolkadot.getExistentialDeposit(),
                ]);
              const destinationFee = BigInt(
                config.weight * config.feePerWeight,
              );
              const min = destinationFee + existentialDeposit;

              return {
                asset: { ...assetConfig, decimals },
                destination: config.destination,
                destinationBalance,
                destinationFee,
                existentialDeposit,
                min,
                native: { ...nativeAsset, decimals: meta.decimals },
                origin,
                getFee: async (amount) =>
                  contract.getTransferFees(
                    destinationAccount,
                    amount,
                    assetConfig,
                    config,
                  ),
                send: async (
                  amount: bigint,
                  cb?: (event: ExtrinsicEvent) => void,
                ) => {
                  const tx = await contract.transfer(
                    destinationAccount,
                    amount,
                    assetConfig,
                    config,
                  );

                  if (cb) {
                    createTransactionEventHandler(
                      options.ethersSigner,
                      tx.hash,
                      cb,
                    );
                  }

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
