export interface ImgsConfig {
  src: string;
  alt: string;
}

export interface LinkConfig {
  href: string;
  label: string;
}

export interface InputConfig {
  type:
    | 'text'
    | 'password'
    | 'email'
    | 'number'
    | 'date'
    | 'checkbox'
    | 'radio';
  placeholder: string;
  value?: string | number | boolean;
}

export interface ButtonGeneralConfig {
  label: string;
  type: 'button' | 'submit' | 'reset';
  ariaLabel: string;
}
