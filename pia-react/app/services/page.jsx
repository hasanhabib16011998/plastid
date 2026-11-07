import Services from '../../src/views/Services/Services'
import { SITE_URL, allServicesList } from '../../src/data/servicesData'

export const metadata = {
  title:
    'Interior Design & Architecture Services in Dhaka | Residential, Commercial & Exterior | Plastid',
  description:
    'Explore Plastid Interior & Architecture’s turnkey services in Dhaka: Full Apartment, Duplex & Villa, Modular Kitchen, Office & Corporate, Restaurant, Exterior Design, Custom Furniture, and 3D Consultancy.',
  keywords: [
    'interior design services Dhaka',
    'residential interior design Bangladesh',
    'commercial office interior Dhaka',
    'restaurant interior design Dhaka',
    'exterior and landscape design Bangladesh',
    'Plastid Interior and Architecture',
  ],
  alternates: {
    canonical: `${SITE_URL}/services`,
  },
  openGraph: {
    title: 'Our Interior & Architecture Services | Plastid Interior & Architecture',
    description:
      'Turnkey residential, commercial, restaurant, exterior, custom furniture, and 3D design consultancy services in Dhaka, Bangladesh.',
    url: `${SITE_URL}/services`,
    siteName: 'Plastid Interior & Architecture',
    locale: 'en_BD',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function ServicesPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Plastid Interior & Architecture Services',
    url: `${SITE_URL}/services`,
    itemListElement: allServicesList.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: service.heroTitle,
      url: `${SITE_URL}/services/${service.slug}`,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Services />
    </>
  )
}
