import { createBalanceBuilder } from './balance';

describe('Balance', () => {
  const account = '<ACCOUNT>';
  const balance = createBalanceBuilder();

  describe('assets', () => {
    const cfg = balance.assets(1);

    it('should be correct balance config', () => {
      expect(cfg).toMatchSnapshot();
    });

    it('should get correct params', () => {
      expect(cfg.getParams(account)).toMatchSnapshot();
    });
  });

  describe('min', () => {
    const cfg = balance.min(1);

    it('should be correct min config', () => {
      expect(cfg).toMatchSnapshot();
    });

    it('should get correct params', () => {
      expect(cfg.getParams()).toMatchSnapshot();
    });
  });

  describe('system', () => {
    const cfg = balance.system();

    it('should be correct system config', () => {
      expect(cfg).toMatchSnapshot();
    });

    it('should get correct params', () => {
      expect(cfg.getParams(account)).toMatchSnapshot();
    });
  });

  describe('tokens', () => {
    const cfg = balance.tokens('MOVR');

    it('should be correct balance config', () => {
      expect(cfg).toMatchSnapshot();
    });

    it('should be correct params with Token', () => {
      expect(cfg.getParams(account)).toMatchSnapshot();
    });

    it('should be correct params with ForeignAsset', () => {
      const cfg2 = balance.tokens(5);

      expect(cfg2.getParams(account)).toMatchSnapshot();
    });
  });
});
