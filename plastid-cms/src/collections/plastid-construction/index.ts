/**
 * Plastid Construction and Development — all 8 common collections
 * Admin group: "Plastid Construction"
 * Slug prefix:  pcd-
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
const MEDIA = 'pcd-media' as CollectionSlug
const TEAM  = 'pcd-team'  as CollectionSlug

export const PCDMedia        = createMediaCollection('pcd-media', GROUP)
export const PCDPages        = createPagesCollection('pcd-pages', GROUP, MEDIA)
export const PCDProjects     = createProjectsCollection('pcd-projects', GROUP, MEDIA)
export const PCDServices     = createServicesCollection('pcd-services', GROUP, MEDIA)
export const PCDTeam         = createTeamCollection('pcd-team', GROUP, MEDIA)
export const PCDTestimonials = createTestimonialsCollection('pcd-testimonials', GROUP, MEDIA)
export const PCDBlog         = createBlogCollection('pcd-blog', GROUP, TEAM, MEDIA)
export const PCDSettings     = createSettingsCollection('pcd-settings', GROUP, MEDIA)
