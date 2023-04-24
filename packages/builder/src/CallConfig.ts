export interface CallConfigConstructorProps {
  pallet: string;
  method: string;
  args: any[];
  transform: (data: any) => bigint;
}

export class CallConfig {
  readonly pallet: string;

  readonly method: string;

  readonly args: any[];

  readonly transform: (data: any) => bigint;

  constructor({ pallet, method, args, transform }: CallConfigConstructorProps) {
    this.pallet = pallet;
    this.method = method;
    this.args = args;
    this.transform = transform;
  }
}
