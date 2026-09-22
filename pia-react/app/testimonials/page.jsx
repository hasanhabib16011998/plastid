import { getAllPIATestimonials } from '../../src/lib/payload'
import TestimonialsView from '../../src/views/Testimonials/Testimonials'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Client Testimonials | Plastid Interior & Architecture',
  description: 'Read what our clients say about their experience working with Plastid Interior & Architecture.',
}

export default async function TestimonialsPage() {
  const testimonials = await getAllPIATestimonials()
  return <TestimonialsView initialTestimonials={testimonials} />
}
