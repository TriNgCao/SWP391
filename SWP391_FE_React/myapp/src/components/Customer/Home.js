import { Link } from "react-router-dom";
import AboutUs from "./AboutUs";
import { ToastContainer } from "react-toastify";

export default function Home() {
  return (
    <div>
    <ToastContainer autoClose={1300} />
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

      <AboutUs/>

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
    </div>
  );
}
