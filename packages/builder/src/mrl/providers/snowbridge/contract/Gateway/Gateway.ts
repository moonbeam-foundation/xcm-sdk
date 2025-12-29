import {
  type AnyChain,
  type AssetAmount,
  EvmParachain,
} from '@moonbeam-network/xcm-types';
import {
  type MrlConfigBuilder,
  Provider,
} from '../../../../MrlBuilder.interfaces';
import { SnowbridgeConfig } from '../../snowbridge';

export function Gateway() {
  const provider = Provider.Snowbridge;

  return {
    sendToken: (): MrlConfigBuilder => ({
      provider,
      build: ({ asset, destinationAddress, protocolFee, destination }) =>
        callSendToken(asset, protocolFee, destination, destinationAddress),
    }),
    approveAndSendToken: (): MrlConfigBuilder => ({
      provider,
      build: ({ asset, destinationAddress, protocolFee, destination }) => {
        const requiresApproval = protocolFee && !protocolFee.isSame(asset);

        return callSendToken(
          asset,
          protocolFee,
          destination,
          destinationAddress,
          requiresApproval,
        );
      },
    }),
  };
}

function callSendToken(
  asset: AssetAmount,
  protocolFee: AssetAmount | undefined,
  destination: AnyChain,
  destinationAddress: string,
  requiresApproval = false,
): SnowbridgeConfig {
  if (!protocolFee) {
    throw new Error('Protocol fee is required for Gateway module');
  }

  if (!EvmParachain.isAnyParachain(destination)) {
    throw new Error(
      'Destination must be a Parachain or EvmParachain for sending token with Gateway module',
    );
  }

  const isDifferentAsset = !asset.isSame(protocolFee);

  const value =
    requiresApproval || isDifferentAsset
      ? protocolFee.amount
      : asset.amount + protocolFee.amount;

  return new SnowbridgeConfig({
    args: {
      tokenAddress: asset.address as string,
      destinationAddress,
      destinationParaId: destination.parachainId,
      amount: asset.amount,
      bridgeFeeAmount: protocolFee.amount,
      requiresApproval,
      value,
    },
    func: 'sendToken',
  });
}
