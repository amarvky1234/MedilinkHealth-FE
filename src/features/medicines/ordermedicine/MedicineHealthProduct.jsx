import React, { useState } from "react";
import { Link } from "react-router-dom";
import { healthImg, prodcategories } from "../../../utils/info";

import "./css/healthproducts.css";
import PopularProducts from "./PopularProducts";

function MedicineHealthProduct() {
    const [consult, setConsult] = useState("Consult now");
    const [start, setStart] = useState(0);

    const itemsPerPage = 4;
    const step = itemsPerPage - 1
    const visibleCards = healthImg.slice(start, start + itemsPerPage);

    const next = () => {
        if (start + itemsPerPage < healthImg.length) {
            setStart(Math.min(start + step, healthImg.length - itemsPerPage));
        }
    };

    const prev = () => {
        setStart(Math.max(start - step, 0));
        setLaunch(Math.max(launch - step, 0));
    };

    const [page, setPage] = useState(0);

    const pages = [0, 4, 5];

    const categorieCards = prodcategories.slice(
        pages[page],
        pages[page] + 4
    );

    const nextCategory = () => {
        if (page < pages.length - 1) {
            setPage(page + 1);
        }
    };

    const prevCategory = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    };
    return (
        <>
            <div className="container my-5">
                <h3 className="p-2">Browse medicines & health products</h3>

                <div className="position-relative p-3">
                    <p>Health Condition</p>

                    {start + itemsPerPage < healthImg.length && (
                        <button
                            className="carousel-btn btn btn-light rounded-circle shadow position-absolute"
                            onClick={next}
                            style={{
                                width: "38px",
                                height: "38px",
                                right: "-12px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                zIndex: 10
                            }}
                        >
                            <i className="bi bi-chevron-right"></i>
                        </button>
                    )}

                    <div className="row">
                        {visibleCards.map((item) => (
                            <div className="col-md-3" key={item.id}>
                                <div className="card shadow-sm border-0">
                                    <img src={item.image}
                                        className="img-card card-img-top rounded-2"
                                        style={{
                                            height: "220px",
                                            objectFit: "cover",
                                        }}
                                        alt=""
                                    />


                                </div>
                            </div>
                        ))}
                    </div>

                    {start > 0 && (
                        <button
                            className="carousel-btn btn btn-light rounded-circle shadow position-absolute"
                            onClick={prev}
                            style={{
                                width: "38px",
                                height: "38px",
                                left: "-12px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                zIndex: 10
                            }}
                        >
                            <i className="bi bi-chevron-left"></i>
                        </button>
                    )}

                </div>

                <div className="position-relative p-3">
                    <p>Categories</p>

                    {page + itemsPerPage < prodcategories.length && (
                        <button
                            className="btn btn-light rounded-circle shadow position-absolute"
                            onClick={nextCategory}
                            style={{
                                width: "38px",
                                height: "38px",
                                right: "-12px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                zIndex: 10
                            }}
                        >
                            <i className="bi bi-chevron-right"></i>
                        </button>
                    )}

                    <div className="row">
                        {categorieCards.map((item) => (
                            <div className="col-md-3" key={item.id}>
                                <div className="card shadow-sm border-0">
                                    <img src={item.image}
                                        className="img-card card-img-top rounded-2"
                                        style={{
                                            height: "220px",
                                            objectFit: "cover",
                                        }}
                                        alt=""
                                    />


                                </div>
                            </div>
                        ))}
                    </div>

                    {page > 0 && (
                        <button
                            className="btn btn-light rounded-circle shadow position-absolute"
                            onClick={prevCategory}
                            style={{
                                width: "38px",
                                height: "38px",
                                left: "-12px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                zIndex: 10
                            }}
                        >
                            <i className="bi bi-chevron-left"></i>
                        </button>
                    )}

                </div>

                <PopularProducts />

            </div>
        </>
    )
}

export default MedicineHealthProduct;