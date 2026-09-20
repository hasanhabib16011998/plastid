import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { collectionAccess, heroFields, seoFields } from '../helpers'

const GROUP = 'Plastid Construction'
const TENANT_SLUG = 'plastid-construction'

export const PCDMedia: CollectionConfig = {
  slug: 'pcd-media',
  upload: {
    staticDir: '../public/media/pcd-media',
    mimeTypes: ['image/*', 'application/pdf', 'video/*'],
  },
  admin: {
    group: GROUP,
    useAsTitle: 'filename',
  },
  access: collectionAccess(TENANT_SLUG),
  fields: [
    { name: 'alt', type: 'text', label: 'Alt Text' },
    { name: 'caption', type: 'text', label: 'Caption' },
  ],
}

export const PCDPages: CollectionConfig = {
  slug: 'pcd-pages',
  admin: {
    group: GROUP,
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug'],
    preview: (doc) => {
      const domain = process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000'
      return `${domain}/preview?slug=${doc.slug}&collection=pcd-pages`
    },
  },
  access: collectionAccess(TENANT_SLUG),
  fields: [
    { name: 'title', type: 'text', required: true, label: 'Page Title' },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug',
      admin: { description: 'URL path, e.g. "about" for /about' },
    },
    ...heroFields('pcd-media'),
    {
      name: 'content',
      type: 'richText',
      label: 'Page Content',
      editor: lexicalEditor({}),
    },
    ...seoFields('pcd-media'),
  ],
}

export const PCDProjects: CollectionConfig = {
  slug: 'pcd-projects',
  admin: {
    group: GROUP,
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'year'],
    preview: (doc) => {
      const domain = process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000'
      return `${domain}/preview?slug=${doc.slug}&collection=pcd-projects`
    },
  },
  access: collectionAccess(TENANT_SLUG),
  fields: [
    { name: 'title', type: 'text', required: true, label: 'Project Title' },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug',
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'pcd-media',
      label: 'Thumbnail Image',
    },
    {
      name: 'images',
      type: 'array',
      label: 'Gallery Images',
      fields: [
        { name: 'image', type: 'upload', relationTo: 'pcd-media' },
        { name: 'caption', type: 'text' },
      ],
    },
    {
      name: 'category',
      type: 'text',
      label: 'Category',
      admin: { description: 'e.g. Residential, Commercial, Renovation' },
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Project Description',
      editor: lexicalEditor({}),
    },
    { name: 'client', type: 'text', label: 'Client Name' },
    {
      name: 'year',
      type: 'number',
      label: 'Year Completed',
      min: 2000,
      max: 2099,
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Tags',
      fields: [{ name: 'tag', type: 'text' }],
    },
    ...seoFields('pcd-media'),
  ],
}

export const PCDServices: CollectionConfig = {
  slug: 'pcd-services',
  admin: {
    group: GROUP,
    useAsTitle: 'title',
  },
  access: collectionAccess(TENANT_SLUG),
  fields: [
    { name: 'title', type: 'text', required: true, label: 'Service Name' },
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'pcd-media',
      label: 'Service Icon / Image',
    },
    { name: 'shortDescription', type: 'textarea', label: 'Short Description (for cards)' },
    {
      name: 'description',
      type: 'richText',
      label: 'Full Description',
      editor: lexicalEditor({}),
    },
    {
      name: 'features',
      type: 'array',
      label: 'Key Features',
      fields: [{ name: 'feature', type: 'text' }],
    },
    {
      name: 'order',
      type: 'number',
      label: 'Display Order',
      defaultValue: 0,
    },
  ],
}

export const PCDTeam: CollectionConfig = {
  slug: 'pcd-team',
  admin: {
    group: GROUP,
    useAsTitle: 'name',
    defaultColumns: ['name', 'role'],
  },
  access: collectionAccess(TENANT_SLUG),
  fields: [
    { name: 'name', type: 'text', required: true, label: 'Full Name' },
    { name: 'role', type: 'text', required: true, label: 'Role / Title' },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'pcd-media',
      label: 'Profile Photo',
    },
    {
      name: 'order',
      type: 'number',
      label: 'Display Order',
      defaultValue: 0,
    },
  ],
}

export const PCDTestimonials: CollectionConfig = {
  slug: 'pcd-testimonials',
  admin: {
    group: GROUP,
    useAsTitle: 'clientName',
    defaultColumns: ['clientName', 'company', 'rating'],
  },
  access: collectionAccess(TENANT_SLUG),
  fields: [
    { name: 'clientName', type: 'text', required: true, label: 'Client Name' },
    { name: 'company', type: 'text', label: 'Company / Organization' },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'pcd-media',
      label: 'Client Photo',
    },
    { name: 'quote', type: 'textarea', required: true, label: 'Testimonial Quote' },
    {
      name: 'rating',
      type: 'select',
      label: 'Rating',
      defaultValue: '5',
      options: [
        { label: '⭐ 1', value: '1' },
        { label: '⭐⭐ 2', value: '2' },
        { label: '⭐⭐⭐ 3', value: '3' },
        { label: '⭐⭐⭐⭐ 4', value: '4' },
        { label: '⭐⭐⭐⭐⭐ 5', value: '5' },
      ],
    },
    { name: 'isFeatured', type: 'checkbox', label: 'Featured', defaultValue: false },
  ],
}

export const PCDBlog: CollectionConfig = {
  slug: 'pcd-blog',
  admin: {
    group: GROUP,
    useAsTitle: 'title',
    defaultColumns: ['title', 'publishedAt'],
    preview: (doc) => {
      const domain = process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000'
      return `${domain}/preview?slug=${doc.slug}&collection=pcd-blog`
    },
  },
  access: collectionAccess(TENANT_SLUG),
  fields: [
    { name: 'title', type: 'text', required: true, label: 'Article Title' },
    { name: 'slug', type: 'text', required: true, unique: true, label: 'Slug' },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'pcd-team',
      label: 'Author',
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'pcd-media',
      label: 'Cover Image',
    },
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Excerpt',
      admin: { description: 'Short summary shown in listing pages.' },
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Article Content',
      editor: lexicalEditor({}),
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Published At',
      admin: { date: { pickerAppearance: 'dayAndTime' } },
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Tags',
      fields: [{ name: 'tag', type: 'text' }],
    },
    ...seoFields('pcd-media'),
  ],
}

export const PCDSettings: CollectionConfig = {
  slug: 'pcd-settings',
  admin: {
    group: GROUP,
    useAsTitle: 'siteName',
    description: 'Site-wide settings. Only one record per tenant.',
  },
  access: collectionAccess(TENANT_SLUG),
  fields: [
    { name: 'siteName', type: 'text', required: true, label: 'Site Name' },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'pcd-media',
      label: 'Logo',
    },
    {
      name: 'favicon',
      type: 'upload',
      relationTo: 'pcd-media',
      label: 'Favicon',
    },
    {
      name: 'nav',
      type: 'array',
      label: 'Navigation Links',
      fields: [
        { name: 'label', type: 'text', required: true, label: 'Label' },
        { name: 'url', type: 'text', required: true, label: 'URL' },
        { name: 'isExternal', type: 'checkbox', label: 'Open in new tab', defaultValue: false },
      ],
    },
    {
      name: 'footer',
      type: 'group',
      label: 'Footer',
      fields: [
        { name: 'tagline', type: 'text', label: 'Tagline' },
        {
          name: 'links',
          type: 'array',
          label: 'Footer Links',
          fields: [
            { name: 'label', type: 'text' },
            { name: 'url', type: 'text' },
          ],
        },
        { name: 'copyrightText', type: 'text', label: 'Copyright Text' },
      ],
    },
    {
      name: 'socialLinks',
      type: 'group',
      label: 'Social Media',
      fields: [
        { name: 'facebook', type: 'text', label: 'Facebook URL' },
        { name: 'instagram', type: 'text', label: 'Instagram URL' },
        { name: 'linkedin', type: 'text', label: 'LinkedIn URL' },
        { name: 'youtube', type: 'text', label: 'YouTube URL' },
        { name: 'twitter', type: 'text', label: 'X (Twitter) URL' },
      ],
    },
    {
      name: 'contactInfo',
      type: 'group',
      label: 'Contact Information',
      fields: [
        { name: 'phone', type: 'text', label: 'Phone' },
        { name: 'email', type: 'email', label: 'Email' },
        { name: 'address', type: 'textarea', label: 'Address' },
      ],
    },
    ...seoFields('pcd-media'),
  ],
}
