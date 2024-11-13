import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div>
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-4 mb-4 mb-md-0">
              <h2 className="footer-heading">Leopard</h2>
              <p>
              Quick yet precise like leopards, we’ll bring you the perfect hairstyle.
              </p>
            </div>

            <div className="col-md-6 col-lg-4 pl-lg-5 mb-4 mb-md-0">
              <h2 className="footer-heading">Quick Links</h2>
              <ul className="list-unstyled">
                <li>
                  <Link to="/" className="py-2 d-block">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="py-2 d-block">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="py-2 d-block">
                    Services
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="py-2 d-block">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="py-2 d-block">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-md-6 col-lg-4 mb-4 mb-md-0">
              <h2 className="footer-heading">Have a Questions?</h2>
              <div className="block-23 mb-3">
                <ul>
                  <li>
                    <span className="icon fa fa-map"></span>
                    <span className="text">
                    E2a-7, D1 Street, Long Thanh My, Thu Duc City, Ho Chi Minh City 700000
                    </span>
                  </li>
                  <li>
                    <Link to="#">
                      <span className="icon fa fa-phone"></span>
                      <span className="text">+84 868 656 042</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="#">
                      <span className="icon fa fa-paper-plane"></span>
                      <span className="text">leopardhairsalon8386@gmail.com</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-md-12 text-center">
              <p className="copyright">
                Copyright &copy; {new Date().getFullYear()}{" "}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
