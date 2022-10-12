import { AssetSymbol, ChainKey } from '../../constants';
import { AssetsMap } from '../config.interfaces';
import { MoonbaseAssets } from './moonbase.interfaces';

export const MOONBASE_ASSETS = <const>[
  AssetSymbol.BSX,
  AssetSymbol.CLV,
  AssetSymbol.CRU,
  AssetSymbol.DEV,
  AssetSymbol.KBTC,
  AssetSymbol.KINT,
  AssetSymbol.LIT,
  AssetSymbol.PARING,
  AssetSymbol.TEER,
  AssetSymbol.TT1,
  AssetSymbol.UNIT,
  AssetSymbol.XUSDC,
];

export const MOONBASE_ASSETS_MAP: AssetsMap<MoonbaseAssets> = {
  [AssetSymbol.BSX]: {
    id: '102433417954722588084020852587557555194',
    erc20Id: '0xffffffff4d0ff56d0097bbd14920eac488540bfa',
    foreignIds: {
      [ChainKey.BasiliskAlphanet]: 0,
    },
    originSymbol: AssetSymbol.BSX,
  },
  [AssetSymbol.CLV]: {
    id: '281434042901349570144900941495462927562',
    erc20Id: '0xffffffffd3ba399d7d9d684d94b22767a5fa1cca',
    originSymbol: AssetSymbol.CLV,
  },
  [AssetSymbol.CRU]: {
    id: '108457044225666871745333730479173774551',
    erc20Id: '0xffffffff519811215e05efa24830eebe9c43acd7',
    originSymbol: AssetSymbol.CRU,
  },
  [AssetSymbol.DEV]: {
    id: '',
    erc20Id: '0x0000000000000000000000000000000000000802',
    originSymbol: AssetSymbol.DEV,
    foreignIds: {
      [ChainKey.CentrifugeAlphanet]: 1,
    },
    isNative: true,
  },
  [AssetSymbol.KBTC]: {
    id: '122531866982275221270783173426160033062',
    erc20Id: '0xffffffff5c2ec77818d0863088929c1106635d26',
    originSymbol: AssetSymbol.KBTC,
  },
  [AssetSymbol.KINT]: {
    id: '52837329483626033197882584414163773570',
    erc20Id: '0xffffffff27c019790dfbee7cb70f5996671b2882',
    originSymbol: AssetSymbol.KINT,
  },
  [AssetSymbol.LIT]: {
    id: '65216491554813189869575508812319036608',
    erc20Id: '0xffffffff31103d490325bb0a8e40ef62e2f614c0',
    originSymbol: AssetSymbol.LIT,
  },
  [AssetSymbol.PARING]: {
    id: '173481220575862801646329923366065693029',
    erc20Id: '0xffffffff8283448b3cb519ca4732f2dddc6a6165',
    originSymbol: AssetSymbol.PARING,
  },
  [AssetSymbol.TEER]: {
    id: '105075627293246237499203909093923548958',
    erc20Id: '0xffffffff4f0cd46769550e5938f6bee2f5d4ef1e',
    originSymbol: AssetSymbol.TEER,
  },
  [AssetSymbol.UNIT]: {
    id: '42259045809535163221576417993425387648',
    erc20Id: '0xffffffff1fcacbd218edc0eba20fc2308c778080',
    originSymbol: AssetSymbol.UNIT,
  },
  [AssetSymbol.TT1]: {
    id: '156305701417244550631956600137082963628',
    erc20Id: '0xffffffff75976211c786fe4d73d2477e222786ac',
    originSymbol: AssetSymbol.TT1,
    foreignIds: {
      [ChainKey.StatemineAlphanet]: 2,
    },
  },
  [AssetSymbol.XUSDC]: {
    id: '337110116006454532607322340792629567158',
    erc20Id: '0xfffffffefd9d0bf45a2947a519a741c4b9e99eb6',
    originSymbol: AssetSymbol.XUSDC,
    foreignIds: {
      [ChainKey.CentrifugeAlphanet]: 2,
    },
    isLocalAsset: true,
  },
};
