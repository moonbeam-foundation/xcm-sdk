import { Chains } from './chains.moonbeam';

export const GLMR_ID = {
  [Chains.Acala]: 0,
  [Chains.Parallel]: 114,
};

export enum Assets {
  DOT = 'DOT',
  ACA = 'ACA',
  AUSD = 'AUSD',
  PARA = 'PARA',
}

export const AssetsConfig = <const>{
  [Assets.DOT]: {
    id: '42259045809535163221576417993425387648',
    originSymbol: Assets.DOT,
  },
  [Assets.ACA]: {
    id: '224821240862170613278369189818311486111',
    originSymbol: Assets.ACA,
  },
  [Assets.AUSD]: {
    id: '110021739665376159354538090254163045594',
    originSymbol: Assets.AUSD,
  },
  [Assets.PARA]: {
    id: '32615670524745285411807346420584982855',
    originSymbol: Assets.PARA,
  },
};

export const { DOT, ACA, AUSD, PARA } = AssetsConfig;
