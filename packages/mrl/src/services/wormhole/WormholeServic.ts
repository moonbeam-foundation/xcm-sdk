import { WormholeConfig, wormholeFactory } from '@moonbeam-network/xcm-builder';
import {
  Wormhole,
  TokenTransfer,
  TransferQuote,
} from '@wormhole-foundation/sdk-connect';
import { EvmSigner } from '@moonbeam-network/xcm-sdk';
import { EvmChain, EvmParachain } from '@moonbeam-network/xcm-types';
import { WormholeWagmiSigner } from './WormholeWagmiSigner';

export class WormholeService {
  readonly chain: EvmChain | EvmParachain;

  readonly #wh: Wormhole<'Mainnet' | 'Testnet'>;

  static create(chain: EvmChain | EvmParachain): WormholeService {
    return new WormholeService(chain);
  }

  constructor(chain: EvmChain | EvmParachain) {
    this.chain = chain;
    this.#wh = wormholeFactory(chain);
  }

  async getFee(transfer: WormholeConfig): Promise<TransferQuote> {
    const xfer = await this.#wh[transfer.func](...transfer.args);

    return TokenTransfer.quoteTransfer(
      this.#wh,
      xfer.fromChain,
      xfer.toChain,
      xfer.transfer,
    );
  }

  async transfer(
    signer: EvmSigner,
    transfer: WormholeConfig,
  ): Promise<string[]> {
    const xfer = await this.#wh[transfer.func](...transfer.args);

    return xfer.initiateTransfer(new WormholeWagmiSigner(this.chain, signer));
  }
}
