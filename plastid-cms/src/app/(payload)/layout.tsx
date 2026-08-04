import { RootLayout } from '@payloadcms/next/layouts'
import type { ImportMap } from 'payload'
import configPromise from '@payload-config'
import { importMap } from './admin/importMap.js'
import { serverFunction } from './admin/serverFunction'
import '@payloadcms/next/css'

export const metadata = {
  title: 'Plastid CMS',
  description: 'Multi-tenant content management for Plastid group of companies',
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <RootLayout
      config={configPromise}
      importMap={importMap as ImportMap}
      serverFunction={serverFunction}
    >
      {children}
    </RootLayout>
  )
}
