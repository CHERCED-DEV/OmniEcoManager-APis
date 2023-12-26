import { ImgsConfig } from 'src/main/shared/entities/strapi.actions';
import {
  ButtonGeneralConfig,
  InputConfig,
  LinkConfig,
} from '../../../shared/entities/entitys.interface';

interface AlertsConfig {
  link: LinkConfig;
  main_text: string;
}

interface SearchConfig {
  input: InputConfig;
  button: ButtonGeneralConfig;
}

export interface HeaderConfig {
  brand_logo: ImgsConfig;
  search_nav: SearchConfig;
  alerts: AlertsConfig[];
}
