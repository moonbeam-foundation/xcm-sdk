import { BalanceBuilder, ContractBuilder } from '@moonbeam-network/xcm-builder';
import { auq, dev, eq, eqd, lit, paring, tt1, unit } from '../assets';
import {
  alphanetRelay,
  darwiniaPangoro,
  equilibriumAlphanet,
  litentryAlphanet,
  moonbaseAlpha,
  statemineAlphanet,
  uniqueAlpha,
} from '../chains';
import { AssetConfig } from '../types/AssetConfig';
import { ChainConfig } from '../types/ChainConfig';

export const moonbaseAlphaConfig = new ChainConfig({
  assets: [
    new AssetConfig({
      asset: dev,
      balance: BalanceBuilder().system().account(),
      contract: ContractBuilder().xTokens().transfer(),
      destinations: equilibriumAlphanet,
    }),
    new AssetConfig({
      asset: auq,
      balance: BalanceBuilder().assets().account(),
      contract: ContractBuilder().xTokens().transfer(),
      destinations: uniqueAlpha,
      fee: {
        asset: dev,
        balance: BalanceBuilder().system().account(),
      },
    }),
    new AssetConfig({
      asset: eq,
      balance: BalanceBuilder().assets().account(),
      contract: ContractBuilder().xTokens().transfer(),
      destinations: equilibriumAlphanet,
      fee: {
        asset: dev,
        balance: BalanceBuilder().system().account(),
      },
    }),
    new AssetConfig({
      asset: eqd,
      balance: BalanceBuilder().assets().account(),
      contract: ContractBuilder().xTokens().transfer(),
      destinations: equilibriumAlphanet,
      fee: {
        asset: dev,
        balance: BalanceBuilder().system().account(),
      },
    }),
    new AssetConfig({
      asset: lit,
      balance: BalanceBuilder().assets().account(),
      contract: ContractBuilder().xTokens().transfer(),
      destinations: litentryAlphanet,
      fee: {
        asset: dev,
        balance: BalanceBuilder().system().account(),
      },
    }),
    new AssetConfig({
      asset: paring,
      balance: BalanceBuilder().assets().account(),
      contract: ContractBuilder().xTokens().transfer(),
      destinations: darwiniaPangoro,
      fee: {
        asset: dev,
        balance: BalanceBuilder().system().account(),
      },
    }),
    new AssetConfig({
      asset: tt1,
      balance: BalanceBuilder().assets().account(),
      contract: ContractBuilder().xTokens().transfer(),
      destinations: statemineAlphanet,
      fee: {
        asset: dev,
        balance: BalanceBuilder().system().account(),
      },
    }),
    new AssetConfig({
      asset: unit,
      balance: BalanceBuilder().assets().account(),
      contract: ContractBuilder().xTokens().transfer(),
      destinations: alphanetRelay,
      fee: {
        asset: dev,
        balance: BalanceBuilder().system().account(),
      },
    }),
  ],
  chain: moonbaseAlpha,
});
