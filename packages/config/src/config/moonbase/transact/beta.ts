import { ChainKey } from '../../../constants';
import { getUnitsPerSecond } from '../../config.utils';
import {
  balance,
  chains,
  moonbase,
  multilocation,
  transact,
} from '../moonbase.common';
import { MoonbaseTransactConfig } from '../moonbase.interfaces';

const beta = chains[ChainKey.MoonbaseBeta];
const unitsPerSecond = getUnitsPerSecond(beta);

export const BETA: MoonbaseTransactConfig = {
  chain: beta,
  unitsPerSecond,
  balance: balance.system(),
  from: {
    multilocation: {
      account: multilocation.v1().account(beta.parachainId),
    },
    transact: transact.xcmTransactor().transactThroughSigned(beta),
  },
  to: {
    multilocation: {
      account: multilocation.v1().account(moonbase.parachainId),
    },
    transact: transact.xcmTransactor().transactThroughSignedMultilocation(beta),
  },
};
