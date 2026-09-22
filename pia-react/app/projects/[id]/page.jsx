import { getPIAProjectByIdOrSlug, getPIAProjects } from '../../../src/lib/payload'
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
    return { title: 'Project Not Found | Plastid Interior' }
  }
  return {
    title: `${project.title} | Plastid Interior & Architecture`,
    description: project.summary || `View the ${project.title} project by Plastid Interior & Architecture.`,
    openGraph: {
      title: project.title,
      description: project.summary || '',
      images: project.img ? [{ url: project.img }] : [],
    },
  }
}

export default async function ProjectSinglePage({ params }) {
  const { id } = await params
  const project = await getPIAProjectByIdOrSlug(id)

  if (!project) {
    notFound()
  }

  return <ProjectSingle project={project} />
}
