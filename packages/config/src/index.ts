import '@moonbeam-network/api-augment';
import { MOONBEAM_CONFIGS } from './config/constants/moonbeam';
import { MoonbeamAssets } from './interfaces';

export function moonbeam(asset: MoonbeamAssets) {
  const config = MOONBEAM_CONFIGS[asset];

  return {
    deposit: () => {},
    withdraw: () => {},
  };
}
