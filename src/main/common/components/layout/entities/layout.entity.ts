import { FooterConfig } from './footer.entity';
import { HeaderConfig } from './header.entity';

export interface CommonConfig {
  common: {
    layout: {
      header: HeaderConfig;
      footer: FooterConfig;
    };
  };
}
