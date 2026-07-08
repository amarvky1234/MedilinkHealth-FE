import React from "react";
import { Link } from "react-router-dom";

function FooterComp() {
  return (
    <footer className="footer-section text-white pt-5 pb-3">
      <div className="container">
        <div className="row gy-4">

          {/* Logo & About */}
          <div className="col-lg-4 col-md-6">
            <h3 className="fw-bold mb-3">
              <i className="bi bi-heart-pulse-fill text-danger me-2"></i>
              HealthCare
            </h3>
            <p className="text-light">
              Consult experienced doctors online, book appointments,
              order medicines, and manage your health anytime,
              anywhere.
            </p>

            <div className="d-flex gap-3 fs-4 mt-3">
              <a href="/" className="text-white">
                <i className="bi bi-facebook"></i>
              </a>

              <a href="/" className="text-white">
                <i className="bi bi-twitter-x"></i>
              </a>

              <a href="/" className="text-white">
                <i className="bi bi-instagram"></i>
              </a>

              <a href="/" className="text-white">
                <i className="bi bi-linkedin"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6">
            <h5 className="mb-3">Quick Links</h5>

            <ul className="list-unstyled">
              <li><Link to="/" className="footer-link">Home</Link></li>
              <li><Link to="/about" className="footer-link">About</Link></li>
              <li><Link to="/doctors" className="footer-link">Doctors</Link></li>
              <li><Link to="/services" className="footer-link">Services</Link></li>
              <li><Link to="/contact" className="footer-link">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="col-lg-3 col-md-6">
            <h5 className="mb-3">Our Services</h5>

            <ul className="list-unstyled">
              <li>✔ Online Consultation</li>
              <li>✔ Appointment Booking</li>
              <li>✔ Lab Tests</li>
              <li>✔ Medicine Delivery</li>
              <li>✔ Health Checkups</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-lg-3 col-md-6">
            <h5 className="mb-3">Contact Us</h5>

            <p>
              <i className="bi bi-geo-alt-fill me-2"></i>
              Hyderabad, India
            </p>

            <p>
              <i className="bi bi-envelope-fill me-2"></i>
              support@healthcare.com
            </p>

            <p>
              <i className="bi bi-telephone-fill me-2"></i>
              +91 98765 43210
            </p>

            <p>
              <i className="bi bi-clock-fill me-2"></i>
              Mon - Sun : 24 × 7
            </p>
          </div>

        </div>

        <hr className="border-secondary my-4" />

        <div className="text-center">
          <p className="mb-0">
            © {new Date().getFullYear()} HealthCare. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}


export default FooterComp;