import { Injectable } from '@nestjs/common';

@Injectable()
export class CultureService {
  private currentCulture: string = 'en';

  setCulture(culture: string) {
    this.currentCulture = culture;
  }

  getCurrentCulture(): string {
    return this.currentCulture;
  }
}
