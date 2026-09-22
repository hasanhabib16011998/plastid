import { getPIAProjects } from '../../src/lib/payload'
import Projects from '../../src/views/Projects/Projects'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Our Projects | Plastid Interior & Architecture',
  description: 'Explore our portfolio of residential, commercial, and industrial interior design and architecture projects across Bangladesh.',
}

export default async function ProjectsPage() {
  const projects = await getPIAProjects()
  return <Projects initialProjects={projects} />
}
