import { Link } from 'react-router-dom'
import { ArrowUpRight, Phone, Mail, MapPin } from 'lucide-react'

const IconInstagram = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
)
const IconFacebook = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
)
const IconLinkedin = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
  </svg>
)
const IconX = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
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
    <footer style={{ background: '#080807', borderTop: '1px solid rgba(200,137,26,0.1)' }}>
      <div className="container">
        {/* Main grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 py-16 md:py-20 border-b" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <Link to="/" className="inline-flex flex-col leading-none mb-5">
              <span className="font-accent gold-text text-3xl font-bold tracking-widest">SUN</span>
              <span className="text-[0.5rem] tracking-[0.5em] uppercase" style={{ color: 'rgba(245,240,232,0.3)' }}>Real Estate</span>
            </Link>
            <p className="text-sm leading-7 mb-6 max-w-xs" style={{ color: 'rgba(245,240,232,0.35)', fontWeight: 300 }}>
              Crafting extraordinary living experiences across Dhaka's most prestigious addresses since 2005.
            </p>
            {/* Quick contact */}
            <div className="flex flex-col gap-2.5 mb-7">
              {[
                { Icon: Phone,  val: '+880 1700-000000' },
                { Icon: Mail,   val: 'hello@sunrealestate.com.bd' },
                { Icon: MapPin, val: 'Gulshan-1, Dhaka 1212' },
              ].map(({ Icon, val }, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <Icon size={12} style={{ color: 'var(--gold-mid)', flexShrink: 0 }} />
                  <span className="text-xs" style={{ color: 'rgba(245,240,232,0.4)' }}>{val}</span>
                </div>
              ))}
            </div>
            {/* Socials */}
            <div className="flex items-center gap-3">
              {socials.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center transition-all duration-300"
                  style={{
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: 'rgba(245,240,232,0.4)',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--gold)'; e.currentTarget.style.borderColor = 'rgba(200,137,26,0.5)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(245,240,232,0.4)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {navCols.map(col => (
            <div key={col.title} className="col-span-1">
              <h5 className="section-label mb-5" style={{ fontSize: '0.6rem' }}>{col.title}</h5>
              <ul className="flex flex-col gap-3">
                {col.links.map(l => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="text-xs transition-colors duration-200"
                      style={{ color: 'rgba(245,240,232,0.35)', fontFamily: 'Inter,sans-serif' }}
                      onMouseEnter={e => { e.currentTarget.style.color = 'var(--gold)'; }}
                      onMouseLeave={e => { e.currentTarget.style.color = 'rgba(245,240,232,0.35)'; }}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA strip */}
        <div
          className="my-12 p-8 md:p-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          style={{ background: 'linear-gradient(135deg,rgba(200,137,26,0.08),rgba(42,45,24,0.35))', border: '1px solid rgba(200,137,26,0.18)' }}
        >
          <div>
            <h3 className="font-display text-2xl md:text-3xl mb-2" style={{ color: 'var(--text-primary)', fontWeight: 400 }}>
              Ready to Elevate Your{' '}
              <span className="italic gold-text">Living Standard?</span>
            </h3>
            <p className="text-sm" style={{ color: 'rgba(245,240,232,0.4)', fontWeight: 300 }}>
              Talk to our consultants and find your perfect property.
            </p>
          </div>
          <Link to="/contact" className="btn-solid shrink-0 flex items-center gap-2">
            Get Started <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-6">
          <p className="text-xs" style={{ color: 'rgba(245,240,232,0.2)' }}>
            © {new Date().getFullYear()} Sun Real Estate Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {['Privacy Policy','Terms','Cookies'].map(t => (
              <a key={t} href="#" className="text-xs transition-colors" style={{ color: 'rgba(245,240,232,0.2)' }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--gold)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(245,240,232,0.2)'; }}
              >
                {t}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
