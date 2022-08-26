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
import { isUndefined } from '@polkadot/util';
import { XTokensContract } from '../contracts/XTokensContract';
import { AssetBalanceInfo, PolkadotService } from '../polkadot';
import { sortByBalanceAndChainName } from '../polkadot/polkadot.utils';
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
import {
  createExtrinsicEventHandler,
  createTransactionEventHandler,
  getCreateExtrinsic,
} from './sdk.utils';

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
  Symbols extends AssetSymbol = AssetSymbol,
  ChainKeys extends ChainKey = ChainKey,
>(
  configGetter: ConfigGetter<Symbols, ChainKeys>,
  options: SdkOptions,
): Promise<XcmSdk<Symbols, ChainKeys>> {
  const contract = new XTokensContract<Symbols>(options.ethersSigner);

  return {
    asset: configGetter.asset,
    chain: configGetter.chain,
    subscribeToAssetsBalanceInfo: async (
      account: string,
      cb: (data: AssetBalanceInfo<Symbols>[]) => void,
    ): UnsubscribePromise => {
      const polkadot = await PolkadotService.create<Symbols, ChainKeys>(
        configGetter.chain.ws,
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
          const { asset: assetConfig, origin, config } = from(chain);

          return {
            get: async (
              account: string,
              sourceAccount: string,
              primaryAccount?: string,
            ): Promise<DepositTransferData<Symbols>> => {
              const polkadot = await PolkadotService.create<Symbols, ChainKeys>(
                configGetter.chain.ws,
              );
              const foreignPolkadot = await PolkadotService.create<
                Symbols,
                ChainKeys
              >(config.origin.ws);
              const meta = foreignPolkadot.getMetadata();
              const nativeAsset = configGetter.assets[meta.symbol];
              const createExtrinsic = getCreateExtrinsic({
                account,
                config,
                foreignPolkadot,
                nativeAsset,
                polkadot,
                primaryAccount,
              });

              const [
                decimals,
                sourceBalance,
                existentialDeposit,
                sourceFeeBalance,
                moonChainFee,
                sourceMinBalance = 0n,
                min,
              ] = await Promise.all([
                polkadot.getAssetDecimals(assetConfig.id),
                foreignPolkadot.getGenericBalance(
                  primaryAccount || sourceAccount,
                  config.balance,
                ),
                foreignPolkadot.getExistentialDeposit(),
                config.sourceFeeBalance
                  ? foreignPolkadot.getGenericBalance(
                      sourceAccount,
                      config.sourceFeeBalance,
                    )
                  : undefined,
                config.isNativeAssetPayingMoonFee
                  ? polkadot.getAssetFee(nativeAsset.id, config.origin.weight)
                  : undefined,
                config.sourceMinBalance
                  ? foreignPolkadot.getAssetMinBalance(config.sourceMinBalance)
                  : undefined,
                assetConfig.isNative
                  ? PolkadotService.getChainMin(
                      config.origin.weight,
                      configGetter.chain.unitsPerSecond,
                    )
                  : polkadot.getAssetFee(assetConfig.id, config.origin.weight),
              ]);

              return {
                asset: { ...assetConfig, decimals },
                existentialDeposit,
                min,
                moonChainFee,
                native: { ...nativeAsset, decimals: meta.decimals },
                origin,
                source: config.origin,
                sourceBalance,
                sourceFeeBalance: !isUndefined(sourceFeeBalance)
                  ? { ...meta, balance: sourceFeeBalance }
                  : undefined,
                sourceMinBalance,
                getFee: async (amount = sourceBalance): Promise<bigint> => {
                  const extrinsic = await createExtrinsic(amount);
                  const info = await extrinsic.paymentInfo(sourceAccount);

                  return info.partialFee.toBigInt();
                },
                send: async (
                  amount: bigint,
                  cb?: (event: ExtrinsicEvent) => void,
                ): Promise<string> => {
                  const extrinsic = await createExtrinsic(amount);
                  const hash = await extrinsic.signAndSend(
                    sourceAccount,
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
              const polkadot = await PolkadotService.create<Symbols, ChainKeys>(
                configGetter.chain.ws,
              );
              const destinationPolkadot = await PolkadotService.create<
                Symbols,
                ChainKeys
              >(config.destination.ws);
              const meta = destinationPolkadot.getMetadata();
              const nativeAsset = configGetter.assets[meta.symbol];
              const [decimals, destinationBalance, existentialDeposit] =
                await Promise.all([
                  assetConfig.isNative
                    ? configGetter.chain.decimals
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
