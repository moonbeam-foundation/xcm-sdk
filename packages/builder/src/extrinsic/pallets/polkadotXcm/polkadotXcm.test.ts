import { describe, expect, it } from 'vitest';

import {
  buildParachainParamsMock,
  buildParamsMock,
  buildParamsSameAssetMock,
} from '../../../../fixtures';
import { polkadotXcm } from './polkadotXcm';

describe('polkadotXcm', () => {
  describe('limitedReserveTransferAssets', () => {
    describe('here', () => {
      const extrinsic = polkadotXcm()
        .limitedReserveTransferAssets()
        .here()
        .build(buildParamsMock);

      it('should be correct config', () => {
        expect(extrinsic).toMatchSnapshot();
      });

      it('should get correct arguments', () => {
        expect(extrinsic.getArgs()).toMatchSnapshot();
      });
    });

    describe('x1', () => {
      const extrinsic = polkadotXcm()
        .limitedReserveTransferAssets()
        .X1()
        .build(buildParamsMock);

      it('should be correct config', () => {
        expect(extrinsic).toMatchSnapshot();
      });

      it('should get correct arguments', () => {
        expect(extrinsic.getArgs()).toMatchSnapshot();
      });
    });

    describe('x2', () => {
      describe('the same asset', () => {
        const extrinsic = polkadotXcm()
          .limitedReserveTransferAssets()
          .X2()
          .build(buildParamsSameAssetMock);

        it('should be correct config', () => {
          expect(extrinsic).toMatchSnapshot();
        });

        it('should get correct arguments', () => {
          expect(extrinsic.getArgs()).toMatchSnapshot();
        });
      });

      describe('different assets', () => {
        const extrinsic = polkadotXcm()
          .limitedReserveTransferAssets()
          .X2()
          .build(buildParamsMock);

        it('should be correct config', () => {
          expect(extrinsic).toMatchSnapshot();
        });

        it('should get correct arguments', () => {
          expect(extrinsic.getArgs()).toMatchSnapshot();
        });
      });
    });

    describe('parachain', () => {
      const extrinsic = polkadotXcm()
        .limitedReserveTransferAssets()
        .X2()
        .build(buildParachainParamsMock);

      it('should be correct config', () => {
        expect(extrinsic).toMatchSnapshot();
      });

      it('should get correct arguments', () => {
        expect(extrinsic.getArgs()).toMatchSnapshot();
      });
    });
  });

  describe('limitedReserveWithdrawAssets', () => {
    describe('x2', () => {
      const extrinsic = polkadotXcm()
        .limitedReserveWithdrawAssets()
        .X2()
        .build(buildParamsMock);

      it('should be correct config', () => {
        expect(extrinsic).toMatchSnapshot();
      });

      it('should get correct arguments', () => {
        expect(extrinsic.getArgs()).toMatchSnapshot();
      });
    });

    describe('parachain', () => {
      const extrinsic = polkadotXcm()
        .limitedReserveWithdrawAssets()
        .X2()
        .build(buildParachainParamsMock);

      it('should be correct config', () => {
        expect(extrinsic).toMatchSnapshot();
      });

      it('should get correct arguments', () => {
        expect(extrinsic.getArgs()).toMatchSnapshot();
      });
    });
  });

  describe('transferAssets', () => {
    describe('here', () => {
      const extrinsic = polkadotXcm()
        .transferAssets()
        .here()
        .build(buildParachainParamsMock);

      it('should be correct config', () => {
        expect(extrinsic).toMatchSnapshot();
      });

      it('should get correct arguments', () => {
        expect(extrinsic.getArgs()).toMatchSnapshot();
      });
    });
  });

  describe('transferAssets', () => {
    describe('X2AndFeeHere', () => {
      const extrinsic = polkadotXcm()
        .transferAssets()
        .X2AndFeeHere()
        .build(buildParachainParamsMock);

      it('should be correct config', () => {
        expect(extrinsic).toMatchSnapshot();
      });

      it('should get correct arguments', () => {
        expect(extrinsic.getArgs()).toMatchSnapshot();
      });
    });
  });

  describe('transferAssetsUsingTypeAndThen', () => {
    describe('globalConsensusEthereum', () => {
      const extrinsic = polkadotXcm()
        .transferAssetsUsingTypeAndThen()
        .globalConsensusEthereum()
        .build(buildParachainParamsMock);

      it('should be correct config', () => {
        expect(extrinsic).toMatchSnapshot();
      });

      it('should get correct arguments', () => {
        expect(extrinsic.getArgs()).toMatchSnapshot();
      });
    });
  });
});
