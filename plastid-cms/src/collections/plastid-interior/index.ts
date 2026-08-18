/**
 * Plastid Interior — all 8 collections
 * Admin group: "Plastid Interior"
 * Slug prefix:  pia-
 * MinIO prefix: plastid-interior/
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

const GROUP = 'Plastid Interior'
const MEDIA = 'pia-media' as CollectionSlug
const TEAM  = 'pia-team'  as CollectionSlug

export const PIAMedia        = createMediaCollection('pia-media', GROUP)
export const PIAPages        = createPagesCollection('pia-pages', GROUP, MEDIA)
export const PIAProjects     = createProjectsCollection('pia-projects', GROUP, MEDIA)
export const PIAServices     = createServicesCollection('pia-services', GROUP, MEDIA)
export const PIATeam         = createTeamCollection('pia-team', GROUP, MEDIA)
export const PIATestimonials = createTestimonialsCollection('pia-testimonials', GROUP, MEDIA)
export const PIABlog         = createBlogCollection('pia-blog', GROUP, TEAM, MEDIA)
export const PIASettings     = createSettingsCollection('pia-settings', GROUP, MEDIA)
