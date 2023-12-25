import { HeaderConfig } from '../../entities/header.entity';

export const headerDataEs: HeaderConfig = {
  brand_logo: {
    src: 'ruta-del-logo.png',
    alt: 'Logo de la empresa',
  },
  search: {
    input: {
      type: 'text',
      placeholder: 'Buscar...',
    },
    button: 'Buscar',
  },
  alert: [
    {
      main_text: '¡Oferta especial!',
      label: 'Ver detalles',
      link: [
        {
          href: '/oferta-especial',
          label: 'Más información',
        },
      ],
    },
  ],
  user_panel: [
    {
      href: '/iniciar-sesion',
      label: 'Iniciar sesión',
    },
    {
      href: '/registrarse',
      label: 'Registrarse',
    },
  ],
};

export const headerDataEn: HeaderConfig = {
  brand_logo: {
    src: 'logo-path.png',
    alt: 'Company Logo',
  },
  search: {
    input: {
      type: 'text',
      placeholder: 'Search...',
    },
    button: 'Search',
  },
  alert: [
    {
      main_text: 'Special Offer!',
      label: 'View Details',
      link: [
        {
          href: '/special-offer',
          label: 'Learn More',
        },
      ],
    },
  ],
  user_panel: [
    {
      href: '/login',
      label: 'Log In',
    },
    {
      href: '/register',
      label: 'Register',
    },
  ],
};
