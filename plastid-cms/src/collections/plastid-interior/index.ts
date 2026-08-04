/**
 * Plastid Interior — all 8 collections
 * Admin group: "Plastid Interior"
 * Slug prefix:  pi-
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
const MEDIA = 'pi-media' as CollectionSlug
const TEAM  = 'pi-team'  as CollectionSlug

export const PIMedia        = createMediaCollection('pi-media', GROUP)
export const PIPages        = createPagesCollection('pi-pages', GROUP, MEDIA)
export const PIProjects     = createProjectsCollection('pi-projects', GROUP, MEDIA)
export const PIServices     = createServicesCollection('pi-services', GROUP, MEDIA)
export const PITeam         = createTeamCollection('pi-team', GROUP, MEDIA)
export const PITestimonials = createTestimonialsCollection('pi-testimonials', GROUP, MEDIA)
export const PIBlog         = createBlogCollection('pi-blog', GROUP, TEAM, MEDIA)
export const PISettings     = createSettingsCollection('pi-settings', GROUP, MEDIA)
