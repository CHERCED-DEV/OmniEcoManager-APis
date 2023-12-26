import { ImgsConfig } from 'src/main/shared/entities/strapi.actions';
import {
  ButtonGeneralConfig,
  InputConfig,
  LinkConfig,
} from '../../../shared/entities/entitys.interface';

interface AlertsConfig {
  main_text: string;
  label: string;
  link: LinkConfig;
}

interface SearchConfig {
  input: InputConfig;
  button: ButtonGeneralConfig;
}

export interface HeaderConfig {
  brand_logo: ImgsConfig;
  search: SearchConfig;
  alert: AlertsConfig[];
}
