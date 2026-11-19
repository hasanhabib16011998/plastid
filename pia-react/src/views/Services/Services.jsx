'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb'
import PIALoader from '../../components/PIALoader/PIALoader'
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop'
import { serviceTree, serviceData, allServicesList } from '../../data/servicesData'

const commercialPillars = [
  {
    badge: 'Transparent Entry',
    value: 'BDT 40 / sq.ft',
    label: '3D Design & Space Planning',
    desc: 'Photorealistic 3D renders and 2D furniture layouts before any construction begins.',
  },
  {
    badge: 'Turnkey Advantage',
    value: '50% Rebate',
    label: 'Design Fee Refund Policy',
    desc: '50% of your 3D design fee is credited back upon turnkey project completion with us.',
  },
  {
    badge: 'Zero Hidden Costs',
    value: 'Itemized BOQ',
    label: 'Clear Material Specifications',
    desc: 'Line-by-line bill of quantities specifying exact board cores, finishes, and hardware.',
  },
  {
    badge: 'Single Accountability',
    value: 'On-Schedule',
    label: 'In-House Engineers & Factory',
    desc: 'Dedicated site engineers and factory-precision millwork for guaranteed handover dates.',
  },
]

export default function Services() {
  return (
    <div className="min-h-screen flex flex-col bg-alabaster">
      <PIALoader />
      <Header />

      <main className="flex-1">
        <Breadcrumb
          style="style2"
          title="Interior Design & Architectural Services"
          subtitle="Turnkey Solutions Tailored by Space"
          bgImage="/images/resources/breadcrumb-bg-2.jpg"
          crumbs={[
            { label: 'Home', to: '/' },
            { label: 'Services' },
          ]}
        />

        {/* Services Overview Section */}
        <section className="py-20 bg-alabaster">
          <div className="container-pia">
            {/* Editorial Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-11">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brass mb-2">
                Architecture &bull; Interior &bull; Bespoke Execution
              </p>
              <h2 className="font-serif text-3xl sm:text-5xl font-semibold leading-tight text-obsidian mb-4">
                Explore Our Services <span className="text-brass italic">by Your Space</span>
              </h2>
              <p className="text-[#4A4A4A] text-[15.5px] leading-relaxed m-0">
                From newly handed-over residential apartments and multi-level villas to fast-track
                corporate headquarters, retail showrooms, and building facades—every Plastid project
                is engineered with photorealistic 3D clarity and itemized turnkey precision.
              </p>
            </div>

            {/* 4-Pillar Commercial Value Bar */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-12">
              {commercialPillars.map((pillar, idx) => (
                <div
                  key={idx}
                  className="bg-obsidian rounded-lg border border-brass/40 p-5 shadow-md flex flex-col justify-between"
                >
                  <div>
                    <span className="inline-block text-[10px] font-semibold uppercase tracking-[0.14em] text-brass bg-brass/15 border border-brass/30 px-2.5 py-0.5 rounded-full mb-3">
                      {pillar.badge}
                    </span>
                    <div className="font-serif text-3xl font-semibold text-alabaster leading-tight mb-1">
                      {pillar.value}
                    </div>
                    <h3 className="text-sm font-semibold text-brass mb-2">{pillar.label}</h3>
                    <p className="text-xs leading-relaxed text-alabaster/80 m-0">{pillar.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* 6 Main Service Category Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
              {serviceTree.map((branch, idx) => {
                const s = serviceData[branch.slug]
                if (!s) return null
                const hasChildren = Array.isArray(branch.children) && branch.children.length > 0
                const cardHighlights =
                  !hasChildren && Array.isArray(s.highlights) ? s.highlights.slice(0, 4) : []

                return (
                  <article
                    key={branch.slug}
                    className="flex flex-col justify-between bg-white rounded-xl border border-brass/30 overflow-hidden shadow-md hover:-translate-y-1.5 hover:border-brass hover:shadow-xl transition-all duration-300"
                  >
                    <div>
                      {/* Editorial Image Header */}
                      <Link
                        href={branch.to}
                        aria-label={`Explore ${s.title}`}
                        className="group block relative h-[220px] overflow-hidden bg-obsidian border-b-2 border-brass"
                      >
                        <img
                          src={s.cardImg || s.mainImg}
                          alt={`${s.heroTitle} - Plastid Interior & Architecture`}
                          loading={idx < 3 ? 'eager' : 'lazy'}
                          className="w-full h-full object-cover block brightness-90 contrast-105 group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/15 to-black/80" />

                        {/* Top-Left Scope Badge */}
                        <span className="absolute top-3.5 left-4 px-3 py-1 rounded-full bg-black/75 backdrop-blur-xs border border-brass/50 text-alabaster text-[10.5px] font-semibold tracking-widest uppercase">
                          {hasChildren
                            ? `${branch.children.length} Specialized Spaces`
                            : s.subtitle || 'Turnkey Specialty'}
                        </span>

                        {/* Top-Right Editorial Number */}
                        <span className="absolute top-2.5 right-4 font-serif text-3xl font-semibold leading-none text-alabaster/55">
                          {String(idx + 1).padStart(2, '0')}
                        </span>

                        {/* Bottom-Left Timeline Pill */}
                        {s.specs?.timeline && (
                          <span className="absolute bottom-3.5 left-4 text-alabaster text-[11.5px] font-medium tracking-wide inline-flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-brass inline-block" />
                            {s.specs.timeline}
                          </span>
                        )}

                        {/* Bottom-Right Floating Glass Brass Icon Badge */}
                        <div className="absolute bottom-3 right-4 w-11.5 h-11.5 rounded-lg bg-black/85 border border-brass flex items-center justify-center shadow-lg">
                          <span className={`${s.icon} text-2xl text-brass leading-none`} />
                        </div>
                      </Link>

                      {/* Card Body */}
                      <div className="px-6 pt-6 pb-4">
                        <h3 className="font-serif text-[26px] font-semibold leading-tight mb-2.5">
                          <Link
                            href={branch.to}
                            className="text-obsidian hover:text-ochre-dark transition-colors no-underline"
                          >
                            {s.title}
                          </Link>
                        </h3>
                        <p className="text-[#555] text-sm leading-relaxed mb-4">{s.shortText}</p>

                        {/* Sub-Services Tree Links */}
                        {hasChildren && (
                          <div className="mt-3.5 pt-3.5 border-t border-brass/25">
                            <span className="block text-[11px] font-bold uppercase tracking-widest text-ochre-dark mb-2.5">
                              Select Specialized Space:
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {branch.children.map((child) => (
                                <Link
                                  key={child.slug}
                                  href={child.to}
                                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-cream border border-brass/35 text-xs font-semibold text-neutral-900 no-underline hover:bg-obsidian hover:text-brass hover:border-obsidian transition-colors"
                                >
                                  <span>{child.label}</span>
                                  <ChevronRight className="text-brass" size={14} />
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Core Deliverables List */}
                        {!hasChildren && cardHighlights.length > 0 && (
                          <div className="mt-3.5 pt-3.5 border-t border-brass/25">
                            <span className="block text-[11px] font-bold uppercase tracking-widest text-ochre-dark mb-2">
                              Key Deliverables:
                            </span>
                            <ul className="list-none p-0 m-0 space-y-1.5">
                              {cardHighlights.map((item, i) => (
                                <li
                                  key={i}
                                  className="flex items-start gap-2 text-xs leading-snug text-neutral-700"
                                >
                                  <span className="text-brass font-bold shrink-0">✓</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Card Footer Actions */}
                    <div className="px-6 pt-3 pb-6">
                      <div className="pt-3 border-t border-[#f0ece3]">
                        <Link
                          className="btn-one w-full min-h-[46px] px-3.5 py-3 text-[11px] tracking-[1.2px] gap-2 leading-tight text-center"
                          href={branch.to}
                        >
                          Explore {s.title}
                          <ChevronRight size={14} className="shrink-0" />
                        </Link>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>

            {/* Complete 15-Service Directory */}
            <div className="mt-10 p-6 sm:p-8 bg-white rounded-xl border border-brass/35 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-3.5 border-b border-brass/20">
                <div>
                  <span className="block text-[11px] font-bold uppercase tracking-[0.14em] text-brass mb-1">
                    Complete Service Index
                  </span>
                  <h3 className="font-serif text-2xl sm:text-[26px] font-semibold text-obsidian m-0">
                    All 15 Specialized Design &amp; Execution Services
                  </h3>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1 text-[13px] font-semibold text-ochre-dark hover:text-obsidian no-underline transition-colors"
                >
                  Need help choosing? Speak with an Architect <ChevronRight size={14} />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {allServicesList.map((svc, i) => (
                  <Link
                    key={svc.slug}
                    href={`/services/${svc.slug}`}
                    className="flex items-center justify-between px-3.5 py-2.5 rounded-md bg-cream border border-brass/25 text-neutral-900 text-[13.5px] font-medium no-underline hover:bg-obsidian hover:text-alabaster hover:border-brass transition-colors"
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="text-[11px] font-bold text-brass min-w-[20px]">
                        {String(i + 1).padStart(2, '0')}.
                      </span>
                      <span>{svc.heroTitle}</span>
                    </span>
                    <ChevronRight className="text-brass shrink-0" size={14} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Architectural CTA Banner */}
        <section className="bg-obsidian py-14 border-y border-brass/30">
          <div className="container-pia">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-alabaster m-0">
                Planning a Residential or Commercial Project? Book a Free Architectural
                Consultation.
              </h3>
              <Link className="btn-one shrink-0" href="/contact">
                Book Free Consultation <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  )
}
