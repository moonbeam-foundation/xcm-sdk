import {
  buildParachainParamsMock,
  buildParamsMock,
} from '../../../../fixtures';
import { xTransfer } from './xTransfer';

describe('xTransfer', () => {
  describe('transfer', () => {
    describe('here', () => {
      const extrinsic = xTransfer().transfer().here().build(buildParamsMock);

      it('should be correct config', () => {
        expect(extrinsic).toMatchSnapshot();
      });

      it('should get correct arguments', () => {
        expect(extrinsic.getArgs()).toMatchSnapshot();
      });
    });

    describe('x2', () => {
      const extrinsic = xTransfer().transfer().X2().build(buildParamsMock);

      it('should be correct config', () => {
        expect(extrinsic).toMatchSnapshot();
      });

      it('should get correct arguments', () => {
        expect(extrinsic.getArgs()).toMatchSnapshot();
      });
    });

    describe('parachain', () => {
      const extrinsic = xTransfer()
        .transfer()
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
