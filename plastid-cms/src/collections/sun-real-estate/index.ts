/**
 * Sun Real Estate — all 8 common collections
 * Admin group: "Sun Real Estate"
 * Slug prefix:  sre-
 * MinIO prefix: sun-real-estate/
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

const GROUP = 'Sun Real Estate'
const MEDIA = 'sre-media' as CollectionSlug
const TEAM  = 'sre-team'  as CollectionSlug

export const SREMedia        = createMediaCollection('sre-media', GROUP)
export const SREPages        = createPagesCollection('sre-pages', GROUP, MEDIA)
export const SREProjects     = createProjectsCollection('sre-projects', GROUP, MEDIA)
export const SREServices     = createServicesCollection('sre-services', GROUP, MEDIA)
export const SRETeam         = createTeamCollection('sre-team', GROUP, MEDIA)
export const SRETestimonials = createTestimonialsCollection('sre-testimonials', GROUP, MEDIA)
export const SREBlog         = createBlogCollection('sre-blog', GROUP, TEAM, MEDIA)
export const SRESettings     = createSettingsCollection('sre-settings', GROUP, MEDIA)
