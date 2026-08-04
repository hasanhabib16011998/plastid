/**
 * Seed script — populates 4 tenants and a super-admin user.
 *
 * Usage:
 *   npm run seed
 *
 * Requires DATABASE_URI to be set in .env
 */
import 'dotenv/config'
import { getPayload } from 'payload'
import config from './payload.config'

async function seed() {
  const payload = await getPayload({ config })

  console.log('🌱 Seeding tenants...')

  const tenants = [
    {
      name: 'Plastid Interior',
      slug: 'plastid-interior',
      domain: process.env.PLASTID_INTERIOR_URL || 'https://plastidinterior.com',
    },
    {
      name: 'Sun Real Estate',
      slug: 'sun-real-estate',
      domain: process.env.SUN_REAL_ESTATE_URL || 'https://sunrealestate.com',
    },
    {
      name: 'Plastid Digital',
      slug: 'plastid-digital',
      domain: process.env.PLASTID_DIGITAL_URL || 'https://plastiddigital.com',
    },
    {
      name: 'Plastid Construction and Development',
      slug: 'plastid-construction',
      domain: process.env.PLASTID_CONSTRUCTION_URL || 'https://plastidconstruction.com',
    },
  ]

  for (const tenant of tenants) {
    const existing = await payload.find({
      collection: 'tenants',
      where: { slug: { equals: tenant.slug } },
    })

    if (existing.docs.length === 0) {
      await payload.create({ collection: 'tenants', data: tenant })
      console.log(`  ✅ Created tenant: ${tenant.name}`)
    } else {
      console.log(`  ⏭  Tenant already exists: ${tenant.name}`)
    }
  }

  console.log('\n🌱 Seeding super-admin user...')

  const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@plastidgroup.com'
  const adminPassword = process.env.SEED_ADMIN_PASSWORD || 'ChangeMe123!'

  const existingAdmin = await payload.find({
    collection: 'users',
    where: { email: { equals: adminEmail } },
  })

  if (existingAdmin.docs.length === 0) {
    await payload.create({
      collection: 'users',
      data: {
        email: adminEmail,
        password: adminPassword,
        isSuperAdmin: true,
      },
    })
    console.log(`  ✅ Created super-admin: ${adminEmail}`)
    console.log(`  ⚠️  Default password: ${adminPassword} — CHANGE THIS IMMEDIATELY!`)
  } else {
    console.log(`  ⏭  Super-admin already exists: ${adminEmail}`)
  }

  console.log('\n✨ Seed complete!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err)
  process.exit(1)
})
