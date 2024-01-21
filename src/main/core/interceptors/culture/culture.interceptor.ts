import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { CultureService } from '../../services/culture/culture.service';

@Injectable()
export class CultureInterceptor implements NestInterceptor {
  constructor(private cultureService: CultureService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const acceptLanguageHeader: string = request.headers['accept-language'];
    console.log('Accept-Language Header:', acceptLanguageHeader);

    try {
      await this.cultureService.setCulture(acceptLanguageHeader);

      const currentCulture = this.cultureService.getCurrentCulture();
      console.log('Current Culture:', currentCulture);

      if (currentCulture) {
        return next.handle();
      } else {
        response.status(400).send('Culture is not valid');
        return;
      }
    } catch (error) {
      console.error('Error setting culture:', error);
      response.status(500).send('Internal Server Error');
      return;
    }
  }
}
