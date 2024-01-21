import { Injectable } from '@nestjs/common';
import { BehaviorSubject, Observable, filter } from 'rxjs';

@Injectable()
export class CultureService {
  private currentLangSubject = new BehaviorSubject<string>(null);
  private initialized = false;

  async setCulture(culture: string): Promise<void> {
    return new Promise<void>((resolve) => {
      this.currentLangSubject.next(culture);
      this.initialized = true;
      resolve();
    });
  }

  getCurrentCulture(): string {
    return this.currentLangSubject.getValue();
  }

  cultureListener(): Observable<string> {
    return this.currentLangSubject
      .asObservable()
      .pipe(filter(() => this.initialized));
  }
}
