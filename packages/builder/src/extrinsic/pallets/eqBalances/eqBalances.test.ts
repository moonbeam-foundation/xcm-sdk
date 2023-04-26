import { extrinsicConfigBuilderPrams } from '../../../../fixtures';
import { eqBalances } from './eqBalances';

describe('eqBalances', () => {
  describe('xcmTransfer', () => {
    const extrinsic = eqBalances()
      .xcmTransfer()
      .build(extrinsicConfigBuilderPrams);

    it('should be correct config', () => {
      expect(extrinsic).toMatchSnapshot();
    });

    it('should get correct params', () => {
      expect(extrinsic.getArgs({} as any)).toMatchSnapshot();
    });
  });

  describe('transferXcm', () => {
    const extrinsic = eqBalances()
      .transferXcm()
      .build(extrinsicConfigBuilderPrams);

    it('should be correct config', () => {
      expect(extrinsic).toMatchSnapshot();
    });

    it('should get correct params', () => {
      expect(extrinsic.getArgs({} as any)).toMatchSnapshot();
    });
  });
});
