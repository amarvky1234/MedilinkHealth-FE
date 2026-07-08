import React from "react";
import { Link } from "react-router-dom";

function Offers() {
  const offers = [
    {
      id: 1,
      bgColor: "#A6D8C6",
      title: "Download the App & get ₹200 HealthCash",
      button: "Download App",
      image:
        "https://www.practo.com/consult/static/images/homepage-hero-image-web-v1.png",
      path: "/consult",
    },
    {
      id: 2,
      bgColor: "#FDBB7A",
      title: "Consult with specialists at just ₹199",
      button: "Consult Now",
      image:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300",
      path: "/consult",
    },
  ];

  return (
    <div className="container my-5">
      <h2 className="fw-bold mb-4">Offers</h2>

      <div className="row g-4">
        {offers.map((offer) => (
          <div className="col-lg-6" key={offer.id}>
            <Link className="text-decoration-none" to={offer.path} >
              <div
                className="card border-0 rounded-3 overflow-hidden"
                style={{
                  backgroundColor: offer.bgColor,
                  minHeight: "300px",
                }}
              >
                <div className="card-body d-flex justify-content-between align-items-center p-4">
                  <div className="d-flex flex-column justify-content-between h-100">
                    <span
                      className="badge bg-white text-success mb-4"
                      style={{ width: "fit-content", fontSize: "15px" }}
                    >
                      OFFER
                    </span>

                    <h2
                      className="fw-bold"
                      style={{ maxWidth: "320px", lineHeight: "1.4" }}
                    >
                      {offer.title}
                    </h2>

                    <button className="btn btn-link text-dark fw-bold fs-4 text-decoration-none p-0 mt-4">
                      {offer.button}
                      <i className="bi bi-arrow-right-circle-fill ms-2"></i>
                    </button>
                  </div>

                  <div>
                    <img
                      src={offer.image}
                      alt={offer.title}
                      style={{
                        width: "170px",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Offers;