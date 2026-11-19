import { getPIAProjectByIdOrSlug, getPIAProjects } from '../../../src/lib/payload'
import { SITE_URL } from '../../../src/data/servicesData'
import ProjectSingle from '../../../src/views/ProjectSingle/ProjectSingle'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

// Pre-generate static paths for all known projects at build time
export async function generateStaticParams() {
  try {
    const projects = await getPIAProjects()
    return projects.map((p) => ({ id: p.slug || String(p.id) }))
  } catch {
    return []
  }
}

// Per-project SEO metadata
export async function generateMetadata({ params }) {
  const { id } = await params
  const project = await getPIAProjectByIdOrSlug(id)
  if (!project) {
    return {
      title: 'Project Not Found | Plastid Interior & Architecture',
      robots: { index: false, follow: false },
    }
  }

  const canonicalUrl = `${SITE_URL}/projects/${project.slug || project.id}`
  const description =
    project.summary ||
    `View the ${project.title} interior design and architecture project by Plastid Interior & Architecture.`

  return {
    title: `${project.title} | Plastid Interior & Architecture`,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${project.title} | Plastid Interior & Architecture`,
      description,
      url: canonicalUrl,
      siteName: 'Plastid Interior & Architecture',
      locale: 'en_BD',
      type: 'article',
      images: project.img ? [{ url: project.img, alt: project.title }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} | Plastid Interior & Architecture`,
      description,
      images: project.img ? [project.img] : [],
    },
  }
}

export default async function ProjectSinglePage({ params }) {
  const { id } = await params
  const project = await getPIAProjectByIdOrSlug(id)

  if (!project) {
    notFound()
  }

  const canonicalUrl = `${SITE_URL}/projects/${project.slug || project.id}`
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CreativeWork',
        '@id': `${canonicalUrl}#project`,
        name: project.title,
        description:
          project.summary ||
          `${project.title} interior design project by Plastid Interior & Architecture.`,
        url: canonicalUrl,
        ...(project.img ? { image: project.img } : {}),
        creator: {
          '@type': 'HomeAndConstructionBusiness',
          name: 'Plastid Interior & Architecture',
          url: SITE_URL,
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Projects', item: `${SITE_URL}/projects` },
          { '@type': 'ListItem', position: 3, name: project.title, item: canonicalUrl },
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
      <ProjectSingle project={project} />
    </>
  )
}
