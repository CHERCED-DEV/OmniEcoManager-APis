import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(private authService: AuthService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const authorizationHeader: string = request.headers['authorization'];

    try {
      if (!authorizationHeader) {
        throw new Error('Authorization header is missing');
      }
      const [bearer, token] = authorizationHeader.split(' ');
      if (!bearer || !token || bearer.toLowerCase() !== 'bearer') {
        throw new Error('Invalid authorization header format');
      }
      await this.authService.setToken(token);
      const currentToken = this.authService.getToken();
      if (currentToken) {
        return next.handle();
      }
    } catch (error) {
      console.error('Error processing authorization header:', error);
      response.status(401).send('Unauthorized');
      return;
    }
  }
}
