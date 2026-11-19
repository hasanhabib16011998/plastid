import { SITE_URL, allServicesList } from '../src/data/servicesData'
import { getPIAProjects } from '../src/lib/payload'

export const dynamic = 'force-dynamic'

export default async function sitemap() {
  const now = new Date()

  const staticRoutes = [
    { url: `${SITE_URL}`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE_URL}/services`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/projects`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/testimonials`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/faq`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
  ]

  const serviceRoutes = allServicesList.map((service) => ({
    url: `${SITE_URL}/services/${service.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: service.parentSlug ? 0.8 : 0.85,
  }))

  let projectRoutes = []
  try {
    const projects = await getPIAProjects()
    if (Array.isArray(projects)) {
      projectRoutes = projects
        .filter((p) => p?.slug)
        .map((p) => ({
          url: `${SITE_URL}/projects/${p.slug}`,
          lastModified: p.updatedAt ? new Date(p.updatedAt) : now,
          changeFrequency: 'monthly',
          priority: 0.75,
        }))
    }
  } catch {
    // Fallback gracefully if CMS is unreachable during static generation
  }

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes]
}
