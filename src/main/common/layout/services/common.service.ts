import { Injectable } from '@nestjs/common';
import { CultureService } from 'src/main/core/services/culture/culture.service';
import { FooterConfig } from '../entities/footer.entity';
import { HeaderConfig } from '../entities/header.entity';
import { CommonConfig } from '../entities/layout.entity';
import { FooterService } from './footer/footer.service';
import { HeaderService } from './header/header.service';
import { first, map, switchMap, take } from 'rxjs/operators';
import { forkJoin, Observable } from 'rxjs';

@Injectable()
export class CommonService {
  private footerData!: FooterConfig;
  private headerData!: HeaderConfig;
  private isFirstRequest = false;

  constructor(
    private cultureService: CultureService,
    private footerService: FooterService,
    private headerService: HeaderService,
  ) {}

  private initializeOnFirstRequest(): void {
    if (!this.isFirstRequest) {
      this.cultureService
        .cultureListener()
        .pipe(
          first(),
          switchMap((culture) => {
            console.log('culture is working: ' + culture);
            if (culture !== null && culture !== undefined && culture !== '') {
              return this.fetchData(culture);
            } else {
              return this.fetchData(null);
            }
          }),
          take(1), // Se completará después de la primera emisión
        )
        .subscribe(({ footerData, headerData }) => {
          this.footerData = footerData;
          this.headerData = headerData;
        });

      this.isFirstRequest = true;
    }
  }

  private fetchData(
    culture: string | null,
  ): Observable<{ footerData: FooterConfig; headerData: HeaderConfig }> {
    return forkJoin([
      this.footerService.getFooterConfig(culture),
      this.headerService.getHeaderConfig(culture),
    ]).pipe(map(([footerData, headerData]) => ({ footerData, headerData })));
  }

  getCommonData(): CommonConfig {
    // Llama al método de inicialización solo en la primera solicitud
    this.initializeOnFirstRequest();

    const res: CommonConfig = {
      common: {
        layout: {
          header: this.headerData,
          footer: this.footerData,
        },
      },
    };
    return res;
  }
}
