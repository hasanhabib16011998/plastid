// Reusable section header with label + headline
export default function SectionHeader({ label, title, subtitle, center = false, className = '' }) {
  return (
    <div className={`mb-12 md:mb-16 ${center ? 'text-center' : ''} ${className}`}>
      <div className={`flex items-center gap-3 mb-4 ${center ? 'justify-center' : ''}`}>
        {center && <div className="h-px w-12" style={{ background: 'linear-gradient(to right,transparent,var(--gold-mid))' }} />}
        {!center && <div className="w-7 h-px" style={{ background: 'var(--gold-mid)' }} />}
        <span className="section-label" style={{ fontSize: '0.6rem' }}>{label}</span>
        {center && <div className="h-px w-12" style={{ background: 'linear-gradient(to left,transparent,var(--gold-mid))' }} />}
      </div>
      <h2
        className="font-display leading-[1.08]"
        style={{
          fontSize: 'clamp(2.2rem,5vw,4.5rem)',
          color: 'var(--text-primary)',
          fontWeight: 400,
        }}
        dangerouslySetInnerHTML={{ __html: title }}
      />
      {subtitle && (
        <p
          className="mt-4 text-sm md:text-base leading-7 max-w-2xl"
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
