import {
  Protocols,
  type WormholeConfig,
  wormholeFactory,
} from '@moonbeam-network/xcm-builder';
import '@wormhole-foundation/sdk-evm-tokenbridge';
import type { EvmSigner } from '@moonbeam-network/xcm-sdk';
import type { EvmChain, EvmParachain } from '@moonbeam-network/xcm-types';
import {
  TokenTransfer,
  type TransferQuote,
  type Wormhole,
} from '@wormhole-foundation/sdk-connect';
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

  async createTokenTransfer(transfer: WormholeConfig): Promise<TokenTransfer> {
    const { token, amount, from, to, protocol, payload } = transfer.args;

    // Call the tokenTransfer method with correct overload parameters
    if (protocol === Protocols.TokenBridge) {
      return await this.#wh[transfer.func](
        token,
        amount,
        from,
        to,
        protocol,
        payload,
      );
    } else if (protocol === Protocols.AutomaticTokenBridge) {
      return await this.#wh[transfer.func](
        token,
        amount,
        from,
        to,
        protocol,
        // For AutomaticTokenBridge, the 6th parameter is nativeGas (bigint), not payload
        payload ? 0n : undefined,
      );
    } else {
      throw new Error(`Unsupported protocol: ${protocol}`);
    }
  }

  async getFee(transfer: WormholeConfig): Promise<TransferQuote | undefined> {
    const { amount } = transfer.args;
    if (amount === 0n) {
      return undefined;
    }

    const xfer = await this.createTokenTransfer(transfer);

    if (xfer.transfer.protocol === Protocols.ExecutorTokenBridge) {
      throw new Error(`${Protocols.ExecutorTokenBridge} is not supported`);
    }

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
    const xfer = await this.createTokenTransfer(transfer);

    return xfer.initiateTransfer(new WormholeWagmiSigner(this.chain, signer));
  }

  async getVaa(txId: string) {
    return await TokenTransfer.getTransferVaa(this.#wh, txId);
  }

  async getVaaBytes(vaa: TokenTransfer.VAA) {
    return (
      (await this.#wh.getVaaBytes({
        chain: vaa.emitterChain,
        emitter: vaa.emitterAddress,
        sequence: vaa.sequence,
      })) || undefined
    );
  }

  async getTokenTransfer(vaa: TokenTransfer.VAA, txId: string) {
    return await TokenTransfer.from(this.#wh, {
      chain: vaa.emitterChain,
      txid: txId,
    });
  }

  async isComplete(vaa: TokenTransfer.VAA, tokenTransfer: TokenTransfer) {
    const isComplete = await TokenTransfer.isTransferComplete(
      tokenTransfer.toChain,
      vaa,
    );
    return isComplete;
  }

  async completeTransfer(
    tokenTransfer: TokenTransfer,
    signer: EvmSigner,
  ): Promise<string> {
    const txIds = await tokenTransfer.completeTransfer(
      new WormholeWagmiSigner(this.chain, signer),
    );

    return txIds[0];
  }
}
