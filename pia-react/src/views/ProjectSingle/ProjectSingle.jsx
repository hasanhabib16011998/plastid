'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, X, Search } from 'lucide-react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb'
import PIALoader from '../../components/PIALoader/PIALoader'
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop'

export default function ProjectSingle({ project }) {
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const [mobileSlide, setMobileSlide] = useState(0)
  const touchStartXRef = useRef(null)
  const touchEndXRef = useRef(null)

  useEffect(() => {
    function handleKeyDown(e) {
      if (lightboxIndex === null) return
      const gallery = project?.galleryItems || []
      if (gallery.length === 0) return

      if (e.key === 'Escape') {
        setLightboxIndex(null)
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev > 0 ? prev - 1 : gallery.length - 1))
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev < gallery.length - 1 ? prev + 1 : 0))
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxIndex, project])

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col bg-alabaster">
        <Header />
        <main className="flex-1">
          <Breadcrumb
            style="style2"
            title="Project Not Found"
            subtitle="Project Detail"
            bgImage="/images/resources/breadcrumb-bg-2.jpg"
            crumbs={[
              { label: 'Home', to: '/' },
              { label: 'Projects', to: '/projects' },
              { label: 'Not Found' },
            ]}
          />
          <section className="py-20 text-center">
            <div className="container-pia">
              <h2 className="font-serif text-3xl text-obsidian mb-4">Project Not Found</h2>
              <p className="text-ink mb-6">The requested project could not be found.</p>
              <Link href="/projects" className="btn-one">
                Back to All Projects <ChevronRight size={14} />
              </Link>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    )
  }

  const galleryList =
    project.galleryItems && project.galleryItems.length > 0
      ? project.galleryItems
      : (project.galleryImgs || []).map((url) => ({ url, caption: '' }))

  const handleTouchStart = (e) => {
    touchStartXRef.current = e.targetTouches[0].clientX
  }
  const handleTouchMove = (e) => {
    touchEndXRef.current = e.targetTouches[0].clientX
  }
  const handleTouchEnd = () => {
    if (!touchStartXRef.current || !touchEndXRef.current) return
    const distance = touchStartXRef.current - touchEndXRef.current
    if (distance > 40) {
      setMobileSlide((prev) => (prev < galleryList.length - 1 ? prev + 1 : 0))
    } else if (distance < -40) {
      setMobileSlide((prev) => (prev > 0 ? prev - 1 : galleryList.length - 1))
    }
    touchStartXRef.current = null
    touchEndXRef.current = null
  }

  return (
    <div className="min-h-screen flex flex-col bg-alabaster">
      <PIALoader />
      <Header />

      <main className="flex-1">
        <Breadcrumb
          style="style2"
          title={project.title}
          subtitle="Project Detail"
          bgImage="/images/resources/breadcrumb-bg-2.jpg"
          crumbs={[
            { label: 'Home', to: '/' },
            { label: 'Projects', to: '/projects' },
            { label: project.title },
          ]}
        />

        <section className="py-12 sm:py-16 bg-alabaster">
          <div className="container-pia">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-8">
                {/* Hero Image */}
                <div className="mb-6 rounded-lg overflow-hidden shadow-sm">
                  <img
                    src={project.mainImg}
                    alt={project.title}
                    className="w-full h-auto block"
                  />
                </div>

                {/* Description */}
                <div className="mb-7">
                  <h2 className="font-serif text-2xl sm:text-3xl text-heading font-medium tracking-[-0.025em] mb-3">
                    Project Overview
                  </h2>
                  <p className="text-ink leading-[1.7] text-[15.5px] m-0">{project.description}</p>
                </div>

                {/* Challenge & Solution */}
                {(project.challenge || project.solution) && (
                  <div
                    className={`grid gap-5 mb-8 ${
                      project.challenge && project.solution ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'
                    }`}
                  >
                    {project.challenge && (
                      <div className="bg-chalk p-6 rounded-lg border border-stone-border border-l-4 border-l-obsidian h-full">
                        <h3 className="font-serif text-xl text-obsidian font-semibold mb-2.5">
                          The Challenge
                        </h3>
                        <p className="text-ink leading-relaxed text-sm m-0 whitespace-pre-line">
                          {project.challenge}
                        </p>
                      </div>
                    )}
                    {project.solution && (
                      <div className="bg-charcoal p-6 rounded-lg border-l-4 border-brass h-full">
                        <h3 className="font-serif text-xl text-brass font-semibold mb-2.5">
                          Our Solution
                        </h3>
                        <p className="text-alabaster/90 leading-relaxed text-sm m-0 whitespace-pre-line">
                          {project.solution}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <aside className="lg:col-span-4 space-y-6">
                {/* Project Info */}
                <div className="bg-chalk p-6 rounded-lg border border-stone-border">
                  <h3 className="font-serif text-xl text-obsidian font-semibold mb-4 pb-2.5 border-b-2 border-bronze">
                    Project Information
                  </h3>
                  <div className="divide-y divide-stone-border">
                    {[
                      { label: 'Category', value: project.category },
                      { label: 'Client', value: project.client },
                      { label: 'Location', value: project.location },
                      { label: 'Project Area', value: project.area },
                      { label: 'Duration', value: project.duration },
                      { label: 'Year Completed', value: project.year },
                    ]
                      .filter((info) => Boolean(info.value) && info.value !== 'N/A')
                      .map((info, i) => (
                        <div key={i} className="flex justify-between gap-4 py-2.5 text-sm">
                          <span className="font-semibold text-obsidian">{info.label}:</span>
                          <span className="text-ink text-right">{info.value}</span>
                        </div>
                      ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="bg-charcoal border border-brass/50 p-7 rounded-lg text-center">
                  <h3 className="font-serif text-2xl text-brass font-semibold mb-2.5">
                    Start Your Project
                  </h3>
                  <p className="text-alabaster/90 mb-5 text-sm">
                    Ready to transform your space?
                  </p>
                  <Link className="btn-one w-full" href="/contact">
                    Contact Us <ChevronRight size={14} />
                  </Link>
                </div>

                {/* Back Navigation */}
                <Link href="/projects" className="btn-two w-full">
                  <ChevronLeft size={14} /> Back to All Projects
                </Link>
              </aside>
            </div>

            {/* Full-Width Project Gallery */}
            {galleryList.length > 0 && (
              <div className="mt-10 pt-4">
                <h2 className="font-serif text-2xl sm:text-3xl text-heading font-medium tracking-[-0.025em] mb-5">
                  Project Gallery
                </h2>

                {/* Desktop Grid */}
                <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {galleryList.map((item, i) => (
                    <div key={i}>
                      <div
                        onClick={() => setLightboxIndex(i)}
                        className="group relative rounded-lg overflow-hidden h-[250px] bg-obsidian cursor-pointer shadow-sm hover:scale-[1.02] hover:shadow-lg transition-all duration-300"
                      >
                        <img
                          src={typeof item === 'string' ? item : item.url}
                          alt={item.caption || `Gallery Image ${i + 1}`}
                          className="w-full h-full object-cover block"
                        />
                        <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <span className="inline-flex items-center gap-1.5 text-white text-xs bg-black/65 px-3.5 py-1.5 rounded-full border border-brass">
                            <Search size={13} className="text-brass" /> Click to Enlarge
                          </span>
                        </div>
                      </div>
                      {item.caption && (
                        <p className="mt-1.5 text-[13px] text-ink italic text-center">
                          {item.caption}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Mobile Carousel */}
                <div className="md:hidden relative overflow-hidden rounded-lg">
                  <div
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    className="flex transition-transform duration-300"
                    style={{ transform: `translateX(-${mobileSlide * 100}%)` }}
                  >
                    {galleryList.map((item, i) => (
                      <div
                        key={i}
                        onClick={() => setLightboxIndex(i)}
                        className="min-w-full px-0.5"
                      >
                        <div className="relative rounded-lg overflow-hidden h-[240px] bg-obsidian">
                          <img
                            src={typeof item === 'string' ? item : item.url}
                            alt={item.caption || `Gallery Image ${i + 1}`}
                            className="w-full h-full object-cover block"
                          />
                          <div className="absolute top-2.5 right-2.5 bg-black/65 text-white text-[11px] px-2 py-0.5 rounded-full">
                            {i + 1} / {galleryList.length}
                          </div>
                        </div>
                        {item.caption && (
                          <p className="mt-2 text-[13px] text-ink italic text-center">
                            {item.caption}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>

                  {galleryList.length > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-3">
                      <button
                        type="button"
                        aria-label="Previous slide"
                        onClick={() =>
                          setMobileSlide((prev) => (prev > 0 ? prev - 1 : galleryList.length - 1))
                        }
                        className="w-8 h-8 rounded-full bg-obsidian text-brass border border-brass flex items-center justify-center cursor-pointer"
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <div className="flex gap-1.5">
                        {galleryList.map((_, i) => (
                          <button
                            key={i}
                            type="button"
                            aria-label={`Slide ${i + 1}`}
                            onClick={() => setMobileSlide(i)}
                            className={`h-2 rounded-full border-0 cursor-pointer transition-all ${
                              mobileSlide === i ? 'w-4.5 bg-brass' : 'w-2 bg-neutral-300'
                            }`}
                          />
                        ))}
                      </div>
                      <button
                        type="button"
                        aria-label="Next slide"
                        onClick={() =>
                          setMobileSlide((prev) => (prev < galleryList.length - 1 ? prev + 1 : 0))
                        }
                        className="w-8 h-8 rounded-full bg-obsidian text-brass border border-brass flex items-center justify-center cursor-pointer"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && galleryList[lightboxIndex] && (
        <div
          onClick={() => setLightboxIndex(null)}
          className="fixed inset-0 z-[99999] bg-black/92 backdrop-blur-md flex items-center justify-center p-5"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-obsidian rounded-xl border-2 border-brass shadow-2xl overflow-hidden flex flex-col items-center"
          >
            <button
              type="button"
              aria-label="Close lightbox"
              onClick={() => setLightboxIndex(null)}
              className="absolute top-3.5 right-3.5 bg-black/65 text-brass border border-brass rounded-full w-9 h-9 cursor-pointer z-10 flex items-center justify-center hover:bg-brass hover:text-obsidian transition-colors"
            >
              <X size={18} />
            </button>

            <div className="relative w-full flex justify-center items-center bg-obsidian p-4">
              <img
                src={
                  typeof galleryList[lightboxIndex] === 'string'
                    ? galleryList[lightboxIndex]
                    : galleryList[lightboxIndex].url
                }
                alt={galleryList[lightboxIndex].caption || 'Gallery preview'}
                className="max-h-[70vh] max-w-full object-contain rounded-md"
              />

              {galleryList.length > 1 && (
                <>
                  <button
                    type="button"
                    aria-label="Previous image"
                    onClick={(e) => {
                      e.stopPropagation()
                      setLightboxIndex((prev) => (prev > 0 ? prev - 1 : galleryList.length - 1))
                    }}
                    className="absolute left-5 bg-obsidian/85 text-brass border-[1.5px] border-brass rounded-full w-11 h-11 cursor-pointer flex items-center justify-center hover:bg-brass hover:text-obsidian transition-colors"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    type="button"
                    aria-label="Next image"
                    onClick={(e) => {
                      e.stopPropagation()
                      setLightboxIndex((prev) => (prev < galleryList.length - 1 ? prev + 1 : 0))
                    }}
                    className="absolute right-5 bg-obsidian/85 text-brass border-[1.5px] border-brass rounded-full w-11 h-11 cursor-pointer flex items-center justify-center hover:bg-brass hover:text-obsidian transition-colors"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>

            <div className="w-full px-5 py-3.5 bg-obsidian text-alabaster flex justify-between items-center border-t border-brass/30">
              <span className="text-sm font-medium">
                {galleryList[lightboxIndex].caption || project.title}
              </span>
              <span className="text-xs text-brass font-semibold bg-brass/15 px-2.5 py-0.5 rounded-full">
                {lightboxIndex + 1} / {galleryList.length}
              </span>
            </div>
          </div>
        </div>
      )}

      <Footer />
      <ScrollToTop />
    </div>
  )
}
