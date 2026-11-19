'use client'

import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb'
import PIALoader from '../../components/PIALoader/PIALoader'
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop'

const companyPillars = [
  {
    title: 'Bespoke Vision',
    text: 'Every project begins with understanding your unique lifestyle or business goals, translating visions into timeless architectural realities.',
  },
  {
    title: 'Design Fee Credit',
    text: 'Our BDT 40/sqft 3D design fee acts as a security deposit, with 50% refunded after project completion when you execute the project with us.',
  },
  {
    title: 'Full Turnkey Execution',
    text: 'From initial 3D blueprints to site engineering, quantity surveying, and final handover, we manage every detail seamlessly.',
  },
]

const historyItems = [
  {
    year: 'Mar 2024',
    badge: 'Foundation',
    title: 'Plastid Interior and Architecture\nFounded in Dhaka',
    text: 'Plastid Interior and Architecture was established in March 2024 in Dhaka with a singular vision — to revolutionize living and working environments through bespoke, human-centered design. Starting with custom residential turnkeys, we built a foundation based on quality craftsmanship, structural precision, and transparent client collaboration.',
    img: '/images/resources/history-1.jpg',
  },
  {
    year: '2025',
    badge: 'Expansion',
    title: 'Nationwide Expansion &\nCorporate Workspaces',
    text: 'Building on early residential successes, Plastid expanded studio operations across major divisions in Bangladesh. We launched specialized commercial & corporate design divisions, delivering high-impact corporate headquarters, retail environments, and luxury residential projects.',
    img: '/images/resources/history-2.jpg',
  },
  {
    year: '2026',
    badge: 'Excellence',
    title: 'Architectural Mastery &\n100+ Completed Works',
    text: 'Today, Plastid Interior and Architecture stands as a leading full-service design-build firm in Bangladesh with over 20 completed works. Our multi-disciplinary team of 3D designers, quantity surveyors, procurement experts, and site engineers delivers seamless end-to-end luxury turnkeys.',
    img: '/images/services/service-single/how-work.jpg',
  },
]

function CompanyTimeline() {
  const [index, setIndex] = useState(0)
  const item = historyItems[index]

  return (
    <div className="relative mt-5">
      {/* Year Navigation Bar */}
      <div className="relative flex items-center justify-between mb-12 px-5">
        {/* Connecting Gold Line */}
        <div className="absolute top-1/2 left-10 right-10 h-0.5 bg-brass/25 -translate-y-1/2 z-0">
          <div
            className="h-full bg-brass transition-all duration-500"
            style={{ width: `${(index / (historyItems.length - 1)) * 100}%` }}
          />
        </div>

        {/* Milestone Nodes */}
        {historyItems.map((h, i) => {
          const isActive = i === index
          return (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Milestone ${h.year}`}
              className="relative z-10 flex flex-col items-center bg-transparent border-0 cursor-pointer outline-none p-0"
            >
              <div
                className={`rounded-full flex items-center justify-center transition-all duration-300 mb-2.5 ${
                  isActive
                    ? 'w-10.5 h-10.5 bg-obsidian border-[2.5px] border-brass shadow-[0_0_0_4px_rgba(196,155,93,0.25)]'
                    : 'w-7.5 h-7.5 bg-white border-2 border-brass/40'
                }`}
              >
                <div
                  className={`rounded-full bg-brass transition-all duration-300 ${
                    isActive ? 'w-3 h-3' : 'w-2 h-2'
                  }`}
                />
              </div>
              <span
                className={`font-sans transition-colors duration-300 ${
                  isActive
                    ? 'text-[13px] font-semibold text-brass'
                    : 'text-xs font-medium text-black/60'
                }`}
              >
                {h.year}
              </span>
            </button>
          )
        })}
      </div>

      {/* Active Milestone Details Card */}
      <div className="bg-white rounded-lg border border-brass/30 shadow-md overflow-hidden p-6 sm:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="relative rounded-md overflow-hidden max-h-[360px] shadow-md">
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-[300px] sm:h-[340px] object-cover block"
            />
            <div className="absolute top-4 left-4 bg-obsidian text-brass px-3.5 py-1.5 rounded-full border border-brass text-[11px] font-semibold tracking-[0.15em] uppercase">
              {item.badge}
            </div>
          </div>

          <div className="lg:pl-4">
            <div className="font-serif text-5xl sm:text-6xl leading-none font-light text-brass mb-2.5 tracking-tight">
              {item.year}
            </div>
            <h3 className="font-serif text-2xl sm:text-[28px] leading-snug text-obsidian mb-4 whitespace-pre-line font-medium">
              {item.title}
            </h3>
            <p className="text-[15px] leading-[1.8] text-black/80 m-0">{item.text}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function About({ initialTeam = [] }) {
  const teamRef = useRef(null)
  const [teamList] = useState(initialTeam)

  useEffect(() => {
    if (teamRef.current) {
      const cards = teamRef.current.querySelectorAll('.single-team-member')
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out' }
      )
    }
  }, [teamList])

  return (
    <div className="min-h-screen flex flex-col bg-alabaster">
      <PIALoader />
      <Header />

      <main className="flex-1">
        <Breadcrumb
          title={
            <>
              Crafting Timeless
              <br /> Architecture &amp; Interiors.
            </>
          }
          subtitle="About Plastid Interior"
          crumbs={[
            { label: 'Home', to: '/' },
            { label: 'About Us' },
          ]}
        />

        {/* Company Overview & Founders */}
        <section className="py-20 bg-alabaster">
          <div className="container-pia">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              <div className="lg:col-span-5">
                <div className="relative">
                  <div className="rounded-md overflow-hidden shadow-lg">
                    <img
                      src="/images/resources/about-image.jpg"
                      alt="Plastid Leadership"
                      className="w-full h-auto block"
                    />
                  </div>
                  {/* Founder Quote Card */}
                  <div className="mt-4 sm:mt-0 sm:absolute sm:-bottom-6 sm:-right-4 sm:max-w-[300px] bg-obsidian border border-brass/50 rounded-md p-5 shadow-xl">
                    <p className="font-serif italic text-alabaster text-[15px] leading-snug mb-2">
                      &ldquo;Design is not just what it looks like, but how it transforms everyday
                      life.&rdquo;
                    </p>
                    <span className="text-brass text-[11px] font-semibold tracking-[0.15em] uppercase">
                      Md. Mozammel Hossain
                    </span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 lg:pl-6">
                <div className="mb-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ochre-dark mb-1.5">
                    About Company
                  </p>
                  <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-obsidian m-0">
                    Crafting Bespoke <span className="text-brass">Architectural Realities</span>
                  </h2>
                </div>
                <p className="text-[15.5px] leading-[1.82] text-black/85 mb-5">
                  Plastid Interior and Architecture is a premier full-service interior design and
                  architectural execution firm based in Dhaka, Bangladesh. With a passion for
                  structural innovation and a commitment to precision, we craft bespoke living and
                  working environments across Bangladesh.
                </p>
                <p className="text-[15px] leading-[1.8] text-black/75 mb-7">
                  From 3D concept merchandising to full turnkey site engineering, our
                  multi-disciplinary team collaborates closely with clients to deliver timeless
                  spaces. Our signature design-fee credit policy ensures complete financial
                  transparency from start to finish.
                </p>

                {/* Company Pillars Mini Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {companyPillars.map((p, i) => (
                    <div
                      key={i}
                      className="bg-white border border-brass/25 rounded-md p-4 h-full"
                    >
                      <h3 className="font-serif text-lg text-obsidian mb-2 font-medium">
                        {p.title}
                      </h3>
                      <p className="text-xs leading-relaxed text-black/70 m-0">{p.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Timeline Section */}
        <section className="py-20 bg-white">
          <div className="container-pia">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ochre-dark mb-1.5">
                Our Journey
              </p>
              <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-obsidian m-0">
                Company Timeline &amp; <span className="text-brass">Milestones</span>
              </h2>
            </div>
            <CompanyTimeline />
          </div>
        </section>

        {/* Team Section */}
        <section ref={teamRef} className="py-20 bg-alabaster">
          <div className="container-pia">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ochre-dark mb-1.5">
                Behind Our Success
              </p>
              <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-obsidian m-0">
                Expert &amp; Dedicated <span className="text-brass">Team</span>
              </h2>
            </div>

            {teamList.length === 0 ? (
              <div className="text-center text-neutral-500 py-8">
                <p className="text-[15px] italic">No team members added yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-7">
                {teamList.map((m, i) => (
                  <div
                    key={i}
                    className="single-team-member flex flex-col justify-between bg-white rounded-md overflow-hidden border border-brass/25 shadow-xs hover:-translate-y-1.5 hover:border-brass hover:shadow-lg transition-all duration-300"
                  >
                    <div className="overflow-hidden h-[240px] sm:h-[260px] shrink-0">
                      <img
                        src={m.img}
                        alt={m.name}
                        className="w-full h-full object-cover block"
                      />
                    </div>
                    <div className="text-center px-4 py-5 flex-1 flex flex-col justify-center items-center">
                      <span className="text-brass text-[11px] font-semibold tracking-[0.15em] uppercase mb-1.5">
                        {m.role}
                      </span>
                      <h3 className="font-serif text-lg sm:text-xl text-obsidian font-medium m-0">
                        {m.name}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  )
}
