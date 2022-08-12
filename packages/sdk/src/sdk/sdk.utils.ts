import {
  Asset,
  DepositConfig,
  PolkadotXcmExtrinsicSuccessEvent,
} from '@moonbeam-network/xcm-config';
import { ISubmittableResult } from '@polkadot/types/types';
import { ExtrinsicEvent, ExtrinsicStatus } from './sdk.interfaces';

export function createExtrinsicEventHandler<Assets extends Asset>(
  config: DepositConfig<Assets>,
  cb: (event: ExtrinsicEvent) => void,
) {
  return ({ events = [], status }: ISubmittableResult) => {
    if (status.isReady) {
      cb({ status: ExtrinsicStatus.Sent });
    }

    if (status.isInBlock) {
      const block = status.asInBlock.toString();

      events.forEach(({ event: { data, method, section } }) => {
        if (
          section === config.extrinsic.pallet &&
          method === config.extrinsic.successEvent
        ) {
          if (method === PolkadotXcmExtrinsicSuccessEvent.Attempted) {
            const eventData = data.at(0) as any;

            if (eventData.isIncomplete) {
              cb({
                status: ExtrinsicStatus.Failed,
                block,
                message: eventData.asIncomplete.toHuman().join('; '),
              });

              return;
            }
          }

          cb({
            status: ExtrinsicStatus.Success,
            block,
          });
        }

        if (section === 'system' && method === 'ExtrinsicFailed') {
          cb({
            status: ExtrinsicStatus.Failed,
            block,
            message: data.join('; '),
          });
        }
      });
    }
  };
}
