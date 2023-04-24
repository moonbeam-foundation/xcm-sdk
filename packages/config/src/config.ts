import { aca, ausd, dot, glmr } from './assets';
import { acala, moonbeam } from './chains';

export const config = {
  [acala.key]: {
    [aca.key]: {},
    [ausd.key]: {},
    [glmr.key]: {},
  },
  [moonbeam.key]: {
    [dot.key]: {},
    [glmr.key]: {},
  },
};
