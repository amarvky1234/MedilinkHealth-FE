import React, { useState } from "react";
import { Link } from "react-router-dom";
import { symptoms } from "../../../utils/info";


function HealthConcerns() {
  const [consult, setConsult] = useState("Consult now");
  const [start, setStart] = useState(0);
  const visibleCards = symptoms.slice(start, start + 4);

  const next = () => {
    if (start < symptoms.length - 4) {
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
      <div className="container my-5">

        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2>Common Health Concerns</h2>
            <p>Consult a doctor online for any health issue</p>
          </div>
          <button className="btn btn-outline-dark">
            See all Symptoms
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
              <div className="col-md-3" key={item.id}>
                <div className="card shadow-sm border-0">
                  <img src={item.image}
                    className="card-img-top rounded-2"
                    style={{
                        height: "220px",
                        objectFit: "cover",
                    }}
                    alt=""
                  />

                  <div className="card-body" style={{margin:"0px 10px 10px 10px"}}>
                    <h6 className="my-0">{item.title}</h6>
                    <p className="text-muted">{item.price}</p>
                    <Link to="/consult" state={{speciality: item.specialist, price: item.price}} className="text-decoration-none">
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
export default HealthConcerns;