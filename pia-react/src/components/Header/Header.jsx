"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { serviceTree } from "../../data/servicesData";
import "./Header.css";

const navItems = [
  {
    label: "Home",
    to: "/",
    dropdown: null,
  },
  {
    label: "About Us",
    to: "/about",
    dropdown: [
      { label: "About Company", to: "/about" },
      { label: "Testimonials", to: "/testimonials" },
      { label: "FAQ's", to: "/faq" },
    ],
  },
  {
    label: "Services",
    to: "/services",
    dropdown: [
      { label: "View All Services", to: "/services" },
      ...serviceTree,
    ],
  },
  {
    label: "Projects",
    to: "/projects",
    dropdown: [{ label: "All Projects", to: "/projects" }],
  },
  {
    label: "Contact",
    to: "/contact",
    dropdown: null,
  },
];

export default function Header() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({});
  const drawerRef = useRef(null);

  /* ── Close drawer on route change ── */
  useEffect(() => {
    closeDrawer();
  }, [pathname]);

  /* ── Trap focus / close on Escape ── */
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") closeDrawer();
    };
    if (drawerOpen) {
      document.addEventListener("keydown", handleKey);
      document.body.classList.add("pia-drawer-open");
    } else {
      document.body.classList.remove("pia-drawer-open");
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.classList.remove("pia-drawer-open");
    };
  }, [drawerOpen]);

  const openDrawer = () => setDrawerOpen(true);
  const closeDrawer = () => {
    setDrawerOpen(false);
    setOpenDropdowns({});
  };

  const toggleDropdown = (key) => {
    setOpenDropdowns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const isActive = (to) => {
    if (to === "/") return pathname === "/";
    return pathname.startsWith(to);
  };

  return (
    <header className="main-header header-style1 fixed-header">
      {/* ── Upper header: Glass Nav Bar Only ── */}
      <div className="header-upper-style1 glass-active">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="inner-container clearfix">
                {/* Logo & Company Name */}
                <div className="logo-box-style1 float-left">
                  <Link
                    href="/"
                    className="pia-brand-link"
                    aria-label="Plastid Interior and Architecture"
                  >
                    <img
                      src="/images/resources/logo.png"
                      className="pia-brand-logo"
                      alt="Plastid Interior and Architecture logo"
                    />
                    <span className="pia-brand-divider" aria-hidden="true" />
                    <span className="pia-brand-text">
                      <span className="pia-brand-title">Plastid</span>
                      <span className="pia-brand-subtitle">
                        Interior and Architecture
                      </span>
                    </span>
                  </Link>
                </div>

                {/* Desktop nav */}
                <div className="main-menu-box float-right">
                  <nav className="main-menu clearfix">
                    <div className="navbar-collapse clearfix">
                      <ul className="navigation clearfix">
                        {navItems.map((item) => (
                          <li
                            key={item.to}
                            className={`${item.dropdown ? "dropdown" : ""}${isActive(item.to) ? " current" : ""}`}
                          >
                            <Link href={item.to}>
                              {item.label}
                              {item.dropdown && (
                                <i
                                  className="fa fa-angle-down"
                                  style={{
                                    fontSize: "11px",
                                    marginLeft: "5px",
                                    opacity: 0.8,
                                  }}
                                />
                              )}
                            </Link>
                            {item.dropdown && (
                              <ul>
                                {item.dropdown.map((sub) => {
                                  const hasChildren =
                                    Array.isArray(sub.children) &&
                                    sub.children.length > 0;
                                  const isSubActive =
                                    pathname === sub.to ||
                                    (hasChildren &&
                                      sub.children.some(
                                        (child) => pathname === child.to
                                      ));
                                  return (
                                    <li
                                      key={sub.to}
                                      className={`${hasChildren ? "has-flyout" : ""}${isSubActive ? " active-branch" : ""}`}
                                    >
                                      <Link href={sub.to}>
                                        <span>{sub.label}</span>
                                        {hasChildren && (
                                          <i
                                            className="fa fa-angle-right pia-flyout-arrow"
                                            aria-hidden="true"
                                          />
                                        )}
                                      </Link>
                                      {hasChildren && (
                                        <ul className="pia-flyout-submenu">
                                          {sub.children.map((child) => (
                                            <li
                                              key={child.to}
                                              className={
                                                pathname === child.to
                                                  ? "active-leaf"
                                                  : ""
                                              }
                                            >
                                              <Link href={child.to}>
                                                {child.label}
                                              </Link>
                                            </li>
                                          ))}
                                        </ul>
                                      )}
                                    </li>
                                  );
                                })}
                              </ul>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile hamburger */}
      <button
        className={`pia-hamburger${drawerOpen ? " is-open" : ""}`}
        onClick={drawerOpen ? closeDrawer : openDrawer}
        aria-label={
          drawerOpen ? "Close navigation menu" : "Open navigation menu"
        }
        aria-expanded={drawerOpen}
        aria-controls="pia-mobile-drawer"
      >
        <span className="pia-hamburger-box">
          <span />
          <span />
          <span />
        </span>
      </button>

      {/* ════════════════════════════════════════
          MOBILE DRAWER
      ════════════════════════════════════════ */}

      {/* Overlay */}
      <div
        className={`pia-mobile-overlay${drawerOpen ? " visible" : ""}`}
        onClick={closeDrawer}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        id="pia-mobile-drawer"
        ref={drawerRef}
        className={`pia-mobile-drawer${drawerOpen ? " slide-in" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Drawer header */}
        <div className="pia-drawer-header">
          <div className="pia-drawer-logo">
            <Link
              href="/"
              onClick={closeDrawer}
              className="pia-brand-link"
              aria-label="Plastid Interior and Architecture"
            >
              <img
                src="/images/resources/logo.png"
                className="pia-brand-logo"
                alt="Plastid Interior and Architecture logo"
              />
              <span className="pia-brand-divider" aria-hidden="true" />
              <span className="pia-brand-text">
                <span className="pia-brand-title">Plastid</span>
                <span className="pia-brand-subtitle">
                  Interior and Architecture
                </span>
              </span>
            </Link>
          </div>
        </div>

        {/* Nav items */}
        <nav className="pia-drawer-nav" aria-label="Mobile navigation">
          <ul>
            {navItems.map((item) => {
              const active = isActive(item.to);
              const isOpen = openDropdowns[item.to];
              return (
                <li
                  key={item.to}
                  className={`${active ? "current" : ""}${item.dropdown && isOpen ? " dropdown-open" : ""}`}
                >
                  {item.dropdown ? (
                    <div className="pia-drawer-item-row">
                      <Link
                        href={item.to}
                        onClick={closeDrawer}
                        className="pia-drawer-item-link"
                      >
                        {item.label}
                      </Link>
                      <button
                        className="pia-drawer-chevron"
                        onClick={() => toggleDropdown(item.to)}
                        aria-expanded={isOpen}
                        aria-label={`Toggle ${item.label} submenu`}
                      >
                        <i className="fa fa-chevron-down" aria-hidden="true" />
                      </button>
                    </div>
                  ) : (
                    <Link href={item.to} onClick={closeDrawer}>
                      {item.label}
                    </Link>
                  )}

                  {item.dropdown && (
                    <ul
                      className={`pia-drawer-submenu${isOpen ? " open" : ""}`}
                    >
                      {item.dropdown.map((sub) => {
                        const hasChildren =
                          Array.isArray(sub.children) &&
                          sub.children.length > 0;
                        const subOpen = !!openDropdowns[sub.to];
                        return (
                          <li
                            key={sub.to}
                            className={`${hasChildren ? "has-nested-submenu" : ""}${subOpen ? " nested-open" : ""}`}
                          >
                            {hasChildren ? (
                              <>
                                <div className="pia-drawer-subitem-row">
                                  <Link
                                    href={sub.to}
                                    onClick={closeDrawer}
                                    className="pia-drawer-subitem-link"
                                  >
                                    {sub.label}
                                  </Link>
                                  <button
                                    type="button"
                                    className={`pia-drawer-subchevron${subOpen ? " open" : ""}`}
                                    onClick={() => toggleDropdown(sub.to)}
                                    aria-expanded={subOpen}
                                    aria-label={`Toggle ${sub.label} sub-items`}
                                  >
                                    <i
                                      className="fa fa-chevron-down"
                                      aria-hidden="true"
                                    />
                                  </button>
                                </div>
                                <ul
                                  className={`pia-drawer-nested-submenu${subOpen ? " open" : ""}`}
                                >
                                  {sub.children.map((child) => (
                                    <li key={child.to}>
                                      <Link
                                        href={child.to}
                                        onClick={closeDrawer}
                                      >
                                        {child.label}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </>
                            ) : (
                              <Link href={sub.to} onClick={closeDrawer}>
                                {sub.label}
                              </Link>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer: contact + social */}
        <div className="pia-drawer-footer">
          <a href="tel:+8801768834417" className="pia-drawer-contact-item">
            <span className="pia-drawer-contact-icon">
              <i className="fa fa-phone" aria-hidden="true" />
            </span>
            +880 1768834417
          </a>
          <a
            href="mailto:plastidarchitecture@gmail.com"
            className="pia-drawer-contact-item"
          >
            <span className="pia-drawer-contact-icon">
              <i className="fa fa-envelope" aria-hidden="true" />
            </span>
            plastidarchitecture@gmail.com
          </a>
          <div className="pia-drawer-social">
            <a
              href="https://www.facebook.com/plastid.interior"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
            >
              <i className="fa fa-facebook" aria-hidden="true" />
            </a>
            <a
              href="https://www.instagram.com/plastid.interior.architecture/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <i className="fa fa-instagram" aria-hidden="true" />
            </a>
            <a 
              href="https://www.tiktok.com/@plastid.interiors"
              target="_blank"
              rel="noreferrer"
              aria-label="TikTok">
              <i className="fa-tiktok" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
