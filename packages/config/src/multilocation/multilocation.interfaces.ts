import { Parents } from '../extrinsic';

export interface DestinationMultilocationV1 {
  V1: {
    parents: Parents;
    interior: {
      X1: {
        Parachain: number;
      };
    };
  };
  toPrecompileMultilocation: () => PrecompileDestinationMultilocationV1;
}

export type PrecompileDestinationMultilocationV1 = [Parents, [string]];

export interface GetterAccountMultilocationV1 {
  get: (account: string) => AccountMultilocationV1;
}

export interface AccountMultilocationV1 {
  parents: Parents;
  interior: {
    X2: [
      { Parachain: number },
      {
        AccountKey20: {
          network: 'Any';
          key: string;
        };
      },
    ];
  };
}
