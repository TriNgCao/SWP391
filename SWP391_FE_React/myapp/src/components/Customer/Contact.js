import React, { useState } from "react";// Create a CSS file or use inline styles

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add form submission logic here
  };

  return (
    <section className="ftco-section bg-light">
  <div className="container">
    <div className="row justify-content-center">
      <div className="col-md-6 text-center mb-5">
        <h2 className="heading-section">Contact Us</h2>
      </div>
    </div>
    <div className="row justify-content-center">
      <div className="col-md-10 d-flex justify-content-center">
        <div className="wrapper w-100">
          <div className="row no-gutters">
            <div className="col-md-8 d-flex justify-content-center">
              <div className="contact-wrap w-100 p-md-5 p-4">
                <form
                  method="POST"
                  id="contactForm"
                  name="contactForm"
                  className="contactForm"
                  onSubmit={handleSubmit}
                >
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="label" htmlFor="name">
                          Full Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          id="name"
                          placeholder="Name"
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="label" htmlFor="email">
                          Email Address
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          id="email"
                          placeholder="Email"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label className="label" htmlFor="subject">
                          Subject
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="subject"
                          id="subject"
                          placeholder="Subject"
                          value={formData.subject}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label className="label" htmlFor="message">
                          Message
                        </label>
                        <textarea
                          name="message"
                          className="form-control"
                          id="message"
                          cols="30"
                          rows="4"
                          placeholder="Message"
                          value={formData.message}
                          onChange={handleChange}
                        ></textarea>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <input
                          type="submit"
                          value="Send Message"
                          className="btn btn-primary"
                        />
                        <div className="submitting"></div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-md-4 d-flex align-items-stretch">
              <div
                className="info-wrap w-100 p-5 img"
                style={{
                  backgroundImage: `url(images/img.jpg)`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

  );
};

export default Contact;
