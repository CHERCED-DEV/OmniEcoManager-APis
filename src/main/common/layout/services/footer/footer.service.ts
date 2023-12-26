import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { catchError, tap } from 'rxjs';
import { HttpHandlerService } from 'src/main/core/helpers/http-handler/http-handler.service';
import { CultureService } from 'src/main/core/services/culture/culture.service';
import { HttpsRequests } from 'src/main/core/types/enums/request.core.enum';
import { footerDataEn, footerDataEs } from '../../data/footer/footer.data';
import { FooterConfig } from '../../entities/footer.entity';
import { StrapiPopulationService } from 'src/main/core/helpers/strapi-population/strapi-population.service';

@Injectable()
export class FooterService {
  private readonly cmsCommonApi: string;
  constructor(
    private cultureService: CultureService,
    private httpHandlerService: HttpHandlerService,
    private configService: ConfigService,
    private strapiPopulationService: StrapiPopulationService,
  ) {
    const footerConfigInstance: FooterConfig = {
      brand_logo: { src: '', alt: '' },
      newsletter: {
        title: '',
        input: { type: 'text', placeholder: '', value: '' },
        button: { label: '', type: 'button', ariaLabel: '' },
      },
      socialmedia: [
        {
          link: { href: '', label: '' },
          img: { src: '', alt: '' },
        },
      ],
      copyright: { title: '', img: { src: '', alt: '' } },
    };
    console.log(footerConfigInstance);
    console.log(
      this.strapiPopulationService.createQsObject(footerConfigInstance),
    );
    /* this.cmsCommonApi =
      this.configService.get<string>('CMS', 'default-CMS') +
      this.strapiPopulationService.createQsObject(footerConfigInstance);
    console.log(this.cmsCommonApi); */
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
