import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchDoctors from "./SearchDoctors";

import "../css/findandbook.css";

function FindandBook() {
    
    const services = [
        {
            icon: "bi bi-chat-left-text",
            title: "Consult with a doctor",
            path: "/video"
        },
        {
            icon: "bi bi-cart3",
            title: "Order Medicines",
            path: "/medicine",
        },
        {
            icon: "bi bi-file-earmark-medical",
            title: "View medical records",
        },
        {
            icon: "bi bi-capsule",
            title: "Book test",
            badge: "New",
        },
        {
            icon: "bi bi-book",
            title: "Read articles",
        },
        {
            icon: "bi bi-briefcase",
            title: "For healthcare providers",
        },
    ];

    return (
        <div className="hero-section">

            {/* Background Image */}
            <div className="hero-banner">

                <div className="container text-center pt-5">

                    <h1 className="display-3 fw-bold text-white">
                        Your home for health
                    </h1>

                    <h2 className="text-white fw-bold mt-5">
                        Find and Book
                    </h2>

                    <div className="row justify-content-center mt-4">

                        <div className="col-lg-8 d-flex flex-column align-items-center w-100">

                            {/* Search Component */}
                            <SearchDoctors />

                            {/* Popular Searches */}
                            <div className="popular-search mt-3 w-100 text-start">

                                <span>Popular searches :</span>

                                <Link
                                    to="/mydoctors?search=Dermatologist"
                                    className="ms-2"
                                >
                                    Dermatologist
                                </Link>

                                <Link
                                    to="/mydoctors?search=Pediatrician"
                                    className="ms-2"
                                >
                                    Pediatrician
                                </Link>

                                <Link
                                    to="/mydoctors?search=Gynecologist"
                                    className="ms-2"
                                >
                                    Gynecologist/Obstetrician
                                </Link>

                                <Link
                                    to="/mydoctors"
                                    className="ms-2"
                                >
                                    Others
                                </Link>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            {/* Bottom Navigation */}

            <div className="service-bar">

                <div className="container">

                    <div className="row text-center">

                        {services.map((item, index) => (

                            <div
                                className="col-md-2 py-2 service-item"
                                key={index}
                            >

                                <Link to={item.path} className="text-decoration-none" target="_blank"
                                    rel="noopener noreferrer">
                                    <div className="position-relative d-inline-block">

                                        <i className={`${item.icon} fs-2 text-white`}></i>

                                        {item.badge && (
                                            <span className="badge bg-success position-absolute top-0 start-100 translate-middle">
                                                {item.badge}
                                            </span>
                                        )}

                                    </div>

                                    <div className="text-white mt-2">
                                        {item.title}
                                    </div>
                                </Link>

                            </div>

                        ))}

                    </div>

                </div>

            </div>

        </div>
    );
}

export default FindandBook;