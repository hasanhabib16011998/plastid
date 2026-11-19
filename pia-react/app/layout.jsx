import './globals.css'
import '../src/assets/css/style.css'
import '../src/assets/css/responsive.css'
import { SITE_URL } from '../src/data/servicesData'

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Plastid Interior & Architecture | Interior Design Firm in Dhaka, Bangladesh',
    template: '%s',
  },
  description:
    'Premier full-service interior design and architectural execution firm based in Dhaka, Bangladesh. Turnkey residential, commercial, restaurant, exterior, and 3D consultancy solutions.',
  openGraph: {
    type: 'website',
    locale: 'en_BD',
    url: SITE_URL,
    siteName: 'Plastid Interior & Architecture',
    title: 'Plastid Interior & Architecture | Interior Design Firm in Dhaka, Bangladesh',
    description:
      'Premier full-service interior design and architectural execution firm based in Dhaka, Bangladesh.',
    images: [
      {
        url: '/images/resources/about-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Plastid Interior & Architecture — Dhaka, Bangladesh',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Plastid Interior & Architecture | Interior Design Firm in Dhaka, Bangladesh',
    description:
      'Premier full-service interior design and architectural execution firm based in Dhaka, Bangladesh.',
    images: ['/images/resources/about-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/images/favicon/favicon.ico' },
      { url: '/images/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/images/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/favicon/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/images/favicon/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/images/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/images/favicon/site.webmanifest',
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'HomeAndConstructionBusiness',
      '@id': `${SITE_URL}#organization`,
      name: 'Plastid Interior & Architecture',
      url: SITE_URL,
      logo: `${SITE_URL}/images/resources/logo.png`,
      image: `${SITE_URL}/images/resources/about-image.jpg`,
      telephone: '+8801768834417',
      email: 'plastidarchitecture@gmail.com',
      priceRange: '$$',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'House-11 (2nd Floor), Block-E, Sector-1, Aftab Nagar Main Rd',
        addressLocality: 'Dhaka',
        postalCode: '1212',
        addressCountry: 'BD',
      },
      areaServed: [
        { '@type': 'City', name: 'Dhaka' },
        { '@type': 'Country', name: 'Bangladesh' },
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}#website`,
      url: SITE_URL,
      name: 'Plastid Interior & Architecture',
      publisher: { '@id': `${SITE_URL}#organization` },
      inLanguage: 'en-BD',
    },
  ],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
      </body>
    </html>
  )
}
