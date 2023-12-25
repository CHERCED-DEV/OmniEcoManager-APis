import { Injectable } from '@nestjs/common';
import { HeaderConfig } from '../../entities/header.entity';
import { CultureService } from 'src/main/core/services/culture/culture.service';
import { headerDataEs, headerDataEn } from '../../data/header/header.data';

@Injectable()
export class HeaderService {
  constructor(private cultureService: CultureService) {}

  getHeaderConfig(): HeaderConfig {
    if (this.cultureService.getCurrentCulture() === 'es') {
      return headerDataEs;
    } else {
      return headerDataEn;
    }
  }
}
