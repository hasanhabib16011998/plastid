import type { CollectionConfig } from 'payload'

export const Tenants: CollectionConfig = {
  slug: 'tenants',
  admin: {
    useAsTitle: 'name',
    group: 'Administration',
    defaultColumns: ['name', 'slug', 'domain'],
  },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user?.isSuperAdmin),
    update: ({ req }) => Boolean(req.user?.isSuperAdmin),
    delete: ({ req }) => Boolean(req.user?.isSuperAdmin),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Tenant Name',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug',
      admin: { description: 'URL-friendly identifier, e.g. plastid-interior' },
    },
    {
      name: 'domain',
      type: 'text',
      label: 'Production Domain',
      admin: { description: 'e.g. plastidinterior.com' },
    },
    {
      name: 'previewDomain',
      type: 'text',
      label: 'Preview / Staging Domain',
      admin: { description: 'Used for draft preview links, e.g. staging.plastidinterior.com' },
    },
  ],
}
