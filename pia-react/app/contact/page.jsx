'use client'

import Contact from '../../src/views/Contact/Contact'

// Contact page stays 'use client' — it's a pure form page with no SSR data needs.
// Form submission goes via /api/submit-lead (same-origin POST), no CORS.
export default function ContactPage() {
  return <Contact />
}
