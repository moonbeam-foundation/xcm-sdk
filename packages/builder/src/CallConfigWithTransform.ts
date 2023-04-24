import { CallConfig, CallConfigConstructorParams } from './CallConfig';

export interface CallConfigWithTransformConstructorParams
  extends CallConfigConstructorParams {
  transform: (data: any) => bigint;
}

export class CallConfigWithTransform extends CallConfig {
  readonly transform: (data: any) => bigint;

  constructor({
    transform,
    ...other
  }: CallConfigWithTransformConstructorParams) {
    super(other);

    this.transform = transform;
  }
}
