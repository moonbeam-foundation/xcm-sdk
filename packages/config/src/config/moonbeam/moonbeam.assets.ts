import { Asset } from '../../constants';
import { AssetsConfigs } from '../config.interfaces';
// eslint-disable-next-line import/no-cycle
import { MoonbeamAssets } from './moonbeam.interfaces';

export const MOONBEAM_ASSETS = <const>[
  Asset.ACA,
  Asset.AUSD,
  Asset.DOT,
  Asset.GLMR,
  Asset.PARA,
];

export const MOONBEAM_ASSETS_CONFIGS: AssetsConfigs<MoonbeamAssets> = {
  [Asset.ACA]: {
    id: '224821240862170613278369189818311486111',
    erc20Id: '0xffffffffa922fef94566104a6e5a35a4fcddaa9f',
    originSymbol: Asset.ACA,
  },
  [Asset.AUSD]: {
    id: '110021739665376159354538090254163045594',
    erc20Id: '0xffffffff52c56a9257bb97f4b2b6f7b2d624ecda',
    originSymbol: Asset.AUSD,
  },
  [Asset.DOT]: {
    id: '42259045809535163221576417993425387648',
    erc20Id: '0xffffffff1fcacbd218edc0eba20fc2308c778080',
    originSymbol: Asset.DOT,
  },
  [Asset.GLMR]: {
    id: '',
    erc20Id: '0x0000000000000000000000000000000000000802',
    originSymbol: Asset.GLMR,
  },
  [Asset.PARA]: {
    id: '32615670524745285411807346420584982855',
    erc20Id: '0xffffffff18898cb5fe1e88e668152b4f4052a947',
    originSymbol: Asset.PARA,
  },
};
