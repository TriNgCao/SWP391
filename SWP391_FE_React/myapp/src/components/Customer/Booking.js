import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaChevronRight, FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
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
  const [selectedSalonId, setSelectedSalonId] = useState(null);
  const [selectedStylist, setSelectedStylist] = useState(null);
  const [selectedStylistId, setSelectedStylistId] = useState(null);
  const [salons, setSalons] = useState([]);
  const [stylists, setStylists] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchSalonTerm, setSearchSalonTerm] = useState("");
  const [searchStylistTerm, setSearchStylistTerm] = useState("");
  const [stylistBookedSlots, setStylistBookedSlots] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [disabledSlotsSet, setDisabledSlotsSet] = useState(new Set());
  const [dateKey, setDateKey] = useState(0);

  const filteredServices = services.filter(
    (service) =>
      (!selectedCategory || service.category === selectedCategory) &&
      (service.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredSalons = salons.filter((salon) =>
    salon.name.toLowerCase().includes(searchSalonTerm.toLowerCase())
  );

  const filteredStylists = stylists.filter((stylist) =>
    stylist.stylistName.toLowerCase().includes(searchStylistTerm.toLowerCase())
  );


  useEffect(() => {
    const fetchSalons = async () => {
      try {
        const response = await axios.get("http://localhost:8080/salon/active");
        if (response.status === 200) {
          const salonData = response.data.map((salon) => ({
            ...salon,
            imageUrl: `http://localhost:8080/salon/image/${encodeURIComponent(salon.imageName)}`,
          }));
          setSalons(salonData);
        } else {
          console.error("Error fetching salon data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching salon data:", error);
      }
    };

    const fetchServices = async () => {
      try {
        const response = await axios.get("http://localhost:8080/services/fetchAll");

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

    fetchSalons();
    fetchServices();
  }, []);

  useEffect(() => {
    const fetchStylists = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/user/stylists/${selectedSalonId}`);
        if (response.status === 200) {
          const stylistData = response.data.map((stylist) => ({
            ...stylist,
            imageUrl: `http://localhost:8080/stylists/image/${encodeURIComponent(stylist.imageName)}`,
          }));
          setStylists(stylistData);
        } else {
          console.error("Error fetching stylist data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching stylist data:", error);
      }
    };
    fetchStylists();
  }, [selectedSalon, selectedSalonId]);


  useEffect(() => {
    if (selectedDate) {
      console.log("Fetching booked slots with:");
      console.log("Stylist ID:", selectedStylistId);
      console.log("Selected Date:", selectedDate);
  
      const fetchStylistBookedSlots = async () => {
        try {
          let response;
          
          if (selectedStylistId === 0) {
            // API nếu selectedStylistId bằng 0
            response = await axios.get(`http://localhost:8080/book-schedule/booked/${selectedDate}`);
          } else {
            // API hiện tại nếu selectedStylistId khác 0
            response = await axios.get(`http://localhost:8080/book-schedule/booked/${selectedStylistId}/${selectedDate}`);
          }
  
          if (response.status === 200) {
            console.log("Booked Slots Response:", response.data);
            setStylistBookedSlots(response.data);
          }
        } catch (error) {
          console.error("Error fetching booked slots:", error);
        }
      };
  
      fetchStylistBookedSlots();
    }
  }, [selectedStylistId, selectedDate]);
  

  const handleSalonSelect = (salonName, salonId) => {
    setSelectedSalon(salonName);
    setSelectedSalonId(salonId)
    console.log(salonId);
    setSelectedStylist(null);
    setSelectedStylistId(null);
    setSelectedDate(null);
    setDateKey(dateKey + 1);
    setSelectedSlot(null);
  };

  const handleStylistSelect = (stylistName, stylistId) => {
    setSelectedStylist((prevStylist) =>
      prevStylist === stylistName ? null : stylistName
    );
    setSelectedStylistId((prevStylistId) =>
      prevStylistId === stylistId ? null : stylistId
    );
    setSelectedDate(null);
    setDateKey(dateKey + 1);
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
    for (let hour = 8; hour <= 22; hour++) {
      const time = `${hour < 10 ? `${hour}` : hour}:00`;
      slots.push(time);
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const getDisabledSlots = (bookedTime, duration, startTime, endTime) => {
    const disabledSlots = [];

    // Disable all hours outside working hours
    for (let hour = 0; hour < startTime; hour++) {
      disabledSlots.push(`${hour}:00`);
    }
    for (let hour = endTime + 1; hour <= 23; hour++) {
      disabledSlots.push(`${hour}:00`);
    }

    // Log working hours disable result
    console.log("Disabled slots for non-working hours:", disabledSlots);

    // Disable booked slots based on bookedTime and duration
    for (let i = 0; i < duration; i++) {
      const hour = bookedTime + i;
      if (hour >= startTime && hour <= endTime) {
        disabledSlots.push(`${hour}:00`);
      }
    }

    // Log booked time slots disable result
    console.log(`Disabled slots for booked time (${bookedTime} with duration ${duration}):`, disabledSlots);

    return disabledSlots;
  };

  useEffect(() => {
    if (stylistBookedSlots.length === 0) {
      // Nếu không có booked slots, tất cả các slot đều khả dụng
      setDisabledSlotsSet(new Set());
    } else {
      // Nếu có booked slots, tính toán các slot bị disable
      const allDisabledSlots = new Set();
      stylistBookedSlots.forEach((slotData) => {
        const disabledSlots = getDisabledSlots(
          slotData.bookedTime,
          slotData.duration,
          slotData.startTime,
          slotData.endTime
        );
        disabledSlots.forEach((disabledSlot) => allDisabledSlots.add(disabledSlot));
      });
      setDisabledSlotsSet(allDisabledSlots);
    }
  }, [stylistBookedSlots]);

  const handleSlotClick = (slot) => {
    console.log("Slot clicked:", slot);
    if (!disabledSlotsSet.has(slot)) {
      console.log("Slot is available:", slot);
      setSelectedSlot(slot);
    } else {
      console.log("Slot is disabled:", slot);
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

  const getNextThreeDays = () => {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 3; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();
      days.push(`${year}-${month}-${day}`);
    }
    return days;
  };

  const calculateTotal = () => {
    const total = selectedServices.reduce((sum, serviceTitle) => {
      const service = services.find((s) => s.title === serviceTitle);
      const price = service ? parseFloat(service.price.replace("$", "")) : 0;
      return sum + price;
    }, 0);
    return `${total.toLocaleString()}`;
  };

  const isBookingDisabled = !selectedSalon || !selectedStylist || !selectedDate || !selectedSlot || selectedServices.length === 0;

  // Hàm handleBooking sau khi sửa lại
  const handleBooking = async () => {
    try {
      const bookingData = {
        salonId: salons.find((salon) => salon.id === selectedSalon)?.id,
        stylistId: stylists.find((stylist) => stylist.stylistName === selectedStylist)?.id,
        serviceId: selectedServices.map((serviceTitle) =>
          services.find((service) => service.serviceName === serviceTitle)?.id
        ),
        date: selectedDate,
        startTime: selectedSlot,
      };

      const response = await axios.post("YOUR_API_BOOKING_URL", bookingData);

      if (response.status === 200) {
        return { status: 200, message: "Booking Successfully!", data: bookingData };
      } else {
        return { status: response.status, message: "Booking failed. Please try again." };
      }
    } catch (error) {
      console.error("Error in booking:", error);
      return { status: 400, message: "Booking failed due to a network error or invalid data." };
    }
  };


  const onBookingClick = async () => {
    const bookingData = {
      salonId: salons.find((salon) => salon.id === selectedSalon)?.id,
      stylistId: stylists.find((stylist) => stylist.stylistName === selectedStylist)?.id,
      serviceId: selectedServices.map((serviceTitle) =>
        services.find((service) => service.serviceName === serviceTitle)?.id
      ),
      date: selectedDate,
      startTime: selectedSlot,
    };

    console.log("Booking Data:", JSON.stringify(bookingData, null, 2));

    try {
      const response = await handleBooking();
      if (response.status === 200) {
        toast.success(response.message);
      }
    } catch (error) {
      toast.error(error.message || "Send booking fail!");
    }
  };

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
            <span>
              {selectedServices.join(", ") || "Not Choose Services Yet"}
            </span>
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
      <div style={stepContentStyle}>
        <div style={stepHeaderStyle}>
          <span style={stepNumberStyle}>Step 3:</span> Choose Date
        </div>
        <select
          key={dateKey}
          style={inputStyle}
          onChange={(e) => setSelectedDate(e.target.value)}
        >
          <option value="">Choose Date</option>
          {getNextThreeDays().map((date, index) => (
            <option key={index} value={date}>
              {date}
            </option>
          ))}
        </select>
      </div>

      {/* Step 5: Choose Time */}
      <div>
        <div style={stepHeaderStyle}>
          <span style={stepNumberStyle}>5.</span> Choose Time
        </div>
        <div style={stepContentStyle}>
          <div
            style={{
              marginLeft: '-25px',
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {timeSlots.map((slot) => {
              const isDisabled =
                !selectedStylist ||
                !selectedDate ||
                disabledSlotsSet.has(slot);// check disabled

              return (
                <button
                  key={slot}
                  style={{
                    backgroundColor: isDisabled
                      ? "#2c3e50" // black
                      : selectedSlot === slot
                        ? "#3498db" // blue
                        : "#ecf0f1", // green
                    color: isDisabled ? "white" : "#2C3E50",
                    padding: "10px",
                    borderRadius: "5px",
                    cursor: isDisabled ? "not-allowed" : "pointer",// change mouse
                    width: "60px",
                    position: "relative",
                    transition: "background-color 0.3s, color 0.3s",
                  }}
                  disabled={isDisabled}
                  onClick={() => !isDisabled && handleSlotClick(slot)}
                >
                  {slot}
                  {isDisabled && (
                    <span
                      style={{
                        position: "absolute",
                        top: "0",
                        right: "0",
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}
                    >
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>


      {/* Total money */}
      <div
        style={{
          marginTop: "20px",
          padding: "10px",
          backgroundColor: "#f8f9fa",
          borderRadius: "8px",
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "1.5rem",
          color: "#d9534f",
        }}
      >
        Total: ${calculateTotal()}
      </div>

      {/* Booking Button */}
      <button
        style={{ ...buttonStyle, backgroundColor: isBookingDisabled ? "#ccc" : "#2980B9" }}
        disabled={isBookingDisabled}
        onClick={onBookingClick}
      >
        Booking
      </button>

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
              {/* Search */}
              <div className="mb-3 d-flex justify-content-end">
                <div className="input-group" style={{ maxWidth: "300px" }}>
                  <span className="input-group-text" id="search-icon">
                    <FaSearch />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search for a salon..."
                    value={searchSalonTerm}
                    onChange={(e) => setSearchSalonTerm(e.target.value)}
                    style={{ width: "200px" }}
                  />
                </div>
              </div>

              <div className="container">
                {searchSalonTerm && filteredSalons.length === 0 && (
                  <div className="alert alert-warning text-center" role="alert">
                    No salons found matching your search.
                  </div>
                )}

                <div className="row">
                  {filteredSalons.length > 0
                    ? filteredSalons.map((salon) => (
                      <div className="col-md-4 mb-4" key={salon.id}>
                        <div
                          className="card text-center"
                          style={{ minHeight: "350px" }}
                        >
                          <img
                            src={salon.imageUrl}
                            alt={salon.name}
                            className="card-img-top"
                            style={{ height: "150px", objectFit: "cover" }}
                          />
                          <div className="card-body">
                            <h5
                              className="card-title"
                              style={{ fontSize: "1.5rem" }}
                            >
                              {salon.name}
                            </h5>
                            <p
                              className="card-text"
                              style={{ fontSize: "1.2rem" }}
                            >
                              {salon.address}
                            </p>
                            <button
                              className="btn"
                              style={{
                                backgroundColor: salon.active
                                  ? "#4caf50"
                                  : "#d3d3d3",
                                color: "#fff",
                                cursor: salon.active
                                  ? "pointer"
                                  : "not-allowed",
                              }}
                              onClick={() => handleSalonSelect(salon.name, salon.id)}
                              data-bs-dismiss="modal"
                              disabled={!salon.active}
                            >
                              Select
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                    : salons.map((salon) => (
                      <div className="col-md-4 mb-4" key={salon.id}>
                        <div
                          className="card text-center"
                          style={{ minHeight: "350px" }}
                        >
                          <img
                            src={salon.imageUrl}
                            alt={salon.name}
                            className="card-img-top"
                            style={{ height: "150px", objectFit: "cover" }}
                          />
                          <div className="card-body">
                            <h5
                              className="card-title"
                              style={{ fontSize: "1.5rem" }}
                            >
                              {salon.name}
                            </h5>
                            <p
                              className="card-text"
                              style={{ fontSize: "1.2rem" }}
                            >
                              {salon.address}
                            </p>
                            <button
                              className="btn"
                              style={{
                                backgroundColor: salon.active
                                  ? "#4caf50"
                                  : "#d3d3d3",
                                color: "#fff",
                                cursor: salon.active
                                  ? "pointer"
                                  : "not-allowed",
                              }}
                              onClick={() => handleSalonSelect(salon.name, salon.id)}
                              data-bs-dismiss="modal"
                              disabled={!salon.active}
                            >
                              Select
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
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

              <div className="mb-3 d-flex justify-content-end">
                {/* Search by Category */}
                <div className="input-group me-3" style={{ maxWidth: "200px" }}>
                  <label className="input-group-text" htmlFor="categorySelect">
                    Category
                  </label>
                  <select
                    className="form-select"
                    id="categorySelect"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="">All</option>
                    <option value="Hair Styling">Hair Styling</option>
                    <option value="Hair Coloring">Hair Coloring</option>
                    <option value="Hair Treatment">Hair Treatment</option>
                    <option value="Spa Skin Treatment">Spa Skin Treatment</option>
                  </select>
                </div>
                <div className="input-group" style={{ maxWidth: "300px" }}>
                  <span className="input-group-text" id="search-icon">
                    <FaSearch />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search for a service..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ width: "200px" }}
                  />
                </div>
              </div>

              <div className="container">
                {searchTerm && filteredServices.length === 0 && (
                  <div className="alert alert-warning text-center" role="alert">
                    No services found matching your search.
                  </div>
                )}
                {searchTerm && filteredServices.length > 0 ? (
                  <div className="row">
                    {filteredServices.map((service) => (
                      <div className="col-md-4 mb-4" key={service.serviceId}>
                        <div
                          className="card d-flex flex-column text-center"
                          style={{
                            minHeight: "350px",
                            backgroundColor: selectedServices.includes(
                              service.serviceName
                            )
                              ? "#add5f0"
                              : "#fff",
                          }}
                        >
                          <img
                            src={service.imageUrl}
                            alt={service.serviceName}
                            className="card-img-top"
                            style={{ height: "150px", objectFit: "cover" }}
                          />
                          <div className="card-body d-flex flex-column">
                            <h5 className="card-title">{service.serviceName}</h5>
                            <p className="card-text flex-grow-1">
                              {service.serviceDescription}
                            </p>
                            <p
                              className="card-price"
                              style={{
                                fontWeight: "bold",
                                fontSize: "1.2rem",
                                color: "#d9534f",
                              }}
                            >
                              Price: {service.servicePrice}
                            </p>
                            <button
                              className="btn btn-primary"
                              onClick={() => handleServiceSelect(service.serviceName)}
                            >
                              {selectedServices.includes(service.serviceName)
                                ? "Selected"
                                : "Select"}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  [
                    "Hair Styling",
                    "Hair Coloring",
                    "Hair Treatment",
                    "Spa Skin Treatment",
                  ].map((category) => (
                    <div key={category}>
                      <h3>{category}</h3>
                      <div className="row">
                        {services
                          .filter((service) => service.category === category)
                          .map((service) => (
                            <div className="col-md-4 mb-4" key={service.serviceId}>
                              <div
                                className="card d-flex flex-column text-center"
                                style={{
                                  minHeight: "400px",
                                  backgroundColor: selectedServices.includes(
                                    service.title
                                  )
                                    ? "#add5f0"
                                    : "#fff",
                                }}
                              >
                                <img
                                  src={service.imageUrl}
                                  alt={service.serviceName}
                                  className="card-img-top"
                                  style={{
                                    height: "150px",
                                    objectFit: "cover",
                                  }}
                                />
                                <div className="card-body d-flex flex-column">
                                  <h5 className="card-title">
                                    {service.serviceName}
                                  </h5>
                                  <p className="card-text flex-grow-1">
                                    {service.serviceDescription}
                                  </p>
                                  <p
                                    className="card-price"
                                    style={{
                                      fontWeight: "bold",
                                      fontSize: "1.2rem",
                                      color: "#d9534f",
                                    }}
                                  >
                                    Price: {service.servicePrice}
                                  </p>
                                  <button
                                    className="btn btn-primary"
                                    onClick={() =>
                                      handleServiceSelect(service.serviceName)
                                    }
                                  >
                                    {selectedServices.includes(service.serviceName)
                                      ? "Selected"
                                      : "Select"}
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Choosing Stylist */}
      <div className="modal fade" id="stylistModal" tabIndex="-1" aria-labelledby="stylistModalLabel" aria-hidden="true">
        <div className="modal-dialog" style={{ maxWidth: "70vw" }}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="stylistModalLabel">Choose a Stylist</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {/* Search */}
              <div className="mb-3 d-flex justify-content-end">
                <div className="input-group" style={{ maxWidth: "300px" }}>
                  <span className="input-group-text" id="search-icon">
                    <FaSearch />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search for a stylist..."
                    value={searchStylistTerm}
                    onChange={(e) => setSearchStylistTerm(e.target.value)}
                    style={{ width: "200px" }}
                  />
                </div>
              </div>

              <div className="container">
                {searchStylistTerm && filteredStylists.length === 0 && (
                  <div className="alert alert-warning text-center" role="alert">
                    No stylists found matching your search.
                  </div>
                )}

                <div className="row">
                  {filteredStylists.length > 0
                    ? filteredStylists.map((stylist) => (
                      <div className="col-md-4 mb-4" key={stylist.stylistId}>
                        <div
                          className="card text-center"
                          style={{
                            minHeight: "350px",
                            backgroundColor: selectedStylist === stylist.stylistName ? "#add5f0" : "#fff",
                            border: selectedStylist === stylist.stylistName ? "2px solid #007bff" : "none"
                          }}
                        >
                          <img
                            src={stylist.imageName}
                            className="card-img-top"
                            alt={stylist.stylistName}
                            style={{ objectFit: "cover", height: "280px" }}
                          />
                          <div className="card-body">
                            <h5 className="card-title">{stylist.stylistName}</h5>
                            <button
                              className="btn btn-primary"
                              onClick={() => handleStylistSelect(stylist.stylistName, stylist.stylistId)}
                              data-bs-dismiss="modal"
                            >
                              {selectedStylist === stylist.stylistName ? "Selected" : "Select"}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                    : stylists.map((stylist) => (
                      <div className="col-md-4 mb-4" key={stylist.stylistId}>
                        <div
                          className="card text-center"
                          style={{
                            minHeight: "350px",
                            backgroundColor: selectedStylist === stylist.stylistName ? "#add5f0" : "#fff",
                            border: selectedStylist === stylist.stylistName ? "2px solid #007bff" : "none"
                          }}
                        >
                          <img
                            src={stylist.imageName}
                            className="card-img-top"
                            alt={stylist.stylistName}
                            style={{ objectFit: "cover", height: "280px" }}
                          />
                          <div className="card-body">
                            <h5 className="card-title">{stylist.stylistName}</h5>
                            <button
                              className="btn btn-primary"
                              onClick={() => handleStylistSelect(stylist.stylistName, stylist.stylistId)}
                              data-bs-dismiss="modal"
                            >
                              {selectedStylist === stylist.stylistName ? "Selected" : "Select"}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
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
