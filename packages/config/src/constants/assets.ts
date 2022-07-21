// eslint-disable-next-line import/no-cycle
import {
  AssetConfig,
  MoonbaseAssets,
  MoonbeamAssets,
  MoonriverAssets,
} from '../interfaces';

export enum Assets {
  ACA = 'ACA',
  ASTR = 'ASTR',
  AUSD = 'AUSD',
  BNC = 'BNC',
  BSX = 'BSX',
  CRAB = 'CRAB',
  CRU = 'CRU',
  CSM = 'CSM',
  DEV = 'DEV',
  DOT = 'DOT',
  GLMR = 'GLMR',
  HKO = 'HKO',
  KAR = 'KAR',
  KBTC = 'KBTC',
  KINT = 'KINT',
  KMA = 'KMA',
  KSM = 'KSM',
  KUSD = 'KUSD',
  LIT = 'LIT',
  MOVR = 'MOVR',
  PARA = 'PARA',
  PARING = 'PARING',
  PHA = 'PHA',
  RMRK = 'RMRK',
  TEER = 'TEER',
  UNIT = 'UNIT',
  USDT = 'USDT',
}

export const MOONBASE_ASSETS = <const>[
  Assets.ASTR,
  Assets.BNC,
  Assets.BSX,
  Assets.CRU,
  Assets.DEV,
  Assets.HKO,
  Assets.KAR,
  Assets.KBTC,
  Assets.KINT,
  Assets.KMA,
  Assets.KUSD,
  Assets.LIT,
  Assets.PARING,
  Assets.PHA,
  Assets.TEER,
  Assets.UNIT,
];
export const MOONBASE_ASSETS_CONFIGS: Readonly<
  Record<MoonbaseAssets, AssetConfig<MoonbaseAssets>>
> = {
  [Assets.ASTR]: {
    id: '16797826370226091782818345603793389938',
    erc20Id: '0xffffffff0ca324c842330521525e7de111f38972',
    originSymbol: Assets.ASTR,
  },
  [Assets.BNC]: {
    id: '42109858202732255156900361585267092733',
    erc20Id: '0xffffffff1fae104dc4c134306bca8e2e1990acfd',
    originSymbol: Assets.BNC,
  },
  [Assets.BSX]: {
    id: '102433417954722588084020852587557555194',
    erc20Id: '0xffffffff4d0ff56d0097bbd14920eac488540bfa',
    originSymbol: Assets.BSX,
  },
  [Assets.CRU]: {
    id: '108457044225666871745333730479173774551',
    erc20Id: '0xffffffff519811215e05efa24830eebe9c43acd7',
    originSymbol: Assets.CRU,
  },
  [Assets.DEV]: {
    id: '',
    erc20Id: '0x0000000000000000000000000000000000000802',
    originSymbol: Assets.DEV,
  },
  [Assets.HKO]: {
    id: '76100021443485661246318545281171740067',
    erc20Id: '0xffffffff394054bcda1902b6a6436840435655a3',
    originSymbol: Assets.HKO,
  },
  [Assets.KAR]: {
    id: '10810581592933651521121702237638664357',
    erc20Id: '0xffffffff08220ad2e6e157f26ed8bd22a336a0a5',
    originSymbol: Assets.KAR,
  },
  [Assets.KBTC]: {
    id: '122531866982275221270783173426160033062',
    erc20Id: '0xffffffff5c2ec77818d0863088929c1106635d26',
    originSymbol: Assets.KBTC,
  },
  [Assets.KINT]: {
    id: '52837329483626033197882584414163773570',
    erc20Id: '0xffffffff27c019790dfbee7cb70f5996671b2882',
    originSymbol: Assets.KINT,
  },
  [Assets.KMA]: {
    id: '213357169630950964874127107356898319277',
    erc20Id: '0xffffffffa083189f870640b141ae1e882c2b5bad',
    originSymbol: Assets.KMA,
  },
  [Assets.KUSD]: {
    id: '214920334981412447805621250067209749032',
    erc20Id: '0xffffffffa1b026a00fbaa67c86d5d1d5bf8d8228',
    originSymbol: Assets.KUSD,
  },
  [Assets.LIT]: {
    id: '65216491554813189869575508812319036608',
    erc20Id: '0xffffffff31103d490325bb0a8e40ef62e2f614c0',
    originSymbol: Assets.LIT,
  },
  [Assets.PARING]: {
    id: '173481220575862801646329923366065693029',
    erc20Id: '0xffffffff8283448b3cb519ca4732f2dddc6a6165',
    originSymbol: Assets.PARING,
  },
  [Assets.PHA]: {
    id: '189307976387032586987344677431204943363',
    erc20Id: '0xffffffff8e6b63d9e447b6d4c45bda8af9dc9603',
    originSymbol: Assets.PHA,
  },
  [Assets.TEER]: {
    id: '105075627293246237499203909093923548958',
    erc20Id: '0xffffffff4f0cd46769550e5938f6bee2f5d4ef1e',
    originSymbol: Assets.TEER,
  },
  [Assets.UNIT]: {
    id: '42259045809535163221576417993425387648',
    erc20Id: '0xffffffff1fcacbd218edc0eba20fc2308c778080',
    originSymbol: Assets.UNIT,
  },
};

export const MOONRIVER_ASSETS = <const>[
  Assets.AUSD,
  Assets.BNC,
  Assets.CRAB,
  Assets.CSM,
  Assets.HKO,
  Assets.KAR,
  Assets.KBTC,
  Assets.KINT,
  Assets.KMA,
  Assets.KSM,
  Assets.MOVR,
  Assets.PHA,
  Assets.RMRK,
  Assets.TEER,
  Assets.USDT,
];
export const MOONRIVER_ASSETS_CONFIGS: Readonly<
  Record<MoonriverAssets, AssetConfig<MoonriverAssets>>
> = {
  [Assets.AUSD]: {
    id: '214920334981412447805621250067209749032',
    erc20Id: '0xffffffffa1b026a00fbaa67c86d5d1d5bf8d8228',
    originSymbol: Assets.AUSD,
  },
  [Assets.BNC]: {
    id: '319623561105283008236062145480775032445',
    erc20Id: '0xfffffffff075423be54811ecb478e911f22dde7d',
    originSymbol: Assets.BNC,
  },
  [Assets.CRAB]: {
    id: '173481220575862801646329923366065693029',
    erc20Id: '0xffffffff8283448b3cb519ca4732f2dddc6a6165',
    originSymbol: Assets.CRAB,
  },
  [Assets.CSM]: {
    id: '108457044225666871745333730479173774551',
    erc20Id: '0xffffffff519811215e05efa24830eebe9c43acd7',
    originSymbol: Assets.CSM,
  },
  [Assets.HKO]: {
    id: '76100021443485661246318545281171740067',
    erc20Id: '0xffffffff394054bcda1902b6a6436840435655a3',
    originSymbol: Assets.HKO,
  },
  [Assets.KAR]: {
    id: '10810581592933651521121702237638664357',
    erc20Id: '0xffffffff08220ad2e6e157f26ed8bd22a336a0a5',
    originSymbol: Assets.KAR,
  },
  [Assets.KBTC]: {
    id: '328179947973504579459046439826496046832',
    erc20Id: '0xfffffffff6e528ad57184579beee00c5d5e646f0',
    originSymbol: Assets.KBTC,
  },
  [Assets.KINT]: {
    id: '175400718394635817552109270754364440562',
    erc20Id: '0xffffffff83f4f317d3cbf6ec6250aec3697b3ff2',
    originSymbol: Assets.KINT,
  },
  [Assets.KMA]: {
    id: '213357169630950964874127107356898319277',
    erc20Id: '0xffffffffa083189f870640b141ae1e882c2b5bad',
    originSymbol: Assets.KMA,
  },
  [Assets.KSM]: {
    id: '42259045809535163221576417993425387648',
    erc20Id: '0xffffffff1fcacbd218edc0eba20fc2308c778080',
    originSymbol: Assets.KSM,
  },
  [Assets.MOVR]: {
    id: '',
    erc20Id: '0x0000000000000000000000000000000000000802',
    originSymbol: Assets.MOVR,
  },
  [Assets.PHA]: {
    id: '189307976387032586987344677431204943363',
    erc20Id: '0xffffffff8e6b63d9e447b6d4c45bda8af9dc9603',
    originSymbol: Assets.PHA,
  },
  [Assets.RMRK]: {
    id: '182365888117048807484804376330534607370',
    erc20Id: '0xffffffff893264794d9d57e1e0e21e0042af5a0a',
    originSymbol: Assets.RMRK,
    originAssetId: 8,
  },
  [Assets.TEER]: {
    id: '105075627293246237499203909093923548958',
    erc20Id: '0xffffffff4f0cd46769550e5938f6bee2f5d4ef1e',
    originSymbol: Assets.TEER,
  },
  [Assets.USDT]: {
    id: '311091173110107856861649819128533077277',
    erc20Id: '0xffffffffea09fb06d082fd1275cd48b191cbcd1d',
    originSymbol: Assets.USDT,
    originAssetId: 1984,
  },
};

export const MOONBEAM_ASSETS = <const>[
  Assets.ACA,
  Assets.AUSD,
  Assets.DOT,
  Assets.GLMR,
  Assets.PARA,
];
export const MOONBEAM_ASSETS_CONFIGS: Readonly<
  Record<MoonbeamAssets, AssetConfig<MoonbeamAssets>>
> = {
  [Assets.ACA]: {
    id: '224821240862170613278369189818311486111',
    erc20Id: '0xffffffffa922fef94566104a6e5a35a4fcddaa9f',
    originSymbol: Assets.ACA,
  },
  [Assets.AUSD]: {
    id: '110021739665376159354538090254163045594',
    erc20Id: '0xffffffff52c56a9257bb97f4b2b6f7b2d624ecda',
    originSymbol: Assets.AUSD,
  },
  [Assets.DOT]: {
    id: '42259045809535163221576417993425387648',
    erc20Id: '0xffffffff1fcacbd218edc0eba20fc2308c778080',
    originSymbol: Assets.DOT,
  },
  [Assets.GLMR]: {
    id: '',
    erc20Id: '0x0000000000000000000000000000000000000802',
    originSymbol: Assets.GLMR,
  },
  [Assets.PARA]: {
    id: '32615670524745285411807346420584982855',
    erc20Id: '0xffffffff18898cb5fe1e88e668152b4f4052a947',
    originSymbol: Assets.PARA,
  },
};
