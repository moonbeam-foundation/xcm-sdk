import {
  BalanceConfigBuilder,
  CallType,
  ContractConfig,
  SubstrateQueryConfig,
} from '@moonbeam-network/xcm-builder';
import {
  AssetConfig,
  FeeAssetConfig,
  polkadotAssetHub,
} from '@moonbeam-network/xcm-config';
import { AnyChain, Asset, EvmParachain } from '@moonbeam-network/xcm-types';
import { convertDecimals, toBigInt } from '@moonbeam-network/xcm-utils';
import {
  BalanceContractInterface,
  createContractWithoutSigner,
} from '../contract';
import { PolkadotService } from '../polkadot';
import {
  DestinationChainTransferData,
  SourceChainTransferData,
} from '../sdk.interfaces';

export interface BaseParams {
  address: string;
  chain: AnyChain;
  polkadot: PolkadotService;
}

export interface GetBalancesParams extends BaseParams {
  asset: Asset;
  balanceBuilder: BalanceConfigBuilder;
  decimals: number;
}

export interface GetDecimalsParams extends BaseParams {
  asset?: Asset;
  config: AssetConfig | FeeAssetConfig;
  assetBuiltConfig?: SubstrateQueryConfig | ContractConfig;
}

export async function getBalance({
  address,
  chain,
  balanceBuilder,
  asset,
  decimals,
  polkadot,
}: GetBalancesParams) {
  const cfg = balanceBuilder.build({
    address,
    asset: polkadot.chain.getBalanceAssetId(asset),
  });
  if (cfg.type === CallType.Substrate) {
    const balance = await polkadot.query(cfg as SubstrateQueryConfig);
    return chain.usesChainDecimals
      ? convertDecimals(balance, polkadot.decimals, decimals)
      : balance;
  }

  const contract = createContractWithoutSigner(
    cfg,
    chain as EvmParachain,
  ) as BalanceContractInterface;

  const balance = await contract.getBalance();

  return balance;
}

export async function getDecimals({
  address,
  asset,
  config,
  polkadot,
  chain,
  assetBuiltConfig,
}: GetDecimalsParams) {
  const cfg =
    assetBuiltConfig ||
    config.balance.build({
      address,
      asset: polkadot.chain.getBalanceAssetId(asset || config.asset),
    });

  if (cfg.type === CallType.Substrate) {
    return polkadot.getAssetDecimals(asset || config.asset);
  }

  const contract = createContractWithoutSigner(
    cfg,
    chain as EvmParachain,
  ) as BalanceContractInterface;

  return contract.getDecimals();
}

export async function getMin(config: AssetConfig, polkadot: PolkadotService) {
  if (config.min) {
    return polkadot.query(
      config.min.build({ asset: polkadot.chain.getMinAssetId(config.asset) }),
    );
  }

  const min = polkadot.chain.getAssetMin(config.asset);

  if (min) {
    const decimals = await polkadot.getAssetDecimals(config.asset);

    return toBigInt(min, decimals);
  }

  return 0n;
}

interface ValidateSovereignAccountBalancesProps {
  amount: bigint;
  destination: DestinationChainTransferData;
  source: SourceChainTransferData;
}

export function validateSovereignAccountBalances({
  amount,
  source,
  destination,
}: ValidateSovereignAccountBalancesProps): void {
  if (
    destination.chain.key !== polkadotAssetHub.key ||
    // currently we want this only for this chain
    !destination.sovereignAccountBalances
  ) {
    return;
  }
  const { feeAssetBalance, transferAssetBalance } =
    destination.sovereignAccountBalances;

  if (amount > transferAssetBalance) {
    throw new Error(
      `${source.chain.name} Sovereign account in ${destination.chain.name} does not have enough balance for this transaction`,
    );
  }
  if (feeAssetBalance && source.destinationFee.amount > feeAssetBalance) {
    throw new Error(
      `${source.chain.name} Sovereign account in ${destination.chain.name} does not have enough balance to pay for fees for this transaction`,
    );
  }
}
