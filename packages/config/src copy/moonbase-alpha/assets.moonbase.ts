import { Chains } from './chains.moonbase';

export const DEV_ID = {
  [Chains.Karura_Alphanet]: 0,
  [Chains.Parallel_Alphanet]: 113,
  [Chains.Calamari_Alphanet]: 8,
  [Chains.Astar_Alphanet]: 100,
};

export enum Assets {
  ASTR = 'ASTR',
  BNC = 'BNC',
  BSX = 'BSX',
  CRU = 'CRU',
  HKO = 'HKO',
  KAR = 'KAR',
  KBTC = 'KBTC',
  KINT = 'KINT',
  KMA = 'KMA',
  KUSD = 'KUSD',
  LIT = 'LIT',
  PARING = 'PARING',
  PHA = 'PHA',
  TEER = 'TEER',
  UNIT = 'UNIT',
}

export const AssetsConfig = <const>{
  [Assets.UNIT]: {
    id: '42259045809535163221576417993425387648',
    originSymbol: Assets.UNIT,
  },
  [Assets.KAR]: {
    id: '10810581592933651521121702237638664357',
    originSymbol: Assets.KAR,
  },
  [Assets.KINT]: {
    id: '52837329483626033197882584414163773570',
    originSymbol: Assets.KINT,
  },
  [Assets.BNC]: {
    id: '42109858202732255156900361585267092733',
    originSymbol: Assets.BNC,
  },
  [Assets.KBTC]: {
    id: '122531866982275221270783173426160033062',
    originSymbol: Assets.KBTC,
  },
  [Assets.CRU]: {
    id: '108457044225666871745333730479173774551',
    originSymbol: Assets.CRU,
  },
  [Assets.BSX]: {
    id: '102433417954722588084020852587557555194',
    originSymbol: Assets.BSX,
  },
  [Assets.KUSD]: {
    id: '214920334981412447805621250067209749032',
    originSymbol: Assets.KUSD,
  },
  [Assets.PHA]: {
    id: '189307976387032586987344677431204943363',
    originSymbol: Assets.PHA,
  },
  [Assets.HKO]: {
    id: '76100021443485661246318545281171740067',
    originSymbol: Assets.HKO,
  },
  [Assets.KMA]: {
    id: '213357169630950964874127107356898319277',
    originSymbol: Assets.KMA,
  },
  [Assets.LIT]: {
    id: '65216491554813189869575508812319036608',
    originSymbol: Assets.LIT,
  },
  [Assets.PARING]: {
    id: '173481220575862801646329923366065693029',
    originSymbol: Assets.PARING,
  },
  [Assets.TEER]: {
    id: '105075627293246237499203909093923548958',
    originSymbol: Assets.TEER,
  },
  [Assets.ASTR]: {
    id: '16797826370226091782818345603793389938',
    originSymbol: Assets.ASTR,
  },
};

export const {
  UNIT,
  KAR,
  KINT,
  BNC,
  KBTC,
  CRU,
  BSX,
  KUSD,
  PHA,
  HKO,
  KMA,
  LIT,
  PARING,
  TEER,
  ASTR,
} = AssetsConfig;
