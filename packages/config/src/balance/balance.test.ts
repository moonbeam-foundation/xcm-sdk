import { createBalanceBuilder } from './balance';

describe('Balance', () => {
  const account = '<ACCOUNT>';
  const builder = createBalanceBuilder();

  describe('assets', () => {
    it('should return assets balance config with params', () => {
      const cfg = builder.assets(1);

      expect(cfg).toMatchSnapshot();
      expect(cfg.getParams(account)).toMatchSnapshot();
    });
  });

  describe('min', () => {
    it('should return min balance config with params', () => {
      const cfg = builder.min(1);

      expect(cfg).toMatchSnapshot();
      expect(cfg.getParams()).toMatchSnapshot();
    });
  });
});
