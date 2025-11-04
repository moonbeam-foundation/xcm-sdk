import type { MrlConfigBuilder } from '../../../../MrlBuilder.interfaces';
import { ASSET_HUB_PARA_ID, SnowbridgeConfig } from '../../snowbridge';

export function Gateway() {
  return {
    sendToken: (): MrlConfigBuilder => ({
      build: ({ asset, destinationAddress, bridgeFee }) => {
        if (!bridgeFee) {
          throw new Error(
            'Bridge fee is required for Gateway.sendToken module',
          );
        }

        return new SnowbridgeConfig({
          args: {
            tokenAddress: asset.address as string,
            destinationAddress,
            destinationParaId: ASSET_HUB_PARA_ID,
            amount: asset.amount,
            bridgeFeeAmount: bridgeFee.amount,
            requiresApproval: false,
          },
          func: 'sendToken',
        });
      },
    }),
    approveAndSendToken: (): MrlConfigBuilder => ({
      build: ({ asset, destinationAddress, bridgeFee }) => {
        if (!bridgeFee) {
          throw new Error(
            'Bridge fee is required for Gateway.approveAndSendToken module',
          );
        }

        const requiresApproval = !bridgeFee.isSame(asset);

        return new SnowbridgeConfig({
          args: {
            tokenAddress: asset.address as string,
            destinationAddress,
            destinationParaId: ASSET_HUB_PARA_ID,
            amount: asset.amount,
            bridgeFeeAmount: bridgeFee.amount,
            requiresApproval,
          },
          func: 'sendToken',
        });
      },
    }),
  };
}
