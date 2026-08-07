import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { s3Storage } from '@payloadcms/storage-s3'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

// Shared collections
import { Tenants } from '@/collections/shared/Tenants'
import { Users } from '@/collections/shared/Users'

// Plastid Interior
import {
  PIAMedia, PIAPages, PIAProjects, PIAServices,
  PIATeam, PIATestimonials, PIABlog, PIASettings,
} from '@/collections/plastid-interior'

// Sun Real Estate
import {
  SREMedia, SREPages, SREProjects, SREServices,
  SRETeam, SRETestimonials, SREBlog, SRESettings,
} from '@/collections/sun-real-estate'

// Plastid Digital
import {
  PDMedia, PDPages, PDProjects, PDServices,
  PDTeam, PDTestimonials, PDBlog, PDSettings,
} from '@/collections/plastid-digital'

// Plastid Construction
import {
  PCDMedia, PCDPages, PCDProjects, PCDServices,
  PCDTeam, PCDTestimonials, PCDBlog, PCDSettings,
} from '@/collections/plastid-construction'

export default buildConfig({
  // ── Admin UI ──────────────────────────────────────────────────────────────
  admin: {
    user: 'users',
    meta: {
      titleSuffix: '— Plastid CMS',
    },
  },

  // ── Collections ───────────────────────────────────────────────────────────
  collections: [
    // Global / shared
    Tenants,
    Users,

    // Plastid Interior
    PIAMedia, PIAPages, PIAProjects, PIAServices,
    PIATeam, PIATestimonials, PIABlog, PIASettings,

    // Sun Real Estate
    SREMedia, SREPages, SREProjects, SREServices,
    SRETeam, SRETestimonials, SREBlog, SRESettings,

    // Plastid Digital
    PDMedia, PDPages, PDProjects, PDServices,
    PDTeam, PDTestimonials, PDBlog, PDSettings,

    // Plastid Construction
    PCDMedia, PCDPages, PCDProjects, PCDServices,
    PCDTeam, PCDTestimonials, PCDBlog, PCDSettings,
  ],

  // ── Rich text editor ──────────────────────────────────────────────────────
  editor: lexicalEditor({}),

  // ── Database ──────────────────────────────────────────────────────────────
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),

  // ── Storage — MinIO (S3-compatible) ───────────────────────────────────────
  plugins: [
    s3Storage({
      // Register all 4 media collections with S3
      collections: {
        'pia-media': { prefix: 'plastid-interior' },
        'sre-media': { prefix: 'sun-real-estate' },
        'pd-media':  { prefix: 'plastid-digital' },
        'pcd-media': { prefix: 'plastid-construction' },
      },
      bucket: process.env.S3_BUCKET || 'plastid-media',
      config: {
        endpoint: process.env.S3_ENDPOINT || 'http://localhost:9000',
        region: process.env.S3_REGION || 'us-east-1',
        forcePathStyle: true, // REQUIRED for MinIO
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY || '',
          secretAccessKey: process.env.S3_SECRET_KEY || '',
        },
      },
    }),
  ],

  // ── CORS — allow all 4 frontend domains + dev ports ─────────────────────────
  cors: [
    'http://localhost:3000',
    'http://localhost:3001',
    process.env.PLASTID_INTERIOR_URL,
    process.env.SUN_REAL_ESTATE_URL,
    process.env.PLASTID_DIGITAL_URL,
    process.env.PLASTID_CONSTRUCTION_URL,
  ].filter(Boolean) as string[],

  // ── CSRF protection ────────────────────────────────────────────────────────
  csrf: [
    'http://localhost:3000',
    'http://localhost:3001',
    process.env.PLASTID_INTERIOR_URL,
    process.env.SUN_REAL_ESTATE_URL,
    process.env.PLASTID_DIGITAL_URL,
    process.env.PLASTID_CONSTRUCTION_URL,
  ].filter(Boolean) as string[],

  // ── Server URL ────────────────────────────────────────────────────────────
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3001',

  // ── Secret (JWT signing) ──────────────────────────────────────────────────
  secret: process.env.PAYLOAD_SECRET || 'change-me-in-production',

  // ── TypeScript output ─────────────────────────────────────────────────────
  typescript: {
    outputFile: 'src/payload-types.ts',
  },
})
