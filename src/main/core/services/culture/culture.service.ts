import { Injectable } from '@nestjs/common';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class CultureService {
  private currentLangSubject = new BehaviorSubject<string>(null);

  setCulture(culture: string): void {
    this.currentLangSubject.next(culture);
  }

  getCurrentCulture(): string {
    return this.currentLangSubject.getValue();
  }

  cultureListener(): Observable<string> {
    return this.currentLangSubject.asObservable();
  }
}
