import { FooterConfig } from '../../entities/footer.entity';

export const footerDataEs: FooterConfig = {
  brand_logo: {
    src: 'logo-footer.png',
    alt: 'Logo de la Empresa',
  },
  newsletter: {
    title: 'Suscríbete a nuestro boletín',
    input: {
      type: 'email',
      placeholder: 'Tu correo electrónico',
    },
    button: {
      label: 'Suscribirse',
      type: 'button',
      ariaLabel: 'Suscribirse',
    },
  },
  socialmedia: [
    {
      link: {
        href: 'https://www.facebook.com/',
        label: 'Facebook',
      },
      img: {
        src: 'ruta/a/la/imagen/facebook.png',
        alt: 'Icono de Facebook',
      },
    },
    {
      link: {
        href: 'https://www.twitter.com/',
        label: 'Twitter',
      },
      img: {
        src: 'ruta/a/la/imagen/twitter.png',
        alt: 'Icono de Twitter',
      },
    },
    {
      link: {
        href: 'https://www.instagram.com/',
        label: 'Instagram',
      },
      img: {
        src: 'ruta/a/la/imagen/instagram.png',
        alt: 'Icono de Instagram',
      },
    },
    {
      link: {
        href: 'https://www.linkedin.com/',
        label: 'LinkedIn',
      },
      img: {
        src: 'ruta/a/la/imagen/linkedin.png',
        alt: 'Icono de LinkedIn',
      },
    },
    {
      link: {
        href: 'https://www.youtube.com/',
        label: 'YouTube',
      },
      img: {
        src: 'ruta/a/la/imagen/youtube.png',
        alt: 'Icono de YouTube',
      },
    },
    {
      link: {
        href: 'https://www.pinterest.com/',
        label: 'Pinterest',
      },
      img: {
        src: 'ruta/a/la/imagen/pinterest.png',
        alt: 'Icono de Pinterest',
      },
    },
    {
      link: {
        href: 'https://www.snapchat.com/',
        label: 'Snapchat',
      },
      img: {
        src: 'ruta/a/la/imagen/snapchat.png',
        alt: 'Icono de Snapchat',
      },
    },
  ],
  copyright: {
    title: '© 2023 Nombre de la Empresa. Todos los derechos reservados.',
    img: {
      src: 'logo-footer.png',
      alt: 'Logo de la Empresa',
    },
  },
};

export const footerDataEn: FooterConfig = {
  brand_logo: {
    src: 'footer-logo.png',
    alt: 'Company Logo',
  },
  newsletter: {
    title: 'Subscribe to our newsletter',
    input: {
      type: 'email',
      placeholder: 'Your email',
    },
    button: {
      label: 'Subscribe',
      type: 'button',
      ariaLabel: 'Subscribe',
    },
  },
  socialmedia: [
    {
      link: {
        href: 'https://www.facebook.com/',
        label: 'Facebook',
      },
      img: {
        src: 'path/to/image/facebook.png',
        alt: 'Facebook Icon',
      },
    },
    {
      link: {
        href: 'https://www.twitter.com/',
        label: 'Twitter',
      },
      img: {
        src: 'path/to/image/twitter.png',
        alt: 'Twitter Icon',
      },
    },
    {
      link: {
        href: 'https://www.instagram.com/',
        label: 'Instagram',
      },
      img: {
        src: 'path/to/image/instagram.png',
        alt: 'Instagram Icon',
      },
    },
    {
      link: {
        href: 'https://www.linkedin.com/',
        label: 'LinkedIn',
      },
      img: {
        src: 'path/to/image/linkedin.png',
        alt: 'LinkedIn Icon',
      },
    },
    {
      link: {
        href: 'https://www.youtube.com/',
        label: 'YouTube',
      },
      img: {
        src: 'path/to/image/youtube.png',
        alt: 'YouTube Icon',
      },
    },
    {
      link: {
        href: 'https://www.pinterest.com/',
        label: 'Pinterest',
      },
      img: {
        src: 'path/to/image/pinterest.png',
        alt: 'Pinterest Icon',
      },
    },
    {
      link: {
        href: 'https://www.snapchat.com/',
        label: 'Snapchat',
      },
      img: {
        src: 'path/to/image/snapchat.png',
        alt: 'Snapchat Icon',
      },
    },
  ],
  copyright: {
    title: '© 2023 Company Name. All rights reserved.',
    img: {
      src: 'footer-logo.png',
      alt: 'Company Logo',
    },
  },
};
