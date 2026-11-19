'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

/**
 * Breadcrumb component
 * @param {string} title - Page main title (h1)
 * @param {string} subtitle - Optional subtitle/span above title
 * @param {Array} crumbs - Array of {label, to} objects
 * @param {string} bgImage - Background image path (defaults to breadcrumb-bg.jpg)
 * @param {string} style - 'style1' | 'style2' (default: style1)
 */
export default function Breadcrumb({ title, subtitle, crumbs = [], bgImage, style = 'style1' }) {
  const bg = bgImage || '/images/resources/breadcrumb-bg.jpg'

  if (style === 'style2') {
    return (
      <section
        className="relative bg-obsidian bg-cover bg-center pt-36 pb-20 md:pt-44 md:pb-24 overflow-hidden"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/65 to-black/85" />
        <div className="container-pia relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            {subtitle && (
              <span className="inline-block text-xs font-semibold uppercase tracking-[0.22em] text-brass mb-3">
                {subtitle}
              </span>
            )}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold text-alabaster leading-tight m-0">
              {title}
            </h1>
          </div>

          {crumbs.length > 0 && (
            <nav aria-label="Breadcrumb" className="mt-10 flex justify-center sm:justify-start">
              <ul className="inline-flex flex-wrap items-center gap-2 list-none p-0 m-0 text-xs uppercase tracking-[0.12em]">
                {crumbs.map((crumb, i) => (
                  <li key={i} className="inline-flex items-center gap-2">
                    {i > 0 && <ChevronRight size={13} className="text-brass" />}
                    {crumb.to ? (
                      <Link
                        href={crumb.to}
                        className="text-alabaster/80 hover:text-brass transition-colors no-underline"
                      >
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className="text-brass font-semibold">{crumb.label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </section>
    )
  }

  return (
    <section
      className="relative bg-obsidian bg-cover bg-center pt-36 pb-16 md:pt-44 md:pb-20 overflow-hidden"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/65 to-black/85" />
      <div className="container-pia relative z-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-alabaster leading-tight m-0">
            {title}
          </h1>
          {crumbs.length > 0 && (
            <nav aria-label="Breadcrumb">
              <ul className="inline-flex flex-wrap items-center gap-2 list-none p-0 m-0 text-xs uppercase tracking-[0.12em]">
                {crumbs.map((crumb, i) => (
                  <li key={i} className="inline-flex items-center gap-2">
                    {i > 0 && <ChevronRight size={13} className="text-brass" />}
                    {crumb.to ? (
                      <Link
                        href={crumb.to}
                        className="text-alabaster/80 hover:text-brass transition-colors no-underline"
                      >
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className="text-brass font-semibold">{crumb.label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </div>
    </section>
  )
}
