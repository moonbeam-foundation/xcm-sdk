import type { EvmSigner } from '@moonbeam-network/xcm-sdk';
import type { EvmChain, EvmParachain } from '@moonbeam-network/xcm-types';
import type {
  Chain,
  Network,
  SignAndSendSigner,
  SignedTx,
  UnsignedTransaction,
} from '@wormhole-foundation/sdk-connect';
import {
  http,
  type Address,
  type HttpTransport,
  type PublicClient,
  createPublicClient,
} from 'viem';

export class WormholeWagmiSigner<
  N extends Network = Network,
  C extends Chain = Chain,
> implements SignAndSendSigner<N, C>
{
  readonly #chain: EvmChain | EvmParachain;

  readonly #signer: EvmSigner;

  readonly #publicClient: PublicClient<HttpTransport>;

  constructor(chain: EvmChain | EvmParachain, signer: EvmSigner) {
    this.#chain = chain;
    this.#signer = signer;
    this.#publicClient = createPublicClient({
      chain: chain.getViemChain(),
      transport: http(),
    });
  }

  chain(): C {
    // biome-ignore lint/suspicious/noExplicitAny: need to fix types
    return this.#chain.getWormholeName() as any as C;
  }

  address(): Address {
    const address = this.#signer.account?.address;

    if (!address) {
      throw new Error(
        `${WormholeWagmiSigner.name}: Account address is not set in signer`,
      );
    }

    return address;
  }

  async signAndSend(
    transactions: UnsignedTransaction<Network, Chain>[],
  ): Promise<SignedTx[]> {
    const signed = [];
    const signerChainID = await this.#signer.getChainId();

    let nonce = await this.#publicClient.getTransactionCount({
      address: this.address(),
    });

    for (const tx of transactions) {
      const { transaction, description, parallelizable } = tx;
      console.log(
        `Signing: ${description} for ${this.address()}, chainId: ${signerChainID}`,
      );

      const signedTx = await this.#signer.sendTransaction({
        ...transaction,
        nonce,
        retryCount: 5,
      });

      if (parallelizable === false) {
        try {
          await this.#publicClient.waitForTransactionReceipt({
            hash: signedTx,
          });
        } catch (error) {
          throw new Error(
            `${WormholeWagmiSigner.name}: Error waiting for transaction, tx: ${signedTx}`,
            { cause: error },
          );
        }
      }

      signed.push(signedTx);

      nonce += 1;
    }

    return signed;
  }
}
