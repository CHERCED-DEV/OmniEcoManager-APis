import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable, catchError, map } from 'rxjs';
import { HttpHandlerService } from 'src/main/core/helpers/http-handler/http-handler.service';
import { StrapiPopulationService } from 'src/main/core/helpers/strapi-population/strapi-population.service';
import { CultureService } from 'src/main/core/services/culture/culture.service';
import { HttpsRequests } from 'src/main/core/types/enums/request.core.enum';
import { strapiResponse } from 'src/main/shared/entities/strapi.actions';
import { HeaderConfig } from '../../entities/header.entity';
import { HeaderKey } from '../../keys/header/header.key';

@Injectable()
export class HeaderService {
  private readonly cmsCommon: string;
  private readonly apiHeader: string;
  constructor(
    private cultureService: CultureService,
    private httpHandlerService: HttpHandlerService,
    private configService: ConfigService,
    private strapiPopulationService: StrapiPopulationService,
  ) {
    this.cmsCommon = this.configService.get<string>('CMS', 'default-cms');
    this.apiHeader = this.configService.get<string>(
      'COMMON_HEADER',
      'default-common-header',
    );
  }
  private transformResponse(response: strapiResponse): HeaderConfig {
    const attributes: HeaderConfig = response.data.attributes;
    const transformedHeaderConfig: HeaderConfig = {
      brand_logo: attributes.brand_logo.data.attributes,
      search_nav: {
        input: {
          label: attributes.search_nav.input.label,
          placeholder: attributes.search_nav.input.placeholder,
          type: attributes.search_nav.input.type,
        },
        button: {
          label: attributes.search_nav.button.label,
          type: attributes.search_nav.button.type,
          button_class: attributes.search_nav.button.button_class,
        },
      },
      alerts: attributes.alerts.map((alert) => {
        return {
          link: {
            href: alert.link.href,
            label: alert.link.label,
          },
          main_text: alert.main_text,
        };
      }),
    };
    return transformedHeaderConfig;
  }
  private callStrapiHeader(query: string): Observable<HeaderConfig> {
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
  public getHeaderConfig(): Observable<HeaderConfig> {
    const queryCall: string = this.strapiPopulationService.createQsObject(
      this.apiHeader,
      this.cultureService.getCurrentCulture(),
      HeaderKey,
    );
    return this.callStrapiHeader(queryCall);
  }
}
