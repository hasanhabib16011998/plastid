import { getPIAProjects, getPIATestimonials } from '../src/lib/payload'
import Home from '../src/views/Home/Home'

// Always render on the server at request time — data comes from the CMS
// which is only reachable inside Docker, not at build time.
export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const [projects, testimonials] = await Promise.all([
    getPIAProjects(),
    getPIATestimonials(),
  ])

  return <Home initialProjects={projects} initialTestimonials={testimonials} />
}
