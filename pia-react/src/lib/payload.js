const PAYLOAD_URL = process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:4000'

/**
 * Helper function to fetch data from Payload CMS REST API
 */
async function fetchPayload(endpoint, options = {}) {
  const url = `${PAYLOAD_URL}/api/${endpoint}`
  try {
    const res = await fetch(url, {
      next: { revalidate: 60 },
      ...options,
    })

    if (!res.ok) {
      console.warn(`Payload fetch warning: ${res.status} ${res.statusText} for ${url}`)
      return null
    }

    return await res.json()
  } catch (err) {
    console.error(`Failed to connect to Payload CMS at ${url}:`, err.message)
    return null
  }
}

/**
 * Fetch team members from pia-team collection
 */
export async function getPIATeam() {
  const data = await fetchPayload('pia-team?depth=2&sort=order')
  return data?.docs || []
}

/**
 * Helper to construct full media URL
 */
export function getMediaUrl(media) {
  if (!media) return null
  let rawUrl = typeof media === 'string' 
    ? media 
    : (media.url || media.sizes?.desktop?.url || media.sizes?.tablet?.url || media.sizes?.mobile?.url || media.sizes?.thumbnail?.url)
  
  if (!rawUrl) return null

  // Fix Docker internal container hostname 'minio:9000' for browser access
  if (rawUrl.includes('minio:9000')) {
    rawUrl = rawUrl.replace('http://minio:9000', 'http://localhost:9000')
  }

  if (rawUrl.startsWith('http://') || rawUrl.startsWith('https://')) {
    return rawUrl
  }

  return `${PAYLOAD_URL}${rawUrl.startsWith('/') ? '' : '/'}${rawUrl}`
}
