'use client'

import { useState, useEffect } from 'react'
import { ChevronRight, MapPin, Phone, Mail, Check } from 'lucide-react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb'
import PIALoader from '../../components/PIALoader/PIALoader'
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop'
import PIADropdown from '../../components/PIADropdown/PIADropdown'
import { submitPIALead } from '../../lib/payload'
import { serviceFormOptions, resolveServiceFormOption } from '../../data/servicesData'

const contactInfo = [
  {
    Icon: MapPin,
    title: 'Our Location',
    lines: ['House-11 (2nd Floor), Block-E,', 'Sector-1, Aftab Nagar Main Rd,', 'Dhaka 1212, Bangladesh'],
  },
  {
    Icon: Phone,
    title: 'Phone Number',
    lines: ['+880 1768834417', 'Saturday - Thursday: 9am - 6pm'],
  },
  {
    Icon: Mail,
    title: 'Email Address',
    lines: ['plastidarchitecture@gmail.com'],
  },
]

const inputClasses =
  'w-full px-4 py-3.5 rounded bg-alabaster border border-black/15 text-obsidian text-sm font-sans placeholder:text-black/45 focus:bg-white focus:border-brass focus:ring-2 focus:ring-brass/20 outline-none transition-all disabled:opacity-60'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '', service: '' })
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const serviceParam = params.get('service')
      if (serviceParam) {
        const matchedOption = resolveServiceFormOption(serviceParam)
        if (matchedOption) {
          setFormData((prev) => ({ ...prev, service: matchedOption }))
        }
      }
    }
  }, [])

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    try {
      const res = await submitPIALead({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: formData.service,
        message: formData.message,
        source: 'contact',
      })
      if (res.success) {
        setSubmitted(true)
        setFormData({ name: '', email: '', phone: '', message: '', service: '' })
        setTimeout(() => setSubmitted(false), 5000)
      } else {
        setError('Something went wrong. Please try again.')
      }
    } catch {
      setError('Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-alabaster">
      <PIALoader />
      <Header />

      <main className="flex-1">
        <Breadcrumb
          title={
            <>
              Contact <br />
              Plastid Interior
            </>
          }
          crumbs={[
            { label: 'Home', to: '/' },
            { label: 'Contact' },
          ]}
        />

        {/* Contact Info Cards */}
        <section className="py-16 sm:py-20 bg-[#f9f9f9]">
          <div className="container-pia">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {contactInfo.map(({ Icon, title, lines }, i) => (
                <div
                  key={i}
                  className="bg-white px-7 py-9 rounded border border-brass/20 text-center shadow-sm hover:-translate-y-1.5 transition-transform duration-300"
                >
                  <div className="w-17 h-17 rounded-full bg-brass/15 flex items-center justify-center mx-auto mb-5 text-brass">
                    <Icon size={28} />
                  </div>
                  <h2 className="font-serif text-2xl font-semibold text-obsidian mb-3">{title}</h2>
                  {lines.map((line, j) => (
                    <p key={j} className="text-ink text-sm my-1 leading-relaxed">
                      {line}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form + Map */}
        <section className="py-20 bg-white">
          <div className="container-pia">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              {/* Contact Form */}
              <div className="lg:col-span-7">
                <div className="mb-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ochre-dark mb-1.5">
                    Get In Touch
                  </p>
                  <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-obsidian m-0">
                    Send Us a <span className="text-brass">Message</span>
                  </h2>
                </div>

                {submitted && (
                  <div className="bg-obsidian text-brass border border-brass px-5 py-4 rounded mb-6 flex items-center gap-2.5 text-sm">
                    <Check size={16} className="shrink-0" />
                    <span>
                      Thank you for reaching out! We&apos;ll get back to you within 24 hours.
                    </span>
                  </div>
                )}

                {error && (
                  <div className="bg-[#2e1f1f] text-[#e57373] border border-[#e57373] px-5 py-4 rounded mb-6 text-sm">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name *"
                      required
                      disabled={isSubmitting}
                      className={inputClasses}
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email Address *"
                      required
                      disabled={isSubmitting}
                      className={inputClasses}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone Number"
                      disabled={isSubmitting}
                      className={inputClasses}
                    />
                    <div className="[&>.relative]:mb-0">
                      <PIADropdown
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        placeholder="Select Service"
                        options={serviceFormOptions}
                      />
                    </div>
                  </div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message *"
                    required
                    disabled={isSubmitting}
                    rows={4}
                    className={`${inputClasses} resize-y min-h-[100px]`}
                  />
                  <button
                    className="btn-one w-full disabled:opacity-70"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending Message...' : 'Send Message'}{' '}
                    <ChevronRight size={14} />
                  </button>
                </form>
              </div>

              {/* Map & Social */}
              <div className="lg:col-span-5">
                <div className="mb-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ochre-dark mb-1.5">
                    Our Location
                  </p>
                  <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-obsidian m-0">
                    Find Us On <span className="text-brass">Map</span>
                  </h2>
                </div>

                <div className="rounded-md overflow-hidden mb-6 h-[340px] shadow-md border border-black/10">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.4941539302285!2d90.43558017587414!3d23.76541148819882!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c70021dd78f7%3A0x8ac0dd7367642152!2sPlastid%20Interior%20%26%20Architecture!5e0!3m2!1sen!2sbd!4v1792351987658!5m2!1sen!2sbd"
                    width="100%"
                    height="340"
                    className="border-0 block w-full h-full"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="PIA Location Map"
                  />
                </div>

                <div className="text-center bg-alabaster p-5 rounded-md border border-black/10">
                  <p className="mb-3 text-obsidian font-medium text-sm">
                    Follow us on social media
                  </p>
                  <div className="flex justify-center gap-3">
                    {[
                      {
                        label: 'Facebook',
                        icon: 'fa-facebook',
                        href: 'https://www.facebook.com/profile.php?id=61555749343330',
                      },
                      {
                        label: 'Instagram',
                        icon: 'fa-instagram',
                        href: 'https://www.instagram.com/plastid.interior.architecture/',
                      },
                      {
                        label: 'TikTok',
                        icon: 'fa-music',
                        href: 'https://www.tiktok.com/@plastid.interiors',
                      },
                    ].map((s, i) => (
                      <a
                        key={i}
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={s.label}
                        className="w-10 h-10 rounded-full bg-obsidian text-brass border border-brass flex items-center justify-center text-base hover:bg-brass hover:text-obsidian transition-colors no-underline"
                      >
                        <i className={`fa ${s.icon}`} aria-hidden="true" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  )
}
