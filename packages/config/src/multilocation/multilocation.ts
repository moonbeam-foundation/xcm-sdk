import { Parents } from '../extrinsic';
import {
  AccountMultilocationV1,
  DestinationMultilocationV1,
  GetterAccountMultilocationV1,
  PrecompileDestinationMultilocationV1,
} from './multilocation.interfaces';

export function createMultilocationBuilder() {
  return {
    v1: () => ({
      destination: (
        parachainId: number,
        parents: Parents = 1,
      ): DestinationMultilocationV1 => ({
        V1: {
          parents,
          interior: {
            X1: {
              Parachain: parachainId,
            },
          },
        },
        toPrecompileMultilocation: (): PrecompileDestinationMultilocationV1 => [
          parents,
          [`0x0000000${parachainId.toString(16)}`],
        ],
      }),
      account: (
        parachainId: number,
        parents: Parents = 1,
      ): GetterAccountMultilocationV1 => ({
        get: (account: string): AccountMultilocationV1 => ({
          parents,
          interior: {
            X2: [
              { Parachain: parachainId },
              {
                AccountKey20: {
                  network: 'Any',
                  key: account,
                },
              },
            ],
          },
        }),
      }),
    }),
  };
}
