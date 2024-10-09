export default function Home() {
  return (
    <div>
      <section>
        <div
          className="hero-wrap js-fullheight d-flex align-items-center"
          style={{
            backgroundImage: "url(images/bg_1.jpg)",
            height: "80vh",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          data-stellar-background-ratio="0.5"
        >
          <div className="overlay"></div>
          <div className="container">
            <div className="row justify-content-center text-center">
              <div className="col-lg-8">
                <h1 className="display-4 text-white mb-4 animated slideInRight" style={{fontWeight: 'Bold'}}>
                Highest Quality Care For Hair You'll Like It
                </h1>
                <p className="text-white mb-4 animated slideInRight">
                  Booking To Meet Our Stylist to Make Your Day Awesome
                </p>
                <a
                  href=""
                  className="btn btn-light py-sm-3 px-sm-5 rounded-pill me-3 animated slideInRight" 
                >
                  Booking Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ftco-section ftco-no-pt ftco-no-pb">
        <div className="container">
          <div className="row d-flex no-gutters">
            <div className="col-md-5 d-flex">
              <div
                className="img img-video d-flex align-self-stretch align-items-center justify-content-center justify-content-md-center mb-4 mb-sm-0"
                style={{
                  backgroundImage: "url(images/about-2.jpg)",
                  backgroundSize: "cover",
                  backgroundPosition: "center right",
                }}
              ></div>
            </div>
            <div className="col-md-7 pl-md-5 py-md-5">
              <div className="heading-section pt-md-5">
                <h2 className="mb-4">Why Choose Us?</h2>
              </div>
              <div className="row">
                <div className="col-md-6 services-2 w-100 d-flex">
                  <div className="icon d-flex align-items-center justify-content-center">
                    <img
                      src="images/hair-cut.png"
                      alt=""
                      style={{
                        width: 50,
                        height: 50,
                        filter: "brightness(0) invert(1)",
                      }}
                    />
                  </div>
                  <div className="text pl-3">
                    <h4>Expert Haircuts</h4>
                    <p>
                      We offer modern, creative haircuts from top experts,
                      tailored to all ages and styles.
                    </p>
                  </div>
                </div>
                <div className="col-md-6 services-2 w-100 d-flex">
                  <div className="icon d-flex align-items-center justify-content-center">
                    <img
                      src="images/hair-care.png"
                      alt=""
                      style={{
                        width: 50,
                        height: 50,
                        filter: "brightness(0) invert(1)",
                      }}
                    />
                  </div>
                  <div className="text pl-3">
                    <h4>Hair Coloring</h4>
                    <p>
                      A wide range of hair coloring services, from natural
                      shades to bold tones, using high-quality products to
                      ensure safety and long-lasting color.
                    </p>
                  </div>
                </div>
                <div className="col-md-6 services-2 w-100 d-flex">
                  <div className="icon d-flex align-items-center justify-content-center">
                    <img
                      src="images/hair-treatment.png"
                      alt=""
                      style={{
                        width: 50,
                        height: 50,
                        filter: "brightness(0) invert(1)",
                      }}
                    />
                  </div>
                  <div className="text pl-3">
                    <h4>Hair Treatment</h4>
                    <p>
                      Deep hair treatment services to repair damaged hair,
                      nourish from root to tip, ensuring healthy and shiny
                      locks.
                    </p>
                  </div>
                </div>
                <div className="col-md-6 services-2 w-100 d-flex">
                  <div className="icon d-flex align-items-center justify-content-center">
                    <img
                      src="images/hair.png"
                      alt=""
                      style={{
                        width: 50,
                        height: 50,
                        filter: "brightness(0) invert(1)",
                      }}
                    />
                  </div>
                  <div className="text pl-3">
                    <h4>Styling & Makeup</h4>
                    <p>
                      We offer professional hairstyling and makeup services for
                      special occasions such as weddings, events, and
                      photoshoots.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ftco-counter" id="section-counter">
        <div className="container">
          <div className="row">
          <div className="row g-1 pt-1">
                        <div className="col-sm-3">
                            <div className="d-flex rounded p-3" style={{background: 'rgba(256, 256, 256, 0.1)'}}>
                                <i className="fa fa-users fa-3x text-white"></i>
                                <div className="ms-3">
                                    <h2 className="text-white mb-0">9999</h2>
                                    <p className="text-white mb-0">Happy Clients</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="d-flex rounded p-3" style={{background: 'rgba(256, 256, 256, 0.1)'}}>
                                <i className="fa fa-check fa-3x text-white"></i>
                                <div className="ms-3">
                                    <h2 className="text-white mb-0">9999</h2>
                                    <p className="text-white mb-0">Services Complete</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="d-flex rounded p-3" style={{background: 'rgba(256, 256, 256, 0.1)'}}>
                                <i className="fa fa-check fa-3x text-white"></i>
                                <div className="ms-3">
                                    <h2 className="text-white mb-0">9999</h2>
                                    <p className="text-white mb-0">Services Complete</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="d-flex rounded p-3" style={{background: 'rgba(256, 256, 256, 0.1)'}}>
                                <i className="fa fa-check fa-3x text-white"></i>
                                <div className="ms-3">
                                    <h2 className="text-white mb-0">9999</h2>
                                    <p className="text-white mb-0">Services Complete</p>
                                </div>
                            </div>
                        </div>
                    </div>
              
          </div>
        </div>
      </section>

      <section>
        <div className="container-xxl py-5">
        <div className="container py-5">
            <div className="row g-5">
                <div className="col-lg-5 wow fadeIn" data-wow-delay="0.1s">
                    <div className="btn btn-sm border rounded-pill text-primary px-3 mb-3">Happy Clients & Feedbacks</div>
                    <h1 className="mb-4">What Say Our Clients!</h1>
                    <p className="mb-4">Tempor erat elitr rebum at clita. Diam dolor diam ipsum et tempor sit. Aliqu diam
                        amet diam et eos labore. Clita erat ipsum et lorem et sit, sed stet no labore lorem sit. Sanctus
                        clita duo justo et tempor eirmod magna dolore erat amet</p>
                </div>
                <div className="col-lg-7">
                    <div className="testimonial-carousel border-start border-primary">
                        <div className="testimonial-item ps-5">
                            <i className="fa"></i>
                            <p className="fs-4">Aliqu diam amet diam et eos labore. Clita erat ipsum et lorem et sit, sed stet no labore lorem sit. Sanctus clita duo justo et tempor eirmod magna dolore erat amet</p>
                            <div className="d-flex align-items-center">
                                <img className="img-fluid flex-shrink-0 rounded-circle" src="images/person_2.jpg"
                                    style={{width: '60px', height: '60px'}}/>
                                <div className="ps-3">
                                    <h5 className="mb-1">Client Name</h5>
                                    <span>Profession</span>
                                </div>
                            </div>
                        </div>
                        <div className="testimonial-item ps-5">
                            <i className="fa fa-quote-left fa-2x text-primary mb-3"></i>
                            <p className="fs-4">Aliqu diam amet diam et eos labore. Clita erat ipsum et lorem et sit, sed stet no labore lorem sit. Sanctus clita duo justo et tempor eirmod magna dolore erat amet</p>
                            <div className="d-flex align-items-center">
                                <img className="img-fluid flex-shrink-0 rounded-circle" src="images/person_1.jpg"
                                    style={{width: '60px', height: '60px'}}/>
                                <div className="ps-3">
                                    <h5 className="mb-1">Client Name</h5>
                                    <span>Profession</span>
                                </div>
                            </div>
                        </div>
                        <div className="testimonial-item ps-5">
                            <i className="fa fa-quote-left fa-2x text-primary mb-3"></i>
                            <p className="fs-4">Aliqu diam amet diam et eos labore. Clita erat ipsum et lorem et sit, sed stet no labore lorem sit. Sanctus clita duo justo et tempor eirmod magna dolore erat amet</p>
                            <div className="d-flex align-items-center">
                                <img className="img-fluid flex-shrink-0 rounded-circle" src='images/person_3.jpg'
                                    style={{width: '60px', height: '60px'}}/>
                                <div className="ps-3">
                                    <h5 className="mb-1">Client Name</h5>
                                    <span>Profession</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
      </section>

      <section className="ftco-section bg-light">
        <div className="container">
          <div className="row justify-content-center pb-5 mb-3">
            <div className="col-md-7 heading-section text-center">
              <h2>Affordable Packages</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="block-7">
                <div
                  className="img"
                  style={{ backgroundImage: "url(images/pricing-1.jpg)" }}
                ></div>
                <div className="text-center p-4">
                  <span className="excerpt d-block">Basic Cut</span>
                  <span className="price">
                    <sup>$</sup> <span className="number">35</span>
                    <sub>/visit</sub>
                  </span>

                  <ul className="pricing-text mb-5">
                    <li>
                      <span className="fa fa-check mr-2"></span> Shampoo &
                      Condition
                    </li>
                    <li>
                      <span className="fa fa-check mr-2"></span> Haircut
                    </li>
                    <li>
                      <span className="fa fa-check mr-2"></span> Style
                      Consultation
                    </li>
                    <li>
                      <span className="fa fa-check mr-2"></span> Blow Dry
                    </li>
                  </ul>

                  <a href="#" className="btn btn-primary d-block px-2 py-3">
                    Book Now
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="block-7">
                <div
                  className="img"
                  style={{ backgroundImage: "url(images/pricing-2.jpg)" }}
                ></div>
                <div className="text-center p-4">
                  <span className="excerpt d-block">Color & Style</span>
                  <span className="price">
                    <sup>$</sup> <span className="number">85</span>
                    <sub>/visit</sub>
                  </span>

                  <ul className="pricing-text mb-5">
                    <li>
                      <span className="fa fa-check mr-2"></span> All Basic Cut
                      Services
                    </li>
                    <li>
                      <span className="fa fa-check mr-2"></span> Hair Coloring
                    </li>
                    <li>
                      <span className="fa fa-check mr-2"></span> Deep
                      Conditioning
                    </li>
                    <li>
                      <span className="fa fa-check mr-2"></span>Styling
                    </li>
                  </ul>

                  <a href="#" className="btn btn-primary d-block px-2 py-3">
                    Book Now
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="block-7">
                <div
                  className="img"
                  style={{ backgroundImage: "url(images/pricing-3.jpg)" }}
                ></div>
                <div className="text-center p-4">
                  <span className="excerpt d-block">Deluxe Package</span>
                  <span className="price">
                    <sup>$</sup> <span className="number">125</span>
                    <sub>/visit</sub>
                  </span>

                  <ul className="pricing-text mb-5">
                    <li>
                      <span className="fa fa-check mr-2"></span> All Color &
                      Style Services
                    </li>
                    <li>
                      <span className="fa fa-check mr-2"></span> Hair Treatment
                    </li>
                    <li>
                      <span className="fa fa-check mr-2"></span> Scalp Massage
                    </li>
                    <li>
                      <span className="fa fa-check mr-2"></span> Makeup
                      Application
                    </li>
                  </ul>

                  <a href="#" className="btn btn-primary d-block px-2 py-3">
                    Book Now
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-lg-12 text-center"
            style={{ marginLeft: "14px" }}
          >
            <p>
              <a
                href="services.html"
                className="btn btn-primary mr-md-4 py-3 px-4"
              >
                View More Our Services{" "}
                <span className="ion-ios-arrow-forward"></span>
              </a>
            </p>
          </div>
        </div>
      </section>

      <section className="ftco-section">
        <div className="container">
          <div className="row justify-content-center pb-5 mb-3">
            <div className="col-md-7 heading-section text-center">
              <h2>Pets Gallery</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div
                className="work mb-4 img d-flex align-items-end"
                style={{ backgroundImage: "url(images/gallery-1.jpg)" }}
              >
                <a
                  href="images/gallery-1.jpg"
                  className="icon image-popup d-flex justify-content-center align-items-center"
                >
                  <span className="fa fa-expand"></span>
                </a>
                <div className="desc w-100 px-4">
                  <div className="text w-100 mb-3">
                    <span>Cat</span>
                    <h2>
                      <a href="work-single.html">Persian Cat</a>
                    </h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div
                className="work mb-4 img d-flex align-items-end"
                style={{ backgroundImage: "url(images/gallery-2.jpg)" }}
              >
                <a
                  href="images/gallery-2.jpg"
                  className="icon image-popup d-flex justify-content-center align-items-center"
                >
                  <span className="fa fa-expand"></span>
                </a>
                <div className="desc w-100 px-4">
                  <div className="text w-100 mb-3">
                    <span>Dog</span>
                    <h2>
                      <a href="work-single.html">Pomeranian</a>
                    </h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div
                className="work mb-4 img d-flex align-items-end"
                style={{ backgroundImage: "url(images/gallery-3.jpg)" }}
              >
                <a
                  href="images/gallery-3.jpg"
                  className="icon image-popup d-flex justify-content-center align-items-center"
                >
                  <span className="fa fa-expand"></span>
                </a>
                <div className="desc w-100 px-4">
                  <div className="text w-100 mb-3">
                    <span>Cat</span>
                    <h2>
                      <a href="work-single.html">Sphynx Cat</a>
                    </h2>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div
                className="work mb-4 img d-flex align-items-end"
                style={{ backgroundImage: "url(images/gallery-4.jpg)" }}
              >
                <a
                  href="images/gallery-4.jpg"
                  className="icon image-popup d-flex justify-content-center align-items-center"
                >
                  <span className="fa fa-expand"></span>
                </a>
                <div className="desc w-100 px-4">
                  <div className="text w-100 mb-3">
                    <span>Cat</span>
                    <h2>
                      <a href="work-single.html">British Shorthair</a>
                    </h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div
                className="work mb-4 img d-flex align-items-end"
                style={{ backgroundImage: "url(images/gallery-5.jpg)" }}
              >
                <a
                  href="images/gallery-5.jpg"
                  className="icon image-popup d-flex justify-content-center align-items-center"
                >
                  <span className="fa fa-expand"></span>
                </a>
                <div className="desc w-100 px-4">
                  <div className="text w-100 mb-3">
                    <span>Dog</span>
                    <h2>
                      <a href="work-single.html">Beagle</a>
                    </h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div
                className="work mb-4 img d-flex align-items-end"
                style={{ backgroundImage: "url(images/gallery-6.jpg)" }}
              >
                <a
                  href="images/gallery-6.jpg"
                  className="icon image-popup d-flex justify-content-center align-items-center"
                >
                  <span className="fa fa-expand"></span>
                </a>
                <div className="desc w-100 px-4">
                  <div className="text w-100 mb-3">
                    <span>Dog</span>
                    <h2>
                      <a href="work-single.html">Pug</a>
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
