import { AssetSymbol, ChainKey } from '../../constants';
import { AssetsMap } from '../config.interfaces';
import { MoonbaseAssets } from './moonbase.interfaces';

export const MOONBASE_ASSETS = <const>[
  AssetSymbol.AUQ,
  AssetSymbol.BIT,
  AssetSymbol.DEV,
  AssetSymbol.EQ,
  AssetSymbol.EQD,
  AssetSymbol.LIT,
  AssetSymbol.NEER,
  AssetSymbol.PARING,
  AssetSymbol.TT1,
  AssetSymbol.UNIT,
];

export const MOONBASE_ASSETS_MAP: AssetsMap<MoonbaseAssets> = {
  [AssetSymbol.AUQ]: {
    id: '69536036667157951501899290870203586130',
    erc20Id: '0xffffffff3450274d4ab181de8830c189f4509652',
    originSymbol: AssetSymbol.AUQ,
  },
  [AssetSymbol.BIT]: {
    id: '306639095083798603270835754515874921389',
    erc20Id: '0xffffffffe6b08aa1fbbaa02f004d3e5aa27f3bad',
    originSymbol: AssetSymbol.BIT,
  },
  [AssetSymbol.DEV]: {
    id: '',
    erc20Id: '0x0000000000000000000000000000000000000802',
    originSymbol: AssetSymbol.DEV,
    isNative: true,
  },
  [AssetSymbol.EQ]: {
    id: '190590555344745888270686124937537713878',
    erc20Id: '0xffffffff8f6267e040d8a0638c576dfba4f0f6d6',
    originSymbol: AssetSymbol.EQ,
  },
  [AssetSymbol.EQD]: {
    id: '187224307232923873519830480073807488153',
    erc20Id: '0xffffffff8cda1707baf23834d211b08726b1e499',
    originSymbol: AssetSymbol.EQD,
  },
  [AssetSymbol.LIT]: {
    id: '65216491554813189869575508812319036608',
    erc20Id: '0xffffffff31103d490325bb0a8e40ef62e2f614c0',
    originSymbol: AssetSymbol.LIT,
  },
  [AssetSymbol.NEER]: {
    id: '52280927600883288560727505734200597597',
    erc20Id: '0xffffffff2754f0bdf7eb215503c69204ccd61c5d',
    originSymbol: AssetSymbol.NEER,
  },
  [AssetSymbol.PARING]: {
    id: '173481220575862801646329923366065693029',
    erc20Id: '0xffffffff8283448b3cb519ca4732f2dddc6a6165',
    originSymbol: AssetSymbol.PARING,
  },
  [AssetSymbol.TT1]: {
    id: '156305701417244550631956600137082963628',
    erc20Id: '0xffffffff75976211c786fe4d73d2477e222786ac',
    originSymbol: AssetSymbol.TT1,
    foreignIds: {
      [ChainKey.StatemineAlphanet]: 2,
    },
  },
  [AssetSymbol.UNIT]: {
    id: '42259045809535163221576417993425387648',
    erc20Id: '0xffffffff1fcacbd218edc0eba20fc2308c778080',
    originSymbol: AssetSymbol.UNIT,
  },
};
