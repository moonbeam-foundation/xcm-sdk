import { SubmittableExtrinsicFunction } from '@polkadot/api/types';
import { getTypeDef } from '@polkadot/types';
import { XcmVersion } from './common.interfaces';

export function getExtrinsicArgumentVersion(
  extrinsicCall?: SubmittableExtrinsicFunction<'promise'>,
  index: number = 0,
): XcmVersion {
  if (!extrinsicCall) return XcmVersion.v1;

  const { type } = extrinsicCall.meta.args[index];
  const instance = extrinsicCall.meta.registry.createType(type.toString());
  const raw = getTypeDef(instance?.toRawType());

  if (!raw.sub) {
    return XcmVersion.v1;
  }

  const versions = Array.isArray(raw.sub)
    ? raw.sub.map((x) => x.name)
    : [raw.sub.name];

  if (versions.includes(XcmVersion.v1)) {
    return XcmVersion.v1;
  }

  if (versions.includes(XcmVersion.v2)) {
    return XcmVersion.v2;
  }

  if (versions.includes(XcmVersion.v3)) {
    return XcmVersion.v3;
  }

  throw new Error("Can't find Xcm version");
}
