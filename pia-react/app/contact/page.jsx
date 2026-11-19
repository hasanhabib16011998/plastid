import Contact from '../../src/views/Contact/Contact'
import { SITE_URL } from '../../src/data/servicesData'

export const metadata = {
  title: 'Contact Us & Book a Free Consultation | Plastid Interior & Architecture',
  description:
    'Get in touch with Plastid Interior & Architecture in Aftab Nagar, Dhaka. Book a free interior design consultation, request an itemized BOQ, or call +880 1768-834417.',
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  openGraph: {
    title: 'Contact Us | Plastid Interior & Architecture',
    description:
      'Book a free architectural & interior design consultation in Dhaka, Bangladesh.',
    url: `${SITE_URL}/contact`,
    siteName: 'Plastid Interior & Architecture',
    locale: 'en_BD',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us | Plastid Interior & Architecture',
    description:
      'Book a free architectural & interior design consultation in Dhaka, Bangladesh.',
  },
}

export default function ContactPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ContactPage',
        '@id': `${SITE_URL}/contact#contactpage`,
        url: `${SITE_URL}/contact`,
        name: 'Contact Plastid Interior & Architecture',
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${SITE_URL}/contact#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Contact', item: `${SITE_URL}/contact` },
        ],
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Contact />
    </>
  )
}
