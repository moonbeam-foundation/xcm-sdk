import { u8aToHex } from '@polkadot/util';
import { decodeAddress } from '@polkadot/util-crypto';

import {
  AssetMinBalanceConfig,
  AssetsBalanceConfig,
  ChainConfig,
  SystemBalanceConfig,
  TokensBalanceConfig,
  WithdrawXcmConfig,
  BalanceConfig,
} from './interfaces/xcm-config.interfaces';

export const createSystemBalanceConfig = (): SystemBalanceConfig => ({
  pallet: 'system',
  function: 'account',
  getParams: (account: string) => [account],
  path: ['data'],
  // TODO: remove any
  calc: ({ free, miscFrozen }: any) => BigInt(free.sub(miscFrozen).toString()),
});

export const createAssetsBalanceConfig = (
  asset: number,
): AssetsBalanceConfig => ({
  pallet: 'assets',
  function: 'account',
  getParams: (account: string) => [asset, account],
  path: ['balance'],
});

export const createTokensBalanceConfig = <Asset extends string>(
  asset: number | Asset | 'MOVR' | 'KUSD' | 'AUSD',
): TokensBalanceConfig<Asset> => ({
  pallet: 'tokens',
  function: 'accounts',
  getParams: (account: string) => [
    account,
    Number.isInteger(asset)
      ? { ForeignAsset: asset as number }
      : { Token: asset as Asset },
  ],
  path: ['free'],
});

export const createMinBalanceConfig = (
  asset: number,
): AssetMinBalanceConfig => ({
  pallet: 'assets',
  function: 'asset',
  params: [asset],
  path: ['minBalance'],
});

export interface CreateWithdrawConfigOptions<Asset extends string> {
  feePerWeight: number;
  weight?: number;
  existentialDeposit?: number;
  assetBalance: BalanceConfig<Asset>;
}

export const createWithdrawConfig = <Asset extends string>(
  chain: ChainConfig,
  {
    feePerWeight,
    weight = 4_000_000_000,
    existentialDeposit = 0,
    assetBalance,
  }: CreateWithdrawConfigOptions<Asset>,
): WithdrawXcmConfig<Asset> => ({
  name: chain.name,
  ws: chain.ws,
  weight,
  feePerWeight,
  existentialDeposit,
  assetBalance,
  getDestinationML: (account: string) => {
    const acc = `0x01${u8aToHex(decodeAddress(account), -1, false)}00`;

    return [
      1,
      chain.parachainId
        ? [`0x0000000${chain.parachainId.toString(16)}`, acc]
        : [acc],
    ];
  },
});
