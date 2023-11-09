import {
  buildParachainParamsMock,
  buildParamsMock,
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
});
