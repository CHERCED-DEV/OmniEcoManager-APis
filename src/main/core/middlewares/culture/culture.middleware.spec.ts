import { CultureMiddleware } from './culture.middleware';

describe('CultureMiddleware', () => {
  it('should be defined', () => {
    expect(new CultureMiddleware()).toBeDefined();
  });
});
