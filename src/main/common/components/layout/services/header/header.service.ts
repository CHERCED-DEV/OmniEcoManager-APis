import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/main/core/extensions/base-service/base.service';
import { strapiResponse } from 'src/main/shared/entities/strapi.actions';
import { HeaderConfig } from '../../entities/header.entity';
import { HeaderKey } from '../../keys/header/header.key';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class HeaderService extends BaseService<HeaderConfig> {
  constructor() {
    super('COMMON_HEADER', HeaderKey);
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

  public async getHeaderConfig(culture: string): Promise<HeaderConfig> {
    try {
      const headerData: HeaderConfig = await firstValueFrom(
        this.getConfig(culture),
      );
      return headerData;
    } catch (error) {
      console.error('Error fetching header config:', error);
      throw error;
    }
  }
}
