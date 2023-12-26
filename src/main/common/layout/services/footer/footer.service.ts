import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable, catchError, map } from 'rxjs';
import { HttpHandlerService } from 'src/main/core/helpers/http-handler/http-handler.service';
import { StrapiPopulationService } from 'src/main/core/helpers/strapi-population/strapi-population.service';
import { CultureService } from 'src/main/core/services/culture/culture.service';
import { HttpsRequests } from 'src/main/core/types/enums/request.core.enum';
import { strapiResponse } from 'src/main/shared/entities/strapi.actions';
import { FooterConfig } from '../../entities/footer.entity';
import { FooterKey } from '../../keys/footer/footer.key';

@Injectable()
export class FooterService {
  private readonly cmsCommon: string;
  private readonly apiFooter: string;
  constructor(
    private cultureService: CultureService,
    private httpHandlerService: HttpHandlerService,
    private configService: ConfigService,
    private strapiPopulationService: StrapiPopulationService,
  ) {
    this.cmsCommon = this.configService.get<string>('CMS', 'default-cms');
    this.apiFooter = this.configService.get<string>(
      'COMMON_FOOTER',
      'default-common-footer',
    );
  }
  private transformResponse(response: strapiResponse): FooterConfig {
    const attributes: FooterConfig = response.data.attributes;
    const transformedFooterConfig: FooterConfig = {
      brand_logo: attributes.brand_logo.data.attributes,
      newsletter: {
        title: attributes.newsletter.title,
        input: {
          type: attributes.newsletter.input.type,
          placeholder: attributes.newsletter.input.placeholder,
          label: attributes.newsletter.input.label,
        },
        button: {
          label: attributes.newsletter.button.label,
          type: attributes.newsletter.button.type,
          button_class: attributes.newsletter.button.button_class,
        },
      },
      socialmedia: attributes.socialmedia.map((socialMediaItem) => {
        return {
          link: {
            href: socialMediaItem.link.href,
            label: socialMediaItem.link.label,
          },
          icon: socialMediaItem.icon,
        };
      }),
      copyrigth: {
        year: attributes.copyrigth.year,
        company_name: attributes.copyrigth.company_name,
        rights: attributes.copyrigth.rights,
        coorp_logo: attributes.copyrigth.coorp_logo.data.attributes,
      },
    };
    return transformedFooterConfig;
  }
  private callStrapiFooter(query: string): Observable<FooterConfig> {
    return this.httpHandlerService
      .request(HttpsRequests.GET, this.cmsCommon + query)
      .pipe(
        map((response: strapiResponse) => this.transformResponse(response)),
        catchError((error) => {
          console.error('Error fetching Strapi data:', error);
          throw error;
        }),
      );
  }
  public getFooterConfig(): Observable<FooterConfig> {
    const queryCall: string = this.strapiPopulationService.createQsObject(
      this.apiFooter,
      this.cultureService.getCurrentCulture(),
      FooterKey,
    );
    return this.callStrapiFooter(queryCall);
  }
}
