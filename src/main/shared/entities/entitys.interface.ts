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
  label: string;
}

export interface ButtonGeneralConfig {
  label: string;
  type: 'button' | 'submit' | 'reset';
  button_id: string;
  button_class: 'primary' | 'secundary' | 'page';
}
