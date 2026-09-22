/**
 * POST /api/submit-lead
 *
 * Receives lead form data from the browser (same-origin, no CORS)
 * and forwards it server-side to Payload CMS over the internal Docker network.
 */

const PAYLOAD_URL =
  process.env.PAYLOAD_INTERNAL_URL ||
  process.env.PAYLOAD_PUBLIC_SERVER_URL ||
  'http://plastid-cms:4000'

export async function POST(request) {
  try {
    const body = await request.text()

    const upstreamRes = await fetch(`${PAYLOAD_URL}/api/pia-leads`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body,
    })

    const data = await upstreamRes.text()

    return new Response(data, {
      status: upstreamRes.status,
      headers: { 'content-type': 'application/json' },
    })
  } catch (err) {
    console.error('[submit-lead] Failed to reach Payload CMS:', err.message)
    return new Response(JSON.stringify({ error: 'CMS unreachable', detail: err.message }), {
      status: 502,
      headers: { 'content-type': 'application/json' },
    })
  }
}
