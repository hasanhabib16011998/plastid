import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
    group: 'Administration',
    defaultColumns: ['email', 'isSuperAdmin', 'tenants'],
  },
  access: {
    // Only super-admins can create, update or delete users
    read: ({ req }) => Boolean(req.user),
    create: ({ req }) => Boolean(req.user?.isSuperAdmin),
    update: ({ req }) => Boolean(req.user?.isSuperAdmin),
    delete: ({ req }) => Boolean(req.user?.isSuperAdmin),
  },
  fields: [
    {
      name: 'isSuperAdmin',
      type: 'checkbox',
      label: 'Super Admin',
      defaultValue: false,
      admin: {
        description: 'Super admins have unrestricted access to all tenants and collections.',
      },
    },
    {
      name: 'tenants',
      type: 'relationship',
      relationTo: 'tenants',
      hasMany: true,
      label: 'Assigned Tenants',
      admin: {
        description: 'Which tenants this editor can manage.',
        condition: (data) => !data.isSuperAdmin,
      },
    },
  ],
}
