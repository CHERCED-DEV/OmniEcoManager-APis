import {
  ButtonGeneralConfig,
  ImgsConfig,
  InputConfig,
  LinkConfig,
} from '../../../shared/entities/entitys.interface';

interface SocialMediaConfig {
  link: LinkConfig;
  img: ImgsConfig;
}

interface CopyrightConfig {
  title: string;
  img: ImgsConfig;
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
  copyright: CopyrightConfig;
}
