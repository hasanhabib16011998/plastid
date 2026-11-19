import { getPIAProjects } from '../../src/lib/payload'
import { SITE_URL } from '../../src/data/servicesData'
import Projects from '../../src/views/Projects/Projects'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Our Projects & Portfolio | Plastid Interior & Architecture',
  description:
    'Explore our portfolio of completed residential, commercial, restaurant, and architectural interior design projects across Dhaka and Bangladesh.',
  alternates: {
    canonical: `${SITE_URL}/projects`,
  },
  openGraph: {
    title: 'Our Projects & Portfolio | Plastid Interior & Architecture',
    description:
      'Explore our portfolio of residential, commercial, and architectural interior design projects across Bangladesh.',
    url: `${SITE_URL}/projects`,
    siteName: 'Plastid Interior & Architecture',
    locale: 'en_BD',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Projects & Portfolio | Plastid Interior & Architecture',
    description:
      'Explore our portfolio of residential, commercial, and architectural interior design projects across Bangladesh.',
  },
}

export default async function ProjectsPage() {
  const projects = await getPIAProjects()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${SITE_URL}/projects#collection`,
        url: `${SITE_URL}/projects`,
        name: 'Plastid Interior & Architecture Portfolio',
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${SITE_URL}/projects#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Projects', item: `${SITE_URL}/projects` },
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
      <Projects initialProjects={projects} />
    </>
  )
}
