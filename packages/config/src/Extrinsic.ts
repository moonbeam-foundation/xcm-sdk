import { Pallet } from './constants';

export class Extrinsic {
  readonly #pallet: Pallet;

  private constructor(pallet: Pallet) {
    this.#pallet = pallet;
  }

  static pallet(pallet: Pallet) {
    return new Extrinsic(pallet);
  }
}
