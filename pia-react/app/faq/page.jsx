import FAQ from '../../src/views/FAQ/FAQ'
import { SITE_URL } from '../../src/data/servicesData'
import { faqItems } from '../../src/data/faqData'

export const metadata = {
  title: 'Frequently Asked Questions | Plastid Interior & Architecture',
  description:
    'Find answers to common questions about interior design pricing (BDT 40/sqft with 50% rebate), timelines, consultation process, and turnkey execution in Dhaka, Bangladesh.',
  alternates: {
    canonical: `${SITE_URL}/faq`,
  },
  openGraph: {
    title: 'Frequently Asked Questions | Plastid Interior & Architecture',
    description:
      'Answers on interior design cost, timelines, 3D consultancy fees, and turnkey execution across Bangladesh.',
    url: `${SITE_URL}/faq`,
    siteName: 'Plastid Interior & Architecture',
    locale: 'en_BD',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Frequently Asked Questions | Plastid Interior & Architecture',
    description:
      'Answers on interior design cost, timelines, 3D consultancy fees, and turnkey execution across Bangladesh.',
  },
}

export default function FAQPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FAQPage',
        '@id': `${SITE_URL}/faq#faq`,
        mainEntity: faqItems.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${SITE_URL}/faq#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'FAQ', item: `${SITE_URL}/faq` },
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
      <FAQ />
    </>
  )
}
