import React, { useState } from "react";
import { Link } from "react-router-dom";
import { specialists } from "../../../utils/info";



function Specialities() {
  const [consult, setConsult] = useState("Consult now");
  const [start, setStart] = useState(0);
  const visibleCards = specialists.slice(start, start + 6);

  const next = () => {
    if (start < specialists.length - 6) {
      setStart(start + 1);
    }
  };

  const prev = () => {
    if (start > 0) {
      setStart(start - 1);
    }
  };
  return (
    <>
      <div className="container">

        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2>25+ Specialities</h2>
            <p>Consult with top doctors across specialities</p>
          </div>
          <button className="btn btn-outline-dark">
            See all Specialities
          </button>
        </div>

        <div className="position-relative">

          {start > 0 &&
            <button
              className="btn btn-light rounded-circle shadow position-absolute start-0 top-50 translate-middle-y"
              onClick={prev}
              style={{
                width: "50px",
                height: "50px",
                zIndex: 10
              }}
            >
              <i className="bi bi-chevron-left fs-4"></i>
            </button>
          }

          <div className="row">
            {visibleCards.map((item) => (
              <div className="col-md-2" key={item.id}>
                <div className="card shadow-sm border-0 align-items-center">
                  <img src={item.image}
                    className="card-img-top rounded-circle"
                    style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                    }}
                    alt=""
                  />

                  <div className="card-body text-center">
                    <h6 style={{minHeight: "40px",}}>{item.title}</h6>
                    <p className="text-muted my-1">{item.price}</p>
                    <Link to="/consult" state={{speciality: item.title, price: item.price}} className="text-decoration-none my-0">
                      {consult}
                      <i className="bi bi-chevron-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            className="btn btn-light rounded-circle shadow position-absolute end-0 top-50 translate-middle-y"
            onClick={next}
            style={{
              width: "50px",
              height: "50px",
              zIndex: 10
            }}
          >
            <i className="bi bi-chevron-right fs-4"></i>
          </button>

        </div>
      </div>
    </>
  );
}
export default Specialities;