export interface AssetConstructorProps {
  pallet: string;
  method: string;
  args: any[];
  transform: (data: any) => bigint;
}

export class BalanceConfig {
  readonly pallet: string;

  readonly method: string;

  readonly args: any[];

  readonly transform: (data: any) => bigint;

  constructor({ pallet, method, args, transform }: AssetConstructorProps) {
    this.pallet = pallet;
    this.method = method;
    this.args = args;
    this.transform = transform;
  }
}
