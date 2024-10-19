
import React, { useState } from "react";
import { FaChevronRight } from "react-icons/fa";
const Booking = () => {
  const containerStyle = {
    backgroundColor: "white",
    borderRadius: "8px",
    padding: "20px",
    maxWidth: "400px",
    boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
    margin: "20px auto",
  };

  const headerStyle = {
    textAlign: "center",
    color: "#2C3E50",
    marginBottom: "20px",
  };

  const stepHeaderStyle = {
    fontSize: "1.2em",
    color: "#2C3E50",
    fontWeight: "bold",
    marginBottom: "5px",
  };

  const stepNumberStyle = {
    color: "#2980B9",
  };

  const stepContentStyle = {
    paddingLeft: "20px",
  };

  const buttonStyle = {
    backgroundColor: "#2980B9",
    color: "white",
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1.1em",
    marginTop: "20px",
    display: "block",
    width: "100%",
  };

  const [selectedSalon, setSelectedSalon] = useState(null);
  const [selectedStylist, setSelectedStylist] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);

  // Dữ liệu đặt giờ dựa trên salon, stylist và ngày
  const stylistBookedSlots = {
    "Salon A": {
      "Stylist A": {
        "19/10/2024": ["21h00", "22h00", "23h00"],
        "20/10/2024": [],
        "21/10/2024": ["23h00"],
      },
      "Stylist B": {
        "19/10/2024": ["23h00"],
        "20/10/2024": ["21h00"],
        "21/10/2024": [],
      },
    },
    "Salon B": {
      "Stylist A": {
        "19/10/2024": ["20h00", "21h00"],
        "20/10/2024": ["22h00"],
        "21/10/2024": ["23h00"],
      },
      "Stylist B": {
        "19/10/2024": [],
        "20/10/2024": ["21h00", "23h00"],
        "21/10/2024": ["22h00"],
      },
    },
  };

  const handleSalonSelect = (salonName) => {
    setSelectedSalon(salonName);
    setSelectedStylist(null);
    setSelectedDate(null);
    setSelectedSlot(null);
  };

  const handleStylistSelect = (stylistName) => {
    setSelectedStylist(stylistName);
    setSelectedSlot(null);
  };

  const handleServiceSelect = (service) => {
    setSelectedServices((prevServices) => {
      if (prevServices.includes(service)) {
        return prevServices.filter((item) => item !== service);
      }
      return [...prevServices, service];
    });
  };

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 6; hour <= 23; hour++) {
      const time = hour < 10 ? `0${hour}h00` : `${hour}h00`;
      slots.push(time);
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const handleSlotClick = (slot) => {
    const bookedSlots =
      stylistBookedSlots[selectedSalon]?.[selectedStylist]?.[selectedDate] ||
      [];
    if (!bookedSlots.includes(slot)) {
      setSelectedSlot(slot);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginBottom: "10px",
    cursor: "pointer",
    position: "relative",
    marginLeft: "-15px",
  };

  const chevronStyle = {
    position: "absolute",
    right: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: "1em",
    color: "#2980B9",
  };

  // Hàm tạo ra 3 ngày kế tiếp, bao gồm cả hôm nay
  const getNextThreeDays = () => {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 3; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();
      days.push(`${day}/${month}/${year}`);
    }
    return days;
  };

  const availableDates = getNextThreeDays();

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>Booking Appointments</h2>

      {/* Step 1: Choose Salon */}
      <div>
        <div style={stepHeaderStyle}>
          <span style={stepNumberStyle}>1.</span> Choose Salon
        </div>
        <div style={stepContentStyle}>
          <div
            style={inputStyle}
            data-bs-toggle="modal"
            data-bs-target="#salonModal"
          >
            <span>{selectedSalon || "Not Choose Salon Yet"}</span>
            <FaChevronRight style={chevronStyle} />
          </div>
        </div>
      </div>

      {/* Step 2: Choose Services */}
      <div>
        <div style={stepHeaderStyle}>
          <span style={stepNumberStyle}>2.</span> Choose Services
        </div>
        <div style={stepContentStyle}>
          <div
            style={inputStyle}
            data-bs-toggle="modal"
            data-bs-target="#servicesModal"
          >
            <span>{selectedServices.join(", ") || "Not Choose Services Yet"}</span>
            <FaChevronRight style={chevronStyle} />
          </div>
        </div>
      </div>

      {/* Step 3: Choose Stylist */}
      <div>
        <div style={stepHeaderStyle}>
          <span style={stepNumberStyle}>3.</span> Choose Stylist
        </div>
        <div style={stepContentStyle}>
          <div
            style={inputStyle}
            data-bs-toggle="modal"
            data-bs-target="#stylistModal"
          >
            <span>{selectedStylist || "Not Choose Stylist Yet"}</span>
            <FaChevronRight style={chevronStyle} />
          </div>
        </div>
      </div>

      {/* Step 4: Choose Date */}
      <div>
        <div style={stepHeaderStyle}>
          <span style={stepNumberStyle}>4.</span> Choose Date
        </div>
        <div style={stepContentStyle}>
          <select
            style={inputStyle}
            onChange={(e) => setSelectedDate(e.target.value)}
            value={selectedDate || ""}
            disabled={!selectedStylist || !selectedSalon}
          >
            <option value="" disabled>
            Choose Date
            </option>
            {availableDates.map((date) => (
              <option key={date} value={date}>
                {date}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Step 5: Choose Time */}
      <div>
        <div style={stepHeaderStyle}>
          <span style={stepNumberStyle}>5.</span> Choose Time
        </div>
        <div style={stepContentStyle}>
          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {timeSlots.map((slot) => {
              const bookedSlots =
                stylistBookedSlots[selectedSalon]?.[selectedStylist]?.[
                  selectedDate
                ] || [];
              const isDisabled =
                !selectedStylist || !selectedDate || bookedSlots.includes(slot);

              return (
                <button
                  key={slot}
                  style={{
                    backgroundColor: isDisabled
                      ? "#95a5a6"
                      : selectedSlot === slot
                      ? "#3498db"
                      : "#ecf0f1",
                    color: isDisabled ? "white" : "#2C3E50",
                    border: "none",
                    padding: "10px",
                    borderRadius: "5px",
                    cursor: isDisabled ? "not-allowed" : "pointer",
                    width: "60px",
                  }}
                  onClick={() => handleSlotClick(slot)}
                  disabled={isDisabled}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <button style={buttonStyle}>Booking</button>

      {/* Modal for Choosing Salon */}
      <div
        className="modal fade"
        id="salonModal"
        tabIndex="-1"
        aria-labelledby="salonModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" style={{ maxWidth: "70vw" }}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="salonModalLabel">
                Choose a Salon
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
                  {/* Salon 1 */}
                  <div className="col-md-4 mb-4">
                    <div
                      className="card text-center"
                      style={{ minHeight: "350px" }}
                    >
                      <img
                        src="images/salon_1.jpg"
                        className="card-img-top"
                        alt="Salon 1"
                        style={{ objectFit: "cover", height: "150px" }}
                      />
                      <div className="card-body">
                        <h5 className="card-title">Salon A</h5>
                        <p className="card-text">
                          A high-end salon offering premium services for hair,
                          skin, and beauty.
                        </p>
                        <button
                          className="btn btn-primary"
                          onClick={() => handleSalonSelect("Salon A")}
                          data-bs-dismiss="modal"
                        >
                          Select
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Salon 2 */}
                  <div className="col-md-4 mb-4">
                    <div
                      className="card text-center"
                      style={{ minHeight: "350px" }}
                    >
                      <img
                        src="images/salon_2.jpg"
                        className="card-img-top"
                        alt="Salon 2"
                        style={{ objectFit: "cover", height: "150px" }}
                      />
                      <div className="card-body">
                        <h5 className="card-title">Salon B</h5>
                        <p className="card-text">
                          A luxurious salon known for its exceptional hair
                          styling services.
                        </p>
                        <button
                          className="btn btn-primary"
                          onClick={() => handleSalonSelect("Salon B")}
                          data-bs-dismiss="modal"
                        >
                          Select
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Selecting Services */}
      <div
        className="modal fade"
        id="servicesModal"
        tabIndex="-1"
        aria-labelledby="servicesModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" style={{ maxWidth: "70vw" }}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="servicesModalLabel">
                Choose Services
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/* Hair Cut services */}
              <h5>Hair Cut</h5>
              <div className="container">
                <div className="row">
                  <div className="col-md-4 mb-4">
                    <div
                      className="card text-center"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        minHeight: "350px",
                        backgroundColor: selectedServices.includes(
                          "Haircut Deluxe"
                        )
                          ? "#add5f0"
                          : "#fff",
                      }}
                    >
                      <img
                        src="images/image_1.jpg"
                        className="card-img-top"
                        alt="Service 1"
                        style={{ objectFit: "cover", height: "150px" }}
                      />
                      <div className="card-body">
                        <h5 className="card-title">Haircut Deluxe</h5>
                        <p className="card-text">
                          Includes a detailed haircut with additional styling
                          services.
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
                        <button
                          className="btn btn-primary"
                          onClick={() => handleServiceSelect("Haircut Deluxe")}
                        >
                          {selectedServices.includes("Haircut Deluxe")
                            ? "Selected"
                            : "Select"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dyeing Hair services */}
              <h5>Dyeing Hair</h5>
              <div className="container">
                <div className="row">
                  <div className="col-md-4 mb-4">
                    <div
                      className="card text-center"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        minHeight: "350px",
                        backgroundColor: selectedServices.includes("Hair Color")
                          ? "#add5f0"
                          : "#fff",
                      }}
                    >
                      <img
                        src="images/image_2.jpg"
                        className="card-img-top"
                        alt="Service 2"
                        style={{ objectFit: "cover", height: "150px" }}
                      />
                      <div className="card-body">
                        <h5 className="card-title">Hair Color</h5>
                        <p className="card-text">
                          A vibrant color treatment for your hair.
                        </p>
                        <p
                          className="card-price"
                          style={{
                            fontWeight: "bold",
                            fontSize: "1.2rem",
                            color: "#d9534f",
                          }}
                        >
                          Price: $60
                        </p>
                        <button
                          className="btn btn-primary"
                          onClick={() => handleServiceSelect("Hair Color")}
                        >
                          {selectedServices.includes("Hair Color")
                            ? "Selected"
                            : "Select"}
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
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() =>
                  console.log("Selected Services:", selectedServices)
                }
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Choosing Stylist */}
      <div
        className="modal fade"
        id="stylistModal"
        tabIndex="-1"
        aria-labelledby="stylistModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" style={{ maxWidth: "70vw" }}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="stylistModalLabel">
                Choose a Stylist
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
                  {/* Stylist 1 */}
                  <div className="col-md-4 mb-4">
                    <div className="card text-center">
                      <img
                        src="images/stylist_1.jpg"
                        className="card-img-top"
                        alt="Stylist 1"
                        style={{ objectFit: "cover", height: "150px" }}
                      />
                      <div className="card-body">
                        <h5 className="card-title">Stylist A</h5>
                        <button
                          className="btn btn-primary"
                          onClick={() => handleStylistSelect("Stylist A")}
                          data-bs-dismiss="modal"
                        >
                          Select
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* Stylist 2 */}
                  <div className="col-md-4 mb-4">
                    <div className="card text-center">
                      <img
                        src="images/stylist_2.jpg"
                        className="card-img-top"
                        alt="Stylist 2"
                        style={{ objectFit: "cover", height: "150px" }}
                      />
                      <div className="card-body">
                        <h5 className="card-title">Stylist B</h5>
                        <button
                          className="btn btn-primary"
                          onClick={() => handleStylistSelect("Stylist B")}
                          data-bs-dismiss="modal"
                        >
                          Select
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* Additional stylists can be added here */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
