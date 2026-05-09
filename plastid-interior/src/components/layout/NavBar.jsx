import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const navItems = [
    { label: 'Home', path: '/' },
    {
      label: 'About Us',
      path: '/about',
      submenu: [
        { label: 'About Company', path: '/about' },
        { label: "FAQ's", path: '/faq' },
      ],
    },
    {
      label: 'Services',
      path: '/services',
      submenu: [
        { label: 'View All Services', path: '/services' },
        { label: 'Concept Designs', path: '/services/concept-designs' },
        { label: 'Project Designs', path: '/services/project-designs' },
        { label: 'Make Overs', path: '/services/make-overs' },
        { label: 'Consulting', path: '/services/consulting' },
        { label: 'Glass & Wrought', path: '/services/glass-wrought' },
        { label: 'Space Planning', path: '/services/space-planning' },
      ],
    },
    {
      label: 'Projects',
      path: '/projects',
      submenu: [
        { label: 'Classic View 01', path: '/projects/classic-1' },
        { label: 'Classic View 02', path: '/projects/classic-2' },
        { label: 'Modern View 01', path: '/projects/modern-1' },
        { label: 'Modern View 02', path: '/projects/modern-2' },
        { label: 'Fullwidth 01', path: '/projects/fullwidth-1' },
        { label: 'Fullwidth 02', path: '/projects/fullwidth-2' },
      ],
    },
    { label: 'Contact', path: '/contact' },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleDropdownToggle = (label) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  return (
    <nav className="navbar">
      {/* Mobile Toggle Button */}
      <button className="navbar-toggle" onClick={toggleMobileMenu}>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
      </button>

      {/* Navigation List */}
      <ul className={`navigation ${mobileMenuOpen ? 'active' : ''}`}>
        {navItems.map((item) => (
          <li
            key={item.label}
            className={`nav-item ${item.submenu ? 'dropdown' : ''}`}
            onMouseEnter={() => item.submenu && setActiveDropdown(item.label)}
            onMouseLeave={() => item.submenu && setActiveDropdown(null)}
            onClick={() => item.submenu && handleDropdownToggle(item.label)}
          >
            <div className="nav-link-wrapper">
              <Link 
                to={item.path} 
                className="nav-link"
                onClick={(e) => {
                  if (item.submenu && window.innerWidth < 768) {
                    e.preventDefault();
                  } else {
                    setMobileMenuOpen(false);
                  }
                }}
              >
                {item.label}
              </Link>
              
              {item.submenu && (
                <span className="mobile-dropdown-icon">
                  {activeDropdown === item.label ? '▲' : '▼'}
                </span>
              )}
            </div>

            {/* Submenu */}
            {item.submenu && (
              <ul className={`submenu ${activeDropdown === item.label ? 'active' : ''}`}>
                {item.submenu.map((subitem) => (
                  <li key={subitem.label}>
                    <Link 
                      to={subitem.path}
                      className="submenu-link"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {subitem.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;