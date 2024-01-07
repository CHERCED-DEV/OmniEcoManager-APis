import { Injectable } from '@nestjs/common';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class CultureService {
  private currentLangSubject = new BehaviorSubject<string>('en');

  setCulture(culture: string) {
    this.currentLangSubject.next(culture);
  }

  getCurrentCulture(): string {
    return this.currentLangSubject.getValue();
  }

  cultureListener(): Observable<string> {
    return this.currentLangSubject.asObservable();
  }
}
