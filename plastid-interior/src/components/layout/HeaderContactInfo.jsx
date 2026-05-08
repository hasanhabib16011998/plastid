export default function HeaderContactInfo() {
  return (
    <div className="header-lower-style1">
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="inner-content clearfix">
              <ul className="header-contact-info float-left">
                <li>
                  <div className="single-item">
                    <div className="icon">
                      <span className="icon-maps-and-location"></span>
                    </div>
                    <div className="text">
                      <h3>Dhaka, Bangladesh</h3>
                      <p>
                        House-11 (2nd Floor), Block-E, Sector-1,<br />
                        Aftab Nagar Main Rd, Dhaka 1212
                      </p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="single-item" style={{ textTransform: 'lowercase' }}>
                    <div className="icon">
                      <span className="icon-phone"></span>
                    </div>
                    <div className="text">
                      <h3>+880 1768834417</h3>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="single-item">
                    <div className="icon">
                      <span className="icon-mail"></span>
                    </div>
                    <div className="text">
                      <h3>info@pcd-bd.com</h3>
                      <p>Get a Free Quote</p>
                    </div>
                  </div>
                </li>
              </ul>
              <ul className="header-social-links-style1 float-right">
                <li className="wow slideInUp" data-wow-delay="0ms" data-wow-duration="1200ms">
                  <a href="https://www.facebook.com/profile.php?id=61555749343330">
                    <i className="fa fa-facebook" aria-hidden="true"></i>
                  </a>
                </li>
                <li className="wow slideInUp" data-wow-delay="300ms" data-wow-duration="1500ms">
                  <a href="#">
                    <i className="fa fa-skype" aria-hidden="true"></i>
                  </a>
                </li>
                <li className="wow slideInUp" data-wow-delay="400ms" data-wow-duration="1500ms">
                  <a href="#">
                    <i className="fa fa-linkedin" aria-hidden="true"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}