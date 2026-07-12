import React, { useState } from "react";
import { Link } from "react-router-dom";
import Articles from "./homepagecomponent/Articles";
import { specialities, doctors, services } from "../utils/info";
import SearchDoctors from "../features/finddoctors/finddoctorcomps/SearchDoctors";
import FooterComp from "./FooterComp";


function HomePage() {
    const [location, setLocation] = useState("Hyderabad")
    const [search, setSearch] = useState("");
    const [start, setStart] = useState(0);
    const [consult, setConsult] = useState("CONSULT NOW");

    const visibleCards = doctors.slice(start, start + 4);

    const next = () => {
        if (start < doctors.length - 4) {
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


            <div className="min-vh-100 d-flex flex-column flex-grow-1">
            <section>
                     <main>
                    <SearchDoctors />

                    <div className="container my-5">
                        <div className="row gx-4 gy-4">

                            {services.map((service) => (
                                <Link to={service.route}
                                    className="col-lg-3 col-md-6 d-flex text-decoration-none"
                                    key={service.id}>
                                    <div className="card service-card shadow border-0 rounded-4 w-100">
                                        <div className="image-wrapper"
                                            style={{ backgroundColor: service.bgColor }}
                                        >
                                            <img src={service.image}
                                                className="service-img"
                                                alt={service.title}
                                            />
                                        </div>
                                        <div className="card-body d-flex flex-column justify-content-between">
                                            <div>
                                                <h3 className="card-title mb-3">
                                                    {service.title}
                                                </h3>
                                                <p className="text-muted mb-0">
                                                    {service.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}

                        </div>
                    </div>


                    <div className="container my-5">
                        <div className="d-flex justify-content-between align-items-start flex-wrap gap-3">
                            <div>
                                <h3>Consult top doctors online for any health concern</h3>
                                <p>Private online consultations with verified doctors in all specialists</p>
                            </div>
                            <div>
                                <Link to="/video" className="specialities-btn">View All Specialities</Link>
                            </div>
                        </div>
                        <div className="row">
                            {specialities.map((item) => (
                                <div className="col-md-2" key={item.id}>
                                    <div className="card border-0 align-items-center">
                                        <img
                                            src={item.image}
                                            className="card-img-top rounded-circle"
                                            style={{
                                                width: "125px",
                                                height: "125px",

                                            }}
                                            alt=""
                                        />

                                        <div className="card-body text-center">
                                            <h6 style={{ minHeight: "48px", }}>{item.title}</h6>
                                            <Link to="/consult" state={{ speciality: item.speciality, price: item.price }} className="text-decoration-none fw-bold" style={{ color: "#14BEF0" }}>{consult}</Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="container border-bottom py-5">
                        <h3>Book an appointment for an in-clinic consultation</h3>
                        <p>Find experienced doctors across all specialties</p>
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
                                        <div className="card border-0">
                                            <img
                                                src={item.image}
                                                className="card-img-top rounded-2"
                                                alt=""
                                                style={{ height: "250px", objectFit: "cover" }}
                                            />

                                            <div className="card-body px-0">
                                                <h5 className="text-primary">{item.title}</h5>
                                                <p>{item.desc}</p>
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

                    <div className="container border-bottom py-5">
                        <Articles></Articles>
                    </div>



                </main>
            </section>
             <footer className="w-100">
                   <FooterComp />
             </footer>
            </div>

        </>
    )
}

export default HomePage;