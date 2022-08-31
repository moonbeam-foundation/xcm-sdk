/* eslint-disable @typescript-eslint/no-use-before-define */
import {
  AssetSymbol,
  ChainKey,
  moonbase,
  MoonbaseAssets,
  MoonbaseChains,
  moonbeam,
  MoonbeamAssets,
  MoonbeamChains,
  moonriver,
  MoonriverAssets,
  MoonriverChains,
  XcmConfigBuilder,
} from '@moonbeam-network/xcm-config';
import { UnsubscribePromise } from '@polkadot/api/types';
import { XTokensContract } from '../contracts';
import { AssetBalanceInfo, createPolkadotServices } from '../polkadot';
import { getDepositData } from './sdk.deposit';
import {
  DepositTransferData,
  SdkOptions,
  WithdrawGetParams,
  WithdrawTransferData,
  XcmSdk,
  XcmSdkByChain,
  XcmSdkDeposit,
  XcmSdkWithdraw,
} from './sdk.interfaces';
import { subscribeToAssetsBalanceInfo } from './sdk.utils';
import { getWithdrawData } from './sdk.withdraw';

export function init(options?: SdkOptions): XcmSdkByChain {
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
  configBuilder: XcmConfigBuilder<Symbols, ChainKeys>,
  options?: SdkOptions,
): XcmSdk<Symbols, ChainKeys> {
  const { moonAsset, moonChain } = configBuilder;

  return {
    moonAsset,
    moonChain,
    subscribeToAssetsBalanceInfo: async (
      account: string,
      cb: (data: AssetBalanceInfo<Symbols>[]) => void,
    ): UnsubscribePromise => {
      const [polkadot] = await createPolkadotServices<Symbols, ChainKeys>([
        configBuilder.moonChain.ws,
      ]);

      return subscribeToAssetsBalanceInfo({
        account,
        polkadot,
        configBuilder,
        cb,
      });
    },
    deposit: (symbol: Symbols): XcmSdkDeposit<Symbols, ChainKeys> => {
      const { chains, from } = configBuilder.deposit(symbol);

      return {
        chains,
        from: (chain: ChainKeys) => {
          const { asset, origin, config } = from(chain);

          return {
            get: async (
              account: string,
              sourceAccount: string,
              { primaryAccount, polkadotSigner } = {},
            ): Promise<DepositTransferData<Symbols>> => {
              const signer = polkadotSigner || options?.polkadotSigner;

              if (!signer) {
                throw new Error('Polkadot signer is not provided to XCM-SDK');
              }

              const [polkadot, foreignPolkadot] = await createPolkadotServices<
                Symbols,
                ChainKeys
              >([configBuilder.moonChain.ws, config.origin.ws]);
              const meta = foreignPolkadot.getMetadata();
              const nativeAsset = configBuilder.assets[meta.symbol];

              return getDepositData({
                account,
                asset,
                config,
                foreignPolkadot,
                moonChain,
                nativeAsset,
                origin,
                polkadot,
                polkadotSigner: signer,
                primaryAccount,
                sourceAccount,
              });
            },
          };
        },
      };
    },
    withdraw: (symbol: Symbols): XcmSdkWithdraw<Symbols, ChainKeys> => {
      const { chains, to } = configBuilder.withdraw(symbol);

      return {
        chains,
        to: (chain: ChainKeys) => {
          const { asset, origin, config } = to(chain);

          return {
            get: async (
              destinationAccount: string,
              { ethersSigner }: WithdrawGetParams = {},
            ): Promise<WithdrawTransferData<Symbols>> => {
              const signer = ethersSigner || options?.ethersSigner;

              if (!signer) {
                throw new Error('Ethers signer is not provided to XCM-SDK');
              }

              const contract = new XTokensContract<Symbols>(signer);
              const [polkadot, destinationPolkadot] =
                await createPolkadotServices<Symbols, ChainKeys>([
                  configBuilder.moonChain.ws,
                  config.destination.ws,
                ]);
              const meta = destinationPolkadot.getMetadata();
              const nativeAsset = configBuilder.assets[meta.symbol];

              return getWithdrawData({
                asset,
                config,
                contract,
                destinationAccount,
                destinationPolkadot,
                ethersSigner: signer,
                moonChain,
                nativeAsset,
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
