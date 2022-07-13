import { Parents } from './common.interfaces';

export interface XTransferPallet {
  pallet: 'xTransfer';
  extrinsic: 'transfer';
  successEvent: 'Deposited' | 'Withdrawn';
  params: XTransferPalletParams;
}

export type XTransferPalletParams = [
  /**
   * asset
   */
  {
    id: {
      Concrete: {
        parents: Parents;
        interior:
          | 'Here'
          | {
              X2: [
                {
                  Parachain: number;
                },
                {
                  PalletInstance: number;
                },
              ];
            };
      };
    };
    fun: {
      Fungible: '%plankAmount%';
    };
  },
  /**
   * destination
   */
  {
    parents: Parents;
    interior: {
      X2: [
        {
          Parachain: number;
        },
        {
          AccountKey20: {
            network: 'Any';
            /**
             * account
             */
            key: '%account%';
          };
        },
      ];
    };
  },
  /**
   * weight
   */
  '%weight%',
];
