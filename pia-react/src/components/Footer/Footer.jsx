'use client'

import { Download } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <>
      <footer className="relative bg-obsidian text-alabaster pt-20 pb-16 border-t border-brass/25">
        <div className="container-pia">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Contact Info Column */}
            <div>
              <div className="mb-7">
                <Link href="/">
                  <img
                    src="/images/resources/logo.png"
                    alt="PIA Logo"
                    className="w-auto h-20 max-w-full object-contain"
                  />
                </Link>
              </div>
              <ul className="space-y-5 list-none p-0 m-0">
                <li>
                  <h6 className="text-xs font-semibold uppercase tracking-[0.16em] text-brass mb-1.5">
                    Address
                  </h6>
                  <p className="text-sm text-alabaster/80 leading-relaxed m-0">
                    House-11 (2nd Floor), Block-E, Sector-1,
                    <br />
                    Aftab Nagar Main Rd, Dhaka 1212
                  </p>
                </li>
                <li>
                  <h6 className="text-xs font-semibold uppercase tracking-[0.16em] text-brass mb-1.5">
                    Phone
                  </h6>
                  <p className="text-sm text-alabaster/80 leading-relaxed m-0">
                    <a
                      href="tel:+8801768834417"
                      className="text-alabaster/90 hover:text-brass transition-colors no-underline"
                    >
                      +880 1768834417
                    </a>
                    <br />
                    <span className="text-brass/90">Saturday - Thursday:</span> 9.00am to 6.00pm
                  </p>
                </li>
                <li>
                  <h6 className="text-xs font-semibold uppercase tracking-[0.16em] text-brass mb-1.5">
                    Email
                  </h6>
                  <p className="text-sm text-alabaster/80 m-0">
                    <a
                      href="mailto:plastidarchitecture@gmail.com"
                      className="text-alabaster/90 hover:text-brass transition-colors no-underline"
                    >
                      plastidarchitecture@gmail.com
                    </a>
                  </p>
                </li>
              </ul>
            </div>

            {/* Services Links Column */}
            <div>
              <h3 className="font-serif text-2xl font-semibold text-alabaster mb-6 pb-3 border-b border-brass/25">
                Services
              </h3>
              <ul className="space-y-3 list-none p-0 m-0">
                {[
                  { href: '/services/residential-interior', label: 'Residential Interior' },
                  { href: '/services/commercial-interior', label: 'Commercial Interior' },
                  { href: '/services/restaurant-interior', label: 'Restaurant Interior' },
                  { href: '/services/exterior-design', label: 'Exterior Design' },
                  { href: '/services/furniture-and-decor', label: 'Furniture and Decor' },
                  { href: '/services/3d-and-design-consultancy', label: '3D & Design Consultancy' },
                ].map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="inline-flex items-center text-sm text-alabaster/80 hover:text-brass hover:translate-x-1 transition-all no-underline"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Brochure Column */}
            <div className="md:col-span-2 lg:col-span-1">
              <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-start sm:items-center lg:items-start xl:items-center gap-6 p-6 rounded-lg bg-charcoal border border-brass/25">
                <div className="w-28 shrink-0 overflow-hidden rounded border border-brass/30">
                  <img
                    src="/images/footer/brochures-1.jpg"
                    alt="Brochure"
                    className="w-full h-auto object-cover block"
                  />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-semibold text-alabaster leading-snug mb-4">
                    Our Interior Design
                    <br />
                    Brochure
                  </h3>
                  <a
                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-brass border border-brass px-4 py-2.5 hover:bg-brass hover:text-obsidian transition-colors no-underline"
                    href="#"
                  >
                    Download Our Brochure <Download size={14} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Footer Bottom Bar */}
      <section className="bg-[#100F0E] border-t border-brass/20 py-5">
        <div className="container-pia">
          <p className="text-center text-xs text-alabaster/70 m-0">
            Copyright &copy; {currentYear}{' '}
            <Link href="/" className="text-brass hover:underline no-underline">
              Plastid Interior &amp; Architecture
            </Link>
            . All Rights Reserved.
          </p>
        </div>
      </section>
    </>
  )
}
