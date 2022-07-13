// eslint-disable-next-line import/no-cycle
import { Chains } from './chains.moonriver';

export const MOVR_SYMBOL = 'MOVR';

export const MOVR_ID = {
  [Chains.Karura]: 3,
  [Chains.Khala]: 6,
  [Chains.Parallel]: 113,
};

export enum Assets {
  AUSD = 'AUSD',
  BNC = 'BNC',
  CRAB = 'CRAB',
  CSM = 'CSM',
  HKO = 'HKO',
  KAR = 'KAR',
  KBTC = 'KBTC',
  KINT = 'KINT',
  KMA = 'KMA',
  KSM = 'KSM',
  PHA = 'PHA',
  RMRK = 'RMRK',
  TEER = 'TEER',
  USDT = 'USDT',
}

export const AssetsConfig = <const>{
  [Assets.KSM]: {
    id: '42259045809535163221576417993425387648',
    originSymbol: Assets.KSM,
  },
  [Assets.RMRK]: {
    id: '182365888117048807484804376330534607370',
    originSymbol: Assets.RMRK,
    assetId: 8,
  },
  [Assets.KINT]: {
    id: '175400718394635817552109270754364440562',
    originSymbol: Assets.KINT,
  },
  [Assets.KBTC]: {
    id: '328179947973504579459046439826496046832',
    originSymbol: Assets.KBTC,
  },
  [Assets.KAR]: {
    id: '10810581592933651521121702237638664357',
    originSymbol: Assets.KAR,
  },
  [Assets.BNC]: {
    id: '319623561105283008236062145480775032445',
    originSymbol: Assets.BNC,
  },
  [Assets.AUSD]: {
    id: '214920334981412447805621250067209749032',
    originSymbol: Assets.AUSD,
  },
  [Assets.USDT]: {
    id: '311091173110107856861649819128533077277',
    originSymbol: Assets.USDT,
    assetId: 1984,
  },
  [Assets.CSM]: {
    id: '108457044225666871745333730479173774551',
    originSymbol: Assets.CSM,
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
  [Assets.CRAB]: {
    id: '173481220575862801646329923366065693029',
    originSymbol: Assets.CRAB,
  },
  [Assets.TEER]: {
    id: '105075627293246237499203909093923548958',
    originSymbol: Assets.TEER,
  },
};

export const {
  KSM,
  RMRK,
  KINT,
  KBTC,
  KAR,
  BNC,
  AUSD,
  USDT,
  CSM,
  PHA,
  HKO,
  KMA,
  CRAB,
  TEER,
} = AssetsConfig;
