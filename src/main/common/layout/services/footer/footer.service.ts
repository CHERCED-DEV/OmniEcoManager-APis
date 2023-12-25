import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { catchError, tap } from 'rxjs';
import { HttpHandlerService } from 'src/main/core/helpers/http-handler/http-handler.service';
import { CultureService } from 'src/main/core/services/culture/culture.service';
import { HttpsRequests } from 'src/main/core/types/enums/request.core.enum';
import { footerDataEn, footerDataEs } from '../../data/footer/footer.data';
import { FooterConfig } from '../../entities/footer.entity';

@Injectable()
export class FooterService {
  private readonly cmsCommonApi: string;
  constructor(
    private cultureService: CultureService,
    private httpHandlerService: HttpHandlerService,
    private configService: ConfigService,
  ) {
    this.cmsCommonApi =
      this.configService.get<string>('CMS', 'default-CMS') +
      'api/common?populate=*';
    console.log(this.cmsCommonApi);
  }
  getFooterConfig(): FooterConfig {
    if (this.cultureService.getCurrentCulture() === 'es') {
      return footerDataEs;
    } else {
      return footerDataEn;
    }
  }
  getStrapiFooter() {
    console.log('Before making the request');
    return this.httpHandlerService
      .request(HttpsRequests.GET, this.cmsCommonApi)
      .pipe(
        tap((response) => {
          return response;
        }),
        catchError((error) => {
          console.error('Error fetching Strapi data:', error);
          throw error;
        }),
      );
  }
}
