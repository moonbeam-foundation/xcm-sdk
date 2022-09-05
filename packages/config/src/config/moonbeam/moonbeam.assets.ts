import { AssetSymbol } from '../../constants';
import { AssetsConfigs } from '../config.interfaces';
// eslint-disable-next-line import/no-cycle
import { MoonbeamAssets } from './moonbeam.interfaces';

export const MOONBEAM_ASSETS = <const>[
  AssetSymbol.ACA,
  AssetSymbol.ASTR,
  AssetSymbol.AUSD,
  AssetSymbol.DOT,
  AssetSymbol.GLMR,
  AssetSymbol.IBTC,
  AssetSymbol.INTR,
  AssetSymbol.PARA,
  AssetSymbol.PHA,
];

export const MOONBEAM_ASSETS_CONFIGS: AssetsConfigs<MoonbeamAssets> = {
  [AssetSymbol.ACA]: {
    id: '224821240862170613278369189818311486111',
    erc20Id: '0xffffffffa922fef94566104a6e5a35a4fcddaa9f',
    originSymbol: AssetSymbol.ACA,
  },
  [AssetSymbol.ASTR]: {
    id: '224077081838586484055667086558292981199',
    erc20Id: '0xffffffffa893ad19e540e172c10d78d4d479b5cf',
    originSymbol: AssetSymbol.ASTR,
  },
  [AssetSymbol.AUSD]: {
    id: '110021739665376159354538090254163045594',
    erc20Id: '0xffffffff52c56a9257bb97f4b2b6f7b2d624ecda',
    originSymbol: AssetSymbol.AUSD,
  },
  [AssetSymbol.DOT]: {
    id: '42259045809535163221576417993425387648',
    erc20Id: '0xffffffff1fcacbd218edc0eba20fc2308c778080',
    originSymbol: AssetSymbol.DOT,
  },
  [AssetSymbol.GLMR]: {
    id: '',
    erc20Id: '0x0000000000000000000000000000000000000802',
    originSymbol: AssetSymbol.GLMR,
    isNative: true,
  },
  [AssetSymbol.IBTC]: {
    id: '120637696315203257380661607956669368914',
    erc20Id: '0xffffffff5ac1f9a51a93f5c527385edf7fe98a52',
    originSymbol: AssetSymbol.IBTC,
  },
  [AssetSymbol.INTR]: {
    id: '101170542313601871197860408087030232491',
    erc20Id: '0xffffffff4c1cbcd97597339702436d4f18a375ab',
    originSymbol: AssetSymbol.INTR,
  },
  [AssetSymbol.PARA]: {
    id: '32615670524745285411807346420584982855',
    erc20Id: '0xffffffff18898cb5fe1e88e668152b4f4052a947',
    originSymbol: AssetSymbol.PARA,
  },
  [AssetSymbol.PHA]: {
    id: '132685552157663328694213725410064821485',
    erc20Id: '0xffffffff63d24ecc8eb8a7b5d0803e900f7b6ced',
    originSymbol: AssetSymbol.PHA,
  },
};
