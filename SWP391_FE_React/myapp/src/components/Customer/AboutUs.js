import React from "react";

export default function AboutUs() {
  return (
    <div>
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
    </div>
  );
}
