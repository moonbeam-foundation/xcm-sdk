import { createBalanceBuilder } from '../../balance';
import {
  Assets,
  Chain,
  MOONBEAM_ASSETS_CONFIGS as assets,
  MOONBEAM_CHINS_CONFIGS as chains,
  MoonChain,
  MOON_CHINS_CONFIGS,
} from '../../constants';
import {
  createExtrinsicBuilder,
  XTokensExtrinsicSuccessEvent,
} from '../../extrinsic';
import { MoonbeamAssets } from '../../interfaces';
import { createWithdrawBuilder } from '../../withdraw';
import { ChainXcmConfigs } from '../config.interfaces';

const config = MOON_CHINS_CONFIGS[MoonChain.Moonbeam];
const balance = createBalanceBuilder<MoonbeamAssets>();
const extrinsic = createExtrinsicBuilder<MoonbeamAssets>(config);
const withdraw = createWithdrawBuilder<MoonbeamAssets>();

export const MOONBEAM_CONFIGS: ChainXcmConfigs<MoonbeamAssets> = {
  [Assets.ACA]: {
    asset: assets[Assets.ACA],
    origin: chains[Chain.Acala],
    deposit: [
      {
        balance: balance.system(),
        extrinsic: extrinsic
          .xTokens()
          .transfer()
          .successEvent(XTokensExtrinsicSuccessEvent.TransferredMultiAssets)
          .params(chains[Chain.Acala], {
            Token: assets[Assets.ACA].originSymbol,
          }),
        origin: chains[Chain.Acala],
      },
    ],
    withdraw: [
      withdraw.xTokens({
        balance: balance.system(),
        destination: chains[Chain.Acala],
        existentialDeposit: 100_000_000_000,
        feePerWeight: 8,
      }),
    ],
  },
  [Assets.AUSD]: {
    asset: assets[Assets.AUSD],
    origin: chains[Chain.Acala],
    deposit: [],
    withdraw: [],
  },
  [Assets.DOT]: {
    asset: assets[Assets.DOT],
    origin: chains[Chain.Polkadot],
    deposit: [],
    withdraw: [],
  },
  [Assets.GLMR]: {
    asset: assets[Assets.GLMR],
    origin: config,
    deposit: [],
    withdraw: [],
  },
  [Assets.PARA]: {
    asset: assets[Assets.PARA],
    origin: chains[Chain.Parallel],
    deposit: [],
    withdraw: [],
  },
};
