import { FooterConfig } from './footer.entity';
import { HeaderConfig } from './header.entity';

export interface LayoutConfig {
  layout: {
    header: HeaderConfig;
    footer: FooterConfig;
  };
}
