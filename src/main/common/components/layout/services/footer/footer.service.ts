import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { BaseService } from 'src/main/core/extensions/base-service/base.service';
import { HttpHandlerService } from 'src/main/core/helpers/http-handler/http-handler.service';
import { StrapiPopulationService } from 'src/main/core/helpers/strapi-population/strapi-population.service';
import { strapiResponse } from 'src/main/shared/entities/strapi.actions';
import { FooterConfig } from '../../entities/footer.entity';
import { FooterKey } from '../../keys/footer/footer.key';

@Injectable()
export class FooterService extends BaseService<FooterConfig> {
  constructor(
    protected httpHandlerService: HttpHandlerService,
    protected strapiPopulationService: StrapiPopulationService,
  ) {
    super(
      httpHandlerService,
      strapiPopulationService,
      'COMMON_FOOTER',
      FooterKey,
    );
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

  public getFooterConfig(culture: string): Observable<FooterConfig> {
    const footerData: Observable<FooterConfig> = this.getConfig(culture);
    return footerData;
  }
}
