import { notFound } from 'next/navigation'
import ServiceDetail from '../../../src/views/ServiceDetail/ServiceDetail'
import {
  SITE_URL,
  serviceData,
  allServicesList,
  getServiceBySlug,
} from '../../../src/data/servicesData'

// Pre-render all 15 dedicated service pages at build time for fast SEO indexing
export async function generateStaticParams() {
  return allServicesList.map((service) => ({
    slug: service.slug,
  }))
}

// Dynamic per-service SEO Metadata (Title, Meta Description, Keywords, Canonical, OpenGraph, Twitter)
export async function generateMetadata({ params }) {
  const { slug } = await params
  const service = getServiceBySlug(slug)

  if (!service) {
    return {
      title: 'Service Not Found | Plastid Interior & Architecture',
      robots: { index: false, follow: false },
    }
  }

  const canonicalUrl = `${SITE_URL}/services/${service.slug}`
  const metaTitle =
    service.seo?.metaTitle ||
    `${service.heroTitle} | Plastid Interior & Architecture`
  const metaDescription =
    service.seo?.metaDescription || service.shortText || service.description1
  const ogImage = service.mainImg
    ? `${SITE_URL}${service.mainImg}`
    : `${SITE_URL}/images/services/service-single/single-service-1.jpg`

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: service.seo?.keywords || [
      service.title,
      'Interior Design Dhaka',
      'Plastid Interior and Architecture',
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: canonicalUrl,
      siteName: 'Plastid Interior & Architecture',
      locale: 'en_BD',
      type: 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${service.heroTitle} - Plastid Interior & Architecture`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params
  const service = getServiceBySlug(slug)

  if (!service) {
    notFound()
  }

  const parentService = service.parentSlug
    ? serviceData[service.parentSlug]
    : null
  const canonicalUrl = `${SITE_URL}/services/${service.slug}`

  // Structured Data (Schema.org JSON-LD): Service + BreadcrumbList + FAQPage
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${canonicalUrl}#service`,
        name: service.heroTitle,
        serviceType: service.seo?.serviceType || service.title,
        description: service.seo?.metaDescription || service.description1,
        url: canonicalUrl,
        image: `${SITE_URL}${service.mainImg}`,
        provider: {
          '@type': 'HomeAndConstructionBusiness',
          name: 'Plastid Interior & Architecture',
          url: SITE_URL,
          telephone: '+8801768834417',
          email: 'plastidarchitecture@gmail.com',
          address: {
            '@type': 'PostalAddress',
            streetAddress:
              'House-11 (2nd Floor), Block-E, Sector-1, Aftab Nagar Main Rd',
            addressLocality: 'Dhaka',
            postalCode: '1212',
            addressCountry: 'BD',
          },
        },
        areaServed: [
          { '@type': 'City', name: 'Dhaka' },
          { '@type': 'Country', name: 'Bangladesh' },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: SITE_URL,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Services',
            item: `${SITE_URL}/services`,
          },
          ...(parentService
            ? [
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: parentService.title,
                  item: `${SITE_URL}/services/${parentService.slug}`,
                },
                {
                  '@type': 'ListItem',
                  position: 4,
                  name: service.title,
                  item: canonicalUrl,
                },
              ]
            : [
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: service.title,
                  item: canonicalUrl,
                },
              ]),
        ],
      },
      ...(service.faqs && service.faqs.length > 0
        ? [
            {
              '@type': 'FAQPage',
              '@id': `${canonicalUrl}#faq`,
              mainEntity: service.faqs.map((f) => ({
                '@type': 'Question',
                name: f.q,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: f.a,
                },
              })),
            },
          ]
        : []),
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServiceDetail slugProp={service.slug} />
    </>
  )
}
