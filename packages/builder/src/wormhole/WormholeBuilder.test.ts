/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, it } from 'vitest';

import {
  wormholeConfigBuilderPrams,
  wormholeToMoonchainConfigBuilderPrams,
} from '../../fixtures';
import { WormholeBuilder } from './WormholeBuilder';

describe('wormholeBuilder', () => {
  describe('tokenTransfer with isAutomatic=true', () => {
    const transfer = WormholeBuilder().tokenTransfer({ isAutomatic: true });

    it('should be correct config', () => {
      expect(transfer.build(wormholeConfigBuilderPrams)).toMatchSnapshot();
    });
  });

  describe('tokenTransfer with isAutomatic=false', () => {
    const transfer = WormholeBuilder().tokenTransfer({ isAutomatic: false });

    it('should be correct config to moon chain', () => {
      expect(
        transfer.build(wormholeToMoonchainConfigBuilderPrams),
      ).toMatchSnapshot();
    });
  });
});
