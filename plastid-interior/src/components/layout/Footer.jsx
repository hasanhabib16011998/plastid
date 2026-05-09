import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="container">
          <div className="row">
            {/* About Section */}
            <div className="footer-widget">
              <div className="footer-logo">
                <Link to="/">
                  <img src="/images/resources/logo.png" alt="Plastid Logo" />
                </Link>
              </div>
              <div className="footer-text">
                <p>Plastid Interior and Architecture is a visionary design firm dedicated to creating captivating spaces.</p>
              </div>
              <ul className="footer-social-links">
                <li>
                  <a href="https://www.facebook.com/profile.php?id=61555749343330" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-facebook"></i>
                  </a>
                </li>
                <li>
                  <a href="#" title="Skype">
                    <i className="fab fa-skype"></i>
                  </a>
                </li>
                <li>
                  <a href="#" title="LinkedIn">
                    <i className="fab fa-linkedin"></i>
                  </a>
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div className="footer-widget">
              <h4 className="footer-title">Quick Links</h4>
              <ul className="footer-menu-list">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/services">Services</Link></li>
                <li><Link to="/projects">Projects</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>

            {/* Services */}
            <div className="footer-widget">
              <h4 className="footer-title">Our Services</h4>
              <ul className="footer-menu-list">
                <li><Link to="/services/concept-designs">Concept Designs</Link></li>
                <li><Link to="/services/project-designs">Project Designs</Link></li>
                <li><Link to="/services/make-overs">Make Overs</Link></li>
                <li><Link to="/services/consulting">Consulting</Link></li>
                <li><Link to="/services/space-planning">Space Planning</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="footer-widget">
              <h4 className="footer-title">Contact Us</h4>
              <div className="footer-contact-info">
                <div className="contact-item">
                  <p><strong>Address:</strong><br />
                     House-11 (2nd Floor), Block-E, Sector-1,<br />
                     Aftab Nagar Main Rd, Dhaka 1212</p>
                </div>
                <div className="contact-item">
                  <p><strong>Phone:</strong><br />
                     <a href="tel:+8801768834417">+880 1768834417</a></p>
                </div>
                <div className="contact-item">
                  <p><strong>Email:</strong><br />
                     <a href="mailto:info@pcd-bd.com">info@pcd-bd.com</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-inner">
            <p className="copyright">
              &copy; {currentYear} Plastid Interior and Architecture. All rights reserved.
            </p>
            <ul className="footer-bottom-links">
              <li><Link to="#">Privacy Policy</Link></li>
              <li><Link to="#">Terms & Conditions</Link></li>
              <li><Link to="#">Sitemap</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;