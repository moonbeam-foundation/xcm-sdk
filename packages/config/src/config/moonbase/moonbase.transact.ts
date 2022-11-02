import { ChainKey } from '../../constants';
import { MoonbaseTransactConfigs } from './moonbase.interfaces';
import { BETA } from './transact/beta';

export const MOONBASE_TRANSACT_CONFIGS: MoonbaseTransactConfigs = {
  [ChainKey.MoonbaseBeta]: BETA,
};
