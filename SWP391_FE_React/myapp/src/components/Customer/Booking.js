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
  const [selectedStylist, setSelectedStylist] = useState(null);
  const [salons, setSalons] = useState([]);
  const [stylists, setStylists] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchSalonTerm, setSearchSalonTerm] = useState("");
  const [searchStylistTerm, setSearchStylistTerm] = useState("");


  const filteredServices = services.filter(
    (service) =>
      service.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredSalons = salons.filter((salon) =>
    salon.name.toLowerCase().includes(searchSalonTerm.toLowerCase())
  );

  const filteredStylists = stylists.filter((stylist) =>
    stylist.name.toLowerCase().includes(searchStylistTerm.toLowerCase())
  );

  const stylistBookedSlots = [
    {
      salonId: 1, 
      salonName: "Salon A",
      stylistId: 1,
      stylistName: "Stylist A",
      date: "23/10/2024",
      startTime: "19:00",
      duration: "3",
    },
    {
      salonId: 1, 
      salonName: "Salon A",
      stylistId: 2,
      stylistName: "Stylist B",
      date: "23/10/2024",
      startTime: "21:00",
      duration: "1",
    },
    {
      salonId: 1,
      salonName: "Salon A",
      stylistId: 0,
      stylistName: "Let's us choose for you",
      date: "23/10/2024",
      startTime: "21:00",
      duration: "2",
    },
  ];

  useEffect(() => {
    const fetchSalons = async () => {
      const salonData = [
        {
          id: 1,
          name: "Salon A",
          address: "123 Main St",
          status: "active",
          img: "images/image_1.jpg",
        },
        {
          id: 2,
          name: "Salon B",
          address: "456 Elm St",
          status: "inactive",
          img: "images/image_2.jpg",
        },
      ];
      setSalons(salonData);
    };

    const fetchStylists = async () => {
      const stylistData = [
        { img: "images/logo.png", id: 0, name: "Let's us choose for you" },
        { img: "images/image_1.jpg", id: 1, name: "Stylist A" },
        { img: "images/image_2.jpg", id: 2, name: "Stylist B" },
      ];
      setStylists(stylistData);
    };

    // const fetchServices = async () => {
    //   try {
    //     const response = await new Promise((resolve) =>
    //       setTimeout(() => {
    //         resolve({
    //           data: [
    //             {
    //               id: 1,
    //               title: "Haircut Basic",
    //               description:
    //                 "A simple yet stylish haircut to keep you looking fresh.",
    //               price: "$37",
    //               image: "images/image_1.jpg",
    //               category: "Hair Styling",
    //             },
    //             {
    //               id: 2,
    //               title: "Hair Color Vivid",
    //               description: "Bold hair color to express yourself.",
    //               price: "$50",
    //               image: "images/image_2.jpg",
    //               category: "Hair Coloring",
    //             },
    //             {
    //               id: 3,
    //               title: "Deep Conditioning",
    //               description: "Nourishing treatment for healthy hair.",
    //               price: "$40",
    //               image: "images/image_3.jpg",
    //               category: "Hair Treatment",
    //             },
    //             {
    //               id: 4,
    //               title: "Classic Hair Styling",
    //               description: "Elegant hair styling for any occasion.",
    //               price: "$60",
    //               image: "images/image_4.jpg",
    //               category: "Hair Styling",
    //             },
    //             {
    //               id: 5,
    //               title: "Luxury Spa Skin Treatment",
    //               description:
    //                 "Rejuvenating spa treatments to restore your skin's glow.",
    //               price: "$70",
    //               image: "images/image_5.jpg",
    //               category: "Spa Skin",
    //             },
    //           ],
    //         });
    //       }, 1000)
    //     );
    //     setServices(response.data);
    //   } catch (error) {
    //     console.error("Error fetching services:", error);
    //   }
    // };
    const fetchServices = async () => {
      try {
        const response = await axios.get("URL_API_CỦA_BẠN");
        
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
    fetchStylists();
    fetchServices();
  }, []);

  const handleSalonSelect = (salonName) => {
    setSelectedSalon(salonName);
    setSelectedStylist(null);
    setSelectedDate(null);
    setSelectedSlot(null);
  };

  const handleStylistSelect = (stylistName) => {
    setSelectedStylist((prevStylist) =>
      prevStylist === stylistName ? null : stylistName
    );
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
      const time = `${hour < 10 ? `0${hour}` : hour}:00`;
      slots.push(time);
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const getDisabledSlots = (startTime, duration) => {
    const startHour = parseInt(startTime.split(":")[0]);
    const durationHours = parseInt(duration.split("")[0]);
    const disabledSlots = [];

    for (let i = 0; i < durationHours; i++) {
      const hour = startHour + i;
      disabledSlots.push(`${hour}:00`);
    }

    return disabledSlots;
  };

  const calculateDisabledSlots = () => {
    const bookedSlots = stylistBookedSlots.filter(
      (slotData) =>
        slotData.salonName === selectedSalon &&
        slotData.stylistName === selectedStylist &&
        slotData.date === selectedDate
    );

    const allDisabledSlots = new Set();

    bookedSlots.forEach((slotData) => {
      const disabledSlots = getDisabledSlots(
        slotData.startTime,
        slotData.duration
      );
      disabledSlots.forEach((disabledSlot) =>
        allDisabledSlots.add(disabledSlot)
      );
    });

    return allDisabledSlots;
  };

  const disabledSlotsSet = calculateDisabledSlots();

  const handleSlotClick = (slot) => {
    if (!disabledSlotsSet.has(slot)) {
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
  // Handle booking request
  const handleBooking = async () => {
    const bookingData = {
      salonId: salons.find((salon) => salon.name === selectedSalon)?.id,
      stylistId: stylists.find((stylist) => stylist.name === selectedStylist)?.id,
      serviceId: selectedServices.map((serviceTitle) =>
        services.find((service) => service.serviceName === serviceTitle)?.id
      ),
      date: selectedDate,
      startTime: selectedSlot,
    };

    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const isSuccess = Math.random() > 0.5;
        if (isSuccess) {
          resolve({ status: 200, message: "Booking Successfully!", data: bookingData });
        } else {
          reject({ status: 400, message: "Send booking fail!" });
        }
      }, 1500);
    });
  };

  const onBookingClick = async () => {
    const bookingData = {
      salonId: salons.find((salon) => salon.name === selectedSalon)?.id,
      stylistId: stylists.find((stylist) => stylist.name === selectedStylist)?.id,
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
                              src={salon.img}
                              alt={salon.name}
                              className="card-img-top"
                              style={{ height: "150px", objectFit: "cover" }}
                            />
                            <div className="card-body">
                              <h5 className="card-title" style={{ fontSize: "1.5rem" }}>
                                {salon.name}
                              </h5>
                              <p className="card-text" style={{ fontSize: "1.2rem" }}>
                                {salon.address}
                              </p>
                              <div>
                                <span
                                  style={{
                                    display: "inline-block",
                                    width: "10px",
                                    height: "10px",
                                    borderRadius: "50%",
                                    backgroundColor: salon.status === "active" ? "green" : "red",
                                    marginRight: "8px",
                                  }}
                                ></span>
                                <span>
                                  {salon.status === "active" ? "Active" : "Inactive"}
                                </span>
                              </div>
                              <button
                                className="btn"
                                style={{
                                  backgroundColor: salon.status === "inactive" ? "#d3d3d3" : "#4caf50",
                                  color: "#fff",
                                  cursor: salon.status === "inactive" ? "not-allowed" : "pointer",
                                }}
                                onClick={() => handleSalonSelect(salon.name)}
                                data-bs-dismiss="modal"
                                disabled={salon.status === "inactive"}
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
                              src={salon.img}
                              alt={salon.name}
                              className="card-img-top"
                              style={{ height: "150px", objectFit: "cover" }}
                            />
                            <div className="card-body">
                              <h5 className="card-title" style={{ fontSize: "1.5rem" }}>
                                {salon.name}
                              </h5>
                              <p className="card-text" style={{ fontSize: "1.2rem" }}>
                                {salon.address}
                              </p>
                              <div>
                                <span
                                  style={{
                                    display: "inline-block",
                                    width: "10px",
                                    height: "10px",
                                    borderRadius: "50%",
                                    backgroundColor: salon.status === "active" ? "green" : "red",
                                    marginRight: "8px",
                                  }}
                                ></span>
                                <span>
                                  {salon.status === "active" ? "Active" : "Inactive"}
                                </span>
                              </div>
                              <button
                                className="btn"
                                style={{
                                  backgroundColor: salon.status === "inactive" ? "#d3d3d3" : "#4caf50",
                                  color: "#fff",
                                  cursor: salon.status === "inactive" ? "not-allowed" : "pointer",
                                }}
                                onClick={() => handleSalonSelect(salon.name)}
                                data-bs-dismiss="modal"
                                disabled={salon.status === "inactive"}
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
              {/* Search*/}
              <div className="mb-3 d-flex justify-content-end">
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
                    "Spa Skin",
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
                        <div className="col-md-4 mb-4" key={stylist.id}>
                          <div
                            className="card text-center"
                            style={{
                              minHeight: "350px",
                              backgroundColor: selectedStylist === stylist.name ? "#add5f0" : "#fff",
                              border: selectedStylist === stylist.name ? "2px solid #007bff" : "none"
                            }}
                          >
                            <img
                              src={stylist.img}
                              className="card-img-top"
                              alt={stylist.name}
                              style={{ objectFit: "cover", height: "280px" }}
                            />
                            <div className="card-body">
                              <h5 className="card-title">{stylist.name}</h5>
                              <button
                                className="btn btn-primary"
                                onClick={() => handleStylistSelect(stylist.name)}
                                data-bs-dismiss="modal"
                              >
                                {selectedStylist === stylist.name ? "Selected" : "Select"}
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    : stylists.map((stylist) => (
                        <div className="col-md-4 mb-4" key={stylist.id}>
                          <div
                            className="card text-center"
                            style={{
                              minHeight: "350px",
                              backgroundColor: selectedStylist === stylist.name ? "#add5f0" : "#fff",
                              border: selectedStylist === stylist.name ? "2px solid #007bff" : "none"
                            }}
                          >
                            <img
                              src={stylist.img}
                              className="card-img-top"
                              alt={stylist.name}
                              style={{ objectFit: "cover", height: "280px" }}
                            />
                            <div className="card-body">
                              <h5 className="card-title">{stylist.name}</h5>
                              <button
                                className="btn btn-primary"
                                onClick={() => handleStylistSelect(stylist.name)}
                                data-bs-dismiss="modal"
                              >
                                {selectedStylist === stylist.name ? "Selected" : "Select"}
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
