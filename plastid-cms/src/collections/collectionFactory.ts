/**
 * Collection factory helpers.
 * Each factory function returns a CollectionConfig for a given tenant.
 * The tenant slug, admin group label, and MinIO prefix are injected per tenant.
 */

import type { CollectionConfig, CollectionSlug, Field } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { tenantAccess } from '@/lib/accessHelpers'

// ---------------------------------------------------------------------------
// Shared SEO field group
// ---------------------------------------------------------------------------
const seoFields = (mediaSlug: CollectionSlug): Field[] => [
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

// ---------------------------------------------------------------------------
// Hero block fields
// ---------------------------------------------------------------------------
const heroFields = (mediaSlug: CollectionSlug): Field[] => [
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

// ---------------------------------------------------------------------------
// Tenant access factory
// ---------------------------------------------------------------------------
const access = (slug: string) => ({
  read: tenantAccess(slug),
  create: tenantAccess(slug),
  update: tenantAccess(slug),
  delete: tenantAccess(slug),
})

// ---------------------------------------------------------------------------
// Media
// ---------------------------------------------------------------------------
export const createMediaCollection = (
  collectionSlug: string,
  adminGroup: string,
): CollectionConfig => ({
  slug: collectionSlug,
  upload: {
    staticDir: `../public/media/${collectionSlug}`,
    mimeTypes: ['image/*', 'application/pdf', 'video/*'],
  },
  admin: {
    group: adminGroup,
    useAsTitle: 'filename',
  },
  access: access(collectionSlug.replace('-media', '')),
  fields: [
    { name: 'alt', type: 'text', label: 'Alt Text' },
    { name: 'caption', type: 'text', label: 'Caption' },
  ],
})

// ---------------------------------------------------------------------------
// Pages  (with drafts)
// ---------------------------------------------------------------------------
export const createPagesCollection = (
  collectionSlug: string,
  adminGroup: string,
  mediaSlug: CollectionSlug,
): CollectionConfig => ({
  slug: collectionSlug,
  versions: { drafts: { autosave: true } },
  admin: {
    group: adminGroup,
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status'],
    preview: (doc) => {
      const domain = process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000'
      return `${domain}/preview?slug=${doc.slug}&collection=${collectionSlug}`
    },
  },
  access: access(adminGroup.toLowerCase().replace(/\s+/g, '-')),
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
    ...heroFields(mediaSlug),
    {
      name: 'content',
      type: 'richText',
      label: 'Page Content',
      editor: lexicalEditor({}),
    },
    ...seoFields(mediaSlug),
  ],
})

// ---------------------------------------------------------------------------
// Projects  (with drafts)
// ---------------------------------------------------------------------------
export const createProjectsCollection = (
  collectionSlug: string,
  adminGroup: string,
  mediaSlug: CollectionSlug,
): CollectionConfig => ({
  slug: collectionSlug,
  versions: { drafts: { autosave: true } },
  admin: {
    group: adminGroup,
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'year', '_status'],
    preview: (doc) => {
      const domain = process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000'
      return `${domain}/preview?slug=${doc.slug}&collection=${collectionSlug}`
    },
  },
  access: access(adminGroup.toLowerCase().replace(/\s+/g, '-')),
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
      relationTo: mediaSlug,
      label: 'Thumbnail Image',
    },
    {
      name: 'images',
      type: 'array',
      label: 'Gallery Images',
      fields: [
        { name: 'image', type: 'upload', relationTo: mediaSlug },
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
    ...seoFields(mediaSlug),
  ],
})
// ---------------------------------------------------------------------------
export const createServicesCollection = (
  collectionSlug: string,
  adminGroup: string,
  mediaSlug: CollectionSlug,
): CollectionConfig => ({
  slug: collectionSlug,
  admin: {
    group: adminGroup,
    useAsTitle: 'title',
  },
  access: access(adminGroup.toLowerCase().replace(/\s+/g, '-')),
  fields: [
    { name: 'title', type: 'text', required: true, label: 'Service Name' },
    {
      name: 'icon',
      type: 'upload',
      relationTo: mediaSlug,
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
})

// ---------------------------------------------------------------------------
// Team
// ---------------------------------------------------------------------------
export const createTeamCollection = (
  collectionSlug: string,
  adminGroup: string,
  mediaSlug: CollectionSlug,
): CollectionConfig => ({
  slug: collectionSlug,
  admin: {
    group: adminGroup,
    useAsTitle: 'name',
    defaultColumns: ['name', 'role'],
  },
  access: access(adminGroup.toLowerCase().replace(/\s+/g, '-')),
  fields: [
    { name: 'name', type: 'text', required: true, label: 'Full Name' },
    { name: 'role', type: 'text', required: true, label: 'Role / Title' },
    {
      name: 'photo',
      type: 'upload',
      relationTo: mediaSlug,
      label: 'Profile Photo',
    },
    {
      name: 'bio',
      type: 'richText',
      label: 'Biography',
      editor: lexicalEditor({}),
    },
    {
      name: 'socialLinks',
      type: 'group',
      label: 'Social Links',
      fields: [
        { name: 'linkedin', type: 'text', label: 'LinkedIn URL' },
        { name: 'instagram', type: 'text', label: 'Instagram URL' },
        { name: 'email', type: 'email', label: 'Email' },
      ],
    },
    {
      name: 'order',
      type: 'number',
      label: 'Display Order',
      defaultValue: 0,
    },
  ],
})

// ---------------------------------------------------------------------------
// Testimonials
// ---------------------------------------------------------------------------
export const createTestimonialsCollection = (
  collectionSlug: string,
  adminGroup: string,
  mediaSlug: CollectionSlug,
): CollectionConfig => ({
  slug: collectionSlug,
  admin: {
    group: adminGroup,
    useAsTitle: 'clientName',
    defaultColumns: ['clientName', 'company', 'rating'],
  },
  access: access(adminGroup.toLowerCase().replace(/\s+/g, '-')),
  fields: [
    { name: 'clientName', type: 'text', required: true, label: 'Client Name' },
    { name: 'company', type: 'text', label: 'Company / Organization' },
    {
      name: 'photo',
      type: 'upload',
      relationTo: mediaSlug,
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
})

// ---------------------------------------------------------------------------
// Blog  (with drafts)
// ---------------------------------------------------------------------------
export const createBlogCollection = (
  collectionSlug: string,
  adminGroup: string,
  teamSlug: CollectionSlug,
  mediaSlug: CollectionSlug,
): CollectionConfig => ({
  slug: collectionSlug,
  versions: { drafts: { autosave: true } },
  admin: {
    group: adminGroup,
    useAsTitle: 'title',
    defaultColumns: ['title', 'publishedAt', '_status'],
    preview: (doc) => {
      const domain = process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000'
      return `${domain}/preview?slug=${doc.slug}&collection=${collectionSlug}`
    },
  },
  access: access(adminGroup.toLowerCase().replace(/\s+/g, '-')),
  fields: [
    { name: 'title', type: 'text', required: true, label: 'Article Title' },
    { name: 'slug', type: 'text', required: true, unique: true, label: 'Slug' },
    {
      name: 'author',
      type: 'relationship',
      relationTo: teamSlug,
      label: 'Author',
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: mediaSlug,
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
    ...seoFields(mediaSlug),
  ],
})

// ---------------------------------------------------------------------------
// Settings (single record per tenant)
// ---------------------------------------------------------------------------
export const createSettingsCollection = (
  collectionSlug: string,
  adminGroup: string,
  mediaSlug: CollectionSlug,
): CollectionConfig => ({
  slug: collectionSlug,
  admin: {
    group: adminGroup,
    useAsTitle: 'siteName',
    description: 'Site-wide settings. Only one record per tenant.',
  },
  access: access(adminGroup.toLowerCase().replace(/\s+/g, '-')),
  fields: [
    { name: 'siteName', type: 'text', required: true, label: 'Site Name' },
    {
      name: 'logo',
      type: 'upload',
      relationTo: mediaSlug,
      label: 'Logo',
    },
    {
      name: 'favicon',
      type: 'upload',
      relationTo: mediaSlug,
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
    ...seoFields(mediaSlug),
  ],
})
