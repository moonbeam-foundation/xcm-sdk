import {
  buildParachainParamsMock,
  buildParamsMock,
} from '../../../../fixtures';
import { xTokens } from './xTokens';

describe('xTokens', () => {
  describe('transfer', () => {
    const extrinsic = xTokens().transfer().build(buildParamsMock);

    it('should be correct config', () => {
      expect(extrinsic).toMatchSnapshot();
    });

    it('should get correct arguments', () => {
      expect(extrinsic.getArgs()).toMatchSnapshot();
    });
  });

  describe('transferMultiAsset', () => {
    describe('x1', () => {
      const extrinsic = xTokens()
        .transferMultiAsset(100)
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
      const extrinsic = xTokens()
        .transferMultiAsset(100)
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
      const extrinsic = xTokens()
        .transferMultiAsset(100)
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

  describe('transferMultiCurrencies', () => {
    describe('x2', () => {
      const extrinsic = xTokens()
        .transferMultiCurrencies()
        .build(buildParamsMock);

      it('should be correct config', () => {
        expect(extrinsic).toMatchSnapshot();
      });

      it('should get correct arguments', () => {
        expect(extrinsic.getArgs()).toMatchSnapshot();
      });
    });

    describe('parachain', () => {
      const extrinsic = xTokens()
        .transferMultiCurrencies()
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
