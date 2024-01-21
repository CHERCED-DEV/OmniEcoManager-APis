import { CultureInterceptor } from './culture.interceptor';
import { CultureService } from '../../services/culture/culture.service';

describe('CultureInterceptor', () => {
  it('should be defined', () => {
    const cultureServiceMock = {} as CultureService;
    const interceptor = new CultureInterceptor(cultureServiceMock);
    expect(interceptor).toBeDefined();
  });
});
