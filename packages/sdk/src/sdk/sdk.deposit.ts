import {
  Asset,
  AssetSymbol,
  Chain,
  ChainKey,
  DepositConfig,
  isMultiCurrency,
  MoonChain,
  PolkadotXcmExtrinsicSuccessEvent,
} from '@moonbeam-network/xcm-config';
import { ISubmittableResult } from '@polkadot/types/types';
import { isUndefined } from '@polkadot/util';
import { PolkadotService } from '../polkadot';
import {
  DepositTransferData,
  ExtrinsicEvent,
  ExtrinsicStatus,
  SdkOptions,
} from './sdk.interfaces';

export function createExtrinsicEventHandler<Symbols extends AssetSymbol>(
  config: DepositConfig<Symbols>,
  cb: (event: ExtrinsicEvent) => void,
) {
  return ({ events = [], status, txHash }: ISubmittableResult) => {
    const hash = txHash.toHex();

    if (status.isReady) {
      cb({ status: ExtrinsicStatus.Sent, txHash: hash });
    }

    if (status.isInBlock) {
      const block = status.asInBlock.toString();

      events.forEach(({ event: { data, method, section } }) => {
        if (
          section === config.extrinsic.pallet &&
          method === config.extrinsic.successEvent
        ) {
          if (method === PolkadotXcmExtrinsicSuccessEvent.Attempted) {
            const eventData = data.at(0) as any;

            if (eventData.isIncomplete) {
              cb({
                status: ExtrinsicStatus.Failed,
                blockHash: block,
                txHash: hash,
                message: eventData.asIncomplete.toHuman().join('; '),
              });

              return;
            }
          }

          cb({
            status: ExtrinsicStatus.Success,
            blockHash: block,
            txHash: hash,
          });
        }

        if (section === 'system' && method === 'ExtrinsicFailed') {
          cb({
            status: ExtrinsicStatus.Failed,
            blockHash: block,
            txHash: hash,
            message: data.join('; '),
          });
        }
      });
    }
  };
}

export interface CreateExtrinsicOptions<
  Symbols extends AssetSymbol,
  ChainKeys extends ChainKey,
> {
  account: string;
  config: DepositConfig<Symbols>;
  foreignPolkadot: PolkadotService<Symbols, ChainKeys>;
  nativeAsset: Asset<Symbols>;
  polkadot: PolkadotService<Symbols, ChainKeys>;
  primaryAccount?: string;
}

export function getCreateExtrinsic<
  Symbols extends AssetSymbol,
  ChainKeys extends ChainKey,
>({
  account,
  config,
  foreignPolkadot,
  nativeAsset,
  polkadot,
  primaryAccount,
}: CreateExtrinsicOptions<Symbols, ChainKeys>) {
  return async (amount: bigint) => {
    const fee = isMultiCurrency(config.extrinsic)
      ? await polkadot.getAssetFee(nativeAsset.id, config.origin.weight)
      : 0n;

    return foreignPolkadot.getXcmExtrinsic(
      account,
      amount,
      config.extrinsic,
      fee,
      primaryAccount,
    );
  };
}

export interface GetDepositDataParams<
  Symbols extends AssetSymbol,
  ChainKeys extends ChainKey,
> {
  account: string;
  asset: Asset<Symbols>;
  config: DepositConfig<Symbols>;
  foreignPolkadot: PolkadotService<Symbols, ChainKeys>;
  moonChain: MoonChain;
  nativeAsset: Asset<Symbols>;
  options: SdkOptions;
  origin: MoonChain | Chain<ChainKeys>;
  polkadot: PolkadotService<Symbols, ChainKeys>;
  primaryAccount?: string;
  sourceAccount: string;
}

export async function getDepositData<
  Symbols extends AssetSymbol,
  ChainKeys extends ChainKey,
>({
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
}: GetDepositDataParams<Symbols, ChainKeys>): Promise<
  DepositTransferData<Symbols>
> {
  const meta = foreignPolkadot.getMetadata();
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
    polkadot.getAssetDecimals(asset.id),
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
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    getMin({ asset, config, moonChain, polkadot }),
  ]);

  return {
    asset: { ...asset, decimals },
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
}

export interface GetMinParams<
  Symbols extends AssetSymbol,
  ChainKeys extends ChainKey,
> {
  asset: Asset<Symbols>;
  config: DepositConfig<Symbols>;
  moonChain: MoonChain;
  polkadot: PolkadotService<Symbols, ChainKeys>;
}

export async function getMin<
  Symbols extends AssetSymbol,
  ChainKeys extends ChainKey,
>({
  asset,
  config,
  moonChain,
  polkadot,
}: GetMinParams<Symbols, ChainKeys>): Promise<bigint> {
  if (config.sourceFeeBalance && config.isNativeAssetPayingMoonFee) {
    return 0n;
  }

  return asset.isNative
    ? PolkadotService.getChainMin(
        config.origin.weight,
        moonChain.unitsPerSecond,
      )
    : polkadot.getAssetFee(asset.id, config.origin.weight);
}
