import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { collectionAccess, heroFields, seoFields } from '../helpers'

const GROUP = 'Plastid Interior'
const TENANT_SLUG = 'plastid-interior'

export const PIAMedia: CollectionConfig = {
  slug: 'pia-media',
  upload: {
    staticDir: '../public/media/pia-media',
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

export const PIAPages: CollectionConfig = {
  slug: 'pia-pages',
  admin: {
    group: GROUP,
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug'],
    preview: (doc) => {
      const domain = process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000'
      return `${domain}/preview?slug=${doc.slug}&collection=pia-pages`
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
    ...heroFields('pia-media'),
    {
      name: 'content',
      type: 'richText',
      label: 'Page Content',
      editor: lexicalEditor({}),
    },
    ...seoFields('pia-media'),
  ],
}

export const PIAProjects: CollectionConfig = {
  slug: 'pia-projects',
  admin: {
    group: GROUP,
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'year'],
    preview: (doc) => {
      const domain = process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000'
      return `${domain}/preview?slug=${doc.slug}&collection=pia-projects`
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
      relationTo: 'pia-media',
      label: 'Thumbnail Image',
    },
    {
      name: 'images',
      type: 'array',
      label: 'Gallery Images',
      fields: [
        { name: 'image', type: 'upload', relationTo: 'pia-media' },
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
    { name: 'location', type: 'text', label: 'Location' },
    { name: 'area', type: 'text', label: 'Project Area (e.g. 3,500 sqft)' },
    { name: 'duration', type: 'text', label: 'Duration (e.g. 6 Months)' },
    { name: 'challenge', type: 'textarea', label: 'The Challenge' },
    { name: 'solution', type: 'textarea', label: 'Our Solution' },
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
    ...seoFields('pia-media'),
  ],
}

export const PIAServices: CollectionConfig = {
  slug: 'pia-services',
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
      relationTo: 'pia-media',
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

export const PIATeam: CollectionConfig = {
  slug: 'pia-team',
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
      relationTo: 'pia-media',
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

export const PIATestimonials: CollectionConfig = {
  slug: 'pia-testimonials',
  admin: {
    group: GROUP,
    useAsTitle: 'clientName',
    defaultColumns: ['clientName', 'company'],
  },
  access: collectionAccess(TENANT_SLUG),
  fields: [
    { name: 'clientName', type: 'text', required: true, label: 'Client Name' },
    { name: 'company', type: 'text', label: 'Company / Organization' },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'pia-media',
      label: 'Client Photo',
    },
    { name: 'quote', type: 'textarea', required: true, label: 'Testimonial Quote' },
    { name: 'isFeatured', type: 'checkbox', label: 'Featured', defaultValue: false },
  ],
}

export const PIABlog: CollectionConfig = {
  slug: 'pia-blog',
  admin: {
    group: GROUP,
    useAsTitle: 'title',
    defaultColumns: ['title', 'publishedAt'],
    preview: (doc) => {
      const domain = process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000'
      return `${domain}/preview?slug=${doc.slug}&collection=pia-blog`
    },
  },
  access: collectionAccess(TENANT_SLUG),
  fields: [
    { name: 'title', type: 'text', required: true, label: 'Article Title' },
    { name: 'slug', type: 'text', required: true, unique: true, label: 'Slug' },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'pia-team',
      label: 'Author',
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'pia-media',
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
    ...seoFields('pia-media'),
  ],
}

export const PIASettings: CollectionConfig = {
  slug: 'pia-settings',
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
      relationTo: 'pia-media',
      label: 'Logo',
    },
    {
      name: 'favicon',
      type: 'upload',
      relationTo: 'pia-media',
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
    ...seoFields('pia-media'),
  ],
}

export const PIALeads: CollectionConfig = {
  slug: 'pia-leads',
  admin: {
    group: GROUP,
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'phone', 'service', 'source', 'status', 'createdAt'],
  },
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    { name: 'name', type: 'text', required: true, label: 'Full Name' },
    { name: 'email', type: 'email', required: true, label: 'Email Address' },
    { name: 'phone', type: 'text', label: 'Phone Number' },
    { name: 'service', type: 'text', label: 'Interested Service' },
    { name: 'message', type: 'textarea', label: 'Message / Notes' },
    {
      name: 'source',
      type: 'select',
      label: 'Submission Source',
      defaultValue: 'homepage',
      options: [
        { label: 'Homepage Form', value: 'homepage' },
        { label: 'Contact Page Form', value: 'contact' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'status',
      type: 'select',
      label: 'Lead Status',
      defaultValue: 'new',
      options: [
        { label: 'New Lead', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Closed / Won', value: 'closed' },
        { label: 'Archived', value: 'archived' },
      ],
    },
  ],
}

