export interface XcmTransactThroughSigned {
  getParams: (
    params: XcmTransactThroughSignedGetParams,
  ) => XcmTransactThroughSignedParams;
}
export interface XcmTransactThroughSignedMultilocation {
  getParams: (
    params: XcmTransactThroughSignedGetParams,
  ) => PrecompileXcmTransactThroughSignedMultilocationParams;
}

export interface XcmTransactThroughSignedGetParams {
  callHash: string;
  overallFee: bigint;
  overallWeight: bigint;
  txWeight: bigint;
}

export interface PrecompileXcmTransactThroughSignedMultilocationParams {
  /**
   * 1 - if transaction is going through a relay chain
   * `0x0000000${parachainId.toString(16)}`
   */
  destination: [1, [string]];
  /**
   * 1 - if transaction is going through a relay chain
   * `0x0000000${parachainId.toString(16)}`
   * `0x040${palletInstance}`
   */
  asset: [1, [string, string]];
  /**
   * transaction weight - a weight of the transaction
   * const call = betaApi.createType('Call', hexToU8a(callHash));
   * const { weight } = await betaApi.tx(call).paymentInfo(pair.address);
   * const txWeight = weight.toBigInt();
   */
  txWeight: bigint;
  /**
   * call hash - a hash of the transaction
   */
  callHash: string;
  /**
   * fee - a fee of the transaction
   * (overallWeight * unitsPerSecond) / 1_000_000_000_000n
   * TODO: check if this is correct. Is 1_000_000_000_000n a constant?
   */
  overallFee: bigint;
  /**
   * overall weight - a weight of the transaction
   * const overallWeight =
   *   descendOriginWeight +
   *   withdrawAssetWeight +
   *   buyExecutionWeight +
   *   transactWeight +
   *   baseExtrinsicWeight +
   *   txWeight;
   */
  overallWeight: bigint;
}

export type XcmTransactThroughSignedParams = [
  {
    V1: {
      parents: 1;
      interior: {
        X1: {
          Parachain: number;
        };
      };
    };
  },
  {
    currency: {
      AsMultiLocation: {
        V1: {
          parents: 1;
          interior: { X2: [{ Parachain: number }, { PalletInstance: number }] };
        };
      };
    };
    /**
     * fee
     */
    feeAmount: bigint;
  },
  /**
   * callHash
   */
  string,
  {
    /**
     * txWeight
     */
    transactRequiredWeightAtMost: bigint;
    overallWeight: bigint;
  },
];
