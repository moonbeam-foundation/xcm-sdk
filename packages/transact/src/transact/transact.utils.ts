import type {
  AccountMultilocationV1,
  AssetSymbol,
  BalanceConfig,
  XcmTransactThroughSignedParams,
} from '@moonbeam-network/xcm-config';
import {
  createExtrinsicEventHandler,
  type ExtrinsicEventsCallback,
  type Hash,
} from '@moonbeam-network/xcm-utils';
import type { ApiPromise } from '@polkadot/api';
import type { Signer as PolkadotSigner } from '@polkadot/api/types';
import type { IKeyringPair } from '@polkadot/types/types';
import { hexToU8a, u8aToHex } from '@polkadot/util';
import _ from 'lodash';
import type { Balance } from './transact.interfaces';

// random account, I used the same as Polkadot.js is using
// https://github.com/PureStake/apps/blob/master/packages/react-hooks/src/useWeight.ts#L36
const ZERO_ACCOUNT = '5CAUdnwecHGxxyr5vABevAfZ34Fi4AaraDRMwfDQXQ52PXqg';

export async function getTxWeight(
  callHash: string,
  api: ApiPromise,
): Promise<bigint> {
  const call = api.createType('Call', hexToU8a(callHash));
  const { weight } = await api.tx(call).paymentInfo(ZERO_ACCOUNT);

  return weight.toBigInt();
}

export async function getDerivatedAddress(
  api: ApiPromise,
  multilocation: AccountMultilocationV1,
): Promise<{ address20: string; address32: string }> {
  const ml = api.createType('XcmV1MultiLocation', multilocation);

  const toHash = new Uint8Array([
    ...new Uint8Array([32]),
    ...new TextEncoder().encode('multiloc'),
    ...ml.toU8a(),
  ]);

  const address20 = u8aToHex(api.registry.hash(toHash).slice(0, 20));
  const address32 = u8aToHex(api.registry.hash(toHash).slice(0, 32));

  return { address20, address32 };
}

export interface TransactParams {
  api: ApiPromise;
  cb?: ExtrinsicEventsCallback;
  params: XcmTransactThroughSignedParams;
  polkadotSigner?: PolkadotSigner;
  sourceAccount: string | IKeyringPair;
}

export async function transactThroughSigned({
  api,
  cb,
  params,
  polkadotSigner,
  sourceAccount,
}: TransactParams): Promise<Hash> {
  const hash = await api.tx.xcmTransactor
    .transactThroughSigned(...params)
    .signAndSend(
      sourceAccount,
      {
        signer: polkadotSigner,
      },

      cb &&
        createExtrinsicEventHandler(
          'xcmTransactor',
          'transactThroughSigned',
          cb,
        ),
    );

  return hash.toString();
}

export async function getGenericBalance<
  Symbols extends AssetSymbol = AssetSymbol,
>(
  api: ApiPromise,
  address: string,
  { pallet, function: fn, getParams, path, calc }: BalanceConfig<Symbols>,
): Promise<bigint> {
  const response = await api.query[pallet][fn](...getParams(address));

  if (response.isEmpty) {
    return 0n;
  }

  const unwrapped = (response as any).unwrap?.() || response;

  return calc(path.length ? _.get(unwrapped, path) : unwrapped);
}

export async function getBalance<Symbols extends AssetSymbol = AssetSymbol>(
  api: ApiPromise,
  address: string,
  config: BalanceConfig<Symbols>,
): Promise<Balance<Symbols>> {
  const decimals = api.registry.chainDecimals.at(0) || 12;
  const symbol = (api.registry.chainTokens.at(0) || 'UNIT') as Symbols;
  const balance = await getGenericBalance(api, address, config);

  return {
    balance,
    decimals,
    symbol,
  };
}
