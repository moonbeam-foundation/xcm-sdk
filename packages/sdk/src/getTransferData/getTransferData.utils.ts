import { CallType, SubstrateQueryConfig } from '@moonbeam-network/xcm-builder';
import { AssetConfig, FeeAssetConfig } from '@moonbeam-network/xcm-config';
import { toBigInt } from '@moonbeam-network/xcm-utils';
import { BalanceContractInterface, createContract } from '../contract';
import { PolkadotService } from '../polkadot';
import { EvmSigner } from '../sdk.interfaces';

export interface GetFeeBalancesParams {
  address: string;
  config: AssetConfig | FeeAssetConfig;
  evmSigner: EvmSigner;
  polkadot: PolkadotService;
}

export async function getBalance({
  address,
  config,
  evmSigner,
  polkadot,
}: GetFeeBalancesParams) {
  const cfg = config.balance.build({
    address,
    asset: polkadot.chain.getBalanceAssetId(config.asset),
  });

  if (cfg.type === CallType.Substrate) {
    return polkadot.query(cfg as SubstrateQueryConfig);
  }

  const contract = createContract(cfg, evmSigner) as BalanceContractInterface;

  return contract.getBalance();
}

export async function getDecimals({
  address,
  config,
  evmSigner,
  polkadot,
}: GetFeeBalancesParams) {
  const cfg = config.balance.build({
    address,
    asset: polkadot.chain.getBalanceAssetId(config.asset),
  });

  if (cfg.type === CallType.Substrate) {
    return polkadot.getAssetDecimals(config.asset);
  }

  const contract = createContract(cfg, evmSigner) as BalanceContractInterface;

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
