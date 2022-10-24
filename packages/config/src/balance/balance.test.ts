import { createBalanceBuilder } from './balance';

describe('balance', () => {
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
    it('should be correct minAssetPallet config', () => {
      expect(balance.minAssetPallet(1)).toMatchSnapshot();
    });

    it('should be correct minAssetRegistryPallet config', () => {
      expect(balance.minAssetRegistryPallet(1)).toMatchSnapshot();
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
    const cfg = balance.tokens({ Token: 'MOVR' });

    it('should be correct balance config', () => {
      expect(cfg).toMatchSnapshot();
    });

    it('should be correct params with Token', () => {
      expect(cfg.getParams(account)).toMatchSnapshot();
    });
  });
});
