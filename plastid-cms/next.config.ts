import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Allow serving media from MinIO in dev and disable image optimization
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '9000',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

export default withPayload(nextConfig)
