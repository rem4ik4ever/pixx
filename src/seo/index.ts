import { DefaultSeoProps } from 'next-seo'
const defaultSeo: DefaultSeoProps = {
  title: 'ClientsTrust.me | Collection and show client testimonials with no coding skills',
  description: 'We provide testimonial collection and no code integration with your website',
  titleTemplate: '%s - ClientsTrust.me',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.clientstrust.me/',
    site_name: 'ClientsTrust.me',
    images: [
      {
        url: 'https://www.clientstrust.me/og_image_800_600_dark.png',
        width: 800,
        height: 600,
        alt: 'ClientsTrust.me OG dark',
      },
      {
        url: 'https://www.clientstrust.me/og_image_800_600.png',
        width: 800,
        height: 600,
        alt: 'ClientsTrust.me OG',
      },
      {
        url: 'https://www.clientstrust.me/og_image_800_600_alt_1.png',
        width: 800,
        height: 600,
        alt: 'ClientsTrust.me OG white',
      }
    ]
  },
  twitter: {
    handle: '@AksoLab',
    site: '@site',
    cardType: 'summary_large_image',
  },
};

export default defaultSeo
