import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Services() {
  const [services, setServices] = useState([]);
  const [searchStylingTerm, setSearchStylingTerm] = useState("");
  const [searchColoringTerm, setSearchColoringTerm] = useState("");
  const [searchTreatmentTerm, setSearchTreatmentTerm] = useState("");
  const [searchSpaSkinTerm, setSearchSpaSkinTerm] = useState("");

  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate("/booking");
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/services/fetchAll"
        );

        const updatedServices = response.data.map((service) => ({
          ...service,
          imageUrl: `http://localhost:8080/services/image/${encodeURIComponent(
            service.imageName
          )}`,
        }));

        setServices(updatedServices);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  const hairStylingServices = services.filter(
    (service) => service.category === "Hair Styling"
  );
  const hairColoringServices = services.filter(
    (service) => service.category === "Hair Coloring"
  );
  const hairTreatmentServices = services.filter(
    (service) => service.category === "Hair Treatment"
  );
  const spaSkinServices = services.filter(
    (service) => service.category === "Spa Skin Treatment"
  );

  const renderServices = (services) =>
    services.map((service) => (
      <div className="col-md-4 mb-4" key={service.serviceId}>
        <div
          className="card text-center"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <img
            src={service.imageUrl}
            className="card-img-top"
            alt={service.serviceName}
            style={{ objectFit: "cover", height: "150px" }}
          />
          <div className="card-body d-flex flex-column">
            <h5 className="card-title">{service.serviceName}</h5>
            <p className="card-text" style={{ flexGrow: 1 }}>
              {service.serviceDescription}
            </p>
            <p className="card-text" style={{ flexGrow: 1 }}>
              Duration: {service.maxTime}
            </p>
            <p
              className="card-price"
              style={{
                fontWeight: "bold",
                fontSize: "1.2rem",
                color: "#d9534f",
              }}
            >
              Price: {service.servicePrice.toLocaleString()} VND
            </p>
            <button
              className="btn btn-primary mt-auto"
              type="button"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleBookNow}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    ));

  const filteredStylingServices = hairStylingServices.filter((service) =>
    service.serviceName.toLowerCase().includes(searchStylingTerm.toLowerCase())
  );

  const filteredColoringServices = hairColoringServices.filter((service) =>
    service.serviceName.toLowerCase().includes(searchColoringTerm.toLowerCase())
  );

  const filteredTreatmentServices = hairTreatmentServices.filter((service) =>
    service.serviceName
      .toLowerCase()
      .includes(searchTreatmentTerm.toLowerCase())
  );

  const filteredSpaSkinServices = spaSkinServices.filter((service) =>
    service.serviceName.toLowerCase().includes(searchSpaSkinTerm.toLowerCase())
  );

  return (
    <div>
      <section className="ftco-section bg-light">
        <div className="container">
          <div className="row mb-5 pb-5">
            {/* Hair Styling Service */}
            <div className="col-md-6 d-flex align-self-stretch px-4">
              <div
                className="d-block services text-center"
                style={{ padding: "20px" }}
              >
                <div className="icon d-flex align-items-center justify-content-center">
                  <img
                    src="images/hair-cut-tool.png"
                    alt="Hair Styling"
                    style={{
                      width: "70px",
                      height: "70px",
                      filter: "brightness(0) invert(1)",
                    }}
                  />
                </div>
                <div className="media-body p-4">
                  <h3 className="heading">Hair Styling</h3>
                  <p>
                    Hair cutting for women transforms your look and showcases
                    your individuality. From chic bobs to long layers, our
                    skilled stylists will help you find a hairstyle that
                    enhances your beauty and suits your personality.
                  </p>
                  <button
                    className="btn-custom d-flex align-items-center justify-content-center"
                    data-bs-toggle="modal"
                    data-bs-target="#stylingModal"
                  >
                    <span className="fa fa-chevron-right"></span>
                    <i className="sr-only">Booking Now</i>
                  </button>
                </div>
              </div>
            </div>

            {/* Hair Coloring Service */}
            <div className="col-md-6 d-flex align-self-stretch px-4">
              <div
                className="d-block services text-center"
                style={{ padding: "20px" }}
              >
                <div className="icon d-flex align-items-center justify-content-center">
                  <img
                    src="images/hair-dye.png"
                    alt="Hair Coloring"
                    style={{
                      width: "70px",
                      height: "70px",
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
            <div
              className="col-md-6 d-flex align-self-stretch px-4"
              style={{ marginTop: "90px" }}
            >
              <div
                className="d-block services text-center"
                style={{ padding: "20px" }}
              >
                <div className="icon d-flex align-items-center justify-content-center">
                  <img
                    src="images/hair-treatment.png"
                    alt="Hair Treatment"
                    style={{
                      width: "70px",
                      height: "70px",
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

            {/* Spa Skin Treatment Service */}
            <div
              className="col-md-6 d-flex align-self-stretch px-4"
              style={{ marginTop: "90px" }}
            >
              <div
                className="d-block services text-center"
                style={{ padding: "20px" }}
              >
                <div className="icon d-flex align-items-center justify-content-center">
                  <img
                    src="images/hair-care.png"
                    alt="Spa Skin"
                    style={{
                      width: "70px",
                      height: "70px",
                      filter: "brightness(0) invert(1)",
                    }}
                  />
                </div>
                <div className="media-body p-4">
                  <h3 className="heading">Spa Skin Treatment</h3>
                  <p>
                    Pamper yourself with our luxurious spa skin treatments.
                    Experience ultimate relaxation and rejuvenation for your
                    skin with our expert techniques and high-quality products.
                  </p>
                  <button
                    className="btn-custom d-flex align-items-center justify-content-center"
                    data-bs-toggle="modal"
                    data-bs-target="#spaSkinModal"
                  >
                    <span className="fa fa-chevron-right"></span>
                    <i className="sr-only">Booking Now</i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Modals for Services */}
          {/* Hair Styling Modal */}
          <div
            className="modal fade"
            id="stylingModal"
            tabIndex="-1"
            aria-labelledby="stylingModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="stylingModalLabel">
                    Hair Styling Services
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3 d-flex justify-content-end">
                    <div className="input-group" style={{ maxWidth: "300px" }}>
                      <span className="input-group-text" id="search-icon">
                        <FaSearch />
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search Hair Styling..."
                        value={searchStylingTerm}
                        onChange={(e) => setSearchStylingTerm(e.target.value)}
                        style={{ width: "200px" }}
                      />
                    </div>
                  </div>

                  <div className="row">
                    {renderServices(filteredStylingServices)}
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Hair Coloring Modal */}
          <div
            className="modal fade"
            id="coloringModal"
            tabIndex="-1"
            aria-labelledby="coloringModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg">
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
                  <div className="mb-3 d-flex justify-content-end">
                    <div className="input-group" style={{ maxWidth: "300px" }}>
                      <span className="input-group-text" id="search-icon">
                        <FaSearch />
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search Hair Coloring..."
                        value={searchColoringTerm}
                        onChange={(e) => setSearchColoringTerm(e.target.value)}
                        style={{ width: "200px" }}
                      />
                    </div>
                  </div>

                  <div className="row">
                    {renderServices(filteredColoringServices)}
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Hair Treatment Modal */}
          <div
            className="modal fade"
            id="treatmentModal"
            tabIndex="-1"
            aria-labelledby="treatmentModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg">
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
                  <div className="mb-3 d-flex justify-content-end">
                    <div className="input-group" style={{ maxWidth: "300px" }}>
                      <span className="input-group-text" id="search-icon">
                        <FaSearch />
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search Hair Treatment..."
                        value={searchTreatmentTerm}
                        onChange={(e) => setSearchTreatmentTerm(e.target.value)}
                        style={{ width: "200px" }}
                      />
                    </div>
                  </div>

                  <div className="row">
                    {renderServices(filteredTreatmentServices)}
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Spa Skin Modal */}
          <div
            className="modal fade"
            id="spaSkinModal"
            tabIndex="-1"
            aria-labelledby="spaSkinModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="spaSkinModalLabel">
                    Spa Skin Services
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3 d-flex justify-content-end">
                    <div className="input-group" style={{ maxWidth: "300px" }}>
                      <span className="input-group-text" id="search-icon">
                        <FaSearch />
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search Spa Skin..."
                        value={searchSpaSkinTerm}
                        onChange={(e) => setSearchSpaSkinTerm(e.target.value)}
                        style={{ width: "200px" }}
                      />
                    </div>
                  </div>
                  <div className="row">
                    {renderServices(filteredSpaSkinServices)}
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
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
