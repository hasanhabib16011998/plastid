// Reusable section header with label + headline
export default function SectionHeader({ label, title, subtitle, center = false, className = '' }) {
  return (
    <div className={`mb-16 md:mb-24 ${center ? 'text-center' : ''} ${className}`}>
      <div className={`flex items-center gap-3.5 mb-5 ${center ? 'justify-center' : ''}`}>
        {center && <div className="h-px w-14" style={{ background: 'linear-gradient(to right,transparent,var(--gold-mid))' }} />}
        {!center && <div className="w-8 h-px" style={{ background: 'var(--gold-mid)' }} />}
        <span className="section-label" style={{ fontSize: '0.62rem' }}>{label}</span>
        {center && <div className="h-px w-14" style={{ background: 'linear-gradient(to left,transparent,var(--gold-mid))' }} />}
      </div>
      <h2
        className="font-display leading-[1.08]"
        style={{
          fontSize: 'clamp(2.3rem,5vw,4.6rem)',
          color: 'var(--text-primary)',
          fontWeight: 400,
        }}
        dangerouslySetInnerHTML={{ __html: title }}
      />
      {subtitle && (
        <p
          className="mt-6 text-sm md:text-base leading-8 max-w-2xl"
          style={{
            color: 'rgba(245,240,232,0.5)',
            fontWeight: 300,
            marginLeft: center ? 'auto' : undefined,
            marginRight: center ? 'auto' : undefined,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
