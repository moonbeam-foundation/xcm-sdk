import { CallType, SubstrateQueryConfig } from '@moonbeam-network/xcm-builder';
import { AssetConfig } from '@moonbeam-network/xcm-config';
import { Asset } from '@moonbeam-network/xcm-types';
import { toBigInt } from '@moonbeam-network/xcm-utils';
import { Signer as EthersSigner } from 'ethers';
import { WalletClient } from 'viem';
import { BalanceContractInterface, createContract } from '../contract';
import { PolkadotService } from '../polkadot';

export interface GetFeeBalancesParams {
  address: string;
  config: AssetConfig;
  ethersSigner: EthersSigner | WalletClient;
  polkadot: PolkadotService;
  asset?: Asset;
}

export async function getBalance({
  address,
  config,
  ethersSigner,
  polkadot,
}: GetFeeBalancesParams) {
  const cfg = config.balance.build({
    address,
    asset: polkadot.chain.getBalanceAssetId(config.asset),
  });

  if (cfg.type === CallType.Substrate) {
    return polkadot.query(cfg as SubstrateQueryConfig);
  }

  const contract = createContract(
    cfg,
    ethersSigner,
  ) as BalanceContractInterface;

  return contract.getBalance();
}

export async function getDecimals({
  address,
  asset,
  config,
  ethersSigner,
  polkadot,
}: GetFeeBalancesParams) {
  const cfg = config.balance.build({
    address,
    asset: polkadot.chain.getBalanceAssetId(asset || config.asset),
  });

  if (cfg.type === CallType.Substrate) {
    return polkadot.getAssetDecimals(asset || config.asset);
  }

  const contract = createContract(
    cfg,
    ethersSigner,
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
