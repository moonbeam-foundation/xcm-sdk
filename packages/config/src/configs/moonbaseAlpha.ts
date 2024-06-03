import { BalanceBuilder, ContractBuilder } from '@moonbeam-network/xcm-builder';
import {
  alan,
  ampe,
  atom,
  dev,
  ftmwh,
  hdx,
  otp,
  pica,
  tt1,
  tur,
  unit,
  usdcwh,
} from '../assets';
import {
  alphanetAssetHub,
  alphanetRelay,
  hydraDxAlphanet,
  moonbaseAlpha,
  moonbaseBeta,
  originTrailAlphanet,
  peaqAlphanet,
  peaqEvmAlphanet,
  pendulumAlphanet,
  picassoAlphanet,
  turingAlphanet,
} from '../chains';
import { AssetConfig } from '../types/AssetConfig';
import { ChainConfig } from '../types/ChainConfig';

export const moonbaseAlphaConfig = new ChainConfig({
  assets: [
    new AssetConfig({
      asset: dev,
      balance: BalanceBuilder().substrate().system().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: turingAlphanet,
      destinationFee: {
        amount: 0.00001,
        asset: dev,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetConfig({
      asset: dev,
      balance: BalanceBuilder().substrate().system().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: moonbaseBeta,
      destinationFee: {
        amount: 0.0002,
        asset: dev,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetConfig({
      asset: dev,
      balance: BalanceBuilder().substrate().system().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: pendulumAlphanet,
      destinationFee: {
        amount: 0.0000001,
        asset: dev,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetConfig({
      asset: dev,
      balance: BalanceBuilder().substrate().system().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: picassoAlphanet,
      destinationFee: {
        amount: 0.00000001,
        asset: dev,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetConfig({
      asset: alan,
      balance: BalanceBuilder().evm().erc20(),
      contract: ContractBuilder().Xtokens().transferMultiCurrencies(),
      destination: moonbaseBeta,
      destinationFee: {
        amount: 0.0002,
        asset: dev,
        balance: BalanceBuilder().substrate().system().account(),
      },
      fee: {
        asset: dev,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    // NOTE: Disabling because ws endpoint is not working
    // new AssetConfig({
    //   asset: auq,
    //   balance: BalanceBuilder().substrate().assets().account(),
    //   contract: ContractBuilder().Xtokens().transfer(),
    //   destination: uniqueAlpha,
    //   destinationFee: {
    //     amount: 0,
    //     asset: auq,
    //   },
    //   fee: {
    //     asset: dev,
    //     balance: BalanceBuilder().substrate().system().account(),
    //   },
    // }),
    new AssetConfig({
      asset: ampe,
      balance: BalanceBuilder().substrate().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: pendulumAlphanet,
      destinationFee: {
        amount: 0.001,
        asset: ampe,
        balance: BalanceBuilder().substrate().assets().account(),
      },
      fee: {
        asset: dev,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetConfig({
      asset: otp,
      balance: BalanceBuilder().substrate().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: originTrailAlphanet,
      destinationFee: {
        amount: 0.004,
        asset: otp,
        balance: BalanceBuilder().substrate().assets().account(),
      },
      fee: {
        asset: dev,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetConfig({
      asset: atom,
      balance: BalanceBuilder().substrate().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: picassoAlphanet,
      destinationFee: {
        amount: 0.0001,
        asset: atom,
        balance: BalanceBuilder().substrate().assets().account(),
      },
      fee: {
        asset: dev,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetConfig({
      asset: pica,
      balance: BalanceBuilder().substrate().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: picassoAlphanet,
      destinationFee: {
        amount: 0.01,
        asset: pica,
        balance: BalanceBuilder().substrate().assets().account(),
      },
      fee: {
        asset: dev,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetConfig({
      asset: tt1,
      balance: BalanceBuilder().substrate().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: alphanetAssetHub,
      destinationFee: {
        amount: 5,
        asset: tt1,
        balance: BalanceBuilder().substrate().assets().account(),
      },
      fee: {
        asset: dev,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetConfig({
      asset: tur,
      balance: BalanceBuilder().substrate().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: turingAlphanet,
      destinationFee: {
        amount: 0.2,
        asset: tur,
        balance: BalanceBuilder().substrate().assets().account(),
      },
      fee: {
        asset: dev,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetConfig({
      asset: unit,
      balance: BalanceBuilder().substrate().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: alphanetRelay,
      destinationFee: {
        amount: 0.0506,
        asset: unit,
        balance: BalanceBuilder().substrate().assets().account(),
      },
      fee: {
        asset: dev,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetConfig({
      asset: usdcwh,
      balance: BalanceBuilder().evm().erc20(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: hydraDxAlphanet,
      destinationFee: {
        amount: 0.1,
        asset: usdcwh,
        balance: BalanceBuilder().evm().erc20(),
      },
      fee: {
        asset: dev,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetConfig({
      asset: ftmwh,
      balance: BalanceBuilder().evm().erc20(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: hydraDxAlphanet,
      destinationFee: {
        amount: 0.01,
        asset: ftmwh,
        balance: BalanceBuilder().evm().erc20(),
      },
      fee: {
        asset: dev,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetConfig({
      asset: ftmwh,
      balance: BalanceBuilder().evm().erc20(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: peaqAlphanet,
      destinationFee: {
        amount: 0.01,
        asset: ftmwh,
        balance: BalanceBuilder().evm().erc20(),
      },
      fee: {
        asset: dev,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetConfig({
      asset: dev,
      balance: BalanceBuilder().substrate().system().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: hydraDxAlphanet,
      destinationFee: {
        amount: 0.0002,
        asset: dev,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetConfig({
      asset: hdx,
      balance: BalanceBuilder().substrate().assets().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: hydraDxAlphanet,
      destinationFee: {
        amount: 0.5,
        asset: hdx,
        balance: BalanceBuilder().substrate().system().account(),
      },
      fee: {
        asset: dev,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetConfig({
      asset: dev,
      balance: BalanceBuilder().substrate().system().account(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: peaqAlphanet,
      destinationFee: {
        amount: 0.00000001,
        asset: dev,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetConfig({
      asset: ftmwh,
      balance: BalanceBuilder().evm().erc20(),
      contract: ContractBuilder().Xtokens().transfer(),
      destination: peaqAlphanet,
      destinationFee: {
        amount: 0.01,
        asset: ftmwh,
        balance: BalanceBuilder().evm().erc20(),
      },
      fee: {
        asset: dev,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetConfig({
      asset: dev,
      balance: BalanceBuilder().substrate().system().account(),
      contract: ContractBuilder().Xtokens().transferWithEvmTo32(),
      destination: peaqEvmAlphanet,
      destinationFee: {
        amount: 0.00000001,
        asset: dev,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
    new AssetConfig({
      asset: ftmwh,
      balance: BalanceBuilder().evm().erc20(),
      contract: ContractBuilder().Xtokens().transferWithEvmTo32(),
      destination: peaqEvmAlphanet,
      destinationFee: {
        amount: 0.01,
        asset: ftmwh,
        balance: BalanceBuilder().evm().erc20(),
      },
      fee: {
        asset: dev,
        balance: BalanceBuilder().substrate().system().account(),
      },
    }),
  ],
  chain: moonbaseAlpha,
});
