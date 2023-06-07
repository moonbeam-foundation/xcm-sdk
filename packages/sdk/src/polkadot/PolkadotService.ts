import '@polkadot/api-augment';

import {
  ExtrinsicConfig,
  SubstrateQueryConfig,
} from '@moonbeam-network/xcm-builder';
import {
  assetsMap,
  eq,
  equilibriumAlphanet,
} from '@moonbeam-network/xcm-config';
import {
  AnyParachain,
  Asset,
  AssetAmount,
  ChainAssetId,
} from '@moonbeam-network/xcm-types';
import { getPolkadotApi } from '@moonbeam-network/xcm-utils';
import { ApiPromise } from '@polkadot/api';
import type { Signer as PolkadotSigner } from '@polkadot/api/types';
import { Option, u128 } from '@polkadot/types';
import { IKeyringPair } from '@polkadot/types/types';
import { AssetMetadata } from './PolkadotService.interfaces';

export class PolkadotService {
  readonly api: ApiPromise;

  readonly chain: AnyParachain;

  constructor(api: ApiPromise, chain: AnyParachain) {
    this.api = api;
    this.chain = chain;
  }

  static async create(chain: AnyParachain): Promise<PolkadotService> {
    return new PolkadotService(await getPolkadotApi(chain.ws), chain);
  }

  static async createMulti(chains: AnyParachain[]): Promise<PolkadotService[]> {
    return Promise.all(chains.map(PolkadotService.create));
  }

  get decimals(): number {
    return this.api.registry.chainDecimals.at(0) || 12;
  }

  get asset(): Asset {
    const symbol = this.api.registry.chainTokens.at(0);
    const key = symbol?.toString().toLowerCase();

    // TODO: Remove this once Equilibrium Alphanet is updated
    // or find better way if issue apears on other chains
    if (key === 'token' && this.chain.key === equilibriumAlphanet.key) {
      return eq;
    }

    if (!key) {
      throw new Error('No native symbol key found');
    }

    const asset = assetsMap.get(key);

    if (!asset) {
      throw new Error(`No asset found for key "${key}" and symbol "${symbol}"`);
    }

    return asset;
  }

  get existentialDeposit(): AssetAmount {
    const existentialDeposit = this.api.consts.balances?.existentialDeposit;
    const eqExistentialDeposit = this.api.consts.eqBalances
      ?.existentialDeposit as unknown as u128 | undefined;
    const amount =
      existentialDeposit?.toBigInt() || eqExistentialDeposit?.toBigInt() || 0n;

    return AssetAmount.fromAsset(this.asset, {
      amount,
      decimals: this.decimals,
    });
  }

  async getAssetMeta(
    asset: ChainAssetId,
  ): Promise<{ symbol: string; decimals: number } | undefined> {
    const fn =
      this.api.query.assets?.metadata ||
      this.api.query.assetRegistry?.currencyMetadatas ||
      this.api.query.assetRegistry?.assetMetadatas;

    if (!fn) {
      return undefined;
    }

    console.log(
      '\x1b[34m████████████████████▓▓▒▒░ PolkadotService.ts:95 ░▒▒▓▓████████████████████\x1b[0m',
    );
    console.log('* asset = ', asset);
    console.log(
      '\x1b[34m▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄\x1b[0m',
    );

    const data = (await fn(asset)) as AssetMetadata | Option<AssetMetadata>;
    const unwrapped = 'unwrapOrDefault' in data ? data.unwrapOrDefault() : data;

    return {
      decimals: unwrapped.decimals.toNumber(),
      symbol: unwrapped.symbol.toString(),
    };
  }

  async getAssetDecimals(asset: Asset): Promise<number> {
    return (
      (await this.getAssetMeta(this.chain.getMetadataAssetId(asset)))
        ?.decimals ||
      this.chain.getAssetDecimals(asset) ||
      this.decimals
    );
  }

  async query(config: SubstrateQueryConfig): Promise<bigint> {
    console.log(
      '\x1b[34m████████████████████▓▓▒▒░ PolkadotService.ts:114 ░▒▒▓▓████████████████████\x1b[0m',
    );
    console.log('* this.chain = ', this.chain);
    console.log(
      '\x1b[34m▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄\x1b[0m',
    );

    console.log(
      '\x1b[34m████████████████████▓▓▒▒░ PolkadotService.ts:114 ░▒▒▓▓████████████████████\x1b[0m',
    );
    console.log('* config = ', config);
    console.log(
      '\x1b[34m▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄\x1b[0m',
    );

    const response = await this.api.query[config.module][config.func](
      ...config.args,
    );

    console.log(
      '\x1b[34m████████████████████▓▓▒▒░ PolkadotService.ts:134 ░▒▒▓▓████████████████████\x1b[0m',
    );
    console.log('* response = ', response);
    console.log(
      '\x1b[34m▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄\x1b[0m',
    );

    return config.transform(response);
  }

  async getFee(account: string, config: ExtrinsicConfig): Promise<bigint> {
    const fn = this.api.tx[config.module][config.func];
    const args = config.getArgs(fn);

    console.log(
      '\x1b[34m████████████████████▓▓▒▒░ PolkadotService.ts:119 ░▒▒▓▓████████████████████\x1b[0m',
    );
    console.log('* extrinsic = ', {
      pallet: config.module,
      // eslint-disable-next-line sort-keys
      extrinsic: config.func,
      params: args,
    });
    console.log(
      '\x1b[34m▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄\x1b[0m',
    );

    const extrinsic = fn(...args);
    const info = await extrinsic.paymentInfo(account, { nonce: -1 });

    return info.partialFee.toBigInt();
  }

  async transfer(
    account: string,
    config: ExtrinsicConfig,
    signer: PolkadotSigner | IKeyringPair,
  ): Promise<string> {
    const fn = this.api.tx[config.module][config.func];
    const args = config.getArgs(fn);

    console.log(
      '\x1b[34m████████████████████▓▓▒▒░ PolkadotService.ts:119 ░▒▒▓▓████████████████████\x1b[0m',
    );
    console.log('* extrinsic = ', {
      pallet: config.module,
      // eslint-disable-next-line sort-keys
      extrinsic: config.func,
      params: args,
    });
    console.log(
      '\x1b[34m▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄\x1b[0m',
    );

    const extrinsic = fn(...args);
    const hash = await extrinsic.signAndSend(
      this.#isSigner(signer) ? account : signer,
      {
        nonce: -1,
        signer: this.#isSigner(signer) ? signer : undefined,
      },
    );

    return hash.toString();
  }

  // eslint-disable-next-line class-methods-use-this
  #isSigner(signer: PolkadotSigner | IKeyringPair): signer is PolkadotSigner {
    return 'signPayload' in signer;
  }
}
