import type {
  ContractConfig,
  ExtrinsicConfig,
} from '@moonbeam-network/xcm-builder';
import type { AssetRoute, FeeConfig } from '@moonbeam-network/xcm-config';
import type {
  AnyParachain,
  AssetAmount,
  EvmChain,
  EvmParachain,
} from '@moonbeam-network/xcm-types';
import type { EvmSigner, SourceChainTransferData } from '../sdk.interfaces';
import { PolkadotService } from '../services/polkadot';
import {
  getAssetMin,
  getBalance,
  getContractFee,
  getDestinationFeeBalance,
  getExistentialDeposit,
  getExtrinsicFee,
  getMax,
} from './getTransferData.utils';

export interface GetSourceDataParams {
  route: AssetRoute;
  destinationAddress: string;
  destinationFee: AssetAmount;
  sourceAddress: string;
}

export async function getSourceData({
  route,
  destinationAddress,
  destinationFee,
  sourceAddress,
}: GetSourceDataParams): Promise<SourceChainTransferData> {
  const source = route.source.chain as AnyParachain;
  const destination = route.destination.chain as AnyParachain;
  const [sourcePolkadot, destinationPolkadot] =
    await PolkadotService.createMulti([source, destination]);
  const asset = source.getChainAsset(route.source.asset);
  const feeAsset = route.source.fee
    ? source.getChainAsset(route.source.fee.asset)
    : asset;

  const balance = await getBalance({
    address: sourceAddress,
    asset,
    builder: route.source.balance,
    chain: source,
  });
  const feeBalance = route.source.fee
    ? await getBalance({
        address: sourceAddress,
        asset: feeAsset,
        builder: route.source.fee.balance,
        chain: source,
      })
    : balance;
  const destinationFeeBalance = await getDestinationFeeBalance({
    balance,
    feeBalance,
    route,
    sourceAddress,
  });

  const existentialDeposit = await getExistentialDeposit(source);
  const min = await getAssetMin({
    asset,
    builder: route.source.min,
    chain: source,
  });

  const extrinsic = route.extrinsic?.build({
    asset: balance,
    destination: route.destination.chain as AnyParachain,
    destinationAddress,
    destinationApi: destinationPolkadot.api,
    fee: destinationFee,
    source,
    sourceAddress,
    sourceApi: sourcePolkadot.api,
  });

  const contract = route.contract?.build({
    asset: balance,
    destination: route.destination.chain as AnyParachain,
    destinationAddress,
    destinationApi: destinationPolkadot.api,
    fee: destinationFee,
    source,
    sourceAddress,
    sourceApi: sourcePolkadot.api,
  });

  const fee = await getFee({
    balance,
    chain: source,
    contract,
    destinationFee,
    extrinsic,
    feeBalance,
    feeConfig: route.source.fee,
    sourceAddress,
  });

  const max = getMax({
    balance,
    existentialDeposit,
    fee,
    min,
  });

  return {
    balance,
    chain: source,
    destinationFee,
    destinationFeeBalance,
    existentialDeposit,
    fee,
    feeBalance,
    max,
    min,
  };
}

export interface GetFeeParams {
  balance: AssetAmount;
  feeBalance: AssetAmount;
  contract?: ContractConfig;
  chain: AnyParachain;
  destinationFee: AssetAmount;
  extrinsic?: ExtrinsicConfig;
  feeConfig?: FeeConfig;
  sourceAddress: string;
}

export async function getFee({
  balance,
  feeBalance,
  chain,
  contract,
  destinationFee,
  extrinsic,
  feeConfig,
  sourceAddress,
}: GetFeeParams): Promise<AssetAmount> {
  if (!contract && !extrinsic) {
    throw new Error('Either contract or extrinsic must be provided');
  }

  if (contract) {
    return getContractFee({
      address: sourceAddress,
      balance,
      chain: chain as EvmChain | EvmParachain,
      contract,
      destinationFee,
      feeBalance,
      feeConfig,
    });
  }

  return getExtrinsicFee({
    address: sourceAddress,
    balance,
    chain,
    extrinsic: extrinsic as ExtrinsicConfig,
    feeBalance,
    feeConfig,
  });
}

export interface GetAssetsBalancesParams {
  address: string;
  chain: AnyParachain;
  routes: AssetRoute[];
  evmSigner?: EvmSigner;
}

export async function getAssetsBalances({
  address,
  chain,
  routes,
}: GetAssetsBalancesParams): Promise<AssetAmount[]> {
  const uniqueRoutes = routes.reduce((acc: AssetRoute[], route: AssetRoute) => {
    if (
      !acc.some((a: AssetRoute) => a.source.asset.isEqual(route.source.asset))
    ) {
      // biome-ignore lint/performance/noAccumulatingSpread: I think this is fine here
      return [route, ...acc];
    }

    return acc;
  }, []);

  const balances = await Promise.all(
    uniqueRoutes.map(async (route: AssetRoute) =>
      getBalance({
        address,
        asset: chain.getChainAsset(route.source.asset),
        builder: route.source.balance,
        chain,
      }),
    ),
  );

  return balances;
}
