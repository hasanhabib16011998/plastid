export default function Navbar() {
  return (
    <div className="header-upper-style1">
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="inner-container clearfix">
              <div className="logo-box-style1 float-left">
                <a href="/">
                  <img
                    src="images/resources/logo.png"
                    style={{ height: '80px', width: 'auto' }}
                    alt="PIA logo"
                  />
                </a>
              </div>
              <div className="main-menu-box float-right">
                <nav className="main-menu clearfix">
                  <div className="navbar-header clearfix">
                    <button
                      type="button"
                      className="navbar-toggle"
                      data-toggle="collapse"
                      data-target=".navbar-collapse"
                    >
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                    </button>
                  </div>
                  <div className="navbar-collapse collapse clearfix">
                    <ul className="navigation clearfix">
                      <li className="dropdown current">
                        <a href="/">Home</a>
                      </li>
                      <li className="dropdown">
                        <a href="/about">About Us</a>
                        <ul>
                          <li><a href="/about">About Company</a></li>
                          <li><a href="/faq">FAQ’s</a></li>
                        </ul>
                      </li>
                      <li className="dropdown">
                        <a href="/services">Services</a>
                        <ul>
                          <li><a href="/services">View All Services</a></li>
                          <li><a href="/ser-concept-designs">Concept Designs</a></li>
                          <li><a href="/ser-project-designs">Project Designs</a></li>
                          <li><a href="/ser-make-overs">Make Overs</a></li>
                          <li><a href="/ser-consulting">Consulting</a></li>
                          <li><a href="/ser-glass-wrought">Glass & Wrought</a></li>
                          <li><a href="/ser-space-planning">Space Planning</a></li>
                        </ul>
                      </li>
                      <li className="dropdown">
                        <a href="/project">Projects</a>
                        <ul>
                          <li><a href="/project">Classic View 01</a></li>
                          <li><a href="/project-v2">Classic View 02</a></li>
                          <li><a href="/project-v3">Modern View 01</a></li>
                          <li><a href="/project-v4">Modern View 02</a></li>
                          <li><a href="/project-v5">Fullwidth 01</a></li>
                          <li><a href="/project-v6">Fulldwidth 02</a></li>
                          <li><a href="/project-single">Projects Single</a></li>
                        </ul>
                      </li>
                      <li>
                        <a href="/contact">Contact</a>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}