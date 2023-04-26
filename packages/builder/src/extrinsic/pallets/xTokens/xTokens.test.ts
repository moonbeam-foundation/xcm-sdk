import { buildParamsMock } from '../../../../fixtures';
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
    const extrinsic = xTokens().transferMultiAsset().build(buildParamsMock);

    it('should be correct config', () => {
      expect(extrinsic).toMatchSnapshot();
    });

    it('should get correct arguments', () => {
      expect(extrinsic.getArgs()).toMatchSnapshot();
    });
  });

  describe('transferMultiCurrencies', () => {
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
});
