import React from "react";
export default function Services() {
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
            <div
              className="modal-dialog"
              style={{ maxWidth: "70vw" }}
            >
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
                      {/* Service 1 */}
                      <div className="col-md-4 mb-4">
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
                            src="images/image_1.jpg"
                            className="card-img-top"
                            alt="Service 1"
                            style={{ objectFit: "cover", height: "150px" }}
                          />
                          <div className="card-body">
                            <h5 className="card-title">Haircut Basic</h5>
                            <p className="card-text" style={{ flexGrow: 1 }}>
                              A simple yet stylish haircut to keep you looking
                              fresh.
                            </p>
                            <p
                              className="card-price"
                              style={{
                                fontWeight: "bold",
                                fontSize: "1.2rem",
                                color: "#d9534f",
                              }}
                            >
                              Price: $30
                            </p>
                            <button className="btn btn-primary">
                              Book Now
                            </button>
                          </div>
                        </div>
                      </div>
                              
                      {/* Service 2 */}
                      <div className="col-md-4 mb-4">
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
                            src="images/image_1.jpg"
                            className="card-img-top"
                            alt="Service 2"
                            style={{ objectFit: "cover", height: "150px" }}
                          />
                          <div className="card-body">
                            <h5 className="card-title">Haircut Deluxe</h5>
                            <p className="card-text" style={{ flexGrow: 1 }}>
                              Includes a detailed haircut with additional
                              styling services.
                            </p>
                            <p
                              className="card-price"
                              style={{
                                fontWeight: "bold",
                                fontSize: "1.2rem",
                                color: "#d9534f",
                              }}
                            >
                              Price: $50
                            </p>
                            <button className="btn btn-primary">
                              Book Now
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Service 3 */}
                      <div className="col-md-4 mb-4">
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
                            src="images/image_1.jpg"
                            className="card-img-top"
                            alt="Service 3"
                            style={{ objectFit: "cover", height: "150px" }}
                          />
                          <div className="card-body">
                            <h5 className="card-title">Haircut Premium</h5>
                            <p className="card-text" style={{ flexGrow: 1 }}>
                              Our premium package for a luxurious haircut
                              experience.
                            </p>
                            <p
                              className="card-price"
                              style={{
                                fontWeight: "bold",
                                fontSize: "1.2rem",
                                color: "#d9534f",
                              }}
                            >
                              Price: $70
                            </p>
                            <button className="btn btn-primary">
                              Book Now
                            </button>
                          </div>
                        </div>
                      </div>
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
            <div
              className="modal-dialog"
              style={{ maxWidth: "70vw" }}
            >
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
                    <div className="row">
                      {/* Service 1 */}
                      <div className="col-md-4 mb-4">
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
                            src="images/image_1.jpg"
                            className="card-img-top"
                            alt="Service 1"
                            style={{ objectFit: "cover", height: "150px" }}
                          />
                          <div className="card-body">
                            <h5 className="card-title">Haircut Basic</h5>
                            <p className="card-text" style={{ flexGrow: 1 }}>
                              A simple yet stylish haircut to keep you looking
                              fresh.
                            </p>
                            <p
                              className="card-price"
                              style={{
                                fontWeight: "bold",
                                fontSize: "1.2rem",
                                color: "#d9534f",
                              }}
                            >
                              Price: $30
                            </p>
                            <button className="btn btn-primary">
                              Book Now
                            </button>
                          </div>
                        </div>
                      </div>
                              
                      {/* Service 2 */}
                      <div className="col-md-4 mb-4">
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
                            src="images/image_1.jpg"
                            className="card-img-top"
                            alt="Service 2"
                            style={{ objectFit: "cover", height: "150px" }}
                          />
                          <div className="card-body">
                            <h5 className="card-title">Haircut Deluxe</h5>
                            <p className="card-text" style={{ flexGrow: 1 }}>
                              Includes a detailed haircut with additional
                              styling services.
                            </p>
                            <p
                              className="card-price"
                              style={{
                                fontWeight: "bold",
                                fontSize: "1.2rem",
                                color: "#d9534f",
                              }}
                            >
                              Price: $50
                            </p>
                            <button className="btn btn-primary">
                              Book Now
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Service 3 */}
                      <div className="col-md-4 mb-4">
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
                            src="images/image_1.jpg"
                            className="card-img-top"
                            alt="Service 3"
                            style={{ objectFit: "cover", height: "150px" }}
                          />
                          <div className="card-body">
                            <h5 className="card-title">Haircut Premium</h5>
                            <p className="card-text" style={{ flexGrow: 1 }}>
                              Our premium package for a luxurious haircut
                              experience.
                            </p>
                            <p
                              className="card-price"
                              style={{
                                fontWeight: "bold",
                                fontSize: "1.2rem",
                                color: "#d9534f",
                              }}
                            >
                              Price: $70
                            </p>
                            <button className="btn btn-primary">
                              Book Now
                            </button>
                          </div>
                        </div>
                      </div>
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

          {/* Modal for Hair Treatment */}
          <div
            className="modal fade"
            id="treatmentModal"
            tabIndex="-1"
            aria-labelledby="treatmentModalLabel"
            aria-hidden="true"
          >
            <div
              className="modal-dialog"
              style={{ maxWidth: "70vw" }}
            >
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
                    <div className="row">
                      {/* Service 1 */}
                      <div className="col-md-4 mb-4">
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
                            src="images/image_1.jpg"
                            className="card-img-top"
                            alt="Service 1"
                            style={{ objectFit: "cover", height: "150px" }}
                          />
                          <div className="card-body">
                            <h5 className="card-title">Haircut Basic</h5>
                            <p className="card-text" style={{ flexGrow: 1 }}>
                              A simple yet stylish haircut to keep you looking
                              fresh.
                            </p>
                            <p
                              className="card-price"
                              style={{
                                fontWeight: "bold",
                                fontSize: "1.2rem",
                                color: "#d9534f",
                              }}
                            >
                              Price: $30
                            </p>
                            <button className="btn btn-primary">
                              Book Now
                            </button>
                          </div>
                        </div>
                      </div>
                              
                      {/* Service 2 */}
                      <div className="col-md-4 mb-4">
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
                            src="images/image_1.jpg"
                            className="card-img-top"
                            alt="Service 2"
                            style={{ objectFit: "cover", height: "150px" }}
                          />
                          <div className="card-body">
                            <h5 className="card-title">Haircut Deluxe</h5>
                            <p className="card-text" style={{ flexGrow: 1 }}>
                              Includes a detailed haircut with additional
                              styling services.
                            </p>
                            <p
                              className="card-price"
                              style={{
                                fontWeight: "bold",
                                fontSize: "1.2rem",
                                color: "#d9534f",
                              }}
                            >
                              Price: $50
                            </p>
                            <button className="btn btn-primary">
                              Book Now
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Service 3 */}
                      <div className="col-md-4 mb-4">
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
                            src="images/image_1.jpg"
                            className="card-img-top"
                            alt="Service 3"
                            style={{ objectFit: "cover", height: "150px" }}
                          />
                          <div className="card-body">
                            <h5 className="card-title">Haircut Premium</h5>
                            <p className="card-text" style={{ flexGrow: 1 }}>
                              Our premium package for a luxurious haircut
                              experience.
                            </p>
                            <p
                              className="card-price"
                              style={{
                                fontWeight: "bold",
                                fontSize: "1.2rem",
                                color: "#d9534f",
                              }}
                            >
                              Price: $70
                            </p>
                            <button className="btn btn-primary">
                              Book Now
                            </button>
                          </div>
                        </div>
                      </div>
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
        </div>
      </section>
    </div>
  );
}
