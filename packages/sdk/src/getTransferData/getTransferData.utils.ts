import { AssetConfig } from '@moonbeam-network/xcm-config';
import { toBigInt } from '@moonbeam-network/xcm-utils';
import { PolkadotService } from '../polkadot';

export async function getBalance(
  address: string,
  config: AssetConfig,
  polkadot: PolkadotService,
) {
  return polkadot.query(
    config.balance.build({
      address,
      asset: polkadot.chain.getBalanceAssetId(config.asset),
    }),
  );
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
