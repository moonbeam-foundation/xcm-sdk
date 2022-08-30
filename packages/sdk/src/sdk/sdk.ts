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
import { XTokensContract } from '../contracts';
import { AssetBalanceInfo, createPolkadotServices } from '../polkadot';
import { getDepositData } from './sdk.deposit';
import {
  DepositTransferData,
  SdkOptions,
  WithdrawTransferData,
  XcmSdk,
  XcmSdkByChain,
  XcmSdkDeposit,
  XcmSdkWithdraw,
} from './sdk.interfaces';
import { subscribeToAssetsBalanceInfo } from './sdk.utils';
import { getWithdrawData } from './sdk.withdraw';

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
  const { moonAsset, moonChain } = configGetter;
  return {
    moonAsset,
    moonChain,
    subscribeToAssetsBalanceInfo: async (
      account: string,
      cb: (data: AssetBalanceInfo<Symbols>[]) => void,
    ): UnsubscribePromise => {
      const [polkadot] = await createPolkadotServices<Symbols, ChainKeys>([
        configGetter.moonChain.ws,
      ]);

      return subscribeToAssetsBalanceInfo({
        account,
        configGetter,
        polkadot,
        cb,
      });
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
                moonChain,
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
          const { asset, origin, config } = to(chain);

          return {
            get: async (
              destinationAccount: string,
            ): Promise<WithdrawTransferData<Symbols>> => {
              const contract = new XTokensContract<Symbols>(
                options.ethersSigner,
              );
              const [polkadot, destinationPolkadot] =
                await createPolkadotServices<Symbols, ChainKeys>([
                  configGetter.moonChain.ws,
                  config.destination.ws,
                ]);
              const meta = destinationPolkadot.getMetadata();
              const nativeAsset = configGetter.assets[meta.symbol];

              return getWithdrawData({
                asset,
                config,
                contract,
                destinationAccount,
                destinationPolkadot,
                moonChain,
                nativeAsset,
                options,
                origin,
                polkadot,
              });
            },
          };
        },
      };
    },
  };
}
