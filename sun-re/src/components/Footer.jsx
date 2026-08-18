import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin } from 'lucide-react'

const IconInstagram = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
)
const IconFacebook = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
)
const IconLinkedin = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
  </svg>
)
const IconX = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.733-8.835L1.254 2.25H8.08l4.261 5.632 5.903-5.632Zm-1.161 17.52h1.833L7.084 4.126H5.117Z"/>
  </svg>
)

const socials = [
  { Icon: IconInstagram, label: 'Instagram', href: '#' },
  { Icon: IconFacebook,  label: 'Facebook',  href: '#' },
  { Icon: IconLinkedin,  label: 'LinkedIn',  href: '#' },
  { Icon: IconX,         label: 'X/Twitter', href: '#' },
]

const navCols = [
  {
    title: 'Company',
    links: [
      { label: 'About Us',    to: '/about'    },
      { label: 'Our Team',    to: '/team'     },
      { label: 'Careers',     to: '/contact'  },
      { label: 'Press',       to: '/about'    },
    ],
  },
  {
    title: 'Projects',
    links: [
      { label: 'Sun Aura Towers',     to: '/projects' },
      { label: 'Penthouse Collection',to: '/projects' },
      { label: 'Infinity Tower',      to: '/projects' },
      { label: 'Upcoming Projects',   to: '/projects' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Residential',    to: '/services' },
      { label: 'Commercial',     to: '/services' },
      { label: 'Investment',     to: '/services' },
      { label: 'Prop. Mgmt.',    to: '/services' },
    ],
  },
]

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#080807', color: '#f5f0e8', borderTop: '1px solid rgba(200,137,26,0.25)' }}>
      {/* Upper Main Footer */}
      <div className="container" style={{ paddingTop: '5.5rem', paddingBottom: '5.5rem' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-16 items-start">

          {/* Brand & Contact Column */}
          <div className="lg:col-span-2 flex flex-col" style={{ gap: '2rem' }}>
            {/* Logo */}
            <Link to="/" className="inline-block leading-none">
              <span className="font-accent gold-text text-4xl font-bold tracking-widest block">SUN</span>
              <span className="text-[0.6rem] tracking-[0.6em] uppercase text-amber-100/40 block" style={{ marginTop: '0.4rem' }}>
                Real Estate
              </span>
            </Link>

            {/* Description */}
            <p className="text-sm md:text-base text-neutral-400 font-light max-w-md" style={{ lineHeight: '1.8' }}>
              Crafting extraordinary living experiences across Dhaka's most prestigious addresses since 2005. Where architectural distinction meets timeless luxury.
            </p>

            {/* Contact Details List */}
            <div className="flex flex-col" style={{ gap: '1.25rem', paddingTop: '0.5rem' }}>
              <div className="flex items-center gap-3.5 text-xs md:text-sm text-neutral-300">
                <div className="w-8 h-8 flex items-center justify-center border border-[#c8891a]/30 bg-[#c8891a]/5 shrink-0">
                  <Phone size={14} className="text-[#c8891a]" />
                </div>
                <span>+880 1700-000000</span>
              </div>

              <div className="flex items-center gap-3.5 text-xs md:text-sm text-neutral-300">
                <div className="w-8 h-8 flex items-center justify-center border border-[#c8891a]/30 bg-[#c8891a]/5 shrink-0">
                  <Mail size={14} className="text-[#c8891a]" />
                </div>
                <span>hello@sunrealestate.com.bd</span>
              </div>

              <div className="flex items-center gap-3.5 text-xs md:text-sm text-neutral-300">
                <div className="w-8 h-8 flex items-center justify-center border border-[#c8891a]/30 bg-[#c8891a]/5 shrink-0">
                  <MapPin size={14} className="text-[#c8891a]" />
                </div>
                <span>Plot 42, Gulshan-1, Dhaka 1212</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-4" style={{ paddingTop: '1rem' }}>
              {socials.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 flex items-center justify-center border border-white/10 text-neutral-400 hover:text-[#e5a827] hover:border-[#c8891a] hover:-translate-y-1 transition-all duration-300"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links Columns */}
          {navCols.map(col => (
            <div key={col.title} className="flex flex-col" style={{ gap: '1.75rem' }}>
              <h4 className="font-accent text-xs md:text-sm tracking-[0.3em] uppercase text-[#c8891a] pb-2 border-b border-white/10 inline-block self-start">
                {col.title}
              </h4>
              <ul className="flex flex-col" style={{ gap: '1.25rem' }}>
                {col.links.map(l => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="text-xs md:text-sm text-neutral-300 font-light hover:text-[#e5a827] transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-white/10 bg-[#050504]" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        <div className="container flex flex-col md:flex-row items-center justify-between gap-6 text-xs md:text-sm text-neutral-400 font-light">
          <p>© {new Date().getFullYear()} Sun Real Estate Ltd. All rights reserved. Dhaka, Bangladesh.</p>
          <div className="flex items-center gap-8">
            <a href="#" className="hover:text-[#e5a827] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#e5a827] transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-[#e5a827] transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
