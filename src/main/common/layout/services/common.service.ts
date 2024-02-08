import { Injectable } from '@nestjs/common';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CultureService } from 'src/main/core/services/culture/culture.service';
import { FooterConfig } from '../entities/footer.entity';
import { HeaderConfig } from '../entities/header.entity';
import { CommonConfig } from '../entities/layout.entity';
import { FooterService } from './footer/footer.service';
import { HeaderService } from './header/header.service';

@Injectable()
export class CommonService {
  private footerData!: FooterConfig;
  private headerData!: HeaderConfig;

  constructor(
    private cultureService: CultureService,
    private footerService: FooterService,
    private headerService: HeaderService,
  ) {}

  private initializeRequest(): void {
    this.cultureService
      .cultureListener()
      .pipe(
        switchMap((culture) => {
          console.log('culture is working: ' + culture);
          if (culture !== null && culture !== undefined && culture !== '') {
            return this.fetchData(culture);
          }
        }),
      )
      .subscribe(({ footerData, headerData }) => {
        this.footerData = footerData;
        this.headerData = headerData;
      });
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
    this.initializeRequest();

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
