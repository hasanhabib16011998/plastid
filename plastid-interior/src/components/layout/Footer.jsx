export default function Footer() {
  return (
    <footer className="footer-area">
      <div className="footer-shape-bg wow slideInRight" data-wow-delay="300ms" data-wow-duration="2500ms"></div>
      <div className="container">
        <div className="row">
          {/* Start single footer widget */}
          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
            <div className="single-footer-widget marbtm50">
              <div className="contact-info-box">
                <div className="footer-logo">
                  <a href="/">
                    <img 
                      src="images/resources/logo.png" 
                      alt="PIA Logo" 
                      style={{ width: 'auto', height: '100px' }} 
                    />
                  </a>
                </div>
                <ul>
                  <li>
                    <h6>Address</h6>
                    <p>House-11 (2nd Floor), Block-E, Sector-1,<br />Aftab Nagar Main Rd, Dhaka 1212</p>
                  </li>
                  <li>
                    <h6>Phone</h6>
                    <p>+880 1768834417<br /> <span>Saturday - Thursday:</span> 9.00am to 6.00pm</p>
                  </li>
                  <li>
                    <h6>Email</h6>
                    <p>info@pcd-bd.com<br /> plastidarchitecture@gmail.com</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* End single footer widget */}

          {/* Start single footer widget */}
          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
            <div className="single-footer-widget marbtm50">
              <div className="title">
                <h3>Services</h3>
              </div>
              <div className="services-links">
                <ul>
                  <li><a href="#">Interior Design</a></li>
                  <li><a href="#">Exterior Design</a></li>
                  <li><a href="#">Home Renovation</a></li>
                  <li><a href="#">Consulting</a></li>
                  <li><a href="#">Landscaping</a></li>
                  <li><a href="#">3D Design</a></li>
                </ul>
              </div>
            </div>
          </div>
          {/* End single footer widget */}

          {/* Start single footer widget */}
          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
            <div className="single-footer-widget">
              <div className="brochures-carousel-box owl-carousel owl-theme">
                {/* Start Single Item */}
                <div className="single-item">
                  <div className="img-holder">
                    <img src="images/footer/brochures-1.jpg" alt="Awesome Image" />
                  </div>
                  <div className="title-holder">
                    <h3>Our Interior Design<br /> Brochure</h3>
                    <a className="btn-two" href="#">Download Now<span className="flaticon-next"></span></a>
                  </div>
                </div>
                {/* End Single Item */}
                
                {/* Start Single Item */}
                <div className="single-item">
                  <div className="img-holder">
                    <img src="images/footer/brochures-1.jpg" alt="Awesome Image" />
                  </div>
                  <div className="title-holder">
                    <h3>Our Interior Design<br /> Brochure</h3>
                    <a className="btn-two" href="#">Download Now<span className="flaticon-next"></span></a>
                  </div>
                </div>
                {/* End Single Item */}
                
                {/* Start Single Item */}
                <div className="single-item">
                  <div className="img-holder">
                    <img src="images/footer/brochures-1.jpg" alt="Awesome Image" />
                  </div>
                  <div className="title-holder">
                    <h3>Our Interior Design<br /> Brochure</h3>
                    <a className="btn-two" href="#">Download Now<span className="flaticon-next"></span></a>
                  </div>
                </div>
                {/* End Single Item */}
              </div>
            </div>
          </div>
          {/* End single footer widget */}
        </div>
      </div>
    </footer>
  );
}