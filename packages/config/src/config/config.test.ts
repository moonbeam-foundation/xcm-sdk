import { moonbase, moonbeam, moonriver } from './config';

describe('config', () => {
  it('should moonbase be defined', () => {
    expect(moonbase).toBeDefined();
  });

  it('should moonbeam be defined', () => {
    expect(moonbeam).toBeDefined();
  });

  it('should moonriver be defined', () => {
    expect(moonriver).toBeDefined();
  });
});
