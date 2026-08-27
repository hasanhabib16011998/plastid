import { Link } from 'react-router-dom'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <>
      <footer className="footer-area">
        <div className="footer-shape-bg"></div>
        <div className="container">
          <div className="row">
            {/* Contact Info Column */}
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
              <div className="single-footer-widget marbtm50">
                <div className="contact-info-box">
                  <div className="footer-logo">
                    <Link to="/">
                      <img src="/images/resources/logo.png" alt="PIA Logo" style={{ width: 'auto', height: '80px', maxWidth: '100%' }} />
                    </Link>
                  </div>
                  <ul>
                    <li>
                      <h6>Address</h6>
                      <p>House-11 (2nd Floor),Block-E,Sector-1,<br />Aftab Nagar Main Rd,Dhaka 1212</p>
                    </li>
                    <li>
                      <h6>Phone</h6>
                      <p>+880 1768834417<br /><span>Saturday - Thursday:</span> 9.00am to 6.00pm</p>
                    </li>
                    <li>
                      <h6>Email</h6>
                      <p>info@pcd-bd.com<br />plastidarchitecture@gmail.com</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Services Links Column */}
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
              <div className="single-footer-widget marbtm50">
                <div className="title">
                  <h3>Services</h3>
                </div>
                <div className="services-links">
                  <ul>
                    <li><Link to="/services/concept-designs">Concept Designs</Link></li>
                    <li><Link to="/services/project-designs">Project Designs</Link></li>
                    <li><Link to="/services/make-overs">Make Overs</Link></li>
                    <li><Link to="/services/consulting">Consulting</Link></li>
                    <li><Link to="/services/glass-wrought">Glass &amp; Wrought</Link></li>
                    <li><Link to="/services/space-planning">Space Planning</Link></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Brochure Column */}
            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
              <div className="single-footer-widget">
                <div className="single-item">
                  <div className="img-holder">
                    <img src="/images/footer/brochures-1.jpg" alt="Brochure" />
                  </div>
                  <div className="title-holder">
                    <h3>Our Interior Design<br /> Brochure</h3>
                    <a className="btn-two" href="#">Download Now<span className="flaticon-next"></span></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Start footer bottom area */}
      <section className="footer-bottom-area style2">
        <div className="container">
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
              <div className="copyright-text text-center">
                <p>
                  Copyright &copy; {currentYear} <Link to="/">Plastid Interior &amp; Architecture</Link>. All Rights Reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
