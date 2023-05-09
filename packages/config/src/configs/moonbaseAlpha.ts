import { BalanceBuilder, ContractBuilder } from '@moonbeam-network/xcm-builder';
import { AssetConfig } from '../AssetConfig';
import { ChainConfig } from '../ChainConfig';
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

export const moonbaseAlphaConfig = new ChainConfig({
  assets: [
    new AssetConfig({
      asset: dev,
      balance: BalanceBuilder().system().account(),
      contract: ContractBuilder().xTokens().transfer(),
      destinations: [equilibriumAlphanet],
    }),
    new AssetConfig({
      asset: auq,
      balance: BalanceBuilder().assets().account(),
      contract: ContractBuilder().xTokens().transfer(),
      destinations: [uniqueAlpha],
    }),
    new AssetConfig({
      asset: eq,
      balance: BalanceBuilder().assets().account(),
      contract: ContractBuilder().xTokens().transfer(),
      destinations: [equilibriumAlphanet],
    }),
    new AssetConfig({
      asset: eqd,
      balance: BalanceBuilder().assets().account(),
      contract: ContractBuilder().xTokens().transfer(),
      destinations: [equilibriumAlphanet],
    }),
    new AssetConfig({
      asset: lit,
      balance: BalanceBuilder().assets().account(),
      contract: ContractBuilder().xTokens().transfer(),
      destinations: [litentryAlphanet],
    }),
    new AssetConfig({
      asset: paring,
      balance: BalanceBuilder().assets().account(),
      contract: ContractBuilder().xTokens().transfer(),
      destinations: [darwiniaPangoro],
    }),
    new AssetConfig({
      asset: tt1,
      balance: BalanceBuilder().assets().account(),
      contract: ContractBuilder().xTokens().transfer(),
      destinations: [statemineAlphanet],
    }),
    new AssetConfig({
      asset: unit,
      balance: BalanceBuilder().assets().account(),
      contract: ContractBuilder().xTokens().transfer(),
      destinations: [alphanetRelay],
    }),
  ],
  chain: moonbaseAlpha,
});
