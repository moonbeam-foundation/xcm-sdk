/* eslint-disable @typescript-eslint/no-use-before-define */
import {
  Asset,
  AssetSymbol,
  Chain,
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
import { IKeyringPair } from '@polkadot/types/types';
import { isString } from 'lodash';
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
import { createDummyAsset, subscribeToAssetsBalanceInfo } from './sdk.utils';
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
  const { symbols, assets, moonAsset, moonChain } = configBuilder;

  return {
    symbols,
    assets,
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
    deposit: (
      symbolOrAsset: Symbols | Asset<Symbols>,
    ): XcmSdkDeposit<Symbols, ChainKeys> => {
      const { chains, from } = configBuilder.deposit(symbolOrAsset);

      return {
        chains,
        from: (keyOrChain: ChainKeys | Chain<ChainKeys>) => {
          const { asset, origin, config } = from(keyOrChain);

          return {
            get: async (
              account: string,
              sourceAccount: string | IKeyringPair,
              { primaryAccount, polkadotSigner } = {},
            ): Promise<DepositTransferData<Symbols>> => {
              const signer = polkadotSigner || options?.polkadotSigner;

              if (isString(sourceAccount) && !signer) {
                throw new Error(
                  'Polkadot Signer/KeyringPair are not provided to XCM-SDK',
                );
              }

              const [polkadot, foreignPolkadot] = await createPolkadotServices<
                Symbols,
                ChainKeys
              >([configBuilder.moonChain.ws, config.origin.ws]);
              const meta = foreignPolkadot.getMetadata();
              const nativeAsset =
                configBuilder.assets[meta.symbol] ||
                createDummyAsset(meta.symbol);

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
    withdraw: (
      symbolOrAsset: Symbols | Asset<Symbols>,
    ): XcmSdkWithdraw<Symbols, ChainKeys> => {
      const { chains, to } = configBuilder.withdraw(symbolOrAsset);

      return {
        chains,
        to: (keyOrChain: ChainKeys | Chain<ChainKeys>) => {
          const { asset, origin, config } = to(keyOrChain);

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
