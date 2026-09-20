import type { CollectionSlug, Field } from 'payload'
import { tenantAccess } from '../lib/accessHelpers'

/** Shared SEO field group helper */
export const seoFields = (mediaSlug: CollectionSlug): Field[] => [
  {
    name: 'seo',
    type: 'group',
    label: 'SEO',
    fields: [
      { name: 'title', type: 'text', label: 'Meta Title' },
      { name: 'description', type: 'textarea', label: 'Meta Description' },
      { name: 'ogImage', type: 'upload', relationTo: mediaSlug, label: 'OG Image' },
    ],
  },
]

/** Shared Hero block field group helper */
export const heroFields = (mediaSlug: CollectionSlug): Field[] => [
  {
    name: 'hero',
    type: 'group',
    label: 'Hero Section',
    fields: [
      { name: 'heading', type: 'text', label: 'Heading' },
      { name: 'subheading', type: 'textarea', label: 'Subheading' },
      { name: 'backgroundImage', type: 'upload', relationTo: mediaSlug, label: 'Background Image' },
      {
        name: 'cta',
        type: 'group',
        label: 'Call to Action',
        fields: [
          { name: 'label', type: 'text', label: 'Button Label' },
          { name: 'url', type: 'text', label: 'Button URL' },
        ],
      },
    ],
  },
]

/** Helper for generating tenant-based access control rules */
export const collectionAccess = (tenantSlug: string) => ({
  read: () => true,
  create: tenantAccess(tenantSlug),
  update: tenantAccess(tenantSlug),
  delete: tenantAccess(tenantSlug),
})
