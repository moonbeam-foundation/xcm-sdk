import { PrecompileXcmTransactThroughSignedMultilocationParams } from '@moonbeam-network/xcm-config';
import { Contract, ContractTransaction, Signer } from 'ethers';
import ContractInterface from './XcmTransactorABI.json';

export class XcmTransactorContract {
  readonly address: string = '0x000000000000000000000000000000000000080d';

  readonly #contract: Contract;

  constructor(signer: Signer) {
    this.#contract = new Contract(this.address, ContractInterface, signer);
  }

  async transactThroughSignedMultilocation({
    destination,
    asset,
    txWeight,
    callHash,
    overallFee,
    overallWeight,
  }: PrecompileXcmTransactThroughSignedMultilocationParams): Promise<ContractTransaction> {
    return this.#contract.transactThroughSignedMultilocation(
      destination,
      asset,
      txWeight,
      callHash,
      overallFee,
      overallWeight,
    );
  }
}
