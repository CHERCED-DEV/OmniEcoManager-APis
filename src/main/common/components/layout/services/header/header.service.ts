import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { BaseService } from 'src/main/core/extensions/base-service/base.service';
import { HttpHandlerService } from 'src/main/core/helpers/http-handler/http-handler.service';
import { StrapiPopulationService } from 'src/main/core/helpers/strapi-population/strapi-population.service';
import { strapiResponse } from 'src/main/shared/entities/strapi.actions';
import { HeaderConfig } from '../../entities/header.entity';
import { HeaderKey } from '../../keys/header/header.key';

@Injectable()
export class HeaderService extends BaseService<HeaderConfig> {
  constructor(
    protected httpHandlerService: HttpHandlerService,
    protected strapiPopulationService: StrapiPopulationService,
  ) {
    super(
      httpHandlerService,
      strapiPopulationService,
      'COMMON_HEADER',
      HeaderKey,
    );
  }

  protected transformResponse(response: strapiResponse): HeaderConfig {
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

  public getHeaderConfig(culture: string): Observable<HeaderConfig> {
    const headerData: Observable<HeaderConfig> = this.getConfig(culture);
    return headerData;
  }
}
