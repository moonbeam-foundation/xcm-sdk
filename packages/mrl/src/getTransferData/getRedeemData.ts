import { type ContractConfig, MrlBuilder } from '@moonbeam-network/xcm-builder';
import { EvmService, type EvmSigner } from '@moonbeam-network/xcm-sdk';
import type { EvmChain, EvmParachain } from '@moonbeam-network/xcm-types';
import { WormholeService } from '../services/wormhole';

export interface GetRedeemDataParams {
  txId: string;
  chain: EvmChain | EvmParachain;
}

export async function getRedeemData({ txId, chain }: GetRedeemDataParams) {
  // TODO this is just for wormhole
  const wh = WormholeService.create(chain);

  const vaa = await wh.getVaa(txId);
  const tokenTransfer = await wh.getTokenTransfer(vaa, txId);

  const isXcm = vaa.payloadName === 'TransferWithPayload';

  return {
    vaa,
    tokenTransfer,
    async redeem(signer: EvmSigner) {
      const isComplete = await wh.isComplete(vaa, tokenTransfer);

      if (isComplete) {
        throw new Error('This transaction is already finalized in Wormhole');
      }

      if (isXcm) {
        const bytes = await wh.getVaaBytes(vaa);

        const contract = MrlBuilder()
          .wormhole()
          .contract()
          .Gmp()
          .wormholeTransferERC20()
          .build({ bytes }) as ContractConfig;

        const evm = EvmService.create(chain);
        const hash = await evm.transfer(signer, contract);

        return hash;
      }

      return await wh.completeTransfer(tokenTransfer, signer);
    },
  };
}
