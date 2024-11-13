import type { SubmittableExtrinsicFunction } from '@polkadot/api/types';
import { getTypeDef } from '@polkadot/types';
import type { AnyJson } from '@polkadot/types/types';
import { u8aToHex } from '@polkadot/util';
import { decodeAddress } from '@polkadot/util-crypto';
import { XcmVersion } from './ExtrinsicBuilder.interfaces';

export function getExtrinsicArgumentVersion(
  func?: SubmittableExtrinsicFunction<'promise'>,
  index = 0,
): XcmVersion {
  if (!func) return XcmVersion.v1;

  const { type } = func.meta.args[index];
  const instance = func.meta.registry.createType(type.toString());
  const raw = getTypeDef(instance?.toRawType());

  if (!raw.sub) {
    return XcmVersion.v1;
  }

  const versions = Array.isArray(raw.sub)
    ? raw.sub.map((x) => x.name)
    : [raw.sub.name];

  if (versions.includes(XcmVersion.v5)) {
    return XcmVersion.v5;
  }

  if (versions.includes(XcmVersion.v4)) {
    return XcmVersion.v4;
  }

  if (versions.includes(XcmVersion.v3)) {
    return XcmVersion.v3;
  }

  if (versions.includes(XcmVersion.v2)) {
    return XcmVersion.v2;
  }

  if (versions.includes(XcmVersion.v1)) {
    return XcmVersion.v1;
  }

  throw new Error("Can't find XCM version");
}

export function getExtrinsicAccount(address: string) {
  const isEthAddress = address.length === 42 && address.startsWith('0x');

  return isEthAddress
    ? {
        AccountKey20: {
          key: address,
        },
      }
    : {
        AccountId32: {
          id: u8aToHex(decodeAddress(address)),
          network: null,
        },
      };
}

export function isXcmV4(xcmVersion: XcmVersion): boolean {
  return xcmVersion >= XcmVersion.v4;
}

export function normalizeX1(
  xcmVersion: XcmVersion,
  versionedObject: Record<string, AnyJson | object>,
) {
  if (!isXcmV4(xcmVersion)) return versionedObject;

  const normalizedObject = { ...versionedObject };
  const interior = normalizedObject.interior as object;

  if ('X1' in interior && interior?.X1 && !Array.isArray(interior.X1)) {
    interior.X1 = [interior.X1];
  } else if ('x1' in interior && interior?.x1 && !Array.isArray(interior.x1)) {
    interior.x1 = [interior.x1];
  }

  return normalizedObject;
}

export function normalizeConcrete(
  xcmVersion: XcmVersion,
  versionedObject: object,
) {
  return isXcmV4(xcmVersion)
    ? versionedObject
    : applyConcreteWrapper(versionedObject);
}

export function applyConcreteWrapper(versionedObject: object) {
  return {
    Concrete: { ...versionedObject },
  };
}
