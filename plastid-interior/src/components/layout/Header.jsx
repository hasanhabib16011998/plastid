import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import './Header.css';
import logo from '@images/resources/logo.png'

const Header = () => {
  return (
    <header className="main-header">
      {/* Header Upper */}
      <div className="header-upper">
        <div className="container">
          <div className="header-inner">
            <div className="logo-box">
              <Link to="/">
                <img src={logo} alt="PIA Logo" />
              </Link>
            </div>
            <div className="main-menu-box">
              <NavBar />
            </div>
          </div>
        </div>
      </div>

      {/* Header Lower */}
      <div className="header-lower">
        <div className="container">
          <div className="header-content">
            <ul className="header-contact-info">
              <li>
                <div className="contact-item">
                  <div className="icon">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div className="text">
                    <h3>Dhaka, Bangladesh</h3>
                    <p>House-11 (2nd Floor), Block-E, Sector-1,<br />
                       Aftab Nagar Main Rd, Dhaka 1212</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="contact-item">
                  <div className="icon">
                    <i className="fas fa-phone"></i>
                  </div>
                  <div className="text">
                    <h3>+880 1768834417</h3>
                  </div>
                </div>
              </li>
              <li>
                <div className="contact-item">
                  <div className="icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className="text">
                    <h3>info@pcd-bd.com</h3>
                    <p>Get a Free Quote</p>
                  </div>
                </div>
              </li>
            </ul>

            <ul className="header-social-links">
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
        </div>
      </div>
    </header>
  );
};

export default Header;