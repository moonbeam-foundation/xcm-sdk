// TODO: move to interfaces
export interface AssetConfig<Assets> {
  id: string;
  originSymbol: Assets;
  originAssetId?: number;
}

export enum Assets {
  ACA = 'ACA',
  ASTR = 'ASTR',
  AUSD = 'AUSD',
  BNC = 'BNC',
  BSX = 'BSX',
  CRAB = 'CRAB',
  CRU = 'CRU',
  CSM = 'CSM',
  DOT = 'DOT',
  HKO = 'HKO',
  KAR = 'KAR',
  KBTC = 'KBTC',
  KINT = 'KINT',
  KMA = 'KMA',
  KSM = 'KSM',
  KUSD = 'KUSD',
  LIT = 'LIT',
  PARA = 'PARA',
  PARING = 'PARING',
  PHA = 'PHA',
  RMRK = 'RMRK',
  TEER = 'TEER',
  UNIT = 'UNIT',
  USDT = 'USDT',
}

export type MoonbaseAssets = typeof MOONBASE_ASSETS[number];
export const MOONBASE_ASSETS = <const>[
  Assets.ASTR,
  Assets.BNC,
  Assets.BSX,
  Assets.CRU,
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
    originSymbol: Assets.ASTR,
  },
  [Assets.BNC]: {
    id: '42109858202732255156900361585267092733',
    originSymbol: Assets.BNC,
  },
  [Assets.BSX]: {
    id: '102433417954722588084020852587557555194',
    originSymbol: Assets.BSX,
  },
  [Assets.CRU]: {
    id: '108457044225666871745333730479173774551',
    originSymbol: Assets.CRU,
  },
  [Assets.HKO]: {
    id: '76100021443485661246318545281171740067',
    originSymbol: Assets.HKO,
  },
  [Assets.KAR]: {
    id: '10810581592933651521121702237638664357',
    originSymbol: Assets.KAR,
  },
  [Assets.KBTC]: {
    id: '122531866982275221270783173426160033062',
    originSymbol: Assets.KBTC,
  },
  [Assets.KINT]: {
    id: '52837329483626033197882584414163773570',
    originSymbol: Assets.KINT,
  },
  [Assets.KMA]: {
    id: '213357169630950964874127107356898319277',
    originSymbol: Assets.KMA,
  },
  [Assets.KUSD]: {
    id: '214920334981412447805621250067209749032',
    originSymbol: Assets.KUSD,
  },
  [Assets.LIT]: {
    id: '65216491554813189869575508812319036608',
    originSymbol: Assets.LIT,
  },
  [Assets.PARING]: {
    id: '173481220575862801646329923366065693029',
    originSymbol: Assets.PARING,
  },
  [Assets.PHA]: {
    id: '189307976387032586987344677431204943363',
    originSymbol: Assets.PHA,
  },
  [Assets.TEER]: {
    id: '105075627293246237499203909093923548958',
    originSymbol: Assets.TEER,
  },
  [Assets.UNIT]: {
    id: '42259045809535163221576417993425387648',
    originSymbol: Assets.UNIT,
  },
};

export type MoonriverAssets = typeof MOONRIVER_ASSETS[number];
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
    originSymbol: Assets.AUSD,
  },
  [Assets.BNC]: {
    id: '319623561105283008236062145480775032445',
    originSymbol: Assets.BNC,
  },
  [Assets.CRAB]: {
    id: '173481220575862801646329923366065693029',
    originSymbol: Assets.CRAB,
  },
  [Assets.CSM]: {
    id: '108457044225666871745333730479173774551',
    originSymbol: Assets.CSM,
  },
  [Assets.HKO]: {
    id: '76100021443485661246318545281171740067',
    originSymbol: Assets.HKO,
  },
  [Assets.KAR]: {
    id: '10810581592933651521121702237638664357',
    originSymbol: Assets.KAR,
  },
  [Assets.KBTC]: {
    id: '328179947973504579459046439826496046832',
    originSymbol: Assets.KBTC,
  },
  [Assets.KINT]: {
    id: '175400718394635817552109270754364440562',
    originSymbol: Assets.KINT,
  },
  [Assets.KMA]: {
    id: '213357169630950964874127107356898319277',
    originSymbol: Assets.KMA,
  },
  [Assets.KSM]: {
    id: '42259045809535163221576417993425387648',
    originSymbol: Assets.KSM,
  },
  [Assets.PHA]: {
    id: '189307976387032586987344677431204943363',
    originSymbol: Assets.PHA,
  },
  [Assets.RMRK]: {
    id: '182365888117048807484804376330534607370',
    originSymbol: Assets.RMRK,
    originAssetId: 8,
  },
  [Assets.TEER]: {
    id: '105075627293246237499203909093923548958',
    originSymbol: Assets.TEER,
  },
  [Assets.USDT]: {
    id: '311091173110107856861649819128533077277',
    originSymbol: Assets.USDT,
    originAssetId: 1984,
  },
};

export type MoonbeamAssets = typeof MOONBEAM_ASSETS[number];
export const MOONBEAM_ASSETS = <const>[
  Assets.ACA,
  Assets.AUSD,
  Assets.DOT,
  Assets.PARA,
];
export const MOONBEAM_ASSETS_CONFIGS: Readonly<
  Record<MoonbeamAssets, AssetConfig<MoonbeamAssets>>
> = {
  [Assets.ACA]: {
    id: '224821240862170613278369189818311486111',
    originSymbol: Assets.ACA,
  },
  [Assets.AUSD]: {
    id: '110021739665376159354538090254163045594',
    originSymbol: Assets.AUSD,
  },
  [Assets.DOT]: {
    id: '42259045809535163221576417993425387648',
    originSymbol: Assets.DOT,
  },
  [Assets.PARA]: {
    id: '32615670524745285411807346420584982855',
    originSymbol: Assets.PARA,
  },
};
