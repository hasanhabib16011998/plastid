'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChevronRight } from 'lucide-react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb'
import PIALoader from '../../components/PIALoader/PIALoader'
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop'

export default function Projects({ initialProjects = [] }) {
  const [projects] = useState(initialProjects)
  const [activeFilter, setActiveFilter] = useState('all')
  const [activeCardId, setActiveCardId] = useState(null)
  const router = useRouter()

  const categoryTags = Array.from(new Set(projects.map((p) => p.tag).filter(Boolean)))
  const filters = ['all', ...categoryTags]

  const filtered =
    activeFilter === 'all' ? projects : projects.filter((p) => p.tag === activeFilter)

  const handleCardClick = (e, p) => {
    const targetId = p.slug || p.id
    if (e.target.closest('.view-details-btn')) {
      router.push(`/projects/${targetId}`)
      return
    }
    if (activeCardId === p.id) {
      router.push(`/projects/${targetId}`)
    } else {
      setActiveCardId(p.id)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-alabaster">
      <PIALoader />
      <Header />

      <main className="flex-1">
        <Breadcrumb
          style="style2"
          title="Signature Projects & Portfolio"
          subtitle="Our Projects"
          bgImage="/images/resources/breadcrumb-bg-2.jpg"
          crumbs={[
            { label: 'Home', to: '/' },
            { label: 'Projects' },
          ]}
        />

        <section className="py-20 bg-alabaster">
          <div className="container-pia">
            {/* Filter Tabs */}
            <div className="flex justify-center items-center flex-wrap gap-2.5 mb-10">
              {filters.map((f) => {
                const isActive = activeFilter === f
                return (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setActiveFilter(f)}
                    className={`px-6 py-2.5 rounded-full text-sm font-semibold capitalize tracking-wide cursor-pointer outline-none transition-all border-2 ${
                      isActive
                        ? 'border-brass bg-brass text-obsidian shadow-[0_4px_14px_rgba(196,155,93,0.4)]'
                        : 'border-brass/30 bg-obsidian text-alabaster hover:border-brass shadow-xs'
                    }`}
                  >
                    {f === 'all' ? 'All Projects' : f.charAt(0).toUpperCase() + f.slice(1)}
                  </button>
                )
              })}
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {filtered.map((p) => {
                const isSelected = activeCardId === p.id
                return (
                  <div
                    key={p.id}
                    onClick={(e) => handleCardClick(e, p)}
                    className="group relative rounded-lg overflow-hidden h-[260px] bg-obsidian cursor-pointer shadow-sm"
                  >
                    <img
                      src={p.img}
                      alt={p.title}
                      className={`w-full h-full object-cover transition-transform duration-500 ${
                        isSelected ? 'scale-108' : 'group-hover:scale-105'
                      }`}
                    />

                    {/* Default Title Bar */}
                    <div
                      className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent pt-6 pb-3 px-3.5 flex flex-col justify-end transition-opacity duration-300 ${
                        isSelected ? 'opacity-0 pointer-events-none' : 'opacity-100 group-hover:opacity-0'
                      }`}
                    >
                      <span className="text-brass text-[11px] font-semibold uppercase tracking-widest">
                        {p.category}
                      </span>
                      <h3 className="text-alabaster text-[15px] font-semibold mt-0.5 mb-0 leading-snug">
                        {p.title}
                      </h3>
                    </div>

                    {/* Tap / Hover Overlay */}
                    <div
                      className={`absolute inset-0 bg-obsidian/92 backdrop-blur-xs border-[1.5px] border-brass rounded-lg p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 z-10 ${
                        isSelected
                          ? 'opacity-100 visible'
                          : 'opacity-0 invisible group-hover:opacity-100 group-hover:visible'
                      }`}
                    >
                      <div>
                        <span className="inline-block bg-brass/15 text-brass px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase mb-2">
                          {p.category}
                        </span>
                        <h3 className="text-alabaster text-base font-semibold mt-0 mb-2 leading-snug">
                          {p.title}
                        </h3>
                        <p className="text-alabaster/85 text-xs leading-relaxed m-0 line-clamp-2">
                          {p.summary}
                        </p>
                      </div>

                      <button
                        type="button"
                        className="view-details-btn w-full py-2.5 px-4 text-xs font-bold rounded-full bg-brass text-obsidian border-0 shadow-md cursor-pointer inline-flex items-center justify-center gap-1.5 uppercase tracking-wider hover:bg-alabaster transition-colors"
                        onClick={(e) => {
                          e.stopPropagation()
                          router.push(`/projects/${p.slug || p.id}`)
                        }}
                      >
                        Details <ChevronRight size={12} />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="bg-obsidian py-14 border-y border-brass/30">
          <div className="container-pia">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-alabaster m-0">
                Have a Project in Mind? Let&apos;s Discuss It.
              </h3>
              <Link className="btn-one shrink-0" href="/contact">
                Book Appointment <ChevronRight size={14} />
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
