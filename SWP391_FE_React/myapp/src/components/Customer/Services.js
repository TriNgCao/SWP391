import React, { useEffect, useState } from "react";

export default function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await new Promise((resolve) =>
          setTimeout(() => {
            resolve({
              data: [
                {
                  id: 1,
                  title: "Haircut Basic",
                  description:
                    "A simple yet stylish haircut to keep you looking fresh.",
                  price: "$37",
                  image: "images/image_1.jpg",
                  category: "Hair Cutting",
                },
                {
                  id: 2,
                  title: "Hair Color Vivid",
                  description:
                    "Bold hair color to express yourself.",
                  price: "$50",
                  image: "images/image_2.jpg",
                  category: "Hair Coloring",
                },
                {
                  id: 3,
                  title: "Deep Conditioning",
                  description:
                    "Nourishing treatment for healthy hair.",
                  price: "$40",
                  image: "images/image_3.jpg",
                  category: "Hair Treatment",
                },
              ],
            });
          }, 1000)
        );
        setServices(response.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  const hairCuttingServices = services.filter(
    (service) => service.category === "Hair Cutting"
  );
  const hairColoringServices = services.filter(
    (service) => service.category === "Hair Coloring"
  );
  const hairTreatmentServices = services.filter(
    (service) => service.category === "Hair Treatment"
  );

  const renderServices = (services) =>
    services.map((service) => (
      <div className="col-md-4 mb-4" key={service.id}>
        <div
          className="card text-center"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            minHeight: "350px",
          }}
        >
          <img
            src={service.image}
            className="card-img-top"
            alt={service.title}
            style={{ objectFit: "cover", height: "150px" }}
          />
          <div className="card-body">
            <h5 className="card-title">{service.title}</h5>
            <p className="card-text" style={{ flexGrow: 1 }}>
              {service.description}
            </p>
            <p
              className="card-price"
              style={{
                fontWeight: "bold",
                fontSize: "1.2rem",
                color: "#d9534f",
              }}
            >
              Price: {service.price}
            </p>
            <button className="btn btn-primary">Book Now</button>
          </div>
        </div>
      </div>
    ));

  return (
    <div>
      <section className="ftco-section bg-light">
        <div className="container">
          <div className="row mb-5 pb-5">
            {/* Hair Cutting Service */}
            <div className="col-md-4 d-flex align-self-stretch px-4">
              <div className="d-block services text-center">
                <div className="icon d-flex align-items-center justify-content-center">
                  <img
                    src="images/hair-cut-tool.png"
                    alt=""
                    style={{
                      width: "50px",
                      height: "50px",
                      filter: "brightness(0) invert(1)",
                    }}
                  />
                </div>
                <div className="media-body p-4">
                  <h3 className="heading">Hair Cutting</h3>
                  <p>
                    Hair cutting for women transforms your look and showcases
                    your individuality. From chic bobs to long layers, our
                    skilled stylists will help you find a hairstyle that
                    enhances your beauty and suits your personality.
                  </p>
                  <button
                    className="btn-custom d-flex align-items-center justify-content-center"
                    data-bs-toggle="modal"
                    data-bs-target="#cuttingWomenModal"
                  >
                    <span className="fa fa-chevron-right"></span>
                    <i className="sr-only">Booking Now</i>
                  </button>
                </div>
              </div>
            </div>

            {/* Hair Coloring Service */}
            <div className="col-md-4 d-flex align-self-stretch px-4">
              <div className="d-block services text-center">
                <div className="icon d-flex align-items-center justify-content-center">
                  <img
                    src="images/hair-dye.png"
                    alt=""
                    style={{
                      width: "50px",
                      height: "50px",
                      filter: "brightness(0) invert(1)",
                    }}
                  />
                </div>
                <div className="media-body p-4">
                  <h3 className="heading">Hair Coloring</h3>
                  <p>
                    Discover the latest trends in hair coloring! Whether you're
                    looking to go bold with vivid colors or simply want a subtle
                    touch of highlights, our professionals will help you achieve
                    the perfect look.
                  </p>
                  <button
                    className="btn-custom d-flex align-items-center justify-content-center"
                    data-bs-toggle="modal"
                    data-bs-target="#coloringModal"
                  >
                    <span className="fa fa-chevron-right"></span>
                    <i className="sr-only">Booking Now</i>
                  </button>
                </div>
              </div>
            </div>

            {/* Hair Treatment Service */}
            <div className="col-md-4 d-flex align-self-stretch px-4">
              <div className="d-block services text-center">
                <div className="icon d-flex align-items-center justify-content-center">
                  <img
                    src="images/hair-treatment.png"
                    alt=""
                    style={{
                      width: "50px",
                      height: "50px",
                      filter: "brightness(0) invert(1)",
                    }}
                  />
                </div>
                <div className="media-body p-4">
                  <h3 className="heading">Hair Treatment</h3>
                  <p>
                    Nourish and rejuvenate your hair with our professional hair
                    treatment services. From deep conditioning to repairing
                    damaged hair, we offer a range of treatments to restore your
                    hair's health and shine.
                  </p>
                  <button
                    className="btn-custom d-flex align-items-center justify-content-center"
                    data-bs-toggle="modal"
                    data-bs-target="#treatmentModal"
                  >
                    <span className="fa fa-chevron-right"></span>
                    <i className="sr-only">Booking Now</i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Modal for Hair Cutting */}
          <div
            className="modal fade"
            id="cuttingWomenModal"
            tabIndex="-1"
            aria-labelledby="cuttingWomenModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" style={{ maxWidth: "70vw" }}>
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="cuttingWomenModalLabel">
                    LeoPard Salon's Hair Cutting Services
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="container">
                    <div className="row">
                      {renderServices(hairCuttingServices)}
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Modal for Hair Coloring */}
          <div
            className="modal fade"
            id="coloringModal"
            tabIndex="-1"
            aria-labelledby="coloringModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" style={{ maxWidth: "70vw" }}>
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="coloringModalLabel">
                    Hair Coloring Services
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="container">
                    <div className="row">{renderServices(hairColoringServices)}</div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Modal for Hair Treatment */}
          <div
            className="modal fade"
            id="treatmentModal"
            tabIndex="-1"
            aria-labelledby="treatmentModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" style={{ maxWidth: "70vw" }}>
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="treatmentModalLabel">
                    Hair Treatment Services
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="container">
                    <div className="row">{renderServices(hairTreatmentServices)}</div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
