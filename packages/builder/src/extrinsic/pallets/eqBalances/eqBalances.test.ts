import {
  buildParachainParamsMock,
  buildParamsMock,
} from '../../../../fixtures';
import { eqBalances } from './eqBalances';

describe('eqBalances', () => {
  describe('xcmTransfer', () => {
    const extrinsic = eqBalances().xcmTransfer().build(buildParamsMock);

    it('should be correct config', () => {
      expect(extrinsic).toMatchSnapshot();
    });

    it('should get correct arguments', () => {
      expect(extrinsic.getArgs({} as any)).toMatchSnapshot();
    });
  });

  describe('transferXcm', () => {
    const extrinsic = eqBalances().transferXcm().build(buildParamsMock);

    it('should be correct config', () => {
      expect(extrinsic).toMatchSnapshot();
    });

    it('should get correct arguments', () => {
      expect(extrinsic.getArgs({} as any)).toMatchSnapshot();
    });
  });

  describe('xcmTransfer to parachain', () => {
    const extrinsic = eqBalances()
      .xcmTransfer()
      .build(buildParachainParamsMock);

    it('should be correct config', () => {
      expect(extrinsic).toMatchSnapshot();
    });

    it('should get correct arguments', () => {
      expect(extrinsic.getArgs({} as any)).toMatchSnapshot();
    });
  });

  describe('transferXcm to parachain', () => {
    const extrinsic = eqBalances()
      .transferXcm()
      .build(buildParachainParamsMock);

    it('should be correct config', () => {
      expect(extrinsic).toMatchSnapshot();
    });

    it('should get correct arguments', () => {
      expect(extrinsic.getArgs({} as any)).toMatchSnapshot();
    });
  });
});
