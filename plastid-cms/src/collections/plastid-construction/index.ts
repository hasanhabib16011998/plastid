/**
 * Plastid Construction and Development — all 8 common collections
 * Admin group: "Plastid Construction"
 * Slug prefix:  pc-
 * MinIO prefix: plastid-construction/
 */
import type { CollectionSlug } from 'payload'
import {
  createMediaCollection,
  createPagesCollection,
  createProjectsCollection,
  createServicesCollection,
  createTeamCollection,
  createTestimonialsCollection,
  createBlogCollection,
  createSettingsCollection,
} from '@/collections/collectionFactory'

const GROUP = 'Plastid Construction'
const MEDIA = 'pc-media' as CollectionSlug
const TEAM  = 'pc-team'  as CollectionSlug

export const PCMedia        = createMediaCollection('pc-media', GROUP)
export const PCPages        = createPagesCollection('pc-pages', GROUP, MEDIA)
export const PCProjects     = createProjectsCollection('pc-projects', GROUP, MEDIA)
export const PCServices     = createServicesCollection('pc-services', GROUP, MEDIA)
export const PCTeam         = createTeamCollection('pc-team', GROUP, MEDIA)
export const PCTestimonials = createTestimonialsCollection('pc-testimonials', GROUP, MEDIA)
export const PCBlog         = createBlogCollection('pc-blog', GROUP, TEAM, MEDIA)
export const PCSettings     = createSettingsCollection('pc-settings', GROUP, MEDIA)
