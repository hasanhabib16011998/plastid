import { getPIATeam, getMediaUrl } from '../../src/lib/payload'
import { SITE_URL } from '../../src/data/servicesData'
import About from '../../src/views/About/About'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'About Us | Plastid Interior & Architecture',
  description:
    'Learn about Plastid Interior & Architecture — our story, design philosophy, in-house factory craftsmanship, and the expert architects and engineers in Dhaka, Bangladesh.',
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: {
    title: 'About Us | Plastid Interior & Architecture',
    description:
      'Learn about Plastid Interior & Architecture — our story, values, and expert design-build team in Dhaka.',
    url: `${SITE_URL}/about`,
    siteName: 'Plastid Interior & Architecture',
    locale: 'en_BD',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us | Plastid Interior & Architecture',
    description:
      'Learn about Plastid Interior & Architecture — our story, values, and expert design-build team in Dhaka.',
  },
}

export default async function AboutPage() {
  const cmsTeam = await getPIATeam()

  // Format team data server-side (same logic previously in About.jsx useEffect)
  const team = (cmsTeam || []).map((m) => ({
    name: m.name,
    role: m.role,
    img: getMediaUrl(m.photo) || '/images/team/v2-1.jpg',
  }))

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AboutPage',
        '@id': `${SITE_URL}/about#aboutpage`,
        url: `${SITE_URL}/about`,
        name: 'About Plastid Interior & Architecture',
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${SITE_URL}/about#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'About Us', item: `${SITE_URL}/about` },
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
      <About initialTeam={team} />
    </>
  )
}
