import { getPIATeam, getMediaUrl } from '../../src/lib/payload'
import About from '../../src/views/About/About'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'About Us | Plastid Interior & Architecture',
  description: 'Learn about Plastid Interior & Architecture — our story, values, and the expert team behind our bespoke design-build projects.',
}

export default async function AboutPage() {
  const cmsTeam = await getPIATeam()

  // Format team data server-side (same logic previously in About.jsx useEffect)
  const team = (cmsTeam || []).map((m) => ({
    name: m.name,
    role: m.role,
    img: getMediaUrl(m.photo) || '/images/team/v2-1.jpg',
  }))

  return <About initialTeam={team} />
}
