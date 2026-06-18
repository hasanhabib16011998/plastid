import { Link } from 'react-router-dom'

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
      <section className="breadcrumb-area style2" style={{ backgroundImage: `url(${bg})` }}>
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="inner-content-box clearfix">
                <div className="title-s2 text-center">
                  {subtitle && <span>{subtitle}</span>}
                  <h1>{title}</h1>
                </div>
                {crumbs.length > 0 && (
                  <div className="breadcrumb-menu float-left">
                    <ul className="clearfix">
                      {crumbs.map((crumb, i) =>
                        crumb.to ? (
                          <li key={i}><Link to={crumb.to}>{crumb.label}</Link></li>
                        ) : (
                          <li key={i} className="active">{crumb.label}</li>
                        )
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="breadcrumb-area" style={{ backgroundImage: `url(${bg})` }}>
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="inner-content clearfix">
              <div className="title">
                <h1>{title}</h1>
              </div>
              {crumbs.length > 0 && (
                <div className="breadcrumb-menu float-right">
                  <ul className="clearfix">
                    {crumbs.map((crumb, i) =>
                      crumb.to ? (
                        <li key={i}><Link to={crumb.to}>{crumb.label}</Link></li>
                      ) : (
                        <li key={i} className="active">{crumb.label}</li>
                      )
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
