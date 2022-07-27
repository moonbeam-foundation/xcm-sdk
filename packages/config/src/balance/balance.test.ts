import { createBalanceBuilder } from './balance';

describe('Balance', () => {
  const account = '<ACCOUNT>';
  const balance = createBalanceBuilder();

  describe('assets', () => {
    const cfg = balance.assets(1);

    it('should return assets balance config', () => {
      expect(cfg).toMatchSnapshot();
    });

    it('should return assets balance params', () => {
      expect(cfg.getParams(account)).toMatchSnapshot();
    });
  });

  describe('min', () => {
    const cfg = balance.min(1);

    it('should return min balance config', () => {
      expect(cfg).toMatchSnapshot();
    });

    it('should return min balance config params', () => {
      expect(cfg.getParams()).toMatchSnapshot();
    });
  });

  describe('system', () => {
    const cfg = balance.system();

    it('should return system balance config', () => {
      expect(cfg).toMatchSnapshot();
    });

    it('should return system balance config params', () => {
      expect(cfg.getParams(account)).toMatchSnapshot();
    });
  });

  describe('tokens', () => {
    const cfg = balance.tokens('MOVR');

    it('should return tokens balance config', () => {
      expect(cfg).toMatchSnapshot();
    });

    it('should return tokens balance config with Token params', () => {
      expect(cfg.getParams(account)).toMatchSnapshot();
    });

    it('should return tokens balance config with ForeignAsset params', () => {
      const cfg2 = balance.tokens(5);

      expect(cfg2.getParams(account)).toMatchSnapshot();
    });
  });
});
