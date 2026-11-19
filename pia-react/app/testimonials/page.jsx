import { getAllPIATestimonials } from '../../src/lib/payload'
import { SITE_URL } from '../../src/data/servicesData'
import TestimonialsView from '../../src/views/Testimonials/Testimonials'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Client Testimonials & Reviews | Plastid Interior & Architecture',
  description:
    'Read verified client testimonials and reviews about working with Plastid Interior & Architecture on residential and commercial interior projects in Dhaka, Bangladesh.',
  alternates: {
    canonical: `${SITE_URL}/testimonials`,
  },
  openGraph: {
    title: 'Client Testimonials & Reviews | Plastid Interior & Architecture',
    description:
      'Read what our clients say about their experience working with Plastid Interior & Architecture.',
    url: `${SITE_URL}/testimonials`,
    siteName: 'Plastid Interior & Architecture',
    locale: 'en_BD',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Client Testimonials & Reviews | Plastid Interior & Architecture',
    description:
      'Read what our clients say about their experience working with Plastid Interior & Architecture.',
  },
}

export default async function TestimonialsPage() {
  const testimonials = await getAllPIATestimonials()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${SITE_URL}/testimonials#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Testimonials', item: `${SITE_URL}/testimonials` },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TestimonialsView initialTestimonials={testimonials} />
    </>
  )
}
