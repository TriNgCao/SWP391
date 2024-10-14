import { Link } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./NavBar";

export default function Home() {
  return (
    <div>
      <Navbar />
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
                <h1
                  className="display-4 text-white mb-4 animated slideInRight"
                  style={{ fontWeight: "bold" }}
                >
                  Highest Quality Care For Hair You'll Like It
                </h1>
                <p className="text-white mb-4 animated slideInRight">
                  Booking To Meet Our Stylist to Make Your Day Awesome
                </p>
                <Link
                  to="/booking"
                  className="btn btn-light py-sm-3 px-sm-5 rounded-pill me-3 animated slideInRight"
                >
                  Booking Now
                </Link>
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
                {[
                  {
                    title: "Expert Haircuts",
                    description:
                      "We offer modern, creative haircuts from top experts, tailored to all ages and styles.",
                    image: "images/hair-cut.png",
                  },
                  {
                    title: "Hair Coloring",
                    description:
                      "A wide range of hair coloring services, from natural shades to bold tones, using high-quality products to ensure safety and long-lasting color.",
                    image: "images/hair-care.png",
                  },
                  {
                    title: "Hair Treatment",
                    description:
                      "Deep hair treatment services to repair damaged hair, nourish from root to tip, ensuring healthy and shiny locks.",
                    image: "images/hair-treatment.png",
                  },
                  {
                    title: "Styling & Makeup",
                    description:
                      "We offer professional hairstyling and makeup services for special occasions such as weddings, events, and photoshoots.",
                    image: "images/hair.png",
                  },
                ].map((service, index) => (
                  <div key={index} className="col-md-6 services-2 w-100 d-flex">
                    <div className="icon d-flex align-items-center justify-content-center">
                      <img
                        src={service.image}
                        alt={service.title}
                        style={{
                          width: 50,
                          height: 50,
                          filter: "brightness(0) invert(1)",
                        }}
                      />
                    </div>
                    <div className="text pl-3">
                      <h4>{service.title}</h4>
                      <p>{service.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ftco-counter" id="section-counter">
        <div className="container">
          <div className="row">
            {[
              { count: 9999, label: "Happy Clients" },
              { count: 9999, label: "Services Complete" },
              { count: 9999, label: "Services Complete" },
              { count: 9999, label: "Services Complete" },
            ].map((item, index) => (
              <div key={index} className="col-sm-3">
                <div
                  className="d-flex rounded p-3"
                  style={{ background: "rgba(256, 256, 256, 0.1)" }}
                >
                  <i className="fa fa-check fa-3x text-white"></i>
                  <div className="ms-3">
                    <h2 className="text-white mb-0">{item.count}</h2>
                    <p className="text-white mb-0">{item.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container-xxl py-5">
          <div className="container py-5">
            <div className="row g-5">
              <div className="col-lg-5 wow fadeIn" data-wow-delay="0.1s">
                <div className="btn btn-sm border rounded-pill text-primary px-3 mb-3">
                  Happy Clients & Feedbacks
                </div>
                <h1 className="mb-4">What Say Our Clients!</h1>
                <p className="mb-4">
                  Tempor erat elitr rebum at clita. Diam dolor diam ipsum et
                  tempor sit. Aliqu diam amet diam et eos labore. Clita erat
                  ipsum et lorem et sit, sed stet no labore lorem sit. Sanctus
                  clita duo justo et tempor eirmod magna dolore erat amet.
                </p>
              </div>
              <div className="col-lg-7">
                <div className="testimonial-carousel border-start border-primary">
                  {[
                    {
                      quote:
                        "Aliqu diam amet diam et eos labore. Clita erat ipsum et lorem et sit, sed stet no labore lorem sit. Sanctus clita duo justo et tempor eirmod magna dolore erat amet.",
                      name: "Client Name",
                      profession: "Profession",
                      image: "images/person_2.jpg",
                    },
                    {
                      quote:
                        "Aliqu diam amet diam et eos labore. Clita erat ipsum et lorem et sit, sed stet no labore lorem sit. Sanctus clita duo justo et tempor eirmod magna dolore erat amet.",
                      name: "Client Name",
                      profession: "Profession",
                      image: "images/person_1.jpg",
                    },
                    {
                      quote:
                        "Aliqu diam amet diam et eos labore. Clita erat ipsum et lorem et sit, sed stet no labore lorem sit. Sanctus clita duo justo et tempor eirmod magna dolore erat amet.",
                      name: "Client Name",
                      profession: "Profession",
                      image: "images/person_3.jpg",
                    },
                  ].map((testimonial, index) => (
                    <div key={index} className="testimonial-item ps-5">
                      <i className="fa fa-quote-left fa-2x text-primary mb-3"></i>
                      <p className="fs-4">{testimonial.quote}</p>
                      <div className="d-flex align-items-center">
                        <img
                          className="img-fluid flex-shrink-0 rounded-circle"
                          src={testimonial.image}
                          alt={testimonial.name}
                          style={{ width: "60px", height: "60px" }}
                        />
                        <div className="ps-3">
                          <h5 className="mb-1">{testimonial.name}</h5>
                          <span>{testimonial.profession}</span>
                        </div>
                      </div>
                    </div>
                  ))}
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
            {[
              {
                title: "Basic Cut",
                price: 35,
                services: [
                  "Shampoo & Condition",
                  "Haircut",
                  "Style Consultation",
                  "Blow Dry",
                ],
                image: "images/pricing-1.jpg",
              },
              {
                title: "Color & Style",
                price: 85,
                services: [
                  "All Basic Cut Services",
                  "Hair Coloring",
                  "Deep Conditioning",
                  "Styling",
                ],
                image: "images/pricing-2.jpg",
              },
              {
                title: "Deluxe Package",
                price: 125,
                services: [
                  "All Color & Style Services",
                  "Hair Treatment",
                  "Scalp Massage",
                  "Makeup Application",
                ],
                image: "images/pricing-3.jpg",
              },
            ].map((packageItem, index) => (
              <div key={index} className="col-lg-4 col-md-6 mb-4">
                <div className="pricing-box">
                  <img
                    src={packageItem.image}
                    className="img-fluid"
                    alt={packageItem.title}
                    style={{
                      borderRadius: "10px 10px 0 0",
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                    }}
                  />
                  <div className="text-center py-3">
                    <h3>{packageItem.title}</h3>
                    <h4>${packageItem.price}</h4>
                    <ul className="list-unstyled">
                      {packageItem.services.map((service, i) => (
                        <li key={i}>{service}</li>
                      ))}
                    </ul>
                    <Link to="/book" className="btn btn-primary rounded-pill">
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
