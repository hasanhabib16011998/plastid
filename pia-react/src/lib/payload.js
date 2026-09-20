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
 * Extract plain text from Lexical rich text object
 */
export function extractTextFromLexical(lexicalObj) {
  if (!lexicalObj) return ''
  if (typeof lexicalObj === 'string') return lexicalObj
  if (lexicalObj.root && Array.isArray(lexicalObj.root.children)) {
    return lexicalObj.root.children
      .map((node) => {
        if (node.children && Array.isArray(node.children)) {
          return node.children.map((child) => child.text || '').join('')
        }
        return ''
      })
      .filter(Boolean)
      .join('\n\n')
  }
  return ''
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

/**
 * Format raw Payload CMS project document to standard UI format
 */
export function formatProject(doc) {
  if (!doc) return null

  const category = doc.category || 'General'
  const tag = category.toLowerCase()
  const img = getMediaUrl(doc.thumbnail) || ''
  
  let galleryImgs = []
  if (Array.isArray(doc.images) && doc.images.length > 0) {
    galleryImgs = doc.images
      .map((item) => getMediaUrl(item.image || item))
      .filter(Boolean)
  }
  if (galleryImgs.length === 0 && img) {
    galleryImgs = [img]
  }

  const fullDescription = extractTextFromLexical(doc.description) || doc.summary || ''

  return {
    id: doc.id,
    slug: doc.slug || String(doc.id),
    title: doc.title || 'Untitled Project',
    category: category,
    tag: tag,
    img: img,
    mainImg: img,
    summary: doc.summary || (fullDescription.length > 120 ? fullDescription.slice(0, 120) + '...' : fullDescription),
    description: fullDescription || 'No description available for this project.',
    challenge: doc.challenge || '',
    solution: doc.solution || '',
    client: doc.client || 'N/A',
    location: doc.location || 'N/A',
    area: doc.area || (doc.year ? `Completed in ${doc.year}` : 'N/A'),
    duration: doc.duration || 'N/A',
    galleryImgs: galleryImgs,
    year: doc.year,
    tags: Array.isArray(doc.tags) ? doc.tags.map((t) => t.tag || t) : [],
  }
}

/**
 * Fetch projects from pia-projects collection
 */
export async function getPIAProjects() {
  const data = await fetchPayload('pia-projects?depth=2&limit=100')
  if (!data?.docs || data.docs.length === 0) {
    return []
  }
  return data.docs.map(formatProject).filter(Boolean)
}

/**
 * Fetch single project by ID or slug
 */
export async function getPIAProjectByIdOrSlug(idOrSlug) {
  if (!idOrSlug) return null

  // Try fetching by slug first
  const slugData = await fetchPayload(`pia-projects?where[slug][equals]=${encodeURIComponent(idOrSlug)}&depth=2`)
  if (slugData?.docs && slugData.docs.length > 0) {
    return formatProject(slugData.docs[0])
  }

  // Fall back to ID
  const idData = await fetchPayload(`pia-projects/${encodeURIComponent(idOrSlug)}?depth=2`)
  if (idData && idData.id) {
    return formatProject(idData)
  }

  return null
}

