/**
 * Plastid Digital — all 8 common collections
 * Admin group: "Plastid Digital"
 * Slug prefix:  pd-
 * MinIO prefix: plastid-digital/
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
} from '../collectionFactory'

const GROUP = 'Plastid Digital'
const MEDIA: CollectionSlug = 'pd-media'
const TEAM: CollectionSlug  = 'pd-team'

export const PDMedia        = createMediaCollection('pd-media', GROUP)
export const PDPages        = createPagesCollection('pd-pages', GROUP, MEDIA)
export const PDProjects     = createProjectsCollection('pd-projects', GROUP, MEDIA)
export const PDServices     = createServicesCollection('pd-services', GROUP, MEDIA)
export const PDTeam         = createTeamCollection('pd-team', GROUP, MEDIA)
export const PDTestimonials = createTestimonialsCollection('pd-testimonials', GROUP, MEDIA)
export const PDBlog         = createBlogCollection('pd-blog', GROUP, TEAM, MEDIA)
export const PDSettings     = createSettingsCollection('pd-settings', GROUP, MEDIA)
