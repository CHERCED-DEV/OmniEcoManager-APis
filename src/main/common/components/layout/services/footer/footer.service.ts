import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/main/core/extensions/base-service/base.service';
import { strapiResponse } from 'src/main/shared/entities/strapi.actions';
import { FooterConfig } from '../../entities/footer.entity';
import { FooterKey } from '../../keys/footer/footer.key';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class FooterService extends BaseService<FooterConfig> {
  constructor() {
    super('COMMON_FOOTER', FooterKey);
  }

  protected transformResponse(response: strapiResponse): FooterConfig {
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

  public async getFooterConfig(culture: string): Promise<FooterConfig> {
    try {
      const footerData: FooterConfig = await firstValueFrom(
        this.getConfig(culture),
      );
      return footerData;
    } catch (error) {
      console.error('Error fetching header config:', error);
      throw error;
    }
  }
}
