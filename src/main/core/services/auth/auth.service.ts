import { Injectable } from '@nestjs/common';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService {
  private authTokenSubject = new BehaviorSubject<string>(null);

  async setToken(token: string): Promise<void> {
    return new Promise<void>((resolve) => {
      this.authTokenSubject.next(token);
      resolve();
    });
  }

  getToken(): string {
    return this.authTokenSubject.getValue();
  }

  clearToken(): void {
    this.authTokenSubject.next(null);
  }

  tokenAvailable(): boolean {
    return !!this.getToken();
  }
}
