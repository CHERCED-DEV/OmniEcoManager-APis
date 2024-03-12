import { ImgsConfig } from 'src/main/shared/entities/strapi.actions';
import {
  ButtonGeneralConfig,
  InputConfig,
  LinkConfig,
} from '../../../../shared/entities/entitys.interface';

interface SocialMediaConfig {
  link: LinkConfig;
  icon: string;
}

interface CopyrightConfig {
  year: string;
  company_name: string;
  rights: string;
  coorp_logo: ImgsConfig;
}

interface NewsLetterConfig {
  title: string;
  input: InputConfig;
  button: ButtonGeneralConfig;
}

export interface FooterConfig {
  brand_logo: ImgsConfig;
  newsletter: NewsLetterConfig;
  socialmedia: SocialMediaConfig[];
  copyrigth: CopyrightConfig;
}
