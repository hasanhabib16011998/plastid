import { getPIAProjects, getPIATestimonials } from '../src/lib/payload'
import { SITE_URL } from '../src/data/servicesData'
import Home from '../src/views/Home/Home'

// Always render on the server at request time — data comes from the CMS
// which is only reachable inside Docker, not at build time.
export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Plastid Interior & Architecture | Premier Interior Design Firm in Dhaka, Bangladesh',
  description:
    'Turnkey interior design and architectural execution in Dhaka, Bangladesh. Residential apartments, duplexes, commercial offices, restaurants, custom furniture, and 3D consultancy starting at BDT 40/sqft with 50% fee refund.',
  keywords: [
    'interior design firm Dhaka',
    'interior design Bangladesh',
    'turnkey interior design Dhaka',
    'residential interior design Dhaka',
    'commercial interior design Bangladesh',
    'Plastid Interior and Architecture',
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: 'Plastid Interior & Architecture | Premier Interior Design Firm in Dhaka',
    description:
      'Turnkey residential, commercial, restaurant, and architectural design-build solutions in Dhaka, Bangladesh.',
    url: SITE_URL,
    siteName: 'Plastid Interior & Architecture',
    locale: 'en_BD',
    type: 'website',
    images: [
      {
        url: '/images/resources/about-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Plastid Interior & Architecture — Turnkey Interior Design in Dhaka',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Plastid Interior & Architecture | Interior Design Firm in Dhaka',
    description:
      'Turnkey residential, commercial, restaurant, and architectural design-build solutions in Dhaka, Bangladesh.',
    images: ['/images/resources/about-image.jpg'],
  },
}

export default async function HomePage() {
  const [projects, testimonials] = await Promise.all([
    getPIAProjects(),
    getPIATestimonials(),
  ])

  return <Home initialProjects={projects} initialTestimonials={testimonials} />
}
