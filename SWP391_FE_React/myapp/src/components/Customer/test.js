<section className="ftco-section bg-light">
        <div className="container">
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